import { Button, Checkbox, Image, InputNumber, List } from "antd";
import React, { useState, useEffect } from "react";
import ProductImage from "../../assets/images/lap 1.png";
import { styled } from "styled-components";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { CartItemType } from "../../interface/interface";

type PropsCart = {
  items: CartItemType;
  checked: boolean;
  handleAddToCart: (item: CartItemType) => void;
};
export const CartItem = ({ items, checked, handleAddToCart }: PropsCart) => {
  const [check, setChecked] = useState<boolean>(false);

  const handleChange = (e: CheckboxChangeEvent) => {
    setChecked(e.target.checked);
    handleAddToCart(items);
  };
  const handleDelete = () => {
    console.log(123);
  };
  useEffect(() => {
    setChecked(checked);
  }, [checked]);
  return (
    <>
      <List.Item>
        <Checkbox
          checked={check}
          onChange={(e: CheckboxChangeEvent) => handleChange(e)}
        ></Checkbox>
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
            <InputNumber min={1} max={10} defaultValue={items.quantity} />
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
