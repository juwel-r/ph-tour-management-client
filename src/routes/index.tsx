import { createBrowserRouter } from "react-router";
import App from "../App";
import About from "../pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Registration";

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
    Component:Login,
    path:"/login"
  },{
    Component:Register,
    path:"/registration"
  }
]);

export default router;
