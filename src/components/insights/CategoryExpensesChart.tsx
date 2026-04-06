import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from "recharts";
import ChartTooltip from "./ChartTooltip";
import type { CategorySpending, CategoryChartEntry } from "@/types";

interface CategoryExpensesChartProps {
  categoryData: CategorySpending[];
  totalExpenses: number;
}

const CategoryExpensesChart = ({
  categoryData,
  totalExpenses,
}: CategoryExpensesChartProps) => {
  const chartData: CategoryChartEntry[] = categoryData
    .slice(0, 8)
    .map((cat) => ({
      name: cat.name,
      amount: cat.value,
      percentage: ((cat.value / totalExpenses) * 100).toFixed(1),
      color: cat.color,
    }));

  return (
    <div className="p-4 bg-white rounded-2xl border border-gray-200">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Category-wise Spending
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Top categories by expense amount
        </p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis type="number" tick={{ fontSize: 12 }} />
          <YAxis
            dataKey="name"
            type="category"
            width={120}
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<ChartTooltip />} />
          <Bar dataKey="amount" radius={[0, 8, 8, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {chartData.map((cat) => (
          <div key={cat.name} className="flex items-center gap-2 text-xs">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: cat.color }}
            />
            <span className="text-gray-700 flex-1 truncate">{cat.name}</span>
            <span className="font-semibold text-gray-900">
              {cat.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryExpensesChart;
