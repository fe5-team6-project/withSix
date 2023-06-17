import React from 'react';
import Header from '../../header/Header';
import Footer from '../../footer/Footer';
import { styled } from 'styled-components';

export default function Common({ page }) {
    return (
        <>
            <StyledMain>{page}</StyledMain>
        </>
    );
}

const StyledMain = styled.main`
    width: 100%;
    max-width: 900px;
    max-height: calc(100vh - 120px);
    margin: 70px auto 50px;
    padding: 0 10px;
    box-sizing: border-box;
    overflow-y: auto;
`;
