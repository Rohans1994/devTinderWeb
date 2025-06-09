import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    setFeed: (state, action) => {
      return action.payload;
    },
    clearFeed: (state) => {
      return null;
    },
    clearFeedById: (state, action) => {
      return state.filter((user) => user._id !== action.payload);
    },
  },
});

export const { setFeed, clearFeed, clearFeedById } = feedSlice.actions;
export default feedSlice.reducer;
