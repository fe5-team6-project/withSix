import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Common from '../../components/main/Common';
import Post from '../post/Post';
import getPost from './getPost';
import { styled } from 'styled-components';
import divLine from '../../assets/icons/post/div-line.svg';
import WriteButton from '../../components/writebutton/WriteButton';
import EmptyData from '../../components/common/EmptyData';
import { useParams } from 'react-router-dom';

export default function Home() {
    const [postList, setPostList] = useState([]);
    const [category, setCategory] = useState('');
    const [skip, setSkip] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(true);
    const user = useSelector((state) => state.user?.myInfo);
    const id = useParams().id;

    const [isMyPost, setIsMyPost] = useState(id ? false : true);
    console.log(isMyPost);

    useEffect(() => {
        async function fetchData() {
            let newPost = [];
            if (isMyPost) {
                newPost = await getPost(
                    category,
                    user?.accountname,
                    skip,
                    isMyPost
                );
            } else {
                newPost = await getPost('', id, skip, isMyPost);
            }
            console.log(newPost);
            setPostList([...newPost]);

            newPost.length >= 10 ? setHasNextPage(true) : setHasNextPage(false);
        }

        fetchData();
    }, [category]);

    useEffect(() => {
        async function fetchData() {
            let newPost = [];
            if (isMyPost) {
                newPost = await getPost(
                    category,
                    user?.accountname,
                    skip,
                    isMyPost
                );
            } else {
                newPost = await getPost('', id, skip, isMyPost);
            }
            setPostList([...postList, ...newPost]);
            console.log(newPost);

            newPost.length >= 10 ? setHasNextPage(true) : setHasNextPage(false);
        }

        fetchData();
    }, [skip]);

    const page = (
        <>
            {isMyPost && (
                <CategoryMenu>
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
                </CategoryMenu>
            )}

            <ul>
                {postList.length ? (
                    postList.map((item, idx) => {
                        return postList.length - 1 !== idx ? (
                            <Post key={item?._id || item?.id} item={item} />
                        ) : (
                            <>
                                <Post key={item?._id} item={item} />
                                {hasNextPage && (
                                    <MoreButton
                                        onClick={() =>
                                            setSkip((skip) => skip + 10)
                                        }
                                    >
                                        더보기
                                    </MoreButton>
                                )}
                            </>
                        );
                    })
                ) : (
                    <EmptyData url={'../post/upload'} />
                )}
            </ul>

            <WriteButton url={'../post/upload'} />
        </>
    );

    return (
        <>
            <Common page={page} />
        </>
    );
}

const CategoryMenu = styled.article`
    position: sticky;
    top: 0px;
    width: 390px;
    height: 40px;
    margin: 0 auto;
    padding: 10px 20px 0 0;
    box-sizing: border-box;
    background-color: var(--color-back);
    text-align: right;
    z-index: 2;
`;

const CategoryButton = styled.button`
    all: unset;
    font-size: var(--fsize-m);
    color: var(--color-gray);
    cursor: pointer;

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

const MoreButton = styled.button`
    all: unset;
    display: block;
    width: 100px;
    height: 20px;
    margin: 0 auto 20px;
    border-radius: var(--radius-m);
    font-size: var(--fsize-m);
    text-align: center;
    cursor: pointer;
`;
