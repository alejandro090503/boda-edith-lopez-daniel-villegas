"use client";
import { PHOTOS } from "./photos";

/* Cierre: foto a sangre que se funde al esmeralda por los cuatro lados (sin bordes claros), frase y monograma */
export default function ClosingPhoto() {
  return (
    <section className="cierre">
      <div className="cierre-foto" style={{ backgroundImage: `url("${PHOTOS.closing}")` }} aria-hidden="true" />
      <div className="cierre-velo" aria-hidden="true" />

      <div className="cierre-txt">
        <div className="cierre-orn" aria-hidden="true">
          <span /><i /><span />
        </div>
        <p className="cierre-frase">
          Gracias por ser parte de nuestra historia. Los esperamos para celebrar juntos el inicio de este nuevo capítulo.
        </p>
        <div className="cierre-mono shine-gold">E<span>&amp;</span>D</div>
        <div className="cierre-nombres shine-mauve">Edith &amp; Daniel</div>
      </div>
    </section>
  );
}
