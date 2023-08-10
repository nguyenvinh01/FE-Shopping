import React from "react";
import imageUrl from "../../assets/images/lap 1.png";
import { styled } from "styled-components";

const CategoryCard = styled.div`
  position: relative;

  p {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    margin: 10px 0;
  }

  img {
    width: 150px;
    height: 220px;
    border-radius: 10px;
    background-color: lightblue;
  }
`;

interface cardCategoryType {
  name: string;
  img_url: string;
}

export const CardCategory: React.FC<cardCategoryType> = (name, img_url) => {
  return (
    <CategoryCard>
      <p>Tech</p>
      <img src={imageUrl} alt="Ảnh" />
    </CategoryCard>
  );
};
