import React from "react";
import { styled } from "styled-components";
import { Button, Card } from "antd";
import { CardProductType } from "../../interface/interface";
import { useNavigate } from "react-router-dom";

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

        <p>{price}</p>

        <Meta style={{ marginBlockEnd: 0 }} description={desc} />
        <Button
          type="primary"
          shape="round"
          onClick={() => {
            console.log("click");
          }}
        >
          Add to card
        </Button>
      </Card>
    </ProductCard>
  );
};
