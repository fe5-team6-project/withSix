import React from 'react';
import { styled } from 'styled-components';
import home from '../../assets/icons/nav/home.png';
import together from '../../assets/icons/nav/together.png';
import search from '../../assets/icons/common/icon-search.svg';
import chat from '../../assets/icons/nav/chat.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DEFAULT_IMAGE } from '../../lib/apis/constant/path';

export default function Footer() {
    const user = useSelector((state) => state.user?.myInfo);
    let profileImage = DEFAULT_IMAGE;

    if (user?._id !== '') {
        profileImage = user?.image;
    } // isToken으로 변경

    return (
        <StyledFooter>
            {user?.username !== '' && (
                <Ul>
                    <li>
                        <Link to={'/home'}>
                            <img src={home} alt="홈 아이콘" />
                            <span>홈</span>
                        </Link>
                    </li>

                    <li>
                        <Link to={`/together/${user?.accountname}`}>
                            <img src={together} alt="모임 아이콘" />
                            <span>모임</span>
                        </Link>
                    </li>

                    <li>
                        <Link to={'/search'}>
                            <img src={search} alt="검색 아이콘" />
                            <span>검색</span>
                        </Link>
                    </li>

                    <li>
                        <Link to={'/chat'}>
                            <img src={chat} alt="채팅 아이콘" />
                            <span>채팅</span>
                        </Link>
                    </li>

                    {
                        <li>
                            <Link to={'/myprofile'}>
                                <ImageWrap>
                                    <img src={profileImage} alt="" />
                                </ImageWrap>
                            </Link>
                        </li>
                    }
                </Ul>
            )}
        </StyledFooter>
    );
}

const StyledFooter = styled.footer`
    position: fixed;
    bottom: 0;
    left: 50%;
    width: 100vw;
    height: 50px;
    padding: 5px;
    background-color: white;
    border-top: 2px solid var(--color-disabled);
    box-sizing: border-box;
    transform: translate(-50%);
`;

const Ul = styled.ul`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: var(--cont-width-max);
    margin: 0 auto;
    padding: 0 10px;

    & > li {
        width: 50px;
        height: 50px;
        text-align: center;
        line-height: 50px;
    }

    & > li > a {
        display: block;
        width: 50px;
    }

    & > li img {
        width: 25px;
    }

    & > li:nth-child(5) img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    & > li span {
        display: inline-block;
        width: 30px;
        font-size: var(--fsize-s);
    }
`;
const ImageWrap = styled.div`
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 1px solid var(--color-back);
    box-sizing: border-box;
    overflow: hidden;
`;
