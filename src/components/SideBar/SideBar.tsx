import { styled } from "styled-components";
import { Avatar, Button, Layout } from "antd";
import { Menu } from "antd";
import logo from "../../assets/images/sanakilogo 1.png";
import { FaUserAlt } from "react-icons/fa";
import { FiLogOut, FiHome } from "react-icons/fi";
import { BsBox2, BsLayoutTextSidebarReverse } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { TbCategory } from "react-icons/tb";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { User } from "../../interface/interface";

const { Sider } = Layout;

const AdminSideBar = styled(Sider)`
  /* border-right: 1px solid ; */
  display: flex;
  border-right: 1px solid #dcdcdc;

  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: space-between;
  }

  .ant-layout-sider-children .ant-menu {
    border: none;
  }

  .ant-layout-sider-children ul li span {
    color: #8767e1;
  }
`;

const Logo = styled.img`
  padding: 10px;
  width: 200px;
  height: 50px;
  margin: 10px 0 50px 0;

  &:hover {
    cursor: pointer;
  }
`;

const AdminProfile = styled.div`
  padding: 10px 0;
  margin: 15px;
  border-top: 1px solid #dcdcdc;
  /* align-self: flex-end; */

  p {
    font-family: Inter;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 0em;
    text-align: left;
    margin: 10px 0;
    /* padding-left: 5px; */
  }

  .adminName {
    font-size: 18px;
    margin: 5px 0;
  }
`;

const AdminIcon = styled.div`
  display: flex;
  margin: 20px 10px;
`;

const LogoutButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 40px;
  margin-top: 10px;
`;

const siderStyle: React.CSSProperties = {
  //   textAlign: "center",
  //   lineHeight: "40px",
  width: "250px",
  backgroundColor: "#ffffff",
  overflow: "auto",
  minHeight: "100vh",
};

const items = [
  {
    key: "/admin/dashboard",
    icon: <FiHome />,
    label: "Dashboard",
  },
  {
    key: "/admin/products",
    icon: <BsBox2 />,
    label: "Products",
  },
  {
    key: "/admin/categories",
    icon: <TbCategory />,
    label: "Categories",
  },
  {
    key: "/admin/orders",
    icon: <BsLayoutTextSidebarReverse />,
    label: "Orders",
  },
  {
    key: "/admin/accounts",
    icon: <HiOutlineUserGroup />,
    label: "Accounts",
  },
];

export const SideBar = () => {
  const userData = useSelector<RootState, User>((state) => state.user);
  const [selectedKeys, setSelectedKeys] = useState([""]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = location.pathname;
    const matchingItem = items.find((item) => currentPath.includes(item.key));
    if (matchingItem) {
      setSelectedKeys([matchingItem.key]);
    } else setSelectedKeys([""]);
    // console.log(userData);
  }, [location]);

  return (
    <AdminSideBar style={siderStyle} width={230}>
      <div style={{ margin: 5 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Logo
            src={logo}
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <Menu
          onClick={(item) => {
            navigate(item.key);
            setSelectedKeys([item.key]);
          }}
          mode="inline"
          selectedKeys={selectedKeys}
          items={items}
        />
      </div>
      <AdminProfile>
        <p style={{}}>Profile</p>
        <AdminIcon>
          <Avatar size={60} icon={<FaUserAlt />} src={userData.image_url} />
          <div style={{ marginLeft: 15 }}>
            <p className="adminName">{userData.fullname}</p>
            <span>{userData.role}</span>
          </div>
        </AdminIcon>
        <LogoutButton type="primary">
          <FiLogOut size={20} />
          <span className="logOut">Log out</span>
        </LogoutButton>
      </AdminProfile>
    </AdminSideBar>
  );
};
