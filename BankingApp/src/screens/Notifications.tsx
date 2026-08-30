import { Card, CardContent } from "../components/ui/card";
import { Bell, CheckCircle, AlertCircle, Info, Clock } from "lucide-react";

const NOTIFICATIONS = [
  { id: 1, type: "success", title: "KYC Verified", message: "Your identity verification has been completed successfully.", time: "2 hours ago", read: false },
  { id: 2, type: "info", title: "New Feature", message: "Analytics dashboard is now available. Check your spending patterns.", time: "5 hours ago", read: false },
  { id: 3, type: "warning", title: "Payment Due", message: "Your credit card payment of $245.00 is due in 3 days.", time: "1 day ago", read: false },
  { id: 4, type: "success", title: "Transfer Completed", message: "Your transfer of $500.00 to Emergency Savings was successful.", time: "2 days ago", read: true },
  { id: 5, type: "info", title: "Account Opened", message: "Your new Business Account has been activated.", time: "3 days ago", read: true },
  { id: 6, type: "warning", title: "Unusual Activity", message: "A login was detected from a new device. Was this you?", time: "5 days ago", read: true },
];

export function Notifications() {
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
        <button className="text-sm text-primary hover:underline">Mark all as read</button>
      </div>

      <Card>
        <CardContent className="p-0">
          {NOTIFICATIONS.map((n) => (
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
                  {n.time}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
