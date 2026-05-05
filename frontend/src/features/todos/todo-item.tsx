import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Todo } from "./todo-types";

type TodoItemProps = {
  todo: Todo;
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  onUpdateTodoTitle: (id: string, title: string) => void;
};

export function TodoItem({
  todo,
  onToggleTodo,
  onDeleteTodo,
  onUpdateTodoTitle,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(todo.title);

  function handleSave() {
    if (!draftTitle.trim()) return;

    onUpdateTodoTitle(todo.id, draftTitle.trim());
    setIsEditing(false);
  }

  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="flex flex-1 items-center gap-3">
        <button
          onClick={() => onToggleTodo(todo.id)}
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
            todo.is_completed
              ? "border-emerald-400 bg-emerald-400"
              : "border-slate-600"
          }`}
        />

        {isEditing ? (
          <input
            value={draftTitle}
            onChange={(event) => setDraftTitle(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") handleSave();
              if (event.key === "Escape") {
                setDraftTitle(todo.title);
                setIsEditing(false);
              }
            }}
            className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none"
            autoFocus
          />
        ) : (
          <button
            onClick={() => onToggleTodo(todo.id)}
            className={`text-left ${
              todo.is_completed ? "text-slate-500 line-through" : "text-white"
            }`}
          >
            {todo.title}
          </button>
        )}
      </div>

      <div className="ml-4 flex gap-2">
        {isEditing ? (
          <>
            <Button size="sm" onClick={handleSave}>
              Save
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setDraftTitle(todo.title);
                setIsEditing(false);
              }}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="text-slate-400 hover:text-white"
            >
              Edit
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDeleteTodo(todo.id)}
              className="text-slate-400 hover:text-white"
            >
              Delete
            </Button>
          </>
        )}
      </div>
    </div>
  );
}