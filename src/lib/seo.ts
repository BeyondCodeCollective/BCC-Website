import type { Metadata } from "next";

export const SITE_URL = "https://www.wearebcc.org";

/**
 * Self-referencing canonical plus both locale alternates for one page.
 *
 * The root layout deliberately does NOT set a canonical: metadata is
 * inherited, so a canonical there points every nested page at the locale
 * homepage and Google drops them as duplicates. Each public route sets its
 * own instead, through this helper.
 *
 * `path` is the route below the locale, with a leading slash ("/news") or
 * empty for the homepage.
 */
export function pageAlternates(
  locale: string,
  path: string,
): NonNullable<Metadata["alternates"]> {
  return {
    canonical: `${SITE_URL}/${locale}${path}`,
    languages: {
      en: `${SITE_URL}/en${path}`,
      es: `${SITE_URL}/es${path}`,
    },
  };
}
