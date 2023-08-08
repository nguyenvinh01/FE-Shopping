import React, { useState } from "react";
import { Form, Input, Select, Upload, Button, message } from "antd";
import { HeaderAdmin } from "../../../../components/HeaderAdmin/HeaderAdmin";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import type { UploadChangeParam } from "antd/es/upload";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const InputContent = styled.div`
  flex: 2;
  /* display: flex;
  flex-wrap: wrap; */
`;

const UploadContainer = styled(Upload)`
  .ant-upload-select {
    margin: 30px 30px 30px 30px;
  }
  .ant-upload {
    width: 250px !important;
    height: 250px !important;
  }
`;

interface ProductFormValues {
  imageUrl: string;
  productName: string;
  category: string[];
  price: number;
  quantity: number;
  description: string;
}

interface OptionData {
  key: string;
  value: string;
  children: string;
}

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

export const AddProduct: React.FC = () => {
  const [formValues, setFormValues] = useState<ProductFormValues>({
    imageUrl: "",
    productName: "",
    category: [],
    price: 0,
    quantity: 0,
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

  const handleImageUpload: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setFormValues({ ...formValues, imageUrl: url });
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const filterOption = (input: string, option: OptionData | undefined) => {
    if (option?.children) {
      return option.children
        .toString()
        .toLowerCase()
        .includes(input.toLowerCase());
    }
    return false;
  };

  const handleCategoryChange = (value: string[]) => {
    setFormValues({ ...formValues, category: value });
  };

  const handleSubmit = (values: ProductFormValues) => {
    // Xử lý dữ liệu form khi người dùng nhấn nút Đăng ký sản phẩm
    console.log("Submitted data:", values);
  };

  return (
    <>
      <HeaderAdmin pageName="Add New Product" />
      <div>
        <Form
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
            <Form.Item
              // label="Tải ảnh sản phẩm"
              name="image"
              rules={[
                { required: true, message: "Vui lòng tải ảnh sản phẩm!" },
              ]}
            >
              <UploadContainer
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleImageUpload}
              >
                {formValues.imageUrl ? (
                  <img
                    src={formValues.imageUrl}
                    alt="avatar"
                    style={{ width: "100%" }}
                  />
                ) : (
                  uploadButton
                )}
              </UploadContainer>
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
                value={formValues.productName}
                onChange={handleInputChange}
                style={{ width: "100%", maxWidth: "400px" }}
              />
            </Form.Item>

            <Form.Item
              label="Danh mục"
              name="category"
              rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
            >
              <Select
                placeholder="Chọn danh mục"
                value={formValues.category}
                onChange={handleCategoryChange}
                mode="multiple" // Cho phép chọn nhiều danh mục
                showSearch // Hiển thị thanh tìm kiếm
                filterOption={filterOption} // Tìm kiếm danh mục theo tên
                style={{ width: "100%", maxWidth: "400px" }}
              >
                <Option key="1" value="category1">
                  Danh mục 1
                </Option>
                <Option key="2" value="category2">
                  Danh mục 2
                </Option>
                <Option key="3" value="category3">
                  Category 3
                </Option>
                {/* Thêm danh sách danh mục khác nếu cần */}
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
                  value={formValues.quantity}
                  onChange={handleInputChange}
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
