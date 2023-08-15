import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    keyword: "",
  },
  reducers: {
    setKeyWord: (state, action) => {
      state.keyword = action.payload;
    },
  },
});

export const { setKeyWord } = productSlice.actions;
export const productReducer = productSlice.reducer;
