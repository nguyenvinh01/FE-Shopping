import { AdminOrders } from "../pages/Admin/AdminOrders/AdminOrders";
import AdminPage from "../pages/Admin/AdminPage/AdminPage";
import { AdminProducts } from "../pages/Admin/AdminProducts/AdminProducts";
import { EditProduct } from "../pages/Admin/AdminProducts/EditProduct/EditProduct";
import { DashboardAdmin } from "../pages/Admin/DashboardAdmin/DashboardAdmin";
import { CheckoutPage } from "../pages/CheckoutPage/CheckoutPage";
import { DashboardUser } from "../pages/DashboardUser/DashboardUser";
import { Home } from "../pages/Home/Home";
import { OrderPage } from "../pages/OrderPage/OrderPage";
import { SignIn } from "../pages/SignIn/SignIn";
import { SignUp } from "../pages/SignUp/SignUp";
import { UserCart } from "../pages/UserCart/UserCart";
import { UserProfile } from "../pages/UserProfile/UserProfile";
import { AddProduct } from "../pages/Admin/AdminProducts/AddProduct/AddProduct";
import { AdminProductDetail } from "../pages/Admin/AdminProducts/AdminProductDetail/AdminProductDetail";
import { AdminAccounts } from "../pages/Admin/AdminAccounts/AdminAccounts";

export const routes = [
  {
    path: "/",
    page: Home,
    isHeader: true,
  },
  {
    path: "/dashboard/*",
    page: DashboardUser,
    isHeader: true,
  },
  {
    path: "/sign-in",
    page: SignIn,
    isHeader: false,
  },
  {
    path: "/sign-up",
    page: SignUp,
    isHeader: false,
  },
  {
    path: "/admin/*",
    page: DashboardAdmin,
    isHeader: false,
  },
  {
    path: "/check-out",
    page: CheckoutPage,
    isHeader: true,
  },
];

export const dashboardUser = [
  {
    path: "/",
    page: UserProfile,
  },
  {
    path: "/cart",
    page: UserCart,
  },
  {
    path: "/order",
    page: OrderPage,
  },
];

export const dashboardAdmin = [
  {
    path: "/",
    page: AdminPage,
  },
  {
    path: "products",
    page: AdminProducts,
  },
  {
    path: "products/edit",
    page: EditProduct,
  },
  {
    path: "products/add",
    page: AddProduct,
  },
  {
    path: "products/detail",
    page: AdminProductDetail,
  },
  {
    path: "orders",
    page: AdminOrders,
  },
  {
    path: "accounts",
    page: AdminAccounts,
  },
];
