import { Button, Result } from "antd";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CheckoutFailed() {
  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);
  const navigate = useNavigate();

  if (searchParams.has("id")) {
    const id = searchParams.get("id");
  }

  return (
    <div>
      <Result
        status="error"
        title="Purchase Failed"
        subTitle="Something Wrong"
        extra={[
          <Button
            type="primary"
            key="console"
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </Button>,
        ]}
      />
    </div>
  );
}
