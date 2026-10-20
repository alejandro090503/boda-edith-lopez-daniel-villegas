"use client";

function Block({ label, names, icon, rounded }: { label: string; names: React.ReactNode; icon: React.ReactNode; rounded: string }) {
  return (
    <div style={{
      width: "100%",
      textAlign: "center",
      padding: "30px 26px",
      background: "rgba(1,31,2,0.45)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      border: "1px solid rgba(241,217,138,0.22)",
      borderRadius: rounded,
    }}>
      <div style={{
        width: 52, height: 52, borderRadius: "50%",
        margin: "0 auto 14px",
        background: "rgba(241,217,138,0.12)",
        border: "1.5px solid rgba(241,217,138,0.4)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {icon}
      </div>
      <p style={{
        fontFamily: "var(--font-cormorant), serif",
        fontStyle: "italic",
        fontWeight: 700,
        fontSize: 15,
        letterSpacing: 6,
        textTransform: "uppercase",
        color: "#F1D98A",
        marginBottom: 14,
      }}>
        {label}
      </p>
      <div style={{
        fontFamily: "var(--font-cormorant), serif",
        fontWeight: 600,
        fontSize: 21,
        color: "var(--text)",
        lineHeight: 1.85,
      }}>
        {names}
      </div>
    </div>
  );
}

const Amp = () => (
  <span style={{ display: "block", fontStyle: "italic", fontSize: 30, color: "var(--mauve-light)", lineHeight: 1.1, margin: "4px 0" }}>&amp;</span>
);

export default function Familia() {
  return (
    <section style={{ padding: "64px 26px" }}>
      <p style={{
        fontFamily: "var(--font-cormorant), serif",
        fontStyle: "italic",
        fontWeight: 600,
        fontSize: 14,
        letterSpacing: 5,
        textTransform: "uppercase",
        color: "#F1D98A",
        textAlign: "center",
        marginBottom: 8,
        opacity: 0.9,
      }}>
        Con la bendición de
      </p>
      <h2 style={{
        fontFamily: "var(--font-great-vibes), cursive",
        fontSize: 50,
        textAlign: "center",
        lineHeight: 1.25,
        marginBottom: 30,
        padding: "6px 24px 10px",
        background: "linear-gradient(135deg,#D4AF37 0%,#F1D98A 50%,#D4AF37 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        display: "block",
      }}>
        Nuestros Padres
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "stretch" }}>
        <Block
          rounded="24px"
          label="Padres de la Novia"
          icon={
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#F1D98A" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          }
          names={<>Emilio C. López Pérez<Amp />María Isabel Miguel González</>}
        />
        <Block
          rounded="24px"
          label="Padres del Novio"
          icon={
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#F1D98A" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2 L13.7 8.4 L20 9 L15 13.5 L16.5 20 L12 16.5 L7.5 20 L9 13.5 L4 9 L10.3 8.4 Z" />
            </svg>
          }
          names={<>Eduardo Villegas López<Amp />María Rosa Delgado Pineda</>}
        />
      </div>
    </section>
  );
}
