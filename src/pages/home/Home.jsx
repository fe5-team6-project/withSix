import React from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Common from '../../components/design/main/Common';
import { styled } from 'styled-components';
import divLine from '../../assets/icons/post/div-line.svg';

export default function Home() {
    const page = (
        <>
            <CategoryNav>
                <CategoryButton>전체 글</CategoryButton>
                <DivLine src={divLine} alt="" />
                <CategoryButton>내 글</CategoryButton>
                <DivLine src={divLine} alt="" />
                <CategoryButton>친구 글</CategoryButton>
            </CategoryNav>

            <ul></ul>
        </>
    );

    return (
        <>
            <Header />
            <Common page={''} />
            <Footer />
        </>
    );
}

const CategoryNav = styled.article`
    width: 100%;
    text-align: right;
`;

const CategoryButton = styled.button`
    all: unset;
    font-size: var(--fsize-button-sub);
    color: var(--color-gray);

    &:focus,
    &:hover {
        outline: none;
        color: var(--color-main);
    }
`;

const DivLine = styled.img`
    margin: 10px;
    vertical-align: middle;
`;
