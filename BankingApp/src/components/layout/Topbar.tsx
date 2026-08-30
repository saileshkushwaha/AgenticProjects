import { useState } from "react";
import { Bell, Search, Moon, Sun, User, ChevronDown, LogOut, Settings, Menu } from "lucide-react";
import { useAuthStore } from "../../stores/authStore";

interface TopbarProps {
  onToggleNav: () => void;
  navOpen: boolean;
}

export function Topbar({ onToggleNav, navOpen }: TopbarProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const user = useAuthStore((s) => s.user);

  return (
    <header className="flex h-12 items-center gap-3 border-b bg-card px-4">
      <button
        onClick={onToggleNav}
        className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted transition-colors"
        title={navOpen ? "Collapse navigation" : "Expand navigation"}
      >
        <Menu className="h-4 w-4" />
      </button>

      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        <input
          placeholder="Search transactions, accounts, contacts..."
          className="h-8 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        />
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted transition-colors"
          title={darkMode ? "Light mode" : "Dark mode"}
        >
          {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        <button className="relative flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted transition-colors">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 flex h-1.5 w-1.5 rounded-full bg-destructive" />
        </button>

        <div className="relative ml-1">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-muted transition-colors"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-semibold">
              {user?.fullName?.split(" ").map((n) => n[0]).join("").slice(0, 2) || "U"}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-medium leading-none">{user?.fullName || "User"}</div>
            </div>
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </button>

          {showUserMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
              <div className="absolute right-0 top-full z-50 mt-1 w-44 rounded-lg border bg-card p-1 shadow-lg">
                <button className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-sm hover:bg-muted">
                  <User className="h-3.5 w-3.5" />
                  Profile
                </button>
                <button className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-sm hover:bg-muted">
                  <Settings className="h-3.5 w-3.5" />
                  Settings
                </button>
                <div className="my-1 border-t" />
                <button
                  onClick={() => {
                    useAuthStore.getState().logout();
                    window.location.href = "/AgenticProjects/#/login";
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-sm text-destructive hover:bg-muted"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
