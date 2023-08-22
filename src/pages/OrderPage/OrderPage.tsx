import { Avatar, Divider, List, Pagination, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { CartItem } from "../UserCart/CartItem";
import { OrderItem } from "./OrderItem";
import { OrderModal } from "./OrderModal";
import InfiniteScroll from "react-infinite-scroll-component";

interface OrderPageType {
  id: string;
  date: string;
  amount: number;
}
const data: OrderPageType[] = [
  {
    id: "12312321321313",
    amount: 112312321312,
    date: "12/2/2022",
  },
  {
    id: "12312321321313",
    amount: 112312321312,
    date: "12/2/2022",
  },
  {
    id: "12312321321313",
    amount: 112312321312,
    date: "12/2/2022",
  },
];
const OrderPageWrapper = styled.div`
  .ant-list-item,
  p {
    padding-top: 0px;
    margin: 0px;
  }
`;
const Header = (
  <List.Item>
    <div>
      <p>Mã đơn hàng</p>
    </div>
    <div>
      <p>Ngày đặt</p>
    </div>
    <div>
      <p>Tổng giá</p>
    </div>
    <div>
      <p></p>
    </div>
  </List.Item>
);
export const OrderPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [idOrder, setIdOrder] = useState("");
  const showModal = () => {
    setIsVisible(true);
  };

  const hideModal = () => {
    setIsVisible(false);
  };

  const handleOk = () => {
    hideModal();
  };

  const handleCancel = () => {
    hideModal();
  };
  const handleClick = (id: string) => {
    showModal();
    setIdOrder(id);
    console.log("click");
  };

  return (
    <OrderPageWrapper>
      <List
        dataSource={data}
        header={Header}
        renderItem={(item) => {
          return (
            <>
              <OrderItem onClick={() => handleClick(item.id)} />
            </>
          );
        }}
      ></List>
      <Pagination defaultCurrent={1} total={50} />
      <OrderModal
        visible={isVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        idOrder={idOrder}
      />
    </OrderPageWrapper>
  );
};
