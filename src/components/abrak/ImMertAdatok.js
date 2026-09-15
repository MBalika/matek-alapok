"use client";

import { useRef, useState } from "react";
import FvRajz, { fvSkala } from "./FvRajz";
import { Fogopont } from "./SvgElemek";
import { M } from "@/components/ui/Keplet";
import { sz } from "@/lib/szamok";
import { simpsonSuly, trapezSuly } from "./ImNumerika";

const TEAL = "#0f766e";
const NAR = "#e2590a";

const SZELES = 560;
const MAGAS = 330;

const ESETEK = [
  {
    id: "meder",
    nev: "Folyómeder",
    xs: [0, 2, 4, 6, 8, 10, 12, 14, 16],
    alap: [0, -0.8, -1.6, -2.3, -2.6, -2.4, -1.7, -0.9, 0],
    yMin: -3.4,
    yMax: 0.85,
    yLehet: [-3.2, 0],
    xEgyseg: "m",
    yEgyseg: "m",
    xCimke: "part menti távolság (m)",
    yCimke: "mélység (m)",
    eredmenyNev: "Keresztmetszeti terület",
    eredmenyEgyseg: "m²",
    elojel: -1,
    tovabbNev: "Vízhozam v = 0,8 m/s-nál",
    tovabbEgyseg: "m³/s",
    tovabbSzorzo: 0.8,
    leiras:
      "A folyó szelvényében kilenc helyen mérték meg a vízmélységet, 2 méterenként. A keresztmetszeti terület az a mennyiség, amiből a vízhozam számolható — képlet nincs, csak kilenc szám.",
  },
  {
    id: "sebesseg",
    nev: "Sebesség–idő",
    xs: [0, 2, 4, 6, 8, 10, 12, 14, 16],
    alap: [0, 5.2, 9.1, 12, 13.4, 13, 10.6, 6.2, 0],
    yMin: 0,
    yMax: 16,
    yLehet: [0, 15.5],
    xEgyseg: "s",
    yEgyseg: "m/s",
    xCimke: "idő (s)",
    yCimke: "sebesség (m/s)",
    eredmenyNev: "Megtett út",
    eredmenyEgyseg: "m",
    elojel: 1,
    tovabbNev: "Átlagsebesség",
    tovabbEgyseg: "m/s",
    tovabbSzorzo: 1 / 16,
    leiras:
      "Egy jármű sebességét 2 másodpercenként olvasták le. A megtett út a sebesség–idő görbe alatti terület — ez a határozott integrál, csak éppen képlet nélkül.",
  },
];

