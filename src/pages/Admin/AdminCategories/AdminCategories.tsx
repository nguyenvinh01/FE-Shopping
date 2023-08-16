import React from "react";
import { Input, Select, Button } from "antd";
import styled from "styled-components";
import { HeaderAdmin } from "../../../components/HeaderAdmin/HeaderAdmin";
import { useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "../../../redux/apis/apiCategory";
import { CategoryList } from "./CategoryList";
import { AddCategory } from "./AddCategory/AddCategory";
import { useState } from "react";
import { EditCategory } from "./EditCategory/EditCategory";

const AdminContainer = styled.div`
  background-color: #ffffff;
  padding: 5px 10px;
`;

const TopContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: space-between;
  margin-bottom: 16px;

  padding: 10px 0;
  border-bottom: 1px solid #dcdcdc;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: max-content;
`;

export const AdminCategories = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const { data: categoriesData } = useGetCategoriesQuery({ name: searchValue });

  const hideModal = () => {
    setVisible(false);
  };

  const handleAdd = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    // Xử lý khi người dùng bấm nút Cancel (nếu cần)
    hideModal();
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  return (
    <>
      <HeaderAdmin pageName="AdminProducts" />
      <AdminContainer>
        <TopContainer>
          <SearchContainer>
            <Input.Search
              placeholder="Nhập từ khoá tìm kiếm"
              onSearch={handleSearch}
              style={{ width: 300 }}
            />
          </SearchContainer>

          <Button type="primary" onClick={handleAdd}>
            Add new category
          </Button>
        </TopContainer>
        <CategoryList categoriesData={categoriesData?.data} />
        <AddCategory visible={visible} onCancel={handleCancel} />
      </AdminContainer>
    </>
  );
};
