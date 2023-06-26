import React from 'react';
import Common from '../../components/main/Common';
import { styled } from 'styled-components';
import { api } from '../../lib/apis/axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { inputTogether } from '../../store/slices/togetherSlice';
import togetherImg from '../../assets/images/togetherImg.png'

export default function GroupEdit() {
    const togetherInfo = useSelector((state) => { return state.together.req });
    const dispatch = useDispatch();
    const id = useParams().id;
    const navigate = useNavigate();

    const togetherEdit = async () => {
        const aa = {
            "product": {
                ...togetherInfo
            }
        };
        const res = api.put(`/product/${id}`, aa);
        console.log(res);
    }
    console.log(togetherInfo);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'itemName' || name === 'price' || name === 'link') {
            dispatch(inputTogether({ [name]: value }));
        }
    };
    console.log(togetherInfo);


    const page = (
        <>
            <Form>
                <GroupHeader>
                    <H1>모임 수정</H1>
                    <P>글과 사진을 남기고 공유할 수 있습니다.</P>
                </GroupHeader>
                <GroupInputWrapper>
                    <GroupInput id="GroupName" placeholder="모임명" value={togetherInfo.itemName} name="itemName" onChange={handleChange}></GroupInput>
                    <GroupInput id="GroupPrice" placeholder="모임비" value={togetherInfo.price} name="price" onChange={handleChange}></GroupInput>
                    {/* <GroupInput id="GroupInfo" placeholder="모임 소개"></GroupInput> */}
                    <GroupInfo id="GroupInfo" placeholder="모임 소개" value={togetherInfo.link} name="link" onChange={handleChange}></GroupInfo>
                    <GroupInput id="GroupImage" name="itemImage" ></GroupInput>
                </GroupInputWrapper>
                <GroupLabel htmlFor="GroupImage">
                    <GroupImage id="PreImage" src={togetherInfo.itemImage && !/\/undefined$/.test(togetherInfo.itemImage) ? togetherInfo.itemImage : togetherImg}></GroupImage>
                </GroupLabel>
                <RegiButton onClick={async () => { await togetherEdit(); navigate(-1); }}>수 정</RegiButton>
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
    min-width:280px;
    max-width:390px;
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
    border-radius: var(--radius-s);
    &#GroupImage {
        display: none;
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
    transition: margin, height 0.3s, 0.3s;
`;

const GroupLabel = styled.div``;
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
