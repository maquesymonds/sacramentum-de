"use client";

/* ─────────────────────────────────────────────────────────────────────────────
   Contact Page — Client Component
   Private Consultation intake form + contact info panel
   ─────────────────────────────────────────────────────────────────────────── */

import React, { useState, useRef, useEffect } from "react";
import { motion }    from "framer-motion";
import { useLocale, useT } from "@/lib/locale-context";
import Navigation    from "@/components/layout/Navigation";
import Footer        from "@/components/layout/Footer";
import { lenisRef }  from "@/lib/lenis-ref";

// ── Easing ────────────────────────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: "-40px" },
  transition:  { duration: 0.85, ease: EASE, delay },
});

const fadeIn = (delay = 0) => ({
  initial:     { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport:    { once: true, margin: "-40px" },
  transition:  { duration: 0.7, ease: EASE, delay },
});

// ── Inline SVG icons ──────────────────────────────────────────────────────────
function IconLocation() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 18" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M7 1C4.24 1 2 3.24 2 6c0 3.75 5 11 5 11s5-7.25 5-11c0-2.76-2.24-5-5-5Z"
        stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      <circle cx="7" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.4"/>
    </svg>
  );
}
function IconMail() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 13" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <rect x="1" y="1" width="14" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M1 3.5L8 8l7-4.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>
  );
}
function IconPhone() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M3 1h3.5l1.5 4-2 1.5a9.5 9.5 0 0 0 3.5 3.5L11 8l4 1.5V13a2 2 0 0 1-2 2C5.4 15 1 10.6 1 3a2 2 0 0 1 2-2Z"
        stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>
  );
}
function IconCheck() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="19" stroke="var(--color-warm)" strokeWidth="1.2"/>
      <path d="M12 20l6 6 10-12" stroke="var(--color-warm)" strokeWidth="1.6"
        strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconChevron() {
  return (
    <svg width="12" height="7" viewBox="0 0 12 7" fill="none" aria-hidden="true"
      style={{ pointerEvents: "none", flexShrink: 0 }}>
      <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.4"
        strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ── Shared input styling helpers ──────────────────────────────────────────────
const inputBase: React.CSSProperties = {
  width:           "100%",
  padding:         "0.9rem 1.125rem",
  border:          "1px solid rgba(31,41,51,0.14)",
  backgroundColor: "#FFFFFF",
  fontFamily:      "var(--font-regola), Georgia, serif",
  fontSize:        "0.975rem",
  color:           "var(--color-ink)",
  outline:         "none",
  borderRadius:    0,
  lineHeight:      1.5,
  transition:      "border-color 0.2s ease, box-shadow 0.2s ease",
  appearance:      "none" as const,
};

const labelStyle: React.CSSProperties = {
  display:       "block",
  fontSize:      "0.67rem",
  fontWeight:    500,
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
  color:         "var(--color-ink-subtle)",
  marginBottom:  "0.55rem",
};

function onFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = "var(--color-warm)";
  e.currentTarget.style.boxShadow   = "0 0 0 3px rgba(204,168,124,0.08)";
}
function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = "rgba(31,41,51,0.14)";
  e.currentTarget.style.boxShadow   = "none";
}

// ── Contact info row ──────────────────────────────────────────────────────────
function InfoRow({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3.5">
      <span className="mt-0.5" style={{ color: "var(--color-warm)", opacity: 0.8 }}>
        {icon}
      </span>
      <span style={{ fontSize: "0.95rem", color: "var(--color-ink-muted)", lineHeight: 1.6 }}>
        {children}
      </span>
    </div>
  );
}

