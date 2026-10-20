"use client";
import { useState } from "react";

const CLABE = "638180000182616866";

function Clabe() {
  const [ok, setOk] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(CLABE).then(() => { setOk(true); setTimeout(() => setOk(false), 2200); }).catch(() => {});
  };
  return (
    <div style={{
      marginTop: 30, width: "100%", maxWidth: 340, padding: "24px 20px",
      background: "rgba(1,31,2,0.45)", border: "1px solid rgba(241,217,138,0.3)", borderRadius: 20,
    }}>
      <p style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontWeight: 700, fontSize: 15,
        letterSpacing: 5, textTransform: "uppercase", color: "#F1D98A", marginBottom: 10 }}>
        Transferencia
      </p>
      <p style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 700, fontSize: 16, color: "var(--text)", marginBottom: 4 }}>Nu</p>
      <p style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 700, fontSize: 19, letterSpacing: 1.5, color: "#F1D98A", marginBottom: 6, wordBreak: "break-all" }}>
        {CLABE}
      </p>
      <p style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 500, fontSize: 16, color: "var(--text-soft)", lineHeight: 1.5, marginBottom: 16 }}>
        CLABE · Edith Alicia López Miguel
      </p>
      <button onClick={copy} style={{
        fontFamily: "var(--font-lato), sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 3,
        textTransform: "uppercase", color: "#011f02", padding: "12px 26px", border: "none", borderRadius: 40,
        background: "linear-gradient(135deg,#F1D98A,#D4AF37 55%,#9C7A1C)", cursor: "pointer",
      }}>
        {ok ? "¡Copiada!" : "Copiar CLABE"}
      </button>
    </div>
  );
}

