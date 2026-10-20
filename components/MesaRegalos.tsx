"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import SectionTitle from "./SectionTitle";

const CLABE = "638180000182616866";

/* ── Lluvia de sobres (boda-jeffersson-y-vanessa): caen hasta que la sección se centra y aterriza uno ── */
function LluviaSobres() {
  const secRef = useRef<HTMLElement>(null);
  const [landed, setLanded] = useState(false);
  const [open, setOpen] = useState(false);
  const drops = useMemo(() => Array.from({ length: 16 }, (_, i) => ({
    left: (i * 61) % 100, w: 16 + ((i * 37) % 16), dur: 5 + ((i * 13) % 40) / 10,
    del: (i * 0.52) % 7, dx: ((i * 29) % 70) - 35, rot: ((i * 47) % 160) - 80,
  })), []);

  useEffect(() => {
    const check = () => {
      const s = secRef.current;
      if (!s || landed) return;
      const r = s.getBoundingClientRect();
      if (r.top + r.height / 2 < innerHeight * 0.55) setLanded(true);
    };
    addEventListener("scroll", check, { passive: true });
    check();
    return () => removeEventListener("scroll", check);
  }, [landed]);

  return (
    <section ref={secRef} style={{ position: "relative", padding: "56px 26px 64px", textAlign: "center", overflow: "hidden" }}>
      <div className="env-rain" aria-hidden="true" style={{ opacity: landed ? 0 : 1 }}>
        {drops.map((d, i) => (
          <svg key={i} viewBox="0 0 34 24" className="env-rain-item" style={{
            left: `${d.left}%`, width: d.w, height: (d.w * 24) / 34,
            animationDuration: `${d.dur}s`, animationDelay: `${d.del}s`,
            ["--dx" as string]: `${d.dx}px`, ["--rot" as string]: `${d.rot}deg`,
          } as React.CSSProperties}>
            <rect x="1" y="1" width="32" height="22" rx="2.5" fill="#fdf3dc" stroke="#D4AF37" strokeWidth="1.2" />
            <path d="M1 1 L17 13 L33 1" fill="none" stroke="#64456e" strokeWidth="1.2" strokeLinejoin="round" />
          </svg>
        ))}
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <SectionTitle eyebrow="Celebra con nosotros" title="Lluvia de Sobres" />
        <button type="button" aria-label="Sobre — toca para abrir" aria-expanded={open}
          className={`env-interactive${landed ? " landed" : ""}${open ? " open" : ""}`}
          onClick={() => landed && setOpen((o) => !o)}>
          <div className={`env-body${landed && !open ? " breathe" : ""}`}>
            <svg className="env-svg" viewBox="0 0 260 200" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="envPaper" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0%" stopColor="#fff8e6" /><stop offset="100%" stopColor="#fdf3dc" />
                </linearGradient>
              </defs>
              <rect x="18" y="52" width="224" height="132" rx="8" fill="url(#envPaper)" stroke="rgba(212,175,55,.7)" strokeWidth="1.4" />
              <path d="M18 184 L130 110 L242 184" stroke="rgba(100,69,110,.35)" strokeWidth="1" fill="none" />
            </svg>
            <div className="env-flap-wrap" aria-hidden="true">
              <svg viewBox="0 0 224 86" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }}>
                <defs>
                  <linearGradient id="envFlap" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="#fdf3dc" /><stop offset="100%" stopColor="#fffaef" />
                  </linearGradient>
                </defs>
                <path d="M0 0 L112 86 L224 0 Z" fill="url(#envFlap)" stroke="rgba(212,175,55,.7)" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </div>
            <svg className="env-seal" viewBox="0 0 60 60" aria-hidden="true">
              <circle cx="30" cy="30" r="28" fill="#0b5a3a" />
              <circle cx="30" cy="30" r="28" fill="none" stroke="#023303" strokeWidth="2" opacity=".55" />
              <circle cx="30" cy="30" r="21.5" fill="none" stroke="#F1D98A" strokeWidth="1.1" opacity=".9" />
              <text x="30" y="36" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize="17" fill="#F1D98A">E&amp;D</text>
            </svg>
          </div>
          <div className="env-open-content" aria-live="polite">
            <svg width="42" height="42" viewBox="0 0 52 52" fill="none" stroke="#F1D98A" strokeWidth="1.5" aria-hidden="true">
              <rect x="8" y="22" width="36" height="24" rx="5" /><path d="M8 30 Q26 38 44 30" />
              <rect x="18" y="8" width="16" height="16" rx="2" /><path d="M18 8 Q26 3 34 8" />
            </svg>
            <p className="env-title shine-gold">Tu presencia es nuestro regalo</p>
            <p className="env-desc">El día del evento habrá una urna donde podrás depositar tu sobre con mucho cariño.</p>
          </div>
        </button>
        <p className={`env-tap-hint${landed && !open ? " show" : ""}`}>Toca para abrir</p>
      </div>
    </section>
  );
}

