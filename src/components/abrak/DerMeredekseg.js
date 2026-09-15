"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import FvRajz from "./FvRajz";
import Konfetti from "@/components/ui/Konfetti";
import { M } from "@/components/ui/Keplet";
import { sz, szK } from "@/lib/szamok";

const TEAL = "#0f766e";
const NAR = "#e2590a";
const LILA = "#7c3aed";

const KOROK = 10;
const REKORD_KULCS = "matek-meredekseg-rekord";

const veletlen = (min, max) => min + Math.random() * (max - min);
const valaszt = (t) => t[Math.floor(Math.random() * t.length)];
const kerek = (v, l) => Math.round(v / l) * l;

/* A feladatcsalád: mindegyik ad egy függvényt, a deriváltját és egy ablakot. */
const CSALADOK = [
  () => {
    const a = valaszt([0.25, 0.5, -0.5, 0.75, -0.75, 1]);
    const b = valaszt([-1, 0, 1]);
    return {
      fn: (x) => a * x * x + b,
      der: (x) => 2 * a * x,
      latex: `f(x) = ${a === 1 ? "" : szK(a, 2)}x^2 ${b >= 0 ? "+" : "-"} ${Math.abs(b)}`,
      derLatex: `f'(x) = ${szK(2 * a, 2)}x`,
      x: [-3.2, 3.2],
      y: [-5, 6],
      x0: kerek(veletlen(-2.4, 2.4), 0.5),
    };
  },
  () => {
    const a = valaszt([1, 1.5, 2, -1, -1.5]);
    return {
      fn: (x) => a * Math.sin(x),
      der: (x) => a * Math.cos(x),
      latex: `f(x) = ${a === 1 ? "" : a === -1 ? "-" : szK(a, 1)}\\sin x`,
      derLatex: `f'(x) = ${a === 1 ? "" : a === -1 ? "-" : szK(a, 1)}\\cos x`,
      x: [-6.3, 6.3],
      y: [-3, 3],
      x0: kerek(veletlen(-5.5, 5.5), 0.25),
    };
  },
  () => {
    const a = valaszt([1, 2, 3, -1, -2]);
    return {
      fn: (x) => a * Math.sqrt(x),
      der: (x) => a / (2 * Math.sqrt(x)),
      latex: `f(x) = ${a === 1 ? "" : a === -1 ? "-" : a}\\sqrt{x}`,
      derLatex: `f'(x) = ${a < 0 ? "-" : ""}\\frac{${Math.abs(a)}}{2\\sqrt{x}}`,
      x: [-0.4, 6.5],
      y: [-4, 6],
      x0: kerek(veletlen(0.5, 6), 0.25),
    };
  },
  () => {
    const a = valaszt([1, 2, -1, -2]);
    return {
      fn: (x) => a / x,
      der: (x) => -a / (x * x),
      latex: `f(x) = \\frac{${a === 1 ? "1" : a === -1 ? "-1" : a}}{x}`,
      derLatex: `f'(x) = ${a > 0 ? "-" : ""}\\frac{${Math.abs(a)}}{x^2}`,
      x: [-4.5, 4.5],
      y: [-5, 5],
      x0: kerek(valaszt([1, -1]) * veletlen(0.8, 3.5), 0.25),
    };
  },
  () => {
    const a = valaszt([1, 2, 3, -1, -2]);
    return {
      fn: (x) => a * Math.log(x),
      der: (x) => a / x,
      latex: `f(x) = ${a === 1 ? "" : a === -1 ? "-" : a}\\ln x`,
      derLatex: `f'(x) = ${a < 0 ? "-" : ""}\\frac{${Math.abs(a)}}{x}`,
      x: [-0.4, 7],
      y: [-5, 5],
      x0: kerek(veletlen(0.6, 6), 0.25),
    };
  },
  () => {
    const c = valaszt([1, 2, 3]);
    return {
      fn: (x) => (x * x * x) / 3 - c * x,
      der: (x) => x * x - c,
      latex: `f(x) = \\frac{x^3}{3} - ${c}x`,
      derLatex: `f'(x) = x^2 - ${c}`,
      x: [-3.2, 3.2],
      y: [-5, 5],
      x0: kerek(veletlen(-2.2, 2.2), 0.25),
    };
  },
  () => {
    const a = valaszt([0.5, 1, -0.5, -1]);
    return {
      fn: (x) => a * Math.exp(x / 2),
      der: (x) => (a / 2) * Math.exp(x / 2),
      latex: `f(x) = ${a === 1 ? "" : a === -1 ? "-" : szK(a, 1)}e^{x/2}`,
      derLatex: `f'(x) = ${szK(a / 2, 2)}e^{x/2}`,
      x: [-4, 3.2],
      y: [-5, 6],
      x0: kerek(veletlen(-3, 2.6), 0.25),
    };
  },
];

