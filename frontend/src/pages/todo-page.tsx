import { TodoList } from "@/features/todos/todo-list";
import { DashboardLayout } from "@/layouts/dashboard-layout";

export function TodoPage() {
  return (
    <DashboardLayout>
      <TodoList />
    </DashboardLayout>
  );
}