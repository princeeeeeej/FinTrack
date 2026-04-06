import { atom } from "recoil";
import type { UserRole } from "@/types";

const getInitialPage = (): string => {
  const hash = window.location.hash.replace("#", "");
  return hash || "dashboard";
};

export const activePageAtom = atom<string>({
  key: "activePage",
  default: getInitialPage(),
});

export const mobileMenuOpenStateAtom = atom<boolean>({
  key: "mobileMenuOpenState",
  default: window.innerWidth >= 768,
});

const getInitialDarkMode = (): boolean => {
  if (typeof window === "undefined") return false;
  if (document.documentElement.classList.contains("dark")) return true;
  const stored = localStorage.getItem("fintrack-dark-mode");
  if (stored !== null) return stored === "true";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

export const darkModeAtom = atom<boolean>({
  key: "darkMode",
  default: getInitialDarkMode(),
});

export const userAtom = atom<UserRole>({
  key: "user",
  default: "admin",
});
