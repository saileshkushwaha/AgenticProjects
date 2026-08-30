import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

import { Button } from "../components/ui/button";
import { CreditCard, Plus, Eye, EyeOff } from "lucide-react";

export function Cards() {
  const [showNumbers, setShowNumbers] = useState<Record<number, boolean>>({});
  const { data } = useQuery({ queryKey: ["cards"], queryFn: api.listCards });
  const cards = data?.cards || [];

  const toggleNumber = (id: number) => setShowNumbers((prev) => ({ ...prev, [id]: !prev[id] }));

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
        {cards.length === 0 ? (
          <p className="text-sm text-muted-foreground py-8 text-center col-span-full">No cards found.</p>
        ) : (
          cards.map((card) => (
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
                  <div className="text-sm font-medium">{card.cardholderName}</div>
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
          ))
        )}
      </div>
    </div>
  );
}
