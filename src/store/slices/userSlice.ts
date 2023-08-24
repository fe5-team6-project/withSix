import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
    name: 'user',
    initialState: {
        myInfo: {
            _id: '',
            username: '',
            accountname: '',
            intro: '',
            image: '',
            isfollow: false,
            following: [],
            follower: [],
            followingCount: 0,
            followerCount: 0,
        },

        userInfo: {
            _id: '',
            username: '',
            accountname: '',
            intro: '',
            image: '',
            isfollow: false,
            following: [],
            follower: [],
            followingCount: 0,
            followerCount: 0,
        },
    },
    reducers: {
        setMyInfo(state, action) {
            state.myInfo = action.payload;
        },

        setUserInfo(state, action) {
            state.userInfo = action.payload;
        },
    },
});

export const { setUserInfo, setMyInfo } = user.actions;
export { user };
