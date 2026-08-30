import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Palette, Sun, Moon, Monitor, Check } from "lucide-react";
import { cn } from "../lib/utils";

const THEMES = [
  { id: "light", name: "Light", icon: Sun, color: "bg-white border-gray-200" },
  { id: "dark", name: "Dark", icon: Moon, color: "bg-gray-900 border-gray-700" },
  { id: "system", name: "System", icon: Monitor, color: "bg-gradient-to-r from-white to-gray-900 border-gray-400" },
];

const ACCENT_COLORS = [
  { id: "blue", color: "bg-blue-500" },
  { id: "green", color: "bg-green-500" },
  { id: "purple", color: "bg-purple-500" },
  { id: "orange", color: "bg-orange-500" },
  { id: "pink", color: "bg-pink-500" },
  { id: "teal", color: "bg-teal-500" },
];

const LANGUAGES = [
  { code: "en", name: "English (US)" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
];

function applyTheme(theme: string) {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else if (theme === "light") {
    root.classList.remove("dark");
  } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDark) root.classList.add("dark");
    else root.classList.remove("dark");
  }
}

export function Appearance() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [accentColor, setAccentColor] = useState(() => localStorage.getItem("accentColor") || "blue");
  const [language, setLanguage] = useState("en");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const handleSave = () => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("accentColor", accentColor);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Appearance</h1>
        <p className="text-muted-foreground">Customize the look and feel of your app</p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
          <Check className="h-4 w-4" />
          Appearance settings saved!
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Theme
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-3">
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={cn(
                  "relative flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all",
                  theme === t.id ? "border-primary shadow-md" : "border-muted hover:border-muted-foreground"
                )}
              >
                <div className={cn("h-12 w-full rounded-md border", t.color)} />
                <div className="flex items-center gap-2">
                  <t.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{t.name}</span>
                </div>
                {theme === t.id && (
                  <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                    <Check className="h-3 w-3 text-primary-foreground" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Accent Color</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            {ACCENT_COLORS.map((c) => (
              <button
                key={c.id}
                onClick={() => setAccentColor(c.id)}
                className={cn(
                  "relative h-10 w-10 rounded-full transition-all",
                  c.color,
                  accentColor === c.id ? "ring-2 ring-offset-2 ring-primary scale-110" : "hover:scale-105"
                )}
              >
                {accentColor === c.id && (
                  <Check className="absolute inset-0 m-auto h-4 w-4 text-white" />
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Language</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label>Display Language</Label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="flex h-9 w-full max-w-xs rounded-md border border-input bg-background px-3 text-sm"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Layout</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <div className="font-medium text-sm">Compact Mode</div>
              <div className="text-xs text-muted-foreground">Reduce spacing for more content</div>
            </div>
            <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <div className="font-medium text-sm">Show Animations</div>
              <div className="text-xs text-muted-foreground">Enable smooth transitions</div>
            </div>
            <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300" />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Button onClick={handleSave}>Save Preferences</Button>
        <Button variant="outline">Reset to Default</Button>
      </div>
    </div>
  );
}
