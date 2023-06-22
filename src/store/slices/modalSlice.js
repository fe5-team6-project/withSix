import { createSlice } from '@reduxjs/toolkit';

const modal = createSlice({
    name: 'modal',
    initialState: {
        content: {
            state: Boolean,
            message: String,
            url: String,
        },

        display: {
            isVisible: false,
        },

        url: {
            path: String,
        },
    },
    reducers: {
        setContent(state, action) {
            state.content = action.payload;
        },

        setIsVisible(state, action) {
            state.display = action.payload;
        },

        setUrl(state, action) {
            state.url = action.payload;
        },
    },
});

export const { setContent, setIsVisible, setUrl } = modal.actions;
export { modal };
