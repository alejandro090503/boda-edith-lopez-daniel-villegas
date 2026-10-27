"use client";
import { useState, useEffect } from "react";

const PANEL_API = "https://panel-invitados.vercel.app/api/confirmar";
const RSVP_URL = "https://boda-edith-lopez-daniel-villegas.vercel.app";
/* Fecha límite: 5 dic 2026 23:59:59 — desde el 6 dic se congela */
const DEADLINE = new Date(2026, 11, 5, 23, 59, 59, 999);
const ROJO = "#a3311f";

type Choice = "yes" | "no";

/* WhatsApp y Messenger cortan la URL en el primer espacio o "&". El panel
   manda un token base64url en ?i= ("nombre|pases|menores") que llega intacto.
   Se conserva ?para= por si se envió algún link así. */
function decodeInvite(tok: string): string {
  try {
    let b64 = tok.replace(/-/g, "+").replace(/_/g, "/");
    while (b64.length % 4) b64 += "=";
    const bin = atob(b64);
    const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
    return (new TextDecoder().decode(bytes).split("|")[0] || "").trim();
  } catch {
    return "";
  }
}

/* Sin acentos ni mayúsculas para emparejar respuestas guardadas */
const clave = (x: string) =>
  String(x || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/\s+/g, " ").trim();

function Corner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const t = {
    tl: { top: 0, left: 0, transform: "none" },
    tr: { top: 0, right: 0, transform: "scaleX(-1)" },
    bl: { bottom: 0, left: 0, transform: "scaleY(-1)" },
    br: { bottom: 0, right: 0, transform: "scale(-1,-1)" },
  }[pos] as React.CSSProperties;
  return (
    <svg viewBox="0 0 52 52" fill="none" aria-hidden="true"
      style={{ position: "absolute", width: 48, height: 48, pointerEvents: "none", ...t }}>
      <path d="M2 50 L2 2 L50 2" stroke="#D4AF37" strokeWidth=".9" opacity=".7" />
      <circle cx="2" cy="2" r="2.5" fill="#D4AF37" opacity=".6" />
    </svg>
  );
}

