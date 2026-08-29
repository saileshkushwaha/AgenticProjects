import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { formatCurrency } from "../lib/utils";
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";

export function Dashboard() {
  const { data } = useQuery({ queryKey: ["accounts"], queryFn: api.listAccounts });
  const accounts = data?.accounts || [];
  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Your financial overview</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalBalance)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(425000)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatCurrency(183000)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Savings</CardTitle>
            <PiggyBank className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{formatCurrency(242000)}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Accounts</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {accounts.length === 0 ? (
              <p className="text-sm text-muted-foreground">No accounts yet. Open your first account to get started.</p>
            ) : (
              accounts.map((a) => (
                <div key={a.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <div className="font-medium text-sm">{a.name}</div>
                    <div className="text-xs text-muted-foreground capitalize">{a.type}</div>
                  </div>
                  <div className="font-semibold">{formatCurrency(a.balance)}</div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <button className="w-full rounded-lg border p-3 text-left text-sm hover:bg-muted">Transfer funds</button>
            <button className="w-full rounded-lg border p-3 text-left text-sm hover:bg-muted">Pay bills</button>
            <button className="w-full rounded-lg border p-3 text-left text-sm hover:bg-muted">Open new account</button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
