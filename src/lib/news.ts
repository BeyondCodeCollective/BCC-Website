export interface NewsPost {
  slug: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  body: string;
  /** Bylined author. Omitted for posts written as the organization. */
  author?: string;
  /**
   * Unpublished. Kept out of every listing and the sitemap, and served
   * noindex, but the URL still resolves so the piece can be shared for
   * review before it goes live.
   */
  draft?: boolean;
  linkUrl?: string;
  linkLabel?: string;
  links?: { label: string; url: string; description?: string }[];
  imagePosition?: string;
}

/**
 * Normalize the raw `news.items` array from the i18n messages.
 * Drops malformed entries and sorts newest-first by ISO date so the
 * display order is predictable regardless of how staff arrange them in admin.
 *
 * Drafts are excluded by default, so a new listing surface cannot leak one by
 * forgetting to filter. Pass `includeDrafts` only where a draft must resolve:
 * the article route itself, which serves it noindex for review.
 */
export function normalizeNews(
  raw: unknown,
  { includeDrafts = false }: { includeDrafts?: boolean } = {},
): NewsPost[] {
  if (!Array.isArray(raw)) return [];
  return (raw as Partial<NewsPost>[])
    .filter((p): p is NewsPost => !!p && !!p.slug && !!p.title)
    .filter((p) => includeDrafts || !p.draft)
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

/** Split a post body into paragraphs on blank lines. */
export function newsParagraphs(body: string): string[] {
  return (body || "")
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}

/** Format an ISO (YYYY-MM-DD) date for display in the active locale. */
export function formatNewsDate(date: string, locale: string): string {
  const d = new Date(`${date}T00:00:00`);
  if (Number.isNaN(d.getTime())) return date;
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}
