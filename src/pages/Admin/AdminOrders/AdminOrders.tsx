import { Space, Table } from "antd";
import { Content } from "antd/es/layout/layout";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { AiOutlineEdit, AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import { HeaderAdmin } from "../../../components/HeaderAdmin/HeaderAdmin";

interface DataType {
  key: string;
  order_id: string;
  username: string;
  amount: number;
  orderdate: string;
  status: string;
}

const handleDetail = (id: string) => {
  console.log(id);
};
const handleEdit = (id: string) => {
  console.log(id);
};
const handleDelete = (id: String) => {
  console.log(id);
};

const columns: ColumnsType<DataType> = [
  {
    title: "Order Id",
    dataIndex: "order_id",
    key: "id",
  },
  {
    title: "User Name",
    dataIndex: "username",
    key: "name",
    // render: (text) => <a>{text}</a>,
  },
  {
    title: "Order Date",
    dataIndex: "orderdate",
    key: "orderdate",
    // render: (text) => <a>{text}</a>,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    render: (text, useData) => (
      <Space>
        <span>
          <span>
            <a onClick={() => handleDetail(useData.order_id)}>
              <AiOutlineEye />
            </a>
            <a onClick={() => handleEdit(useData.order_id)}>
              <AiOutlineEdit />
            </a>
            <a onClick={() => handleDelete(useData.order_id)}>
              <AiOutlineDelete />
            </a>
          </span>
        </span>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    order_id: "1",
    username: "User1",
    amount: 1000000,
    orderdate: "4/8/23",
    status: "done",
  },
  {
    key: "2",
    order_id: "2",
    username: "User2",
    amount: 1300000,
    orderdate: "4/8/23",
    status: "done",
  },
  {
    key: "3",
    order_id: "3",
    username: "User3",
    amount: 1500000,
    orderdate: "4/8/23",
    status: "pending",
  },
];

export const AdminOrders = () => {
  return (
    <>
      <HeaderAdmin pageName="AdminProducts" />
      <div>
        <Table columns={columns} dataSource={data} />;
      </div>
    </>
  );
};
