"use client";

import { usePageTransition } from "@/lib/transition-context";

export default function TransitionOverlay() {
  const { overlayPathRef } = usePageTransition();

  return (
    <svg
      style={{
        position:      "fixed",
        inset:         0,
        width:         "100%",
        height:        "100%",
        zIndex:        9999,
        pointerEvents: "none",
      }}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path
        ref={overlayPathRef}
        d="M 0 100 V 100 Q 50 100 100 100 V 100 z"
        fill="#111F30"
      />
    </svg>
  );
}
