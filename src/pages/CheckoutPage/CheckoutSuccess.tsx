import { Button, Result } from "antd";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCheckoutSessionMutation } from "../../redux/apis/apiCart";
import { useDispatch } from "react-redux";
import { resetCart } from "../../redux/slice/cartSlice";

export default function CheckoutSuccess() {
  const [checkoutSession] = useCheckoutSessionMutation();
  const dispatch = useDispatch();

  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);
  useEffect(() => {
    if (searchParams.has("id")) {
      const id = searchParams.get("id");
      if (id) {
        checkoutSession(id);
        dispatch(resetCart());
      }
    }
  }, []);
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
