import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth.store";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const user = useAuthStore((s) => s.user);
  const clearUser = useAuthStore((s) => s.clearUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser();
    navigate("/auth/login");
  };

  return (
    <header className="hidden lg:block sticky top-0 z-30 bg-white border-b border-stone-200">
      <div className="h-20 px-6 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-stone-900"></h1>

        {/* Khu vực user */}
        <div className="flex items-center gap-4">
          <span className="text-lg font-medium text-stone-700">
            {user?.hoTen ?? user?.taiKhoan ?? "Guest"}
          </span>
          <Button
            variant="outline"
            className="h-9 text-lg"
            onClick={handleLogout}
          >
            Đăng xuất
          </Button>
        </div>
      </div>
    </header>
  );
}
