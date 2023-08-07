import { createSlice, current } from "@reduxjs/toolkit";
import produce from "immer"; // Import thư viện immer
import { isArray } from "util";
import { CartItemType } from "../../pages/UserCart/CartItem";

const initialState: CartStateType = {
  items: [],
};
export interface ReduxCartItemType {
  id?: string;
  quantity?: number;
  price?: number;
  product_id?: number;
}
type Action = {
  payload: CartItemType[];
  type: string;
};
interface CartStateType {
  items: CartItemType[];
}
export const cartSlice = createSlice({
  name: "carts",
  initialState: initialState,
  reducers: {
    addCartItem: (state: CartStateType, action: Action) => {
      state.items = [...state.items, ...action.payload];
    },
    resetCart: (state) => {
      state.items = [];
    },
  },
});
export const { addCartItem, resetCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
