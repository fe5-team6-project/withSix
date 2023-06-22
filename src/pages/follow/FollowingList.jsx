import React from 'react'
import Common from '../../components/main/Common';
import { styled } from "styled-components";
import FollowList from '../../components/follow/FollowList';

export default function Following() {
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