import { Button, Carousel, Image, Space } from "antd";
import React from "react";
import { styled } from "styled-components";
import Logo from "../../assets/images/Group 1481.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsCart4 } from "react-icons/bs";

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
  return (
    <ProductDetailWrapper>
      <DetailProduct>
        <Space size={50}>
          <ImageProduct>
            <Image src={Logo} />
          </ImageProduct>
          <DescProduct>
            <div>
              <h2>Product name</h2>
            </div>
            <div>
              <h3>Price</h3>
            </div>
            {/* <h3>Price</h3> */}
            <div>
              <h4>Description</h4>
              <p>
                Alias et non nisi. Error voluptate error ut et. Asperiores ut
                odio. Voluptas voluptas voluptatem minima unde quasi quas.
                Itaque nihil consequatur sed quae porro pariatur mollitia porro.
                Qui eligendi quo et laboriosam. Provident nihil amet voluptatem
                quaerat possimus ex voluptates incidunt. Necessitatibus cumque
                aut reprehenderit incidunt voluptatibus quasi nisi. Qui officiis
                amet sapiente. Inventore molestias unde occaecati. Cum et
                officia saepe inventore laudantium aut. Expedita iure rerum a
                dolorem est eos fugit. Velit sequi voluptas similique minus et.
              </p>
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
