import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API } from "../../shared/Constants/Constants";
import { prepareHeaders } from "../../utility/PrepareHeaders";
import { url } from "inspector";

const apiCart = createApi({
  reducerPath: "apiCart",
  baseQuery: fetchBaseQuery({
    baseUrl: API,
    prepareHeaders: prepareHeaders,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getCartItem: builder.query({
      query: () => ({
        url: "/cart",
        method: "GET",
      }),
    }),
  }),
});
