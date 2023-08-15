import React, { useState } from "react";
import { Form, Input, Select, Upload, Button, message, Modal } from "antd";
import { HeaderAdmin } from "../../../../components/HeaderAdmin/HeaderAdmin";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import type { UploadChangeParam } from "antd/es/upload";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { styled } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditProductMutation,
  useGetProductDetailQuery,
} from "../../../../redux/apis/apiProduct";
import { useGetCategoriesQuery } from "../../../../redux/apis/apiCategory";
import {
  Category,
  CategoryOptionData,
  ProductResponse,
  ProductUpdateDataType,
} from "../../../../interface/interface";

const { Option } = Select;

const InputContent = styled.div`
  flex: 2;
  /* display: flex;
  flex-wrap: wrap; */
`;

const UploadContainer = styled(Upload)`
  /* .ant-upload-select {
    margin: 30px 30px 30px 30px;
  }
  .ant-upload {
    width: 250px !important;
    height: 250px !important;
  } */
`;
const ModalUploadImage = styled(Modal)`
  /* .ant-upload-list {
    margin: 30px 30px 30px 30px;
    width: 250px !important;
    height: 250px !important;
  }
  .ant-upload-list-item {
    width: 250px !important;
    height: 250px !important;
  } */
`;
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const EditProduct: React.FC = () => {
  const { id }: { id: string } = useParams() as { id: string };
  const { data } = useGetProductDetailQuery(id);
  const { data: categories } = useGetCategoriesQuery({});
  const [form] = Form.useForm();
  const [editProduct, { isError }] = useEditProductMutation();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([
    // {
    //   uid: "-1",
    //   name: data?.data.image_url,
    //   status: "done",
    //   url: data?.data.image_url,
    // },
  ]);
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

  const categoryOptions = () => {
    if (!categories) {
      return null; //Hoặc hiển thị thông báo tải
    }
    return categories.data?.map((category: Category) => (
      <Option key={category.id} value={category.id}>
        {category.label}
      </Option>
    ));
  };

  form.setFieldsValue({
    imageUrl: data?.data.image_url,
    productName: data?.data.name,
    categories: data?.data.categories.map((item) => item.id),
    price: data?.data.price,
    quantity: data?.data.quantity,
    description: data?.data.description,
  });

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const filterOption = (
    input: string,
    option: CategoryOptionData | undefined
  ) => {
    if (option?.children) {
      return option.children
        .toString()
        .toLowerCase()
        .includes(input.toLowerCase());
    }
    return false;
  };
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
  const handleBeforeUpload = () => {
    return false;
  };
  const handleDeleteProduct = () => {
    alert("Xóa thành công");
  };

  const handleSubmit = () => {
    const dataUpdate: ProductUpdateDataType = {
      productImage: fileList[0].originFileObj as Blob,
      productInformation: {
        name: form.getFieldValue("name"),
        categories: form.getFieldValue("categories"),
        price: form.getFieldValue("price"),
        quantity: form.getFieldValue("quantity"),
        description: form.getFieldValue("description"),
      },
    };
    console.log(form.getFieldValue("categories"));

    editProduct({ data: dataUpdate, id: data?.data.id });
    if (!isError) {
      navigator("/admin/products");
    }
  };

  return (
    <>
      <HeaderAdmin pageName="Edit Product" />
      <div>
        <Form
          onFinish={handleSubmit}
          form={form}
          layout="vertical"
          style={{
            display: "flex",
            alignItems: "flex-start",
            backgroundColor: "#ffffff",
            padding: "20px 15px",
          }}
        >
          <div style={{ marginRight: "20px", flex: "1" }}>
            <Form.Item
              // label="Tải ảnh sản phẩm"
              name="image"
              rules={[
                { required: true, message: "Vui lòng tải ảnh sản phẩm!" },
              ]}
            >
              <UploadContainer
                listType="picture-card"
                className="avatar-uploader"
                beforeUpload={handleBeforeUpload}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </UploadContainer>
              <ModalUploadImage
                className="modal"
                open={previewOpen}
                title={previewTitle}
                onCancel={handleCancel}
              >
                <img
                  alt="example"
                  style={{ width: "100%" }}
                  src={previewImage}
                />
              </ModalUploadImage>
            </Form.Item>
          </div>

          <InputContent>
            <Form.Item
              label="Tên sản phẩm"
              name="productName"
              rules={[
                { required: true, message: "Vui lòng nhập tên sản phẩm!" },
              ]}
            >
              <Input
                name="productName"
                style={{ width: "100%", maxWidth: "400px" }}
              />
            </Form.Item>

            <Form.Item
              label="Danh mục"
              name="categories"
              rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
            >
              <Select
                placeholder="Chọn danh mục"
                mode="multiple" // Cho phép chọn nhiều danh mục
                showSearch // Hiển thị thanh tìm kiếm
                filterOption={filterOption}
                style={{ width: "100%", maxWidth: "400px" }}
              >
                {categoryOptions()}
              </Select>
            </Form.Item>
            <div style={{ display: "flex", gap: "1rem" }}>
              <Form.Item
                label="Giá"
                name="price"
                rules={[
                  { required: true, message: "Vui lòng nhập giá sản phẩm!" },
                ]}
              >
                <Input
                  type="number"
                  name="price"
                  style={{
                    width: "100%",
                    maxWidth: "200px",
                    marginRight: "25px",
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Số lượng"
                name="quantity"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số lượng sản phẩm!",
                  },
                ]}
              >
                <Input
                  type="number"
                  name="quantity"
                  // value={formValues.quantity}
                  style={{ width: "100%", maxWidth: "175px" }}
                />
              </Form.Item>
            </div>

            <Form.Item
              label="Mô tả"
              name="description"
              rules={[
                { required: true, message: "Vui lòng nhập mô tả sản phẩm!" },
              ]}
            >
              <Input.TextArea
                name="description"
                // value={formValues.description}
                style={{ width: "100%", maxWidth: "400px" }}
              />
            </Form.Item>

            <Form.Item>
              <div
                style={{
                  display: "flex",
                  maxWidth: "300px",
                  justifyContent: "space-between",
                }}
              >
                <Button type="primary" htmlType="submit">
                  Đăng ký sản phẩm
                </Button>
                <Button onClick={() => navigator("/admin/products")}>
                  Huỷ
                </Button>
                <Button danger onClick={handleDeleteProduct}>
                  Delete
                </Button>
              </div>
            </Form.Item>
          </InputContent>
        </Form>
      </div>
    </>
  );
};
