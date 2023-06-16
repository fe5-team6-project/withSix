import { createSlice } from "@reduxjs/toolkit";

const example = createSlice({
  name: 'example',
  initialState: {
    "example": 3
  },
  reducers: {
    exampleChange(state, actions) {
      state.example = actions.payload
    }
  }
})

export const { exampleChange } = example.actions;
export { example };

