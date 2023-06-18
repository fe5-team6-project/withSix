import React, { useEffect, useState } from 'react';
import Common from '../../components/main/Common';
import { styled } from 'styled-components';
import divLine from '../../assets/icons/post/div-line.svg';
import Post from '../../components/post/Post';
import { useSelector } from 'react-redux';

export default function Home() {
    const [postList, setPostList] = useState([]);
    const [category, setCategory] = useState('');
    const user = useSelector((state) => state.user.myInfo);
    console.log(user.accountname);

    useEffect(() => {
        async function fetchData() {
            setPostList(await getPost(category, user.username));
        }

        fetchData();
    }, [category]);

    const page = (
        <>
            <CategoryNav>
                <CategoryButton
                    onClick={() => {
                        setCategory('');
                    }}
                >
                    전체 글
                </CategoryButton>
                <DivLine src={divLine} alt="" />
                <CategoryButton
                    onClick={() => {
                        console.log(1);
                        setCategory('my');
                    }}
                >
                    내 글
                </CategoryButton>
                <DivLine src={divLine} alt="" />
                <CategoryButton
                    onClick={() => {
                        setCategory('feed');
                    }}
                >
                    친구 글
                </CategoryButton>
            </CategoryNav>

            <ul>
                {!postList
                    ? []
                    : postList.map((item) => {
                          return <Post key={item._id} item={item} />;
                      })}
            </ul>
        </>
    );

    return (
        <>
            <Common page={page} />
        </>
    );
}

const URL = 'https://api.mandarin.weniv.co.kr';

async function getPost(category, accountname) {
    console.log(accountname);
    let requestPath = '/post';
    const type = category;

    if (type === '') {
        requestPath = '/post';
    } else if (type === 'my') {
        requestPath = `/post/${accountname}/userpost`;
    } else if (type === 'feed') {
        requestPath = '/post/feed';
    }

    const requestUrl = `${URL}${requestPath}`;

    const token = localStorage.token;
    const bearerToken = `Bearer ${token}`;

    console.log(requestUrl);
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

    return postList;
}

const CategoryNav = styled.article`
    position: sticky;
    top: 10px;
    width: 100%;
    margin: 10px 0;
    height: 20px;
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
