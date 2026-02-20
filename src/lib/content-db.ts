import { sql } from "@vercel/postgres";

export type ContentOverrides = Record<string, Record<string, unknown>>;

/**
 * Fetch all site_content overrides for a given locale.
 * Returns a map of { namespace: contentObject }.
 * Returns empty object on any error so the site always falls back to JSON files.
 */
export async function getContentOverrides(
  locale: string
): Promise<ContentOverrides> {
  try {
    const result = await sql`
      SELECT namespace, content
      FROM site_content
      WHERE locale = ${locale}
    `;
    const map: ContentOverrides = {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for (const row of result.rows as any[]) {
      map[row.namespace] = row.content;
    }
    return map;
  } catch {
    return {};
  }
}

/**
 * Upsert a single namespace for one locale.
 */
export async function upsertContentOverride(
  locale: string,
  namespace: string,
  content: Record<string, unknown>
): Promise<void> {
  await sql`
    INSERT INTO site_content (locale, namespace, content, updated_at)
    VALUES (${locale}, ${namespace}, ${JSON.stringify(content)}, NOW())
    ON CONFLICT (locale, namespace)
    DO UPDATE SET content = ${JSON.stringify(content)}, updated_at = NOW()
  `;
}

/**
 * Get the current override for a single namespace (for admin panel reads).
 */
export async function getOneNamespace(
  locale: string,
  namespace: string
): Promise<Record<string, unknown> | null> {
  const result = await sql`
    SELECT content FROM site_content
    WHERE locale = ${locale} AND namespace = ${namespace}
  `;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (result.rows[0] as any)?.content ?? null;
}
