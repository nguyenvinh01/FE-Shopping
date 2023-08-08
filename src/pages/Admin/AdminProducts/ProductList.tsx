import { Space, Table } from "antd";
import { Content } from "antd/es/layout/layout";
import type { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { AiOutlineEdit, AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

interface DataType {
  key: string;
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  //   status: string;
}

const data: DataType[] = [
  {
    key: "1",
    id: "1",
    name: "Product1",
    category: "Category1",
    quantity: 100,
    price: 10000,
  },
  {
    key: "2",
    id: "2",
    name: "Product2",
    category: "Category2",
    quantity: 100,
    price: 10000,
  },
  {
    key: "3",
    id: "3",
    name: "Product3",
    category: "Category3",
    quantity: 100,
    price: 10000,
  },
];

export const ProductList = () => {
  const navigate = useNavigate();

  const handleDetail = (id: string) => {
    navigate("/admin/products/detail");
  };
  const handleEdit = (id: string) => {
    navigate("/admin/products/edit");
  };
  const handleDelete = (id: String) => {
    console.log(id);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Product Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      // render: (text) => <a>{text}</a>,
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
      <Table columns={columns} dataSource={data} />
    </>
  );
};
