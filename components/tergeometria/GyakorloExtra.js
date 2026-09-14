"use client";

import GyakorloDoboz from "@/components/GyakorloDoboz";
import { M, MB } from "@/components/ui/Keplet";
import { szK } from "@/lib/szamok";
import {
  egyenesParamK,
  hossz,
  keresztDetK,
  kiteroTav,
  kul,
  nyujt,
  parhuzamos,
  pontEgyenesTav,
  sikEgyenletK,
  skalaris,
  vegyes,
  vektorialis,
  vekK,
  zar,
} from "./vektorok";

const egesz = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
const koord = () => egesz(-5, 6);
const pont = () => [koord(), koord(), koord()];
const valaszt = (t) => t[Math.floor(Math.random() * t.length)];

function nemNullVektor(min = -4, max = 4) {
  let v = [0, 0, 0];
  while (hossz(v) < 0.9) v = [egesz(min, max), egesz(min, max), egesz(min, max)];
  return v;
}

/* ---------- 1. Egyenes döféspontja a síkkal ---------- */

function dofespontFeladat() {
  let n = nemNullVektor(-3, 3);
  let v = nemNullVektor(-3, 3);
  let orseg = 0;
  while ((hossz(n) < 1.2 || Math.abs(skalaris(n, v)) < 0.5) && orseg < 300) {
    n = nemNullVektor(-3, 3);
    v = nemNullVektor(-3, 3);
    orseg += 1;
  }
  const Mp = pont(); // a döféspont — legyen egész
  const d = skalaris(n, Mp);
  const t0 = valaszt([-2, -1, 1, 2, 3]);
  const P = kul(Mp, nyujt(t0, v)); // így t = t0 a megoldás

  return {
    szoveg: (
      <div>
        <p>Hol döfi az alábbi egyenes a síkot? Add meg a döféspont koordinátáit és a hozzá tartozó t paramétert.</p>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          <div className="rounded-lg bg-violet-50 px-3 py-2">
            <span className="mb-1 block text-[12px] font-semibold text-violet-800">e</span>
            <M>{egyenesParamK(P, v, "t")}</M>
          </div>
          <div className="flex items-center rounded-lg bg-teal-50 px-3 py-2">
            <span className="mr-2 text-[12px] font-semibold text-teal-800">S:</span>
            <M>{sikEgyenletK(n, d)}</M>
          </div>
        </div>
      </div>
    ),
    sugo: (
      <p>
        Helyettesítsd be a paraméteres alakot a sík egyenletébe, és oldd meg <M>{"t"}</M>-re:{" "}
        <M>{"\\mathbf{n}\\cdot(\\mathbf{OP_0} + t\\mathbf{v}) = d_0"}</M>, azaz{" "}
        <M>{`t = \\dfrac{d_0 - \\mathbf{n}\\cdot\\mathbf{OP_0}}{\\mathbf{n}\\cdot\\mathbf{v}}`}</M>. Itt{" "}
        <M>{`\\mathbf{n}\\cdot\\mathbf{v} = ${szK(skalaris(n, v), 0)}`}</M> — nem nulla, tehát tényleg van
        döféspont.
      </p>
    ),
    mezok: [
      { id: "t", cimke: "t", helyes: t0, tizedes: 0, tures: 0.01 },
      { id: "x", cimke: "x", helyes: Mp[0], tizedes: 0, tures: 0.01 },
      { id: "y", cimke: "y", helyes: Mp[1], tizedes: 0, tures: 0.01 },
      { id: "z", cimke: "z", helyes: Mp[2], tizedes: 0, tures: 0.01 },
    ],
    megoldas: (
      <>
        <MB>{`\\mathbf{n} = ${vekK(n)},\\qquad \\mathbf{v} = ${vekK(v)},\\qquad \\mathbf{n}\\cdot\\mathbf{v} = ${szK(skalaris(n, v), 0)}`}</MB>
        <MB>{`\\mathbf{n}\\cdot\\mathbf{OP_0} = ${n.map((k, i) => `${zar(k)}\\cdot ${zar(P[i])}`).join(" + ")} = ${szK(skalaris(n, P), 0)}`}</MB>
        <MB>{`t = \\frac{${szK(d, 0)} - ${zar(skalaris(n, P))}}{${szK(skalaris(n, v), 0)}} = ${szK(t0, 0)}`}</MB>
        <MB>{`M = ${vekK(P)} + ${szK(t0, 0)}\\cdot ${vekK(v)} = ${vekK(Mp)}`}</MB>
        <p>
          Ellenőrzés: <M>{`${n.map((k, i) => `${zar(k)}\\cdot ${zar(Mp[i])}`).join(" + ")} = ${szK(d, 0)}`}</M> ✓ —
          a döféspont tényleg rajta van a síkon.
        </p>
      </>
    ),
  };
}

