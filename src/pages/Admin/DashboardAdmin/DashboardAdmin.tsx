import React from "react";
import { SideBar } from "../../../components/SideBar/SideBar";
import { styled } from "styled-components";
import { Route, Routes } from "react-router-dom";
import { dashboardAdmin } from "../../../routes";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";

const DashboardAdminContent = styled(Content)`
  margin: 5px 20px 5px 10px;
`;

export const DashboardAdmin = () => {
  return (
    <Layout hasSider>
      <SideBar />
      <DashboardAdminContent>
        <Routes>
          {dashboardAdmin.map((route, index) => {
            const Page = route.page;

            return (
              <Route key={route.path} path={route.path} element={<Page />} />
            );
          })}
        </Routes>
      </DashboardAdminContent>
    </Layout>
  );
};
