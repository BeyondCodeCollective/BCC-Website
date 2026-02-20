"use client";

interface EngagementData {
  chatUsageRate: number;
  avgChatMessages: number;
  ctaClickRate: number;
  emailSendRate: number;
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
      <p className="text-sm text-white/50">{label}</p>
      <p
        className="text-sm text-off-white font-bold tabular-nums"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {value}
      </p>
    </div>
  );
}

export default function EngagementPanel({ data }: { data: EngagementData }) {
  return (
    <div>
      <StatRow label="Chat Usage Rate" value={`${data.chatUsageRate}%`} />
      <StatRow label="Avg Chat Messages" value={`${data.avgChatMessages}`} />
      <StatRow label="CTA Click Rate" value={`${data.ctaClickRate}%`} />
      <StatRow label="Email Send Rate" value={`${data.emailSendRate}%`} />
    </div>
  );
}
