"use client";

import { useEffect, useRef, useState } from "react";
import FvRajz from "./FvRajz";
import { Csuszka } from "./Csuszka";
import { riemannOsszeg, teglalapok } from "./HoSzamol";
import { M } from "@/components/ui/Keplet";
import { sz } from "@/lib/szamok";

const TEAL = "#0f766e";
const NAR = "#e2590a";
const KEK = "#2563eb";
const PIROS = "#dc2626";

const FVEK = [
  {
    cimke: "x²",
    latex: "f(x)=x^2",
    fn: (x) => x * x,
    a: 0,
    b: 1,
    x: [-0.15, 1.15],
    y: [-0.15, 1.15],
    pontos: 1 / 3,
    pontosLatex: "\\frac13",
    megjegyzes:
      "Ez a jegyzet 1. példája: sₙ = (n−1)(2n−1)/(6n²), Sₙ = (n+1)(2n+1)/(6n²), a rés pontosan 1/n.",
  },
  {
    cimke: "sin x",
    latex: "f(x)=\\sin x",
    fn: Math.sin,
    a: 0,
    b: Math.PI,
    x: [-0.3, 3.45],
    y: [-0.2, 1.25],
    pontos: 2,
    pontosLatex: "2",
    megjegyzes:
      "A szinuszdomb területe pontosan 2 — meglepően kerek szám egy „hullámos” görbéhez.",
  },
  {
    cimke: "eˣ",
    latex: "f(x)=e^{x}",
    fn: Math.exp,
    a: 0,
    b: 1,
    x: [-0.15, 1.15],
    y: [-0.3, 3.1],
    pontos: Math.E - 1,
    pontosLatex: "e-1",
    megjegyzes:
      "Itt a pontos érték e − 1 ≈ 1,71828 — az exponenciális függvény integrálja „önmaga”.",
  },
  {
    cimke: "√x",
    latex: "f(x)=\\sqrt{x}",
    fn: (x) => (x >= 0 ? Math.sqrt(x) : NaN),
    a: 0,
    b: 1,
    x: [-0.15, 1.15],
    y: [-0.15, 1.2],
    pontos: 2 / 3,
    pontosLatex: "\\frac23",
    megjegyzes:
      "A √x a 0-ban függőleges érintővel indul, mégis integrálható: a felosztás finomításával a rés itt is nullához tart.",
  },
];

const MODOK = [
  { id: "also", cimke: "alsó (mᵢ)", szin: KEK },
  { id: "felso", cimke: "felső (Mᵢ)", szin: PIROS },
  { id: "bal", cimke: "bal végpont", szin: "#7c3aed" },
  { id: "jobb", cimke: "jobb végpont", szin: "#7c3aed" },
  { id: "kozep", cimke: "középső", szin: "#15803d" },
];

