export default function Header() {
  return (
    <header className="hidden lg:block sticky top-0 z-30 bg-white border-b border-stone-200">
      <div className="h-20 px-6 flex items-center justify-between">
        <h1 className="text-base font-semibold text-stone-900">Admin</h1>
        {/* chỗ này bạn có thể thêm breadcrumbs, nút user, search... */}
      </div>
    </header>
  );
}