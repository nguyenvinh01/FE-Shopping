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
  notification,
} from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { RootState } from "../../redux/store";
import {
  DataUserUpdate,
  MessageResponse,
  User,
} from "../../interface/interface";
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
  const userData = useSelector<RootState, User>((state) => state.user);
  const [updateUser, result] = useUpdateUserMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: userData?.image_url,
      status: "done",
      url: userData?.image_url,
    },
  ]);
  useEffect(() => {
    setFileList([
      {
        uid: "-1",
        name: "",
        status: "done",
        url: userData?.image_url,
      },
    ]);
  }, []);
  const formData = new FormData();
  const [form] = Form.useForm();

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    // setPreviewTitle(
    //   file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    // );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalVisible(true);
  };
  const handleCancelModal = () => {
    setIsModalOpen(false);
  };
  const handleCancelForm = () => {
    setIsModalVisible(false);
  };
  const handleBeforeUpload = () => {
    return false;
  };
  const onFinish = async () => {
    const file = fileList[0].originFileObj;
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
    // const res: MessageResponse<User> = await updateUser(dataUpdate);
    // if (res.data?.success) {
    //   setIsModalOpen(false);
    //   setIsModalVisible(false);
    //   notification.success({
    //     message: "Thành công",
    //     description: "Update thành công",
    //   });
    // } else {
    //   console.log(res.data?.metadata.message);
    // }

    // console.log("error", result, );
  };
  return (
    <UserProfileWrapper>
      <Space size={"large"}>
        <div className="avatar-user">
          <Avatar
            src={userData?.image_url}
            style={{ width: "300px", height: "300px" }}
          />
        </div>
        <div className="profile-user">
          <Descriptions title="Ho so cua toi" layout="vertical">
            <Descriptions.Item label="Fullname">
              {userData?.fullname}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {userData?.email}
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              {userData?.address}
            </Descriptions.Item>
            <Descriptions.Item label="Phone Number">
              {userData?.phone}
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
            beforeUpload={handleBeforeUpload}
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
          initialValues={userData}
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
        open={isModalVisible}
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
