import { useEffect, useMemo, useState } from "react";
import { createTodo, getTodos } from "@/lib/api";
import { TodoForm } from "./todo-form";
import { TodoItem } from "./todo-item";
import { TodoProgress } from "./todo-progress";
import type { Todo } from "./todo-types";

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const [title, setTitle] = useState("");

  const completedCount = todos.filter((todo) => todo.isCompleted).length;

  const progress = useMemo(() => {
    if (todos.length === 0) return 0;
    return Math.round((completedCount / todos.length) * 100);
  }, [completedCount, todos.length]);

  async function handleAddTodo() {
    if (!title.trim()) return;
    const newTodo = await createTodo(title.trim());
    setTodos((currentTodos) => [newTodo, ...currentTodos]);
    setTitle("");
  }

  function handleToggleTodo(id: string) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  }

  function handleDeleteTodo(id: string) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  }

  return (
    <div className="max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold">Todo</h1>
        <p className="mt-2 text-slate-400">
          Track your tasks and watch your progress grow.
        </p>
      </div>

      <TodoProgress
        completedCount={completedCount}
        totalCount={todos.length}
        progress={progress}
      />

      <TodoForm
        title={title}
        onTitleChange={setTitle}
        onAddTodo={handleAddTodo}
      />

      <section className="mt-6 space-y-3">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleTodo={handleToggleTodo}
            onDeleteTodo={handleDeleteTodo}
          />
        ))}
      </section>
    </div>
  );
}