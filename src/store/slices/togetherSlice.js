import { createSlice } from "@reduxjs/toolkit";

const together = createSlice({
    name: 'together',
    initialState: {
        "itemName": String,
        "price": Number,
        "link": String,
        "itemImage": ''
    },
    reducers: {
        inputTogether(state, actions) {
            const { itemName, price, link, itemImage } = actions.payload;
            if (itemName) state.itemName = itemName;
            if (price) state.price = price;
            if (link) state.link = link;
            if (itemImage) state.itemImage = itemImage;
        }
    }
})

export const { inputTogether } = together.actions;
export { together };
