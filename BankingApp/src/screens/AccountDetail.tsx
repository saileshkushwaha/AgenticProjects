import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type Transaction } from "../services/api";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { formatCurrency, formatDate } from "../lib/utils";
import { Plus, Send } from "lucide-react";

export function AccountDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [depositAmount, setDepositAmount] = useState("");
  const [showDeposit, setShowDeposit] = useState(false);

  const { data } = useQuery({
    queryKey: ["account", id],
    queryFn: () => api.getAccount(id!),
    enabled: !!id,
  });

  const depositMutation = useMutation({
    mutationFn: () => api.deposit(id!, parseFloat(depositAmount)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account", id] });
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      setDepositAmount("");
      setShowDeposit(false);
    },
  });

  if (!data) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <button onClick={() => navigate("/accounts")} className="text-sm text-muted-foreground hover:text-foreground mb-1">← Back to Accounts</button>
          <h1 className="text-2xl font-bold">{data.name}</h1>
          <p className="text-muted-foreground capitalize">{data.type} account • {data.currency}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate(`/transfers?from=${id}`)}>
            <Send className="mr-2 h-4 w-4" /> Transfer
          </Button>
          <Button onClick={() => setShowDeposit(!showDeposit)}>
            <Plus className="mr-2 h-4 w-4" /> Deposit
          </Button>
        </div>
      </div>

      {showDeposit && (
        <Card>
          <CardHeader><CardTitle>Deposit Funds</CardTitle></CardHeader>
          <CardContent>
            <div className="flex gap-3 max-w-sm">
              <Input type="number" step="0.01" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} placeholder="0.00" />
              <Button onClick={() => depositMutation.mutate()} disabled={!depositAmount || depositMutation.isPending}>
                {depositMutation.isPending ? "Processing..." : "Deposit"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{formatCurrency(data.balance)}</div>
            <p className="text-sm text-muted-foreground mt-1">Available Balance</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-green-600">{formatCurrency(data.balance)}</div>
            <p className="text-sm text-muted-foreground mt-1">Current Balance</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-blue-600">{formatCurrency(0)}</div>
            <p className="text-sm text-muted-foreground mt-1">Pending</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center justify-between">Recent Transactions <Badge variant="secondary">{data.transactions.length}</Badge></CardTitle></CardHeader>
        <CardContent>
          {data.transactions.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">No transactions yet.</p>
          ) : (
            <div className="space-y-2">
              {data.transactions.map((t: Transaction) => (
                <div key={t.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <div className="text-sm font-medium">{t.description}</div>
                    <div className="text-xs text-muted-foreground">{formatDate(t.date)}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold ${t.type === "credit" ? "text-green-600" : "text-red-600"}`}>
                      {t.type === "credit" ? "+" : "-"}{formatCurrency(t.amount)}
                    </span>
                    <Badge variant={t.type === "credit" ? "success" : "destructive"}>{t.type}</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
