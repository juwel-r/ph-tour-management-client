import { Outlet } from "react-router";
import "./App.css";
import CommonLayout from "./layout/CommonLayout";

function App() {
  return (
    <>
      <p className="text-2xl">This is home page</p>
      <CommonLayout><Outlet /></CommonLayout>
    </>
  );
}

export default App;
