import React, { useEffect, useState } from 'react';
import Common from '../../components/main/Common';
import { styled } from 'styled-components';
import divLine from '../../assets/icons/post/div-line.svg';
import Post from '../../components/post/Post';
import { useSelector } from 'react-redux';
import getPost from './getPost';

export default function Home() {
    const [postList, setPostList] = useState([]);
    const [category, setCategory] = useState('');
    const user = useSelector((state) => state.user.myInfo);

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
