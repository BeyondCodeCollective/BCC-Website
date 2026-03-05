"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

interface PartnershipsContextType {
  openPartnerships: () => void;
  closePartnerships: () => void;
}

const PartnershipsContext = createContext<PartnershipsContextType>({
  openPartnerships: () => {},
  closePartnerships: () => {},
});

export function usePartnerships() {
  return useContext(PartnershipsContext);
}

const SEGMENT_KEYS = [
  "student",
  "learner",
  "parent",
  "careerChanger",
  "employer",
  "partnerDonor",
] as const;

export function PartnershipsProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [segment, setSegment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const tp = useTranslations("partnerships");
  const tf = useTranslations("form");
  const ts = useTranslations("segments");

  const openPartnerships = useCallback(() => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closePartnerships = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = "";
    setTimeout(() => {
      setFirstName("");
      setEmail("");
      setPhone("");
      setSegment("");
      setSubmitted(false);
      setError("");
    }, 300);
  }, []);

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(closePartnerships, 2000);
      return () => clearTimeout(timer);
    }
  }, [submitted, closePartnerships]);

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
          phone: phone.trim(),
          segment,
          source: "partnerships",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit");
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : tf("somethingWentWrong")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <PartnershipsContext.Provider value={{ openPartnerships, closePartnerships }}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-true-black/95 px-6"
          >
            <button
              onClick={closePartnerships}
              className="absolute top-4 right-4 flex items-center gap-2 font-mono text-xs tracking-wider text-off-white/60 transition-colors hover:text-off-white lg:top-6 lg:right-6"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {tp("close")}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="stroke-current"
              >
                <path
                  d="M4 4L12 12M12 4L4 12"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="w-full max-w-md"
            >
              {submitted ? (
                <div className="bg-electric-green p-8 text-center">
                  <p className="font-heading text-3xl text-true-black">
                    {tp("thanks")}
                  </p>
                  <p className="mt-2 text-true-black/70">
                    {tp("wellReachOut")}
                  </p>
                </div>
              ) : (
                <>
                  <p
                    className="mb-6 font-mono text-xs tracking-wider text-electric-green"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {tp("label")}
                  </p>
                  <h2 className="font-heading text-[clamp(2rem,5vw,3.5rem)] leading-[0.85] text-off-white">
                    {tp("headline1")}
                    <br />
                    {tp("headline2")}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-off-white/60 lg:text-base">
                    {tp("description")}
                  </p>

                  <form
                    onSubmit={handleSubmit}
                    className="mt-8 flex flex-col gap-3"
                  >
                    <input
                      type="text"
                      required
                      placeholder={tf("firstName")}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      disabled={loading}
                      className="w-full border border-off-white/20 bg-off-white/5 px-4 py-3 text-off-white placeholder:text-off-white/30 focus:border-electric-green focus:outline-none disabled:opacity-50"
                    />
                    <input
                      type="email"
                      required
                      placeholder={tf("email")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      className="w-full border border-off-white/20 bg-off-white/5 px-4 py-3 text-off-white placeholder:text-off-white/30 focus:border-electric-green focus:outline-none disabled:opacity-50"
                    />
                    <input
                      type="tel"
                      placeholder={tf("phone")}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={loading}
                      className="w-full border border-off-white/20 bg-off-white/5 px-4 py-3 text-off-white placeholder:text-off-white/30 focus:border-electric-green focus:outline-none disabled:opacity-50"
                    />
                    <select
                      value={segment}
                      onChange={(e) => setSegment(e.target.value)}
                      disabled={loading}
                      className="w-full border border-off-white/20 bg-off-white/5 px-4 py-3 text-off-white focus:border-electric-green focus:outline-none appearance-none disabled:opacity-50"
                    >
                      <option value="" className="bg-true-black">
                        {tf("iAmAOptional")}
                      </option>
                      {SEGMENT_KEYS.map((key) => (
                        <option key={key} value={ts(key)} className="bg-true-black">
                          {ts(key)}
                        </option>
                      ))}
                    </select>
                    {error && (
                      <p className="text-orange font-mono text-xs">{error}</p>
                    )}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-electric-green px-6 py-3 font-mono text-sm tracking-wider uppercase text-true-black transition-colors hover:bg-electric-green/80 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {loading ? tp("submitting") : tp("connect")}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PartnershipsContext.Provider>
  );
}
