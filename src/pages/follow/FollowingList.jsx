import React, { useEffect, useState } from 'react'
import Common from '../../components/main/Common';
import { styled } from "styled-components";
import FollowList from '../../components/follow/FollowList';
import { api } from '../../lib/apis/axiosConfig';
import { useParams } from 'react-router-dom';

export default function Following() {
    const [followList, setFollowList] = useState([]);
    const accountName = useParams().accountname;
    const [pages, setPages] = useState(10);
    const FollowingList = async () => {
        const res = await api.get(`profile/${accountName}/following`);
        console.log(res.data);
        const data = res.data
        setFollowList([...data]);
    }

    useEffect(() => {
        FollowingList();
    }, [pages])

    const page = (
        <>
            <Main>
                <FollowWrap>
                    <FollowList></FollowList>
                </FollowWrap>
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