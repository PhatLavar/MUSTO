import type { AppPage } from "@/App";
import { TodoList } from "@/features/todos/todo-list";
import { DashboardLayout } from "@/layouts/dashboard-layout";

type TodoPageProps = {
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
};

export function TodoPage({ currentPage, onNavigate }: TodoPageProps) {
  return (
    <DashboardLayout currentPage={currentPage} onNavigate={onNavigate}>
      <TodoList />
    </DashboardLayout>
  );
}