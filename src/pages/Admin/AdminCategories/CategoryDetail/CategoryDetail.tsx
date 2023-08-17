import { Avatar, Button, Descriptions, Modal } from "antd";
import React from "react";
import { styled } from "styled-components";
import { CategoryModel } from "../../../../interface/interface";
import { useGetCategoryDetailQuery } from "../../../../redux/apis/apiCategory";

const CategoryWapper = styled.div`
  display: flex;
  border-bottom: 1px solid #978686a8;
`;

export const CategoryDetail = ({
  visible,
  onCancel,
  onEdit,
  id,
  loaded,
}: Omit<CategoryModel, "onOk">) => {
  const { data } = useGetCategoryDetailQuery(id, { skip: loaded });

  const footermodel = (
    <>
      <Button key="back" onClick={onCancel}>
        Return
      </Button>
      <Button key="submit" type="primary" onClick={() => onEdit(id)}>
        Edit
      </Button>
    </>
  );

  return (
    <div>
      <Modal
        open={visible}
        onCancel={onCancel}
        // onEdit={onEdit}
        footer={footermodel}
        width={800}
      >
        <CategoryWapper>
          <div style={{ marginRight: "10px", flex: "1" }}>
            <Avatar
              shape="square"
              size={180}
              //   icon={<UserOutlined />}
              src={data?.image_url}
            />
          </div>
          <div style={{ flex: "2" }}>
            <Descriptions title="Category" layout="vertical" column={1}>
              <Descriptions.Item label="Name">{data?.label}</Descriptions.Item>
              <Descriptions.Item label="Description">
                {data?.description}
              </Descriptions.Item>
            </Descriptions>
          </div>
        </CategoryWapper>
      </Modal>
    </div>
  );
};
