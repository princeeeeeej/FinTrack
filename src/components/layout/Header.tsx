import { Menu } from "lucide-react";
import { useRecoilState } from "recoil";
import { mobileMenuOpenStateAtom } from "@/store/atoms";
import type { HeaderProps } from "@/types";

const Header: React.FC<HeaderProps> = ({ title, subtitle, actions }) => {
  const [, setIsSidebarOpen] = useRecoilState(mobileMenuOpenStateAtom);

  return (
    <div className="flex justify-between items-center p-4 w-full rounded-2xl bg-white border border-gray-300">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden p-2 -ml-1 rounded-xl hover:bg-gray-100 cursor-pointer"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5 text-gray-700" />
        </button>
        <div>
          <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
          {subtitle && (
            <p className="text-[11px] text-gray-500">{subtitle}</p>
          )}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
};

export default Header;
