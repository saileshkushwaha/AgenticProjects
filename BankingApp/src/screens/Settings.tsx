import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { User, Shield, Palette, Bell, Settings as SettingsIcon } from "lucide-react";
import { Profile } from "./Profile";
import { Security } from "./Security";
import { Appearance } from "./Appearance";
import { cn } from "../lib/utils";

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "general", label: "General", icon: SettingsIcon },
];

export function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <div className="flex gap-6">
        <div className="w-48 shrink-0">
          <nav className="space-y-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                  activeTab === tab.id ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground"
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1">
          {activeTab === "profile" && <Profile />}
          {activeTab === "security" && <Security />}
          {activeTab === "appearance" && <Appearance />}
          {activeTab === "notifications" && (
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
          {activeTab === "general" && (
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
    </div>
  );
}
