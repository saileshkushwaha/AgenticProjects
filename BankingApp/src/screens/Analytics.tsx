import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { formatCurrency } from "../lib/utils";
import { BarChart3, TrendingUp, PieChart, Activity } from "lucide-react";

export function Analytics() {
  const { data: overview } = useQuery({
    queryKey: ["analytics-overview"],
    queryFn: api.getAnalyticsOverview,
  });

  const { data: monthlyData } = useQuery({
    queryKey: ["analytics-monthly"],
    queryFn: api.getAnalyticsMonthly,
  });

  const { data: categoriesData } = useQuery({
    queryKey: ["analytics-categories"],
    queryFn: api.getAnalyticsCategories,
  });

  const monthly = monthlyData?.monthly || [];
  const categories = categoriesData?.categories || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Understand your spending patterns</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(overview?.totalIncome || 0)}</div>
            <p className="text-xs text-green-600">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Expenses</CardTitle>
            <BarChart3 className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(overview?.totalExpenses || 0)}</div>
            <p className="text-xs text-red-600">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Net Savings</CardTitle>
            <PieChart className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(overview?.netSavings || 0)}</div>
            <p className="text-xs text-blue-600">{overview?.savingsRate || 0}% savings rate</p>
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
            {monthly.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No data available yet.</p>
            ) : (
              <>
                <div className="h-48 flex items-end justify-between gap-2 px-4">
                  {monthly.map((d) => {
                    const maxVal = Math.max(...monthly.map((m) => Math.max(m.income, m.expenses))) || 1;
                    return (
                      <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full flex gap-0.5 items-end h-32">
                          <div className="flex-1 bg-green-500 rounded-t" style={{ height: `${(d.income / maxVal) * 100}%` }} />
                          <div className="flex-1 bg-red-400 rounded-t" style={{ height: `${(d.expenses / maxVal) * 100}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground">{d.month}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center justify-center gap-4 mt-4 text-xs">
                  <div className="flex items-center gap-1"><div className="h-3 w-3 rounded bg-green-500" /> Income</div>
                  <div className="flex items-center gap-1"><div className="h-3 w-3 rounded bg-red-400" /> Expenses</div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
          </CardHeader>
          <CardContent>
            {categories.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No spending data yet.</p>
            ) : (
              <div className="space-y-3">
                {categories.map((cat) => (
                  <div key={cat.name}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>{cat.name}</span>
                      <span className="font-medium">{formatCurrency(cat.amount)} ({cat.percent}%)</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className={`h-full rounded-full ${cat.color}`} style={{ width: `${cat.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
