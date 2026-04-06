export const loadTheme = (): void => {
  const stored = localStorage.getItem("fintrack-dark-mode");
  const root = document.documentElement;

  if (stored === "true") {
    root.classList.add("dark");
  } else if (stored === "false") {
    root.classList.remove("dark");
  } else {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (prefersDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }
};