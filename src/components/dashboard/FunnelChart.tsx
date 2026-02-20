"use client";

interface FunnelStep {
  step: string;
  count: number;
  percentage: number;
}

const STEP_LABELS: Record<string, string> = {
  quiz_started: "Started",
  lead_captured: "Lead Captured",
  lead_skipped: "Lead Skipped",
  question_answered: "Questions",
  quiz_completed: "Completed",
  results_viewed: "Results Viewed",
  results_email_sent: "Email Sent",
  chat_started: "Chat Started",
  chat_message: "Chat Messages",
  cta_clicked: "CTA Clicked",
  quiz_restarted: "Restarted",
};

export default function FunnelChart({ steps }: { steps: FunnelStep[] }) {
  const maxCount = Math.max(...steps.map((s) => s.count), 1);

  return (
    <div className="space-y-2">
      {steps.map((step) => {
        const width = (step.count / maxCount) * 100;
        return (
          <div key={step.step} className="flex items-center gap-3">
            <p
              className="text-xs text-white/50 w-32 shrink-0 text-right"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {STEP_LABELS[step.step] || step.step}
            </p>
            <div className="flex-1 h-8 bg-white/5 rounded relative overflow-hidden">
              <div
                className="h-full bg-cobalt rounded transition-all duration-500"
                style={{ width: `${width}%`, minWidth: step.count > 0 ? 4 : 0 }}
              />
            </div>
            <p
              className="text-xs text-white/70 w-16 shrink-0 tabular-nums"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {step.count}
            </p>
          </div>
        );
      })}
    </div>
  );
}
