import { Skeleton, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { useState } from "react";
import { Category, CategoryListType } from "../../../interface/interface";
import { CategoryDetail } from "./CategoryDetail/CategoryDetail";
import { EditCategory } from "./EditCategory/EditCategory";

export const CategoryList = ({
  categoriesData,
  isFetching,
  page,
  limit,
  onShowSizeChange,
  handleChangePage,
}: CategoryListType) => {
  const [visibleDetail, setVisibleDetail] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [loaded, setLoaded] = useState<boolean>(true);
  const [id, setId] = useState<string>("");

  const paginationConfig = {
    showSizeChanger: true,
    onShowSizeChange: onShowSizeChange,
    onChange: (page: number) => {
      handleChangePage(page);
    },
    pageSize: limit,
    current: page,
    total: categoriesData?.metadata?.count,
  };

  const hideModal = () => {
    setVisibleDetail(false);
    setVisibleEdit(false);
    setLoaded(true);
  };

  const handleDetail = (id: string) => {
    setVisibleDetail(true);
    setLoaded(false);
    setId(id);
  };

  const handleCancel = () => {
    hideModal();
  };

  const handleOk = () => {
    hideModal();
  };

  const handleEdit = (id: string) => {
    setVisibleEdit(true);
    setVisibleDetail(false);
    setLoaded(false);
    setId(id);
  };

  const columns: ColumnsType<Category> = [
    {
      title: "Category Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Category Name",
      dataIndex: "label",
      key: "label",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
          dataSource={categoriesData?.data}
          pagination={paginationConfig}
        />
      ) : (
        <Skeleton active />
      )}
      <CategoryDetail
        visible={visibleDetail}
        onCancel={handleCancel}
        loaded={loaded}
        id={id}
        onEdit={handleEdit}
      />
      <EditCategory
        visible={visibleEdit}
        onCancel={handleCancel}
        loaded={loaded}
        id={id}
        onOk={handleOk}
      />
    </>
  );
};
