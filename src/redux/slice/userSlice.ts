import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(state, "user");
    },
  },
});
export const { setUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
