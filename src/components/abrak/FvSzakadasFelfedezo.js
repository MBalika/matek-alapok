"use client";

import { useState } from "react";
import FvRajz from "./FvRajz";
import { Csuszka } from "./Csuszka";
import { M } from "@/components/ui/Keplet";
import { sz, szK } from "@/lib/szamok";

/**
 * Szakadás-felfedező: darabonként megadott függvény egy c paraméterrel.
 * A bal és a jobb oldali határérték, az ugrás nagysága és a folytonossá tevő
 * c élőben számolódik. Három eset: megszüntethető, ugrás, pólus.
 */

const ESETEK = [
  {
    id: "megszuntetheto",
    cimke: "Megszüntethető",
    cim: "Az előadás 10.2 példája",
    latex:
      "f(x) = \\begin{cases} \\dfrac{x^2-1}{x-1}, & x \\ne 1\\\\[6pt] c, & x = 1\\end{cases}",
    x0: 1,
    bal: 2,
    jobb: 2,
    cJo: 2,
    ertek: (c) => c,
    fn: (x) => (x * x - 1) / (x - 1),
    xMin: -1.5,
    xMax: 3.5,
    yMin: -1.5,
    yMax: 5.5,
    cMin: -1,
    cMax: 5,
    tipus: "megszüntethető szakadás",
    magyarazat:
      "A két egyoldali határérték egyenlő és véges (mindkettő 2), csak a függvényérték lóg ki. Egyetlen érték átdefiniálásával a szakadás megszűnik.",
  },
  {
    id: "ugras",
    cimke: "Ugrás (elsőfajú)",
    cim: "Két darab illesztése",
    latex:
      "f(x) = \\begin{cases} c\\,x+1, & x < 1\\\\[4pt] 4-x^2, & x \\ge 1\\end{cases}",
    x0: 1,
    balF: (c) => c + 1,
    jobbF: () => 3,
    cJo: 2,
    ertek: () => 3,
    fnBal: (c) => (x) => c * x + 1,
    fnJobb: () => (x) => 4 - x * x,
    xMin: -1.5,
    xMax: 3,
    yMin: -4,
    yMax: 6,
    cMin: -2,
    cMax: 5,
    tipus: "ugrás (elsőfajú szakadás)",
    magyarazat:
      "Mindkét egyoldali határérték véges, de általában különböznek — ez az ugrás. Pontosan egyetlen c mellett esnek egybe, és akkor lesz a függvény folytonos.",
  },
  {
    id: "polus",
    cimke: "Pólus (másodfajú)",
    cim: "Amit semmilyen c nem ment meg",
    latex:
      "f(x) = \\begin{cases} \\dfrac{1}{x-1}, & x \\ne 1\\\\[6pt] c, & x = 1\\end{cases}",
    x0: 1,
    bal: -Infinity,
    jobb: Infinity,
    cJo: null,
    ertek: (c) => c,
    fn: (x) => 1 / (x - 1),
    xMin: -1.5,
    xMax: 3.5,
    yMin: -6,
    yMax: 6,
    cMin: -4,
    cMax: 4,
    tipus: "pólus (másodfajú szakadás)",
    magyarazat:
      "Az egyoldali határértékek végtelenek, ezért a függvényérték bármi lehet — a szakadás nem szüntethető meg. Az x = 1 függőleges aszimptota.",
  },
];

