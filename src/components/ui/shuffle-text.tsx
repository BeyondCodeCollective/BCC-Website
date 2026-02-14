"use client";

import { useEffect, useState, useCallback, useRef } from "react";
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
  const allTexts = texts ?? (text ? [text] : [""]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState(allTexts[0]);
  const [hasInitialAnimated, setHasInitialAnimated] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const runShuffle = useCallback(
    (targetText: string, onComplete?: () => void) => {
      let iteration = 0;
      if (intervalRef.current) clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
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
          if (intervalRef.current) clearInterval(intervalRef.current);
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
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [delay, hasInitialAnimated, allTexts, runShuffle]);

  // Cycling through multiple texts
  useEffect(() => {
    if (!hasInitialAnimated || allTexts.length <= 1) return;

    const cycle = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % allTexts.length;
        runShuffle(allTexts[next]);
        return next;
      });
    }, cycleInterval);

    return () => {
      clearInterval(cycle);
      if (intervalRef.current) clearInterval(intervalRef.current);
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
