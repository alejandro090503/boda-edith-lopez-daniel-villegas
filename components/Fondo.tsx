"use client";

const BASE = "https://bsjoelxktbvlavfoozhk.supabase.co/storage/v1/object/public/fotos-clientes/img/boda-edith-lopez-daniel-villegas";

// Textura de tinta (assets de save-the-date-lekshmy repintados esmeralda/oro/mauve).
// Se funde a transparente arriba y abajo con un largo FIJO en px → todos los bordes
// entre secciones funden igual sobre el esmeralda base del contenedor.
export default function Fondo({
  img, children, opacity = 0.8, position = "center", flip = false,
}: {
  img: "ink-hero" | "ink-footer" | "ink-top" | "ink-corner" | "ink-oval";
  children: React.ReactNode;
  opacity?: number;
  position?: string;
  flip?: boolean;
}) {
  return (
    <div className="fondo" style={{ position: "relative", isolation: "isolate" }}>
      <div aria-hidden="true" className="fondo-tex" style={{
        backgroundImage: `url("${BASE}/${img}.jpg")`,
        backgroundPosition: position,
        opacity,
        transform: flip ? "scaleY(-1)" : undefined,
      }} />
      {children}
    </div>
  );
}
