import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  CreditCard,
  Grid3X3,
  Settings,
} from "lucide-react";
import { cn } from "../../lib/utils";

const ICON_NAV = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard", category: "dashboard" },
  { to: "/accounts", icon: Wallet, label: "Accounts", category: "accounts" },
  { to: "/transactions", icon: ArrowLeftRight, label: "Transactions", category: "transactions" },
  { to: "/transfers", icon: CreditCard, label: "Transfers", category: "transfers" },
  { to: "/services", icon: Grid3X3, label: "Services", category: "services" },
  { to: "/settings", icon: Settings, label: "Settings", category: "settings" },
];

export function IconRail() {
  const location = useLocation();

  const isActive = (to: string) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname.startsWith(to);
  };

  return (
    <div className="flex h-full w-16 flex-col items-center border-r bg-[#1b1b2f] py-3 gap-1">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white font-bold text-sm mb-3">
        B
      </div>
      {ICON_NAV.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-lg transition-all relative group",
            isActive(item.to)
              ? "bg-white/20 text-white shadow-lg"
              : "text-white/60 hover:bg-white/10 hover:text-white"
          )}
          title={item.label}
        >
          <item.icon className="h-5 w-5" />
          {isActive(item.to) && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-7 w-1 rounded-r-full bg-white" />
          )}
          <div className="absolute left-full ml-3 hidden group-hover:block z-50 rounded-md bg-gray-900 px-3 py-1.5 text-xs text-white whitespace-nowrap shadow-lg">
            {item.label}
          </div>
        </NavLink>
      ))}
    </div>
  );
}
