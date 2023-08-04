import { Checkbox, Image, List } from "antd";
import React, { useState } from "react";
import { styled } from "styled-components";
import ProductImage from "../../assets/images/lap 1.png";
import { CartItem, CartItemType } from "./CartItem";
import { PurchaseBar } from "../../components/PurchaseBar/PurchaseBar";

const data: CartItemType = {
  // title: "San pham",
  image: ProductImage,
  desc: "Vero id delectus eos animi quia et.",
  categories: "Cate 1culpa et expedita",
  price: 1200,
  // quantity: 1,
  amount: 12344,
  // text: "Thao tac",
};
const UserCartWrapper = styled.div`
  width: 100%;
  .list-item {
    padding-right: 40px;
    width: 40px;
  }
  .ant-list-item .list-item:first-child {
    width: 477px;
  }
  .list-item p {
    width: 80px;
  }
  .ant-list {
    width: 100%;
  }
  .ant-list-item {
    /* border: 1px solid #d6bdbd; */
    padding: 0px 8px;
  }
  .image-product {
    align-items: baseline;
    display: flex;
    width: 350px;
  }
`;
const CartItemWrapper = styled.div`
  border: 1px solid #c2bfbf;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

export const UserCart = () => {
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(!checked);
  };
  return (
    <UserCartWrapper>
      <List>
        <List.Item>
          <Checkbox onChange={handleChange} checked={checked}></Checkbox>
          <div className="list-item image-product">
            <p>Sản phẩm</p>
          </div>
          <div className="list-item">
            <p>Loại</p>
          </div>
          <div className="list-item">
            <p>Đơn giá</p>
          </div>
          <div className="list-item">
            <p>Số lượng</p>
          </div>
          <div className="list-item">
            <p>Tổng giá</p>
          </div>
          <div className="list-item">
            <p>Thao tác</p>
          </div>
        </List.Item>
        <br />
        <br />

        <CartItemWrapper>
          <CartItem items={data} checked={checked} />
        </CartItemWrapper>
        <br />
        <br />
        {/* <CartItemWrapper>
          <CartItem items={data} />
        </CartItemWrapper>
        <br />
        <br />
        <CartItemWrapper>
          <CartItem items={data} />
        </CartItemWrapper>
        <br />
        <br /> */}
      </List>
      <PurchaseBar />
    </UserCartWrapper>
  );
};
