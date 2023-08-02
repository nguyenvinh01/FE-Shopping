import React from "react";
import { ItemPage } from "./FooterComponent";
interface ItemFooter {
  title: string;
  item: ItemPage[];
  children?: React.ReactNode;
}
export const FooterItem = ({ item, title, children, ...rest }: ItemFooter) => {
  return (
    <div>
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
    </div>
  );
};
