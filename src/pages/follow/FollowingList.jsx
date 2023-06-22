import React from 'react'
import Common from '../../components/main/Common';
import { styled } from "styled-components";
import FollowList from '../../components/follow/FollowList';
import { api } from '../../lib/apis/axiosConfig';
import { useParams } from 'react-router-dom';

export default function Following() {
    const accountName = useParams().accountname;
    const FollowingList = async () => {
        const res = api.get(`profile/${accountName}/following`);
        console.log(res);
    }
    const page = (
        <>
            <Main>
                <FollowWrap><p onClick={FollowingList}>click</p>
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