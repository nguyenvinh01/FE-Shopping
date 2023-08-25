import { Descriptions, Modal, Image, List, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React from "react";
import { styled } from "styled-components";
import { useGetUserByIdQuery } from "../../../redux/apis/apiUser";
import { OrderModalType } from "../../../interface/interface";

const UserDetailWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid #978686a8;
`;

const DescriptionOrderWrapper = styled.div`
  flex: 3;
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
            </Descriptions>
          </DescriptionOrderWrapper>
        </UserDetailWrapper>
      </Modal>
    </div>
  );
};