// ── Form field wrapper ────────────────────────────────────────────────────────
function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label style={labelStyle}>
        {label}
        {required && (
          <span style={{ color: "var(--color-warm)", marginLeft: "0.2em" }} aria-label="required">*</span>
        )}
      </label>
      {children}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ContactPageClient() {
  const { locale } = useLocale();
  const copy       = useT().contactPage;

  useEffect(() => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  const [form, setForm] = useState({
    name: "", email: "", phone: "", country: "", interest: "", message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("https://formspree.io/f/xykldeza", {
        method:  "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body:    JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("idle");
        alert(locale === "de" ? "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut." : "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("idle");
      alert(locale === "de" ? "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut." : "Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Navigation />

      <main style={{ backgroundColor: "var(--color-surface)", minHeight: "100vh" }}>

        {/* ── Page header ──────────────────────────────────────────── */}
        <div
          className="container-site"
          style={{
            paddingTop:    "clamp(7rem, 14vw, 10rem)",
            paddingBottom: "clamp(3.5rem, 6vw, 5rem)",
            borderBottom:  "1px solid rgba(31,41,51,0.07)",
          }}
        >
          {/* Eyebrow */}
          <motion.div {...fadeIn(0)} className="flex items-center gap-4 mb-6">
            <span
              aria-hidden="true"
              className="block h-px w-8"
              style={{ backgroundColor: "var(--color-warm)" }}
            />
            <span className="text-eyebrow" style={{ color: "var(--color-warm)" }}>
              {copy.eyebrow}
            </span>
          </motion.div>

          {/* Headline + intro — 2-col at lg */}
          <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-24 items-end">
            <motion.h1
              {...fadeUp(0.06)}
              className="font-normal text-ink"
              style={{
                fontSize:      "clamp(2.5rem, 5.5vw, 4rem)",
                letterSpacing: "-0.03em",
                lineHeight:    1.08,
              }}
            >
              {copy.headline}
            </motion.h1>
            <motion.p
              {...fadeUp(0.12)}
              className="text-body text-ink-muted leading-relaxed lg:pb-1"
            >
              {copy.intro}
            </motion.p>
          </div>
        </div>

        {/* ── Form + info 2-column ──────────────────────────────────── */}
        <div
          className="container-site"
          style={{
            paddingTop:    "clamp(3.5rem, 6vw, 5rem)",
            paddingBottom: "clamp(5rem, 9vw, 7rem)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16 lg:gap-24 items-start">

            {/* ── LEFT: Form ───────────────────────────────────────── */}
            <motion.div {...fadeUp(0.08)}>
              {status === "success" ? (
                /* ── Success state ──────────────────────────────── */
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="flex flex-col items-start gap-6"
                  style={{ paddingTop: "2rem" }}
                >
                  <IconCheck />
                  <h2
                    className="font-normal text-ink"
                    style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", letterSpacing: "-0.02em", lineHeight: 1.2 }}
                  >
                    {copy.success.headline}
                  </h2>
                  <span
                    aria-hidden="true"
                    style={{ display: "block", width: "3rem", height: 1, backgroundColor: "rgba(31,41,51,0.12)" }}
                  />
                  <p className="text-body text-ink-muted leading-relaxed" style={{ maxWidth: "46ch" }}>
                    {copy.success.body}
                  </p>
                </motion.div>
              ) : (
                /* ── Form ───────────────────────────────────────── */
                <form ref={formRef} onSubmit={handleSubmit} noValidate>
                  <div className="flex flex-col gap-6">

                    {/* Row 1: Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <Field label={copy.form.nameLabel} required>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder={copy.form.namePlaceholder}
                          required
                          autoComplete="name"
                          style={inputBase}
                          onFocus={onFocus}
                          onBlur={onBlur}
                        />
                      </Field>
                      <Field label={copy.form.emailLabel} required>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder={copy.form.emailPlaceholder}
                          required
                          autoComplete="email"
                          style={inputBase}
                          onFocus={onFocus}
                          onBlur={onBlur}
                        />
                      </Field>
                    </div>

                    {/* Row 2: Phone + Country */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <Field label={copy.form.phoneLabel}>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder={copy.form.phonePlaceholder}
                          autoComplete="tel"
                          style={inputBase}
                          onFocus={onFocus}
                          onBlur={onBlur}
                        />
                      </Field>
                      <Field label={copy.form.countryLabel} required>
                        <input
                          type="text"
                          name="country"
                          value={form.country}
                          onChange={handleChange}
                          placeholder={copy.form.countryPlaceholder}
                          required
                          autoComplete="country-name"
                          style={inputBase}
                          onFocus={onFocus}
                          onBlur={onBlur}
                        />
                      </Field>
                    </div>

                    {/* Row 3: Area of Interest */}
                    <Field label={copy.form.interestLabel} required>
                      <div style={{ position: "relative" }}>
                        <select
                          name="interest"
                          value={form.interest}
                          onChange={handleChange}
                          required
                          style={{
                            ...inputBase,
                            paddingRight: "3rem",
                            cursor: "pointer",
                            color: form.interest ? "var(--color-ink)" : "rgba(31,41,51,0.4)",
                          }}
                          onFocus={onFocus}
                          onBlur={onBlur}
                        >
                          <option value="" disabled>
                            {copy.form.interestPlaceholder}
                          </option>
                          {copy.form.interestOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        <span
                          style={{
                            position:      "absolute",
                            right:         "1.125rem",
                            top:           "50%",
                            transform:     "translateY(-50%)",
                            pointerEvents: "none",
                            color:         "var(--color-ink-ghost)",
                          }}
                        >
                          <IconChevron />
                        </span>
                      </div>
                    </Field>

                    {/* Row 4: Message */}
                    <Field label={copy.form.messageLabel}>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder={copy.form.messagePlaceholder}
                        rows={5}
                        style={{ ...inputBase, resize: "vertical", minHeight: "130px" }}
                        onFocus={onFocus}
                        onBlur={onBlur}
                      />
                    </Field>

                    {/* Submit */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="btn-primary"
                        style={{
                          opacity:    status === "submitting" ? 0.65 : 1,
                          cursor:     status === "submitting" ? "not-allowed" : "pointer",
                          transition: "opacity 0.2s ease, background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease",
                          minWidth:   "260px",
                          justifyContent: "center",
                        }}
                      >
                        {status === "submitting" ? copy.form.submitting : copy.form.submit}
                      </button>

                      <p
                        className="text-caption text-ink-ghost mt-4"
                        style={{ letterSpacing: "0.05em" }}
                      >
                        {locale === "de"
                          ? "Wir antworten innerhalb von 1–2 Werktagen. Alle Anfragen sind vollständig vertraulich."
                          : "We respond within 1–2 business days. All enquiries are fully confidential."}
                      </p>
                    </div>
                  </div>
                </form>
              )}
            </motion.div>

            {/* ── RIGHT: Contact info ───────────────────────────────── */}
            <motion.aside
              {...fadeUp(0.18)}
              aria-label="Contact details"
            >
              {/* Info card */}
              <div
                style={{
                  borderLeft:  "1px solid rgba(204,168,124,0.3)",
                  paddingLeft: "2rem",
                }}
              >
                {/* Heading */}
                <p
                  className="text-eyebrow mb-7"
                  style={{ color: "var(--color-warm)", fontSize: "0.67rem", letterSpacing: "0.13em" }}
                >
                  {copy.info.heading}
                </p>

                {/* Details */}
                <div className="flex flex-col gap-4 mb-8">
                  <InfoRow icon={<IconLocation />}>
                    <span style={{ display: "block" }}>{copy.info.location1}</span>
                    <span style={{ display: "block", color: "var(--color-ink-subtle)", fontSize: "0.85rem" }}>
                      {copy.info.location2}
                    </span>
                  </InfoRow>
                  <InfoRow icon={<IconMail />}>
                    <a
                      href={`mailto:${copy.info.email}`}
                      style={{
                        color:      "var(--color-ink-muted)",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--color-warm)")}
                      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--color-ink-muted)")}
                    >
                      {copy.info.email}
                    </a>
                  </InfoRow>
                  <InfoRow icon={<IconPhone />}>
                    {copy.info.phone}
                  </InfoRow>
                </div>

                {/* Divider */}
                <span
                  aria-hidden="true"
                  style={{
                    display:         "block",
                    height:          1,
                    width:           "100%",
                    backgroundColor: "rgba(31,41,51,0.07)",
                    marginBottom:    "1.75rem",
                  }}
                />

              </div>

              {/* Optional secondary note */}
              <div className="mt-10 pt-8" style={{ borderTop: "1px solid rgba(31,41,51,0.06)" }}>
                <p className="text-eyebrow mb-3" style={{ color: "var(--color-ink-ghost)", fontSize: "0.63rem", letterSpacing: "0.1em" }}>
                  {locale === "de" ? "Mit uns arbeiten" : "Working with us"}
                </p>
                <p style={{ fontSize: "0.875rem", color: "var(--color-ink-subtle)", lineHeight: 1.7 }}>
                  {locale === "de"
                    ? "Wir arbeiten mit einer ausgewählten Anzahl von Mandanten, um die Tiefe der Aufmerksamkeit zu gewährleisten, die jedes Engagement verdient."
                    : "We work with a select number of clients at any given time to ensure the depth of attention each engagement deserves."}
                </p>
              </div>
            </motion.aside>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
