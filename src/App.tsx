import { Outlet } from "react-router";
import "./App.css";
import CommonLayout from "./components/layout/CommonLayout";
export default function App() {

  return (
    <>
      <CommonLayout>
        <Outlet />
      </CommonLayout>
    </>
  );
}
