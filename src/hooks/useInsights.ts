import { useMemo } from "react";
import {
  AlertCircle, Target, Zap, Shield,
} from "lucide-react";
import { calculateHealthScore } from "@/utils/helpers";
import type { Insight, UseTransactionDataReturn } from "@/types";

const useInsights = (data: UseTransactionDataReturn): Insight[] => {
  return useMemo(() => {
    const insights: Insight[] = [];
    const {
      overviewStats,
      transactions,
      monthlyChartData,
    } = data;

    if (!transactions.length) return insights;

    const { monthlyIncome, savings } = overviewStats;

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const currentDayOfMonth = now.getDate();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const currentMonthTxns = transactions.filter((t) => {
      const d = new Date(t.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });

    const currentMonthExpenses = currentMonthTxns
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const healthScore = calculateHealthScore(
      monthlyIncome,
      savings,
      monthlyChartData,
      transactions
    );

    insights.push({
      id: "health-score",
      title: "Financial Health Score",
      description:
        healthScore >= 70
          ? "Your financial health is strong. Great balance between income, expenses, and savings."
          : healthScore >= 50
            ? "Your finances are stable, but there's room for improvement in savings."
            : "Your financial health needs attention. Focus on reducing expenses and building savings.",
      value: `${healthScore}/100`,
      type: healthScore >= 70 ? "success" : healthScore >= 50 ? "info" : "warning",
      icon: Shield,
      progress: healthScore,
      priority: 10,
      actionable:
        healthScore < 70
          ? "Aim to save at least 20% of your income"
          : undefined,
    });

    if (currentDayOfMonth > 0 && daysInMonth > 0) {
      const dailyBurnRate = currentMonthExpenses / currentDayOfMonth;
      const projectedMonthlyExpense = dailyBurnRate * daysInMonth;
      const velocityVsPrevious =
        monthlyChartData.length >= 2
          ? ((projectedMonthlyExpense -
              monthlyChartData[monthlyChartData.length - 2].spending) /
              monthlyChartData[monthlyChartData.length - 2].spending) *
            100
          : 0;

      if (Math.abs(velocityVsPrevious) > 10) {
        insights.push({
          id: "spending-velocity",
          title:
            velocityVsPrevious > 0
              ? "Accelerated Spending Detected"
              : "Spending Slowdown",
          description:
            velocityVsPrevious > 0
              ? `Your daily spending rate is ${velocityVsPrevious.toFixed(1)}% higher than last month. At this pace, you'll spend ₹${projectedMonthlyExpense.toLocaleString("en-IN")} by month-end.`
              : `You're spending ${Math.abs(velocityVsPrevious).toFixed(1)}% slower than last month. Great job controlling expenses!`,
          value: `₹${dailyBurnRate.toLocaleString("en-IN", { maximumFractionDigits: 0 })}/day`,
          type:
            velocityVsPrevious > 15
              ? "danger"
              : velocityVsPrevious > 0
                ? "warning"
                : "success",
          icon: Zap,
          trend: velocityVsPrevious > 0 ? "up" : "down",
          priority: velocityVsPrevious > 15 ? 9 : 6,
          actionable:
            velocityVsPrevious > 15
              ? "Review your recent large purchases and consider delaying non-essential spending"
              : undefined,
        });
      }
    }

    if (monthlyIncome > 0) {
      const savingsRate = (savings / monthlyIncome) * 100;

      if (savingsRate >= 30) {
        insights.push({
          id: "savings-rate-excellent",
          title: "Outstanding Savings Rate",
          description: `You're saving ${savingsRate.toFixed(0)}% of your income - well above the recommended 20%.`,
          value: `${savingsRate.toFixed(1)}%`,
          type: "success",
          icon: Target,
          progress: savingsRate,
          priority: 8,
        });
      } else if (savingsRate < 5 && savingsRate >= 0) {
        insights.push({
          id: "savings-rate-critical",
          title: "Critical: Low Savings Rate",
          description: `You're only saving ${savingsRate.toFixed(1)}% of income. Experts recommend at least 20%.`,
          value: `${savingsRate.toFixed(1)}%`,
          type: "danger",
          icon: AlertCircle,
          progress: savingsRate,
          priority: 9,
          actionable:
            "Automate savings transfers on payday before spending",
        });
      }
    }

    return insights.sort((a, b) => b.priority - a.priority);
  }, [data]);
};

export default useInsights;
