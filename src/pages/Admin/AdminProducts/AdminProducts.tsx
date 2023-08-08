import React from "react";
import { Input, Select, Button } from "antd";
import styled from "styled-components";
import { HeaderAdmin } from "../../../components/HeaderAdmin/HeaderAdmin";
import { ProductList } from "./ProductList";
import { useNavigate } from "react-router-dom";

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

interface OptionData {
  key: string;
  value: string;
  children: string;
}

export const AdminProducts = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const navigate = useNavigate();

  const handleSearch = (value: string) => {
    // Xử lý tìm kiếm theo giá trị value và danh mục category
    // Gọi hàm onSearch để truyền giá trị tìm kiếm và danh mục lên component cha
    console.log(value, selectedCategory);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
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
              // value={formValues.category}
              onChange={handleCategoryChange}
              mode="multiple" // Cho phép chọn nhiều danh mục
              showSearch // Hiển thị thanh tìm kiếm
              filterOption={filterOption} // Tìm kiếm danh mục theo tên
              style={{ width: "300px" }}
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
          </SearchContainer>

          <Button
            type="primary"
            onClick={() => navigate("/admin/products/add")}
          >
            Add new product
          </Button>
        </TopContainer>
        <ProductList />
      </AdminContainer>
    </>
  );
};
