"use client";

import { useState } from "react";
import { Csuszka } from "./Csuszka";
import {
  ForgatasFelirat,
  Felirat3D,
  Nyil3D,
  NyilHegyek3D,
  Pont3D,
  Racs3D,
  Sik3D,
  Szakasz3D,
  Tengelyek3D,
  keszitVetito,
  useForgatas,
} from "./Ter3D";
import { M } from "@/components/ui/Keplet";
import { sz, szK } from "@/lib/szamok";
import { egyseg, hossz, nyujt, sikEgyenletK, vektorialis, vekK } from "@/components/tergeometria/vektorok";

const SZ = 560;
const MA = 400;
const MERET = 3.6; // a kirajzolt síkdarab fél-átmérője

/** Két, a síkkal párhuzamos, egymásra merőleges irány. */
function sikIranyok(n) {
  const seged = Math.abs(n[0]) < Math.abs(n[2]) ? [1, 0, 0] : [0, 0, 1];
  const u = egyseg(vektorialis(n, seged));
  const w = egyseg(vektorialis(n, u));
  return [u, w];
}

/** Sík felfedezése: az együtthatók a normálvektor koordinátái. */
export default function TerSikFelfedezo() {
  const [e, setE] = useState({ A: 3, B: -6, C: 2, D: -14 });
  const { nezet, huzas, alaphelyzet } = useForgatas();
  const V = keszitVetito(nezet, { ox: 280, oy: 200, leptek: 26 });

  const n = [e.A, e.B, e.C];
  const nh = hossz(n);
  const ervenyes = nh > 1e-9;
  const P0 = ervenyes ? nyujt(e.D / (nh * nh), n) : [0, 0, 0];
  const [u, w] = ervenyes ? sikIranyok(n) : [[1, 0, 0], [0, 1, 0]];
  const sarok = [
    P0[0] - MERET * (u[0] + w[0]),
    P0[1] - MERET * (u[1] + w[1]),
    P0[2] - MERET * (u[2] + w[2]),
  ];

  const metszet = (k) => (Math.abs(n[k]) < 1e-9 ? null : e.D / n[k]);
  const p = metszet(0);
  const q = metszet(1);
  const r = metszet(2);

  const allit = (k) => (v) => setE((s) => ({ ...s, [k]: v }));

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <svg
            viewBox={`0 0 ${SZ} ${MA}`}
            className="abra w-full touch-none select-none"
            onPointerDown={huzas}
            style={{ cursor: "grab" }}
          >
            <NyilHegyek3D />
            <Racs3D V={V} meret={5} />
            <Tengelyek3D V={V} hossz={5.6} />

            {ervenyes && (
              <Sik3D
                V={V}
                pont={sarok}
                u={nyujt(2 * MERET, u)}
                w={nyujt(2 * MERET, w)}
                szin="#0f766e"
                kitoltes={0.16}
                keret={1.5}
              />
            )}

            {ervenyes && (
              <>
                <Nyil3D V={V} tol={P0} ig={[P0[0] + 2.6 * n[0] / nh, P0[1] + 2.6 * n[1] / nh, P0[2] + 2.6 * n[2] / nh]} szin="lila" vastagsag={3.2} />
                <Pont3D V={V} p={P0} szin="lila" r={4} />
                <Felirat3D
                  V={V}
                  p={[P0[0] + 3 * n[0] / nh, P0[1] + 3 * n[1] / nh, P0[2] + 3 * n[2] / nh]}
                  szin="lila"
                  dy={-9}
                >
                  n
                </Felirat3D>
              </>
            )}

            {[["x", p, 0], ["y", q, 1], ["z", r, 2]].map(([nev, ert, i]) =>
              ert != null && Math.abs(ert) <= 6.5 ? (
                <g key={nev}>
                  <Szakasz3D
                    V={V}
                    tol={[0, 0, 0]}
                    ig={[i === 0 ? ert : 0, i === 1 ? ert : 0, i === 2 ? ert : 0]}
                    szin="#e2590a"
                    vastagsag={1.2}
                    opacitas={0.7}
                  />
                  <Pont3D
                    V={V}
                    p={[i === 0 ? ert : 0, i === 1 ? ert : 0, i === 2 ? ert : 0]}
                    szin="narancs"
                    r={4.5}
                    cimke={`${nev} = ${sz(ert, 2)}`}
                    cimkeDx={10}
                    cimkeDy={-8}
                    meret={11}
                  />
                </g>
              ) : null,
            )}
          </svg>
          <ForgatasFelirat nezet={nezet} />
        </div>

        <div className="p-5">
          <p className="text-[11px] font-bold tracking-[0.14em] text-teal-700 uppercase">
            A sík: Ax + By + Cz = D
          </p>
          <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
            <Csuszka cimke="A" ertek={e.A} min={-6} max={6} lepes={1} tizedes={0} onChange={allit("A")} />
            <Csuszka cimke="B" ertek={e.B} min={-6} max={6} lepes={1} tizedes={0} onChange={allit("B")} />
            <Csuszka cimke="C" ertek={e.C} min={-6} max={6} lepes={1} tizedes={0} onChange={allit("C")} />
            <Csuszka cimke="D" ertek={e.D} min={-15} max={15} lepes={1} tizedes={0} onChange={allit("D")} />
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {[
              ["KF‑4 síkja", { A: 3, B: -6, C: 2, D: -14 }],
              ["x + 2y + 3z = 7", { A: 1, B: 2, C: 3, D: 7 }],
              ["z = 2 (vízszintes)", { A: 0, B: 0, C: 1, D: 2 }],
              ["origón át", { A: 2, B: -3, C: 1, D: 0 }],
            ].map(([nev, ert]) => (
              <button
                key={nev}
                type="button"
                onClick={() => setE(ert)}
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
                <M>{sikEgyenletK(n, e.D)}</M>
              </div>
              <div>
                <M>{`\\mathbf{n} = ${vekK(n)},\\qquad |\\mathbf{n}| = ${szK(nh, 3)}`}</M>
              </div>
              <div className="text-petrol-600">
                <M>{`d(O,\\,S) = \\frac{|D|}{|\\mathbf{n}|} = ${ervenyes ? szK(Math.abs(e.D) / nh, 3) : "-"}`}</M>
              </div>
            </div>
          </div>

          <div className="mt-3 rounded-xl border border-naracs-200 bg-naracs-50 px-4 py-3 text-[12.5px] text-naracs-900">
            <p className="text-[10.5px] font-bold tracking-[0.16em] text-naracs-700 uppercase">Tengelymetszetek</p>
            <div className="szamok mt-1.5 text-[13px]">
              {ervenyes ? (
                <M>
                  {`p = ${p == null ? "\\text{nincs}" : szK(p, 3)},\\quad q = ${q == null ? "\\text{nincs}" : szK(q, 3)},\\quad r = ${r == null ? "\\text{nincs}" : szK(r, 3)}`}
                </M>
              ) : (
                <span>A normálvektor nem lehet nullvektor — állíts be legalább egy nem nulla együtthatót.</span>
              )}
            </div>
            {p != null && q != null && r != null && Math.abs(e.D) > 1e-9 && (
              <div className="szamok mt-1.5 text-[13px]">
                <M>{`\\frac{x}{${szK(p, 3)}} + \\frac{y}{${szK(q, 3)}} + \\frac{z}{${szK(r, 3)}} = 1`}</M>
              </div>
            )}
            {Math.abs(e.D) < 1e-9 && ervenyes && (
              <p className="mt-1.5">A sík átmegy az origón, ezért tengelymetszetes alakja nincs.</p>
            )}
          </div>

          <p className="mt-3 text-[12px] text-petrol-500">
            Figyeld meg: ha csak a <strong>D</strong>-t állítod, a sík önmagával párhuzamosan tolódik — a
            normálvektor iránya nem változik. Ezért van, hogy két párhuzamos sík egyenlete csak a jobb oldali
            állandóban tér el.
          </p>
        </div>
      </div>
    </div>
  );
}