/* ---------- 2. Pont és egyenes távolsága ---------- */

function pontEgyenesFeladat() {
  let v = nemNullVektor(-4, 4);
  while (hossz(v) < 1.2) v = nemNullVektor(-4, 4);
  const P = pont();
  let Q = pont();
  let orseg = 0;
  while (hossz(vektorialis(kul(Q, P), v)) < 0.5 && orseg < 200) {
    Q = pont();
    orseg += 1;
  }
  const PQ = kul(Q, P);
  const c = vektorialis(PQ, v);
  const tav = pontEgyenesTav(Q, P, v);

  return {
    szoveg: (
      <p>
        Mekkora a <M>{`Q${vekK(Q)}`}</M> pont távolsága attól az egyenestől, amely a{" "}
        <M>{`P${vekK(P)}`}</M> ponton megy át és irányvektora <M>{`\\mathbf{v} = ${vekK(v)}`}</M>? Három
        tizedesre add meg.
      </p>
    ),
    sugo: (
      <p>
        A <M>{"\\overrightarrow{PQ}"}</M> és <M>{"\\mathbf{v}"}</M> egy paralelogrammát feszít ki: az alapja{" "}
        <M>{"|\\mathbf{v}|"}</M>, a magassága pedig épp a keresett távolság. Ezért{" "}
        <M>{"d = \\dfrac{|\\overrightarrow{PQ}\\times\\mathbf{v}|}{|\\mathbf{v}|}"}</M>. Itt{" "}
        <M>{`\\overrightarrow{PQ} = ${vekK(PQ)}`}</M>.
      </p>
    ),
    mezok: [{ id: "d", cimke: "Távolság", helyes: tav, tizedes: 3 }],
    megoldas: (
      <>
        <MB>{`\\overrightarrow{PQ} = ${vekK(Q)} - ${vekK(P)} = ${vekK(PQ)}`}</MB>
        <MB>{`\\overrightarrow{PQ}\\times\\mathbf{v} = ${keresztDetK(PQ, v)} = ${vekK(c)}`}</MB>
        <MB>{`\\left|\\overrightarrow{PQ}\\times\\mathbf{v}\\right| = \\sqrt{${c.map((k) => szK(k * k, 0)).join(" + ")}} = ${szK(hossz(c), 4)},\\qquad |\\mathbf{v}| = ${szK(hossz(v), 4)}`}</MB>
        <MB>{`d = \\frac{${szK(hossz(c), 4)}}{${szK(hossz(v), 4)}} = ${szK(tav, 4)}`}</MB>
        <p>
          Az egyenes pontjának megválasztása közömbös: az irányvektorral párhuzamos rész a vektoriális
          szorzatból kiesik.
        </p>
      </>
    ),
  };
}

/* ---------- 3. Két kitérő egyenes távolsága ---------- */

