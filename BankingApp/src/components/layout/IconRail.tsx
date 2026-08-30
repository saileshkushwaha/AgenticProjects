import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  CreditCard,
  User,
  Bell,
  Settings,
  BarChart3,
  Shield,
} from "lucide-react";
import { cn } from "../../lib/utils";

const ICON_NAV = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/accounts", icon: Wallet, label: "Accounts" },
  { to: "/transactions", icon: ArrowLeftRight, label: "Transactions" },
  { to: "/transfers", icon: CreditCard, label: "Transfers" },
  { to: "/applications", icon: User, label: "Open Account" },
  { to: "/kyc", icon: Shield, label: "KYC" },
  { to: "/analytics", icon: BarChart3, label: "Analytics" },
  { to: "/notifications", icon: Bell, label: "Notifications" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export function IconRail() {
  const location = useLocation();

  const isActive = (to: string) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname.startsWith(to);
  };

  return (
    <div className="flex h-full w-14 flex-col items-center border-r bg-card py-2 gap-1">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm mb-2">
        B
      </div>
      {ICON_NAV.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg transition-all relative group",
            isActive(item.to)
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
          title={item.label}
        >
          <item.icon className="h-4 w-4" />
          {isActive(item.to) && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-0.5 rounded-r-full bg-primary" />
          )}
          <div className="absolute left-full ml-2 hidden group-hover:block z-50 rounded-md bg-foreground px-2 py-1 text-xs text-background whitespace-nowrap shadow-lg">
            {item.label}
          </div>
        </NavLink>
      ))}
    </div>
  );
}
