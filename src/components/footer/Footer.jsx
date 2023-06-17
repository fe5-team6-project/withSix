import React from "react";
import { styled } from "styled-components";
import home from "../../assets/nav/home.png";
import together from "../../assets/nav/together.png";
import review from "../../assets/nav/review.png";
import chat from "../../assets/nav/chat.png";

export default function Footer() {
    return (
        <StyledFooter>
            <Ul>
                <li>
                    <a href="#">
                        <img src={home} alt="홈 아이콘" />
                        <span>홈</span>
                    </a>
                </li>

                <li>
                    <a href="#">
                        <img src={together} alt="모임 아이콘" />
                        <span>모임</span>
                    </a>
                </li>

                <li>
                    <a href="#">
                        <img src={review} alt="후기 아이콘" />
                        <span>후기</span>
                    </a>
                </li>

                <li>
                    <a href="#">
                        <img src={chat} alt="채팅 아이콘" />
                        <span>채팅</span>
                    </a>
                </li>

                <li>
                    <a href="#">
                        <img src={home} alt="" />
                    </a>
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
    background-color: white;
    border: 1px solid var(--color-main);
    border-bottom: none;
    border-top-left-radius: var(--radius-header);
    border-top-right-radius: var(--radius-header);
    transform: translate(-50%);
`;

const Ul = styled.ul`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;

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

    & > li span {
        display: block;
        width: 30px;
        font-size: 12px;
    }
`;
