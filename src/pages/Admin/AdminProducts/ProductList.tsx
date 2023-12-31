import { Skeleton, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Product, ProductListType } from "../../../interface/interface";

export const ProductList = ({
  productsData,
  isFetching,
  page,
  limit,
  onShowSizeChange,
  handleChangePage,
}: ProductListType) => {
  const navigate = useNavigate();

  const paginationConfig = {
    showSizeChanger: true,
    onShowSizeChange: onShowSizeChange,
    onChange: (page: number) => {
      handleChangePage(page);
    },
    pageSize: limit,
    current: page,
    total: productsData?.metadata?.count,
  };

  const handleDetail = (id: string) => {
    navigate(`/admin/products/detail/${id}`);
  };
  const handleEdit = (id: string) => {
    navigate(`/admin/products/edit/${id}`);
  };

  const columns: ColumnsType<Product> = [
    {
      title: "Product Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "categories",
      key: "categories",
      render: (_, categories) => (
        <>
          {categories.categories.map((category) => {
            return (
              <Tag color="blue" key={category.id}>
                {category.label.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, useData) => (
        <Space>
          <span>
            <span>
              <a onClick={() => handleDetail(useData.id)}>
                <AiOutlineEye />
              </a>
              <a onClick={() => handleEdit(useData.id)}>
                <AiOutlineEdit />
              </a>
            </span>
          </span>
        </Space>
      ),
    },
  ];

  return (
    <>
      {!isFetching ? (
        <Table
          columns={columns}
          dataSource={productsData?.data}
          pagination={paginationConfig}
        />
      ) : (
        <Skeleton active />
      )}
    </>
  );
};
