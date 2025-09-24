import { Outlet } from "react-router-dom";
import { Sidebar } from "./_Components/SideBar";
import { Footer } from "./_Components/Footer";
import Header from "./_Components/Header";

export default function AdminTemplate() {
  return (
    <div className="min-h-screen bg-stone-100 flex">
      <div className="hidden lg:block w-60 border-r border-stone-200 bg-white">
        <Sidebar />
      </div>
      <div className="flex-1 min-w-0 flex flex-col">
        <Header />
        <main className="flex-1 px-4 py-4 overflow-hidden">
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
