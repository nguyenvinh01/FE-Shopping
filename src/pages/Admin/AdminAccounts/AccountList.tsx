import { Skeleton, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AiOutlineEdit, AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { AccountDetail } from "./AccountDetail";

interface DataType {
  // key?: string;
  id: string;
  fullname: string;
  email: string;
  phone?: string;
  // orders?: number;
  // total?: number;
  //   status: string;
}

interface AccountListProps {
  data: DataType[];
  isFetch: boolean;
}
export const AccountList = ({ data, isFetch }: AccountListProps) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [idOrder, setIdOrder] = useState("");
  const [idUser, setIdUser] = useState("");

  const showModal = (id: string) => {
    setIsVisible(true);
    setIdUser(id);
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
    showModal(id);
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
      dataIndex: "fullname",
      key: "fullname",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Customer Email",
      dataIndex: "email",
      key: "email",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Customer Phone",
      dataIndex: "phone",
      key: "phone",
      // render: (text) => <a>{text}</a>,
    },
    // {
    //   title: "Orders Count",
    //   dataIndex: "orders",
    //   key: "orders",
    // },
    // {
    //   title: "Total Income",
    //   dataIndex: "total",
    //   key: "total",
    // },
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
              <a onClick={() => handleDelete(useData.id)}>
                <AiOutlineDelete />
              </a>
            </span>
          </span>
        </Space>
      ),
    },
  ];
  console.log(isFetch, "list");

  return (
    <>
      {!isFetch ? (
        <Table columns={columns} dataSource={data} />
      ) : (
        <Skeleton active />
      )}
      <AccountDetail
        visible={isVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        idOrder={idOrder}
        idUser={idUser}
      />
    </>
  );
};
