import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Building2, Car, Home, GraduationCap, Briefcase, Calculator } from "lucide-react";

const LOAN_PRODUCTS = [
  { id: "personal", title: "Personal Loan", rate: "8.5%", max: "$50,000", icon: Briefcase, color: "bg-blue-100 text-blue-600" },
  { id: "auto", title: "Auto Loan", rate: "5.9%", max: "$100,000", icon: Car, color: "bg-green-100 text-green-600" },
  { id: "home", title: "Home Loan", rate: "6.5%", max: "$1,000,000", icon: Home, color: "bg-purple-100 text-purple-600" },
  { id: "education", title: "Education Loan", rate: "4.5%", max: "$200,000", icon: GraduationCap, color: "bg-amber-100 text-amber-600" },
];

export function Loans() {
  const [showCalculator, setShowCalculator] = useState(false);
  const [loanAmount, setLoanAmount] = useState("10000");
  const [loanTerm, setLoanTerm] = useState("12");

  const monthlyPayment = (() => {
    const principal = parseFloat(loanAmount) || 0;
    const rate = 0.085 / 12;
    const n = parseInt(loanTerm) || 1;
    if (principal === 0 || n === 0) return 0;
    return (principal * rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);
  })();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Loans</h1>
          <p className="text-muted-foreground">Apply for a loan or calculate payments</p>
        </div>
        <Button onClick={() => setShowCalculator(!showCalculator)}>
          <Calculator className="mr-2 h-4 w-4" /> Loan Calculator
        </Button>
      </div>

      {showCalculator && (
        <Card>
          <CardHeader><CardTitle>Loan Calculator</CardTitle></CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label>Loan Amount ($)</Label>
                <Input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Term (months)</Label>
                <Input type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Monthly Payment</Label>
                <div className="flex h-9 items-center rounded-md border px-3 text-sm font-medium bg-muted">
                  ${monthlyPayment.toFixed(2)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {LOAN_PRODUCTS.map((loan) => (
          <Card key={loan.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${loan.color}`}>
                  <loan.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold mb-1">{loan.title}</div>
                  <div className="text-sm text-muted-foreground">From {loan.rate} APR • Up to {loan.max}</div>
                </div>
              </div>
              <Button className="w-full mt-4" variant="outline">Apply Now</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
