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

  const decideMutation = useMutation({
    mutationFn: () => api.createApplication({ firstName: "App", lastName: "User", product: "checking", consent: true }),
    onSuccess: () => setDecision("approved"),
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
            <Button onClick={() => decideMutation.mutate()} disabled={decideMutation.isPending}>
              Approve
            </Button>
            <Button variant="destructive" disabled={!reason.trim() || decideMutation.isPending}>
              Reject
            </Button>
          </div>
          {decision && <p className="text-sm text-green-600">Application approved!</p>}
        </CardContent>
      </Card>
    </div>
  );
}
