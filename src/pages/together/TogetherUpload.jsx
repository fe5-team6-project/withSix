import { React, useState } from 'react';
import Common from '../../components/main/Common';
import { styled } from 'styled-components';
import initialImage from '../../assets/images/initialImage.png'
import { useSelector, useDispatch } from 'react-redux';
import { inputTogether } from '../../store/slices/togetherSlice';
import { urlApi } from '../../lib/apis/axiosConfig';
// import axios from 'axios';
// import { URL } from '../../lib/apis/constants';


export default function GroupUpload() {
    const togetherReq = useSelector((state) => { return state.together.req });
    console.log(togetherReq);
    const dispatch = useDispatch();

    //미리보기 사진 변경
    const [img, setImg] = useState('');
    //이미지 업로드
    const handleImgChange = (e) => {
        const file = e.target.files[0];
        const imgUrl = URL.createObjectURL(file);
        setImg(imgUrl);
        console.log(file);
        dispatch(inputTogether({ itemImage: file }));
        console.log(togetherReq);
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'itemName' || name === 'price' || name === 'link') {
            dispatch(inputTogether({ [name]: value }));
        }
    };

    const saveImg = async (e) => {

        console.log(togetherReq);
        const imageFile = togetherReq.itemImage;
        console.log(imageFile);
        const formData = new FormData();
        formData.append('image', imageFile);
        console.log(togetherReq.itemImage);

        const res = await urlApi.post(`/image/uploadfile`, formData);
        console.log(res);
        const fileName = res.data.filename;
        console.log(fileName);
        const imageUrl = "https://api.mandarin.weniv.co.kr/" + fileName;  // 수정: res.filename 대신 fileName을 사용
        console.log(imageUrl);
        dispatch(inputTogether({ itemImage: imageUrl }));
        console.log(togetherReq);
    };

    function handleSave() {
        saveImg();
    }

    const page = (
        <>
            <Form>
                <GroupHeader>
                    <H1>모임 등록</H1>
                    <P>글과 사진을 남기고 공유할 수 있습니다.</P>
                </GroupHeader>
                <GroupInputWrapper>
                    <GroupInput id="GroupName" placeholder="모임명" name="itemName" onChange={handleChange}></GroupInput>
                    <GroupInput id="GroupPrice" placeholder="모임비" name="price" onChange={handleChange}></GroupInput>
                    {/* <GroupInput id="GroupInfo" placeholder="모임 소개"></GroupInput> */}
                    <GroupInfo id="GroupInfo" placeholder="모임 소개" name="link" onChange={handleChange}></GroupInfo>
                    <GroupInput id="GroupImage" placeholder="모임 이미지" type="file" name="itemImage" accept="image/*" onChange={handleImgChange}></GroupInput>
                </GroupInputWrapper>
                <GroupLabel htmlFor="GroupImage">
                    <GroupImage id="PreImage" src={img || togetherReq.itemImage || initialImage}></GroupImage>
                </GroupLabel>
                <RegiButton onClick={handleSave}>등록</RegiButton>
            </Form>
        </>
    );

    return (
        <>
            <Common page={page}></Common>
        </>
    );
}

const Form = styled.section`
    padding: 20px;
    text-align: center;
`;

const GroupHeader = styled.header`
    margin: 50px;
`;

const H1 = styled.h1`
    font-size: var(--fsize-title);
    color: var(--color-black);
`;

const P = styled.p`
    font-size: var(--fsize-s);
    color: var(--color-gray);
`;

const GroupInputWrapper = styled.div`
    /* box-shadow: 0 0 3px 0 black; */
`;

const GroupInput = styled.input`
    /* margin:auto;
    display:block;
    width:350px; 조정예정*/
    width: 100%;
    height: 40px;
    background-color: white;
    color: black;
    text-align: start;
    padding-left: 10px;
    font-size: var(--fsize-desc);
    box-sizing: border-box;
    margin-top: 20px;
    &#GroupImage {
        display: none;
    }
    &:focus,
    &:hover {
        border-radius: var(--radius-s);
    }
`;

const GroupInfo = styled.textarea`
    width: 100%; //조정예정
    height: 100px;
    margin-top: 20px;
    padding: 15px 10px;
    font-size: var(--fsize-desc);
    box-sizing: border-box;
    border: solid 1px var(--color-main);
    border-radius: var(--radius-s);
    resize: none; //크기조절 삭제
    font-family: inherit;
`;

const GroupLabel = styled.label``;
const GroupImage = styled.img`
    margin-top: 20px;
    width: 100%;
    height: 200px;
    background-color: #ddd;
    object-fit: cover;
    border: none;
    border-radius: var(--radius-s);
`;

const RegiButton = styled.button`
    margin-top: 80px;
`;
