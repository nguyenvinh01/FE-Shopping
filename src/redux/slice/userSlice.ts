import { createSlice, current } from "@reduxjs/toolkit";
import { User } from "../../interface/interface";
// import Cookies from "js-cookie";

const initialState: User = {
  id: "",
  email: "",
  fullname: "",
  address: "",
  phone: "",
  role: 0,
  image_url: "",
};
export interface InitialStateType {
  success: boolean;
  data: User;
}
const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state = Object.assign(state, action.payload);
    },
    resetUser: (state = initialState, action) => {
      state = Object.assign(state, initialState);
    },
  },
});
export const { setUser, resetUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
