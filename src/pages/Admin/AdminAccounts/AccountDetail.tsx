import { Descriptions, Modal, Image, List, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React from "react";
import { styled } from "styled-components";
import ProductImage from "../../../assets/images/lap 1.png";
import { useGetUserByIdQuery } from "../../../redux/apis/apiUser";
import { OrderModalType } from "../../../interface/interface";

const UserDetailWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid #978686a8;
`;

const DescriptionOrderWrapper = styled.div`
  flex: 3;
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

export const AccountDetail = ({
  visible,
  onCancel,
  onOk,
  idOrder,
  idUser,
  loaded,
}: OrderModalType) => {
  const { data } = useGetUserByIdQuery(idUser, { skip: loaded });
  return (
    <div>
      <Modal
        open={visible}
        onCancel={onCancel}
        onOk={onOk}
        footer={null}
        width={800}
      >
        <UserDetailWrapper>
          <div style={{ marginRight: "10px", flex: "1" }}>
            <Avatar
              shape="square"
              size={180}
              icon={<UserOutlined />}
              src={data?.image_url}
            />
          </div>
          <DescriptionOrderWrapper>
            <Descriptions title="Account" layout="vertical" column={2}>
              <Descriptions.Item label="Full Name">
                {data?.fullname}
              </Descriptions.Item>
              <Descriptions.Item label="Email">{data?.email}</Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">
                {data?.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Địa chỉ">
                {data?.email}
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
