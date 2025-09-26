
import { Outlet } from "react-router";
import "./App.css";
import CommonLayout from "./components/layout/CommonLayout";
import env from "./config/env.config";
export default function App() {
console.log(env.baseUrl);

  return (
        <>
      <CommonLayout>
        <Outlet />
      </CommonLayout></>
  )
}