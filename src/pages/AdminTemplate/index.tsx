import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./_Components/SideBar";
import { Footer } from "./_Components/Footer";
import Header from "./_Components/Header";
import { cn } from "@/lib/utils";

export default function AdminTemplate() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-100">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Overlay khi mở trên mobile */}
      <div
        onClick={() => setSidebarOpen(false)}
        className={cn(
          "fixed inset-0 bg-black/40 z-40 lg:hidden",
          sidebarOpen ? "block" : "hidden"
        )}
      />

      <div className="flex min-h-screen flex-col lg:pl-60">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 px-4 py-4">
          <section className="w-full h-full">
            <div className="w-full h-full rounded-xl border border-white bg-white shadow-sm">
              <div className="p-6 h-full overflow-auto">
                <Outlet />
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
