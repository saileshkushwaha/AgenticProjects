import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { api } from "../services/api";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { useState } from "react";

export function ApplicationDetail() {
  const { id } = useParams();
  const [reason, setReason] = useState("");
  const [decision, setDecision] = useState<string | null>(null);

  const approveMutation = useMutation({
    mutationFn: () => api.createApplication({ firstName: "App", lastName: "User", product: "checking", consent: true }),
    onSuccess: () => setDecision("approved"),
  });

  const rejectMutation = useMutation({
    mutationFn: () => api.createApplication({ firstName: "App", lastName: "User", product: "checking", consent: true }),
    onSuccess: () => setDecision("rejected"),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Application Review</h1>
        <p className="text-muted-foreground">Application ID: {id}</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Applicant Details</CardTitle></CardHeader>
        <CardContent>
          <div className="rounded-lg border p-4 space-y-2">
            <div className="flex justify-between"><span className="text-sm text-muted-foreground">Applicant</span><span className="text-sm font-medium">Jane Doe</span></div>
            <div className="flex justify-between"><span className="text-sm text-muted-foreground">Product</span><span className="text-sm font-medium">Checking Account</span></div>
            <div className="flex justify-between"><span className="text-sm text-muted-foreground">Status</span><span className="text-sm font-medium">Pending Review</span></div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Decision</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Reason (required for rejection)</label>
            <Textarea value={reason} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReason(e.target.value)} placeholder="Enter reason..." />
          </div>
          <div className="flex gap-2">
            <Button onClick={() => approveMutation.mutate()} disabled={approveMutation.isPending}>
              {approveMutation.isPending ? "Processing..." : "Approve"}
            </Button>
            <Button variant="destructive" onClick={() => rejectMutation.mutate()} disabled={!reason.trim() || rejectMutation.isPending}>
              {rejectMutation.isPending ? "Processing..." : "Reject"}
            </Button>
          </div>
          {decision === "approved" && <p className="text-sm text-green-600">Application approved!</p>}
          {decision === "rejected" && <p className="text-sm text-red-600">Application rejected.</p>}
        </CardContent>
      </Card>
    </div>
  );
}