export default function RSVPSection() {
  const [para, setPara] = useState("");
  /* Nombres que los novios asignaron en el panel: una tarjeta por cada uno */
  const [asignados, setAsignados] = useState<string[]>([]);
  const [choices, setChoices] = useState<Record<number, Choice>>({});
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ msg: string; color: string } | null>(null);
  const [frozen, setFrozen] = useState(false);
  const [listo, setListo] = useState(false); // el panel ya respondió y la invitación existe
  const [bloqueado, setBloqueado] = useState(false);
  const [resumen, setResumen] = useState<{ estado: "confirmado" | "declino"; nombres: string[] } | null>(null);
  const [btnText, setBtnText] = useState("Confirmar");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let p = "";
    const tok = params.get("i");
    if (tok) p = decodeInvite(tok);
    if (!p) p = (params.get("para") || "").trim();
    setPara(p);
    setFrozen(Date.now() > DEADLINE.getTime());
    if (!p) {
      setFeedback({ msg: "Abre el enlace personalizado que te enviaron para confirmar tu asistencia.", color: ROJO });
      return;
    }
    fetch(`${PANEL_API}?nombre=${encodeURIComponent(p)}&url_boda=${encodeURIComponent(RSVP_URL)}`)
      .then((r) => r.json())
      .then((d) => {
        const inv = d?.invitado;
        /* Si el panel no la tiene no se deja confirmar: el envío crearía una
           invitación nueva y los contadores dejarían de cuadrar. */
        if (!inv) {
          setFeedback({ msg: "No encontramos tu invitación. Pide a los novios que te envíen tu enlace de nuevo.", color: ROJO });
          return;
        }
        const lista: string[] = (Array.isArray(inv.nombres_asignados) ? inv.nombres_asignados : [])
          .map((n: unknown) => String(n ?? "").trim()).filter(Boolean);
        if (!lista.length) {
          setFeedback({ msg: "Tu invitación aún no tiene lugares asignados. Contacta a los novios.", color: ROJO });
          return;
        }
        setAsignados(lista);
        if (inv.estado === "confirmado" || inv.estado === "declino") {
          const conf = (Array.isArray(inv.nombres_confirmados) ? inv.nombres_confirmados : []).map((n: string) => clave(n));
          const previas: Record<number, Choice> = {};
          lista.forEach((nm, i) => { previas[i] = inv.estado === "declino" ? "no" : (conf.includes(clave(nm)) ? "yes" : "no"); });
          setChoices(previas);
          setBtnText("Actualizar respuesta");
          setResumen({ estado: inv.estado, nombres: lista.filter((_, i) => previas[i] === "yes") });
        }
        if (inv.bloqueado) {
          setBloqueado(true);
          setFeedback({ msg: "Las confirmaciones de esta invitación ya están cerradas. Si necesitas un cambio, contacta a los novios.", color: ROJO });
        }
        setListo(true);
      })
      .catch(() => setFeedback({ msg: "No pudimos cargar tu invitación. Recarga la página.", color: ROJO }));
  }, []);

  const cerrado = frozen || bloqueado || !listo;

  function elegir(i: number, v: Choice) {
    if (cerrado) return;
    setChoices((prev) => ({ ...prev, [i]: v }));
    setFeedback(null);
  }

  async function postConfirm(estado: "confirmado" | "declino", nombresArr: string[]) {
    setLoading(true);
    setBtnText("Enviando…");
    setFeedback(null);
    try {
      const r = await fetch(PANEL_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: para,
          estado,
          pases_confirmados: nombresArr.length,
          nombres_confirmados: nombresArr,
          url_boda: RSVP_URL,
        }),
      });
      const d = await r.json().catch(() => null);
      /* Solo se da por registrada si el panel la guardó de verdad */
      if (r.ok && d?.ok) {
        setBtnText("Actualizar respuesta");
        setResumen({ estado, nombres: nombresArr });
        return;
      }
      setBtnText("Confirmar");
      const err = d?.error;
      if (err === "respuestas_cerradas") {
        setBloqueado(true);
        setFeedback({ msg: "Las confirmaciones de esta invitación ya están cerradas. Si necesitas un cambio, contacta a los novios.", color: ROJO });
        return;
      }
      setFeedback({
        msg: err === "no_match"
          ? "No pudimos identificar tu invitación. Abre el enlace personalizado que te enviaron; ese es el único que registra tu confirmación."
          : err === "invitacion_borrada"
            ? "Esta invitación ya no está activa. Contacta a los novios para que te envíen un enlace nuevo."
            : "Hubo un problema al enviar. Intenta de nuevo.",
        color: ROJO,
      });
    } catch {
      setBtnText("Confirmar");
      setFeedback({ msg: "Sin conexión. Verifica tu internet e intenta de nuevo.", color: ROJO });
    } finally {
      setLoading(false);
    }
  }

  const handleConfirm = () => {
    if (cerrado || loading || !asignados.length) return;
    const faltan = asignados.filter((_, i) => !choices[i]).length;
    if (faltan) {
      setFeedback({ msg: `Por favor responde por cada invitado (${faltan} pendiente${faltan === 1 ? "" : "s"}).`, color: ROJO });
      return;
    }
    const si = asignados.filter((_, i) => choices[i] === "yes");
    postConfirm(si.length ? "confirmado" : "declino", si);
  };

  const toggleBtnStyle = (active: boolean, v: Choice): React.CSSProperties => ({
    flex: 1,
    padding: "11px 6px",
    minHeight: 46,
    borderRadius: 10,
    border: active ? (v === "yes" ? "1.5px solid #06420c" : "1.5px solid #8A6A14") : "1.5px solid rgba(212,175,55,0.4)",
    background: active
      ? (v === "yes" ? "linear-gradient(135deg,#06420c,#011f02)" : "rgba(125,87,32,0.12)")
      : "rgba(255,255,255,0.6)",
    fontFamily: "var(--font-cormorant), serif",
    fontStyle: "italic",
    fontWeight: 600,
    fontSize: 17,
    color: active ? (v === "yes" ? "#f3efe6" : "#8A6A14") : "#3a3a3a",
    cursor: cerrado ? "not-allowed" : "pointer",
    transition: "all .25s",
    opacity: cerrado ? 0.5 : 1,
  });

  return (
    <section style={{ padding: "64px 24px" }}>
      <div className="no-halo" style={{
        position: "relative",
        maxWidth: 520,
        margin: "0 auto",
        background: "rgba(246,242,234,0.96)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        border: "1px solid rgba(212,175,55,0.45)",
        padding: "52px 28px 44px",
        boxShadow: "0 24px 64px rgba(0,0,0,0.28)",
      }}>
        <div style={{ position: "absolute", inset: 10, border: "1px solid rgba(212,175,55,0.22)", pointerEvents: "none" }} />
        <Corner pos="tl" /><Corner pos="tr" /><Corner pos="bl" /><Corner pos="br" />

        <div style={{ textAlign: "center", position: "relative" }}>
          {/* Ornamento superior */}
          <svg viewBox="0 0 320 56" fill="none" aria-hidden="true" style={{ display: "block", margin: "0 auto 22px", width: "min(260px,70vw)", height: "auto" }}>
            <g stroke="#D4AF37" strokeWidth=".9" opacity=".85" fill="none">
              <path d="M18 28 Q50 10 82 28 Q106 42 130 28" />
              <path d="M190 28 Q214 42 238 28 Q270 10 302 28" />
              <circle cx="160" cy="28" r="5.5" />
              <circle cx="160" cy="28" r="2" fill="#D4AF37" stroke="none" />
              <path d="M154 20 Q160 13 166 20" opacity=".55" />
              <path d="M154 36 Q160 43 166 36" opacity=".55" />
            </g>
          </svg>

          <p style={{
            fontFamily: "var(--font-cormorant), serif",
            fontStyle: "italic",
            fontWeight: 600,
            fontSize: 13,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: "#8A6A14",
            marginBottom: 6,
          }}>
            Confirmación de Asistencia
          </p>

          <h2 style={{
            fontFamily: "var(--font-great-vibes), cursive",
            fontSize: "clamp(40px, 11vw, 56px)",
            lineHeight: 1.1,
            color: "#06420c",
            marginBottom: 18,
          }}>
            Tu presencia <span style={{ color: "#D4AF37" }}>lo es</span> todo
          </h2>

          <p style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 600,
            fontSize: 18,
            color: "#3a3a3a",
            lineHeight: 1.8,
            maxWidth: 380,
            margin: "0 auto 28px",
          }}>
            Por favor confirma tu asistencia antes del <strong style={{ color: "#06420c" }}>5 de diciembre de 2026</strong>. Nos encantará saber que estarás con nosotros en este día tan especial.
          </p>

          {/* Divisor con corazón */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, maxWidth: 300, margin: "0 auto 24px" }}>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(to right,transparent,rgba(212,175,55,0.5),transparent)" }} />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#D4AF37" style={{ flexShrink: 0, opacity: 0.85 }}>
              <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
            </svg>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(to right,transparent,rgba(212,175,55,0.5),transparent)" }} />
          </div>

          {/* Plazo cerrado */}
          {frozen && (
            <div style={{
              maxWidth: 380, margin: "0 auto 20px", padding: "14px 16px", borderRadius: 12,
              background: "rgba(212,175,55,0.10)", border: "1px solid rgba(212,175,55,0.35)",
              fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontSize: 16, lineHeight: 1.5, color: "#06420c",
            }}>
              El plazo para confirmar cerró el <strong style={{ fontStyle: "normal" }}>5 de diciembre de 2026</strong>.<br />
              Si necesitas ajustar tu respuesta, contacta a los novios.
            </div>
          )}

          {/* A quién va dirigida: nombre grande con brillo */}
          {para && listo && (
            <div style={{ marginBottom: 14 }}>
              <p style={{
                fontFamily: "var(--font-cormorant), serif", fontSize: 13, fontWeight: 700,
                letterSpacing: 4, textTransform: "uppercase", color: "#8A6A14", marginBottom: 4, paddingLeft: 4,
              }}>
                Esta invitación es para
              </p>
              <p className="rsvp-para-nombre">{para}</p>
            </div>
          )}

          {/* Lugares reservados */}
          {para && listo && (
            <div style={{
              display: "block", width: "fit-content", margin: "0 auto 22px",
              background: "linear-gradient(135deg,#06420c,#011f02)", color: "#f3efe6",
              border: "1px solid rgba(212,175,55,0.45)", borderRadius: 30, padding: "6px 22px",
              fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontWeight: 600, fontSize: 16, letterSpacing: 1.5,
            }}>
              {asignados.length === 1 ? "1 pase reservado" : `${asignados.length} pases reservados`}
            </div>
          )}

          {resumen ? (
            /* Agradecimiento: la bandeja se cierra al confirmar */
            <div style={{
              maxWidth: 380, margin: "0 auto", padding: "24px 20px", borderRadius: 16,
              background: "rgba(255,255,255,0.72)", border: "1.5px solid rgba(212,175,55,0.45)",
            }}>
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#06420c" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ display: "block", margin: "0 auto 10px" }}>
                <circle cx="12" cy="12" r="10" /><polyline points="8.5 12.5 11 15 16 9.5" />
              </svg>
              <p style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 700, fontSize: 24, color: "#06420c", lineHeight: 1.3, marginBottom: 8 }}>
                {resumen.estado === "confirmado" ? "¡Gracias por confirmar!" : "Gracias por avisarnos"}
              </p>
              <p style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontWeight: 600, fontSize: 18, color: "#3a3a3a", lineHeight: 1.6, marginBottom: 18 }}>
                {resumen.estado === "confirmado"
                  ? (resumen.nombres.length === 1
                    ? `Te esperamos, ${resumen.nombres[0]}.`
                    : `Confirmamos ${resumen.nombres.length} lugares: ${resumen.nombres.join(", ")}.`)
                  : "Lamentamos que no puedan acompañarnos. Los vamos a extrañar."}
              </p>
              {!bloqueado && (
                <button
                  type="button"
                  disabled={frozen}
                  onClick={() => { setResumen(null); setFeedback(null); }}
                  style={{
                    padding: "11px 24px", borderRadius: 24, border: "1.5px solid rgba(212,175,55,0.6)",
                    background: "transparent", color: "#06420c", cursor: frozen ? "not-allowed" : "pointer",
                    fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontWeight: 600, fontSize: 16,
                    opacity: frozen ? 0.45 : 1,
                  }}
                >
                  Modificar mi respuesta
                </button>
              )}
            </div>
          ) : (
            <>
              {asignados.length > 0 && (
                <>
                  <p style={{
                    fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontWeight: 600,
                    fontSize: 18, color: "#3a3a3a", lineHeight: 1.5, margin: "0 auto 14px", maxWidth: 380,
                  }}>
                    Marca si asistirá cada persona de tu invitación.
                  </p>
                  {/* Una tarjeta por persona asignada */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 400, margin: "0 auto 8px" }}>
                    {asignados.map((nm, i) => {
                      const sel = choices[i];
                      return (
                        <div key={i} style={{
                          padding: "14px 12px 12px", borderRadius: 14,
                          border: sel === "yes" ? "1.5px solid #06420c" : sel === "no" ? "1.5px solid rgba(138,106,20,0.55)" : "1.5px solid rgba(212,175,55,0.3)",
                          background: sel === "yes" ? "rgba(6,66,12,0.06)" : sel === "no" ? "rgba(125,87,32,0.06)" : "rgba(255,255,255,0.7)",
                          transition: "all .25s",
                        }}>
                          <p style={{
                            fontFamily: "var(--font-cormorant), serif", fontWeight: 700, fontSize: 22, color: "#06420c",
                            lineHeight: 1.25, letterSpacing: 0.3, marginBottom: 10, overflowWrap: "anywhere",
                          }}>
                            {nm}
                          </p>
                          <div style={{ display: "flex", gap: 10 }}>
                            <button type="button" disabled={cerrado} aria-pressed={sel === "yes"} onClick={() => elegir(i, "yes")} style={toggleBtnStyle(sel === "yes", "yes")}>
                              Asistirá
                            </button>
                            <button type="button" disabled={cerrado} aria-pressed={sel === "no"} onClick={() => elegir(i, "no")} style={toggleBtnStyle(sel === "no", "no")}>
                              No asistirá
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              <button
                onClick={handleConfirm}
                disabled={loading || cerrado}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 14,
                  padding: "16px 48px",
                  minHeight: 54,
                  background: "linear-gradient(135deg, #06420c, #011f02)",
                  color: "#f3efe6",
                  borderRadius: 50,
                  border: "1px solid rgba(212,175,55,0.45)",
                  cursor: loading || cerrado ? "not-allowed" : "pointer",
                  fontFamily: "var(--font-lato), sans-serif",
                  fontSize: 15,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 3,
                  boxShadow: "0 8px 26px rgba(6,66,12,0.30)",
                  opacity: loading || cerrado ? 0.6 : 1,
                }}
              >
                {frozen ? "Plazo cerrado" : bloqueado ? "Confirmaciones cerradas" : btnText}
              </button>
            </>
          )}

          {/* Avisos: fuera de la bandeja para que se vean aunque esté cerrada */}
          {feedback && (
            <p style={{
              fontFamily: "var(--font-cormorant), serif",
              fontStyle: "italic",
              fontWeight: 600,
              fontSize: 16,
              color: feedback.color,
              marginTop: 16,
              maxWidth: 380,
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.5,
            }}>
              {feedback.msg}
            </p>
          )}

          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            marginTop: 26,
            fontFamily: "var(--font-lato), sans-serif",
            fontSize: 11,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#8A6A14",
            fontWeight: 600,
            width: "100%",
            justifyContent: "center",
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm.5 5v5.25l4.5 2.67-.75 1.23L11 13V7h1.5z" />
            </svg>
            Fecha límite · 5 de diciembre 2026
          </div>
        </div>
      </div>
    </section>
  );
}
