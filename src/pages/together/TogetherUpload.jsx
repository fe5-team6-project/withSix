import { React, useState } from 'react';
import Common from '../../components/main/Common';
import { styled } from 'styled-components';
import initialImage from '../../assets/images/initialImage.png'
import { api, urlApi } from '../../lib/apis/axiosConfig';



export default function GroupUpload() {

    const page = (
        <>
            <Form>
                <GroupHeader>
                    <H1>모임 등록</H1>
                    <P>글과 사진을 남기고 공유할 수 있습니다.</P>
                </GroupHeader>
                <GroupInputWrapper>
                    <GroupInput id="GroupName" placeholder="모임명" name="itemName" onChange={() => { }}></GroupInput>
                    <GroupInput id="GroupPrice" placeholder="모임비" name="price" onChange={() => { }}></GroupInput>
                    {/* <GroupInput id="GroupInfo" placeholder="모임 소개"></GroupInput> */}
                    <GroupInfo id="GroupInfo" placeholder="모임 소개" name="link" onChange={() => { }}></GroupInfo>
                    <GroupInput id="GroupImage" placeholder="모임 이미지" type="file" name="itemImage" accept="image/*" onChange={() => { }}></GroupInput>
                </GroupInputWrapper>
                <GroupLabel htmlFor="GroupImage">
                    {/* <GroupImage id="PreImage" src={img || togetherReq.itemImage || initialImage}></GroupImage> */}
                    <GroupImage id="PreImage" src={initialImage}></GroupImage>
                </GroupLabel>
                <RegiButton onClick={() => { }}>등록</RegiButton>
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
