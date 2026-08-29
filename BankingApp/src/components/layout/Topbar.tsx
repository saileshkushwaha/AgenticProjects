import { Bell, Search } from "lucide-react";
import { Input } from "../ui/input";

export function Topbar() {
  return (
    <header className="flex h-16 items-center gap-4 border-b px-6">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search transactions, accounts..." className="pl-8" />
      </div>
      <div className="flex-1" />
      <button className="relative rounded-full p-2 hover:bg-muted">
        <Bell className="h-5 w-5 text-muted-foreground" />
      </button>
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
        JD
      </div>
    </header>
  );
}
