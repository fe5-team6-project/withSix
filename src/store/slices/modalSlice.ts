import { createSlice } from '@reduxjs/toolkit';

const modal = createSlice({
    name: 'modal',
    initialState: {
        content: {
            state: false,
            message: '',
            url: '',
        },

        display: {
            isVisible: false,
        },

        url: {
            path: '',
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
