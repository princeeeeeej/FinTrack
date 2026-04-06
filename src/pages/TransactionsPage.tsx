import { Bell } from "lucide-react";
import useTransactionData from "@/hooks/useTransactionData";
import Header from "@/components/layout/Header";
import TransactionsSummary from "@/components/transactions/TransactionsSummary";

const TransactionsPage = () => {
  const { transactions } = useTransactionData();

  return (
    <div className="flex flex-col gap-4 h-full w-full min-w-0 p-4 md:p-0">
      <Header
        title="Transactions"
        actions={
          <button className="p-2 rounded-xl hover:bg-gray-100 cursor-pointer">
            <Bell className="h-5 w-5 text-gray-400" />
          </button>
        }
      />
      {transactions.length === 0 ? (
        <div className="p-8 rounded-2xl bg-white text-center">
          <span className="text-5xl">💳</span>
          <h2 className="text-2xl font-bold mt-4 text-gray-900">
            Transactions Page
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Transaction list coming soon...
          </p>
        </div>
      ) : (
        <TransactionsSummary />
      )}
    </div>
  );
};

export default TransactionsPage;
