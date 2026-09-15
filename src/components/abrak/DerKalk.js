"use client";

import { useMemo, useState } from "react";
import FvRajz from "./FvRajz";
import { forditKifejezes } from "./SorKifejezes";
import { M } from "@/components/ui/Keplet";
import { sz, szK } from "@/lib/szamok";

const TEAL = "#0f766e";
const NAR = "#e2590a";
const LILA = "#7c3aed";

/* ================= numerikus segédek ================= */

/** Központi differencia: pontos a kerekítési hiba és a képlethiba egyensúlyában. */
export function derivalt(fn, x, h = 1e-5) {
  const l = Math.max(h, Math.abs(x) * h);
  const a = fn(x + l);
  const b = fn(x - l);
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    // egyoldali próba (értelmezési tartomány széle)
    const j = fn(x + 2 * l);
    if (Number.isFinite(a) && Number.isFinite(j) && Number.isFinite(fn(x)))
      return (-3 * fn(x) + 4 * a - j) / (2 * l);
    return NaN;
  }
  return (a - b) / (2 * l);
}

export function derivalt2(fn, x, h = 1e-4) {
  const l = Math.max(h, Math.abs(x) * h);
  const a = fn(x + l);
  const k = fn(x);
  const b = fn(x - l);
  if (!Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(k)) return NaN;
  return (a - 2 * k + b) / (l * l);
}

/** Zérushelyek előjelváltás-kereséssel, felezéssel pontosítva. */
export function gyokok(fn, a, b, db = 1200) {
  const ki = [];
  let elozoX = null;
  let elozoY = null;
  for (let i = 0; i <= db; i++) {
    const x = a + ((b - a) * i) / db;
    const y = fn(x);
    if (!Number.isFinite(y)) {
      elozoX = null;
      elozoY = null;
      continue;
    }
    if (Math.abs(y) < 1e-12) {
      // pontosan eltalált gyök (pl. x = 0 szimmetrikus tartományon)
      if (ki.length === 0 || Math.abs(x - ki[ki.length - 1]) > (b - a) * 0.004) ki.push(x);
    } else if (elozoY !== null && elozoY * y < 0) {
      let lo = elozoX;
      let hi = x;
      let ylo = elozoY;
      for (let k = 0; k < 60; k++) {
        const kz = (lo + hi) / 2;
        const yk = fn(kz);
        if (!Number.isFinite(yk)) break;
        if (ylo * yk <= 0) hi = kz;
        else {
          lo = kz;
          ylo = yk;
        }
      }
      const g = (lo + hi) / 2;
      if (ki.length === 0 || Math.abs(g - ki[ki.length - 1]) > (b - a) * 0.004) ki.push(g);
    }
    elozoX = x;
    elozoY = y;
  }
  return ki;
}

/** Ésszerű y-tartomány mintavételből (a szélső 4 %-ot elhagyjuk). */
function yTartomany(fnek, a, b) {
  const v = [];
  for (const fn of fnek) {
    for (let i = 0; i <= 300; i++) {
      const y = fn(a + ((b - a) * i) / 300);
      if (Number.isFinite(y)) v.push(y);
    }
  }
  if (v.length === 0) return [-5, 5];
  v.sort((p, q) => p - q);
  let lo = v[Math.floor(v.length * 0.04)];
  let hi = v[Math.ceil(v.length * 0.96) - 1];
  if (!(hi > lo)) {
    lo -= 1;
    hi += 1;
  }
  const pad = (hi - lo) * 0.15;
  return [Math.min(lo - pad, 0), Math.max(hi + pad, 0)];
}

const szamma = (s) => Number(String(s).replace(",", ".").trim());

/* ================= a szűk szimbolikus tábla ================= */

