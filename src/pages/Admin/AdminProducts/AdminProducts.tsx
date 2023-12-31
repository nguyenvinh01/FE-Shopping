import React from "react";
import { Input, Select, Button } from "antd";
import styled from "styled-components";
import { HeaderAdmin } from "../../../components/HeaderAdmin/HeaderAdmin";
import { ProductList } from "./ProductList";
import { useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "../../../redux/apis/apiCategory";
import { useGetProductsQuery } from "../../../redux/apis/apiProduct";
import { Category, CategoryOptionData } from "../../../interface/interface";
import type { PaginationProps } from "antd";

const { Option } = Select;

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

export const AdminProducts = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [searchValue, setSearchValue] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const navigate = useNavigate();

  const { data: categoriesData } = useGetCategoriesQuery({ limit: 1000000 });
  const {
    data: productsData,
    isFetching,
    error,
  } = useGetProductsQuery({
    id: selectedCategory,
    name: searchValue,
    page: page,
    limit: limit,
  });

  if (error) {
    console.log("error is: ", error);
  }

  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    console.log(current, pageSize);
    setLimit(pageSize);
  };

  const handleChangePage = (value: number) => {
    console.log("page", value);
    setPage(value);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const categoryOptions = () => {
    if (!categoriesData) {
      return null;
    }
    return categoriesData?.data.map((category: Category) => (
      <Option key={category.id} value={category.id}>
        {category.label}
      </Option>
    ));
  };

  const handleCategoryChange = (value: string[]) => {
    setSelectedCategory(value.join(","));
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
            <Select
              placeholder="Chọn danh mục"
              onChange={handleCategoryChange}
              mode="multiple"
              showSearch
              filterOption={filterOption}
              style={{ width: "300px" }}
            >
              {categoryOptions()}
            </Select>
          </SearchContainer>

          <Button
            type="primary"
            onClick={() => navigate("/admin/products/add")}
          >
            Add new product
          </Button>
        </TopContainer>
        <ProductList
          productsData={productsData}
          isFetching={isFetching}
          page={page}
          limit={limit}
          onShowSizeChange={onShowSizeChange}
          handleChangePage={handleChangePage}
        />
      </AdminContainer>
    </>
  );
};
