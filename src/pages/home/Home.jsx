import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Common from '../../components/design/main/Common';
import { styled } from 'styled-components';
import divLine from '../../assets/icons/post/div-line.svg';

export default function Home() {
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            setPostList(await getPost());
        }

        fetchData();
    }, []);

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

const URL = 'https://api.mandarin.weniv.co.kr';

async function getPost() {
    let requestPath = '/post';

    const requestUrl = `${URL}${requestPath}`;

    const token = localStorage.token;
    const bearerToken = `Bearer ${token}`;

    const response = await fetch(requestUrl, {
        method: 'GET',
        headers: {
            Authorization: bearerToken,
            'Content-type': 'application/json',
        },
        body: JSON.stringify(),
    });

    const json = await response.json();
    const postList = json.posts;
    console.log(postList);

    return postList;
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
