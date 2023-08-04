import { Button, Descriptions, Image, List, Space } from "antd";
import DescriptionsItem from "antd/es/descriptions/Item";
import React from "react";
import { AiFillFileMarkdown } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { styled } from "styled-components";
import ImageProduct from "../../assets/images/lap 1.png";
import { CheckoutItem } from "./CheckoutItem";
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
  /* .image-product-checkout {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .body-checkout {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .product-detail-checkout {
    display: flex;
  }
  .body-checkout {
    display: flex;
    justify-content: space-between;
  }
  .body-checkout p {
    margin-left: -50px;
  }
  .checkout-item {
    width: 200px;
  } */
`;
const data = [
  {
    item: (
      <CheckoutItem
        image={ImageProduct}
        productname="string"
        categories="string"
        price={9000000}
        quantity={2}
        amount={1234}
      />
    ),
  },
  {
    item: (
      <CheckoutItem
        image={ImageProduct}
        productname="string"
        categories="string"
        price={9000000}
        quantity={2}
        amount={1234}
      />
    ),
  },
  {
    item: (
      <CheckoutItem
        image={ImageProduct}
        productname="string"
        categories="string"
        price={9000000}
        quantity={2}
        amount={1234}
      />
    ),
  },
  {
    item: (
      <CheckoutItem
        image={ImageProduct}
        productname="string"
        categories="string"
        price={9000000}
        quantity={2}
        amount={1234}
      />
    ),
  },
  {
    item: (
      <CheckoutItem
        image={ImageProduct}
        productname="string"
        categories="string"
        price={9000000}
        quantity={2}
        amount={1234}
      />
    ),
  },
];
export const CheckoutPage = () => {
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
        dataSource={data}
        renderItem={(item) => (
          <div>
            {/* <CheckoutItem
              image={ImageProduct}
              productname="string"
              categories="string"
              price={9000000}
              quantity={2}
              amount={1234}
            /> */}
            {item.item}
          </div>
        )}
      />
      {/* <CheckoutItem
        image={ImageProduct}
        productname="string"
        categories="string"
        price={9000000}
        quantity={2}
        amount={1234}
      />
      <CheckoutItem
        image={ImageProduct}
        productname="string"
        categories="string"
        price={9000000}
        quantity={2}
        amount={1234}
      />
      <CheckoutItem
        image={ImageProduct}
        productname="string"
        categories="string"
        price={12300}
        quantity={2}
        amount={1234}
      />
      <CheckoutItem
        image={ImageProduct}
        productname="string"
        categories="string"
        price={1233}
        quantity={2}
        amount={1234}
      /> */}
      <div>
        <div>
          <Descriptions layout={"horizontal"} size={"default"}>
            <Descriptions.Item label="Tổng số tiền">qưewqe</Descriptions.Item>
          </Descriptions>
        </div>
        <Button type="primary">Thanh toán</Button>
      </div>
    </CheckoutPageWrapper>
  );
};
