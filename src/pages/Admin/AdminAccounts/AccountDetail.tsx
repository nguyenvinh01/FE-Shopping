import { Descriptions, Modal, Image, List, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React from "react";
import { styled } from "styled-components";
import ProductImage from "../../../assets/images/lap 1.png";
export interface OrderModalType {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  idOrder: string;
}

const UserDetailWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid #978686a8;
`;

const DescriptionOrderWrapper = styled.div`
  flex: 3;
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

export const AccountDetail = ({
  visible,
  onCancel,
  onOk,
  idOrder,
}: OrderModalType) => {
  return (
    <div>
      <Modal
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
        footer={null}
        width={800}
      >
        <UserDetailWrapper>
          <div style={{ marginRight: "10px", flex: "1" }}>
            <Avatar shape="square" size={180} icon={<UserOutlined />} />
          </div>
          <DescriptionOrderWrapper>
            <Descriptions title="Account" layout="vertical" column={2}>
              <Descriptions.Item label="Full Name">John Doe</Descriptions.Item>
              {/* <Descriptions.Item label="Họ và tên">John Doe</Descriptions.Item> */}
              <Descriptions.Item label="Email">
                johndoe@example.com
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">
                (835) 609-5440 x607
              </Descriptions.Item>
              <Descriptions.Item label="Địa chỉ">
                Cassin Mountain, Velmastad, Avon
              </Descriptions.Item>

              <Descriptions.Item label="Tổng tiền">90000000</Descriptions.Item>
            </Descriptions>
          </DescriptionOrderWrapper>
        </UserDetailWrapper>
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
