import { NextRequest, NextResponse } from "next/server";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const mailchimp = require("@mailchimp/mailchimp_marketing");
import crypto from "crypto";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function initMailchimp() {
  if (!process.env.MAILCHIMP_API_KEY || !process.env.MAILCHIMP_SERVER_PREFIX) {
    throw new Error("MAILCHIMP_API_KEY and MAILCHIMP_SERVER_PREFIX are required");
  }
  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_SERVER_PREFIX,
  });
}

function subscriberHash(email: string): string {
  return crypto.createHash("md5").update(email).digest("hex");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, email, phone, segment, source } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    if (!source || typeof source !== "string") {
      return NextResponse.json(
        { error: "Source is required" },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    initMailchimp();

    const listId = process.env.MAILCHIMP_AUDIENCE_ID!;

    // Use setListMember (PUT) — creates or updates, never errors on duplicates
    await mailchimp.lists.setListMember(listId, subscriberHash(cleanEmail), {
      email_address: cleanEmail,
      status: "subscribed",
      merge_fields: {
        FNAME: typeof firstName === "string" ? firstName.trim() : "",
        SMSPHONE: typeof phone === "string" ? phone.trim() : "",
        SOURCE: source,
        SEGMENT: typeof segment === "string" ? segment : "",
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    const mailchimpError = error as { status?: number; response?: { body?: { detail?: string } } };

    // Mailchimp returns 400 for "Member Exists" with different status — treat as success
    if (mailchimpError.status === 400) {
      const detail = mailchimpError.response?.body?.detail || "";
      if (detail.toLowerCase().includes("member exists")) {
        return NextResponse.json({ success: true }, { status: 200 });
      }
    }

    console.error("Mailchimp subscribe error:", JSON.stringify(error, null, 2));
    return NextResponse.json(
      { error: "Failed to process subscription. Please try again." },
      { status: 500 }
    );
  }
}
