import { Button, Descriptions, Form, Input, InputNumber, Modal } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import React, { useState } from "react";
import { styled } from "styled-components";

const UserProfileWrapper = styled.div``;

export const UserProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const initialValues = {
    fullname: "JohnDoe",
    email: "johndoe@example.com",
    address: "Bhutan",
    phone: 123124123,
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    // setIsModalOpen(false);
    setIsModalVisible(true);
  };
  const handleOkForm = () => {
    setIsModalOpen(false);
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    // setIsModalVisible(false);
  };
  const handleCancelForm = () => {
    // setIsModalOpen(false);
    setIsModalVisible(false);
  };
  const onFinish = () => {};
  return (
    <UserProfileWrapper>
      <div>
        <Descriptions title="Ho so cua toi" layout="vertical">
          <Descriptions.Item label="Username">John Doe</Descriptions.Item>
          <Descriptions.Item label="Fullname">John Doe</Descriptions.Item>
          <Descriptions.Item label="Email">
            johndoe@example.com
          </Descriptions.Item>
          {/* <Descriptions.Item label="Role">Admin</Descriptions.Item> */}
          <Descriptions.Item label="Address">
            Cassin Mountain, Velmastad, Avon
          </Descriptions.Item>
          <Descriptions.Item label="Phone Number">
            (835) 609-5440 x607
          </Descriptions.Item>
        </Descriptions>
      </div>
      <div>
        <Button type="primary" onClick={showModal}>
          Edit Profile
        </Button>
      </div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          initialValues={initialValues}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
        >
          <Form.Item label="Username" name="username">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Fullname" name="fullname">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="Adress" name="address">
            <Input />
          </Form.Item>
          <Form.Item label="Phone" name="phone">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Xác nhận chỉnh sửa"
        visible={isModalVisible}
        onOk={handleOkForm}
        onCancel={handleCancelForm}
        okText="Đồng ý"
        cancelText="Hủy bỏ"
      >
        <p>Bạn có chắc muốn chỉnh sửa không không?</p>
      </Modal>
    </UserProfileWrapper>
  );
};
