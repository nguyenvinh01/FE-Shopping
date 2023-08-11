import { createSlice, current } from "@reduxjs/toolkit";
import { User } from "../../interface/interface";
import Cookies from "js-cookie";

const initialState: InitialStateType = {
  user: {
    id: "",
    email: "",
    fullname: "",
    address: "",
    phone: "",
    role: 0,
    image_url: "",
  },
};
export interface InitialStateType {
  user: User;
}
const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      console.log(action.payload, state, "user");
    },
    resetUser: (state, action) => {
      state.user = action.payload;
      localStorage.clear();
      // Cookies.set("RefreshToken", "");
    },
  },
});
export const { setUser, resetUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
