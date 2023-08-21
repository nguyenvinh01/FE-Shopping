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
  inventoryDataUpdate,
  inventoryResponse,
} from "../../interface/interface";
import { prepareHeaders } from "../../utility/PrepareHeaders";
// import { prepareHeaders } from "./apiUser";

export const productApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API,
    credentials: "include",
    prepareHeaders: prepareHeaders,
  }),
  tagTypes: ["AllProducts", "Product"],
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
      providesTags: ["AllProducts"],
    }),

    getProductDetail: builder.query<ProductDetailResponse, string>({
      query: (id: string) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
      providesTags: ["Product"],
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
      invalidatesTags: ["AllProducts"],
    }),

    editProduct: builder.mutation<
      Product,
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
      invalidatesTags: ["AllProducts", "Product"],
    }),

    getInventory: builder.query<inventoryResponse, string>({
      query: (id) => ({
        url: `/inventory/${id}`,
        method: "GET",
      }),
    }),

    updateInventory: builder.mutation<
      inventoryResponse,
      { data: inventoryDataUpdate; id: string }
    >({
      query: ({ data, id }) => ({
        url: `/inventory/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailQuery,
  useCreateProductMutation,
  useEditProductMutation,
  useGetInventoryQuery,
  useUpdateInventoryMutation,
} = productApi;
