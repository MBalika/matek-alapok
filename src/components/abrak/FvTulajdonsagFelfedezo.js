"use client";

import { useMemo, useRef, useState } from "react";
import FvRajz from "./FvRajz";
import { M } from "@/components/ui/Keplet";
import { sz } from "@/lib/szamok";

/**
 * Függvénytulajdonság-felfedező: paritás tükrözéssel (f(−x) és −f(−x)
 * szaggatottan), valamint húzható vízszintes vonal a kölcsönös egyértelműség
 * „vonal-próbájához” (hány metszéspont?).
 */

const SZ = 560;
const MA = 380;

const PELDAK = [
  {
    cimke: "x²",
    latex: "f(x) = x^2",
    fn: (x) => x * x,
    xMin: -4,
    xMax: 4,
    yMin: -2,
    yMax: 9,
    yKezd: 4,
    paritas: "páros",
    monoton: "Nem monoton ℝ-en; x ≥ 0-n szigorúan nő, x ≤ 0-n szigorúan csökken.",
    periodikus: "nem periodikus",
    korlatos: "alulról korlátos (0), felülről nem",
  },
  {
    cimke: "x³",
    latex: "f(x) = x^3",
    fn: (x) => x * x * x,
    xMin: -2.6,
    xMax: 2.6,
    yMin: -9,
    yMax: 9,
    yKezd: 3,
    paritas: "páratlan",
    monoton: "Szigorúan monoton növő az egész ℝ-en.",
    periodikus: "nem periodikus",
    korlatos: "nem korlátos",
  },
  {
    cimke: "cos x",
    latex: "f(x) = \\cos x",
    fn: (x) => Math.cos(x),
    xMin: -7,
    xMax: 7,
    yMin: -1.8,
    yMax: 1.8,
    yKezd: 0.5,
    paritas: "páros",
    monoton: "Szakaszonként monoton, összességében nem.",
    periodikus: "periodikus, p = 2π",
    korlatos: "korlátos, M = 1",
  },
  {
    cimke: "sin x",
    latex: "f(x) = \\sin x",
    fn: (x) => Math.sin(x),
    xMin: -7,
    xMax: 7,
    yMin: -1.8,
    yMax: 1.8,
    yKezd: 0.5,
    paritas: "páratlan",
    monoton: "Szakaszonként monoton, összességében nem.",
    periodikus: "periodikus, p = 2π",
    korlatos: "korlátos, M = 1",
  },
  {
    cimke: "x·sin x",
    latex: "f(x) = x\\sin x",
    fn: (x) => x * Math.sin(x),
    xMin: -9,
    xMax: 9,
    yMin: -6,
    yMax: 9,
    yKezd: 2,
    paritas: "páros",
    monoton: "Nem monoton; a kilengések egyre nagyobbak.",
    periodikus: "NEM periodikus (pedig szinusz van benne!)",
    korlatos: "nem korlátos",
  },
  {
    cimke: "x²+x",
    latex: "f(x) = x^2+x",
    fn: (x) => x * x + x,
    xMin: -4,
    xMax: 3,
    yMin: -2,
    yMax: 9,
    yKezd: 2,
    paritas: "egyik sem",
    monoton: "A −1/2 helyen fordul: előtte csökken, utána nő.",
    periodikus: "nem periodikus",
    korlatos: "alulról korlátos (−1/4)",
  },
  {
    cimke: "1/x",
    latex: "f(x) = \\dfrac1x",
    fn: (x) => 1 / x,
    xMin: -4,
    xMax: 4,
    yMin: -5,
    yMax: 5,
    yKezd: 1.5,
    paritas: "páratlan",
    monoton:
      "Mindkét ágon külön-külön szigorúan csökken, de az egész D_f-en NEM monoton csökkenő.",
    periodikus: "nem periodikus",
    korlatos: "nem korlátos",
  },
  {
    cimke: "eˣ",
    latex: "f(x) = e^{x}",
    fn: (x) => Math.exp(x),
    xMin: -3.5,
    xMax: 2.5,
    yMin: -1.5,
    yMax: 9,
    yKezd: 3,
    paritas: "egyik sem",
    monoton: "Szigorúan monoton növő az egész ℝ-en.",
    periodikus: "nem periodikus",
    korlatos: "alulról korlátos (0), felülről nem",
  },
  {
    cimke: "0 (azonosan nulla)",
    latex: "f(x) = 0",
    fn: () => 0,
    xMin: -4,
    xMax: 4,
    yMin: -3,
    yMax: 3,
    yKezd: 0.8,
    paritas: "páros ÉS páratlan",
    monoton: "Monoton növő is és csökkenő is (tág értelemben), szigorúan egyik sem.",
    periodikus: "minden p > 0 periódusa, alapperiódusa nincs",
    korlatos: "korlátos, M tetszőleges pozitív szám",
  },
];

