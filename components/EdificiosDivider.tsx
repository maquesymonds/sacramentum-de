"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";

export default function EdificiosDivider() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY               = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const backgroundPosition = useMotionTemplate`center ${bgY}`;

  return (
    <motion.div
      ref={ref}
      style={{
        width:              "100%",
        height:             "60vh",
        backgroundImage:    "url('/images/edificios-divider.webp')",
        backgroundSize:     "cover",
        backgroundPosition,
        backgroundRepeat:   "no-repeat",
        WebkitMaskImage:    "linear-gradient(to bottom, black 70%, transparent 100%)",
        maskImage:          "linear-gradient(to bottom, black 70%, transparent 100%)",
      }}
    />
  );
}
