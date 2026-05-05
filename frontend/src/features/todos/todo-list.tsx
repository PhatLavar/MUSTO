import { useEffect, useMemo, useState } from "react";
import { createTodo, deleteTodo, getTodos, updateTodo } from "@/lib/api";
import { TodoForm } from "./todo-form";
import { TodoItem } from "./todo-item";
import { TodoProgress } from "./todo-progress";
import type { Todo } from "./todo-types";

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    refetchTodos();
  }, []);

  const [title, setTitle] = useState("");
  async function refetchTodos() {
    const newTodos = await getTodos();
    setTodos(newTodos);
  }

  const completedCount = todos.filter((todo) => todo.is_completed).length;

  const progress = useMemo(() => {
    if (todos.length === 0) return 0;
    return Math.round((completedCount / todos.length) * 100);
  }, [completedCount, todos.length]);

  async function handleAddTodo() {
    if (!title.trim()) return;
    await createTodo(title.trim());
    await refetchTodos();
    setTitle("");
  }

  async function handleToggleTodo(id: string) {
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) return;
    await updateTodo(id, { is_completed: !todo.is_completed });
    await refetchTodos();
  }

  async function handleUpdateTodoTitle(id: string, title: string) {
    await updateTodo(id, { title });
    await refetchTodos();
  }

  async function handleDeleteTodo(id: string) {
    await deleteTodo(id);
    await refetchTodos();
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
            onUpdateTodoTitle={handleUpdateTodoTitle}
          />
        ))}
      </section>
    </div>
  );
}