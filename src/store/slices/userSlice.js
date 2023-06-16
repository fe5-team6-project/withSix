import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
    name: 'user',
    initialState: {
        user: {
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
    },
    reducers: {
        setUser(state, action) {
            console.log(action.payload);
            state.user = action.payload;
        },
    },
});

export const { setUser } = user.actions;
export { user };
