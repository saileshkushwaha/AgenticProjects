import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden lg:pl-60">
        <Topbar />
        <main className="flex-1 overflow-auto bg-muted/30 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