const ALAP = {
  sqrt: (u) => `\\dfrac{1}{2\\sqrt{${u}}}`,
  ln: (u) => `\\dfrac{1}{${u}}`,
  lg: (u) => `\\dfrac{1}{(${u})\\ln 10}`,
  exp: (u) => `e^{${u}}`,
  sin: (u) => `\\cos\\left(${u}\\right)`,
  cos: (u) => `-\\sin\\left(${u}\\right)`,
  tg: (u) => `\\dfrac{1}{\\cos^2\\left(${u}\\right)}`,
  ctg: (u) => `-\\dfrac{1}{\\sin^2\\left(${u}\\right)}`,
  arctg: (u) => `\\dfrac{1}{1+\\left(${u}\\right)^2}`,
  arcsin: (u) => `\\dfrac{1}{\\sqrt{1-\\left(${u}\\right)^2}}`,
  arccos: (u) => `-\\dfrac{1}{\\sqrt{1-\\left(${u}\\right)^2}}`,
  sh: (u) => `\\operatorname{ch}\\left(${u}\\right)`,
  ch: (u) => `\\operatorname{sh}\\left(${u}\\right)`,
  th: (u) => `\\dfrac{1}{\\operatorname{ch}^2\\left(${u}\\right)}`,
};

const NEV = {
  sqrt: "\\sqrt",
  ln: "\\ln",
  lg: "\\lg",
  exp: "\\exp",
  sin: "\\sin",
  cos: "\\cos",
  tg: "\\operatorname{tg}",
  ctg: "\\operatorname{ctg}",
  arctg: "\\operatorname{arctg}",
  arcsin: "\\arcsin",
  arccos: "\\arccos",
  sh: "\\operatorname{sh}",
  ch: "\\operatorname{ch}",
  th: "\\operatorname{th}",
};

/** Rövid számalak: legfeljebb 4 tizedes, a fölösleges nullák nélkül (3,0000 → 3). */
function szep(ertek) {
  const t = sz(ertek, 4).replace(/,?0+$/, "");
  return t === "" || t === "-" ? "0" : t;
}
const szepK = (ertek) => szep(ertek).replace(",", "{,}");

const egyutt = (a) => (Math.abs(a - 1) < 1e-12 ? "" : Math.abs(a + 1) < 1e-12 ? "-" : szepK(a));

/**
 * Szimbolikus derivált a szűk családra: a·xⁿ, a/x, a·√x és a·g(bx+c).
 * Ha nem ismeri fel a mintát, null-t ad — ilyenkor marad a numerikus érték.
 */
export function szimbolikusDerivalt(szoveg) {
  const s = String(szoveg ?? "").replace(/\s/g, "").replace(/,/g, ".").toLowerCase();
  let m;

  // a·x^n
  m = s.match(/^([+-]?[\d.]*)\*?x\^\(?([+-]?[\d.]+)\)?$/);
  if (m) {
    const a = m[1] === "" || m[1] === "+" ? 1 : m[1] === "-" ? -1 : Number(m[1]);
    const n = Number(m[2]);
    if (Number.isFinite(a) && Number.isFinite(n)) {
      const uj = n - 1;
      const hatv = uj === 0 ? "" : uj === 1 ? "x" : `x^{${szepK(uj)}}`;
      return {
        f: `${egyutt(a)}x^{${szepK(n)}}`,
        d: hatv === "" ? szepK(a * n) : `${egyutt(a * n)}${hatv}`,
      };
    }
  }
  // a·x
  m = s.match(/^([+-]?[\d.]*)\*?x$/);
  if (m) {
    const a = m[1] === "" || m[1] === "+" ? 1 : m[1] === "-" ? -1 : Number(m[1]);
    if (Number.isFinite(a)) return { f: `${egyutt(a)}x`, d: szepK(a) };
  }
  // a/x
  m = s.match(/^([+-]?[\d.]*)\/x$/);
  if (m) {
    const a = m[1] === "" || m[1] === "+" ? 1 : m[1] === "-" ? -1 : Number(m[1]);
    if (Number.isFinite(a))
      return { f: `\\dfrac{${szepK(a)}}{x}`, d: `-\\dfrac{${szepK(a)}}{x^2}` };
  }
  // a·g(bx+c)
  m = s.match(/^([+-]?[\d.]*)\*?([a-z]+)\(([^()]*)\)$/);
  if (m && ALAP[m[2]]) {
    const a = m[1] === "" || m[1] === "+" ? 1 : m[1] === "-" ? -1 : Number(m[1]);
    const g = m[2];
    const belso = m[3];
    const bm = belso.match(/^([+-]?[\d.]*)\*?x([+-][\d.]+)?$/);
    if (Number.isFinite(a) && bm) {
      const b = bm[1] === "" || bm[1] === "+" ? 1 : bm[1] === "-" ? -1 : Number(bm[1]);
      const c = bm[2] ? Number(bm[2]) : 0;
      if (Number.isFinite(b)) {
        const u = `${egyutt(b)}x${c === 0 ? "" : c > 0 ? `+${szepK(c)}` : `-${szepK(-c)}`}`;
        const fLatex =
          g === "sqrt" ? `${egyutt(a)}\\sqrt{${u}}` : `${egyutt(a)}${NEV[g]}\\left(${u}\\right)`;
        const szorzo = a * b;
        return {
          f: fLatex,
          d: `${
            Math.abs(szorzo - 1) < 1e-12 ? "" : Math.abs(szorzo + 1) < 1e-12 ? "-" : `${szepK(szorzo)}\\cdot`
          }${ALAP[g](u)}`,
          lanc: Math.abs(b - 1) > 1e-12,
          b,
        };
      }
    }
  }
  return null;
}

