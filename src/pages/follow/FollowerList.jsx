import React from 'react'
import Common from '../../components/design/main/Common'
import { styled } from "styled-components";

export default function FollowerList() {
    const page = (
        <>
            <Main>
                <FollowWrap>
                    <FollowList>
                        <ProfileImg></ProfileImg>
                        <TextWrap>
                            <ProfileTitle>뮹뮹</ProfileTitle>
                            <ProfileContent>난 세상에서 제일 반짝이는 사람이 될 거야!</ProfileContent>
                        </TextWrap>
                        <FollowButton id="FollowBtn">팔로우</FollowButton>
                    </FollowList>
                </FollowWrap>
            </Main>
        </>
    )

    return (
        <>
            <Common page={page}></Common>
        </>
    )
}

const Main = styled.main`
    margin: 50px 0px;
`

const FollowWrap = styled.ul`
    display:flex;
    flex-direction: column;
    gap:20px;
`

const FollowList = styled.li`
    display:flex;
    width:100%;
    height:50px;
    background: #fff;
    cursor: pointer;
    align-items: center;
    gap:14px;
`

const ProfileImg = styled.img`
    width:50px;
    height:50px;
    border-radius: 50%;
    object-fit: cover;
    background: gold;
`

const TextWrap = styled.div`
    display: flex;
    flex-direction: column;
    flex:1;
    flex-basis : 290px;
    flex-shrink: 0;
`

const ProfileTitle = styled.strong`
    color: var(--color-black);
    font-weight: bold;
`

const ProfileContent = styled.p`
    font-size : var(--fsize-s);
    color: var(--color-gray);
`

const FollowButton = styled.button`
    &#FollowBtn{
        width:58px;
        height: 28px;
        font-size: var(--fsize-s);
        font-weight: lighter;
    }
`