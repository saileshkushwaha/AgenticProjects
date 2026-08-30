import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  CreditCard,
  Grid3X3,
  Settings,
  Search,
  FileText,
  PiggyBank,
  Building2,
  History,
  Send,
  Download,
  User,
  Shield,
  BarChart3,
  CreditCard as CreditCardIcon,
  UserCheck,
  AlertCircle,
  Palette,
  Lock,
  LogOut,
  RefreshCw,
  Bell,
  ChevronLeft,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { useAuthStore } from "../../stores/authStore";

export interface CategoryDef {
  id: string;
  icon: React.ElementType;
  label: string;
  basePath: string;
}

export const CATEGORIES: CategoryDef[] = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard", basePath: "/" },
  { id: "accounts", icon: Wallet, label: "Accounts", basePath: "/accounts" },
  { id: "transactions", icon: ArrowLeftRight, label: "Transactions", basePath: "/transactions" },
  { id: "transfers", icon: CreditCard, label: "Transfers", basePath: "/transfers" },
  { id: "services", icon: Grid3X3, label: "Services", basePath: "/services" },
  { id: "settings", icon: Settings, label: "Settings", basePath: "/settings" },
];

export function getActiveCategory(pathname: string): string {
  if (pathname === "/" || pathname === "") return "dashboard";
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0] || "dashboard";

  // Services sub-routes
  const servicesRoutes = ["applications", "kyc", "analytics", "cards", "loans", "services"];
  if (servicesRoutes.includes(firstSegment)) {
    return "services";
  }

  // Settings sub-routes
  const settingsRoutes = ["notifications", "security", "profile", "appearance", "settings"];
  if (settingsRoutes.includes(firstSegment)) {
    return "settings";
  }

  // Dashboard sub-routes
  const dashboardRoutes = ["reports"];
  if (dashboardRoutes.includes(firstSegment)) {
    return "dashboard";
  }

  const match = CATEGORIES.find((c) => c.basePath === "/" + firstSegment);
  return match ? match.id : "dashboard";
}

interface SubItem {
  to: string;
  icon: React.ElementType;
  label: string;
  badge?: number;
}

const SUB_MENUS: Record<string, { title: string; items: SubItem[] }> = {
  dashboard: {
    title: "Dashboard",
    items: [
      { to: "/", icon: LayoutDashboard, label: "Overview" },
      { to: "/reports", icon: FileText, label: "Reports" },
    ],
  },
  accounts: {
    title: "Accounts",
    items: [
      { to: "/accounts", icon: Wallet, label: "All Accounts" },
      { to: "/accounts/checking", icon: Building2, label: "Checking" },
      { to: "/accounts/savings", icon: PiggyBank, label: "Savings" },
      { to: "/accounts/business", icon: Building2, label: "Business" },
      { to: "/accounts/statements", icon: FileText, label: "Statements" },
    ],
  },
  transactions: {
    title: "Transactions",
    items: [
      { to: "/transactions", icon: ArrowLeftRight, label: "All Transactions" },
      { to: "/transactions/history", icon: History, label: "History" },
      { to: "/transactions/pending", icon: AlertCircle, label: "Pending" },
      { to: "/transactions/recurring", icon: RefreshCw, label: "Recurring" },
    ],
  },
  transfers: {
    title: "Transfers",
    items: [
      { to: "/transfers", icon: Send, label: "New Transfer" },
      { to: "/transfers/send", icon: Send, label: "Send Money" },
      { to: "/transfers/receive", icon: Download, label: "Request Money" },
      { to: "/transfers/scheduled", icon: History, label: "Scheduled" },
    ],
  },
  services: {
    title: "Services",
    items: [
      { to: "/services", icon: Grid3X3, label: "All Services" },
      { to: "/applications", icon: User, label: "Open Account" },
      { to: "/kyc", icon: Shield, label: "KYC Verification" },
      { to: "/analytics", icon: BarChart3, label: "Analytics" },
      { to: "/cards", icon: CreditCardIcon, label: "Cards" },
      { to: "/loans", icon: Building2, label: "Loans" },
    ],
  },
  settings: {
    title: "Settings",
    items: [
      { to: "/settings", icon: Settings, label: "General" },
      { to: "/notifications", icon: Bell, label: "Notifications", badge: 3 },
      { to: "/security", icon: Lock, label: "Security" },
      { to: "/profile", icon: UserCheck, label: "Profile" },
      { to: "/appearance", icon: Palette, label: "Appearance" },
    ],
  },
};

interface SidebarProps {
  activeCategory: string;
  onToggleNav: () => void;
  navOpen: boolean;
}

export function Sidebar({ activeCategory, onToggleNav, navOpen }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);

  const menu = SUB_MENUS[activeCategory] || SUB_MENUS["dashboard"];

  const isActive = (to: string) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname === to || location.pathname.startsWith(to + "/");
  };

  return (
    <div className="flex h-full">
      {/* Icon Rail */}
      <div className="flex h-full w-14 flex-col items-center border-r bg-[#1b1b2f] py-3 gap-1">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white font-bold text-xs mb-2">
          B
        </div>
        {CATEGORIES.map((cat) => {
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => navigate(cat.basePath)}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg transition-all relative group",
                isSelected
                  ? "bg-white/20 text-white shadow-lg"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              )}
              title={cat.label}
            >
              <cat.icon className="h-4 w-4" />
              {isSelected && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-0.5 rounded-r-full bg-white" />
              )}
              <div className="absolute left-full ml-2 hidden group-hover:block z-50 rounded bg-gray-900 px-2 py-1 text-xs text-white whitespace-nowrap shadow-lg">
                {cat.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Navigation Panel */}
      {navOpen && (
        <div className="flex h-full w-56 flex-col border-r bg-card">
          <div className="flex items-center gap-2 border-b px-3 py-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search..."
                className="h-7 w-full rounded border border-input bg-background pl-7 pr-2 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <button onClick={onToggleNav} className="flex h-6 w-6 items-center justify-center rounded hover:bg-muted">
              <ChevronLeft className="h-3 w-3" />
            </button>
          </div>

          <div className="flex items-center border-b px-3 py-2">
            <h2 className="text-sm font-semibold">{menu.title}</h2>
          </div>

          <nav className="flex-1 overflow-y-auto px-2 py-2">
            <div className="space-y-0.5">
              {menu.items.map((item) => (
                <button
                  key={item.to}
                  onClick={() => navigate(item.to)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-all",
                    isActive(item.to)
                      ? "bg-primary/10 text-primary font-medium shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-3.5 w-3.5 shrink-0" />
                  <span className="flex-1 truncate text-left">{item.label}</span>
                  {item.badge && (
                    <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </nav>

          <div className="border-t p-2">
            <button
              onClick={() => {
                logout();
                window.location.hash = "#/login";
              }}
              className="flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
