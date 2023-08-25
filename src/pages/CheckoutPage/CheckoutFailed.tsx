import { Button, Result } from "antd";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function CheckoutFailed() {
  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);

  if (searchParams.has("id")) {
    const id = searchParams.get("id");
  }

  return (
    <div>
      <Result
        status="error"
        title="Thanh toán không thành công"
        subTitle="Có lỗi xảy ra"
        extra={[
          <Button type="primary" key="console">
            Trang chủ
          </Button>,
        ]}
      />
    </div>
  );
}
