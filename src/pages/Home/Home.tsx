import React from "react";
import { CardProduct } from "../../components/CardProduct/CardProduct";
import { styled } from "styled-components";
import { CardCategory } from "../../components/CardCategory/CardCategory";

const HomePage = styled.div`
  /* padding: 0 200px; */
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentTitle = styled.p`
  font-size: large;
  font-weight: bold;
  margin: 30px 0 10px 0;
`;

const HomeContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  margin-top: 10px;
  /* gap: 10px; */
`;

export const Home: React.FC = () => {
  return (
    <HomePage>
      <ContentWrapper>
        <ContentTitle>Shop Our Top Categories</ContentTitle>
        <HomeContent>
          <CardCategory />
          <CardCategory />
          <CardCategory />
          <CardCategory />
          <CardCategory />
          <CardCategory />
        </HomeContent>
      </ContentWrapper>

      <ContentWrapper>
        <ContentTitle>Best Deals For You!</ContentTitle>
        <HomeContent>
          <CardProduct desc="Công ty sản xuất: Shaoxing Shangyu Yifei Mold Co., Ltd.  Địa chỉ: Thiệu Hưng, Chiết Giang" />
          <CardProduct desc="Công ty sản xuất: Shaoxing Shangyu Yifei " />
          <CardProduct desc="Công ty sản xuất: Shaoxing Shangyu Yifei Mold Co., Ltd.  Địa chỉ:" />
          <CardProduct desc="Công ty sản xuất: Shaoxing " />
        </HomeContent>
      </ContentWrapper>
    </HomePage>
  );
};
