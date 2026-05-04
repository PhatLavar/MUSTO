import type { AppPage } from "@/App";

type DashboardLayoutProps = {
  children: React.ReactNode;
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
};

export function DashboardLayout({
  children,
  currentPage,
  onNavigate,
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <aside className="w-64 border-r border-slate-800 p-6">
        <h1 className="mb-8 text-xl font-bold">MUSTO</h1>

        <nav className="space-y-2">
          <button
            onClick={() => onNavigate("todo")}
            className={`w-full rounded-lg px-3 py-2 text-left ${
              currentPage === "todo"
                ? "bg-slate-800 text-white"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            Todo
          </button>

          <button
            onClick={() => onNavigate("notes")}
            className={`w-full rounded-lg px-3 py-2 text-left ${
              currentPage === "notes"
                ? "bg-slate-800 text-white"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            Notes
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}