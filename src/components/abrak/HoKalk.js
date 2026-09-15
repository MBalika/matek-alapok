"use client";

import { useMemo, useState } from "react";
import FvRajz from "./FvRajz";
import { forditKifejezes } from "./SorKifejezes";
import {
  forgasFelszin,
  forgasTerfogat,
  ivhossz,
  simpson,
  sulypont,
  teruletUt,
} from "./HoSzamol";
import { M } from "@/components/ui/Keplet";
import { sz } from "@/lib/szamok";

const TEAL = "#0f766e";
const NAR = "#e2590a";
const LILA = "#7c3aed";
const PIROS = "#dc2626";

const szamma = (s) => Number(String(s).replace(",", ".").trim());

/** Ésszerű y-tartomány az [a;b] szakaszon vett mintavételből. */
function yTartomany(fn, a, b) {
  const v = [];
  for (let i = 0; i <= 300; i++) {
    const y = fn(a + ((b - a) * i) / 300);
    if (Number.isFinite(y)) v.push(y);
  }
  if (v.length === 0) return [-5, 5];
  v.sort((p, q) => p - q);
  let lo = Math.min(0, v[Math.floor(v.length * 0.02)]);
  let hi = Math.max(0, v[Math.ceil(v.length * 0.98) - 1]);
  if (!(hi > lo)) {
    lo -= 1;
    hi += 1;
  }
  const pad = (hi - lo) * 0.15;
  return [lo - pad, hi + pad];
}

/* ================= 1. Határozott integrál kalkulátor ================= */

const INT_MINTAK = [
  { cimke: "sin(x)", a: "0", b: "3,14159265", megj: "∫₀^π sin x = 2 (KF‑2)" },
  { cimke: "1/x", a: "1", b: "2", megj: "∫₁² dx/x = ln 2" },
  { cimke: "x/sqrt(x^2+16)", a: "0", b: "3", megj: "helyettesítéssel 1 (KF‑2)" },
  { cimke: "x*sin(x)", a: "0", b: "3,14159265", megj: "parciálisan π" },
  { cimke: "ln(x)", a: "1", b: "2,71828183", megj: "∫₁^e ln x = 1" },
  { cimke: "x^2-4", a: "-3", b: "3", megj: "előjeles ≠ terület!" },
  { cimke: "exp(-x^2)", a: "0", b: "1", megj: "nem elemi, de számolható" },
];

