"use client";

import { useState } from "react";
import { M, MB } from "@/components/ui/Keplet";

/**
 * Villámkártyák az alapintegrálokhoz. A „nem tudtam” kártyák visszakerülnek a
 * pakli végére, a „tudtam” kártyák kikerülnek — a fejben tartás csak memóriában
 * történik, nincs mentés.
 */

const KARTYAK = [
  {
    k: "\\int x^{n}\\,dx \\quad (n \\ne -1)",
    v: "\\frac{x^{n+1}}{n+1}+C",
    sugo: "Kitevőt eggyel emelünk, és osztunk az új kitevővel. Az n = −1 az egyetlen kivétel.",
  },
  {
    k: "\\int \\frac{dx}{x}",
    v: "\\ln\\left|x\\right|+C",
    sugo: "Az abszolút érték azért kell, mert az 1/x a negatív féltengelyen is értelmes.",
  },
  {
    k: "\\int e^{x}\\,dx",
    v: "e^{x}+C",
    sugo: "Az egyetlen függvény, amely a saját primitív függvénye (a konstansszorosain kívül).",
  },
  {
    k: "\\int a^{x}\\,dx \\quad (a>0,\\ a\\ne1)",
    v: "\\frac{a^{x}}{\\ln a}+C",
    sugo: "Deriválásnál szorzunk ln a-val, integrálásnál tehát osztunk vele.",
  },
  {
    k: "\\int \\sin x\\,dx",
    v: "-\\cos x+C",
    sugo: "A mínusz a leggyakrabban lefelejtett jel. Ellenőrzés: (−cos x)′ = sin x ✓",
  },
  {
    k: "\\int \\cos x\\,dx",
    v: "\\sin x+C",
    sugo: "Itt nincs előjelváltás — pont ezért csábító a szinusznál is elfelejteni a mínuszt.",
  },
  {
    k: "\\int \\frac{dx}{\\cos^{2}x}",
    v: "\\operatorname{tg} x+C",
    sugo: "A tangens deriváltja 1/cos²x — ez a sor egyszerűen a visszaolvasása.",
  },
  {
    k: "\\int \\frac{dx}{\\sin^{2}x}",
    v: "-\\operatorname{ctg} x+C",
    sugo: "A kotangens deriváltjában van a mínusz, ezért itt is megjelenik.",
  },
  {
    k: "\\int \\operatorname{sh} x\\,dx",
    v: "\\operatorname{ch} x+C",
    sugo: "A hiperbolikus párban nincs előjelváltás: (ch x)′ = sh x és (sh x)′ = ch x.",
  },
  {
    k: "\\int \\operatorname{ch} x\\,dx",
    v: "\\operatorname{sh} x+C",
    sugo: "Ez a trigonometrikus párhoz képest a legfontosabb különbség: sehol nincs mínusz.",
  },
  {
    k: "\\int \\frac{dx}{\\operatorname{ch}^{2}x}",
    v: "\\operatorname{th} x+C",
    sugo: "A tangens hiperbolikus megfelelője, ugyanazzal a szerkezettel.",
  },
  {
    k: "\\int \\frac{dx}{1+x^{2}}",
    v: "\\operatorname{arctg} x+C",
    sugo: "Ha a nevezőben a² + x² áll, az eredmény (1/a)·arctg(x/a).",
  },
  {
    k: "\\int \\frac{dx}{\\sqrt{1-x^{2}}}",
    v: "\\arcsin x+C",
    sugo: "Az a²-es változat: arcsin(x/a) — itt az 1/a szorzó kiesik, szemben az arctg-vel!",
  },
  {
    k: "\\int \\frac{dx}{\\sqrt{1+x^{2}}}",
    v: "\\operatorname{arsh} x+C = \\ln\\left(x+\\sqrt{1+x^{2}}\\right)+C",
    sugo: "A logaritmusos alak a szokásos leadott forma; a két alak csak konstansban tér el.",
  },
  {
    k: "\\int \\frac{dx}{\\sqrt{x^{2}-1}}",
    v: "\\operatorname{arch} x+C = \\ln\\left|x+\\sqrt{x^{2}-1}\\right|+C",
    sugo: "Figyelj az előjelre a gyök alatt: x² − 1, nem 1 − x². Az utóbbi az arcsin sora.",
  },
  {
    k: "\\int \\frac{dx}{1-x^{2}}",
    v: "\\frac12\\ln\\left|\\frac{1+x}{1-x}\\right|+C",
    sugo: "Parciális törtekkel is kijön: 1/(1−x²) = ½·[1/(1+x) + 1/(1−x)].",
  },
];

