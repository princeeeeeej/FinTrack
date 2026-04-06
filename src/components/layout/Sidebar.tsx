import { X } from "lucide-react";
import { useRecoilState } from "recoil";
import { mobileMenuOpenStateAtom, activePageAtom } from "@/store/atoms";
import { NAV_ITEMS } from "@/constants";

const Sidebar = () => {
  const [activePage, setActivePage] = useRecoilState(activePageAtom);
  const [, setIsSidebarOpen] = useRecoilState(mobileMenuOpenStateAtom);

  const handleClick = (pageId: string) => {
    window.location.hash = pageId;
    setActivePage(pageId);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="bg-white border border-gray-300 h-full w-[280px] rounded-none md:rounded-2xl p-4 flex flex-col gap-5 shadow-lg md:shadow-none">
      <div className="flex items-center justify-between">
        <div
          className="flex items-center gap-2.5 cursor-pointer"
          onClick={() => handleClick("dashboard")}
        >
          <img src="logo.png" alt="FinTrack" className="h-8 w-8" />
          <h1 className="text-2xl font-bold text-gray-900 branding">
            FinTrack
          </h1>
        </div>
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="md:hidden p-1.5 rounded-lg hover:bg-gray-100"
          aria-label="Close menu"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      <nav className="flex flex-col gap-1.5">
        <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider px-3 mb-1">
          Menu
        </p>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 w-full text-left ${
                isActive
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
              }`}
            >
              <div
                className={`w-1 h-6 rounded-full transition-all duration-200 ${
                  isActive ? "bg-blue-500" : "bg-transparent"
                }`}
              />
              <Icon className="h-[18px] w-[18px]" />
              <span className="text-[13px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto">
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-300">
          <p className="text-[12px] font-semibold text-gray-700">
            Need Help?
          </p>
          <p className="text-[11px] text-gray-400 mt-1">
            Check docs for guidance
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
