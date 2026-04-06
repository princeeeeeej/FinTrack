import React, { useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import useTransactionData from "@/hooks/useTransactionData";
import { formatYAxis } from "@/utils/formatters";
import { LEGEND_ITEMS } from "@/constants";
import type { MonthlyChartData, CustomTooltipProps, CustomActiveDotProps } from "@/types";

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  const earning = payload.find((p) => p.dataKey === "earning")?.value || 0;
  const spending = payload.find((p) => p.dataKey === "spending")?.value || 0;
  const saving = payload.find((p) => p.dataKey === "saving")?.value || 0;

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="px-3 py-1.5 rounded-lg text-white text-[12px] font-semibold"
        style={{ background: "#2563EB", boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)" }}
      >
        ₹{earning.toLocaleString()}
      </div>
      <div
        style={{
          width: 0, height: 0,
          borderLeft: "5px solid transparent",
          borderRight: "5px solid transparent",
          borderTop: "5px solid #2563EB",
        }}
      />
      <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-2 mt-1 min-w-[130px]">
        <p className="text-[10px] font-semibold text-gray-500 text-center mb-1.5">
          {label}
        </p>
        {[
          { key: "Earning", value: earning, color: "bg-blue-600" },
          { key: "Spending", value: spending, color: "bg-emerald-400" },
          { key: "Saving", value: saving, color: "bg-gray-300" },
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between gap-3 mb-1 last:mb-0">
            <div className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${item.color}`} />
              <span className="text-[10px] text-gray-400">{item.key}</span>
            </div>
            <span
              className={`text-[10px] font-bold ${
                item.key === "Saving" && item.value < 0 ? "text-red-500" : "text-gray-800"
              }`}
            >
              ₹{item.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const CustomActiveDot: React.FC<CustomActiveDotProps> = ({ cx, cy }) => {
  if (cx === undefined || cy === undefined) return null;

  return (
    <g>
      <line
        x1={cx} y1={cy + 10} x2={cx} y2={cy + 100}
        stroke="#2563EB" strokeWidth={1} strokeDasharray="3 3" opacity={0.25}
      />
      <circle cx={cx} cy={cy} r={8} fill="#2563EB" opacity={0.1} />
      <circle cx={cx} cy={cy} r={4.5} fill="#2563EB" stroke="#FFFFFF" strokeWidth={2} />
    </g>
  );
};

const ChartSkeleton: React.FC = () => (
  <div className="animate-pulse">
    <div className="flex flex-col sm:flex-row justify-between gap-3 mb-4">
      <div>
        <div className="h-4 w-36 bg-gray-200 rounded mb-2" />
        <div className="h-7 w-44 bg-gray-200 rounded" />
      </div>
      <div className="flex flex-col items-end gap-2">
        <div className="h-7 w-40 bg-gray-200 rounded-full" />
        <div className="h-4 w-40 bg-gray-200 rounded" />
      </div>
    </div>
    <div className="h-[200px] sm:h-[250px] bg-gray-100 rounded-xl" />
  </div>
);

const TransactionsChart: React.FC = () => {
  const [activeView, setActiveView] = useState<"monthly" | "yearly">("monthly");
  const { monthlyChartData, summary, loading, error } = useTransactionData();

  const yearlyChartData: MonthlyChartData[] = [
    {
      name: "2025",
      monthIndex: 0,
      earning: summary.totalEarning,
      spending: summary.totalSpending,
      saving: summary.totalSaving,
    },
  ];

  const chartData = activeView === "monthly" ? monthlyChartData : yearlyChartData;
  const percentValue: number =
    typeof summary.percentChange === "string"
      ? parseFloat(summary.percentChange)
      : summary.percentChange;

  if (loading) {
    return (
      <div className="flex flex-col gap-4 p-4 w-full rounded-2xl bg-white">
        <ChartSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 p-8 rounded-2xl bg-white">
        <span className="text-3xl">⚠️</span>
        <p className="text-gray-500 text-sm">Failed to load data</p>
      </div>
    );
  }

  if (!monthlyChartData.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 p-8 rounded-2xl bg-white">
        <span className="text-3xl">📊</span>
        <p className="text-gray-500 text-sm">No data available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4 w-full min-w-0 rounded-2xl bg-white shadow-sm border border-gray-300">
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h2 className="text-[13px] sm:text-[14px] text-gray-400 font-medium">
            Transactions Overview
          </h2>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-extrabold text-[22px] sm:text-[26px] text-gray-900 tracking-tight">
              ₹
              {summary.totalBalance.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            <span
              className={`text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                percentValue >= 0
                  ? "text-emerald-600 bg-emerald-50"
                  : "text-red-600 bg-red-50"
              }`}
            >
              {percentValue >= 0 ? "↑" : "↓"} {Math.abs(percentValue)}%
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-2 items-start sm:items-end flex-shrink-0">
          <div className="flex bg-gray-100 rounded-full p-0.5">
            {(["monthly", "yearly"] as const).map((view) => (
              <button
                key={view}
                onClick={() => setActiveView(view)}
                className={`px-3 py-1 rounded-full text-[11px] sm:text-[12px] font-medium transition-all duration-300 cursor-pointer capitalize ${
                  activeView === view
                    ? "bg-gray-900 text-white shadow-sm"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {view}
              </button>
            ))}
          </div>
          <div className="flex gap-3 sm:gap-4">
            {LEGEND_ITEMS.map((item) => (
              <div key={item.label} className="flex gap-1.5 items-center">
                <div className={`w-2 h-2 rounded-full ${item.color}`} />
                <p className="text-[10px] sm:text-[11px] text-gray-400 font-medium">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full min-w-0 h-[200px] sm:h-[250px] md:h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="earningFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity={0.12} />
                <stop offset="100%" stopColor="#2563EB" stopOpacity={0.01} />
              </linearGradient>
              <linearGradient id="spendingFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34D399" stopOpacity={0.1} />
                <stop offset="100%" stopColor="#34D399" stopOpacity={0.01} />
              </linearGradient>
              <linearGradient id="savingFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9CA3AF" stopOpacity={0.06} />
                <stop offset="100%" stopColor="#9CA3AF" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name" axisLine={false} tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 11, fontWeight: 500 }}
              dy={8} interval="preserveStartEnd"
            />
            <YAxis
              axisLine={false} tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 11 }}
              tickFormatter={formatYAxis} width={45}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Area type="monotone" dataKey="saving" stroke="#D1D5DB" strokeWidth={2} fill="url(#savingFill)" dot={false} activeDot={false} />
            <Area type="monotone" dataKey="spending" stroke="#34D399" strokeWidth={2} fill="url(#spendingFill)" dot={false} activeDot={false} />
            <Area type="monotone" dataKey="earning" stroke="#2563EB" strokeWidth={2.5} fill="url(#earningFill)" dot={false} activeDot={<CustomActiveDot />} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TransactionsChart;
