"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// ── Wing positions — same path structure so JS can interpolate ────────────────
const WINGS = [
  "M -20,-7 Q -10,-16 0,-10 Q 10,-16 20,-7",  // up
  "M -20,-2 Q -10,-9  0,-5  Q 10,-9  20,-2",  // mid-up
  "M -20, 4 Q -10,-2  0, 1  Q 10,-2  20, 4",  // down
  "M -20,-2 Q -10,-9  0,-5  Q 10,-9  20,-2",  // mid-up (return)
];

const SVG_NS = "http://www.w3.org/2000/svg";

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

// Linearly interpolate between two path `d` strings that share the same structure.
// Works because each wing state has identical command types — only numbers differ.
function lerpPath(a: string, b: string, t: number): string {
  const numsA = a.match(/-?\d+(\.\d+)?/g)!.map(Number);
  const numsB = b.match(/-?\d+(\.\d+)?/g)!.map(Number);
  let i = 0;
  return a.replace(/-?\d+(\.\d+)?/g, () => {
    const v = numsA[i] + (numsB[i] - numsA[i]) * t;
    i++;
    return String(Math.round(v * 10) / 10);
  });
}

export default function FlyingBirds() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const container = containerRef.current;
    if (!container) return;

    let activeBirds  = 0;
    const MAX_BIRDS  = 2;
    const cleanupFns: (() => void)[] = [];

    function launchBird() {
      if (activeBirds >= MAX_BIRDS) return;
      if (!container) return;
      activeBirds++;

      const W        = container.offsetWidth;
      const H        = container.offsetHeight;
      const goRight  = Math.random() > 0.3;
      const scale    = rand(0.65, 1.05);
      const startX   = goRight ? -70 : W + 70;
      const endX     = goRight ? W + 70 : -70;
      // Sky: top 42% of the hero
      const startY   = rand(0.04, 0.40) * H;
      const duration = rand(10, 18);
      const amplitude= rand(20, 55);    // vertical wave height px
      const frequency= rand(0.7, 1.6);  // sine cycles across screen
      const phase    = Math.random() * Math.PI * 2;

      // ── Build SVG ──────────────────────────────────────────────────────────
      const svg  = document.createElementNS(SVG_NS, "svg");
      const path = document.createElementNS(SVG_NS, "path");

      svg.setAttribute("viewBox", "-24 -20 48 28");
      svg.setAttribute("width",  "58");
      svg.setAttribute("height", "32");
      svg.style.cssText = [
        "position:absolute",
        "top:0",
        "left:0",
        "overflow:visible",
        "pointer-events:none",
        "will-change:transform",
        `transform:translate(${startX}px,${startY}px) scale(${scale})`,
      ].join(";");

      path.setAttribute("d",              WINGS[0]);
      path.setAttribute("stroke",         "rgba(12,18,22,0.80)");
      path.setAttribute("stroke-width",   "2.4");
      path.setAttribute("fill",           "none");
      path.setAttribute("stroke-linecap", "round");
      path.setAttribute("stroke-linejoin","round");

      // Mirror bird when flying right-to-left
      if (!goRight) path.setAttribute("transform", "scale(-1,1)");

      svg.appendChild(path);
      container!.appendChild(svg);

      // ── Flapping ───────────────────────────────────────────────────────────
      let wIndex    = 0;
      let wProgress = 0;
      let gliding   = false;
      const flapDur = rand(0.22, 0.38); // seconds per half-beat

      const flapTicker = gsap.ticker.add(() => {
        if (gliding) return;
        wProgress += gsap.ticker.deltaRatio(60) / (flapDur * 60);
        if (wProgress >= 1) {
          wProgress = 0;
          wIndex    = (wIndex + 1) % WINGS.length;
        }
        const d = lerpPath(WINGS[wIndex], WINGS[(wIndex + 1) % WINGS.length], wProgress);
        path.setAttribute("d", d);
      });

      // Occasional glide (wings held mid)
      let glideTimeout: ReturnType<typeof setTimeout>;
      function scheduleGlide() {
        glideTimeout = setTimeout(() => {
          gliding = true;
          path.setAttribute("d", WINGS[1]);
          setTimeout(() => { gliding = false; scheduleGlide(); }, rand(400, 1100));
        }, rand(2200, 6000));
      }
      scheduleGlide();

      // ── Flight motion ──────────────────────────────────────────────────────
      const pos = { x: startX };

      const tween = gsap.to(pos, {
        x:        endX,
        duration,
        ease:     "none",
        onUpdate() {
          const p  = this.progress();
          const y  = startY + Math.sin(p * Math.PI * 2 * frequency + phase) * amplitude;
          svg.style.transform = `translate(${pos.x}px,${y}px) scale(${scale})`;
        },
        onComplete() {
          cleanup();
          activeBirds--;
          // Schedule next bird after a pause
          const delay = rand(3500, 9000);
          const t = setTimeout(launchBird, delay);
          cleanupFns.push(() => clearTimeout(t));
        },
      });

      function cleanup() {
        gsap.ticker.remove(flapTicker);
        clearTimeout(glideTimeout);
        tween.kill();
        if (svg.parentNode) svg.parentNode.removeChild(svg);
      }

      cleanupFns.push(cleanup);
    }

    // Stagger initial launches
    const t1 = setTimeout(() => launchBird(), rand(800,  2500));
    const t2 = setTimeout(() => launchBird(), rand(5000, 11000));
    cleanupFns.push(() => clearTimeout(t1), () => clearTimeout(t2));

    return () => { cleanupFns.forEach(fn => fn()); };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position:      "absolute",
        inset:         0,
        pointerEvents: "none",
        zIndex:        1,
        overflow:      "hidden",
      }}
    />
  );
}
