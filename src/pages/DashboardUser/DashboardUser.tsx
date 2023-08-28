import { List, Menu } from "antd";
import React, { useEffect } from "react";
import { styled } from "styled-components";
import { AiOutlineUser } from "react-icons/ai";
import { BsCart3 } from "react-icons/bs";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { dashboardUser } from "../../routes";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { User } from "../../interface/interface";

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
    title: "My Profile",
    icon: <AiOutlineUser />,
  },

  {
    path: "/dashboard/order",
    title: "Order",
    icon: <BsCart3 />,
  },
];

export const DashboardUser = () => {
  const user = useSelector<RootState, User>((state) => state.user);
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  if (!token) {
    navigate("/");
  }
  useEffect(() => {}, [user]);
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
