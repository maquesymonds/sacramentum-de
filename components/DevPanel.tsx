"use client";

import { useEffect, useState } from "react";

export default function DevPanel() {
  const [teamPb, setTeamPb]         = useState(0.5);
  const [edificiosY, setEdificiosY] = useState(15);
  const [olasTop, setOlasTop]       = useState(500);
  const [introBgY, setIntroBgY]     = useState(50);

  useEffect(() => {
    document.documentElement.style.setProperty("--dev-team-pb",      `${teamPb}rem`);
  }, [teamPb]);

  useEffect(() => {
    document.documentElement.style.setProperty("--dev-edificios-y", `${edificiosY}%`);
  }, [edificiosY]);

  useEffect(() => {
    document.documentElement.style.setProperty("--dev-olas-top", `${olasTop}px`);
  }, [olasTop]);

  useEffect(() => {
    document.documentElement.style.setProperty("--dev-intro-bg-y", `${introBgY}%`);
  }, [introBgY]);

  return (
    <div
      style={{
        display:         "none",
        position:        "fixed",
        bottom:          "1.5rem",
        right:           "1.5rem",
        zIndex:          9999,
        background:      "rgba(15,15,15,0.92)",
        backdropFilter:  "blur(8px)",
        border:          "1px solid rgba(255,255,255,0.1)",
        borderRadius:    "12px",
        padding:         "1rem 1.25rem",
        color:           "#fff",
        fontFamily:      "monospace",
        fontSize:        "12px",
        width:           "240px",
        flexDirection:   "column",
        gap:             "1rem",
      }}
    >
      <div style={{ fontWeight: 700, letterSpacing: "0.08em", opacity: 0.5, fontSize: "10px" }}>
        DEV PANEL
      </div>

      <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        <span style={{ opacity: 0.7 }}>
          OurTeam padding-bottom — <strong style={{ color: "#f4c97a" }}>{teamPb.toFixed(1)}rem</strong>
        </span>
        <input
          type="range"
          min={0}
          max={10}
          step={0.1}
          value={teamPb}
          onChange={e => setTeamPb(Number(e.target.value))}
          style={{ accentColor: "#f4c97a", cursor: "pointer" }}
        />
      </label>

      <label style={{ display: "none", flexDirection: "column", gap: "0.4rem" }}>
        <span style={{ opacity: 0.7 }}>
          Edificios Y position — <strong style={{ color: "#f4c97a" }}>{edificiosY}%</strong>
        </span>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={edificiosY}
          onChange={e => setEdificiosY(Number(e.target.value))}
          style={{ accentColor: "#f4c97a", cursor: "pointer" }}
        />
      </label>

      <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        <span style={{ opacity: 0.7 }}>
          Olas top position — <strong style={{ color: "#f4c97a" }}>{olasTop}px</strong>
        </span>
        <input
          type="range"
          min={0}
          max={1500}
          step={10}
          value={olasTop}
          onChange={e => setOlasTop(Number(e.target.value))}
          style={{ accentColor: "#f4c97a", cursor: "pointer" }}
        />
      </label>

      <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        <span style={{ opacity: 0.7 }}>
          Intro BG vertical — <strong style={{ color: "#f4c97a" }}>{introBgY}%</strong>
        </span>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={introBgY}
          onChange={e => setIntroBgY(Number(e.target.value))}
          style={{ accentColor: "#f4c97a", cursor: "pointer" }}
        />
      </label>

      <div style={{ opacity: 0.4, fontSize: "10px", lineHeight: 1.4 }}>
        Copia los valores y pegálos en el código cuando estés conforme.
      </div>
    </div>
  );
}
