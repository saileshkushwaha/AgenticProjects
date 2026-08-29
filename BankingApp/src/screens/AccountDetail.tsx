import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { formatCurrency, formatDate } from "../lib/utils";

export function AccountDetail() {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["account", id],
    queryFn: () => api.getAccount(id!),
    enabled: !!id,
  });

  if (!data) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{data.name}</h1>
        <p className="text-muted-foreground capitalize">{data.type} account</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="text-4xl font-bold">{formatCurrency(data.balance)}</div>
          <p className="text-sm text-muted-foreground mt-1">Available balance</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Recent Transactions</CardTitle></CardHeader>
        <CardContent>
          {data.transactions.length === 0 ? (
            <p className="text-sm text-muted-foreground">No transactions yet.</p>
          ) : (
            <div className="space-y-2">
              {data.transactions.map((t: any) => (
                <div key={t.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <div className="text-sm font-medium">{t.description}</div>
                    <div className="text-xs text-muted-foreground">{formatDate(t.date)}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold ${t.type === "credit" ? "text-green-600" : "text-red-600"}`}>
                      {t.type === "credit" ? "+" : "-"}{formatCurrency(t.amount)}
                    </span>
                    <Badge variant="secondary">{t.type}</Badge>
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
