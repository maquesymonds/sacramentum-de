"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import TextsPanel from "./TextsPanel";

// ── Types ─────────────────────────────────────────────────────────────────────
type InlineImage = { url: string; afterParagraph: number; caption?: string };
type Article = {
  id: string; image: string; title: string; link?: string; published?: boolean;
  category?: string; excerpt?: string; body?: string; slug?: string; date?: string;
  inlineImages?: InlineImage[];
};
type TeamMember = {
  id: string; image: string; name: string; role: string; bio: string; hidden?: boolean; group?: "leadership" | "advisory";
};
type Category = { id: string; label: string; color: string };
type BlogPost = {
  id: string; title: string; date: string; excerpt: string; body: string;
  image?: string; slug: string; linkedinUrl?: string; published?: boolean; video?: string;
};
type Content = { articles: Article[]; team: TeamMember[]; categories: Category[]; blog: BlogPost[]; olasTop: number };

const DEFAULT_CATEGORIES: Category[] = [
  { id: "economy",    label: "Economy",    color: "#2980B9" },
  { id: "lifestyle",  label: "Lifestyle",  color: "#27AE60" },
  { id: "investment", label: "Investment", color: "#8E44AD" },
];

function slugify(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function newId() { return `article-${Date.now()}`; }

// ── Shared styles ─────────────────────────────────────────────────────────────
const S = {
  label: {
    display: "block", fontSize: "0.7rem", fontWeight: 600,
    letterSpacing: "0.08em", textTransform: "uppercase" as const,
    color: "rgba(31,41,51,0.45)", marginBottom: "0.4rem",
  },
  input: {
    width: "100%", padding: "0.65rem 0.875rem",
    border: "1px solid rgba(31,41,51,0.14)", borderRadius: 8,
    fontSize: "0.9rem", color: "#111F30", backgroundColor: "white",
    outline: "none", boxSizing: "border-box" as const,
    fontFamily: "inherit",
  },
  textarea: {
    width: "100%", padding: "0.65rem 0.875rem",
    border: "1px solid rgba(31,41,51,0.14)", borderRadius: 8,
    fontSize: "0.875rem", color: "#111F30", backgroundColor: "white",
    outline: "none", resize: "vertical" as const,
    boxSizing: "border-box" as const, fontFamily: "inherit", lineHeight: 1.6,
  },
  btnPrimary: {
    padding: "0.6rem 1.2rem", backgroundColor: "#111F30", color: "white",
    border: "none", borderRadius: 50, fontSize: "0.72rem", fontWeight: 600,
    letterSpacing: "0.04em", textTransform: "uppercase" as const, cursor: "pointer",
    fontFamily: "inherit", whiteSpace: "nowrap" as const,
  },
  btnWarm: {
    padding: "0.6rem 1.2rem", backgroundColor: "#CCA87C", color: "white",
    border: "none", borderRadius: 50, fontSize: "0.72rem", fontWeight: 600,
    letterSpacing: "0.04em", textTransform: "uppercase" as const, cursor: "pointer",
    fontFamily: "inherit", whiteSpace: "nowrap" as const,
  },
  btnGhost: {
    padding: "0.6rem 1.2rem", backgroundColor: "transparent",
    color: "rgba(31,41,51,0.5)", border: "1px solid rgba(31,41,51,0.15)",
    borderRadius: 50, fontSize: "0.72rem", fontWeight: 500, cursor: "pointer",
    fontFamily: "inherit", whiteSpace: "nowrap" as const,
  },
  btnDanger: {
    padding: "0.6rem 1.2rem", backgroundColor: "transparent",
    color: "#C0392B", border: "1px solid rgba(192,57,43,0.25)",
    borderRadius: 50, fontSize: "0.72rem", fontWeight: 500, cursor: "pointer",
    fontFamily: "inherit", whiteSpace: "nowrap" as const,
  },
};

// ── Login Screen ──────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true); setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });
    if (res.ok) { onLogin(); }
    else { setError("Falsches Passwort"); }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#1A2530", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ backgroundColor: "white", borderRadius: 20, padding: "3rem 2.5rem", width: "100%", maxWidth: 380, boxShadow: "0 32px 80px rgba(0,0,0,0.25)" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <Image src="/images/LogoAzul.png" alt="Sacramentum" width={160} height={40} style={{ height: 36, width: "auto", margin: "0 auto 1.25rem" }} />
          <p style={{ fontSize: "0.8rem", color: "rgba(31,41,51,0.4)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            Verwaltungsbereich
          </p>
        </div>

        <div style={{ marginBottom: "1.25rem" }}>
          <label style={S.label}>Passwort</label>
          <input
            type="password" value={pw}
            onChange={e => setPw(e.target.value)}
            onKeyDown={e => e.key === "Enter" && submit()}
            placeholder="••••••••"
            style={{ ...S.input, fontSize: "1rem" }}
          />
          {error && <p style={{ color: "#C0392B", fontSize: "0.78rem", marginTop: "0.5rem" }}>{error}</p>}
        </div>

        <button onClick={submit} disabled={loading}
          style={{ ...S.btnPrimary, width: "100%", padding: "0.875rem", fontSize: "0.82rem" }}>
          {loading ? "Überprüfen..." : "Anmelden"}
        </button>
      </div>
    </div>
  );
}

// ── Sidebar ───────────────────────────────────────────────────────────────────
function Sidebar({ tab, setTab, onLogout }: { tab: string; setTab: (t: string) => void; onLogout: () => void }) {
  const items = [
    { id: "articles",   label: "Nachrichten", icon: "◈" },
    { id: "blog",       label: "Blog",        icon: "◧" },
    { id: "team",       label: "Team",        icon: "◉" },
    { id: "categories", label: "Kategorien",  icon: "◐" },
    { id: "texts",      label: "Texte",       icon: "✎" },
  ];
  return (
    <aside style={{ width: 220, height: "100%", backgroundColor: "#1A2530", display: "flex", flexDirection: "column" }}>
      {/* Logo */}
      <div style={{ padding: "1.75rem 1.5rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <Image src="/images/Logo.png" alt="Sacramentum" width={140} height={36}
          style={{ height: 28, width: "auto", filter: "brightness(0) invert(1)", opacity: 0.9 }} />
        <p style={{ fontSize: "0.65rem", color: "rgba(250,250,248,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "0.5rem" }}>
          Admin
        </p>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "1rem 0.75rem" }}>
        {items.map(item => (
          <button key={item.id} onClick={() => setTab(item.id)}
            style={{
              display: "flex", alignItems: "center", gap: "0.75rem",
              width: "100%", padding: "0.7rem 0.875rem",
              backgroundColor: tab === item.id ? "rgba(204,168,124,0.15)" : "transparent",
              border: "none", borderRadius: 10, cursor: "pointer",
              color: tab === item.id ? "#CCA87C" : "rgba(250,250,248,0.45)",
              fontSize: "0.85rem", fontWeight: tab === item.id ? 600 : 400,
              letterSpacing: "0.01em", fontFamily: "inherit",
              marginBottom: "0.25rem",
              transition: "all 0.15s ease",
            }}>
            <span style={{ fontSize: "1rem", opacity: 0.8 }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div style={{ padding: "1rem 0.75rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <button onClick={onLogout}
          style={{
            display: "flex", alignItems: "center", gap: "0.75rem",
            width: "100%", padding: "0.7rem 0.875rem",
            backgroundColor: "transparent", border: "none", borderRadius: 10,
            cursor: "pointer", color: "rgba(250,250,248,0.3)", fontSize: "0.8rem",
            fontFamily: "inherit",
          }}>
          ↩ Cerrar sesión
        </button>
      </div>
    </aside>
  );
}


// ── Categories Panel ──────────────────────────────────────────────────────────
function CategoriesPanel({ categories, onSave, saving }: {
  categories: Category[]; onSave: (c: Category[]) => void; saving: boolean;
}) {
  const [drafts, setDrafts]   = useState<Category[]>(categories);
  const [newLabel, setNewLabel] = useState("");
  const [newColor, setNewColor] = useState("#6B7B8D");
  const [saved, setSaved]     = useState(false);

  useEffect(() => { setDrafts(categories); }, [categories]);

  const update = (id: string, field: keyof Category, val: string) =>
    setDrafts(ds => ds.map(d => d.id === id ? { ...d, [field]: val } : d));

  const add = () => {
    const label = newLabel.trim();
    if (!label) return;
    setDrafts(ds => [...ds, { id: `cat-${Date.now()}`, label, color: newColor }]);
    setNewLabel(""); setNewColor("#6B7B8D");
  };

  const del = (id: string) => setDrafts(ds => ds.filter(d => d.id !== id));

  const save = () => { onSave(drafts); setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <div style={{ maxWidth: 560 }}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1.5rem" }}>
        <button onClick={save} disabled={saving} style={S.btnPrimary}>
          {saving ? "Speichern..." : saved ? "✓ Gespeichert" : "Änderungen speichern"}
        </button>
      </div>

      {/* Existing categories */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
        {drafts.map(cat => (
          <div key={cat.id} style={{ display: "flex", alignItems: "center", gap: "0.75rem", backgroundColor: "white", borderRadius: 12, padding: "0.75rem 1rem" }}>
            <input
              type="color"
              value={cat.color}
              onChange={e => update(cat.id, "color", e.target.value)}
              style={{ width: 36, height: 36, border: "none", borderRadius: 8, cursor: "pointer", padding: 2, backgroundColor: "transparent" }}
            />
            <span style={{ width: 16, height: 16, borderRadius: 50, backgroundColor: cat.color, flexShrink: 0 }} />
            <input
              value={cat.label}
              onChange={e => update(cat.id, "label", e.target.value)}
              style={{ ...S.input, flex: 1 }}
            />
            <button onClick={() => del(cat.id)} style={{ ...S.btnDanger, padding: "0.4rem 0.75rem", fontSize: "0.7rem", flexShrink: 0 }}>
              Löschen
            </button>
          </div>
        ))}
      </div>

      {/* Add new */}
      <div style={{ backgroundColor: "white", borderRadius: 12, padding: "1.25rem 1rem" }}>
        <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(31,41,51,0.4)", marginBottom: "0.75rem" }}>
          Neue Kategorie
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <input
            type="color"
            value={newColor}
            onChange={e => setNewColor(e.target.value)}
            style={{ width: 36, height: 36, border: "none", borderRadius: 8, cursor: "pointer", padding: 2, backgroundColor: "transparent" }}
          />
          <input
            value={newLabel}
            onChange={e => setNewLabel(e.target.value)}
            onKeyDown={e => e.key === "Enter" && add()}
            placeholder="Kategoriename..."
            style={{ ...S.input, flex: 1 }}
          />
          <button onClick={add} style={{ ...S.btnWarm, flexShrink: 0 }}>+ Hinzufügen</button>
        </div>
      </div>
    </div>
  );
}

// ── Image Uploader ────────────────────────────────────────────────────────────
function ImageUploader({
  value, onChange, aspect = "16/9", showPreview = true,
}: { value: string; onChange: (url: string) => void; aspect?: "16/9" | "3/4"; showPreview?: boolean }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError]         = useState("");

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setError("Bild überschreitet das Limit von 5 MB"); return; }
    setUploading(true); setError("");
    try {
      const fd  = new FormData();
      fd.append("file", file);
      const res  = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (res.ok) { onChange(data.url); }
      else        { setError(data.error ?? `Error ${res.status}`); }
    } catch {
      setError("Netzwerkfehler beim Hochladen");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div>
      {value && showPreview && (
        <div style={{ borderRadius: 10, overflow: "hidden", marginBottom: "0.75rem", aspectRatio: aspect, backgroundColor: "#f0ede6", maxWidth: aspect === "3/4" ? 120 : "100%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
        </div>
      )}
      <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", flexWrap: "wrap" }}>
        <label style={{ ...S.btnWarm, cursor: "pointer", display: "inline-block", opacity: uploading ? 0.6 : 1 }}>
          {uploading ? "Hochladen…" : "↑ Datei hochladen"}
          <input type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} disabled={uploading} />
        </label>
        <input
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{ ...S.input, flex: 1, minWidth: 0, fontSize: "0.8rem", color: "rgba(31,41,51,0.5)" }}
          placeholder="/images/nombre.png"
        />
      </div>
      {error && <p style={{ color: "#C0392B", fontSize: "0.78rem", marginTop: "0.4rem" }}>{error}</p>}
    </div>
  );
}

// ── Video Uploader ────────────────────────────────────────────────────────────
function VideoUploader({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress]   = useState(0);
  const [error, setError]         = useState("");

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 200 * 1024 * 1024) { setError("Video überschreitet das Limit von 200 MB"); return; }
    setUploading(true); setError(""); setProgress(0);
    try {
      const fd  = new FormData();
      fd.append("file", file);
      // Use XMLHttpRequest for progress tracking
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/admin/upload-video");
        xhr.upload.onprogress = (ev) => {
          if (ev.lengthComputable) setProgress(Math.round((ev.loaded / ev.total) * 100));
        };
        xhr.onload = () => {
          if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            onChange(data.url);
            resolve();
          } else {
            const data = JSON.parse(xhr.responseText);
            setError(data.error ?? `Error ${xhr.status}`);
            reject();
          }
        };
        xhr.onerror = () => { setError("Netzwerkfehler"); reject(); };
        xhr.send(fd);
      });
    } catch {}
    setUploading(false);
    setProgress(0);
    e.target.value = "";
  };

  return (
    <div>
      {value && (
        <div style={{ borderRadius: 10, overflow: "hidden", marginBottom: "0.75rem", backgroundColor: "#000", aspectRatio: "16/9", maxHeight: 300 }}>
          <video src={value} controls style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
      )}
      <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", flexWrap: "wrap" }}>
        <label style={{ ...S.btnWarm, cursor: "pointer", display: "inline-block", opacity: uploading ? 0.6 : 1 }}>
          {uploading ? `Hochladen ${progress}%…` : "↑ Video hochladen"}
          <input type="file" accept="video/*" onChange={handleFile} style={{ display: "none" }} disabled={uploading} />
        </label>
        <input
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{ ...S.input, flex: 1, minWidth: 0, fontSize: "0.8rem", color: "rgba(31,41,51,0.5)" }}
          placeholder="oder Video-URL einfügen..."
        />
        {value && (
          <button onClick={() => onChange("")} style={{ ...S.btnDanger, padding: "0.5rem 0.75rem", fontSize: "0.72rem", flexShrink: 0 }}>
            Entfernen
          </button>
        )}
      </div>
      {uploading && (
        <div style={{ marginTop: "0.5rem", height: 4, borderRadius: 2, backgroundColor: "rgba(31,41,51,0.08)", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, backgroundColor: "#CCA87C", transition: "width 0.2s ease", borderRadius: 2 }} />
        </div>
      )}
      {error && <p style={{ color: "#C0392B", fontSize: "0.78rem", marginTop: "0.4rem" }}>{error}</p>}
    </div>
  );
}

// ── Articles Panel ────────────────────────────────────────────────────────────
function ArticlesPanel({ articles, onSave, saving }: {
  articles: Article[]; onSave: (a: Article[]) => void; saving: boolean;
}) {
  const [selected, setSelected] = useState<Article | null>(null);
  const [draft, setDraft]       = useState<Article | null>(null);
  const [isNew, setIsNew]       = useState(false);
  const [toast, setToast]       = useState<{ msg: string; type: "draft" | "publish" } | null>(null);

  const showToast = (msg: string, type: "draft" | "publish") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const openArticle = (a: Article) => { setSelected(a); setDraft({ ...a }); setIsNew(false); };

  const newArticle = () => {
    const blank: Article = { id: newId(), image: "", title: "", link: "", published: false };
    setSelected(blank); setDraft({ ...blank }); setIsNew(true);
  };

  const commit = (published: boolean) => {
    if (!draft) return;
    const updated = { ...draft, published };
    const next = isNew
      ? [...articles, updated]
      : articles.map(a => a.id === updated.id ? updated : a);
    onSave(next);
    setSelected(updated); setDraft(updated); setIsNew(false);
    if (published) showToast("Auf der Website veröffentlicht!", "publish");
    else           showToast("Entwurf gespeichert", "draft");
  };

  const del = () => {
    if (!selected) return;
    onSave(articles.filter(a => a.id !== selected.id));
    setSelected(null); setDraft(null);
  };

  const update = (field: keyof Article, val: string) =>
    setDraft(d => d ? { ...d, [field]: val } : d);

  const isDraft = draft?.published === false;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", minHeight: "calc(100vh - 60px - 3.5rem)", gap: "1.5rem" }}>

      {/* ── Toast ── */}
      {toast && (
        <div style={{
          position: "fixed", bottom: "2rem", left: "50%", transform: "translateX(-50%)",
          backgroundColor: toast.type === "publish" ? "#111F30" : "#4a5568",
          color: "white", padding: "0.875rem 1.75rem", borderRadius: 50,
          fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.02em",
          boxShadow: "0 8px 32px rgba(0,0,0,0.22)", zIndex: 9999,
          display: "flex", alignItems: "center", gap: "0.6rem", pointerEvents: "none",
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="#CCA87C" strokeWidth="1.5"/>
            <path d="M5 8l2 2 4-4" stroke="#CCA87C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {toast.msg}
        </div>
      )}

      {/* Left: List */}
      <div style={{ backgroundColor: "white", borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column", maxHeight: "calc(100vh - 60px - 3.5rem)", position: "sticky", top: "calc(60px + 1.75rem)" }}>
        <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid rgba(31,41,51,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(31,41,51,0.4)" }}>
            {articles.length} Nachrichten
          </span>
          <button onClick={newArticle} style={{ ...S.btnWarm, padding: "0.4rem 0.875rem", fontSize: "0.7rem" }}>+ Neue</button>
        </div>
        <div style={{ overflowY: "auto", flex: 1 }}>
          {articles.map(a => (
            <div key={a.id} onClick={() => openArticle(a)}
              style={{
                display: "flex", alignItems: "center", gap: "0.75rem",
                padding: "0.875rem 1.25rem", cursor: "pointer",
                backgroundColor: selected?.id === a.id ? "rgba(204,168,124,0.08)" : "transparent",
                borderLeft: selected?.id === a.id ? "2px solid #CCA87C" : "2px solid transparent",
                borderBottom: "1px solid rgba(31,41,51,0.05)",
                transition: "all 0.15s ease",
              }}>
              <div style={{ width: 44, height: 44, borderRadius: 8, overflow: "hidden", flexShrink: 0, backgroundColor: "#f0ede6" }}>
                {a.image && <img src={a.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: "0.82rem", fontWeight: 500, color: "#111F30", lineHeight: 1.3,
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {a.title || "Kein Titel"}
                </p>
                <span style={{
                  display: "inline-block", marginTop: "0.25rem",
                  fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase",
                  padding: "0.1rem 0.45rem", borderRadius: 50,
                  backgroundColor: a.published === false ? "rgba(31,41,51,0.07)" : "rgba(39,174,96,0.12)",
                  color: a.published === false ? "rgba(31,41,51,0.4)" : "#27AE60",
                }}>
                  {a.published === false ? "Entwurf" : "Veröffentlicht"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Edit form */}
      {draft ? (
        <div style={{ backgroundColor: "white", borderRadius: 16, padding: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.75rem", flexWrap: "wrap", gap: "0.75rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 500, color: "#111F30", margin: 0 }}>
                {isNew ? "Neue Nachricht" : "Nachricht bearbeiten"}
              </h3>
              <span style={{
                fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase",
                padding: "0.2rem 0.6rem", borderRadius: 50,
                backgroundColor: isDraft ? "rgba(31,41,51,0.07)" : "rgba(39,174,96,0.12)",
                color: isDraft ? "rgba(31,41,51,0.4)" : "#27AE60",
              }}>
                {isDraft ? "Entwurf" : "Veröffentlicht"}
              </span>
            </div>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {!isNew && <button onClick={del} style={S.btnDanger}>Löschen</button>}
              <button onClick={() => { setSelected(null); setDraft(null); }} style={S.btnGhost}>Abbrechen</button>
              <button onClick={() => commit(false)} disabled={saving} style={S.btnGhost}>
                {saving ? "Speichern..." : "Als Entwurf speichern"}
              </button>
              <button onClick={() => commit(true)} disabled={saving} style={S.btnPrimary}>
                {saving ? "Veröffentlichen..." : isDraft ? "Veröffentlichen" : "Speichern & veröffentlichen"}
              </button>
            </div>
          </div>

          <div style={{ display: "grid", gap: "1.5rem", maxWidth: 640 }}>
            <div>
              <label style={S.label}>Titel</label>
              <input value={draft.title} onChange={e => update("title", e.target.value)}
                style={S.input} placeholder="Titel der Nachricht" />
            </div>
            <div>
              <label style={S.label}>Artikellink <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0, color: "rgba(31,41,51,0.35)" }}>(externe URL — öffnet in neuem Tab)</span></label>
              <input value={draft.link ?? ""} onChange={e => update("link", e.target.value)}
                style={S.input} placeholder="https://..." />
            </div>
            <div>
              <label style={S.label}>Titelbild</label>
              <ImageUploader value={draft.image} onChange={v => update("image", v)} aspect="16/9" />
            </div>
          </div>
        </div>
      ) : (
        <div style={{ backgroundColor: "white", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center", color: "rgba(31,41,51,0.25)" }}>
            <p style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>◈</p>
            <p style={{ fontSize: "0.85rem" }}>Nachricht zum Bearbeiten auswählen</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Blog Panel ────────────────────────────────────────────────────────────────
function BlogPanel({ posts, onSave, saving }: {
  posts: BlogPost[]; onSave: (p: BlogPost[]) => void; saving: boolean;
}) {
  const [selected, setSelected] = useState<BlogPost | null>(null);
  const [draft, setDraft]       = useState<BlogPost | null>(null);
  const [isNew, setIsNew]       = useState(false);
  const [toast, setToast]       = useState<{ msg: string; type: "draft" | "publish" } | null>(null);

  const showToast = (msg: string, type: "draft" | "publish") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const openPost = (p: BlogPost) => { setSelected(p); setDraft({ ...p }); setIsNew(false); };

  const newPost = () => {
    const blank: BlogPost = {
      id: `post-${Date.now()}`, title: "", date: new Date().toISOString().split("T")[0],
      excerpt: "", body: "", image: "", slug: "", linkedinUrl: "", published: false,
    };
    setSelected(blank); setDraft({ ...blank }); setIsNew(true);
  };

  const commit = (published: boolean) => {
    if (!draft) return;
    const updated = { ...(draft.slug ? draft : { ...draft, slug: slugify(draft.title) }), published };
    const next = isNew
      ? [...posts, updated]
      : posts.map(p => p.id === updated.id ? updated : p);
    onSave(next);
    setSelected(updated); setDraft(updated); setIsNew(false);
    if (published) {
      showToast("Auf der Website veröffentlicht!", "publish");
    } else {
      showToast("Entwurf gespeichert", "draft");
    }
  };

  const del = () => {
    if (!selected) return;
    onSave(posts.filter(p => p.id !== selected.id));
    setSelected(null); setDraft(null);
  };

  const update = (field: keyof BlogPost, val: string) =>
    setDraft(d => d ? { ...d, [field]: val } : d);

  const isDraft = draft?.published === false;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", minHeight: "calc(100vh - 60px - 3.5rem)", gap: "1.5rem" }}>

      {/* ── Toast ── */}
      {toast && (
        <div style={{
          position: "fixed", bottom: "2rem", left: "50%", transform: "translateX(-50%)",
          backgroundColor: toast.type === "publish" ? "#111F30" : "#4a5568",
          color: "white", padding: "0.875rem 1.75rem", borderRadius: 50,
          fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.02em",
          boxShadow: "0 8px 32px rgba(0,0,0,0.22)", zIndex: 9999,
          display: "flex", alignItems: "center", gap: "0.6rem", pointerEvents: "none",
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="#CCA87C" strokeWidth="1.5"/>
            <path d="M5 8l2 2 4-4" stroke="#CCA87C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {toast.msg}
        </div>
      )}

      {/* Left: List */}
      <div style={{ backgroundColor: "white", borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column", maxHeight: "calc(100vh - 60px - 3.5rem)", position: "sticky", top: "calc(60px + 1.75rem)" }}>
        <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid rgba(31,41,51,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(31,41,51,0.4)" }}>
            {posts.length} posts
          </span>
          <button onClick={newPost} style={{ ...S.btnWarm, padding: "0.4rem 0.875rem", fontSize: "0.7rem" }}>
            + Neu
          </button>
        </div>
        <div style={{ overflowY: "auto", flex: 1 }}>
          {posts.map(p => (
            <div key={p.id} onClick={() => openPost(p)}
              style={{
                display: "flex", alignItems: "flex-start", gap: "0.75rem",
                padding: "0.875rem 1.25rem", cursor: "pointer",
                backgroundColor: selected?.id === p.id ? "rgba(204,168,124,0.08)" : "transparent",
                borderLeft: selected?.id === p.id ? "2px solid #CCA87C" : "2px solid transparent",
                borderBottom: "1px solid rgba(31,41,51,0.05)",
                transition: "all 0.15s ease",
              }}>
              <div style={{ width: 44, height: 44, borderRadius: 8, overflow: "hidden", flexShrink: 0, backgroundColor: "#f0ede6" }}>
                {p.image && <img src={p.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: "0.82rem", fontWeight: 500, color: "#111F30", lineHeight: 1.3, marginBottom: "0.3rem",
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {p.title || "Ohne Titel"}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <span style={{ fontSize: "0.65rem", color: "rgba(31,41,51,0.35)" }}>{p.date}</span>
                  {p.published === false && (
                    <span style={{
                      fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.07em",
                      textTransform: "uppercase", padding: "0.1rem 0.4rem",
                      borderRadius: 4, backgroundColor: "rgba(31,41,51,0.08)",
                      color: "rgba(31,41,51,0.45)",
                    }}>
                      Entwurf
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Edit form */}
      {draft ? (
        <div style={{ backgroundColor: "white", borderRadius: 16, padding: "2rem", overflowY: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.75rem", flexWrap: "wrap", gap: "0.75rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 500, color: "#111F30", margin: 0 }}>
                {isNew ? "Neuer Beitrag" : "Beitrag bearbeiten"}
              </h3>
              {isDraft && (
                <span style={{
                  fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.07em",
                  textTransform: "uppercase", padding: "0.2rem 0.6rem",
                  borderRadius: 4, backgroundColor: "rgba(31,41,51,0.07)",
                  color: "rgba(31,41,51,0.5)",
                }}>
                  Entwurf
                </span>
              )}
            </div>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {!isNew && <button onClick={del} style={S.btnDanger}>Löschen</button>}
              <button onClick={() => { setSelected(null); setDraft(null); }} style={S.btnGhost}>Abbrechen</button>
              <button onClick={() => commit(false)} disabled={saving} style={S.btnGhost}>
                {saving ? "Speichern..." : "Als Entwurf speichern"}
              </button>
              <button onClick={() => commit(true)} disabled={saving} style={S.btnPrimary}>
                {saving ? "Veröffentlichen..." : isDraft ? "Veröffentlichen" : "Speichern & veröffentlichen"}
              </button>
            </div>
          </div>

          <div style={{ display: "grid", gap: "1.25rem" }}>
            <div>
              <label style={S.label}>Titel</label>
              <input value={draft.title} onChange={e => update("title", e.target.value)} style={S.input} placeholder="Titel des Beitrags" />
            </div>

            <div>
              <label style={S.label}>Datum</label>
              <input type="date" value={draft.date} onChange={e => update("date", e.target.value)} style={S.input} />
            </div>

            <div>
              <label style={S.label}>Vorschautext <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0, color: "rgba(31,41,51,0.35)" }}>(wird in der Karte angezeigt)</span></label>
              <textarea value={draft.excerpt} onChange={e => update("excerpt", e.target.value)}
                style={{ ...S.textarea, minHeight: 80 }} placeholder="Kurzbeschreibung des Beitrags..." />
            </div>

            <div>
              <label style={S.label}>Inhalt</label>
              <textarea value={draft.body} onChange={e => update("body", e.target.value)}
                style={{ ...S.textarea, minHeight: 260 }} placeholder={"Inhalt hier eingeben.\n\nJede Leerzeile erstellt einen neuen Absatz."} />
            </div>

            <div>
              <label style={S.label}>Titelbild (optional)</label>
              <ImageUploader value={draft.image ?? ""} onChange={v => update("image", v)} aspect="16/9" />
            </div>

            <div>
              <label style={S.label}>Video (opcional)</label>
              <VideoUploader value={draft.video ?? ""} onChange={v => update("video", v)} />
            </div>

            <div>
              <label style={S.label}>LinkedIn-URL (optional)</label>
              <input value={draft.linkedinUrl ?? ""} onChange={e => update("linkedinUrl", e.target.value)}
                style={S.input} placeholder="https://www.linkedin.com/posts/..." />
            </div>

            <div>
              <label style={S.label}>Slug (URL)</label>
              <input value={draft.slug || slugify(draft.title)} onChange={e => update("slug", e.target.value)}
                style={{ ...S.input, color: "rgba(31,41,51,0.5)", fontSize: "0.82rem" }}
                placeholder="wird-automatisch-generiert" />
            </div>
          </div>
        </div>
      ) : (
        <div style={{ backgroundColor: "white", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center", color: "rgba(31,41,51,0.25)" }}>
            <p style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>◧</p>
            <p style={{ fontSize: "0.85rem" }}>Beitrag zum Bearbeiten auswählen</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Team Panel ────────────────────────────────────────────────────────────────
function TeamPanel({ team, onSave, saving }: {
  team: TeamMember[]; onSave: (t: TeamMember[]) => void; saving: boolean;
}) {
  const [drafts, setDrafts] = useState<TeamMember[]>(team);
  const [saved, setSaved]   = useState(false);

  useEffect(() => { setDrafts(team); }, [team]);

  const update = (id: string, field: keyof TeamMember, val: string) =>
    setDrafts(ds => ds.map(d => d.id === id ? { ...d, [field]: val } : d));

  const toggleHidden = (id: string) =>
    setDrafts(ds => ds.map(d => d.id === id ? { ...d, hidden: !d.hidden } : d));

  const deleteMember = (id: string) => {
    if (!confirm("Mitglied löschen?")) return;
    setDrafts(ds => ds.filter(d => d.id !== id));
  };

  const addMember = (group: "leadership" | "advisory") => {
    const newMember: TeamMember = {
      id:    `member-${Date.now()}`,
      name:  "Neues Mitglied",
      role:  "",
      image: "",
      bio:   "",
      group,
    };
    setDrafts(ds => [...ds, newMember]);
  };

  const save = () => {
    onSave(drafts);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const renderGroup = (group: "leadership" | "advisory") => {
    const label = group === "leadership" ? "Team" : "Beirat";
    const members = drafts.filter(d => (d.group ?? "advisory") === group);
    return (
      <div style={{ marginBottom: "2.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
          <h3 style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(31,41,51,0.4)", margin: 0 }}>{label}</h3>
          <button onClick={() => addMember(group)} style={{ ...S.btnPrimary, background: "rgba(31,41,51,0.08)", color: "#111F30", fontSize: "0.75rem", padding: "0.4rem 0.85rem" }}>
            + Hinzufügen
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1.5rem" }}>
          {members.map(member => {
            const draft = drafts.find(d => d.id === member.id)!;
            return renderCard(draft);
          })}
        </div>
      </div>
    );
  };

  const renderCard = (member: TeamMember) => (
    <div key={member.id} style={{
      backgroundColor: "white", borderRadius: 16, padding: "1.75rem",
      display: "flex", flexDirection: "column", gap: "1.25rem",
      opacity: member.hidden ? 0.5 : 1,
      border: member.hidden ? "1.5px dashed rgba(31,41,51,0.2)" : "1.5px solid transparent",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <div style={{ width: 56, height: 56, borderRadius: 12, overflow: "hidden", flexShrink: 0, backgroundColor: "#f0ede6" }}>
          {member.image && <img src={member.image} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", filter: "grayscale(100%)" }} />}
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: "1rem", fontWeight: 500, color: "#111F30", marginBottom: "0.15rem" }}>{member.name}</p>
          {member.hidden && <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.9)", background: "rgba(31,41,51,0.5)", borderRadius: 4, padding: "0.1rem 0.45rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>Versteckt</span>}
        </div>
        <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
          <button onClick={() => toggleHidden(member.id)} title={member.hidden ? "Auf Website anzeigen" : "Von Website ausblenden"}
            style={{ background: "none", border: "1px solid rgba(31,41,51,0.2)", borderRadius: 8, padding: "0.35rem 0.6rem", cursor: "pointer", fontSize: "0.78rem", color: "#111F30", fontWeight: 500 }}>
            {member.hidden ? "Anzeigen" : "Ausblenden"}
          </button>
          <button onClick={() => deleteMember(member.id)} title="Mitglied löschen"
            style={{ background: "none", border: "1px solid rgba(200,50,50,0.2)", borderRadius: 8, padding: "0.35rem 0.6rem", cursor: "pointer", fontSize: "0.85rem", color: "#c03030" }}>
            Löschen
          </button>
        </div>
      </div>
      <div><label style={S.label}>Name</label><input value={member.name} onChange={e => update(member.id, "name", e.target.value)} style={S.input} /></div>
      <div><label style={S.label}>Position</label><input value={member.role} onChange={e => update(member.id, "role", e.target.value)} style={S.input} /></div>
      <div><label style={S.label}>Bild</label><ImageUploader value={member.image} onChange={v => update(member.id, "image", v)} aspect="3/4" /></div>
      <div><label style={S.label}>Biografie</label><textarea value={member.bio} onChange={e => update(member.id, "bio", e.target.value)} style={{ ...S.textarea, minHeight: 140 }} /></div>
    </div>
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "2rem" }}>
        <button onClick={save} disabled={saving} style={S.btnPrimary}>
          {saving ? "Speichern..." : saved ? "✓ Gespeichert" : "Änderungen speichern"}
        </button>
      </div>
      {renderGroup("leadership")}
      {renderGroup("advisory")}
    </div>
  );
}

// ── Main Admin Client ─────────────────────────────────────────────────────────
export default function AdminClient() {
  const [auth, setAuth] = useState<"loading" | "no" | "yes">("loading");
  const [tab, setTab] = useState("articles");
  const [content, setContent] = useState<Content | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  useEffect(() => {
    fetch("/api/admin/content")
      .then(res => {
        if (res.status === 401) { setAuth("no"); return null; }
        if (!res.ok) { setAuth("no"); return null; }
        return res.json();
      })
      .then(data => {
        if (data) { setAuth("yes"); setContent({ ...data, categories: data.categories ?? DEFAULT_CATEGORIES, blog: data.blog ?? [], olasTop: data.olasTop ?? 720 }); }
        else { setAuth("no"); }
      })
      .catch(() => setAuth("no"));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuth("no"); setContent(null);
  };

  const handleSave = async (updated: Content) => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (!res.ok) throw new Error(`Server error ${res.status}`);
      setContent(updated);
      setSaveMsg("✓ Gespeichert");
      setTimeout(() => setSaveMsg(""), 3000);
    } catch (err) { setSaveMsg(`Fehler beim Speichern: ${err instanceof Error ? err.message : "Bitte erneut versuchen"}`); }
    setSaving(false);
  };

  if (auth === "loading") {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#1A2530", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "rgba(250,250,248,0.3)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>Laden...</div>
      </div>
    );
  }

  if (auth === "no") {
    return <LoginScreen onLogin={() => { setAuth("yes"); window.location.reload(); }} />;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#F0EDE6", fontFamily: "var(--font-regola), Georgia, serif" }}>
      {/* Sidebar sticky */}
      <div style={{ position: "sticky", top: 0, height: "100vh", flexShrink: 0 }}>
        <Sidebar tab={tab} setTab={setTab} onLogout={handleLogout} />
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Top bar sticky */}
        <div style={{ position: "sticky", top: 0, zIndex: 10, height: 60, backgroundColor: "white", borderBottom: "1px solid rgba(31,41,51,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2rem" }}>
          <span style={{ fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(31,41,51,0.4)" }}>
            {tab === "articles" ? "Nachrichten" : tab === "blog" ? "Blog" : tab === "team" ? "Team" : tab === "texts" ? "Texte" : "Kategorien"}
          </span>
          {saveMsg && (
            <span style={{ fontSize: "0.8rem", color: saveMsg.startsWith("✓") ? "#27AE60" : "#C0392B", fontWeight: 500 }}>
              {saveMsg}
            </span>
          )}
        </div>

        {/* Content — scrolls naturally with the page */}
        <div style={{ padding: "1.75rem" }}>
          {!content ? (
            <div style={{ color: "rgba(31,41,51,0.3)", textAlign: "center", paddingTop: "5rem", fontSize: "0.9rem" }}>
              Inhalt wird geladen...
            </div>
          ) : tab === "articles" ? (
            <ArticlesPanel
              articles={content.articles}
              onSave={articles => handleSave({ ...content, articles })}
              saving={saving}
            />
          ) : tab === "blog" ? (
            <BlogPanel
              posts={content.blog}
              onSave={blog => handleSave({ ...content, blog })}
              saving={saving}
            />
          ) : tab === "team" ? (
            <TeamPanel
              team={content.team}
              onSave={team => handleSave({ ...content, team })}
              saving={saving}
            />
          ) : tab === "texts" ? (
            <TextsPanel />
          ) : (
            <CategoriesPanel
              categories={content.categories}
              onSave={categories => handleSave({ ...content, categories })}
              saving={saving}
            />
          )}
        </div>
      </div>
    </div>
  );
}
