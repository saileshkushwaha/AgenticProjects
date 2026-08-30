import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  CreditCard,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bell,
  Settings,
  Shield,
  BarChart3,
  Menu,
  X,
} from "lucide-react";
import { useAuthStore } from "../../stores/authStore";
import { cn } from "../../lib/utils";

interface NavItem {
  to: string;
  icon: React.ElementType;
  label: string;
  badge?: number;
}

interface NavGroup {
  title: string;
  items: NavItem[];
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
    title: "Settings",
    items: [
      { to: "/notifications", icon: Bell, label: "Notifications", badge: 3 },
      { to: "/settings", icon: Settings, label: "Settings" },
    ],
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const logout = useAuthStore((s) => s.logout);
  const location = useLocation();

  const isActive = (to: string) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname.startsWith(to);
  };

  const NavContent = () => (
    <div className="flex h-full flex-col bg-card border-r">
      <div
        className={cn(
          "flex items-center border-b px-4 py-3",
          collapsed ? "justify-center" : "gap-3"
        )}
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
          B
        </div>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm truncate">BankingApp</div>
            <div className="text-xs text-muted-foreground truncate">Digital Banking</div>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto p-2">
        {NAV_GROUPS.map((group) => (
          <div key={group.title} className="mb-4">
            {!collapsed && (
              <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {group.title}
              </div>
            )}
            <div className="space-y-1">
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all relative",
                    isActive(item.to)
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground",
                    collapsed && "justify-center px-2"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.badge && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                  {collapsed && item.badge && (
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[9px] font-bold text-destructive-foreground">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t p-2">
        <button
          onClick={() => {
            logout();
            window.location.href = "/AgenticProjects/#/login";
          }}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-all",
            collapsed && "justify-center px-2"
          )}
          title={collapsed ? "Sign out" : undefined}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Sign out</span>}
        </button>
      </div>

      <div className="border-t p-2">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-3 left-3 z-50 flex h-9 w-9 items-center justify-center rounded-lg bg-card border shadow-sm lg:hidden"
      >
        {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 transition-all duration-300 ease-in-out",
          collapsed ? "w-16" : "w-60",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <NavContent />
      </aside>
    </>
  );
}
