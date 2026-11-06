
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Boxes,
  Truck,
  Users,
  Wallet,
  ChartNoAxesCombined,
  Settings,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Plus,
  CalendarDays,
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/common/StatCard";

const navigation = [
  { label: "Overview", to: "/owner", icon: LayoutDashboard, end: true },
  { label: "Point of Sale", to: "/owner/pos", icon: ShoppingCart },
  { label: "Products", to: "/owner/products", icon: Package },
  { label: "Inventory", to: "/owner/inventory", icon: Boxes },
  { label: "Purchases", to: "/owner/purchases", icon: Truck },
  { label: "Customers", to: "/owner/customers", icon: Users },
  { label: "Expenses", to: "/owner/expenses", icon: Wallet },
  { label: "Reports", to: "/owner/reports", icon: ChartNoAxesCombined },
  { label: "Settings", to: "/owner/settings", icon: Settings },
];

const recentSales = [
  { id: "INV-1024", customer: "John Mwangi", date: "05 Nov 2026", amount: "KSh 4,500", status: "Completed" },
  { id: "INV-1023", customer: "Mary Wanjiku", date: "05 Nov 2026", amount: "KSh 2,800", status: "Completed" },
  { id: "INV-1022", customer: "Peter Kamau", date: "05 Nov 2026", amount: "KSh 1,250", status: "Pending" },
  { id: "INV-1021", customer: "Grace Njeri", date: "04 Nov 2026", amount: "KSh 6,700", status: "Completed" },
];

function OwnerDashboard() {
  return (
    <DashboardLayout
      title="Business overview"
      subtitle="Here's what's happening with your business today."
      navigation={navigation}
      accountName="Business Owner"
      accountRole="Owner"
    >
      {/* Business selector */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4">
        <div>
          <p className="text-xs text-slate-500">CURRENT BUSINESS</p>
          <h3 className="mt-1 font-semibold text-[#172B4D]">
            My Business Store
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Main Branch · Nairobi
          </p>
        </div>

        <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
          Switch business
        </button>
      </div>

      {/* Heading and date */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-semibold text-[#172B4D]">Today's performance</h3>
          <p className="mt-1 text-xs text-slate-500">
            A quick summary of your business activity.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-600">
          <CalendarDays size={16} />
          Today
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total sales"
          value="KSh 48,500"
          description="Today's recorded sales"
          icon={ShoppingCart}
        />
        <StatCard
          title="Total orders"
          value="36"
          description="Transactions recorded today"
          icon={Package}
        />
        <StatCard
          title="Gross profit"
          value="KSh 12,400"
          description="Estimated before expenses"
          icon={ChartNoAxesCombined}
        />
        <StatCard
          title="Expenses"
          value="KSh 3,200"
          description="Expenses recorded today"
          icon={Wallet}
        />
      </div>

      {/* Main dashboard content */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Sales chart placeholder */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 xl:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-semibold text-[#172B4D]">Sales overview</h3>
              <p className="mt-1 text-xs text-slate-500">
                Sales performance over the past seven days
              </p>
            </div>

            <button className="text-slate-400 hover:text-slate-700">
              <MoreHorizontal size={21} />
            </button>
          </div>

          <div className="mt-6 flex h-52 items-end justify-around gap-3 border-b border-l border-slate-200 px-3 pb-2">
            {[45, 70, 55, 85, 62, 95, 75].map((height, index) => (
              <div
                key={index}
                className="flex h-full flex-1 flex-col justify-end"
              >
                <div
                  style={{ height: `${height}%` }}
                  className="w-full rounded-t-md bg-[#7890A8] transition hover:bg-[#355C7D]"
                />
              </div>
            ))}
          </div>

          <div className="mt-3 flex justify-around text-xs text-slate-400">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>

          <p className="mt-4 text-xs text-slate-400">
            Illustrative chart data for frontend preview.
          </p>
        </div>

        {/* Quick actions */}
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="font-semibold text-[#172B4D]">Quick actions</h3>
          <p className="mt-1 text-xs text-slate-500">
            Common business operations
          </p>

          <div className="mt-5 space-y-3">
            {[
              ["New sale", ShoppingCart],
              ["Add product", Plus],
              ["Record expense", Wallet],
              ["Add employee", Users],
            ].map(([label, Icon]) => (
              <button
                key={label}
                className="flex w-full items-center justify-between rounded-lg border border-slate-200 p-3 text-sm font-medium text-slate-700 transition hover:border-[#7890A8] hover:bg-slate-50"
              >
                <span className="flex items-center gap-3">
                  <Icon size={18} className="text-[#355C7D]" />
                  {label}
                </span>
                <ArrowUpRight size={16} className="text-slate-400" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recent sales */}
      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 p-5">
          <div>
            <h3 className="font-semibold text-[#172B4D]">Recent sales</h3>
            <p className="mt-1 text-xs text-slate-500">
              Latest transactions from your business
            </p>
          </div>
          <button className="text-sm font-medium text-[#355C7D] hover:underline">
            View all
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-4 font-medium">Invoice</th>
                <th className="px-5 py-4 font-medium">Customer</th>
                <th className="px-5 py-4 font-medium">Date</th>
                <th className="px-5 py-4 font-medium">Amount</th>
                <th className="px-5 py-4 font-medium">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {recentSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4 font-medium text-[#355C7D]">
                    {sale.id}
                  </td>
                  <td className="px-5 py-4 text-slate-700">{sale.customer}</td>
                  <td className="px-5 py-4 text-slate-500">{sale.date}</td>
                  <td className="px-5 py-4 font-medium text-slate-700">
                    {sale.amount}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        sale.status === "Completed"
                          ? "bg-slate-100 text-slate-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {sale.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default OwnerDashboard;
