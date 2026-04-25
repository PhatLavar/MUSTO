import { DashboardLayout } from "@/layout/dashboard-layout";

export function TodoPage() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold">Todo</h1>

      <p className="mt-2 text-slate-400">
        Manage your tasks here.
      </p>
    </DashboardLayout>
  );
}