import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

type Todo = {
  id: string;
  title: string;
  isCompleted: boolean;
};

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", title: "Design dashboard layout", isCompleted: true },
    { id: "2", title: "Create todo feature", isCompleted: false },
    { id: "3", title: "Connect backend API", isCompleted: false },
  ]);

  const [title, setTitle] = useState("");

  const completedCount = todos.filter((todo) => todo.isCompleted).length;

  const progress = useMemo(() => {
    if (todos.length === 0) return 0;
    return Math.round((completedCount / todos.length) * 100);
  }, [completedCount, todos.length]);

  function handleAddTodo() {
    if (!title.trim()) return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: title.trim(),
      isCompleted: false,
    };

    setTodos((currentTodos) => [newTodo, ...currentTodos]);
    setTitle("");
  }

  function handleToggleTodo(id: string) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      )
    );
  }

  function handleDeleteTodo(id: string) {
    setTodos((currentTodos) =>
      currentTodos.filter((todo) => todo.id !== id)
    );
  }

  return (
    <div className="max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold">Todo</h1>
        <p className="mt-2 text-slate-400">
          Track your tasks and watch your progress grow.
        </p>
      </div>

      <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">Progress</p>
            <h2 className="mt-1 text-2xl font-semibold">
              {completedCount} of {todos.length} completed
            </h2>
          </div>

          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-400">
            {progress}%
          </span>
        </div>

        <div className="mt-5 h-3 rounded-full bg-slate-800">
          <div
            className="h-3 rounded-full bg-emerald-400 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </section>

      <section className="mt-6 flex gap-3">
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") handleAddTodo();
          }}
          placeholder="Add a new task..."
          className="flex-1 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-slate-600"
        />

        <Button size="lg" onClick={handleAddTodo}>
          Add Todo
        </Button>
      </section>

      <section className="mt-6 space-y-3">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
          >
            <button
              onClick={() => handleToggleTodo(todo.id)}
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
                  todo.isCompleted
                    ? "text-slate-500 line-through"
                    : "text-white"
                }
              >
                {todo.title}
              </span>
            </button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDeleteTodo(todo.id)}
              className="text-slate-400 hover:text-white"
            >
              Delete
            </Button>
          </div>
        ))}
      </section>
    </div>
  );
}