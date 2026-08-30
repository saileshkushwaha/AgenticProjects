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
import { Notifications } from "./screens/Notifications";
import { Settings } from "./screens/Settings";
import { Analytics } from "./screens/Analytics";
import { KycVerification } from "./screens/KycVerification";

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
                <Route path="/applications" element={<NewApplication />} />
                <Route path="/applications/:id" element={<ApplicationDetail />} />
                <Route path="/kyc" element={<KycVerification />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/reports" element={<Analytics />} />
                <Route path="/services" element={<Dashboard />} />
                <Route path="/cards" element={<Dashboard />} />
                <Route path="/loans" element={<Dashboard />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/security" element={<Settings />} />
                <Route path="/profile" element={<Settings />} />
                <Route path="/appearance" element={<Settings />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
