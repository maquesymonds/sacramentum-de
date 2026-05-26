"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { t, type Locale, type SiteTranslations } from "@/data/translations";

// ── Deep merge ────────────────────────────────────────────────────────────────
function deepMerge<T extends object>(base: T, overrides: Record<string, any>): T {
  const result = { ...base } as Record<string, any>;
  for (const key in overrides) {
    const val = overrides[key];
    if (val === undefined || val === null) continue;
    if (Array.isArray(val) && Array.isArray(result[key])) {
      result[key] = (result[key] as any[]).map((item, i) => {
        const ov = val[i];
        if (!ov) return item;
        if (typeof item === "object" && !Array.isArray(item)) return deepMerge(item, ov);
        return ov;
      });
    } else if (typeof val === "object" && !Array.isArray(val) && typeof result[key] === "object") {
      result[key] = deepMerge(result[key], val);
    } else {
      result[key] = val;
    }
  }
  return result as T;
}

// ── Context ───────────────────────────────────────────────────────────────────
interface LocaleContextValue {
  locale:    Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  overrides: Record<string, Record<string, any>>;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale:       "en",
  setLocale:    () => {},
  toggleLocale: () => {},
  overrides:    {},
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("de");
  const [overrides, setOverrides] = useState<Record<string, Record<string, any>>>({});

  useEffect(() => {
    const stored = localStorage.getItem("sa-locale") as Locale | null;
    if (stored === "en" || stored === "de") setLocaleState(stored);
  }, []);

  useEffect(() => {
    fetch("/api/translations")
      .then(r => r.json())
      .then(data => { if (data && typeof data === "object" && Object.keys(data).length > 0) setOverrides(data); })
      .catch(() => {});
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem("sa-locale", next);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "de" ? "en" : "de");
  }, [locale, setLocale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, toggleLocale, overrides }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  return useContext(LocaleContext);
}

// ── useT: returns merged translations for current locale ──────────────────────
export function useT(): SiteTranslations {
  const { locale, overrides } = useLocale();
  return useMemo(
    () => deepMerge(t(locale), overrides[locale] ?? {}),
    [locale, overrides]
  );
}
