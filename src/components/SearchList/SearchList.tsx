import { Checkbox, Collapse } from "antd";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import React from "react";
import { styled } from "styled-components";

const CollapseList = styled(Collapse)`
  border: none;

  /* .ant-collapse-item {
    border-radius: 0;
  } */

  .ant-collapse-item .ant-collapse-header {
    /* border-top: 1px solid #dcdcdc; */
    background-color: white;
  }

  .ant-collapse-item .ant-collapse-content {
    border: none;
  }
  .ant-collapse-item .ant-collapse-content .ant-collapse-content-box {
    padding-top: 0;
  }
`;
const plainOptions = ["Category 1", "Category 2", "Category 3"];

const onChange = (checkedValues: CheckboxValueType[]) => {
  console.log("checked = ", checkedValues);
};

export const SearchList = () => {
  return (
    <CollapseList
      items={[
        {
          key: "1",
          label: "This is default size panel header",
          children: (
            <Checkbox.Group
              options={plainOptions}
              onChange={onChange}
              style={{ flexDirection: "column" }}
            />
          ),
        },
      ]}
    />
  );
};
