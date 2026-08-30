import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { formatCurrency } from "../lib/utils";
import { TrendingUp, TrendingDown, Wallet, PiggyBank, BarChart3, Activity } from "lucide-react";

export function Dashboard() {
  const { data } = useQuery({ queryKey: ["accounts"], queryFn: api.listAccounts });
  const accounts = data?.accounts || [];
  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);
  const totalSavings = accounts.filter((a) => a.type === "savings").reduce((sum, a) => sum + a.balance, 0);
  const totalChecking = accounts.filter((a) => a.type === "checking").reduce((sum, a) => sum + a.balance, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Your financial overview at a glance</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalBalance)}</div>
            <p className="text-xs text-muted-foreground">Across all accounts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Checking</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(totalChecking)}</div>
            <p className="text-xs text-muted-foreground">Liquid funds</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Savings</CardTitle>
            <PiggyBank className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{formatCurrency(totalSavings)}</div>
            <p className="text-xs text-muted-foreground">Growing wealth</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Savings Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {totalBalance > 0 ? Math.round((totalSavings / totalBalance) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">Of total balance</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Spending Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-center justify-center rounded-lg border-2 border-dashed text-muted-foreground">
              <div className="text-center">
                <BarChart3 className="mx-auto h-8 w-8 mb-2 opacity-50" />
                <p className="text-sm">Spending chart will appear here</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <button className="w-full rounded-lg border p-3 text-left text-sm hover:bg-muted transition-colors">
              <div className="font-medium">Transfer funds</div>
              <div className="text-xs text-muted-foreground">Move money between accounts</div>
            </button>
            <button className="w-full rounded-lg border p-3 text-left text-sm hover:bg-muted transition-colors">
              <div className="font-medium">Pay bills</div>
              <div className="text-xs text-muted-foreground">Schedule or make payments</div>
            </button>
            <button className="w-full rounded-lg border p-3 text-left text-sm hover:bg-muted transition-colors">
              <div className="font-medium">Open new account</div>
              <div className="text-xs text-muted-foreground">Start saving or investing</div>
            </button>
            <button className="w-full rounded-lg border p-3 text-left text-sm hover:bg-muted transition-colors">
              <div className="font-medium">View statements</div>
              <div className="text-xs text-muted-foreground">Download monthly statements</div>
            </button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Your Accounts</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {accounts.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">No accounts yet. Open your first account to get started.</p>
            ) : (
              accounts.map((a) => (
                <div key={a.id} className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors">
                  <div>
                    <div className="font-medium text-sm">{a.name}</div>
                    <div className="text-xs text-muted-foreground capitalize">{a.type} account</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{formatCurrency(a.balance)}</div>
                    <div className="text-xs text-green-600">Active</div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">Salary Deposit</div>
                  <div className="text-xs text-muted-foreground">Today, 9:00 AM</div>
                </div>
                <div className="font-semibold text-green-600">+$4,250.00</div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
                  <TrendingDown className="h-4 w-4 text-red-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">Rent Payment</div>
                  <div className="text-xs text-muted-foreground">Yesterday, 2:00 PM</div>
                </div>
                <div className="font-semibold text-red-600">-$1,200.00</div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <Wallet className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">Savings Transfer</div>
                  <div className="text-xs text-muted-foreground">Aug 28, 10:00 AM</div>
                </div>
                <div className="font-semibold text-blue-600">$500.00</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
