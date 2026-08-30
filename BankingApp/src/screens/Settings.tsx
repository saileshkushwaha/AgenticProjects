import { useLocation } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { User, Shield, Palette, Bell, Settings as SettingsIcon } from "lucide-react";
import { Profile } from "./Profile";
import { Security } from "./Security";
import { Appearance } from "./Appearance";
import { cn } from "../lib/utils";

const TABS = [
  { id: "profile", label: "Profile", icon: User, path: "/settings/profile" },
  { id: "security", label: "Security", icon: Shield, path: "/settings/security" },
  { id: "appearance", label: "Appearance", icon: Palette, path: "/settings/appearance" },
  { id: "notifications", label: "Notifications", icon: Bell, path: "/settings/notifications", badge: 3 },
  { id: "general", label: "General", icon: SettingsIcon, path: "/settings" },
];

export function Settings() {
  const location = useLocation();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <div className="flex gap-2 border-b overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => (window.location.href = tab.path)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap",
              location.pathname === tab.path
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
            {tab.badge && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      <div>
        {location.pathname === "/settings/profile" && <Profile />}
        {location.pathname === "/settings/security" && <Security />}
        {location.pathname === "/settings/appearance" && <Appearance />}
        {location.pathname === "/settings/notifications" && (
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold">Notification Preferences</h3>
              {["Transaction alerts", "Security alerts", "Marketing emails", "Monthly statements", "Transfer confirmations"].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-lg border p-3">
                  <span className="text-sm">{item}</span>
                  <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300" />
                </div>
              ))}
            </CardContent>
          </Card>
        )}
        {location.pathname === "/settings" && (
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold">General Settings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <div className="text-sm font-medium">Email Notifications</div>
                    <div className="text-xs text-muted-foreground">Receive email updates</div>
                  </div>
                  <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300" />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <div className="text-sm font-medium">SMS Alerts</div>
                    <div className="text-xs text-muted-foreground">Receive text messages</div>
                  </div>
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <div className="text-sm font-medium">Paperless Statements</div>
                    <div className="text-xs text-muted-foreground">Go green with e-statements</div>
                  </div>
                  <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
