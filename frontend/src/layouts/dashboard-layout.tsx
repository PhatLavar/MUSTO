export function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 p-6">
        <h1 className="mb-8 text-xl font-bold">MUSTO</h1>

        <nav className="space-y-2">
          <button className="w-full rounded-lg px-3 py-2 text-left hover:bg-slate-800">
            Todo
          </button>

          <button className="w-full rounded-lg px-3 py-2 text-left hover:bg-slate-800">
            Notes
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}