import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { FileText, Download, Calendar, Filter } from "lucide-react";

const REPORTS = [
  { id: 1, name: "Monthly Statement - August 2026", type: "Statement", date: "2026-08-30", size: "245 KB" },
  { id: 2, name: "Monthly Statement - July 2026", type: "Statement", date: "2026-07-31", size: "198 KB" },
  { id: 3, name: "Transaction Summary - Q2 2026", type: "Summary", date: "2026-07-01", size: "156 KB" },
  { id: 4, name: "Annual Report - 2025", type: "Annual", date: "2026-01-15", size: "1.2 MB" },
  { id: 5, name: "Tax Document - 2025", type: "Tax", date: "2026-01-31", size: "89 KB" },
];

export function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Reports</h1>
          <p className="text-muted-foreground">Download and view your financial reports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-3.5 w-3.5" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-3.5 w-3.5" />
            Date Range
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{REPORTS.length}</div>
              <p className="text-sm text-muted-foreground">Total Reports</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{REPORTS.filter((r) => r.type === "Statement").length}</div>
              <p className="text-sm text-muted-foreground">Statements</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{REPORTS.filter((r) => r.type === "Tax").length}</div>
              <p className="text-sm text-muted-foreground">Tax Docs</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{REPORTS.filter((r) => r.type === "Annual").length}</div>
              <p className="text-sm text-muted-foreground">Annual Reports</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Available Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {REPORTS.map((report) => (
              <div key={report.id} className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{report.name}</div>
                    <div className="text-xs text-muted-foreground">{report.type} • {report.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{report.size}</span>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
