import React, { useEffect, useState } from 'react'
import Common from '../../components/main/Common';
import { styled } from "styled-components";
import FollowList from '../../components/follow/FollowList';
import { api } from '../../lib/apis/axiosConfig';
import { useParams } from 'react-router-dom';

export default function Follower() {
    const [followerList, setFollowerList] = useState([]);
    const accountName = useParams().accountname;
    const [pages, setPages] = useState(10);
    const FollowerList = async () => {
        const res = await api.get(`profile/${accountName}/follower/?limit=${pages}&skip=0`);
        console.log(res.data);
        const data = res.data
        setFollowerList([...data]);
    }

    useEffect(() => {
        FollowerList();
    }, [pages])

    const page = (
        <>
            <Main>
                <FollowWrap>
                    {followerList.map((item) => (
                        <FollowList key={item.id} {...item}></FollowList>
                    ))}
                </FollowWrap>
                <MoreButton onClick={() => setPages((pages) => pages + 5)}>더보기</MoreButton>
            </Main>
        </>
    )

    return (
        <>
            <Common page={page}></Common>
        </>
    )
}

const Main = styled.main`
    margin: 50px 0px;
`

const FollowWrap = styled.ul`
    display:flex;
    flex-direction: column;
    gap:20px;
`

const MoreButton = styled.button`
    all: unset;
    display: block;
    width: 100px;
    height: 20px;
    margin: 20px auto 20px;
    border-radius: var(--radius-m);
    font-size: var(--fsize-m);
    text-align: center;
    cursor: pointer;
`;