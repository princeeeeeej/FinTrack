export const formatCurrency = (amount: number): string => {
  return `₹${amount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const formatCurrencyShort = (amount: number): string => {
  return amount.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const formatPercentage = (value: number): string => {
  return `${Math.abs(value).toFixed(1)}%`;
};

export const formatYAxis = (value: number): string => {
  if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
  return `${value}`;
};

export const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
};