function kiteroFeladat() {
  let v1 = nemNullVektor(-3, 3);
  let v2 = nemNullVektor(-3, 3);
  let P = pont();
  let Q = pont();
  let orseg = 0;
  while (
    (hossz(v1) < 1.2 ||
      hossz(v2) < 1.2 ||
      parhuzamos(v1, v2) ||
      Math.abs(vegyes(kul(Q, P), v1, v2)) < 0.5) &&
    orseg < 400
  ) {
    v1 = nemNullVektor(-3, 3);
    v2 = nemNullVektor(-3, 3);
    P = pont();
    Q = pont();
    orseg += 1;
  }
  const n = vektorialis(v1, v2);
  const PQ = kul(Q, P);
  const vegy = skalaris(PQ, n);
  const tav = kiteroTav(P, v1, Q, v2);

  return {
    szoveg: (
      <div>
        <p>Mekkora a két egyenes távolsága? Három tizedesre add meg.</p>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          <div className="rounded-lg bg-teal-50 px-3 py-2">
            <span className="mb-1 block text-[12px] font-semibold text-teal-800">e</span>
            <M>{egyenesParamK(P, v1, "t")}</M>
          </div>
          <div className="rounded-lg bg-naracs-50 px-3 py-2">
            <span className="mb-1 block text-[12px] font-semibold text-naracs-800">f</span>
            <M>{egyenesParamK(Q, v2, "s")}</M>
          </div>
        </div>
      </div>
    ),
    sugo: (
      <p>
        <M>{"d = \\dfrac{\\left|\\overrightarrow{PQ}\\cdot(\\mathbf{v}_1\\times\\mathbf{v}_2)\\right|}{|\\mathbf{v}_1\\times\\mathbf{v}_2|}"}</M>{" "}
        — a számlálóban <strong>vegyes</strong> szorzat áll (a paralelepipedon térfogata), a nevezőben az
        alaplap területe. Itt <M>{`\\overrightarrow{PQ} = ${vekK(PQ)}`}</M>.
      </p>
    ),
    mezok: [{ id: "d", cimke: "Távolság", helyes: tav, tizedes: 3 }],
    megoldas: (
      <>
        <MB>{`\\mathbf{v}_1\\times\\mathbf{v}_2 = ${keresztDetK(v1, v2)} = ${vekK(n)}`}</MB>
        <MB>{`\\overrightarrow{PQ} = ${vekK(PQ)},\\qquad \\overrightarrow{PQ}\\cdot(\\mathbf{v}_1\\times\\mathbf{v}_2) = ${szK(vegy, 0)}`}</MB>
        <MB>{`|\\mathbf{v}_1\\times\\mathbf{v}_2| = \\sqrt{${n.map((k) => szK(k * k, 0)).join(" + ")}} = ${szK(hossz(n), 4)}`}</MB>
        <MB>{`d = \\frac{\\left|${szK(vegy, 0)}\\right|}{${szK(hossz(n), 4)}} = ${szK(tav, 4)}`}</MB>
        <p>
          Mivel <M>{`d \\ne 0`}</M>, a két egyenes valóban kitérő — ezt külön nem is kell vizsgálni, a nem
          nulla eredmény maga a bizonyíték.
        </p>
      </>
    ),
  };
}

/* ---------- 4. Vektor felbontása ---------- */

