import React, { useState, useRef, useEffect } from 'react';
// import { useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
import { URL } from '../../lib/apis/constant/path';
import ImgUploadBtn from '../../assets/icons/post/icon-image.png';
import { ValidContent, ValidLength } from './valiPostUpload';
import { useDispatch, useSelector } from 'react-redux';
import {
    setContent as setContents,
    setIsVisible,
    setUrl,
} from '../../store/slices/modalSlice';
import {
    FAIL_OVER_IMAGE,
    POST_UPLOAD_OK,
} from '../../lib/apis/constant/message';
import Modal from '../../components/modal/Modal';
export default function PostUpload() {
    const token = localStorage.getItem('token');
    const [content, setContent] = useState(''); // 게시글 입력 내용
    const [showImg, setShowImg] = useState([]);
    const [postImg, setPostImg] = useState([]);
    const [uploadBtn, setUploadBtn] = useState(true);
    const fileInput = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const { myInfo } = useSelector((state) => state.user);
    // console.log(myInfo);

    //모달을 나타낼지 말지 결정할 state
    const {
        display: { isVisible },
    } = useSelector((state) => state.modal);

    const data = {
        post: {
            content: '',
            image: '',
        },
    };

    // 1. 이미지 업로드 부분
    // 이미지를 서버에 전송하고 숫자로 이루어진 filename을 응답 받음
    async function UploadImg(file) {
        const formData = new FormData();
        formData.append('image', file);

        const response = await axios.post(`${URL}/image/uploadfile`, formData);
        const imgName = `${URL}/` + response.data.filename;
        console.log(imgName);
        return imgName;
    }

    // 2. 이미지 미리보기 부분
    function ImgView(e) {
        // 내가 이미지 등록에서 선택한 그 사진!
        const files = e.target.files;
        console.log(files);
        let fileUrls = [...showImg];
        let fileImgs = [...postImg];

        // 이미지 사이즈 10MB 제한
        const maxSize = 10 * 1024 * 1024;
        let TotalImgSize = 0;

        for (let i = 0; i < files.length; i++) {
            TotalImgSize += files[i].size;

            if (TotalImgSize > maxSize) {
                alert(' 총 이미지의 크기는 10MB입니다.');
            } else {
                const createImgUrl = window.URL.createObjectURL(files[i]);
                fileUrls.push(createImgUrl);
                fileImgs.push(files[i]);
            }
        }

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

        setShowImg(fileUrls);
        setPostImg(fileImgs);
    }

    // 3. 이미지 삭제 부분
    const DeleteImg = (id) => {
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
        // UploadImg 함수에서 filename을 응답받은 url을 빈배열에 담아줌
        const imgList = [];

        for (let i = 0; i < postImg.length; i++) {
            // filename을 응답받은 url을 하나씩 imgList에 push
            imgList.push(UploadImg(postImg[i]));
        }

        const snsImgList = await Promise.all(imgList);

        data.post.image = snsImgList.join(',');
        data.post.content = content;

        // 서버로 전송하면 업로드 완료
        try {
            const res = await axios.post(`${URL}/post`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-type': 'application/json',
                },
            });

            if (res.status === 200) {
                dispatch(
                    setContents({
                        state: true,
                        message: POST_UPLOAD_OK,
                    })
                );
                dispatch(setIsVisible({ isVisible: true }));
                dispatch(setUrl({ path: '/home' }));
            }
        } catch (error) {
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
                        {showImg.map((image, id) => {
                            return (
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
                    {/* 이미지 등록 라벨 / 인풋 */}
                    <FileUpload htmlFor="input-file">
                        <img src={ImgUploadBtn} alt="" />
                    </FileUpload>
                    <FileInput
                        id="input-file"
                        name="PostImg"
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        onChange={ImgView}
                        ref={fileInput}
                    />

                    {/* 업로드 버튼 부분 */}
                    <PostUploadFooter UploadPost={UploadPost} />
                </UploadSubSec>
            </UploadSec>
            {isVisible && <Modal />}
        </>
    );

    return (
        <>
            <Common page={page} />
        </>
    );
}
