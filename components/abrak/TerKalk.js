"use client";

import { useState } from "react";
import { M } from "@/components/ui/Keplet";
import { sz, szK } from "@/lib/szamok";
import {
  egyenesSikSzog,
  egyseg,
  egyszerusit,
  hossz,
  kul,
  skalaris,
  sikEgyenletK,
  szogFok,
  vegyes,
  vektorialis,
  vekK,
} from "@/components/tergeometria/vektorok";

function szamma(s) {
  const v = Number(String(s).replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(v) ? v : 0;
}

function Mezo({ cimke, ertek, onChange }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11.5px] font-medium text-petrol-600">{cimke}</span>
      <input
        type="text"
        inputMode="decimal"
        value={ertek}
        onChange={(e) => onChange(e.target.value)}
        className="szamok w-full rounded-lg border border-petrol-200 bg-white px-2.5 py-1.5 text-[13.5px] text-petrol-900 outline-none focus:border-petrol-400 focus:ring-2 focus:ring-petrol-100"
      />
    </label>
  );
}

function Harmas({ cim, szin, ertekek, elonev, onChange }) {
  return (
    <div className={`rounded-xl border p-3 ${szin}`}>
      <p className="mb-2 text-[12.5px] font-semibold text-petrol-800">{cim}</p>
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <Mezo
            key={i}
            cimke={`${elonev}${["₁", "₂", "₃"][i]}`}
            ertek={ertekek[i]}
            onChange={(v) => onChange(i, v)}
          />
        ))}
      </div>
    </div>
  );
}

function Eredmeny({ cimke, children }) {
  return (
    <div className="rounded-lg border border-petrol-100 bg-petrol-50/60 px-3.5 py-2.5">
      <p className="text-[10.5px] font-bold tracking-wider text-petrol-500 uppercase">{cimke}</p>
      <div className="szamok mt-1 text-[13.5px] text-petrol-900">{children}</div>
    </div>
  );
}

/* ==================================================================== */
/* 1. Három vektor: hossz, szorzatok, területek, térfogatok              */
/* ==================================================================== */

const ALAP1 = { a: ["3", "4", "5"], b: ["2", "1", "0"], c: ["-1", "-2", "5"] };

