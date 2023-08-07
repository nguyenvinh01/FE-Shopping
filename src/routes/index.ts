import AdminPage from "../pages/AdminPage/AdminPage";
import { AdminProducts } from "../pages/AdminProducts/AdminProducts";
import { DashboardAdmin } from "../pages/DashboardAdmin/DashboardAdmin";
import { CheckoutPage } from "../pages/CheckoutPage/CheckoutPage";
import { DashboardUser } from "../pages/DashboardUser/DashboardUser";
import { Home } from "../pages/Home/Home";
import { OrderPage } from "../pages/OrderPage/OrderPage";
import { SignIn } from "../pages/SignIn/SignIn";
import { SignUp } from "../pages/SignUp/SignUp";
import { UserCart } from "../pages/UserCart/UserCart";
import { UserProfile } from "../pages/UserProfile/UserProfile";

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
];
