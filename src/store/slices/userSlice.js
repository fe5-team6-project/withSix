import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
    name: "user",
    initialState: {
        username: String,
        email: String,
        password: Number,
        accountname: Number,
        intro: String,
        image: String,
    },
    reducers: {
        set,
    },
});
