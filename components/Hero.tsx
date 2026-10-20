"use client";
import { useEffect, useRef } from "react";
import { PHOTOS } from "./photos";

// Portada: foto a pantalla completa, nombres y fecha en la parte inferior (sin tarjeta)
export default function Hero() {
  const bottomRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => { if (photoRef.current) photoRef.current.style.transform = "scale(1)"; }, 60);
    const t2 = setTimeout(() => {
      if (bottomRef.current) Object.assign(bottomRef.current.style, { opacity: "1", transform: "translateY(0)" });
    }, 450);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <section style={{
      position: "relative", width: "100%", minHeight: "100dvh",
      display: "flex", flexDirection: "column", justifyContent: "flex-end",
      overflow: "hidden", background: "#011f02",
    }}>
      <div ref={photoRef} style={{
        position: "absolute", inset: 0,
        backgroundImage: `url("${PHOTOS.hero}")`, backgroundSize: "cover", backgroundPosition: "center 30%",
        transform: "scale(1.08)", transition: "transform 6s cubic-bezier(.2,.6,.2,1)",
      }} />
      {/* fundido inferior largo hacia el esmeralda base, para leer los nombres */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(180deg, rgba(1,31,2,0.35) 0%, rgba(1,31,2,0) 22%, rgba(1,31,2,0) 46%, rgba(1,31,2,0.55) 64%, rgba(1,31,2,0.88) 80%, #011f02 100%)",
      }} />

      <div ref={bottomRef} style={{
        position: "relative", textAlign: "center", padding: "0 20px 64px",
        opacity: 0, transform: "translateY(24px)", transition: "opacity 1.1s ease, transform 1.1s ease",
      }}>
        <p className="shine-mauve" style={{
          fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontWeight: 700,
          fontSize: 16, letterSpacing: 7, textTransform: "uppercase", marginBottom: 6,
        }}>
          Nuestra Boda
        </p>
        <h1 className="shine-gold" style={{
          fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontWeight: 600,
          fontSize: "min(15vw, 66px)", lineHeight: 1.12, margin: 0,
          filter: "drop-shadow(0 3px 16px rgba(0,0,0,0.55))",
        }}>
          Edith <span style={{ fontSize: "0.7em" }}>&amp;</span> Daniel
        </h1>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, margin: "14px auto 0", maxWidth: 320 }}>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to right,transparent,#D4AF37)" }} />
          <span className="shine-gold" style={{
            fontFamily: "var(--font-cormorant), serif", fontWeight: 700, fontSize: 18, letterSpacing: 5,
            textTransform: "uppercase", whiteSpace: "nowrap",
          }}>
            20 · 12 · 2026
          </span>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to left,transparent,#D4AF37)" }} />
        </div>
      </div>

      <div style={{
        position: "absolute", bottom: 18, left: "50%", transform: "translateX(-50%)",
        animation: "hintFloat 3s ease-in-out infinite",
      }}>
        <div style={{ width: 1, height: 28, background: "linear-gradient(to bottom, transparent, rgba(241,217,138,0.7))" }} />
      </div>
    </section>
  );
}
