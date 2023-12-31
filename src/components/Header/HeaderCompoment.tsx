import React, { useEffect } from "react";
import {
  Layout,
  Menu,
  Image,
  Button,
  Space,
  Dropdown,
  Avatar,
  Input,
  Badge,
} from "antd";
import type { MenuProps } from "antd";
import styled from "styled-components";
import Logo from "../../assets/sanakilogo1.png";
import { BsCart4 } from "react-icons/bs";
import AvatarUser from "../../assets/images/pngtree-man-user-avatar-person-illustration-png-image_5239517.png";
import { SearchComponent } from "../SearchComponent/SearchComponent";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { InitialStateType, resetUser } from "../../redux/slice/userSlice";
import { ROLE, User } from "../../interface/interface";
import { useLoginMutation, useLogoutMutation } from "../../redux/apis/apiUser";
import { useGetCartItemQuery } from "../../redux/apis/apiCart";

const { Item } = Menu;
const { Header } = Layout;
type MenuItem = {
  key: string;
  label: string;
  path: string;
};
const itemsMenu: MenuItem[] = [
  {
    key: "home",
    label: "Home",
    path: "/",
  },
  {
    key: "product",
    label: "Product",
    path: "/products",
  },
];

const AvatarProfile = styled.div`
  .ant-avatar {
    padding-bottom: 8px;
  }
`;
const HeaderLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* margin-bottom: 25px; */
  .ant-layout-header {
    text-align: center;
    color: #000;
    padding: 0 200px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eedede;
  }
`;
export const HeaderCompoment = () => {
  const [logout] = useLogoutMutation();
  const { data, isFetching } = useGetCartItemQuery();
  const user = useSelector<RootState, User>((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOut = async () => {
    dispatch(resetUser({}));
    localStorage.clear();
    await logout();
    navigate("/");
  };
  const token = localStorage.getItem("access_token");
  const items = [
    ...(user.role === ROLE.ADMIN
      ? [
          {
            key: "4",
            label: (
              <a onClick={() => navigate("/admin/dashboard")}>
                <span>Manage</span>
              </a>
            ),
          },
        ]
      : []),
    {
      key: "1",
      label: (
        <a onClick={() => navigate("/dashboard")}>
          <span>Profile</span>
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a onClick={() => navigate("/dashboard/order")}>
          <span>Order</span>
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a onClick={() => logOut()}>
          <span>Log Out</span>
        </a>
      ),
    },
  ];

  return (
    <HeaderLayout>
      <Header>
        <Image
          src={Logo}
          preview={false}
          onClick={() => {
            navigate("/");
          }}
        >
          Image
        </Image>
        <Menu mode="horizontal">
          {itemsMenu.map((menuItem) => (
            <Item
              key={menuItem.key}
              onClick={() => {
                navigate(menuItem.path);
              }}
            >
              <a>{menuItem.label}</a>
            </Item>
          ))}
        </Menu>

        {token ? (
          <AvatarProfile>
            <Space>
              <Link to={"/dashboard/cart"}>
                <Badge size="small" count={data?.data.length}>
                  <BsCart4 size={25} />
                </Badge>
              </Link>
              <Dropdown menu={{ items }} placement="bottomRight" arrow>
                <Avatar src={user.image_url} size={40}></Avatar>
              </Dropdown>
            </Space>
          </AvatarProfile>
        ) : (
          <div>
            <Space>
              <Button
                shape="round"
                type="primary"
                onClick={() => {
                  navigate("/sign-up");
                }}
              >
                Sign Up
              </Button>
              <Button
                shape="round"
                type="primary"
                ghost
                onClick={() => {
                  navigate("/sign-in");
                }}
              >
                Sign In
              </Button>
            </Space>
          </div>
        )}
      </Header>
    </HeaderLayout>
  );
};
