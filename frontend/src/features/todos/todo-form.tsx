import { Button } from "@/components/ui/button";

type TodoFormProps = {
  title: string;
  onTitleChange: (title: string) => void;
  onAddTodo: () => void;
};

export function TodoForm({
  title,
  onTitleChange,
  onAddTodo,
}: TodoFormProps) {
  return (
    <section className="mt-6 flex gap-3">
      <input
        value={title}
        onChange={(event) => onTitleChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") onAddTodo();
        }}
        placeholder="Add a new task..."
        className="flex-1 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-slate-600"
      />

      <Button size="lg" onClick={onAddTodo}>
        Add Todo
      </Button>
    </section>
  );
}