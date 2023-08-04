import { createSlice } from "@reduxjs/toolkit";
const initialState: CartStateType[] = [
  //   { items: { id: "string", quantity: 2323, price: 234 } },
  { items: { id: "string", quantity: 2323, price: 234 } },
  { items: { id: "string", quantity: 2323, price: 234 } },
  { items: { id: "string", quantity: 2323, price: 234 } },
];
interface CartItemType {
  id: string;
  quantity: number;
  price: number;
}
interface CartStateType {
  items: CartItemType;
}
export const cartSlice = createSlice({
  name: "carts",
  initialState: initialState,
  reducers: {},
});

export const cartReducer = cartSlice.reducer;
