import React from "react";
import { HeaderCompoment } from "../Header/HeaderCompoment";
import { FooterComponent } from "../Footer/FooterComponent";
import "../../App.css";

type DefaultComponentType = {
  children: React.ReactNode;
};
export const DefaultComponent = ({ children }: DefaultComponentType) => {
  return (
    <div className="App">
      <div className="header">
        <HeaderCompoment></HeaderCompoment>
      </div>
      <div className="content">{children}</div>

      <div className="footer">
        <FooterComponent />
      </div>
    </div>
  );
};
