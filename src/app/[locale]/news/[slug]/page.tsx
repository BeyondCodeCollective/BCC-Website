"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react";
import { useTranslations, useLocale } from "next-intl";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { NewsCard } from "@/components/news-card";
import {
  normalizeNews,
  newsParagraphs,
  formatNewsDate,
} from "@/lib/news";
import { Link } from "@/i18n/navigation";

export default function NewsArticle() {
  const t = useTranslations("news");
  const locale = useLocale();
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const posts = normalizeNews(t.raw("items"));
  const post = posts.find((p) => p.slug === slug);
  const more = posts.filter((p) => p.slug !== slug).slice(0, 3);

  // Portrait headshots (taller than wide) get cropped to a sliver — only the
  // eyes — inside a wide 16:9 frame. Detect the natural ratio on load and give
  // tall images a portrait-shaped frame so the full face and shoulders show.
  const [isPortrait, setIsPortrait] = useState(false);

  // Not found — keep the user inside the newsroom rather than dead-ending.
  if (!post) {
    return (
      <div className="flex min-h-screen flex-col bg-off-white">
        <Nav variant="light" />
        <div className="mx-auto flex max-w-3xl flex-1 flex-col items-start justify-center px-6 py-40 lg:px-8">
          <h1 className="font-heading text-4xl text-true-black">404</h1>
          <p className="mt-3 text-grey-3">{t("emptyState")}</p>
          <Link
            href="/news"
            className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-cobalt"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <ArrowLeft size={14} weight="bold" />
            {t("backLabel")}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const paragraphs = newsParagraphs(post.body);

  return (
    <div className="min-h-screen bg-off-white">
      <Nav variant="light" />

      <article className="px-6 pt-32 pb-24 lg:px-8 lg:pt-40 lg:pb-32">
        <div className="mx-auto max-w-3xl">
          {/* Back link */}
          <Link
            href="/news"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-grey-3 transition-colors hover:text-true-black"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <ArrowLeft
              size={14}
              weight="bold"
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            {t("backLabel")}
          </Link>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-8"
          >
            <div
              className="flex items-center gap-3 font-mono text-xs uppercase tracking-wider"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <span className="bg-cobalt px-2.5 py-1 text-off-white">
                {post.category}
              </span>
              <span className="text-grey-3">
                {formatNewsDate(post.date, locale)}
              </span>
            </div>
            <h1 className="mt-5 font-heading text-[clamp(2.25rem,6vw,4rem)] leading-[0.9] text-true-black">
              {post.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-grey-3">
              {post.excerpt}
            </p>
          </motion.header>
        </div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`mx-auto mt-10 ${isPortrait ? "max-w-md" : "max-w-5xl"}`}
        >
          <div
            className={`relative w-full overflow-hidden bg-grey-1 ${
              isPortrait ? "aspect-[4/5]" : "aspect-[16/9]"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image}
              alt={post.imageAlt || post.title}
              onLoad={(e) => {
                const img = e.currentTarget;
                setIsPortrait(img.naturalHeight > img.naturalWidth);
              }}
              className="h-full w-full object-cover"
              style={{ objectPosition: post.imagePosition || "center" }}
            />
          </div>
        </motion.div>

        {/* Body */}
        <div className="mx-auto mt-12 max-w-3xl">
          <div className="space-y-6">
            {paragraphs.map((para, i) => (
              <p
                key={i}
                className="text-lg leading-relaxed text-true-black/80"
              >
                {para}
              </p>
            ))}
          </div>

          {/* Optional link list (e.g. volunteer portals, resource hubs) */}
          {post.links?.length ? (
            <div className="mt-10 flex flex-col gap-4">
              {post.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 border border-true-black/15 px-6 py-5 transition-colors hover:border-cobalt hover:bg-cobalt hover:text-off-white"
                >
                  <span>
                    <span
                      className="block font-mono text-xs uppercase tracking-wider"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {link.label}
                    </span>
                    {link.description ? (
                      <span className="mt-1 block text-sm text-true-black/60 group-hover:text-off-white/80">
                        {link.description}
                      </span>
                    ) : null}
                  </span>
                  <ArrowUpRight
                    size={16}
                    weight="bold"
                    className="flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              ))}
            </div>
          ) : null}

          {/* Optional external link (press, partner sites, etc.) */}
          {post.linkUrl ? (
            <a
              href={post.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 inline-flex items-center gap-2 bg-true-black px-6 py-4 font-mono text-xs uppercase tracking-wider text-off-white transition-colors hover:bg-cobalt"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {post.linkLabel || post.linkUrl}
              <ArrowUpRight
                size={14}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          ) : null}
        </div>
      </article>

      {/* More updates */}
      {more.length > 0 && (
        <section className="border-t border-true-black/10 px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p
              className="font-mono text-xs uppercase tracking-wider text-cobalt"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("label")}
            </p>
            <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((p, i) => (
                <NewsCard key={p.slug} post={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
