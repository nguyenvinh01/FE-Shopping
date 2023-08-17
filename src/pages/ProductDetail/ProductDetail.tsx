import { Button, Carousel, Image, Space } from "antd";
import React from "react";
import { styled } from "styled-components";
import Logo from "../../assets/images/Group 1481.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsCart4 } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useGetProductDetailQuery } from "../../redux/apis/apiProduct";

const ProductDetailWrapper = styled.div``;

const DetailProduct = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;

  .ant-space-item {
    height: 100%;
  }
  .ant-space-item:last-child {
    flex-shrink: 9;
  }
`;
const ImageProduct = styled.div``;
const DescProduct = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;
export const ProductDetail = () => {
  const { id }: any = useParams();
  const { data } = useGetProductDetailQuery(id);
  console.log(data?.data);

  return (
    <ProductDetailWrapper>
      <DetailProduct>
        <Space size={50}>
          <ImageProduct>
            <Image src={data?.data.image_url} width={450} height={450} />
          </ImageProduct>
          <DescProduct>
            <div>
              <span>
                Tên sản phẩm: <h2>{data?.data.name}</h2>
              </span>
            </div>
            <div>
              <p>Giá: {data?.data.price} VNĐ</p>
            </div>
            <div>
              <h4>Description</h4>
              <p>{data?.data.description}</p>
            </div>
            <div>
              <Button size={"large"} type="primary">
                Add to cart
                <i>
                  <BsCart4 />
                </i>
              </Button>
            </div>
          </DescProduct>
        </Space>
      </DetailProduct>
    </ProductDetailWrapper>
  );
};
