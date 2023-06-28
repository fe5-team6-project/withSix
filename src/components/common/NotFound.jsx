import React from 'react';
import { styled } from 'styled-components';
import notfound from '../../assets/images/common/404페이지.png';

export default function NotFound() {
    return (
        <PageCover>
            <img src={notfound} alt="" />
        </PageCover>
    );
}

const PageCover = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: white;
    z-index: 2;

    & > img {
        width: 100%;
    }
`;
