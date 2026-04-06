import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";
import ChartTooltip from "./ChartTooltip";
import type { MonthlyChartData } from "@/types";

interface IncomeExpensesChartProps {
  monthlyData: MonthlyChartData[];
}

const IncomeExpensesChart = ({ monthlyData }: IncomeExpensesChartProps) => {
  const chartData = monthlyData.slice(-6);

  return (
    <div className="p-4 bg-white rounded-2xl border border-gray-200">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Income vs Expenses
        </h2>
        <p className="text-xs text-gray-500 mt-1">Monthly comparison</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip content={<ChartTooltip />} />
          <Legend wrapperStyle={{ fontSize: "12px" }} />
          <Bar
            dataKey="earning"
            fill="#10b981"
            radius={[8, 8, 0, 0]}
            name="Income"
          />
          <Bar
            dataKey="spending"
            fill="#ef4444"
            radius={[8, 8, 0, 0]}
            name="Expenses"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeExpensesChart;
