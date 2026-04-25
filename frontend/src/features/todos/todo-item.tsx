import { Button } from "@/components/ui/button";
import type { Todo } from "./todo-types";

type TodoItemProps = {
  todo: Todo;
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
};

export function TodoItem({
  todo,
  onToggleTodo,
  onDeleteTodo,
}: TodoItemProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
      <button
        onClick={() => onToggleTodo(todo.id)}
        className="flex items-center gap-3 text-left"
      >
        <span
          className={`flex h-5 w-5 items-center justify-center rounded-full border ${
            todo.isCompleted
              ? "border-emerald-400 bg-emerald-400"
              : "border-slate-600"
          }`}
        />

        <span
          className={
            todo.isCompleted ? "text-slate-500 line-through" : "text-white"
          }
        >
          {todo.title}
        </span>
      </button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDeleteTodo(todo.id)}
        className="text-slate-400 hover:text-white"
      >
        Delete
      </Button>
    </div>
  );
}