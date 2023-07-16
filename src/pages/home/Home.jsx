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
import { useInView } from 'react-intersection-observer';

let skip = 0;

export default function Home() {
    const [postList, setPostList] = useState([]);
    const [category, setCategory] = useState('feed');
    // const [skip, setSkip] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(true);
    const user = useSelector((state) => state.user?.myInfo);
    const id = useParams().id;

    const [isMyPost, setIsMyPost] = useState(id ? false : true);
    const [isSplash, setIsSplash] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const { ref, inView } = useInView();

    const handleSkip = (type) => {
        if (type === 'category') {
            skip = 0;
        } else if (type === 'skip') {
            setIsLoading(true);
            skip += 10;
        }
    };

    async function fetchData(type) {
        let newPost = [];

        handleSkip(type);

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

        if (type === 'category') {
            setPostList([...newPost]);
        } else if (type === 'skip') {
            setPostList([...postList, ...newPost]);
            setIsLoading(false);
        }

        newPost.length >= 10 ? setHasNextPage(true) : setHasNextPage(false);
    }

    useEffect(() => {
        fetchData('category');
    }, [category]);

    useEffect(() => {
        inView && fetchData('skip');
    }, [inView]);

    const page = (
        <>
            <CategoryMenu>
                {/* <CategoryButton
                        onClick={() => {
                            setCategory('');
                        }}
                    >
                        전체 글
                    </CategoryButton>
                    <DivLine src={divLine} alt="" /> */}
                <CategoryButton
                    onClick={() => {
                        setCategory('feed');
                    }}
                >
                    친구 글
                </CategoryButton>
                <DivLine src={divLine} alt="" />
                <CategoryButton
                    onClick={() => {
                        setCategory('my');
                    }}
                >
                    내 글
                </CategoryButton>
            </CategoryMenu>

            <PostList>
                {postList.length ? (
                    postList.map((item, idx) => {
                        const key = Math.random();
                        return postList.length - 1 !== idx ? (
                            <Post key={key} item={item} />
                        ) : (
                            <>
                                <Post key={key} item={item} />
                                {hasNextPage && (
                                    <>
                                        {isLoading && (
                                            <Loading>Loading...</Loading>
                                        )}
                                        <RefDiv ref={ref}></RefDiv>
                                        {/* <MoreButton
                                            onClick={() =>
                                                setSkip((skip) => skip + 10)
                                            }
                                        >
                                            더보기
                                        </MoreButton> */}
                                    </>
                                )}
                            </>
                        );
                    })
                ) : (
                    <EmptyData url={'../post/upload'} />
                )}
            </PostList>

            <WriteButton url={'../post/upload'} />
        </>
    );

    return (
        <>
            <Common page={page} isSplash={isSplash} />
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

const PostList = styled.ul`
    height: calc(100vh - 170px);
    overflow-y: auto;
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

const RefDiv = styled.div`
    width: 100%;
    height: 10px;
    margin-bottom: 20px;
`;

const Loading = styled.span`
    display: block;
    width: 200px;
    margin: 0 auto;
    font-family: var(--font-eng);
    font-size: var(--fsize-s);
    font-style: italic;
    text-align: center;
    color: var(--color-black);
`;
