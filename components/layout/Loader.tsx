"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";

// Critical assets that must load before the loader exits
const CRITICAL = ["/images/uruguay.webp", "/images/Substract.png"];
const MIN_MS   = 1800; // minimum display time even if assets are cached

export default function Loader() {
  // Start visible so server-rendered HTML shows the overlay immediately
  const [visible, setVisible] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const barRef     = useRef<HTMLDivElement>(null);
  const logoRef    = useRef<HTMLDivElement>(null);

  // Runs synchronously before browser paint — hides instantly for returning visitors
  useLayoutEffect(() => {
    if (sessionStorage.getItem("loaderSeen")) {
      setVisible(false);
    }
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    const bar     = barRef.current;
    const logo    = logoRef.current;
    // If refs are null it means useLayoutEffect already hid the loader
    if (!overlay || !bar || !logo) return;

    sessionStorage.setItem("loaderSeen", "1");
    document.body.style.overflow = "hidden";

    const startTime = Date.now();
    const prog      = { value: 0 };
    let loaded      = 0;
    const total     = CRITICAL.length + 1; // images + fonts

    const setBar = (target: number, dur = 0.45) => {
      gsap.to(prog, {
        value:     target,
        duration:  dur,
        ease:      "power2.out",
        overwrite: true,
        onUpdate: () => {
          if (bar) bar.style.transform = `scaleX(${prog.value})`;
        },
      });
    };

    const onAssetReady = () => {
      loaded++;
      setBar(loaded / total);
      if (loaded < total) return;

      // All assets loaded — fill bar to 100% then exit
      setBar(1, 0.25);
      const remaining = Math.max(0, MIN_MS - (Date.now() - startTime));

      setTimeout(() => {
        const tl = gsap.timeline({
          onComplete: () => {
            document.body.style.overflow = "";
            setVisible(false);
          },
        });
        tl.to(logo,    { opacity: 0, y: -14, duration: 0.4, ease: "power2.in" })
          .to(overlay, { yPercent: -100, duration: 0.85, ease: "power3.inOut" }, "-=0.05");
      }, remaining + 280);
    };

    // Logo fade-in + initial bar fill for feel
    gsap.from(logo, { opacity: 0, y: 18, duration: 0.65, ease: "power2.out" });
    setBar(0.06, 1.0);

    // Track font loading
    document.fonts.ready.then(onAssetReady);

    // Preload critical images and track each one
    CRITICAL.forEach(src => {
      const img   = new window.Image();
      img.onload  = onAssetReady;
      img.onerror = onAssetReady; // count errors so we never stall
      img.src     = src;
    });
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      style={{
        position:        "fixed",
        inset:           0,
        zIndex:          9999,
        backgroundColor: "#111F30",
        display:         "flex",
        flexDirection:   "column",
        alignItems:      "center",
        justifyContent:  "center",
      }}
    >
      {/* Logo + bar stacked */}
      <div ref={logoRef} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>
        <Image
          src="/images/Logo.png"
          alt="Sacramentum Advisors"
          width={200}
          height={54}
          priority
          style={{ height: 44, width: "auto", filter: "brightness(0) invert(1)" }}
        />

        {/* Progress bar — narrow, centered, below logo */}
        <div
          style={{
            width:           160,
            height:          1,
            backgroundColor: "rgba(255,255,255,0.15)",
            borderRadius:    1,
            overflow:        "hidden",
          }}
        >
          <div
            ref={barRef}
            style={{
              width:           "100%",
              height:          "100%",
              backgroundColor: "#CCA87C",
              transformOrigin: "left center",
              transform:       "scaleX(0)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
