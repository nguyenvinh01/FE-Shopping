import React from "react";
import styled from "styled-components";
import { FooterItem } from "./FooterItem";
import { SearchComponent } from "../SearchComponent/SearchComponent";
import ContactImage from "../../assets/images/sanakilogo 2.png";

export type ItemPage = {
  key: string;
  text: string;
};

const Footer = styled.div`
  height: fit-content;
  background-color: #393434;
  display: flex;
  /* flex-direction: row; */
  justify-content: center;
  /* padding: 0px 200px; */
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
  {
    key: "email",
    text: "Optioderq@gmail.com",
  },
  {
    key: "phone",
    text: "567.652.3218 x2763",
  },
];
const itemCategories: ItemPage[] = [
  {
    key: "cate1",
    text: "Categories 1",
  },
  {
    key: "cate2",
    text: "Categories 2",
  },
  {
    key: "cate3",
    text: "Categories 2",
  },
];
const itemComplain: ItemPage[] = [
  {
    key: "desc",
    text: "Get the Latest Products & Best Deals in Your Inbox as First Person",
  },
];
export const FooterComponent = () => {
  return (
    <Footer>
      <PageFooter>
        <FooterItem
          title="Contact"
          item={itemContact}
          image={ContactImage}
        ></FooterItem>
        <FooterItem title="Pages" item={itemPage}></FooterItem>
        <FooterItem title="Categories" item={itemCategories} />
        <FooterItem title="News Latter Subscription" item={itemComplain}>
          <SearchComponent
            placeholder="Your email adress"
            textButton="Submit"
          />
        </FooterItem>
      </PageFooter>
    </Footer>
  );
};
