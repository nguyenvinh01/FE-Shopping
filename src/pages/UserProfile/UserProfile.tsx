import {
  Avatar,
  Button,
  Descriptions,
  Form,
  Input,
  InputNumber,
  Modal,
  Space,
  Upload,
} from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { RootState } from "../../redux/store";
import { DataUserUpdate, User } from "../../interface/interface";
import { InitialStateType } from "../../redux/slice/userSlice";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import { useUpdateUserMutation } from "../../redux/apis/apiUser";
import axios from "axios";
import axiosInstance from "../../shared/services/http-clients";
const UserProfileWrapper = styled.div`
  display: flex;
  .profile-user {
    display: flex;
    flex-direction: column;
  }
`;
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const uploadButton = (
  <div>
    {/* <PlusOutlined /> */}
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);
export const UserProfile = () => {
  const userData = useSelector<RootState, InitialStateType>(
    (state) => state.user
  );
  const [updateUser] = useUpdateUserMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([
    // {
    //   uid: "-1",
    //   name: "image.png",
    //   status: "done",
    //   url: userData.user?.image_url,
    // },
  ]);
  const formData = new FormData();
  const [form] = Form.useForm();

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    console.log(fileList, "fileList");
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
  const handleCancelModal = () => {
    setIsModalOpen(false);
    // setIsModalVisible(false);
  };
  const handleCancelForm = () => {
    // setIsModalOpen(false);
    setIsModalVisible(false);
  };
  const onFinish = () => {
    const file = fileList[0].originFileObj;
    if (file) {
      console.log("co anh", file);
    }
    const userInformation = {
      fullname: form.getFieldValue("fullname"),
      // email: form.getFieldValue("email"),
      address: form.getFieldValue("address"),
      phone: form.getFieldValue("phone"),
    };
    const dataUpdate: DataUserUpdate = {
      userImage: file,
      userInformation: userInformation,
    };
    updateUser(dataUpdate);
    const userInformationBlob = new Blob([JSON.stringify(userInformation)]);

    // formData.append("userImage", data.userImage as Blob);
    formData.append(
      "userInformation",
      JSON.stringify(dataUpdate.userInformation)
    );
    console.log(userInformationBlob);

    // axiosInstance.patch("http://localhost:3000/user", formData);
    setIsModalOpen(false);
    setIsModalVisible(false);
  };
  return (
    <UserProfileWrapper>
      <Space size={"large"}>
        <div className="avatar-user">
          <Avatar
            src={userData.user?.image_url}
            style={{ width: "300px", height: "300px" }}
          />
        </div>
        <div className="profile-user">
          <Descriptions title="Ho so cua toi" layout="vertical">
            {/* <Descriptions.Item label="Username">User</Descriptions.Item> */}
            <Descriptions.Item label="Fullname">
              {userData.user?.fullname}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {userData.user?.email}
            </Descriptions.Item>
            {/* <Descriptions.Item label="Role">Admin</Descriptions.Item> */}
            <Descriptions.Item label="Address">
              {userData.user?.address}
            </Descriptions.Item>
            <Descriptions.Item label="Phone Number">
              {userData.user?.phone}
            </Descriptions.Item>
          </Descriptions>
          <div>
            <Button type="primary" onClick={showModal}>
              Edit Profile
            </Button>
          </div>
        </div>
      </Space>

      <Modal
        title="Update User"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancelModal}
      >
        <>
          <Upload
            listType="picture-circle"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </>
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          initialValues={userData.user}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
        >
          <Form.Item label="Fullname" name="fullname">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input disabled />
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
        onOk={onFinish}
        onCancel={handleCancelForm}
        okText="Đồng ý"
        cancelText="Hủy bỏ"
      >
        <p>Bạn có chắc muốn chỉnh sửa không không?</p>
      </Modal>
    </UserProfileWrapper>
  );
};
