import { List } from "antd";
import React, { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { styled } from "styled-components";
import { OrderModal } from "./OrderModal";
import { Order, OrderProduct } from "../../interface/interface";
const OrderItemWrapper = styled.div`
  border-radius: 5px;
  padding: 0px 10px;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: baseline;
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em,
    rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
  margin-top: 15px;
  .ant-list-item {
    padding: 0px;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  &:hover {
    transform: translateY(-5%);
    cursor: pointer;
  }
  svg {
    margin: -2px 10px;
  }
`;
type PropsOrderItem = {
  onClick?: () => void;
  orderData: Order;
};
export const OrderItem = ({ onClick, orderData }: PropsOrderItem) => {
  return (
    <OrderItemWrapper onClick={onClick}>
      <List.Item>
        <div>{orderData.id}</div>
        <div>Ngày đặt</div>
        {/* <div>{}</div> */}
        <div>
          <AiOutlineArrowRight />
        </div>
      </List.Item>
    </OrderItemWrapper>
  );
};
