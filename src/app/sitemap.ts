import type { MetadataRoute } from "next";
import landing from "@/messages/en/landing.json";

const BASE = "https://www.wearebcc.org";
const LOCALES = ["en", "es"] as const;

// Indexable marketing surfaces only. Anything carrying robots noindex
// (platform, partners, rancho-cordova, theo-tech, links) stays
// out: listing a noindex URL in the sitemap just asks Google to crawl a page
// it is then told to drop. Gated pages and app surfaces stay out too.
const PAGES = [
  "",
  "/team",
  "/catalyst",
  "/news",
  "/quiz",
  "/beyond-code-centers",
  "/beyond-the-game",
  "/code-along",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const newsItems = (landing.news?.items ?? []) as {
    slug?: string;
    date?: string;
    draft?: boolean;
  }[];
  const paths = [
    ...PAGES,
    ...newsItems
      .filter((p) => p.slug && !p.draft)
      .map((p) => `/news/${p.slug}`),
  ];

  return paths.flatMap((path) =>
    LOCALES.map((locale) => ({
      url: `${BASE}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: path.startsWith("/news") ? ("monthly" as const) : ("weekly" as const),
      priority: path === "" ? 1 : path === "/team" || path === "/platform" ? 0.9 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${BASE}/${l}${path}`]),
        ),
      },
    })),
  );
}