function felbontasFeladat() {
  let u = nemNullVektor(-5, 5);
  let v = nemNullVektor(-4, 4);
  let orseg = 0;
  while ((hossz(v) < 1.2 || hossz(u) < 1.2 || parhuzamos(u, v) || Math.abs(skalaris(u, v)) < 0.5) && orseg < 300) {
    u = nemNullVektor(-5, 5);
    v = nemNullVektor(-4, 4);
    orseg += 1;
  }
  const uv = skalaris(u, v);
  const v2 = skalaris(v, v);
  const upar = nyujt(uv / v2, v);
  const uperp = kul(u, upar);
  const vetulet = uv / hossz(v);

  return {
    szoveg: (
      <p>
        Bontsd fel az <M>{`\\mathbf{u} = ${vekK(u)}`}</M> vektort a <M>{`\\mathbf{v} = ${vekK(v)}`}</M>{" "}
        vektorral párhuzamos és arra merőleges összetevőre! Add meg az előjeles vetülethosszt{" "}
        <M>{"(\\mathbf{u}\\cdot\\mathbf{e}_v)"}</M>, valamint a két összetevő hosszát, három tizedesre.
      </p>
    ),
    sugo: (
      <p>
        <M>{"\\mathbf{u}_\\parallel = \\dfrac{\\mathbf{u}\\cdot\\mathbf{v}}{|\\mathbf{v}|^2}\\,\\mathbf{v}"}</M>,{" "}
        <M>{"\\mathbf{u}_\\perp = \\mathbf{u} - \\mathbf{u}_\\parallel"}</M>. A nevezőben azért áll{" "}
        <M>{"|\\mathbf{v}|^2"}</M>, mert kétszer kell normálni. Itt{" "}
        <M>{`\\mathbf{u}\\cdot\\mathbf{v} = ${szK(uv, 0)}`}</M> és <M>{`|\\mathbf{v}|^2 = ${szK(v2, 0)}`}</M>.
      </p>
    ),
    mezok: [
      { id: "vet", cimke: "u · eᵥ (előjeles vetülethossz)", helyes: vetulet, tizedes: 3 },
      { id: "par", cimke: "|u∥|", helyes: hossz(upar), tizedes: 3 },
      { id: "perp", cimke: "|u⊥|", helyes: hossz(uperp), tizedes: 3 },
    ],
    megoldas: (
      <>
        <MB>{`\\mathbf{u}\\cdot\\mathbf{v} = ${u.map((k, i) => `${zar(k)}\\cdot ${zar(v[i])}`).join(" + ")} = ${szK(uv, 0)},\\qquad |\\mathbf{v}|^2 = ${szK(v2, 0)}`}</MB>
        <MB>{`\\mathbf{u}\\cdot\\mathbf{e}_v = \\frac{${szK(uv, 0)}}{${szK(hossz(v), 4)}} = ${szK(vetulet, 4)}`}</MB>
        <MB>{`\\mathbf{u}_\\parallel = \\frac{${szK(uv, 0)}}{${szK(v2, 0)}}\\,${vekK(v)} = ${vekK(upar, 4)},\\qquad |\\mathbf{u}_\\parallel| = ${szK(hossz(upar), 4)}`}</MB>
        <MB>{`\\mathbf{u}_\\perp = ${vekK(u)} - ${vekK(upar, 4)} = ${vekK(uperp, 4)},\\qquad |\\mathbf{u}_\\perp| = ${szK(hossz(uperp), 4)}`}</MB>
        <p>
          Ellenőrzés: <M>{`\\mathbf{u}_\\perp\\cdot\\mathbf{v} = ${szK(skalaris(uperp, v), 3)}`}</M> (nulla), és{" "}
          <M>{`|\\mathbf{u}_\\parallel|^2 + |\\mathbf{u}_\\perp|^2 = ${szK(hossz(upar) ** 2 + hossz(uperp) ** 2, 3)} = |\\mathbf{u}|^2`}</M> —
          Pitagorasz. A vetület előjele {uv > 0 ? "pozitív: hegyesszög" : "negatív: tompaszög"}.
        </p>
      </>
    ),
  };
}

/* ---------- a szekció ---------- */

export const EXTRA_GENERATOROK = [
  { cim: "Egyenes döféspontja a síkkal", fn: dofespontFeladat },
  { cim: "Pont és egyenes távolsága", fn: pontEgyenesFeladat },
  { cim: "Két kitérő egyenes távolsága", fn: kiteroFeladat },
  { cim: "Vektor felbontása két összetevőre", fn: felbontasFeladat },
];

export default function GyakorloExtra() {
  return (
    <div>
      <GyakorloDoboz
        cim="Egyenes döféspontja a síkkal"
        leiras="A paraméteres alakot beírjuk a sík egyenletébe, és megoldjuk t-re."
        generator={dofespontFeladat}
      />
      <GyakorloDoboz
        cim="Pont és egyenes távolsága"
        leiras="Vektoriális szorzat: a paralelogramma területe osztva az alappal."
        generator={pontEgyenesFeladat}
        oszlopok={1}
      />
      <GyakorloDoboz
        cim="Két kitérő egyenes távolsága"
        leiras="Vegyes szorzat: a paralelepipedon térfogata osztva az alaplap területével."
        generator={kiteroFeladat}
        oszlopok={1}
      />
      <GyakorloDoboz
        cim="Vektor felbontása két összetevőre"
        leiras="Vetület a v irányra, majd a maradék — a két összetevő mindig merőleges egymásra."
        generator={felbontasFeladat}
      />
    </div>
  );
}
