import { useState } from "react";
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
  LogOut,
  ChevronDown,
  ChevronRight,
  Search,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { useAuthStore } from "../../stores/authStore";

interface NavGroup {
  title: string;
  items: {
    to: string;
    icon: React.ElementType;
    label: string;
    badge?: number;
  }[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    title: "Banking",
    items: [
      { to: "/", icon: LayoutDashboard, label: "Dashboard" },
      { to: "/accounts", icon: Wallet, label: "Accounts" },
      { to: "/transactions", icon: ArrowLeftRight, label: "Transactions" },
      { to: "/transfers", icon: CreditCard, label: "Transfers" },
    ],
  },
  {
    title: "Services",
    items: [
      { to: "/applications", icon: User, label: "Open Account" },
      { to: "/kyc", icon: Shield, label: "KYC Verification" },
      { to: "/analytics", icon: BarChart3, label: "Analytics" },
    ],
  },
  {
    title: "Preferences",
    items: [
      { to: "/notifications", icon: Bell, label: "Notifications", badge: 3 },
      { to: "/settings", icon: Settings, label: "Settings" },
    ],
  },
];

export function NavPanel() {
  const location = useLocation();
  const logout = useAuthStore((s) => s.logout);
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["Banking", "Services", "Preferences"]);

  const isActive = (to: string) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname.startsWith(to);
  };

  const toggleGroup = (title: string) => {
    setExpandedGroups((prev) =>
      prev.includes(title) ? prev.filter((g) => g !== title) : [...prev, title]
    );
  };

  return (
    <div className="flex h-full w-56 flex-col border-r bg-muted/20">
      <div className="flex items-center gap-2 border-b px-3 py-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Search..."
            className="h-7 w-full rounded-md border border-input bg-background pl-7 pr-2 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-2">
        {NAV_GROUPS.map((group) => (
          <div key={group.title} className="mb-3">
            <button
              onClick={() => toggleGroup(group.title)}
              className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
            >
              {group.title}
              {expandedGroups.includes(group.title) ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </button>
            {expandedGroups.includes(group.title) && (
              <div className="mt-1 space-y-0.5">
                {group.items.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={cn(
                      "flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-all",
                      isActive(item.to)
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.badge && (
                      <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="border-t p-2">
        <button
          onClick={() => {
            logout();
            window.location.href = "/AgenticProjects/#/login";
          }}
          className="flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign out</span>
        </button>
      </div>
    </div>
  );
}
