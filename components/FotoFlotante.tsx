"use client";
import { PHOTOS } from "./photos";

// Foto flotante con brillo suave (encima de la cuenta regresiva)
export default function FotoFlotante() {
  return (
    <section style={{ padding: "48px 26px 30px", display: "flex", justifyContent: "center" }}>
      <div className="foto-flota">
        <div className="foto-flota-glow" aria-hidden="true" />
        <img src={PHOTOS.framed2} alt="Edith y Daniel" />
        <div className="foto-flota-sheen" aria-hidden="true" />
      </div>
    </section>
  );
}
