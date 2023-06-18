// import React, { useState, useEffect } from 'react'
import { styled } from 'styled-components'
// import HandleFollow from './HandleFollow'
import { api } from '../../lib/apis/axiosConfig'
import { useSelector } from 'react-redux';

export default function FollowButton() {
    const myinfo = useSelector((state) => { return state.user.myInfo })
    const follow = async () => {
        try {
            const res = await api.post(`/profile/test999/follow`, []);
            // setIsFollow(res.data.profile.isfollow);
            console.log(res)
        } catch (error) {
            console.log(error.res);
        }
    };
    console.log(myinfo)

    return (
        // <StyledButton onClick={HandleFollow}>Follow</StyledButton>
        <FollowUnButton id="FollowBtn" onClick={follow}>yaho~!</FollowUnButton>
    )
}

const FollowUnButton = styled.button`
    &#FollowBtn{
        width:100%;
    }
`
