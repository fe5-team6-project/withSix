import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import FollowButton from '../../components/follow/FollowButton';
import { styled } from 'styled-components';
import getUserProfile from '../../pages/userprofile/getUserProfile';
import { setUserInfo } from '../../store/slices/userSlice';
import { useDispatch } from 'react-redux';
import { emptyProfileImage, validationProfileImage } from '../../lib/utils/validation/image/validationProfileImage';


export default function FollowList({ accountname, username, image, isfollow }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function setUser() {
        const user = await getUserProfile(accountname);
        dispatch(setUserInfo(user));
    }
    const [isFollow, setIsFollow] = useState(isfollow);//똑딱

    return (
        <>
            <FollowItem>
                <ProfileWrap onClick={async (e) => { e.stopPropagation(); await setUser(); navigate(`../profile/${accountname}`); }} >
                    <ProfileImg src={validationProfileImage(image)}
                        onError={(e) => emptyProfileImage(e)} />
                    <TextWrap>
                        <ProfileTitle>{username}</ProfileTitle>
                        <ProfileContent>@ {accountname}</ProfileContent>
                    </TextWrap>
                </ProfileWrap>
                <div onClick={() => { setIsFollow(!isFollow) }}>
                    <FollowButton id="FollowBtn" accountname={accountname} isfollow={isFollow}></FollowButton>
                </div>
            </FollowItem>
        </>
    )
}

const FollowItem = styled.li`
    background: #fff;
    display:flex;
    align-items: center;
    & button{
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
