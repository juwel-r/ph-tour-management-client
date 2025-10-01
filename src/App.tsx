import { Outlet } from "react-router";
import "./App.css";
import CommonLayout from "./components/layout/CommonLayout";
import { generateRoutes } from "./utils/genarateRoutes";
import { adminSidebarItems } from "./routes/adminSidebarItems";
export default function App() {
  console.log(generateRoutes(adminSidebarItems));
  return (
    <>
      <CommonLayout>
        <Outlet />
      </CommonLayout>
    </>
  );
}
