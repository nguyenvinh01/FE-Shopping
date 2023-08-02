import React from "react";
import styled from "styled-components";
import { FooterItem } from "./FooterItem";
import { SearchComponent } from "../SearchComponent/SearchComponent";

export type ItemPage = {
  key: string;
  text: string;
};

const Footer = styled.div`
  height: 190px;
  background-color: #393434;
  /* display: flex;
  flex-direction: row; */
`;
const PageFooter = styled.div`
  display: flex;
  flex-direction: row;
  text-decoration: none;
  justify-content: space-around;
  .title {
    color: #ff9c00;
    font-weight: bold;
  }
  li,
  a {
    list-style: none;
    color: #fff;
    margin: 4px 2px;
    text-decoration: none;
  }
`;

const itemPage: ItemPage[] = [
  {
    key: "home",
    text: "Home",
  },
  {
    key: "product",
    text: "Product",
  },
];

const itemContact: ItemPage[] = [
  {
    key: "desc",
    text: "Quod et similique dolore.",
  },
];
export const FooterComponent = () => {
  return (
    <Footer>
      <PageFooter>
        <FooterItem title="Pages" item={itemPage}>
          {/* <SearchComponent
            placeholder="Your email adress"
            textButton="Submit"
          /> */}
        </FooterItem>
        <FooterItem title="Contact" item={itemContact}></FooterItem>
      </PageFooter>
    </Footer>
  );
};
