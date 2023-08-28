import React, { useEffect } from "react";
import { styled } from "styled-components";
import { Button, Card, notification } from "antd";
import {
  CardProductType,
  CartResponse,
  MessageResponse,
} from "../../interface/interface";
import { useNavigate } from "react-router-dom";
import {
  useAddToCartMutation,
  useGetCartItemQuery,
} from "../../redux/apis/apiCart";
import numeral from "numeral";
import { FormatNumber } from "../../utility/FormatNumber";
import { useGetProductDetailQuery } from "../../redux/apis/apiProduct";

const { Meta } = Card;

const ProductCard = styled.div`
  /* margin: 10px 5px; */
  margin-bottom: 10px;
  .ant-card:hover {
    transform: translateY(-5px);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }

  .ant-card-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 5px;
  }

  .ant-card-body h3 {
    margin: 0 0 5px 0;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    min-height: 44px;
  }

  .ant-card-body p {
    margin: 0 0 10px 0;
    font-weight: bold;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }

  .ant-card-meta-title,
  .ant-card-meta-description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    min-height: 44px;
  }

  .ant-card-body .ant-btn {
    margin: 10px 5px 0 0;
    align-self: flex-end;
    background-color: #ff9c00;
  }
`;

export const CardProduct: React.FC<CardProductType> = ({
  name,
  price,
  desc,
  img_url,
  idProduct,
}) => {
  const navigate = useNavigate();
  const { data } = useGetProductDetailQuery(idProduct);

  const [addToCart] = useAddToCartMutation();
  const { data: cartData } = useGetCartItemQuery();
  var quantity: number = 0;
  useEffect(() => {
    quantity = Number(data?.data.quantity);
  }, [cartData]);
  const handleAddToCart = async () => {
    const token = localStorage.getItem("access_token");
    console.log(data?.data.quantity, "data quantity");
    const currentProduct = cartData?.data.find((cart) => cart.id === idProduct);
    if (!token) {
      notification.warning({
        message: "Sign in to shopping",
        description: "Sign in to shopping",
      });
      navigate("/sign-in");
    } else {
      if (!currentProduct) {
        console.log(quantity, "Còn");

        const response: MessageResponse<CartResponse> = await addToCart(
          idProduct
        );
        if (response.data?.success) {
          notification.success({
            message: "Adding Success",
            // description: `Thêm thành công vào rỏ hàng`,
          });
        } else {
          notification.error({
            message: "Error",
            // description: `Có lỗi xảy ra`,
          });
        }
      } else {
        console.log(currentProduct?.quantity, quantity, "Hết");
        if (Number(currentProduct?.quantity) >= quantity) {
          notification.error({
            message: "Exceeded available stock",
            description: `Exceeded available stock`,
          });
        } else {
          const response: MessageResponse<CartResponse> = await addToCart(
            idProduct
          );
          if (response.data?.success) {
            notification.success({
              message: "Adding Success",
              // description: `Thêm thành công vào rỏ hàng`,
            });
          } else {
            notification.error({
              message: "Error",
              // description: `Có lỗi xảy ra`,
            });
          }
        }
      }
    }
  };
  return (
    <ProductCard>
      <Card
        hoverable
        style={{ width: 220, height: "auto" }}
        cover={
          <img
            alt="product"
            src={img_url}
            style={{ width: 220, height: 190 }}
          />
        }
        onClick={(e) => {
          const element = e.target as HTMLElement;

          if (element.tagName === "BUTTON" || element.tagName === "SPAN") {
            handleAddToCart();
          } else navigate(`/products/${idProduct}`);
        }}
      >
        <h3>{name}</h3>

        <p>{FormatNumber(price)}₫</p>

        <Meta style={{ marginBlockEnd: 0 }} description={desc} />
        <Button type="primary" shape="round">
          Add to card
        </Button>
      </Card>
    </ProductCard>
  );
};
