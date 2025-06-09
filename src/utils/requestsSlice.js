import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    setRequests: (state, action) => {
      return action.payload;
    },
    clearRequest: (state, action) => {
      const newState = state.filter((req) => req._id !== action.payload);
      return newState;
    },
  },
});

export const { setRequests, clearRequest } = requestSlice.actions;
export default requestSlice.reducer;
