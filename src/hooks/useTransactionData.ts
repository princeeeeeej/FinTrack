import { useState, useEffect, useMemo, useCallback } from "react";
import api from "@/services/api";
import { MONTHS } from "@/constants";
import type {
  Transaction,
  Category,
  MonthlyChartData,
  Summary,
  CategorySpending,
  OverviewStats,
  OverviewChanges,
  MonthMapEntry,
  UseTransactionDataReturn,
} from "@/types";

const useTransactionData = (): UseTransactionDataReturn => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      const [txns, cats] = await Promise.all([
        api.getTransactions(),
        api.getCategories(),
      ]);
      setTransactions(txns);
      setCategories(cats);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const deleteTransaction = useCallback(async (id: string): Promise<void> => {
    await api.deleteTransaction(id);
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const updateTransaction = useCallback(
    async (id: string, updates: Partial<Transaction>): Promise<void> => {
      await api.updateTransaction(id, updates);
      setTransactions((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
      );
    },
    []
  );

  const latestTransactionDate = useMemo(() => {
    if (!transactions.length) return new Date();
    const sorted = [...transactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return new Date(sorted[0].date);
  }, [transactions]);

  const monthlyChartData: MonthlyChartData[] = useMemo(() => {
    if (!transactions.length) return [];

    const monthMap: Record<number, MonthMapEntry> = {};
    MONTHS.forEach((name, index) => {
      monthMap[index] = { name, monthIndex: index, earning: 0, spending: 0 };
    });

    transactions.forEach((txn: Transaction) => {
      const monthIndex = new Date(txn.date).getMonth();
      if (txn.type === "income") {
        monthMap[monthIndex].earning += txn.amount;
      } else {
        monthMap[monthIndex].spending += txn.amount;
      }
    });

    return Object.values(monthMap)
      .sort((a, b) => a.monthIndex - b.monthIndex)
      .map(
        (entry): MonthlyChartData => ({
          name: entry.name,
          monthIndex: entry.monthIndex,
          earning: Math.round(entry.earning * 100) / 100,
          spending: Math.round(entry.spending * 100) / 100,
          saving: Math.round((entry.earning - entry.spending) * 100) / 100,
        })
      );
  }, [transactions]);

  const summary: Summary = useMemo(() => {
    const totalEarning = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalSpending = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalSaving = totalEarning - totalSpending;
    const currentMonth = latestTransactionDate.getMonth();
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;

    const currentMonthEarning = transactions
      .filter((t) => {
        const d = new Date(t.date);
        return d.getMonth() === currentMonth && t.type === "income";
      })
      .reduce((sum, t) => sum + t.amount, 0);

    const prevMonthEarning = transactions
      .filter((t) => {
        const d = new Date(t.date);
        return d.getMonth() === prevMonth && t.type === "income";
      })
      .reduce((sum, t) => sum + t.amount, 0);

    const percentChange: number =
      prevMonthEarning > 0
        ? parseFloat(
            (
              ((currentMonthEarning - prevMonthEarning) / prevMonthEarning) *
              100
            ).toFixed(1)
          )
        : 0;

    return {
      totalEarning,
      totalSpending,
      totalSaving,
      totalBalance: totalEarning - totalSpending,
      percentChange,
    };
  }, [transactions, latestTransactionDate]);

  const overviewStats: OverviewStats = useMemo(() => {
    if (!transactions.length) {
      return { totalBalance: 0, monthlyIncome: 0, monthlyExpenses: 0, savings: 0 };
    }

    const latestMonth = latestTransactionDate.getMonth();
    const latestYear = latestTransactionDate.getFullYear();

    const currentMonthTransactions = transactions.filter((t) => {
      const d = new Date(t.date);
      return d.getMonth() === latestMonth && d.getFullYear() === latestYear;
    });

    const monthlyIncome = currentMonthTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const monthlyExpenses = currentMonthTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalBalance: totalIncome - totalExpenses,
      monthlyIncome,
      monthlyExpenses,
      savings: monthlyIncome - monthlyExpenses,
    };
  }, [transactions, latestTransactionDate]);

  const overviewChanges: OverviewChanges = useMemo(() => {
    const defaultChanges: OverviewChanges = {
      incomeChange: "0.0%",
      incomePositive: true,
      expensesChange: "0.0%",
      expensesPositive: true,
      savingsChange: "0.0%",
      savingsPositive: true,
    };

    if (!transactions.length) return defaultChanges;

    const latestMonth = latestTransactionDate.getMonth();
    const latestYear = latestTransactionDate.getFullYear();
    const prevMonth = latestMonth === 0 ? 11 : latestMonth - 1;
    const prevYear = latestMonth === 0 ? latestYear - 1 : latestYear;

    const currentTxns = transactions.filter((t) => {
      const d = new Date(t.date);
      return d.getMonth() === latestMonth && d.getFullYear() === latestYear;
    });

    const prevTxns = transactions.filter((t) => {
      const d = new Date(t.date);
      return d.getMonth() === prevMonth && d.getFullYear() === prevYear;
    });

    const curIncome = currentTxns
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const curExpenses = currentTxns
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const curSavings = curIncome - curExpenses;

    const prIncome = prevTxns
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const prExpenses = prevTxns
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const prSavings = prIncome - prExpenses;

    const calcChange = (
      current: number,
      previous: number
    ): { value: string; positive: boolean } => {
      if (previous === 0 && current === 0) {
        return { value: "0.0%", positive: true };
      }
      if (previous === 0) {
        return { value: "100%", positive: current > 0 };
      }
      const pct = ((current - previous) / Math.abs(previous)) * 100;
      return { value: `${Math.abs(pct).toFixed(1)}%`, positive: pct >= 0 };
    };

    const inc = calcChange(curIncome, prIncome);
    const exp = calcChange(curExpenses, prExpenses);
    const sav = calcChange(curSavings, prSavings);

    return {
      incomeChange: inc.value,
      incomePositive: inc.positive,
      expensesChange: exp.value,
      expensesPositive: !exp.positive,
      savingsChange: sav.value,
      savingsPositive: sav.positive,
    };
  }, [transactions, latestTransactionDate]);

  const categoryData: CategorySpending[] = useMemo(() => {
    const catMap: Record<string, number> = {};

    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        if (!catMap[t.category]) catMap[t.category] = 0;
        catMap[t.category] += t.amount;
      });

    return Object.entries(catMap)
      .map(([name, value]): CategorySpending => {
        const catInfo = categories.find((c) => c.name === name);
        return {
          name,
          value: Math.round(value * 100) / 100,
          color: catInfo?.color || "#6B7280",
          icon: catInfo?.icon || "📦",
        };
      })
      .sort((a, b) => b.value - a.value);
  }, [transactions, categories]);

  return {
    transactions,
    categories,
    monthlyChartData,
    categoryData,
    summary,
    overviewStats,
    overviewChanges,
    loading,
    error,
    deleteTransaction,
    updateTransaction,
    refetch: fetchData,
  };
};

export default useTransactionData;