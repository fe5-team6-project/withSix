import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Common from "../../components/main/Common" 
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
} from "./postStyle";
import {PostUploadFooter} from './UploadFooter/uploadfooter'
import { URL } from "../../lib/apis/constant/path";

export default function PostUpload (){
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const [content, setContent] = useState(""); // 게시글 입력 내용
    const [showImg, setShowImg] = useState([]); // 미리보기에 올라오는 이미지
    const [postImg, setPostImg] = useState([]); // 업로드 페이지에 올라오는 이미지
    const [uploadBtn, setUploadBtn] = useState(true);
    const fileInput = useRef(null);
    const navigate = useNavigate();
    // postUpload에서 불러온 데이터
    const [ postData, setPostData] = useState([]);

    const data = {
        post: {
            content: "",
            image: "",
        },
    };

    // 1. 이미지 업로드 부분
    async function UploadImg(file) {
        const formData = new FormData();
        formData.append("image", file);

        const response = await axios.post(
            `${URL}/image/uploadfile`,
            formData
        );
        const imgName = `${URL}/` + response.data.filename;
        return imgName;
    }

    // 2. 이미지 미리보기 부분
    function ImgView(e) {
        // 내가 이미지 등록에서 선택한 그 사진!
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
                const createImgUrl = window.URL.createObjectURL(files[i]);
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
        const imgList = [];
        for (let i = 0; i < postImg.length; i++) {
            imgList.push(UploadImg(postImg[i]));
        }

        const snsImgList = await Promise.all(imgList);

        data.post.image = snsImgList.join(",");
        data.post.content = content;

        try {
            const res = await axios
                .post(`${URL}/post`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-type": "application/json",
                    },
                })
                .then(navigate('/home'));
        } catch (error) {
            console.log(error);
        }
    }

    async function ModifyPost(){
        const {data : {
            // post는 기존의 게시물 데이터를 모두 가지고 있음
            post
        }} = await axios
        .get(`${URL}/post/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json",
            },
        })
        //데이터 전역변수로 저장
        setPostData(post);
        //미리보기 이미지 주소를 배열에 저장
        setShowImg([post.image]);
        setContent(post.content);
    }

    // 빈배열이니까 새로고침하고 내가 기존에 썼던거 한 번만 렌더링됨. 그걸 불러오면 됨
    useEffect(()=>{
        ModifyPost();
    },[])

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
            <title> 게시물 업로드 </title>
            <meta name="description" content="게시물 업로드 페이지" />
    
        {/* 게시물 업로드 헤더 section */}
        <UploadSec>
                <TitleSec>
                <Tit>포스팅</Tit>
                <SubTit>글과 사진을 남기고 공유할 수 있습니다.</SubTit>
                </TitleSec>

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

            <UploadSubSec>
                {/* 이미지 등록 라벨 */}
                    <FileUpload htmlFor="input-file">

                        <FileInput
                            id="input-file"
                            name="PostImg"
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            onChange={ImgView}
                            ref={fileInput}
                        />
                    </FileUpload>

                {/* 미리보기 이미지 부분 */}
                    <PostUploadImg>
                        
                        {
                            showImg.map((image, id) => {
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
            </UploadSubSec>

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
