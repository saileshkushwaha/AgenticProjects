import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { api } from "../services/api";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { formatCurrency, formatDate } from "../lib/utils";

export function Transfers() {
  const location = useLocation();
  const subPath = location.pathname.split("/")[2] || "new";
  const [fromAccountId, setFromAccountId] = useState("");
  const [toAccountId, setToAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const queryClient = useQueryClient();

  const { data: accountsData } = useQuery({ queryKey: ["accounts"], queryFn: api.listAccounts });
  const { data: transfersData } = useQuery({ queryKey: ["transfers"], queryFn: api.listTransfers });
  const accounts = accountsData?.accounts || [];
  const allTransfers = transfersData?.transfers || [];

  const transferMutation = useMutation({
    mutationFn: () =>
      api.createTransfer({
        fromAccountId,
        toAccountId: toAccountId || undefined,
        amount: parseFloat(amount),
        transferType: subPath === "send" ? "external" : "internal",
        reference: reference || undefined,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["transfers"] });
      setAmount("");
      setReference("");
      setFromAccountId("");
      setToAccountId("");
    },
  });

  const filteredTransfers = (() => {
    switch (subPath) {
      case "send":
        return allTransfers.filter((t) => t.transferType === "external" || t.transferType === "ach");
      case "receive":
        return allTransfers.filter((t) => t.toAccountId !== null && t.toAccountId !== undefined);
      case "scheduled":
        return allTransfers.filter((t) => t.status === "pending");
      default:
        return allTransfers;
    }
  })();

  const title = (() => {
    switch (subPath) {
      case "send":
        return "Sent Transfers";
      case "receive":
        return "Received Transfers";
      case "scheduled":
        return "Scheduled Transfers";
      default:
        return "Transfer History";
    }
  })();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Transfers</h1>
        <p className="text-muted-foreground">Move money between accounts</p>
      </div>

      {subPath === "new" && (
        <Card>
          <CardHeader><CardTitle>New Transfer</CardTitle></CardHeader>
          <CardContent>
            <div className="grid gap-4 max-w-md">
              <div className="space-y-2">
                <Label>From Account</Label>
                <select className="flex h-9 w-full rounded-md border px-3" value={fromAccountId} onChange={(e) => setFromAccountId(e.target.value)}>
                  <option value="">Select account</option>
                  {accounts.map((a) => (
                    <option key={a.id} value={a.id}>{a.name} ({formatCurrency(a.balance)})</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label>To Account</Label>
                <select className="flex h-9 w-full rounded-md border px-3" value={toAccountId} onChange={(e) => setToAccountId(e.target.value)}>
                  <option value="">Select account</option>
                  {accounts.map((a) => (
                    <option key={a.id} value={a.id}>{a.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Amount</Label>
                <Input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label>Reference (optional)</Label>
                <Input value={reference} onChange={(e) => setReference(e.target.value)} placeholder="Rent payment" />
              </div>
              <Button
                onClick={() => transferMutation.mutate()}
                disabled={!fromAccountId || !toAccountId || !amount || transferMutation.isPending}
              >
                {transferMutation.isPending ? "Processing..." : "Transfer Funds"}
              </Button>
              {transferMutation.isError && (
                <p className="text-sm text-destructive">{transferMutation.error.message}</p>
              )}
              {transferMutation.isSuccess && (
                <p className="text-sm text-green-600">Transfer completed successfully!</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
        <CardContent>
          {filteredTransfers.length === 0 ? (
            <p className="text-sm text-muted-foreground">No transfers found.</p>
          ) : (
            <div className="space-y-2">
              {filteredTransfers.map((t) => (
                <div key={t.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <div className="text-sm font-medium">{t.reference || "Transfer"}</div>
                    <div className="text-xs text-muted-foreground">{formatDate(t.createdAt)}</div>
                    <span className="mt-1 inline-block rounded border px-1.5 py-0.5 text-[10px] text-muted-foreground">{t.transferType} • {t.status}</span>
                  </div>
                  <div className="font-semibold text-red-600">-{formatCurrency(t.amount)}</div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
