"use client";

import { useState } from "react";
import { Csuszka } from "./Csuszka";
import {
  ForgatasFelirat,
  Nyil3D,
  NyilHegyek3D,
  Pont3D,
  Racs3D,
  Szakasz3D,
  Tengelyek3D,
  keszitVetito,
  leptekIgazitas,
  useForgatas,
} from "./Ter3D";
import { M } from "@/components/ui/Keplet";
import { sz, szK } from "@/lib/szamok";
import { hossz, vekK } from "@/components/tergeometria/vektorok";

const SZ = 560;
const MA = 400;

/** Térbeli vektor felfedezése: koordináták, komponensdoboz, hossz, egységvektor, iránykoszinuszok. */
export default function TerVektorFelfedezo() {
  const [a, setA] = useState([3, 4, 5]);
  const { nezet, huzas, alaphelyzet } = useForgatas({ azimut: -62, emelkedes: 24 });

  const h = hossz(a);
  const e = h > 1e-9 ? a.map((k) => k / h) : [0, 0, 0];
  const allit = (i) => (v) => setA((r) => r.map((k, j) => (j === i ? v : k)));

  const Fxy = [a[0], a[1], 0];
  const Px = [a[0], 0, 0];
  const Py = [0, a[1], 0];
  const Pz = [0, 0, a[2]];

  const leptek = leptekIgazitas(
    [a, Fxy, Px, Py, Pz, [5.6, 0, 0], [0, 5.6, 0], [0, 0, 5.6], [-4.2, 0, 0], [0, -4.2, 0]],
    nezet,
    { felSzeles: 245, felMagas: 178, max: 36 },
  );
  const V = keszitVetito(nezet, { ox: 280, oy: 206, leptek });

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

            {/* a komponensek „doboza” */}
            {[
              [Px, Fxy],
              [Py, Fxy],
              [Fxy, a],
              [Pz, a],
              [Px, [a[0], 0, a[2]]],
              [[a[0], 0, a[2]], a],
              [Py, [0, a[1], a[2]]],
              [[0, a[1], a[2]], a],
              [Pz, [a[0], 0, a[2]]],
              [Pz, [0, a[1], a[2]]],
            ].map(([p, q], i) => (
              <Szakasz3D key={i} V={V} tol={p} ig={q} szin="#7c97a3" vastagsag={1.3} opacitas={0.75} />
            ))}

            {/* komponensvektorok */}
            <Nyil3D V={V} ig={Px} szin="teal" vastagsag={2} opacitas={0.85} />
            <Nyil3D V={V} ig={Py} szin="teal" vastagsag={2} opacitas={0.85} />
            <Nyil3D V={V} ig={Pz} szin="teal" vastagsag={2} opacitas={0.85} />

            {/* maga a vektor */}
            <Nyil3D V={V} ig={a} szin="narancs" vastagsag={3.2} />
            <Pont3D
              V={V}
              p={a}
              szin="narancs"
              r={5}
              cimke={`P(${sz(a[0], 0)}; ${sz(a[1], 0)}; ${sz(a[2], 0)})`}
              cimkeDx={14}
              cimkeDy={-12}
            />

            {/* egységvektor */}
            <Nyil3D V={V} ig={e} szin="lila" vastagsag={2.4} />
          </svg>
          <ForgatasFelirat nezet={nezet} />
        </div>

        <div className="p-5">
          <div className="space-y-3">
            <Csuszka cimke="a₁ (x)" ertek={a[0]} min={-5} max={5} lepes={1} tizedes={0} onChange={allit(0)} />
            <Csuszka cimke="a₂ (y)" ertek={a[1]} min={-5} max={5} lepes={1} tizedes={0} onChange={allit(1)} />
            <Csuszka cimke="a₃ (z)" ertek={a[2]} min={-5} max={5} lepes={1} tizedes={0} onChange={allit(2)} />
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {[
              ["a = (3; 4; 5)", [3, 4, 5]],
              ["a = (1; 2; 2)", [1, 2, 2]],
              ["a = (−2; 3; 1)", [-2, 3, 1]],
              ["a = (0; 0; 4)", [0, 0, 4]],
            ].map(([nev, ertek]) => (
              <button
                key={nev}
                type="button"
                onClick={() => setA(ertek)}
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
            <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">Amit leolvasol</p>
            <div className="szamok mt-2 space-y-1.5 text-[13.5px] text-petrol-800">
              <div>
                <M>{`\\mathbf{a} = ${vekK(a)} = ${szK(a[0], 0)}\\mathbf{i} ${a[1] < 0 ? "-" : "+"} ${szK(Math.abs(a[1]), 0)}\\mathbf{j} ${a[2] < 0 ? "-" : "+"} ${szK(Math.abs(a[2]), 0)}\\mathbf{k}`}</M>
              </div>
              <div>
                <M>{`|\\mathbf{a}| = \\sqrt{${szK(a[0] * a[0], 0)} + ${szK(a[1] * a[1], 0)} + ${szK(a[2] * a[2], 0)}} = ${szK(h, 3)}`}</M>
              </div>
              <div>
                <M>{`\\mathbf{e}_a = ${h > 1e-9 ? `\\frac{\\mathbf{a}}{${szK(h, 3)}} = ${vekK(e, 3)}` : "\\text{nincs (nullvektor)}"}`}</M>
              </div>
            </div>
          </div>

          <div className="mt-3 rounded-xl border border-naracs-200 bg-naracs-50 px-4 py-3">
            <p className="text-[10.5px] font-bold tracking-[0.16em] text-naracs-700 uppercase">Iránykoszinuszok</p>
            <div className="szamok mt-1.5 text-[13px] text-naracs-900">
              <M>{`\\cos\\alpha = ${szK(e[0], 3)},\\quad \\cos\\beta = ${szK(e[1], 3)},\\quad \\cos\\gamma = ${szK(e[2], 3)}`}</M>
            </div>
            <p className="mt-1.5 text-[12.5px] text-naracs-800">
              Ezek a vektor és a három tengely szögének koszinuszai — épp az egységvektor koordinátái. Összeg-próba:{" "}
              <span className="szamok font-semibold">
                {sz(e[0] * e[0] + e[1] * e[1] + e[2] * e[2], 3)}
              </span>{" "}
              (mindig 1, ha a vektor nem nulla).
            </p>
          </div>

          <p className="mt-3 text-[12px] text-petrol-500">
            A szürke doboz élei a három komponens: a vektor az <M>{"\\mathbf{i}"}</M>,{" "}
            <M>{"\\mathbf{j}"}</M>, <M>{"\\mathbf{k}"}</M> irányú darabok összege. A hossz ezért a
            Pitagorasz-tétel kétszeri alkalmazása: előbb az alapsíkban, aztán függőlegesen.
          </p>
        </div>
      </div>
    </div>
  );
}
