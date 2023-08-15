import { Descriptions, Modal, Image, List } from "antd";
import React from "react";
import { styled } from "styled-components";
import ProductImage from "../../assets/images/lap 1.png";
export interface OrderModalType {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  idOrder: string;
}

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
export const Orderdetail = ({
  visible,
  onCancel,
  onOk,
  idOrder,
}: OrderModalType) => {
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
            <Descriptions.Item label="Mã đơn hàng">
              12363627171
            </Descriptions.Item>
            <Descriptions.Item label="Họ và tên">John Doe</Descriptions.Item>
            <Descriptions.Item label="Email">
              johndoe@example.com
            </Descriptions.Item>
            <Descriptions.Item label="Địa chỉ">
              Cassin Mountain, Velmastad, Avon
            </Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">
              (835) 609-5440 x607
            </Descriptions.Item>
            <Descriptions.Item label="Tổng tiền">90000000</Descriptions.Item>
          </Descriptions>
        </DescriptionOrderWrapper>
        <OrderDetailWrapper>
          <List>
            <List.Item>
              <div className="image-order">
                <Image src={ProductImage} />
              </div>
              <div className="detail-order">
                <h3>Name product</h3>
                <div className="price-quantity">
                  <p>Số lượng: 2</p>
                  <p>Thành tiền: 123123123</p>
                </div>
              </div>
            </List.Item>
          </List>
        </OrderDetailWrapper>
      </Modal>
    </div>
  );
};
