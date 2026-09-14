/** Komplex számok: műveletek, alakváltás, kiírás KaTeX-hez. */

import { normalizalSzog, radFok, fokRad, sz, szK } from "./szamok";

export const K = (a, b) => ({ a, b });

export function abszolut(z) {
  return Math.hypot(z.a, z.b);
}

/** Argumentum fokban, 0–360 közé normalizálva. */
export function argFok(z) {
  if (Math.abs(z.a) < 1e-12 && Math.abs(z.b) < 1e-12) return 0;
  return normalizalSzog(radFok(Math.atan2(z.b, z.a)));
}

export function polarbol(r, fok) {
  const t = fokRad(fok);
  return K(r * Math.cos(t), r * Math.sin(t));
}

export const konjugalt = (z) => K(z.a, -z.b);
export const osszeg = (z, w) => K(z.a + w.a, z.b + w.b);
export const kulonbseg = (z, w) => K(z.a - w.a, z.b - w.b);
export const szorzat = (z, w) => K(z.a * w.a - z.b * w.b, z.a * w.b + z.b * w.a);

export function hanyados(z, w) {
  const n = w.a * w.a + w.b * w.b;
  return K((z.a * w.a + z.b * w.b) / n, (z.b * w.a - z.a * w.b) / n);
}

/** z^n Moivre-képlettel (n egész). */
export function hatvany(z, n) {
  const r = Math.pow(abszolut(z), n);
  return polarbol(r, argFok(z) * n);
}

/** Az n darab n-edik gyök, k = 0 … n−1 sorrendben. */
export function gyokok(z, n) {
  const r = Math.pow(abszolut(z), 1 / n);
  const fi = argFok(z);
  return Array.from({ length: n }, (_, k) => ({
    k,
    r,
    fok: normalizalSzog((fi + 360 * k) / n),
    ...polarbol(r, (fi + 360 * k) / n),
  }));
}

/** Melyik síknegyed (I–IV) vagy tengely. */
export function negyed(z) {
  const e = 1e-9;
  if (Math.abs(z.b) < e) return z.a >= 0 ? "pozitív valós tengely" : "negatív valós tengely";
  if (Math.abs(z.a) < e) return z.b > 0 ? "pozitív képzetes tengely" : "negatív képzetes tengely";
  if (z.a > 0 && z.b > 0) return "I. negyed";
  if (z.a < 0 && z.b > 0) return "II. negyed";
  if (z.a < 0 && z.b < 0) return "III. negyed";
  return "IV. negyed";
}

/* ---------- kiírás ---------- */

/** Szám KaTeX-hez: felesleges záró nullák nélkül, nagy számoknál ezres tagolással. */
export function szamK(x, tizedes = 2) {
  if (Math.abs(x) >= 1e4) {
    const egesz = Math.round(Math.abs(x)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "\\,");
    return (x < 0 ? "-" : "") + egesz;
  }
  let s = szK(x, tizedes);
  if (s.includes("{,}")) s = s.replace(/0+$/, "").replace(/\{,\}$/, "");
  return s;
}

/** Algebrai alak KaTeX-hez: „3 + 2i”, „−1 − 4,5i”, „7”, „−i”. */
export function algK(z, tizedes = 2) {
  const e = 0.5 * Math.pow(10, -tizedes);
  const a = Math.abs(z.a) < e ? 0 : z.a;
  const b = Math.abs(z.b) < e ? 0 : z.b;
  if (a === 0 && b === 0) return "0";
  const reSz = a === 0 ? "" : szamK(a, tizedes);
  let imSz = "";
  if (b !== 0) {
    const ab = Math.abs(b);
    const egy = Math.abs(ab - 1) < e;
    const szam = egy ? "" : szamK(ab, tizedes);
    const elojel = b < 0 ? "-" : a === 0 ? "" : "+";
    imSz = `${elojel} ${szam}i`;
    if (a === 0) imSz = `${b < 0 ? "-" : ""}${szam}i`;
  }
  return `${reSz} ${imSz}`.trim();
}

/** Algebrai alak sima szövegként (nem KaTeX). */
export function alg(z, tizedes = 2) {
  return algK(z, tizedes).replace(/\{,\}/g, ",").replace(/\s+/g, " ");
}

/** Trigonometrikus alak KaTeX-hez, fokban. */
export function trigK(z, tizedes = 2, szogTizedes = 1) {
  const r = abszolut(z);
  const fi = argFok(z);
  return `${szK(r, tizedes)}\\left(\\cos ${szK(fi, szogTizedes)}^\\circ + i\\sin ${szK(fi, szogTizedes)}^\\circ\\right)`;
}

/** Zárójelezett algebrai alak szorzáshoz: (4 + 3i). */
export function zarojelesK(z, tizedes = 2) {
  const s = algK(z, tizedes);
  return s.includes(" ") || s.startsWith("-") ? `(${s})` : s;
}

/** Nevezetes szög fokban → pontos radián-felirat, ha van (KaTeX). */
export function radFelirat(fok) {
  const f = normalizalSzog(fok);
  const tabla = {
    0: "0",
    30: "\\pi/6",
    45: "\\pi/4",
    60: "\\pi/3",
    90: "\\pi/2",
    120: "2\\pi/3",
    135: "3\\pi/4",
    150: "5\\pi/6",
    180: "\\pi",
    210: "7\\pi/6",
    225: "5\\pi/4",
    240: "4\\pi/3",
    270: "3\\pi/2",
    300: "5\\pi/3",
    315: "7\\pi/4",
    330: "11\\pi/6",
  };
  const kerek = Math.round(f);
  if (Math.abs(f - kerek) < 1e-6 && tabla[kerek] !== undefined) return tabla[kerek];
  return `${szK((f * Math.PI) / 180, 3)}`;
}

export { sz, szK };
