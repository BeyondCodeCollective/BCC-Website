import { NextRequest, NextResponse } from "next/server";
import mailchimpMarketing from "@mailchimp/mailchimp_marketing";
import { Resend } from "resend";
import crypto from "crypto";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function initMarketing() {
  if (!process.env.MAILCHIMP_API_KEY || !process.env.MAILCHIMP_SERVER_PREFIX) {
    throw new Error("MAILCHIMP_API_KEY and MAILCHIMP_SERVER_PREFIX are required");
  }
  mailchimpMarketing.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_SERVER_PREFIX,
  });
}

function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return new Resend(process.env.RESEND_API_KEY);
}

function subscriberHash(email: string): string {
  return crypto.createHash("md5").update(email).digest("hex");
}

interface ResultsEmailData {
  email: string;
  locale: "en" | "es";
  personalityName: string;
  personalityKey: string;
  role: string;
  tagline: string;
  ageGroup: "under18" | "18plus";
  salary: { low: number; mid: number; high: number };
  courses: string[];
}

function buildResultsEmail(data: ResultsEmailData): { subject: string; html: string } {
  const isYouth = data.ageGroup === "under18";
  const isES = data.locale === "es";

  const subject = isES
    ? `Tu Camino BCC: ${data.personalityName}`
    : `Your BCC Career Path: ${data.personalityName}`;

  const labels = isES
    ? {
        pathLabel: "[ TU CAMINO ]",
        roleLabel: "TU ROL IDEAL",
        salaryLabel: "Rango salarial",
        coursesLabel: isYouth ? "INICIATIVAS PARA TI" : "COMIENZA CON ESTOS CURSOS",
        ctaText: isYouth ? "Explorar BCC" : "Explorar Cursos BCC",
        privacy: "Sin spam. Cancela cuando quieras.",
        footer: "Beyond Code Collective",
      }
    : {
        pathLabel: "[ YOUR PATH ]",
        roleLabel: "YOUR IDEAL ROLE",
        salaryLabel: "Salary range",
        coursesLabel: isYouth ? "INITIATIVES FOR YOU" : "START WITH THESE COURSES",
        ctaText: isYouth ? "Explore BCC" : "Explore BCC Courses",
        privacy: "No spam. Unsubscribe anytime.",
        footer: "Beyond Code Collective",
      };

  const coursesHtml = data.courses
    .map(
      (course) =>
        `<tr><td style="padding:6px 0;color:#333;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:15px;">&#8226; ${course}</td></tr>`
    )
    .join("");

  const html = `<!DOCTYPE html>
<html lang="${data.locale}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f5f5f0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f0;padding:24px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

<!-- Header -->
<tr><td style="background-color:#1D59FF;padding:20px 32px;">
  <span style="color:#FFFDF7;font-size:14px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;">BEYOND CODE COLLECTIVE</span>
</td></tr>

<!-- Hero -->
<tr><td style="background-color:#000;padding:40px 32px 32px;">
  <span style="color:#E5F701;font-size:11px;font-weight:bold;letter-spacing:2px;font-family:'Courier New',monospace;">${labels.pathLabel}</span>
  <h1 style="color:#FFFDF7;font-size:32px;font-weight:bold;margin:12px 0 8px;line-height:1.1;letter-spacing:-0.5px;">${data.personalityName}</h1>
  <p style="color:rgba(255,253,247,0.7);font-size:16px;margin:0;font-style:italic;">&quot;${data.tagline}&quot;</p>
</td></tr>

<!-- Role Card -->
<tr><td style="background-color:#1D59FF;padding:24px 32px;">
  <span style="color:rgba(255,253,247,0.8);font-size:11px;font-weight:bold;letter-spacing:1px;font-family:'Courier New',monospace;">${labels.roleLabel}</span>
  <h2 style="color:#FFFDF7;font-size:22px;font-weight:bold;margin:8px 0 4px;">${data.role}</h2>
  <p style="color:rgba(255,253,247,0.9);font-size:16px;margin:0;">$${data.salary.mid.toLocaleString()}${isES ? "/año promedio" : "/year average"}</p>
</td></tr>

<!-- Salary Range -->
<tr><td style="background-color:#FFFDF7;padding:24px 32px;">
  <h3 style="color:#000;font-size:14px;font-weight:bold;margin:0 0 12px;letter-spacing:0.5px;">${labels.salaryLabel}</h3>
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td style="color:#666;font-size:14px;">$${(data.salary.low / 1000).toFixed(0)}k</td>
      <td align="center" style="color:#000;font-size:16px;font-weight:bold;">$${(data.salary.mid / 1000).toFixed(0)}k</td>
      <td align="right" style="color:#666;font-size:14px;">$${(data.salary.high / 1000).toFixed(0)}k</td>
    </tr>
    <tr><td colspan="3" style="padding-top:8px;">
      <div style="background:rgba(29,89,255,0.12);height:8px;border-radius:4px;position:relative;">
        <div style="background:#1D59FF;height:8px;border-radius:4px;width:40%;margin-left:30%;"></div>
      </div>
    </td></tr>
  </table>
</td></tr>

<!-- Courses -->
<tr><td style="background-color:#FFFDF7;padding:0 32px 24px;">
  <h3 style="color:#000;font-size:14px;font-weight:bold;margin:0 0 12px;letter-spacing:0.5px;">${labels.coursesLabel}</h3>
  <table width="100%" cellpadding="0" cellspacing="0">${coursesHtml}</table>
</td></tr>

<!-- CTA -->
<tr><td style="background-color:#FFFDF7;padding:0 32px 32px;" align="center">
  <a href="https://wearebcc.org" style="display:inline-block;background-color:#E5F701;color:#000;font-size:14px;font-weight:bold;letter-spacing:1px;text-decoration:none;padding:14px 32px;text-transform:uppercase;">${labels.ctaText}</a>
</td></tr>

<!-- Footer -->
<tr><td style="background-color:#1D59FF;padding:20px 32px;text-align:center;">
  <p style="color:rgba(255,253,247,0.6);font-size:11px;margin:0 0 4px;font-family:'Courier New',monospace;">${labels.privacy}</p>
  <p style="color:rgba(255,253,247,0.5);font-size:11px;margin:0;">
    <a href="https://wearebcc.org" style="color:rgba(255,253,247,0.5);text-decoration:none;">wearebcc.org</a>
  </p>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;

  return { subject, html };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, locale, personalityName, personalityKey, role, tagline, ageGroup, salary, courses } =
      body as ResultsEmailData;

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Add to Mailchimp audience (fire-and-forget)
    try {
      initMarketing();
      const listId = process.env.MAILCHIMP_AUDIENCE_ID!;
      await mailchimpMarketing.lists.setListMember(listId, subscriberHash(cleanEmail), {
        email_address: cleanEmail,
        status: "subscribed",
        merge_fields: {
          SOURCE: "quiz-results",
        },
      });
    } catch {
      // Non-blocking — contact may already exist
    }

    // Build and send the results email via Resend
    const { subject, html } = buildResultsEmail({
      email: cleanEmail,
      locale: locale === "es" ? "es" : "en",
      personalityName,
      personalityKey,
      role,
      tagline,
      ageGroup: ageGroup === "under18" ? "under18" : "18plus",
      salary,
      courses: courses || [],
    });

    if (!process.env.RESEND_FROM_EMAIL) {
      throw new Error("RESEND_FROM_EMAIL is not configured");
    }

    const resend = getResend();
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: cleanEmail,
      subject,
      html,
    });

    if (error) {
      console.error("Resend email error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error sending results email:", error);
    return NextResponse.json({ error: "Failed to send results" }, { status: 500 });
  }
}
