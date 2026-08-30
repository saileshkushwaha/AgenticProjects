import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useAuthStore } from "../stores/authStore";
import { User, Mail, Phone, MapPin, Calendar, Camera, CheckCircle } from "lucide-react";

export function Profile() {
  const user = useAuthStore((s) => s.user);
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: "+1 (555) 123-4567",
    dob: "1990-05-15",
    address: "123 Main Street, New York, NY 10001",
    city: "New York",
    state: "NY",
    zip: "10001",
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-muted-foreground">Manage your personal information</p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
          <CheckCircle className="h-4 w-4" />
          Profile updated successfully!
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">
                {profile.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <button className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border bg-white shadow-sm hover:bg-muted">
                <Camera className="h-3.5 w-3.5" />
              </button>
            </div>
            <div>
              <div className="font-semibold text-lg">{profile.fullName}</div>
              <div className="text-sm text-muted-foreground capitalize">{user?.role || "Customer"}</div>
              <div className="text-xs text-muted-foreground mt-1">Member since August 2026</div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input value={profile.fullName} onChange={(e) => setProfile({ ...profile, fullName: e.target.value })} className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Date of Birth</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input type="date" value={profile.dob} onChange={(e) => setProfile({ ...profile, dob: e.target.value })} className="pl-10" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Street Address</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={profile.address} onChange={(e) => setProfile({ ...profile, address: e.target.value })} className="pl-10" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label>City</Label>
              <Input value={profile.city} onChange={(e) => setProfile({ ...profile, city: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>State</Label>
              <Input value={profile.state} onChange={(e) => setProfile({ ...profile, state: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>ZIP Code</Label>
              <Input value={profile.zip} onChange={(e) => setProfile({ ...profile, zip: e.target.value })} />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button onClick={handleSave}>Save Changes</Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
