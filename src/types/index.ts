import type React from "react";

export type UserRole = "admin" | "user";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  type: "income" | "expense";
  amount: number;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  type: "income" | "expense" | "both";
}

export interface MonthlyChartData {
  name: string;
  monthIndex: number;
  earning: number;
  spending: number;
  saving: number;
}

export interface Summary {
  totalEarning: number;
  totalSpending: number;
  totalSaving: number;
  totalBalance: number;
  percentChange: number | string;
}

export interface CategorySpending {
  name: string;
  value: number;
  color: string;
  icon: string;
}

export interface OverviewStats {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savings: number;
}

export interface OverviewChanges {
  incomeChange: string;
  incomePositive: boolean;
  expensesChange: string;
  expensesPositive: boolean;
  savingsChange: string;
  savingsPositive: boolean;
}

export type TrendType = "up" | "down";

export interface HealthCardProps {
  icon: string;
  balance: number;
  description: string;
  total: string;
  change?: string;
  positive?: boolean;
}

export interface StatCardProps {
  title: string;
  amount: number;
  change: number | string;
  trend: TrendType;
  icon: React.ElementType;
}

export interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export type InsightType = "success" | "warning" | "danger" | "info" | "neutral";

export interface Insight {
  id: string;
  title: string;
  description: string;
  value?: string;
  secondaryValue?: string;
  type: InsightType;
  icon: React.ElementType | string;
  iconColor?: string;
  progress?: number;
  trend?: "up" | "down" | "neutral";
  priority: number;
  actionable?: string;
}

export interface TooltipPayloadEntry {
  dataKey: string;
  value: number;
  color: string;
  name: string;
}

export interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
  label?: string;
}

export interface CustomActiveDotProps {
  cx?: number;
  cy?: number;
}

export interface MonthMapEntry {
  name: string;
  monthIndex: number;
  earning: number;
  spending: number;
}

export interface UseTransactionDataReturn {
  transactions: Transaction[];
  categories: Category[];
  monthlyChartData: MonthlyChartData[];
  categoryData: CategorySpending[];
  summary: Summary;
  overviewStats: OverviewStats;
  overviewChanges: OverviewChanges;
  loading: boolean;
  error: string | null;
  deleteTransaction: (id: string) => Promise<void>;
  updateTransaction: (id: string, updates: Partial<Transaction>) => Promise<void>;
  refetch: () => Promise<void>;
}

export interface HeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export interface CategoryChartEntry {
  name: string;
  amount: number;
  percentage: string;
  color: string;
}

export interface SavingsChartEntry {
  name: string;
  savings: number;
  income: number;
  expenses: number;
}