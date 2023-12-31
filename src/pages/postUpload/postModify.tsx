import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Common from '../../components/main/Common';
import {
    TitleSec,
    Tit,
    SubTit,
    UploadSec,
    Lable,
    Input,
    PostUploadImg,
    DeleteBtn,
    Img,
    FileUpload,
    FileInput,
    UploadSubSec,
} from './postStyle';
import { PostUploadFooter } from './UploadFooter/uploadfooter';
import { URL as url } from '../../lib/apis/constant/path';
import ImgUploadBtn from '../../assets/icons/post/icon-image.png';
import { ValidContent, ValidLength } from './valiPostUpload';
import { useDispatch, useSelector } from 'react-redux';
import {
    CONTENT_UPDATE_OK,
    FAIL_OVER_IMAGE,
} from '../../lib/apis/constant/message';
import Modal from '../../components/modal/Modal';
import {
    setContent as setContents,
    setIsVisible,
    setUrl,
} from '../../store/slices/modalSlice';
import { ModalPropsBase } from '../../lib/utils/interface/interface';
import { INPUT_EVENT } from '../../lib/utils/type/eventType';

export default function PostUpload() {
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const [content, setContent] = useState<string>(''); // 게시글 입력 내용
    const [showImg, setShowImg] = useState<string[]>([]);
    const [postImg, setPostImg] = useState<string[]>([]);
    const [uploadBtn, setUploadBtn] = useState<boolean>(true);
    const fileInput = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 모달을 나타낼지 말지 결정할 state
    const {
        display: { isVisible },
    } = useSelector((state: ModalPropsBase) => state.modal);

    const data = {
        post: {
            content: '',
            image: '',
        },
    };

    // 1. 이미지 업로드 부분
    async function UploadImg(file: File) {
        const formData = new FormData();
        formData.append('image', file);

        const response = await axios.post(`${url}/image/uploadfile`, formData);
        const imgName = `${url}/` + response.data.filename;

        return imgName;
    }

    // 2. 이미지 미리보기 부분
    async function ImgView(e: INPUT_EVENT) {
        // 내가 이미지 등록에서 선택한 그 사진!
        const files = e.target.files;
        let fileUrls = [...postImg];
        let fileImgs = [...showImg];
        // 이미지 사이즈 10MB 제한
        const maxSize = 10 * 1024 * 1024;
        let TotalImgSize = 0;

        for (let i = 0; i < files!.length; i++) {
            TotalImgSize += files![i].size;

            if (TotalImgSize > maxSize) {
                alert(' 총 이미지의 크기는 10MB입니다.');
            } else {
                const createImgUrl = URL.createObjectURL(files![i]).toString();
                fileImgs.push(await UploadImg(files![i]));
                fileUrls.push(createImgUrl);
            }
        }
        console.log(fileImgs);

        // 이미지는 3장까지 업로드
        if (ValidLength(fileUrls)) {
            dispatch(
                setContents({
                    state: false,
                    message: FAIL_OVER_IMAGE,
                })
            );
            dispatch(setIsVisible({ isVisible: true }));

            fileUrls = fileUrls.slice(0, 3);
            fileImgs = fileImgs.slice(0, 3);
        }

        setShowImg(fileImgs);
        setPostImg(fileUrls);
    }

    // 3. 이미지 삭제 부분
    const DeleteImg = (id: number) => {
        setShowImg(
            showImg.filter((_, index) => {
                return index !== id;
            })
        );

        setPostImg(
            postImg.filter((_, index) => {
                return index !== id;
            })
        );
    };

    // 4. 게시글 업로드 부분
    async function UploadPost() {
        const imgList = [...showImg];
        console.log(imgList);

        // for (let i = 0; i < postImg.length; i++) {
        //     console(postImg[i]);
        //     imgList.push(await UploadImg(postImg[i]));
        // }

        const snsImgList = await Promise.all(imgList);

        data.post.image = snsImgList.join(',');
        data.post.content = content;

        try {
            const res = await axios.put(`${url}/post/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-type': 'application/json',
                },
            });

            if (res.status === 200) {
                dispatch(
                    setContents({
                        state: true,
                        message: CONTENT_UPDATE_OK,
                    })
                );
                dispatch(setIsVisible({ isVisible: true }));
                dispatch(setUrl({ path: '/home' }));
            }
        } catch (error: any) {
            const errorMessage = error.response.data.message;
            dispatch(
                setContents({
                    state: false,
                    message: errorMessage,
                })
            );
            dispatch(setIsVisible({ isVisible: true }));
        }
    }

    async function ModifyPost() {
        const {
            data: {
                // post는 기존의 게시물 데이터를 모두 가지고 있음
                post,
            },
        } = await axios.get(`${url}/post/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
        });
        console.log(post);

        // 기존 게시물에서 이미지를 받아올 땐 join으로 합쳤던 것을 다시 split로 나눠야함
        setPostImg(post.image.split(','));
        setShowImg(post.image.split(','));
        setContent(post.content);
    }

    // 빈배열이니까 새로고침하고 내가 기존에 썼던거 한 번만 렌더링됨. 그걸 불러오면 됨
    useEffect(() => {
        ModifyPost();
    }, []);

    // 게시물 업로드할 때 게시글과 이미지가 없으면 업로드 불가
    useEffect(() => {
        setUploadBtn(ValidContent(content, postImg));
    }, [content, postImg]);

    const page = (
        <>
            <title> 게시물 업로드 </title>
            <meta name="description" content="게시물 업로드 페이지" />

            {/* 게시물 업로드 헤더 section */}
            <UploadSec>
                <TitleSec>
                    <Tit>포스팅</Tit>
                    <SubTit>글과 사진을 남기고 공유할 수 있습니다.</SubTit>
                </TitleSec>

                {/* 게시글 부분 */}
                <Lable htmlFor="post" />
                <Input
                    name="post"
                    id="post"
                    placeholder="글을 작성해주세요."
                    value={content}
                    // input값 바뀌면 이벤트 실행
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                />

                {/* 미리보기 이미지 부분 */}
                <PostUploadImg>
                    <ul>
                        {postImg.length !== 0
                            ? postImg.map((image, id) => {
                                  return (
                                      // 기존에 이미지가 있다면 뒤에 추가
                                      image && (
                                          <li key={id}>
                                              <Img key={id} src={image} />
                                              <DeleteBtn
                                                  onClick={() => {
                                                      return DeleteImg(id);
                                                  }}
                                              />
                                          </li>
                                      )
                                  );
                              })
                            : postImg.map((image, id) => {
                                  return (
                                      // 기존에 이미지가 없다면 새로 이미지 추가
                                      <li key={id}>
                                          <Img key={id} src={image} />
                                          <DeleteBtn
                                              onClick={() => {
                                                  return DeleteImg(id);
                                              }}
                                          />
                                      </li>
                                  );
                              })}
                    </ul>
                </PostUploadImg>

                <UploadSubSec>
                    {/* 이미지 등록 라벨 */}
                    <FileUpload htmlFor="input-file">
                        <img src={ImgUploadBtn} alt="" />
                        <FileInput
                            id="input-file"
                            name="PostImg"
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            onChange={ImgView}
                            ref={fileInput}
                        />
                    </FileUpload>

                    <PostUploadFooter UploadPost={UploadPost} />
                </UploadSubSec>
            </UploadSec>
            {isVisible && <Modal />}
        </>
    );

    return (
        <>
            {/* {console.log(showImg)} */}
            <Common page={page} />
        </>
    );
}
