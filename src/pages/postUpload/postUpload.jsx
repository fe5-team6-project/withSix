import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { Helmet } from "react-helmet-async";
import Common from "../../components/main/Common" 
import {
    PostHeaderSec,
    TitleSec,
    BackBtn,
    Tit,
    SubTit,
    UploadSec,
    Lable,
    Input,
    PostUploadImg,
    SingleImg,
    DeleteBtn,
    Img,
    FileUpload,
    FileInput,
    FileTxt,
    FileSubTxt,
} from "./postStyle";
import {PostUploadFooter} from './UploadFooter/uploadfooter'
export default function PostUpload (){
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzZkN2I3YjJjYjIwNTY2MzJkMDA5MyIsImV4cCI6MTY5MDgxNzQyOCwiaWF0IjoxNjg1NjMzNDI4fQ.fuRi1qVjgU4C7my-RPJrPOoBFjAvSHauogh8alP9mbI';
    const [content, setContent] = useState(""); // 게시글 입력 내용
    const [showImg, setShowImg] = useState([]); // 이미지 선택 시에 파일선택 옆에 뜨는 url
    const [postImg, setPostImg] = useState([]); // 이미지 선택 시에 아래에 미리보기로 뜨는 이미지
    const [uploadBtn, setUploadBtn] = useState(true);
    const fileInput = useRef(null);
    const navigate = useNavigate();
    const [imageSrc, setImageSrc] = useState('');

        const data = {
        post: {
            content: "",
            image: "",
        },
    };

    // 1. 이미지 업로드 부분
    async function UploadImg(file) {
        const url = "https://api.mandarin.weniv.co.kr/";
        const formData = new FormData();
        formData.append("image", file);

        const response = await axios.post(
            "https://api.mandarin.weniv.co.kr/image/uploadfiles",
            formData
        );
        const imgName = url + response.data.filename;

        return imgName;
    }

    // 2. 이미지 미리보기 부분
    function ImgView(e) {
        // console.log(e.target.files);
        const files = e.target.files;
        let fileUrls = [...showImg];
        let fileImgs = [...postImg];

        // 이미지 사이즈 10MB 제한
        const maxSize = 10 * 1024 * 1024;
        let TotalImgSize = 0;

        for (let i = 0; i < files.length; i++) {
            TotalImgSize += files[i].size;

            if (TotalImgSize > maxSize) {
                alert(" 총 이미지의 크기는 10MB입니다.");
            } else {
                const createImgUrl = URL.createObjectURL(files[i]);
                fileUrls.push(createImgUrl);
                fileImgs.push(files[i]);
            }
        }

        // 이미지는 3장까지 업로드
        if (fileUrls.length > 3) {
            alert(" 이미지는 3장까지 업로드할 수 있습니다.");
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
        const url = "https://api.mandarin.weniv.co.kr/";
        const imgList = [];

        for (let i = 0; i < postImg.length; i++) {
            imgList.push(UploadImg(postImg[i]));
        }

        const snsImgList = await Promise.all(imgList);

        data.post.image = snsImgList.join(",");
        data.post.content = content;

        try {
            await axios
                .post("https://api.mandarin.weniv.co.kr/post", data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-type": "application/json",
                    },
                })
                // 전 페이지로
                .then(navigate(-1));
        } catch (error) {
            console.log(error);
        }
    }

    // 게시물 업로드할 때 게시글과 이미지가 없으면 업로드 불가
    useEffect(() => {
        if (content.length === 0 && postImg.length === 0) {
            setUploadBtn(false);
        } else {
            setUploadBtn(true);
        }
    }, [content, postImg]);

    const page = (        
    <>
        {/* <Helmet> */}
            <title> 게시물 업로드 </title>
            <meta name="description" content="게시물 업로드 페이지" />
        {/* </Helmet> */}
    
        {/* 게시물 업로드 헤더 section */}
        <UploadSec>
            <PostHeaderSec>
                <TitleSec>
                <BackBtn onClick={() => { navigate(-1); }} />
                <Tit>포스팅</Tit>
                <SubTit>글과 사진을 남기고 공유할 수 있습니다.</SubTit>
                {/* <UploadBtn size='middle-sm' isActive={isActive} UploadPost={UploadPost} disabled={disabled} text='저장' /> */}
                </TitleSec>
            </PostHeaderSec>   

        {/* 프로필 불러오기 */}
        {/* 프로필 이미지가 있을시에 setImageSrc 불러옴 */}
            {/* {imageSrc && <img src={imageSrc} alt="" />} */}

        {/* 게시글 부분 */}
            <Lable htmlFor="post"/> 
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

        {/* 이미지 부분 */}
            <PostUploadImg>
                {showImg.length === 1
                    ? showImg.map((image, id) => {
                            return (
                                <div key={id}>
                                    <SingleImg key={id} src={image} />
                                    <DeleteBtn
                                        onClick={() => {
                                            return DeleteImg(id);
                                        }}
                                    />
                                </div>
                            );
                        })
                    : showImg.map((image, id) => {
                            return (
                                <div key={id}>
                                    <Img key={id} src={image} />
                                    <DeleteBtn
                                        onClick={() => {
                                            return DeleteImg(id);
                                        }}
                                    />
                                </div>
                            );
                        })}
            </PostUploadImg>

            <FileUpload htmlFor="input-file">
                <FileTxt>이미지 등록 <br/></FileTxt>
                <FileSubTxt>( n*n, 1M 이하, jpeg, png )</FileSubTxt>
                <FileInput
                    id="input-file"
                    name="PostImg"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    onChange={ImgView}
                    ref={fileInput}
                />
            </FileUpload>

        {/* 업로드 버튼 부분 */}
            <PostUploadFooter UploadPost={UploadPost} disabled={uploadBtn ? null : 'disabled'} />
        </UploadSec>
    </>)

    return (
        <>
        <Common page = {page} />
        </>
    );
};
