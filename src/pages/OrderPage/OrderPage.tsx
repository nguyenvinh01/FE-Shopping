import { Avatar, Divider, List, Skeleton } from "antd";
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
const data: OrderPageType = {
  id: "12312321321313",
  amount: 112312321312,
  // status: "sadsadsa",
  date: "12/2/2022",
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
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<OrderPageType[]>([]);
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

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(
      "https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo"
    )
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMoreData();
  }, []);
  return (
    <OrderPageWrapper>
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < 15}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        // endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={(item) => {
            return (
              <>
                <OrderItem onClick={() => handleClick(item.id)} />
                <br />
              </>
            );
          }}
        >
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
          {/* <OrderItem onClick={() => handleClick("1")} /> */}
        </List>
      </InfiniteScroll>

      <OrderModal
        visible={isVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        idOrder={idOrder}
      />
    </OrderPageWrapper>
  );
};
