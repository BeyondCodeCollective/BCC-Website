"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { PRESS_FEATURES } from "@/lib/constants";

export function Founder() {
  const t = useTranslations("founder");

  return (
    <section
      id="founder"
      className="bg-true-black px-6 py-24 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex items-start justify-between gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-xs tracking-wider uppercase text-electric-green"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {t("label")}
          </motion.p>
        </div>

        <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[3/4] max-h-[600px] overflow-hidden"
          >
            <Image
              src="/images/cristina-mancini.png"
              alt="Cristina Mancini, Founder & CEO of Beyond Code Collective"
              fill
              className="object-cover object-top"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <h2 className="font-heading text-[clamp(2rem,5vw,4rem)] leading-[0.9] text-off-white">
              <a
                href="https://www.linkedin.com/in/crisbmancini/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-electric-green"
              >
                Cristina Mancini
              </a>
            </h2>
            <p
              className="mt-2 font-mono text-xs tracking-wider text-off-white/60"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("title")}
            </p>

            <p className="mt-6 text-sm leading-relaxed text-grey-2 sm:mt-8 sm:text-base lg:text-lg">
              {t("bio")}
            </p>

            <blockquote className="mt-6 border-l-4 border-electric-green pl-4 sm:mt-8 sm:pl-6">
              <p className="text-sm italic leading-relaxed text-off-white sm:text-base lg:text-lg">
                {t("quote")}
              </p>
              <cite
                className="mt-3 block not-italic font-mono text-xs tracking-wider text-electric-green"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                — {t("quoteAttribution")}
              </cite>
            </blockquote>

            <div className="mt-8 sm:mt-12">
              <p
                className="font-mono text-xs tracking-wider text-off-white/60"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {t("asSeenOn")}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-4 sm:mt-4 sm:gap-6">
                {PRESS_FEATURES.map((outlet) => (
                  <a
                    key={outlet.name}
                    href={outlet.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-heading text-sm text-off-white/50 transition-colors hover:text-electric-green"
                  >
                    {outlet.name}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
