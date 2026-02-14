"use client";

import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { motion } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function ShuffleText({
  text,
  texts,
  className = "",
  delay = 0,
  cycleInterval = 20000,
}: {
  text?: string;
  texts?: string[];
  className?: string;
  delay?: number;
  cycleInterval?: number;
}) {
  // Stabilize the array reference so effects don't re-fire every render
  const textsKey = texts ? texts.join("|") : text ?? "";
  const allTexts = useMemo(
    () => texts ?? (text ? [text] : [""]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [textsKey]
  );

  const [displayText, setDisplayText] = useState(allTexts[0]);
  const [hasInitialAnimated, setHasInitialAnimated] = useState(false);
  const shuffleRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cycleRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const indexRef = useRef(0);

  const runShuffle = useCallback(
    (targetText: string, onComplete?: () => void) => {
      let iteration = 0;
      if (shuffleRef.current) clearInterval(shuffleRef.current);

      shuffleRef.current = setInterval(() => {
        setDisplayText(
          targetText
            .split("")
            .map((char, index) => {
              if (char === " " || char === ".") return char;
              if (index < iteration) return targetText[index];
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );

        iteration += 1 / 2;

        if (iteration >= targetText.length) {
          if (shuffleRef.current) clearInterval(shuffleRef.current);
          shuffleRef.current = null;
          setDisplayText(targetText);
          onComplete?.();
        }
      }, 30);
    },
    []
  );

  // Initial animation with delay
  useEffect(() => {
    if (hasInitialAnimated) return;

    const timeout = setTimeout(() => {
      runShuffle(allTexts[0], () => setHasInitialAnimated(true));
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (shuffleRef.current) clearInterval(shuffleRef.current);
    };
  }, [delay, hasInitialAnimated, allTexts, runShuffle]);

  // Cycling through multiple texts after initial animation completes
  useEffect(() => {
    if (!hasInitialAnimated || allTexts.length <= 1) return;

    cycleRef.current = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % allTexts.length;
      runShuffle(allTexts[indexRef.current]);
    }, cycleInterval);

    return () => {
      if (cycleRef.current) clearInterval(cycleRef.current);
      if (shuffleRef.current) clearInterval(shuffleRef.current);
    };
  }, [hasInitialAnimated, allTexts, cycleInterval, runShuffle]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: delay / 1000 }}
      className={className}
    >
      {displayText}
    </motion.span>
  );
}
