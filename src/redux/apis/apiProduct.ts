import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API } from "../../shared/Constants/Constants";

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
  }),
});

export const { useGetProductsQuery } = productApi;