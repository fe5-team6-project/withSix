import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
    name: 'user',
    initialState: {
        myInfo: {
            _id: '',
            username: '',
            isfollow: false,
            intro: '',
            image: '',
            followingCount: 0,
            following: [],
            followerCount: 0,
            follower: [],
            accountname: '',
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
            followerCount: 0,
            followingCount: 0,
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
