import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

export enum ROLE {
  BASIC = "BASIC",
  ADMIN = "ADMIN",
}

export interface CheckoutItemType {
  image?: string;
  productname?: string;
  categories?: string;
  price: number;
  quantity: number;
  amount?: number;
  product_id?: string;
}

export interface OrderModalType {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  idOrder: string;
}

export interface CartItemType {
  id: string;
  image?: string;
  desc?: string;
  categories?: string;
  price: number;
  quantity: number;
  product_id?: string;
  amount?: number;
}

export interface LoginResponse {
  success: boolean;
  AccessToken: string;
}

export interface RefreshtokenResponse {
  success: boolean;
  AccessToken: string;
}

export interface User {
  id: string;
  email: string;
  fullname: string;
  address: string;
  phone: string;
  role: ROLE;
  image_url: string;
}

export interface Category {
  id: string;
  label: string;
  description: string;
  image_url: string;
}
export interface CategoryResponse {
  success: boolean;
  data: Category[];
  metadata: {
    take: string;
    skip: string;
    count: string;
  };
}
export interface CreateCategoryDataType {
  categoryImage: Blob;
  categoryInformation: {
    label: string;
    description: string;
  };
}
export interface CategoryOptionData {
  key: string;
  value: string;
  children: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
  image_url: string;
  categories: {
    id: number;
    label: string;
  }[];
}
export interface ProductResponse {
  success: boolean;
  data: Product[];
  metadata: {
    take: number;
    skip: number;
    count: number;
  };
}
export interface ProductDetailResponse {
  success: boolean;
  data: Product;
  metadata: {
    take: number;
    skip: number;
    count: number;
  };
}
export interface ProductUpdateDataType {
  productImage: Blob;
  productInformation: ProductFormValues;
}
export interface ProductFormValues {
  name: string;
  categories: number[];
  price: number;
  quantity: number;
  description: string;
}

export interface CardProductType {
  name?: string;
  price?: number;
  desc?: string;
  img_url?: string;
  idProduct?: string;
}
export interface cardCategoryType {
  name?: string;
  img_url?: string;
}

export interface DataProductListType {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  categories: {
    id: number;
    label: string;
  }[];
  //   status: string;
}
export interface ProductListType {
  productsData?: Product[];
}

export interface DataProductUpdate {
  productImage?: Blob;
  productInformation?: {
    name: string;
    categories: number[];
    price: number;
    quantity: number;
    description: string;
  };
}

export interface CategoryListType {
  categoriesData?: Category[];
}

export interface CategoryModel {
  visible: boolean;
  onCancel: () => void;
  onEdit: (id: string) => void;
  id: string;
}
export interface DataUserUpdate {
  userImage?: Blob;
  userInformation?: {
    fullname: string;
    address: string;
    phone: string;
  };
}
export interface Response<T> {
  success: boolean;
  metadata: { message: string };
  data: T;
}

export interface QueryParams {
  limit?: number;
  page?: number;
  name?: string;
  id?: string;
  maxPrice?: number;
  minPrice?: number;
}

export interface MessageResponse<T> {
  data?: T;
  error?:
    | FetchBaseQueryError
    | SerializedError
    | { metadata: { message: string } };
}
export interface ErrorResponse {
  error:
    | {
        status?: number; // Optional, if available in the actual error
        data?: { metadata: { message: string } };
      }
    | FetchBaseQueryError
    | SerializedError;
}
