"use client";

import { motion } from "framer-motion";
import { EMPLOYER_LOGOS } from "./ui/brand-logos";

const LOGO_COLOR = "FFFFFF"; // White logos on dark cobalt

export function CTABridge() {
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
            [ PARTNERSHIPS ]
          </p>
          <h2 className="mt-4 font-heading text-[clamp(2.5rem,7vw,5rem)] leading-[0.85] text-off-white">
            THE FUTURE IS
            <br />
            ALL OF OURS.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-off-white/70">
            We partner with industry leaders to create pathways into tech.
            Together, we&apos;re building a workforce that reflects the world it
            serves.
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
            className="text-center font-mono text-[10px] tracking-wider uppercase text-off-white/40 mb-6"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Where Tech Careers Are Being Built
          </p>
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll items-center gap-16 whitespace-nowrap">
              {[...EMPLOYER_LOGOS, ...EMPLOYER_LOGOS].map((logo, i) => (
                <div key={`${logo.name}-${i}`} className="flex-shrink-0">
                  <img
                    src={`https://cdn.simpleicons.org/${logo.slug}/${LOGO_COLOR}`}
                    alt={logo.name}
                    className="h-7 w-auto opacity-30 transition-opacity hover:opacity-80"
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
            href="mailto:partnership@wearebcc.org"
            className="inline-block bg-electric-green px-10 py-4 font-mono text-sm tracking-wider uppercase text-true-black transition-colors hover:bg-electric-green/80"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Partner With Us
          </a>
          <p
            className="mt-4 text-off-white/40 font-mono text-xs tracking-wider"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            partnership@wearebcc.org
          </p>
        </motion.div>
      </div>
    </section>
  );
}
