import React from "react";
import {
  Layout,
  Menu,
  Image,
  Button,
  Space,
  Dropdown,
  Avatar,
  Input,
} from "antd";
import type { MenuProps } from "antd";
import styled from "styled-components";
import Logo from "../../assets/sanakilogo1.png";
import { BsCart4 } from "react-icons/bs";
import AvatarUser from "../../assets/images/pngtree-man-user-avatar-person-illustration-png-image_5239517.png";
import { SearchComponent } from "../SearchComponent/SearchComponent";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <Link to={"/dashboard"}>
        <span>Thông tin cá nhân</span>
      </Link>
    ),
  },
  {
    key: "2",
    label: (
      <Link to={"/dashboard/order"}>
        <span>Đơn hàng</span>
      </Link>
    ),
  },
  {
    key: "3",
    label: (
      <Link to={"/"}>
        <span>Đăng xuất</span>
      </Link>
    ),
  },
];

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
    path: "/",
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
  const dataCart = useSelector<RootState>((state) => state.cart);
  console.log(dataCart);

  const navigate = useNavigate();
  return (
    <HeaderLayout>
      <Header>
        <Image src={Logo} preview={false}>
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

        <SearchComponent
          placeholder="search text"
          textButton="Search"
          color="red"
        />
        {/* <div>
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
        </div> */}
        <AvatarProfile>
          <Space>
            <Link to={"/dashboard/cart"}>
              <span>
                <BsCart4 size={25} />
              </span>
            </Link>
            <Dropdown menu={{ items }} placement="bottomRight" arrow>
              <Avatar src={AvatarUser} size={40}></Avatar>
            </Dropdown>
          </Space>
        </AvatarProfile>
      </Header>
    </HeaderLayout>
  );
};
