"use client";

import { useMemo, useState } from "react";
import { Csuszka } from "./Csuszka";
import { M } from "@/components/ui/Keplet";
import { sz } from "@/lib/szamok";

/**
 * Görbe-felfedező: paraméteres és polárkoordinátás görbék „rajzolódnak ki”
 * a t (illetve φ) csúszka mozgatásával. A mozgó pont és a pillanatnyi
 * koordináták végig láthatók.
 */

const SZ = 560;
const MA = 400;
const OX = SZ / 2;
const OY = MA / 2;

const GORBEK = [
  {
    id: "kor",
    cimke: "Kör",
    tipus: "parameteres",
    latex: "x = 2\\cos t,\\qquad y = 2\\sin t",
    implicit: "x^2+y^2 = 4",
    t0: 0,
    t1: 2 * Math.PI,
    pont: (t) => ({ x: 2 * Math.cos(t), y: 2 * Math.sin(t) }),
    magyarazat:
      "A legfontosabb paraméterezés. A t itt a középponti szög: az x² + y² = R² egyenletbe visszahelyettesítve a cos² + sin² = 1 azonosság adja az eredményt.",
  },
  {
    id: "ellipszis",
    cimke: "Ellipszis",
    tipus: "parameteres",
    latex: "x = 3\\cos t,\\qquad y = 1{,}6\\sin t",
    implicit: "\\frac{x^2}{9}+\\frac{y^2}{2{,}56} = 1",
    t0: 0,
    t1: 2 * Math.PI,
    pont: (t) => ({ x: 3 * Math.cos(t), y: 1.6 * Math.sin(t) }),
    magyarazat:
      "A t itt NEM a pont irányszöge, csak segédparaméter: a kört „széthúzzuk” vízszintesen a-szorosára, függőlegesen b-szeresére.",
  },
  {
    id: "ciklois",
    cimke: "Ciklois",
    tipus: "parameteres",
    latex: "x = t-\\sin t,\\qquad y = 1-\\cos t",
    t0: 0,
    t1: 4 * Math.PI,
    pont: (t) => ({ x: t - Math.sin(t) - 2 * Math.PI, y: 1 - Math.cos(t) - 1 }),
    gorduloKor: true,
    magyarazat:
      "A csúszásmentesen guruló kör kerületén megjelölt pont pályája. Ez a brachisztochron: két pont között ezen a lejtőn gurul le a golyó a leggyorsabban — nem az egyenesen!",
  },
  {
    id: "lissajous",
    cimke: "Lissajous",
    tipus: "parameteres",
    latex: "x = 3\\sin(3t),\\qquad y = 2\\sin(2t)",
    t0: 0,
    t1: 2 * Math.PI,
    pont: (t) => ({ x: 3 * Math.sin(3 * t), y: 2 * Math.sin(2 * t) }),
    magyarazat:
      "Két merőleges rezgés összetétele. Az oszcilloszkópon ilyen ábrából olvasható le két jel frekvenciaaránya — itt 3 : 2.",
  },
  {
    id: "kardioid",
    cimke: "Kardioid",
    tipus: "polar",
    latex: "r = 1{,}6\\,(1+\\cos\\varphi)",
    t0: 0,
    t1: 2 * Math.PI,
    r: (f) => 1.6 * (1 + Math.cos(f)),
    magyarazat:
      "A „szívgörbe”: egy körön kívül gördülő, azonos sugarú kör egy pontjának pályája. A φ = π helyen r = 0 — itt van a csúcs.",
  },
  {
    id: "spiral",
    cimke: "Arkhimédész-spirál",
    tipus: "polar",
    latex: "r = 0{,}45\\,\\varphi",
    t0: 0,
    t1: 6 * Math.PI,
    r: (f) => 0.45 * f,
    magyarazat:
      "A menetek távolsága ÁLLANDÓ (itt 2π·0,45 ≈ 2,83), mert r egyenletesen nő a szöggel. Ilyen a feltekert kötél vagy a hanglemez barázdája.",
  },
  {
    id: "logspiral",
    cimke: "Logaritmikus spirál",
    tipus: "polar",
    latex: "r = 0{,}26\\,e^{0{,}22\\varphi}",
    t0: 0,
    t1: 6.5 * Math.PI,
    r: (f) => 0.26 * Math.exp(0.22 * f),
    magyarazat:
      "A menetek távolsága MÉRTANI sorozat szerint nő, ezért a görbe önmagához hasonló: bármilyen nagyításban ugyanúgy néz ki. Csigaház, galaxiskar, ciklon.",
  },
  {
    id: "rozsa",
    cimke: "Négyszirmú rózsa",
    tipus: "polar",
    latex: "r = 2{,}6\\,|\\cos 2\\varphi|",
    t0: 0,
    t1: 2 * Math.PI,
    r: (f) => 2.6 * Math.abs(Math.cos(2 * f)),
    magyarazat:
      "Páros együtthatónál kétszer annyi szirom lesz, mint az együttható: cos 2φ → négy szirom, cos 3φ → három.",
  },
];

