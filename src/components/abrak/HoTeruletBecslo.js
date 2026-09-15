"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import FvRajz from "./FvRajz";
import Konfetti from "@/components/ui/Konfetti";
import { gaussIntegral, teruletUt } from "./HoSzamol";
import { M } from "@/components/ui/Keplet";
import { sz, szK } from "@/lib/szamok";

const TEAL = "#0f766e";
const NAR = "#e2590a";
const LILA = "#7c3aed";

const KOROK = 10;
const REKORD_KULCS = "matek-terulet-rekord";

const valaszt = (t) => t[Math.floor(Math.random() * t.length)];
const egesz = (min, max) => min + Math.floor(Math.random() * (max - min + 1));

/* Minden család ad egy függvényt, egy [a;b] szakaszt és a pontos integrál képletét. */
const CSALADOK = [
  () => {
    const m = valaszt([0.5, 1, 1.5, 2]);
    const b = egesz(0, 2);
    const veg = egesz(2, 4);
    return {
      fn: (x) => m * x + b,
      a: 0,
      b: veg,
      latex: `f(x)=${m === 1 ? "" : szK(m, 1)}x${b ? `+${b}` : ""}`,
      keplet: `\\int_0^{${veg}}\\left(${m === 1 ? "" : szK(m, 1)}x${b ? `+${b}` : ""}\\right)dx = \\left[${szK(
        m / 2,
        2,
      )}x^2${b ? `+${b}x` : ""}\\right]_0^{${veg}}`,
    };
  },
  () => {
    const a = valaszt([0.25, 0.5, 1]);
    const veg = egesz(2, 3);
    return {
      fn: (x) => a * x * x,
      a: 0,
      b: veg,
      latex: `f(x)=${a === 1 ? "" : szK(a, 2)}x^2`,
      keplet: `\\int_0^{${veg}}${a === 1 ? "" : szK(a, 2)}x^2dx = \\left[${szK(a / 3, 4)}x^3\\right]_0^{${veg}}`,
    };
  },
  () => {
    const A = valaszt([1, 1.5, 2]);
    return {
      fn: (x) => A * Math.sin(x),
      a: 0,
      b: Math.PI,
      latex: `f(x)=${A === 1 ? "" : szK(A, 1)}\\sin x`,
      keplet: `\\int_0^{\\pi}${A === 1 ? "" : szK(A, 1)}\\sin x\\,dx = \\left[-${
        A === 1 ? "" : szK(A, 1)
      }\\cos x\\right]_0^{\\pi} = ${szK(2 * A, 1)}`,
    };
  },
  () => {
    const A = valaszt([1, 2]);
    const veg = egesz(2, 4);
    return {
      fn: (x) => (x >= 0 ? A * Math.sqrt(x) : NaN),
      a: 0,
      b: veg,
      latex: `f(x)=${A === 1 ? "" : A}\\sqrt{x}`,
      keplet: `\\int_0^{${veg}}${A === 1 ? "" : A}\\sqrt{x}\\,dx = \\left[\\frac{2${
        A === 1 ? "" : A
      }}{3}x^{3/2}\\right]_0^{${veg}}`,
    };
  },
  () => {
    const c = valaszt([2, 3, 4]);
    const veg = valaszt([1, 1.5, 2]);
    return {
      fn: (x) => c - x * x,
      a: 0,
      b: veg,
      latex: `f(x)=${c}-x^2`,
      keplet: `\\int_0^{${szK(veg, 1)}}\\left(${c}-x^2\\right)dx = \\left[${c}x-\\frac{x^3}{3}\\right]_0^{${szK(
        veg,
        1,
      )}}`,
    };
  },
  () => {
    const A = valaszt([1, 2]);
    const veg = valaszt([1, 1.5, 2]);
    return {
      fn: (x) => A * Math.exp(x / 2),
      a: 0,
      b: veg,
      latex: `f(x)=${A === 1 ? "" : A}e^{x/2}`,
      keplet: `\\int_0^{${szK(veg, 1)}}${A === 1 ? "" : A}e^{x/2}dx = \\left[${2 * A}e^{x/2}\\right]_0^{${szK(
        veg,
        1,
      )}}`,
    };
  },
];

