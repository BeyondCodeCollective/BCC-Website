"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { EMPLOYER_LOGOS } from "./ui/brand-logos";

export function CTABridge() {
  const t = useTranslations("ctaBridge");

  return (
    <section id="partners" className="bg-dark-cobalt px-6 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p
            className="font-mono text-xs tracking-wider text-electric-green"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {t("label")}
          </p>
          <h2 className="mt-4 font-heading text-[clamp(2.5rem,7vw,5rem)] leading-[0.85] text-off-white">
            {t("headline1")}
            <br />
            {t("headline2")}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-off-white/70 sm:text-lg">
            {t("description")}
          </p>
        </motion.div>

        {/* Scrolling partner logos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16"
        >
          <p
            className="text-center font-mono text-[10px] tracking-wider uppercase text-off-white/60 mb-6"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {t("logoLabel")}
          </p>
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll items-center gap-10 whitespace-nowrap sm:gap-16">
              {[...EMPLOYER_LOGOS, ...EMPLOYER_LOGOS].map((logo, i) => (
                <div key={`${logo.name}-${i}`} className="flex-shrink-0">
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className={`h-5 w-auto opacity-30 transition-opacity hover:opacity-80 sm:h-7${logo.invert ? " invert" : ""}`}
                    style={logo.invert ? { filter: "brightness(0) invert(1)" } : undefined}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Partnership CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-14 text-center"
        >
          <a
            href="mailto:partnerships@wearebcc.org"
            className="inline-block bg-electric-green px-10 py-4 font-mono text-sm tracking-wider uppercase text-true-black transition-colors hover:bg-electric-green/80"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {t("partnerWithUs")}
          </a>
          <p
            className="mt-4 text-off-white/60 font-mono text-xs tracking-wider"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            partnerships@wearebcc.org
          </p>
        </motion.div>
      </div>
    </section>
  );
}
