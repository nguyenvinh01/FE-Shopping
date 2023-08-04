import { Button, Checkbox, Image, InputNumber, List } from "antd";
import React from "react";
import ProductImage from "../../assets/images/lap 1.png";
import { styled } from "styled-components";

export interface CartItemType {
  image: string;
  desc: string;
  categories: string;
  price: number;
  // quantity: 1,
  amount: number;
  // text: "Thao tac",
}
type PropsCart = {
  items: CartItemType;
};
export const CartItem = ({ items }: PropsCart) => {
  const handleDelete = () => {
    console.log(123);
  };
  return (
    <>
      <List.Item>
        <Checkbox></Checkbox>
        <div className="list-item image-product">
          <Image
            src={items.image}
            preview={false}
            width={"80px"}
            height={"80px"}
          />
          <span>{items.desc}</span>
        </div>
        <div className="list-item">
          <p>{items.categories}</p>
        </div>
        <div className="list-item">
          <p>{items.price}</p>
        </div>
        <div className="list-item">
          <p>
            <InputNumber min={1} max={10} defaultValue={3} />
          </p>
        </div>
        <div className="list-item">
          <p>{items.amount}</p>
        </div>
        <div className="list-item">
          <p onClick={handleDelete}>
            <Button type="link">Xoa</Button>
          </p>
        </div>
      </List.Item>
    </>
  );
};
