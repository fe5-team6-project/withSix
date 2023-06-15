import { configureStore } from "@reduxjs/toolkit";
import { example } from "./slices/exampleSlice";

export default configureStore({
  reducer: {
    example: example.reducer
  }
})