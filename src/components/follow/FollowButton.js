// import React, { useState, useEffect } from 'react'
import { styled } from 'styled-components'
// import HandleFollow from './HandleFollow'
import { api } from '../../lib/apis/axiosConfig'
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

export default function FollowButton() {
    //받아오는 유저정보의 accountname 넣어서 follow
    const userInfo = useSelector((state) => { return state.user.myInfo })
    // const dispatch = useDispatch();

    //user정보 받아온 걸로 넣어놓기 / 지금은 아직 연결이 안되어서 임시로 useState사용
    const [isFollow, setIsFollow] = useState(true);

    const follow = async () => {
        try {
            //임시로 ${userInfo.accountname}대신에 test999
            const res = await api.post(`/profile/test999/follow`, []);
            // const res = await api.post(`/profile/${userInfo.accountname}/follow`, []);
            //리덕스 상태 업로드 setUserInfo 변경함수 이용하여 응답내용 집어넣기
            // dispatch(setUserInfo(res.data.profile));
            console.log(res);
            //useState에 isfollow 현재 정보 업데이트 > 팔로우 한 것이면 버튼에 언팔로우 출력
            setIsFollow(res.data.profile.isfollow);
            console.log(isFollow)
        } catch (error) {
            console.log(error.res);
        }
    };
    // console.log(userInfo)



    //팔로우 상태이면 : 버튼에 '언팔로우'뜨기 +(버튼누르기)> 언팔로우 처리 + '팔로우'로 버튼 변경
    const handleFollow = async () => {

        //isFollow정보 받아와서 처리해야하는데 지금 userInfo 관리 안되고있어서 임시로 true넣어놓기 = isfollow값 받아왔을때 true
        if (true) {
            await api.delete(`/profile/test999/unfollow`, [])
                .then((res) => {
                    console.log(res);
                    setIsFollow(res.data.profile.isfollow);
                })
                .then(() => {
                    console.log(isFollow);
                });
            // setIsFollow(res.data.profile.isfollow);
            // console.log(res.data.profile.isfollow)
            // console.log(isFollow);
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
