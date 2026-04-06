import { Lightbulb } from "lucide-react";
import type { Insight } from "@/types";

const InsightCard = ({ insight }: { insight: Insight }) => {
  const isEmojiIcon = typeof insight.icon === "string";
  const IconComponent = insight.icon as React.ElementType;
  const isWarningOrDanger =
    insight.type === "danger" || insight.type === "warning";

  return (
    <div className="flex flex-col border border-gray-200 rounded-[12px] p-3 gap-3 bg-white w-full hover:shadow-lg transition-all duration-300 group">
      <div className="flex justify-between items-center border border-gray-100 bg-gray-50/50 p-2 rounded-[10px] group-hover:bg-gray-100/50 transition-colors">
        <div className="flex gap-2 items-center">
          {isEmojiIcon ? (
            <span className="text-xl leading-none">
              {insight.icon as string}
            </span>
          ) : (
            <IconComponent
              className={`h-5 w-5 ${
                insight.type === "success"
                  ? "text-emerald-500"
                  : insight.type === "danger"
                    ? "text-red-500"
                    : insight.type === "warning"
                      ? "text-amber-500"
                      : insight.type === "info"
                        ? "text-blue-500"
                        : "text-gray-500"
              }`}
              style={insight.iconColor ? { color: insight.iconColor } : {}}
            />
          )}
          <h3 className="text-[14px] font-semibold text-gray-800">
            {insight.title}
          </h3>
        </div>
        {insight.trend && (
          <span
            className={`text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-full ${
              !isWarningOrDanger
                ? "text-emerald-600 bg-emerald-50"
                : "text-red-500 bg-red-50"
            }`}
          >
            {insight.trend === "up" ? "↑" : "↓"}
          </span>
        )}
      </div>

      <div className="flex-col flex gap-2 px-1">
        {insight.value && (
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold text-gray-900">{insight.value}</p>
            {insight.secondaryValue && (
              <span className="text-sm text-gray-500">
                {insight.secondaryValue}
              </span>
            )}
          </div>
        )}
        <p className="text-[12px] sm:text-[13px] text-gray-600 leading-relaxed">
          {insight.description}
        </p>
        {insight.actionable && (
          <div className="flex items-start gap-2 mt-2 p-2 bg-blue-50 border border-blue-100 rounded-lg">
            <Lightbulb className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-[11px] text-blue-700 leading-snug">
              <span className="font-semibold">Tip:</span> {insight.actionable}
            </p>
          </div>
        )}
        {insight.progress !== undefined && (
          <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2 overflow-hidden">
            <div
              className={`h-1.5 rounded-full transition-all duration-500 ${
                insight.type === "success"
                  ? "bg-emerald-500"
                  : insight.type === "danger"
                    ? "bg-red-500"
                    : insight.type === "warning"
                      ? "bg-amber-500"
                      : "bg-blue-500"
              }`}
              style={{
                width: `${Math.min(insight.progress, 100)}%`,
                ...(insight.iconColor
                  ? { backgroundColor: insight.iconColor }
                  : {}),
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InsightCard;
