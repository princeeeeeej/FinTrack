import type { CustomTooltipProps } from "@/types";

const ChartTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="text-sm font-semibold text-gray-900">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-xs text-gray-600 mt-1">
            <span style={{ color: entry.color }} className="font-semibold">
              {entry.name}:
            </span>{" "}
            ₹{entry.value.toLocaleString("en-IN")}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default ChartTooltip;