function ujKor() {
  for (let p = 0; p < 40; p++) {
    const F = valaszt(CSALADOK)();
    const T = gaussIntegral(F.fn, F.a, F.b, 200);
    const ertekek = Array.from({ length: 60 }, (_, k) => F.fn(F.a + ((F.b - F.a) * k) / 59));
    const maxY = Math.max(...ertekek);
    const minY = Math.min(...ertekek);
    // a tartomány csak akkor „satírozható terület”, ha a görbe végig a tengely fölött van
    if (T > 0.8 && T < 14 && Number.isFinite(maxY) && maxY < 9 && minY >= 0) {
      return { ...F, T, maxY };
    }
  }
  const F = CSALADOK[0]();
  return { ...F, T: gaussIntegral(F.fn, F.a, F.b, 200), maxY: 5 };
}

function pontszam(relHiba) {
  if (relHiba <= 0.05) return 100;
  if (relHiba >= 0.5) return 0;
  return Math.round(100 * (1 - (relHiba - 0.05) / 0.45));
}

export default function HoTeruletBecslo() {
  const [fut, setFut] = useState(false);
  const [kor, setKor] = useState(0);
  const [F, setF] = useState(null);
  const [tipp, setTipp] = useState(1);
  const [pont, setPont] = useState(0);
  const [eredmeny, setEredmeny] = useState(null);
  const [kesz, setKesz] = useState(false);
  const [rekord, setRekord] = useState(null);
  const [konfetti, setKonfetti] = useState(false);
  const kezdet = useRef(0);

  useEffect(() => {
    try {
      const r = localStorage.getItem(REKORD_KULCS);
      if (r) setRekord(Number(r));
    } catch {
      /* privát mód */
    }
  }, []);

  const indit = useCallback(() => {
    setFut(true);
    setKor(1);
    setPont(0);
    setF(ujKor());
    setTipp(1);
    setEredmeny(null);
    setKesz(false);
    kezdet.current = Date.now();
  }, []);

  const rogzit = () => {
    if (eredmeny || !F) return;
    const rel = Math.abs(tipp - F.T) / Math.abs(F.T);
    const alap = pontszam(rel);
    const ido = (Date.now() - kezdet.current) / 1000;
    const bonusz = alap > 0 ? Math.max(0, Math.round(20 * (1 - ido / 16))) : 0;
    setPont((p) => p + alap + bonusz);
    setEredmeny({
      rel,
      alap,
      bonusz,
      szoveg:
        alap === 100
          ? "Telitalálat — 5 %-on belül."
          : alap >= 60
            ? "Jó becslés. Számold meg a teljes egységnégyzeteket, és a félbevágottakat vedd felesnek."
            : alap > 0
              ? "Elment mellette. Segít, ha előbb megbecsülöd az átlagos magasságot, és megszorzod a szélességgel."
              : "Túl nagy a hiba. A görbe alatti területet mindig fogd közre: a beírt és a köré írt téglalap közé.",
    });
  };

  const kovetkezo = () => {
    if (kor >= KOROK) {
      setKesz(true);
      setRekord((r) => {
        const uj = Math.max(r ?? 0, pont);
        try {
          localStorage.setItem(REKORD_KULCS, String(uj));
        } catch {
          /* privát mód */
        }
        return uj;
      });
      if (pont >= 800) setKonfetti(true);
      return;
    }
    setKor((k) => k + 1);
    setF(ujKor());
    setTipp(1);
    setEredmeny(null);
    kezdet.current = Date.now();
  };

  if (!fut) {
    return (
      <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white p-6 text-center">
        <p className="text-[11px] font-bold tracking-[0.16em] text-violet-700 uppercase">Mekkora a terület?</p>
        <h4 className="mt-1 text-lg font-semibold text-petrol-900">Becsüld meg a satírozott területet — tíz körben</h4>
        <p className="mx-auto mt-2 max-w-md text-[14px] leading-relaxed text-petrol-600">
          Minden körben egy görbe alatti tartományt látsz, rácsvonalakkal: egy rácsnégyzet egységnyi területű.
          Állítsd be a csúszkával a becslésedet, és rögzítsd. Pont jár a pontosságért (100-ig, 5 % alatt teljes) és
          a gyorsaságért (20-ig).
        </p>
        {rekord != null && (
          <p className="szamok mt-3 text-[13px] text-petrol-500">
            Eddigi rekordod: <span className="font-semibold text-petrol-800">{rekord}</span> pont
          </p>
        )}
        <button
          type="button"
          onClick={indit}
          className="mt-4 rounded-lg bg-violet-600 px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-violet-700"
        >
          Kezdjük ▶
        </button>
      </div>
    );
  }

  if (kesz) {
    return (
      <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white p-6 text-center">
        <Konfetti aktiv={konfetti} onVege={() => setKonfetti(false)} />
        <p className="text-[11px] font-bold tracking-[0.16em] text-violet-700 uppercase">Vége</p>
        <p className="szamok mt-1 text-4xl font-bold text-petrol-900">
          {pont} <span className="text-lg font-semibold text-petrol-400">/ {KOROK * 120}</span>
        </p>
        <p className="mx-auto mt-2 max-w-md text-[14px] text-petrol-600">
          {pont >= 1000
            ? "Kiváló területérzék — ez a becslés a Zh-n aranyat ér az ellenőrzésnél."
            : pont >= 800
              ? "Szép eredmény! A görbe alatti terület nagyságrendjét jól látod."
              : pont >= 500
                ? "Közepes. Trükk: becsüld meg a függvény átlagmagasságát, és szorozd meg a szakasz hosszával — ez az integrálközép."
                : "Gyakorolj még: minden kör után nézd meg, mennyi volt a pontos érték, és mekkora téglalapnak felel meg."}
        </p>
        {rekord != null && (
          <p className="szamok mt-2 text-[13px] text-petrol-500">
            Rekord: <span className="font-semibold text-petrol-800">{rekord}</span> pont
          </p>
        )}
        <button
          type="button"
          onClick={indit}
          className="mt-4 rounded-lg bg-violet-600 px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-violet-700"
        >
          Újra ↻
        </button>
      </div>
    );
  }

  const felsoY = Math.ceil(F.maxY + 0.5);

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <Konfetti aktiv={konfetti} onVege={() => setKonfetti(false)} />
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <FvRajz
            xMin={-0.35}
            xMax={Math.max(F.b + 0.35, 2)}
            yMin={-0.5}
            yMax={felsoY}
            gorbek={[{ fn: F.fn, szin: TEAL, vastag: 2.8, tol: F.a, ig: F.b }]}
            className="abra w-full select-none"
          >
            {(S) => (
              <g>
                {/* egységnégyzet-rács */}
                {Array.from({ length: Math.ceil(Math.max(F.b + 0.35, 2)) + 1 }, (_, j) => (
                  <line
                    key={`v${j}`}
                    x1={S.px(j)}
                    y1={S.py(0)}
                    x2={S.px(j)}
                    y2={S.py(felsoY)}
                    stroke="#94a3b8"
                    strokeWidth="0.7"
                    opacity="0.55"
                  />
                ))}
                {Array.from({ length: felsoY + 1 }, (_, j) => (
                  <line
                    key={`h${j}`}
                    x1={S.px(0)}
                    y1={S.py(j)}
                    x2={S.px(Math.max(F.b + 0.35, 2))}
                    y2={S.py(j)}
                    stroke="#94a3b8"
                    strokeWidth="0.7"
                    opacity="0.55"
                  />
                ))}
                <path
                  d={teruletUt(S, () => 0, F.fn, F.a, F.b)}
                  fill={NAR}
                  fillOpacity="0.25"
                  stroke={NAR}
                  strokeWidth="1.4"
                />
                {eredmeny && (
                  <rect
                    x={S.px(F.a)}
                    y={S.py(tipp / (F.b - F.a))}
                    width={S.px(F.b) - S.px(F.a)}
                    height={Math.max(0, S.py(0) - S.py(tipp / (F.b - F.a)))}
                    fill={LILA}
                    fillOpacity="0.12"
                    stroke={LILA}
                    strokeWidth="1.6"
                    strokeDasharray="6 4"
                  />
                )}
                <text
                  x={S.px((F.a + F.b) / 2)}
                  y={S.py(0) + 30}
                  fontSize="11.5"
                  fontWeight="650"
                  textAnchor="middle"
                  style={{ fill: NAR, paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
                >
                  {sz(F.a, 0)} … {sz(F.b, F.b % 1 ? 1 : 0)}
                </text>
              </g>
            )}
          </FvRajz>
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            Egy rácsnégyzet területe 1 · {kor}. kör / {KOROK}
            {eredmeny ? " · a lila szaggatott téglalap a te becslésed „kisimítva”" : ""}
          </p>
        </div>

        <div className="p-5">
          <div className="flex items-baseline justify-between">
            <p className="text-[11px] font-bold tracking-[0.16em] text-violet-700 uppercase">
              {kor}. kör / {KOROK}
            </p>
            <p className="szamok text-[13px] font-semibold text-petrol-800">{pont} pont</p>
          </div>

          <div className="szamok mt-3 rounded-xl bg-petrol-50 p-4 text-[14px] text-petrol-900">
            <M>{F.latex}</M>
          </div>

          <label className="mt-4 block">
            <span className="mb-1 flex items-baseline justify-between">
              <span className="text-[12.5px] font-medium text-petrol-600">A becslésed</span>
              <span className="szamok rounded-md bg-petrol-100 px-2 py-0.5 text-[12.5px] font-semibold text-petrol-800">
                {sz(tipp, 1)}
              </span>
            </span>
            <input
              type="range"
              min={0.1}
              max={16}
              step={0.1}
              value={tipp}
              disabled={!!eredmeny}
              onChange={(e) => setTipp(Number(e.target.value))}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-petrol-100 accent-[color:var(--color-naracs-500)]"
            />
          </label>

          <div className="mt-3 flex flex-wrap gap-2">
            {!eredmeny && (
              <button
                type="button"
                onClick={rogzit}
                className="rounded-lg bg-violet-600 px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-violet-700"
              >
                Rögzítés
              </button>
            )}
            {eredmeny && (
              <button
                type="button"
                onClick={kovetkezo}
                className="rounded-lg bg-naracs-500 px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-naracs-600"
              >
                {kor >= KOROK ? "Eredmény →" : "Következő kör →"}
              </button>
            )}
          </div>

          {eredmeny && (
            <div className="mt-4 rounded-xl border border-petrol-200 bg-petrol-50 p-4">
              <div className="flex items-baseline justify-between">
                <span className="text-[12.5px] text-petrol-600">a pontos terület</span>
                <span className="szamok text-[15px] font-semibold text-petrol-900">{sz(F.T, 3)}</span>
              </div>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="text-[12.5px] text-petrol-600">a te becslésed</span>
                <span className="szamok text-[14px] font-semibold text-violet-800">{sz(tipp, 1)}</span>
              </div>
              <div className="mt-1 flex items-baseline justify-between border-t border-petrol-200 pt-1.5">
                <span className="text-[12.5px] text-petrol-600">relatív hiba</span>
                <span className="szamok text-[14px] font-semibold text-petrol-900">
                  {sz(eredmeny.rel * 100, 1)} %
                </span>
              </div>
              <div className="szamok finom-gorgeto mt-2 overflow-x-auto border-t border-petrol-200 pt-2 text-[12.5px] text-petrol-800">
                <M>{`${F.keplet} \\approx ${szK(F.T, 3)}`}</M>
              </div>
              <p className="mt-2 text-[13px] text-petrol-700">{eredmeny.szoveg}</p>
              <p className="szamok mt-1 text-[13px] font-semibold text-emerald-700">
                +{eredmeny.alap} pont{eredmeny.bonusz ? ` · +${eredmeny.bonusz} gyorsasági bónusz` : ""}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
