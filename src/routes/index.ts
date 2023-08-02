import { DashboardUser } from "../pages/DashboardUser/DashboardUser";
import { Home } from "../pages/Home/Home";
import { SignIn } from "../pages/SignIn/SignIn";
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
];

export const dashboardUser = [
  {
    path: "/",
    page: UserProfile,
  },
];
