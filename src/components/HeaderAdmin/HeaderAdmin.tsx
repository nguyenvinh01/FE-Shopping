import React from "react";
import { styled } from "styled-components";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* height: 100px; */
  margin: 0 10px 10px 20px;
`;

interface HeaderAdminType {
  pageName: string;
}

export const HeaderAdmin = ({ pageName }: HeaderAdminType) => {
  const date = Date();

  return (
    <Header>
      <h1>{pageName}</h1>
      <h4>{date}</h4>
    </Header>
  );
};
