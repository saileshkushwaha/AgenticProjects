import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { formatCurrency, formatDate } from "../lib/utils";

export function Transactions() {
  const { data } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => api.listTransactions({ limit: 50 }),
  });

  const transactions = data?.transactions || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Transactions</h1>
        <p className="text-muted-foreground">Your transaction history</p>
      </div>

      <Card>
        <CardHeader><CardTitle>All Transactions</CardTitle></CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <p className="text-sm text-muted-foreground">No transactions yet.</p>
          ) : (
            <div className="space-y-2">
              {transactions.map((t) => (
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
