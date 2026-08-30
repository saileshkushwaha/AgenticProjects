import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "../services/api";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";

const STEPS = ["Personal", "Contact", "Financial", "Identity", "Review"];

export function NewApplication() {
  const [step, setStep] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [product, setProduct] = useState("checking");
  const [consent, setConsent] = useState(false);

  const mutation = useMutation({
    mutationFn: () => api.createApplication({ firstName, lastName, product, consent }),
    onError: (err) => {
      alert(err instanceof Error ? err.message : "Failed to submit application");
    },
  });

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Open Account</h1>
        <p className="text-muted-foreground">Complete the application in {STEPS.length} steps</p>
      </div>

      <div className="flex gap-2">
        {STEPS.map((s, i) => (
          <div key={s} className={`flex-1 h-2 rounded-full ${i <= step ? "bg-primary" : "bg-muted"}`} />
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle>{STEPS[step]}</CardTitle></CardHeader>
        <CardContent>
          {step === 0 && (
            <div className="grid gap-4 max-w-md">
              <div className="space-y-2">
                <Label>First Name</Label>
                <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Jane" />
              </div>
              <div className="space-y-2">
                <Label>Last Name</Label>
                <Input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Doe" />
              </div>
            </div>
          )}
          {step === 1 && (
            <div className="grid gap-4 max-w-md">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@example.com" />
              </div>
              <div className="space-y-2">
                <Label>Product</Label>
                <select className="flex h-9 w-full rounded-md border px-3" value={product} onChange={(e) => setProduct(e.target.value)}>
                  <option value="checking">Checking Account</option>
                  <option value="savings">Savings Account</option>
                  <option value="business">Business Account</option>
                </select>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="grid gap-4 max-w-md">
              <div className="space-y-2">
                <Label>Employment Status</Label>
                <select className="flex h-9 w-full rounded-md border px-3">
                  <option>Employed</option>
                  <option>Self-employed</option>
                  <option>Student</option>
                  <option>Retired</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Annual Income (USD)</Label>
                <Input type="number" placeholder="85000" />
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <div className="rounded-lg border-2 border-dashed p-8 text-center">
                <p className="text-sm text-muted-foreground">Upload ID document (PDF, JPG, PNG)</p>
                <Button variant="outline" className="mt-2">Choose File</Button>
              </div>
              <div className="flex gap-2">
                <Badge variant="success">Document: Verified</Badge>
                <Badge variant="success">Liveness: Passed</Badge>
                <Badge variant="success">Watchlist: Clear</Badge>
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="space-y-4">
              <div className="rounded-lg border p-4 space-y-2">
                <div className="flex justify-between"><span className="text-sm text-muted-foreground">Name</span><span className="text-sm font-medium">{firstName} {lastName}</span></div>
                <div className="flex justify-between"><span className="text-sm text-muted-foreground">Email</span><span className="text-sm font-medium">{email}</span></div>
                <div className="flex justify-between"><span className="text-sm text-muted-foreground">Product</span><span className="text-sm font-medium capitalize">{product}</span></div>
              </div>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                <span className="text-sm">I confirm I have read and accept the Terms & Conditions</span>
              </label>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={prev} disabled={step === 0}>Back</Button>
            {step < STEPS.length - 1 ? (
              <Button onClick={next}>Next</Button>
            ) : (
              <Button onClick={() => mutation.mutate()} disabled={!consent || mutation.isPending}>
                {mutation.isPending ? "Submitting..." : "Submit Application"}
              </Button>
            )}
          </div>
          {mutation.isSuccess && <p className="text-sm text-green-600 mt-2">Application submitted successfully!</p>}
        </CardContent>
      </Card>
    </div>
  );
}
