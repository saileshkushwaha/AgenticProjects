import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Wallet, ArrowLeftRight, CreditCard, User, LogOut } from "lucide-react";
import { useAuthStore } from "../../stores/authStore";
import { Button } from "../ui/button";

const NAV = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/accounts", icon: Wallet, label: "Accounts" },
  { to: "/transactions", icon: ArrowLeftRight, label: "Transactions" },
  { to: "/transfers", icon: CreditCard, label: "Transfers" },
  { to: "/applications", icon: User, label: "Open Account" },
];

export function Sidebar() {
  const logout = useAuthStore((s: any) => s.logout);
  const navigate = useNavigate();

  return (
    <aside className="flex h-screen w-60 flex-col border-r bg-card">
      <div className="flex items-center gap-2 border-b px-5 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">B</div>
        <div>
          <div className="font-semibold text-sm">BankingApp</div>
          <div className="text-xs text-muted-foreground">Digital Banking</div>
        </div>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`
            }
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t p-3">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-muted-foreground"
          onClick={() => { logout(); navigate("/login"); }}
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </div>
    </aside>
  );
}
