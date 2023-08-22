import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API } from "../../shared/Constants/Constants";
import { prepareHeaders } from "../../utility/PrepareHeaders";
import { url } from "inspector";
import { CartItemResponse, CartResponse } from "../../interface/interface";

export const cartApi = createApi({
  reducerPath: "apiCart",
  baseQuery: fetchBaseQuery({
    baseUrl: API,
    prepareHeaders: prepareHeaders,
    credentials: "include",
  }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getCartItem: builder.query<CartResponse, void>({
      query: () => ({
        url: "/cart",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "Cart" as const,
                id,
              })),
              { type: "Cart", id: "LIST" },
            ]
          : [{ type: "Cart", id: "LIST" }],
    }),
    addToCart: builder.mutation<CartResponse, string>({
      query: (id) => ({
        url: `/cart/add/${id}`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),
    updateCartItem: builder.mutation<
      CartItemResponse,
      { product_id: string; quantity: string }
    >({
      query: (args) => ({
        url: `/cart/${args.product_id}?quantity=${args.quantity}`,
        method: "PUT",
      }),
      invalidatesTags: (result) => [
        { type: "Cart", id: result?.id },
        { type: "Cart", id: "LIST" },
      ],
    }),
    deleteCartItem: builder.mutation<CartItemResponse, string>({
      query: (id) => ({
        url: `/cart/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useDeleteCartItemMutation,
  useGetCartItemQuery,
  useUpdateCartItemMutation,
} = cartApi;
