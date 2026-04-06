import { useRecoilState } from "recoil";
import { activePageAtom } from "@/store/atoms";
import { useEffect } from "react";

const usePageNavigation = () => {
  const [activePage, setActivePage] = useRecoilState(activePageAtom);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        setActivePage(hash);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [setActivePage]);

  const navigate = (page: string) => {
    window.location.hash = page;
    setActivePage(page);
  };

  return { activePage, navigate };
};

export default usePageNavigation;