import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AiOutlineEdit, AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { AccountDetail } from "./AccountDetail";

interface DataType {
  key: string;
  id: string;
  name: string;
  email: string;
  orders: number;
  total: number;
  //   status: string;
}

const data: DataType[] = [
  {
    key: "1",
    id: "1",
    name: "test1",
    email: "test1@gmail.com",
    orders: 30,
    total: 10000000,
  },
  {
    key: "2",
    id: "2",
    name: "test2",
    email: "test2@gmail.com",
    orders: 30,
    total: 10000000,
  },
  {
    key: "3",
    id: "3",
    name: "test3",
    email: "test3@gmail.com",
    orders: 30,
    total: 10000000,
  },
];

export const AccountList = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [idOrder, setIdOrder] = useState("");

  const showModal = () => {
    setIsVisible(true);
  };

  const hideModal = () => {
    setIsVisible(false);
  };

  const handleOk = () => {
    // Xử lý khi người dùng bấm nút OK (nếu cần)
    hideModal();
  };

  const handleCancel = () => {
    // Xử lý khi người dùng bấm nút Cancel (nếu cần)
    hideModal();
  };

  const handleDetail = (id: string) => {
    showModal();
  };

  const handleEdit = (id: string) => {
    navigate("/admin/products/edit");
  };
  const handleDelete = (id: String) => {
    console.log(id);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Customer Name",
      dataIndex: "name",
      key: "name",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Customer Email",
      dataIndex: "email",
      key: "email",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Orders Count",
      dataIndex: "orders",
      key: "orders",
    },
    {
      title: "Total Income",
      dataIndex: "total",
      key: "total",
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
      <AccountDetail
        visible={isVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        idOrder={idOrder}
      />
    </>
  );
};
