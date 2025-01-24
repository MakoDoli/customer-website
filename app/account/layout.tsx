import React, { ReactNode } from "react";
import SideNavigation from "../components/SideNavigation";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-[25%_1fr] gap-8 h-full">
      <SideNavigation />
      {children}
    </div>
  );
}
