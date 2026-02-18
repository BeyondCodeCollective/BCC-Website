"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { GlobeSimple } from "@phosphor-icons/react";
import { SITE } from "@/lib/constants";
import { Logo } from "./ui/logo";

const NAV_KEYS = [
  { key: "about", href: "#about" },
  { key: "initiatives", href: "#initiatives" },
  { key: "partners", href: "#partners" },
  { key: "resources", href: "#resources" },
  { key: "getInvolved", href: "#get-involved" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const switchLocale = (newLocale: "en" | "es") => {
    router.replace(pathname, { locale: newLocale });
  };

  const logoColor = scrolled ? "black" : "white";
  const textColor = scrolled
    ? "text-true-black/70 hover:text-true-black"
    : "text-off-white/70 hover:text-off-white";
  const hamburgerColor = scrolled ? "bg-true-black" : "bg-off-white";
  const toggleActiveColor = scrolled ? "text-true-black" : "text-off-white";
  const toggleInactiveColor = scrolled
    ? "text-true-black/30 hover:text-true-black/60"
    : "text-off-white/30 hover:text-off-white/60";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-off-white/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          {/* Logo — left aligned per brand rules */}
          <a href="#" className="flex-shrink-0">
            <Logo
              variant="stacked"
              color={logoColor}
              className="h-10 w-auto sm:h-12"
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV_KEYS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-mono text-xs tracking-wider uppercase transition-colors ${textColor}`}
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {t(link.key)}
              </a>
            ))}

            {/* Language toggle */}
            <div
              className={`flex items-center gap-0 border font-mono text-xs tracking-wider ${
                scrolled ? "border-true-black/15" : "border-off-white/20"
              }`}
              style={{ fontFamily: "var(--font-mono)" }}
              role="radiogroup"
              aria-label="Language"
            >
              <button
                onClick={() => switchLocale("en")}
                role="radio"
                aria-checked={locale === "en"}
                className={`relative px-3 py-1.5 transition-all ${
                  locale === "en"
                    ? "bg-electric-green text-true-black font-semibold"
                    : scrolled
                    ? "text-true-black/40 hover:text-true-black/70"
                    : "text-off-white hover:text-off-white/80"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => switchLocale("es")}
                role="radio"
                aria-checked={locale === "es"}
                className={`relative px-3 py-1.5 transition-all ${
                  locale === "es"
                    ? "bg-electric-green text-true-black font-semibold"
                    : scrolled
                    ? "text-true-black/40 hover:text-true-black/70"
                    : "text-off-white hover:text-off-white/80"
                }`}
              >
                ES
              </button>
              <div className={`px-2 py-1.5 ${scrolled ? "text-true-black/50" : "text-off-white"}`}>
                <GlobeSimple size={14} weight="bold" />
              </div>
            </div>

            <a
              href={SITE.donateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-electric-green px-6 py-3 font-mono text-xs tracking-wider uppercase text-true-black transition-colors hover:bg-electric-green/80"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("donate")}
            </a>
          </div>

          {/* Mobile: language toggle + hamburger */}
          <div className="flex items-center gap-3 md:hidden">
            <div
              className={`flex items-center gap-0 border font-mono text-[10px] tracking-wider ${
                scrolled ? "border-true-black/15" : "border-off-white/20"
              }`}
              style={{ fontFamily: "var(--font-mono)" }}
              role="radiogroup"
              aria-label="Language"
            >
              <button
                onClick={() => switchLocale("en")}
                role="radio"
                aria-checked={locale === "en"}
                className={`relative px-2 py-1 transition-all ${
                  locale === "en"
                    ? "bg-electric-green text-true-black font-semibold"
                    : scrolled
                    ? "text-true-black/40 hover:text-true-black/70"
                    : "text-off-white hover:text-off-white/80"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => switchLocale("es")}
                role="radio"
                aria-checked={locale === "es"}
                className={`relative px-2 py-1 transition-all ${
                  locale === "es"
                    ? "bg-electric-green text-true-black font-semibold"
                    : scrolled
                    ? "text-true-black/40 hover:text-true-black/70"
                    : "text-off-white hover:text-off-white/80"
                }`}
              >
                ES
              </button>
              <div className={`px-1.5 py-1 ${scrolled ? "text-true-black/50" : "text-off-white"}`}>
                <GlobeSimple size={12} weight="bold" />
              </div>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex flex-col gap-1.5"
              aria-label="Toggle menu"
            >
            <span
              className={`block h-0.5 w-6 transition-transform ${hamburgerColor} ${
                mobileOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 transition-opacity ${hamburgerColor} ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 transition-transform ${hamburgerColor} ${
                mobileOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-start justify-center gap-8 bg-true-black px-8 pt-24"
          >
            {NAV_KEYS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-heading text-4xl text-off-white transition-colors hover:text-electric-green"
              >
                {t(link.key)}
              </a>
            ))}

            {/* Mobile language toggle */}
            <div
              className="flex items-center gap-0 border border-off-white/20 font-mono text-sm tracking-wider"
              style={{ fontFamily: "var(--font-mono)" }}
              role="radiogroup"
              aria-label="Language"
            >
              <button
                onClick={() => {
                  switchLocale("en");
                  setMobileOpen(false);
                }}
                role="radio"
                aria-checked={locale === "en"}
                className={`px-5 py-3 transition-all ${
                  locale === "en"
                    ? "bg-electric-green text-true-black font-semibold"
                    : "text-off-white hover:text-off-white/80"
                }`}
              >
                ENGLISH
              </button>
              <button
                onClick={() => {
                  switchLocale("es");
                  setMobileOpen(false);
                }}
                role="radio"
                aria-checked={locale === "es"}
                className={`px-5 py-3 transition-all ${
                  locale === "es"
                    ? "bg-electric-green text-true-black font-semibold"
                    : "text-off-white hover:text-off-white/80"
                }`}
              >
                ESPA&Ntilde;OL
              </button>
              <div className="px-3 py-3 text-off-white">
                <GlobeSimple size={18} weight="bold" />
              </div>
            </div>

            <a
              href={SITE.donateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 bg-electric-green px-8 py-4 font-mono text-sm tracking-wider uppercase text-true-black"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("donate")}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
