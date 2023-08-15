import React from "react";
import { Input, Select, Button } from "antd";
import styled from "styled-components";
import { HeaderAdmin } from "../../../components/HeaderAdmin/HeaderAdmin";
import { ProductList } from "./ProductList";
import { useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "../../../redux/apis/apiCategory";
import { useGetProductsQuery } from "../../../redux/apis/apiProduct";
import { Category, CategoryOptionData } from "../../../interface/interface";

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
  const navigate = useNavigate();

  const { data: categoriesData } = useGetCategoriesQuery({});
  const { data: productsData } = useGetProductsQuery({
    categoryIds: selectedCategory,
    name: searchValue,
  });

  const handleSearch = (value: string) => {
    setSearchValue(value);
    console.log("search product", value, searchValue);
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
        <ProductList productsData={productsData?.data} />
      </AdminContainer>
    </>
  );
};
