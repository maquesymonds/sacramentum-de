"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatItemProps {
  value:  string;
  label:  string;
  index?: number;
  theme?: "light" | "dark";
}

const EASE = [0.16, 1, 0.3, 1] as const;

// Parses "97%" → { prefix:"", num:97, suffix:"%", decimals:0 }
// Parses "3.5M" → { prefix:"", num:3.5, suffix:"M", decimals:1 }
// Parses "#1"  → { prefix:"#", num:1, suffix:"", decimals:0 }
function parseValue(val: string) {
  const match = val.match(/^([^\d.]*)(\d+\.?\d*)(.*)$/);
  if (!match) return null;
  const [, prefix, numStr, suffix] = match;
  const num      = parseFloat(numStr);
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return { prefix, num, suffix, decimals };
}

export default function StatItem({
  value,
  label,
  index = 0,
  theme = "light",
}: StatItemProps) {
  const isDark = theme === "dark";
  const parsed  = parseValue(value);

  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [displayed, setDisplayed] = useState<string>(
    parsed ? `${parsed.prefix}0${parsed.suffix}` : value
  );

  useEffect(() => {
    if (!inView || !parsed) return;

    const duration = 1600;
    const startTime = Date.now();

    const tick = () => {
      const elapsed  = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased    = 1 - Math.pow(1 - progress, 3);
      const current  = parsed.num * eased;
      setDisplayed(`${parsed.prefix}${current.toFixed(parsed.decimals)}${parsed.suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.1 }}
      className="flex flex-col gap-2"
    >
      {/* Value */}
      <span
        className={cn(
          "font-normal leading-none tracking-tight tabular-nums",
          "text-[3.5rem] sm:text-[4.5rem] lg:text-[5.5rem]",
          isDark ? "text-white" : ""
        )}
        style={!isDark ? { color: "#0F1C2F" } : undefined}
      >
        {displayed}
      </span>

      {/* Divider */}
      <span
        className={cn(
          "block w-8 h-px",
          isDark ? "bg-brand-warm/60" : "bg-brand-warm"
        )}
      />

      {/* Label */}
      <span
        className={cn(
          "text-small leading-snug max-w-[160px]",
          isDark ? "text-white/55" : "text-ink-subtle"
        )}
      >
        {label}
      </span>
    </motion.div>
  );
}
