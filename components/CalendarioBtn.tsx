"use client";

const GCAL_URL = (() => {
  const base = "https://calendar.google.com/calendar/render?action=TEMPLATE";
  const title = encodeURIComponent("Boda de Edith & Daniel");
  const details = encodeURIComponent(
    "Boda de Edith López & Daniel Villegas · https://boda-edith-lopez-daniel-villegas.vercel.app"
  );
  const location = encodeURIComponent("Salón Jardín México Lindo, México Lindo 226, Cd. Nezahualcóyotl, Edo. Méx.");
  const dates = "20261220T220000Z/20261221T040000Z";
  return `${base}&text=${title}&dates=${dates}&details=${details}&location=${location}`;
})();

export default function CalendarioBtn() {
  return (
    <section style={{ padding: "40px 26px 64px", textAlign: "center" }}>
      <p style={{
        fontFamily: "var(--font-cormorant), serif",
        fontStyle: "italic", fontSize: 14, letterSpacing: 5,
        textTransform: "uppercase", color: "#F1D98A",
        marginBottom: 8, opacity: 0.85, fontWeight: 600,
      }}>
        No lo olvides
      </p>
      <h2 style={{
        fontFamily: "var(--font-great-vibes), cursive",
        fontSize: 48, lineHeight: 1.25, marginBottom: 16, padding: "4px 20px 8px",
        background: "linear-gradient(135deg,#D4AF37 0%,#F1D98A 50%,#D4AF37 100%)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        display: "inline-block",
      }}>
        Guárdalo
      </h2>
      <p style={{
        fontFamily: "var(--font-cormorant), serif",
        fontStyle: "italic", fontWeight: 600, fontSize: 17,
        color: "var(--text-soft)", marginBottom: 20,
      }}>
        Agrega el evento a tu calendario
      </p>
      <a href={GCAL_URL} target="_blank" rel="noopener noreferrer"
        style={{
          display: "inline-block", padding: "14px 32px",
          background: "linear-gradient(135deg,#D4AF37,#9C7A1C)",
          color: "#011f02", borderRadius: 30,
          fontFamily: "var(--font-lato), sans-serif",
          fontSize: 14, fontWeight: 800, textTransform: "uppercase",
          letterSpacing: 3, textDecoration: "none",
          boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
        }}>
        Añadir a Google Calendar
      </a>
    </section>
  );
}
