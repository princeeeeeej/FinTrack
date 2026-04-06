import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";
import ChartTooltip from "./ChartTooltip";
import type { MonthlyChartData, SavingsChartEntry } from "@/types";

interface MonthlySavingsChartProps {
  monthlyData: MonthlyChartData[];
}

const MonthlySavingsChart = ({ monthlyData }: MonthlySavingsChartProps) => {
  const chartData: SavingsChartEntry[] = monthlyData.slice(-6).map((month) => ({
    name: month.name,
    savings: month.saving,
    income: month.earning,
    expenses: month.spending,
  }));

  const avgSavings = Math.round(
    chartData.reduce((sum, m) => sum + m.savings, 0) / chartData.length
  );

  const bestMonth = chartData.reduce(
    (best, m) => (m.savings > best.savings ? m : best),
    chartData[0]
  );

  const totalSaved = chartData.reduce((sum, m) => sum + m.savings, 0);

  return (
    <div className="p-4 bg-white rounded-2xl border border-gray-200">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Monthly Savings Trend
        </h2>
        <p className="text-xs text-gray-500 mt-1">Last 6 months overview</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip content={<ChartTooltip />} />
          <Legend wrapperStyle={{ fontSize: "12px" }} />
          <Area
            type="monotone"
            dataKey="savings"
            stroke="#10b981"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#savingsGradient)"
            name="Savings"
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-100">
          <p className="text-[10px] text-emerald-600 font-medium">
            Avg Savings
          </p>
          <p className="text-sm font-bold text-emerald-700">
            ₹{avgSavings.toLocaleString("en-IN")}
          </p>
        </div>
        <div className="p-2 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-[10px] text-blue-600 font-medium">Best Month</p>
          <p className="text-sm font-bold text-blue-700">{bestMonth.name}</p>
        </div>
        <div className="p-2 bg-purple-50 rounded-lg border border-purple-100">
          <p className="text-[10px] text-purple-600 font-medium">
            Total Saved
          </p>
          <p className="text-sm font-bold text-purple-700">
            ₹{totalSaved.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MonthlySavingsChart;
