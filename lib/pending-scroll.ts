/* ─────────────────────────────────────────────────────────────────────────────
   pendingScroll
   A module-level mutable ref used to hand off a scroll target across
   page navigations.

   Usage:
     – On any page, before calling router.push("/"), set:
         pendingScroll.current = "some-section-id"
     – Navigation reads this on pathname change to "/" and fires scrollToSection.
   ─────────────────────────────────────────────────────────────────────────── */

export const pendingScroll: { current: string | null } = { current: null };
