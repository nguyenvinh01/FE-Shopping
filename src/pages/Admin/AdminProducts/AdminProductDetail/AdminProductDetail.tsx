import { Avatar, Button, Descriptions, Tag } from "antd";
import React from "react";
import { styled } from "styled-components";
import { HeaderAdmin } from "../../../../components/HeaderAdmin/HeaderAdmin";
import {
  useGetInventoryQuery,
  useGetProductDetailQuery,
} from "../../../../redux/apis/apiProduct";
import { useNavigate, useParams } from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 20px 15px;
`;

export const AdminProductDetail = () => {
  const { id }: any = useParams();
  const navigate = useNavigate();
  const { data: productsData, error } = useGetProductDetailQuery(id);
  const { data: inventoryData } = useGetInventoryQuery(id);

  if (error) {
    console.log("error is: ", error);
  }

  const handleEditProduct = () => {
    navigate(`/admin/products/edit/${id}`);
  };

  return (
    <>
      <HeaderAdmin pageName="Products Detail" />
      <Container>
        <div style={{ marginLeft: "40px", flex: "1" }}>
          <Avatar
            size={230}
            shape="square"
            src={productsData?.data.image_url}
          />
        </div>
        <div style={{ marginRight: "20px", flex: "2" }}>
          <Descriptions title="Product Info">
            <Descriptions.Item label="Product Name">
              {productsData?.data.name}
            </Descriptions.Item>
            <Descriptions.Item label="Category" span={2}>
              {productsData?.data.categories.map((category) => {
                return <Tag key={category.id}>{category.label}</Tag>;
              })}
            </Descriptions.Item>
            <Descriptions.Item label="Import Price">
              {inventoryData?.data.import_price}
            </Descriptions.Item>
            <Descriptions.Item label="Price">
              {productsData?.data.price}
            </Descriptions.Item>
            <Descriptions.Item label="Quantity">
              {productsData?.data.quantity}
            </Descriptions.Item>

            <Descriptions.Item label="Description" span={3}>
              {productsData?.data.description}
            </Descriptions.Item>
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
              onClick={handleEditProduct}
              style={{ minWidth: "150px" }}
            >
              Edit
            </Button>
            <Button
              // danger
              style={{ minWidth: "150px" }}
              onClick={() => {
                navigate("/admin/products");
              }}
            >
              Back
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
};
