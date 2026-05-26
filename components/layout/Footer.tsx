"use client";

/* ─────────────────────────────────────────────────────────────────────────────
   Footer — Sacramentum Advisors
   ─────────────────────────────────────────────────────────────────────────────
   Structure:
     • Dark panel (--color-dark #1F2933)
     • 4-column grid: Brand | Navigation | Services | Contact
     • Bottom legal bar: copyright · privacy · terms
     • Logo inverted to white via CSS filter
     • All copy from translations — bilingual-ready

   Hover states:
     • Nav & service links: muted cream → full cream, 0.2s ease
     • Email: warm accent on hover
     • No flashy transforms — editorial restraint

   Motion:
     • Framer Motion whileInView fadeUp on the main grid
     • Bottom bar fades in slightly later
   ─────────────────────────────────────────────────────────────────────────── */

import Image       from "next/image";
import { motion }  from "framer-motion";
import { useLocale, useT } from "@/lib/locale-context";

import { useRouter, usePathname } from "next/navigation";
import { scrollToSection } from "@/lib/utils";
import { pendingScroll }   from "@/lib/pending-scroll";

// ── Easing ────────────────────────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: "-40px" },
  transition:  { duration: 0.75, ease: EASE, delay },
});

// ── Inline SVG icons ──────────────────────────────────────────────────────────
function IconLocation() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 18" fill="none" aria-hidden="true">
      <path
        d="M7 1C4.24 1 2 3.24 2 6c0 3.75 5 11 5 11s5-7.25 5-11c0-2.76-2.24-5-5-5Z"
        stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"
      />
      <circle cx="7" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.4"/>
    </svg>
  );
}

function IconMail() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 13" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="14" height="11" rx="1.5"
        stroke="currentColor" strokeWidth="1.4"/>
      <path d="M1 3.5L8 8l7-4.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>
  );
}

// ── Column heading ────────────────────────────────────────────────────────────
function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-eyebrow mb-6"
      style={{
        color:         "var(--color-warm)",
        fontSize:      "0.65rem",
        letterSpacing: "0.13em",
        opacity:       0.9,
      }}
    >
      {children}
    </p>
  );
}

