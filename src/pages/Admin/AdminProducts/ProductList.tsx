import { Skeleton, Pagination, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AiOutlineEdit, AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import {
  DataProductListType,
  Product,
  ProductListType,
} from "../../../interface/interface";
import { useEffect } from "react";

export const ProductList = ({ productsData, isFetching }: ProductListType) => {
  const navigate = useNavigate();

  const handleDetail = (id: string) => {
    navigate(`/admin/products/detail/${id}`);
  };
  const handleEdit = (id: string) => {
    navigate(`/admin/products/edit/${id}`);
  };
  const handleDelete = (id: String) => {
    console.log(id);
  };

  const columns: ColumnsType<Product> = [
    {
      title: "Product Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "categories",
      key: "categories",
      render: (_, categories) => (
        <>
          {categories.categories.map((category) => {
            return (
              <Tag color="blue" key={category.id}>
                {category.label.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, useData) => (
        <Space>
          <span>
            <span>
              <a onClick={() => handleDetail(useData.id)}>
                <AiOutlineEye />
              </a>
              <a onClick={() => handleEdit(useData.id)}>
                <AiOutlineEdit />
              </a>
              <a onClick={() => handleDelete(useData.id)}>
                <AiOutlineDelete />
              </a>
            </span>
          </span>
        </Space>
      ),
    },
  ];

  return (
    <>
      {!isFetching ? (
        <Table columns={columns} dataSource={productsData} pagination={false} />
      ) : (
        <Skeleton active />
      )}
    </>
  );
};
