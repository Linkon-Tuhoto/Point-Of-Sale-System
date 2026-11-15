import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useBusiness } from "../context/BusinessContext";

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { error, loadingBusinesses, business, branch } = useBusiness();

  return (
    <div className="min-h-screen bg-[#f5f7f8]">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="min-h-screen lg:pl-64">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="mx-auto max-w-[1600px] p-4 md:p-8">
          {loadingBusinesses && <div className="mb-4 rounded-xl bg-blue-50 px-4 py-3 text-sm text-blue-700">Loading your businesses...</div>}
          {error && <div className="mb-4 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>}
          {!loadingBusinesses && !business && <div className="mb-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">No business is available for this account yet. Create a business or check the GET /businesses API response.</div>}
          {business && !branch && <div className="mb-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">No active branch found. Select or create a branch before using branch-level operations.</div>}
          <Outlet />
        </main>
      </div>
    </div>
  );
}