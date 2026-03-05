"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { SectionLabel } from "./ui/section-label";
import { INITIATIVES } from "@/lib/constants";
import { useQuiz } from "./quiz-modal";

const INITIATIVE_IMAGES = [
  "/images/initiatives/forge.jpg",
  "/images/initiatives/catalysts.jpg",
  "/images/initiatives/code-along.jpg",
  "/images/initiatives/after-the-game.jpg",
];

const INITIATIVE_KEYS = ["forge", "catalysts", "codeAlong", "afterTheGame"] as const;

export function Initiatives() {
  const { openQuiz } = useQuiz();
  const t = useTranslations("initiatives");

  return (
    <section
      id="initiatives"
      className="bg-cobalt px-6 py-24 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex items-start justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-[clamp(2.5rem,6vw,5rem)] leading-[0.85] text-electric-green">
              {t("headline1")}
              <br />
              {t("headline2")}
            </h2>
            <p
              className="mt-4 font-mono text-sm tracking-wider text-off-white/90"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("subheading")}
            </p>
          </motion.div>
          <SectionLabel number="02" className="text-off-white/70 mt-2" />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 max-w-2xl text-base leading-relaxed text-off-white sm:text-lg"
        >
          {t("description")}
        </motion.p>

        <div className="mt-16 space-y-16 lg:space-y-24">
          {INITIATIVE_KEYS.map((key, i) => {
            const initiative = INITIATIVES[i];
            const isReversed = i % 2 !== 0;

            // Read tags array from translations
            const tags: string[] = [];
            let idx = 0;
            while (t.has(`items.${key}.tags.${idx}`)) {
              tags.push(t(`items.${key}.tags.${idx}`));
              idx++;
            }

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7 }}
                className={`grid gap-8 lg:grid-cols-2 lg:gap-12 items-center ${
                  isReversed ? "lg:direction-rtl" : ""
                }`}
              >
                <div
                  className={`relative aspect-[4/3] overflow-hidden ${
                    isReversed ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={INITIATIVE_IMAGES[i]}
                    alt={t(`items.${key}.title`)}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                  <span
                    className="absolute top-4 left-4 bg-electric-green px-3 py-1 font-mono text-xs tracking-wider text-true-black"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    [{String(i + 1).padStart(2, "0")}]
                  </span>
                </div>

                <div className={isReversed ? "lg:order-1" : ""}>
                  <h3 className="font-heading text-[clamp(1.75rem,4vw,3rem)] leading-[0.9] text-off-white">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-off-white/90 lg:text-lg">
                    {t(`items.${key}.description`)}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-off-white/40 px-3 py-1 text-xs text-off-white/80"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <a
                      href={"learnMoreUrl" in initiative && initiative.learnMoreUrl ? initiative.learnMoreUrl : `mailto:${initiative.contact}`}
                      {...("learnMoreUrl" in initiative && initiative.learnMoreUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="inline-flex items-center justify-center gap-2 bg-electric-green px-6 py-3 font-mono text-xs tracking-wider uppercase text-true-black transition-colors hover:bg-electric-green/80"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {t("learnMore")}
                      <span aria-hidden="true">&rarr;</span>
                    </a>
                    {/* Quiz button hidden — re-enable when quiz is ready
                    {"quizUrl" in initiative && initiative.quizUrl && (
                      <button
                        onClick={() => openQuiz()}
                        className="inline-flex items-center justify-center gap-2 border-2 border-electric-green px-6 py-3 font-mono text-xs tracking-wider uppercase text-electric-green transition-colors hover:bg-electric-green hover:text-true-black"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {t("takeCareerQuiz")}
                        <span aria-hidden="true">&rarr;</span>
                      </button>
                    )}
                    */}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
