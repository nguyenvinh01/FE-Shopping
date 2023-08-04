import AdminPage from "../pages/AdminPage/AdminPage";
import { AdminProducts } from "../pages/AdminProducts/AdminProducts";
import { DashboardAdmin } from "../pages/DashboardAdmin/DashboardAdmin";
import { DashboardUser } from "../pages/DashboardUser/DashboardUser";
import { Home } from "../pages/Home/Home";
import { SignIn } from "../pages/SignIn/SignIn";
import { SignUp } from "../pages/SignUp/SignUp";
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
];

export const dashboardUser = [
  {
    path: "/",
    page: UserProfile,
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
