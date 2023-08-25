import React from "react";
import { styled } from "styled-components";
import { Button, Card, notification } from "antd";
import {
  CardProductType,
  CartResponse,
  MessageResponse,
} from "../../interface/interface";
import { useNavigate } from "react-router-dom";
import { useAddToCartMutation } from "../../redux/apis/apiCart";
import numeral from "numeral";
import { FormatNumber } from "../../utility/FormatNumber";

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
  const [addToCart] = useAddToCartMutation();
  const handleAddToCart = async () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const response: MessageResponse<CartResponse> = await addToCart(
        idProduct
      );
      if (response.data?.success) {
        notification.success({
          message: "Thêm thành công",
          description: `Thêm thành công vào rỏ hàng`,
        });
      } else {
        notification.error({
          message: "Có lỗi xảy ra",
          description: `Có lỗi xảy ra`,
        });
      }
    } else {
      notification.warning({
        message: "Đăng nhập để mua hàng",
        description: "Đăng nhập để mua hàng",
      });
      navigate("/sign-in");
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
        onClick={() => navigate(`/products/${idProduct}`)}
      >
        <h3>{name}</h3>

        <p>{FormatNumber(price)}₫</p>

        <Meta style={{ marginBlockEnd: 0 }} description={desc} />
      </Card>
      {/* <Button type="primary" shape="round" onClick={() => handleAddToCart()}>
        Add to card
      </Button> */}
    </ProductCard>
  );
};
