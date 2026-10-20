"use client";

const COUPLE_IMG = "https://bsjoelxktbvlavfoozhk.supabase.co/storage/v1/object/public/fotos-clientes/img/xv-julia-sofia/dresscode-pareja.png";

export default function DressCode() {
  return (
    <section style={{ padding: "64px 26px", textAlign: "center" }}>
      <p style={{
        fontFamily: "var(--font-cormorant), serif",
        fontStyle: "italic",
        fontWeight: 600,
        fontSize: 14,
        letterSpacing: 6,
        textTransform: "uppercase",
        color: "#F1D98A",
        marginBottom: 4,
        opacity: 0.9,
      }}>
        Código de Vestimenta
      </p>
      <h2 style={{
        fontFamily: "var(--font-great-vibes), cursive",
        fontSize: 52,
        lineHeight: 1.1,
        marginBottom: 18,
        background: "linear-gradient(135deg,#D4AF37 0%,#F1D98A 50%,#D4AF37 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}>
        Dress Code
      </h2>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
        <img
          src={COUPLE_IMG}
          alt="Pareja en código de vestimenta cóctel formal"
          loading="lazy"
          style={{
            width: 210,
            height: "auto",
            filter: "drop-shadow(0 12px 26px rgba(0,0,0,0.45))",
          }}
        />
      </div>

      <p style={{
        fontFamily: "var(--font-cormorant), serif",
        fontStyle: "italic",
        fontWeight: 700,
        fontSize: 22,
        letterSpacing: 8,
        textTransform: "uppercase",
        color: "#F1D98A",
        marginBottom: 36,
      }}>
        Cóctel Formal
      </p>

      {/* Colores sugeridos — esfera única */}
      <div style={{
        maxWidth: 360,
        margin: "0 auto",
        padding: "30px 24px",
        background: "rgba(1,31,2,0.45)",
        border: "1px solid rgba(241,217,138,0.30)",
        borderRadius: 22,
      }}>
        <p style={{
          fontFamily: "var(--font-cormorant), serif",
          fontStyle: "italic",
          fontWeight: 600,
          fontSize: 17,
          color: "var(--text)",
          letterSpacing: 1,
          marginBottom: 20,
        }}>
          Color sugerido
        </p>

        {/* Esfera multicolor — el que deseen */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
          <div style={{
            position: "relative",
            width: 76, height: 76, borderRadius: "50%",
            background: "conic-gradient(from 210deg, #d8a8b5, #c9a674, #b8a48e, #8aa593, #6f8db5, #a89bbf, #c592a8, #d8a8b5)",
            boxShadow: "0 10px 26px rgba(0,0,0,0.4), inset 0 -6px 14px rgba(0,0,0,0.3), inset 0 4px 10px rgba(255,255,255,0.55)",
            border: "1px solid rgba(241,217,138,0.45)",
            overflow: "hidden",
          }}>
            {/* highlight para efecto esfera 3D */}
            <div style={{
              position: "absolute",
              top: "8%", left: "18%",
              width: "38%", height: "32%",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,255,255,0.55) 0%, transparent 70%)",
              filter: "blur(2px)",
            }} />
          </div>
        </div>
        <p style={{
          fontFamily: "var(--font-cormorant), serif",
          fontStyle: "italic",
          fontWeight: 600,
          fontSize: 15,
          letterSpacing: 2,
          color: "var(--text-soft)",
          marginBottom: 24,
        }}>
          El color que tú prefieras
        </p>

        {/* Colores a evitar */}
        <div style={{
          position: "relative",
          padding: "18px 18px 20px",
          border: "1px solid rgba(241,217,138,0.25)",
          borderRadius: 14,
          background: "rgba(1,31,2,0.4)",
        }}>
          <p style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: 17, fontStyle: "italic", fontWeight: 600,
            color: "var(--text)", letterSpacing: 0.5, lineHeight: 1.55,
            marginBottom: 14,
          }}>
            Te pedimos evitar estos colores
          </p>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 12 }}>
            {["#053802", "#FFFFFF", "#fff5e0", "#64516e", "#cf1717", "#630808"].map((c) => (
              <div key={c} style={{ position: "relative", width: 32, height: 32, borderRadius: "50%", background: c,
                border: "1px solid rgba(241,217,138,0.5)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.45), inset 0 -2px 4px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.3)" }}>
                <svg viewBox="0 0 32 32" style={{ position: "absolute", inset: 0 }} aria-hidden="true">
                  <line x1="7" y1="25" x2="25" y2="7" stroke="#D4AF37" strokeWidth="1.6" />
                </svg>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 500, fontSize: 16, color: "var(--text-soft)", marginTop: 12, lineHeight: 1.5 }}>
            Verde, blanco, crema, mauve, rojo y vino
          </p>
        </div>
      </div>
    </section>
  );
}
