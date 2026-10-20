"use client";
import { useEffect, useRef } from "react";
import { PHOTOS } from "./photos";

const PARTICLES = [
  { left: "7%",  size: 4, dur: 9,  del: 0,   color: "#F1D98A" },
  { left: "21%", size: 3, dur: 12, del: 1.4, color: "rgba(241,217,138,0.5)" },
  { left: "36%", size: 5, dur: 8,  del: 0.6, color: "#F1D98A" },
  { left: "54%", size: 3, dur: 10, del: 2.2, color: "rgba(241,217,138,0.5)" },
  { left: "69%", size: 4, dur: 11, del: 0.9, color: "#F1D98A" },
  { left: "84%", size: 3, dur: 9,  del: 1.8, color: "rgba(241,217,138,0.5)" },
  { left: "13%", size: 5, dur: 13, del: 3.1, color: "#F1D98A" },
  { left: "47%", size: 3, dur: 10, del: 2.7, color: "rgba(241,217,138,0.6)" },
  { left: "75%", size: 4, dur: 12, del: 0.4, color: "#F1D98A" },
  { left: "91%", size: 3, dur: 8,  del: 1.6, color: "rgba(241,217,138,0.5)" },
];

const GOLD_TEXT = "linear-gradient(135deg,#D4AF37 0%,#F1D98A 48%,#D4AF37 100%)";

function OrnamentBar() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "0 10px" }}>
      <div style={{ flex: 1, height: 0.5, background: "linear-gradient(90deg, transparent, rgba(241,217,138,0.6))" }} />
      <svg width="5" height="5" viewBox="0 0 5 5">
        <rect width="5" height="5" fill="#F1D98A" transform="rotate(45 2.5 2.5)" opacity="0.75" />
      </svg>
      <svg width="11" height="11" viewBox="0 0 11 11">
        <rect x="1.5" y="1.5" width="8" height="8" fill="#F1D98A" transform="rotate(45 5.5 5.5)" opacity="0.9" />
        <rect x="3.5" y="3.5" width="4" height="4" fill="#011f02" transform="rotate(45 5.5 5.5)" />
        <rect x="4.5" y="4.5" width="2" height="2" fill="#F1D98A" transform="rotate(45 5.5 5.5)" opacity="0.85" />
      </svg>
      <svg width="5" height="5" viewBox="0 0 5 5">
        <rect width="5" height="5" fill="#F1D98A" transform="rotate(45 2.5 2.5)" opacity="0.75" />
      </svg>
      <div style={{ flex: 1, height: 0.5, background: "linear-gradient(90deg, rgba(241,217,138,0.6), transparent)" }} />
    </div>
  );
}