export default function HiTablazatKerdezo() {
  const [sor, setSor] = useState(() => KARTYAK.map((_, i) => i));
  const [fordit, setFordit] = useState(false);
  const [kesz, setKesz] = useState(0);
  const [ismetles, setIsmetles] = useState(0);

  const ujra = () => {
    setSor(KARTYAK.map((_, i) => i));
    setFordit(false);
    setKesz(0);
    setIsmetles(0);
  };

  if (sor.length === 0) {
    return (
      <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white p-6 text-center">
        <p className="text-[10.5px] font-bold tracking-[0.16em] text-emerald-700 uppercase">Kész a pakli</p>
        <p className="mt-2 text-[15px] font-semibold text-petrol-900">Mind a 16 alapintegrál megvolt.</p>
        <p className="mx-auto mt-2 max-w-md text-[13.5px] leading-relaxed text-petrol-600">
          {ismetles === 0
            ? "Elsőre mind a tizenhatot tudtad — a deriválási táblázat tényleg a helyén van."
            : `Összesen ${ismetles} kártyát kellett megismételni. Fuss neki még egyszer néhány nap múlva: a gyors felismerés a cél, nem a kikeresés.`}
        </p>
        <button
          type="button"
          onClick={ujra}
          className="mt-4 rounded-lg bg-petrol-700 px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-petrol-800"
        >
          Új kör ↻
        </button>
      </div>
    );
  }

  const K = KARTYAK[sor[0]];
  const osszes = KARTYAK.length;

  const tudtam = () => {
    setSor((s) => s.slice(1));
    setKesz((k) => k + 1);
    setFordit(false);
  };
  const nemTudtam = () => {
    setSor((s) => [...s.slice(1), s[0]]);
    setIsmetles((n) => n + 1);
    setFordit(false);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-[color:var(--keret)] bg-petrol-50/70 px-5 py-3">
        <span className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">Villámkártyák</span>
        <span className="text-[13px] font-semibold text-petrol-900">Alapintegrálok</span>
        <span className="szamok ml-auto rounded-full bg-white px-2.5 py-1 text-[12px] text-petrol-600 ring-1 ring-petrol-200">
          {kesz} / {osszes} megvan
          {ismetles > 0 ? ` · ${ismetles} ismétlés` : ""}
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-petrol-100">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all"
            style={{ width: `${(kesz / osszes) * 100}%` }}
          />
        </div>

        <button
          type="button"
          onClick={() => setFordit((v) => !v)}
          className={`mt-5 block w-full rounded-2xl border-2 px-5 py-7 text-center transition ${
            fordit
              ? "border-emerald-300 bg-emerald-50"
              : "border-petrol-200 bg-petrol-50/60 hover:border-petrol-300 hover:bg-petrol-50"
          }`}
        >
          <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">
            {fordit ? "A primitív függvény" : "Mennyi ez az integrál?"}
          </p>
          <div className="szamok mt-3 text-petrol-900">
            <MB>{fordit ? `${K.k} = ${K.v}` : `${K.k} = \\;?`}</MB>
          </div>
          {!fordit && (
            <p className="mt-2 text-[12.5px] text-petrol-500">Kattints a kártyára a megfordításához.</p>
          )}
        </button>

        {fordit && (
          <div className="mt-3 rounded-xl border border-petrol-200 bg-white px-4 py-3">
            <p className="text-[13px] leading-relaxed text-petrol-700">{K.sugo}</p>
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={tudtam}
            disabled={!fordit}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-40"
          >
            Tudtam ✓
          </button>
          <button
            type="button"
            onClick={nemTudtam}
            disabled={!fordit}
            className="rounded-lg bg-white px-4 py-2 text-[13px] font-semibold text-rose-700 ring-1 ring-rose-200 transition hover:bg-rose-50 disabled:opacity-40"
          >
            Nem tudtam — jöjjön vissza
          </button>
          <button
            type="button"
            onClick={ujra}
            className="ml-auto rounded-lg px-3 py-2 text-[12.5px] font-medium text-petrol-500 transition hover:text-petrol-800"
          >
            Pakli újrakeverése
          </button>
        </div>

        <p className="mt-4 text-[12.5px] leading-relaxed text-petrol-500">
          A pakliban <M>{"16"}</M> kártya van. A „nem tudtam” kártyák a sor végére kerülnek, és addig jönnek vissza,
          amíg meg nem jegyzed őket.
        </p>
      </div>
    </div>
  );
}
