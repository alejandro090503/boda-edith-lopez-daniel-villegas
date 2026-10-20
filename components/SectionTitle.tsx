"use client";

export default function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <>
      <p className="shine-mauve" style={{
        fontFamily: "var(--font-cormorant), serif",
        fontStyle: "italic",
        fontWeight: 600,
        fontSize: 14,
        letterSpacing: 5,
        textTransform: "uppercase",
        textAlign: "center",
        marginBottom: 8,
        opacity: 0.9,
      }}>
        {eyebrow}
      </p>
      <h2 className="shine-gold script" style={{
        fontFamily: "var(--font-great-vibes), cursive",
        fontSize: 50,
        textAlign: "center",
        lineHeight: 1.2,
        padding: "4px 20px 8px",
      }}>
        {title}
      </h2>
    </>
  );
}
