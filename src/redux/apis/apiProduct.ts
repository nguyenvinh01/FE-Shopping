import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API } from "../../shared/Constants/Constants";
import { DataProductUpdate, Product } from "../../interface/interface";
import { prepareHeaders } from "../service/prepareHeaders";
// import { prepareHeaders } from "./apiUser";

export const productApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API,
    credentials: "include",
    prepareHeaders: prepareHeaders,
  }),
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

    createProduct: builder.mutation({
      // invalidatesTags: ["Product"],
      query: (data: DataProductUpdate) => {
        const formData = new FormData();
        formData.append("productImage", data.productImage as File);
        formData.append(
          "productInformation",
          JSON.stringify(data.productInformation)
        );
        console.log(JSON.stringify(data.productInformation), "conver");

        return {
          url: "/product",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailQuery,
  useCreateProductMutation,
} = productApi;
