import React from "react";
import { styled } from "styled-components";
import logo from "../../assets/logo/LOGO-negative.svg";

export default function Header() {
    return (
        <StyledHeader>
            <H1>
                <Img src={logo} alt="로고" />
            </H1>

            <Article>
                <Strong>아이디</Strong>
            </Article>
        </StyledHeader>
    );
}

const StyledHeader = styled.header`
    position: fixed;
    top: 0;
    left: 50%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: var(--cont-width-max);
    height: 70px;
    background-color: var(--color-main);
    border-bottom-left-radius: var(--radius-header);
    border-bottom-right-radius: var(--radius-header);
    font-size: 0;
    line-height: 70px;
    transform: translateX(-50%);
`;

const H1 = styled.h1`
    display: inline-block;
    width: 50px;
    height: 70px;
`;

const Img = styled.img`
    width: 50px;
    margin: 10px 0 0 10px;
`;

const Article = styled.article`
    display: inline-block;
    width: 200px;
    text-align: right;
`;

const Strong = styled.strong`
    margin-right: 10px;
    font-size: var(--fsize-head);
    color: white;

    &::after {
        content: "님";
        font-weight: 500;
        font-size: var(--fsize-head-sub);
    }
`;
