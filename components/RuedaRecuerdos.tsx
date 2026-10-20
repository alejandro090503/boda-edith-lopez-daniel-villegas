"use client";
import { useEffect, useRef } from "react";
import { GALERIA } from "./photos";
import SectionTitle from "./SectionTitle";

// Rueda 3D arrastrable con inercia — portada de la plantilla 58 (boda-eliud-y-sulem)
const RADIUS = 290;

export default function RuedaRecuerdos() {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;
    let rot = 0, vel = 0, drag = false, startX = 0, startRot = 0, lastX = 0;
    let raf = 0, spin = true, visible = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const set = (r: number) => { rot = r; ring.style.transform = `rotateY(${rot}deg)`; };

    const loop = () => {
      if (!drag) {
        if (Math.abs(vel) > 0.05) { vel *= 0.95; set(rot + vel); }
        else if (spin && visible && !reduced) set(rot + 0.07);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.05 });
    io.observe(ring);
    // fallback por si IntersectionObserver no dispara
    const t = setTimeout(() => { visible = true; }, 1500);

    const down = (x: number) => { spin = false; drag = true; vel = 0; startX = x; startRot = rot; lastX = x; ring.classList.add("dragging"); };
    const move = (x: number) => { if (!drag) return; vel = (x - lastX) * 0.3; lastX = x; set(startRot + (x - startX) * 0.3); };
    const up = () => { if (!drag) return; drag = false; ring.classList.remove("dragging"); };

    const md = (e: MouseEvent) => down(e.clientX);
    const mm = (e: MouseEvent) => move(e.clientX);
    const ts = (e: TouchEvent) => down(e.touches[0].clientX);
    const tm = (e: TouchEvent) => move(e.touches[0].clientX);
    ring.addEventListener("mousedown", md);
    window.addEventListener("mousemove", mm);
    window.addEventListener("mouseup", up);
    ring.addEventListener("touchstart", ts, { passive: true });
    window.addEventListener("touchmove", tm, { passive: true });
    window.addEventListener("touchend", up);
    return () => {
      cancelAnimationFrame(raf); io.disconnect(); clearTimeout(t);
      ring.removeEventListener("mousedown", md);
      window.removeEventListener("mousemove", mm);
      window.removeEventListener("mouseup", up);
      ring.removeEventListener("touchstart", ts);
      window.removeEventListener("touchmove", tm);
      window.removeEventListener("touchend", up);
    };
  }, []);

  const n = GALERIA.length;
  return (
    <section style={{ padding: "56px 0 40px", overflow: "hidden" }}>
      <SectionTitle eyebrow="Momentos" title="Nuestra historia" />
      <div className="wheel-stage">
        <div className="wheel" ref={ringRef}>
          {GALERIA.map((src, i) => (
            <div key={src} className="wheel-item" style={{ transform: `rotateY(${(360 / n) * i}deg) translateZ(${RADIUS}px)` }}>
              <img src={src} alt="Edith y Daniel" draggable={false} />
            </div>
          ))}
        </div>
      </div>
      <p className="wheel-hint">Desliza para girar</p>
    </section>
  );
}
