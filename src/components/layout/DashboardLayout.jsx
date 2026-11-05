
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Menu,
  Bell,
  Search,
  LogOut,
} from "lucide-react";

function DashboardLayout({
  children,
  title,
  subtitle,
  navigation = [],
  accountName = "Business Owner",
  accountRole = "Owner",
}) {
  return (
    <div className="min-h-screen bg-[#F4F6F8] md:flex">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col bg-[#172B4D] text-white md:flex">
        <div className="border-b border-white/10 px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 font-bold">
              B
            </div>
            <div>
              <h1 className="font-semibold tracking-wide">BusinessHub</h1>
              <p className="text-xs text-slate-300">Management platform</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-6">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
                    isActive
                      ? "bg-white text-[#172B4D] font-semibold"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <Icon size={19} strokeWidth={1.8} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <NavLink
            to="/login"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-300 hover:bg-white/10 hover:text-white"
          >
            <LogOut size={18} />
            Sign out
          </NavLink>
        </div>
      </aside>

      {/* Main area */}
      <main className="min-w-0 flex-1">
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-8">
          <div className="flex items-center gap-3">
            <button className="text-slate-600 md:hidden" aria-label="Open menu">
              <Menu size={23} />
            </button>
            <div className="md:hidden font-semibold text-[#172B4D]">
              BusinessHub
            </div>
            <div className="hidden items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 md:flex">
              <Search size={17} className="text-slate-400" />
              <input
                placeholder="Search..."
                className="w-48 bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              aria-label="Notifications"
              className="relative text-slate-500 hover:text-[#172B4D]"
            >
              <Bell size={20} />
              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#D6A354]" />
            </button>

            <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8EDF3] text-sm font-semibold text-[#172B4D]">
                {accountName.charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-slate-800">
                  {accountName}
                </p>
                <p className="text-xs text-slate-500">{accountRole}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-8">
          <div className="mb-7">
            <h2 className="text-2xl font-semibold tracking-tight text-[#172B4D]">
              {title}
            </h2>
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          </div>

          {children}
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
