import { createBrowserRouter } from "react-router";
import App from "../App";
import About from "../pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Registration";
import Verify from "@/pages/Verify";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Booking from "@/pages/user/Booking";
import { generateRoutes } from "@/utils/genarateRoutes";
import { adminSidebarItems } from "./adminSidebarItems";

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
        Component: About,
        path: "about",
      },
    ],
  },

  {
    Component: DashboardLayout,
    path: "/admin",
    children: generateRoutes(adminSidebarItems),
  },

  {
    Component: DashboardLayout,
    path: "/user",
    children: [
      {
        Component: Booking,
        path: "booking",
      },
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
]);

export default router;
