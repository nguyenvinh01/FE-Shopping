import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  Upload,
  Button,
  message,
  Modal,
  notification,
} from "antd";
import { HeaderAdmin } from "../../../../components/HeaderAdmin/HeaderAdmin";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "../../../../redux/apis/apiCategory";
import {
  Category,
  CategoryOptionData,
  MessageResponse,
  Product,
  ProductFormValues,
  ProductUpdateDataType,
} from "../../../../interface/interface";
import { useCreateProductMutation } from "../../../../redux/apis/apiProduct";
import { handleResponse } from "../../../../utility/HandleResponse";

const { Option } = Select;

const InputContent = styled.div`
  flex: 2;
  /* display: flex;
  flex-wrap: wrap; */
`;

const UploadContainer = styled(Upload)`
  .ant-upload {
    width: 250px !important;
    height: 250px !important;
  }

  .ant-upload-list {
    margin: 30px 30px 30px 30px;
  }
  .ant-upload-list .ant-upload-list-item-container {
    width: 250px !important;
    height: 250px !important;
  }
`;

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const AddProduct: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<ProductFormValues>({
    name: "",
    categories: [],
    price: 0,
    quantity: 0,
    description: "",
  });
  const navigator = useNavigate();
  const { data: categories } = useGetCategoriesQuery({});
  const [createProduct] = useCreateProductMutation();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

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

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    console.log(fileList, "fileList");

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    // console.log(fileList, "fileList");
  };
  const handleBeforeUpload = () => {
    return false;
  };
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
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

  const handleCategoryChange = (value: number[]) => {
    setFormValues({ ...formValues, categories: value });
  };

  const handleSubmit = async (values: ProductFormValues) => {
    // console.log(fileList, "filelist");

    if (fileList.length === 0) {
      message.error("Vui lòng tải ảnh sản phẩm!");
      return;
    }

    // console.log(values);
    const dataUpdate: ProductUpdateDataType = {
      productImage: fileList[0].originFileObj as Blob,
      productInformation: {
        name: form.getFieldValue("name"),
        categories: form.getFieldValue("categories"),
        price: parseInt(form.getFieldValue("price")),
        quantity: parseInt(form.getFieldValue("quantity")),
        description: form.getFieldValue("description"),
      },
    };

    const response: MessageResponse<Product> = await createProduct(dataUpdate);
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
      navigate("/admin/products");
    }
  };

  return (
    <>
      <HeaderAdmin pageName="Add New Product" />
      <div>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          style={{
            display: "flex",
            alignItems: "flex-start",
            backgroundColor: "#ffffff",
            padding: "20px 15px",
          }}
        >
          <div style={{ marginRight: "20px", flex: "1" }}>
            <UploadContainer
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={handleBeforeUpload}
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

          <InputContent>
            <Form.Item
              label="Product Name"
              name="name"
              rules={[
                { required: true, message: "Vui lòng nhập tên sản phẩm!" },
              ]}
            >
              <Input
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
                style={{ width: "100%", maxWidth: "400px" }}
              />
            </Form.Item>

            <Form.Item
              label="Category"
              name="categories"
              rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
            >
              <Select
                placeholder="Chọn danh mục"
                value={formValues.categories}
                onChange={handleCategoryChange}
                mode="multiple" // Cho phép chọn nhiều danh mục
                showSearch // Hiển thị thanh tìm kiếm
                filterOption={filterOption} // Tìm kiếm danh mục theo tên
                style={{ width: "100%", maxWidth: "400px" }}
              >
                {categoryOptions()}
              </Select>
            </Form.Item>
            <div style={{ display: "flex", gap: "1rem" }}>
              <Form.Item
                label="Price"
                name="price"
                rules={[
                  { required: true, message: "Vui lòng nhập giá sản phẩm!" },
                ]}
              >
                <Input
                  type="number"
                  name="price"
                  value={formValues.price}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    maxWidth: "200px",
                    marginRight: "25px",
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Quantity"
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
                  value={formValues.quantity}
                  onChange={handleInputChange}
                  style={{ width: "100%", maxWidth: "175px" }}
                />
              </Form.Item>
            </div>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Vui lòng nhập mô tả sản phẩm!" },
              ]}
            >
              <Input.TextArea
                name="description"
                value={formValues.description}
                onChange={handleInputChange}
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
                <Button type="primary" htmlType="submit" style={{}}>
                  Đăng ký sản phẩm
                </Button>
                <Button onClick={() => navigator("/admin/products")}>
                  Cancel
                </Button>
              </div>
            </Form.Item>
          </InputContent>
        </Form>
      </div>
    </>
  );
};
