"use client";

import { useMemo, useState } from "react";
import SorRajz from "./SorRajz";
import { Csuszka } from "./Csuszka";
import { forditKifejezes, tagokat } from "./SorKifejezes";
import { M } from "@/components/ui/Keplet";
import { sz } from "@/lib/szamok";

/** Néhány jellegzetes sorozat — a gombokkal azonnal betölthető. */
const KESZLET = [
  { cimke: "(−1)ⁿ⁄n", keplet: "(-1)^n/n", latex: "a_n = \\frac{(-1)^n}{n}", jelleg: "Nullsorozat, de nem monoton: a tagok felváltva jönnek jobbról és balról." },
  { cimke: "n⁄(n+1)", keplet: "n/(n+1)", latex: "a_n = \\frac{n}{n+1}", jelleg: "Szigorúan nő, felülről korlátos (1 alatt marad) — monoton és korlátos, tehát konvergens." },
  { cimke: "(2n+1)⁄(n+3)", keplet: "(2*n+1)/(n+3)", latex: "a_n = \\frac{2n+1}{n+3}", jelleg: "A küszöbindexes példa: alulról nő a 2-höz. Ugyanez a sorozat jön vissza a KF‑1-ben." },
  { cimke: "2ⁿ⁄n!", keplet: "2^n/fakt(n)", latex: "a_n = \\frac{2^n}{n!}", jelleg: "Az első két tag egyenlő (2 és 2), utána zuhan: a faktoriális erősebb az exponenciálisnál." },
  { cimke: "√n", keplet: "sqrt(n)", latex: "a_n = \\sqrt{n}", jelleg: "Monoton nő, de nem korlátos — divergens, tágabb értelemben +∞." },
  { cimke: "sin n", keplet: "sin(n)", latex: "a_n = \\sin n", jelleg: "Korlátos (|sin n| ≤ 1), de nincs határértéke: a tagok végtelen sok értékhez torlódnak." },
  { cimke: "(1+1⁄n)ⁿ", keplet: "(1+1/n)^n", latex: "a_n = \\left(1+\\frac1n\\right)^n", jelleg: "Az e szám sorozata: lassan nő, és a 3-at soha nem éri el." },
  { cimke: "(−1)ⁿ·(1+1⁄n)", keplet: "(-1)^n*(1+1/n)", latex: "a_n = (-1)^n\\left(1+\\frac1n\\right)", jelleg: "Két torlódási pont (−1 és 1), amelyeket a sorozat egyszer sem vesz fel. Divergens." },
];

export default function SorozatRajzolo() {
  const [valasztott, setValasztott] = useState(2);
  const [sajat, setSajat] = useState("");
  const [n, setN] = useState(24);

  const keplet = sajat.trim() ? sajat : KESZLET[valasztott].keplet;
  const forditva = useMemo(() => forditKifejezes(keplet, ["n"]), [keplet]);

  const tagok = useMemo(() => {
    if (!forditva.ok) return [];
    return tagokat(forditva.fn, 1, n);
  }, [forditva, n]);

  const ervenyes = tagok.filter((t) => Number.isFinite(t.ertek));
  const also = ervenyes.length ? Math.min(...ervenyes.map((t) => t.ertek)) : 0;
  const felso = ervenyes.length ? Math.max(...ervenyes.map((t) => t.ertek)) : 0;

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          {forditva.ok ? (
            <SorRajz tagok={tagok} magassag={330} pontMeret={n > 40 ? 3 : 4} />
          ) : (
            <div className="flex h-[330px] items-center justify-center px-6 text-center text-[13px] text-rose-700">
              {forditva.hiba}
            </div>
          )}
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            A sorozat grafikonja: az <em>n</em>-edik taghoz tartozó pont az (n; aₙ) helyen áll.
          </p>
        </div>

        <div className="p-5">
          <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">Válassz sorozatot</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {KESZLET.map((k, i) => (
              <button
                key={k.cimke}
                type="button"
                onClick={() => {
                  setValasztott(i);
                  setSajat("");
                }}
                className={`rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition ${
                  !sajat.trim() && valasztott === i
                    ? "bg-petrol-700 text-white"
                    : "bg-white text-petrol-600 ring-1 ring-petrol-200 hover:bg-petrol-50"
                }`}
              >
                {k.cimke}
              </button>
            ))}
          </div>

          <label className="mt-4 block">
            <span className="mb-1 block text-[12.5px] font-medium text-petrol-600">
              Saját képlet (n a változó; sqrt, ln, exp, sin, cos, abs, fakt, ^)
            </span>
            <input
              type="text"
              value={sajat}
              onChange={(e) => setSajat(e.target.value)}
              placeholder="pl. (3*n-1)/(n+2)"
              className="szamok w-full rounded-lg border border-petrol-200 px-3 py-2 text-[14px] text-petrol-900 outline-none focus:border-petrol-400"
            />
          </label>

          <div className="mt-4">
            <Csuszka
              cimke="Hány tagot rajzoljunk?"
              ertek={n}
              min={10}
              max={60}
              lepes={1}
              tizedes={0}
              onChange={setN}
            />
          </div>

          {!sajat.trim() && (
            <div className="mt-4 rounded-xl bg-petrol-50 p-4">
              <div className="szamok text-[14px] text-petrol-900">
                <M>{KESZLET[valasztott].latex}</M>
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-petrol-700">{KESZLET[valasztott].jelleg}</p>
            </div>
          )}

          {forditva.ok && ervenyes.length > 0 && (
            <>
              <div className="finom-gorgeto mt-3 overflow-x-auto">
                <table className="szamok w-full text-[12.5px]">
                  <thead className="text-[11px] font-semibold text-petrol-500">
                    <tr>
                      <th className="py-1 text-left font-semibold">n</th>
                      {[1, 2, 3, 4, 5, 10].map((k) => (
                        <th key={k} className="py-1 text-right font-semibold">
                          {k}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-petrol-200">
                      <td className="py-1 text-left text-petrol-500">aₙ</td>
                      {[1, 2, 3, 4, 5, 10].map((k) => (
                        <td key={k} className="py-1 text-right text-petrol-800">
                          {Number.isFinite(forditva.fn(k)) ? sz(forditva.fn(k), 3) : "–"}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-[12px] text-petrol-500">
                Az első {n} tag a <span className="szamok">[{sz(also, 3)}; {sz(felso, 3)}]</span> intervallumba esik. Ha ez a
                doboz a tagok számának növelésével sem tágul, a sorozat jó eséllyel korlátos.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
