import { List, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { AiOutlineEdit, AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import { HeaderAdmin } from "../../../components/HeaderAdmin/HeaderAdmin";
import { OrderModal } from "../../OrderPage/OrderModal";
import { useGetAllOrderQuery } from "../../../redux/apis/apiOrder";
import { GetOrderResponse } from "../../../interface/interface";
import { OrderItem } from "../../OrderPage/OrderItem";
import { AdminOrderModal } from "./AdminOrderDetail";

interface DataType {
  key: string;
  order_id: string;
  username: string;
  amount: number;
  orderdate: string;
  status: string;
}
const Header = (
  <List.Item>
    <div>
      <p>Order Code</p>
    </div>
    <div>
      <p>Amount</p>
    </div>
    {/* <div>
      <p></p>
    </div>
    <div>
      <p></p>
    </div> */}
  </List.Item>
);
export const AdminOrders = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [idOrder, setIdOrder] = useState("");
  const [idUser, setIdUser] = useState("");
  const { data } = useGetAllOrderQuery();

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
  console.log(data, "data order");

  // const columns: ColumnsType<GetOrderResponse> = [
  //   {
  //     title: "Order Id",
  //     dataIndex: "id",
  //     key: "id",
  //   },
  //   {
  //     title: "User Name",
  //     dataIndex: "username",
  //     key: "name",
  //     // render: (text) => <a>{text}</a>,
  //   },
  //   {
  //     title: "Order Date",
  //     dataIndex: "orderdate",
  //     key: "orderdate",
  //     // render: (text) => <a>{text}</a>,
  //   },
  //   {
  //     title: "Amount",
  //     dataIndex: "amount",
  //     key: "amount",
  //   },
  //   {
  //     title: "Status",
  //     dataIndex: "status",
  //     key: "status",
  //   },
  //   {
  //     title: "Actions",
  //     dataIndex: "actions",
  //     key: "actions",
  //     render: (text, orderData) => (
  //       <Space>
  //         <span>
  //           <a onClick={() => handleDetail(orderData.order_id)}>
  //             <AiOutlineEye size={18} style={{ marginLeft: "10px" }} />
  //           </a>
  //         </span>
  //       </Space>
  //     ),
  //   },
  // ];
  const handleClick = (id: string, idUser: string) => {
    showModal();
    setIdOrder(id);
    setIdUser(idUser);
    console.log("click");
  };
  return (
    <>
      <HeaderAdmin pageName="Order" />
      <div>
        {/* <Table columns={columns} dataSource={data?.data} /> */}

        <List
          dataSource={data?.data}
          header={Header}
          renderItem={(item) => {
            return (
              <>
                <OrderItem
                  onClick={() => handleClick(item.id, item.user_id as string)}
                  orderData={item.orderItems}
                  idOrder={item.id}
                />
              </>
            );
          }}
        ></List>
      </div>
      <AdminOrderModal
        visible={isVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        idOrder={idOrder}
        idUser={idUser}
      />
    </>
  );
};
