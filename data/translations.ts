/* ─────────────────────────────────────────────────────────────────────────────
   Sacramentum Advisors — Translation Dictionary
   Bilingual: English (en) | Spanish (es)

   Usage:
     import { t, type Locale } from "@/data/translations"
     const copy = t("en")
     copy.nav.home  // → "Home"
   ─────────────────────────────────────────────────────────────────────────── */

export type Locale = "en" | "de";

export interface SiteTranslations {
  locale: Locale;
  siteName: string;
  siteTagline: string;

  nav: {
    home:       string;
    whyUruguay: string;
    sectors:    string;
    team:       string;
    news:       string;
    blog:       string;
    contact:    string;
    langToggle: string;
  };

  hero: {
    eyebrow:    string;
    headline:   string;
    subheadline:string;
    cta:        string;
    ctaSecondary: string;
    scrollLabel: string;
  };

  // ── Sections scaffolded for future use ──────────────────────────────────
  whyUruguay: {
    eyebrow:    string;
    headline:   string;
    subheadline:string;
    stats: Array<{ value: string; label: string }>;
    cards: Array<{
      id:          string;
      icon:        string;
      title:       string;
      description: string;
    }>;
  };

  sectors: {
    eyebrow:    string;
    headline:   string;
    subheadline:string;
    items: Array<{
      id:          string;
      title:       string;
      description: string;
    }>;
  };

  howWeSupport: {
    eyebrow:    string;
    headline:   string;
    subheadline:string;
    cta:        string;
    cards: Array<{
      id:          string;
      image:       string;
      title:       string;
      description: string;
    }>;
  };

  whySacramentum: {
    eyebrow:    string;
    headline:   string;
    subheadline:string;
    cards: Array<{
      id:          string;
      roman:       string;
      eyebrow:     string;
      title:       string;
      description: string;
    }>;
  };

  lifestyleAssets: {
    eyebrow:    string;
    headline:   string;
    subheadline:string;
  };

  trust: {
    eyebrow:    string;
    headline:   string;
    body:       string;
  };

  team: {
    eyebrow:  string;
    headline: string;
    leadership: Array<{
      id:    string;
      image: string;
      name:  string;
      role:  string;
      bio:   string;
    }>;
    advisory: {
      eyebrow:    string;
      headline:   string;
      subheadline:string;
      members: Array<{
        id:    string;
        image: string;
        name:  string;
        role:  string;
        bio:   string;
      }>;
    };
  };

  news: {
    eyebrow:    string;
    headline:   string;
    subtitle:   string;
    viewAll:    string;
    readArticle:string;
    articles: Array<{
      id:       string;
      image:    string;
      category: string;
      title:    string;
      excerpt:  string;
      slug:     string;
      date?:    string;
    }>;
  };

  contact: {
    eyebrow:    string;
    headline:   string;
    subheadline:string;
    cta:        string;
  };

  contactPage: {
    meta: {
      title:       string;
      description: string;
    };
    eyebrow:  string;
    headline: string;
    intro:    string;
    form: {
      nameLabel:           string;
      namePlaceholder:     string;
      emailLabel:          string;
      emailPlaceholder:    string;
      phoneLabel:          string;
      phonePlaceholder:    string;
      countryLabel:        string;
      countryPlaceholder:  string;
      interestLabel:       string;
      interestPlaceholder: string;
      interestOptions: Array<{ value: string; label: string }>;
      messageLabel:        string;
      messagePlaceholder:  string;
      submit:              string;
      submitting:          string;
    };
    success: {
      headline: string;
      body:     string;
    };
    info: {
      heading:   string;
      location1: string;
      location2: string;
      email:     string;
      phone:     string;
      trustNote: string;
    };
  };

  closingCta: {
    eyebrow:  string;
    headline: string;
    body:     string;
    cta:      string;
  };

  footer: {
    brand: {
      tagline: string;
    };
    nav: {
      title: string;
      links: Array<{ label: string; href: string }>;
    };
    services: {
      title: string;
      links: Array<{ label: string; href: string }>;
    };
    contact: {
      title:    string;
      location: string;
      email:    string;
    };
    legal: {
      copyright: string;
      privacy:   string;
      terms:     string;
    };
  };
}

