"use client";

export default function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <>
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
        {eyebrow}
      </p>
      <h2 style={{
        fontFamily: "var(--font-great-vibes), cursive",
        fontSize: 50,
        textAlign: "center",
        lineHeight: 1.2,
        padding: "4px 20px 8px",
        background: "linear-gradient(135deg,#D4AF37 0%,#F1D98A 50%,#D4AF37 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}>
        {title}
      </h2>
    </>
  );
}
