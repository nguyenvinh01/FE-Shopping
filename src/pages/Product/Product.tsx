import React, { useState } from "react";
import { styled } from "styled-components";
import { CardProduct } from "../../components/CardProduct/CardProduct";
import { SearchList } from "../../components/SearchList/SearchList";
import { Button, Checkbox, Pagination, Select, Slider } from "antd";
import { useGetCategoriesQuery } from "../../redux/apis/apiCategory";
import { useGetProductsQuery } from "../../redux/apis/apiProduct";
import { Category, Product } from "../../interface/interface";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { SearchComponent } from "../../components/SearchComponent/SearchComponent";

const ProductContent = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProductFilter = styled.div`
  flex-basis: 23%;
  display: flex;
  flex-direction: column;
  height: fit-content;
  padding: 15px;
  margin-top: 10px;
  border-radius: 10px;
  box-shadow: 0px 2px 10px 0px #00000040;
`;

const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    margin-top: 10px;
  }

  .ant-btn {
    border-color: #ff9c00;
    color: #ff9c00;
  }
  border-bottom: 1px solid #dcdcdc;
`;

const FilterSlider = styled.div`
  padding-bottom: 15px;
  border-bottom: 1px solid #dcdcdc;

  h3 {
    margin-top: 10px;
  }
`;

const CategorySearch = styled.div`
  padding-bottom: 15px;

  h3 {
    margin-top: 10px;
  }
`;

const ProductWapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 77%;
`;

const ProductItems = styled.div`
  flex-basis: 77%;
  padding: 0 15px;
  display: flex;
  /* justify-items: space-between; */
  flex-wrap: wrap;
  align-items: stretch;
  margin-top: 10px;
  gap: 1.5rem;
`;

const priceOptions = [
  { value: 1, label: "Lower to higher" },
  { value: 2, label: "Higher to lower" },
  { value: 3, label: "smt" },
];

export const Products = () => {
  const [filterPrice, setFilterPrice] = useState(10000000);
  const [priceSort, setPriceSort] = useState(0);
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [page, setPage] = React.useState(1);

  const { data: categoriesData } = useGetCategoriesQuery({});
  const { data: productsData } = useGetProductsQuery({
    id: selectedCategory,
    maxPrice: filterPrice,
    page,
  });

  const HandleChangePriceFilter = (newValue: number) => {
    setFilterPrice(newValue);
  };

  const handleChangePriceSort = (newValue: number) => {
    setPriceSort(newValue);
  };

  const handleReset = () => {
    setFilterPrice(10000000);
    setPriceSort(0);
    setSelectedCategory("");
  };

  const handleChangePage = (value: number) => {
    // console.log("page", value);
    setPage(value);
  };

  const onCheckBoxChange = (checkedValues: CheckboxValueType[]) => {
    setSelectedCategory(checkedValues.join(","));
    console.log("checked = ", selectedCategory);
  };

  const categoryOptions = categoriesData?.data.map((category: Category) => ({
    value: category.id,
    label: category.label,
  }));

  const renderProductList = () => {
    if (!productsData) {
      return null; //Hoặc hiển thị thông báo tải
    }
    return productsData?.data.map((product: Product) => (
      <CardProduct
        key={product.id}
        name={product.name}
        price={product.price}
        img_url={product.image_url}
        idProduct={product.id}
      />
    ));
  };

  return (
    <>
      <SearchComponent
        placeholder="search text"
        textButton="Search"
        color="red"
      />
      <ProductContent>
        <ProductFilter>
          <FilterHeader>
            <h3>Filter</h3>
            <Button type="default" shape="default" onClick={handleReset}>
              Reset
            </Button>
          </FilterHeader>
          <FilterSlider>
            <h3>Price</h3>
            <Slider
              min={0}
              max={10000000}
              onChange={HandleChangePriceFilter}
              value={typeof filterPrice === "number" ? filterPrice : 10000000}
              step={10000}
            />
            <p>Max price {filterPrice}</p>

            <Select
              defaultValue={1}
              style={{ width: 200 }}
              onChange={handleChangePriceSort}
              options={priceOptions}
            />
          </FilterSlider>

          <CategorySearch>
            <h3>Categories</h3>
            <Checkbox.Group
              options={categoryOptions}
              // checked={selectedCategory}
              onChange={onCheckBoxChange}
              style={{ flexDirection: "column" }}
            />
          </CategorySearch>
        </ProductFilter>
        <ProductWapper>
          <ProductItems>{renderProductList()}</ProductItems>
          <Pagination
            defaultCurrent={1}
            current={page}
            total={productsData?.metadata?.count}
            onChange={(value) => handleChangePage(value)}
          />
        </ProductWapper>
      </ProductContent>
    </>
  );
};
