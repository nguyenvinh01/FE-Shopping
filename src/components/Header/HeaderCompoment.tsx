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
const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        Thông tin cá nhân
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        Đơn hàng
      </a>
    ),
  },
];

const { Item } = Menu;
const { Header } = Layout;
type MenuItem = {
  key?: string;
  label?: string;
};
const itemsMenu: MenuItem[] = [
  {
    key: "home",
    label: "Home",
  },
  {
    key: "product",
    label: "Product",
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
  margin-bottom: 25px;
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
  return (
    <HeaderLayout>
      <Header>
        <Image src={Logo} preview={false}>
          Image
        </Image>
        <Menu mode="horizontal">
          {itemsMenu.map((menuItem) => (
            <Item key={menuItem.key}>
              <a>{menuItem.label}</a>
            </Item>
          ))}
        </Menu>

        <SearchComponent
          placeholder="search text"
          textButton="Search"
          color="red"
        />
        <div>
          <Space>
            <Button shape="round" type="primary">
              Sign Up
            </Button>
            <Button shape="round" type="primary" ghost>
              Sign In
            </Button>
          </Space>
        </div>
        {/* <AvatarProfile>
          <Space>
            <a>
              <BsCart4 size={25} />
            </a>
            <Dropdown menu={{ items }} placement="bottomRight" arrow>
              <Avatar src={AvatarUser} size={40}></Avatar>
            </Dropdown>
          </Space>
        </AvatarProfile> */}
      </Header>
    </HeaderLayout>
  );
};
