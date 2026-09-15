"use client";

import { useState } from "react";
import FvRajz from "./FvRajz";
import { Csuszka } from "./Csuszka";
import { M, MB } from "@/components/ui/Keplet";
import { sz, szK } from "@/lib/szamok";

const TEAL = "#0f766e";
const NAR = "#e2590a";

/**
 * Parciális törtekre bontás játszótere.
 * A diák az A és B együtthatókat állítja; a panel visszaszorozza a bontást, és
 * az FvRajz megmutatja, egybeesik-e a két görbe.
 */

const PELDAK = [
  {
    cim: "KF‑5 / 25. példa",
    a: 3,
    b: 2,
    alfa: 2,
    beta: -3,
    A: 1.6,
    B: 1.4,
    x: [-6, 5],
    nevezoLatex: "x^2+x-6",
    eredLatex: "\\frac85\\ln\\left|x-2\\right|+\\frac75\\ln\\left|x+3\\right|+C",
  },
  {
    cim: "10. gyakorlófeladat",
    a: 5,
    b: -1,
    alfa: 2,
    beta: -1,
    A: 3,
    B: 2,
    x: [-4, 5],
    nevezoLatex: "x^2-x-2",
    eredLatex: "3\\ln\\left|x-2\\right|+2\\ln\\left|x+1\\right|+C",
  },
  {
    cim: "Negatív együttható",
    a: 1,
    b: 5,
    alfa: 1,
    beta: -3,
    A: 1.5,
    B: -0.5,
    x: [-6, 4],
    nevezoLatex: "x^2+2x-3",
    eredLatex: "\\frac32\\ln\\left|x-1\\right|-\\frac12\\ln\\left|x+3\\right|+C",
  },
  {
    cim: "Feles együtthatók",
    a: 2,
    b: -4,
    alfa: -1,
    beta: 3,
    A: 1.5,
    B: 0.5,
    x: [-4, 6],
    nevezoLatex: "x^2-2x-3",
    eredLatex: "\\frac32\\ln\\left|x+1\\right|+\\frac12\\ln\\left|x-3\\right|+C",
  },
];

/** Tömör KaTeX-szám: egésznél tizedesek nélkül. */
const tomor = (v) =>
  Math.abs(v - Math.round(v)) < 1e-9
    ? String(Math.round(v))
    : sz(v, 2).replace(/0+$/, "").replace(/,$/, "").replace(",", "{,}");

/** Gyöktényező LaTeX-alakja: x − 2, x + 3. */
const gyokTag = (g) => (g >= 0 ? `x - ${szK(g, 0)}` : `x + ${szK(-g, 0)}`);

/** Előjeles tag: „+2”, „−4”, üres ha 0. */
const tag = (c) => (c === 0 ? "" : c > 0 ? ` + ${szK(c, 0)}` : ` - ${szK(-c, 0)}`);

