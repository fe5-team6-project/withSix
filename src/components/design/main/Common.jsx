import React from 'react';
import Header from '../../header/Header';
import Footer from '../../footer/Footer';
import { styled } from 'styled-components';

export default function Common(props) {
    return (
        <>
            <Header />
            <StyledMain>
                {props.title ? (
                    <TitleWrap>
                        <H2>{props.title}</H2>
                        <Span>{props.desc}</Span>
                    </TitleWrap>
                ) : null}
                {props.page}
            </StyledMain>
            <Footer />
        </>
    );
}

const StyledMain = styled.main`
    position: relative;
    width: 100%;
    max-width: 900px;
    max-height: calc(100vh - 120px);
    margin: 70px auto 50px;
    padding: 0 10px;
    box-sizing: border-box;
    overflow-y: auto;
`;

const TitleWrap = styled.section`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
`;

const H2 = styled.h2`
    width: 100%;
    height: 30px;
    margin-top: 50px;
    text-align: center;
    font-size: var(--fsize-title);
`;
const Span = styled.span`
    display: block;
    width: 100%;
    height: 20px;
    text-align: center;
    font-size: var(--fsize-s);
`;
