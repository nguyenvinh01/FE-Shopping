import { Descriptions, Modal, Image, List } from "antd";
import React from "react";
import { styled } from "styled-components";
import ProductImage from "../../assets/images/lap 1.png";
import { OrderModalType, User } from "../../interface/interface";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useGetOrderByIdQuery } from "../../redux/apis/apiOrder";
// export interface OrderModalType {
//   visible: boolean;
//   onCancel: () => void;
//   onOk: () => void;
//   idOrder: string;
// }

const DescriptionOrderWrapper = styled.div`
  border-bottom: 1px solid #978686a8;
`;

const OrderDetailWrapper = styled.div`
  /* display: flex;
  flex-direction: row;
  justify-content: flex-start; */
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
export const OrderModal = ({
  visible,
  onCancel,
  onOk,
  idOrder,
}: Omit<OrderModalType, "idUser">) => {
  const userData = useSelector<RootState, User>((state) => state.user);
  const { data } = useGetOrderByIdQuery(idOrder);

  const total = data?.data?.orderItems?.reduce<number>(
    (prev, current, index, array) => {
      return prev + current.pricePerUnit * current.quantity;
    },
    0
  );

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
          <Descriptions title="Đơn hàng của" layout="vertical">
            <Descriptions.Item label="Mã đơn hàng">{idOrder}</Descriptions.Item>
            <Descriptions.Item label="Họ và tên">
              {userData?.fullname}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {userData?.email}
            </Descriptions.Item>
            <Descriptions.Item label="Địa chỉ">
              {userData?.address}
            </Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">
              {userData?.phone}
            </Descriptions.Item>
            <Descriptions.Item label="Tổng tiền">{total}</Descriptions.Item>
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
                    <p>Số lượng: {item?.quantity}</p>
                    <p>Thành tiền: {item?.quantity * item?.pricePerUnit}</p>
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
