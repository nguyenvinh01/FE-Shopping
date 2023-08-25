import { Checkbox, Image, List, notification } from "antd";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import ProductImage from "../../assets/images/lap 1.png";
import { CartItem } from "./CartItem";
import { PurchaseBar } from "../../components/PurchaseBar/PurchaseBar";
import {
  CartItemResponse,
  CartItemType,
  MessageResponse,
  Product,
} from "../../interface/interface";
import {
  useDeleteCartItemMutation,
  useGetCartItemQuery,
  useUpdateCartItemMutation,
} from "../../redux/apis/apiCart";

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
  .ant-image-img {
    cursor: pointer;
  }
  .image-product span {
    margin-left: 100px;
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
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [currentCart, setCurrentCart] = useState<CartItemResponse[]>([]);
  const { data, isFetching } = useGetCartItemQuery();
  const [updateCartItem] = useUpdateCartItemMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();

  const handleCheckedChange = (id: string, isChecked: boolean) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [id]: isChecked,
    }));
  };

  const handleAddToCart = (item: CartItemResponse) => {
    if (currentCart.some((cart) => cart.id === item.id)) {
      const newCart = currentCart.filter((cart) => cart.id !== item.id);
      setCurrentCart(newCart);
    } else {
      if (currentCart) setCurrentCart([...currentCart, item]);
    }
  };

  const handleDelete = async (id: string) => {
    const response: MessageResponse<CartItemResponse> = await deleteCartItem(
      id
    );

    if (response.data) {
      if ("data" in response.data) {
        const itemUpdated: { product_id: string; quantity: number } = response
          .data.data as { product_id: string; quantity: number };
        const newCart = currentCart.filter(
          (cart: CartItemResponse) => cart.id !== itemUpdated.product_id
        );
        setCurrentCart(newCart);
      }
    }
  };
  const handleChangeQuantity = async (
    value: string,
    id: string,
    quantity: number | undefined
  ) => {
    const updateData = {
      product_id: id,
      quantity: value,
    };
    const response: MessageResponse<CartItemResponse> = await updateCartItem(
      updateData
    );
    if (Number(value) > Number(quantity)) {
      notification.error({
        message: "Vượt quá số lượng sản phẩm",
        description: "Vượt quá số lượng sản phẩm",
      });
    } else {
      if (response.data) {
        if ("data" in response.data) {
          const itemUpdated: { product_id: string; quantity: number } = response
            .data.data as { product_id: string; quantity: number };
          const newCart = currentCart.map((cart: CartItemResponse) =>
            cart.id === itemUpdated.product_id
              ? { ...cart, quantity: itemUpdated.quantity }
              : cart
          );
          setCurrentCart(newCart);
        }
      }
    }
  };
  const handleCheckedAll = () => {
    if (data) {
      const allChecked = !checkedAll;
      const updatedCheckedItems: Record<string, boolean> = {};

      data.data.forEach((item) => {
        updatedCheckedItems[item.id] = allChecked;
      });

      setCheckedAll(allChecked);
      setCheckedItems(updatedCheckedItems);
      setCurrentCart(data.data);
    }
  };

  useEffect(() => {
    if (currentCart.length === data?.data.length && currentCart.length > 0) {
      setCheckedAll(true);
    } else {
      setCheckedAll(false);
    }
    console.log(currentCart, "current", data?.data);
  }, [currentCart, data]);
  return (
    <UserCartWrapper>
      <List
        dataSource={data?.data}
        header={
          <List.Item>
            <Checkbox
              onChange={handleCheckedAll}
              checked={checkedAll}
            ></Checkbox>
            {HeaderCart}
          </List.Item>
        }
        renderItem={(item) => {
          return (
            <>
              <CartItemWrapper>
                <CartItem
                  items={item}
                  checked={checkedItems[item.id]}
                  handleAddToCart={handleAddToCart}
                  handleChangeQuantity={handleChangeQuantity}
                  handleDelete={handleDelete}
                  handleCheckedChange={handleCheckedChange}
                />
              </CartItemWrapper>
              <br />
            </>
          );
        }}
      ></List>
      <PurchaseBar cart={currentCart} />
    </UserCartWrapper>
  );
};
