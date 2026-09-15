"use client";

import { useMemo, useState } from "react";
import FvRajz from "./FvRajz";
import { forditKifejezes } from "./SorKifejezes";
import { M } from "@/components/ui/Keplet";
import { sz, szK } from "@/lib/szamok";
import {
  maximumAbszolut,
  masodikDerivalt,
  negyedikDerivalt,
  osztopontok,
  pontosIntegral,
  simpson,
  skalazottIntegral,
  simpsonAdatokbol,
  simpsonSuly,
  trapez,
  trapezAdatokbol,
  trapezSuly,
} from "./ImNumerika";

const TEAL = "#0f766e";
const NAR = "#e2590a";

const szamma = (s) => Number(String(s).replace(",", ".").trim());

/**
 * Melyik végponton robban fel az integrandus? Nem elég azt nézni, hogy véges-e
 * az érték (az 1/√x a 0 közelében is véges számot ad), a két végpont
 * nagyságrendjét kell összevetni.
 */
function balVegponton(fn, a, b) {
  const d = (b - a) * 1e-9;
  const bal = Math.abs(fn(a + d));
  const jobb = Math.abs(fn(b - d));
  if (!Number.isFinite(bal)) return true;
  if (!Number.isFinite(jobb)) return false;
  return bal >= jobb;
}

function Mezo({ cimke, ertek, onChange, szeles = false }) {
  return (
    <label className={`block ${szeles ? "sm:col-span-2" : ""}`}>
      <span className="mb-1 block text-[12px] font-medium text-petrol-600">{cimke}</span>
      <input
        type="text"
        inputMode="decimal"
        value={ertek}
        onChange={(ev) => onChange(ev.target.value)}
        className="szamok w-full rounded-lg border border-petrol-200 bg-white px-3 py-2 text-[14px] text-petrol-900 outline-none focus:border-petrol-400"
      />
    </label>
  );
}

/* ================================================================
   1. Improprius integrál — numerikus vizsgálat
   ================================================================ */

const TIPUSOK = [
  { id: "felso", nev: "∫ₐ^∞", leiras: "felül végtelen" },
  { id: "also", nev: "∫_{−∞}^b", leiras: "alul végtelen" },
  { id: "ketto", nev: "∫_{−∞}^{∞}", leiras: "mindkét irányban" },
  { id: "szingularis", nev: "∫ₐᵇ szinguláris", leiras: "nem korlátos integrandus" },
];

