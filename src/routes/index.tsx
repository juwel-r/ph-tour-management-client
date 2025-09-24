import { createBrowserRouter } from "react-router";
import App from "../App";
import About from "../pages/About";

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
  }
]);

export default router;
