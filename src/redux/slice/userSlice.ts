import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
});

export const userReducer = userSlice.reducer;