export default function FvSzakadasFelfedezo() {
  const [i, setI] = useState(0);
  const e = ESETEK[i];
  const [c, setC] = useState(e.cJo != null ? e.cJo - 1.5 : 1);

  const valt = (j) => {
    setI(j);
    const uj = ESETEK[j];
    setC(uj.cJo != null ? uj.cJo - 1.5 : 1);
  };

  const bal = e.balF ? e.balF(c) : e.bal;
  const jobb = e.jobbF ? e.jobbF(c) : e.jobb;
  const fx0 = e.ertek(c);
  const vegesek = Number.isFinite(bal) && Number.isFinite(jobb);
  const egyoldaliUgras = vegesek ? Math.abs(jobb - bal) : Infinity;
  // a képen jelölt rés: ugrásnál a két egyoldali határérték között,
  // megszüntethető szakadásnál a határérték és a függvényérték között
  const resAlso = vegesek ? (egyoldaliUgras > 1e-9 ? bal : bal) : null;
  const resFelso = vegesek ? (egyoldaliUgras > 1e-9 ? jobb : fx0) : null;
  const res = vegesek ? Math.abs(resFelso - resAlso) : Infinity;
  const resNev = egyoldaliUgras > 1e-9 ? "ugrás" : "rés";
  const folytonos = vegesek && egyoldaliUgras < 1e-9 && Math.abs(fx0 - bal) < 1e-9;

  const gorbek = e.fnBal
    ? [
        { fn: e.fnBal(c), tol: e.xMin, ig: e.x0, szin: "#0f766e", vastag: 2.8 },
        { fn: e.fnJobb(c), tol: e.x0, ig: e.xMax, szin: "#7c3aed", vastag: 2.8 },
      ]
    : [{ fn: e.fn, szin: "#0f766e", vastag: 2.6 }];

  const pontok = [{ x: e.x0, y: fx0, szin: "#e2590a", r: 5.5, cimke: `f(${sz(e.x0, 0)}) = ${sz(fx0, 2)}` }];
  if (Number.isFinite(bal))
    pontok.push({ x: e.x0, y: bal, szin: "#0f766e", ures: true, r: 5 });
  if (Number.isFinite(jobb) && Math.abs(jobb - bal) > 1e-9)
    pontok.push({ x: e.x0, y: jobb, szin: "#7c3aed", ures: true, r: 5 });

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <FvRajz
            xMin={e.xMin}
            xMax={e.xMax}
            yMin={e.yMin}
            yMax={e.yMax}
            magassag={360}
            gorbek={gorbek}
            pontok={pontok}
            fuggoleges={[{ x: e.x0, szin: "#94a3b8" }]}
          >
            {(S) =>
              Number.isFinite(res) && res > 1e-6 ? (
                <g>
                  <line
                    x1={S.px(e.x0)}
                    y1={S.py(resAlso)}
                    x2={S.px(e.x0)}
                    y2={S.py(resFelso)}
                    stroke="#dc2626"
                    strokeWidth="4"
                    strokeLinecap="round"
                    opacity="0.85"
                  />
                  <text
                    x={S.px(e.x0) - 10}
                    y={(S.py(resAlso) + S.py(resFelso)) / 2 + 4}
                    fontSize="12"
                    fontWeight="700"
                    textAnchor="end"
                    style={{
                      fill: "#dc2626",
                      paintOrder: "stroke",
                      stroke: "white",
                      strokeWidth: 3.5,
                    }}
                  >
                    {resNev}: {sz(res, 2)}
                  </text>
                </g>
              ) : null
            }
          </FvRajz>
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            Az üres körök az egyoldali határértékek, a tömött narancs a tényleges függvényérték.
          </p>
        </div>

        <div className="p-5">
          <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">
            Szakadástípus
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {ESETEK.map((k, j) => (
              <button
                key={k.id}
                type="button"
                onClick={() => valt(j)}
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

          <p className="mt-3 text-[12.5px] font-semibold text-petrol-500">{e.cim}</p>
          <div className="szamok mt-1 text-[14px] text-petrol-900">
            <M>{e.latex}</M>
          </div>

          <div className="mt-4">
            <Csuszka
              cimke="A paraméter, c"
              ertek={c}
              min={e.cMin}
              max={e.cMax}
              lepes={0.05}
              tizedes={2}
              onChange={setC}
            />
          </div>
          {e.cJo != null && (
            <button
              type="button"
              onClick={() => setC(e.cJo)}
              className="mt-2 rounded-lg bg-naracs-500 px-3 py-1.5 text-[12px] font-semibold text-white transition hover:bg-naracs-600"
            >
              Állítsd a folytonossá tevő értékre
            </button>
          )}

          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg border border-petrol-200 bg-white px-2 py-2">
              <p className="text-[10px] font-bold tracking-wider text-petrol-500 uppercase">
                bal oldali
              </p>
              <p className="szamok mt-0.5 text-[14px] font-semibold text-petrol-900">
                {Number.isFinite(bal) ? sz(bal, 2) : bal < 0 ? "−∞" : "+∞"}
              </p>
            </div>
            <div className="rounded-lg border border-naracs-300 bg-naracs-50 px-2 py-2">
              <p className="text-[10px] font-bold tracking-wider text-naracs-700 uppercase">
                f(x₀)
              </p>
              <p className="szamok mt-0.5 text-[14px] font-semibold text-naracs-900">{sz(fx0, 2)}</p>
            </div>
            <div className="rounded-lg border border-petrol-200 bg-white px-2 py-2">
              <p className="text-[10px] font-bold tracking-wider text-petrol-500 uppercase">
                jobb oldali
              </p>
              <p className="szamok mt-0.5 text-[14px] font-semibold text-petrol-900">
                {Number.isFinite(jobb) ? sz(jobb, 2) : jobb < 0 ? "−∞" : "+∞"}
              </p>
            </div>
          </div>

          <div
            className={`mt-3 rounded-xl border px-4 py-3 text-[13.5px] leading-relaxed ${
              folytonos
                ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                : "border-rose-200 bg-rose-50 text-rose-900"
            }`}
          >
            {folytonos ? (
              <>
                <strong>Folytonos az x₀ helyen.</strong> Mindhárom feltétel teljesül: létezik a
                határérték, létezik a függvényérték, és a kettő egyenlő.
              </>
            ) : (
              <>
                <strong>Itt {e.tipus} van.</strong>{" "}
                {Number.isFinite(res) ? (
                  <>
                    A {resNev} nagysága <span className="szamok font-semibold">{sz(res, 3)}</span>.
                    {e.cJo != null && (
                      <>
                        {" "}
                        Folytonossá tevő érték: <M>{`c = ${szK(e.cJo, 2)}`}</M>.
                      </>
                    )}
                  </>
                ) : (
                  <>Az egyoldali határértékek végtelenek — semmilyen c nem segít.</>
                )}
              </>
            )}
          </div>

          <p className="mt-3 text-[12.5px] leading-relaxed text-petrol-600">{e.magyarazat}</p>
        </div>
      </div>
    </div>
  );
}
