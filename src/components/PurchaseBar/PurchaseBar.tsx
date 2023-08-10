import { Button, Checkbox } from "antd";
import React, { Fragment, useState, useEffect } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { ReduxCartItemType, addCartItem } from "../../redux/slice/cartSlice";
import { setUser } from "../../redux/slice/userSlice";
import { CartItemType } from "../../pages/UserCart/CartItem";

const PurchaseBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: sticky;
  bottom: 0;
  z-index: 999;
  background-color: #fff;
  height: 60px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin-top: 30px;
  div {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    align-items: baseline;
    margin-right: 300px;
  }
  p {
    margin: 0px 20px;
  }
`;
interface PurchaseBarType {
  handleAddToCart?: () => void;
  cart: CartItemType[];
}
export const PurchaseBar = ({ handleAddToCart, cart }: PurchaseBarType) => {
  const [disable, setDisable] = useState<boolean>(true);
  const navigate = useNavigate();
  const dataCart = useSelector<RootState>((state) => state.cart.items);
  const dispatch = useDispatch();
  const handleClick = () => {
    const newItem = {
      id: "newItemId",
      quantity: 1,
      price: 10,
    };
    dispatch(addCartItem(cart));
    navigate("/check-out");
  };
  useEffect(() => {
    if (cart.length == 0) setDisable(true);
    else setDisable(false);
  }, [cart]);

  return (
    <PurchaseBarWrapper>
      <div>
        <p>
          Giá:{" "}
          {cart.reduce<number>((prev, current, index, array) => {
            return prev + current.price * current.quantity;
          }, 0)}
        </p>
        <Button
          type="primary"
          size="large"
          onClick={() => handleClick()}
          disabled={disable}
        >
          Mua hàng
        </Button>
      </div>
    </PurchaseBarWrapper>
  );
};