export default function HoRiemannFelfedezo() {
  const [i, setI] = useState(0);
  const [n, setN] = useState(6);
  const [mod, setMod] = useState("also");
  const [jatszik, setJatszik] = useState(false);
  const raf = useRef(null);

  const F = FVEK[i];

  useEffect(() => {
    if (!jatszik) return undefined;
    let utolso = performance.now();
    let ertek = 1;
    setN(1);
    const lep = (most) => {
      const dt = most - utolso;
      if (dt > 90) {
        utolso = most;
        ertek += ertek < 12 ? 1 : ertek < 30 ? 2 : 3;
        if (ertek >= 60) {
          setN(60);
          setJatszik(false);
          return;
        }
        setN(ertek);
      }
      raf.current = requestAnimationFrame(lep);
    };
    raf.current = requestAnimationFrame(lep);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [jatszik]);

  const also = riemannOsszeg(F.fn, F.a, F.b, n, "also");
  const felso = riemannOsszeg(F.fn, F.a, F.b, n, "felso");
  const valasztott = riemannOsszeg(F.fn, F.a, F.b, n, mod);
  const tegl = teglalapok(F.fn, F.a, F.b, n, mod);
  const res = felso - also;
  const hiba = valasztott - F.pontos;
  const modAdat = MODOK.find((m) => m.id === mod);

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <FvRajz
            xMin={F.x[0]}
            xMax={F.x[1]}
            yMin={F.y[0]}
            yMax={F.y[1]}
            gorbek={[{ fn: F.fn, szin: TEAL, vastag: 2.8, tol: F.a - 0.02, ig: F.b + 0.02 }]}
            className="abra w-full select-none"
          >
            {(S) => (
              <g>
                {tegl.map((t, k) => {
                  const y0 = S.py(0);
                  const y1 = S.py(t.y);
                  return (
                    <rect
                      key={k}
                      x={S.px(t.x0)}
                      y={Math.min(y0, y1)}
                      width={Math.max(0.4, S.px(t.x1) - S.px(t.x0))}
                      height={Math.abs(y1 - y0)}
                      fill={modAdat.szin}
                      fillOpacity="0.22"
                      stroke={modAdat.szin}
                      strokeWidth={n > 34 ? 0.4 : 0.9}
                    />
                  );
                })}
                <line
                  x1={S.px(F.a)}
                  y1={S.py(0)}
                  x2={S.px(F.b)}
                  y2={S.py(0)}
                  stroke={NAR}
                  strokeWidth="2.4"
                />
                <text
                  x={S.px(F.a)}
                  y={S.py(0) + 28}
                  fontSize="11.5"
                  fontWeight="650"
                  textAnchor="middle"
                  fill={NAR}
                >
                  a
                </text>
                <text
                  x={S.px(F.b)}
                  y={S.py(0) + 28}
                  fontSize="11.5"
                  fontWeight="650"
                  textAnchor="middle"
                  fill={NAR}
                >
                  b
                </text>
              </g>
            )}
          </FvRajz>
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            {n} téglalap · a kiválasztott összeg: {sz(valasztott, 5)} · pontos érték: {sz(F.pontos, 5)}
          </p>
        </div>

        <div className="p-5">
          <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">Függvény</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {FVEK.map((k, j) => (
              <button
                key={k.cimke}
                type="button"
                onClick={() => {
                  setI(j);
                  setJatszik(false);
                }}
                className={`rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition ${
                  i === j
                    ? "bg-petrol-700 text-white"
                    : "bg-white text-petrol-600 ring-1 ring-petrol-200 hover:bg-petrol-50"
                }`}
              >
                {k.cimke}
              </button>
            ))}
          </div>

          <p className="mt-4 text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">
            A téglalap magassága
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {MODOK.map((k) => (
              <button
                key={k.id}
                type="button"
                onClick={() => setMod(k.id)}
                className={`rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition ${
                  mod === k.id
                    ? "bg-petrol-700 text-white"
                    : "bg-white text-petrol-600 ring-1 ring-petrol-200 hover:bg-petrol-50"
                }`}
              >
                {k.cimke}
              </button>
            ))}
          </div>

          <div className="mt-4">
            <Csuszka
              cimke="Az osztások száma, n"
              ertek={n}
              min={1}
              max={60}
              lepes={1}
              tizedes={0}
              onChange={(v) => {
                setJatszik(false);
                setN(v);
              }}
            />
          </div>

          <button
            type="button"
            onClick={() => setJatszik((v) => !v)}
            className="mt-3 rounded-lg bg-naracs-500 px-3.5 py-1.5 text-[12.5px] font-semibold text-white transition hover:bg-naracs-600"
          >
            {jatszik ? "❚❚ Állj" : "▶ Finomítás lejátszása"}
          </button>

          <div className="szamok mt-4 space-y-1.5 rounded-xl bg-petrol-50 p-4 text-[13.5px] text-petrol-800">
            <div>
              <M>{F.latex}</M>
            </div>
            <div className="flex items-baseline justify-between">
              <span>
                alsó összeg <M>{"s_n"}</M>
              </span>
              <span className="font-semibold" style={{ color: KEK }}>
                {sz(also, 5)}
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <span>
                felső összeg <M>{"S_n"}</M>
              </span>
              <span className="font-semibold" style={{ color: PIROS }}>
                {sz(felso, 5)}
              </span>
            </div>
            <div className="flex items-baseline justify-between border-t border-petrol-200 pt-1.5">
              <span>
                a rés <M>{"S_n-s_n"}</M>
              </span>
              <span className="font-semibold text-petrol-900">{sz(res, 5)}</span>
            </div>
          </div>

          <div className="mt-3 rounded-xl border border-naracs-200 bg-naracs-50 p-4">
            <p className="text-[10.5px] font-bold tracking-[0.16em] text-naracs-700 uppercase">
              A pontos érték
            </p>
            <div className="szamok mt-1.5 text-[14px] text-naracs-900">
              <M>{`\\int_{${sz(F.a, 0)}}^{${F.cimke === "sin x" ? "\\pi" : sz(F.b, 0)}} ${
                F.latex.split("=")[1]
              }\\,dx = ${F.pontosLatex} \\approx ${sz(F.pontos, 5).replace(",", "{,}")}`}</M>
            </div>
            <p className="mt-1.5 text-[12.5px] text-naracs-900">
              A választott közelítés hibája: <strong>{sz(Math.abs(hiba), 5)}</strong>
              {n >= 40 ? " — n = 40 fölött már a harmadik tizedes is stabil." : ""}
            </p>
          </div>

          <p className="mt-3 text-[12.5px] leading-relaxed text-petrol-500">{F.megjegyzes}</p>
        </div>
      </div>
    </div>
  );
}
