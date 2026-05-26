"use client";

import { useEffect, useRef, useState } from "react";

export default function OlasBackground({ initialTop, initialHeight }: { initialTop: number; initialHeight: number }) {
  const [top, setTop]         = useState(initialTop);
  const [height, setHeight]   = useState(initialHeight);
  const [open, setOpen]       = useState(true);
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);
  const imgRef                = useRef<HTMLImageElement>(null);

  const visible = false; // set to true to re-enable admin slider

  // Move image live as sliders change
  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.style.top    = `${top}px`;
      imgRef.current.style.height = `${height}px`;
    }
  }, [top, height]);

  const save = async () => {
    setSaving(true);
    try {
      const res  = await fetch("/api/admin/content");
      const data = await res.json();
      await fetch("/api/admin/content", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ ...data, olasTop: top, olasHeight: height }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch {}
    setSaving(false);
  };

  return (
    <>
      {/* The image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src="/images/olas.webp"
        alt=""
        aria-hidden="true"
        className="hidden lg:block"
        style={{
          position:      "absolute",
          top:           `${top}px`,
          left:          0,
          width:         "100%",
          height:        `${height}px`,
          objectFit:     "cover",
          zIndex:        0,
          pointerEvents: "none",
          userSelect:    "none",
        }}
      />

      {/* Floating admin panel */}
      {visible && (
        <div style={{
          position:        "fixed",
          bottom:          "1.5rem",
          right:           "1.5rem",
          zIndex:          9999,
          backgroundColor: "rgba(17,31,48,0.96)",
          backdropFilter:  "blur(12px)",
          border:          "1px solid rgba(255,255,255,0.1)",
          borderRadius:    16,
          color:           "white",
          fontFamily:      "var(--font-regola), Georgia, serif",
          fontSize:        "0.78rem",
          width:           260,
          overflow:        "hidden",
          boxShadow:       "0 16px 48px rgba(0,0,0,0.4)",
        }}>

          {/* Header */}
          <button
            onClick={() => setOpen(o => !o)}
            style={{
              width:           "100%",
              display:         "flex",
              alignItems:      "center",
              justifyContent:  "space-between",
              padding:         "0.75rem 1rem",
              background:      "none",
              border:          "none",
              cursor:          "pointer",
              color:           "white",
              borderBottom:    open ? "1px solid rgba(255,255,255,0.08)" : "none",
            }}
          >
            <span style={{ fontWeight: 600, letterSpacing: "0.06em", fontSize: "0.7rem", textTransform: "uppercase", opacity: 0.6 }}>
              ⊡ Olas
            </span>
            <span style={{ opacity: 0.4, fontSize: "0.7rem" }}>{open ? "▲" : "▼"}</span>
          </button>

          {open && (
            <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>

              {/* Top control */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                  <span style={{ opacity: 0.5, fontSize: "0.7rem" }}>top</span>
                  <span style={{ color: "#CCA87C", fontWeight: 700, fontSize: "0.85rem" }}>{top}px</span>
                </div>
                <input
                  type="range" min={0} max={1400} step={10} value={top}
                  onChange={e => setTop(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "#CCA87C", cursor: "pointer" }}
                />
              </div>

              {/* Height control */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                  <span style={{ opacity: 0.5, fontSize: "0.7rem" }}>height</span>
                  <span style={{ color: "#CCA87C", fontWeight: 700, fontSize: "0.85rem" }}>{height}px</span>
                </div>
                <input
                  type="range" min={200} max={2000} step={10} value={height}
                  onChange={e => setHeight(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "#CCA87C", cursor: "pointer" }}
                />
              </div>

              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  onClick={() => { setTop(890); setHeight(1757); }}
                  style={{
                    flex: 1, padding: "0.5rem",
                    background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 8, color: "rgba(255,255,255,0.6)", fontSize: "0.7rem",
                    cursor: "pointer", fontFamily: "inherit",
                  }}
                >
                  Reset
                </button>
                <button
                  onClick={save} disabled={saving}
                  style={{
                    flex: 2, padding: "0.5rem",
                    background: saved ? "rgba(39,174,96,0.3)" : "#CCA87C",
                    border: "none", borderRadius: 8, color: "white",
                    fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.05em",
                    cursor: saving ? "default" : "pointer", fontFamily: "inherit", transition: "background 0.2s",
                  }}
                >
                  {saving ? "Speichern…" : saved ? "✓ Gespeichert" : "Speichern"}
                </button>
              </div>

            </div>
          )}
        </div>
      )}
    </>
  );
}
