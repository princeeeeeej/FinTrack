import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { mobileMenuOpenStateAtom, activePageAtom } from "@/store/atoms";
import Sidebar from "./Sidebar";
import DashboardPage from "@/pages/DashboardPage";
import TransactionsPage from "@/pages/TransactionsPage";
import InsightsPage from "@/pages/InsightsPage";
import { loadTheme } from "@/utils/theme";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useRecoilState(
    mobileMenuOpenStateAtom
  );
  const [activePage, setActivePage] = useRecoilState(activePageAtom);

  useEffect(() => {
    loadTheme();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsSidebarOpen]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && hash !== activePage) {
        setActivePage(hash);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [activePage, setActivePage]);

  useEffect(() => {
    if (!window.location.hash) {
      window.location.hash = "dashboard";
    }
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardPage />;
      case "transactions":
        return <TransactionsPage />;
      case "insights":
        return <InsightsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen md:h-screen w-full flex flex-col md:flex-row md:p-[18px] md:gap-[16px]">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <div
        className={`fixed top-0 left-0 h-full z-50 transition-transform duration-300 md:relative md:translate-x-0 md:z-0 md:flex-shrink-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>
      <main className="flex-1 min-w-0 overflow-y-auto md:p-6">
        {renderPage()}
      </main>
    </div>
  );
};

export default Layout;
