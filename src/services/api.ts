import type { Transaction, Category } from "@/types";
import { STORAGE_KEYS } from "@/constants";
import { initialTransactions, initialCategories } from "@/data/initialData";
import { initializeStorage, getFromStorage, saveToStorage } from "./storage";

const delay = (ms: number = 100) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const api = {
  init: (): void => {
    initializeStorage();
  },

  getTransactions: async (): Promise<Transaction[]> => {
    await delay(50);
    return getFromStorage<Transaction>(
      STORAGE_KEYS.TRANSACTIONS,
      initialTransactions
    );
  },

  getCategories: async (): Promise<Category[]> => {
    await delay(50);
    return getFromStorage<Category>(
      STORAGE_KEYS.CATEGORIES,
      initialCategories
    );
  },

  addTransaction: async (
    transaction: Omit<Transaction, "id">
  ): Promise<Transaction> => {
    await delay(100);
    const transactions = getFromStorage<Transaction>(
      STORAGE_KEYS.TRANSACTIONS
    );
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    saveToStorage(STORAGE_KEYS.TRANSACTIONS, [
      ...transactions,
      newTransaction,
    ]);
    return newTransaction;
  },

  updateTransaction: async (
    id: string,
    updates: Partial<Transaction>
  ): Promise<Transaction> => {
    await delay(100);
    const transactions = getFromStorage<Transaction>(
      STORAGE_KEYS.TRANSACTIONS
    );
    const index = transactions.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new Error("Transaction not found");
    }
    const updatedTransaction = { ...transactions[index], ...updates };
    transactions[index] = updatedTransaction;
    saveToStorage(STORAGE_KEYS.TRANSACTIONS, transactions);
    return updatedTransaction;
  },

  deleteTransaction: async (id: string): Promise<void> => {
    await delay(100);
    const transactions = getFromStorage<Transaction>(
      STORAGE_KEYS.TRANSACTIONS
    );
    saveToStorage(
      STORAGE_KEYS.TRANSACTIONS,
      transactions.filter((t) => t.id !== id)
    );
  },

  addCategory: async (
    category: Omit<Category, "id">
  ): Promise<Category> => {
    await delay(100);
    const categories = getFromStorage<Category>(STORAGE_KEYS.CATEGORIES);
    const newCategory: Category = {
      ...category,
      id: Date.now().toString(),
    };
    saveToStorage(STORAGE_KEYS.CATEGORIES, [...categories, newCategory]);
    return newCategory;
  },

  resetData: (): void => {
    localStorage.removeItem(STORAGE_KEYS.INITIALIZED);
    initializeStorage();
    window.location.reload();
  },

  exportData: (): string => {
    return JSON.stringify(
      {
        transactions: getFromStorage<Transaction>(STORAGE_KEYS.TRANSACTIONS),
        categories: getFromStorage<Category>(STORAGE_KEYS.CATEGORIES),
        exportedAt: new Date().toISOString(),
      },
      null,
      2
    );
  },

  importData: (jsonString: string): void => {
    const data = JSON.parse(jsonString);
    if (data.transactions) {
      saveToStorage(STORAGE_KEYS.TRANSACTIONS, data.transactions);
    }
    if (data.categories) {
      saveToStorage(STORAGE_KEYS.CATEGORIES, data.categories);
    }
    window.location.reload();
  },
};

api.init();

export default api;