// ── Footer link ───────────────────────────────────────────────────────────────
function FooterLink({
  href,
  onClick,
  children,
}: {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const baseStyle: React.CSSProperties = {
    display:     "block",
    color:       "rgba(250,250,248,0.5)",
    fontSize:    "0.9rem",
    lineHeight:  1.5,
    marginBottom:"0.55rem",
    cursor:      "pointer",
    transition:  "color 0.2s ease",
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.color = "rgba(250,250,248,0.9)";
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.color = "rgba(250,250,248,0.5)";
  };

  if (onClick) {
    return (
      <button
        type="button"
        style={{ ...baseStyle, background: "none", border: "none", padding: 0, textAlign: "left" }}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </button>
    );
  }

  return (
    <a
      href={href ?? "#"}
      style={baseStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </a>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
export default function Footer() {
  const { locale } = useLocale();
  const copy       = useT().footer;

  const router   = useRouter();
  const pathname = usePathname();

  const handleNavClick = (href: string) => {
    if (href === "/") {
      if (pathname === "/") {
        scrollToSection("home");
      } else {
        sessionStorage.setItem("skipIntro", "1");
        router.push("/");
      }
    } else if (href.startsWith("/#")) {
      const id = href.slice(2);
      if (pathname === "/") {
        scrollToSection(id);
      } else {
        pendingScroll.current = id;
        router.push("/");
      }
    } else {
      router.push(href);
    }
  };

  return (
    <footer
      role="contentinfo"
      style={{ backgroundColor: "var(--color-dark)" }}
    >
      {/* ── Main grid ───────────────────────────────────────── */}
      <div
        className="container-site"
        style={{
          paddingTop:    "clamp(3.5rem, 6vw, 5rem)",
          paddingBottom: "clamp(3rem, 5vw, 4.5rem)",
        }}
      >
        <div
          className="grid grid-cols-1 gap-12
                     sm:grid-cols-2
                     lg:grid-cols-[2fr_1fr_1.4fr_1.6fr]
                     lg:gap-10"
        >
          {/* ── Col 1: Brand ──────────────────────────────── */}
          <motion.div {...fadeUp(0)}>
            {/* Logo */}
            <div className="mb-5">
              <Image
                src="/images/Logo.png"
                alt="Sacramentum Advisors"
                width={90}
                height={26}
                style={{
                  filter:    "brightness(0) invert(1)",
                  opacity:   0.88,
                  objectFit: "contain",
                  height:    "auto",
                }}
              />
            </div>

            {/* Wordmark */}
            <p
              className="text-eyebrow mb-4"
              style={{
                color:         "rgba(250,250,248,0.85)",
                fontSize:      "0.68rem",
                letterSpacing: "0.14em",
              }}
            >
              SACRAMENTUM ADVISORS
            </p>

            {/* Tagline */}
            <p
              style={{
                color:      "rgba(250,250,248,0.38)",
                fontSize:   "0.82rem",
                lineHeight: 1.65,
                maxWidth:   "26ch",
              }}
            >
              {copy.brand.tagline}
            </p>

          </motion.div>

          {/* ── Col 2: Navigation ─────────────────────────── */}
          <motion.div {...fadeUp(0.08)}>
            <ColHeading>{copy.nav.title}</ColHeading>
            <nav aria-label="Footer navigation">
              {copy.nav.links.map((link) => (
                <FooterLink
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                >
                  {link.label}
                </FooterLink>
              ))}
            </nav>
          </motion.div>

          {/* ── Col 3: Services ───────────────────────────── */}
          <motion.div {...fadeUp(0.14)}>
            <ColHeading>{copy.services.title}</ColHeading>
            {copy.services.links.map((link) => (
              <FooterLink key={link.label} onClick={() => router.push(link.href)}>
                {link.label}
              </FooterLink>
            ))}
          </motion.div>

          {/* ── Col 4: Contact ────────────────────────────── */}
          <motion.div {...fadeUp(0.2)}>
            <ColHeading>{copy.contact.title}</ColHeading>

            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <span
                  className="mt-0.5 flex-shrink-0"
                  style={{ color: "rgba(250,250,248,0.3)" }}
                >
                  <IconLocation />
                </span>
                <span
                  style={{
                    color:      "rgba(250,250,248,0.5)",
                    fontSize:   "0.9rem",
                    lineHeight: 1.5,
                  }}
                >
                  {copy.contact.location}
                </span>
              </div>

              <div className="flex items-start gap-3">
                <span
                  className="mt-0.5 flex-shrink-0"
                  style={{ color: "rgba(250,250,248,0.3)" }}
                >
                  <IconMail />
                </span>
                <a
                  href={`mailto:${copy.contact.email}`}
                  style={{
                    color:      "rgba(250,250,248,0.5)",
                    fontSize:   "0.9rem",
                    lineHeight: 1.5,
                    transition: "color 0.2s ease",
                    wordBreak:  "break-all",
                  }}
                  onMouseEnter={e =>
                    ((e.currentTarget as HTMLElement).style.color = "var(--color-warm)")
                  }
                  onMouseLeave={e =>
                    ((e.currentTarget as HTMLElement).style.color = "rgba(250,250,248,0.5)")
                  }
                >
                  {copy.contact.email}
                </a>
              </div>
            </div>

            {/* Consult CTA */}
            <div className="mt-8">
              <button
                type="button"
                onClick={() => router.push("/contact")}
                style={{
                  display:         "inline-block",
                  padding:         "0.65rem 1.4rem",
                  borderRadius:    "50px",
                  border:          "1px solid rgba(204,168,124,0.4)",
                  color:           "var(--color-warm)",
                  fontSize:        "0.7rem",
                  letterSpacing:   "0.1em",
                  textTransform:   "uppercase",
                  fontWeight:      500,
                  transition:      "border-color 0.25s ease, background-color 0.25s ease",
                  background:      "none",
                  cursor:          "pointer",
                  fontFamily:      "inherit",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(204,168,124,0.85)";
                  el.style.backgroundColor = "rgba(204,168,124,0.07)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(204,168,124,0.4)";
                  el.style.backgroundColor = "transparent";
                }}
              >
                {locale === "de" ? "Beratung buchen" : "Book a consultation"}
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Legal bar ───────────────────────────────────────── */}
      <motion.div
        {...fadeUp(0.26)}
        className="container-site"
        style={{
          paddingTop:    "1.5rem",
          paddingBottom: "2rem",
          borderTop:     "1px solid rgba(250,250,248,0.07)",
        }}
      >
        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
        >
          {/* Copyright */}
          <p
            style={{
              color:         "rgba(250,250,248,0.28)",
              fontSize:      "0.72rem",
              letterSpacing: "0.04em",
            }}
          >
            {copy.legal.copyright}
          </p>

          {/* Legal links */}
          <div className="flex items-center gap-6">
            {[copy.legal.privacy, copy.legal.terms].map((label) => (
              <a
                key={label}
                href="#"
                style={{
                  color:         "rgba(250,250,248,0.28)",
                  fontSize:      "0.72rem",
                  letterSpacing: "0.04em",
                  transition:    "color 0.2s ease",
                }}
                onMouseEnter={e =>
                  ((e.currentTarget as HTMLElement).style.color = "rgba(250,250,248,0.6)")
                }
                onMouseLeave={e =>
                  ((e.currentTarget as HTMLElement).style.color = "rgba(250,250,248,0.28)")
                }
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
