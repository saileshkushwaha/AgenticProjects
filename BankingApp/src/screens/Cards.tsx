import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { CreditCard, Plus, Settings, Lock, Eye, EyeOff } from "lucide-react";

const CARDS = [
  { id: 1, type: "Debit", name: "Primary Debit Card", last4: "4532", first12: "4532 8910 4532", expiry: "12/27", status: "active", balance: 450000, color: "from-blue-500 to-blue-700" },
  { id: 2, type: "Credit", name: "Rewards Credit Card", last4: "8910", first12: "8910 1234 5678", expiry: "06/28", status: "active", limit: 500000, balance: 1250000, color: "from-purple-500 to-purple-700" },
];

export function Cards() {
  const [showNumbers, setShowNumbers] = useState<Record<number, boolean>>({});

  const toggleNumber = (id: number) => {
    setShowNumbers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Cards</h1>
          <p className="text-muted-foreground">Manage your debit and credit cards</p>
        </div>
        <Button><Plus className="mr-2 h-4 w-4" /> Request New Card</Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {CARDS.map((card) => (
          <div key={card.id} className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${card.color} p-6 text-white shadow-lg`}>
            <div className="flex items-start justify-between mb-8">
              <div className="text-sm font-medium opacity-80">{card.type} Card</div>
              <CreditCard className="h-8 w-8 opacity-80" />
            </div>
            <div className="mb-6">
              <div className="text-lg tracking-widest font-mono">
                {showNumbers[card.id] ? card.first12 + " " + card.last4 : "**** **** **** " + card.last4}
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-xs opacity-70">Card Holder</div>
                <div className="text-sm font-medium">DEMO USER</div>
              </div>
              <div>
                <div className="text-xs opacity-70">Expires</div>
                <div className="text-sm font-medium">{card.expiry}</div>
              </div>
              <button onClick={() => toggleNumber(card.id)} className="text-white/80 hover:text-white">
                {showNumbers[card.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle>Card Settings</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium text-sm">Freeze Card</div>
                  <div className="text-xs text-muted-foreground">Temporarily disable your card</div>
                </div>
              </div>
              <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <Settings className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium text-sm">Change PIN</div>
                  <div className="text-xs text-muted-foreground">Update your card PIN</div>
                </div>
              </div>
              <Button variant="outline" size="sm">Change</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
