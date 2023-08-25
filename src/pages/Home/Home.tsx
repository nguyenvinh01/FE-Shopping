import React from "react";
import { CardProduct } from "../../components/CardProduct/CardProduct";
import { styled } from "styled-components";
import { CardCategory } from "../../components/CardCategory/CardCategory";
import { useGetCategoriesQuery } from "../../redux/apis/apiCategory";
import { useGetProductsQuery } from "../../redux/apis/apiProduct";
import { Category, Product } from "../../interface/interface";
import { Carousel } from "@trendyol-js/react-carousel";

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

  .styles-module_carousel-base__3keqD
    .styles-module_item-provider__YgMwz
    .styles-module_item-tracker__3bypy
    .styles-module_item-container__a8zaY {
    width: 170px !important;
    margin: 5px 10px;
  }

  .styles-module_carousel-base__3keqD .styles-module_carousel-arrow__26sRw {
    display: none;
  }
`;

export const Home: React.FC = () => {
  const { data: categoriesData, isSuccess } = useGetCategoriesQuery({});
  const { data: productsData } = useGetProductsQuery({ limit: 10 });

  const renderCategoryList = () => {
    if (categoriesData) {
      return categoriesData.data.map((category: Category) => (
        <CardCategory
          key={category.id}
          name={category.label}
          img_url={category.image_url}
        />
      ));
    } else return [];
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
        idProduct={product.id}
      />
    ));
  };

  return (
    <HomePage>
      <ContentWrapper>
        <ContentTitle>Shop Our Top Categories</ContentTitle>
        <HomeItems>
          {isSuccess ? (
            <Carousel show={6} slide={6} swiping={true}>
              {renderCategoryList()}
            </Carousel>
          ) : (
            ""
          )}
        </HomeItems>
      </ContentWrapper>

      <ContentWrapper>
        <ContentTitle>Best Deals For You!</ContentTitle>
        <HomeItems>{renderProductList()}</HomeItems>
      </ContentWrapper>
    </HomePage>
  );
};
