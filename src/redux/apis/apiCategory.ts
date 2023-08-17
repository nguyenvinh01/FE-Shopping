import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API } from "../../shared/Constants/Constants";
import { url } from "inspector";
import { prepareHeaders } from "../../utility/PrepareHeaders";
import {
  Category,
  CategoryResponse,
  CreateCategoryDataType,
  QueryParams,
} from "../../interface/interface";

export const categoryApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API,
    credentials: "include",
    prepareHeaders: prepareHeaders,
  }),
  tagTypes: ["Category"],

  endpoints: (builder) => ({
    getCategories: builder.query<CategoryResponse, QueryParams>({
      query: (arg) => {
        const params = {
          name: arg.name,
          page: arg.page,
          limit: arg.limit,
        };
        return {
          url: "/category",
          method: "GET",
          params: { ...params },
        };
      },
      providesTags: ["Category"],
    }),
    getCategoryDetail: builder.query<Category, string>({
      query: (id: string) => ({
        url: `/category/${id}`,
        method: "GET",
      }),
      transformResponse: (response: { data: Category }, meta, arg) =>
        response.data,
    }),
    createCategory: builder.mutation<Category, CreateCategoryDataType>({
      query: (data) => {
        const formData = new FormData();
        formData.append("categoryImage", data.categoryImage);
        formData.append(
          "categoryInformation",
          JSON.stringify(data.categoryInformation)
        );

        return {
          url: "/category",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Category"],
    }),
    editCategory: builder.mutation<
      Category,
      { data: CreateCategoryDataType; id: string }
    >({
      query: ({ data, id }) => {
        const formData = new FormData();
        formData.append("categoryImage", data.categoryImage);
        formData.append(
          "categoryInformation",
          JSON.stringify(data.categoryInformation)
        );

        return {
          url: `/category/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryDetailQuery,
  useCreateCategoryMutation,
  useEditCategoryMutation,
} = categoryApi;
