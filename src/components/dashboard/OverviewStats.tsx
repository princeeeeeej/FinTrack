import useTransactionData from "@/hooks/useTransactionData";
import HealthCard from "./HealthCard";
import { getGreeting } from "@/utils/formatters";

const OverviewStats = () => {
  const { overviewStats, overviewChanges, loading, error } =
    useTransactionData();

  if (loading) {
    return (
      <div className="flex flex-col p-4 w-full rounded-2xl bg-white">
        <div className="animate-pulse">
          <div className="h-8 w-64 bg-gray-200 rounded mb-2" />
          <div className="h-4 w-48 bg-gray-100 rounded mb-5" />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-28 rounded-2xl bg-gray-100" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col p-4 w-full rounded-2xl bg-white">
        <p className="text-red-500 text-sm">Failed to load data</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4 w-full rounded-2xl bg-white border border-gray-300">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl font-medium text-gray-900">
          {getGreeting()},{" "}
          <span className="text-4xl branding font-bold">Prince</span>
        </h1>
        <p className="text-[13px] text-gray-500">
          Here's overview of your financial status.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 mt-4 gap-4">
        <HealthCard
          icon="wallet.png"
          balance={overviewStats.totalBalance}
          description="Net worth across all accounts."
          total="Total Balance"
          change="12.4%"
          positive={true}
        />
        <HealthCard
          icon="income.png"
          balance={overviewStats.monthlyIncome}
          description="Income received this month."
          total="Monthly Income"
          change={overviewChanges.incomeChange}
          positive={overviewChanges.incomePositive}
        />
        <HealthCard
          icon="expenses.png"
          balance={overviewStats.monthlyExpenses}
          description="Total expenses this month."
          total="Monthly Expenses"
          change={overviewChanges.expensesChange}
          positive={overviewChanges.expensesPositive}
        />
        <HealthCard
          icon="saving.png"
          balance={overviewStats.savings}
          description="Savings contributions this month."
          total="Savings"
          change={overviewChanges.savingsChange}
          positive={overviewChanges.savingsPositive}
        />
      </div>
    </div>
  );
};

export default OverviewStats;