// ─── English ─────────────────────────────────────────────────────────────────
const en: SiteTranslations = {
  locale:      "en",
  siteName:    "Sacramentum Advisors",
  siteTagline: "Principled Advisory. Strategic Assets. Latin America's Most Stable Market.",

  nav: {
    home:       "Home",
    whyUruguay: "Why Uruguay",
    sectors:    "Services",
    team:       "Team",
    news:       "News",
    blog:       "Blog",
    contact:    "Contact",
    langToggle: "DE",
  },

  hero: {
    eyebrow:     "Strategic Asset Acquisition",
    headline:    "We help you establish your strategic footprint in Uruguay.",
    subheadline: "Bespoke residency, real estate, and capital structuring for those seeking a foundational base in Latin America's premier haven.",
    cta:         "Schedule a call",
    ctaSecondary:"Explore Uruguay",
    scrollLabel: "Scroll to explore",
  },

  whyUruguay: {
    eyebrow:     "Why Uruguay",
    headline:    "Why Uruguay?",
    subheadline: "A stable, globally connected platform for capital preservation, regional expansion, and long-term family positioning.",
    stats: [
      { value: "#1",   label: "Least corruption in Latin America" },
      { value: "97%",  label: "Renewable energy" },
      { value: "98%",  label: "Literacy rate" },
      { value: "3.5M", label: "Population" },
    ],
    cards: [
      {
        id:          "stability",
        icon:        "shield",
        title:       "Institutional Stability & Trust",
        description: "Uruguay stands out for democratic strength, legal certainty, and the lowest corruption levels in the region. In a volatile continent, it offers seriousness, predictability, and long-term confidence.",
      },
      {
        id:          "innovation",
        icon:        "circuit",
        title:       "A Future-Ready Innovation Ecosystem",
        description: "A regional leader in telecommunications, digital government, and renewable energy, Uruguay combines natural wealth with forward-looking innovation and sustainability policies.",
      },
      {
        id:          "talent",
        icon:        "people",
        title:       "Highly Skilled, Digitally Integrated Talent",
        description: "With one of the world's highest literacy rates and strong digital inclusion, Uruguay offers qualified talent and an educated workforce prepared for long-term growth.",
      },
      {
        id:          "quality",
        icon:        "leaf",
        title:       "Quality of Life as a Strategic Asset",
        description: "Safety, healthcare, education, and social openness make Uruguay an ideal environment for executives, founders, and families seeking both protection and lifestyle quality.",
      },
      {
        id:          "geography",
        icon:        "globe",
        title:       "A Privileged Geographic Position",
        description: "With direct Mercosur access, strong logistics, and excellent regional connectivity, Uruguay is a highly efficient gateway to South America and global trade routes.",
      },
      {
        id:          "tax",
        icon:        "document",
        title:       "Tax Incentives & Investment Regimes",
        description: "Free zones, tax incentives, residency advantages, and investor-friendly regimes create an attractive environment for foreign capital and long-term strategic establishment.",
      },
    ],
  },

  sectors: {
    eyebrow:     "Our Sectors",
    headline:    "Where we guide capital.",
    subheadline: "We specialize in the most resilient and appreciating asset categories Uruguay has to offer.",
    items: [
      {
        id:          "residential",
        title:       "Luxury Residential",
        description: "Private residences and coastal estates in Uruguay's most coveted locations.",
      },
      {
        id:          "agricultural",
        title:       "Agricultural Land",
        description: "Productive farmland with long-term value — forestry, soy, and cattle ranches.",
      },
      {
        id:          "commercial",
        title:       "Commercial Assets",
        description: "Strategic commercial real estate in Montevideo and growth corridors.",
      },
      {
        id:          "equestrian",
        title:       "Equestrian & Ranches",
        description: "Curated estancias and equestrian properties for families and investors.",
      },
    ],
  },

  howWeSupport: {
    eyebrow:     "Our Support",
    headline:    "How We Support You",
    subheadline: "From market intelligence and transaction structuring to residency, local establishment, and long-term capital positioning, our team supports each stage of your investment move into Uruguay.",
    cta:         "Schedule a private advisory call",
    cards: [
      {
        id:          "soft-landing",
        image:       "/images/hands.webp",
        title:       "Soft Landing Partnerships",
        description: "Our network of legal, financial, tax, and ecosystem partners ensures close support throughout every stage of your establishment process, from residency and structuring to local integration and operational setup.",
      },
      {
        id:          "market-intelligence",
        image:       "/images/puerto.webp",
        title:       "Market Intelligence",
        description: "We conduct opportunity-specific research, sector analysis, risk evaluation, and competitive mapping to give you clear visibility before making high-stakes investment or relocation decisions.",
      },
      {
        id:          "strategic-advisory",
        image:       "/images/writing.webp",
        title:       "Strategic Advisory",
        description: "Our legal and financial experts help assess opportunities, structure transactions, and plan your long-term landing across Uruguay and the wider South American region.",
      },
      {
        id:          "investment-banking",
        image:       "/images/bandera.webp",
        title:       "Investment banking boutique",
        description: "Through Sacramentum Capital, we provide professional advisory across M&A, capital markets advisory, institutional relationships, and investment proyects law, supporting sophisticated transactions with precision and strategic clarity.",
      },
    ],
  },

  whySacramentum: {
    eyebrow:     "Why Sacramentum",
    headline:    "Why Sacramentum?",
    subheadline: "A trust-first advisory platform built on senior execution, institutional access, and long-term alignment.",
    cards: [
      {
        id:          "seniority",
        roman:       "I",
        eyebrow:     "Track Record",
        title:       "Seniority & Track Record",
        description: "Our team brings decades of leadership across strategic advisory, institutional promotion, and cross-border capital decisions, delivering judgment shaped by real senior experience.",
      },
      {
        id:          "network",
        roman:       "II",
        eyebrow:     "Network",
        title:       "Public-to-Private Insider Network",
        description: "Our experience across both public and private sectors provides direct access to institutional frameworks, strategic relationships, and trusted regional partners across Uruguay, Argentina, and Paraguay.",
      },
      {
        id:          "trust",
        roman:       "III",
        eyebrow:     "Alignment",
        title:       "A Boutique, Trust-First Approach",
        description: "Trust is our most valuable asset. We only move into formal engagement when full alignment exists around your long-term vision, family priorities, and capital strategy.",
      },
    ],
  },

  lifestyleAssets: {
    eyebrow:     "Lifestyle Assets",
    headline:    "Where capital and life converge.",
    subheadline: "Beyond pure investment — assets that enrich the lives of the families who own them.",
  },

  trust: {
    eyebrow: "Our Commitment",
    headline:"We do not manage assets. We guard legacies.",
    body:    "Sacramentum Advisors was founded on the principle that the most important advisory relationships are built on total confidentiality, absolute integrity, and a deep understanding of what families are truly protecting.",
  },

  team: {
    eyebrow:  "Our Team",
    headline: "Our Team",
    leadership: [
      {
        id:    "ines",
        image: "/images/ines.png",
        name:  "Inés Bonicelli",
        role:  "Managing Director",
        bio:   "Holds a Bachelor's degree in Business Management from the Universidad Católica del Uruguay and an MBA from the University of Michigan, with an extensive career spanning the public, private, and civil society sectors. She began her career in the meatpacking industry before moving on to roles at ABN AMRO, Citi, and Bozano Simonsen (Rio de Janeiro, Brazil).\n\nDuring a decade in the United States, she founded and led Reaching U, a Foundation for Uruguay, and managed a showroom in New York. From 2020 to 2025, she served as Deputy Executive Director at Uruguay XXI, leading key initiatives for foreign investment attraction. She subsequently became Business Developer at the Uruguay Innovation Hub, a government program focused on promoting entrepreneurship, strengthening the innovation ecosystem, and attracting venture capital.",
      },
      {
        id:    "pablo",
        image: "/images/pablo.png",
        name:  "Pablo Mautone",
        role:  "Director",
        bio:   "Pablo Mautone is the founder and director of Sacramentum Capital, an investment banking firm headquartered in Uruguay, recognized for its strategic leadership, reliability, and professional approach. He brings a solid international track record, having served as Vice President of Investment Banking at J.P. Morgan and Lehman Brothers, with a specialized focus on energy, infrastructure, and agribusiness.\n\nHis career also includes a distinguished tenure at Bozano Simonsen in Rio de Janeiro and experience at VR Hedge Fund. Combining deep technical expertise, professional rigor, and a discreet leadership style, Pablo leads Sacramentum Capital in delivering high-impact financial solutions and top-confidentiality strategic advisory focused on generating real and sustainable value for clients.",
      },
    ],
    advisory: {
      eyebrow:    "Advisory Board",
      headline:   "Advisory Board",
      subheadline:"Our advisory board extends our reach across public policy, infrastructure, sustainability, technology, and regional institutional networks.",
      members: [
        {
          id:    "omar",
          image: "/images/omar.webp",
          name:  "Omar Paganini",
          role:  "Energy & Public Policy",
          bio:   "Electrical engineer, academic, and Uruguayan politician with a distinguished career in the public and private sectors. He served as Uruguay's Minister of Industry, Energy and Mining (2020–2023), and subsequently as Minister of Foreign Affairs (2023–2025). His deep expertise in energy, technology, and telecommunications, combined with strategic vision and experience in public and private management, make him a key reference and high-value advisor on development and innovation.",
        },
        {
          id:    "guillermo",
          image: "/images/guillermo.webp",
          name:  "Guillermo Javier Dietrich",
          role:  "Infrastructure & Mobility",
          bio:   "Economist from the Universidad Católica Argentina with an MBA from IAE. Entrepreneur, businessman, and politician with extensive experience in public and private management. From 2009 to 2015 he led the transformation of Buenos Aires City's transit and transportation systems. He served as Argentina's Minister of Transport (2015–2019), leading one of the largest ministries in government. Currently a member of the PRO party council, leads G25, and advises organizations across the private and public sectors.",
        },
        {
          id:    "eleanor",
          image: "/images/PaulinaFernandez.jpg",
          name:  "Paulina Fernandez Rubio",
          role:  "Investment Sales & Wealth",
          bio:   "Paulina is a distinguished investment sales professional with a stellar track record in investment product brokerage and personal wealth management across Europe and South America. With a natural talent for sales and exceptional relationship-building skills, Paulina excels at connecting with high-net-worth individuals. She brings extensive multinational financial services experience from top-tier institutions like Citibank, Merrill Lynch, and Lloyds TSB, all backed by a Business Administration degree with a finance emphasis. A true global citizen, Paulina is fluent in Spanish, English, Portuguese, French, and German. Her studies and professional connections extend across the USA, Switzerland, Spain, and South America, particularly in Argentina, Brazil, and Uruguay. Married to an expatriate marketing executive, Paulina's dynamic career has taken her across the globe, living in Montevideo, Lima, Dubai, Rio de Janeiro, Zurich, and Barcelona between 2003–2017.",
        },
      ],
    },
  },

  news: {
    eyebrow:     "Uruguay in the News",
    headline:    "Uruguay in the News",
    subtitle:    "Discover the latest stories and insights that showcase Uruguay's potential as an investment destination and cultural hub.",
    viewAll:     "View all articles",
    readArticle: "Visit article",
    articles: [
      {
        id:       "port",
        image:    "/images/news/port.avif",
        category: "Economy",
        title:    "Montevideo Port: Gateway to South American Trade",
        excerpt:  "How Uruguay's strategic location and world-class port infrastructure continue to position Montevideo as a leading logistics and trade hub in the region.",
        slug:     "montevideo-port-gateway-south-american-trade",
        date:     "2025-03-14",
      },
      {
        id:       "montevideo",
        image:    "/images/news/montevideo.avif",
        category: "Lifestyle",
        title:    "The Walking City: Graceful Montevideo",
        excerpt:  "A closer look at Montevideo's waterfront culture, urban rhythm, and high quality of life, making it increasingly attractive for global families and investors.",
        slug:     "the-walking-city-graceful-montevideo",
        date:     "2025-02-28",
      },
      {
        id:       "investment",
        image:    "/images/news/investment.avif",
        category: "Investment",
        title:    "Uruguay's Rising Investment Leaders",
        excerpt:  "The professionals and institutions helping shape Uruguay's next chapter as a stable, internationally connected destination for capital and innovation.",
        slug:     "uruguays-rising-investment-leaders",
        date:     "2025-01-19",
      },
      {
        id:       "agri-boom",
        image:    "/images/woods.avif",
        category: "Investment",
        title:    "Agricultural Land in Uruguay: A Generational Asset Class",
        excerpt:  "With fertile prairies, dollar-denominated transactions, and no restrictions on foreign ownership, Uruguay's farmland is quietly becoming one of the most compelling long-term holds in the Southern Hemisphere.",
        slug:     "agricultural-land-uruguay-generational-asset",
        date:     "2025-04-05",
      },
      {
        id:       "tech-hub",
        image:    "/placeholders/pde.avif",
        category: "Economy",
        title:    "Zonamerica: Inside Latin America's Premier Free Trade Zone",
        excerpt:  "How a visionary free trade zone north of Montevideo became the anchor for Uruguay's technology export boom — and why global companies keep choosing it over cheaper alternatives.",
        slug:     "zonamerica-latin-america-premier-free-trade-zone",
        date:     "2025-03-22",
      },
      {
        id:       "residency",
        image:    "/placeholders/lapalom.avif",
        category: "Lifestyle",
        title:    "Why High-Net-Worth Families Are Choosing Uruguayan Residency",
        excerpt:  "Stable institutions, competitive tax treatment, and a genuinely high quality of life have made Uruguay the residency choice of an increasingly diverse global cohort — from Latin American executives to European retirees.",
        slug:     "high-net-worth-families-uruguayan-residency",
        date:     "2025-02-14",
      },
      {
        id:       "pde-market",
        image:    "/placeholders/hero-coast.avif",
        category: "Investment",
        title:    "Punta del Este: Beyond the Seasonal Myth",
        excerpt:  "Long dismissed as a summer destination, Punta del Este's real estate market has matured into a year-round proposition — driven by remote work migration, Uruguayan residency demand, and a shrinking supply of premium coastal lots.",
        slug:     "punta-del-este-beyond-seasonal-myth",
        date:     "2025-01-30",
      },
      {
        id:       "governance",
        image:    "/placeholders/colonia.avif",
        category: "Economy",
        title:    "Governance Premium: Why Uruguay's Institutions Command a Risk Discount",
        excerpt:  "In a region where political risk is the default assumption, Uruguay's consistent institutional track record — across left and right administrations alike — produces something rare: a genuine governance premium that sophisticated investors are beginning to price in.",
        slug:     "governance-premium-uruguays-institutions",
        date:     "2024-12-18",
      },
    ],
  },

  contact: {
    eyebrow:     "Contact",
    headline:    "Begin a confidential conversation.",
    subheadline: "We work with a select number of clients. All inquiries are handled with complete discretion.",
    cta:         "Request a consultation",
  },

  closingCta: {
    eyebrow:  "Begin a Conversation",
    headline: "Ready to explore your move into Uruguay?",
    body:     "Whether you are evaluating residency, capital deployment, family relocation, or long-term strategic establishment, our team offers discreet senior-level guidance tailored to your priorities.",
    cta:      "Book a private consultation",
  },

  contactPage: {
    meta: {
      title:       "Private Consultation | Sacramentum Advisors",
      description: "Connect with the Sacramentum Advisors team to discuss residency, strategic asset acquisition, lifestyle assets, or long-term positioning in Uruguay.",
    },
    eyebrow:  "Private Consultation",
    headline: "Connect with our team.",
    intro:    "Connect with our team in Uruguay to discuss residency, strategic asset acquisition, lifestyle assets, or long-term positioning in the region.",
    form: {
      nameLabel:           "Full Name",
      namePlaceholder:     "Your full name",
      emailLabel:          "Email Address",
      emailPlaceholder:    "your@email.com",
      phoneLabel:          "Phone Number",
      phonePlaceholder:    "Optional",
      countryLabel:        "Country of Residence",
      countryPlaceholder:  "e.g. United States",
      interestLabel:       "Area of Interest",
      interestPlaceholder: "Select an area",
      interestOptions: [
        { value: "not-sure",               label: "I'm not sure yet — just exploring" },
        { value: "residency",              label: "Residency"                  },
        { value: "strategic-acquisition",  label: "Strategic Asset Acquisition" },
        { value: "lifestyle-assets",       label: "Lifestyle Assets"            },
        { value: "real-estate",            label: "Real Estate Opportunities"   },
        { value: "agriculture-forestry",   label: "Agriculture & Forestry"      },
        { value: "special-situations",     label: "Special Situations"          },
        { value: "general-advisory",       label: "General Advisory"            },
      ],
      messageLabel:        "Message",
      messagePlaceholder:  "Tell us briefly about your priorities and how we can help.",
      submit:              "Request a Private Consultation",
      submitting:          "Sending…",
    },
    success: {
      headline: "Thank you for reaching out.",
      body:     "We have received your enquiry and will respond within one to two business days. All correspondence is handled with complete discretion.",
    },
    info: {
      heading:   "Contact Information",
      location1: "Montevideo, Uruguay",
      location2: "Carrasco, Montevideo",
      email:     "ines@sacramentumcapital.com",
      phone:     "+598 95 532 533",
      trustNote: "All conversations are handled with discretion and senior-level attention.",
    },
  },

  footer: {
    brand: {
      tagline: "Strategic advisory for long-term positioning in Uruguay.",
    },
    nav: {
      title: "Navigation",
      links: [
        { label: "Home",        href: "/"             },
        { label: "Why Uruguay", href: "/invest"        },
        { label: "Services",    href: "/services"     },
        { label: "News",        href: "/news"         },
        { label: "Contact",     href: "/contact"      },
      ],
    },
    services: {
      title: "Services",
      links: [
        { label: "Strategic Advisory",          href: "/services?card=strategic-advisory" },
        { label: "Market Intelligence",          href: "/services?card=market-intelligence" },
        { label: "Soft Landing Partnerships",    href: "/services?card=soft-landing" },
        { label: "Boutique Investment Banking",  href: "/services?card=investment-banking" },
      ],
    },
    contact: {
      title:    "Contact",
      location: "Carrasco, Montevideo",
      email:    "ines@sacramentumcapital.com",
    },
    legal: {
      copyright: "© 2025 Sacramentum Advisors. All rights reserved.",
      privacy:   "Privacy Policy",
      terms:     "Terms of Service",
    },
  },
};

