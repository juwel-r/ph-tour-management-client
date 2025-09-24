import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface IProps {
  children: ReactNode;
}
//I can user ReactElement instead ReactNode but React ReactElement only support JSX element but ReactNode allow anything like text, html element, component
const CommonLayout = ({ children }: IProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="grow">{children}</div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
