"use client";

import { useState } from "react";
import { M, MB } from "@/components/ui/Keplet";
import { sz, szK } from "@/lib/szamok";
import {
  K, abszolut, argFok, algK, trigK, konjugalt, osszeg, kulonbseg, szorzat, hanyados,
  hatvany, gyokok, negyed, zarojelesK, radFelirat,
} from "@/lib/komplex";

function szamma(s) {
  const v = Number(String(s).replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(v) ? v : 0;
}

function Mezo({ cimke, ertek, onChange, egyseg }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[12px] font-medium text-petrol-600">{cimke}</span>
      <div className="flex items-center overflow-hidden rounded-lg border border-petrol-200 bg-white focus-within:border-petrol-400 focus-within:ring-2 focus-within:ring-petrol-100">
        <input
          type="text"
          inputMode="decimal"
          value={ertek}
          onChange={(e) => onChange(e.target.value)}
          className="szamok w-full bg-transparent px-3 py-2 text-[14px] text-petrol-900 outline-none"
        />
        {egyseg && (
          <span className="shrink-0 border-l border-petrol-100 bg-petrol-50 px-2.5 py-2 text-[12.5px] text-petrol-500">{egyseg}</span>
        )}
      </div>
    </label>
  );
}

function Eredmeny({ cimke, children }) {
  return (
    <div className="rounded-lg border border-petrol-100 bg-petrol-50/60 px-3.5 py-2.5">
      <p className="text-[10.5px] font-bold tracking-wider text-petrol-500 uppercase">{cimke}</p>
      <div className="szamok mt-1 text-[14px] text-petrol-900">{children}</div>
    </div>
  );
}

