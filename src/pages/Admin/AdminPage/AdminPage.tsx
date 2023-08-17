import React from "react";
import { StatisticalCard } from "../../../components/StatisticalCard/StatisticalCard";
import { styled } from "styled-components";
import { HeaderAdmin } from "../../../components/HeaderAdmin/HeaderAdmin";

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

  return (
    <>
      <HeaderAdmin pageName="AdminPage" />

      <Statistical>
        <StatisticalCard />
        <StatisticalCard />
        <StatisticalCard />
        <StatisticalCard />
      </Statistical>
    </>
  );
}
