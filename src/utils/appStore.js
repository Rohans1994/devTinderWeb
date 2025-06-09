import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Adjust the import path as necessary
import feedReducer from "./feedSlice"; // Adjust the import path as necessary
import requestsReducer from "./requestsSlice"; // Adjust the import path as necessary
const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    requests: requestsReducer,
  },
});

export default store;
