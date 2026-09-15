"use client";

import { useRef, useState } from "react";
import FvRajz from "./FvRajz";
import { M } from "@/components/ui/Keplet";
import { sz, szK } from "@/lib/szamok";

/**
 * Inverz-felfedező: az f és az f⁻¹ egy képen, az y = x átlóval. A görbén
 * húzható egy pont, a tükörképe pedig automatikusan megjelenik az inverzen —
 * (a; b) ↦ (b; a).
 */

const SZ = 560;
const MA = 400;

const PAROK = [
  {
    cimke: "eˣ ↔ ln x",
    fLatex: "f(x) = e^{x}",
    fiLatex: "f^{-1}(x) = \\ln x",
    f: (x) => Math.exp(x),
    fi: (x) => Math.log(x),
    fTol: -4,
    fIg: 1.6,
    fiTol: 0.005,
    fiIg: 5,
    hatar: [-4, 5],
    aKezd: 0.7,
    D: "D_f = \\mathbb{R},\\quad R_f = (0;\\ +\\infty)",
    Di: "D_{f^{-1}} = (0;\\ +\\infty),\\quad R_{f^{-1}} = \\mathbb{R}",
    megjegyzes:
      "Az exponenciális szigorúan nő az egész ℝ-en, tehát kölcsönösen egyértelmű: leszűkítés nélkül invertálható. Innen jön a „logaritmus az exponenciális inverze” azonosságpár.",
  },
  {
    cimke: "x² (x ≥ 0) ↔ √x",
    fLatex: "f(x) = x^2,\\ x\\ge 0",
    fiLatex: "f^{-1}(x) = \\sqrt{x}",
    f: (x) => x * x,
    fi: (x) => Math.sqrt(x),
    fTol: 0,
    fIg: 2.3,
    fiTol: 0,
    fiIg: 5,
    hatar: [-1, 5],
    aKezd: 1.6,
    D: "D_f = [0;\\ +\\infty),\\quad R_f = [0;\\ +\\infty)",
    Di: "D_{f^{-1}} = [0;\\ +\\infty),\\quad R_{f^{-1}} = [0;\\ +\\infty)",
    megjegyzes:
      "Az x² az egész ℝ-en NEM kölcsönösen egyértelmű (f(2) = f(−2) = 4). Csak leszűkítve invertálható: az x ≥ 0 ághoz a +√x, az x ≤ 0 ághoz a −√x tartozik.",
  },
  {
    cimke: "3/(2+x) ↔ (3−2x)/x",
    fLatex: "f(x) = \\dfrac{3}{2+x}",
    fiLatex: "f^{-1}(x) = \\dfrac{3-2x}{x}",
    f: (x) => 3 / (2 + x),
    fi: (x) => (3 - 2 * x) / x,
    fTol: -6,
    fIg: 6,
    fiTol: -6,
    fiIg: 6,
    hatar: [-6, 6],
    aKezd: 1,
    D: "D_f = \\mathbb{R}\\setminus\\{-2\\},\\quad R_f = \\mathbb{R}\\setminus\\{0\\}",
    Di: "D_{f^{-1}} = \\mathbb{R}\\setminus\\{0\\},\\quad R_{f^{-1}} = \\mathbb{R}\\setminus\\{-2\\}",
    megjegyzes:
      "A KF‑2 feladata. Az inverz értelmezési tartománya az eredeti értékkészlete — ezért esik ki a 0, és nem a −2.",
  },
  {
    cimke: "sin x ↔ arcsin x",
    fLatex: "f(x) = \\sin x,\\ |x|\\le\\tfrac{\\pi}{2}",
    fiLatex: "f^{-1}(x) = \\arcsin x",
    f: (x) => Math.sin(x),
    fi: (x) => Math.asin(x),
    fTol: -Math.PI / 2,
    fIg: Math.PI / 2,
    fiTol: -1,
    fiIg: 1,
    hatar: [-2.4, 2.4],
    aKezd: 0.6,
    D: "D_f = \\left[-\\tfrac{\\pi}{2};\\ \\tfrac{\\pi}{2}\\right],\\quad R_f = [-1;\\ 1]",
    Di: "D_{f^{-1}} = [-1;\\ 1],\\quad R_{f^{-1}} = \\left[-\\tfrac{\\pi}{2};\\ \\tfrac{\\pi}{2}\\right]",
    megjegyzes:
      "A szinusz periodikus, tehát csak leszűkítve invertálható. A választott főág a [−π/2; π/2] — itt szigorúan nő, és felveszi a teljes értékkészletét.",
  },
];

