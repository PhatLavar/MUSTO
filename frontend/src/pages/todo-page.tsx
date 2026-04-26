import { useEffect, useState } from "react";
import { TodoList } from "@/features/todos/todo-list";
import { DashboardLayout } from "@/layouts/dashboard-layout";
import { getHealth } from "@/lib/api";

export function TodoPage() {
  const [status, setStatus] = useState("loading...");

  useEffect(() => {
    getHealth()
      .then((data) => {
        setStatus(data.message);
      })
      .catch(() => {
        setStatus("Backend not reachable!");
      });
  }, []);

  return (
    <DashboardLayout>
      <div className="mb-6 text-sm text-slate-400">
        Backend status: {status}
      </div>

      <TodoList />
    </DashboardLayout>
  );
}