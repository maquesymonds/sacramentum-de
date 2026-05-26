"use client";

import { useEffect, useRef, useState } from "react";
import { motion }             from "framer-motion";
import { gsap }               from "gsap";
import { ScrollTrigger }      from "gsap/ScrollTrigger";
import Navigation             from "@/components/layout/Navigation";
import Footer                 from "@/components/layout/Footer";
import { useLocale }          from "@/lib/locale-context";
import { lenisRef }           from "@/lib/lenis-ref";

gsap.registerPlugin(ScrollTrigger);

const EASE_FM = [0.16, 1, 0.3, 1] as const;

const CHAPTER_BG = ["#004785", "#af8f6e", "#194418", "#4a2512"] as const;

function lerpColor(a: string, b: string, t: number): string {
  const p = (hex: string) => {
    const h = hex.replace("#", "");
    return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
  };
  const [r1,g1,b1] = p(a);
  const [r2,g2,b2] = p(b);
  return `rgb(${Math.round(r1+(r2-r1)*t)},${Math.round(g1+(g2-g1)*t)},${Math.round(b1+(b2-b1)*t)})`;
}

const CHAPTERS = [
  {
    id: "real-estate",
    image: "/images/RealEstate.webp",
    en: {
      eyebrow:   "01 · Real Estate",
      headline:  "Invest where you can live: The Lifestyle Assets Concept",
      body:      "We believe the most resilient portfolio is one you can experience. Assets that preserve and grow your capital while remaining livable, enjoyable and productive.\n\nWe will help you find properties that serve a dual purpose: capital preservation (productive farmland, estancias, premium real estate) and immediate quality of life.\n\nUruguay's real estate market offers legal certainty, dollar-denominated transactions and unrestricted foreign ownership.",
      stat:      { value: "0%", label: "Restrictions on foreign ownership" },
      secondary: "Residential · Commercial · Coastal · Heritage",
      cta:       "Ask about our farmland, agricultural and coastal property listings",
    },
    es: {
      eyebrow:   "01 · Bienes Raíces",
      headline:  "Invierta donde pueda vivir: El concepto de Lifestyle Assets",
      body:      "Creemos que la cartera más sólida es aquella que también puede disfrutarse en la vida real. Activos que preservan y hacen crecer su capital, al tiempo que resultan habitables, disfrutables y productivos.\n\nLe ayudamos a identificar propiedades con un doble propósito: preservación de capital (campos productivos, estancias y bienes raíces premium) y calidad de vida inmediata.\n\nEl mercado inmobiliario de Uruguay ofrece seguridad jurídica, transacciones denominadas en dólares y propiedad sin restricciones para inversores extranjeros.",
      stat:      { value: "0%", label: "Restricciones a propietarios extranjeros" },
      secondary: "Residencial · Comercial · Costero · Patrimonial",
      cta:       "Consúltenos para conocer nuestros listings de campos agrícolas, ganaderos y forestales, chacras serranas o propiedades costeras",
    },
    de: {
      eyebrow:   "01 · Immobilien",
      headline:  "Investieren Sie dort, wo Sie leben können: Das Lifestyle-Assets-Konzept",
      body:      "Wir glauben, dass das widerstandsfähigste Portfolio eines ist, das Sie auch erleben können. Vermögenswerte, die Ihr Kapital erhalten und mehren, während sie bewohnbar, genießbar und produktiv bleiben.\n\nWir helfen Ihnen, Immobilien mit einem doppelten Zweck zu finden: Kapitalerhalt (produktive Felder, Estancias, erstklassige Immobilien) und sofortige Lebensqualität.\n\nUruguays Immobilienmarkt bietet Rechtssicherheit, dollardenominierte Transaktionen und uneingeschränktes ausländisches Eigentum.",
      stat:      { value: "0%", label: "Beschränkungen für ausländische Eigentümer" },
      secondary: "Wohnimmobilien · Gewerbe · Küste · Kulturgüter",
      cta:       "Fragen Sie uns zu unseren landwirtschaftlichen und Küstenimmobilien",
    },
  },
  {
    id: "technology",
    image: "/images/tech.avif",
    en: {
      eyebrow:  "02 · Technology",
      headline: "IT, Innovation & Emerging Technologies",
      intro:    "Uruguay has positioned itself as one of Latin America's most stable and forward-looking technology hubs, combining institutional reliability, skilled talent, and a business-friendly environment for digital growth.",
      pillars: [
        { heading: "Strategic Ecosystem",  body: "A mature technology sector supported by strong education, public-private collaboration, and a growing network of startups, global companies, and innovation-driven ventures." },
        { heading: "Regional Recognition", body: "Uruguay is widely recognized for its digital development, regulatory stability, and high-quality human capital, making it an attractive platform for regional operations." },
        { heading: "Next Phase",           body: "Expansion across AI, software services, fintech, data infrastructure, and emerging technologies, reinforcing Uruguay's role as a gateway for innovation in South America." },
      ],
      cta: "Explore technology opportunities",
    },
    es: {
      eyebrow:  "02 · Tecnología",
      headline: "IT, Innovación y Tecnologías Emergentes",
      intro:    "Uruguay se ha posicionado como uno de los hubs tecnológicos más estables y con mayor visión de futuro de América Latina, combinando fiabilidad institucional, talento calificado y un entorno favorable para el crecimiento digital.",
      pillars: [
        { heading: "Ecosistema Estratégico",  body: "Un sector tecnológico maduro respaldado por una sólida educación, colaboración público-privada y una creciente red de startups, empresas globales y emprendimientos orientados a la innovación." },
        { heading: "Reconocimiento Regional", body: "Uruguay es ampliamente reconocido por su desarrollo digital, estabilidad regulatoria y capital humano de alta calidad, convirtiéndolo en una plataforma atractiva para operaciones regionales." },
        { heading: "Próxima Fase",            body: "Expansión en IA, servicios de software, fintech, infraestructura de datos y tecnologías emergentes, reforzando el rol de Uruguay como puerta de entrada a la innovación en Sudamérica." },
      ],
      cta: "Contáctenos para conectar con el ecosistema emprendedor y de VC regional",
    },
    de: {
      eyebrow:  "02 · Technologie",
      headline: "IT, Innovation & Neue Technologien",
      intro:    "Uruguay hat sich als eines der stabilsten und zukunftsorientiersten Technologie-Hubs Lateinamerikas positioniert — mit institutioneller Zuverlässigkeit, qualifiziertem Fachpersonal und einem unternehmensfreundlichen Umfeld für digitales Wachstum.",
      pillars: [
        { heading: "Strategisches Ökosystem",   body: "Ein reifer Technologiesektor, unterstützt durch starke Bildung, öffentlich-private Zusammenarbeit und ein wachsendes Netzwerk aus Startups, globalen Unternehmen und innovationsgetriebenen Projekten." },
        { heading: "Regionale Anerkennung",     body: "Uruguay ist weithin für seine digitale Entwicklung, regulatorische Stabilität und hochwertiges Humankapital bekannt — eine attraktive Plattform für regionale Operationen." },
        { heading: "Nächste Phase",             body: "Expansion in KI, Softwaredienstleistungen, Fintech, Dateninfrastruktur und neue Technologien — Uruguays Rolle als Innovationstor in Südamerika wächst stetig." },
      ],
      cta: "Technologiemöglichkeiten erkunden",
    },
  },
  {
    id: "agriculture",
    image: "/images/woods.avif",
    en: {
      eyebrow:    "03 · Agriculture & Forestry",
      headline:   "Agriculture & Forestry",
      body:       "Uruguay is a country with deep agricultural tradition. With more than 90% of its land suitable for productive use, it stands as a reliable global food supplier.",
      stat:       { value: "90%+", label: "Of land suitable for productive use" },
      secondary:  "Livestock · Arable · Forestry · Viticulture",
      cta:        "Contact us about properties for sale",
      keyDrivers: [
        "Preservation of large natural areas",
        "Policies focused on environmental sustainability",
        "Technology and sustainable management practices",
      ],
      marketHighlights: [
        "Food production capacity for 30–50 million people",
        "Country free from deforestation",
        "Tax incentives for forestry investment",
      ],
      legalNote: "Forestry Law No. 15,939 provides a robust legal framework for responsible investment.",
      downloads: [
        { label: "Download Forestry Report",          href: "https://www.uruguayxxi.gub.uy/en/information-center/article/forestry-sector-in-uruguay/" },
        { label: "Download Agriculture Outlook 2024", href: "https://www.uruguayxxi.gub.uy/en/information-center/article/agriculture-report-2024/" },
      ],
    },
    es: {
      eyebrow:    "03 · Sector Agropecuario y Forestal",
      headline:   "Sector Agropecuario y Forestal",
      body:       "Con profunda tradición agropecuaria y más del 90% de su territorio apto para uso productivo, Uruguay sigue siendo una de las plataformas más confiables del mundo para la producción de alimentos, la inversión forestal y las estrategias sostenibles de uso de la tierra.",
      stat:       { value: "90%+", label: "Del territorio apto para uso productivo" },
      secondary:  "Ganadería · Arable · Forestación · Viticultura",
      cta:        "Consúltenos por propiedades a la venta",
      keyDrivers: [
        "Conservación de tierras a gran escala y gestión responsable",
        "Políticas ambientales orientadas a la sostenibilidad",
        "Tecnologías agrícolas y forestales avanzadas",
        "Sólida infraestructura exportadora y sistemas de trazabilidad",
      ],
      marketHighlights: [
        "Capacidad alimentaria para 30–50 millones de personas",
        "País libre de deforestación",
        "Incentivos fiscales para inversión forestal",
        "Fuerte apoyo institucional al uso sostenible de la tierra",
      ],
      legalNote: "La Ley Forestal N.° 15.939 proporciona un marco regulatorio sólido para la inversión forestal responsable a largo plazo.",
      downloads: [
        { label: "Descargar Informe Forestal",          href: "https://www.uruguayxxi.gub.uy/es/centro-informacion/articulo/sector-forestal-en-uruguay/" },
        { label: "Descargar Perspectivas Agrícolas 2024", href: "https://www.uruguayxxi.gub.uy/es/centro-informacion/articulo/informe-agricola-2024/" },
      ],
    },
    de: {
      eyebrow:    "03 · Landwirtschaft & Forstwirtschaft",
      headline:   "Landwirtschaft & Forstwirtschaft",
      body:       "Uruguay ist ein Land mit tiefer Agrartradition. Mit mehr als 90% seines Landes für produktive Nutzung geeignet, gilt es als zuverlässiger globaler Lebensmittellieferant.",
      stat:       { value: "90%+", label: "Des Landes für produktive Nutzung geeignet" },
      secondary:  "Viehzucht · Ackerbau · Forstwirtschaft · Weinbau",
      cta:        "Kontaktieren Sie uns bezüglich zum Verkauf stehender Immobilien",
      keyDrivers: [
        "Erhaltung großer Naturgebiete",
        "Richtlinien mit Fokus auf Umweltnachhaltigkeit",
        "Technologie und nachhaltige Bewirtschaftungspraktiken",
      ],
      marketHighlights: [
        "Lebensmittelproduktionskapazität für 30–50 Millionen Menschen",
        "Land frei von Entwaldung",
        "Steuerliche Anreize für Forstinvestitionen",
      ],
      legalNote: "Forstgesetz Nr. 15.939 bietet einen soliden rechtlichen Rahmen für verantwortungsvolle Forstinvestitionen.",
      downloads: [
        { label: "Forstbericht herunterladen",          href: "https://www.uruguayxxi.gub.uy/en/information-center/article/forestry-sector-in-uruguay/" },
        { label: "Agrarausblick 2024 herunterladen",    href: "https://www.uruguayxxi.gub.uy/en/information-center/article/agriculture-report-2024/" },
      ],
    },
  },
  {
    id: "special-situations",
    image: "/placeholders/colonia.avif",
    en: {
      eyebrow:  "04 · Special Projects",
      headline: "Special Projects",
      intro:    "At SACRAMENTUM CAPITAL, we hold mandates and access to select special projects representing opportunities for strategic investors.",
      pillars: [
        {
          heading: "Specialized Approach",
          body:    "Projects involving complexity such as restructurings, distressed situations, refinancing processes, or scenarios requiring discreet expert guidance.",
        },
        {
          heading: "Key Sectors",
          body:    "Logistics & transport · Port infrastructure · Urban development · Exclusive Real Estate",
        },
        {
          heading: "Confidential Access",
          body:    "Direct and confidential management of selected projects for sophisticated investors. To learn more about these opportunities, please contact our team directly.",
        },
      ],
      cta: "Contact our team",
    },
    es: {
      eyebrow:  "04 · Proyectos Especiales",
      headline: "Proyectos Especiales",
      intro:    "En SACRAMENTUM CAPITAL contamos con mandatos y acceso a proyectos especiales seleccionados que representan oportunidades para inversores estratégicos.",
      pillars: [
        {
          heading: "Enfoque Especializado",
          body:    "Proyectos que involucran complejidad como reestructuraciones, situaciones de activos en dificultad, procesos de refinanciamiento o escenarios que requieren orientación experta discreta.",
        },
        {
          heading: "Sectores Clave",
          body:    "Logística y transporte · Infraestructura portuaria · Desarrollo urbano · Real Estate exclusivo",
        },
        {
          heading: "Acceso Confidencial",
          body:    "Gestión directa y confidencial de proyectos seleccionados para inversores sofisticados. Para conocer más sobre estas oportunidades, contacte directamente a nuestro equipo.",
        },
      ],
      cta: "Contactar al equipo",
    },
    de: {
      eyebrow:  "04 · Spezialprojekte",
      headline: "Spezialprojekte",
      intro:    "Bei SACRAMENTUM CAPITAL verfügen wir über Mandate und Zugang zu ausgewählten Spezialprojekten, die Möglichkeiten für strategische Investoren darstellen.",
      pillars: [
        {
          heading: "Spezialisierter Ansatz",
          body:    "Projekte mit Komplexität wie Restrukturierungen, Notlagesituationen, Refinanzierungsprozesse oder Szenarien, die diskrete Expertenbegleitung erfordern.",
        },
        {
          heading: "Schlüsselsektoren",
          body:    "Logistik & Transport · Hafeninfrastruktur · Stadtentwicklung · Exklusive Immobilien",
        },
        {
          heading: "Vertraulicher Zugang",
          body:    "Direkte und vertrauliche Verwaltung ausgewählter Projekte für anspruchsvolle Investoren. Um mehr zu erfahren, wenden Sie sich direkt an unser Team.",
        },
      ],
      cta: "Unser Team kontaktieren",
    },
  },
] as const;

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: "-80px" },
  transition:  { duration: 0.9, ease: EASE_FM, delay },
});

