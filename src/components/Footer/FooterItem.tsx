import React from "react";
import { ItemPage } from "./FooterComponent";
import { Image } from "antd";
import { styled } from "styled-components";
interface ItemFooter {
  title: string;
  item: ItemPage[];
  children?: React.ReactNode;
  image?: string;
}
const ItemFooter = styled.div`
  margin: 0px 20px;
`;
export const FooterItem = ({ item, title, children, ...rest }: ItemFooter) => {
  return (
    <ItemFooter>
      {rest.image && <Image src={rest.image} preview={false} />}
      <ul>
        <li className="title">{title}</li>
        {item.map((item: ItemPage) => {
          return (
            <li key={item.key}>
              <a href="/">{item.text}</a>
            </li>
          );
        })}
      </ul>
      <div>{children}</div>
    </ItemFooter>
  );
};
