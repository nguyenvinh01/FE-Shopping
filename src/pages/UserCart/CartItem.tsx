import { Button, Checkbox, Image, InputNumber, List, Tag } from "antd";
import React, { useState, useEffect } from "react";
import ProductImage from "../../assets/images/lap 1.png";
import { styled } from "styled-components";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import {
  CartItemResponse,
  CartItemType,
  Product,
} from "../../interface/interface";
import { useDeleteCartItemMutation } from "../../redux/apis/apiCart";

type PropsCart = {
  items: CartItemResponse;
  checked: boolean;
  handleAddToCart: (item: CartItemResponse) => void;
};
export const CartItem = ({ items, checked, handleAddToCart }: PropsCart) => {
  const [check, setChecked] = useState<boolean>(false);
  const [deleteCartItem] = useDeleteCartItemMutation();
  const handleChange = (e: CheckboxChangeEvent) => {
    setChecked(e.target.checked);
    handleAddToCart(items);
  };
  const handleDelete = () => {
    deleteCartItem(items.id);
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
            src={items.image_url}
            preview={false}
            width={"80px"}
            height={"80px"}
          />
          <span>{items.description}</span>
        </div>
        <div className="list-item">
          {items.categories.map((i) => {
            return (
              <p key={i.id}>
                <Tag color="blue">{i.label}</Tag>
              </p>
            );
          })}
        </div>
        <div className="list-item">
          <p>{items.pricePerUnit}</p>
        </div>
        <div className="list-item">
          <p>
            <InputNumber min={1} max={10} defaultValue={items.quantity} />
          </p>
        </div>
        <div className="list-item">
          <p>{items.pricePerUnit * items.quantity}</p>
        </div>
        <div className="list-item">
          <p onClick={handleDelete}>
            <Button type="link" danger>
              Xóa
            </Button>
          </p>
        </div>
      </List.Item>
    </>
  );
};
