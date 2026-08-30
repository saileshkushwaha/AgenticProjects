import { Card, CardContent } from "../components/ui/card";
import { Shield, User, BarChart3, CreditCard, Building2, FileText, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SERVICES = [
  { id: "open-account", title: "Open Account", description: "Open a new checking, savings, or business account", icon: User, to: "/applications", color: "bg-blue-100 text-blue-600" },
  { id: "kyc", title: "KYC Verification", description: "Complete identity verification to unlock all features", icon: Shield, to: "/kyc", color: "bg-green-100 text-green-600" },
  { id: "analytics", title: "Analytics", description: "View your spending patterns and financial insights", icon: BarChart3, to: "/analytics", color: "bg-purple-100 text-purple-600" },
  { id: "cards", title: "Cards", description: "Manage your debit and credit cards", icon: CreditCard, to: "/cards", color: "bg-amber-100 text-amber-600" },
  { id: "loans", title: "Loans", description: "Apply for personal, auto, or home loans", icon: Building2, to: "/loans", color: "bg-pink-100 text-pink-600" },
  { id: "reports", title: "Reports", description: "Download statements and financial reports", icon: FileText, to: "/reports", color: "bg-teal-100 text-teal-600" },
];

export function Services() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Services</h1>
        <p className="text-muted-foreground">Explore our range of banking services</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => (
          <Card key={service.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate(service.to)}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${service.color}`}>
                  <service.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold mb-1">{service.title}</div>
                  <div className="text-sm text-muted-foreground">{service.description}</div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
