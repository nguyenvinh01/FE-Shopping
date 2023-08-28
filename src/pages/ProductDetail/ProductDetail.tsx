import { Button, Carousel, Image, Space, notification } from "antd";
import React, { useEffect } from "react";
import { styled } from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsCart4 } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductDetailQuery } from "../../redux/apis/apiProduct";
import {
  useAddToCartMutation,
  useGetCartItemQuery,
} from "../../redux/apis/apiCart";
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
  const { data: cartData } = useGetCartItemQuery();
  const [addToCart] = useAddToCartMutation();
  const navigate = useNavigate();
  var quantity: number = 0;

  useEffect(() => {
    quantity = Number(data?.data.quantity);
  }, [cartData]);
  const handleAddToCart = async () => {
    const token = localStorage.getItem("access_token");
    console.log(data?.data.quantity, "data quantity");
    const currentProduct = cartData?.data.find((cart) => cart.id === id);
    if (!token) {
      notification.warning({
        message: "Đăng nhập để mua hàng",
        description: "Đăng nhập để mua hàng",
      });
      navigate("/sign-in");
    } else {
      if (!currentProduct) {
        console.log(quantity, "Còn");

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
        console.log(currentProduct?.quantity, quantity, "Hết");
        if (Number(currentProduct?.quantity) >= quantity) {
          notification.error({
            message: "Vượt quá số hàng sẵn có",
            description: `Vượt quá số hàng sẵn có`,
          });
        } else {
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
        }
      }
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
