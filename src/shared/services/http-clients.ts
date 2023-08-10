import axios, { AxiosInstance } from "axios";
import { API } from "../Constants/Constants";
// import { ACCESS_TOKEN } from "../constants";
import jwt_decode from "jwt-decode";
interface DecodedTokenType {
  id: string;
  exp: number;
  iat: number;
  name: string;
  role: "BASIC" | "ADMIN";
}
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API,
  // headers: {
  //   Accept: "applications/json",
  //   "Content-Type": "application/json",
  // },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    // Do something before request is sent
    const currentTime = new Date();

    const token = localStorage.getItem("access_token") || "";
    const decoded_token: DecodedTokenType = jwt_decode(token);
    if (decoded_token?.exp < currentTime.getTime() / 1000) {
    }
    if (token) {
      config.headers[
        "Authorization"
      ] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE0NDY4MWI5LThlYWItNDdjZi1hNWE1LTU1YTk3MzdjYjc4NiIsInJvbGUiOiJBRE1JTiIsIm5hbWUiOiJOZ3V5ZW4gSGlldSIsImlhdCI6MTY5MTQ4Mjg3NiwiZXhwIjoxNjkxNDg2NDc2fQ.El-DkM9gvmDKNpZHSxvpPPl_OnjlFtzwrrasltazHFE`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
