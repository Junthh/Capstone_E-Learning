import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth.store";
import { useNavigate } from "react-router-dom";
import { LogOut, Menu } from "lucide-react";
import { useMemo } from "react";

type HeaderProps = {
  onMenuClick?: () => void; // nhận callback mở sidebar trên mobile
};

export default function Header({ onMenuClick }: HeaderProps) {
  const user = useAuthStore((s) => s.user);
  const clearUser = useAuthStore((s) => s.clearUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser();
    navigate("/auth/login");
  };

  const displayName = user?.hoTen ?? user?.taiKhoan ?? "Guest";

  // Badge theo role: HV / GV (ưu tiên maLoaiNguoiDung, sau đó loaiNguoiDung/role)
  const roleBadge = useMemo(() => {
    const raw =
      (user as any)?.maLoaiNguoiDung ??
      (user as any)?.loaiNguoiDung ??
      (user as any)?.role ??
      "";
    const v = String(raw).toUpperCase().trim();

    if (v === "HV" || v.includes("HỌC") || v.includes("HOC")) return "HV";
    if (v === "GV" || v.includes("GIÁO") || v.includes("GIAO")) return "GV";
    return null;
  }, [user]);

  // Initials fallback khi không xác định được role
  const nameInitials = useMemo(() => {
    const s = displayName.trim().split(/\s+/).slice(0, 2);
    return (s[0]?.[0] ?? "G").toUpperCase() + (s[1]?.[0]?.toUpperCase() ?? "");
  }, [displayName]);

  const avatarText = roleBadge ?? nameInitials;

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-stone-200">
      <div className="h-12 md:h-14 lg:h-16 px-3 sm:px-4 md:px-6 flex items-center justify-between">
        {/* Left: Menu (mobile) + brand */}
        <div className="flex items-center gap-2">
          {/* Hamburger chỉ hiện ở <lg */}
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="lg:hidden size-8"
            onClick={onMenuClick}
            aria-label="Mở menu"
          >
            <Menu className="size-4" />
          </Button>

          {/* Brand / tiêu đề: nhỏ ở mobile, lớn dần ở md+ */}
          <h1 className="text-sm sm:text-base md:text-lg font-semibold text-stone-900">
            E-Learning Admin
          </h1>
        </div>

        {/* Right: user + logout */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          {/* Avatar: HV/GV theo vai trò hoặc initials */}
          <div
            className="inline-flex items-center justify-center rounded-full bg-stone-100 text-stone-700 size-7 sm:size-8 md:size-9"
            title={roleBadge ? `${displayName} • ${roleBadge}` : displayName}
            aria-label={avatarText}
          >
            <span className="text-[11px] sm:text-xs md:text-sm leading-none">
              {avatarText}
            </span>
          </div>

          {/* Tên: ẩn ở mobile, hiện từ md+ */}
          <span
            className="hidden md:inline-block max-w-[200px] lg:max-w-[260px] truncate text-sm md:text-base font-medium text-stone-700"
            title={displayName}
          >
            {displayName}
          </span>

          {/* Logout: icon-only ở mobile, có chữ ở md+ */}
          <Button
            variant="outline"
            size="icon"
            className="md:hidden size-8 rounded-full"
            onClick={handleLogout}
            aria-label="Đăng xuất"
            title="Đăng xuất"
          >
            <LogOut className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden md:inline-flex h-9 lg:h-10 text-sm md:text-base"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 size-4" />
            Đăng xuất
          </Button>
        </div>
      </div>
    </header>
  );
}
