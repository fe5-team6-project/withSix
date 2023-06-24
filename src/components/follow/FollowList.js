import React from 'react'
import { useNavigate } from 'react-router-dom';
import FollowButton from '../../components/follow/FollowButton';
import { styled } from 'styled-components';
import getUserProfile from '../../pages/userprofile/getUserProfile';
import { setUserInfo } from '../../store/slices/userSlice';
import { useDispatch } from 'react-redux';

export default function FollowList({ accountname, username, intro, image, isfollow }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function setUser() {
        const user = await getUserProfile(accountname);
        dispatch(setUserInfo(user));
    }

    return (
        <>
            <FollowItem>
                <ProfileWrap onClick={async (e) => { e.stopPropagation(); await setUser(); navigate(`../profile/${accountname}`); }} >
                    <ProfileImg src={image} />
                    <TextWrap>
                        <ProfileTitle>{username}</ProfileTitle>
                        <ProfileContent>@ {accountname}</ProfileContent>
                    </TextWrap>
                </ProfileWrap>
                <FollowButton id="FollowBtn" accountname={accountname} isfollow={isfollow}></FollowButton>
            </FollowItem>
        </>
    )
}

const FollowItem = styled.li`
    background: #fff;
    display:flex;
    align-items: center;
    &>button{
        width:58px;
        height: 28px;
        font-size: var(--fsize-s);
        font-weight: lighter;
    }
    `
const ProfileWrap = styled.div`
    width:100%;
    height:50px;
    display:flex;
    align-items: center;
    cursor: pointer;
    gap:14px;
    justify-content: space-between;
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
