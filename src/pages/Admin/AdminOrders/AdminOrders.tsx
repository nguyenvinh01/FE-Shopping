import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { AiOutlineEdit, AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import { HeaderAdmin } from "../../../components/HeaderAdmin/HeaderAdmin";
import { OrderModal } from "../../OrderPage/OrderModal";

interface DataType {
  key: string;
  order_id: string;
  username: string;
  amount: number;
  orderdate: string;
  status: string;
}

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
      render: (text, orderData) => (
        <Space>
          <span>
            <a onClick={() => handleDetail(orderData.order_id)}>
              <AiOutlineEye size={18} style={{ marginLeft: "10px" }} />
            </a>
          </span>
        </Space>
      ),
    },
  ];

  return (
    <>
      <HeaderAdmin pageName="Order" />
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <OrderModal
        visible={isVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        idOrder={idOrder}
      />
    </>
  );
};
