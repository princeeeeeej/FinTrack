import { STORAGE_KEYS } from "@/constants";
import { initialTransactions, initialCategories } from "@/data/initialData";

export const initializeStorage = (): void => {
  const isInitialized = localStorage.getItem(STORAGE_KEYS.INITIALIZED);
  if (!isInitialized) {
    localStorage.setItem(
      STORAGE_KEYS.TRANSACTIONS,
      JSON.stringify(initialTransactions)
    );
    localStorage.setItem(
      STORAGE_KEYS.CATEGORIES,
      JSON.stringify(initialCategories)
    );
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, "true");
  }
};

export const getFromStorage = <T>(key: string, fallback: T[] = []): T[] => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
};

export const saveToStorage = <T>(key: string, data: T[]): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    /* storage full or unavailable */
  }
};
