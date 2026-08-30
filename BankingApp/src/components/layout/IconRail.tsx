import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  CreditCard,
  Grid3X3,
  Settings,
} from "lucide-react";
import { cn } from "../../lib/utils";

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
  if (pathname === "/") return "dashboard";
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0] || "dashboard";
  const match = CATEGORIES.find((c) => c.basePath === "/" + firstSegment);
  return match ? match.id : "dashboard";
}

export function IconRail({ activeCategory, onSelect }: { activeCategory: string; onSelect: (id: string) => void }) {
  const location = useLocation();
  const navigate = useNavigate();

  const computedActive = getActiveCategory(location.pathname);
  const currentActive = activeCategory || computedActive;

  return (
    <div className="flex h-full w-16 flex-col items-center border-r bg-[#1b1b2f] py-3 gap-1">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white font-bold text-sm mb-3">
        B
      </div>
      {CATEGORIES.map((cat) => {
        const isActive = currentActive === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => {
              onSelect(cat.id);
              navigate(cat.basePath);
            }}
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-lg transition-all relative group",
              isActive
                ? "bg-white/20 text-white shadow-lg"
                : "text-white/60 hover:bg-white/10 hover:text-white"
            )}
            title={cat.label}
          >
            <cat.icon className="h-5 w-5" />
            {isActive && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-7 w-1 rounded-r-full bg-white" />
            )}
            <div className="absolute left-full ml-3 hidden group-hover:block z-50 rounded-md bg-gray-900 px-3 py-1.5 text-xs text-white whitespace-nowrap shadow-lg">
              {cat.label}
            </div>
          </button>
        );
      })}
    </div>
  );
}
