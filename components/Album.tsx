"use client";
import { useEffect, useState } from "react";
import SectionTitle from "./SectionTitle";

// Álbum compartido — QR → /album (redirect a panel-invitados/subir/<slug>); se desbloquea el día del evento
const FECHA = [2026, 12, 20];

export default function Album() {
  const [bloqueado, setBloqueado] = useState(true);
  useEffect(() => {
    setBloqueado(new Date() < new Date(FECHA[0], FECHA[1] - 1, FECHA[2], 0, 0, 0));
  }, []);

  return (
    <section style={{ padding: "64px 26px", textAlign: "center" }}>
      <SectionTitle eyebrow="Comparte tus fotos" title="Álbum de fotos" />
      <p style={{
        fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontWeight: 600, fontSize: 18,
        color: "var(--text-soft)", lineHeight: 1.65, maxWidth: 360, margin: "10px auto 30px",
      }}>
        Ayúdanos a guardar cada momento: sube aquí las fotos que tomes durante el evento.
      </p>
      <div className={`album-qr${bloqueado ? " bloqueado" : ""}`}
        style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
        <div style={{ padding: 12, background: "#fff", borderRadius: 16, border: "2px solid #D4AF37", boxShadow: "0 10px 30px rgba(0,0,0,0.4)" }}>
          <img src="/qr-album.png" alt="Código QR del álbum de fotos" width={200} height={200} style={{ display: "block" }} />
        </div>
        <a className="album-btn" href="/album" style={{
          fontFamily: "var(--font-lato), sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 3,
          textTransform: "uppercase", color: "#011f02", padding: "13px 30px", borderRadius: 40, textDecoration: "none",
          background: "linear-gradient(135deg,#F1D98A,#D4AF37 55%,#9C7A1C)",
        }}>
          Subir mis fotos
        </a>
      </div>
      {bloqueado && (
        <p style={{
          fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontWeight: 600, fontSize: 18, color: "var(--mauve-light)",
          lineHeight: 1.55, maxWidth: 330, margin: "22px auto 0",
        }}>
          El álbum de fotos se habilita el día del evento. Regresa aquí y sube todas tus fotos de la noche ✨
        </p>
      )}
    </section>
  );
}
