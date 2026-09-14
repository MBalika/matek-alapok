"use client";

import { useState } from "react";
import { Csuszka } from "./Csuszka";
import {
  ForgatasFelirat,
  Felirat3D,
  Nyil3D,
  NyilHegyek3D,
  Racs3D,
  Sik3D,
  Tengelyek3D,
  keszitVetito,
  leptekIgazitas,
  useForgatas,
} from "./Ter3D";
import { M } from "@/components/ui/Keplet";
import { sz, szK } from "@/lib/szamok";
import { egyseg, hossz, nyujt, szogFok, vektorialis, vekK, zar } from "@/components/tergeometria/vektorok";

const SZ = 560;
const MA = 400;
const NYIL_HOSSZ = 3.4; // a szorzatvektort rövidített hosszal rajzoljuk

/** Vektoriális szorzat: paralelogramma, merőleges szorzatvektor, jobbkéz-szabály, sorrendcsere. */
export default function TerVektorialisFelfedezo() {
  const [a, setA] = useState([3, -1, 2]);
  const [b, setB] = useState([5, 4, -1]);
  const [csere, setCsere] = useState(false);
  const { nezet, huzas, alaphelyzet } = useForgatas();

  const elso = csere ? b : a;
  const masodik = csere ? a : b;
  const c = vektorialis(elso, masodik);
  const terulet = hossz(c);
  const fi = szogFok(a, b);
  const rajzolt = terulet > 1e-9 ? nyujt(NYIL_HOSSZ, egyseg(c)) : [0, 0, 0];

  const leptek = leptekIgazitas(
    [a, b, [a[0] + b[0], a[1] + b[1], a[2] + b[2]], rajzolt, [5.2, 0, 0], [0, 5.2, 0], [0, 0, 5.2], [-3.9, 0, 0], [0, -3.9, 0]],
    nezet,
    { felSzeles: 240, felMagas: 172, max: 32 },
  );
  const V = keszitVetito(nezet, { ox: 280, oy: 200, leptek });

  const allitA = (i) => (k) => setA((r) => r.map((x, j) => (j === i ? k : x)));
  const allitB = (i) => (k) => setB((r) => r.map((x, j) => (j === i ? k : x)));

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

            <Sik3D V={V} pont={[0, 0, 0]} u={a} w={b} szin="#0f766e" kitoltes={0.14} keret={1.4} />

            <Nyil3D V={V} ig={a} szin="narancs" vastagsag={3.2} />
            <Nyil3D V={V} ig={b} szin="kek" vastagsag={3.2} />
            <Nyil3D V={V} ig={rajzolt} szin="lila" vastagsag={3.2} />

            <Felirat3D V={V} p={nyujt(1.08, a)} szin="narancs" dy={-8}>
              a
            </Felirat3D>
            <Felirat3D V={V} p={nyujt(1.08, b)} szin="kek" dy={-8}>
              b
            </Felirat3D>
            <Felirat3D V={V} p={nyujt(1.12, rajzolt)} szin="lila" dy={-8} meret={12.5}>
              {csere ? "b × a" : "a × b"}
            </Felirat3D>
            <Felirat3D
              V={V}
              p={[(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2]}
              szin="teal"
              meret={12}
              dy={6}
            >
              T = {sz(terulet, 2)}
            </Felirat3D>
          </svg>
          <ForgatasFelirat nezet={nezet} />
        </div>

        <div className="p-5">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
            <div className="space-y-2">
              <p className="text-[11px] font-bold tracking-[0.14em] text-naracs-700 uppercase">a vektor</p>
              <Csuszka cimke="a₁" ertek={a[0]} min={-5} max={5} lepes={1} tizedes={0} onChange={allitA(0)} />
              <Csuszka cimke="a₂" ertek={a[1]} min={-5} max={5} lepes={1} tizedes={0} onChange={allitA(1)} />
              <Csuszka cimke="a₃" ertek={a[2]} min={-5} max={5} lepes={1} tizedes={0} onChange={allitA(2)} />
            </div>
            <div className="space-y-2">
              <p className="text-[11px] font-bold tracking-[0.14em] text-blue-700 uppercase">b vektor</p>
              <Csuszka cimke="b₁" ertek={b[0]} min={-5} max={5} lepes={1} tizedes={0} onChange={allitB(0)} />
              <Csuszka cimke="b₂" ertek={b[1]} min={-5} max={5} lepes={1} tizedes={0} onChange={allitB(1)} />
              <Csuszka cimke="b₃" ertek={b[2]} min={-5} max={5} lepes={1} tizedes={0} onChange={allitB(2)} />
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setCsere((x) => !x)}
              className="rounded-lg bg-naracs-500 px-3 py-1.5 text-[12.5px] font-semibold text-white transition hover:bg-naracs-600"
            >
              ⇄ {csere ? "vissza: a × b" : "csere: b × a"}
            </button>
            {[
              ["KF‑2 adatai", [3, -1, 2], [5, 4, -1]],
              ["i × j = k", [1, 0, 0], [0, 1, 0]],
              ["párhuzamos", [1, 2, 2], [2, 4, 4]],
            ].map(([nev, aa, bb]) => (
              <button
                key={nev}
                type="button"
                onClick={() => {
                  setA(aa);
                  setB(bb);
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
              <div>
                <M>{`${csere ? "\\mathbf{b}\\times\\mathbf{a}" : "\\mathbf{a}\\times\\mathbf{b}"} = ${vekK(c)}`}</M>
              </div>
              <div className="text-[12.5px] text-petrol-600">
                <M>{`(\\text{első koordináta: } ${zar(elso[1])}\\cdot ${zar(masodik[2])} - ${zar(elso[2])}\\cdot ${zar(masodik[1])} = ${szK(c[0], 0)})`}</M>
              </div>
              <div>
                <M>{`|${csere ? "\\mathbf{b}\\times\\mathbf{a}" : "\\mathbf{a}\\times\\mathbf{b}"}| = ${szK(terulet, 4)}`}</M>
              </div>
              <div>
                <M>{`T_{\\triangle} = \\tfrac12\\,${szK(terulet, 4)} = ${szK(terulet / 2, 4)}`}</M>
              </div>
              <div className="text-petrol-600">
                <M>{`\\varphi = ${Number.isFinite(fi) ? `${szK(fi, 2)}^\\circ` : "-"},\\qquad |\\mathbf{a}||\\mathbf{b}|\\sin\\varphi = ${szK(hossz(a) * hossz(b) * Math.sin((fi * Math.PI) / 180), 4)}`}</M>
              </div>
            </div>
          </div>

          <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-[12.5px] text-emerald-900">
            <strong>Merőlegesség-próba:</strong>{" "}
            <span className="szamok">
              (a×b)·a = {sz(c[0] * elso[0] + c[1] * elso[1] + c[2] * elso[2], 3)}
            </span>{" "}
            és{" "}
            <span className="szamok">
              (a×b)·b = {sz(c[0] * masodik[0] + c[1] * masodik[1] + c[2] * masodik[2], 3)}
            </span>{" "}
            — mindkettő nulla, a szorzat tényleg merőleges a síkra.
            {terulet < 1e-9 && " Most a két vektor párhuzamos, ezért a szorzat a nullvektor."}
          </div>

          <p className="mt-3 text-[12px] text-petrol-500">
            A lila nyilat rövidítve rajzoljuk (a valódi hossza {sz(terulet, 2)} egység volna) — az{" "}
            <strong>iránya</strong> a lényeg. A <em>csere</em> gombbal látszik, hogy{" "}
            <M>{"\\mathbf{b}\\times\\mathbf{a} = -(\\mathbf{a}\\times\\mathbf{b})"}</M>: ugyanaz az
            egyenes, ellentétes irányítással.
          </p>
        </div>
      </div>
    </div>
  );
}
