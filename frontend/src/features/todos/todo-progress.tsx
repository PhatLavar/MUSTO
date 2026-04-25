type TodoProgressProps = {
  completedCount: number;
  totalCount: number;
  progress: number;
};

export function TodoProgress({
  completedCount,
  totalCount,
  progress,
}: TodoProgressProps) {
  return (
    <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">Progress</p>
          <h2 className="mt-1 text-2xl font-semibold">
            {completedCount} of {totalCount} completed
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
  );
}