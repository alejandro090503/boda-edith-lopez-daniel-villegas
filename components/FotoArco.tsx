"use client";
import { useEffect, useRef } from "react";
import { PHOTOS } from "./photos";

// Foto en arco con zoom lento + paralaje al hacer scroll y aro dorado/mauve que gira (antes de la confirmación)
export default function FotoArco() {
  const imgRef = useRef<HTMLImageElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const box = boxRef.current, img = imgRef.current;
      if (!box || !img) return;
      const r = box.getBoundingClientRect();
      const p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - innerHeight / 2) / innerHeight));
      img.style.transform = `translateY(${p * -28}px) scale(1.14)`;
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section style={{ padding: "56px 26px 40px", display: "flex", justifyContent: "center" }}>
      <div ref={boxRef} className="foto-arco">
        <div className="foto-arco-ring" aria-hidden="true" />
        <div className="foto-arco-in">
          <img ref={imgRef} src={PHOTOS.framed} alt="Edith y Daniel" />
        </div>
      </div>
    </section>
  );
}
