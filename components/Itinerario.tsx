"use client";
import { useEffect, useRef } from "react";
import SectionTitle from "./SectionTitle";

// Itinerario · camino en S dibujado con scroll + perla viajera — plantilla 116 (boda-jeffersson-y-vanessa)
const EVENTOS = [
  { t: "4:00 p.m.", ev: "Recepción de invitados", de: "Salón Jardín México Lindo" },
  { t: "4:30 p.m.", ev: "Ceremonia Civil", de: "Salón Jardín México Lindo" },
  { t: "5:00 p.m.", ev: "Banquete y Brindis" },
  { t: "6:30 p.m.", ev: "Baile y Fiesta", de: "¡Que comience la celebración!" },
  { t: "10:00 p.m.", ev: "Cierre y Despedida" },
];

export default function Itinerario() {
  const secRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pearlRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sec = secRef.current, wrap = wrapRef.current, svg = svgRef.current, pearl = pearlRef.current;
    if (!sec || !wrap || !svg) return;
    const paths = Array.from(svg.querySelectorAll<SVGPathElement>("path"));
    const main = svg.querySelector<SVGPathElement>(".tl-svg-path")!;
    const drawn = paths.filter((p) => !p.classList.contains("tl-svg-bg"));
    const rows = Array.from(wrap.querySelectorAll<HTMLElement>(".tl-row"));
    let len = 0;

    const build = () => {
      const rect = wrap.getBoundingClientRect(), W = rect.width, H = wrap.offsetHeight;
      if (W < 10 || H < 10) return;
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      const pts = rows.map((row) => {
        const r = row.getBoundingClientRect();
        return { x: row.dataset.side === "left" ? 28 : W - 28, y: r.top - rect.top + r.height / 2 };
      });
      let d = `M ${pts[0].x} ${pts[0].y}`;
      for (let i = 1; i < pts.length; i++) {
        const p0 = pts[i - 1], p1 = pts[i], my = (p0.y + p1.y) / 2;
        d += ` C ${p0.x} ${my}, ${p1.x} ${my}, ${p1.x} ${p1.y}`;
      }
      paths.forEach((p) => p.setAttribute("d", d));
      len = main.getTotalLength();
      drawn.forEach((p) => { p.style.strokeDasharray = `${len}`; });
      update();
    };

    const update = () => {
      if (!len) return;
      const r = sec.getBoundingClientRect(), vh = window.innerHeight;
      const start = vh * 0.78, end = vh * 0.58;
      // progreso: top de la sección cruza 78% → bottom cruza 58%
      const total = r.height + (start - end);
      const p = Math.min(1, Math.max(0, (start - r.top) / total));
      drawn.forEach((el) => { el.style.strokeDashoffset = `${len * (1 - p)}`; });
      if (pearl) {
        if (p > 0.012 && p < 0.988) {
          const pt = main.getPointAtLength(len * p);
          pearl.style.left = `${pt.x}px`; pearl.style.top = `${pt.y}px`; pearl.style.opacity = "1";
        } else pearl.style.opacity = "0";
      }
      const n = Math.ceil(p * rows.length);
      rows.forEach((row, i) => row.classList.toggle("on", i < n));
    };

    build();
    const timers = [120, 400, 900, 1600].map((t) => setTimeout(build, t));
    let rz: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(rz); rz = setTimeout(build, 140); };
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <section ref={secRef} style={{ padding: "56px 14px 64px", overflow: "hidden", position: "relative" }}>
      <SectionTitle eyebrow="El programa del día" title="Itinerario" />
      <div className="timeline" ref={wrapRef}>
        <svg className="tl-svg" ref={svgRef} preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="tlGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9C7A1C" />
              <stop offset="20%" stopColor="#D4AF37" />
              <stop offset="40%" stopColor="#b89ac2" />
              <stop offset="50%" stopColor="#fff8e0" />
              <stop offset="60%" stopColor="#b89ac2" />
              <stop offset="80%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#9C7A1C" />
            </linearGradient>
          </defs>
          <path className="tl-svg-bg" />
          <path className="tl-svg-halo" />
          <path className="tl-svg-beam" />
          <path className="tl-svg-path" />
          <path className="tl-svg-core" />
        </svg>
        <div className="tl-pearl" ref={pearlRef} aria-hidden="true" />
        {EVENTOS.map((e, i) => (
          <div key={e.t} className="tl-row" data-side={i % 2 === 0 ? "left" : "right"}>
            <div className="tl-orn" /><div className="tl-pulse" /><div className="tl-dot" />
            <div className="tl-row-inner">
              <p className="tl-t">{e.t}</p>
              <p className="tl-ev">{e.ev}</p>
              {e.de && <p className="tl-de">{e.de}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
