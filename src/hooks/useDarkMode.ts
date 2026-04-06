import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { darkModeAtom } from "@/store/atoms";

const useDarkMode = () => {
  const [isDark, setIsDark] = useRecoilState(darkModeAtom);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("fintrack-dark-mode", String(isDark));
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark((prev) => !prev);
  };

  return { isDark, toggleDarkMode };
};

export default useDarkMode;