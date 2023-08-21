import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API } from "../../shared/Constants/Constants";
import {
  DataProductUpdate,
  Product,
  ProductDetailResponse,
  ProductResponse,
  ProductUpdateDataType,
  QueryParams,
  inventoryDataUpdate,
  inventoryResponse,
} from "../../interface/interface";
import { prepareHeaders } from "../../utility/PrepareHeaders";

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
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "Product" as const,
                id,
              })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),

    getProductDetail: builder.query<ProductDetailResponse, string>({
      query: (id: string) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
      providesTags: (result) => [{ type: "Product", id: result?.data.id }],
    }),

    createProduct: builder.mutation<Product, DataProductUpdate>({
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
      invalidatesTags: (result) => [{ type: "Product", id: result?.id }],
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
      invalidatesTags: (result) =>
        result
          ? [
              { type: "Product", id: result.id },
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
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
