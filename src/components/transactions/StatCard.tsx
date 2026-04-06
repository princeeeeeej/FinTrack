import type { StatCardProps } from "@/types";

const StatCard = ({ title, amount, change, trend, icon: Icon }: StatCardProps) => {
  const isPositive = trend === "up";

  return (
    <div className="flex flex-col border w-full border-gray-300 rounded-2xl p-3 gap-3">
      <div className="flex gap-2 items-center border border-gray-200 p-2 rounded-[10px]">
        <Icon className="h-6 w-6" />
        <h3 className="text-[15px]">{title}</h3>
      </div>
      <div className="flex-col flex gap-2">
        <p className="text-2xl font-semibold">
          ₹
          {amount.toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
        <div className="flex gap-1 items-center">
          <span
            className={`text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-full ${
              isPositive
                ? "text-emerald-600 bg-emerald-50"
                : "text-red-500 bg-red-50"
            }`}
          >
            {isPositive ? "↑" : "↓"} {change}
          </span>
          <p className="text-[10px]">compared to last month</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
