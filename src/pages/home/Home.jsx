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
    const [pages, setPages] = useState(10);
    const user = useSelector((state) => state.user?.myInfo);

    useEffect(() => {
        async function fetchData() {
            setPostList(await getPost(category, user?.accountname, pages));
        }

        fetchData();
    }, [category, pages]);

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
                    : postList.map((item, idx) => {
                          return postList.length - 1 !== idx ? (
                              <Post key={item?._id} item={item} />
                          ) : (
                              <>
                                  <Post key={item?._id} item={item} />
                                  <MoreButton
                                      onClick={() =>
                                          setPages((pages) => pages + 10)
                                      }
                                  >
                                      더보기
                                  </MoreButton>
                              </>
                          );
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
    top: 0px;
    width: 390px;
    height: 40px;
    margin: 0 auto;
    padding: 10px 20px 0 0;
    box-sizing: border-box;
    background-color: var(--color-back);
    text-align: right;
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
