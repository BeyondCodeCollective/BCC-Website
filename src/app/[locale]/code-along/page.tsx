"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { LockSimple, Play, YoutubeLogo } from "@phosphor-icons/react";
import { Nav } from "@/components/nav";
import { useTranslations } from "next-intl";

// Code Along brand palette (from the S6 brand board)
const VOID = "#081526";
const SIGNAL = "#91c0d1";
const MINT = "#edfefa";
const NEON = "#F4FF70"; // sampled from the host-circle ring art

// Code Along streams on the Black Girls Code channel.
const CHANNEL_URL: string | null = "https://www.youtube.com/@blackgirlscode";
const SUBSCRIBE_URL = "https://www.youtube.com/@blackgirlscode?sub_confirmation=1";

// Set to the final trailer's YouTube ID when it's ready — until then the
// trailer section shows a "coming soon" placeholder.
const TRAILER_ID: string | null = null;

// Season launches Saturday, September 12, 2026 (noon ET). Drop each episode's YouTube ID
// here as it goes live — cards flip from locked stills to playable embeds.
const PREMIERE_DATE = new Date("2026-09-12T12:00:00-04:00");
const EPISODES: { num: number; thumb: string; youtubeId: string | null }[] = [
  { num: 1, thumb: "/images/code-along/ep-1.jpg", youtubeId: null },
  { num: 2, thumb: "/images/code-along/ep-2.jpg", youtubeId: null },
  { num: 3, thumb: "/images/code-along/ep-3.jpg", youtubeId: null },
  { num: 4, thumb: "/images/code-along/ep-4.jpg", youtubeId: null },
];

const HOSTS = [
  { img: "/images/code-along/host-2.png", name: "Destiney Williams" },
  { img: "/images/code-along/host-1.png", name: "Daniel Ray" },
];

const GUESTS = [
  {
    img: "/images/code-along/guest-jalaiah.png",
    name: "Jalaiah Harmon",
    roleKey: "guestRoleInfluencer",
  },
  {
    img: "/images/code-along/guest-fernanda.png",
    name: "Dr. Fernanda Sulantay Vargas",
    roleKey: "guestRoleModel",
  },
] as const;

function useCountdown(target: Date) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) return null;
  const diff = Math.max(0, target.getTime() - now.getTime());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1_000) % 60,
    live: diff === 0,
  };
}

