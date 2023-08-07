import { List } from "antd";
import React, { useState } from "react";
import { styled } from "styled-components";
import { CartItem } from "../UserCart/CartItem";
import { OrderItem } from "./OrderItem";
import { OrderModal } from "./OrderModal";

const data = {
  id: "12312321321313",
  amount: 112312321312,
  status: "sadsadsa",
  data: "12/2/2022",
};
const OrderPageWrapper = styled.div`
  .ant-list-item,
  p {
    padding-top: 0px;
    margin: 0px;
  }
`;

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
    // Xử lý khi người dùng bấm nút OK (nếu cần)
    hideModal();
  };

  const handleCancel = () => {
    // Xử lý khi người dùng bấm nút Cancel (nếu cần)
    hideModal();
  };
  const handleClick = (id: string) => {
    showModal();
    setIdOrder(id);
    console.log("click");
  };
  return (
    <OrderPageWrapper>
      <List>
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
            <p>Trạng thái</p>
          </div>
        </List.Item>
        <br />
        <br />
        <OrderItem onClick={() => handleClick("1")} />
      </List>
      <OrderModal
        visible={isVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        idOrder={idOrder}
      />
    </OrderPageWrapper>
  );
};