// ─── German ──────────────────────────────────────────────────────────────────
const de: SiteTranslations = {
  locale:      "de",
  siteName:    "Sacramentum Advisors",
  siteTagline: "Prinzipientreue Beratung. Strategische Vermögenswerte. Lateinamerikas stabilster Markt.",

  nav: {
    home:       "Startseite",
    whyUruguay: "Warum Uruguay",
    sectors:    "Leistungen",
    team:       "Team",
    news:       "Aktuelles",
    blog:       "Blog",
    contact:    "Kontakt",
    langToggle: "EN",
  },

  hero: {
    eyebrow:     "Strategischer Vermögenserwerb",
    headline:    "Wir helfen Ihnen, Ihren strategischen Standort in Uruguay aufzubauen.",
    subheadline: "Maßgeschneiderte Aufenthaltsgestaltung, Immobilien und Kapitalstrukturierung für diejenigen, die eine dauerhafte Basis in Lateinamerikas führendem sicheren Hafen suchen.",
    cta:         "Gespräch vereinbaren",
    ctaSecondary:"Uruguay entdecken",
    scrollLabel: "Entdecken",
  },

  whyUruguay: {
    eyebrow:     "Warum Uruguay",
    headline:    "Warum Uruguay?",
    subheadline: "Eine stabile, global vernetzte Plattform für Kapitalerhalt, regionale Expansion und langfristige Familienpositionierung.",
    stats: [
      { value: "#1",   label: "Geringste Korruption in Lateinamerika" },
      { value: "97%",  label: "Erneuerbare Energien" },
      { value: "98%",  label: "Alphabetisierungsrate" },
      { value: "3.5M", label: "Einwohner" },
    ],
    cards: [
      {
        id:          "stability",
        icon:        "shield",
        title:       "Institutionelle Stabilität & Vertrauen",
        description: "Uruguay zeichnet sich durch demokratische Stärke, Rechtssicherheit und die niedrigsten Korruptionswerte der Region aus. In einem volatilen Kontinent bietet es Seriosität, Berechenbarkeit und langfristiges Vertrauen.",
      },
      {
        id:          "innovation",
        icon:        "circuit",
        title:       "Ein zukunftsorientiertes Innovationsökosystem",
        description: "Als regionaler Vorreiter in Telekommunikation, digitalem Regieren und erneuerbaren Energien verbindet Uruguay natürlichen Reichtum mit vorausschauender Innovation und Nachhaltigkeitspolitik.",
      },
      {
        id:          "talent",
        icon:        "people",
        title:       "Hochqualifiziertes, digital vernetztes Humankapital",
        description: "Mit einer der weltweit höchsten Alphabetisierungsraten und starker digitaler Inklusion bietet Uruguay qualifizierte Fachkräfte und eine gut ausgebildete Belegschaft für langfristiges Wachstum.",
      },
      {
        id:          "quality",
        icon:        "leaf",
        title:       "Lebensqualität als strategisches Asset",
        description: "Sicherheit, Gesundheitsversorgung, Bildung und gesellschaftliche Offenheit machen Uruguay zu einem idealen Umfeld für Führungskräfte, Gründer und Familien, die sowohl Schutz als auch hohe Lebensqualität suchen.",
      },
      {
        id:          "geography",
        icon:        "globe",
        title:       "Eine privilegierte geografische Lage",
        description: "Mit direktem Mercosur-Zugang, starker Logistik und exzellenter regionaler Anbindung ist Uruguay ein hocheffizientes Tor nach Südamerika und zu globalen Handelsrouten.",
      },
      {
        id:          "tax",
        icon:        "document",
        title:       "Steuerliche Anreize & Investitionsregime",
        description: "Freizonen, Steuervergünstigungen, Aufenthaltsvorteile und investorenfreundliche Regelungen schaffen ein attraktives Umfeld für ausländisches Kapital und langfristige strategische Niederlassung.",
      },
    ],
  },

  sectors: {
    eyebrow:     "Unsere Sektoren",
    headline:    "Wo wir Kapital lenken.",
    subheadline: "Wir sind auf die widerstandsfähigsten und wertsteigerungsstärksten Anlagekategorien spezialisiert, die Uruguay zu bieten hat.",
    items: [
      {
        id:          "residential",
        title:       "Luxuswohnimmobilien",
        description: "Private Residenzen und Küstenanwesen in Uruguays begehrtesten Lagen.",
      },
      {
        id:          "agricultural",
        title:       "Agrarland",
        description: "Produktives Farmland mit langfristigem Wert – Forstwirtschaft, Soja und Rinderfarmen.",
      },
      {
        id:          "commercial",
        title:       "Gewerbeimmobilien",
        description: "Strategische Gewerbeimmobilien in Montevideo und Wachstumskorridoren.",
      },
      {
        id:          "equestrian",
        title:       "Estancias & Reitanlagen",
        description: "Ausgewählte Estancias und Reitimmobilien für Familien und Investoren.",
      },
    ],
  },

  howWeSupport: {
    eyebrow:     "Unsere Unterstützung",
    headline:    "Wie wir Sie begleiten",
    subheadline: "Von Marktintelligenz und Transaktionsstrukturierung bis hin zu Aufenthaltsgenehmigung, lokaler Etablierung und langfristiger Kapitalpositionierung begleitet unser Team Sie in jeder Phase Ihres Markteintritts in Uruguay.",
    cta:         "Privates Beratungsgespräch vereinbaren",
    cards: [
      {
        id:          "soft-landing",
        image:       "/images/hands.webp",
        title:       "Soft Landing Partnerships",
        description: "Unser Netzwerk aus Rechts-, Finanz-, Steuer- und Ökosystempartnern gewährleistet eine enge Begleitung in jeder Phase Ihres Niederlassungsprozesses – von Aufenthalt und Strukturierung bis zur lokalen Integration und operativen Einrichtung.",
      },
      {
        id:          "market-intelligence",
        image:       "/images/puerto.webp",
        title:       "Marktintelligenz",
        description: "Wir führen opportunitätsspezifische Recherchen, Sektoranalysen, Risikobewertungen und Wettbewerbsanalysen durch, um Ihnen vor wichtigen Investitions- oder Umzugsentscheidungen klare Einblicke zu verschaffen.",
      },
      {
        id:          "strategic-advisory",
        image:       "/images/writing.webp",
        title:       "Strategische Beratung",
        description: "Unsere Rechts- und Finanzexperten helfen dabei, Chancen zu bewerten, Transaktionen zu strukturieren und Ihre langfristige Niederlassung in Uruguay und der weiteren südamerikanischen Region zu planen.",
      },
      {
        id:          "investment-banking",
        image:       "/images/bandera.webp",
        title:       "Investment Banking Boutique",
        description: "Über Sacramentum Capital bieten wir professionelle Beratung in M&A, Kapitalmarktberatung, institutionellen Beziehungen und Investitionsprojektrecht und unterstützen anspruchsvolle Transaktionen mit Präzision und strategischer Klarheit.",
      },
    ],
  },

  whySacramentum: {
    eyebrow:     "Warum Sacramentum",
    headline:    "Warum Sacramentum?",
    subheadline: "Eine vertrauensorientierte Beratungsplattform, aufgebaut auf Senior-Execution, institutionellem Zugang und langfristiger Ausrichtung.",
    cards: [
      {
        id:          "seniority",
        roman:       "I",
        eyebrow:     "Erfolgsbilanz",
        title:       "Seniorität & Erfolgsbilanz",
        description: "Unser Team bringt jahrzehntelange Führungserfahrung in strategischer Beratung, institutioneller Förderung und grenzüberschreitenden Kapitalentscheidungen mit – geprägt durch echte Senior-Erfahrung.",
      },
      {
        id:          "network",
        roman:       "II",
        eyebrow:     "Netzwerk",
        title:       "Öffentlich-privates Insider-Netzwerk",
        description: "Unsere Erfahrung im öffentlichen und privaten Sektor ermöglicht direkten Zugang zu institutionellen Rahmenbedingungen, strategischen Beziehungen und vertrauenswürdigen regionalen Partnern in Uruguay, Argentinien und Paraguay.",
      },
      {
        id:          "trust",
        roman:       "III",
        eyebrow:     "Ausrichtung",
        title:       "Ein Boutique-Ansatz, bei dem Vertrauen an erster Stelle steht",
        description: "Vertrauen ist unser wertvollstes Asset. Wir gehen nur dann eine formale Zusammenarbeit ein, wenn volle Übereinstimmung mit Ihrer langfristigen Vision, Ihren familiären Prioritäten und Ihrer Kapitalstrategie besteht.",
      },
    ],
  },

  lifestyleAssets: {
    eyebrow:     "Lifestyle-Assets",
    headline:    "Wo Kapital und Leben zusammentreffen.",
    subheadline: "Über reine Investitionen hinaus – Assets, die das Leben der Familien bereichern, die sie besitzen.",
  },

  trust: {
    eyebrow: "Unser Versprechen",
    headline:"Wir verwalten keine Vermögen. Wir hüten Vermächtnisse.",
    body:    "Sacramentum Advisors wurde nach dem Grundsatz gegründet, dass die wichtigsten Beratungsbeziehungen auf absoluter Vertraulichkeit, uneingeschränkter Integrität und einem tiefen Verständnis dessen aufgebaut werden, was Familien wirklich schützen.",
  },

  team: {
    eyebrow:  "Unser Team",
    headline: "Unser Team",
    leadership: [
      {
        id:    "ines",
        image: "/images/ines.png",
        name:  "Inés Bonicelli",
        role:  "Geschäftsführende Direktorin",
        bio:   "Inés Bonicelli hat einen Bachelor in Unternehmensführung der Universidad Católica del Uruguay sowie einen MBA der University of Michigan und verfügt über eine umfangreiche Karriere in den Bereichen öffentlicher Sektor, Privatwirtschaft und Zivilgesellschaft. Ihre Karriere begann sie in der Fleischindustrie, bevor sie Positionen bei ABN AMRO, Citi und Bozano Simonsen (Rio de Janeiro, Brasilien) übernahm.\n\nWährend eines Jahrzehnts in den Vereinigten Staaten gründete und leitete sie Reaching U, a Foundation for Uruguay, und verwaltete einen Showroom in New York. Von 2020 bis 2025 war sie stellvertretende Geschäftsführerin bei Uruguay XXI und leitete wichtige Initiativen zur Auslandsinvestitionsförderung. Anschließend wurde sie Business Developer beim Uruguay Innovation Hub, einem Regierungsprogramm zur Förderung von Unternehmertum, Stärkung des Innovationsökosystems und Gewinnung von Risikokapital.",
      },
      {
        id:    "pablo",
        image: "/images/pablo.png",
        name:  "Pablo Mautone",
        role:  "Direktor",
        bio:   "Pablo Mautone ist Gründer und Direktor von Sacramentum Capital, einer in Uruguay ansässigen Investmentbank, die für strategische Führung, Zuverlässigkeit und professionelles Auftreten bekannt ist. Er bringt eine solide internationale Erfolgsbilanz mit und war als Vice President of Investment Banking bei J.P. Morgan und Lehman Brothers tätig, mit Schwerpunkt auf Energie, Infrastruktur und Agrarindustrie.\n\nSeine Karriere umfasst auch eine herausragende Tätigkeit bei Bozano Simonsen in Rio de Janeiro sowie Erfahrung beim VR Hedge Fund. Mit tiefer Fachkompetenz, professioneller Strenge und einem diskreten Führungsstil leitet Pablo Sacramentum Capital bei der Bereitstellung hochwirksamer Finanzlösungen und streng vertraulicher strategischer Beratung, ausgerichtet auf die Schaffung echter und nachhaltiger Werte für seine Mandanten.",
      },
    ],
    advisory: {
      eyebrow:    "Beirat",
      headline:   "Beirat",
      subheadline:"Unser Beirat erweitert unsere Reichweite in Politikgestaltung, Infrastruktur, Nachhaltigkeit, Technologie und regionale institutionelle Netzwerke.",
      members: [
        {
          id:    "omar",
          image: "/images/omar.webp",
          name:  "Omar Paganini",
          role:  "Energie & Öffentliche Politik",
          bio:   "Elektroingenieur, Akademiker und uruguayischer Politiker mit einer herausragenden Karriere im öffentlichen und privaten Sektor. Er war von 2020 bis 2023 Uruguays Minister für Industrie, Energie und Bergbau und anschließend Außenminister (2023–2025). Sein tiefes Fachwissen in Energie, Technologie und Telekommunikation, kombiniert mit strategischer Weitsicht und Erfahrung in öffentlichem und privatem Management, machen ihn zu einer Schlüsselreferenz und einem hochwertigen Berater für Entwicklung und Innovation.",
        },
        {
          id:    "guillermo",
          image: "/images/guillermo.webp",
          name:  "Guillermo Javier Dietrich",
          role:  "Infrastruktur & Mobilität",
          bio:   "Wirtschaftswissenschaftler der Universidad Católica Argentina mit einem MBA des IAE. Unternehmer, Geschäftsmann und Politiker mit umfangreicher Erfahrung im öffentlichen und privaten Management. Von 2009 bis 2015 leitete er die Transformation des Verkehrs- und Transportsystems der Stadt Buenos Aires. Er war von 2015 bis 2019 Argentiniens Verkehrsminister und leitete eines der größten Ministerien der Regierung. Derzeit Mitglied des PRO-Parteirats, leitet G25 und berät Organisationen im privaten und öffentlichen Sektor.",
        },
        {
          id:    "eleanor",
          image: "/images/PaulinaFernandez.jpg",
          name:  "Paulina Fernandez Rubio",
          role:  "Investment Sales & Vermögensverwaltung",
          bio:   "Paulina ist eine herausragende Investmentspezialistin mit einer beeindruckenden Erfolgsbilanz im Vertrieb von Anlageprodukten und im persönlichen Vermögensmanagement in Europa und Südamerika. Mit einem natürlichen Talent für Vertrieb und außergewöhnlichen Fähigkeiten im Beziehungsaufbau überzeugt sie im Umgang mit vermögenden Privatpersonen. Sie bringt umfangreiche multinationale Erfahrung aus erstklassigen Finanzinstitutionen wie Citibank, Merrill Lynch und Lloyds TSB mit, unterstützt durch einen Bachelor-Abschluss in Betriebswirtschaft mit Schwerpunkt Finanzen. Als echte Weltbürgerin spricht Paulina fließend Spanisch, Englisch, Portugiesisch, Französisch und Deutsch. Ihre Studien- und Berufskontakte erstrecken sich über die USA, die Schweiz, Spanien und Südamerika, insbesondere Argentinien, Brasilien und Uruguay. Verheiratet mit einem expatriierten Marketingmanager, hat Paulinas dynamische Karriere sie um die ganze Welt geführt, mit Aufenthalten in Montevideo, Lima, Dubai, Rio de Janeiro, Zürich und Barcelona zwischen 2003 und 2017.",
        },
      ],
    },
  },

  news: {
    eyebrow:     "Uruguay in den Medien",
    headline:    "Uruguay in den Medien",
    subtitle:    "Entdecken Sie die neuesten Berichte und Einblicke, die Uruguays Potenzial als Investitionsziel und kulturellen Knotenpunkt aufzeigen.",
    viewAll:     "Alle Artikel anzeigen",
    readArticle: "Artikel lesen",
    articles: [
      {
        id:       "port",
        image:    "/images/news/port.avif",
        category: "Wirtschaft",
        title:    "Hafen Montevideo: Tor zum südamerikanischen Handel",
        excerpt:  "Wie Uruguays strategische Lage und erstklassige Hafeninfrastruktur Montevideo als führenden Logistik- und Handelsknotenpunkt der Region positionieren.",
        slug:     "montevideo-port-gateway-south-american-trade",
        date:     "2025-03-14",
      },
      {
        id:       "montevideo",
        image:    "/images/news/montevideo.avif",
        category: "Lebensstil",
        title:    "Die Stadt zum Spazierengehen: Das elegante Montevideo",
        excerpt:  "Ein näherer Blick auf Montevideos Uferkultur, urbanen Rhythmus und hohe Lebensqualität – Faktoren, die die Stadt für internationale Familien und Investoren zunehmend attraktiv machen.",
        slug:     "the-walking-city-graceful-montevideo",
        date:     "2025-02-28",
      },
      {
        id:       "investment",
        image:    "/images/news/investment.avif",
        category: "Investition",
        title:    "Uruguays aufstrebende Investitionsführer",
        excerpt:  "Die Fachleute und Institutionen, die Uruguays nächstes Kapitel als stabiles, international vernetztes Ziel für Kapital und Innovation mitgestalten.",
        slug:     "uruguays-rising-investment-leaders",
        date:     "2025-01-19",
      },
      {
        id:       "agri-boom",
        image:    "/images/woods.avif",
        category: "Investition",
        title:    "Agrarland in Uruguay: Eine generationenübergreifende Anlageklasse",
        excerpt:  "Mit fruchtbaren Prärien, dollardenominierten Transaktionen und keinerlei Beschränkungen für ausländische Eigentümer entwickelt sich uruguayisches Farmland still zu einer der attraktivsten Langzeitanlagen der südlichen Hemisphäre.",
        slug:     "agricultural-land-uruguay-generational-asset",
        date:     "2025-04-05",
      },
      {
        id:       "tech-hub",
        image:    "/placeholders/pde.avif",
        category: "Wirtschaft",
        title:    "Zonamerica: Lateinamerikas führende Freihandelszone von innen",
        excerpt:  "Wie eine visionäre Freihandelszone nördlich von Montevideo zum Anker von Uruguays Technologieexportboom wurde – und warum globale Unternehmen sie günstigeren Alternativen weiterhin vorziehen.",
        slug:     "zonamerica-latin-america-premier-free-trade-zone",
        date:     "2025-03-22",
      },
      {
        id:       "residency",
        image:    "/placeholders/lapalom.avif",
        category: "Lebensstil",
        title:    "Warum vermögende Familien die uruguayische Residenz wählen",
        excerpt:  "Stabile Institutionen, wettbewerbsfähige Steuerbehandlung und eine genuine hohe Lebensqualität haben Uruguay zur Residenzwahl eines zunehmend diversen globalen Klientels gemacht – von lateinamerikanischen Führungskräften bis zu europäischen Rentnern.",
        slug:     "high-net-worth-families-uruguayan-residency",
        date:     "2025-02-14",
      },
      {
        id:       "pde-market",
        image:    "/placeholders/hero-coast.avif",
        category: "Investition",
        title:    "Punta del Este: Jenseits des Saisonmythos",
        excerpt:  "Lange als Sommerdestination abgetan, hat sich der Immobilienmarkt von Punta del Este zu einem Ganzjahresangebot entwickelt – angetrieben durch Remote-Work-Migration, uruguayische Residenzanfragen und ein schrumpfendes Angebot an erstklassigen Küstengrundstücken.",
        slug:     "punta-del-este-beyond-seasonal-myth",
        date:     "2025-01-30",
      },
      {
        id:       "governance",
        image:    "/placeholders/colonia.avif",
        category: "Wirtschaft",
        title:    "Governance-Prämie: Warum Uruguays Institutionen einen Risikoabschlag rechtfertigen",
        excerpt:  "In einer Region, in der politisches Risiko die Standardannahme ist, produziert Uruguays konsistente institutionelle Erfolgsbilanz – über linke und rechte Regierungen hinweg – etwas Seltenes: eine echte Governance-Prämie, die anspruchsvolle Investoren zunehmend einpreisen.",
        slug:     "governance-premium-uruguays-institutions",
        date:     "2024-12-18",
      },
    ],
  },

  contact: {
    eyebrow:     "Kontakt",
    headline:    "Beginnen Sie ein vertrauliches Gespräch.",
    subheadline: "Wir arbeiten mit einer ausgewählten Anzahl von Mandanten. Alle Anfragen werden mit absoluter Diskretion behandelt.",
    cta:         "Beratung anfragen",
  },

  closingCta: {
    eyebrow:  "Gespräch beginnen",
    headline: "Bereit, Ihren Schritt nach Uruguay zu erkunden?",
    body:     "Ob Sie Aufenthalt, Kapitalanlage, Familienumsiedlung oder langfristige strategische Etablierung in Betracht ziehen – unser Team bietet diskrete Beratung auf Senior-Niveau, maßgeschneidert auf Ihre Prioritäten.",
    cta:      "Private Beratung buchen",
  },

  contactPage: {
    meta: {
      title:       "Private Beratung | Sacramentum Advisors",
      description: "Treten Sie mit dem Team von Sacramentum Advisors in Kontakt, um Aufenthalt, strategischen Vermögenserwerb, Lifestyle-Assets oder langfristige Positionierung in Uruguay zu besprechen.",
    },
    eyebrow:  "Private Beratung",
    headline: "Treten Sie mit unserem Team in Kontakt.",
    intro:    "Treten Sie mit unserem Team in Uruguay in Kontakt, um Aufenthalt, strategischen Vermögenserwerb, Lifestyle-Assets oder langfristige Positionierung in der Region zu besprechen.",
    form: {
      nameLabel:           "Vollständiger Name",
      namePlaceholder:     "Ihr vollständiger Name",
      emailLabel:          "E-Mail-Adresse",
      emailPlaceholder:    "ihre@email.com",
      phoneLabel:          "Telefonnummer",
      phonePlaceholder:    "Optional",
      countryLabel:        "Wohnsitzland",
      countryPlaceholder:  "z.B. Deutschland",
      interestLabel:       "Interessensgebiet",
      interestPlaceholder: "Bereich auswählen",
      interestOptions: [
        { value: "not-sure",               label: "Noch nicht sicher – nur erkunden"      },
        { value: "residency",              label: "Aufenthalt"                             },
        { value: "strategic-acquisition",  label: "Strategischer Vermögenserwerb"          },
        { value: "lifestyle-assets",       label: "Lifestyle-Assets"                       },
        { value: "real-estate",            label: "Immobilienmöglichkeiten"                },
        { value: "agriculture-forestry",   label: "Landwirtschaft & Forstwirtschaft"       },
        { value: "special-situations",     label: "Besondere Situationen"                  },
        { value: "general-advisory",       label: "Allgemeine Beratung"                    },
      ],
      messageLabel:        "Nachricht",
      messagePlaceholder:  "Schildern Sie uns kurz Ihre Prioritäten und wie wir Ihnen helfen können.",
      submit:              "Private Beratung anfragen",
      submitting:          "Wird gesendet…",
    },
    success: {
      headline: "Vielen Dank für Ihre Kontaktaufnahme.",
      body:     "Wir haben Ihre Anfrage erhalten und werden innerhalb von ein bis zwei Werktagen antworten. Jede Korrespondenz wird mit absoluter Diskretion behandelt.",
    },
    info: {
      heading:   "Kontaktinformationen",
      location1: "Montevideo, Uruguay",
      location2: "Carrasco, Montevideo",
      email:     "ines@sacramentumcapital.com",
      phone:     "+598 95 532 533",
      trustNote: "Alle Gespräche werden mit Diskretion und Aufmerksamkeit auf Senior-Niveau geführt.",
    },
  },

  footer: {
    brand: {
      tagline: "Strategische Beratung für langfristige Positionierung in Uruguay.",
    },
    nav: {
      title: "Navigation",
      links: [
        { label: "Startseite",     href: "/"         },
        { label: "Warum Uruguay",  href: "/invest"   },
        { label: "Leistungen",     href: "/services" },
        { label: "Aktuelles",      href: "/news"     },
        { label: "Kontakt",        href: "/contact"  },
      ],
    },
    services: {
      title: "Leistungen",
      links: [
        { label: "Strategische Beratung",        href: "/services?card=strategic-advisory"  },
        { label: "Marktintelligenz",              href: "/services?card=market-intelligence" },
        { label: "Soft Landing Partnerships",     href: "/services?card=soft-landing"        },
        { label: "Investment Banking Boutique",   href: "/services?card=investment-banking"  },
      ],
    },
    contact: {
      title:    "Kontakt",
      location: "Carrasco, Montevideo",
      email:    "ines@sacramentumcapital.com",
    },
    legal: {
      copyright: "© 2025 Sacramentum Advisors. Alle Rechte vorbehalten.",
      privacy:   "Datenschutzrichtlinie",
      terms:     "Nutzungsbedingungen",
    },
  },
};

// ─── Locale dictionary ────────────────────────────────────────────────────────
const translations: Record<Locale, SiteTranslations> = { en, de };

export function t(locale: Locale = "en"): SiteTranslations {
  return translations[locale];
}

export default translations;
