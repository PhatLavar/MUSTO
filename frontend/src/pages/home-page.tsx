import { Button } from "@/components/ui/button";

export function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
          MUSTO
        </p>

        <h1 className="text-5xl font-bold tracking-tight">
          Todo & Notes App
        </h1>

        <p className="mt-4 max-w-xl text-muted-foreground">
          A simple full-stack project to learn frontend, backend, database and
          file uploads step by step.
        </p>

        <div className="mt-8 flex gap-4">
          <Button size="lg" className="px-8">
            Start with Todo
          </Button>

          <Button variant="outline" size="lg" className="px-8">
            Open Notes
          </Button>
        </div>
      </section>
    </main>
  );
}