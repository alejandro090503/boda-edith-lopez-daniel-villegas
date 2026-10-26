// FOTOS DE LOS NOVIOS — Edith & Daniel (Supabase, fuera de Vercel)
const BASE = "https://bsjoelxktbvlavfoozhk.supabase.co/storage/v1/object/public/fotos-clientes/img/boda-edith-lopez-daniel-villegas";

export const PHOTOS = {
  hero: `${BASE}/g07.jpg`,
  framed: `${BASE}/g11.jpg`,
  framed2: `${BASE}/g06.jpg`,
  closing: `${BASE}/g12.jpg`,
};

export const GALERIA = Array.from({ length: 15 }, (_, i) => `${BASE}/g${String(i + 1).padStart(2, "0")}.jpg`);
