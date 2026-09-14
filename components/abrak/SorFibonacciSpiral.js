"use client";

import { useEffect, useMemo, useState } from "react";
import SorRajz from "./SorRajz";
import { M } from "@/components/ui/Keplet";
import { sz, szK } from "@/lib/szamok";

const SZ = 560;
const MA = 350;
const FI = (1 + Math.sqrt(5)) / 2;

const FIB = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987];

/** A négyzetekből álló aranyspirál geometriája (matematikai koordinátákban). */
const NEGYZETEK = (() => {
  const lista = [];
  // az induló négyzet: [0,1]×[0,1], az íve a „le” szabály szerint viselkedik
  let doboz = { x0: 0, y0: 0, x1: 1, y1: 1 };
  lista.push({ x: 0, y: 0, f: 1, irany: "le", index: 1 });
  const iranyok = ["jobbra", "fel", "balra", "le"];
  for (let k = 1; k < 10; k++) {
    const irany = iranyok[(k - 1) % 4];
    const f = FIB[k];
    let n;
    if (irany === "jobbra") {
      n = { x: doboz.x1, y: doboz.y0, f, irany, index: k + 1 };
      doboz = { ...doboz, x1: doboz.x1 + f };
    } else if (irany === "fel") {
      n = { x: doboz.x0, y: doboz.y1, f, irany, index: k + 1 };
      doboz = { ...doboz, y1: doboz.y1 + f };
    } else if (irany === "balra") {
      n = { x: doboz.x0 - f, y: doboz.y0, f, irany, index: k + 1 };
      doboz = { ...doboz, x0: doboz.x0 - f };
    } else {
      n = { x: doboz.x0, y: doboz.y0 - f, f, irany, index: k + 1 };
      doboz = { ...doboz, y0: doboz.y0 - f };
    }
    lista.push(n);
  }
  return lista;
})();

/** Az ív középpontja és két végpontja irány szerint. */
function ivAdatok(negyzet) {
  const { x, y, f, irany } = negyzet;
  if (irany === "jobbra") return { cx: x, cy: y + f, p1: [x, y], p2: [x + f, y + f] };
  if (irany === "fel") return { cx: x, cy: y, p1: [x + f, y], p2: [x, y + f] };
  if (irany === "balra") return { cx: x + f, cy: y, p1: [x + f, y + f], p2: [x, y] };
  return { cx: x + f, cy: y + f, p1: [x, y + f], p2: [x + f, y] };
}