export default function FvInverzFelfedezo() {
  const [i, setI] = useState(0);
  const p = PAROK[i];
  const [a, setA] = useState(p.aKezd);
  const svgRef = useRef(null);

  const valt = (j) => {
    setI(j);
    setA(PAROK[j].aKezd);
  };

  const aBiztos = Math.max(p.fTol + 1e-4, Math.min(p.fIg - 1e-4, a));
  const b = p.f(aBiztos);

  const [h0, h1] = p.hatar;

  const huzas = (ev) => {
    ev.preventDefault();
    const svg = svgRef.current;
    if (!svg) return;
    const mozgat = (esem) => {
      const rect = svg.getBoundingClientRect();
      const mx = ((esem.clientX - rect.left) / rect.width) * SZ;
      const w = SZ - 44 - 16; // FvRajz margói: bal 44, jobb 16
      const x = h0 + ((mx - 44) / w) * (h1 - h0);
      setA(Math.max(p.fTol + 0.02, Math.min(p.fIg - 0.02, Math.round(x * 100) / 100)));
    };
    mozgat(ev);
    const vege = () => {
      window.removeEventListener("pointermove", mozgat);
      window.removeEventListener("pointerup", vege);
    };
    window.addEventListener("pointermove", mozgat);
    window.addEventListener("pointerup", vege);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <FvRajz
            xMin={h0}
            xMax={h1}
            yMin={h0}
            yMax={h1}
            magassag={MA}
            svgRef={svgRef}
            className="abra w-full touch-none select-none"
            gorbek={[
              {
                fn: p.f,
                tol: p.fTol,
                ig: p.fIg,
                szin: "#0f766e",
                vastag: 2.8,
                cimke: "f",
                cimkeX: p.fTol + (p.fIg - p.fTol) * 0.88,
              },
              {
                fn: p.fi,
                tol: p.fiTol,
                ig: p.fiIg,
                szin: "#e2590a",
                vastag: 2.8,
                cimke: "f⁻¹",
                cimkeX: p.fiTol + (p.fiIg - p.fiTol) * 0.85,
              },
            ]}
            egyenesek={[{ m: 1, b: 0, szin: "#94a3b8", szaggatott: true, vastag: 1.4 }]}
            pontok={[
              { x: aBiztos, y: b, szin: "#0f766e", cimke: `(${sz(aBiztos, 2)}; ${sz(b, 2)})` },
              {
                x: b,
                y: aBiztos,
                szin: "#e2590a",
                cimke: `(${sz(b, 2)}; ${sz(aBiztos, 2)})`,
                dy: 18,
              },
            ]}
          >
            {(S) => (
              <g>
                <line
                  x1={S.px(aBiztos)}
                  y1={S.py(b)}
                  x2={S.px(b)}
                  y2={S.py(aBiztos)}
                  stroke="#7c3aed"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
                <circle
                  cx={S.px(aBiztos)}
                  cy={S.py(b)}
                  r="10"
                  fill="transparent"
                  style={{ cursor: "ew-resize" }}
                  onPointerDown={huzas}
                />
                <text
                  x={S.margo.bal + 6}
                  y={S.margo.fel + S.h - 8}
                  fontSize="11.5"
                  fontWeight="650"
                  fill="#94a3b8"
                  textAnchor="start"
                  style={{ paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
                >
                  szürke szaggatott: y = x
                </text>
              </g>
            )}
          </FvRajz>
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            Húzd a zöld pontot az f görbén — a narancs tükörkép magától követi.
          </p>
        </div>

        <div className="p-5">
          <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">
            Függvénypár
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {PAROK.map((k, j) => (
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

          <div className="szamok mt-4 space-y-1 text-[15px]">
            <div className="text-[color:#0f766e]">
              <M>{p.fLatex}</M>
            </div>
            <div className="text-[color:#e2590a]">
              <M>{p.fiLatex}</M>
            </div>
          </div>

          <label className="mt-4 block">
            <span className="mb-1 flex items-baseline justify-between">
              <span className="text-[12.5px] font-medium text-petrol-600">
                A pont helye az f görbén (a)
              </span>
              <span className="szamok rounded-md bg-petrol-100 px-2 py-0.5 text-[12.5px] font-semibold text-petrol-800">
                {sz(aBiztos, 2)}
              </span>
            </span>
            <input
              type="range"
              min={p.fTol + 0.02}
              max={p.fIg - 0.02}
              step={0.01}
              value={aBiztos}
              onChange={(e) => setA(Number(e.target.value))}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-petrol-100 accent-[color:var(--color-naracs-500)]"
            />
          </label>

          <div className="mt-4 rounded-xl bg-petrol-50 p-4">
            <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">
              A tükrözés számokkal
            </p>
            <div className="szamok mt-2 space-y-1 text-[13.5px] text-petrol-900">
              <div>
                <M>{`f(${szK(aBiztos, 2)}) = ${szK(b, 3)}`}</M>
              </div>
              <div>
                <M>{`f^{-1}(${szK(b, 3)}) = ${szK(aBiztos, 2)}`}</M>
              </div>
            </div>
            <p className="mt-2 text-[12.5px] leading-relaxed text-petrol-600">
              A grafikonon az <M>{"(a;\\,b)"}</M> pontból az <M>{"(b;\\,a)"}</M> lesz — és ez pontosan az{" "}
              <M>{"y = x"}</M> egyenesre való tükrözés. Ezért elég „elfordítani a papírt”.
            </p>
          </div>

          <div className="mt-3 space-y-1.5 text-[13px] text-petrol-800">
            <div className="szamok rounded-lg border border-petrol-100 bg-white px-3 py-2">
              <M>{p.D}</M>
            </div>
            <div className="szamok rounded-lg border border-naracs-200 bg-naracs-50 px-3 py-2">
              <M>{p.Di}</M>
            </div>
          </div>

          <p className="mt-3 text-[12.5px] leading-relaxed text-petrol-500">{p.megjegyzes}</p>
        </div>
      </div>
    </div>
  );
}
