import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { formatCurrency } from "../lib/utils";
import { BarChart3, TrendingUp, PieChart, Activity } from "lucide-react";

export function Analytics() {
  const { data } = useQuery({ queryKey: ["accounts"], queryFn: api.listAccounts });
  const accounts = data?.accounts || [];

  const monthlyData = [
    { month: "Jan", income: 4200, expenses: 2800 },
    { month: "Feb", income: 4200, expenses: 3100 },
    { month: "Mar", income: 4500, expenses: 2900 },
    { month: "Apr", income: 4200, expenses: 3200 },
    { month: "May", income: 4800, expenses: 2700 },
    { month: "Jun", income: 4200, expenses: 3000 },
  ];

  const categories = [
    { name: "Housing", amount: 1200, percent: 35, color: "bg-blue-500" },
    { name: "Food & Dining", amount: 650, percent: 19, color: "bg-green-500" },
    { name: "Transportation", amount: 420, percent: 12, color: "bg-amber-500" },
    { name: "Utilities", amount: 350, percent: 10, color: "bg-purple-500" },
    { name: "Entertainment", amount: 280, percent: 8, color: "bg-pink-500" },
    { name: "Other", amount: 540, percent: 16, color: "bg-gray-500" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Understand your spending patterns</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,250</div>
            <p className="text-xs text-green-600">+5.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Expenses</CardTitle>
            <BarChart3 className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,950</div>
            <p className="text-xs text-red-600">+2.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Net Savings</CardTitle>
            <PieChart className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,300</div>
            <p className="text-xs text-blue-600">30.6% savings rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Income vs Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-end justify-between gap-2 px-4">
              {monthlyData.map((d) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex gap-0.5 items-end h-32">
                    <div className="flex-1 bg-green-500 rounded-t" style={{ height: `${(d.income / 5000) * 100}%` }} />
                    <div className="flex-1 bg-red-400 rounded-t" style={{ height: `${(d.expenses / 5000) * 100}%` }} />
                  </div>
                  <span className="text-xs text-muted-foreground">{d.month}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-4 mt-4 text-xs">
              <div className="flex items-center gap-1"><div className="h-3 w-3 rounded bg-green-500" /> Income</div>
              <div className="flex items-center gap-1"><div className="h-3 w-3 rounded bg-red-400" /> Expenses</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categories.map((cat) => (
                <div key={cat.name}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>{cat.name}</span>
                    <span className="font-medium">{formatCurrency(cat.amount * 100)}</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className={`h-full rounded-full ${cat.color}`} style={{ width: `${cat.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