export function ImImpropriusKalk() {
  const [szoveg, setSzoveg] = useState("exp(-x)");
  const [tipus, setTipus] = useState("felso");
  const [aSzoveg, setASzoveg] = useState("0");
  const [bSzoveg, setBSzoveg] = useState("1");

  const forditas = useMemo(() => forditKifejezes(szoveg, ["x"]), [szoveg]);
  const fn = forditas.ok ? forditas.fn : null;
  const a = szamma(aSzoveg);
  const b = szamma(bSzoveg);

  const eredmeny = useMemo(() => {
    if (!fn) return null;
    const sorok = [];
    if (tipus === "felso" || tipus === "also" || tipus === "ketto") {
      for (let k = 1; k <= 6; k++) {
        const D = Math.pow(10, k);
        let ertek;
        if (tipus === "felso") {
          ertek = Number.isFinite(a) ? skalazottIntegral(fn, a, a + D, 1) : NaN;
        } else if (tipus === "also") {
          // t = b − x helyettesítéssel a nehéz vég a 0-ba kerül
          ertek = Number.isFinite(b) ? skalazottIntegral((t) => fn(b - t), 0, D, 1) : NaN;
        } else {
          ertek = skalazottIntegral(fn, 0, D, 1) + skalazottIntegral((t) => fn(-t), 0, D, 1);
        }
        sorok.push({ cimke: `d = 10^${k}`, ertek });
      }
    } else {
      // szinguláris végpont: megkeressük, melyik végpontban nem értelmes
      const balRossz = balVegponton(fn, a, b);
      for (let k = 1; k <= 6; k++) {
        const eps = Math.pow(10, -k);
        const ertek = balRossz
          ? skalazottIntegral(fn, a + eps, b, eps)
          : skalazottIntegral((t) => fn(b - t), eps, b - a, eps);
        sorok.push({ cimke: `ε = 10⁻${k}`, ertek });
      }
    }
    return sorok;
  }, [fn, tipus, a, b]);

  /** A domináns tag kitevőjének becslése: f ~ C/x^p (illetve C/(x−a)^p). */
  const pBecsles = useMemo(() => {
    if (!fn) return null;
    if (tipus === "szingularis") {
      const balRossz = balVegponton(fn, a, b);
      const alap = balRossz ? a : b;
      const jel = balRossz ? 1 : -1;
      const e1 = 1e-4;
      const e2 = 1e-5;
      const y1 = Math.abs(fn(alap + jel * e1));
      const y2 = Math.abs(fn(alap + jel * e2));
      if (!Number.isFinite(y1) || !Number.isFinite(y2) || y1 <= 0 || y2 <= 0) return null;
      return { p: Math.log(y2 / y1) / Math.log(e1 / e2), hol: "nulla" };
    }
    const x1 = 20;
    const x2 = 60;
    const y1 = Math.abs(fn(tipus === "also" ? -x1 : x1));
    const y2 = Math.abs(fn(tipus === "also" ? -x2 : x2));
    if (!Number.isFinite(y1) || !Number.isFinite(y2) || y1 <= 0) return null;
    // y2 = 0 (alulcsordulás): a fogyás gyorsabb minden hatványnál
    if (y2 <= 0) return { p: Infinity, hol: "vegtelen" };
    return { p: Math.log(y1 / y2) / Math.log(x2 / x1), hol: "vegtelen" };
  }, [fn, tipus, a, b]);

  // vegyes eset: a véges végponton is felrobban az integrandus
  const vegyes = useMemo(() => {
    if (!fn) return false;
    if (tipus === "felso") return Number.isFinite(a) && !Number.isFinite(fn(a));
    if (tipus === "also") return Number.isFinite(b) && !Number.isFinite(fn(b));
    return false;
  }, [fn, tipus, a, b]);

  const utolso = eredmeny ? eredmeny[eredmeny.length - 1].ertek : NaN;
  const elozo = eredmeny ? eredmeny[eredmeny.length - 2].ertek : NaN;
  const beall =
    Number.isFinite(utolso) && Number.isFinite(elozo) && Math.abs(utolso - elozo) < Math.max(1e-3, Math.abs(utolso) * 5e-3);

  const [gx0, gx1] =
    tipus === "szingularis"
      ? [Number.isFinite(a) ? a - (b - a) * 0.1 : 0, Number.isFinite(b) ? b + (b - a) * 0.1 : 1]
      : tipus === "also"
        ? [Number.isFinite(b) ? b - 10 : -10, Number.isFinite(b) ? b + 1 : 1]
        : tipus === "ketto"
          ? [-6, 6]
          : [Number.isFinite(a) ? a - 0.5 : 0, Number.isFinite(a) ? a + 9.5 : 10];

  const yTartomany = useMemo(() => {
    if (!fn) return [0, 1];
    const v = [];
    for (let i = 0; i <= 300; i++) {
      const y = fn(gx0 + ((gx1 - gx0) * i) / 300);
      if (Number.isFinite(y)) v.push(y);
    }
    if (v.length === 0) return [0, 1];
    v.sort((p, q) => p - q);
    const lo = Math.min(0, v[Math.floor(v.length * 0.04)]);
    const hi = Math.max(0, v[Math.ceil(v.length * 0.96) - 1]);
    const pad = Math.max(0.2, (hi - lo) * 0.18);
    return [lo - pad, hi + pad];
  }, [fn, gx0, gx1]);

  const satirTol = tipus === "szingularis" ? a : tipus === "also" ? gx0 : tipus === "ketto" ? gx0 : a;
  const satirIg = tipus === "szingularis" ? b : tipus === "also" ? b : tipus === "ketto" ? gx1 : gx1;

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.25fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          {fn ? (
            <FvRajz
              xMin={gx0}
              xMax={gx1}
              yMin={yTartomany[0]}
              yMax={yTartomany[1]}
              magassag={330}
              gorbek={[{ fn, szin: TEAL, vastag: 2.6 }]}
            >
              {(S) => {
                const tol = Math.max(gx0, satirTol);
                const ig = Math.min(gx1, satirIg);
                if (!(ig > tol)) return null;
                let d = `M${S.px(tol).toFixed(1)},${S.py(0).toFixed(1)} `;
                for (let i = 0; i <= 240; i++) {
                  const x = tol + ((ig - tol) * i) / 240;
                  const y = fn(x);
                  if (!Number.isFinite(y)) continue;
                  const yk = Math.max(yTartomany[0], Math.min(yTartomany[1], y));
                  d += `L${S.px(x).toFixed(1)},${S.py(yk).toFixed(1)} `;
                }
                d += `L${S.px(ig).toFixed(1)},${S.py(0).toFixed(1)} Z`;
                return <path d={d} fill={TEAL} fillOpacity="0.17" clipPath="url(#fv-vago)" />;
              }}
            </FvRajz>
          ) : (
            <div className="grid h-[330px] place-items-center px-6 text-center text-[13px] text-rose-600">
              {forditas.hiba}
            </div>
          )}
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            A satírozott rész a képen látható darab. A konvergenciát nem a kép, hanem a jobb oldali számsor dönti el.
          </p>
        </div>

        <div className="p-5">
          <Mezo cimke="Az integrandus f(x) =" ertek={szoveg} onChange={setSzoveg} szeles />
          <p className="mt-1 text-[11.5px] text-petrol-400">
            Használható: sqrt, ln, exp, sin, cos, tg, arctg, abs, pi, e, ^ hatvány.
          </p>

          <p className="mt-3 text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">Típus</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {TIPUSOK.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setTipus(t.id);
                  if (t.id === "szingularis") {
                    setSzoveg("1/sqrt(x)");
                    setASzoveg("0");
                    setBSzoveg("1");
                  }
                }}
                className={`szamok rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition ${
                  tipus === t.id ? "bg-petrol-700 text-white" : "bg-white text-petrol-600 ring-1 ring-petrol-200 hover:bg-petrol-50"
                }`}
              >
                {t.nev}
              </button>
            ))}
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {(tipus === "felso" || tipus === "szingularis") && (
              <Mezo cimke="Alsó határ, a" ertek={aSzoveg} onChange={setASzoveg} />
            )}
            {(tipus === "also" || tipus === "szingularis") && (
              <Mezo cimke="Felső határ, b" ertek={bSzoveg} onChange={setBSzoveg} />
            )}
          </div>

          {eredmeny && (
            <div className="mt-4 overflow-hidden rounded-xl border border-petrol-100">
              <table className="szamok w-full text-[12.5px]">
                <thead className="bg-petrol-50 text-petrol-500">
                  <tr>
                    <th className="px-3 py-1.5 text-left font-semibold">csonkolás</th>
                    <th className="px-3 py-1.5 text-right font-semibold">a részintegrál</th>
                  </tr>
                </thead>
                <tbody className="text-petrol-800">
                  {eredmeny.map((s) => (
                    <tr key={s.cimke} className="border-t border-petrol-100">
                      <td className="px-3 py-1">{s.cimke}</td>
                      <td className="px-3 py-1 text-right">
                        {Number.isFinite(s.ertek) ? (Math.abs(s.ertek) > 1e6 ? s.ertek.toExponential(3).replace(".", ",") : sz(s.ertek, 5)) : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {vegyes && (
            <div className="mt-3 rounded-xl border border-naracs-300 bg-naracs-50 px-4 py-3 text-[13px] text-petrol-800">
              <p className="text-[11px] font-bold tracking-[0.14em] text-naracs-800 uppercase">Vegyes eset!</p>
              <p className="mt-1">
                A véges végponton az integrandus <strong>nem értelmes</strong> — ez egyszerre I. és II. típusú
                feladat. Vágd szét két részre (például az 1-nél), és mindkettőt kezeld külön; a lenti számsor csak a
                végtelen felőli részről mond valamit.
              </p>
            </div>
          )}

          <div
            className={`mt-3 rounded-xl border px-4 py-3 ${
              beall ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"
            }`}
          >
            <p className={`text-[11px] font-bold tracking-[0.14em] uppercase ${beall ? "text-emerald-700" : "text-rose-700"}`}>
              {beall ? "A számsor beáll — valószínűleg konvergens" : "A számsor nem áll be — valószínűleg divergens"}
            </p>
            {beall && Number.isFinite(utolso) && (
              <p className="szamok mt-1 text-[15px] font-semibold text-petrol-900">≈ {sz(utolso, 5)}</p>
            )}
            <p className="mt-1 text-[12.5px] text-petrol-700">
              Ez csak <strong>gyanú</strong>, nem bizonyítás: a numerikus érték egy divergens integrálnál is mindig
              kiszámolódik, csak épp lassan nő. A döntést a p-kritériummal vagy egy összehasonlító kritériummal kell
              alátámasztani.
            </p>
          </div>

          {pBecsles && !Number.isNaN(pBecsles.p) && (
            <div className="mt-3 rounded-xl bg-petrol-50 px-4 py-3 text-[13px] text-petrol-800">
              <p className="text-[11px] font-bold tracking-[0.14em] text-petrol-500 uppercase">A domináns tag</p>
              {pBecsles.p > 12 ? (
                <p className="mt-1">
                  Az integrandus gyorsabban fogy minden <M>{"1/x^p"}</M> alaknál (exponenciális lecsengés) — a
                  végtelenben ez mindig konvergenciát ad.
                </p>
              ) : (
                <>
                  <p className="mt-1">
                    A viselkedés <M>{`\\sim \\dfrac{C}{${pBecsles.hol === "nulla" ? "(x-a)" : "x"}^{p}}`}</M>, a
                    numerikusan becsült kitevő <span className="szamok font-semibold">p ≈ {sz(pBecsles.p, 2)}</span>.
                  </p>
                  <p className="mt-1">
                    {pBecsles.hol === "nulla"
                      ? pBecsles.p < 1
                        ? "A nullában p < 1, tehát a p-kritérium konvergenciát mond."
                        : "A nullában p ≥ 1, tehát a p-kritérium divergenciát mond."
                      : pBecsles.p > 1
                        ? "A végtelenben p > 1, tehát a p-kritérium konvergenciát mond."
                        : "A végtelenben p ≤ 1, tehát a p-kritérium divergenciát mond."}
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   2. Numerikus integrálás — trapéz és Simpson
   ================================================================ */

function adatokatOlvas(szoveg) {
  const xs = [];
  const ys = [];
  String(szoveg)
    .split(/[\n;]+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .forEach((sor) => {
      const reszek = sor.split(/[\s,\t]+/).filter(Boolean);
      if (reszek.length < 2) return;
      const x = Number(reszek[0].replace(",", "."));
      const y = Number(reszek[1].replace(",", "."));
      if (Number.isFinite(x) && Number.isFinite(y)) {
        xs.push(x);
        ys.push(y);
      }
    });
  return { xs, ys };
}

export function ImNumerikusKalk() {
  const [mod, setMod] = useState("keplet");
  const [szoveg, setSzoveg] = useState("1/x");
  const [aSzoveg, setASzoveg] = useState("1");
  const [bSzoveg, setBSzoveg] = useState("2");
  const [nSzoveg, setNSzoveg] = useState("4");
  const [adatSzoveg, setAdatSzoveg] = useState("0 0\n0,5 1,2\n1 2,1\n1,5 2,6\n2 2,4\n2,5 1,5\n3 0");

  const forditas = useMemo(() => forditKifejezes(szoveg, ["x"]), [szoveg]);
  const fn = forditas.ok ? forditas.fn : null;
  const a = szamma(aSzoveg);
  const b = szamma(bSzoveg);
  const nNyers = Math.round(szamma(nSzoveg));
  const n = Number.isFinite(nNyers) && nNyers >= 1 ? Math.min(60, nNyers) : 4;

  const adatok = useMemo(() => adatokatOlvas(adatSzoveg), [adatSzoveg]);
  const egyenletes =
    adatok.xs.length > 2 &&
    adatok.xs.every((x, i) => i === 0 || Math.abs(x - adatok.xs[i - 1] - (adatok.xs[1] - adatok.xs[0])) < 1e-9);

  const kepletMod = mod === "keplet";
  const ervenyes = kepletMod ? fn && Number.isFinite(a) && Number.isFinite(b) && b > a : adatok.xs.length > 1;

  const xs = kepletMod && ervenyes ? osztopontok(a, b, n) : adatok.xs;
  const ys = kepletMod && ervenyes ? xs.map(fn) : adatok.ys;
  const nHasznalt = xs.length - 1;
  const h = ervenyes ? (xs[nHasznalt] - xs[0]) / nHasznalt : 0;

  const T = ervenyes ? (kepletMod ? trapez(fn, a, b, n) : trapezAdatokbol(xs, ys)) : NaN;
  const S = ervenyes
    ? kepletMod
      ? n % 2 === 0
        ? simpson(fn, a, b, n)
        : NaN
      : egyenletes && nHasznalt % 2 === 0
        ? simpsonAdatokbol(xs, ys)
        : NaN
    : NaN;
  const pontos = kepletMod && ervenyes ? pontosIntegral(fn, a, b, 4000) : NaN;

  const M2 = kepletMod && ervenyes ? maximumAbszolut((x) => masodikDerivalt(fn, x), a, b, 200) : NaN;
  const M4 = kepletMod && ervenyes ? maximumAbszolut((x) => negyedikDerivalt(fn, x), a, b, 120) : NaN;
  const hibaT = Number.isFinite(M2) ? ((b - a) * h * h * M2) / 12 : NaN;
  const hibaS = Number.isFinite(M4) ? ((b - a) * Math.pow(h, 4) * M4) / 180 : NaN;

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.25fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          {ervenyes ? (
            <FvRajz
              xMin={xs[0] - (xs[nHasznalt] - xs[0]) * 0.08}
              xMax={xs[nHasznalt] + (xs[nHasznalt] - xs[0]) * 0.08}
              yMin={Math.min(0, ...ys) - 0.15 * (Math.max(...ys) - Math.min(0, ...ys) || 1)}
              yMax={Math.max(...ys) + 0.2 * (Math.max(...ys) - Math.min(0, ...ys) || 1)}
              magassag={330}
              gorbek={kepletMod ? [{ fn, szin: TEAL, vastag: 2.6 }] : []}
            >
              {(Sk) => (
                <g clipPath="url(#fv-vago)">
                  {xs.slice(0, -1).map((x, k) => (
                    <polygon
                      key={k}
                      points={[
                        [Sk.px(x), Sk.py(0)],
                        [Sk.px(x), Sk.py(ys[k])],
                        [Sk.px(xs[k + 1]), Sk.py(ys[k + 1])],
                        [Sk.px(xs[k + 1]), Sk.py(0)],
                      ]
                        .map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`)
                        .join(" ")}
                      fill={NAR}
                      fillOpacity="0.13"
                      stroke={NAR}
                      strokeWidth="1.3"
                    />
                  ))}
                  {xs.map((x, k) => (
                    <circle key={`p${k}`} cx={Sk.px(x)} cy={Sk.py(ys[k])} r="3.4" fill={TEAL} stroke="white" strokeWidth="1.2" />
                  ))}
                </g>
              )}
            </FvRajz>
          ) : (
            <div className="grid h-[330px] place-items-center px-6 text-center text-[13px] text-rose-600">
              {kepletMod ? (forditas.ok ? "Adj meg érvényes a < b határokat." : forditas.hiba) : "Adj meg legalább két (x; y) párt."}
            </div>
          )}
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            A narancs trapézok a trapézszabály közelítését mutatják; a Simpson-parabolák ránézésre egybeesnének a görbével.
          </p>
        </div>

        <div className="p-5">
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: "keplet", nev: "Képletből" },
              { id: "adat", nev: "Mért pontokból" },
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMod(m.id)}
                className={`rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition ${
                  mod === m.id ? "bg-petrol-700 text-white" : "bg-white text-petrol-600 ring-1 ring-petrol-200 hover:bg-petrol-50"
                }`}
              >
                {m.nev}
              </button>
            ))}
          </div>

          {kepletMod ? (
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Mezo cimke="f(x) =" ertek={szoveg} onChange={setSzoveg} szeles />
              <Mezo cimke="a" ertek={aSzoveg} onChange={setASzoveg} />
              <Mezo cimke="b" ertek={bSzoveg} onChange={setBSzoveg} />
              <Mezo cimke="n (részintervallum)" ertek={nSzoveg} onChange={setNSzoveg} />
            </div>
          ) : (
            <label className="mt-3 block">
              <span className="mb-1 block text-[12px] font-medium text-petrol-600">
                Mért pontok soronként: x y (vesszős tizedes is jó)
              </span>
              <textarea
                rows={7}
                value={adatSzoveg}
                onChange={(ev) => setAdatSzoveg(ev.target.value)}
                className="szamok w-full rounded-lg border border-petrol-200 bg-white px-3 py-2 text-[13px] text-petrol-900 outline-none focus:border-petrol-400"
              />
            </label>
          )}

          {ervenyes && (
            <>
              <div className="szamok mt-3 rounded-xl bg-petrol-50 px-4 py-2 text-[13px] text-petrol-700">
                n = {nHasznalt} · h = {sz(h, 5)} · osztópontok: {nHasznalt + 1}
              </div>

              <div className="mt-3 overflow-hidden rounded-xl border border-petrol-100">
                <table className="szamok w-full text-[12px]">
                  <thead className="bg-petrol-50 text-petrol-500">
                    <tr>
                      <th className="px-2 py-1.5 text-left font-semibold">i</th>
                      <th className="px-2 py-1.5 text-right font-semibold">xᵢ</th>
                      <th className="px-2 py-1.5 text-right font-semibold">yᵢ</th>
                      <th className="px-2 py-1.5 text-right font-semibold">trap.</th>
                      <th className="px-2 py-1.5 text-right font-semibold">Simp.</th>
                    </tr>
                  </thead>
                  <tbody className="text-petrol-800">
                    {xs.slice(0, 22).map((x, i) => (
                      <tr key={i} className="border-t border-petrol-100">
                        <td className="px-2 py-0.5">{i}</td>
                        <td className="px-2 py-0.5 text-right">{sz(x, 4)}</td>
                        <td className="px-2 py-0.5 text-right">{sz(ys[i], 6)}</td>
                        <td className="px-2 py-0.5 text-right text-naracs-700">{trapezSuly(i, nHasznalt)}</td>
                        <td className="px-2 py-0.5 text-right text-violet-700">
                          {nHasznalt % 2 === 0 ? simpsonSuly(i, nHasznalt) : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {xs.length > 22 && (
                  <p className="bg-petrol-50 px-2 py-1 text-[11.5px] text-petrol-500">… {xs.length - 22} további sor</p>
                )}
              </div>

              <div className="mt-3 space-y-2">
                <div className="rounded-xl border border-naracs-200 bg-naracs-50 px-4 py-2.5">
                  <p className="text-[11px] font-bold tracking-[0.14em] text-naracs-700 uppercase">Trapézszabály</p>
                  <p className="szamok text-[17px] font-semibold text-petrol-900">{sz(T, 6)}</p>
                  {Number.isFinite(pontos) && (
                    <p className="szamok text-[12px] text-petrol-600">hiba: {sz(T - pontos, 6)}</p>
                  )}
                </div>
                <div className="rounded-xl border border-violet-200 bg-violet-50 px-4 py-2.5">
                  <p className="text-[11px] font-bold tracking-[0.14em] text-violet-700 uppercase">Simpson-szabály</p>
                  {Number.isFinite(S) ? (
                    <>
                      <p className="szamok text-[17px] font-semibold text-petrol-900">{sz(S, 6)}</p>
                      {Number.isFinite(pontos) && (
                        <p className="szamok text-[12px] text-petrol-600">hiba: {sz(S - pontos, 6)}</p>
                      )}
                    </>
                  ) : (
                    <p className="text-[13px] text-rose-700">
                      {kepletMod || egyenletes
                        ? "Páratlan n — a Simpson-szabály nem alkalmazható."
                        : "Nem egyenletes a lépésköz — a Simpson-szabály nem alkalmazható."}
                    </p>
                  )}
                </div>
                {Number.isFinite(pontos) && (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5">
                    <p className="text-[11px] font-bold tracking-[0.14em] text-emerald-700 uppercase">Pontos érték</p>
                    <p className="szamok text-[17px] font-semibold text-petrol-900">{sz(pontos, 6)}</p>
                    <p className="text-[11.5px] text-petrol-500">nagyon finom Simpson-felosztással számolva</p>
                  </div>
                )}
              </div>

              {kepletMod && Number.isFinite(hibaT) && (
                <div className="mt-3 rounded-xl bg-petrol-50 px-4 py-3 text-[13px] text-petrol-800">
                  <p className="text-[11px] font-bold tracking-[0.14em] text-petrol-500 uppercase">Hibabecslés</p>
                  <div className="szamok mt-1">
                    <M>{`\\left|E_T\\right| \\le \\frac{(b-a)h^2}{12}M_2 = ${szK(hibaT, 6)}\\quad (M_2 \\approx ${szK(M2, 3)})`}</M>
                  </div>
                  {Number.isFinite(hibaS) && (
                    <div className="szamok mt-1">
                      <M>{`\\left|E_S\\right| \\le \\frac{(b-a)h^4}{180}M_4 = ${szK(hibaS, 8)}\\quad (M_4 \\approx ${szK(M4, 3)})`}</M>
                    </div>
                  )}
                  <p className="mt-1 text-[12px] text-petrol-500">
                    A deriváltak maximuma numerikusan becsült, ezért a becslés is közelítő.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
