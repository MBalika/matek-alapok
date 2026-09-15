"use client";

import { useState } from "react";
import { Csuszka } from "./Csuszka";
import {
  ForgatasFelirat,
  Felirat3D,
  Nyil3D,
  NyilHegyek3D,
  Racs3D,
  Szakasz3D,
  Tengelyek3D,
  keszitVetito,
  leptekIgazitas,
  useForgatas,
} from "./Ter3D";
import { M } from "@/components/ui/Keplet";
import { sz, szK } from "@/lib/szamok";
import { hossz, kul, nyujt, skalaris, szogFok, vekK } from "@/components/tergeometria/vektorok";

const SZ = 560;
const MA = 400;

/** Skaláris szorzat: hajlásszög, előjel, vetület és merőleges összetevő. */
export default function TerSkalarisFelfedezo() {
  const [u, setU] = useState([4, -1, 2]);
  const [v, setV] = useState([-2, 3, 1]);
  const { nezet, huzas, alaphelyzet } = useForgatas({ azimut: -48, emelkedes: 26 });

  const uv = skalaris(u, v);
  const v2 = skalaris(v, v);
  const upar = v2 > 1e-12 ? nyujt(uv / v2, v) : [0, 0, 0];
  const uperp = kul(u, upar);
  const fi = szogFok(u, v);
  const vetuletHossz = hossz(v) > 1e-12 ? uv / hossz(v) : 0;

  const leptek = leptekIgazitas(
    [u, v, upar, nyujt(1.9, v), nyujt(-1.6, v), [5.2, 0, 0], [0, 5.2, 0], [0, 0, 5.2], [-3.9, 0, 0], [0, -3.9, 0]],
    nezet,
    { felSzeles: 240, felMagas: 172, max: 36 },
  );
  const V = keszitVetito(nezet, { ox: 280, oy: 200, leptek });

  const allitU = (i) => (k) => setU((r) => r.map((x, j) => (j === i ? k : x)));
  const allitV = (i) => (k) => setV((r) => r.map((x, j) => (j === i ? k : x)));

  const tipus = Math.abs(uv) < 1e-9 ? "derek" : uv > 0 ? "hegyes" : "tompa";
  const jelSzin = tipus === "hegyes" ? "emerald" : tipus === "tompa" ? "rose" : "violet";

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

            {/* v iránya hosszabb segédegyenesként */}
            <Szakasz3D V={V} tol={nyujt(-1.6, v)} ig={nyujt(1.9, v)} szin="#94a3b8" szaggatott />

            {/* felbontás */}
            <Nyil3D V={V} ig={upar} szin="teal" vastagsag={2.6} />
            <Szakasz3D V={V} tol={upar} ig={u} szin="#7c3aed" szaggatott={false} vastagsag={1.6} opacitas={0.8} />
            <Nyil3D V={V} tol={upar} ig={u} szin="lila" vastagsag={2.4} />

            <Nyil3D V={V} ig={v} szin="kek" vastagsag={3} />
            <Nyil3D V={V} ig={u} szin="narancs" vastagsag={3.2} />

            <Felirat3D V={V} p={nyujt(1.08, u)} szin="narancs" dy={-12} meret={13}>
              u
            </Felirat3D>
            <Felirat3D V={V} p={nyujt(1.14, v)} szin="kek" dy={-12} meret={13}>
              v
            </Felirat3D>
            <Felirat3D V={V} p={nyujt(0.55, upar)} szin="teal" dy={20} meret={12}>
              u∥ (vetület)
            </Felirat3D>
            <Felirat3D
              V={V}
              p={[(upar[0] + u[0]) / 2, (upar[1] + u[1]) / 2, (upar[2] + u[2]) / 2]}
              szin="lila"
              dx={16}
              dy={4}
              meret={12}
              horgony="start"
            >
              u⊥
            </Felirat3D>
          </svg>
          <ForgatasFelirat nezet={nezet} />
        </div>

        <div className="p-5">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
            <div className="space-y-2">
              <p className="text-[11px] font-bold tracking-[0.14em] text-naracs-700 uppercase">u vektor</p>
              <Csuszka cimke="u₁" ertek={u[0]} min={-5} max={5} lepes={1} tizedes={0} onChange={allitU(0)} />
              <Csuszka cimke="u₂" ertek={u[1]} min={-5} max={5} lepes={1} tizedes={0} onChange={allitU(1)} />
              <Csuszka cimke="u₃" ertek={u[2]} min={-5} max={5} lepes={1} tizedes={0} onChange={allitU(2)} />
            </div>
            <div className="space-y-2">
              <p className="text-[11px] font-bold tracking-[0.14em] text-blue-700 uppercase">v irány</p>
              <Csuszka cimke="v₁" ertek={v[0]} min={-5} max={5} lepes={1} tizedes={0} onChange={allitV(0)} />
              <Csuszka cimke="v₂" ertek={v[1]} min={-5} max={5} lepes={1} tizedes={0} onChange={allitV(1)} />
              <Csuszka cimke="v₃" ertek={v[2]} min={-5} max={5} lepes={1} tizedes={0} onChange={allitV(2)} />
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {[
              ["KF‑1 adatai", [4, -1, 2], [-2, 3, 1]],
              ["hegyesszög", [3, 4, 5], [2, 1, 0]],
              ["merőleges", [1, 2, 2], [2, -1, 0]],
              ["tompaszög", [1, 1, 1], [-3, 1, 0]],
            ].map(([nev, uu, vv]) => (
              <button
                key={nev}
                type="button"
                onClick={() => {
                  setU(uu);
                  setV(vv);
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

          <div
            className={`mt-4 rounded-xl border px-4 py-3 ${
              jelSzin === "emerald"
                ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                : jelSzin === "rose"
                  ? "border-rose-200 bg-rose-50 text-rose-900"
                  : "border-violet-200 bg-violet-50 text-violet-900"
            }`}
          >
            <div className="szamok text-[13.5px]">
              <M>{`\\mathbf{u}\\cdot\\mathbf{v} = ${szK(uv, 0)}`}</M>
            </div>
            <p className="mt-1 text-[12.5px]">
              {tipus === "hegyes" && "A szorzat pozitív → hegyesszög, a vetület a v irányába mutat."}
              {tipus === "tompa" && "A szorzat negatív → tompaszög, a párhuzamos összetevő a v-vel ellentétes irányú."}
              {tipus === "derek" && "A szorzat nulla → a két vektor merőleges: nincs párhuzamos összetevő."}
            </p>
          </div>

          <div className="mt-3 rounded-xl bg-petrol-50 p-4">
            <div className="szamok space-y-1.5 text-[13px] text-petrol-800">
              <div>
                <M>{`|\\mathbf{u}| = ${szK(hossz(u), 3)},\\quad |\\mathbf{v}| = ${szK(hossz(v), 3)}`}</M>
              </div>
              <div>
                <M>{`\\cos\\varphi = \\frac{${szK(uv, 0)}}{${szK(hossz(u), 3)}\\cdot ${szK(hossz(v), 3)}} = ${szK(Math.cos((fi * Math.PI) / 180), 4)}\\ \\Rightarrow\\ \\varphi = ${szK(fi, 2)}^\\circ`}</M>
              </div>
              <div>
                <M>{`\\mathbf{u}_\\parallel = \\frac{${szK(uv, 0)}}{${szK(v2, 0)}}\\,\\mathbf{v} = ${vekK(upar, 3)}`}</M>
              </div>
              <div>
                <M>{`\\mathbf{u}_\\perp = \\mathbf{u} - \\mathbf{u}_\\parallel = ${vekK(uperp, 3)}`}</M>
              </div>
              <div className="text-petrol-600">
                <M>{`\\mathbf{u}\\cdot\\mathbf{e}_v = ${szK(vetuletHossz, 3)}`}</M>{" "}
                <span className="text-[12px]">(előjeles vetülethossz)</span>
              </div>
            </div>
          </div>

          <p className="mt-3 text-[12px] text-petrol-500">
            Próba: <M>{"\\mathbf{u}_\\perp\\cdot\\mathbf{v}"}</M> értéke{" "}
            <span className="szamok font-semibold">{sz(skalaris(uperp, v), 3)}</span> — mindig nulla, hiszen a
            merőleges összetevő definíció szerint merőleges a <M>{"\\mathbf{v}"}</M> irányra.
          </p>
        </div>
      </div>
    </div>
  );
}
