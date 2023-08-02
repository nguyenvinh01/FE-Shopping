import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Products } from "../pages/Product/Product";
import { SignIn } from "../pages/SignIn/SignIn";
import { App } from "antd";

export const AppRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" index element={<Home />} />

        <Route path="/products" element={<Products />} />
      </Route>

      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<Products />} />
    </Routes>
  );
};
