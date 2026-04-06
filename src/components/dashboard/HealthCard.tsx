import type { HealthCardProps } from "@/types";

const HealthCard: React.FC<HealthCardProps> = ({
  icon,
  balance,
  description,
  total,
  change,
  positive = true,
}) => {
  return (
    <div className="flex flex-col border border-gray-200 rounded-[12px] p-3 w-full hover:shadow-md transition-all duration-300">
      <div className="flex border border-gray-200 rounded-[10px] p-3 gap-3">
        <div className="flex-shrink-0">
          <img src={icon} alt={total} className="h-10 w-10 sm:h-11 sm:w-11" />
        </div>
        <div className="flex flex-col min-w-0">
          <h2 className="font-bold text-lg sm:text-xl text-gray-900 truncate">
            ₹
            {balance.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h2>
          <p className="text-[12px] sm:text-[13px] text-gray-400 truncate">
            {description}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center pl-2 mt-2">
        <h3 className="text-[14px] sm:text-[15px] font-medium text-gray-700">
          {total}
        </h3>
        {change && (
          <span
            className={`text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-full ${
              positive
                ? "text-emerald-600 bg-emerald-50"
                : "text-red-500 bg-red-50"
            }`}
          >
            {positive ? "↑" : "↓"} {change}
          </span>
        )}
      </div>
    </div>
  );
};

export default HealthCard;
