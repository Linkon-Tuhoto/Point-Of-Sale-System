import { LayoutDashboard, Building2, Users, CreditCard, Receipt, Activity, Settings, ShoppingCart, Package, Boxes, Truck, UserRound, Wallet, ChartNoAxesCombined, GitBranch, ClipboardList } from "lucide-react";
export const adminNavigation = [
  { label: "Overview", to: "/platform-admin", icon: LayoutDashboard, end: true },
  { label: "Businesses", to: "/platform-admin/businesses", icon: Building2 },
  { label: "Subscriptions", to: "/platform-admin/subscriptions", icon: CreditCard },
  { label: "Payments", to: "/platform-admin/payments", icon: Receipt },
  { label: "Users", to: "/platform-admin/users", icon: Users },
  { label: "System activity", to: "/platform-admin/activity", icon: Activity },
  { label: "Settings", to: "/platform-admin/settings", icon: Settings },
];
export const ownerNavigation = [
  { label: "Overview", to: "/owner", icon: LayoutDashboard, end: true },
  { label: "Point of Sale", to: "/owner/pos", icon: ShoppingCart },
  { label: "Products", to: "/owner/products", icon: Package },
  { label: "Inventory", to: "/owner/inventory", icon: Boxes },
  { label: "Purchases", to: "/owner/purchases", icon: Truck },
  { label: "Customers", to: "/owner/customers", icon: UserRound },
  { label: "Expenses", to: "/owner/expenses", icon: Wallet },
  { label: "Employees", to: "/owner/employees", icon: Users },
  { label: "Branches", to: "/owner/branches", icon: GitBranch },
  { label: "Reports", to: "/owner/reports", icon: ChartNoAxesCombined },
  { label: "Settings", to: "/owner/settings", icon: Settings },
];
export const cashierNavigation = [
  { label: "Point of Sale", to: "/cashier", icon: ShoppingCart, end: true },
  { label: "Sales history", to: "/cashier/history", icon: ClipboardList },
];
