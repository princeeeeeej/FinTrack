import type { LucideIcon } from "lucide-react";
import { BarChart3, LayoutDashboard, Lightbulb } from "lucide-react";

export const MONTHS: string[] = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export const STORAGE_KEYS = {
  TRANSACTIONS: "finance_transactions",
  CATEGORIES: "finance_categories",
  INITIALIZED: "finance_initialized",
} as const;

export const ITEMS_PER_PAGE = 10;

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "transactions", label: "Transactions", icon: BarChart3 },
  { id: "insights", label: "Insights", icon: Lightbulb },
];

export const CHART_COLORS = {
  EARNING: "#2563EB",
  SPENDING: "#34D399",
  SAVING: "#D1D5DB",
  EARNING_FILL: "url(#earningFill)",
  SPENDING_FILL: "url(#spendingFill)",
  SAVING_FILL: "url(#savingFill)",
} as const;

export const LEGEND_ITEMS = [
  { label: "Earning", color: "bg-blue-600" },
  { label: "Spending", color: "bg-emerald-400" },
  { label: "Saving", color: "bg-gray-300" },
] as const;
