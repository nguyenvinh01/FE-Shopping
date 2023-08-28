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
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditProductMutation,
  useGetInventoryQuery,
  useGetProductDetailQuery,
  useUpdateInventoryMutation,
} from "../../../../redux/apis/apiProduct";
import { useGetCategoriesQuery } from "../../../../redux/apis/apiCategory";
import {
  Category,
  CategoryOptionData,
  MessageResponse,
  Product,
  ProductUpdateDataType,
  inventoryDataUpdate,
} from "../../../../interface/interface";
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

export const EditProduct = () => {
  const { id }: { id: string } = useParams() as { id: string };
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const { data } = useGetProductDetailQuery(id);
  const { data: categories } = useGetCategoriesQuery({});
  const { data: inventoryData } = useGetInventoryQuery(id);
  const [editProduct] = useEditProductMutation();
  const [updateInventory] = useUpdateInventoryMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        imageUrl: data?.data.image_url,
        name: data?.data.name,
        categories: data?.data.categories.map((item) => item.id),
        import_price: inventoryData?.data.import_price,
        price: data?.data.price,
        quantity: data?.data.quantity,
        description: data?.data.description,
      });
      setFileList([
        {
          uid: "-1",
          name: data?.data?.image_url,
          status: "done",
          url: data?.data?.image_url,
        },
      ]);
    }
  }, [data, inventoryData]);

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

  const handleSubmit = async () => {
    if (fileList.length === 0) {
      message.error("Vui lòng tải ảnh sản phẩm!");
      return;
    }

    const dataProductUpdate: ProductUpdateDataType = {
      productImage: fileList[0].originFileObj as Blob,
      productInformation: {
        name: form.getFieldValue("name"),
        categories: form.getFieldValue("categories"),
        description: form.getFieldValue("description"),
      },
    };

    const dataInventoryUpdate: inventoryDataUpdate = {
      import_price: parseInt(form.getFieldValue("import_price")),
      price: parseInt(form.getFieldValue("price")),
      quantity: parseInt(form.getFieldValue("quantity")),
    };
    //
    await updateInventory({ data: dataInventoryUpdate, id })
      .unwrap()
      .then(async () => {
        const responseProduct: MessageResponse<Product> = await editProduct({
          data: dataProductUpdate,
          id: id,
        });
        const { messageResponse, isError } = handleResponse(responseProduct);
        if (isError) {
          notification.error({
            message: messageResponse,
            // description: "Có lỗi xảy ra, vui lòng thử lại",
          });
        } else {
          notification.success({
            message: "Update Success",
          });
          navigate(`/admin/products/detail/${id}`);
        }
      })
      .catch((error) => {
        notification.error({
          message: error.data.message,
          // description: "Có lỗi xảy ra, vui lòng thử lại",
        });
      });
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
            <UploadContainer
              listType="picture-card"
              className="avatar-uploader"
              beforeUpload={handleBeforeUpload}
              fileList={fileList}
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

          <InputContent>
            <Form.Item
              label="Product Name"
              name="name"
              rules={[
                { required: true, message: "Vui lòng nhập tên sản phẩm!" },
              ]}
            >
              <Input name="name" style={{ width: "100%", maxWidth: "400px" }} />
            </Form.Item>

            <Form.Item
              label="Category"
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
                label="Import Price"
                name="import_price"
                style={{
                  width: "100%",
                  maxWidth: "190px",
                  marginRight: "15px",
                }}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập giá nhập khẩu của sản phẩm!",
                  },
                  {
                    validator: (_, value) => {
                      if (value > 0) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Giá nhập khẩu phải lớn hơn 0!")
                      );
                    },
                  },
                ]}
              >
                <Input type="number" name="import_price" />
              </Form.Item>
              <Form.Item
                label="Price"
                name="price"
                style={{
                  width: "100%",
                  maxWidth: "185px",
                  marginRight: "25px",
                }}
                rules={[
                  { required: true, message: "Vui lòng nhập giá sản phẩm!" },
                  {
                    validator: (_, value) => {
                      if (value > 0) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Giá sản phẩm phải lớn hơn 0!")
                      );
                    },
                  },
                ]}
              >
                <Input type="number" name="price" />
              </Form.Item>
            </div>
            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số lượng sản phẩm!",
                },
                {
                  validator: (_, value) => {
                    if (value > 0) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Số lượng sản phẩm phải lớn hơn 0!")
                    );
                  },
                },
              ]}
            >
              <Input
                type="number"
                name="quantity"
                style={{ width: "100%", maxWidth: "400px" }}
              />
            </Form.Item>

            <Form.Item
              label="Description"
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
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ minWidth: "120px" }}
                >
                  Update
                </Button>
                <Button
                  style={{ minWidth: "120px" }}
                  onClick={() => navigate("/admin/products")}
                >
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
