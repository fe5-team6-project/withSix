import { createSlice } from "@reduxjs/toolkit";

const together = createSlice({
    name: 'together',
    initialState: {
        req: {
            "itemName": String,
            "price": Number,
            "link": String,
            "itemImage": ''
        },
        together: {
            "id": String,
            "itemName": String,
            "price": Number,
            "link": String,
            "itemImage": String,
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
        }
    },
    reducers: {
        inputTogether(state, actions) {
            const { itemName, price, link, itemImage } = actions.payload;
            if (itemName) state.req.itemName = itemName;
            if (price) state.req.price = parseInt(price);
            if (link) state.req.link = link;
            if (itemImage) state.req.itemImage = itemImage;
        }
    }
})

export const { inputTogether } = together.actions;
export { together };
