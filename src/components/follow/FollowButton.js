// import React, { useState, useEffect } from 'react'
import { styled } from 'styled-components'
// import HandleFollow from './HandleFollow'
import { api } from '../../lib/apis/axiosConfig'
import { useDispatch, useSelector } from 'react-redux';

export default function FollowButton() {
    //받아오는 유저정보의 accountname 넣어서 follow
    const userInfo = useSelector((state) => { return state.user.myInfo })
    // const dispatch = useDispatch();
    const follow = async () => {
        try {
            //임시로 ${userInfo.accountname}대신에 test999
            const res = await api.post(`/profile/test999/follow`, []);
            // const res = await api.post(`/profile/${userInfo.accountname}/follow`, []);
            //리덕스 상태 업로드 setUserInfo 변경함수 이용하여 응답내용 집어넣기
            // dispatch(setUserInfo(res.data.profile));
            console.log(res)
        } catch (error) {
            console.log(error.res);
        }
    };
    console.log(userInfo)

    return (
        // <StyledButton onClick={HandleFollow}>Follow</StyledButton>
        <FollowUnButton id="FollowBtn" onClick={follow}>팔로우</FollowUnButton>
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
