import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import About from "../pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Registration";
import Verify from "@/pages/Verify";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import { generateRoutes } from "@/utils/generateRoutes";
import { role } from "@/constants/Role";
import { checkAuthorization } from "@/utils/checkAuthorization";
import type { TRole } from "@/types/auth.types";
import Unauthorize from "@/pages/Unauthorize";
import Tours from "@/pages/Tours";
import Homepage from "@/pages/HomePage";
import TourDetails from "@/pages/TourDetails";
import Booking from "@/pages/Booking";
import Success from "@/pages/payment/Success";
import Cancel from "@/pages/payment/Cancel";
import Failed from "@/pages/payment/Failed";

const router = createBrowserRouter([
  // {
  //     element:<App/>,
  //     path:"/"
  // this method will not use, আমরা প্রটেকক্টেড রাউট গুলো Component Middleware ব্যবহার না করে অন্যবাবে একসেস করব তাই আমার এখানে element use korbo na.
  // }
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: Homepage,
        index: true,
      },
      {
        Component: About,
        path: "about",
      },
      {
        Component: Tours,
        path: "tours",
      },
      {
        Component: TourDetails,
        path: "tours/:id",
      },
      {
        Component: checkAuthorization(Booking),
        path: "booking/:id",
      },
    ],
  },

  {
    Component: checkAuthorization(DashboardLayout, role.ADMIN as TRole),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },

  {
    Component: checkAuthorization(DashboardLayout, role.USER as TRole),
    path: "/user",
    children: [
      { index: true, element: <Navigate to="/user/booking" /> },
      ...generateRoutes(userSidebarItems),
    ],
  },

  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
  {
    Component: Verify,
    path: "/verify",
  },
  {
    Component: Success,
    path: "/payment/success",
  },
  {
    Component: Cancel,
    path: "/payment/cancel",
  },
  {
    Component: Failed,
    path: "/payment/failed",
  },
  {
    Component: Unauthorize,
    path: "/unauthorize",
  },
]);

export default router;
