import React from "react";
import { CardProduct } from "../../components/CardProduct/CardProduct";
import { styled } from "styled-components";

const HomeContent = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: stretch;
  margin-top: 50px;
  gap: 2rem;
  padding: 0 200px;
`;

export const Home: React.FC = () => {
  return (
    <div>
      <HomeContent>
        <CardProduct desc="Công ty sản xuất: Shaoxing Shangyu Yifei Mold Co., Ltd.  Địa chỉ: Thiệu Hưng, Chiết Giang" />
        <CardProduct desc="Công ty sản xuất: Shaoxing Shangyu Yifei " />
        <CardProduct desc="Công ty sản xuất: Shaoxing Shangyu Yifei Mold Co., Ltd.  Địa chỉ:" />
        <CardProduct desc="Công ty sản xuất: Shaoxing " />
      </HomeContent>
    </div>
  );
};
