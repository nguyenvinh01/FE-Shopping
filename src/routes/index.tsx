import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Product } from "../pages/Product/Product";

export const AppRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product" element={<Product />} />
    </Routes>
  );
};
