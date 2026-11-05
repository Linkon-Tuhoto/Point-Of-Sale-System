
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import CashierPOS from "./pages/cashier/CashierPOS";
import PlatformDashboard from "./pages/platform-admin/PlatformDashboard";

function App() {
  return (
    <Routes>
      {/* Authentication */}
      <Route path="/login" element={<Login />} />

      {/* Business Owner */}
      <Route path="/owner" element={<OwnerDashboard />} />

      {/* Cashier */}
      <Route path="/cashier" element={<CashierPOS />} />

      {/* Platform Administrator */}
      <Route
        path="/platform-admin"
        element={<PlatformDashboard />}
      />

      {/* Default route */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Unknown routes */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
