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
import {
    PostItemProps,
    UserInfoProps,
} from '../../lib/utils/interface/interface';

let skip = 0;
type CategoryType = 'category' | 'skip';

export default function Home() {
    const [postList, setPostList] = useState<PostItemProps['item'][]>([]);
    const [category, setCategory] = useState('feed');
    const [hasNextPage, setHasNextPage] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    // const [skip, setSkip] = useState(0);
    const { ref, inView } = useInView();

    const user = useSelector((state: UserInfoProps) => state.user?.myInfo);
    const id = useParams().id!;
    const isMyPost = id ? false : true;
    const isSplash = true;

    const handleSkip = (type: CategoryType) => {
        if (type === 'category') {
            // setSkip(0);
            skip = 0;
        } else if (type === 'skip') {
            setIsLoading(true);
            // setSkip((prev) => prev + 10);
            skip += 10;
        }
    };

    async function fetchData(type: CategoryType) {
        let newPost = [];

        handleSkip(type);

        if (isMyPost) {
            newPost = await getPost({
                category: category,
                accountname: user?.accountname,
                skip: skip,
                isMyPost: isMyPost,
            });
        } else {
            newPost = await getPost({
                category: '',
                accountname: id,
                skip: skip,
                isMyPost: isMyPost,
            });
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
                    postList.map((props, idx) => {
                        console.log(props);
                        const key = Math.random();
                        return postList.length - 1 !== idx ? (
                            <Post key={key} {...props} />
                        ) : (
                            <>
                                <Post key={key} {...props} />
                                {hasNextPage && (
                                    <>
                                        {isLoading && (
                                            <Loading>Loading...</Loading>
                                        )}
                                        <RefDiv ref={ref}></RefDiv>
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
