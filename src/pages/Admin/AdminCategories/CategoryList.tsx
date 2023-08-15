import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AiOutlineEdit, AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Category, CategoryListType } from "../../../interface/interface";
import { CategoryDetail } from "./CategoryDetail/CategoryDetail";

export const CategoryList = ({ categoriesData }: CategoryListType) => {
  const [visibleDetail, setVisibleDetail] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [id, setId] = useState(0);
  const navigate = useNavigate();

  const hideModal = () => {
    setVisibleDetail(false);
  };

  const handleDetail = (id: number) => {
    setVisibleDetail(true);
    setId(id);
  };

  const handleCancel = () => {
    // Xử lý khi người dùng bấm nút Cancel (nếu cần)
    hideModal();
  };

  const handleEdit = (id: number) => {
    console.log("id: ", id);
  };
  const handleDelete = (id: number) => {
    console.log(id);
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
              <a onClick={() => handleDelete(useData.id)}>
                <AiOutlineDelete />
              </a>
            </span>
          </span>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={categoriesData} />
      <CategoryDetail
        visible={visibleDetail}
        onCancel={handleCancel}
        id={id}
        onEdit={handleEdit}
      />
    </>
  );
};
