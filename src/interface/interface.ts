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
