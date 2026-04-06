import { useState } from "react";
import { useRecoilState } from "recoil";
import { Search } from "lucide-react";
import { userAtom } from "@/store/atoms";
import Header from "@/components/layout/Header";
import OverviewStats from "@/components/dashboard/OverviewStats";
import TransactionsChart from "@/components/dashboard/TransactionsChart";

const DashboardPage = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="flex flex-col gap-4 h-full w-full min-w-0 p-4 md:p-0">
      <Header
        title="Dashboard"
        actions={
          <>
            <button className="hidden sm:flex p-2 rounded-xl hover:bg-gray-100 cursor-pointer">
              <Search className="h-5 w-5 text-gray-400" />
            </button>
            <div className="relative">
              <button
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center ml-1 cursor-pointer"
                onClick={() => setOpenMenu((prev) => !prev)}
                aria-label="User menu"
              >
                <span className="text-white text-sm font-bold">P</span>
              </button>
              {openMenu && (
                <div className="flex flex-col gap-1 absolute right-0 top-12 bg-white p-2 rounded-2xl shadow-lg transition-all duration-200 text-sm z-10">
                  <button
                    className={`${user === "admin" ? "bg-[#F3F4F6]" : ""} rounded-[8px] p-2 cursor-pointer hover:bg-gray-50`}
                    onClick={() => setUser("admin")}
                  >
                    Admin
                  </button>
                  <button
                    className={`${user === "user" ? "bg-[#F3F4F6]" : ""} rounded-[8px] p-2 cursor-pointer hover:bg-gray-50`}
                    onClick={() => setUser("user")}
                  >
                    User
                  </button>
                </div>
              )}
            </div>
          </>
        }
      />
      <OverviewStats />
      <TransactionsChart />
    </div>
  );
};

export default DashboardPage;
