"use client";

import React, { useState, useEffect, useLayoutEffect, useCallback } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLocale, useT } from "@/lib/locale-context";
import { scrollToSection } from "@/lib/utils";
import { pendingScroll } from "@/lib/pending-scroll";
import { usePageTransition } from "@/lib/transition-context";


export default function Navigation() {
  const { locale, toggleLocale } = useLocale();
  const copy = useT();

  const pathname = usePathname();
  const { navigate } = usePageTransition();

  const forceDark = pathname === "/contact" || pathname === "/services" || pathname === "/news" || pathname === "/invest" || pathname.startsWith("/news/") || pathname === "/blog" || pathname.startsWith("/blog/");

  const [menuOpen,    setMenuOpen]    = useState(false);
  const [introVisible,setIntroVisible]= useState(() => pathname !== "/");
  const [scrollDark,  setScrollDark]  = useState(false);

  // On the landing page, detect which section is behind the nav and switch theme
  useEffect(() => {
    if (pathname !== "/") return;

    const LIGHT_IDS = ["why-uruguay", "how-we-support", "why-sacramentum", "team", "news"];
    const NAV_Y = 60; // vertical midpoint of the nav bar
    let rafId: number;

    const check = () => {
      const inLight = LIGHT_IDS.some(id => {
        const el = document.getElementById(id);
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top <= NAV_Y && r.bottom >= NAV_Y;
      });
      setScrollDark(inLight);
    };

    const onScroll = () => { cancelAnimationFrame(rafId); rafId = requestAnimationFrame(check); };

    window.addEventListener("scroll", onScroll, { passive: true });
    check();
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(rafId); };
  }, [pathname]);

  const isDark = forceDark || scrollDark;

  // On home page: hide nav until intro animation dispatches the event
  useLayoutEffect(() => {
    if (pathname === "/") setIntroVisible(false);
    else setIntroVisible(true);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;
    const handler = () => setIntroVisible(true);
    window.addEventListener("intro-nav-ready", handler);
    return () => window.removeEventListener("intro-nav-ready", handler);
  }, [pathname]);

  // ── Close menu on resize ────────────────────────────────────────────────

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ── Prevent body scroll when mobile menu open ───────────────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // ── Fire pending scroll after navigation ────────────────────────────────
  useEffect(() => {
    if (pathname === "/" && pendingScroll.current) {
      const id = pendingScroll.current;
      pendingScroll.current = null;
      if (id !== "home") {
        const timer = setTimeout(() => {
          scrollToSection(id);
          setIntroVisible(true);
        }, 200);
        return () => clearTimeout(timer);
      }
      // "home" is handled by IntroReveal via sessionStorage skipIntro flag
    }
  }, [pathname]);

  const handleNavClick = useCallback(
    (id: string, href?: string) => {
      setMenuOpen(false);
      if (href) {
        navigate(href);
      } else if (pathname === "/") {
        if (id === "home") setIntroVisible(true);
        scrollToSection(id);
      } else {
        if (id === "home") sessionStorage.setItem("skipIntro", "1");
        else pendingScroll.current = id;
        navigate("/");
      }
    },
    [navigate, pathname]
  );

  const navLinks = [
    { label: copy.nav.home,       id: "home"                          },
    { label: copy.nav.whyUruguay, id: "invest",      href: "/invest"  },
    { label: copy.nav.sectors,    id: "services",    href: "/services"},
    { label: copy.nav.news,       id: "news",        href: "/news"    },
    { label: copy.nav.blog,       id: "blog",        href: "/blog"    },
    { label: copy.nav.contact,    id: "contact",     href: "/contact" },
  ];

  return (
    <>
      <header
        role="banner"
        className={[
          "fixed top-0 left-0 right-0 z-50",
          "flex items-center",
          "transition-all duration-600",
          isDark ? "nav-scrolled" : "bg-transparent",
        ].join(" ")}
        style={{
          paddingTop:    "1.5rem",
          paddingBottom: "1.5rem",
          opacity:       introVisible ? 1 : 0,
          pointerEvents: introVisible ? "auto" : "none",
          transition:    "opacity 0.8s ease",
        }}
      >
        <div
          className="container-site w-full flex items-center justify-between"
          style={{ paddingLeft: "1.25rem", paddingRight: "1.25rem" }}
        >

          {/* ── Logo ─────────────────────────────────────────────────────── */}
          <button
            onClick={() => {
              if (pathname === "/") {
                setIntroVisible(true);
                scrollToSection("home");
              } else {
                sessionStorage.setItem("skipIntro", "1");
                navigate("/");
              }
            }}
            className="relative flex-shrink-0 focus:outline-none focus-visible:outline focus-visible:outline-brand-blue"
            aria-label="Sacramentum Advisors — back to top"
          >
            <Image
              src={isDark ? "/images/LogoAzul.png" : "/images/Logo.png"}
              alt="Sacramentum Advisors"
              width={180}
              height={48}
              className={[
                "h-7 w-auto object-contain transition-all duration-400",
                !isDark ? "brightness-0 invert" : "",
              ].join(" ")}
              priority
            />
          </button>

          {/* ── Desktop links ────────────────────────────────────────────── */}
          <nav
            role="navigation"
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-16"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id, "href" in link ? link.href : undefined)}
                className={[
                  "text-base font-medium tracking-[0.03em]",
                  "transition-colors duration-300 relative group",
                  isDark
                    ? "text-ink-muted hover:text-brand-dark"
                    : "text-white/80 hover:text-white",
                ].join(" ")}
              >
                {link.label}
                <span
                  className={[
                    "absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-300",
                    "group-hover:w-full",
                    isDark ? "bg-brand-warm" : "bg-white/60",
                  ].join(" ")}
                />
              </button>
            ))}

            {/* Language toggle */}
            <button
              onClick={toggleLocale}
              className={[
                "text-sm font-medium tracking-[0.1em] uppercase px-3 py-1.5 border transition-all duration-300",
                isDark
                  ? "border-ink/20 text-ink-muted hover:border-brand-blue hover:text-brand-blue"
                  : "border-white/30 text-white/70 hover:border-white/80 hover:text-white",
              ].join(" ")}
              aria-label={`Switch to ${locale === "de" ? "English" : "German"}`}
            >
              {copy.nav.langToggle}
            </button>
          </nav>

          {/* ── Mobile: lang toggle + hamburger ─────────────────────────── */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleLocale}
              className="text-xs font-medium tracking-[0.1em] uppercase border transition-all duration-300"
              style={{
                borderColor:     isDark ? "rgba(31,41,51,0.25)" : "rgba(255,255,255,0.35)",
                color:           isDark ? "rgba(31,41,51,0.6)"  : "rgba(255,255,255,0.75)",
                width:           "2.2rem",
                height:          "2.2rem",
                display:         "inline-flex",
                alignItems:      "center",
                justifyContent:  "center",
              }}
              aria-label={`Switch to ${locale === "de" ? "English" : "German"}`}
            >
              {copy.nav.langToggle}
            </button>

            <button
              className="flex flex-col gap-1.5 p-2 focus:outline-none"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span className={["block w-6 h-px transition-all duration-300", isDark ? "bg-brand-dark" : "bg-white", menuOpen ? "rotate-45 translate-y-[7px]" : ""].join(" ")} />
              <span className={["block w-6 h-px transition-all duration-300", isDark ? "bg-brand-dark" : "bg-white", menuOpen ? "opacity-0 scale-x-0" : "opacity-100"].join(" ")} />
              <span className={["block w-6 h-px transition-all duration-300", isDark ? "bg-brand-dark" : "bg-white", menuOpen ? "-rotate-45 -translate-y-[7px]" : ""].join(" ")} />
            </button>
          </div>

        </div>
      </header>

      {/* ── Mobile menu overlay ────────────────────────────────────────────── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={[
          "fixed inset-0 z-40 lg:hidden",
          "flex flex-col items-center justify-center gap-2",
          "transition-all duration-500",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        style={{ backgroundColor: "#111F30" }}
      >
        {navLinks.map((link, i) => (
          <button
            key={link.id}
            onClick={() => handleNavClick(link.id, "href" in link ? link.href : undefined)}
            className="text-h3 font-light text-white/80 hover:text-white transition-colors duration-300 py-3"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            {link.label}
          </button>
        ))}
      </div>
    </>
  );
}