export function HoIntegralKalk() {
  const [szoveg, setSzoveg] = useState("sin(x)");
  const [aBe, setABe] = useState("0");
  const [bBe, setBBe] = useState("3,14159265");

  const ford = useMemo(() => forditKifejezes(szoveg, ["x"]), [szoveg]);
  const a = szamma(aBe);
  const b = szamma(bBe);
  const ervenyes = ford.ok && Number.isFinite(a) && Number.isFinite(b) && Math.abs(b - a) > 1e-9;

  const fn = ford.ok ? ford.fn : () => NaN;
  const elojeles = ervenyes ? simpson(fn, Math.min(a, b), Math.max(a, b), 4000) * (b < a ? -1 : 1) : NaN;
  const abszolut = ervenyes
    ? simpson((x) => Math.abs(fn(x)), Math.min(a, b), Math.max(a, b), 4000)
    : NaN;
  const atlag = ervenyes ? elojeles / (b - a) : NaN;

  const bal = Math.min(a, b);
  const jobb = Math.max(a, b);
  const szel = jobb - bal;
  const [yMin, yMax] = ervenyes ? yTartomany(fn, bal, jobb) : [-5, 5];

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          {ervenyes ? (
            <FvRajz
              xMin={bal - szel * 0.12}
              xMax={jobb + szel * 0.12}
              yMin={yMin}
              yMax={yMax}
              gorbek={[{ fn, szin: TEAL, vastag: 2.6 }]}
              className="abra w-full select-none"
            >
              {(S) => (
                <g>
                  <path
                    d={teruletUt(S, () => 0, (x) => Math.max(0, fn(x)), bal, jobb)}
                    fill={TEAL}
                    fillOpacity="0.2"
                  />
                  <path
                    d={teruletUt(S, (x) => Math.min(0, fn(x)), () => 0, bal, jobb)}
                    fill={PIROS}
                    fillOpacity="0.22"
                  />
                  <line
                    x1={S.px(bal)}
                    y1={S.margo.fel}
                    x2={S.px(bal)}
                    y2={S.margo.fel + S.h}
                    stroke={NAR}
                    strokeWidth="1.4"
                    strokeDasharray="5 4"
                  />
                  <line
                    x1={S.px(jobb)}
                    y1={S.margo.fel}
                    x2={S.px(jobb)}
                    y2={S.margo.fel + S.h}
                    stroke={NAR}
                    strokeWidth="1.4"
                    strokeDasharray="5 4"
                  />
                  {Number.isFinite(atlag) && atlag > yMin && atlag < yMax && (
                    <line
                      x1={S.px(bal)}
                      y1={S.py(atlag)}
                      x2={S.px(jobb)}
                      y2={S.py(atlag)}
                      stroke={LILA}
                      strokeWidth="2"
                    />
                  )}
                </g>
              )}
            </FvRajz>
          ) : (
            <div className="grid h-64 place-items-center px-4 text-center text-[13px] text-rose-600">
              {ford.ok ? "Add meg a két határt (és ne legyenek egyenlők)." : ford.hiba}
            </div>
          )}
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            Teal: a tengely fölötti (pozitív) rész · piros: a tengely alatti (negatív) rész · lila vonal: az
            átlagérték.
          </p>
        </div>

        <div className="p-5">
          <label className="block">
            <span className="mb-1 block text-[12.5px] font-medium text-petrol-600">
              Az integrandus — a változó x
            </span>
            <input
              type="text"
              value={szoveg}
              onChange={(e) => setSzoveg(e.target.value)}
              className="szamok w-full rounded-lg border border-petrol-200 px-3 py-2 text-[14px] text-petrol-900 outline-none focus:border-petrol-400"
            />
          </label>
          <p className="mt-1 text-[11.5px] text-petrol-400">
            Használható: + − * / ^ ( ), sqrt, ln, lg, exp, sin, cos, tg, ctg, arcsin, arccos, arctg, sh, ch, th,
            abs, pi, e.
          </p>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {INT_MINTAK.map((p) => (
              <button
                key={p.cimke}
                type="button"
                title={p.megj}
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
              <span className="mb-1 block text-[12.5px] font-medium text-petrol-600">Alsó határ, a</span>
              <input
                type="text"
                inputMode="decimal"
                value={aBe}
                onChange={(e) => setABe(e.target.value)}
                className="szamok w-full rounded-lg border border-petrol-200 px-3 py-2 text-[14px] text-petrol-900 outline-none focus:border-petrol-400"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-[12.5px] font-medium text-petrol-600">Felső határ, b</span>
              <input
                type="text"
                inputMode="decimal"
                value={bBe}
                onChange={(e) => setBBe(e.target.value)}
                className="szamok w-full rounded-lg border border-petrol-200 px-3 py-2 text-[14px] text-petrol-900 outline-none focus:border-petrol-400"
              />
            </label>
          </div>

          {ervenyes && (
            <>
              <div className="mt-4 rounded-xl border border-naracs-200 bg-naracs-50 p-4">
                <p className="text-[10.5px] font-bold tracking-[0.16em] text-naracs-700 uppercase">
                  A határozott integrál
                </p>
                <p className="szamok mt-1 text-[22px] font-bold text-naracs-900">{sz(elojeles, 6)}</p>
                <p className="mt-1 text-[12.5px] text-naracs-900">
                  előjeles terület: a tengely fölötti rész mínusz az alatti
                </p>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-center">
                <div className="rounded-xl border border-petrol-200 bg-white px-2 py-2">
                  <p className="text-[11px] text-petrol-500">valódi terület ∫|f|</p>
                  <p className="szamok text-[15px] font-semibold text-petrol-900">{sz(abszolut, 5)}</p>
                </div>
                <div className="rounded-xl border border-violet-200 bg-violet-50 px-2 py-2">
                  <p className="text-[11px] text-violet-700">átlagérték</p>
                  <p className="szamok text-[15px] font-semibold text-violet-900">{sz(atlag, 5)}</p>
                </div>
              </div>

              {Math.abs(abszolut - Math.abs(elojeles)) > 1e-6 * Math.max(1, Math.abs(abszolut)) && (
                <p className="mt-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-[13px] text-rose-900">
                  A függvény <strong>előjelet vált</strong> ezen a szakaszon, ezért az integrál és a terület
                  különbözik. Területhez keresd meg a zérushelyeket, és darabonként integrálj!
                </p>
              )}

              <div className="szamok finom-gorgeto mt-3 overflow-x-auto rounded-xl bg-petrol-50 p-4 text-[13px] text-petrol-800">
                <M>{`\\int_{${sz(a, 4).replace(",", "{,}")}}^{${sz(b, 4).replace(",", "{,}")}} f(x)\\,dx = ${sz(
                  elojeles,
                  6,
                ).replace(",", "{,}")}`}</M>
              </div>

              <p className="mt-3 text-[12.5px] leading-relaxed text-petrol-500">
                A számítás összetett Simpson-formulával megy, 4000 osztással — a modul függvényeire ez 8–10 értékes
                jegyet ad. Ez <em>numerikus</em> érték: a Zh-n a Newton–Leibniz-tétellel kell dolgoznod, ez csak
                ellenőrzésre való.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================= 2. Alkalmazás-kalkulátor ================= */

const ALK_MINTAK = [
  { cimke: "sqrt(x)", a: "0", b: "2", megj: "felszíne 13π/3 (KF‑5)" },
  { cimke: "sqrt(4-x^2)", a: "-2", b: "2", megj: "gömb: V = 32π/3, F = 16π" },
  { cimke: "ch(x)", a: "-1,09861229", b: "1,09861229", megj: "láncgörbe: s = 8/3" },
  { cimke: "sin(x)", a: "0", b: "3,14159265", megj: "súlypont (π/2; π/8)" },
  { cimke: "x", a: "0", b: "1", megj: "kúp: V = π/3, palást √2·π" },
  { cimke: "1/x", a: "1", b: "2", megj: "V = π/2" },
];

export function HoAlkalmazasKalk() {
  const [szoveg, setSzoveg] = useState("sqrt(x)");
  const [aBe, setABe] = useState("0");
  const [bBe, setBBe] = useState("2");

  const ford = useMemo(() => forditKifejezes(szoveg, ["x"]), [szoveg]);
  const a = szamma(aBe);
  const b = szamma(bBe);
  const ervenyes = ford.ok && Number.isFinite(a) && Number.isFinite(b) && b - a > 1e-9;
  const fn = ford.ok ? ford.fn : () => NaN;

  const s = ervenyes ? ivhossz(fn, a, b, 600) : NaN;
  const V = ervenyes ? forgasTerfogat(fn, a, b, 600) : NaN;
  const Fsz = ervenyes ? forgasFelszin(fn, a, b, 600) : NaN;
  const SP = ervenyes ? sulypont(fn, a, b, 600) : null;

  const [yMin, yMax] = ervenyes ? yTartomany(fn, a, b) : [-5, 5];
  const szel = b - a;

  /* kis kép a forgástestről */
  const kx = 470 / (szel || 1);
  const rMax = ervenyes
    ? Math.max(
        ...Array.from({ length: 60 }, (_, k) => Math.abs(fn(a + (szel * k) / 59))).filter((v) =>
          Number.isFinite(v),
        ),
      )
    : 1;
  const ky = Math.min(56 / (rMax || 1), kx * 0.9);
  const cy = 92;
  const px = (x) => 45 + (x - a) * kx;

  const profilUt = (jel) => {
    let d = "";
    for (let k = 0; k <= 90; k++) {
      const x = a + (szel * k) / 90;
      const y = fn(x);
      if (!Number.isFinite(y)) continue;
      d += `${d ? "L" : "M"}${px(x).toFixed(1)},${(cy - jel * y * ky).toFixed(1)} `;
    }
    return d;
  };

  /** A megforgatott test körvonala: felső profil oda, alsó profil vissza. */
  const sziluettUt = () => {
    const fent = [];
    const lent = [];
    for (let k = 0; k <= 90; k++) {
      const x = a + (szel * k) / 90;
      const y = fn(x);
      if (!Number.isFinite(y)) continue;
      fent.push(`${px(x).toFixed(1)},${(cy - y * ky).toFixed(1)}`);
      lent.push(`${px(x).toFixed(1)},${(cy + y * ky).toFixed(1)}`);
    }
    if (fent.length < 2) return "";
    return `M${fent.join(" L")} L${lent.reverse().join(" L")} Z`;
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          {ervenyes ? (
            <>
              <FvRajz
                xMin={a - szel * 0.12}
                xMax={b + szel * 0.12}
                yMin={yMin}
                yMax={yMax}
                magassag={250}
                gorbek={[{ fn, szin: TEAL, vastag: 2.6 }]}
                pontok={SP && Number.isFinite(SP.xs) ? [{ x: SP.xs, y: SP.ys, szin: NAR, cimke: "S", dx: 9, dy: -9 }] : []}
                className="abra w-full select-none"
              >
                {(S) => (
                  <g>
                    <path d={teruletUt(S, () => 0, fn, a, b)} fill={TEAL} fillOpacity="0.16" />
                  </g>
                )}
              </FvRajz>
              <svg viewBox="0 0 560 170" className="abra w-full select-none">
                <line x1={20} y1={cy} x2={540} y2={cy} stroke="#475569" strokeWidth="1.1" strokeDasharray="6 4" />
                <path d={sziluettUt()} fill={LILA} fillOpacity="0.12" stroke="none" />
                <path d={profilUt(1)} fill="none" stroke={TEAL} strokeWidth="2.2" />
                <path d={profilUt(-1)} fill="none" stroke={TEAL} strokeWidth="1.4" opacity="0.55" />
                {[0.25, 0.5, 0.75].map((u, j) => {
                  const x = a + szel * u;
                  const r = Math.abs(fn(x));
                  if (!Number.isFinite(r)) return null;
                  return (
                    <ellipse
                      key={j}
                      cx={px(x)}
                      cy={cy}
                      rx={Math.max(1, r * ky * 0.3)}
                      ry={r * ky}
                      fill="none"
                      stroke={LILA}
                      strokeWidth="1.1"
                    />
                  );
                })}
                <text
                  x={20}
                  y={22}
                  fontSize="12"
                  fontWeight="650"
                  style={{ fill: LILA, paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
                >
                  az x tengely körül megforgatva
                </text>
              </svg>
            </>
          ) : (
            <div className="grid h-64 place-items-center px-4 text-center text-[13px] text-rose-600">
              {ford.ok ? "Az alsó határ legyen kisebb a felsőnél." : ford.hiba}
            </div>
          )}
        </div>

        <div className="p-5">
          <label className="block">
            <span className="mb-1 block text-[12.5px] font-medium text-petrol-600">
              A görbe képlete — a változó x
            </span>
            <input
              type="text"
              value={szoveg}
              onChange={(e) => setSzoveg(e.target.value)}
              className="szamok w-full rounded-lg border border-petrol-200 px-3 py-2 text-[14px] text-petrol-900 outline-none focus:border-petrol-400"
            />
          </label>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {ALK_MINTAK.map((p) => (
              <button
                key={p.cimke}
                type="button"
                title={p.megj}
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

          {ervenyes && SP && (
            <>
              <div className="mt-4 grid grid-cols-2 gap-2 text-center">
                <div className="rounded-xl border border-petrol-200 bg-white px-2 py-2">
                  <p className="text-[11px] text-petrol-500">ívhossz, s</p>
                  <p className="szamok text-[15px] font-semibold text-petrol-900">{sz(s, 4)}</p>
                </div>
                <div className="rounded-xl border border-petrol-200 bg-white px-2 py-2">
                  <p className="text-[11px] text-petrol-500">terület, T</p>
                  <p className="szamok text-[15px] font-semibold text-petrol-900">{sz(SP.T, 4)}</p>
                </div>
                <div className="rounded-xl border border-naracs-200 bg-naracs-50 px-2 py-2">
                  <p className="text-[11px] text-naracs-700">térfogat, V</p>
                  <p className="szamok text-[15px] font-semibold text-naracs-900">{sz(V, 4)}</p>
                </div>
                <div className="rounded-xl border border-violet-200 bg-violet-50 px-2 py-2">
                  <p className="text-[11px] text-violet-700">palást felszíne, F</p>
                  <p className="szamok text-[15px] font-semibold text-violet-900">{sz(Fsz, 4)}</p>
                </div>
              </div>

              <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-[10.5px] font-bold tracking-[0.16em] text-emerald-700 uppercase">
                  A tartomány súlypontja
                </p>
                <p className="szamok mt-1 text-[15px] font-semibold text-emerald-900">
                  S ({sz(SP.xs, 4)}; {sz(SP.ys, 4)})
                </p>
                <p className="szamok mt-1 text-[12.5px] text-emerald-900">
                  Sy = {sz(SP.Sy, 4)} · Sx = {sz(SP.Sx, 4)}
                </p>
                <p className="mt-1 text-[12.5px] text-emerald-900">
                  Pappus-ellenőrzés: 2π·yₛ·T = {sz(2 * Math.PI * SP.ys * SP.T, 4)} — ugyanannyi, mint a
                  térfogat. ✓
                </p>
              </div>

              <div className="szamok finom-gorgeto mt-3 space-y-1.5 overflow-x-auto rounded-xl bg-petrol-50 p-4 text-[12.5px] text-petrol-800">
                <div>
                  <M>{"s=\\int_a^b\\sqrt{1+f'^2}\\,dx"}</M>
                </div>
                <div>
                  <M>{"V=\\pi\\int_a^b f^2dx,\\qquad F=2\\pi\\int_a^b f\\sqrt{1+f'^2}\\,dx"}</M>
                </div>
                <div>
                  <M>{"x_s=\\frac{\\int xf}{\\int f},\\qquad y_s=\\frac{\\frac12\\int f^2}{\\int f}"}</M>
                </div>
              </div>

              <p className="mt-3 text-[12.5px] leading-relaxed text-petrol-500">
                A deriváltat numerikusan (központi differenciával), az integrálokat összetett Gauss-formulával
                számolja, ezért a végpontban „elszálló” érintőnél (félkör!) is pontos marad. A súlypont csak akkor
                értelmes, ha a görbe az egész szakaszon a tengely fölött van.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
