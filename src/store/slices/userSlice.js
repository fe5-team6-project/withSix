import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
    name: 'user',
    initialState: {
        myInfo: {
            _id: String,
            username: String,
            isfollow: false,
            intro: String,
            image: String,
            followingCount: Number,
            following: Array,
            followerCount: Number,
            follower: Array,
            accountname: String,
        },
        
        userInfo: {
            _id: String,
            username: String,
            accountname: String,
            intro: String,
            image: String,
            isfollow: Boolean,
            following: [],
            follower: [],
            followerCount: Number,
            followingCount: Number
        }
        
    },
    reducers: {
        setMyInfo(state, action) {
            state.myInfo = action.payload;
        },

        setSearchInfo(state, action) {
            state.searchInfo = action.payload;
        }
    },
});

export const { setSearchInfo, setMyInfo } = user.actions;
export { user };