/** Új kör: olyan feladat, amelynek deriváltja a −3,5 … 3,5 sávba esik. */
function ujKor() {
  for (let probak = 0; probak < 80; probak++) {
    const F = valaszt(CSALADOK)();
    const m = F.der(F.x0);
    const y = F.fn(F.x0);
    if (
      Number.isFinite(m) &&
      Number.isFinite(y) &&
      Math.abs(m) <= 3.5 &&
      Math.abs(m) >= 0.15 &&
      y > F.y[0] + 0.6 &&
      y < F.y[1] - 0.6
    ) {
      return F;
    }
  }
  const F = CSALADOK[0]();
  return { ...F, x0: 1 };
}

function pontszam(kul) {
  if (kul < 0.1) return 100;
  if (kul >= 1.5) return 0;
  return Math.round(100 * (1 - (kul - 0.1) / 1.4));
}

export default function DerMeredekseg() {
  const [fut, setFut] = useState(false);
  const [kor, setKor] = useState(0);
  const [F, setF] = useState(null);
  const [m, setM] = useState(0);
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
    setM(0);
    setEredmeny(null);
    setKesz(false);
    kezdet.current = Date.now();
  }, []);

  const rogzit = () => {
    if (eredmeny || !F) return;
    const igazi = F.der(F.x0);
    const kul = Math.abs(m - igazi);
    const alap = pontszam(kul);
    const ido = (Date.now() - kezdet.current) / 1000;
    const bonusz = alap > 0 ? Math.max(0, Math.round(20 * (1 - ido / 14))) : 0;
    setPont((p) => p + alap + bonusz);
    setEredmeny({
      igazi,
      kul,
      alap,
      bonusz,
      szoveg:
        alap === 100
          ? "Telitalálat — ez a meredekség."
          : alap >= 60
            ? "Közel jártál, de a görbület megtévesztett."
            : alap > 0
              ? "Az irány jó, a nagyság nem: nézd meg, hány egységet emelkedik a görbe egy egység alatt."
              : "Mellé. Számold ki fejben a derivált képletéből, ne csak nézd!",
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
    setM(0);
    setEredmeny(null);
    kezdet.current = Date.now();
  };

  if (!fut) {
    return (
      <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white p-6 text-center">
        <p className="text-[11px] font-bold tracking-[0.16em] text-violet-700 uppercase">Mennyi a meredekség?</p>
        <h4 className="mt-1 text-lg font-semibold text-petrol-900">Állítsd be az érintőt — tíz körben</h4>
        <p className="mx-auto mt-2 max-w-md text-[14px] leading-relaxed text-petrol-600">
          Minden körben látsz egy görbét és rajta egy kijelölt pontot. A csúszkával forgasd az egyenest addig, amíg
          szerinted érintő lesz, aztán rögzítsd. Pont jár a pontosságért (100-ig) és a gyorsaságért (20-ig).
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
            ? "Ez már ránézésre megy — a derivált fogalma a helyén van."
            : pont >= 800
              ? "Szép eredmény! A meredekség és a derivált kapcsolata megvan."
              : pont >= 500
                ? "Közepes. Segít, ha minden kör előtt fejben felírod a derivált képletét, és csak utána húzod a csúszkát."
                : "Menj vissza az 5.5-höz: ott a derivált görbéjén látszik, mekkora meredekséget kell keresned."}
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

  const y0 = F.fn(F.x0);
  const egyenesek = [{ m, b: y0 - m * F.x0, szin: LILA, vastag: 2.4 }];
  if (eredmeny) egyenesek.push({ m: eredmeny.igazi, b: y0 - eredmeny.igazi * F.x0, szin: NAR, vastag: 2.6 });

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <Konfetti aktiv={konfetti} onVege={() => setKonfetti(false)} />
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <FvRajz
            xMin={F.x[0]}
            xMax={F.x[1]}
            yMin={F.y[0]}
            yMax={F.y[1]}
            gorbek={[{ fn: F.fn, szin: TEAL, vastag: 2.8 }]}
            egyenesek={egyenesek}
            pontok={[{ x: F.x0, y: y0, szin: eredmeny ? NAR : LILA, r: 6 }]}
            className="abra w-full select-none"
          >
            {(S) => (
              <g>
                <line
                  x1={S.px(F.x0)}
                  y1={S.py(y0)}
                  x2={S.px(F.x0)}
                  y2={S.py(Math.max(F.y[0], Math.min(F.y[1], 0)))}
                  stroke="#94a3b8"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <text
                  x={S.px(F.x0)}
                  y={S.margo.fel + S.h - 6}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  style={{ fill: "#1d3c48", paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
                >
                  x₀ = {sz(F.x0, 2)}
                </text>
              </g>
            )}
          </FvRajz>
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            {eredmeny
              ? "Narancs: az igazi érintő. Lila: a te tipped."
              : "A lila egyenes a pont körül forog — állítsd érintő helyzetbe."}
          </p>
        </div>

        <div className="p-5">
          <div className="flex items-baseline justify-between">
            <p className="text-[10.5px] font-bold tracking-[0.16em] text-violet-700 uppercase">{kor}. kör / {KOROK}</p>
            <p className="szamok text-[13px] font-semibold text-petrol-700">{pont} pont</p>
          </div>

          <div className="szamok mt-3 text-[16px] text-petrol-900">
            <M>{F.latex}</M>
          </div>
          <p className="mt-1 text-[13px] text-petrol-600">
            Mekkora az érintő meredeksége az <span className="szamok">x₀ = {sz(F.x0, 2)}</span> helyen?
          </p>

          <label className="mt-4 block">
            <span className="mb-1 flex items-baseline justify-between">
              <span className="text-[12.5px] font-medium text-petrol-600">A tipped: m</span>
              <span className="szamok rounded-md bg-violet-100 px-2 py-0.5 text-[12.5px] font-semibold text-violet-800">
                {sz(m, 2)}
              </span>
            </span>
            <input
              type="range"
              min={-4}
              max={4}
              step={0.05}
              value={m}
              disabled={!!eredmeny}
              onChange={(e) => setM(Number(e.target.value))}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-petrol-100 accent-[color:var(--color-naracs-500)] disabled:opacity-50"
            />
          </label>

          {!eredmeny && (
            <button
              type="button"
              onClick={rogzit}
              className="mt-4 rounded-lg bg-petrol-700 px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-petrol-800"
            >
              Rögzítés
            </button>
          )}

          {eredmeny && (
            <div
              className={`mt-4 rounded-xl border px-4 py-3 ${
                eredmeny.alap >= 60 ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"
              }`}
            >
              <p
                className={`szamok text-[11px] font-bold tracking-[0.14em] uppercase ${
                  eredmeny.alap >= 60 ? "text-emerald-700" : "text-rose-700"
                }`}
              >
                +{eredmeny.alap} pont{eredmeny.bonusz > 0 ? ` · +${eredmeny.bonusz} gyorsaság` : ""}
              </p>
              <p className="mt-1 text-[13.5px] text-petrol-800">{eredmeny.szoveg}</p>
              <div className="szamok mt-2 text-[13px] text-petrol-700">
                <M>{F.derLatex}</M>
              </div>
              <p className="szamok mt-1 text-[13.5px] font-semibold text-petrol-900">
                f′({sz(F.x0, 2)}) = {sz(eredmeny.igazi, 3)} · a te tipped: {sz(m, 2)} · eltérés: {sz(eredmeny.kul, 3)}
              </p>
              <button
                type="button"
                onClick={kovetkezo}
                className="mt-3 rounded-lg bg-naracs-500 px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-naracs-600"
              >
                {kor >= KOROK ? "Eredmény" : "Következő kör →"}
              </button>
            </div>
          )}

          <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-petrol-100">
            <div
              className="h-full rounded-full bg-violet-500 transition-all"
              style={{ width: `${((kor - 1) / KOROK) * 100}%` }}
            />
          </div>
          <button
            type="button"
            onClick={() => setFut(false)}
            className="mt-3 text-[12px] text-petrol-500 hover:text-petrol-800"
          >
            Játék megszakítása
          </button>
        </div>
      </div>
    </div>
  );
}
