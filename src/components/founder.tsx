"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionLabel } from "./ui/section-label";
import { FOUNDER } from "@/lib/constants";

const PRESS_OUTLETS = [
  "Forbes",
  "CNBC",
  "Essence",
  "Fast Company",
  "Mashable",
  "Black Enterprise",
];

export function Founder() {
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
            Meet The Founder
          </motion.p>
          <SectionLabel number="04" className="text-off-white/30" />
        </div>

        <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Photo */}
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

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <h2 className="font-heading text-[clamp(2rem,5vw,4rem)] leading-[0.9] text-off-white">
              {FOUNDER.name}
            </h2>
            <p
              className="mt-2 font-mono text-xs tracking-wider text-grey-3"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {FOUNDER.title}
            </p>

            <p className="mt-8 text-base leading-relaxed text-grey-2 lg:text-lg">
              {FOUNDER.bio}
            </p>

            {/* Quote */}
            <blockquote className="mt-8 border-l-4 border-electric-green pl-6">
              <p className="text-base italic leading-relaxed text-off-white lg:text-lg">
                {FOUNDER.quote}
              </p>
              <cite
                className="mt-3 block not-italic font-mono text-xs tracking-wider text-electric-green"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                — {FOUNDER.quoteAttribution}
              </cite>
            </blockquote>

            {/* Press logos */}
            <div className="mt-12">
              <p
                className="font-mono text-xs tracking-wider text-grey-3"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                AS SEEN ON
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-6">
                {PRESS_OUTLETS.map((outlet) => (
                  <span
                    key={outlet}
                    className="font-heading text-sm text-grey-3/50 transition-colors hover:text-off-white"
                  >
                    {outlet}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
