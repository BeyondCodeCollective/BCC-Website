"use client";

const RANGES = [
  { value: "today", label: "Today" },
  { value: "7d", label: "7D" },
  { value: "30d", label: "30D" },
  { value: "all", label: "All" },
] as const;

type Range = (typeof RANGES)[number]["value"];

export default function TimeRangeSelector({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (range: Range) => void;
}) {
  return (
    <div className="flex gap-0.5 bg-white/5 rounded-lg p-1">
      {RANGES.map((range) => (
        <button
          key={range.value}
          onClick={() => onChange(range.value)}
          className={`px-3.5 py-1.5 text-xs rounded-md transition-colors ${
            selected === range.value
              ? "bg-cobalt text-off-white"
              : "text-white/40 hover:text-white/70"
          }`}
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
}
