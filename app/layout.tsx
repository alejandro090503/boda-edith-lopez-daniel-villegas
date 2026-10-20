import type { Metadata } from "next";
import { Great_Vibes, Cormorant_Garamond, Lato } from "next/font/google";
import "./globals.css";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const lato = Lato({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://boda-edith-lopez-daniel-villegas.vercel.app"),
  title: "Edith & Daniel · Nuestra Boda · 20 Diciembre 2026",
  description:
    "Invitación digital a la boda de Edith López y Daniel Villegas · 20 de diciembre de 2026 · Nezahualcóyotl, Edo. Méx.",
  openGraph: {
    title: "Edith & Daniel · Nuestra Boda",
    description: "20 de diciembre de 2026 · Nezahualcóyotl, Edo. Méx.",
    images: [{ url: "https://bsjoelxktbvlavfoozhk.supabase.co/storage/v1/object/public/fotos-clientes/img/boda-edith-lopez-daniel-villegas/og.jpg", width: 1200, height: 630 }],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${greatVibes.variable} ${cormorant.variable} ${lato.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
