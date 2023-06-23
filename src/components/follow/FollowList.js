import React from 'react'
import { useNavigate } from 'react-router-dom';
import FollowButton from '../../components/follow/FollowButton';
import { styled } from 'styled-components';

export default function FollowList({ accountname, username, intro, image, isfollow }) {
    return (
        <>
            <FollowItem>
                <ProfileImg src={image}></ProfileImg>
                <TextWrap>
                    <ProfileTitle>{username}</ProfileTitle>
                    <ProfileContent>@ {accountname}</ProfileContent>
                </TextWrap>
                <FollowButton id="FollowBtn" accountname={accountname}>팔로우</FollowButton>
            </FollowItem>
        </>
    )
}

const FollowItem = styled.li`
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
    /* background: red; */
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