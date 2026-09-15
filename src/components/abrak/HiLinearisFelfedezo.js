"use client";

import { useState } from "react";
import FvRajz from "./FvRajz";
import { Csuszka } from "./Csuszka";
import { M } from "@/components/ui/Keplet";
import { sz, szK } from "@/lib/szamok";

const TEAL = "#0f766e";
const NAR = "#e2590a";
const LILA = "#7c3aed";
const SZURKE = "#94a3b8";

/**
 * Az f(ax+b) szabály felfedezése: honnan jön az 1/a szorzó?
 * A lila szaggatott görbe a „szorzó nélküli” rossz tipp — a deriváltja a-szorosa
 * az integrandusnak.
 */

const CSALADOK = [
  {
    cimke: "cos",
    fNev: "\\cos",
    FNev: "\\sin",
    f: Math.cos,
    F: Math.sin,
    x: [-4, 4],
    y: [-3, 3],
  },
  {
    cimke: "sin",
    fNev: "\\sin",
    FNev: "-\\cos",
    f: Math.sin,
    F: (u) => -Math.cos(u),
    x: [-4, 4],
    y: [-3, 3],
  },
  {
    cimke: "eˣ",
    fNev: "e^{\\bullet}",
    FNev: "e^{\\bullet}",
    f: Math.exp,
    F: Math.exp,
    x: [-3, 1.6],
    y: [-2, 5],
    exp: true,
  },
  {
    cimke: "1/x",
    fNev: "\\frac{1}{\\bullet}",
    FNev: "\\ln\\left|\\bullet\\right|",
    f: (u) => (Math.abs(u) < 1e-9 ? NaN : 1 / u),
    F: (u) => (Math.abs(u) < 1e-9 ? NaN : Math.log(Math.abs(u))),
    x: [-3.2, 3.2],
    y: [-3, 3],
  },
];

/** Szám tömör alakja: egész esetén tizedesek nélkül (2, nem 2,0). */
const tomor = (v) => (Number.isInteger(v) ? String(v) : szK(v, 1));

/** A belső lineáris függvény LaTeX-alakja: „3x-2”, „-x”, „x+1”. */
function belso(a, b) {
  const eleje = a === 1 ? "x" : a === -1 ? "-x" : `${tomor(a)}x`;
  if (Math.abs(b) < 1e-9) return eleje;
  return `${eleje} ${b > 0 ? "+" : "-"} ${tomor(Math.abs(b))}`;
}

function alkalmaz(nev, arg) {
  return nev.includes("\\bullet") ? nev.replace("\\bullet", arg) : `${nev}\\left(${arg}\\right)`;
}

