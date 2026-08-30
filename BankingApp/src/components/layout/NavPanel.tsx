import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  CreditCard,
  User,
  Shield,
  BarChart3,
  Bell,
  Settings,
  Search,
  FileText,
  PiggyBank,
  Building2,
  History,
  Send,
  Download,
  CreditCard as CreditCardIcon,
  UserCheck,
  AlertCircle,
  Palette,
  Lock,
  LogOut,
  RefreshCw,
  Grid3X3,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { useAuthStore } from "../../stores/authStore";

interface SubItem {
  to: string;
  icon: React.ElementType;
  label: string;
  badge?: number;
}

interface MainCategory {
  id: string;
  title: string;
  basePath: string;
  items: SubItem[];
}

const CATEGORIES: MainCategory[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    basePath: "/",
    items: [
      { to: "/", icon: LayoutDashboard, label: "Overview" },
      { to: "/reports", icon: FileText, label: "Reports" },
    ],
  },
  {
    id: "accounts",
    title: "Accounts",
    basePath: "/accounts",
    items: [
      { to: "/accounts", icon: Wallet, label: "All Accounts" },
      { to: "/accounts/checking", icon: Building2, label: "Checking" },
      { to: "/accounts/savings", icon: PiggyBank, label: "Savings" },
      { to: "/accounts/business", icon: Building2, label: "Business" },
      { to: "/accounts/statements", icon: FileText, label: "Statements" },
    ],
  },
  {
    id: "transactions",
    title: "Transactions",
    basePath: "/transactions",
    items: [
      { to: "/transactions", icon: ArrowLeftRight, label: "All Transactions" },
      { to: "/transactions/history", icon: History, label: "History" },
      { to: "/transactions/pending", icon: AlertCircle, label: "Pending" },
      { to: "/transactions/recurring", icon: RefreshCw, label: "Recurring" },
    ],
  },
  {
    id: "transfers",
    title: "Transfers",
    basePath: "/transfers",
    items: [
      { to: "/transfers", icon: CreditCard, label: "New Transfer" },
      { to: "/transfers/send", icon: Send, label: "Send Money" },
      { to: "/transfers/receive", icon: Download, label: "Request Money" },
      { to: "/transfers/scheduled", icon: History, label: "Scheduled" },
    ],
  },
  {
    id: "services",
    title: "Services",
    basePath: "/services",
    items: [
      { to: "/services", icon: Grid3X3, label: "All Services" },
      { to: "/applications", icon: User, label: "Open Account" },
      { to: "/kyc", icon: Shield, label: "KYC Verification" },
      { to: "/analytics", icon: BarChart3, label: "Analytics" },
      { to: "/cards", icon: CreditCardIcon, label: "Cards" },
      { to: "/loans", icon: Building2, label: "Loans" },
    ],
  },
  {
    id: "settings",
    title: "Settings",
    basePath: "/settings",
    items: [
      { to: "/settings", icon: Settings, label: "General" },
      { to: "/notifications", icon: Bell, label: "Notifications", badge: 3 },
      { to: "/security", icon: Lock, label: "Security" },
      { to: "/profile", icon: UserCheck, label: "Profile" },
      { to: "/appearance", icon: Palette, label: "Appearance" },
    ],
  },
];

export function NavPanel() {
  const location = useLocation();
  const logout = useAuthStore((s) => s.logout);

  const isActive = (to: string) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname.startsWith(to);
  };

  const isCategoryActive = (cat: MainCategory) => {
    if (cat.basePath === "/") return location.pathname === "/";
    if (location.pathname.startsWith(cat.basePath)) return true;
    return cat.items.some((item) => isActive(item.to));
  };

  const activeCategory = CATEGORIES.find(isCategoryActive) || CATEGORIES[0];

  const currentCategory = activeCategory;

  return (
    <div className="flex h-full w-60 flex-col border-r bg-muted/30">
      <div className="flex items-center gap-2 border-b px-3 py-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Search menu..."
            className="h-8 w-full rounded-md border border-input bg-background pl-8 pr-2 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 border-b px-3 py-2">
        <h2 className="text-sm font-semibold">{currentCategory.title}</h2>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-2">
        <div className="space-y-0.5">
          {currentCategory.items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-all",
                isActive(item.to)
                  ? "bg-primary/10 text-primary font-medium shadow-sm"
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
      </nav>

      <div className="border-t p-2">
        <button
          onClick={() => {
            logout();
            window.location.href = "/AgenticProjects/#/login";
          }}
          className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign out</span>
        </button>
      </div>
    </div>
  );
}
