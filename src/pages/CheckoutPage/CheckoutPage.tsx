import { Button, Descriptions, Image, List, Space } from "antd";
import DescriptionsItem from "antd/es/descriptions/Item";
import React from "react";
import { AiFillFileMarkdown } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { styled } from "styled-components";
import ImageProduct from "../../assets/images/lap 1.png";
import { CheckoutItem } from "./CheckoutItem";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { CartItemType } from "../UserCart/CartItem";
import { ReduxCartItemType, resetCart } from "../../redux/slice/cartSlice";
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
`;
export const CheckoutPage = () => {
  const navigate = useNavigate();
  const dataCart = useSelector<RootState, CartItemType[]>(
    (state) => state.cart.items
  );
  console.log(dataCart, "dataCart");

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(resetCart());
    navigate("/");
  };
  return (
    <CheckoutPageWrapper>
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
              // image={item.image}
              // productname={item.productname}
              // categories={item.categories}
              price={item.price}
              quantity={item.quantity}
              product_id={item.product_id}
              // amount={item.amount}
            />
          </div>
        )}
      />
      <div>
        <div>
          <Descriptions layout={"horizontal"} size={"default"}>
            <Descriptions.Item label="Tổng số tiền">
              {dataCart.reduce<number>((prev: number, current) => {
                return prev + current.price * current.quantity;
              }, 0)}
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
