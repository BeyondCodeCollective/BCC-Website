import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { ensureTables } from "@/lib/db";

let tablesReady = false;

interface AnalyticsEvent {
  session_id: string;
  quiz_version: string;
  event_type: string;
  event_data?: Record<string, unknown>;
  locale?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const events: AnalyticsEvent[] = body.events;

    if (!events || !Array.isArray(events) || events.length === 0) {
      return NextResponse.json({ error: "No events provided" }, { status: 400 });
    }

    // Cap batch size to prevent abuse
    if (events.length > 50) {
      return NextResponse.json({ error: "Too many events" }, { status: 400 });
    }

    // Ensure tables exist on first call
    if (!tablesReady) {
      await ensureTables();
      tablesReady = true;
    }

    const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    const VALID_VERSIONS = new Set(["quiz", "quiz-v2"]);
    const VALID_LOCALES = new Set(["en", "es"]);
    const VALID_EVENTS = new Set([
      "quiz_started", "lead_captured", "lead_skipped", "question_answered",
      "quiz_completed", "results_viewed", "results_email_sent", "save_results_email",
      "chat_started", "chat_message", "cta_clicked", "quiz_restarted",
    ]);

    for (const event of events) {
      const {
        session_id,
        quiz_version,
        event_type,
        event_data = {},
        locale = "en",
      } = event;

      // Validate required fields exist and match expected formats
      if (!session_id || !quiz_version || !event_type) continue;
      if (!UUID_RE.test(session_id)) continue;
      if (!VALID_VERSIONS.has(quiz_version)) continue;
      if (!VALID_EVENTS.has(event_type)) continue;
      const safeLocale = VALID_LOCALES.has(locale) ? locale : "en";

      // Insert into quiz_events
      await sql`
        INSERT INTO quiz_events (session_id, quiz_version, event_type, event_data, locale)
        VALUES (${session_id}, ${quiz_version}, ${event_type}, ${JSON.stringify(event_data)}, ${safeLocale})
      `;

      // Handle quiz_started — create a completion row
      if (event_type === "quiz_started") {
        const ageGroup = (event_data.age_group as string) || "unknown";
        await sql`
          INSERT INTO quiz_completions (session_id, quiz_version, age_group, personality_result, locale)
          VALUES (${session_id}, ${quiz_version}, ${ageGroup}, 'pending', ${safeLocale})
          ON CONFLICT (session_id) DO NOTHING
        `;
      }

      // Handle lead_captured — update completion row
      if (event_type === "lead_captured") {
        const leadType = (event_data.lead_type as string) || "unknown";
        await sql`
          UPDATE quiz_completions
          SET lead_captured = TRUE, lead_type = ${leadType}
          WHERE session_id = ${session_id}
        `;
      }

      // Handle quiz_completed — update personality result
      if (event_type === "quiz_completed") {
        const personalityResult = (event_data.personality_result as string) || "unknown";
        await sql`
          UPDATE quiz_completions
          SET personality_result = ${personalityResult}
          WHERE session_id = ${session_id}
        `;
      }

      // Handle results_email_sent or save_results_email
      if (event_type === "results_email_sent" || event_type === "save_results_email") {
        await sql`
          UPDATE quiz_completions
          SET email_sent = TRUE
          WHERE session_id = ${session_id}
        `;
      }

      // Handle chat_started
      if (event_type === "chat_started") {
        await sql`
          UPDATE quiz_completions
          SET chat_used = TRUE
          WHERE session_id = ${session_id}
        `;
      }

      // Handle chat_message — increment count
      if (event_type === "chat_message") {
        await sql`
          UPDATE quiz_completions
          SET chat_used = TRUE, chat_messages = chat_messages + 1
          WHERE session_id = ${session_id}
        `;
      }

      // Handle cta_clicked
      if (event_type === "cta_clicked") {
        await sql`
          UPDATE quiz_completions
          SET cta_clicked = TRUE
          WHERE session_id = ${session_id}
        `;
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json({ error: "Failed to process events" }, { status: 500 });
  }
}
