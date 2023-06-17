import React from 'react'
import Common from '../../components/design/main/Common'
import { styled } from "styled-components";

export default function GroupUpload() {

    const page = (
        <>
            <Form>
                <GroupHeader>
                    <H1>모임 등록</H1>
                    <P>글과 사진을 남기고 공유할 수 있습니다.</P>
                </GroupHeader>
                <GroupInputWrapper>
                    <GroupInput id="GroupName" placeholder="모임명"></GroupInput>
                    <GroupInput id="GroupPrice" placeholder="모임비"></GroupInput>
                    <GroupInput id="GroupInfo" placeholder="모임 소개"></GroupInput>
                    <GroupInput id="GroupImage"></GroupInput>
                </GroupInputWrapper>
                <GroupLabel htmlFor="GroupImage">
                    <GroupImage className="PreImage"></GroupImage>
                </GroupLabel>
                <RegiButton>등록</RegiButton>
            </Form>
        </>
    )
    return (
        <>
            <Common page={page}></Common>
        </>
    )
}

const Form = styled.section`
    padding:20px;
    text-align: center;
`

const GroupHeader = styled.header`
    margin-top:50px;
`

const H1 = styled.h1`
    font-size: var(--fsize-head);
    color: var(--color-black);
`

const P = styled.p`
    font-size : var(--fsize-head-sub);
    color: var(--color-black);
`

const GroupInputWrapper = styled.div`
    /* box-shadow: 0 0 3px 0 black; */
`

const GroupInput = styled.input`
    /* margin:auto;
    display:block;
    width:350px; */
    width:100%;
    height: 40px;
    background-color: white;
    color:black;
    text-align: start;
    padding-left:10px;
    font-size: var(--fsize-desc);
    box-sizing: border-box;
    margin-top:20px;
    &#GroupInfo{
        margin-top:20px;
        background-color: inherit;
        border:1px solid var(--color-main);
        border-radius: 5px;
    } */
    &#GroupImage{
        display:none;
    }
`

const GroupLabel = styled.div`
    
`
const GroupImage = styled.img`
    margin-top:20px;
    width:100%;
    height:200px;
    background-color: #DDD;
    object-fit:cover;

`

const RegiButton = styled.button`
    margin-top:80px;
`