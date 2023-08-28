import { Avatar, Divider, List, Pagination, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { CartItem } from "../UserCart/CartItem";
import { OrderItem } from "./OrderItem";
import { OrderModal } from "./OrderModal";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetOrderQuery } from "../../redux/apis/apiOrder";

interface OrderPageType {
  id: string;
  date: string;
  amount: number;
}

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
      <p>Order Code</p>
    </div>
    <div>
      <p>Amount</p>
    </div>
    {/* <div>
      <p></p>
    </div>
    <div>
      <p></p>
    </div> */}
  </List.Item>
);
export const OrderPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [idOrder, setIdOrder] = useState("");
  const { data } = useGetOrderQuery();
  console.log(data);

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
        dataSource={data?.data}
        header={Header}
        renderItem={(item) => {
          return (
            <>
              <OrderItem
                onClick={() => handleClick(item.id)}
                orderData={item.orderItems}
                idOrder={item.id}
              />
            </>
          );
        }}
      ></List>
      <OrderModal
        visible={isVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        idOrder={idOrder}
      />
    </OrderPageWrapper>
  );
};
