import Search from "antd/es/input/Search";
import React from "react";
import { useDispatch } from "react-redux";
import { styled } from "styled-components";
import { setKeyWord } from "../../redux/slice/productSlice";
const color = "red";
const InputSearchComponent = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  .ant-input-group-wrapper {
    border: 1px solid #000;
    border-radius: 30px;
    padding: 2px;
    width: fit-content;
    background-color: #fff;
    width: 400px;
    height: 42px;
  }
  .ant-input-wrapper {
    border: none;
    outline: none !important;
    padding-top: 2px;
    height: 32px;
  }
  .ant-input {
    border-radius: 30px !important;
    padding: 0px;
    margin-right: 2px;
    height: 32px;
    border: none;
    padding-left: 7px;
    height: 32px;
  }
  .ant-input:focus {
    border-radius: 30px;
    padding: 0px;
    height: 32px;
    border: none;
    padding-left: 7px;
    outline: none;
    box-shadow: none;
    height: 32px;
  }
  .ant-btn {
    border-radius: 30px !important;
    background-color: ${(props) => props.color} !important;
    margin-left: 2px;
    height: 32px;
    /* background-color: ${color}; */
  }
`;

interface InputSearchType {
  placeholder?: string;
  textButton?: string;
  onClick?: () => void;
  color?: string;
}
export const SearchComponent = ({
  placeholder,
  textButton,
  color,
  ...rest
}: InputSearchType) => {
  const dispatch = useDispatch();
  const handleSearch = (value: string) => {
    dispatch(setKeyWord(value));
  };
  return (
    <InputSearchComponent>
      <Search
        placeholder={placeholder}
        enterButton={textButton}
        size="large"
        {...rest}
        onSearch={(value: string) => handleSearch(value)}
      />
    </InputSearchComponent>
  );
};
