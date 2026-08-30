import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { Card, CardContent } from "../components/ui/card";
import { Bell, CheckCircle, AlertCircle, Info, Clock } from "lucide-react";

export function Notifications() {
  const { data } = useQuery({
    queryKey: ["notifications"],
    queryFn: api.listNotifications,
  });

  const notifications = data?.notifications || [];

  const getIcon = (type: string) => {
    switch (type) {
      case "success": return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "warning": return <AlertCircle className="h-5 w-5 text-amber-600" />;
      case "info": return <Info className="h-5 w-5 text-blue-600" />;
      default: return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with your account activity</p>
        </div>
        <span className="text-sm text-muted-foreground">{notifications.filter((n) => !n.read).length} unread</span>
      </div>

      <Card>
        <CardContent className="p-0">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">No notifications yet.</div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`flex items-start gap-4 border-b p-4 last:border-0 transition-colors hover:bg-muted/50 ${!n.read ? "bg-muted/30" : ""}`}
              >
                <div className="mt-0.5">{getIcon(n.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{n.title}</span>
                    {!n.read && <span className="flex h-2 w-2 rounded-full bg-primary" />}
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{n.message}</p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {new Date(n.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
