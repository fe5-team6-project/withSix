import React from 'react';
import logo from '../../assets/logo/LOGO-full-negative.svg';
import { keyframes, styled } from 'styled-components';

export default function Splash() {
    return (
        <SplashBack>
            <h2 className="a11y-hidden">스플래쉬 화면</h2>
            <Logo src={logo} alt="로고" />
        </SplashBack>
    );
}

const opacityAnimation = keyframes`
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }

`;

const hideAnimation = keyframes`
    0%{
        transform : scale(100%);
    }

    100%{
        transform: scale(0%);
    }
`;

const Logo = styled.img`
    animation: ${hideAnimation} 0.3s ease-in-out forwards;
    animation-delay: 0.3s;
`;

const SplashBack = styled.article`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: var(--color-main);
    z-index: 999;
    opacity: 1;
    animation: ${opacityAnimation} 0.3s ease-in-out forwards;
    animation-delay: 0.3s;
`;
