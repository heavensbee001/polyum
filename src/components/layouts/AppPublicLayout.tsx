"use client";

import React from "react";
import TopNavBar from "./TopNavBar";
import { usePathname } from "next/navigation";

interface AppPublicLayoutProps {
  children: React.ReactNode;
}

const AppPublicLayout: React.FC<AppPublicLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <div>
      {/* Top navbar */}
      <TopNavBar hideSelector={pathname.includes("/transaction/")} />

      {/* Main content */}
      <main className="px-4 max-w-screen-md mx-auto">{children}</main>

      {/* Footer (if needed) */}
      {/* <footer></footer> */}
    </div>
  );
};

export default AppPublicLayout;
