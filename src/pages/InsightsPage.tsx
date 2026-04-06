import { Bell, AlertCircle, Wallet, Loader2 } from "lucide-react";
import useTransactionData from "@/hooks/useTransactionData";
import useInsights from "@/hooks/useInsights";
import Header from "@/components/layout/Header";
import MonthlySavingsChart from "@/components/insights/MonthlySavingsChart";
import CategoryExpensesChart from "@/components/insights/CategoryExpensesChart";
import IncomeExpensesChart from "@/components/insights/IncomeExpensesChart";
import InsightCard from "@/components/insights/InsightCard";

const InsightsPage = () => {
  const transactionData = useTransactionData();
  const { loading, error, transactions, categoryData, monthlyChartData, overviewStats } =
    transactionData;
  const insights = useInsights(transactionData);

  return (
    <div className="flex flex-col gap-4 w-full min-w-0 p-4 md:p-0 pb-8">
      <Header
        title="Smart Insights"
        subtitle="AI-powered financial analysis"
        actions={
          <button className="p-2 rounded-xl hover:bg-gray-100 cursor-pointer">
            <Bell className="h-5 w-5 text-gray-400" />
          </button>
        }
      />

      {loading ? (
        <div className="flex items-center justify-center p-12 bg-white rounded-2xl w-full h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center p-8 text-center text-red-600 bg-white rounded-2xl border border-red-100">
          <AlertCircle className="mb-3 h-10 w-10 text-red-500" />
          <h2 className="text-lg font-semibold">Failed to load data</h2>
          <p className="text-sm mt-1">{error}</p>
        </div>
      ) : !transactions.length ? (
        <div className="p-12 rounded-2xl bg-white text-center border border-gray-100 flex flex-col items-center justify-center">
          <Wallet className="h-12 w-12 text-gray-300 mb-4" />
          <h2 className="text-xl font-bold text-gray-900">
            No Insights Available
          </h2>
          <p className="text-gray-500 text-sm mt-2 max-w-sm">
            Start adding transactions to unlock personalized financial insights.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <MonthlySavingsChart monthlyData={monthlyChartData} />
            <CategoryExpensesChart
              categoryData={categoryData}
              totalExpenses={overviewStats.monthlyExpenses}
            />
          </div>
          <div className="w-full">
            <IncomeExpensesChart monthlyData={monthlyChartData} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3 px-1">
              Key Insights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {insights.map((insight) => (
                <InsightCard key={insight.id} insight={insight} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default InsightsPage;