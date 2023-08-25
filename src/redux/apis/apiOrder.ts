import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API } from "../../shared/Constants/Constants";
import { prepareHeaders } from "../../utility/PrepareHeaders";
import {
  GetOrderByIdResponse,
  GetOrderResponse,
  QueryParams,
} from "../../interface/interface";

export const orderApi = createApi({
  reducerPath: "apiOrder",
  baseQuery: fetchBaseQuery({
    baseUrl: API,
    prepareHeaders: prepareHeaders,
    credentials: "include",
  }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    getOrder: builder.query<GetOrderResponse, void>({
      query: () => ({
        url: "/order/myorder",
        method: "GET",
      }),
    }),

    getAllOrder: builder.query<GetOrderResponse, void>({
      query: () => ({
        url: "/order",
        method: "GET",
      }),
    }),

    getOrderById: builder.query<GetOrderByIdResponse, string>({
      query: (id: string) => ({
        url: `/order/${id}`,
        method: "GET",
        // params: { ...arg },
      }),
    }),
  }),
});

export const { useGetOrderQuery, useGetAllOrderQuery, useGetOrderByIdQuery } =
  orderApi;
