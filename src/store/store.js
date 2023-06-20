import { configureStore } from '@reduxjs/toolkit';
import { user } from './slices/userSlice';
import { together } from './slices/togetherSlice';

export default configureStore({
    reducer: {
        user: user.reducer,
        together: together.reducer
    },
});
