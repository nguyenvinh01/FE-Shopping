import { Image } from "antd";
import React, { Fragment, useState } from "react";
import ImageProduct from "../../assets/images/lap 1.png";
import { styled } from "styled-components";
import { CheckoutItemType } from "../../interface/interface";
import numeral from "numeral";
import { FormatNumber } from "../../utility/FormatNumber";

// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckOutItemWrapper = styled.div`
  .image-product-checkout {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .checkout-item-first {
    width: 650px;
  }
  .body-checkout {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .product-detail-checkout {
    display: flex;
  }
  .body-checkout {
    display: flex;
    justify-content: space-between;
  }
  .body-checkout p {
    margin-left: -50px;
  }
  .checkout-item {
    width: 200px;
  }
`;
export const CheckoutItem = ({
  image,
  productname,
  categories,
  price,
  quantity,
  amount,
  product_id,
}: CheckoutItemType) => {
  return (
    <CheckOutItemWrapper>
      <div className="body-checkout">
        <div className="image-product-checkout checkout-item-first">
          <Image src={image} width={100} height={100} />
          <div>
            <div className="checkout-item">{productname}</div>
          </div>
          <div className="categories-product checkout-item">{categories}</div>
        </div>
        <div className="price-product">
          <p>{price}</p>
        </div>
        <div className="quantity">
          <p>{quantity}</p>
        </div>
        <div className="amount-product">
          <p>{FormatNumber(price * quantity)}₫</p>
        </div>
      </div>
    </CheckOutItemWrapper>
  );
};
