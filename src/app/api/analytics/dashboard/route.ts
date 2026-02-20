import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { ensureTables } from "@/lib/db";

let tablesReady = false;

/** Returns an ISO timestamp cutoff — all queries use `created_at >= $cutoff` */
function getDateCutoff(range: string): string {
  const now = new Date();
  switch (range) {
    case "today":
      return new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    case "7d":
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    case "30d":
      return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
    default:
      return new Date(0).toISOString(); // epoch — effectively "all time"
  }
}

export async function GET(request: NextRequest) {
  const password = request.nextUrl.searchParams.get("password");
  const range = request.nextUrl.searchParams.get("range") || "30d";

  if (!process.env.DASHBOARD_PASSWORD || password !== process.env.DASHBOARD_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    if (!tablesReady) {
      await ensureTables();
      tablesReady = true;
    }

    const cutoff = getDateCutoff(range);

    // Top-line metrics from quiz_events
    const startsResult = await sql`
      SELECT COUNT(*) as count FROM quiz_events
      WHERE event_type = 'quiz_started' AND created_at >= ${cutoff}::timestamptz
    `;
    const totalStarts = parseInt(startsResult.rows[0].count);

    const completionsResult = await sql`
      SELECT COUNT(*) as count FROM quiz_events
      WHERE event_type = 'quiz_completed' AND created_at >= ${cutoff}::timestamptz
    `;
    const totalCompletions = parseInt(completionsResult.rows[0].count);

    const leadsResult = await sql`
      SELECT COUNT(*) as count FROM quiz_events
      WHERE event_type = 'lead_captured' AND created_at >= ${cutoff}::timestamptz
    `;
    const totalLeads = parseInt(leadsResult.rows[0].count);

    const skipsResult = await sql`
      SELECT COUNT(*) as count FROM quiz_events
      WHERE event_type = 'lead_skipped' AND created_at >= ${cutoff}::timestamptz
    `;
    const totalSkips = parseInt(skipsResult.rows[0].count);

    // Email leads specifically
    const emailLeadsResult = await sql`
      SELECT COUNT(*) as count FROM quiz_events
      WHERE event_type = 'lead_captured'
        AND event_data->>'lead_type' = 'email'
        AND created_at >= ${cutoff}::timestamptz
    `;
    const emailLeads = parseInt(emailLeadsResult.rows[0].count);

    // Funnel data — count each event type
    const funnelResult = await sql`
      SELECT event_type, COUNT(*) as count FROM quiz_events
      WHERE created_at >= ${cutoff}::timestamptz
      GROUP BY event_type ORDER BY count DESC
    `;

    const funnelSteps = [
      "quiz_started",
      "lead_captured",
      "lead_skipped",
      "question_answered",
      "quiz_completed",
      "results_viewed",
      "results_email_sent",
      "chat_started",
      "chat_message",
      "cta_clicked",
      "quiz_restarted",
    ];

    const funnelMap = new Map(// eslint-disable-next-line @typescript-eslint/no-explicit-any
    funnelResult.rows.map((r: any) => [r.event_type, parseInt(r.count)]));
    const funnel = funnelSteps.map((step) => ({
      step,
      count: funnelMap.get(step) || 0,
      percentage: totalStarts > 0 ? Math.round(((funnelMap.get(step) || 0) / totalStarts) * 100) : 0,
    }));

    // Personality breakdown from completions
    const personalityResult = await sql`
      SELECT personality_result, COUNT(*) as count FROM quiz_completions
      WHERE personality_result != 'pending' AND created_at >= ${cutoff}::timestamptz
      GROUP BY personality_result ORDER BY count DESC
    `;
    const totalPersonalities = personalityResult.rows.reduce(// eslint-disable-next-line @typescript-eslint/no-explicit-any
    (sum: number, r: any) => sum + parseInt(r.count), 0);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const personalities = personalityResult.rows.map((r: any) => ({
      key: r.personality_result,
      count: parseInt(r.count),
      percentage: totalPersonalities > 0 ? Math.round((parseInt(r.count) / totalPersonalities) * 100) : 0,
    }));

    // Demographics — age groups
    const ageResult = await sql`
      SELECT age_group, COUNT(*) as count FROM quiz_completions
      WHERE created_at >= ${cutoff}::timestamptz
      GROUP BY age_group
    `;
    const totalAge = ageResult.rows.reduce(// eslint-disable-next-line @typescript-eslint/no-explicit-any
    (sum: number, r: any) => sum + parseInt(r.count), 0);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ageGroups = ageResult.rows.map((r: any) => ({
      group: r.age_group,
      count: parseInt(r.count),
      percentage: totalAge > 0 ? Math.round((parseInt(r.count) / totalAge) * 100) : 0,
    }));

    // Demographics — locales
    const localeResult = await sql`
      SELECT locale, COUNT(*) as count FROM quiz_completions
      WHERE created_at >= ${cutoff}::timestamptz
      GROUP BY locale
    `;
    const totalLocale = localeResult.rows.reduce(// eslint-disable-next-line @typescript-eslint/no-explicit-any
    (sum: number, r: any) => sum + parseInt(r.count), 0);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const locales = localeResult.rows.map((r: any) => ({
      locale: r.locale,
      count: parseInt(r.count),
      percentage: totalLocale > 0 ? Math.round((parseInt(r.count) / totalLocale) * 100) : 0,
    }));

    // Engagement metrics from completions
    const engagementResult = await sql`
      SELECT
        COUNT(*) FILTER (WHERE chat_used = TRUE) as chat_users,
        AVG(chat_messages) FILTER (WHERE chat_used = TRUE) as avg_chat_msgs,
        COUNT(*) FILTER (WHERE cta_clicked = TRUE) as cta_clicks,
        COUNT(*) FILTER (WHERE email_sent = TRUE) as emails_sent,
        COUNT(*) FILTER (WHERE personality_result != 'pending') as completed,
        COUNT(*) as total
      FROM quiz_completions
      WHERE created_at >= ${cutoff}::timestamptz
    `;
    const eng = engagementResult.rows[0];
    const engTotal = parseInt(eng.total) || 1;
    const engCompleted = parseInt(eng.completed) || 1;

    const engagement = {
      chatUsageRate: Math.round((parseInt(eng.chat_users) / engCompleted) * 100),
      avgChatMessages: Math.round(parseFloat(eng.avg_chat_msgs) || 0),
      ctaClickRate: Math.round((parseInt(eng.cta_clicks) / engCompleted) * 100),
      emailSendRate: Math.round((parseInt(eng.emails_sent) / engTotal) * 100),
    };

    // Timeseries — daily counts
    const timeseriesResult = await sql`
      SELECT
        DATE(created_at) as date,
        COUNT(*) FILTER (WHERE event_type = 'quiz_started') as starts,
        COUNT(*) FILTER (WHERE event_type = 'quiz_completed') as completions,
        COUNT(*) FILTER (WHERE event_type = 'lead_captured') as leads
      FROM quiz_events
      WHERE created_at >= ${cutoff}::timestamptz
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `;
    const timeseries = timeseriesResult.rows// eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((r: any) => ({
      date: r.date,
      starts: parseInt(r.starts),
      completions: parseInt(r.completions),
      leads: parseInt(r.leads),
    }));

    return NextResponse.json({
      totalStarts,
      totalCompletions,
      completionRate: totalStarts > 0 ? Math.round((totalCompletions / totalStarts) * 100) : 0,
      totalLeads,
      totalSkips,
      leadCaptureRate: totalStarts > 0 ? Math.round((totalLeads / totalStarts) * 100) : 0,
      emailLeads,
      funnel,
      personalities,
      demographics: { ageGroups, locales },
      engagement,
      timeseries,
    });
  } catch (error) {
    console.error("Dashboard query error:", error);
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 });
  }
}
