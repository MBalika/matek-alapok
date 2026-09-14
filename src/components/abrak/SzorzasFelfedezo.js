"use client";

import { useRef, useState } from "react";
import { Cimke, Fogopont, Nyil, NyilHegyek, SzogIv, Tengelyek } from "./SvgElemek";
import { M } from "@/components/ui/Keplet";
import { normalizalSzog, sz, szK } from "@/lib/szamok";
import { K, abszolut, argFok, algK, szorzat, hanyados, polarbol, zarojelesK } from "@/lib/komplex";

const SZ = 560;
const MA = 380;
const OX = 280;
const OY = 190;
const LEPTEK = 40;
const RMAX = 2.1;
const RMIN = 0.5;

export default function SzorzasFelfedezo() {
  const [z1, setZ1] = useState(polarbol(1.7, 25));
  const [z2, setZ2] = useState(polarbol(1.4, 50));
  const [mod, setMod] = useState("szorzas");
  const [egyseg, setEgyseg] = useState(false);
  const svgRef = useRef(null);

  const r1 = abszolut(z1), f1 = argFok(z1);
  const r2 = abszolut(z2), f2 = argFok(z2);
  const e = mod === "szorzas" ? szorzat(z1, z2) : hanyados(z1, z2);
  const re = abszolut(e), fe = argFok(e);
  const fEredo = mod === "szorzas" ? f1 + f2 : f1 - f2;

  const P = (z) => [OX + z.a * LEPTEK, OY - z.b * LEPTEK];
  const [x1, y1] = P(z1);
  const [x2, y2] = P(z2);
  const [xe, ye] = P(e);

  const huzas = (melyik) => (ev) => {
    ev.preventDefault();
    const svg = svgRef.current;
    if (!svg) return;
    const mozgat = (esem) => {
      const rect = svg.getBoundingClientRect();
      const px = ((esem.clientX - rect.left) / rect.width) * SZ;
      const py = ((esem.clientY - rect.top) / rect.height) * MA;
      let a = (px - OX) / LEPTEK;
      let b = (OY - py) / LEPTEK;
      let r = Math.hypot(a, b);
      const fok = Math.round(normalizalSzog((Math.atan2(b, a) * 180) / Math.PI));
      r = Math.max(RMIN, Math.min(RMAX, Math.round(r * 10) / 10));
      if (melyik === 2 && egyseg) r = 1;
      const uj = polarbol(r, fok);
      (melyik === 1 ? setZ1 : setZ2)(uj);
    };
    mozgat(ev);
    const vege = () => {
      window.removeEventListener("pointermove", mozgat);
      window.removeEventListener("pointerup", vege);
    };
    window.addEventListener("pointermove", mozgat);
    window.addEventListener("pointerup", vege);
  };

  const allitEgyseg = (v) => {
    setEgyseg(v);
    if (v) setZ2(polarbol(1, f2));
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <svg ref={svgRef} viewBox={`0 0 ${SZ} ${MA}`} className="abra w-full touch-none select-none">
            <NyilHegyek />
            <Tengelyek ox={OX} oy={OY} balra={265} jobbra={265} fel={175} le={175} xCimke="Re" yCimke="Im" />
            <circle cx={OX} cy={OY} r={LEPTEK} fill="none" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />

            {/* szögívek: φ1, majd φ2 ráépítve */}
            <SzogIv ox={OX} oy={OY} sugar={44} kezdoFok={0} vegFok={f1} szin="var(--color-jel-ero)" cimke="φ₁" />
            {mod === "szorzas" ? (
              <SzogIv ox={OX} oy={OY} sugar={58} kezdoFok={f1} vegFok={f1 + f2} szin="var(--color-jel-komp)" cimke="φ₂" />
            ) : (
              <SzogIv ox={OX} oy={OY} sugar={58} kezdoFok={f1 - f2} vegFok={f1} szin="var(--color-jel-komp)" cimke="−φ₂" />
            )}

            <Nyil x1={OX} y1={OY} x2={x1} y2={y1} szin="ero" vastagsag={3.2} />
            <Nyil x1={OX} y1={OY} x2={x2} y2={y2} szin="komp" vastagsag={3.2} />
            <Nyil x1={OX} y1={OY} x2={xe} y2={ye} szin="eredo" vastagsag={3.6} />

            <Cimke x={x1 + (z1.a >= 0 ? 16 : -16)} y={y1 - 10} szin="var(--color-jel-ero)">z₁</Cimke>
            <Cimke x={x2 + (z2.a >= 0 ? 16 : -16)} y={y2 - 10} szin="var(--color-jel-komp)">z₂</Cimke>
            <Cimke x={xe + (e.a >= 0 ? 22 : -22)} y={ye - 12} szin="var(--color-jel-eredo)">
              {mod === "szorzas" ? "z₁·z₂" : "z₁ / z₂"}
            </Cimke>

            <Fogopont x={x1} y={y1} szin="var(--color-jel-ero)" onPointerDown={huzas(1)} />
            <Fogopont x={x2} y={y2} szin="var(--color-jel-komp)" onPointerDown={huzas(2)} />
          </svg>
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            Húzd a két narancs és zöld pontot. A lila a {mod === "szorzas" ? "szorzat" : "hányados"}.
          </p>
        </div>

        <div className="p-5">
          <div className="flex gap-1 rounded-lg bg-petrol-50 p-1">
            {[
              ["szorzas", "Szorzás"],
              ["osztas", "Osztás"],
            ].map(([id, nev]) => (
              <button
                key={id}
                type="button"
                onClick={() => setMod(id)}
                className={`flex-1 rounded-md px-3 py-1.5 text-[12.5px] font-semibold transition ${
                  mod === id ? "bg-petrol-800 text-white" : "text-petrol-600 hover:bg-white"
                }`}
              >
                {nev}
              </button>
            ))}
          </div>

          <div className="szamok mt-4 grid grid-cols-2 gap-2 text-[13px]">
            <div className="rounded-lg border border-naracs-200 bg-naracs-50 px-3 py-2">
              <p className="text-[10.5px] font-bold tracking-wider text-naracs-700 uppercase">z₁</p>
              <p className="mt-0.5 text-petrol-800">r₁ = {sz(r1, 2)}</p>
              <p className="text-petrol-800">φ₁ = {sz(f1, 0)}°</p>
            </div>
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2">
              <p className="text-[10.5px] font-bold tracking-wider text-emerald-800 uppercase">z₂</p>
              <p className="mt-0.5 text-petrol-800">r₂ = {sz(r2, 2)}</p>
              <p className="text-petrol-800">φ₂ = {sz(f2, 0)}°</p>
            </div>
          </div>

          <div className="mt-3 rounded-xl border border-violet-200 bg-violet-50 p-4">
            <p className="text-[10.5px] font-bold tracking-[0.16em] text-violet-800 uppercase">
              {mod === "szorzas" ? "A szorzat" : "A hányados"}
            </p>
            <div className="szamok mt-2 space-y-1.5 text-[13.5px] text-petrol-800">
              {mod === "szorzas" ? (
                <>
                  <div><M>{`r = r_1 r_2 = ${szK(r1, 2)}\\cdot ${szK(r2, 2)} = ${szK(re, 2)}`}</M></div>
                  <div><M>{`\\varphi = \\varphi_1 + \\varphi_2 = ${szK(f1, 0)}^\\circ + ${szK(f2, 0)}^\\circ = ${szK(fEredo, 0)}^\\circ${fEredo >= 360 ? ` \\equiv ${szK(fe, 0)}^\\circ` : ""}`}</M></div>
                </>
              ) : (
                <>
                  <div><M>{`r = r_1 / r_2 = ${szK(r1, 2)} / ${szK(r2, 2)} = ${szK(re, 2)}`}</M></div>
                  <div><M>{`\\varphi = \\varphi_1 - \\varphi_2 = ${szK(f1, 0)}^\\circ - ${szK(f2, 0)}^\\circ = ${szK(fEredo, 0)}^\\circ${fEredo < 0 ? ` \\equiv ${szK(fe, 0)}^\\circ` : ""}`}</M></div>
                </>
              )}
              <div className="pt-1 text-[13px] text-petrol-600">
                <M>{`${zarojelesK(z1, 2)} ${mod === "szorzas" ? "\\cdot" : "/"} ${zarojelesK(z2, 2)} = ${algK(e, 2)}`}</M>
              </div>
            </div>
          </div>

          <label className="mt-3 flex items-center gap-2 text-[13px] text-petrol-700">
            <input type="checkbox" checked={egyseg} onChange={(ev) => allitEgyseg(ev.target.checked)} className="accent-[color:var(--color-naracs-500)]" />
            z₂ az egységkörön (|z₂| = 1): tiszta forgatás
          </label>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {[
              ["z₂ = i", polarbol(1, 90)],
              ["z₂ = −1", polarbol(1, 180)],
              ["z₂ = 2", polarbol(2, 0)],
              ["z₂ = z₁", null],
            ].map(([nev, ertek]) => (
              <button
                key={nev}
                type="button"
                onClick={() => {
                  const uj = ertek ?? K(z1.a, z1.b);
                  setEgyseg(false);
                  setZ2(uj);
                }}
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
