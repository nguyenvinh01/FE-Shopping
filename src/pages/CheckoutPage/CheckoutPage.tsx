import {
  Button,
  Descriptions,
  Image,
  List,
  Radio,
  Space,
  notification,
} from "antd";
import React from "react";
import { styled } from "styled-components";
import { CheckoutItem } from "./CheckoutItem";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { resetCart } from "../../redux/slice/cartSlice";
import {
  CartItemResponse,
  CheckoutRequest,
  CheckoutResponse,
  MessageResponse,
  User,
} from "../../interface/interface";
import { useCheckOutMutation } from "../../redux/apis/apiCart";
import numeral from "numeral";
import { FormatNumber } from "../../utility/FormatNumber";
const CheckoutPageWrapper = styled.div`
  .header-checkout {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid #6b626249;
  }
  .checkout-item-first {
    width: 650px;
  }

  .ant-radio-button-wrapper {
    /* border: none; */
    margin: 0px 10px;
    width: fit-content;
  }
  .ant-radio-button-wrapper:first-child {
    border-radius: 0;
  }

  .ant-radio-button-wrapper:last-child {
    border-radius: 0;
  }
`;
export const CheckoutPage = () => {
  const navigate = useNavigate();
  const dataCart = useSelector<RootState, CartItemResponse[]>(
    (state) => state.cart.items
  );
  const [checkOut] = useCheckOutMutation();
  const user = useSelector<RootState, User>((state) => state.user);
  const dispatch = useDispatch();
  const handleClick = async () => {
    console.log(dataCart);
    const data = dataCart.map((cart) => {
      return {
        id: cart.id,
        quantity: cart.quantity,
      };
    });
    const request: CheckoutRequest[] = dataCart.map((cart) => {
      return {
        product_id: cart.id,
        quantity: cart.quantity,
      };
    });
    const response: MessageResponse<CheckoutResponse> = await checkOut(request);
    console.log(response.data?._stripeUrl);
    if (response.data?._stripeUrl) {
      window.location.href = response.data?._stripeUrl;
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: "Có lỗi xảy ra",
      });
    }
    // dispatch(resetCart());
    // navigate("/");
  };
  const total: number = dataCart.reduce<number>((prev: number, current) => {
    return prev + current.pricePerUnit * current.quantity;
  }, 0);
  return (
    <CheckoutPageWrapper>
      <div>
        <div>
          <p>Tên người nhận: {user?.fullname}</p>
        </div>
        <div>
          <p>Địa chỉ giao hàng: {user?.address}</p>
        </div>
        <div>
          <p>
            Phương thức thanh toán:
            <Radio.Group optionType="button" buttonStyle="solid">
              <Radio value="option1">Thanh toán khi nhận hàng</Radio>
              <Radio value="option2">Chuyển khoản</Radio>
            </Radio.Group>
          </p>
        </div>
      </div>
      <div className="header-checkout">
        <div className="checkout-item-first">
          <p>Sản phẩm</p>
        </div>
        <div>
          <p>Đơn giá</p>
        </div>
        <div>
          <p>Số lượng</p>
        </div>
        <div>
          <p>Thành tiền</p>
        </div>
      </div>
      <List
        dataSource={dataCart}
        renderItem={(item) => (
          <div>
            <CheckoutItem
              image={item.image_url}
              productname={item.name}
              price={item.pricePerUnit}
              quantity={item.quantity}
              product_id={item.id}
            />
          </div>
        )}
      />
      <div>
        <div>
          <Descriptions layout={"horizontal"} size={"default"}>
            <Descriptions.Item label="Tổng số tiền">
              {FormatNumber(total)}₫
            </Descriptions.Item>
          </Descriptions>
        </div>
        <Button type="primary" onClick={() => handleClick()}>
          Thanh toán
        </Button>
      </div>
    </CheckoutPageWrapper>
  );
};
