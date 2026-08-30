import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./stores/authStore";
import { Layout } from "./components/layout/Layout";
import { Dashboard } from "./screens/Dashboard";
import { Accounts } from "./screens/Accounts";
import { AccountDetail } from "./screens/AccountDetail";
import { Transactions } from "./screens/Transactions";
import { Transfers } from "./screens/Transfers";
import { NewApplication } from "./screens/NewApplication";
import { ApplicationDetail } from "./screens/ApplicationDetail";
import { Login } from "./screens/Login";
import { Register } from "./screens/Register";
import { Services } from "./screens/Services";
import { Analytics } from "./screens/Analytics";
import { Cards } from "./screens/Cards";
import { Loans } from "./screens/Loans";
import { KycVerification } from "./screens/KycVerification";
import { Notifications } from "./screens/Notifications";
import { Reports } from "./screens/Reports";
import { Profile } from "./screens/Profile";
import { Security } from "./screens/Security";
import { Appearance } from "./screens/Appearance";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-muted-foreground">Page not found</p>
      <a href="#/" className="text-primary hover:underline">Go to Dashboard</a>
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((s) => s.token);
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/accounts" element={<Accounts />} />
                <Route path="/accounts/:id" element={<AccountDetail />} />
                <Route path="/accounts/checking" element={<Accounts />} />
                <Route path="/accounts/savings" element={<Accounts />} />
                <Route path="/accounts/business" element={<Accounts />} />
                <Route path="/accounts/statements" element={<Accounts />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/transactions/history" element={<Transactions />} />
                <Route path="/transactions/pending" element={<Transactions />} />
                <Route path="/transactions/recurring" element={<Transactions />} />
                <Route path="/transfers" element={<Transfers />} />
                <Route path="/transfers/send" element={<Transfers />} />
                <Route path="/transfers/receive" element={<Transfers />} />
                <Route path="/transfers/scheduled" element={<Transfers />} />
                <Route path="/services" element={<Services />} />
                <Route path="/applications" element={<NewApplication />} />
                <Route path="/applications/:id" element={<ApplicationDetail />} />
                <Route path="/kyc" element={<KycVerification />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/cards" element={<Cards />} />
                <Route path="/loans" element={<Loans />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings" element={<Appearance />} />
                <Route path="/security" element={<Security />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/appearance" element={<Appearance />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