/** Két komplex szám: négy alapművelet, konjugált, abszolút érték, trigonometrikus alak. */
export function KomplexMuveletKalk() {
  const [m, setM] = useState({ a1: "4", b1: "3", a2: "8", b2: "-5" });
  const z1 = K(szamma(m.a1), szamma(m.b1));
  const z2 = K(szamma(m.a2), szamma(m.b2));
  const nulla2 = abszolut(z2) < 1e-12;
  const allit = (k) => (v) => setM((r) => ({ ...r, [k]: v }));

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="text-[10.5px] font-bold tracking-[0.16em] text-naracs-600 uppercase">Bemenet</p>
          <div className="mt-3 space-y-4">
            <div className="rounded-xl border border-naracs-200 bg-naracs-50/60 p-3">
              <p className="mb-2 text-[12.5px] font-semibold text-petrol-800">z₁ = a₁ + b₁i</p>
              <div className="grid grid-cols-2 gap-2">
                <Mezo cimke="a₁" ertek={m.a1} onChange={allit("a1")} />
                <Mezo cimke="b₁" ertek={m.b1} onChange={allit("b1")} />
              </div>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3">
              <p className="mb-2 text-[12.5px] font-semibold text-petrol-800">z₂ = a₂ + b₂i</p>
              <div className="grid grid-cols-2 gap-2">
                <Mezo cimke="a₂" ertek={m.a2} onChange={allit("a2")} />
                <Mezo cimke="b₂" ertek={m.b2} onChange={allit("b2")} />
              </div>
            </div>
            <button
              type="button"
              onClick={() => setM({ a1: "4", b1: "3", a2: "8", b2: "-5" })}
              className="rounded-lg bg-white px-3 py-1.5 text-[12px] font-medium text-petrol-600 ring-1 ring-petrol-200 transition hover:bg-petrol-50"
            >
              Alaphelyzet (a kidolgozott példa adatai)
            </button>
          </div>
        </div>

        <div className="space-y-2.5">
          <div className="grid gap-2.5 sm:grid-cols-2">
            <Eredmeny cimke="z₁ + z₂"><M>{algK(osszeg(z1, z2), 3)}</M></Eredmeny>
            <Eredmeny cimke="z₁ − z₂"><M>{algK(kulonbseg(z1, z2), 3)}</M></Eredmeny>
            <Eredmeny cimke="z₁ · z₂"><M>{algK(szorzat(z1, z2), 3)}</M></Eredmeny>
            <Eredmeny cimke="z₁ / z₂">
              {nulla2 ? <span className="text-rose-600">nullával nem osztunk</span> : <M>{algK(hanyados(z1, z2), 3)}</M>}
            </Eredmeny>
          </div>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {[z1, z2].map((z, i) => (
              <div key={i} className="rounded-lg border border-petrol-100 px-3.5 py-2.5">
                <p className="text-[10.5px] font-bold tracking-wider text-petrol-500 uppercase">z{i === 0 ? "₁" : "₂"} jellemzői</p>
                <div className="szamok mt-1 space-y-1 text-[13px] text-petrol-800">
                  <div><M>{`\\bar z = ${algK(konjugalt(z), 3)}`}</M></div>
                  <div><M>{`|z| = ${szK(abszolut(z), 4)}`}</M></div>
                  <div><M>{`\\varphi = ${szK(argFok(z), 2)}^\\circ = ${radFelirat(argFok(z))}`}</M></div>
                  <div className="text-[12.5px] text-petrol-600"><M>{`z = ${trigK(z, 3, 2)}`}</M></div>
                  <div className="text-[12px] text-petrol-500">{negyed(z)}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-lg bg-petrol-50 px-3.5 py-2.5 text-[12.5px] text-petrol-600">
            Az osztás levezetése:{" "}
            <M>{`\\dfrac{z_1}{z_2} = \\dfrac{z_1\\bar{z_2}}{|z_2|^2} = \\dfrac{${algK(szorzat(z1, konjugalt(z2)), 3)}}{${szK(abszolut(z2) ** 2, 3)}}`}</M>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Hatványozás és gyökvonás trigonometrikus alakban. */
export function KomplexGyokKalk() {
  const [m, setM] = useState({ a: "-128", b: "-221.703", n: "4" });
  const z = K(szamma(m.a), szamma(m.b));
  const n = Math.max(1, Math.min(12, Math.round(szamma(m.n)) || 1));
  const r = abszolut(z);
  const fi = argFok(z);
  const h = hatvany(z, n);
  const w = gyokok(z, n);
  const allit = (k) => (v) => setM((s) => ({ ...s, [k]: v }));

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="text-[10.5px] font-bold tracking-[0.16em] text-naracs-600 uppercase">Bemenet</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <Mezo cimke="a (valós rész)" ertek={m.a} onChange={allit("a")} />
            <Mezo cimke="b (képzetes)" ertek={m.b} onChange={allit("b")} />
            <Mezo cimke="n (1–12)" ertek={m.n} onChange={allit("n")} />
          </div>
          <div className="mt-3 rounded-xl bg-petrol-50 p-3.5">
            <p className="text-[10.5px] font-bold tracking-wider text-petrol-500 uppercase">Trigonometrikus alak</p>
            <div className="szamok mt-1.5 space-y-1 text-[13px] text-petrol-800">
              <div><M>{`r = ${szK(r, 4)}`}</M></div>
              <div><M>{`\\varphi = ${szK(fi, 2)}^\\circ`}</M> <span className="text-petrol-500">({negyed(z)})</span></div>
              <div><M>{`z = ${trigK(z, 3, 2)}`}</M></div>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {[
              ["−128 − 128√3 i, n = 4", { a: "-128", b: "-221.703", n: "4" }],
              ["8i, n = 3", { a: "0", b: "8", n: "3" }],
              ["1 + i, n = 10", { a: "1", b: "1", n: "10" }],
              ["−36, n = 2", { a: "-36", b: "0", n: "2" }],
            ].map(([nev, ertek]) => (
              <button key={nev} type="button" onClick={() => setM(ertek)} className="rounded-lg bg-white px-2.5 py-1.5 text-[12px] font-medium text-petrol-600 ring-1 ring-petrol-200 transition hover:bg-petrol-50">
                {nev}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Eredmeny cimke={`Hatvány: z^${n} (Moivre)`}>
            <M>{`z^{${n}} = ${szK(r, 3)}^{${n}}\\left(\\cos ${n}\\cdot ${szK(fi, 2)}^\\circ + i\\sin ${n}\\cdot${szK(fi, 2)}^\\circ\\right) = ${algK(h, 3)}`}</M>
          </Eredmeny>
          <div className="overflow-hidden rounded-lg border border-violet-200">
            <div className="bg-violet-50 px-3.5 py-2 text-[10.5px] font-bold tracking-wider text-violet-800 uppercase">
              Gyökök: az n = {n} darab {n}-edik gyök · ρ = {sz(w[0].r, 4)}
            </div>
            <table className="szamok w-full text-[13px]">
              <thead className="text-[10.5px] text-petrol-500 uppercase">
                <tr>
                  <th className="px-3 py-1.5 text-left font-semibold">k</th>
                  <th className="px-3 py-1.5 text-left font-semibold">αₖ = (φ + k·360°)/n</th>
                  <th className="px-3 py-1.5 text-left font-semibold">wₖ algebrai alakban</th>
                </tr>
              </thead>
              <tbody>
                {w.map((p) => (
                  <tr key={p.k} className="border-t border-violet-100">
                    <td className="px-3 py-1.5">{p.k}</td>
                    <td className="px-3 py-1.5">{sz(p.fok, 2)}°</td>
                    <td className="px-3 py-1.5"><M>{algK(K(p.a, p.b), 4)}</M></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[12.5px] text-petrol-500">
            Ellenőrzés: bármelyik gyököt {n}-edik hatványra emelve vissza kell kapni a{" "}
            <M>{algK(z, 3)}</M> számot. Az első gyök hatványa:{" "}
            <M>{algK(hatvany(K(w[0].a, w[0].b), n), 3)}</M>.
          </p>
        </div>
      </div>
    </div>
  );
}
