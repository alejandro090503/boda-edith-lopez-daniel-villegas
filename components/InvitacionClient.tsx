"use client";
import { useState, useRef } from "react";
import SplashScreen from "./SplashScreen";
import Hero from "./Hero";
import Ornament from "./Ornament";
import CountdownTimer from "./CountdownTimer";
import Ubicacion from "./Ubicacion";
import CalendarioBtn from "./CalendarioBtn";
import DressCode from "./DressCode";
import Familia from "./Familia";
import MesaRegalos from "./MesaRegalos";
import Fondo from "./Fondo";
import FotoFlotante from "./FotoFlotante";
import FotoArco from "./FotoArco";
import RSVPSection from "./RSVPSection";
import RuedaRecuerdos from "./RuedaRecuerdos";
import Itinerario from "./Itinerario";
import Mensaje from "./Mensaje";
import Album from "./Album";
import ClosingPhoto from "./ClosingPhoto";
import Footer from "./Footer";
import MusicFab, { type MusicFabHandle } from "./MusicFab";
import GoldDust from "./GoldDust";
import ScrollReveal from "./ScrollReveal";

export default function InvitacionClient() {
  const [contentVisible, setContentVisible] = useState(false);
  const [splashMounted, setSplashMounted] = useState(true);
  const musicRef = useRef<MusicFabHandle>(null);

  // Al tocar el sobre (gesto del usuario) → arranca la música
  const handleStart = () => {
    musicRef.current?.play();
  };

  // Al terminar el video del sobre → revela la invitación
  const handleReveal = () => {
    setContentVisible(true);
    setTimeout(() => {
      setSplashMounted(false);
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 820);
  };

  return (
    <>
      {splashMounted && <SplashScreen onStart={handleStart} onOpen={handleReveal} />}

      <div
        style={{
          opacity: contentVisible ? 1 : 0,
          transition: "opacity 0.85s ease",
          maxWidth: 430,
          margin: "0 auto",
          position: "relative",
          overflowX: "clip",
          zIndex: 1,
          background: "#011f02",
        }}
      >
        <Hero />

        {/* Carrusel de momentos — después del hero */}
        <Fondo img="ink-top">
          <ScrollReveal>
            <Mensaje />
          </ScrollReveal>
          <ScrollReveal>
            <RuedaRecuerdos />
          </ScrollReveal>
        </Fondo>

        <ScrollReveal>
          <Ornament />
        </ScrollReveal>

        <Fondo img="ink-corner" opacity={0.75}>
          <ScrollReveal>
            <Familia />
          </ScrollReveal>
        </Fondo>

        <ScrollReveal>
          <FotoFlotante />
        </ScrollReveal>

        <ScrollReveal>
          <Ornament />
        </ScrollReveal>

        <ScrollReveal>
          <div style={{ padding: "32px 26px 10px", textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18 }}>
              <div style={{ flex: 1, maxWidth: 60, height: 1, background: "linear-gradient(to right,transparent,#D4AF37)", opacity: 0.55 }} />
              <div style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 700, fontSize: 24, letterSpacing: 8,
                textTransform: "uppercase", color: "#F1D98A", textIndent: 8,
              }}>
                20 · Diciembre · 2026
              </div>
              <div style={{ flex: 1, maxWidth: 60, height: 1, background: "linear-gradient(to left,transparent,#D4AF37)", opacity: 0.55 }} />
            </div>
          </div>
        </ScrollReveal>

        <Fondo img="ink-hero" opacity={0.70}>
          <ScrollReveal>
            <CountdownTimer />
          </ScrollReveal>
        </Fondo>

        <ScrollReveal>
          <Ornament />
        </ScrollReveal>

        <Fondo img="ink-corner" opacity={0.75}>
          <ScrollReveal>
            <Ubicacion />
          </ScrollReveal>
        </Fondo>

        <ScrollReveal>
          <CalendarioBtn />
        </ScrollReveal>

        <ScrollReveal>
          <Ornament />
        </ScrollReveal>

        <Fondo img="ink-footer" opacity={0.67}>
          <Itinerario />
        </Fondo>

        <ScrollReveal>
          <Ornament />
        </ScrollReveal>

        <Fondo img="ink-oval" opacity={0.85}>
          <ScrollReveal>
            <DressCode />
          </ScrollReveal>
        </Fondo>

        <ScrollReveal>
          <Ornament />
        </ScrollReveal>

        <Fondo img="ink-hero" opacity={0.70} flip>
          <ScrollReveal>
            <MesaRegalos />
          </ScrollReveal>
        </Fondo>

        <Fondo img="ink-oval" opacity={0.80}>
          <ScrollReveal>
            <Album />
          </ScrollReveal>
        </Fondo>

        <ScrollReveal>
          <FotoArco />
        </ScrollReveal>

        <Fondo img="ink-footer" opacity={0.70}>
          <ScrollReveal>
            <RSVPSection />
          </ScrollReveal>
        </Fondo>

        {/* Foto 3 — cierre (full-bleed) */}
        <ClosingPhoto />

        <Fondo img="ink-top" opacity={0.75} flip position="center top">
          <Footer />
        </Fondo>
      </div>

      {/* Polvo dorado — aparece tras el header */}
      {contentVisible && <GoldDust />}

      <MusicFab ref={musicRef} />
    </>
  );
}
