"use client";

import { motion } from "framer-motion";

const LOGOS = [
  "Google",
  "Microsoft",
  "Amazon",
  "Meta",
  "Apple",
  "Salesforce",
  "IBM",
  "Adobe",
];

export function TrustBar() {
  return (
    <section className="border-b border-grey-2/50 bg-off-white px-6 py-8 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-[10px] tracking-wider uppercase text-grey-3"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Where Tech Careers Are Being Built
        </motion.p>

        <div className="mt-4 relative overflow-hidden">
          <div className="flex animate-scroll gap-16 whitespace-nowrap">
            {[...LOGOS, ...LOGOS].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="text-sm font-bold tracking-wider text-grey-3/40 uppercase flex-shrink-0 lg:text-base"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