export function TerVektorKalk() {
  const [m, setM] = useState(ALAP1);
  const a = m.a.map(szamma);
  const b = m.b.map(szamma);
  const c = m.c.map(szamma);

  const ab = skalaris(a, b);
  const kereszt = vektorialis(a, b);
  const keresztH = hossz(kereszt);
  const fi = szogFok(a, b);
  const det = vegyes(a, b, c);

  const allit = (kulcs) => (i, v) =>
    setM((s) => ({ ...s, [kulcs]: s[kulcs].map((x, j) => (j === i ? v : x)) }));

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_1.5fr]">
        <div>
          <p className="text-[10.5px] font-bold tracking-[0.16em] text-naracs-600 uppercase">Bemenet</p>
          <div className="mt-3 space-y-3">
            <Harmas cim="a vektor" szin="border-naracs-200 bg-naracs-50/60" ertekek={m.a} elonev="a" onChange={allit("a")} />
            <Harmas cim="b vektor" szin="border-blue-200 bg-blue-50/60" ertekek={m.b} elonev="b" onChange={allit("b")} />
            <Harmas cim="c vektor (a vegyes szorzathoz)" szin="border-violet-200 bg-violet-50/60" ertekek={m.c} elonev="c" onChange={allit("c")} />
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {[
              ["KF‑1: (3;4;5), (2;1;0)", { a: ["3", "4", "5"], b: ["2", "1", "0"], c: ["-1", "-2", "5"] }],
              ["KF‑2: (3;−1;2), (5;4;−1)", { a: ["3", "-1", "2"], b: ["5", "4", "-1"], c: ["0", "0", "1"] }],
              ["KF‑3 élvektorai", { a: ["3", "1", "2"], b: ["1", "3", "3"], c: ["-1", "-2", "5"] }],
            ].map(([nev, ert]) => (
              <button
                key={nev}
                type="button"
                onClick={() => setM(ert)}
                className="rounded-lg bg-white px-2.5 py-1.5 text-[12px] font-medium text-petrol-600 ring-1 ring-petrol-200 transition hover:bg-petrol-50"
              >
                {nev}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2.5">
          <div className="grid gap-2.5 sm:grid-cols-2">
            <Eredmeny cimke="|a| és egységvektora">
              <M>{`|\\mathbf{a}| = ${szK(hossz(a), 4)}`}</M>
              <div className="mt-0.5 text-[12.5px] text-petrol-600">
                <M>{`\\mathbf{e}_a = ${vekK(egyseg(a), 4)}`}</M>
              </div>
            </Eredmeny>
            <Eredmeny cimke="|b| és egységvektora">
              <M>{`|\\mathbf{b}| = ${szK(hossz(b), 4)}`}</M>
              <div className="mt-0.5 text-[12.5px] text-petrol-600">
                <M>{`\\mathbf{e}_b = ${vekK(egyseg(b), 4)}`}</M>
              </div>
            </Eredmeny>
            <Eredmeny cimke="Skaláris szorzat">
              <M>{`\\mathbf{a}\\cdot\\mathbf{b} = ${szK(ab, 4)}`}</M>
              <div className="mt-0.5 text-[12.5px] text-petrol-600">
                {Math.abs(ab) < 1e-9 ? "merőlegesek" : ab > 0 ? "hegyesszög" : "tompaszög"}
              </div>
            </Eredmeny>
            <Eredmeny cimke="Hajlásszög (vektoroké)">
              <M>{`\\varphi = ${Number.isFinite(fi) ? szK(fi, 2) : "-"}^\\circ`}</M>
              <div className="mt-0.5 text-[12.5px] text-petrol-600">
                <M>{`\\cos\\varphi = ${Number.isFinite(fi) ? szK(Math.cos((fi * Math.PI) / 180), 4) : "-"}`}</M>
              </div>
            </Eredmeny>
          </div>

          <Eredmeny cimke="Vektoriális szorzat">
            <M>{`\\mathbf{a}\\times\\mathbf{b} = ${vekK(kereszt, 4)}`}</M>
            <div className="mt-1 text-[12.5px] text-petrol-600">
              <M>{`|\\mathbf{a}\\times\\mathbf{b}| = ${szK(keresztH, 4)} = T_{\\text{paralelogramma}},\\qquad T_{\\triangle} = ${szK(keresztH / 2, 4)}`}</M>
            </div>
            <div className="mt-1 text-[12px] text-petrol-500">
              Ellenőrzés: (a×b)·a = {sz(skalaris(kereszt, a), 4)}, (a×b)·b = {sz(skalaris(kereszt, b), 4)}
            </div>
          </Eredmeny>

          <Eredmeny cimke="Vegyes szorzat">
            <M>{`(\\mathbf{a}\\times\\mathbf{b})\\cdot\\mathbf{c} = ${szK(det, 4)}`}</M>
            <div className="mt-1 text-[12.5px] text-petrol-600">
              <M>{`V_{\\text{paralelepipedon}} = ${szK(Math.abs(det), 4)},\\qquad V_{\\text{tetraéder}} = ${szK(Math.abs(det) / 6, 4)}`}</M>
            </div>
            <div className="mt-1 text-[12px] text-petrol-500">
              {Math.abs(det) < 1e-9
                ? "A vegyes szorzat nulla: a három vektor komplanáris (egy síkkal párhuzamos)."
                : det > 0
                  ? "Pozitív: az a, b, c hármas jobbsodrású."
                  : "Negatív: az a, b, c hármas balsodrású."}
            </div>
          </Eredmeny>

          <div className="rounded-lg bg-petrol-50 px-3.5 py-2.5 text-[12.5px] text-petrol-600">
            Ha a három vektor egy háromszög két oldalvektora és egy harmadik él, a csúcsokból mindig{" "}
            <strong>végpont mínusz kezdőpont</strong> szabállyal gyártsd őket — a kalkulátor a kész vektorokkal dolgozik.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==================================================================== */
/* 2. Egyenes és sík                                                     */
/* ==================================================================== */

const ALAP2 = {
  A: ["2", "3", "-1"],
  B: ["4", "5", "2"],
  C: ["2", "5", "5"],
  Q: ["3", "2", "-1"],
  P: ["1", "-1", "2"],
  v: ["2", "1", "-1"],
};

export function TerEgyenesSikKalk() {
  const [m, setM] = useState(ALAP2);
  const A = m.A.map(szamma);
  const B = m.B.map(szamma);
  const C = m.C.map(szamma);
  const Q = m.Q.map(szamma);
  const P = m.P.map(szamma);
  const v = m.v.map(szamma);

  const AB = kul(B, A);
  const AC = kul(C, A);
  const n = vektorialis(AB, AC);
  const nH = hossz(n);
  const ervenyes = nH > 1e-9;
  const d = skalaris(n, A);

  // egész alak, ha lehet
  const egeszE =
    ervenyes && n.every((k) => Math.abs(k - Math.round(k)) < 1e-9) && Math.abs(d - Math.round(d)) < 1e-9;
  const nEgysz = egeszE ? egyszerusit(n) : n;
  const elsoIdx = nEgysz.findIndex((k) => Math.abs(k) > 1e-9);
  const arany = egeszE && elsoIdx >= 0 ? n[elsoIdx] / nEgysz[elsoIdx] : 1;
  const dEgysz = egeszE ? d / arany : d;

  const tav = ervenyes ? Math.abs(skalaris(n, Q) - d) / nH : NaN;
  const vn = skalaris(v, n);
  const dofes = ervenyes && Math.abs(vn) > 1e-12 ? (d - skalaris(n, P)) / vn : null;
  const Mpont = dofes != null ? [P[0] + dofes * v[0], P[1] + dofes * v[1], P[2] + dofes * v[2]] : null;
  const szog = ervenyes ? egyenesSikSzog(v, n) : NaN;

  const allit = (kulcs) => (i, val) =>
    setM((s) => ({ ...s, [kulcs]: s[kulcs].map((x, j) => (j === i ? val : x)) }));

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_1.5fr]">
        <div>
          <p className="text-[10.5px] font-bold tracking-[0.16em] text-naracs-600 uppercase">
            A sík három pontja
          </p>
          <div className="mt-3 space-y-3">
            <Harmas cim="A pont" szin="border-teal-200 bg-teal-50/60" ertekek={m.A} elonev="A" onChange={allit("A")} />
            <Harmas cim="B pont" szin="border-teal-200 bg-teal-50/60" ertekek={m.B} elonev="B" onChange={allit("B")} />
            <Harmas cim="C pont" szin="border-teal-200 bg-teal-50/60" ertekek={m.C} elonev="C" onChange={allit("C")} />
          </div>
          <p className="mt-4 text-[10.5px] font-bold tracking-[0.16em] text-naracs-600 uppercase">
            Külső pont és egy egyenes
          </p>
          <div className="mt-3 space-y-3">
            <Harmas cim="Q pont (távolsághoz)" szin="border-naracs-200 bg-naracs-50/60" ertekek={m.Q} elonev="Q" onChange={allit("Q")} />
            <Harmas cim="P₀ — az egyenes pontja" szin="border-violet-200 bg-violet-50/60" ertekek={m.P} elonev="P" onChange={allit("P")} />
            <Harmas cim="v — az egyenes irányvektora" szin="border-violet-200 bg-violet-50/60" ertekek={m.v} elonev="v" onChange={allit("v")} />
          </div>
          <button
            type="button"
            onClick={() => setM(ALAP2)}
            className="mt-3 rounded-lg bg-white px-3 py-1.5 text-[12px] font-medium text-petrol-600 ring-1 ring-petrol-200 transition hover:bg-petrol-50"
          >
            Alaphelyzet (a KF‑4/5/6 adatai)
          </button>
        </div>

        <div className="space-y-2.5">
          <Eredmeny cimke="A sík normálvektora és egyenlete">
            {ervenyes ? (
              <>
                <M>{`\\mathbf{n} = \\overrightarrow{AB}\\times\\overrightarrow{AC} = ${vekK(AB, 2)}\\times${vekK(AC, 2)} = ${vekK(n, 3)}`}</M>
                <div className="mt-1">
                  <M>{sikEgyenletK(n, d, 3)}</M>
                </div>
                {egeszE && Math.abs(arany) > 1.0001 && (
                  <div className="mt-1 text-[12.5px] text-petrol-600">
                    Legkisebb egész alak: <M>{sikEgyenletK(nEgysz, dEgysz, 0)}</M>
                  </div>
                )}
              </>
            ) : (
              <span className="text-rose-600">A három pont egy egyenesre esik — nem határoznak meg síkot.</span>
            )}
          </Eredmeny>

          <Eredmeny cimke="Q távolsága a síktól">
            {ervenyes ? (
              <>
                <M>{`d = \\frac{|\\mathbf{n}\\cdot\\mathbf{OQ} - d_0|}{|\\mathbf{n}|} = \\frac{|${szK(skalaris(n, Q), 3)} - ${d < 0 ? `(${szK(d, 3)})` : szK(d, 3)}|}{${szK(nH, 4)}} = ${szK(tav, 4)}`}</M>
                <div className="mt-1 text-[12.5px] text-petrol-600">
                  {tav < 1e-9 ? "A Q pont rajta van a síkon." : "A talppontot a Q-ból induló, n irányú egyenessel kapod meg."}
                </div>
              </>
            ) : (
              <span className="text-petrol-500">–</span>
            )}
          </Eredmeny>

          <Eredmeny cimke="Az egyenes döféspontja a síkkal">
            {!ervenyes ? (
              <span className="text-petrol-500">–</span>
            ) : Math.abs(vn) < 1e-12 ? (
              <span>
                <M>{"\\mathbf{v}\\cdot\\mathbf{n} = 0"}</M> — az egyenes párhuzamos a síkkal
                {Math.abs(skalaris(n, P) - d) < 1e-9 ? ", sőt benne is fekszik." : ", nincs döféspont."}
              </span>
            ) : (
              <>
                <M>{`t = \\frac{d_0 - \\mathbf{n}\\cdot\\mathbf{OP_0}}{\\mathbf{n}\\cdot\\mathbf{v}} = \\frac{${szK(d, 3)} - ${skalaris(n, P) < 0 ? `(${szK(skalaris(n, P), 3)})` : szK(skalaris(n, P), 3)}}{${szK(vn, 3)}} = ${szK(dofes, 4)}`}</M>
                <div className="mt-1">
                  <M>{`M = ${vekK(Mpont, 4)}`}</M>
                </div>
                <div className="mt-1 text-[12px] text-petrol-500">
                  Próba: n·M = {sz(skalaris(n, Mpont), 4)}, a jobb oldal {sz(d, 4)}.
                </div>
              </>
            )}
          </Eredmeny>

          <Eredmeny cimke="Az egyenes és a sík hajlásszöge">
            {ervenyes ? (
              <>
                <M>{`\\sin\\alpha = \\frac{|\\mathbf{v}\\cdot\\mathbf{n}|}{|\\mathbf{v}||\\mathbf{n}|} = \\frac{${szK(Math.abs(vn), 3)}}{${szK(hossz(v), 4)}\\cdot ${szK(nH, 4)}} = ${szK(Math.sin((szog * Math.PI) / 180), 4)}`}</M>
                <div className="mt-1">
                  <M>{`\\alpha = ${szK(szog, 2)}^\\circ`}</M>
                </div>
                <div className="mt-1 text-[12px] text-petrol-500">
                  Itt <strong>szinusz</strong> van, mert a normálvektorral számolunk: a normálissal bezárt szög és a
                  síkkal bezárt szög egymást 90°-ra egészíti ki.
                </div>
              </>
            ) : (
              <span className="text-petrol-500">–</span>
            )}
          </Eredmeny>
        </div>
      </div>
    </div>
  );
}
