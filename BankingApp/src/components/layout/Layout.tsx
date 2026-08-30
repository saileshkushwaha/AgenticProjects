import { useState } from "react";
import { IconRail } from "./IconRail";
import { NavPanel } from "./NavPanel";
import { Topbar } from "./Topbar";

export function Layout({ children }: { children: React.ReactNode }) {
  const [navOpen, setNavOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState("dashboard");

  return (
    <div className="flex h-screen overflow-hidden">
      <IconRail activeCategory={activeCategory} onSelect={setActiveCategory} />
      {navOpen && <NavPanel activeCategory={activeCategory} />}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar onToggleNav={() => setNavOpen(!navOpen)} navOpen={navOpen} />
        <main className="flex-1 overflow-auto bg-muted/30 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
