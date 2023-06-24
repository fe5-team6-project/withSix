import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Common from '../../components/main/Common';
import Post from '../../components/post/Post';
import getPost from './getPost';
import { styled } from 'styled-components';
import divLine from '../../assets/icons/post/div-line.svg';
import write from '../../assets/icons/common/icon-write.svg';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [postList, setPostList] = useState([]);
    const [category, setCategory] = useState('');
    const [pages, setPages] = useState(10);
    const user = useSelector((state) => state.user?.myInfo);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            setPostList(await getPost(category, user?.accountname, pages));
        }

        fetchData();
    }, [category, pages]);

    const page = (
        <>
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

            <ul>
                {!postList
                    ? []
                    : postList.map((item, idx) => {
                          return postList.length - 1 !== idx ? (
                              <Post key={item?._id || item?.id} item={item} />
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

            <WriteButton
                type="button"
                onClick={() => navigate('../post/upload')}
            >
                <img src={write} alt="글쓰기" />
            </WriteButton>
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

const WriteButton = styled.button`
    position: fixed;
    bottom: 70px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: var(--fsize-s);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    & > img {
        width: 25px;
        height: 25px;
        vertical-align: middle;
        object-position: 50% 50%;
    }
`;
