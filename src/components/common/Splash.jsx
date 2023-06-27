import React from 'react';
import logo from '../../assets/logo/LOGO-full-negative.svg';
import { styled } from 'styled-components';

export default function Splash() {
    return (
        <SplashBack>
            <h2 className="a11y-hidden">스플래쉬 화면</h2>
            <img src={logo} alt="로고" />
        </SplashBack>
    );
}

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
`;
