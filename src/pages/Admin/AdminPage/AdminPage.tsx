import React from "react";
import { StatisticalCard } from "../../../components/StatisticalCard/StatisticalCard";
import { styled } from "styled-components";
import { HeaderAdmin } from "../../../components/HeaderAdmin/HeaderAdmin";
import { useGetProductsQuery } from "../../../redux/apis/apiProduct";
import { useGetCategoriesQuery } from "../../../redux/apis/apiCategory";
import { useGetOrderQuery } from "../../../redux/apis/apiOrder";
import {
  useGetAllUserQuery,
  useGetUserQuery,
} from "../../../redux/apis/apiUser";

const Statistical = styled.div`
  display: flex;
  /* flex-direction: row; */
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 20px 5px;
`;

export default function AdminPage() {
  const date = Date();
  const { data: categoriesData } = useGetCategoriesQuery({});
  const { data: productsData } = useGetProductsQuery({});
  const { data: orderData } = useGetOrderQuery();
  const { data: accountData } = useGetAllUserQuery();

  const statisticalCardData = [
    {
      title: "Sản phẩm",
      value: `${productsData?.metadata.count}`,
    },
    {
      title: "Loại sản phẩm",
      value: `${categoriesData?.metadata.count}`,
    },
    {
      title: "Đơn hàng",
      value: `${productsData?.metadata.count}`,
    },
    {
      title: "Tài khoản",
      value: `${accountData?.data.length}`,
    },
  ];

  const renderStatisticalCard = () => {
    return statisticalCardData.map((item) => {
      return (
        <StatisticalCard
          key={item.title}
          title={item.title}
          value={parseInt(item.value)}
        />
      );
    });
  };

  return (
    <>
      <HeaderAdmin pageName="AdminPage" />

      <Statistical>{renderStatisticalCard()}</Statistical>
    </>
  );
}
