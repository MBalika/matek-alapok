"use client";

import { useRef, useState } from "react";
import { Cimke, Fogopont, Nyil, NyilHegyek, SzogIv, Tengelyek } from "./SvgElemek";
import { M } from "@/components/ui/Keplet";
import { sz, szK } from "@/lib/szamok";
import { K, abszolut, argFok, algK, negyed, radFelirat } from "@/lib/komplex";
import { Csuszka } from "./Csuszka";

const SZ = 540;
const MA = 360;
const OX = 260;
const OY = 180;
const LEPTEK = 30; // képpont / egység

export default function GaussSikFelfedezo() {
  const [z, setZ] = useState(K(3, 2));
  const [konj, setKonj] = useState(true);
  const svgRef = useRef(null);

  const r = abszolut(z);
  const fi = argFok(z);
  const vx = OX + z.a * LEPTEK;
  const vy = OY - z.b * LEPTEK;

  const huzas = (e) => {
    e.preventDefault();
    const svg = svgRef.current;
    if (!svg) return;
    const mozgat = (esem) => {
      const rect = svg.getBoundingClientRect();
      const px = ((esem.clientX - rect.left) / rect.width) * SZ;
      const py = ((esem.clientY - rect.top) / rect.height) * MA;
      const a = Math.max(-7.5, Math.min(7.5, Math.round(((px - OX) / LEPTEK) * 10) / 10));
      const b = Math.max(-5.2, Math.min(5.2, Math.round(((OY - py) / LEPTEK) * 10) / 10));
      setZ(K(a, b));
    };
    mozgat(e);
    const vege = () => {
      window.removeEventListener("pointermove", mozgat);
      window.removeEventListener("pointerup", vege);
    };
    window.addEventListener("pointermove", mozgat);
    window.addEventListener("pointerup", vege);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.25fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <svg ref={svgRef} viewBox={`0 0 ${SZ} ${MA}`} className="abra w-full touch-none select-none">
            <NyilHegyek />
            <Tengelyek ox={OX} oy={OY} balra={245} jobbra={265} fel={165} le={165} xCimke="Re" yCimke="Im" />

            {/* egységkör halványan */}
            <circle cx={OX} cy={OY} r={LEPTEK} fill="none" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />

            {/* vetületek */}
            <line x1={vx} y1={vy} x2={vx} y2={OY} className="segedvonal" />
            <line x1={vx} y1={vy} x2={OX} y2={vy} className="segedvonal" />

            {/* konjugált */}
            {konj && (
              <>
                <Nyil x1={OX} y1={OY} x2={vx} y2={OY + (OY - vy)} szin="komp" vastagsag={2.4} szaggatott />
                <Cimke x={vx + (z.a >= 0 ? 16 : -16)} y={OY + (OY - vy) + (z.b >= 0 ? 18 : -10)} szin="var(--color-jel-komp)" meret={12.5}>
                  z̄
                </Cimke>
              </>
            )}

            {/* a z vektor */}
            <Nyil x1={OX} y1={OY} x2={vx} y2={vy} szin="ero" vastagsag={3.4} />

            {r > 0.6 && (
              <SzogIv ox={OX} oy={OY} sugar={36} kezdoFok={0} vegFok={fi} cimke={`φ = ${sz(fi, 0)}°`} />
            )}

            <Cimke x={vx + (z.a >= 0 ? 18 : -18)} y={vy - 12} szin="var(--color-jel-ero)">
              z = {algK(z, 1).replace(/\{,\}/g, ",")}
            </Cimke>
            <Cimke x={(OX + vx) / 2} y={OY + (z.b >= 0 ? 30 : -20)} szin="var(--color-jel-meret)" meret={12} vastag={false}>
              a = {sz(z.a, 1)}
            </Cimke>
            <Cimke x={OX + (z.a >= 0 ? -10 : 10)} y={(OY + vy) / 2 + 4} szin="var(--color-jel-meret)" meret={12} vastag={false} horgony={z.a >= 0 ? "end" : "start"}>
              b = {sz(z.b, 1)}
            </Cimke>
            <Cimke x={(OX + vx) / 2 + (z.b >= 0 ? -14 : 14)} y={(OY + vy) / 2 + (z.b >= 0 ? -8 : 16)} szin="var(--color-jel-ero)" meret={12} vastag={false}>
              r = {sz(r, 2)}
            </Cimke>

            <Fogopont x={vx} y={vy} onPointerDown={huzas} />
          </svg>
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            Húzd a pontot, vagy állítsd a csúszkákat.
          </p>
        </div>

        <div className="p-5">
          <div className="space-y-4">
            <Csuszka cimke="Valós rész, a = Re z" ertek={z.a} min={-7.5} max={7.5} lepes={0.1} tizedes={1} onChange={(a) => setZ(K(a, z.b))} />
            <Csuszka cimke="Képzetes rész, b = Im z" ertek={z.b} min={-5.2} max={5.2} lepes={0.1} tizedes={1} onChange={(b) => setZ(K(z.a, b))} />
          </div>

          <div className="mt-5 rounded-xl bg-petrol-50 p-4">
            <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">
              Abszolút érték és argumentum
            </p>
            <div className="szamok mt-2 space-y-1.5 text-[14px] text-petrol-800">
              <div>
                <M>{`r = |z| = \\sqrt{${szK(z.a, 1)}^2 + (${szK(z.b, 1)})^2} = ${szK(r, 3)}`}</M>
              </div>
              <div>
                <M>{`\\varphi = ${szK(fi, 1)}^\\circ = ${radFelirat(fi)}\\ \\text{rad}`}</M>
              </div>
              <div className="pt-1 text-[13px] text-petrol-600">
                <M>{`z = ${szK(r, 2)}\\,(\\cos ${szK(fi, 1)}^\\circ + i\\sin ${szK(fi, 1)}^\\circ)`}</M>
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 rounded-xl border border-naracs-200 bg-naracs-50 px-4 py-2.5">
            <span className="grid h-7 shrink-0 place-items-center rounded-lg bg-naracs-500 px-2 text-[11px] font-bold text-white">
              {negyed(z).split(" ")[0]}
            </span>
            <span className="szamok text-[13px] text-petrol-800">{negyed(z)}</span>
          </div>

          <label className="mt-3 flex items-center gap-2 text-[13px] text-petrol-700">
            <input type="checkbox" checked={konj} onChange={(e) => setKonj(e.target.checked)} className="accent-[color:var(--color-naracs-500)]" />
            A konjugált mutatása (tükörkép a valós tengelyre)
          </label>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {[
              ["1 + i", K(1, 1)],
              ["−1 + √3 i", K(-1, Math.sqrt(3))],
              ["−2 − 2i", K(-2, -2)],
              ["3i", K(0, 3)],
              ["−4", K(-4, 0)],
            ].map(([nev, ertek]) => (
              <button
                key={nev}
                type="button"
                onClick={() => setZ(K(Math.round(ertek.a * 10) / 10, Math.round(ertek.b * 10) / 10))}
                className="rounded-lg bg-white px-2.5 py-1.5 text-[12px] font-medium text-petrol-600 ring-1 ring-petrol-200 transition hover:bg-petrol-50"
              >
                {nev}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
