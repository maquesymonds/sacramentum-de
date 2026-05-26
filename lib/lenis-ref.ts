/* ─────────────────────────────────────────────────────────────────────────────
   Lenis singleton ref
   A plain mutable object — safe to import on both server and client because
   no browser APIs are called at module evaluation time.
   SmoothScrollProvider assigns .current when Lenis initialises.
   scrollToSection reads .current to hand off scrolling to Lenis.
   ─────────────────────────────────────────────────────────────────────────── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const lenisRef: { current: any } = { current: null };
