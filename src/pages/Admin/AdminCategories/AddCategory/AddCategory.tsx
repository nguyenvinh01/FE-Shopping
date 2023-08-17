import {
  Avatar,
  Button,
  Descriptions,
  Form,
  Input,
  Modal,
  Upload,
  notification,
} from "antd";
import React, { useState } from "react";
import { styled } from "styled-components";
import {
  Category,
  CategoryModel,
  CreateCategoryDataType,
  MessageResponse,
} from "../../../../interface/interface";
import {
  useCreateCategoryMutation,
  useGetCategoryDetailQuery,
} from "../../../../redux/apis/apiCategory";
import type { UploadFile } from "antd/es/upload/interface";
import type { RcFile, UploadProps } from "antd/es/upload";
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";
import { handleResponse } from "../../../../utility/HandleResponse";

const CategoryWapper = styled.div`
  display: flex;
  border-bottom: 1px solid #978686a8;
`;

const UploadContainer = styled(Upload)`
  .ant-upload {
    width: 150px !important;
    height: 150px !important;
  }

  .ant-upload-list {
    /* margin: 30px 30px 30px 30px; */
  }
  .ant-upload-list .ant-upload-list-item-container {
    width: 150px !important;
    height: 150px !important;
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

export const AddCategory = ({
  visible,
  onCancel,
  onOk,
}: Omit<CategoryModel, "id" | "onEdit">) => {
  const [form] = useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [createCategory] = useCreateCategoryMutation();

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
  };
  const handleBeforeUpload = () => {
    return false;
  };
  const handleOk = async () => {
    const data: CreateCategoryDataType = {
      categoryImage: fileList[0].originFileObj as File,
      categoryInformation: form.getFieldsValue(),
    };

    const response: MessageResponse<Category> = await createCategory(data);
    const { messageResponse, isError } = handleResponse(response);
    if (isError) {
      notification.error({
        message: messageResponse,
        description: "Có lỗi xảy ra, vui lòng thử lại",
      });
    } else {
      notification.success({
        message: "Tạo thành công",
      });
    }
    onOk();
  };
  const footermodel = (
    <>
      <Button key="back" onClick={onCancel}>
        Cancel
      </Button>
      <Button key="submit" type="primary" onClick={handleOk}>
        Add
      </Button>
    </>
  );

  return (
    <div>
      <Modal
        open={visible}
        onCancel={onCancel}
        footer={footermodel}
        width={800}
        onOk={handleOk}
      >
        <CategoryWapper>
          <div style={{ marginRight: "10px", flex: "1" }}>
            <UploadContainer
              listType="picture-card"
              fileList={fileList}
              beforeUpload={handleBeforeUpload}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </UploadContainer>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
          </div>
          <div style={{ flex: "2" }}>
            <Form layout="vertical" form={form}>
              <Form.Item name="label" label="Label">
                <Input />
              </Form.Item>
              <Form.Item name="description" label="Description">
                <Input />
              </Form.Item>
            </Form>
          </div>
        </CategoryWapper>
      </Modal>
    </div>
  );
};
