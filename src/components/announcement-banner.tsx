"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function AnnouncementBanner() {
  const t = useTranslations("banner");
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-[60] bg-cobalt"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-4 px-6 py-2.5 lg:px-8">
          <Link
            href="/after-the-game"
            className="flex items-center gap-3 text-center"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric-green/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-electric-green" />
            </span>
            <span
              className="font-mono text-xs tracking-wider text-off-white sm:text-sm"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <strong>{t("title")}</strong>
              <span className="hidden sm:inline">
                {" "}
                — {t("description")}
              </span>{" "}
              <span className="underline underline-offset-2">{t("cta")}</span>
            </span>
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="absolute right-4 flex-shrink-0 p-1 text-off-white/50 transition-colors hover:text-off-white lg:right-8"
            aria-label="Dismiss"
          >
            <X size={14} weight="bold" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/** Spacer to offset fixed banner height */
export function AnnouncementBannerSpacer() {
  return <div className="h-[36px]" />;
}
