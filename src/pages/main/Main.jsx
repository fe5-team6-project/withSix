import React from 'react';
import logo from '../../assets/logo/LOGO-full-negative.svg';
import { styled } from 'styled-components';
import Login from '../login/Login';
import { useNavigate } from 'react-router-dom';
import checkToken from '../login/checkToken';

export default function Main() {
    const navigate = useNavigate();

    if (checkToken()) {
        navigate('/home');
    }

    return (
        <>
            <Header>
                <h1>
                    <img src={logo} alt="로고" />
                </h1>
            </Header>

            <Login />
        </>
    );
}

const Header = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 550px;
    box-sizing: border-box;
    background-color: var(--color-main);
    border-bottom-left-radius: var(--radius-header);
    border-bottom-right-radius: var(--radius-header);
`;