export default function MesaRegalos() {
  const [open, setOpen] = useState(false);

  return (
    <section style={{ padding: "64px 26px", textAlign: "center" }}>
      <p style={{
        fontFamily: "var(--font-cormorant), serif",
        fontStyle: "italic",
        fontWeight: 600,
        fontSize: 14,
        letterSpacing: 5,
        textTransform: "uppercase",
        color: "#F1D98A",
        marginBottom: 8,
        opacity: 0.9,
      }}>
        Obsequios
      </p>
      <h2 style={{
        fontFamily: "var(--font-great-vibes), cursive",
        fontSize: 50,
        lineHeight: 1.2,
        marginBottom: 14,
        padding: "4px 20px 8px",
        background: "linear-gradient(135deg,#D4AF37 0%,#F1D98A 50%,#D4AF37 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        display: "inline-block",
      }}>
        Mesa de Regalos
      </h2>

      <p style={{
        fontFamily: "var(--font-cormorant), serif",
        fontStyle: "italic",
        fontWeight: 600,
        fontSize: 18,
        color: "var(--text-soft)",
        lineHeight: 1.65,
        letterSpacing: 0.4,
        maxWidth: 360,
        margin: "0 auto 44px",
      }}>
        Su cariño y presencia son el mejor regalo que podemos recibir. Si desean obsequiarnos algo, será recibido con mucho gusto.
      </p>

      {/* Sobre interactivo */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
        <button
          onClick={() => setOpen(o => !o)}
          aria-label="Sobre — toca para abrir"
          aria-expanded={open}
          style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            cursor: "pointer", border: "none", background: "none", padding: 0,
            WebkitTapHighlightColor: "transparent", outline: "none",
          }}
        >
          <div style={{
            perspective: 700,
            position: "relative",
            width: 260,
            height: 200,
            animation: "envBreathe 3.6s ease-in-out infinite",
          }}>
            {/* Cuerpo del sobre */}
            <svg viewBox="0 0 260 200" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }} aria-hidden="true">
              <defs>
                <linearGradient id="js-env-fill" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0%" stopColor="#06420c" />
                  <stop offset="100%" stopColor="#1a6a28" />
                </linearGradient>
              </defs>
              <rect x="18" y="52" width="224" height="132" rx="10" fill="url(#js-env-fill)" stroke="rgba(241,217,138,0.6)" strokeWidth="1.4" />
              <path d="M18 184 L130 110 L242 184" stroke="rgba(241,217,138,0.4)" strokeWidth="1" fill="none" />
              {/* Líneas decorativas (lluvia) */}
              <line x1="90"  y1="30" x2="90"  y2="20" stroke="#F1D98A" strokeWidth="1.3" strokeLinecap="round" opacity=".55" />
              <line x1="130" y1="24" x2="130" y2="14" stroke="#F1D98A" strokeWidth="1.3" strokeLinecap="round" opacity=".7" />
              <line x1="170" y1="30" x2="170" y2="20" stroke="#F1D98A" strokeWidth="1.3" strokeLinecap="round" opacity=".55" />
              <line x1="110" y1="18" x2="110" y2="10" stroke="#D4AF37" strokeWidth="1"   strokeLinecap="round" opacity=".5" />
              <line x1="150" y1="18" x2="150" y2="10" stroke="#D4AF37" strokeWidth="1"   strokeLinecap="round" opacity=".5" />
              {/* Sello J&S */}
              <circle cx="130" cy="118" r="16" fill="rgba(241,217,138,0.16)" stroke="rgba(241,217,138,0.6)" strokeWidth="1" />
              <text x="130" y="123" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#F1D98A" opacity=".95">E&amp;D</text>
            </svg>

            {/* Solapa animable */}
            <div style={{
              position: "absolute",
              top: 46, left: 18,
              width: 224, height: 86,
              transformOrigin: "top center",
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transition: "transform .65s cubic-bezier(.4,0,.2,1)",
              transform: open ? "rotateX(-175deg)" : "rotateX(0deg)",
              pointerEvents: "none",
              zIndex: 2,
            }}>
              <svg viewBox="0 0 224 86" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
                <defs>
                  <linearGradient id="js-flap-fill" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="#1a6a28" />
                    <stop offset="100%" stopColor="#06420c" />
                  </linearGradient>
                </defs>
                <path d="M0 0 L112 86 L224 0 Z" fill="url(#js-flap-fill)" stroke="rgba(241,217,138,0.6)" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Contenido revelado */}
          <div style={{
            overflow: "hidden",
            maxHeight: open ? 520 : 0,
            opacity: open ? 1 : 0,
            transition: "max-height .55s .3s ease, opacity .4s .38s ease",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
            padding: "0 20px",
            pointerEvents: open ? "auto" : "none",
          }}>
            <svg width="40" height="40" viewBox="0 0 52 52" fill="none" stroke="#F1D98A" strokeWidth="1.5" style={{ marginTop: 12 }} aria-hidden="true">
              <rect x="8" y="22" width="36" height="24" rx="5" />
              <path d="M8 30 Q26 38 44 30" />
              <rect x="18" y="8" width="16" height="16" rx="2" />
              <path d="M18 8 Q26 3 34 8" />
            </svg>
            <p style={{
              fontFamily: "var(--font-great-vibes), cursive",
              fontSize: 34,
              color: "#F1D98A",
              lineHeight: 1.2,
            }}>
              Lluvia de Sobres
            </p>
            <p style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: 16,
              fontStyle: "italic",
              fontWeight: 600,
              color: "var(--text-soft)",
              lineHeight: 1.7,
            }}>
              Habrá un buzón de sobres el día del evento.
            </p>
          </div>
        </button>

        <Clabe />

        <p style={{
          fontFamily: "var(--font-lato), sans-serif",
          fontSize: 11,
          letterSpacing: 3,
          textTransform: "uppercase",
          color: "#F1D98A",
          opacity: open ? 0 : 0.9,
          transition: "opacity .3s",
          marginTop: 8,
        }}>
          Toca el sobre
        </p>
      </div>
    </section>
  );
}
