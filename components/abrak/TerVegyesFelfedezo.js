"use client";

import { useState } from "react";
import { Csuszka } from "./Csuszka";
import {
  ForgatasFelirat,
  Felirat3D,
  Nyil3D,
  NyilHegyek3D,
  Racs3D,
  Tengelyek3D,
  Test3D,
  illeszt,
  keszitVetito,
  useForgatas,
} from "./Ter3D";
import { M } from "@/components/ui/Keplet";
import { sz, szK } from "@/lib/szamok";
import { determinansK, hossz, vegyes, vektorialis, vekK } from "@/components/tergeometria/vektorok";

const SZ = 560;
const MA = 400;

/** Vegyes szorzat: paralelepipedon, előjeles térfogat, komplanaritás. */
export default function TerVegyesFelfedezo() {
  const [a, setA] = useState([3, 1, 2]);
  const [b, setB] = useState([1, 3, 3]);
  const [c, setC] = useState([-1, -2, 5]);
  const { nezet, huzas, alaphelyzet } = useForgatas();

  const det = vegyes(a, b, c);
  const alap = hossz(vektorialis(a, b));
  const magassag = alap > 1e-9 ? Math.abs(det) / alap : 0;

  const sarkok = [];
  for (const i of [0, 1]) {
    for (const j of [0, 1]) {
      for (const k of [0, 1]) {
        sarkok.push([a[0] * i + b[0] * j + c[0] * k, a[1] * i + b[1] * j + c[1] * k, a[2] * i + b[2] * j + c[2] * k]);
      }
    }
  }
  const { leptek, ox, oy } = illeszt(
    [...sarkok, [4.6, 0, 0], [0, 4.6, 0], [0, 0, 4.6], [-3.5, 0, 0], [0, -3.5, 0]],
    nezet,
    { szeles: SZ, magas: MA, margo: 40, max: 34 },
  );
  const V = keszitVetito(nezet, { ox, oy, leptek });

  const allit = (setter) => (i) => (k) => setter((r) => r.map((x, j) => (j === i ? k : x)));
  const allitC = allit(setC);

  const lapos = Math.abs(det) < 1e-9;

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
            <Tengelyek3D V={V} hossz={4.6} />

            <Test3D V={V} a={a} b={b} c={c} szin="#0f766e" kitoltes={lapos ? 0.3 : 0.1} />

            <Nyil3D V={V} ig={a} szin="narancs" vastagsag={3} />
            <Nyil3D V={V} ig={b} szin="kek" vastagsag={3} />
            <Nyil3D V={V} ig={c} szin="lila" vastagsag={3} />

            <Felirat3D V={V} p={a} szin="narancs" dy={-9} dx={6}>
              a
            </Felirat3D>
            <Felirat3D V={V} p={b} szin="kek" dy={-9} dx={6}>
              b
            </Felirat3D>
            <Felirat3D V={V} p={c} szin="lila" dy={-9} dx={6}>
              c
            </Felirat3D>
          </svg>
          <ForgatasFelirat nezet={nezet} />
        </div>

        <div className="p-5">
          <p className="text-[11px] font-bold tracking-[0.14em] text-violet-700 uppercase">c vektor — ezt állítod</p>
          <div className="mt-2 space-y-2">
            <Csuszka cimke="c₁" ertek={c[0]} min={-5} max={5} lepes={1} tizedes={0} onChange={allitC(0)} />
            <Csuszka cimke="c₂" ertek={c[1]} min={-5} max={5} lepes={1} tizedes={0} onChange={allitC(1)} />
            <Csuszka cimke="c₃" ertek={c[2]} min={-5} max={5} lepes={1} tizedes={0} onChange={allitC(2)} />
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {[
              ["KF‑3 élvektorai", [3, 1, 2], [1, 3, 3], [-1, -2, 5]],
              ["egységkocka", [1, 0, 0], [0, 1, 0], [0, 0, 1]],
              ["komplanáris", [1, 2, 3], [2, -1, 1], [4, 3, 7]],
              ["negatív előjel", [1, 0, 0], [0, 1, 0], [0, 0, -2]],
            ].map(([nev, aa, bb, cc]) => (
              <button
                key={nev}
                type="button"
                onClick={() => {
                  setA(aa);
                  setB(bb);
                  setC(cc);
                }}
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
              <div className="text-[12.5px] text-petrol-600">
                <M>{`\\mathbf{a} = ${vekK(a)},\\ \\mathbf{b} = ${vekK(b)},\\ \\mathbf{c} = ${vekK(c)}`}</M>
              </div>
              <div>
                <M>{`(\\mathbf{a}\\times\\mathbf{b})\\cdot\\mathbf{c} = ${determinansK(a, b, c)} = ${szK(det, 0)}`}</M>
              </div>
              <div>
                <M>{`V_{\\text{paralelepipedon}} = |${szK(det, 0)}| = ${szK(Math.abs(det), 0)}`}</M>
              </div>
              <div>
                <M>{`V_{\\text{tetraéder}} = \\tfrac16\\cdot ${szK(Math.abs(det), 0)} = ${szK(Math.abs(det) / 6, 4)}`}</M>
              </div>
              <div className="text-petrol-600">
                <M>{`T_{\\text{alap}} = |\\mathbf{a}\\times\\mathbf{b}| = ${szK(alap, 3)},\\qquad m = \\frac{V}{T} = ${szK(magassag, 3)}`}</M>
              </div>
            </div>
          </div>

          <div
            className={`mt-3 rounded-xl border px-4 py-3 text-[12.5px] ${
              lapos
                ? "border-rose-200 bg-rose-50 text-rose-900"
                : det > 0
                  ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                  : "border-naracs-200 bg-naracs-50 text-naracs-900"
            }`}
          >
            {lapos && (
              <>
                <strong>A vegyes szorzat nulla:</strong> a három vektor <strong>komplanáris</strong> — a test
                lapos, nincs térfogata. Ez a leggyorsabb „egy síkban vannak-e?” teszt.
              </>
            )}
            {!lapos && det > 0 && (
              <>
                <strong>Pozitív előjel:</strong> az <M>{"\\mathbf{a}, \\mathbf{b}, \\mathbf{c}"}</M> hármas{" "}
                <strong>jobbsodrású</strong> — a <M>{"\\mathbf{c}"}</M> ugyanarra az oldalra mutat, mint az{" "}
                <M>{"\\mathbf{a}\\times\\mathbf{b}"}</M>.
              </>
            )}
            {!lapos && det < 0 && (
              <>
                <strong>Negatív előjel:</strong> a hármas <strong>balsodrású</strong>. A térfogat persze az
                abszolút érték — az előjel csak a körüljárásról szól.
              </>
            )}
          </div>

          <p className="mt-3 text-[12px] text-petrol-500">
            A determináns értéke = alapterület × (előjeles) magasság. Ha a <M>{"\\mathbf{c}"}</M>-t az{" "}
            <M>{"\\mathbf{a}, \\mathbf{b}"}</M> síkjába viszed, a magasság nullára fogy, és a szorzat is eltűnik.
            Most a magasság {sz(magassag, 2)} egység.
          </p>
        </div>
      </div>
    </div>
  );
}
