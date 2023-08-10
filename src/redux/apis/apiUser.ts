import {
  BaseQueryApi,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
// import axiosInstance, {
//   performRequest,
// } from "../../shared/services/http-clients";
import jwt_decode from "jwt-decode";

import { API } from "../../shared/Constants/Constants";
import { AxiosHeaders, AxiosResponse } from "axios";
import axiosInstance from "../../shared/services/http-clients";
export interface LoginCredentials {
  email: string;
  password: string;
}
const data: LoginCredentials = {
  email: "admin@gmail.com",
  password: "Hieu12345",
};
interface DecodedTokenType {
  id: string;
  exp: number;
  iat: number;
  name: string;
  role: "BASIC" | "ADMIN";
}

const baseQuery = fetchBaseQuery({
  baseUrl: API,
  // fetchFn: axiosInstance,
  prepareHeaders: (headers, { getState }) => {
    const currentTime = new Date();
    const token = localStorage.getItem("access_token");
    if (token) {
      const decoded_token: DecodedTokenType = jwt_decode(token);
      if (decoded_token?.exp < currentTime.getTime() / 1000) {
        // Handle token expiration, e.g., log out the user
      } else {
        // headers.set('Author')
      }
    }

    headers.set(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE0NDY4MWI5LThlYWItNDdjZi1hNWE1LTU1YTk3MzdjYjc4NiIsInJvbGUiOiJBRE1JTiIsIm5hbWUiOiJOZ3V5ZW4gSGlldSIsImlhdCI6MTY5MTYzODQ1MiwiZXhwIjoxNjkxNjQyMDUyfQ.brQWyrF0z0vNcl-CKuQms66JVGS6o2HSpxuGYiZ6raA"
    );
    // headers.set("Accept", "application/json");
    // headers.set("Content-Type", "application/json");
    // console.log(token, "token");

    return headers;
  },
  // responseHandler: async (response) => {
  //   const customHeaders = response.headers;

  //   // Truy cập vào các giá trị trong header của response
  //   const authorizationHeader = customHeaders.get("authorization");
  //   // Truy cập vào các trường thông tin khác trong header
  //   console.log("header", authorizationHeader, customHeaders);

  //   return response;
  // },
});
export const userApi = createApi({
  reducerPath: "usersApi",
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<AxiosResponse, LoginCredentials>({
      query: (credentials) => ({
        url: "/auth/signin", // Điều chỉnh đường dẫn API đăng nhập
        method: "POST",
        body: credentials,
      }),
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: "/auth/refreshtoken",
        method: "POST",
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useGetUserQuery } = userApi;
