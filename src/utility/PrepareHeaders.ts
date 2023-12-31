import axios from "axios";
import { DecodedTokenType, ResponseRefreshToken } from "../redux/apis/apiUser";
import jwt_decode from "jwt-decode";

export const prepareHeaders = async (headers: Headers) => {
  const currentTime = new Date();
  const token = localStorage.getItem("access_token");

  if (token) {
    const decoded_token: DecodedTokenType = jwt_decode(token);
    if (decoded_token?.exp < currentTime.getTime() / 1000) {
      const tokenResponse: ResponseRefreshToken = await axios.post(
        `http://localhost:3000/auth/refreshtoken`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      localStorage.setItem(
        "access_token",
        `${tokenResponse.data?.AccessToken}`
      );
      headers.set("Authorization", `Bearer ${tokenResponse.data?.AccessToken}`);
    } else {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }
  return headers;
};
