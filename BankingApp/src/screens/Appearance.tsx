import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Palette, Sun, Moon, Monitor, Check } from "lucide-react";
import { cn } from "../lib/utils";

const THEMES = [
  { id: "light", name: "Light", icon: Sun },
  { id: "dark", name: "Dark", icon: Moon },
  { id: "system", name: "System", icon: Monitor },
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
  const [saved, setSaved] = useState(false);

  useEffect(() => { applyTheme(theme); }, [theme]);

  const handleSave = () => {
    localStorage.setItem("theme", theme);
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
          <Check className="h-4 w-4" /> Appearance settings saved!
        </div>
      )}
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Palette className="h-4 w-4" /> Theme</CardTitle></CardHeader>
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
                <t.icon className="h-8 w-8" />
                <span className="text-sm font-medium">{t.name}</span>
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
      <div className="flex gap-2">
        <Button onClick={handleSave}>Save Preferences</Button>
        <Button variant="outline" onClick={() => setTheme("light")}>Reset to Default</Button>
      </div>
    </div>
  );
}