/* ── Caja de regalo → modal de transferencia (boda-paola-e-ivan) ── */
function CajaRegalo() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  const copy = () => {
    navigator.clipboard?.writeText(CLABE).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2200); }).catch(() => {});
  };

  return (
    <section style={{ padding: "40px 26px 64px", textAlign: "center" }}>
      <SectionTitle eyebrow="Obsequios" title="Mesa de Regalos" />
      <p style={{
        fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontWeight: 600, fontSize: 18,
        color: "var(--text-soft)", lineHeight: 1.65, maxWidth: 360, margin: "6px auto 0",
      }}>
        Su cariño y presencia son el mejor regalo que podemos recibir. Si desean obsequiarnos algo, será recibido con mucho gusto.
      </p>
      <div className="giftbox-stage">
        <button type="button" className={`giftbox${open ? " is-open" : ""}`} aria-label="Abrir la mesa de regalos"
          aria-expanded={open} onClick={() => setOpen(true)}>
          <svg viewBox="0 0 200 190" fill="none" aria-hidden="true">
            <rect x="26" y="72" width="148" height="104" rx="4" fill="#0b4a1a" />
            <rect x="26" y="72" width="148" height="104" rx="4" fill="url(#gbShade)" />
            <rect x="88" y="72" width="24" height="104" fill="#D4AF37" />
            <rect x="26" y="112" width="148" height="15" fill="#D4AF37" />
            <rect x="26.7" y="72.7" width="146.6" height="102.6" rx="3.3" stroke="#9C7A1C" strokeWidth="1.4" />
            <g className="giftbox-lid">
              <rect x="16" y="54" width="168" height="26" rx="4" fill="#64456e" />
              <rect x="16.7" y="54.7" width="166.6" height="24.6" rx="3.3" stroke="#9C7A1C" strokeWidth="1.4" />
              <rect x="88" y="54" width="24" height="26" fill="#D4AF37" />
              <path d="M100 54 C100 40 84 26 70 32 C58 37 62 52 78 54 Z" fill="#D4AF37" stroke="#9C7A1C" strokeWidth="1.2" />
              <path d="M100 54 C100 40 116 26 130 32 C142 37 138 52 122 54 Z" fill="#D4AF37" stroke="#9C7A1C" strokeWidth="1.2" />
              <circle cx="100" cy="52" r="8" fill="#F6E3A0" stroke="#9C7A1C" strokeWidth="1.2" />
            </g>
            <defs>
              <linearGradient id="gbShade" x1="26" y1="72" x2="174" y2="176" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ffffff" stopOpacity=".14" /><stop offset="1" stopColor="#000000" stopOpacity=".25" />
              </linearGradient>
            </defs>
          </svg>
        </button>
        <span className={`giftbox-cta${open ? " is-hidden" : ""}`}>Toca el regalo</span>
      </div>

      {mounted && createPortal(<div className={`gift-backdrop${open ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Mesa de regalos"
        onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
        <div className="gift-reveal">
          <button className="gift-close" type="button" aria-label="Cerrar" onClick={() => setOpen(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
          <div className="gift-reveal-eyebrow">Con cariño</div>
          <div className="gr-slide">
            <div className="gr-logo">
              <svg viewBox="0 0 24 24" fill="none" stroke="#8A6A14" strokeWidth="1.3" strokeLinecap="round" aria-hidden="true">
                <rect x="3" y="6" width="18" height="13" rx="1.5" /><path d="M3 10h18" /><path d="M7 15h4" />
              </svg>
            </div>
            <div className="gr-title">Transferencia</div>
            <div className="gr-bankname">Nu</div>
            <div className="gr-accounts">
              <div className="gr-acc">
                <div className="gr-acc-info">
                  <div className="gr-acc-n">Edith Alicia López Miguel</div>
                  <div className="gr-acc-c">638 180 000182616866</div>
                </div>
                <button className={`gr-acc-btn${copied ? " is-copied" : ""}`} type="button" aria-label="Copiar CLABE" onClick={copy}>
                  {copied
                    ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12l5 5L20 7" /></svg>
                    : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></svg>}
                </button>
              </div>
            </div>
            <p className="gr-hint">{copied ? "CLABE copiada" : "CLABE interbancaria"}</p>
          </div>
        </div>
      </div>, document.body)}
    </section>
  );
}

export default function MesaRegalos() {
  return (
    <>
      <CajaRegalo />
      <LluviaSobres />
    </>
  );
}