export default function SorFibonacciSpiral() {
  const [mod, setMod] = useState("spiral");
  const [db, setDb] = useState(NEGYZETEK.length);
  const [jatszik, setJatszik] = useState(false);

  useEffect(() => {
    if (!jatszik) return undefined;
    setDb(1);
    let k = 1;
    const id = setInterval(() => {
      k += 1;
      setDb(k);
      if (k >= NEGYZETEK.length) {
        clearInterval(id);
        setJatszik(false);
      }
    }, 620);
    return () => clearInterval(id);
  }, [jatszik]);

  const lathato = NEGYZETEK.slice(0, db);
  const hatar = lathato.reduce(
    (h, n) => ({
      x0: Math.min(h.x0, n.x),
      y0: Math.min(h.y0, n.y),
      x1: Math.max(h.x1, n.x + n.f),
      y1: Math.max(h.y1, n.y + n.f),
    }),
    { x0: 0, y0: 0, x1: 1, y1: 1 },
  );
  const szel = hatar.x1 - hatar.x0;
  const mag = hatar.y1 - hatar.y0;
  const S = Math.min((SZ - 60) / szel, (MA - 44) / mag);
  const X0 = (SZ - szel * S) / 2 - hatar.x0 * S;
  const Y0 = MA - (MA - mag * S) / 2 + hatar.y0 * S;
  const px = (x) => X0 + x * S;
  const py = (y) => Y0 - y * S;

  const hanyadosok = useMemo(
    () => FIB.slice(0, 15).map((f, i) => ({ n: i + 1, ertek: FIB[i + 1] / f })),
    [],
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          {mod === "spiral" ? (
            <svg viewBox={`0 0 ${SZ} ${MA}`} className="abra w-full select-none">
              {lathato.map((n, i) => {
                const ivek = ivAdatok(n);
                const r = n.f * S;
                const friss = i === db - 1 && db < NEGYZETEK.length;
                return (
                  <g key={n.index}>
                    <rect
                      x={px(n.x)}
                      y={py(n.y + n.f)}
                      width={n.f * S}
                      height={n.f * S}
                      fill={friss ? "rgba(226,89,10,0.12)" : "rgba(15,118,110,0.06)"}
                      stroke={friss ? "#e2590a" : "#8fb3bd"}
                      strokeWidth="1.2"
                    />
                    {n.f * S > 26 && (
                      <text
                        x={px(n.x + n.f / 2)}
                        y={py(n.y + n.f / 2) + 4}
                        textAnchor="middle"
                        fontSize={Math.min(15, Math.max(9, n.f * S * 0.2))}
                        fontWeight="650"
                        fill={friss ? "#e2590a" : "#5b7684"}
                      >
                        {n.f}
                      </text>
                    )}
                    <path
                      d={`M ${px(ivek.p1[0])} ${py(ivek.p1[1])} A ${r} ${r} 0 0 0 ${px(ivek.p2[0])} ${py(ivek.p2[1])}`}
                      fill="none"
                      stroke="#7c3aed"
                      strokeWidth="2.4"
                    />
                  </g>
                );
              })}
              <text x={14} y={20} fontSize="11" fill="#64748b">
                Fibonacci-négyzetek: minden új négyzet oldala az előző kettő oldalának összege.
              </text>
            </svg>
          ) : (
            <SorRajz
              tagok={hanyadosok}
              A={FI}
              yMin={0.85}
              yMax={2.15}
              nMin={1}
              nMax={15}
              magassag={MA}
              yCimke="Fₙ₊₁/Fₙ"
              pontMeret={4.6}
              szarral={false}
            />
          )}
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            {mod === "spiral"
              ? "A negyedkörök egymás folytatásai: ez az aranyspirál — a Fibonacci-négyzetekből épül."
              : "A hányadosok felváltva alulról és felülről közelítik az aranymetszés arányát."}
          </p>
        </div>

        <div className="p-5">
          <div className="flex flex-wrap gap-1.5">
            {[
              ["spiral", "Aranyspirál"],
              ["hanyados", "A hányadosok"],
            ].map(([kulcs, nev]) => (
              <button
                key={kulcs}
                type="button"
                onClick={() => setMod(kulcs)}
                className={`rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition ${
                  mod === kulcs ? "bg-petrol-700 text-white" : "bg-white text-petrol-600 ring-1 ring-petrol-200 hover:bg-petrol-50"
                }`}
              >
                {nev}
              </button>
            ))}
            {mod === "spiral" && (
              <button
                type="button"
                onClick={() => setJatszik(true)}
                disabled={jatszik}
                className="rounded-lg bg-naracs-500 px-3 py-1.5 text-[12px] font-semibold text-white transition hover:bg-naracs-600 disabled:opacity-60"
              >
                ▶ Építsük fel
              </button>
            )}
          </div>

          <div className="szamok mt-4 space-y-1.5 text-[13.5px] text-petrol-900">
            <div>
              <M>{"F_1 = F_2 = 1,\\qquad F_{n+2} = F_{n+1} + F_n"}</M>
            </div>
            <div>
              <M>{`\\lim_{n\\to\\infty} \\frac{F_{n+1}}{F_n} = \\frac{1+\\sqrt5}{2} = ${szK(FI, 6)}`}</M>
            </div>
          </div>

          <div className="finom-gorgeto mt-3 overflow-x-auto rounded-xl bg-petrol-50 p-3">
            <table className="szamok w-full text-[12.5px]">
              <thead className="text-[11px] font-semibold text-petrol-500">
                <tr>
                  <th className="pb-1 text-left font-semibold">n</th>
                  <th className="pb-1 text-right font-semibold">Fₙ</th>
                  <th className="pb-1 text-right font-semibold">Fₙ₊₁/Fₙ</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 5, 8, 10, 12, 14].map((k) => (
                  <tr key={k} className="border-t border-petrol-200">
                    <td className="py-0.5 text-left text-petrol-600">{k}</td>
                    <td className="py-0.5 text-right text-petrol-800">{FIB[k - 1]}</td>
                    <td className="py-0.5 text-right text-petrol-900">{sz(FIB[k] / FIB[k - 1], 6)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-[13px] leading-relaxed text-petrol-700">
            Ha a hányadosok konvergálnak (ezt külön be kell látni!), akkor az <M>{"x = F_{n+1}/F_n"}</M> jelöléssel a rekurzióból{" "}
            <M>{"x = 1 + 1/x"}</M>, azaz <M>{"x^2 - x - 1 = 0"}</M> — ennek a pozitív gyöke az aranymetszés{" "}
            <M>{"\\varphi"}</M>-je. Ugyanaz a fogás, mint a KF‑5-ben.
          </p>
          <p className="mt-2 text-[12.5px] leading-relaxed text-petrol-500">
            A napraforgó magjainak spirálszáma, a fenyőtoboz pikkelyei, a régi épületek homlokzatarányai — mind ugyanezt az
            arányt hozzák elő. Nem varázslat: az <M>{"1 + 1/x"}</M> leképezés fixpontja egyszerűen nagyon sok növekedési
            szabályban ott van.
          </p>
        </div>
      </div>
    </div>
  );
}
