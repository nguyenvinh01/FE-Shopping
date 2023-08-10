import React, { useEffect } from "react";
import { CardProduct } from "../../components/CardProduct/CardProduct";
import { styled } from "styled-components";
import { CardCategory } from "../../components/CardCategory/CardCategory";
import { useGetCategoriesQuery } from "../../redux/apis/apiCategory";
import { useGetProductsQuery } from "../../redux/apis/apiProduct";

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

const HomeItems = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  margin-top: 10px;
  /* gap: 10px; */
`;

export const Home: React.FC = () => {
  const { data: categoriesData } = useGetCategoriesQuery("");
  const { data: productsData } = useGetProductsQuery("");

  useEffect(() => {}, []);

  console.log("categoriesData1: ", categoriesData);
  console.log("productsData: ", productsData);

  return (
    <HomePage>
      <ContentWrapper>
        <ContentTitle>Shop Our Top Categories</ContentTitle>
        <HomeItems>
          <CardCategory />
          <CardCategory />
          <CardCategory />
          <CardCategory />
          <CardCategory />
          <CardCategory />
        </HomeItems>
      </ContentWrapper>

      <ContentWrapper>
        <ContentTitle>Best Deals For You!</ContentTitle>
        <HomeItems>
          <CardProduct desc="Công ty sản xuất: Shaoxing Shangyu Yifei Mold Co., Ltd.  Địa chỉ: Thiệu Hưng, Chiết Giang" />
          <CardProduct desc="Công ty sản xuất: Shaoxing Shangyu Yifei " />
          <CardProduct desc="Công ty sản xuất: Shaoxing Shangyu Yifei Mold Co., Ltd.  Địa chỉ:" />
          <CardProduct desc="Công ty sản xuất: Shaoxing " />
        </HomeItems>
      </ContentWrapper>
    </HomePage>
  );
};