export default function Hero() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const xvRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const schedule = [
      { el: messageRef, delay: 180, styles: { opacity: "1", transform: "translateY(0)" } },
      { el: nameRef, delay: 480, styles: { opacity: "1", transform: "translateY(0) scale(1)" } },
      { el: xvRef, delay: 900, styles: { opacity: "1", transform: "translateY(0)" } },
      { el: dateRef, delay: 1200, styles: { opacity: "1", transform: "translateY(0)" } },
    ];
    const timers = schedule.map(({ el, delay, styles }) =>
      setTimeout(() => { if (el.current) Object.assign(el.current.style, styles); }, delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const hasPhoto = !!PHOTOS.hero;

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(165deg, #011f02 0%, #06420c 50%, #011f02 100%)",
        overflow: "hidden",
        padding: "62px 0 48px",
      }}
    >
      {/* Foto de fondo (Foto 1) */}
      {hasPhoto && (
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url("${PHOTOS.hero}")`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          pointerEvents: "none",
        }} />
      )}
      {/* Overlay verde para legibilidad del texto */}
      <div style={{
        position: "absolute", inset: 0,
        background: hasPhoto
          ? "linear-gradient(180deg, rgba(1,31,2,0.62) 0%, rgba(1,31,2,0.48) 30%, rgba(1,31,2,0.42) 46%, rgba(1,31,2,0.82) 100%)"
          : "radial-gradient(ellipse 70% 50% at 50% 42%, rgba(241,217,138,0.10) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {PARTICLES.map((p, i) => (
        <div key={i} style={{
          position: "absolute",
          bottom: -10, left: p.left,
          width: p.size, height: p.size,
          borderRadius: "50%",
          background: p.color,
          opacity: 0.45,
          animation: `floatUp ${p.dur}s ${p.del}s linear infinite`,
          pointerEvents: "none",
        }} />
      ))}

      <p
        ref={messageRef}
        style={{
          position: "relative",
          maxWidth: 360,
          padding: "0 28px 24px",
          margin: 0,
          textAlign: "center",
          fontFamily: "var(--font-cormorant), serif",
          fontStyle: "italic",
          fontWeight: 700,
          fontSize: 17,
          lineHeight: 1.5,
          letterSpacing: 6,
          textTransform: "uppercase",
          color: "#f3efe6",
          textShadow: hasPhoto ? "0 1px 10px rgba(0,0,0,0.85), 0 0 24px rgba(0,0,0,0.5)" : "none",
          opacity: 0,
          transform: "translateY(14px)",
          transition: "opacity 0.95s ease, transform 0.95s ease",
        }}
      >
        Nuestra Boda
      </p>

      <div style={{ position: "relative", width: "100%", textAlign: "center", overflow: "visible", padding: "0 0 4px" }}>
        <h1
          ref={nameRef}
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontStyle: "italic",
            fontWeight: 600,
            fontSize: "min(15vw, 68px)",
            lineHeight: 1.15,
            background: GOLD_TEXT,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 3px 18px rgba(0,0,0,0.45))",
            margin: 0,
            padding: "4px 28px 12px 22px",
            opacity: 0,
            transform: "translateY(22px) scale(0.97)",
            transition: "opacity 0.95s ease, transform 0.95s ease",
            display: "block",
            whiteSpace: "nowrap",
          }}
        >
          Edith <span style={{ fontSize: "0.7em" }}>&amp;</span> Daniel
        </h1>
      </div>

      <div style={{ position: "relative", width: "100%", maxWidth: 360, padding: "0 24px" }}>
        <div style={{
          position: "relative",
          border: "1px solid rgba(241,217,138,0.45)",
          borderRadius: 2,
          background: "rgba(1,31,2,0.42)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          padding: "26px 26px 24px",
          textAlign: "center",
        }}>
          <div style={{
            position: "absolute", inset: 5,
            border: "0.5px solid rgba(241,217,138,0.25)",
            borderRadius: 1,
            pointerEvents: "none",
          }} />

          <OrnamentBar />

          <div
            ref={xvRef}
            style={{
              opacity: 0,
              transform: "translateY(18px)",
              transition: "opacity 0.9s ease, transform 0.9s ease",
              marginTop: 16,
            }}
          >
            <div style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 700,
              fontSize: "clamp(52px, 15vw, 70px)",
              letterSpacing: 10,
              lineHeight: 1,
              textIndent: 10,
              background: GOLD_TEXT,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              E&amp;D
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, margin: "8px 0 10px" }}>
              <div style={{ width: 22, height: 0.5, background: "rgba(241,217,138,0.5)" }} />
              <svg width="5" height="5" viewBox="0 0 5 5">
                <rect width="5" height="5" fill="#F1D98A" transform="rotate(45 2.5 2.5)" opacity="0.85" />
              </svg>
              <div style={{ width: 22, height: 0.5, background: "rgba(241,217,138,0.5)" }} />
            </div>

            <div style={{
              fontFamily: "var(--font-cormorant), serif",
              fontStyle: "italic",
              fontWeight: 600,
              fontSize: "clamp(20px, 5.5vw, 26px)",
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#F1D98A",
              textIndent: 6,
            }}>
              Nos Casamos
            </div>
          </div>

          <div style={{ margin: "18px 0 14px" }}>
            <OrnamentBar />
          </div>

          <div
            ref={dateRef}
            style={{
              opacity: 0,
              transform: "translateY(10px)",
              transition: "opacity 0.9s ease, transform 0.9s ease",
            }}
          >
            <span style={{
              display: "inline-block",
              padding: "5px 22px",
              border: "0.6px solid rgba(241,217,138,0.4)",
              borderRadius: 40,
              fontFamily: "var(--font-cormorant), serif",
              fontStyle: "italic",
              fontWeight: 600,
              fontSize: 15,
              letterSpacing: 4,
              color: "#f3efe6",
              background: "rgba(1,31,2,0.35)",
            }}>
              20 · Diciembre · 2026
            </span>
          </div>
        </div>
      </div>

      <div style={{
        position: "absolute",
        bottom: 22,
        left: "50%",
        transform: "translateX(-50%)",
        animation: "hintFloat 3s ease-in-out infinite",
      }}>
        <div style={{ width: 1, height: 28, background: "linear-gradient(to bottom, transparent, rgba(241,217,138,0.6))" }} />
      </div>
    </section>
  );
}
