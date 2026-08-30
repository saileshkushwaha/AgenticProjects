import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { api } from "../services/api";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { formatCurrency, formatDate } from "../lib/utils";

export function Transactions() {
  const location = useLocation();
  const subPath = location.pathname.split("/")[2] || "all";

  const { data } = useQuery({
    queryKey: ["transactions", subPath],
    queryFn: () => api.listTransactions({ limit: 50 }),
  });

  const allTransactions = data?.transactions || [];

  const filteredTransactions = (() => {
    switch (subPath) {
      case "pending":
        return allTransactions.filter((t) => t.type === "debit").slice(0, 5);
      case "recurring":
        return allTransactions.filter((t) => t.category === "utilities" || t.category === "entertainment");
      case "history":
      default:
        return allTransactions;
    }
  })();

  const title = (() => {
    switch (subPath) {
      case "pending":
        return "Pending Transactions";
      case "recurring":
        return "Recurring Payments";
      case "history":
        return "Transaction History";
      default:
        return "All Transactions";
    }
  })();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Transactions</h1>
        <p className="text-muted-foreground">Your transaction history</p>
      </div>

      <Card>
        <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
        <CardContent>
          {filteredTransactions.length === 0 ? (
            <p className="text-sm text-muted-foreground">No transactions found.</p>
          ) : (
            <div className="space-y-2">
              {filteredTransactions.map((t) => (
                <div key={t.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <div className="text-sm font-medium">{t.description}</div>
                    <div className="text-xs text-muted-foreground">{formatDate(t.date)}</div>
                    {t.category && (
                      <span className="mt-1 inline-block rounded border px-1.5 py-0.5 text-[10px] text-muted-foreground">{t.category}</span>
                    )}
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
