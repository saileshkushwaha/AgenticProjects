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

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((s) => s.token);
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <div>
      <div style={{ padding: "1rem", background: "#f0f0f0", textAlign: "center" }}>
        <strong>BankingApp Loading...</strong>
      </div>
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
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/transfers" element={<Transfers />} />
                  <Route path="/applications" element={<NewApplication />} />
                  <Route path="/applications/:id" element={<ApplicationDetail />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
