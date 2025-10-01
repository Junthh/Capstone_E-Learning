import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, BookOpen, X } from "lucide-react";
import styles from "./Sidebar.module.css";

const navItems = [
  // { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { title: "Quản lý người dùng", href: "/admin/user-management", icon: Users },
  {
    title: "Quản lý khóa học",
    href: "/admin/course-management",
    icon: BookOpen,
  },
];

export function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const location = useLocation();
  const isActive = (href: string) =>
    href === "/admin"
      ? location.pathname === "/admin"
      : location.pathname === href || location.pathname.startsWith(href + "/");

  return (
    <aside
      className={cn(
        // luôn FIXED bên trái; desktop hiển thị, mobile trượt
        "fixed top-0 left-0 z-50 h-screen w-60 bg-white border-r border-stone-200",
        "transform transition-transform duration-300",
        open ? "translate-x-0" : "-translate-x-full",
        "lg:translate-x-0" // desktop luôn hiện
      )}
    >
      <div className="p-6 pb-0 flex items-center justify-between">
        <h1 className={`${styles.brand} text-xxl font-semibold text-stone-900`}>
          E-Learning
        </h1>
        <button
          onClick={onClose}
          className="lg:hidden p-1 rounded-md"
          aria-label="Đóng sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <NavLink key={item.href} to={item.href} onClick={onClose}>
              <div
                className={cn(
                  styles.sidebarItem, 
                  "flex items-center text-sm rounded-lg cursor-pointer",
                  active
                    ? "px-3 py-2 shadow-sm bg-stone-800 text-stone-50"
                    : "px-3 py-2 text-stone-700 hover:bg-stone-100"
                )}
              >
                <Icon className="mr-3 w-4 h-4" />
                {item.title}
              </div>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
