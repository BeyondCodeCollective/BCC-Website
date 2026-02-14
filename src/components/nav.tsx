"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { Logo } from "./ui/logo";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const logoColor = scrolled ? "black" : "white";
  const textColor = scrolled
    ? "text-true-black/70 hover:text-true-black"
    : "text-off-white/70 hover:text-off-white";
  const hamburgerColor = scrolled ? "bg-true-black" : "bg-off-white";

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
          <a href="#" className="flex-shrink-0 flex items-center gap-3">
            <Logo variant="monogram" color={logoColor} className="h-8 w-auto" />
            <Logo
              variant="stacked"
              color={logoColor}
              className="hidden text-sm sm:block"
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-mono text-xs tracking-wider uppercase transition-colors ${textColor}`}
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {link.label}
              </a>
            ))}
            <a
              href={SITE.donateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-electric-green px-6 py-3 font-mono text-xs tracking-wider uppercase text-true-black transition-colors hover:bg-electric-green/80"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Donate
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col gap-1.5 md:hidden"
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
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-heading text-4xl text-off-white transition-colors hover:text-electric-green"
              >
                {link.label}
              </a>
            ))}
            <a
              href={SITE.donateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 bg-electric-green px-8 py-4 font-mono text-sm tracking-wider uppercase text-true-black"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Donate
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
