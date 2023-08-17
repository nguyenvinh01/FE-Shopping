import React from "react";
import { Input, Select, Button, PaginationProps, Pagination } from "antd";
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
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(5);

  const { data: categoriesData, isFetching } = useGetCategoriesQuery({
    name: searchValue,
    page: page,
    limit: limit,
  });

  const hideModal = () => {
    setVisible(false);
  };

  const handleAdd = () => {
    setVisible(true);
  };

  const handleOk = () => {
    // Xử lý khi người dùng bấm nút OK (nếu cần)
    hideModal();
  };

  const handleCancel = () => {
    // Xử lý khi người dùng bấm nút Cancel (nếu cần)
    hideModal();
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    // console.log(current, pageSize);
    setLimit(pageSize);
  };

  const handleChangePage = (value: number) => {
    // console.log("page", value);
    setPage(value);
  };

  return (
    <>
      <HeaderAdmin pageName="AdminCategories" />
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

        <CategoryList
          categoriesData={categoriesData?.data}
          isFetching={isFetching}
        />
        <Pagination
          showSizeChanger
          // current={1}
          onShowSizeChange={onShowSizeChange}
          defaultCurrent={1}
          pageSize={limit}
          total={categoriesData?.metadata?.count}
          onChange={(value) => handleChangePage(value)}
        />

        <AddCategory
          visible={visible}
          onCancel={handleCancel}
          onOk={handleOk}
        />
      </AdminContainer>
    </>
  );
};
