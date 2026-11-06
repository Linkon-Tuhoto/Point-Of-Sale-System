
import {
  LayoutDashboard,
  Building2,
  Users,
  CreditCard,
  Receipt,
  Activity,
  Settings,
  ArrowUpRight,
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/common/StatCard";

const navigation = [
  { label: "Overview", to: "/platform-admin", icon: LayoutDashboard, end: true },
  { label: "Businesses", to: "/platform-admin/businesses", icon: Building2 },
  { label: "Users", to: "/platform-admin/users", icon: Users },
  { label: "Subscriptions", to: "/platform-admin/subscriptions", icon: CreditCard },
  { label: "Payments", to: "/platform-admin/payments", icon: Receipt },
  { label: "System activity", to: "/platform-admin/activity", icon: Activity },
  { label: "Settings", to: "/platform-admin/settings", icon: Settings },
];

function PlatformDashboard() {
  const businesses = [
    { name: "Fashion House", type: "Boutique", plan: "Business", status: "Active" },
    { name: "Nairobi Hardware", type: "Hardware", plan: "Starter", status: "Active" },
    { name: "Urban Restaurant", type: "Restaurant", plan: "Premium", status: "Trial" },
    { name: "Electro World", type: "Electronics", plan: "Business", status: "Active" },
  ];

  return (
    <DashboardLayout
      title="Platform overview"
      subtitle="Monitor and manage the BusinessHub platform."
      navigation={navigation}
      accountName="Platform Admin"
      accountRole="System administrator"
    >
      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Platform administration
        </p>
        <h3 className="mt-2 text-lg font-semibold text-[#172B4D]">
          Welcome to your control centre
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
          Manage business registrations, subscriptions, payments and platform
          operations from one central workspace.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Registered businesses"
          value="248"
          description="Total businesses on the platform"
          icon={Building2}
        />
        <StatCard
          title="Active subscriptions"
          value="186"
          description="Businesses with active plans"
          icon={CreditCard}
        />
        <StatCard
          title="Registered users"
          value="524"
          description="Owners and employees"
          icon={Users}
        />
        <StatCard
          title="Monthly revenue"
          value="KSh 186,000"
          description="Illustrative subscription revenue"
          icon={Receipt}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-[#172B4D]">
                Recent business registrations
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Businesses recently added to the platform
              </p>
            </div>
            <button className="text-sm font-medium text-[#355C7D]">
              View all
            </button>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="border-b border-slate-100 text-xs text-slate-500">
                <tr>
                  <th className="pb-3 font-medium">Business</th>
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 font-medium">Plan</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {businesses.map((business) => (
                  <tr key={business.name}>
                    <td className="py-4 font-medium text-slate-800">
                      {business.name}
                    </td>
                    <td className="py-4 text-slate-500">{business.type}</td>
                    <td className="py-4 text-slate-500">{business.plan}</td>
                    <td className="py-4">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                        {business.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="font-semibold text-[#172B4D]">Platform health</h3>
          <p className="mt-1 text-xs text-slate-500">
            System monitoring overview
          </p>

          <div className="mt-6 space-y-5">
            {[
              ["API availability", "Operational"],
              ["Database", "Operational"],
              ["Payment services", "Operational"],
              ["File storage", "Operational"],
            ].map(([label, status]) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-sm text-slate-600">{label}</span>
                <span className="flex items-center gap-2 text-xs font-medium text-slate-600">
                  <span className="h-2 w-2 rounded-full bg-emerald-600" />
                  {status}
                </span>
              </div>
            ))}
          </div>

          <button className="mt-7 flex w-full items-center justify-between border-t border-slate-100 pt-4 text-sm font-medium text-[#355C7D]">
            View system activity
            <ArrowUpRight size={17} />
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default PlatformDashboard;