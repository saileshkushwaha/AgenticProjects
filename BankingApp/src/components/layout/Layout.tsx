import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Sidebar, getActiveCategory } from "./Sidebar";
import { Topbar } from "./Topbar";

export function Layout({ children }: { children: React.ReactNode }) {
  const [navOpen, setNavOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState("dashboard");
  const location = useLocation();

  useEffect(() => {
    setActiveCategory(getActiveCategory(location.pathname));
  }, [location.pathname]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activeCategory={activeCategory} onToggleNav={() => setNavOpen(!navOpen)} navOpen={navOpen} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar onToggleNav={() => setNavOpen(!navOpen)} navOpen={navOpen} />
        <main className="flex-1 overflow-auto bg-background p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
