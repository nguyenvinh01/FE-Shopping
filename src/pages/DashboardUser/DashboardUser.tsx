import { List, Menu } from "antd";
import React, { useEffect } from "react";
import { styled } from "styled-components";
import { AiOutlineUser } from "react-icons/ai";
import { BsFillClipboardFill, BsCart3 } from "react-icons/bs";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { dashboardUser, routes } from "../../routes";
import { useGetUserQuery } from "../../redux/apis/apiUser";

const DashboardUserWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
  margin-right: 100px;
`;
const DashboardUserSide = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  .ant-list-item {
    border: none;
    padding-top: 0px;
  }
`;
const DashboardUserContent = styled.div`
  flex-grow: 7;
  width: 100%;
`;
const options = [
  {
    path: "/dashboard/",
    title: "Tài khoản",
    icon: <AiOutlineUser />,
  },

  {
    path: "/dashboard/order",
    title: "Đơn hàng",
    icon: <BsCart3 />,
  },
];

export const DashboardUser = () => {
  return (
    <DashboardUserWrapper>
      <DashboardUserSide>
        <List
          itemLayout="horizontal"
          dataSource={options}
          renderItem={(item, index) => (
            <List.Item>
              <i>{item.icon}</i>
              <List.Item.Meta
                title={<Link to={item.path}>{item.title}</Link>}
              />
            </List.Item>
          )}
        />
        {/* <Menu mode="vertical" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">Tai khoan</Menu.Item>
          <Menu.Item key="2">Tai khoan</Menu.Item>
          <Menu.Item key="3">Tai khoan</Menu.Item>
        </Menu> */}
      </DashboardUserSide>
      <DashboardUserContent>
        <Routes>
          {dashboardUser.map((route, index) => {
            const Page = route.page;
            return (
              <Route key={route.path} path={route.path} element={<Page />} />
            );
          })}
        </Routes>
      </DashboardUserContent>
    </DashboardUserWrapper>
  );
};
