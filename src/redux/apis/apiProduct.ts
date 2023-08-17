import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API } from "../../shared/Constants/Constants";
import {
  DataProductUpdate,
  Product,
  ProductDetailResponse,
  ProductFormValues,
  ProductResponse,
  ProductUpdateDataType,
  QueryParams,
} from "../../interface/interface";
import { prepareHeaders } from "../service/prepareHeaders";
// import { prepareHeaders } from "./apiUser";

export const productApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API,
    credentials: "include",
    prepareHeaders: prepareHeaders,
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query<ProductResponse, QueryParams>({
      query: (arg) => {
        const params = {
          categoryIds: arg.id,
          name: arg.name,
          page: arg.page,
          limit: arg.limit,
        };
        return {
          url: "/product",
          method: "GET",
          params: { ...params },
        };
      },
      providesTags: ["Products"],
    }),

    getProductDetail: builder.query<ProductDetailResponse, string>({
      query: (id: string) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
    }),

    createProduct: builder.mutation<Product, DataProductUpdate>({
      // invalidatesTags: ["Product"],
      query: (data: DataProductUpdate) => {
        const formData = new FormData();
        formData.append("productImage", data.productImage as File);
        formData.append(
          "productInformation",
          JSON.stringify(data.productInformation)
        );
        return {
          url: "/product",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Products"],
    }),
    editProduct: builder.mutation<
      void,
      { data: ProductUpdateDataType; id: string | undefined }
    >({
      query: ({ data, id }) => {
        const formData = new FormData();
        formData.append("productImage", data.productImage);
        formData.append(
          "productInformation",
          JSON.stringify(data.productInformation)
        );
        return {
          url: `/product/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailQuery,
  useCreateProductMutation,
  useEditProductMutation,
} = productApi;
