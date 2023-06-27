import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import iconHeart from '../../assets/icons/post/icon-heart.svg';
import iconHeartFill from '../../assets/icons/post/icon-heart-fill.svg';
import iconComment from '../../assets/icons/post/icon-comment.svg';

import changeHeart from './changeHeart';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../store/slices/userSlice';
import getUserProfile from '../../pages/userprofile/getUserProfile';
import Slick from '../../components/slick';
import {
    emptyProfileImage,
    validationProfileImage,
} from '../../lib/utils/validation/image/validationProfileImage';

export default function Post(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const writer = props.item.author;
    const { item } = props;

    const [heartState, setHeartState] = useState(item?.hearted);
    const [heartCount, setHeartCount] = useState(item?.heartCount);
    const [heartImg, setHeartImg] = useState(
        item?.hearted ? iconHeartFill : iconHeart
    );

    useEffect(() => {
        handleHeart();
    }, [heartState]);

    function checkHeart() {
        if (item?.hearted === undefined) {
            return false;
        }

        return true;
    }

    async function setUser() {
        const user = await getUserProfile(writer.accountname);
        dispatch(setUserInfo(user));
    }

    async function handleHeart() {
        if (!checkHeart()) {
            return false;
        }

        await changeHeart(heartState, item?.id);
        setHeartImg(heartState ? iconHeartFill : iconHeart);
    }

    return (
        <Li
            onClick={(e) => {
                navigate(`/post/detail/${item?.id || item?._id}`);
            }}
        >
            <ProfileWrap>
                <ProfileLeft>
                    <ImgProfile
                        onClick={async (e) => {
                            e.stopPropagation();
                            await setUser();
                            navigate(`../profile/${writer?.accountname}`);
                        }}
                        src={validationProfileImage(writer?.image)}
                        onError={(e) => emptyProfileImage(e)}
                        alt="유저 프로필"
                    />
                </ProfileLeft>
                <ProfileRight>
                    <UserName>{writer?.username}</UserName>
                    <UserId>@ {writer?.accountname}</UserId>
                </ProfileRight>
            </ProfileWrap>
            <ImageWrap onClick={(e) => e.stopPropagation()}>
                {item?.image ? <Slick images={item?.image} /> : null}
            </ImageWrap>
            <ContentWrap>
                <p>{item?.content}</p>
                <span>{}</span>
            </ContentWrap>
            <EtcWrap>
                <img
                    onClick={(e) => {
                        e.stopPropagation();
                        if (!checkHeart()) {
                            // 모달
                            alert(
                                '팔로우한 회원의 글만 좋아요를 누를 수 있습니다.'
                            );
                            return false;
                        }

                        setHeartState(!heartState);
                        setHeartCount((prev) =>
                            heartState ? prev - 1 : prev + 1
                        );
                    }}
                    src={heartImg}
                    alt="좋아요"
                />
                <span>{heartCount}</span>
                <img src={iconComment} alt="댓글" />
                <span>{item?.comments.length}</span>
            </EtcWrap>
        </Li>
    );
}

const Li = styled.li`
    width: 350px;
    margin: 20px auto;
    background-color: white;
    border-radius: var(--radius-m);
    color: var(--color-gray);
    cursor: pointer;
`;

const UserName = styled.strong`
    display: block;
    font-size: var(--fsize-m);
`;

const UserId = styled.span`
    font-family: var(--font-eng);
    font-size: var(--fsize-s);
    font-style: italic;
    color: var(--color-gray);
`;

const SectionDefault = styled.section`
    width: 100%;
    box-sizing: border-box;
`;

const ProfileWrap = styled(SectionDefault)`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 20px;
`;

const ProfileLeft = styled.section`
    width: 30px;
    height: 30px;
    margin-right: 5px;
    border-radius: 50%;
    overflow: hidden;
`;

const ImgProfile = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
    cursor: pointer;
`;

const ProfileRight = styled.section`
    line-height: 12px;
`;

const ImageWrap = styled(SectionDefault)`
    width: 100%;
    /* margin-bottom: -10px; */

    & img {
        width: 350px;
        height: 192px;
        object-fit: cover;
    }

    & .slick-dots button::before {
        transform: translateY(-200%);
    }
`;

const ImgContent = styled.img`
    width: 350px;
    height: 192px;
    object-fit: cover;
`;

const ContentWrap = styled(SectionDefault)`
    display: -webkit-box;
    max-height: 60px;
    padding: 20px;
    font-size: var(--fsize-m);
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
`;

const EtcWrap = styled(SectionDefault)`
    padding: 20px;
    text-align: right;

    & > img {
        width: 12px;
        margin-right: 5px;
        vertical-align: middle;
        &:nth-of-type(1) {
            cursor: pointer;
        }
    }

    & > span {
        font-family: var(--font-eng);
        font-size: 14px;
        font-style: italic;
        color: var(--color-gray);
    }

    & > span:first-of-type {
        margin-right: 5px;
    }
`;
