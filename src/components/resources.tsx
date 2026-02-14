"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { SectionLabel } from "./ui/section-label";
import { RESOURCES, FEATURED_VIDEO } from "@/lib/constants";

function DownloadIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M8 1v9m0 0L5 7m3 3l3-3M2 12v1.5A1.5 1.5 0 003.5 15h9a1.5 1.5 0 001.5-1.5V12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="23" stroke="#E5F701" strokeWidth="2" />
      <path d="M19 15l14 9-14 9V15z" fill="#E5F701" />
    </svg>
  );
}

export function Resources() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section
      id="resources"
      className="bg-forest-green px-6 py-24 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex items-start justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-[clamp(2rem,5vw,4rem)] leading-[0.9] text-electric-green">
              RESOURCES &
              <br />
              MEDIA
            </h2>
            <p
              className="mt-4 font-mono text-xs tracking-wider text-off-white/50"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              [ EXPLORE, DOWNLOAD, WATCH ]
            </p>
          </motion.div>
          <SectionLabel number="05" className="text-off-white/30 mt-2" />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-off-white/70"
        >
          Everything you need to understand our mission, share with your
          network, or bring Beyond Code to your community.
        </motion.p>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Featured video */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="mb-4 font-mono text-xs tracking-wider text-electric-green"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              FEATURED VIDEO
            </p>

            {FEATURED_VIDEO.embedUrl && videoOpen ? (
              <div className="relative aspect-video overflow-hidden bg-true-black">
                <iframe
                  src={FEATURED_VIDEO.embedUrl}
                  title={FEATURED_VIDEO.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            ) : (
              <button
                onClick={() => setVideoOpen(true)}
                className="group relative aspect-video w-full overflow-hidden bg-true-black cursor-pointer"
              >
                <Image
                  src={FEATURED_VIDEO.thumbnailUrl}
                  alt={FEATURED_VIDEO.title}
                  fill
                  className="object-cover opacity-60 transition-opacity group-hover:opacity-80"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="transition-transform group-hover:scale-110">
                    <PlayIcon />
                  </div>
                </div>
                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-true-black/80 to-transparent p-6">
                  <p className="font-heading text-xl text-off-white lg:text-2xl">
                    {FEATURED_VIDEO.title}
                  </p>
                  <p
                    className="mt-1 font-mono text-xs tracking-wider text-off-white/50"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {FEATURED_VIDEO.embedUrl
                      ? "CLICK TO PLAY"
                      : "COMING SOON"}
                  </p>
                </div>
              </button>
            )}
          </motion.div>

          {/* Downloadable resources */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-4 font-mono text-xs tracking-wider text-electric-green"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              DOWNLOADS
            </motion.p>

            <div className="space-y-4">
              {RESOURCES.map((resource, i) => (
                <motion.a
                  key={resource.title}
                  href={resource.href}
                  download
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                  className="group flex items-start gap-4 border border-off-white/10 p-5 transition-all hover:border-electric-green/40 hover:bg-off-white/5"
                >
                  {/* PDF icon */}
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center bg-electric-green/10 transition-colors group-hover:bg-electric-green/20">
                    <span
                      className="font-mono text-xs font-bold text-electric-green"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {resource.type}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-base text-off-white transition-colors group-hover:text-electric-green lg:text-lg">
                      {resource.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-off-white/50">
                      {resource.description}
                    </p>
                  </div>

                  <div className="flex-shrink-0 text-off-white/30 transition-colors group-hover:text-electric-green">
                    <DownloadIcon />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
