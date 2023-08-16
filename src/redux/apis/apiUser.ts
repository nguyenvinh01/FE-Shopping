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
import {
  DataUserUpdate,
  LoginResponse,
  Response,
  User,
} from "../../interface/interface";
import { SerializedError } from "@reduxjs/toolkit";
import { prepareHeaders } from "../service/prepareHeaders";
import { InitialStateType } from "../slice/userSlice";
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
  data?: {
    success: boolean;
    AccessToken: string;
  };
  error?: FetchBaseQueryError | SerializedError;
}

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
    logout: builder.mutation<void, void>({
      invalidatesTags: ["User"],
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    register: builder.mutation<Response<any>, string>({
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
    getUser: builder.query<InitialStateType, void>({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    updateUser: builder.mutation<Response<User>, DataUserUpdate>({
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
      // transformResponse: (response: { data: User }, meta, arg) => response.data,
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
  useLogoutMutation,
} = userApi;
