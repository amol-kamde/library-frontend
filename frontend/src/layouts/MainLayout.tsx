import type { ReactNode } from "react";
import Navbar from "../components/common/Navbar";

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Navbar />

      <div className="container mt-4">
        {children}
      </div>
    </>
  );
}

export default MainLayout;