import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "../services/api";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Shield, FileCheck, UserCheck, CheckCircle, Upload, AlertCircle } from "lucide-react";
import { useAuthStore } from "../stores/authStore";

export function KycVerification() {
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const user = useAuthStore((s) => s.user);
  const fullName = user?.fullName || "User";

  const documentMutation = useMutation({
    mutationFn: () => api.kycDocument("persona " + Date.now(), "id-document.pdf", fullName),
  });

  const livenessMutation = useMutation({
    mutationFn: () => api.kycLiveness("persona", fullName),
  });

  const watchlistMutation = useMutation({
    mutationFn: () => api.kycWatchlist("persona", fullName, "N/A"),
  });

  const steps = [
    { title: "Document Upload", icon: FileCheck, mutation: documentMutation },
    { title: "Liveness Check", icon: UserCheck, mutation: livenessMutation },
    { title: "Watchlist Screen", icon: Shield, mutation: watchlistMutation },
  ];

  const runAll = async () => {
    setError(null);
    for (const s of steps) {
      try {
        await s.mutation.mutateAsync();
        setStep((i) => i + 1);
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Verification step failed";
        setError(message);
        break;
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">KYC Verification</h1>
        <p className="text-muted-foreground">Complete identity verification to unlock all features</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Verification Progress</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            {steps.map((s, i) => (
              <div key={s.title} className="flex items-center">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                  i < step ? "bg-green-100 border-green-500 text-green-600" :
                  i === step ? "bg-primary/10 border-primary text-primary" :
                  "bg-muted border-muted-foreground/30 text-muted-foreground"
                }`}>
                  {i < step ? <CheckCircle className="h-5 w-5" /> : <s.icon className="h-5 w-5" />}
                </div>
                {i < steps.length - 1 && (
                  <div className={`h-0.5 w-16 lg:w-24 mx-2 ${i < step ? "bg-green-500" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {steps.map((s, i) => (
              <div key={s.title} className={`rounded-lg border p-4 ${i === step ? "border-primary bg-primary/5" : ""}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <s.icon className="h-5 w-5" />
                    <div>
                      <div className="font-medium text-sm">{s.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {i < step ? "Completed" : i === step ? "In progress" : "Pending"}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {i < step && <Badge variant="success">Done</Badge>}
                    {s.mutation.data && (
                      <span className="text-xs text-green-600">{s.mutation.data.status}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 mb-4">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}
          <div className="mt-6 flex gap-2">
            <Button onClick={runAll} disabled={step >= steps.length}>
              {step >= steps.length ? "All Checks Complete" : "Run All Checks"}
            </Button>
            <Button variant="outline" onClick={() => { setStep(0); documentMutation.reset(); livenessMutation.reset(); watchlistMutation.reset(); }}>
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Document Upload</CardTitle></CardHeader>
        <CardContent>
          <div className="rounded-lg border-2 border-dashed p-8 text-center">
            <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-2">Upload ID document (PDF, JPG, PNG)</p>
            <Button variant="outline" size="sm">Choose File</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
