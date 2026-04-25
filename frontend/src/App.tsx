function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-slate-400">
          MUSTO
        </p>

        <h1 className="text-5xl font-bold tracking-tight">
          Todo & Note app
        </h1>

        <p className="mt-4 max-w-xl text-slate-300">
          A simple full-stack project to learn frontend, backend, database and file uploads step by step.
        </p>

        <div className="mt-8 flex gap-4">
          <button className="rounded-xl bg-white px-5 py-3 font-medium text-slate-950">
            Start with Todo
          </button>

          <button className="rounded-xl border border-slate-700 px-5 py-3 font-medium text-slate-200">
            Open Notes
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;