"use client";

import { usePageTransition } from "@/lib/transition-context";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const { isRevealed } = usePageTransition();

  return (
    <div
      style={{
        opacity:    isRevealed ? 1 : 0,
        transition: isRevealed ? "opacity 0.35s ease" : "none",
      }}
    >
      {children}
    </div>
  );
}
