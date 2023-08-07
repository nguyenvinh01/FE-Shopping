import { Checkbox, Image, List } from "antd";
import React, { useState } from "react";
import { styled } from "styled-components";
import ProductImage from "../../assets/images/lap 1.png";
import { CartItem, CartItemType } from "./CartItem";
import { PurchaseBar } from "../../components/PurchaseBar/PurchaseBar";

const data: CartItemType[] = [
  {
    // title: "San pham",
    id: "12",
    image: ProductImage,
    desc: "Vero id delectus eos animi quia et.",
    categories: "Cate 1culpa et expedita",
    price: 1200,
    quantity: 1,
    amount: 12344,
    // text: "Thao tac",
  },
  {
    // title: "San pham",
    id: "123",
    image: ProductImage,
    desc: "Vero id delectus eos animi quia et.",
    categories: "Cate 1culpa et expedita",
    price: 1200,
    quantity: 1,
    amount: 12344,
    // text: "Thao tac",
  },
];
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
    padding: 0px 8px;
    width: 100%;
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
const HeaderCart = (
  <>
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
  </>
);
export const UserCart = () => {
  const [checked, setChecked] = useState(false);
  const [currentCart, setCurrentCart] = useState<CartItemType[]>([]);
  const handleChange = () => {
    setChecked(!checked);
  };
  console.log(currentCart, 1);

  const handleAddToCart = (item: CartItemType) => {
    if (currentCart?.some((cart) => cart.id === item.id)) {
      const newCart = currentCart?.filter((cart) => cart.id !== item.id);
      setCurrentCart(newCart);
      // console.log(currentCart, 1);
    } else {
      setCurrentCart([...currentCart, item]);
      // console.log(currentCart, 2);
    }
  };
  const handleDeleteFromCart = (item: CartItemType) => {
    const newCart = currentCart?.filter((cart) => cart.id !== item.id);
    setCurrentCart(newCart);
    console.log(currentCart, "currentCart");
  };
  return (
    <UserCartWrapper>
      <List
        dataSource={data}
        header={
          <List.Item>
            <Checkbox onChange={handleChange} checked={checked}></Checkbox>
            {HeaderCart}
          </List.Item>
        }
        renderItem={(item) => {
          return (
            <div>
              <CartItemWrapper>
                <CartItem
                  items={item}
                  checked={checked}
                  handleAddToCart={handleAddToCart}
                  handleDeleteFromCart={handleDeleteFromCart}
                />
              </CartItemWrapper>
              <br />
            </div>
          );
        }}
      ></List>
      <PurchaseBar cart={currentCart} />
    </UserCartWrapper>
  );
};
