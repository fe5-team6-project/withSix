// import React, { useState, useEffect } from 'react'
import { styled } from 'styled-components'
// import HandleFollow from './HandleFollow'
import { api } from '../../lib/apis/axiosConfig'
import { useState } from 'react';

export default function FollowButton({ accountname }) {
    const [isFollow, setIsFollow] = useState(true);
    //팔로우 상태이면 : 버튼에 '언팔로우'뜨기 +(버튼누르기)> 언팔로우 처리 + '팔로우'로 버튼 변경
    const handleFollow = async () => {
        if (isFollow) {
            await api.delete(`/profile/${accountname}/unfollow`, [])
                .then((res) => {
                    console.log(res);
                    setIsFollow(res.data.profile.isfollow);
                })
                .then(() => {
                    console.log(isFollow);
                });
        } else {
            await api.post(`profile/${accountname}/follow`, [])
                .then((res) => {
                    console.log(res);
                    setIsFollow(res.data.profile.isfollow);
                })
                .then(() => {
                    console.log(isFollow);
                })
        }
    }


    return (
        // <StyledButton onClick={HandleFollow}>Follow</StyledButton>
        // <FollowUnButton id="FollowBtn" onClick={follow}>팔로우</FollowUnButton>
        <FollowUnButton id="FollowBtn" onClick={handleFollow}>
            {isFollow ? '언팔로우' : '팔로우'}
        </FollowUnButton>
    )
}

const FollowUnButton = styled.button`
    &#FollowBtn{
        width:58px;
        height: 28px;
        font-size: var(--fsize-s);
        font-weight: lighter;
    }
`
