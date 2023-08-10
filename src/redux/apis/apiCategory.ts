import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API } from "../../shared/Constants/Constants";
import { url } from "inspector";

interface categoryType {
  id?: number;
  label: string;
  description: string;
  image_url: string;
}

export const categoryApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
