import { CheckoutPage } from "../pages/CheckoutPage/CheckoutPage";
import { DashboardUser } from "../pages/DashboardUser/DashboardUser";
import { Home } from "../pages/Home/Home";
import { OrerPage } from "../pages/OrderPage/OrerPage";
import { SignIn } from "../pages/SignIn/SignIn";
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
    page: OrerPage,
  },
];
