import { useMemo } from "react";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import useTransactionData from "@/hooks/useTransactionData";
import StatCard from "./StatCard";
import TransactionsTable from "./TransactionsTable";

const TransactionsSummary = () => {
  const {
    transactions,
    categories,
    overviewStats,
    overviewChanges,
    loading,
    error,
    deleteTransaction,
    updateTransaction,
  } = useTransactionData();

  const categoryNames = useMemo(
    () => categories.map((c) => c.name),
    [categories]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-gray-400 text-sm animate-pulse">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-red-400 text-sm">Error loading data</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full bg-white p-4 rounded-2xl border border-gray-300">
        <StatCard
          title="Total Balance"
          amount={overviewStats.totalBalance}
          change="12.4%"
          trend="up"
          icon={Wallet}
        />
        <StatCard
          title="Monthly Income"
          amount={overviewStats.monthlyIncome}
          change={overviewChanges.incomeChange}
          trend={overviewChanges.incomePositive ? "up" : "down"}
          icon={TrendingUp}
        />
        <StatCard
          title="Monthly Expenses"
          amount={overviewStats.monthlyExpenses}
          change={overviewChanges.expensesChange}
          trend={overviewChanges.expensesPositive ? "up" : "down"}
          icon={TrendingDown}
        />
      </div>
      <TransactionsTable
        transactions={transactions}
        onDelete={deleteTransaction}
        onUpdate={updateTransaction}
        categories={categoryNames}
      />
    </div>
  );
};

export default TransactionsSummary;
