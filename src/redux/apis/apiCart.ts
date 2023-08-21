import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API } from "../../shared/Constants/Constants";
import { prepareHeaders } from "../../utility/PrepareHeaders";
import { url } from "inspector";
import { CartResponse } from "../../interface/interface";

export const cartApi = createApi({
  reducerPath: "apiCart",
  baseQuery: fetchBaseQuery({
    baseUrl: API,
    prepareHeaders: prepareHeaders,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getCartItem: builder.query<CartResponse, void>({
      query: () => ({
        url: "/cart",
        method: "GET",
      }),
    }),
    addToCart: builder.mutation<void, string>({
      query: (id) => ({
        url: `/cart/add/${id}`,
        method: "POST",
      }),
    }),
    updateCartItem: builder.mutation<
      void,
      { product_id: string; quantity: string }
    >({
      query: (args) => ({
        url: `/cart/${args.product_id}?${args.quantity}`,
        method: "PUT",
      }),
    }),
    deleteCartItem: builder.mutation<void, string>({
      query: (id) => ({
        url: `/cart/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddToCartMutation,
  useDeleteCartItemMutation,
  useGetCartItemQuery,
  useUpdateCartItemMutation,
} = cartApi;
