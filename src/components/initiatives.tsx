"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionLabel } from "./ui/section-label";
import { INITIATIVES } from "@/lib/constants";

const INITIATIVE_IMAGES = [
  // The Forge — community tech hub, intergenerational learning
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop",
  // Beyond Code Catalysts — adults in career training / professional development
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=600&fit=crop",
  // Code Along — person coding, tutorials, screen-focused
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
  // After The Game — athletes transitioning to tech careers
  "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&h=600&fit=crop",
];

const INITIATIVE_TAGS = [
  ["All Ages", "In-Person + Online", "K-12 to Adult"],
  ["18+", "Career Pathways", "Hands-On"],
  ["All Ages", "Free", "Video Tutorials"],
  ["Athletes", "Cohort-Based", "Career Transition"],
];

export function Initiatives() {
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
              INFINITE
              <br />
              POSSIBILITIES
            </h2>
            <p
              className="mt-4 font-mono text-sm tracking-wider text-off-white/70"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              [ POWERED BY THE CODE ]
            </p>
          </motion.div>
          <SectionLabel number="02" className="text-off-white/50 mt-2" />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-off-white/80"
        >
          Beyond Code Collective is an integrated ecosystem creating sustainable
          pathways to quality jobs while strengthening the digital capacity of
          mission-driven organizations.
        </motion.p>

        {/* ALX-style alternating initiative sections */}
        <div className="mt-16 space-y-16 lg:space-y-24">
          {INITIATIVES.map((initiative, i) => {
            const isReversed = i % 2 !== 0;
            return (
              <motion.div
                key={initiative.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7 }}
                className={`grid gap-8 lg:grid-cols-2 lg:gap-12 items-center ${
                  isReversed ? "lg:direction-rtl" : ""
                }`}
              >
                {/* Image */}
                <div
                  className={`relative aspect-[4/3] overflow-hidden ${
                    isReversed ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={INITIATIVE_IMAGES[i]}
                    alt={initiative.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                  {/* Numbered overlay */}
                  <span
                    className="absolute top-4 left-4 bg-electric-green px-3 py-1 font-mono text-xs tracking-wider text-true-black"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    [{String(i + 1).padStart(2, "0")}]
                  </span>
                </div>

                {/* Content */}
                <div className={isReversed ? "lg:order-1" : ""}>
                  <h3 className="font-heading text-[clamp(1.75rem,4vw,3rem)] leading-[0.9] text-off-white">
                    {initiative.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-off-white/70 lg:text-lg">
                    {initiative.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {INITIATIVE_TAGS[i].map((tag) => (
                      <span
                        key={tag}
                        className="border border-off-white/30 px-3 py-1 text-xs text-off-white/60"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={`mailto:${initiative.contact}`}
                    className="mt-8 inline-flex items-center gap-2 bg-electric-green px-6 py-3 font-mono text-xs tracking-wider uppercase text-true-black transition-colors hover:bg-electric-green/80"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Learn More
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
