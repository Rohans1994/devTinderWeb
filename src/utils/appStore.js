import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Adjust the import path as necessary
const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
