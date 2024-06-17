"use client";

import React, { useContext } from "react";
import TopNavBar from "./TopNavBar";

interface AppPublicLayoutProps {
  children: React.ReactNode;
}

const AppPublicLayout: React.FC<AppPublicLayoutProps> = ({ children }) => {
  return (
    <div>
      {/* Top navbar */}
      <TopNavBar />

      {/* Main content */}
      <main>{children}</main>

      {/* Footer (if needed) */}
      {/* <footer></footer> */}
    </div>
  );
};

export default AppPublicLayout;