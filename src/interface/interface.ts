import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

enum ROLE {
  BASIC,
  ADMIN,
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
  id: number;
  label: string;
  description: string;
  image_url: string;
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

export interface ProductFormValues {
  name: string;
  category: string[];
  price: number;
  quantity: number;
  description: string;
}

export interface CardProductType {
  name?: string;
  price?: number;
  desc?: string;
  img_url?: string;
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
  productsData: DataProductListType[];
}

export interface DataProductUpdate {
  productImage?: Blob;
  productInformation?: {
    name: string;
    category: string[];
    price: number;
    quantity: number;
    description: string;
  };
}

export interface CategoryListType {
  categoriesData: Category[];
}

export interface CategoryModel {
  visible: boolean;
  onCancel: () => void;
  onEdit: (id: number) => void;
  id: number;
}
export interface DataUserUpdate {
  userImage?: Blob;
  userInformation?: {
    fullname: string;
    address: string;
    phone: string;
  };
}
interface DataResponse {
  statusCode?: string;
  message?: string;
  AccessToken?: string;
  success: boolean;
}
// export interface
export interface Response {
  data?: DataResponse;
  error?: FetchBaseQueryError | SerializedError;
}
