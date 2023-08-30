import { Descriptions, Modal, Image, List } from "antd";
import React from "react";
import { styled } from "styled-components";
import ProductImage from "../../assets/images/lap 1.png";
import { useSelector } from "react-redux";
import { OrderModalType } from "../../../interface/interface";
import { RootState } from "../../../redux/store";
import { useGetOrderByIdQuery } from "../../../redux/apis/apiOrder";
import { useGetUserByIdQuery } from "../../../redux/apis/apiUser";
import { FormatNumber } from "../../../utility/FormatNumber";

const DescriptionOrderWrapper = styled.div`
  border-bottom: 1px solid #978686a8;
`;

const OrderDetailWrapper = styled.div`
  width: 100%;
  .order-item {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .image-order {
    width: 100px;
    height: 100px;
    margin-right: 30px;
  }
  .detail-order {
    width: 100%;
  }
  .price-quantity {
    display: flex;
    justify-content: space-between;
  }
`;
export const AdminOrderModal = ({
  visible,
  onCancel,
  onOk,
  idOrder,
  idUser,
}: OrderModalType) => {
  const { data } = useGetOrderByIdQuery(idOrder);
  const { data: userData } = useGetUserByIdQuery(idUser);

  const total = data?.data?.orderItems?.reduce<number>(
    (prev, current, index, array) => {
      return prev + current.pricePerUnit * current.quantity;
    },
    0
  );
  const textDesc = `Ordered By ${userData?.fullname}`;
  return (
    <div>
      <Modal
        open={visible}
        onCancel={onCancel}
        onOk={onOk}
        footer={null}
        width={550}
      >
        <DescriptionOrderWrapper>
          <Descriptions title={textDesc} layout="vertical">
            <Descriptions.Item label="Code">{idOrder}</Descriptions.Item>
            <Descriptions.Item label="Fullname">
              {userData?.fullname}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {userData?.email}
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              {userData?.address}
            </Descriptions.Item>
            <Descriptions.Item label="Phone">
              {userData?.phone}
            </Descriptions.Item>
            <Descriptions.Item label="Amount">
              {FormatNumber(total)}₫
            </Descriptions.Item>
          </Descriptions>
        </DescriptionOrderWrapper>
        <OrderDetailWrapper>
          <List
            dataSource={data?.data?.orderItems}
            renderItem={(item, index) => (
              <List.Item>
                <div className="image-order">
                  <Image src={item?.image_url} />
                </div>
                <div className="detail-order">
                  <h3>{item?.name}</h3>
                  <div className="price-quantity">
                    <p>Quantity: {item?.quantity}</p>
                    <p>
                      Total:
                      {FormatNumber(item?.quantity * item?.pricePerUnit)}₫
                    </p>
                  </div>
                </div>
              </List.Item>
            )}
          />
        </OrderDetailWrapper>
      </Modal>
    </div>
  );
};
