"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { SectionLabel } from "./ui/section-label";

const TESTIMONIAL_IMAGES = [
  "/images/testimonials/testimonial-01.jpg",
  "/images/testimonials/testimonial-02.jpg",
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const t = useTranslations("testimonials");

  // Read testimonials array from translations
  const items: { quote: string; name: string; role: string; location: string }[] = [];
  let idx = 0;
  while (t.has(`items.${idx}.quote`)) {
    items.push({
      quote: t(`items.${idx}.quote`),
      name: t(`items.${idx}.name`),
      role: t(`items.${idx}.role`),
      location: t(`items.${idx}.location`),
    });
    idx++;
  }

  const next = () => setCurrent((c) => (c + 1) % items.length);
  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length);

  const testimonial = items[current];

  return (
    <section className="bg-off-white px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-start justify-between gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-[clamp(2rem,5vw,3.5rem)] leading-[0.9] text-true-black">
              {t("headline")}
            </h2>
            <p
              className="mt-2 font-mono text-xs tracking-wider text-grey-3"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("subheading")}
            </p>
          </motion.div>
          <SectionLabel number="02" className="text-grey-3 mt-2" />
        </div>

        <div className="mt-12">
          <div className="relative min-h-[280px] sm:min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="grid gap-8 lg:grid-cols-3 lg:gap-12"
              >
                <div className="lg:col-span-2">
                  <blockquote className="text-xl leading-relaxed text-true-black sm:text-2xl lg:text-3xl">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                </div>

                <div className="flex flex-col items-start gap-4">
                  <div className="relative h-20 w-20 overflow-hidden rounded-full">
                    <Image
                      src={TESTIMONIAL_IMAGES[current]}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div>
                    <p
                      className="font-mono text-sm tracking-wider text-true-black"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      // {testimonial.name.toUpperCase()} //
                    </p>
                    <p className="mt-1 text-sm text-grey-3">
                      {testimonial.role}
                    </p>
                    <p
                      className="mt-0.5 font-mono text-xs tracking-wider text-grey-3"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      &lt; {testimonial.location.toUpperCase()} &gt;
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <button
              onClick={prev}
              className="flex h-12 w-12 items-center justify-center border-2 border-true-black text-true-black transition-colors hover:bg-true-black hover:text-off-white"
              aria-label={t("prevLabel")}
            >
              &larr;
            </button>
            <button
              onClick={next}
              className="flex h-12 w-12 items-center justify-center border-2 border-true-black text-true-black transition-colors hover:bg-true-black hover:text-off-white"
              aria-label={t("nextLabel")}
            >
              &rarr;
            </button>
            <span
              className="ml-4 font-mono text-xs tracking-wider text-grey-3"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              [{String(current + 1).padStart(2, "0")}] OF [
              {String(items.length).padStart(2, "0")}]
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
