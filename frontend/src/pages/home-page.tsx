import { Button } from "@/components/ui/button";

export function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <section className="relative mx-auto flex min-h-screen max-w-6xl items-center px-6 py-16">
        <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute right-10 bottom-20 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />

        <div className="relative z-10 grid w-full items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-slate-800 bg-slate-900/80 px-4 py-2 text-sm text-slate-300">
              Build your productivity system
            </p>

            <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
              Organize tasks and notes in one clean workspace.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              MUSTO is a simple full-stack project built to learn frontend,
              backend, database design and file uploads step by step.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" className="px-8">
                Start with Todo
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-slate-700 bg-slate-950/40 px-8 text-white hover:bg-slate-900"
              >
                Open Notes
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-2xl backdrop-blur">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xl text-slate-400">Today&apos;s Progress</p>
                <h2 className="text-2xl font-semibold">3 of 5 completed</h2>
              </div>

              <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-400">
                60%
              </div>
            </div>

            <div className="mb-6 h-3 rounded-full bg-slate-800">
              <div className="h-3 w-3/5 rounded-full bg-emerald-400" />
            </div>

            <div className="space-y-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <p className="font-medium">Design landing page</p>
                <p className="mt-1 text-sm text-slate-400">Completed</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <p className="font-medium">Create Todo API</p>
                <p className="mt-1 text-sm text-slate-400">In progress</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <p className="font-medium">Attach files to notes</p>
                <p className="mt-1 text-sm text-slate-400">Planned</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}