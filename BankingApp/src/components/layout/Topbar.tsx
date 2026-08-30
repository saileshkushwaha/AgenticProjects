import { useState } from "react";
import { Bell, Search, Moon, Sun, User, ChevronDown, LogOut, Settings } from "lucide-react";
import { useAuthStore } from "../../stores/authStore";

export function Topbar() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const user = useAuthStore((s) => s.user);

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-card px-4">
      <div className="relative flex-1 max-w-lg">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          placeholder="Search transactions, accounts, contacts..."
          className="h-9 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-muted transition-colors"
          title={darkMode ? "Light mode" : "Dark mode"}
        >
          {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg hover:bg-muted transition-colors">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-destructive" />
        </button>

        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-muted transition-colors"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
              {user?.fullName?.split(" ").map((n) => n[0]).join("").slice(0, 2) || "U"}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-sm font-medium leading-none">{user?.fullName || "User"}</div>
              <div className="text-xs text-muted-foreground capitalize">{user?.role || "customer"}</div>
            </div>
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </button>

          {showUserMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
              <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-lg border bg-card p-1 shadow-lg">
                <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted">
                  <User className="h-4 w-4" />
                  Profile
                </button>
                <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted">
                  <Settings className="h-4 w-4" />
                  Settings
                </button>
                <div className="my-1 border-t" />
                <button
                  onClick={() => {
                    useAuthStore.getState().logout();
                    window.location.href = "/AgenticProjects/#/login";
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive hover:bg-muted"
                >
                  <LogOut className="h-4 w-4" />
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
