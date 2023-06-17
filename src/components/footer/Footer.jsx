import React from 'react';
import { styled } from 'styled-components';
import home from '../../assets/icons/nav/home.png';
import together from '../../assets/icons/nav/together.png';
import review from '../../assets/icons/nav/review.png';
import chat from '../../assets/icons/nav/chat.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DEFAULT_IMAGE = 'http://146.56.183.55:5050/Ellipse.png';

export default function Footer() {
    const user = useSelector((state) => state.user.myInfo);
    console.log(user);
    let profileImage = DEFAULT_IMAGE;

    if (user._id !== String) {
        profileImage = user.image;
    } // isToken으로 변경

    return (
        <StyledFooter>
            <Ul>
                <li>
                    <Link to={'/home'}>
                        <img src={home} alt="홈 아이콘" />
                        <span>홈</span>
                    </Link>
                </li>

                <li>
                    <Link to={'/home'}>
                        <img src={together} alt="모임 아이콘" />
                        <span>모임</span>
                    </Link>
                </li>

                <li>
                    <Link to={'/home'}>
                        <img src={review} alt="후기 아이콘" />
                        <span>후기</span>
                    </Link>
                </li>

                <li>
                    <Link to={'/home'}>
                        <img src={chat} alt="채팅 아이콘" />
                        <span>채팅</span>
                    </Link>
                </li>

                <li>
                    <Link to={'/home'}>
                        <img src={profileImage} alt="" />
                    </Link>
                </li>
            </Ul>
        </StyledFooter>
    );
}

const StyledFooter = styled.footer`
    position: fixed;
    bottom: 0;
    left: 50%;
    width: 100%;
    max-width: var(--cont-width-max);
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

    & > li:last-child img {
        width: 35px;
    }

    & > li span {
        display: inline-block;
        width: 30px;
        font-size: var(--fsize-s);
    }
`;
