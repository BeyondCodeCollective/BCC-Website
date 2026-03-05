"use client";

import { motion } from "framer-motion";
import { UsersThree, Circuitry, Rocket, ArrowsClockwise } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";

const PILLAR_ICONS = [UsersThree, Circuitry, Rocket, ArrowsClockwise];
const PILLAR_KEYS = [
  "intergenerationalOpportunity",
  "allTechnologies",
  "todayAndTomorrow",
  "adaptiveProgramming",
] as const;

export function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="bg-off-white px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-start justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-[clamp(2rem,5vw,4rem)] leading-[0.9] text-true-black">
              {t("headline1")}
              <br />
              {t("headline2")}
            </h2>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 max-w-3xl"
        >
          <p className="text-lg leading-relaxed text-charcoal sm:text-xl lg:text-2xl">
            {t("description")}
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {PILLAR_KEYS.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.6 }}
              className="group border-t-4 border-electric-green pt-8"
            >
              {(() => {
                const Icon = PILLAR_ICONS[i];
                return <Icon size={48} weight="bold" className="text-cobalt mb-4" />;
              })()}
              <h3 className="font-heading text-xl leading-tight text-true-black lg:text-2xl">
                {t(`pillars.${key}.title`)}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-grey-3 lg:text-base">
                {t(`pillars.${key}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
