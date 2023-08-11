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
<<<<<<< HEAD

export interface Category {
  id: number;
  label: string;
  desc: string;
  image_url: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
  image_url: string;
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

export interface ProductListType {
  category: string;
=======
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
>>>>>>> d07e9c5fbdcaca0523803dcb23608863ff8860ae
}
