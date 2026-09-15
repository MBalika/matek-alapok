/**
 * Térvektor-műveletek és képletformázás a térgeometria-modulhoz.
 * A vektorokat egyszerű háromelemű tömbként tároljuk: [x, y, z].
 */

import { szK } from "@/lib/szamok";

export const ossz = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
export const kul = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
export const nyujt = (l, a) => [l * a[0], l * a[1], l * a[2]];
export const skalaris = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
export const hossz = (a) => Math.hypot(a[0], a[1], a[2]);

export function vektorialis(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

export const vegyes = (a, b, c) => skalaris(vektorialis(a, b), c);

export function egyseg(a) {
  const h = hossz(a);
  return h < 1e-12 ? [0, 0, 0] : [a[0] / h, a[1] / h, a[2] / h];
}

/** Két vektor hajlásszöge fokban (0…180). */
export function szogFok(a, b) {
  const n = hossz(a) * hossz(b);
  if (n < 1e-12) return NaN;
  const c = Math.max(-1, Math.min(1, skalaris(a, b) / n));
  return (Math.acos(c) * 180) / Math.PI;
}

/** Egyenesek / síkok hajlásszöge: mindig a hegyesszög. */
export function hegyesSzogFok(a, b) {
  const n = hossz(a) * hossz(b);
  if (n < 1e-12) return NaN;
  const c = Math.min(1, Math.abs(skalaris(a, b)) / n);
  return (Math.acos(c) * 180) / Math.PI;
}

/** Egyenes és sík hajlásszöge (szinuszos képlet). */
export function egyenesSikSzog(v, n) {
  const nev = hossz(v) * hossz(n);
  if (nev < 1e-12) return NaN;
  const s = Math.min(1, Math.abs(skalaris(v, n)) / nev);
  return (Math.asin(s) * 180) / Math.PI;
}

export const parhuzamos = (a, b) => hossz(vektorialis(a, b)) < 1e-9;

/** Pont és egyenes távolsága. */
export function pontEgyenesTav(Q, P, v) {
  return hossz(vektorialis(kul(Q, P), v)) / hossz(v);
}

/** Pont és sík távolsága; a sík: n·x = d. */
export function pontSikTav(Q, n, d) {
  return Math.abs(skalaris(n, Q) - d) / hossz(n);
}

/** Két kitérő egyenes távolsága. */
export function kiteroTav(P, v1, Q, v2) {
  const n = vektorialis(v1, v2);
  const h = hossz(n);
  if (h < 1e-12) return pontEgyenesTav(Q, P, v1);
  return Math.abs(skalaris(kul(Q, P), n)) / h;
}

/** Legnagyobb közös osztó (egész együtthatók egyszerűsítéséhez). */
export function lnko(a, b) {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));
  while (y) {
    const t = x % y;
    x = y;
    y = t;
  }
  return x;
}

/**
 * Egész koordinátájú normálvektor egyszerűsítése a legkisebb egész alakra,
 * úgy, hogy az első nem nulla koordináta pozitív legyen.
 */
export function egyszerusit(n) {
  const g = n.reduce((s, k) => lnko(s, k), 0) || 1;
  let v = n.map((k) => Math.round(k) / g);
  const elso = v.find((k) => k !== 0) ?? 1;
  if (elso < 0) v = v.map((k) => -k);
  return v;
}

/* ---------------- KaTeX-formázás ---------------- */

/** Vektor koordinátás alakja: (3;\,-1;\,2) */
export function vekK(v, tizedes = 0) {
  return `\\left(${v.map((k) => szK(k, tizedes)).join(";\\, ")}\\right)`;
}

/** Vastag betűs vektorjelölés. */
export const vjel = (nev) => `\\mathbf{${nev}}`;

/** Előjeles tag képlethez: „+ 3” vagy „− 3”. */
export function elojelesK(v, tizedes = 0) {
  return `${v < 0 ? "-" : "+"} ${szK(Math.abs(v), tizedes)}`;
}

/** a·b kiszámolásának kiírása: 3\cdot 2 + 4\cdot 1 + 5\cdot 0 = 10 */
export function skalarisLevezetes(a, b) {
  const tagok = a.map((k, i) => `${zar(k)}\\cdot ${zar(b[i])}`).join(" + ");
  return `${tagok} = ${szK(skalaris(a, b), 0)}`;
}

/** Zárójel negatív számnak, hogy a szorzás olvasható maradjon. */
export function zar(k) {
  return k < 0 ? `(${szK(k, 0)})` : szK(k, 0);
}

/** Sík egyenletének kiírása: 3x - 6y + 2z = -14 */
export function sikEgyenletK(n, d, tizedes = 0) {
  const nevek = ["x", "y", "z"];
  let s = "";
  n.forEach((k, i) => {
    if (Math.abs(k) < 1e-12) return;
    const elso = s === "";
    const jel = k < 0 ? (elso ? "-" : " - ") : elso ? "" : " + ";
    const egyutt = Math.abs(k) === 1 ? "" : szK(Math.abs(k), tizedes);
    s += `${jel}${egyutt}${nevek[i]}`;
  });
  if (s === "") s = "0";
  return `${s} = ${szK(d, tizedes)}`;
}

/** Paraméteres egyenesalak KaTeX-ben, egymás alatt. */
export function egyenesParamK(P, v, param = "t") {
  const nevek = ["x", "y", "z"];
  const sorok = nevek.map((nev, i) => {
    const c = v[i];
    if (Math.abs(c) < 1e-12) return `${nev} &= ${szK(P[i], 0)}`;
    const egyutt = Math.abs(c) === 1 ? "" : szK(Math.abs(c), 0);
    if (Math.abs(P[i]) < 1e-12) return `${nev} &= ${c < 0 ? "-" : ""}${egyutt}${param}`;
    return `${nev} &= ${szK(P[i], 0)} ${c < 0 ? "-" : "+"} ${egyutt}${param}`;
  });
  return `\\begin{aligned}${sorok.join(" \\\\ ")}\\end{aligned}`;
}

/** 3×3 determináns KaTeX-ben. */
export function determinansK(a, b, c) {
  return `\\begin{vmatrix} ${a.map((k) => szK(k, 0)).join(" & ")} \\\\ ${b
    .map((k) => szK(k, 0))
    .join(" & ")} \\\\ ${c.map((k) => szK(k, 0)).join(" & ")} \\end{vmatrix}`;
}

/** i, j, k fejlécű determináns a vektoriális szorzathoz. */
export function keresztDetK(a, b) {
  return `\\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ ${a
    .map((k) => szK(k, 0))
    .join(" & ")} \\\\ ${b.map((k) => szK(k, 0)).join(" & ")} \\end{vmatrix}`;
}

/** Pont jelölése: A(2;\,1;\,-1) */
export function pontK(nev, P, tizedes = 0) {
  return `${nev}${vekK(P, tizedes)}`;
}

/** Négyzetgyök szép alakja: ha a szám négyzetszám, egész; különben \sqrt{n}. */
export function gyokK(n) {
  const g = Math.sqrt(n);
  if (Math.abs(g - Math.round(g)) < 1e-9) return `${Math.round(g)}`;
  // kiemelhető négyzetes tényező keresése
  for (let k = Math.floor(Math.sqrt(n)); k >= 2; k--) {
    if (n % (k * k) === 0) return `${k}\\sqrt{${n / (k * k)}}`;
  }
  return `\\sqrt{${n}}`;
}