export default function HiLinearisFelfedezo() {
  const [i, setI] = useState(0);
  const [a, setA] = useState(2);
  const [b, setB] = useState(0);
  const [rossz, setRossz] = useState(true);

  const CS = CSALADOK[i];
  const aTiszta = Math.abs(a) < 0.25 ? (a >= 0 ? 0.5 : -0.5) : a;

  const fBelso = (x) => CS.f(aTiszta * x + b);
  const FHelyes = (x) => CS.F(aTiszta * x + b) / aTiszta;
  const FRossz = (x) => CS.F(aTiszta * x + b);

  /* A címkék külön x-helyre kerülnek, hogy ne fedjék egymást. */
  const szel = CS.x[1] - CS.x[0];
  const cx = (u) => CS.x[0] + szel * u;

  const gorbek = [
    { fn: CS.f, szin: SZURKE, vastag: 1.8, szaggatott: true, cimke: "f(x)", cimkeX: cx(0.16) },
    { fn: fBelso, szin: TEAL, vastag: 2.8, cimke: "f(ax+b)", cimkeX: cx(0.42) },
    { fn: FHelyes, szin: NAR, vastag: 2.8, cimke: "a primitív", cimkeX: cx(0.68) },
  ];
  if (rossz) {
    gorbek.push({
      fn: FRossz,
      szin: LILA,
      vastag: 2,
      szaggatott: true,
      cimke: "rossz tipp",
      cimkeX: cx(0.9),
    });
  }

  const arg = belso(aTiszta, b);
  const fLatex = alkalmaz(CS.fNev, arg);
  const FLatex = alkalmaz(CS.FNev, arg);
  const egyutt = aTiszta === 1 ? "" : aTiszta === -1 ? "-" : `\\frac{1}{${tomor(aTiszta)}}`;

  /* Ellenőrzés egy konkrét helyen: numerikus derivált. */
  const xProba = 0.7;
  const h = 1e-5;
  const derJo = (FHelyes(xProba + h) - FHelyes(xProba - h)) / (2 * h);
  const derRossz = (FRossz(xProba + h) - FRossz(xProba - h)) / (2 * h);
  const cel = fBelso(xProba);

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <FvRajz
            xMin={CS.x[0]}
            xMax={CS.x[1]}
            yMin={CS.y[0]}
            yMax={CS.y[1]}
            gorbek={gorbek}
            className="abra w-full touch-none select-none"
          />
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            Szürke: az eredeti f. Teal: az összenyomott f(ax+b). Narancs: a helyes primitív függvény.
            {rossz ? " Lila szaggatott: a szorzó nélküli, rossz tipp." : ""}
          </p>
        </div>

        <div className="p-5">
          <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">Az alapfüggvény</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {CSALADOK.map((c, j) => (
              <button
                key={c.cimke}
                type="button"
                onClick={() => setI(j)}
                className={`rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition ${
                  i === j
                    ? "bg-petrol-700 text-white"
                    : "bg-white text-petrol-600 ring-1 ring-petrol-200 hover:bg-petrol-50"
                }`}
              >
                {c.cimke}
              </button>
            ))}
          </div>

          <div className="mt-4 space-y-3">
            <Csuszka cimke="a — a belső meredekség" ertek={a} min={-3} max={3} lepes={0.5} tizedes={1} onChange={setA} />
            <Csuszka cimke="b — a belső eltolás" ertek={b} min={-3} max={3} lepes={0.5} tizedes={1} onChange={setB} />
          </div>
          {Math.abs(a) < 0.25 && (
            <p className="mt-2 text-[12px] text-rose-700">
              Az <M>{"a = 0"}</M> nem megengedett (akkor a belső függvény konstans) — az ábra a = {sz(aTiszta, 1)}
              -del számol.
            </p>
          )}

          <div className="mt-4 rounded-xl border border-naracs-200 bg-naracs-50 p-4">
            <p className="text-[10.5px] font-bold tracking-[0.16em] text-naracs-700 uppercase">A szabály</p>
            <div className="szamok finom-gorgeto mt-1.5 overflow-x-auto text-[14px] text-naracs-900">
              <M>{`\\int ${fLatex}\\,dx = ${egyutt}${FLatex}+C`}</M>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setRossz((v) => !v)}
            className={`mt-3 rounded-lg px-2.5 py-1.5 text-[12px] font-medium ring-1 transition ${
              rossz
                ? "bg-violet-600 text-white ring-violet-600"
                : "bg-white text-violet-700 ring-violet-200 hover:bg-violet-50"
            }`}
          >
            {rossz ? "A rossz tipp elrejtése" : "Mi lenne szorzó nélkül?"}
          </button>

          <div className="mt-4 rounded-xl border border-petrol-200 bg-white p-4">
            <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">
              Ellenőrzés az x = 0,7 helyen
            </p>
            <div className="szamok mt-2 space-y-1 text-[13px] text-petrol-800">
              <p>
                az integrandus: <strong>{sz(cel, 4)}</strong>
              </p>
              <p className="text-naracs-800">
                a jó primitív deriváltja: <strong>{sz(derJo, 4)}</strong> ✓
              </p>
              {rossz && (
                <p className="text-violet-800">
                  a szorzó nélkülié: <strong>{sz(derRossz, 4)}</strong> — ez éppen{" "}
                  <strong>{sz(aTiszta, 1)}</strong>-szorosa a kelleténél
                </p>
              )}
            </div>
          </div>

          <p className="mt-3 text-[12.5px] leading-relaxed text-petrol-500">
            A láncszabály deriváláskor <em>megszoroz</em> a belső deriválttal, vagyis <M>{"a"}</M>-val. Integráláskor
            ezt kell kiegyenlíteni, ezért osztunk vele. A <M>{"b"}</M> csak eltol — arra nem kell szorzó.
          </p>
        </div>
      </div>
    </div>
  );
}
