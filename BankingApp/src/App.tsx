import React from "react";
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

function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const [error, setError] = React.useState<Error | null>(null);
  if (error) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Something went wrong</h1>
        <pre>{error.message}</pre>
      </div>
    );
  }
  return <>{children}</>;
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((s) => s.token);
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}
