"use client";

interface MetricCardProps {
  label: string;
  value: number | string;
  suffix?: string;
  accent?: "default" | "green" | "orange";
}

export default function MetricCard({ label, value, suffix = "", accent = "default" }: MetricCardProps) {
  const valueClass = {
    default: "text-off-white",
    green: "text-electric-green",
    orange: "text-[#FF6B35]",
  }[accent];

  return (
    <div className="border border-white/10 rounded-lg px-5 py-4">
      <p
        className="text-[11px] uppercase tracking-wider text-white/40 mb-1"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {label}
      </p>
      <p className={`text-3xl font-heading tracking-tight ${valueClass}`}>
        {value}
        {suffix && <span className="text-lg ml-0.5 text-white/50">{suffix}</span>}
      </p>
    </div>
  );
}
