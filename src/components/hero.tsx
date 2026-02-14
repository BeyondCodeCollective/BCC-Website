"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ShuffleText } from "./ui/shuffle-text";
import { useQuiz } from "./quiz-modal";

const COMMUNITY_PHOTOS = [
  {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=800&fit=crop",
    alt: "People collaborating on tech project",
  },
  {
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=800&fit=crop",
    alt: "Team working together",
  },
  {
    src: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=800&fit=crop",
    alt: "Person coding on laptop",
  },
  {
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=800&fit=crop",
    alt: "Group learning session",
  },
  {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=800&fit=crop",
    alt: "Workshop in progress",
  },
  {
    src: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&h=800&fit=crop",
    alt: "Young people in tech",
  },
  {
    src: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=600&h=800&fit=crop",
    alt: "Working on computer",
  },
];

// Floating face tiles representing learners across the community
const FLOATING_FACES = [
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face", alt: "Learner" },
  { src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face", alt: "Learner" },
  { src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&crop=face", alt: "Learner" },
  { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=face", alt: "Learner" },
  { src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face", alt: "Learner" },
  { src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=face", alt: "Learner" },
  { src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face", alt: "Learner" },
  { src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face", alt: "Learner" },
  { src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&h=120&fit=crop&crop=face", alt: "Learner" },
  { src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=face", alt: "Learner" },
  { src: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=120&h=120&fit=crop&crop=face", alt: "Learner" },
  { src: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=120&h=120&fit=crop&crop=face", alt: "Learner" },
];

const FACE_POSITIONS = FLOATING_FACES.map((face, i) => ({
  ...face,
  id: i,
  size: 48 + Math.floor(i % 3) * 20,
  x: (i * 8.3) % 95,
  y: (i * 13 + 5) % 90,
  duration: 10 + (i % 4) * 3,
  delay: i * 0.4,
}));

export function Hero() {
  const { openQuiz } = useQuiz();
  const [activePhoto, setActivePhoto] = useState(0);

  return (
    <section className="relative min-h-screen bg-true-black px-6 pt-32 pb-16 lg:px-8 overflow-hidden">
      {/* Floating learner faces background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {FACE_POSITIONS.map((face) => (
          <motion.div
            key={face.id}
            className="absolute overflow-hidden border border-off-white/10"
            style={{
              width: face.size,
              height: face.size,
              left: `${face.x}%`,
              top: `${face.y}%`,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.12, 0.22, 0.1, 0.18, 0.12],
              y: [0, -20, 8, -12, 0],
              x: [0, 8, -6, 4, 0],
            }}
            transition={{
              duration: face.duration,
              repeat: Infinity,
              delay: face.delay,
              ease: "easeInOut",
            }}
          >
            <Image
              src={face.src}
              alt={face.alt}
              fill
              className="object-cover"
              sizes={`${face.size}px`}
            />
          </motion.div>
        ))}

        {/* Large subtle BCC bracket in background */}
        <motion.div
          className="absolute right-[-5%] top-[15%] font-heading text-[20rem] leading-none text-off-white/[0.03] select-none lg:text-[30rem]"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          [ ]
        </motion.div>
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Main headline + featured photo */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-end">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-heading text-[clamp(4rem,12vw,10rem)] leading-[0.85] text-off-white"
            >
              <ShuffleText text="EVERYONE" delay={200} />
              <br />
              <ShuffleText
                texts={["BUILDS.", "GROWS.", "LEARNS.", "LEADS."]}
                delay={600}
                cycleInterval={20000}
              />
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-8"
            >
              <p
                className="text-electric-green font-mono text-sm tracking-wider"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                // BEYOND CODE COLLECTIVE //
              </p>
              <p
                className="mt-1 text-grey-3 font-mono text-xs tracking-wider"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                &lt; FOR THE FUTURE &gt;
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="mt-8 max-w-md text-lg leading-relaxed text-grey-2"
            >
              Beyond Code Collective provides human-powered resources for a
              tech-driven world. Building intergenerational equity in the
              technologies of today and tomorrow.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <button
                onClick={() => openQuiz()}
                className="bg-electric-green px-10 py-4 font-mono text-sm tracking-wider uppercase text-true-black transition-colors hover:bg-electric-green/80"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Get Started &rarr;
              </button>
              <a
                href="#get-involved"
                className="border border-off-white/30 px-8 py-4 font-mono text-sm tracking-wider uppercase text-off-white/70 transition-all hover:border-off-white hover:text-off-white"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Join Newsletter
              </a>
            </motion.div>
          </div>

          {/* Featured photo — swaps when thumbnails are clicked */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-[3/4] max-h-[500px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePhoto}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={COMMUNITY_PHOTOS[activePhoto].src}
                    alt={COMMUNITY_PHOTOS[activePhoto].alt}
                    fill
                    className="object-cover"
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Photo counter overlay */}
              <span
                className="absolute bottom-4 left-4 bg-true-black/60 px-3 py-1 font-mono text-xs tracking-wider text-off-white backdrop-blur-sm"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                [{String(activePhoto + 1).padStart(2, "0")}] OF [
                {String(COMMUNITY_PHOTOS.length).padStart(2, "0")}]
              </span>
            </div>
          </motion.div>
        </div>

        {/* Community photo selector row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="mt-16"
        >
          <p
            className="mb-4 text-electric-green font-mono text-xs tracking-wider"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            OUR COMMUNITY
          </p>
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {COMMUNITY_PHOTOS.map((photo, i) => (
              <button
                key={i}
                onClick={() => setActivePhoto(i)}
                className={`relative h-20 w-20 flex-shrink-0 overflow-hidden transition-all cursor-pointer ${
                  activePhoto === i
                    ? "opacity-100 ring-2 ring-electric-green"
                    : "opacity-40 hover:opacity-70"
                }`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
                <span
                  className="absolute bottom-1 left-1 text-off-white font-mono text-[10px]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  [{String(i + 1).padStart(2, "0")}]
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
