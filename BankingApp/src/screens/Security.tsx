import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Shield, Lock, Smartphone, Key, Eye, EyeOff, CheckCircle } from "lucide-react";

export function Security() {
  const [showPassword, setShowPassword] = useState(false);
  const [saved, setSaved] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Security</h1>
        <p className="text-muted-foreground">Manage your account security settings</p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
          <CheckCircle className="h-4 w-4" />
          Security settings updated successfully!
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Change Password
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Current Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={passwordData.current}
                onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <Label>New Password</Label>
            <Input
              type="password"
              value={passwordData.new}
              onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Confirm New Password</Label>
            <Input
              type="password"
              value={passwordData.confirm}
              onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
            />
          </div>
          <Button onClick={handleSave}>Update Password</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            Two-Factor Authentication
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <Smartphone className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="font-medium text-sm">Authenticator App</div>
                <div className="text-xs text-muted-foreground">Use an authenticator app for 2FA</div>
              </div>
            </div>
            <Button variant="outline" size="sm">Enable</Button>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Key className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-sm">Security Key</div>
                <div className="text-xs text-muted-foreground">Use a physical security key</div>
              </div>
            </div>
            <Button variant="outline" size="sm">Setup</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Login Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <div>
                  <div className="text-sm font-medium">Current Session</div>
                  <div className="text-xs text-muted-foreground">Chrome on Windows • New York, US</div>
                </div>
              </div>
              <span className="text-xs text-green-600">Active now</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-gray-300" />
                <div>
                  <div className="text-sm font-medium">Mobile App</div>
                  <div className="text-xs text-muted-foreground">iPhone • New York, US</div>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">2 hours ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
