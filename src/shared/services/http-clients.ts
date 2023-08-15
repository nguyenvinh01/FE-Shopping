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
    if (token) {
      const decoded_token: DecodedTokenType = jwt_decode(token);
      if (decoded_token?.exp < currentTime.getTime() / 1000) {
        // const refreshToken = await useRefreshTokenMutation();
        // console.log(refreshToken.toString(), 123);
        // localStorage.setItem("access_token", refreshToken.toString());
        axiosInstance
          .post("/auth/refreshtoken", null, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            console.log(res, "response");
          });
      } else {
        config.headers.set("Authorization", `Bearer ${token}`);
      }
    }
    // config.headers["Authorization"] = `Bearer ${token}`;
    // config.headers["Content-Type"] = "multipart/form-data;";
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
