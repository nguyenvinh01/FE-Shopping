import { Button, Checkbox } from "antd";
import React, { Fragment } from "react";
import { styled } from "styled-components";
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
export const PurchaseBar = () => {
  return (
    <PurchaseBarWrapper>
      <div>
        <p>Giá: 12312312323123</p>
        <Button type="primary" size="large">
          Mua hàng
        </Button>
      </div>
    </PurchaseBarWrapper>
  );
};
