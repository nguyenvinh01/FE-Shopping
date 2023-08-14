import {
  BaseQueryApi,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import jwt_decode from "jwt-decode";

import { API } from "../../shared/Constants/Constants";
import axios, { AxiosHeaders, AxiosResponse } from "axios";
import axiosInstance from "../../shared/services/http-clients";
import { DataUserUpdate, LoginResponse, User } from "../../interface/interface";
import { SerializedError } from "@reduxjs/toolkit";
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface DecodedTokenType {
  id: string;
  exp: number;
  iat: number;
  name: string;
  role: "BASIC" | "ADMIN";
}

export interface ResponseRefreshToken {
  // data?: {
  // };
  success: boolean;
  AccessToken: string;
  // error?: FetchBaseQueryError | SerializedError;
}
export const prepareHeaders = async (headers: Headers) => {
  const currentTime = new Date();
  const token = localStorage.getItem("access_token");

  if (token) {
    const decoded_token: DecodedTokenType = jwt_decode(token);
    if (decoded_token?.exp < currentTime.getTime() / 1000) {
      // const refreshToken = userApi.endpoints.refreshToken;
      // const refreshTokenResponse = await useRefreshTokenMutation();
      // localStorage.setItem("access_token", refreshToken);
      const tokenResponse: ResponseRefreshToken = await axios.post(
        `http://localhost:3000/auth/refreshtoken`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(tokenResponse, "response");
      headers.set("Authorization", `Bearer ${tokenResponse.AccessToken}`);
    } else {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }
  return headers;
};
const baseQuery = fetchBaseQuery({
  baseUrl: API,
  credentials: "include",
  prepareHeaders: prepareHeaders,
});
export const userApi = createApi({
  reducerPath: "usersApi",
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginCredentials>({
      query: (credentials) => ({
        url: "/auth/signin",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
    }),
    refreshToken: builder.mutation<ResponseRefreshToken, void>({
      query: () => ({
        url: "/auth/refreshtoken",
        method: "POST",
      }),
    }),
    getUser: builder.query<User, void>({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    updateUser: builder.mutation({
      invalidatesTags: ["User"],
      query: (data: DataUserUpdate) => {
        const formData = new FormData();
        formData.append("userImage", data.userImage as File);
        formData.append(
          "userInformation",
          JSON.stringify(data.userInformation)
        );
        console.log(JSON.stringify(data.userInformation), "conver");

        return {
          url: "/user",
          method: "PATCH",
          body: formData,
        };
      },
    }),
    getAllUser: builder.query({
      query: (filter) => ({
        url: "/user",
        method: "GET",
      }),
    }),
    getUserById: builder.query<User, string>({
      query: (id: string) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUserQuery,
  useRefreshTokenMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useGetAllUserQuery,
  useGetUserByIdQuery,
} = userApi;
