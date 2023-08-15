import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API } from "../../shared/Constants/Constants";
import { url } from "inspector";
import { prepareHeaders } from "../service/prepareHeaders";
import { Category } from "../../interface/interface";

export const categoryApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API,
    credentials: "include",
    prepareHeaders: prepareHeaders,
  }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (arg) => ({
        url: "/category",
        method: "GET",
        params: { ...arg },
      }),
    }),

    getCategoryDetail: builder.query<Category, number>({
      query: (id: number) => ({
        url: `/category/${id}`,
        method: "GET",
      }),
      transformResponse: (response: { data: Category }, meta, arg) =>
        response.data,
    }),
  }),
});

export const { useGetCategoriesQuery, useGetCategoryDetailQuery } = categoryApi;
