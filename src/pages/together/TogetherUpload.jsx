import { React, useState } from 'react';
import Common from '../../components/main/Common';
import { styled } from 'styled-components';
import initialImage from '../../assets/images/initialImage.png'
import { api, urlApi } from '../../lib/apis/axiosConfig';
import { BASE_URL } from '../../lib/apis/constants';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function GroupUpload() {
    const navigate = useNavigate();
    const accoutname = useSelector((state) => { return state.user.myInfo.accountname });
    const [togetherInfo, setTogetherInfo] = useState({
        "itemName": String,
        "price": Number,
        "link": String,
        "itemImage": '',
    })
    const [img, setImg] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "price") {
            setTogetherInfo({ ...togetherInfo, [name]: parseInt(value) });
        } else {
            setTogetherInfo({ ...togetherInfo, [name]: value });
        }
    }

    const handleImgChange = (e) => {
        const file = e.target.files[0];
        setTogetherInfo({ ...togetherInfo, itemImage: file });
        setImg(URL.createObjectURL(file));
    }

    const sendTogether = async () => {
        try {
            const formData = new FormData();
            formData.append('image', togetherInfo.itemImage);
            const imgRes = await urlApi.post(`/image/uploadfile`, formData);
            const img = `${BASE_URL}/${imgRes.data.filename}`;
            const togetherBody = { product: { ...togetherInfo, itemImage: img } };
            await api.post(`/product`, togetherBody, { timeout: 3000 });
        } catch (error) {
            console.error(error);
        }
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
                    <GroupInput type="number" id="GroupPrice" placeholder="모임비" name="price" step="100" onChange={handleChange}></GroupInput>
                    {/* <GroupInput id="GroupInfo" placeholder="모임 소개"></GroupInput> */}
                    <GroupInfo id="GroupInfo" placeholder="모임 소개" name="link" onChange={handleChange}></GroupInfo>
                    <GroupInput id="GroupImage" placeholder="모임 이미지" type="file" name="itemImage" accept="image/*" onChange={handleImgChange}></GroupInput>
                </GroupInputWrapper>
                <GroupLabel htmlFor="GroupImage">
                    {/* <GroupImage id="PreImage" src={img || togetherReq.itemImage || initialImage}></GroupImage> */}
                    <GroupImage id="PreImage" src={img || initialImage}></GroupImage>
                </GroupLabel>
                <RegiButton onClick={async () => { await sendTogether(); navigate(`/together/${accoutname}`); }}>등록</RegiButton>
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
    margin:auto;
    width:390px;
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
