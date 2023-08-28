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
import { useNavigate } from "react-router-dom";
import { useGetProductDetailQuery } from "../../redux/apis/apiProduct";
import numeral from "numeral";
import { FormatNumber } from "../../utility/FormatNumber";

type PropsCart = {
  items: CartItemResponse;
  checked: boolean;
  handleAddToCart: (item: CartItemResponse) => void;
  handleChangeQuantity: (
    value: string,
    id: string,
    quantity: number | undefined
  ) => void;
  handleDelete: (id: string) => void;
  handleCheckedChange: (id: string, isChecked: boolean) => void;
};
export const CartItem = ({
  items,
  checked,
  handleAddToCart,
  handleChangeQuantity,
  handleDelete,
  handleCheckedChange,
}: PropsCart) => {
  const [check, setChecked] = useState<boolean>(false);
  const { data } = useGetProductDetailQuery(items.id);
  const navigate = useNavigate();
  const handleChange = (e: CheckboxChangeEvent) => {
    setChecked(e.target.checked);
    handleCheckedChange(items.id, e.target.checked);
    handleAddToCart(items);
  };

  const handleNavigate = () => {
    navigate(`/products/${items.id}`);
  };
  useEffect(() => {
    setChecked(checked);
  }, [checked]);

  return (
    <List.Item key={items.id}>
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
          onClick={handleNavigate}
        />
        <span>{items.name}</span>
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
        <p>{FormatNumber(items.pricePerUnit)}₫</p>
      </div>
      <div className="list-item">
        <p>
          <InputNumber
            min={1}
            max={data?.data.quantity}
            defaultValue={items.quantity}
            onBlur={(value) =>
              handleChangeQuantity(
                value.target.value,
                items.id,
                data?.data.quantity
              )
            }
            onPressEnter={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if ("value" in e.target) {
                handleChangeQuantity(
                  String(e.target.value),
                  items.id,
                  data?.data.quantity
                );
              }
            }}
          />
        </p>
      </div>
      <div className="list-item">
        <p>{FormatNumber(items.pricePerUnit * items.quantity)}₫</p>
      </div>
      <div className="list-item">
        <p onClick={() => handleDelete(items.id)}>
          <Button type="link" danger>
            Remove
          </Button>
        </p>
      </div>
    </List.Item>
  );
};
