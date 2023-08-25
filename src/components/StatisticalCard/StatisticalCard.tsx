import { Card, Statistic } from "antd";
import React from "react";
import { BsBoxSeam } from "react-icons/bs";
import { styled } from "styled-components";

const StyledCard = styled(Card)`
  .ant-card-body {
    width: 300px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 2px 2px 10px 0px #00000040;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }

  .ant-card-body .ant-statistic {
    width: 180px;
  }
`;

export const StatisticalCard = ({
  title,
  value,
}: {
  title: string;
  value: number;
}) => {
  return (
    <div>
      <StyledCard bordered={false}>
        <Statistic
          title={title}
          value={value}
          precision={2}
          valueStyle={{ color: "#3f8600" }}
          // suffix="%"
        />
        <BsBoxSeam size={45} />
      </StyledCard>
    </div>
  );
};
