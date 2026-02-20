"use client";

interface DemoItem {
  group?: string;
  locale?: string;
  count: number;
  percentage: number;
}

function BarRow({ label, count, percentage, color }: { label: string; count: number; percentage: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <p
        className="text-xs text-white/50 w-24 shrink-0 text-right"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {label}
      </p>
      <div className="flex-1 h-8 bg-white/5 rounded relative overflow-hidden">
        <div
          className={`h-full rounded transition-all duration-500 ${color}`}
          style={{ width: `${percentage}%`, minWidth: count > 0 ? 4 : 0 }}
        />
      </div>
      <p
        className="text-xs text-white/70 w-20 shrink-0 tabular-nums text-right"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {count} ({percentage}%)
      </p>
    </div>
  );
}

const AGE_LABELS: Record<string, string> = {
  under18: "Youth (7-17)",
  "18plus": "Adult (18+)",
};

const LOCALE_LABELS: Record<string, string> = {
  en: "English",
  es: "Spanish",
};

export default function DemographicsPanel({
  ageGroups,
  locales,
}: {
  ageGroups: DemoItem[];
  locales: DemoItem[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <p
          className="text-[11px] uppercase tracking-wider text-white/40 mb-3"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Age Group
        </p>
        <div className="space-y-2">
          {ageGroups.map((item) => (
            <BarRow
              key={item.group}
              label={AGE_LABELS[item.group || ""] || item.group || ""}
              count={item.count}
              percentage={item.percentage}
              color="bg-cobalt"
            />
          ))}
        </div>
      </div>
      <div>
        <p
          className="text-[11px] uppercase tracking-wider text-white/40 mb-3"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Language
        </p>
        <div className="space-y-2">
          {locales.map((item) => (
            <BarRow
              key={item.locale}
              label={LOCALE_LABELS[item.locale || ""] || item.locale || ""}
              count={item.count}
              percentage={item.percentage}
              color="bg-electric-green"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
