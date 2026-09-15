"use client";

import { useRef, useState } from "react";
import { Csuszka } from "./Csuszka";
import {
  ALAPNEZET,
  ForgatasFelirat,
  Felirat3D,
  Nyil3D,
  NyilHegyek3D,
  Pont3D,
  Racs3D,
  Szakasz3D,
  Tengelyek3D,
  keszitVetito,
  useForgatas,
} from "./Ter3D";
import { M } from "@/components/ui/Keplet";
import { sz, szK } from "@/lib/szamok";
import { egyseg, hossz, nyujt, szogFok, vektorialis, vekK } from "@/components/tergeometria/vektorok";

const SZ = 560;
const MA = 400;
const RAD = Math.PI / 180;
const LEPTEK = 42;

/** A képernyő jobbra és felfelé mutató irányai világkoordinátákban. */
function kepernyoIranyok(nezet) {
  const th = (nezet.azimut + 90) * RAD;
  const el = nezet.emelkedes * RAD;
  const st = Math.sin(th);
  const ct = Math.cos(th);
  const se = Math.sin(el);
  const ce = Math.cos(el);
  return {
    jobbra: [-st, ct, 0],
    fel: [-ct * se, -st * se, ce],
  };
}

/** Nyomaték-játszótér: M = r × F élőben, jobbkéz-szabállyal. */
export default function TerNyomatekJatszoter() {
  const [kar, setKar] = useState(3);
  const [F, setF] = useState([0, 1.2, -2.4]);
  const { nezet, huzas, alaphelyzet } = useForgatas({ ...ALAPNEZET, emelkedes: 22 });
  const svgRef = useRef(null);
  const V = keszitVetito(nezet, { ox: 250, oy: 230, leptek: LEPTEK });

  const r = [kar, 0, 0];
  const Mv = vektorialis(r, F);
  const Mh = hossz(Mv);
  const fi = szogFok(r, F);
  const erokar = hossz(F) > 1e-9 ? Mh / hossz(F) : 0;

  const huzasF = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const x0 = ev.clientX;
    const y0 = ev.clientY;
    const F0 = F;
    const { jobbra, fel } = kepernyoIranyok(nezet);
    const mozgat = (e) => {
      const dx = ((e.clientX - x0) / rect.width) * SZ / LEPTEK;
      const dy = ((e.clientY - y0) / rect.height) * MA / LEPTEK;
      const uj = [0, 1, 2].map((i) => {
        const v = F0[i] + dx * jobbra[i] - dy * fel[i];
        return Math.max(-4, Math.min(4, Math.round(v * 10) / 10));
      });
      setF(uj);
    };
    const vege = () => {
      window.removeEventListener("pointermove", mozgat);
      window.removeEventListener("pointerup", vege);
    };
    window.addEventListener("pointermove", mozgat);
    window.addEventListener("pointerup", vege);
  };

  // forgásirány-ív az M tengely körül
  const Me = Mh > 1e-9 ? egyseg(Mv) : [0, 0, 1];
  const seged = Math.abs(Me[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
  const iu = egyseg(vektorialis(seged, Me));
  const iw = vektorialis(Me, iu);
  const ivPontok = [];
  for (let k = 0; k <= 28; k++) {
    const t = (-40 + (k * 300) / 28) * RAD;
    const p = [0, 1, 2].map((i) => 1.15 * (Math.cos(t) * iu[i] + Math.sin(t) * iw[i]));
    ivPontok.push(V(p));
  }

  const Frajz = F;
  const Mrajz = Mh > 1e-9 ? nyujt(3.2, Me) : [0, 0, 0];
  const Fveg = [r[0] + Frajz[0], r[1] + Frajz[1], r[2] + Frajz[2]];

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${SZ} ${MA}`}
            className="abra w-full touch-none select-none"
            onPointerDown={huzas}
            style={{ cursor: "grab" }}
          >
            <NyilHegyek3D />
            <Racs3D V={V} meret={4} />
            <Tengelyek3D V={V} hossz={4.4} />

            {/* a csavarkulcs szára */}
            {(() => {
              const a = V(0, 0, 0);
              const b = V(r);
              return (
                <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#94a3b8" strokeWidth="11" strokeLinecap="round" opacity="0.55" />
              );
            })()}
            <Pont3D V={V} p={[0, 0, 0]} szin="sotet" r={6} />
            <Felirat3D V={V} p={[0, 0, 0]} szin="sotet" dy={-14} dx={12} meret={12.5} horgony="start">
              O
            </Felirat3D>

            {/* forgásirány */}
            {Mh > 1e-9 && (
              <polyline
                points={ivPontok.map((q) => `${q.x.toFixed(1)},${q.y.toFixed(1)}`).join(" ")}
                fill="none"
                stroke="#7c3aed"
                strokeWidth="2"
                opacity="0.75"
                markerEnd="url(#h3-lila)"
              />
            )}

            <Nyil3D V={V} ig={r} szin="teal" vastagsag={3} />
            <Nyil3D V={V} tol={r} ig={Fveg} szin="narancs" vastagsag={3.4} />
            <Szakasz3D V={V} tol={r} ig={[r[0] + 2.2 * F[0] / (hossz(F) || 1), r[1] + 2.2 * F[1] / (hossz(F) || 1), r[2] + 2.2 * F[2] / (hossz(F) || 1)]} szin="#cbd5e1" />
            {Mh > 1e-9 && <Nyil3D V={V} ig={Mrajz} szin="lila" vastagsag={3.4} />}

            <Felirat3D V={V} p={nyujt(0.55, r)} szin="teal" dy={-16} meret={13}>
              r (erőkar)
            </Felirat3D>
            <Felirat3D V={V} p={Fveg} szin="narancs" dy={-10} dx={8} meret={12} horgony="start">
              F
            </Felirat3D>
            {Mh > 1e-9 && (
              <Felirat3D V={V} p={nyujt(1.13, Mrajz)} szin="lila" dy={-8} meret={12.5}>
                M = r × F
              </Felirat3D>
            )}

            {/* húzható fogópont az erő végén */}
            {(() => {
              const q = V(Fveg);
              return (
                <g onPointerDown={huzasF} style={{ touchAction: "none", cursor: "grab" }}>
                  <circle cx={q.x} cy={q.y} r="17" fill="transparent" />
                  <circle cx={q.x} cy={q.y} r="6.5" fill="white" stroke="#e2590a" strokeWidth="2.5" />
                </g>
              );
            })()}
          </svg>
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            Húzd a <span className="font-semibold text-naracs-700">narancs fogópontot</span> az erő
            állításához, a háttért a forgatáshoz · nézet:{" "}
            {Math.round(((nezet.azimut % 360) + 360) % 360)}° / {Math.round(nezet.emelkedes)}°
          </p>
        </div>

        <div className="p-5">
          <Csuszka cimke="Erőkar hossza, |r|" ertek={kar} egyseg="m" min={1} max={4} lepes={0.5} tizedes={1} onChange={setKar} />
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <Csuszka
                key={i}
                cimke={["Fx", "Fy", "Fz"][i]}
                ertek={F[i]}
                min={-4}
                max={4}
                lepes={0.2}
                tizedes={1}
                onChange={(v) => setF((s) => s.map((x, j) => (j === i ? v : x)))}
              />
            ))}
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {[
              ["merőleges erő", [0, 0, -2.4]],
              ["ferde erő", [0, 1.2, -2.4]],
              ["a rúd mentén", [2.5, 0, 0]],
            ].map(([nev, ert]) => (
              <button
                key={nev}
                type="button"
                onClick={() => setF(ert)}
                className="rounded-lg bg-white px-2.5 py-1.5 text-[12px] font-medium text-petrol-600 ring-1 ring-petrol-200 transition hover:bg-petrol-50"
              >
                {nev}
              </button>
            ))}
            <button
              type="button"
              onClick={alaphelyzet}
              className="rounded-lg bg-white px-2.5 py-1.5 text-[12px] font-medium text-petrol-600 ring-1 ring-petrol-200 transition hover:bg-petrol-50"
            >
              Nézet vissza
            </button>
          </div>

          <div className="mt-4 rounded-xl bg-petrol-50 p-4">
            <div className="szamok space-y-1.5 text-[13px] text-petrol-800">
              <div>
                <M>{`\\mathbf{r} = ${vekK(r, 1)}\\ \\text{m},\\qquad \\mathbf{F} = ${vekK(F, 1)}\\ \\text{kN}`}</M>
              </div>
              <div>
                <M>{`\\mathbf{M} = \\mathbf{r}\\times\\mathbf{F} = ${vekK(Mv, 2)}\\ \\text{kNm}`}</M>
              </div>
              <div>
                <M>{`|\\mathbf{M}| = |\\mathbf{r}||\\mathbf{F}|\\sin\\varphi = ${szK(kar, 1)}\\cdot ${szK(hossz(F), 2)}\\cdot \\sin ${szK(fi, 1)}^\\circ = ${szK(Mh, 2)}`}</M>
              </div>
              <div className="text-petrol-600">
                <M>{`k = |\\mathbf{r}|\\sin\\varphi = ${szK(erokar, 2)}\\ \\text{m}`}</M>{" "}
                <span className="text-[12px]">(a hatásvonal távolsága O-tól)</span>
              </div>
            </div>
          </div>

          <div
            className={`mt-3 rounded-xl border px-4 py-3 text-[12.5px] ${
              Mh < 1e-6
                ? "border-rose-200 bg-rose-50 text-rose-900"
                : "border-emerald-200 bg-emerald-50 text-emerald-900"
            }`}
          >
            {Mh < 1e-6 ? (
              <>
                <strong>Nincs nyomaték.</strong> Az erő hatásvonala átmegy a forgásponton (<M>{"\\mathbf{r} \\parallel \\mathbf{F}"}</M>),
                ezért a vektoriális szorzat a nullvektor. Húzd-told az erőt oldalra!
              </>
            ) : (
              <>
                <strong>A lila nyíl a forgástengely.</strong> A köré rajzolt ív mutatja a forgásirányt: ha a jobb
                kezed ujjai ebbe az irányba mutatnak, a hüvelykujjad az <M>{"\\mathbf{M}"}</M> irányába áll. Az erő
                hatásvonalra merőleges összetevője forgat — a rúd irányú rész csak húz.
              </>
            )}
          </div>

          <p className="mt-3 text-[12px] text-petrol-500">
            Ezért találták ki a vektoriális szorzatot: egyetlen vektorban benne van, hogy{" "}
            <strong>mekkora</strong> a nyomaték (a hossz), <strong>mely tengely</strong> körül forgat (az irány),
            és <strong>merre</strong> (az irányítás). A statika végig ezzel dolgozik.
          </p>
        </div>
      </div>
    </div>
  );
}
