import type { Transaction, MonthlyChartData } from "@/types";

export const calculateHealthScore = (
  monthlyIncome: number,
  savings: number,
  monthlyChartData: MonthlyChartData[],
  transactions: Transaction[]
): number => {
  let score = 50;

  if (monthlyIncome > 0) {
    const savingsRate = (savings / monthlyIncome) * 100;
    score += Math.min(savingsRate * 0.4, 40);
  }

  if (monthlyChartData.length >= 2) {
    const lastTwoMonths = monthlyChartData.slice(-2);
    const variance = Math.abs(
      lastTwoMonths[1].spending - lastTwoMonths[0].spending
    );
    const avgSpending =
      (lastTwoMonths[0].spending + lastTwoMonths[1].spending) / 2;
    if (avgSpending > 0) {
      const stability = Math.max(0, 20 - (variance / avgSpending) * 100);
      score += stability;
    }
  }

  const incomeCategories = new Set(
    transactions.filter((t) => t.type === "income").map((t) => t.category)
  );
  score += Math.min(incomeCategories.size * 3, 10);

  return Math.min(Math.round(score), 100);
};

export const generatePaginationItems = (
  page: number,
  totalPages: number
): (number | string)[] => {
  if (totalPages <= 4) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  let start = Math.min(page, totalPages - 2);
  if (start < 1) start = 1;

  const visiblePages = [start, start + 1, start + 2];
  const items: (number | string)[] = [...visiblePages];

  if (visiblePages[2] < totalPages) {
    if (visiblePages[2] < totalPages - 1) {
      items.push("...");
    }
    items.push(totalPages);
  }

  return items;
};