function TrailerEmbed({ title, comingSoon }: { title: string; comingSoon: string }) {
  const [playing, setPlaying] = useState(false);

  if (!TRAILER_ID) {
    return (
      // The playlist card art is self-framed (neon border baked in), so it
      // gets no decorative frame of its own — that would read as a double
      // border. The trailer branch below keeps the frame: a YouTube
      // thumbnail has no border of its own.
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src="/images/code-along/playlist-card-v4.png"
          alt={title}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 896px, 100vw"
        />
        <span className="absolute top-5 right-5">
          <span
            className="px-5 py-2.5 font-mono text-sm tracking-wider"
            style={{ fontFamily: "var(--font-mono)", backgroundColor: VOID, color: NEON }}
          >
            {comingSoon}
          </span>
        </span>
      </div>
    );
  }
  return (
    <div
      className="group relative aspect-video w-full overflow-hidden"
      style={{ backgroundColor: VOID, boxShadow: `10px 10px 0 ${NEON}` }}
    >
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${TRAILER_ID}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          onClick={() => setPlaying(true)}
          aria-label={title}
          className="absolute inset-0"
        >
          <Image
            src={`https://i.ytimg.com/vi/${TRAILER_ID}/hqdefault.jpg`}
            alt={title}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(min-width: 1024px) 896px, 100vw"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-true-black/20 transition-colors group-hover:bg-true-black/10">
            <span
              className="flex h-20 w-20 items-center justify-center rounded-full transition-transform group-hover:scale-110"
              style={{ backgroundColor: NEON, color: VOID }}
            >
              <Play size={32} weight="fill" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

function EpisodeCard({
  episode,
  title,
  label,
  lockedLabel,
  index,
}: {
  episode: (typeof EPISODES)[number];
  title: string;
  label: string;
  lockedLabel: string;
  index: number;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.08 * index, duration: 0.5 }}
    >
      <div
        className="group relative aspect-video w-full overflow-hidden"
        style={{ backgroundColor: VOID, boxShadow: `8px 8px 0 ${SIGNAL}` }}
      >
        {playing && episode.youtubeId ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${episode.youtubeId}?autoplay=1`}
            title={`${label} ${episode.num}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <>
            <Image
              src={episode.thumb}
              alt={`${label} ${episode.num}`}
              fill
              className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                episode.youtubeId ? "" : "opacity-60 saturate-[.6]"
              }`}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
            {episode.youtubeId ? (
              <button
                onClick={() => setPlaying(true)}
                aria-label={`Play ${label} ${episode.num}`}
                className="absolute inset-0 flex items-center justify-center"
              >
                <span
                  className="flex h-16 w-16 items-center justify-center rounded-full transition-transform group-hover:scale-110"
                  style={{ backgroundColor: NEON, color: VOID }}
                >
                  <Play size={28} weight="fill" />
                </span>
              </button>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-true-black/40">
                <LockSimple size={24} weight="bold" className="text-off-white/80" />
                <span
                  className="font-mono text-xs tracking-wider text-off-white/80"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {lockedLabel}
                </span>
              </div>
            )}
            <div
              className="absolute bottom-0 left-0 px-3 py-1.5"
              style={{ backgroundColor: NEON }}
            >
              <span
                className="font-mono text-xs tracking-wider uppercase"
                style={{ fontFamily: "var(--font-mono)", color: VOID }}
              >
                {label} {String(episode.num).padStart(2, "0")}
              </span>
            </div>
          </>
        )}
      </div>
      <p
        className="mt-4 font-heading text-lg leading-tight"
        style={{ color: VOID }}
      >
        {title}
      </p>
    </motion.div>
  );
}

export default function CodeAlong() {
  const t = useTranslations("codeAlong");
  const countdown = useCountdown(PREMIERE_DATE);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          email: email.trim(),
          segment: "Code Along - Season 1",
          source: "code-along-landing",
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to subscribe");
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("error"));
    } finally {
      setLoading(false);
    }
  };

  // Read stats array (same pattern as the ATG page)
  const stats: { stat: string; label: string }[] = [];
  let si = 0;
  while (t.has(`stats.${si}.stat`)) {
    stats.push({ stat: t(`stats.${si}.stat`), label: t(`stats.${si}.label`) });
    si++;
  }

  const countdownUnits = countdown
    ? ([
        [countdown.days, t("days")],
        [countdown.hours, t("hours")],
        [countdown.minutes, t("minutes")],
        [countdown.seconds, t("seconds")],
      ] as const)
    : null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: MINT }}>
      <Nav variant="light" />

      {/* Hero — light, brand-first */}
      <section
        className="relative overflow-hidden px-6 pt-32 pb-16 lg:px-8 lg:pt-36 lg:pb-20"
        style={{ backgroundColor: MINT }}
      >
        {/* soft signal-blue glow accents */}
        <div
          className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full opacity-40 blur-3xl"
          style={{ backgroundColor: SIGNAL }}
        />
        <div
          className="pointer-events-none absolute -bottom-32 -right-24 h-[28rem] w-[28rem] rounded-full opacity-60 blur-3xl"
          style={{ backgroundColor: NEON }}
        />
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-5"
          >
            <span
              className="px-4 py-2 font-mono text-xs tracking-wider"
              style={{
                fontFamily: "var(--font-mono)",
                backgroundColor: VOID,
                color: NEON,
              }}
            >
              {t("premiereBadge")}
            </span>
            <Image
              src="/images/code-along/logo-music.png"
              alt="Code Along Beyond: Music"
              width={1080}
              height={1080}
              className="mx-auto h-36 w-auto sm:h-44 lg:h-52"
              priority
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mx-auto mt-8 max-w-3xl font-heading text-[clamp(2.5rem,7vw,5rem)] leading-[0.9]"
            style={{ color: VOID }}
          >
            {t("headline1")}{" "}
            <span
              className="mt-3 inline-block px-3 pb-2 pt-1"
              style={{ backgroundColor: NEON }}
            >
              {t("headline2")}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mx-auto mt-4 font-mono text-xs tracking-wider"
            style={{ fontFamily: "var(--font-mono)", color: `${VOID}99` }}
          >
            {t("poweredBy")}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed sm:text-lg"
            style={{ color: `${VOID}B3` }}
          >
            {t("description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="mx-auto mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <a
              href={SUBSCRIBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 font-mono text-xs tracking-wider uppercase transition-opacity hover:opacity-85 sm:px-8 sm:py-4 sm:text-sm"
              style={{
                fontFamily: "var(--font-mono)",
                backgroundColor: VOID,
                color: NEON,
              }}
            >
              {t("subscribeCta")} &rarr;
            </a>
            <a
              href="#episodes"
              className="border px-5 py-3 font-mono text-xs tracking-wider uppercase transition-colors sm:px-8 sm:py-4 sm:text-sm"
              style={{
                fontFamily: "var(--font-mono)",
                borderColor: `${VOID}66`,
                color: VOID,
              }}
            >
              {t("episodesCta")}
            </a>
          </motion.div>

          {/* Show still as a framed media card — bright, no dark overlay */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="relative mx-auto mt-12 max-w-3xl"
          >
            <div
              className="relative aspect-video w-full overflow-hidden"
              style={{ boxShadow: `12px 12px 0 ${SIGNAL}` }}
            >
              <Image
                src="/images/code-along/hero-still.jpg"
                alt="Destiney Williams and Daniel Ray on the Code Along set"
                fill
                className="object-cover object-top"
                sizes="(min-width: 1024px) 768px, 100vw"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Countdown band — the one dark brand moment */}
      <section
        className="px-6 py-10 lg:px-8"
        style={{ backgroundColor: VOID }}
      >
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 sm:flex-row sm:justify-between">
          <p
            className="font-mono text-xs tracking-wider uppercase"
            style={{ fontFamily: "var(--font-mono)", color: MINT }}
          >
            {t("countdownLabel")}
          </p>
          <div className="flex gap-6 sm:gap-10" aria-live="off">
            {countdownUnits ? (
              countdownUnits.map(([value, unit]) => (
                <div key={unit} className="text-center">
                  <p
                    className="font-heading text-4xl leading-none tabular-nums sm:text-5xl"
                    style={{ color: NEON }}
                  >
                    {String(value).padStart(2, "0")}
                  </p>
                  <p
                    className="mt-1.5 font-mono text-xs tracking-wider uppercase text-off-white/50"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {unit}
                  </p>
                </div>
              ))
            ) : (
              <p
                className="font-heading text-4xl leading-none sm:text-5xl"
                style={{ color: NEON }}
              >
                08.08
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Trailer — shows a coming-soon placeholder until TRAILER_ID is set */}
      <section
        className="px-6 py-16 lg:px-8 lg:py-24"
        style={{ backgroundColor: SIGNAL }}
      >
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <p
                className="font-mono text-xs tracking-wider"
                style={{ fontFamily: "var(--font-mono)", color: `${VOID}99` }}
              >
                {t("trailerLabel")}
              </p>
              <h2
                className="mt-4 font-heading text-[clamp(1.75rem,4vw,3rem)] leading-[0.9]"
                style={{ color: VOID }}
              >
                {t("trailerHeadline")}
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="mt-10"
            >
              <TrailerEmbed title={t("trailerHeadline")} comingSoon={t("trailerComingSoon")} />
            </motion.div>
        </div>
      </section>

      {/* Stats — big and readable */}
      <section className="px-6 py-16 lg:px-8 lg:py-20" style={{ backgroundColor: MINT }}>
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-4">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              className="text-center"
            >
              <p
                className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] leading-none"
                style={{ color: VOID }}
              >
                {item.stat}
              </p>
              <p
                className="mt-3 font-mono text-xs tracking-wider uppercase sm:text-sm"
                style={{ fontFamily: "var(--font-mono)", color: `${VOID}99` }}
              >
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Episodes */}
      <section id="episodes" className="bg-white px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p
              className="inline-block px-3 py-1 font-mono text-xs tracking-wider"
              style={{
                fontFamily: "var(--font-mono)",
                backgroundColor: NEON,
                color: VOID,
              }}
            >
              {t("episodesLabel")}
            </p>
            <h2
              className="mt-5 font-heading text-[clamp(1.75rem,4vw,3rem)] leading-[0.9]"
              style={{ color: VOID }}
            >
              {t("episodesHeadline1")}
              <br />
              {t("episodesHeadline2")}
            </h2>
            <p
              className="mx-auto mt-4 max-w-xl text-sm leading-relaxed"
              style={{ color: `${VOID}99` }}
            >
              {t("episodesNote")}
            </p>
          </motion.div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-10 sm:grid-cols-2 lg:gap-12">
            {EPISODES.map((episode, i) => (
              <EpisodeCard
                key={episode.num}
                episode={episode}
                title={t(`episodeTitles.${i}`)}
                label={t("episode")}
                lockedLabel={t("lockedLabel")}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About the show */}
      <section className="px-6 py-16 lg:px-8 lg:py-24" style={{ backgroundColor: MINT }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto grid max-w-5xl items-center gap-8 lg:grid-cols-2 lg:gap-12"
        >
          <div>
            <p
              className="inline-block px-3 py-1 font-mono text-xs tracking-wider"
              style={{
                fontFamily: "var(--font-mono)",
                backgroundColor: SIGNAL,
                color: VOID,
              }}
            >
              {t("aboutLabel")}
            </p>
            <h2
              className="mt-5 font-heading text-[clamp(1.75rem,4vw,2.5rem)] leading-[0.9]"
              style={{ color: VOID }}
            >
              {t("aboutHeadline1")}
              <br />
              {t("aboutHeadline2")}
            </h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: `${VOID}B3` }}>
              {t("aboutText1")}
            </p>
            <p className="mt-4 text-base leading-relaxed" style={{ color: `${VOID}B3` }}>
              {t("aboutText2")}
            </p>
            {CHANNEL_URL && (
              <a
                href={CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase underline-offset-4 transition-opacity hover:opacity-70"
                style={{ fontFamily: "var(--font-mono)", color: VOID }}
              >
                <YoutubeLogo size={18} weight="fill" />
                {t("channelCta")}
              </a>
            )}
          </div>
          <div
            className="relative aspect-video w-full overflow-hidden"
            style={{ boxShadow: `10px 10px 0 ${NEON}` }}
          >
            <Image
              src="/images/code-along/about-duo.jpg"
              alt="Code Along hosts on set"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </motion.div>
      </section>

      {/* Cast — hosts + guests */}
      <section className="px-6 py-16 lg:px-8 lg:py-24" style={{ backgroundColor: SIGNAL }}>
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="inline-block px-3 py-1 font-mono text-xs tracking-wider"
              style={{
                fontFamily: "var(--font-mono)",
                backgroundColor: VOID,
                color: NEON,
              }}
            >
              {t("hostsLabel")}
            </p>
            <h2
              className="mt-5 font-heading text-[clamp(1.75rem,4vw,2.5rem)] leading-[0.9]"
              style={{ color: VOID }}
            >
              {t("hostsHeadline1")}
              <br />
              {t("hostsHeadline2")}
            </h2>
            <p
              className="mx-auto mt-4 max-w-2xl text-base leading-relaxed"
              style={{ color: `${VOID}B3` }}
            >
              {t("hostsText")}
            </p>
          </motion.div>

          <div className="mt-12 flex flex-col items-center justify-center gap-10 sm:flex-row sm:gap-14">
            {HOSTS.map((host, i) => (
              <motion.div
                key={host.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 * i, duration: 0.5 }}
              >
                <Image
                  src={host.img}
                  alt={host.name}
                  width={640}
                  height={640}
                  className="h-48 w-48 sm:h-60 sm:w-60"
                />
                <p className="mt-4 font-heading text-xl" style={{ color: VOID }}>
                  {host.name}
                </p>
                <p
                  className="mt-1 font-mono text-xs tracking-wider uppercase"
                  style={{ fontFamily: "var(--font-mono)", color: `${VOID}99` }}
                >
                  {t("hostRole")}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Featured guests */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 font-mono text-xs tracking-wider uppercase"
            style={{ fontFamily: "var(--font-mono)", color: `${VOID}99` }}
          >
            {t("guestsLabel")}
          </motion.p>
          <div className="mt-8 flex flex-col items-center justify-center gap-10 sm:flex-row sm:gap-14">
            {GUESTS.map((guest, i) => (
              <motion.div
                key={guest.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 * i, duration: 0.5 }}
              >
                <Image
                  src={guest.img}
                  alt={guest.name}
                  width={640}
                  height={640}
                  className="h-40 w-40 sm:h-48 sm:w-48"
                />
                <p className="mt-4 font-heading text-lg" style={{ color: VOID }}>
                  {guest.name}
                </p>
                <p
                  className="mt-1 font-mono text-xs tracking-wider uppercase"
                  style={{ fontFamily: "var(--font-mono)", color: `${VOID}99` }}
                >
                  {t(guest.roleKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Powered by Beyond Code Collective */}
      <section className="bg-white px-6 py-16 lg:px-8 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p
            className="font-mono text-xs tracking-wider"
            style={{ fontFamily: "var(--font-mono)", color: `${VOID}99` }}
          >
            {t("poweredLabel")}
          </p>
          <p
            className="mt-4 font-heading text-[clamp(2rem,5vw,3.5rem)] leading-[0.9]"
            style={{ color: VOID }}
          >
            BEYOND CODE COLLECTIVE
          </p>
          <p
            className="mx-auto mt-4 max-w-xl text-base leading-relaxed"
            style={{ color: `${VOID}99` }}
          >
            {t("poweredText")}
          </p>
        </motion.div>
      </section>

      {/* Notify signup — neon closer */}
      <section
        id="notify"
        className="px-6 py-16 lg:px-8 lg:py-24"
        style={{ backgroundColor: NEON }}
      >
        <div className="mx-auto max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {submitted ? (
              <div className="p-8" style={{ backgroundColor: VOID }}>
                <p className="font-heading text-3xl" style={{ color: NEON }}>
                  {t("successTitle")}
                </p>
                <p className="mt-2 text-off-white/80">{t("successMessage")}</p>
              </div>
            ) : (
              <>
                <p
                  className="font-mono text-xs tracking-wider"
                  style={{ fontFamily: "var(--font-mono)", color: `${VOID}B3` }}
                >
                  {t("formLabel")}
                </p>
                <h2
                  className="mt-4 font-heading text-[clamp(1.75rem,4vw,2.5rem)] leading-[0.9]"
                  style={{ color: VOID }}
                >
                  {t("formHeadline1")}
                  <br />
                  {t("formHeadline2")}
                </h2>
                <p className="mt-4 text-sm" style={{ color: `${VOID}B3` }}>
                  {t("formDescription")}
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="mt-8 flex flex-col gap-3 text-left"
                >
                  <input
                    type="text"
                    required
                    placeholder={t("firstName")}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={loading}
                    className="w-full border bg-white px-4 py-3 focus:outline-none disabled:opacity-50"
                    style={{ borderColor: `${VOID}33`, color: VOID }}
                  />
                  <input
                    type="email"
                    required
                    placeholder={t("email")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="w-full border bg-white px-4 py-3 focus:outline-none disabled:opacity-50"
                    style={{ borderColor: `${VOID}33`, color: VOID }}
                  />
                  {error && (
                    <p className="font-mono text-xs text-orange">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-3 font-mono text-sm tracking-wider uppercase transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50"
                    style={{
                      fontFamily: "var(--font-mono)",
                      backgroundColor: VOID,
                      color: NEON,
                    }}
                  >
                    {loading ? t("submitting") : t("submit")}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="border-t px-6 py-8 lg:px-8"
        style={{ backgroundColor: MINT, borderColor: `${VOID}1A` }}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <a
            href="/"
            className="font-mono text-xs tracking-wider transition-opacity hover:opacity-70"
            style={{ fontFamily: "var(--font-mono)", color: `${VOID}66` }}
          >
            {t("back")}
          </a>
          <p
            className="font-mono text-xs tracking-wider"
            style={{ fontFamily: "var(--font-mono)", color: `${VOID}4D` }}
          >
            &copy; {new Date().getFullYear()} BEYOND CODE COLLECTIVE
          </p>
        </div>
      </footer>
    </div>
  );
}
