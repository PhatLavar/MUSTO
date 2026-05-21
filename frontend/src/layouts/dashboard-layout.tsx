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
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl border-x border-slate-800">
        <aside className="w-64 shrink-0 border-r border-slate-800 p-8">
          <h1 className="mb-12 text-5xl font-bold tracking-tight">MUSTO</h1>

          <nav className="space-y-2">
            <button
              onClick={() => onNavigate("todo")}
              className={`w-full rounded-xl px-4 py-3 text-left text-lg transition ${
                currentPage === "todo"
                  ? "bg-slate-800 text-white"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
              }`}
            >
              Todo
            </button>

            <button
              onClick={() => onNavigate("notes")}
              className={`w-full rounded-xl px-4 py-3 text-left text-lg transition ${
                currentPage === "notes"
                  ? "bg-slate-800 text-white"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
              }`}
            >
              Notes
            </button>
          </nav>
        </aside>

        <main className="flex-1 px-10 py-20">
          <div className="mx-auto w-full max-w-4xl">{children}</div>
        </main>
      </div>
    </div>
  );
}