function pontja(g, t) {
  if (g.tipus === "polar") {
    const r = g.r(t);
    return { x: r * Math.cos(t), y: r * Math.sin(t) };
  }
  return g.pont(t);
}

export default function FvGorbeFelfedezo() {
  const [i, setI] = useState(0);
  const g = GORBEK[i];
  const [t, setT] = useState(g.t1);

  const valt = (j) => {
    setI(j);
    setT(GORBEK[j].t1);
  };

  const tBiztos = Math.max(g.t0, Math.min(g.t1, t));

  // teljes görbe mintavétele + lépték
  const { pontok, lept } = useMemo(() => {
    const db = 900;
    const p = [];
    for (let k = 0; k <= db; k++) {
      const tt = g.t0 + ((g.t1 - g.t0) * k) / db;
      p.push({ t: tt, ...pontja(g, tt) });
    }
    const maxAbsX = Math.max(...p.map((q) => Math.abs(q.x)), 0.5);
    const maxAbsY = Math.max(...p.map((q) => Math.abs(q.y)), 0.5);
    const l = Math.min((SZ / 2 - 40) / maxAbsX, (MA / 2 - 32) / maxAbsY);
    return { pontok: p, lept: l };
  }, [g]);

  const px = (x) => OX + x * lept;
  const py = (y) => OY - y * lept;

  const rajzolt = pontok.filter((q) => q.t <= tBiztos + 1e-9);
  const utvonal = rajzolt.map((q, k) => `${k ? "L" : "M"}${px(q.x).toFixed(1)},${py(q.y).toFixed(1)}`).join(" ");
  const teljes = pontok.map((q, k) => `${k ? "L" : "M"}${px(q.x).toFixed(1)},${py(q.y).toFixed(1)}`).join(" ");

  const P = pontja(g, tBiztos);
  const rErtek = g.tipus === "polar" ? g.r(tBiztos) : Math.hypot(P.x, P.y);

  // a guruló kör a cikloishoz
  const korKozep = g.gorduloKor
    ? { x: tBiztos - 2 * Math.PI, y: 0 }
    : null;

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <svg viewBox={`0 0 ${SZ} ${MA}`} className="abra w-full touch-none select-none">
            {/* tengelyek */}
            <line x1="14" y1={OY} x2={SZ - 10} y2={OY} stroke="#94a3b8" strokeWidth="1.1" />
            <line x1={OX} y1={MA - 10} x2={OX} y2="10" stroke="#94a3b8" strokeWidth="1.1" />
            <text x={SZ - 14} y={OY - 7} fontSize="11.5" fontStyle="italic" fill="#64748b" textAnchor="end">
              x
            </text>
            <text x={OX + 7} y="18" fontSize="11.5" fontStyle="italic" fill="#64748b">
              y
            </text>
            {[-3, -2, -1, 1, 2, 3].map((v) =>
              Math.abs(px(v) - OX) < SZ / 2 - 24 ? (
                <g key={`x${v}`}>
                  <line x1={px(v)} y1={OY - 3.5} x2={px(v)} y2={OY + 3.5} stroke="#94a3b8" strokeWidth="1" />
                  <text x={px(v)} y={OY + 15} fontSize="10" fill="#94a3b8" textAnchor="middle">
                    {v}
                  </text>
                </g>
              ) : null,
            )}

            {/* polár segédsugár */}
            {g.tipus === "polar" && (
              <>
                <line
                  x1={OX}
                  y1={OY}
                  x2={px(P.x)}
                  y2={py(P.y)}
                  stroke="#7c3aed"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                />
                <path
                  d={`M ${OX + 30} ${OY} A 30 30 0 ${Math.abs(tBiztos % (2 * Math.PI)) > Math.PI ? 1 : 0} 0 ${
                    OX + 30 * Math.cos(tBiztos)
                  } ${OY - 30 * Math.sin(tBiztos)}`}
                  fill="none"
                  stroke="#7c3aed"
                  strokeWidth="1.3"
                />
                <text x={OX + 38} y={OY - 10} fontSize="11.5" fontWeight="650" fill="#7c3aed">
                  φ
                </text>
              </>
            )}

            {/* guruló kör (ciklois) */}
            {korKozep && (
              <>
                <line
                  x1={px(-2 * Math.PI)}
                  y1={py(-1)}
                  x2={px(2 * Math.PI)}
                  y2={py(-1)}
                  stroke="#94a3b8"
                  strokeWidth="1.2"
                />
                <circle
                  cx={px(korKozep.x)}
                  cy={py(korKozep.y)}
                  r={lept}
                  fill="none"
                  stroke="#e2590a"
                  strokeWidth="1.5"
                  opacity="0.75"
                />
                <line
                  x1={px(korKozep.x)}
                  y1={py(korKozep.y)}
                  x2={px(P.x)}
                  y2={py(P.y)}
                  stroke="#e2590a"
                  strokeWidth="1.4"
                  opacity="0.8"
                />
              </>
            )}

            {/* halvány teljes görbe + a kirajzolt rész */}
            <path d={teljes} fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4 4" />
            {rajzolt.length > 1 && (
              <path
                d={utvonal}
                fill="none"
                stroke="#0f766e"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            <circle cx={px(P.x)} cy={py(P.y)} r="6" fill="#e2590a" stroke="white" strokeWidth="2" />
            <text
              x={px(P.x) > SZ - 120 ? px(P.x) - 11 : px(P.x) + 11}
              y={py(P.y) < 30 ? py(P.y) + 18 : py(P.y) - 9}
              fontSize="12"
              fontWeight="650"
              textAnchor={px(P.x) > SZ - 120 ? "end" : "start"}
              style={{ fill: "#e2590a", paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
            >
              ({sz(P.x, 2)}; {sz(P.y, 2)})
            </text>
          </svg>
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            A szaggatott szürke a teljes görbe; a zöld az, ami a pillanatnyi paraméterig megrajzolódott.
          </p>
        </div>

        <div className="p-5">
          <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">
            Paraméteres görbék
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {GORBEK.filter((k) => k.tipus === "parameteres").map((k) => (
              <button
                key={k.id}
                type="button"
                onClick={() => valt(GORBEK.indexOf(k))}
                className={`rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition ${
                  g.id === k.id
                    ? "bg-petrol-700 text-white"
                    : "bg-white text-petrol-600 ring-1 ring-petrol-200 hover:bg-petrol-50"
                }`}
              >
                {k.cimke}
              </button>
            ))}
          </div>
          <p className="mt-3 text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">
            Polárkoordinátás görbék
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {GORBEK.filter((k) => k.tipus === "polar").map((k) => (
              <button
                key={k.id}
                type="button"
                onClick={() => valt(GORBEK.indexOf(k))}
                className={`rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition ${
                  g.id === k.id
                    ? "bg-violet-700 text-white"
                    : "bg-white text-violet-700 ring-1 ring-violet-200 hover:bg-violet-50"
                }`}
              >
                {k.cimke}
              </button>
            ))}
          </div>

          <div className="szamok mt-4 text-[15px] text-petrol-900">
            <M>{g.latex}</M>
          </div>
          {g.implicit && (
            <p className="szamok mt-1 text-[13px] text-petrol-500">
              implicit alakban: <M>{g.implicit}</M>
            </p>
          )}

          <div className="mt-4">
            <Csuszka
              cimke={g.tipus === "polar" ? "A szög, φ (radián)" : "A paraméter, t"}
              ertek={tBiztos}
              min={g.t0}
              max={g.t1}
              lepes={0.01}
              tizedes={2}
              onChange={setT}
            />
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {[0, 0.25, 0.5, 0.75, 1].map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => setT(g.t0 + (g.t1 - g.t0) * u)}
                className="rounded-lg bg-white px-2.5 py-1.5 text-[12px] font-medium text-petrol-600 ring-1 ring-petrol-200 transition hover:bg-petrol-50"
              >
                {u === 0 ? "eleje" : u === 1 ? "teljes" : `${u * 100} %`}
              </button>
            ))}
          </div>

          <div className="mt-4 rounded-xl bg-petrol-50 p-4">
            <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">
              A mozgó pont
            </p>
            <div className="szamok mt-1.5 space-y-0.5 text-[13.5px] text-petrol-900">
              <p>
                {g.tipus === "polar" ? "φ" : "t"} = {sz(tBiztos, 3)} rad ={" "}
                {sz((tBiztos * 180) / Math.PI, 1)}°
              </p>
              <p>
                x = {sz(P.x, 3)} &nbsp;·&nbsp; y = {sz(P.y, 3)}
              </p>
              <p>r = {sz(rErtek, 3)}</p>
            </div>
          </div>

          <p className="mt-3 text-[12.5px] leading-relaxed text-petrol-600">{g.magyarazat}</p>

          <p className="mt-3 text-[12.5px] leading-relaxed text-petrol-500">
            Figyeld meg: ezeknek a görbéknek a nagy része <strong>nem függvénygrafikon</strong> — egy
            függőleges egyenes több pontban is metszi őket. Épp ezért kell a paraméteres és a polár
            megadás.
          </p>
        </div>
      </div>
    </div>
  );
}
