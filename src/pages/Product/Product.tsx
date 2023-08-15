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

const ProductItems = styled.div`
  flex-basis: 77%;
  padding: 0 15px;
  display: flex;
  /* justify-items: space-between; */
  flex-wrap: wrap;
  align-items: stretch;
  margin-top: 10px;
  gap: 1rem;
`;

const priceOptions = [
  { value: 1, label: "Lower to higher" },
  { value: 2, label: "Higher to lower" },
  { value: 3, label: "smt" },
];

export const Products = () => {
  const [filterPrice, setFilterPrice] = useState(0);
  const [priceSort, setPriceSort] = useState(0);

  const { data: categoriesData } = useGetCategoriesQuery({});
  const { data: productsData } = useGetProductsQuery("");

  const HandleChangePriceFilter = (newValue: number) => {
    setFilterPrice(newValue);
  };

  const handleChangePriceSort = (newValue: number) => {
    setPriceSort(newValue);
  };

  const onCheckBoxChange = (checkedValues: CheckboxValueType[]) => {
    console.log("checked = ", checkedValues);
  };

  // const categoryOptions = categoriesData?.map((category: Category) => ({
  //   value: category.id,
  //   label: category.label,
  // }));

  const renderProductList = () => {
    if (!productsData) {
      return null; //Hoặc hiển thị thông báo tải
    }
    // return productsData?.map((product: Product) => (
    //   <CardProduct
    //     key={product.id}
    //     name={product.name}
    //     price={product.price}
    //     // desc={product.description}
    //     img_url={product.image_url}
    //   />
    // ));
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
            <Button type="default" shape="default">
              Reset
            </Button>
          </FilterHeader>
          <FilterSlider>
            <h3>Price</h3>
            <Slider
              min={0}
              max={20000}
              onChange={HandleChangePriceFilter}
              value={typeof filterPrice === "number" ? filterPrice : 0}
              step={1000}
            />
            <p>Max price {filterPrice}</p>

            <Select
              defaultValue={1}
              style={{ width: 200 }}
              onChange={handleChangePriceSort}
              options={priceOptions}
            />
          </FilterSlider>
          {/* // <SearchList></SearchList>
        // <SearchList></SearchList> */}
          <CategorySearch>
            <h3>Categories</h3>
            <Checkbox.Group
              // options={categoryOptions}
              onChange={onCheckBoxChange}
              style={{ flexDirection: "column" }}
            />
          </CategorySearch>
        </ProductFilter>
        <ProductItems>{renderProductList()}</ProductItems>;
      </ProductContent>
    </>
  );
};
