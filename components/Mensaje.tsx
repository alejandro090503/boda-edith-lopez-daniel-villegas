"use client";

// Mensaje literal de los novios (Detalles finales del formulario)
export default function Mensaje() {
  return (
    <section style={{ padding: "64px 28px 40px", textAlign: "center" }}>
      <div style={{ width: 1, height: 42, margin: "0 auto 24px", background: "linear-gradient(to bottom, transparent, #D4AF37)" }} />
      <p style={{
        fontFamily: "var(--font-cormorant), serif",
        fontStyle: "italic",
        fontWeight: 600,
        fontSize: 20,
        lineHeight: 1.7,
        color: "var(--text)",
        maxWidth: 370,
        margin: "0 auto",
      }}>
        “Hay historias donde la química se convierte en el cimiento de una vida compartida. Tras años de caminar juntos,
        ha llegado el momento de formalizar nuestra unión y dar uno de los pasos más importantes de nuestras vidas.
        Queremos celebrar el inicio de este nuevo capítulo rodeados de quienes han formado parte de nuestra historia.
        Tu presencia hará que este comienzo sea verdaderamente inolvidable.”
      </p>
      <p style={{
        marginTop: 22,
        fontFamily: "var(--font-cormorant), serif",
        fontWeight: 700,
        fontSize: 18,
        letterSpacing: 4,
        textTransform: "uppercase",
        color: "var(--mauve-light)",
      }}>
        — Edith &amp; Daniel —
      </p>
    </section>
  );
}
