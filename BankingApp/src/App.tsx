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

function DashboardScreen() { return <Dashboard />; }
function AccountsScreen() { return <Accounts />; }
function AccountDetailScreen() { return <AccountDetail />; }
function TransactionsScreen() { return <Transactions />; }
function TransfersScreen() { return <Transfers />; }
function NewApplicationScreen() { return <NewApplication />; }
function ApplicationDetailScreen() { return <ApplicationDetail />; }
function ServicesScreen() { return <Services />; }
function AnalyticsScreen() { return <Analytics />; }
function CardsScreen() { return <Cards />; }
function LoansScreen() { return <Loans />; }
function KycVerificationScreen() { return <KycVerification />; }
function NotificationsScreen() { return <Notifications />; }
function ReportsScreen() { return <Reports />; }
function ProfileScreen() { return <Profile />; }
function SecurityScreen() { return <Security />; }
function AppearanceScreen() { return <Appearance />; }

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<ProtectedRoute><Layout><DashboardScreen /></Layout></ProtectedRoute>} />
      <Route path="/accounts" element={<ProtectedRoute><Layout><AccountsScreen /></Layout></ProtectedRoute>} />
      <Route path="/accounts/:id" element={<ProtectedRoute><Layout><AccountDetailScreen /></Layout></ProtectedRoute>} />
      <Route path="/accounts/checking" element={<ProtectedRoute><Layout><AccountsScreen /></Layout></ProtectedRoute>} />
      <Route path="/accounts/savings" element={<ProtectedRoute><Layout><AccountsScreen /></Layout></ProtectedRoute>} />
      <Route path="/accounts/business" element={<ProtectedRoute><Layout><AccountsScreen /></Layout></ProtectedRoute>} />
      <Route path="/accounts/statements" element={<ProtectedRoute><Layout><AccountsScreen /></Layout></ProtectedRoute>} />
      <Route path="/transactions" element={<ProtectedRoute><Layout><TransactionsScreen /></Layout></ProtectedRoute>} />
      <Route path="/transactions/history" element={<ProtectedRoute><Layout><TransactionsScreen /></Layout></ProtectedRoute>} />
      <Route path="/transactions/pending" element={<ProtectedRoute><Layout><TransactionsScreen /></Layout></ProtectedRoute>} />
      <Route path="/transactions/recurring" element={<ProtectedRoute><Layout><TransactionsScreen /></Layout></ProtectedRoute>} />
      <Route path="/transfers" element={<ProtectedRoute><Layout><TransfersScreen /></Layout></ProtectedRoute>} />
      <Route path="/transfers/send" element={<ProtectedRoute><Layout><TransfersScreen /></Layout></ProtectedRoute>} />
      <Route path="/transfers/receive" element={<ProtectedRoute><Layout><TransfersScreen /></Layout></ProtectedRoute>} />
      <Route path="/transfers/scheduled" element={<ProtectedRoute><Layout><TransfersScreen /></Layout></ProtectedRoute>} />
      <Route path="/services" element={<ProtectedRoute><Layout><ServicesScreen /></Layout></ProtectedRoute>} />
      <Route path="/applications" element={<ProtectedRoute><Layout><NewApplicationScreen /></Layout></ProtectedRoute>} />
      <Route path="/applications/:id" element={<ProtectedRoute><Layout><ApplicationDetailScreen /></Layout></ProtectedRoute>} />
      <Route path="/kyc" element={<ProtectedRoute><Layout><KycVerificationScreen /></Layout></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute><Layout><AnalyticsScreen /></Layout></ProtectedRoute>} />
      <Route path="/cards" element={<ProtectedRoute><Layout><CardsScreen /></Layout></ProtectedRoute>} />
      <Route path="/loans" element={<ProtectedRoute><Layout><LoansScreen /></Layout></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><Layout><NotificationsScreen /></Layout></ProtectedRoute>} />
      <Route path="/reports" element={<ProtectedRoute><Layout><ReportsScreen /></Layout></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Layout><AppearanceScreen /></Layout></ProtectedRoute>} />
      <Route path="/security" element={<ProtectedRoute><Layout><SecurityScreen /></Layout></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Layout><ProfileScreen /></Layout></ProtectedRoute>} />
      <Route path="/appearance" element={<ProtectedRoute><Layout><AppearanceScreen /></Layout></ProtectedRoute>} />
      <Route path="*" element={<ProtectedRoute><Layout><NotFound /></Layout></ProtectedRoute>} />
    </Routes>
  );
}
