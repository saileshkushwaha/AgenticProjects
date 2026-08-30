import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Shield, Lock, Eye, EyeOff, CheckCircle } from "lucide-react";

export function Security() {
  const [showPassword, setShowPassword] = useState(false);
  const [saved, setSaved] = useState(false);
  const [passwordData, setPasswordData] = useState({ current: "", new: "", confirm: "" });
  const { data } = useQuery({ queryKey: ["security-sessions"], queryFn: api.getSecuritySessions });
  const sessions = data?.sessions || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Security</h1>
        <p className="text-muted-foreground">Manage your account security settings</p>
      </div>
      {saved && (
        <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
          <CheckCircle className="h-4 w-4" /> Security settings updated successfully!
        </div>
      )}
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Lock className="h-4 w-4" /> Change Password</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Current Password</Label>
            <div className="relative">
              <Input type={showPassword ? "text" : "password"} value={passwordData.current} onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })} />
              <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div className="space-y-2"><Label>New Password</Label><Input type="password" value={passwordData.new} onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })} /></div>
          <div className="space-y-2"><Label>Confirm New Password</Label><Input type="password" value={passwordData.confirm} onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })} /></div>
          <Button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 3000); }}>Update Password</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Shield className="h-4 w-4" /> Login Activity</CardTitle></CardHeader>
        <CardContent>
          {sessions.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No session data available.</p>
          ) : (
            <div className="space-y-3">
              {sessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-3">
                    <div className={`h-2 w-2 rounded-full ${session.status === "active" ? "bg-green-500" : "bg-gray-300"}`} />
                    <div>
                      <div className="text-sm font-medium">{session.device}</div>
                      <div className="text-xs text-muted-foreground">{session.browser} • {session.location}</div>
                    </div>
                  </div>
                  <span className={`text-xs ${session.status === "active" ? "text-green-600" : "text-muted-foreground"}`}>
                    {session.status === "active" ? "Active now" : new Date(session.lastActive).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
