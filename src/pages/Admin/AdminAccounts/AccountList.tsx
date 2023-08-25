import { Skeleton, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { AccountDetail } from "./AccountDetail";
import { User } from "../../../interface/interface";

interface DataType {
  id: string;
  fullname: string;
  email: string;
  phone?: string;
}

interface AccountListProps {
  data?: User[];
  isFetch: boolean;
}
export const AccountList = ({ data, isFetch }: AccountListProps) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [idOrder, setIdOrder] = useState("");
  const [idUser, setIdUser] = useState<string>("");
  const [loaded, setLoaded] = useState<boolean>(true);

  const showModal = (id: string) => {
    setIsVisible(true);
    setIdUser(id);
    setLoaded(!loaded);
    console.log(loaded, "asdasdsad111");
  };

  const hideModal = () => {
    setIsVisible(false);
    setLoaded(!loaded);
    console.log(loaded, "asdasdsad");
  };

  const handleOk = () => {
    hideModal();
  };

  const handleCancel = () => {
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
  console.log(data, "data");
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
    },
    {
      title: "Customer Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Customer Phone",
      dataIndex: "phone",
      key: "phone",
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
        loaded={loaded}
      />
    </>
  );
};
