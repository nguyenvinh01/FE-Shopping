import React from "react";
import { styled } from "styled-components";
import { Button, Card } from "antd";

const { Meta } = Card;

const ProductCard = styled.div`
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

interface cardType {
  name?: string;
  desc?: string;
}

export const CardProduct: React.FC<cardType> = ({ desc }) => {
  return (
    <ProductCard>
      <Card
        hoverable
        style={{ width: 220, height: "auto" }}
        cover={
          <img
            alt="product"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            style={{ width: 220, height: 190 }}
          />
        }
      >
        <h3>Title of the product card goes here.</h3>

        <p>100000 - 80000</p>

        <Meta style={{ marginBlockEnd: 0 }} description={desc} />
        <Button type="primary" shape="round">
          Add to card
        </Button>
      </Card>
    </ProductCard>
  );
};
