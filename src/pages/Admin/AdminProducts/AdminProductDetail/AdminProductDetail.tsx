import { Avatar, Button, Descriptions } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React from "react";
import { styled } from "styled-components";
import { HeaderAdmin } from "../../../../components/HeaderAdmin/HeaderAdmin";

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 20px 15px;
`;

export const AdminProductDetail = () => {
  const handleDeleteProduct = () => {
    alert("Xóa thành công");
  };
  return (
    <>
      <HeaderAdmin pageName="Products Detail" />
      <Container>
        <div style={{ margin: "0 20px", flex: "1" }}>
          <Avatar size={200} icon={<UserOutlined />} />
        </div>
        <div style={{ marginRight: "20px", flex: "2" }}>
          <Descriptions title="Product Info">
            <Descriptions.Item label="Product Name">
              Zhou Maomao
            </Descriptions.Item>
            <Descriptions.Item label="category">
              Hangzhou, Zhejiang
            </Descriptions.Item>
            <Descriptions.Item label="price">10000000</Descriptions.Item>
            <Descriptions.Item label="quantity">3000</Descriptions.Item>
          </Descriptions>
          <div
            style={{
              display: "flex",
              maxWidth: "350px",
              justifyContent: "space-between",
              margin: "10px 0",
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{ minWidth: "150px" }}
            >
              Edit
            </Button>
            <Button
              danger
              style={{ minWidth: "150px" }}
              onClick={handleDeleteProduct}
            >
              Delete
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
};
