import { React, useState } from 'react';
import Common from '../../components/main/Common';
import { styled } from 'styled-components';
import initialImage from '../../assets/images/initialImage.png'
import { api, urlApi } from '../../lib/apis/axiosConfig';
import { useParams } from 'react-router-dom';

export default function TogetherDetail() {

    const [togetherDetail, setTogetherDetail] = useState('');
    const id = useParams().id
    console.log(id);
    const togetherDetails = async () => {
        const res = await api.get(`/product/detail/${id}`);
        console.log(res);
        const detailData = res.data.product;
        console.log(detailData.itemName)
        setTogetherDetail(detailData);
        console.log(togetherDetail);
    }
    const page = (
        <>
            <Form>
                <GroupHeader>
                    <H1 onClick={togetherDetails}>모임 등록</H1>
                </GroupHeader>
                <GroupWrapper>
                    <GroupImg src={togetherDetail.itemImage} ></GroupImg>
                    <GroupText>{togetherDetail.itemName}</GroupText>
                    <GroupText>{togetherDetail.price}</GroupText>
                    <GroupDetailInfo>{togetherDetail.link}</GroupDetailInfo>
                </GroupWrapper>
                <GroupBtn>버튼</GroupBtn>
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
    margin: 20px;
`;

const H1 = styled.h1`
    font-size: var(--fsize-title);
    color: var(--color-black);
`;

const GroupText = styled.p`
    font-size: var(--fsize-m);
    color: var(--color-black);
    font-weight: bold;
    text-align: left;
    margin-top:34px;
    text-indent: 10px;
    &:after{
        content: '';
        display:block;
        border-bottom:1px solid var(--color-main);
        margin-top:8px;
    }
`;

const GroupDetailInfo = styled.p`
    text-align: left;
    width: 100%; //조정예정
    height: 100px;
    margin-top: 20px;
    padding: 15px 10px;
    font-size: var(--fsize-s);
    font-weight: lighter;
    box-sizing: border-box;
    border: solid 1px var(--color-main);
    border-radius: var(--radius-s);
    resize: none; //크기조절 삭제
    font-family: inherit;
    background-color: inherit;
    margin-bottom:50px;
`

const GroupWrapper = styled.div`
    /* box-shadow: 0 0 3px 0 black; */
`;

const GroupImg = styled.img`
    width: 100%;
    height: 200px;
    /* background-color: #ddd; */
    object-fit: cover;
    border: none;
    border-radius: var(--radius-s);
`

const GroupBtn = styled.button`
    
`