/** Metszéspontok száma az y = c vízszintes egyenessel (előjelváltás-számlálás). */
function metszesek(fn, xMin, xMax, c, db = 3000) {
  const gyokok = [];
  let elozoX = xMin;
  let elozoY = fn(xMin) - c;
  for (let i = 1; i <= db; i++) {
    const x = xMin + ((xMax - xMin) * i) / db;
    const y = fn(x) - c;
    if (Number.isFinite(elozoY) && Number.isFinite(y)) {
      if (Math.abs(y) < 1e-12) gyokok.push(x);
      else if (elozoY * y < 0) {
        // felezés a pontos helyért
        let a = elozoX;
        let b = x;
        for (let k = 0; k < 40; k++) {
          const m = (a + b) / 2;
          if ((fn(a) - c) * (fn(m) - c) <= 0) b = m;
          else a = m;
        }
        gyokok.push((a + b) / 2);
      }
    }
    elozoX = x;
    elozoY = y;
  }
  // közeli gyököket összevonunk
  const tiszta = [];
  gyokok.forEach((g) => {
    if (!tiszta.some((h) => Math.abs(h - g) < (xMax - xMin) / 400)) tiszta.push(g);
  });
  return tiszta;
}

export default function FvTulajdonsagFelfedezo() {
  const [i, setI] = useState(0);
  const [tukorY, setTukorY] = useState(false);
  const [tukorO, setTukorO] = useState(false);
  const [vonal, setVonal] = useState(true);
  const p = PELDAK[i];
  const [c, setC] = useState(p.yKezd);
  const svgRef = useRef(null);

  const valt = (j) => {
    setI(j);
    setC(PELDAK[j].yKezd);
  };

  const gyokok = useMemo(
    () => (vonal ? metszesek(p.fn, p.xMin, p.xMax, c) : []),
    [p, c, vonal],
  );

  const gorbek = [{ fn: p.fn, szin: "#0f766e", vastag: 2.8, cimke: p.cimke }];
  if (tukorY)
    gorbek.push({
      fn: (x) => p.fn(-x),
      szin: "#7c3aed",
      vastag: 2,
      szaggatott: true,
      cimke: "f(−x)",
    });
  if (tukorO)
    gorbek.push({
      fn: (x) => -p.fn(-x),
      szin: "#e2590a",
      vastag: 2,
      szaggatott: true,
      cimke: "−f(−x)",
    });

  const huzas = (ev) => {
    ev.preventDefault();
    const svg = svgRef.current;
    if (!svg) return;
    const mozgat = (esem) => {
      const rect = svg.getBoundingClientRect();
      const my = ((esem.clientY - rect.top) / rect.height) * MA;
      // FvRajz margói: fel 18, le 32
      const h = MA - 18 - 32;
      const y = p.yMin + ((18 + h - my) / h) * (p.yMax - p.yMin);
      setC(Math.round(Math.max(p.yMin + 0.2, Math.min(p.yMax - 0.2, y)) * 20) / 20);
    };
    mozgat(ev);
    const vege = () => {
      window.removeEventListener("pointermove", mozgat);
      window.removeEventListener("pointerup", vege);
    };
    window.addEventListener("pointermove", mozgat);
    window.addEventListener("pointerup", vege);
  };

  const Kapcsolo = ({ aktiv, onClick, szin, children }) => (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition ${
        aktiv ? szin : "bg-white text-petrol-600 ring-1 ring-petrol-200 hover:bg-petrol-50"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <FvRajz
            xMin={p.xMin}
            xMax={p.xMax}
            yMin={p.yMin}
            yMax={p.yMax}
            gorbek={gorbek}
            magassag={MA}
            svgRef={svgRef}
            className="abra w-full touch-none select-none"
          >
            {(S) =>
              vonal ? (
                <g>
                  <line
                    x1={S.margo.bal}
                    y1={S.py(c)}
                    x2={S.margo.bal + S.w}
                    y2={S.py(c)}
                    stroke="#dc2626"
                    strokeWidth="2"
                    strokeDasharray="7 4"
                  />
                  <rect
                    x={S.margo.bal}
                    y={S.py(c) - 9}
                    width={S.w}
                    height="18"
                    fill="transparent"
                    style={{ cursor: "ns-resize" }}
                    onPointerDown={huzas}
                  />
                  <circle
                    cx={S.margo.bal + 14}
                    cy={S.py(c)}
                    r="7"
                    fill="#dc2626"
                    stroke="white"
                    strokeWidth="2"
                    style={{ cursor: "ns-resize" }}
                    onPointerDown={huzas}
                  />
                  {gyokok.map((g, k) => (
                    <circle
                      key={`m${k}`}
                      cx={S.px(g)}
                      cy={S.py(c)}
                      r="5"
                      fill="#dc2626"
                      stroke="white"
                      strokeWidth="1.6"
                    />
                  ))}
                  <text
                    x={S.margo.bal + 28}
                    y={S.py(c) - 8}
                    fontSize="12"
                    fontWeight="650"
                    style={{
                      fill: "#dc2626",
                      paintOrder: "stroke",
                      stroke: "white",
                      strokeWidth: 3.5,
                    }}
                  >
                    y = {sz(c, 2)} · {gyokok.length} metszéspont
                  </text>
                </g>
              ) : null
            }
          </FvRajz>
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            Húzd a piros vonalat függőlegesen — ez a „vízszintes vonal-próba”.
          </p>
        </div>

        <div className="p-5">
          <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">
            Függvény
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {PELDAK.map((k, j) => (
              <button
                key={k.cimke}
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

          <div className="szamok mt-4 text-[16px] text-petrol-900">
            <M>{p.latex}</M>
          </div>

          <p className="mt-4 text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">
            Próbák
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Kapcsolo
              aktiv={tukorY}
              onClick={() => setTukorY((v) => !v)}
              szin="bg-violet-600 text-white"
            >
              tükrözés az y tengelyre
            </Kapcsolo>
            <Kapcsolo
              aktiv={tukorO}
              onClick={() => setTukorO((v) => !v)}
              szin="bg-naracs-500 text-white"
            >
              tükrözés az origóra
            </Kapcsolo>
            <Kapcsolo
              aktiv={vonal}
              onClick={() => setVonal((v) => !v)}
              szin="bg-rose-600 text-white"
            >
              vízszintes vonal
            </Kapcsolo>
          </div>

          <div className="mt-3 rounded-xl bg-petrol-50 p-4 text-[13px] leading-relaxed text-petrol-800">
            {tukorY && (
              <p>
                <span className="font-semibold text-violet-700">f(−x)</span>{" "}
                {p.paritas.includes("páros")
                  ? "pontosan ráfekszik az eredetire: a függvény PÁROS."
                  : "eltér az eredetitől, tehát a függvény nem páros."}
              </p>
            )}
            {tukorO && (
              <p className={tukorY ? "mt-2" : ""}>
                <span className="font-semibold text-naracs-700">−f(−x)</span>{" "}
                {p.paritas.includes("páratlan")
                  ? "pontosan ráfekszik az eredetire: a függvény PÁRATLAN."
                  : "eltér az eredetitől, tehát a függvény nem páratlan."}
              </p>
            )}
            {!tukorY && !tukorO && (
              <p>
                Kapcsold be a tükrözést: ha a szaggatott görbe <em>pontosan</em> ráfekszik a teljesre,
                a paritás megvan.
              </p>
            )}
          </div>

          <div className="mt-3 space-y-1.5 text-[13px] text-petrol-700">
            <p>
              <span className="font-semibold text-petrol-900">Paritás:</span> {p.paritas}
            </p>
            <p>
              <span className="font-semibold text-petrol-900">Monotonitás:</span> {p.monoton}
            </p>
            <p>
              <span className="font-semibold text-petrol-900">Periodicitás:</span> {p.periodikus}
            </p>
            <p>
              <span className="font-semibold text-petrol-900">Korlátosság:</span> {p.korlatos}
            </p>
          </div>

          {vonal && (
            <div
              className={`mt-3 rounded-xl border px-4 py-3 text-[13px] leading-relaxed ${
                gyokok.length > 1
                  ? "border-rose-200 bg-rose-50 text-rose-900"
                  : "border-emerald-200 bg-emerald-50 text-emerald-900"
              }`}
            >
              {gyokok.length > 1 ? (
                <>
                  Az <span className="szamok font-semibold">y = {sz(c, 2)}</span> egyenes{" "}
                  <strong>{gyokok.length} pontban</strong> metszi a görbét a rajzolt szakaszon — ezen a
                  tartományon a függvény <strong>nem</strong> kölcsönösen egyértelmű, tehát így nincs
                  inverze.
                </>
              ) : (
                <>
                  Ez az egyenes legfeljebb <strong>egy</strong> pontban metszi a görbét. Ha ez{" "}
                  <em>minden</em> magasságra igaz, a függvény kölcsönösen egyértelmű — és van inverze.
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
