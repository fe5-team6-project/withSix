import { createSlice } from "@reduxjs/toolkit";

const together = createSlice({
    name: 'together',
    initialState: {
        req: {
            "itemName": '',
            "price": 0,
            "link": '',
            "itemImage": ''
        },
        together: {
            "id": '',
            "itemName": '',
            "price": 0,
            "link": '',
            "itemImage": '',
            "author": {
                "_id": "작성자 id",
                "username": "2",
                "accountname": "2",
                "intro": "2",
                "image": "2",
                "following": [],
                "follower": [
                    "팔로워 한 사용자의 id"
                ],
                "followerCount": 1,
                "followingCount": 0
            }
        },
        detail: {
            "id": '',
            "itemName": '',
            "price": 0,
            "link": '',
            "itemImage": '',
        }
    },
    reducers: {
        inputTogether(state, actions) {
            const { itemName, price, link, itemImage } = actions.payload;
            if (itemName) state.req.itemName = itemName;
            if (price) state.req.price = parseInt(price);
            if (link) state.req.link = link;
            if (itemImage) state.req.itemImage = itemImage;
        },
        changeDetail(state, actions) {
            const { id, itemName, price, link, itemImage } = actions.payload;
            if (id) state.detail.id = id;
            if (itemName) state.detail.itemName = itemName;
            if (price) state.detail.price = price;
            if (link) state.detail.link = link;
            if (itemImage) state.detail.itemImage = itemImage;
        }
    }
})

export const { inputTogether, changeDetail } = together.actions;
export { together };
