import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { ensureTables } from "@/lib/db";
import {
  getOneNamespace,
  upsertContentOverride,
} from "@/lib/content-db";

let tablesReady = false;

function checkPassword(pw: string | null): boolean {
  return (
    !!process.env.DASHBOARD_PASSWORD &&
    pw === process.env.DASHBOARD_PASSWORD
  );
}

const VALID_NAMESPACES = new Set([
  "hero",
  "about",
  "testimonials",
  "audience",
  "stats",
  "initiatives",
  "founder",
  "resources",
  "ctaBridge",
  "getInvolved",
]);

const VALID_LOCALES = new Set(["en", "es"]);

export async function GET(req: NextRequest) {
  const pw = req.nextUrl.searchParams.get("password");
  if (!checkPassword(pw)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const locale = req.nextUrl.searchParams.get("locale") || "en";
  const namespace = req.nextUrl.searchParams.get("namespace");

  if (!namespace || !VALID_NAMESPACES.has(namespace)) {
    return NextResponse.json(
      { error: "Invalid namespace" },
      { status: 400 }
    );
  }
  if (!VALID_LOCALES.has(locale)) {
    return NextResponse.json(
      { error: "Invalid locale" },
      { status: 400 }
    );
  }

  if (!tablesReady) {
    await ensureTables();
    tablesReady = true;
  }

  try {
    const override = await getOneNamespace(locale, namespace);
    return NextResponse.json({ override });
  } catch (error) {
    console.error("Admin content GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch content" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { password, locale, namespace, content } = body;

    if (!checkPassword(password)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!locale || !VALID_LOCALES.has(locale)) {
      return NextResponse.json(
        { error: "Invalid locale" },
        { status: 400 }
      );
    }
    if (!namespace || !VALID_NAMESPACES.has(namespace)) {
      return NextResponse.json(
        { error: "Invalid namespace" },
        { status: 400 }
      );
    }
    if (!content || typeof content !== "object") {
      return NextResponse.json(
        { error: "Content must be an object" },
        { status: 400 }
      );
    }

    if (!tablesReady) {
      await ensureTables();
      tablesReady = true;
    }

    await upsertContentOverride(locale, namespace, content);

    // Bust ISR cache for both locale homepages
    revalidatePath("/en", "page");
    revalidatePath("/es", "page");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin content PUT error:", error);
    return NextResponse.json(
      { error: "Failed to save content" },
      { status: 500 }
    );
  }
}
