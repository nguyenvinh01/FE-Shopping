import { Checkbox, Image, List } from "antd";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import ProductImage from "../../assets/images/lap 1.png";
import { CartItem } from "./CartItem";
import { PurchaseBar } from "../../components/PurchaseBar/PurchaseBar";
import { CartItemType } from "../../interface/interface";

const data: CartItemType[] = [
  {
    id: "12",
    image: ProductImage,
    desc: "Vero id delectus eos animi quia et.",
    categories: "Cate 1culpa et expedita",
    price: 1200,
    quantity: 1,
    amount: 12344,
  },
  {
    id: "123",
    image: ProductImage,
    desc: "Vero id delectus eos animi quia et.",
    categories: "Cate 1culpa et expedita",
    price: 1200,
    quantity: 1,
    amount: 12344,
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
  const [checkedAll, setCheckedAll] = useState(false);
  const [currentCart, setCurrentCart] = useState<CartItemType[]>([]);
  const handleChange = () => {
    setChecked(!checked);
  };
  console.log(currentCart, 1);

  const handleAddToCart = (item: CartItemType) => {
    if (currentCart?.some((cart) => cart.id === item.id)) {
      const newCart = currentCart?.filter((cart) => cart.id !== item.id);
      setCurrentCart(newCart);
    } else {
      setCurrentCart([...currentCart, item]);
    }
  };
  const handleCheckedAll = () => {
    setCurrentCart(data);
    if (currentCart.length === data.length && checkedAll == true) {
      setCurrentCart([]);
      setChecked(false);
      setCheckedAll(false);
    } else setCheckedAll(!checkedAll);
  };
  useEffect(() => {
    if (currentCart.length === data.length) {
      setCheckedAll(true);
      setChecked(true);
    } else {
      setCheckedAll(false);
      // setChecked(false);
    }
  }, [currentCart]);
  return (
    <UserCartWrapper>
      <List
        dataSource={data}
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
            <div>
              <CartItemWrapper>
                <CartItem
                  items={item}
                  checked={checked}
                  handleAddToCart={handleAddToCart}
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
