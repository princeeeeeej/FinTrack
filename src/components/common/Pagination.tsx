import { generatePaginationItems } from "@/utils/helpers";
import type { PaginationProps } from "@/types";

const Pagination = ({ page, totalPages, onChange }: PaginationProps) => {
  const paginationItems = generatePaginationItems(page, totalPages);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-4 mb-1 gap-3">
      <p className="text-[13px] text-gray-500">
        Showing {page} of {totalPages}
      </p>
      <div className="flex items-center gap-1.5 text-gray-600">
        <button
          onClick={() => onChange(1)}
          disabled={page === 1}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors text-sm"
          aria-label="First page"
        >
          &laquo;
        </button>
        <button
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors text-sm"
          aria-label="Previous page"
        >
          &lsaquo;
        </button>
        {paginationItems.map((item, index) => {
          if (item === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="w-8 h-8 flex items-center justify-center text-sm text-gray-400"
              >
                ...
              </span>
            );
          }
          return (
            <button
              key={`page-${item}`}
              onClick={() => onChange(item as number)}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-colors border cursor-pointer ${
                page === item
                  ? "bg-blue-500 border-blue-500 text-white"
                  : "border-gray-200 bg-white hover:bg-gray-50 text-gray-700"
              }`}
              aria-label={`Page ${item}`}
              aria-current={page === item ? "page" : undefined}
            >
              {item}
            </button>
          );
        })}
        <button
          onClick={() => onChange(page + 1)}
          disabled={page === totalPages}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors text-sm"
          aria-label="Next page"
        >
          &rsaquo;
        </button>
        <button
          onClick={() => onChange(totalPages)}
          disabled={page === totalPages}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors text-sm"
          aria-label="Last page"
        >
          &raquo;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
