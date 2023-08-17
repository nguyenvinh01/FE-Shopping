import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { MessageResponse } from "../interface/interface";

export const handleResponse = <T>(response: MessageResponse<T>) => {
  if ("error" in response) {
    if (response.error) {
      const fetchError = response.error as FetchBaseQueryError;
      if (fetchError) {
        if ("status" in fetchError) {
          return {
            messageResponse: fetchError.data?.metadata.message,
            isError: true,
          };
        }
      }
    }
  }
  return {
    messageResponse: "Ok",
    isError: false,
  };
};
