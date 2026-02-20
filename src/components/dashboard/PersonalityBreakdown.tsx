"use client";

interface PersonalityData {
  key: string;
  count: number;
  percentage: number;
}

const PERSONALITY_LABELS: Record<string, string> = {
  fixer: "The Fixer",
  architect: "The Architect",
  connector: "The Connector",
  creator: "The Creator",
  builder: "The Builder",
  maker: "The Maker",
  strategist: "The Strategist",
  guardian: "The Guardian",
  analyst: "The Detective",
  healer: "The Healer",
  educator: "The Guide",
  advocate: "The Advocate",
};

export default function PersonalityBreakdown({ data }: { data: PersonalityData[] }) {
  const maxCount = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="space-y-2">
      {data.map((item, i) => {
        const isTop = i === 0;
        return (
          <div key={item.key} className="flex items-center gap-3">
            <p
              className={`text-xs w-28 shrink-0 text-right ${isTop ? "text-electric-green" : "text-white/50"}`}
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {PERSONALITY_LABELS[item.key] || item.key}
            </p>
            <div className="flex-1 h-7 bg-white/5 rounded relative overflow-hidden">
              <div
                className={`h-full rounded transition-all duration-500 ${isTop ? "bg-electric-green" : "bg-cobalt/70"}`}
                style={{ width: `${(item.count / maxCount) * 100}%`, minWidth: item.count > 0 ? 4 : 0 }}
              />
            </div>
            <p
              className="text-xs text-white/50 w-20 shrink-0 tabular-nums text-right"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {item.count} ({item.percentage}%)
            </p>
          </div>
        );
      })}
    </div>
  );
}
