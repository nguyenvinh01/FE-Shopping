import { List, Menu } from "antd";
import React from "react";
import { styled } from "styled-components";
import { AiOutlineUser } from "react-icons/ai";
import { BsFillClipboardFill, BsCart3 } from "react-icons/bs";
import { UserProfile } from "../UserProfile/UserProfile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { dashboardUser, routes } from "../../routes";
import { UserCart } from "../UserCart/UserCart";

const DashboardUserWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 100%;
`;
const DashboardUserSide = styled.div`
  width: 150px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* flex-basis: 1; */
  .ant-list-item {
    border: none;
    padding-top: 0px;
  }
`;
const DashboardUserContent = styled.div`
  flex-shrink: 9;
`;
const data = [
  {
    title: "Tài khoản",
    icon: <AiOutlineUser />,
  },
  {
    title: "Giỏ hàng",
    icon: <BsFillClipboardFill />,
  },
  {
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
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item>
              <i>{item.icon}</i>
              <List.Item.Meta
                //   avatar={
                //     <Avatar
                //       src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                //     />
                //   }
                title={<a href="/">{item.title}</a>}
                // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
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
              <Route
                key={route.path}
                path={route.path}
                element={
                  // <Layout>
                  <Page />
                  // </Layout>
                }
              />
            );
          })}
        </Routes>
        {/* <Routes>
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/settings" element={<UserProfile />} />
          <Route path="/" element={<UserCart />} />
        </Routes> */}
      </DashboardUserContent>
    </DashboardUserWrapper>
  );
};
