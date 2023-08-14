import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API } from "../../shared/Constants/Constants";
import { Product } from "../../interface/interface";

export const productApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (arg) => ({
        url: "/product",
        method: "GET",
        params: { ...arg },
      }),
    }),
    getProductDetail: builder.query<Product, string>({
      query: (id: string) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailQuery } = productApi;
