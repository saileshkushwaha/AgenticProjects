import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { api } from "../services/api";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { formatCurrency } from "../lib/utils";
import { Plus, Wallet, PiggyBank, Building2, FileText, Download } from "lucide-react";

const TYPE_ICONS: Record<string, React.ElementType> = {
  checking: Wallet,
  savings: PiggyBank,
  business: Building2,
};

export function Accounts() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("checking");
  const queryClient = useQueryClient();

  const { data } = useQuery({ queryKey: ["accounts"], queryFn: api.listAccounts });
  const allAccounts = data?.accounts || [];

  const activeSubTab = location.pathname.split("/")[2] || "all";
  const filteredAccounts = activeSubTab === "all"
    ? allAccounts
    : activeSubTab === "statements"
      ? allAccounts
      : allAccounts.filter((a) => a.type === activeSubTab);

  const createMutation = useMutation({
    mutationFn: () => api.createAccount({ name, type }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      setShowForm(false);
      setName("");
      setType("checking");
    },
    onError: (err) => {
      alert(err instanceof Error ? err.message : "Failed to create account");
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Accounts</h1>
          <p className="text-muted-foreground">Manage your bank accounts</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="mr-2 h-4 w-4" /> Open Account
        </Button>
      </div>

      {activeSubTab === "statements" && (
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><FileText className="h-4 w-4" /> Account Statements</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {["August 2026", "July 2026", "June 2026", "May 2026"].map((month) => (
                <div key={month} className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{month} Statement</span>
                  </div>
                  <Button variant="ghost" size="sm"><Download className="h-3.5 w-3.5" /></Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {showForm && activeSubTab === "all" && (
        <Card>
          <CardHeader><CardTitle>Open New Account</CardTitle></CardHeader>
          <CardContent>
            <div className="grid gap-4 max-w-md">
              <div className="space-y-2">
                <Label>Account Type</Label>
                <select className="flex h-9 w-full rounded-md border px-3" value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="checking">Checking</option>
                  <option value="savings">Savings</option>
                  <option value="business">Business</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Account Name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Primary Checking" />
              </div>
              <div className="flex gap-2">
                <Button onClick={() => createMutation.mutate()} disabled={!name || createMutation.isPending}>
                  {createMutation.isPending ? "Creating..." : "Create Account"}
                </Button>
                <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeSubTab !== "statements" && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredAccounts.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8 text-center col-span-full">No {activeSubTab !== "all" ? activeSubTab : ""} accounts found.</p>
          ) : (
            filteredAccounts.map((a) => {
              const Icon = TYPE_ICONS[a.type] || Wallet;
              return (
                <Card key={a.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate(`/accounts/${a.id}`)}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-base">{a.name}</CardTitle>
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${a.type === "savings" ? "bg-blue-100" : a.type === "business" ? "bg-purple-100" : "bg-green-100"}`}>
                      <Icon className={`h-4 w-4 ${a.type === "savings" ? "text-blue-600" : a.type === "business" ? "text-purple-600" : "text-green-600"}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{formatCurrency(a.balance)}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs text-muted-foreground capitalize">{a.type}</span>
                      <span className="text-xs text-green-600">Active</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
