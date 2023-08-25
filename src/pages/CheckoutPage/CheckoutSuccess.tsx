import { Button, Result } from "antd";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function CheckoutSuccess() {
  //   useEffect(() => {
  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);

  if (searchParams.has("id")) {
    const id = searchParams.get("id");
  }
  //   }, []);
  return (
    <div>
      <Result
        status="success"
        title="Thanh toán thành công"
        subTitle="Tiếp tục mua sắm"
        extra={[
          <Button type="primary" key="console">
            Trang chủ
          </Button>,
        ]}
      />
    </div>
  );
}
