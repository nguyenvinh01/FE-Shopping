// custom-types.d.ts
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

declare module "@reduxjs/toolkit/query/react" {
  interface FetchBaseQueryError {
    // Thêm hoặc thay đổi các thuộc tính theo nhu cầu của bạn
    status: number;
    data: {
      metadata: {
        message: string;
      };
    };
  }
}
