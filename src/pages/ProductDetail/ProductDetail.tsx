import { Button, Carousel, Image, Space, notification } from "antd";
import React from "react";
import { styled } from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsCart4 } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductDetailQuery } from "../../redux/apis/apiProduct";
import { useAddToCartMutation } from "../../redux/apis/apiCart";
import { CartResponse, MessageResponse } from "../../interface/interface";
import numeral from "numeral";
import { FormatNumber } from "../../utility/FormatNumber";

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
  const [addToCart] = useAddToCartMutation();
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const response: MessageResponse<CartResponse> = await addToCart(id);
      if (response.data?.success) {
        notification.success({
          message: "Thêm thành công",
          description: `Thêm thành công vào rỏ hàng`,
        });
      } else {
        notification.error({
          message: "Có lỗi xảy ra",
          description: `Có lỗi xảy ra`,
        });
      }
    } else {
      notification.warning({
        message: "Đăng nhập để mua hàng",
        description: "Đăng nhập để mua hàng",
      });
      navigate("/sign-in");
    }
  };

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
              <p>Giá: {FormatNumber(data?.data.price)}₫</p>
            </div>
            <div>
              <h4>Description</h4>
              <p>{data?.data.description}</p>
            </div>
            <div>
              <Button size={"large"} type="primary" onClick={handleAddToCart}>
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