/* ================= 1. Deriváló kalkulátor ================= */

const DER_MINTAK = [
  { cimke: "x^3-2*x", x0: "1" },
  { cimke: "sin(3*x)", x0: "0" },
  { cimke: "exp(-2*x)", x0: "0,5" },
  { cimke: "ln(2*x+1)", x0: "1" },
  { cimke: "sqrt(x)", x0: "100" },
  { cimke: "x^2*exp(3*x)", x0: "0,5" },
  { cimke: "(3*x-1)/(x^2+1)", x0: "1" },
  { cimke: "arctg(x)", x0: "1" },
];

export function DerDerivaloKalk() {
  const [szoveg, setSzoveg] = useState("x^3-2*x");
  const [x0Be, setX0Be] = useState("1");

  const ford = useMemo(() => forditKifejezes(szoveg, ["x"]), [szoveg]);
  const x0 = szamma(x0Be);
  const szim = useMemo(() => szimbolikusDerivalt(szoveg), [szoveg]);

  const fn = ford.ok ? ford.fn : null;
  const y0 = fn && Number.isFinite(x0) ? fn(x0) : NaN;
  const m = fn && Number.isFinite(x0) ? derivalt(fn, x0) : NaN;
  const m2 = fn && Number.isFinite(x0) ? derivalt2(fn, x0) : NaN;

  const xMin = Number.isFinite(x0) ? x0 - 3 : -3;
  const xMax = Number.isFinite(x0) ? x0 + 3 : 3;
  const [yMin, yMax] = useMemo(
    () => (fn ? yTartomany([fn], xMin, xMax) : [-5, 5]),
    [fn, xMin, xMax],
  );

  const ervenyes = fn && Number.isFinite(y0) && Number.isFinite(m);

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.25fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          {fn ? (
            <FvRajz
              xMin={xMin}
              xMax={xMax}
              yMin={yMin}
              yMax={yMax}
              gorbek={[
                { fn, szin: TEAL, vastag: 2.8 },
                { fn: (x) => derivalt(fn, x), szin: LILA, vastag: 1.6, szaggatott: true },
              ]}
              egyenesek={ervenyes ? [{ m, b: y0 - m * x0, szin: NAR, vastag: 2.4 }] : []}
              pontok={ervenyes ? [{ x: x0, y: y0, szin: NAR, cimke: "x₀" }] : []}
              className="abra w-full select-none"
            />
          ) : (
            <div className="grid h-64 place-items-center text-[13px] text-rose-600">{ford.hiba}</div>
          )}
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            Teal: f · narancs: az érintő az x₀ helyen · lila szaggatott: a numerikus f ′ görbéje.
          </p>
        </div>

        <div className="p-5">
          <label className="block">
            <span className="mb-1 block text-[12.5px] font-medium text-petrol-600">
              A függvény képlete — a változó x
            </span>
            <input
              type="text"
              value={szoveg}
              onChange={(e) => setSzoveg(e.target.value)}
              className="szamok w-full rounded-lg border border-petrol-200 px-3 py-2 text-[14px] text-petrol-900 outline-none focus:border-petrol-400"
            />
          </label>
          <p className="mt-1 text-[11.5px] text-petrol-400">
            Használható: + − * / ^ ( ), sqrt, ln, lg, exp, sin, cos, tg, ctg, arcsin, arccos, arctg, sh, ch, th, abs,
            pi, e.
          </p>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {DER_MINTAK.map((p) => (
              <button
                key={p.cimke}
                type="button"
                onClick={() => {
                  setSzoveg(p.cimke);
                  setX0Be(p.x0);
                }}
                className="szamok rounded-lg bg-white px-2 py-1 text-[11.5px] font-medium text-petrol-600 ring-1 ring-petrol-200 transition hover:bg-petrol-50"
              >
                {p.cimke}
              </button>
            ))}
          </div>

          <label className="mt-3 block">
            <span className="mb-1 block text-[12.5px] font-medium text-petrol-600">Az érintési hely, x₀</span>
            <input
              type="text"
              inputMode="decimal"
              value={x0Be}
              onChange={(e) => setX0Be(e.target.value)}
              className="szamok w-full rounded-lg border border-petrol-200 px-3 py-2 text-[14px] text-petrol-900 outline-none focus:border-petrol-400"
            />
          </label>

          {!ford.ok && <p className="mt-3 text-[13px] text-rose-600">{ford.hiba}</p>}

          {ervenyes && (
            <>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl border border-petrol-200 bg-white px-2 py-2">
                  <p className="text-[11px] text-petrol-500">f(x₀)</p>
                  <p className="szamok text-[14px] font-semibold text-petrol-900">{sz(y0, 5)}</p>
                </div>
                <div className="rounded-xl border border-naracs-200 bg-naracs-50 px-2 py-2">
                  <p className="text-[11px] text-naracs-700">f ′(x₀)</p>
                  <p className="szamok text-[14px] font-semibold text-naracs-900">{sz(m, 5)}</p>
                </div>
                <div className="rounded-xl border border-violet-200 bg-violet-50 px-2 py-2">
                  <p className="text-[11px] text-violet-700">f ″(x₀)</p>
                  <p className="szamok text-[14px] font-semibold text-violet-900">
                    {Number.isFinite(m2) ? sz(m2, 4) : "–"}
                  </p>
                </div>
              </div>

              <div className="mt-3 rounded-xl bg-petrol-50 p-4">
                <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">
                  Az érintő és a normális
                </p>
                <div className="szamok finom-gorgeto mt-2 space-y-1 overflow-x-auto text-[13px] text-petrol-800">
                  <div>
                    <M>{`y = ${szK(m, 4)}\\,(x ${x0 >= 0 ? "-" : "+"} ${szK(Math.abs(x0), 4)}) ${
                      y0 >= 0 ? "+" : "-"
                    } ${szK(Math.abs(y0), 4)}`}</M>
                  </div>
                  <div>
                    <M>{`y = ${szK(m, 4)}x ${y0 - m * x0 >= 0 ? "+" : "-"} ${szK(Math.abs(y0 - m * x0), 4)}`}</M>
                  </div>
                  {Math.abs(m) > 1e-9 ? (
                    <div>
                      <M>{`\\text{normális: } y = ${szK(-1 / m, 4)}\\,(x ${x0 >= 0 ? "-" : "+"} ${szK(
                        Math.abs(x0),
                        4,
                      )}) ${y0 >= 0 ? "+" : "-"} ${szK(Math.abs(y0), 4)}`}</M>
                    </div>
                  ) : (
                    <p className="text-[12.5px] text-petrol-600">
                      Az érintő vízszintes, a normális függőleges: x = {sz(x0, 4)}.
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-[10.5px] font-bold tracking-[0.16em] text-emerald-700 uppercase">
                  Szimbolikus derivált
                </p>
                {szim ? (
                  <div className="szamok finom-gorgeto mt-2 space-y-1 overflow-x-auto text-[13px] text-petrol-800">
                    <div>
                      <M>{`f(x) = ${szim.f}`}</M>
                    </div>
                    <div>
                      <M>{`f'(x) = ${szim.d}`}</M>
                    </div>
                    {szim.lanc && (
                      <p className="text-[12px] text-emerald-800">
                        A <strong>{szep(szim.b)}</strong> szorzó a láncszabályból jön: ez a belső függvény deriváltja.
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-emerald-900">
                    Ez a képlet kívül esik a kalkulátor szimbolikus tábláján (az <span className="szamok">a·xⁿ</span>,{" "}
                    <span className="szamok">a/x</span> és <span className="szamok">a·g(bx+c)</span> alakokat ismeri
                    fel). A <strong>szám</strong> viszont pontos: a központi differencia hibája itt ~10⁻⁹ körüli. Írd fel
                    a deriváltat kézzel, és hasonlítsd össze a fenti f ′(x₀) értékkel — pontosan erre való ez a doboz.
                  </p>
                )}
              </div>

              <div className="mt-3 rounded-xl border border-petrol-200 bg-white px-4 py-3 text-[12.5px] leading-relaxed text-petrol-600">
                A második derivált előjele: {Number.isFinite(m2) && m2 > 0.0005 ? "pozitív — a görbe itt konvex" : null}
                {Number.isFinite(m2) && m2 < -0.0005 ? "negatív — a görbe itt konkáv" : null}
                {Number.isFinite(m2) && Math.abs(m2) <= 0.0005 ? "gyakorlatilag nulla — inflexió gyanús" : null}
                {!Number.isFinite(m2) ? "nem számolható (értelmezési tartomány széle)" : null}
                {Math.abs(m) < 1e-4 && Number.isFinite(m2) && (
                  <>
                    {" "}
                    · Mivel f ′(x₀) ≈ 0 és f ″(x₀) {m2 > 0 ? "> 0" : "< 0"}, itt lokális{" "}
                    <strong>{m2 > 0 ? "minimum" : "maximum"}</strong> van.
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================= 2. Függvényvizsgáló kalkulátor ================= */

const VIZS_MINTAK = [
  { cimke: "x/(x^2+1)", a: "-5", b: "5" },
  { cimke: "x^3-3*x", a: "-3", b: "3" },
  { cimke: "x*exp(-x)", a: "-1", b: "6" },
  { cimke: "exp(-x^2)", a: "-3", b: "3" },
  { cimke: "x+1/x", a: "0,2", b: "5" },
  { cimke: "x*ln(x)", a: "0,05", b: "3" },
];

export function DerVizsgaloKalk() {
  const [szoveg, setSzoveg] = useState("x/(x^2+1)");
  const [aBe, setABe] = useState("-5");
  const [bBe, setBBe] = useState("5");

  const ford = useMemo(() => forditKifejezes(szoveg, ["x"]), [szoveg]);
  const a = szamma(aBe);
  const b = szamma(bBe);
  const fn = ford.ok ? ford.fn : null;
  const ervenyes = fn && Number.isFinite(a) && Number.isFinite(b) && b > a;

  const d1 = useMemo(() => (fn ? (x) => derivalt(fn, x) : null), [fn]);
  const d2 = useMemo(() => (fn ? (x) => derivalt2(fn, x) : null), [fn]);

  const eredmeny = useMemo(() => {
    if (!ervenyes) return null;
    const zerus = gyokok(fn, a, b);
    const stac = gyokok(d1, a, b);
    const infl = gyokok(d2, a, b);
    const stacAdat = stac.map((x) => {
      const md2 = derivalt2(fn, x);
      const bal = derivalt(fn, x - (b - a) * 0.01);
      const jobb = derivalt(fn, x + (b - a) * 0.01);
      let tipus = "nem dönthető el";
      if (Number.isFinite(md2) && Math.abs(md2) > 1e-4) tipus = md2 < 0 ? "lokális maximum" : "lokális minimum";
      else if (Number.isFinite(bal) && Number.isFinite(jobb)) {
        if (bal > 0 && jobb < 0) tipus = "lokális maximum";
        else if (bal < 0 && jobb > 0) tipus = "lokális minimum";
        else tipus = "nincs szélsőérték (nyeregpont)";
      }
      return { x, y: fn(x), tipus, md2 };
    });
    const inflAdat = infl
      .map((x) => {
        const e = (b - a) * 0.02;
        const bal = derivalt2(fn, x - e);
        const jobb = derivalt2(fn, x + e);
        return { x, y: fn(x), valodi: Number.isFinite(bal) && Number.isFinite(jobb) && bal * jobb < 0 };
      })
      .filter((p) => Number.isFinite(p.y));
    // végpontok és a szélsőérték-jelöltek összehasonlítása
    const jeloltek = [
      { x: a, y: fn(a), mi: "bal végpont" },
      ...stacAdat.map((s) => ({ x: s.x, y: s.y, mi: "stacionárius pont" })),
      { x: b, y: fn(b), mi: "jobb végpont" },
    ].filter((p) => Number.isFinite(p.y));
    const maxP = jeloltek.reduce((p, q) => (q.y > p.y ? q : p), jeloltek[0]);
    const minP = jeloltek.reduce((p, q) => (q.y < p.y ? q : p), jeloltek[0]);
    return { zerus, stacAdat, inflAdat, maxP, minP };
  }, [ervenyes, fn, d1, d2, a, b]);

  const [yMin, yMax] = useMemo(() => (fn && ervenyes ? yTartomany([fn], a, b) : [-5, 5]), [fn, ervenyes, a, b]);
  const [y1Min, y1Max] = useMemo(
    () => (d1 && ervenyes ? yTartomany([d1], a, b) : [-5, 5]),
    [d1, ervenyes, a, b],
  );
  const [y2Min, y2Max] = useMemo(
    () => (d2 && ervenyes ? yTartomany([d2], a, b) : [-5, 5]),
    [d2, ervenyes, a, b],
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.1fr_1fr]">
        <div className="racs-vilagos space-y-1 border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          {ervenyes ? (
            <>
              <FvRajz
                xMin={a}
                xMax={b}
                yMin={yMin}
                yMax={yMax}
                magassag={190}
                gorbek={[{ fn, szin: TEAL, vastag: 2.6 }]}
                pontok={[
                  ...(eredmeny?.stacAdat ?? []).map((s) => ({ x: s.x, y: s.y, szin: NAR, r: 5 })),
                  ...(eredmeny?.inflAdat ?? []).filter((p) => p.valodi).map((p) => ({ x: p.x, y: p.y, szin: LILA, r: 4.5 })),
                ]}
                className="abra w-full select-none"
              />
              <p className="text-[10.5px] font-bold tracking-[0.14em] uppercase" style={{ color: NAR }}>
                f ′
              </p>
              <FvRajz
                xMin={a}
                xMax={b}
                yMin={y1Min}
                yMax={y1Max}
                magassag={140}
                gorbek={[{ fn: d1, szin: NAR, vastag: 2.2 }]}
                vizszintes={[{ y: 0, szin: "#94a3b8" }]}
                className="abra w-full select-none"
              />
              <p className="text-[10.5px] font-bold tracking-[0.14em] uppercase" style={{ color: LILA }}>
                f ″
              </p>
              <FvRajz
                xMin={a}
                xMax={b}
                yMin={y2Min}
                yMax={y2Max}
                magassag={140}
                gorbek={[{ fn: d2, szin: LILA, vastag: 2.2 }]}
                vizszintes={[{ y: 0, szin: "#94a3b8" }]}
                className="abra w-full select-none"
              />
            </>
          ) : (
            <div className="grid h-64 place-items-center px-4 text-center text-[13px] text-rose-600">
              {ford.ok ? "Add meg helyesen az intervallumot (a < b)." : ford.hiba}
            </div>
          )}
        </div>

        <div className="p-5">
          <label className="block">
            <span className="mb-1 block text-[12.5px] font-medium text-petrol-600">A vizsgált függvény</span>
            <input
              type="text"
              value={szoveg}
              onChange={(e) => setSzoveg(e.target.value)}
              className="szamok w-full rounded-lg border border-petrol-200 px-3 py-2 text-[14px] text-petrol-900 outline-none focus:border-petrol-400"
            />
          </label>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {VIZS_MINTAK.map((p) => (
              <button
                key={p.cimke}
                type="button"
                onClick={() => {
                  setSzoveg(p.cimke);
                  setABe(p.a);
                  setBBe(p.b);
                }}
                className="szamok rounded-lg bg-white px-2 py-1 text-[11.5px] font-medium text-petrol-600 ring-1 ring-petrol-200 transition hover:bg-petrol-50"
              >
                {p.cimke}
              </button>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <label className="block">
              <span className="mb-1 block text-[12.5px] font-medium text-petrol-600">a</span>
              <input
                type="text"
                inputMode="decimal"
                value={aBe}
                onChange={(e) => setABe(e.target.value)}
                className="szamok w-full rounded-lg border border-petrol-200 px-3 py-2 text-[14px] text-petrol-900 outline-none focus:border-petrol-400"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-[12.5px] font-medium text-petrol-600">b</span>
              <input
                type="text"
                inputMode="decimal"
                value={bBe}
                onChange={(e) => setBBe(e.target.value)}
                className="szamok w-full rounded-lg border border-petrol-200 px-3 py-2 text-[14px] text-petrol-900 outline-none focus:border-petrol-400"
              />
            </label>
          </div>

          {eredmeny && (
            <div className="mt-4 space-y-3 text-[13px]">
              <div className="rounded-xl border border-petrol-200 bg-petrol-50 px-4 py-3">
                <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">Zérushelyek</p>
                <p className="szamok mt-1 text-petrol-900">
                  {eredmeny.zerus.length ? eredmeny.zerus.map((z) => sz(z, 4)).join(" · ") : "nincs az intervallumban"}
                </p>
              </div>

              <div className="rounded-xl border border-naracs-200 bg-naracs-50 px-4 py-3">
                <p className="text-[10.5px] font-bold tracking-[0.16em] text-naracs-700 uppercase">
                  Stacionárius pontok (f ′ = 0)
                </p>
                {eredmeny.stacAdat.length === 0 ? (
                  <p className="mt-1 text-naracs-900">nincs az intervallumban</p>
                ) : (
                  eredmeny.stacAdat.map((s) => (
                    <p key={s.x} className="szamok mt-1 text-naracs-900">
                      x = {sz(s.x, 4)}, f(x) = {sz(s.y, 4)} — <strong>{s.tipus}</strong>
                      {Number.isFinite(s.md2) ? ` (f″ = ${sz(s.md2, 3)})` : ""}
                    </p>
                  ))
                )}
              </div>

              <div className="rounded-xl border border-violet-200 bg-violet-50 px-4 py-3">
                <p className="text-[10.5px] font-bold tracking-[0.16em] text-violet-700 uppercase">
                  Inflexiós pontok (f ″ előjelváltás)
                </p>
                {eredmeny.inflAdat.length === 0 ? (
                  <p className="mt-1 text-violet-900">nincs az intervallumban</p>
                ) : (
                  eredmeny.inflAdat.map((p) => (
                    <p key={p.x} className="szamok mt-1 text-violet-900">
                      x = {sz(p.x, 4)}, f(x) = {sz(p.y, 4)}
                      {p.valodi ? "" : " — itt f″ = 0, de nincs előjelváltás: nem inflexió!"}
                    </p>
                  ))
                )}
              </div>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                <p className="text-[10.5px] font-bold tracking-[0.16em] text-emerald-700 uppercase">
                  Globális szélsőérték az [a; b]-n
                </p>
                <p className="szamok mt-1 text-emerald-900">
                  Legnagyobb: {sz(eredmeny.maxP.y, 4)} az x = {sz(eredmeny.maxP.x, 4)} helyen ({eredmeny.maxP.mi})
                </p>
                <p className="szamok mt-1 text-emerald-900">
                  Legkisebb: {sz(eredmeny.minP.y, 4)} az x = {sz(eredmeny.minP.x, 4)} helyen ({eredmeny.minP.mi})
                </p>
              </div>
            </div>
          )}

          <p className="mt-3 text-[12px] leading-relaxed text-petrol-400">
            A derivált itt <strong>numerikus</strong> (központi differencia), a zérushelyek előjelváltás-kereséssel
            adódnak. Szakadásnál (pl. 1/x a 0-ban) a módszer előjelváltást „lát”, pedig ott nincs gyök — ezért mindig
            nézd meg a grafikont is.
          </p>
        </div>
      </div>
    </div>
  );
}
