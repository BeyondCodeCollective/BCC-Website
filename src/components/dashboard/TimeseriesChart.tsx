"use client";

interface TimeseriesPoint {
  date: string;
  starts: number;
  completions: number;
  leads: number;
}

export default function TimeseriesChart({ data }: { data: TimeseriesPoint[] }) {
  if (data.length === 0) {
    return (
      <p className="text-sm text-white/30" style={{ fontFamily: "var(--font-mono)" }}>
        No data yet
      </p>
    );
  }

  const maxVal = Math.max(...data.flatMap((d) => [d.starts, d.completions, d.leads]), 1);

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="flex items-end gap-1.5 min-w-fit" style={{ minHeight: 160 }}>
          {data.map((point) => (
            <div key={point.date} className="flex flex-col items-center gap-1.5 w-12">
              <div className="flex items-end gap-[2px]" style={{ height: 120 }}>
                <div
                  className="w-3 bg-cobalt rounded-t transition-all duration-300"
                  style={{ height: `${(point.starts / maxVal) * 100}%`, minHeight: point.starts > 0 ? 2 : 0 }}
                  title={`Starts: ${point.starts}`}
                />
                <div
                  className="w-3 bg-electric-green rounded-t transition-all duration-300"
                  style={{ height: `${(point.completions / maxVal) * 100}%`, minHeight: point.completions > 0 ? 2 : 0 }}
                  title={`Completions: ${point.completions}`}
                />
                <div
                  className="w-3 bg-[#FF6B35] rounded-t transition-all duration-300"
                  style={{ height: `${(point.leads / maxVal) * 100}%`, minHeight: point.leads > 0 ? 2 : 0 }}
                  title={`Leads: ${point.leads}`}
                />
              </div>
              <p
                className="text-[9px] text-white/30 whitespace-nowrap"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {new Date(point.date).toLocaleDateString("en", { month: "short", day: "numeric" })}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-5 mt-5 pt-4 border-t border-white/5">
        <span className="flex items-center gap-2 text-xs text-white/50" style={{ fontFamily: "var(--font-mono)" }}>
          <span className="w-2.5 h-2.5 bg-cobalt rounded-sm inline-block" /> Starts
        </span>
        <span className="flex items-center gap-2 text-xs text-white/50" style={{ fontFamily: "var(--font-mono)" }}>
          <span className="w-2.5 h-2.5 bg-electric-green rounded-sm inline-block" /> Completions
        </span>
        <span className="flex items-center gap-2 text-xs text-white/50" style={{ fontFamily: "var(--font-mono)" }}>
          <span className="w-2.5 h-2.5 bg-[#FF6B35] rounded-sm inline-block" /> Leads
        </span>
      </div>
    </div>
  );
}
