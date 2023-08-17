import React, { useEffect } from "react";
import { CardProduct } from "../../components/CardProduct/CardProduct";
import { styled } from "styled-components";
import { CardCategory } from "../../components/CardCategory/CardCategory";
import { useGetCategoriesQuery } from "../../redux/apis/apiCategory";
import { useGetProductsQuery } from "../../redux/apis/apiProduct";
import { Category, Product } from "../../interface/interface";

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
  flex-wrap: wrap;
  /* gap: 10px; */
`;

export const Home: React.FC = () => {
  const { data: categoriesData } = useGetCategoriesQuery({});
  const { data: productsData } = useGetProductsQuery({});

  useEffect(() => {}, []);

  console.log("categoriesData: ", categoriesData);
  console.log("productsData: ", productsData);

  const renderCategoryList = () => {
    if (!categoriesData) {
      return null; // Hoặc hiển thị thông báo tải hoặc xử lý khác
    }
    return categoriesData.data.map((category: Category) => (
      <CardCategory
        key={category.id}
        name={category.label}
        img_url={category.image_url}
      />
    ));
  };

  const renderProductList = () => {
    if (!productsData) {
      return null; //Hoặc hiển thị thông báo tải
    }
    return productsData.data.map((product: Product) => (
      <CardProduct
        key={product.id}
        name={product.name}
        price={product.price}
        desc={product.description}
        img_url={product.image_url}
      />
    ));
  };

  return (
    <HomePage>
      <ContentWrapper>
        <ContentTitle>Shop Our Top Categories</ContentTitle>
        <HomeItems>{renderCategoryList()}</HomeItems>
      </ContentWrapper>

      <ContentWrapper>
        <ContentTitle>Best Deals For You!</ContentTitle>
        <HomeItems>{renderProductList()}</HomeItems>
      </ContentWrapper>
    </HomePage>
  );
};