export default function ImMertAdatok() {
  const [e, setE] = useState(0);
  const eset = ESETEK[e];
  const [ertekek, setErtekek] = useState(ESETEK.map((k) => [...k.alap]));
  const [huzott, setHuzott] = useState(null);
  const svgRef = useRef(null);

  const ys = ertekek[e];
  const xs = eset.xs;
  const n = xs.length - 1;
  const h = (xs[n] - xs[0]) / n;

  const S = fvSkala({
    xMin: xs[0] - 1,
    xMax: xs[n] + 1,
    yMin: eset.yMin,
    yMax: eset.yMax,
    szelesseg: SZELES,
    magassag: MAGAS,
  });

  const jel = eset.elojel;
  const trapezOsszeg = (h / 2) * ys.reduce((s, y, i) => s + trapezSuly(i, n) * y, 0) * jel;
  const simpsonOsszeg = (h / 3) * ys.reduce((s, y, i) => s + simpsonSuly(i, n) * y, 0) * jel;

  const huzas = (ev, k) => {
    ev.preventDefault();
    setHuzott(k);
    const svg = svgRef.current;
    if (!svg) return;
    const mozgat = (esem) => {
      const rect = svg.getBoundingClientRect();
      const my = ((esem.clientY - rect.top) / rect.height) * MAGAS;
      const y = Math.max(eset.yLehet[0], Math.min(eset.yLehet[1], S.yBol(my)));
      setErtekek((elozo) => {
        const uj = elozo.map((sor) => [...sor]);
        uj[e][k] = Math.round(y * 10) / 10;
        return uj;
      });
    };
    mozgat(ev);
    const vege = () => {
      setHuzott(null);
      window.removeEventListener("pointermove", mozgat);
      window.removeEventListener("pointerup", vege);
    };
    window.addEventListener("pointermove", mozgat);
    window.addEventListener("pointerup", vege);
  };

  const visszaallit = () =>
    setErtekek((elozo) => {
      const uj = elozo.map((sor) => [...sor]);
      uj[e] = [...eset.alap];
      return uj;
    });

  const teruletUt = `M${S.px(xs[0])},${S.py(0)} ${xs
    .map((x, i) => `L${S.px(x)},${S.py(ys[i])}`)
    .join(" ")} L${S.px(xs[n])},${S.py(0)} Z`;

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <FvRajz
            xMin={xs[0] - 1}
            xMax={xs[n] + 1}
            yMin={eset.yMin}
            yMax={eset.yMax}
            magassag={MAGAS}
            svgRef={svgRef}
            className="abra w-full touch-none select-none"
            tengelyCimkek={{ x: "", y: "" }}
          >
            {(Sk) => (
              <g>
                <path d={teruletUt} fill={TEAL} fillOpacity="0.16" />
                {xs.map((x, i) => (
                  <line
                    key={`f${i}`}
                    x1={Sk.px(x)}
                    y1={Sk.py(0)}
                    x2={Sk.px(x)}
                    y2={Sk.py(ys[i])}
                    stroke="#94a3b8"
                    strokeWidth="0.9"
                    strokeDasharray="3 3"
                  />
                ))}
                <polyline
                  points={xs.map((x, i) => `${Sk.px(x)},${Sk.py(ys[i])}`).join(" ")}
                  fill="none"
                  stroke={TEAL}
                  strokeWidth="2.4"
                />
                {xs.map((x, i) => (
                  <g key={`p${i}`}>
                    <Fogopont x={Sk.px(x)} y={Sk.py(ys[i])} szin={huzott === i ? NAR : "#0f766e"} onPointerDown={(ev) => huzas(ev, i)} />
                    <text
                      x={Sk.px(x)}
                      y={Sk.py(ys[i]) + (eset.elojel < 0 ? -12 : -13)}
                      fontSize="10.5"
                      fontWeight="650"
                      textAnchor="middle"
                      style={{ fill: "#1d3c48", paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
                    >
                      {sz(Math.abs(ys[i]), 1)}
                    </text>
                  </g>
                ))}
                <text x={Sk.margo.bal + 6} y={Sk.margo.fel + 14} fontSize="11.5" fill="#64748b">
                  {eset.yCimke}
                </text>
                <text x={Sk.margo.bal + Sk.w} y={Sk.magassag - 4} fontSize="11.5" fill="#64748b" textAnchor="end">
                  {eset.xCimke}
                </text>
              </g>
            )}
          </FvRajz>
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            Húzd függőlegesen a pontokat — az integrál élőben újraszámolódik. Így számol a mérnök, amikor nincs képlet.
          </p>
        </div>

        <div className="p-5">
          <div className="flex flex-wrap gap-1.5">
            {ESETEK.map((k, j) => (
              <button
                key={k.id}
                type="button"
                onClick={() => setE(j)}
                className={`rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition ${
                  e === j ? "bg-petrol-700 text-white" : "bg-white text-petrol-600 ring-1 ring-petrol-200 hover:bg-petrol-50"
                }`}
              >
                {k.nev}
              </button>
            ))}
            <button
              type="button"
              onClick={visszaallit}
              className="rounded-lg bg-white px-2.5 py-1.5 text-[12px] font-medium text-petrol-500 ring-1 ring-petrol-200 transition hover:bg-petrol-50"
            >
              Alaphelyzet ↻
            </button>
          </div>

          <p className="mt-3 text-[13.5px] leading-relaxed text-petrol-700">{eset.leiras}</p>

          <div className="szamok mt-4 text-[13.5px] text-petrol-900">
            <M>{`n = ${n},\\quad h = ${sz(h, 0)}\\ \\text{${eset.xEgyseg}}`}</M>
          </div>

          <div className="mt-3 space-y-2">
            <div className="rounded-xl border border-naracs-200 bg-naracs-50 px-4 py-3">
              <p className="text-[11px] font-bold tracking-[0.14em] text-naracs-700 uppercase">Trapézszabály</p>
              <p className="szamok mt-1 text-[18px] font-semibold text-petrol-900">
                {sz(trapezOsszeg, 3)} {eset.eredmenyEgyseg}
              </p>
              <p className="szamok mt-1 text-[11.5px] text-petrol-500">súlyok: 1, 2, 2, 2, 2, 2, 2, 2, 1</p>
            </div>
            <div className="rounded-xl border border-violet-200 bg-violet-50 px-4 py-3">
              <p className="text-[11px] font-bold tracking-[0.14em] text-violet-700 uppercase">Simpson-szabály</p>
              <p className="szamok mt-1 text-[18px] font-semibold text-petrol-900">
                {sz(simpsonOsszeg, 3)} {eset.eredmenyEgyseg}
              </p>
              <p className="szamok mt-1 text-[11.5px] text-petrol-500">súlyok: 1, 4, 2, 4, 2, 4, 2, 4, 1</p>
            </div>
            <div className="rounded-xl bg-petrol-50 px-4 py-3">
              <p className="text-[12px] text-petrol-500">{eset.tovabbNev}</p>
              <p className="szamok text-[15px] font-semibold text-petrol-800">
                {sz(simpsonOsszeg * eset.tovabbSzorzo, 3)} {eset.tovabbEgyseg}
              </p>
            </div>
          </div>

          <div className="mt-3 overflow-hidden rounded-xl border border-petrol-100">
            <table className="szamok w-full text-[12px]">
              <thead className="bg-petrol-50 text-petrol-500">
                <tr>
                  <th className="px-2 py-1.5 text-left font-semibold">i</th>
                  <th className="px-2 py-1.5 text-right font-semibold">xᵢ</th>
                  <th className="px-2 py-1.5 text-right font-semibold">yᵢ</th>
                  <th className="px-2 py-1.5 text-right font-semibold">trapéz</th>
                  <th className="px-2 py-1.5 text-right font-semibold">Simpson</th>
                </tr>
              </thead>
              <tbody className="text-petrol-800">
                {xs.map((x, i) => (
                  <tr key={i} className="border-t border-petrol-100">
                    <td className="px-2 py-0.5">{i}</td>
                    <td className="px-2 py-0.5 text-right">{sz(x, 0)}</td>
                    <td className="px-2 py-0.5 text-right">{sz(Math.abs(ys[i]), 1)}</td>
                    <td className="px-2 py-0.5 text-right text-naracs-700">{trapezSuly(i, n)}</td>
                    <td className="px-2 py-0.5 text-right text-violet-700">{simpsonSuly(i, n)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-[12.5px] text-petrol-500">
            Figyeld meg: a két eredmény közel van egymáshoz, de nem azonos. Mért adatoknál a Simpson-szabály általában
            jobb — feltéve, hogy a mérési pontok elég sűrűek, és nincs köztük ugrás.
          </p>
        </div>
      </div>
    </div>
  );
}