export default function HiParcialisTortek() {
  const [i, setI] = useState(0);
  const [A, setA] = useState(0);
  const [B, setB] = useState(0);

  const P = PELDAK[i];

  const valt = (j) => {
    setI(j);
    setA(0);
    setB(0);
  };

  const eredeti = (x) => {
    const n = (x - P.alfa) * (x - P.beta);
    return Math.abs(n) < 1e-9 ? NaN : (P.a * x + P.b) / n;
  };
  const bontas = (x) => {
    const d1 = x - P.alfa;
    const d2 = x - P.beta;
    if (Math.abs(d1) < 1e-9 || Math.abs(d2) < 1e-9) return NaN;
    return A / d1 + B / d2;
  };

  /* A visszaszorzott számláló: A(x−β) + B(x−α) = (A+B)x − (Aβ + Bα) */
  const szamlaloX = A + B;
  const szamlaloK = -(A * P.beta + B * P.alfa);
  const jo = Math.abs(A - P.A) < 0.051 && Math.abs(B - P.B) < 0.051;

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <FvRajz
            xMin={P.x[0]}
            xMax={P.x[1]}
            yMin={-6}
            yMax={6}
            gorbek={[
              { fn: eredeti, szin: TEAL, vastag: 3.2, cimke: "az eredeti tört" },
              { fn: bontas, szin: NAR, vastag: 2, szaggatott: true },
            ]}
            fuggoleges={[{ x: P.alfa, szin: "#cbd5e1" }, { x: P.beta, szin: "#cbd5e1" }]}
            className="abra w-full touch-none select-none"
          />
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            Teal: az eredeti tört. Narancs szaggatott: a te bontásod. A szürke függőlegesek a nevező gyökei.
          </p>
        </div>

        <div className="p-5">
          <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">Feladat</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {PELDAK.map((p, j) => (
              <button
                key={p.cim}
                type="button"
                onClick={() => valt(j)}
                className={`rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition ${
                  i === j
                    ? "bg-petrol-700 text-white"
                    : "bg-white text-petrol-600 ring-1 ring-petrol-200 hover:bg-petrol-50"
                }`}
              >
                {p.cim}
              </button>
            ))}
          </div>

          <div className="szamok mt-3 text-[14px] text-petrol-900">
            <MB>{`\\frac{${szK(P.a, 0)}x${tag(P.b)}}{${P.nevezoLatex}} = \\frac{${szK(P.a, 0)}x${tag(
              P.b,
            )}}{\\left(${gyokTag(P.alfa)}\\right)\\left(${gyokTag(P.beta)}\\right)}`}</MB>
          </div>
          <p className="text-[13px] text-petrol-600">
            Keressük <M>{`\\frac{A}{${gyokTag(P.alfa)}}+\\frac{B}{${gyokTag(P.beta)}}`}</M> alakban. Állítsd be A-t és
            B-t!
          </p>

          <div className="mt-4 space-y-3">
            <Csuszka cimke="A együttható" ertek={A} min={-5} max={5} lepes={0.1} tizedes={1} onChange={setA} />
            <Csuszka cimke="B együttható" ertek={B} min={-5} max={5} lepes={0.1} tizedes={1} onChange={setB} />
          </div>

          <div className="mt-4 rounded-xl border border-petrol-200 bg-white p-4">
            <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">Visszaszorozva</p>
            <div className="szamok finom-gorgeto mt-1 overflow-x-auto text-[13.5px] text-petrol-900">
              <M>{`A\\left(${gyokTag(P.beta)}\\right)+B\\left(${gyokTag(P.alfa)}\\right) = ${tomor(
                szamlaloX,
              )}x${szamlaloK >= 0 ? " + " : " - "}${tomor(Math.abs(szamlaloK))}`}</M>
            </div>
            <p className="mt-2 text-[13px] text-petrol-600">
              Ennek meg kell egyeznie a számlálóval:{" "}
              <span className="szamok font-semibold text-petrol-900">
                <M>{`${szK(P.a, 0)}x${tag(P.b)}`}</M>
              </span>
            </p>
          </div>

          <div
            className={`mt-3 rounded-xl border px-4 py-3 ${
              jo ? "border-emerald-200 bg-emerald-50" : "border-petrol-200 bg-petrol-50"
            }`}
          >
            {jo ? (
              <>
                <p className="text-[10.5px] font-bold tracking-[0.16em] text-emerald-700 uppercase">
                  Megvan — a két görbe egybeesik
                </p>
                <p className="mt-1 text-[13.5px] text-emerald-900">
                  Most már csak tagonként integrálni kell, mindkettő logaritmust ad:
                </p>
                <div className="szamok finom-gorgeto mt-1 overflow-x-auto text-[13.5px] text-emerald-900">
                  <MB>{P.eredLatex}</MB>
                </div>
              </>
            ) : (
              <>
                <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-600 uppercase">Hol tartasz?</p>
                <p className="mt-1 text-[13.5px] text-petrol-800">
                  Az <M>{"x"}</M> együtthatója <span className="szamok font-semibold">{sz(szamlaloX, 1)}</span> — a
                  célja <span className="szamok font-semibold">{sz(P.a, 1)}</span>. A konstans tag{" "}
                  <span className="szamok font-semibold">{sz(szamlaloK, 1)}</span> — a célja{" "}
                  <span className="szamok font-semibold">{sz(P.b, 1)}</span>.
                </p>
              </>
            )}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setA(P.A);
                setB(P.B);
              }}
              className="rounded-lg bg-petrol-700 px-3.5 py-2 text-[12.5px] font-semibold text-white transition hover:bg-petrol-800"
            >
              Letakarásos módszer ▸
            </button>
            <button
              type="button"
              onClick={() => {
                setA(0);
                setB(0);
              }}
              className="rounded-lg bg-white px-3.5 py-2 text-[12.5px] font-medium text-petrol-600 ring-1 ring-petrol-200 transition hover:bg-petrol-50"
            >
              Nullázás
            </button>
          </div>

          <p className="mt-3 text-[12.5px] leading-relaxed text-petrol-500">
            A letakarásos módszer: <M>{`x = ${szK(P.alfa, 0)}`}</M> behelyettesítésével azonnal{" "}
            <M>{`A = ${tomor(P.A)}`}</M>, <M>{`x = ${szK(P.beta, 0)}`}</M>-vel pedig <M>{`B = ${tomor(P.B)}`}</M>{" "}
            adódik — egyszeres valós gyököknél ez villámgyors.
          </p>
        </div>
      </div>
    </div>
  );
}
