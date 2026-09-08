import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { normalizeNews } from "@/lib/news";

const SITE_URL = "https://www.wearebcc.org";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const messages = (await getMessages({ locale })) as {
    news?: { items?: unknown };
  };
  const posts = normalizeNews(messages.news?.items, { includeDrafts: true });
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};

  const image = post.image.startsWith("http")
    ? post.image
    : `${SITE_URL}${post.image}`;

  return {
    // A draft is shareable by link but must never enter the index.
    ...(post.draft ? { robots: { index: false, follow: false } } : {}),
    alternates: {
      canonical: `${SITE_URL}/${locale}/news/${slug}`,
      languages: {
        en: `${SITE_URL}/en/news/${slug}`,
        es: `${SITE_URL}/es/news/${slug}`,
      },
    },
    title: `${post.title} | Beyond Code Collective`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/${locale}/news/${slug}`,
      siteName: "Beyond Code Collective",
      type: "article",
      publishedTime: post.date,
      images: [{ url: image, alt: post.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [image],
    },
  };
}

/**
 * Article schema. Gives Google the headline, date, image and — for bylined
 * posts — the author as a Person, which is what connects a writer's name to
 * the piece in search results.
 */
export default async function NewsArticleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const messages = (await getMessages({ locale })) as {
    news?: { items?: unknown };
  };
  const post = normalizeNews(messages.news?.items, {
    includeDrafts: true,
  }).find((p) => p.slug === slug);

  const publisher = {
    "@type": "Organization",
    name: "Beyond Code Collective",
    alternateName: "BCC",
    url: SITE_URL,
    logo: `${SITE_URL}/images/bcc-logo-stacked-black.png`,
  };

  const jsonLd = post && {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.excerpt,
    image: post.image.startsWith("http")
      ? post.image
      : `${SITE_URL}${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: locale,
    mainEntityOfPage: `${SITE_URL}/${locale}/news/${slug}`,
    author: post.author
      ? { "@type": "Person", name: post.author }
      : publisher,
    publisher,
  };

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  );
}
