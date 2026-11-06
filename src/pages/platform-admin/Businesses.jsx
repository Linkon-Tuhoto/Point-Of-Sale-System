
import { useMemo, useState } from "react";
import {
  Search,
  Building2,
  ChevronDown,
  Eye,
  X,
  MapPin,
  CalendarDays,
  Users,
  CreditCard,
  SlidersHorizontal,
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";

const navigation = [
  { label: "Overview", to: "/platform-admin", icon: Building2, end: true },
  { label: "Businesses", to: "/platform-admin/businesses", icon: Building2 },
  { label: "Users", to: "/platform-admin/users", icon: Users },
  { label: "Subscriptions", to: "/platform-admin/subscriptions", icon: CreditCard },
];

const sampleBusinesses = [
  {
    id: "BUS-001",
    name: "Fashion House",
    owner: "James Mwangi",
    email: "james@example.com",
    phone: "+254 712 345 678",
    category: "Boutique",
    plan: "Business",
    status: "Active",
    branches: 2,
    registered: "12 Oct 2026",
    location: "Nairobi, Kenya",
  },
  {
    id: "BUS-002",
    name: "Nairobi Hardware",
    owner: "Mary Wanjiku",
    email: "mary@example.com",
    phone: "+254 722 456 789",
    category: "Hardware",
    plan: "Starter",
    status: "Active",
    branches: 1,
    registered: "18 Oct 2026",
    location: "Thika, Kenya",
  },
  {
    id: "BUS-003",
    name: "Urban Restaurant",
    owner: "Peter Kamau",
    email: "peter@example.com",
    phone: "+254 733 567 890",
    category: "Restaurant",
    plan: "Premium",
    status: "Trial",
    branches: 1,
    registered: "25 Oct 2026",
    location: "Westlands, Nairobi",
  },
  {
    id: "BUS-004",
    name: "Electro World",
    owner: "Grace Njeri",
    email: "grace@example.com",
    phone: "+254 711 234 567",
    category: "Electronics",
    plan: "Business",
    status: "Expired",
    branches: 3,
    registered: "02 Sep 2026",
    location: "Nakuru, Kenya",
  },
  {
    id: "BUS-005",
    name: "Green Basket",
    owner: "David Otieno",
    email: "david@example.com",
    phone: "+254 700 123 456",
    category: "Supermarket",
    plan: "Starter",
    status: "Active",
    branches: 1,
    registered: "30 Oct 2026",
    location: "Kisumu, Kenya",
  },
];

function StatusBadge({ status }) {
  const styles = {
    Active: "bg-emerald-50 text-emerald-700",
    Trial: "bg-blue-50 text-blue-700",
    Expired: "bg-red-50 text-red-700",
    Suspended: "bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}

function Businesses() {
  const [businesses] = useState(sampleBusinesses);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");
  const [status, setStatus] = useState("All statuses");
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  const filteredBusinesses = useMemo(() => {
    return businesses.filter((business) => {
      const searchMatch = [
        business.name,
        business.owner,
        business.id,
        business.email,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const categoryMatch =
        category === "All categories" || business.category === category;

      const statusMatch =
        status === "All statuses" || business.status === status;

      return searchMatch && categoryMatch && statusMatch;
    });
  }, [businesses, search, category, status]);

  const activeCount = businesses.filter((b) => b.status === "Active").length;
  const trialCount = businesses.filter((b) => b.status === "Trial").length;
  const expiredCount = businesses.filter((b) => b.status === "Expired").length;

  return (
    <DashboardLayout
      title="Businesses"
      subtitle="View and manage businesses registered on your platform."
      navigation={navigation}
      accountName="Platform Admin"
      accountRole="System administrator"
    >
      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total businesses", value: businesses.length },
          { label: "Active businesses", value: activeCount },
          { label: "On free trial", value: trialCount },
          { label: "Expired subscriptions", value: expiredCount },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="mt-2 text-2xl font-semibold text-[#172B4D]">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Business table */}
      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-semibold text-[#172B4D]">
                Registered businesses
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                A list of businesses using your platform.
              </p>
            </div>

            <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs text-slate-600">
              {filteredBusinesses.length} results
            </span>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-[1fr_190px_180px]">
            <div className="flex items-center gap-3 rounded-lg border border-slate-300 px-3 py-2.5">
              <Search size={18} className="text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search business, owner or ID..."
                className="w-full text-sm outline-none"
              />
            </div>

            <div className="relative">
              <SlidersHorizontal
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full appearance-none rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-8 text-sm text-slate-600 outline-none focus:border-[#355C7D]"
              >
                <option>All categories</option>
                <option>Boutique</option>
                <option>Hardware</option>
                <option>Restaurant</option>
                <option>Electronics</option>
                <option>Supermarket</option>
              </select>
              <ChevronDown
                size={15}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>

            <div className="relative">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-3 py-2.5 pr-8 text-sm text-slate-600 outline-none focus:border-[#355C7D]"
              >
                <option>All statuses</option>
                <option>Active</option>
                <option>Trial</option>
                <option>Expired</option>
                <option>Suspended</option>
              </select>
              <ChevronDown
                size={15}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-4 font-medium">Business</th>
                <th className="px-5 py-4 font-medium">Owner</th>
                <th className="px-5 py-4 font-medium">Category</th>
                <th className="px-5 py-4 font-medium">Plan</th>
                <th className="px-5 py-4 font-medium">Branches</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 text-right font-medium">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredBusinesses.map((business) => (
                <tr key={business.id} className="hover:bg-slate-50/70">
                  <td className="px-5 py-4">
                    <p className="font-medium text-[#172B4D]">
                      {business.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {business.id}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-slate-700">{business.owner}</p>
                    <p className="mt-1 text-xs text-slate-400">
                      {business.email}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-slate-600">
                    {business.category}
                  </td>
                  <td className="px-5 py-4 text-slate-600">
                    {business.plan}
                  </td>
                  <td className="px-5 py-4 text-slate-600">
                    {business.branches}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={business.status} />
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => setSelectedBusiness(business)}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-[#355C7D] hover:bg-slate-50"
                    >
                      <Eye size={15} />
                      View
                    </button>
                  </td>
                </tr>
              ))}

              {filteredBusinesses.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="px-5 py-12 text-center text-sm text-slate-500"
                  >
                    No businesses match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Business details modal */}
      {selectedBusiness && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4"
          onClick={() => setSelectedBusiness(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="business-details-title"
            className="w-full max-w-lg rounded-2xl bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <div>
                <p className="text-xs text-slate-500">
                  BUSINESS DETAILS · {selectedBusiness.id}
                </p>
                <h3
                  id="business-details-title"
                  className="mt-1 text-lg font-semibold text-[#172B4D]"
                >
                  {selectedBusiness.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedBusiness(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                aria-label="Close details"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">
                  Subscription status
                </span>
                <StatusBadge status={selectedBusiness.status} />
              </div>

              {[
                ["Owner", selectedBusiness.owner, Users],
                ["Email", selectedBusiness.email, Building2],
                ["Phone", selectedBusiness.phone, Building2],
                ["Business type", selectedBusiness.category, Building2],
                ["Subscription plan", selectedBusiness.plan, CreditCard],
                ["Branches", selectedBusiness.branches, Building2],
                ["Location", selectedBusiness.location, MapPin],
                ["Registered", selectedBusiness.registered, CalendarDays],
              ].map(([label, value, Icon]) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3"
                >
                  <span className="flex items-center gap-2 text-sm text-slate-500">
                    <Icon size={16} />
                    {label}
                  </span>
                  <span className="text-right text-sm font-medium text-slate-700">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 p-5">
              <button
                onClick={() => setSelectedBusiness(null)}
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>
              <button
                onClick={() => alert("Business management actions will be connected later.")}
                className="rounded-lg bg-[#172B4D] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#243D62]"
              >
                Manage business
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default Businesses;