const fadeIn = (delay = 0) => ({
  initial:     { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport:    { once: true, margin: "-80px" },
  transition:  { duration: 0.85, ease: EASE_FM, delay },
});

export default function InvestPageClient() {
  const { locale } = useLocale();

  // ── Refs ───────────────────────────────────────────────────────────────────
  const chaptersSection = useRef<HTMLDivElement>(null);
  const imageRefs       = useRef<(HTMLDivElement | null)[]>([]);
  const imageInnerRefs  = useRef<(HTMLElement | null)[]>([]);
  const textPanelRefs   = useRef<(HTMLDivElement | null)[]>([]);

  // ── Live background colours ────────────────────────────────────────────────
  const [uiColors, setUiColors] = useState<string[]>([...CHAPTER_BG]);
  const bgColorsRef             = useRef<string[]>([...CHAPTER_BG]);
  const activeChapterRef        = useRef<number>(0);

  const handleColorChange = (idx: number, color: string) => {
    bgColorsRef.current[idx] = color;
    setUiColors(prev => { const n = [...prev]; n[idx] = color; return n; });
    // Apply immediately if this is the currently visible chapter
    if (idx === activeChapterRef.current && chaptersSection.current) {
      chaptersSection.current.style.backgroundColor = color;
    }
  };

  // ── GSAP ───────────────────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const lenis = lenisRef.current;
      if (lenis) lenis.on("scroll", ScrollTrigger.update);

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        // Init: first panel visible + interactive, rest hidden + non-interactive
        textPanelRefs.current.forEach((el, i) => {
          if (el) {
            gsap.set(el, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 30 });
            el.style.pointerEvents = i === 0 ? "auto" : "none";
          }
        });

        // Init images: stacked, all fully visible (first on top)
        imageRefs.current.forEach((el, i) => {
          if (el) {
            el.style.zIndex = String(CHAPTERS.length - i);
            gsap.set(el, { clipPath: "inset(0 0 0% 0)" });
          }
        });

        // Pin entire section, scrub through (CHAPTERS.length - 1) screens
        const mainTl = gsap.timeline({
          scrollTrigger: {
            trigger: chaptersSection.current,
            start:   "top top",
            end:     `+=${(CHAPTERS.length - 1) * 100}%`,
            pin:     true,
            scrub:   0.3,
            snap: {
              snapTo:    1 / (CHAPTERS.length - 1),
              duration:  { min: 0.5, max: 0.9 },
              delay:     0.08,
              ease:      "power2.inOut",
              inertia:   false,
            },
            onUpdate: (self) => {
              const total      = CHAPTERS.length - 1;
              const raw        = self.progress * total;
              const segIndex   = Math.min(Math.floor(raw), total - 1);
              const segProgress = raw - segIndex;
              const colorA  = bgColorsRef.current[segIndex];
              const colorB  = bgColorsRef.current[segIndex + 1];
              const blended = lerpColor(colorA, colorB, segProgress);
              if (chaptersSection.current) {
                chaptersSection.current.style.backgroundColor = blended;
              }
              const active = Math.round(raw);
              activeChapterRef.current = active;
              textPanelRefs.current.forEach((el, idx) => {
                if (el) el.style.pointerEvents = idx === active ? "auto" : "none";
              });
            },
          },
        });

        for (let i = 0; i < CHAPTERS.length - 1; i++) {
          const curr = textPanelRefs.current[i];
          const next = textPanelRefs.current[i + 1];
          const seg = gsap.timeline();
          seg.to(imageRefs.current[i], { clipPath: "inset(0 0 100% 0)", duration: 1, ease: "none" }, 0);
          seg.to(curr, { opacity: 0, y: -24, duration: 0.35, ease: "power2.in" }, 0);
          seg.fromTo(
            next,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            0.5,
          );
          mainTl.add(seg);
        }

        setTimeout(() => ScrollTrigger.refresh(), 150);

        return () => {
          if (lenis) lenis.off("scroll", ScrollTrigger.update);
        };
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navigation />

      <main>

        {/* ── Hero ────────────────────────────────────────────────────────── */}
        <section
          aria-label="Invest in Uruguay overview"
          style={{
            backgroundColor: "#FFFFFF",
            paddingTop:      "clamp(8rem, 14vw, 12rem)",
            paddingBottom:   "clamp(4rem, 8vw, 7rem)",
          }}
        >
          <div className="container-site">

            <motion.div {...fadeIn(0)} className="flex items-center gap-4 mb-5">
              <span className="block h-px w-8 flex-shrink-0" style={{ backgroundColor: "var(--color-warm)" }} />
              <span className="text-eyebrow" style={{ color: "var(--color-warm)" }}>
                {locale === "de" ? "Investitionssektoren" : "Investment Sectors"}
              </span>
            </motion.div>

            <div className="grid lg:grid-cols-2 lg:items-start gap-10 mb-10">
              <motion.h1
                {...fadeUp(0.06)}
                className="font-normal text-ink"
                style={{
                  fontSize:      "clamp(2.8rem, 5vw, 4.5rem)",
                  letterSpacing: "-0.03em",
                  lineHeight:    1.08,
                }}
              >
                {locale === "de" ? "In Uruguay investieren" : "Invest in Uruguay"}
              </motion.h1>

              <motion.div {...fadeUp(0.12)} className="text-body text-ink-muted leading-relaxed lg:pb-2 flex flex-col gap-4">
                {locale === "de" ? (
                  <>
                    <p>Entdecken Sie Investitionsmöglichkeiten in einem der stabilsten und attraktivsten Länder Lateinamerikas.</p>
                    <p>In den letzten Jahren hat Uruguay erhebliche Fortschritte bei der Entwicklung seiner Straßen-, Schienen- und Energieinfrastruktur erzielt. Diese Entwicklungen haben konkrete Möglichkeiten für strategische Akteure in Schlüsselbereichen wie Immobilien, Infrastruktur, Logistik, Landwirtschaft, Forstwirtschaft und erneuerbare Energien geschaffen.</p>
                  </>
                ) : (
                  <>
                    <p>Discover investment opportunities in one of the most stable and attractive countries in Latin America.</p>
                    <p>In recent years, Uruguay has experienced significant progress in the development of its road, rail, and energy infrastructure. These advancements have created tangible opportunities for strategic players across key sectors such as real estate, infrastructure, logistics, agriculture, forestry, and renewables.</p>
                  </>
                )}
              </motion.div>
            </div>

            <motion.div {...fadeIn(0.3)} className="flex items-center gap-3 mt-8">
              <span className="text-ink-muted" style={{ fontSize: "0.75rem", letterSpacing: "0.06em" }}>
                {locale === "de" ? "Scrollen zum Entdecken" : "Scroll to explore"}
              </span>
              <span style={{ display: "block", height: 1, width: "3rem", backgroundColor: "rgba(31,41,51,0.2)" }} />
            </motion.div>

          </div>
        </section>

        {/* ── Chapters — Desktop pinned ────────────────────────────────────── */}
        <div
          ref={chaptersSection}
          className="hidden lg:grid"
          style={{
            gridTemplateColumns: "1fr 1fr",
            gap:                 0,
            height:              "100vh",
            backgroundColor:     CHAPTER_BG[0],
          }}
        >

          {/* Left: absolutely stacked text panels */}
          <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
            {CHAPTERS.map((chapter, i) => {
              const copy = (chapter as Record<string, unknown>)[locale] as typeof chapter.en;
              return (
                <div
                  key={chapter.id}
                  ref={(el) => { textPanelRefs.current[i] = el; }}
                  style={{
                    position:      "absolute",
                    inset:         0,
                    display:       "flex",
                    flexDirection: "column",
                    justifyContent:"flex-start",
                    padding:       "clamp(5rem, 7vw, 7rem) clamp(2rem, 5vw, 5rem) clamp(2rem, 3vw, 3rem)",
                    overflowY:     "auto",
                  }}
                >
                  <p className="text-eyebrow mb-4" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {copy.eyebrow}
                  </p>

                  <h2
                    className="font-normal"
                    style={{
                      color:         "rgba(255,255,255,0.95)",
                      fontSize:      "clamp(1.9rem, 3.2vw, 2.9rem)",
                      letterSpacing: "-0.025em",
                      lineHeight:    1.1,
                      maxWidth:      "22ch",
                      marginBottom:  "0.5rem",
                    }}
                  >
                    {copy.headline}
                  </h2>

                  <span
                    aria-hidden="true"
                    style={{ display: "block", width: "2.5rem", height: 1, backgroundColor: "rgba(255,255,255,0.2)", marginBottom: "0.75rem" }}
                  />

                  {"pillars" in copy ? (
                    /* ── Technology: intro + three pillars ── */
                    <>
                      <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.95rem", lineHeight: 1.65, maxWidth: "52ch", marginBottom: "1.25rem" }}>
                        {copy.intro}
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem", marginBottom: "1.25rem" }}>
                        {copy.pillars.map((p: { heading: string; body: string }) => (
                          <div key={p.heading}>
                            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.35rem" }}>{p.heading}</p>
                            <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.95rem", lineHeight: 1.65 }}>{p.body}</p>
                          </div>
                        ))}
                      </div>
                      <a href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "rgba(255,255,255,0.85)", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500, borderBottom: "1px solid rgba(255,255,255,0.25)", paddingBottom: "0.2rem", transition: "all 0.25s ease", width: "fit-content" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "white"; e.currentTarget.style.color = "white"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.color = "rgba(255,255,255,0.85)"; }}>
                        {copy.cta}
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true"><path d="M2 9L9 2M9 2H3.5M9 2V7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </a>
                    </>
                  ) : "keyDrivers" in copy ? (
                    /* ── Agriculture: key drivers + downloads ── */
                    <>
                      <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.95rem", lineHeight: 1.65, maxWidth: "52ch", marginBottom: "1.25rem" }}>{copy.body}</p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.25rem" }}>
                        {[
                          { heading: locale === "de" ? "Schlüsselfaktoren" : "Key Factors", items: copy.keyDrivers },
                          { heading: locale === "de" ? "Markt-Highlights" : "Highlights", items: copy.marketHighlights },
                        ].map(({ heading, items }) => (
                          <div key={heading}>
                            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>{heading}</p>
                            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                              {items.map((item: string) => (
                                <li key={item} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", color: "rgba(255,255,255,0.9)", fontSize: "0.95rem", lineHeight: 1.5 }}>
                                  <span style={{ color: "rgba(204,168,124,0.7)", flexShrink: 0, marginTop: "0.25rem" }}>—</span>{item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.82rem", lineHeight: 1.5, fontStyle: "italic", borderLeft: "2px solid rgba(204,168,124,0.3)", paddingLeft: "0.875rem", marginBottom: "1.25rem", maxWidth: "52ch" }}>{copy.legalNote}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginBottom: "1.5rem" }}>
                        {copy.downloads.map((dl: { label: string; href: string }) => (
                          <a key={dl.label} href={dl.href} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "rgba(255,255,255,0.75)", fontSize: "0.68rem", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500, border: "1px solid rgba(255,255,255,0.18)", borderRadius: "50px", padding: "0.45rem 1rem", transition: "all 0.25s ease" }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(204,168,124,0.6)"; e.currentTarget.style.color = "rgba(204,168,124,0.9)"; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}>
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M5 1v6M2 5l3 3 3-3M1 9h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            {dl.label}
                          </a>
                        ))}
                      </div>
                      <a href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "rgba(255,255,255,0.85)", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500, borderBottom: "1px solid rgba(255,255,255,0.25)", paddingBottom: "0.2rem", transition: "all 0.25s ease", width: "fit-content" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "white"; e.currentTarget.style.color = "white"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.color = "rgba(255,255,255,0.85)"; }}>
                        {copy.cta}
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true"><path d="M2 9L9 2M9 2H3.5M9 2V7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </a>
                    </>
                  ) : (
                    /* ── Default: body + stat + cta ── */
                    <>
                      <div style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.95rem", lineHeight: 1.75, maxWidth: "52ch", marginBottom: "2.25rem" }}>
                        {copy.body.split("\n\n").map((para: string, pi: number, arr: string[]) => (
                          <p key={pi} style={{ marginBottom: pi < arr.length - 1 ? "1rem" : 0 }}>{para}</p>
                        ))}
                      </div>
                      {"stat" in copy && (
                        <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", padding: "1.25rem 1.5rem", borderLeft: "2px solid rgba(255,255,255,0.2)", backgroundColor: "rgba(255,255,255,0.06)", marginBottom: "2rem" }}>
                          <span style={{ color: "rgba(255,255,255,0.95)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1 }}>{copy.stat.value}</span>
                          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.78rem", letterSpacing: "0.04em", maxWidth: "24ch", lineHeight: 1.4 }}>{copy.stat.label}</span>
                        </div>
                      )}
                      <a href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "rgba(255,255,255,0.85)", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500, borderBottom: "1px solid rgba(255,255,255,0.25)", paddingBottom: "0.2rem", transition: "all 0.25s ease", width: "fit-content" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "white"; e.currentTarget.style.color = "white"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.color = "rgba(255,255,255,0.85)"; }}>
                        {copy.cta}
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true"><path d="M2 9L9 2M9 2H3.5M9 2V7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </a>
                    </>
                  )}


                </div>
              );
            })}
          </div>

          {/* Right: stacked image panels — pinned by GSAP */}
          <div style={{ position: "relative", overflow: "hidden", height: "100vh" }}>
            {CHAPTERS.map((chapter, i) => (
              <div
                key={chapter.id}
                ref={(el) => { imageRefs.current[i] = el; }}
                style={{ position: "absolute", inset: 0 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={(el) => { imageInnerRefs.current[i] = el; }}
                  src={chapter.image}
                  alt={chapter.en.eyebrow}
                  style={{ width: "100%", height: "115%", objectFit: "cover", marginTop: "-7.5%", display: "block" }}
                />
                <div
                  style={{
                    position:      "absolute",
                    bottom:        "2.5rem",
                    right:         "2.5rem",
                    color:         "rgba(255,255,255,0.25)",
                    fontSize:      "5rem",
                    fontWeight:    400,
                    letterSpacing: "-0.05em",
                    lineHeight:    1,
                    mixBlendMode:  "overlay",
                    pointerEvents: "none",
                    userSelect:    "none",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* ── Chapters — Mobile stacked ────────────────────────────────────── */}
        <div className="lg:hidden">
          {CHAPTERS.map((chapter, i) => {
            const copy = chapter[locale];
            return (
              <div
                key={chapter.id}
                style={{ backgroundColor: CHAPTER_BG[i], padding: "clamp(3rem, 6vw, 5rem) 1.5rem" }}
              >
                <div style={{ aspectRatio: "16/10", overflow: "hidden", borderRadius: 2, marginBottom: "2rem" }}>
                  <img src={chapter.image} alt={copy.eyebrow} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <p className="text-eyebrow mb-5" style={{ color: "rgba(255,255,255,0.55)" }}>{copy.eyebrow}</p>
                <h2 className="font-normal mb-5" style={{ color: "rgba(255,255,255,0.95)", fontSize: "clamp(1.6rem, 5vw, 2.4rem)", letterSpacing: "-0.025em", lineHeight: 1.1 }}>
                  {copy.headline}
                </h2>
                {"intro" in copy
                  ? <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: "1.5rem" }}>{copy.intro}</p>
                  : "body" in copy
                    ? <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: "1.5rem" }}>{copy.body}</p>
                    : null
                }
                {"keyDrivers" in copy ? (
                  <>
                    {[
                      { heading: locale === "de" ? "Schlüsselfaktoren" : "Key Factors", items: copy.keyDrivers },
                      { heading: locale === "de" ? "Markt-Highlights" : "Highlights", items: copy.marketHighlights },
                    ].map(({ heading, items }) => (
                      <div key={heading} style={{ marginBottom: "1.25rem" }}>
                        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.5rem" }}>{heading}</p>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                          {items.map((item: string) => (
                            <li key={item} style={{ display: "flex", gap: "0.5rem", color: "rgba(255,255,255,0.9)", fontSize: "0.95rem", lineHeight: 1.5 }}>
                              <span style={{ color: "rgba(204,168,124,0.7)", flexShrink: 0 }}>—</span>{item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.82rem", lineHeight: 1.6, fontStyle: "italic", borderLeft: "2px solid rgba(204,168,124,0.3)", paddingLeft: "0.75rem", marginBottom: "1.25rem" }}>
                      {copy.legalNote}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                      {copy.downloads.map((dl: { label: string; href: string }) => (
                        <a key={dl.label} href={dl.href} style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "50px", padding: "0.4rem 0.875rem" }}>
                          {dl.label}
                        </a>
                      ))}
                    </div>
                  </>
                ) : (
                  <a href="/contact" style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", borderBottom: "1px solid rgba(255,255,255,0.3)", paddingBottom: "0.2rem" }}>
                    {copy.cta}
                  </a>
                )}
              </div>
            );
          })}
        </div>


      </main>

      <Footer />

      {/* ── Dev: colour picker ──────────────────────────────────────────── */}
      <div style={{
        display: "none",
        position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 9999,
        background: "rgba(15,15,15,0.92)", backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12,
        padding: "1rem 1.25rem", color: "#fff", fontFamily: "monospace",
        fontSize: 12, width: 220, flexDirection: "column", gap: "0.75rem",
      }}>
        <div style={{ fontWeight: 700, letterSpacing: "0.08em", opacity: 0.5, fontSize: 10 }}>
          SECTION COLORS
        </div>
        {CHAPTERS.map((ch, i) => (
          <label key={ch.id} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <input
              type="color"
              value={uiColors[i]}
              onChange={e => handleColorChange(i, e.target.value)}
              style={{ width: 28, height: 28, border: "none", background: "none", cursor: "pointer", borderRadius: 4, padding: 0 }}
            />
            <span style={{ opacity: 0.7, fontSize: 11 }}>
              {`0${i + 1} · `}<strong style={{ color: "#f4c97a" }}>{uiColors[i]}</strong>
            </span>
          </label>
        ))}
        <div style={{ opacity: 0.4, fontSize: 10, lineHeight: 1.4 }}>
          Copia los hex y pegálos en CHAPTER_BG
        </div>
      </div>
    </>
  );
}
