"use client";

import { useState } from "react";
import { M, MB } from "@/components/ui/Keplet";

/**
 * Mintafelismerő: melyik nevezetes alapesetbe illik az integrandus?
 * A válasz után a levezetés lépésenként tárul fel.
 */

const MINTAK = [
  { rovid: "f(ax+b)", cim: "Lineáris belső függvény", jel: "\\int f(ax+b)\\,dx = \\frac1a F(ax+b)+C" },
  { rovid: "f′/f", cim: "A logaritmus-minta", jel: "\\int \\frac{f'}{f}\\,dx = \\ln\\left|f\\right|+C" },
  { rovid: "fⁿ·f′", cim: "A hatvány-minta", jel: "\\int f^{\\,n}f'\\,dx = \\frac{f^{\\,n+1}}{n+1}+C" },
  { rovid: "egyik sem", cim: "Általános helyettesítés kell", jel: "x = g(t),\\quad dx = g'(t)\\,dt" },
];

const FELADATOK = [
  {
    kif: "\\int (3x-2)^7\\,dx",
    tipus: 0,
    kulcs: "A belső függvény 3x − 2, aminek a deriváltja a konstans 3.",
    lepesek: [
      { cim: "A külső függvény", keplet: "f(u) = u^7 \\quad\\Longrightarrow\\quad F(u) = \\frac{u^8}{8}" },
      { cim: "A belső meredekség", keplet: "a = 3 \\quad\\Longrightarrow\\quad \\text{szorzó: } \\frac13" },
      { cim: "Az eredmény", keplet: "\\int (3x-2)^7dx = \\frac{(3x-2)^8}{24}+C" },
      { cim: "Ellenőrzés", keplet: "\\left(\\frac{(3x-2)^8}{24}\\right)' = \\frac{8(3x-2)^7\\cdot 3}{24} = (3x-2)^7\\ \\checkmark" },
    ],
  },
  {
    kif: "\\int e^{4-3x}\\,dx",
    tipus: 0,
    kulcs: "Az exponenciális kitevőjében lineáris kifejezés áll: 4 − 3x.",
    lepesek: [
      { cim: "A külső függvény", keplet: "f(u) = e^u \\quad\\Longrightarrow\\quad F(u) = e^u" },
      { cim: "A belső meredekség", keplet: "a = -3 \\quad\\Longrightarrow\\quad \\text{szorzó: } -\\frac13" },
      { cim: "Az eredmény", keplet: "\\int e^{4-3x}dx = -\\frac13 e^{4-3x}+C" },
    ],
  },
  {
    kif: "\\int \\cos\\left(\\frac{x}{2}+\\frac{\\pi}{4}\\right)dx",
    tipus: 0,
    kulcs: "A koszinusz argumentuma lineáris, a meredeksége ½ — a szorzó tehát 2, nem ½!",
    lepesek: [
      { cim: "A külső függvény", keplet: "f(u) = \\cos u \\quad\\Longrightarrow\\quad F(u) = \\sin u" },
      { cim: "A belső meredekség", keplet: "a = \\frac12 \\quad\\Longrightarrow\\quad \\frac1a = 2" },
      { cim: "Az eredmény", keplet: "\\int \\cos\\left(\\frac{x}{2}+\\frac{\\pi}{4}\\right)dx = 2\\sin\\left(\\frac{x}{2}+\\frac{\\pi}{4}\\right)+C" },
    ],
  },
  {
    kif: "\\int \\operatorname{tg} x\\,dx",
    tipus: 1,
    kulcs: "Írd át törtté: tg x = sin x / cos x. A nevező deriváltja −sin x.",
    lepesek: [
      { cim: "Átírás törtté", keplet: "\\int \\operatorname{tg} x\\,dx = \\int \\frac{\\sin x}{\\cos x}\\,dx" },
      { cim: "A számláló igazítása", keplet: "= -\\int \\frac{-\\sin x}{\\cos x}\\,dx, \\qquad f = \\cos x,\\ f' = -\\sin x" },
      { cim: "Az eredmény", keplet: "\\int \\operatorname{tg} x\\,dx = -\\ln\\left|\\cos x\\right|+C" },
    ],
  },
  {
    kif: "\\int \\frac{x}{x^2+4}\\,dx",
    tipus: 1,
    kulcs: "A nevező deriváltja 2x, a számlálóban x áll — a hiányzó 2-est ½ szorzóval pótoljuk.",
    lepesek: [
      { cim: "A nevező deriváltja", keplet: "f = x^2+4,\\qquad f' = 2x" },
      { cim: "Igazítás", keplet: "\\int \\frac{x}{x^2+4}dx = \\frac12\\int \\frac{2x}{x^2+4}\\,dx" },
      { cim: "Az eredmény", keplet: "= \\frac12\\ln\\left(x^2+4\\right)+C" },
      { cim: "Miért nincs abszolút érték?", keplet: "x^2+4 > 0 \\quad \\text{minden } x \\text{-re}" },
    ],
  },
  {
    kif: "\\int \\frac{2x+3}{x^2+3x+7}\\,dx",
    tipus: 1,
    kulcs: "A számláló pontosan a nevező deriváltja — semmilyen igazítás nem kell.",
    lepesek: [
      { cim: "Ellenőrizzük", keplet: "\\left(x^2+3x+7\\right)' = 2x+3 \\quad \\text{— pont a számláló}" },
      { cim: "Az eredmény", keplet: "\\int \\frac{2x+3}{x^2+3x+7}dx = \\ln\\left|x^2+3x+7\\right|+C" },
    ],
  },
  {
    kif: "\\int \\frac{dx}{x\\ln x}",
    tipus: 1,
    kulcs: "Bontsd szét a nevezőt: 1/(x·ln x) = (1/x) / ln x. A számláló az ln x deriváltja.",
    lepesek: [
      { cim: "Átrendezés", keplet: "\\frac{1}{x\\ln x} = \\frac{\\frac1x}{\\ln x}" },
      { cim: "A minta", keplet: "f = \\ln x, \\qquad f' = \\frac1x" },
      { cim: "Az eredmény", keplet: "\\int \\frac{dx}{x\\ln x} = \\ln\\left|\\ln x\\right|+C" },
    ],
  },
  {
    kif: "\\int 2x\\sqrt{x^2+1}\\,dx",
    tipus: 2,
    kulcs: "A gyök alatti x²+1 deriváltja 2x — és pont az áll a szorzatban.",
    lepesek: [
      { cim: "A minta", keplet: "f = x^2+1,\\qquad f' = 2x,\\qquad n = \\frac12" },
      { cim: "A hatványszabály", keplet: "\\int f^{1/2}f'\\,dx = \\frac{f^{3/2}}{3/2} = \\frac23 f^{3/2}" },
      { cim: "Az eredmény", keplet: "\\int 2x\\sqrt{x^2+1}\\,dx = \\frac23\\left(x^2+1\\right)\\sqrt{x^2+1}+C" },
    ],
  },
  {
    kif: "\\int \\sin^3 x\\cos x\\,dx",
    tipus: 2,
    kulcs: "A szinusz deriváltja a koszinusz — ott áll a szorzatban.",
    lepesek: [
      { cim: "A minta", keplet: "f = \\sin x,\\qquad f' = \\cos x,\\qquad n = 3" },
      { cim: "Az eredmény", keplet: "\\int \\sin^3 x\\cos x\\,dx = \\frac{\\sin^4 x}{4}+C" },
      { cim: "Ellenőrzés", keplet: "\\left(\\frac{\\sin^4x}{4}\\right)' = \\frac{4\\sin^3x\\cos x}{4} = \\sin^3x\\cos x\\ \\checkmark" },
    ],
  },
  {
    kif: "\\int \\frac{\\operatorname{arctg}^2 x}{1+x^2}\\,dx",
    tipus: 2,
    kulcs: "Elsőre ijesztő, de 1/(1+x²) éppen az arctg x deriváltja.",
    lepesek: [
      { cim: "A minta", keplet: "f = \\operatorname{arctg} x,\\qquad f' = \\frac{1}{1+x^2},\\qquad n = 2" },
      { cim: "Az eredmény", keplet: "\\int \\operatorname{arctg}^2 x\\cdot\\frac{1}{1+x^2}dx = \\frac{\\operatorname{arctg}^3 x}{3}+C" },
    ],
  },
  {
    kif: "\\int x\\sqrt[3]{1+x}\\,dx",
    tipus: 3,
    kulcs: "A gyök belsejének deriváltja 1, de a szorzatban x áll — a hatvány-minta tehát nem működik.",
    lepesek: [
      { cim: "A helyettesítés", keplet: "t = \\sqrt[3]{1+x} \\;\\Rightarrow\\; x = t^3-1 \\;\\Rightarrow\\; dx = 3t^2dt" },
      { cim: "Az új integrál", keplet: "\\int \\left(t^3-1\\right)t\\cdot 3t^2dt = 3\\int\\left(t^6-t^3\\right)dt" },
      { cim: "Visszahelyettesítés", keplet: "\\int x\\sqrt[3]{1+x}\\,dx = \\frac37(1+x)^{7/3}-\\frac34(1+x)^{4/3}+C" },
    ],
  },
  {
    kif: "\\int \\frac{e^{\\sqrt x}}{\\sqrt x}\\,dx",
    tipus: 3,
    kulcs: "A kitevő √x, aminek a deriváltja 1/(2√x) — csak konstansszorzóban tér el a szorzótól, de a külső függvény nem hatvány és nem tört, tehát érdemes kiírni a helyettesítést.",
    lepesek: [
      { cim: "A helyettesítés", keplet: "\\sqrt x = t \\;\\Rightarrow\\; x = t^2 \\;\\Rightarrow\\; dx = 2t\\,dt" },
      { cim: "Az új integrál", keplet: "\\int \\frac{e^t}{t}\\cdot 2t\\,dt = 2\\int e^t dt = 2e^t" },
      { cim: "Visszahelyettesítés", keplet: "\\int \\frac{e^{\\sqrt x}}{\\sqrt x}dx = 2e^{\\sqrt x}+C" },
    ],
  },
];

export default function HiMintaFelismero() {
  const [i, setI] = useState(0);
  const [valasz, setValasz] = useState(null);
  const [lathato, setLathato] = useState(0);
  const [jo, setJo] = useState(0);
  const [osszes, setOsszes] = useState(0);

  const F = FELADATOK[i];
  const helyes = valasz === F.tipus;

  const tippel = (k) => {
    if (valasz !== null) return;
    setValasz(k);
    setOsszes((n) => n + 1);
    if (k === F.tipus) setJo((n) => n + 1);
    setLathato(1);
  };

  const kovetkezo = () => {
    setI((k) => (k + 1) % FELADATOK.length);
    setValasz(null);
    setLathato(0);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-[color:var(--keret)] bg-petrol-50/70 px-5 py-3">
        <span className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">Mintafelismerő</span>
        <span className="text-[13px] font-semibold text-petrol-900">
          {i + 1}. integrál / {FELADATOK.length}
        </span>
        {osszes > 0 && (
          <span className="szamok ml-auto rounded-full bg-white px-2.5 py-1 text-[12px] text-petrol-600 ring-1 ring-petrol-200">
            {jo} / {osszes} elsőre eltalálva
          </span>
        )}
      </div>

      <div className="p-5 sm:p-6">
        <p className="text-[13.5px] text-petrol-600">Melyik nevezetes mintába illik ez az integrandus?</p>
        <div className="szamok mt-2 rounded-xl border border-petrol-200 bg-petrol-50/60 px-4 py-3 text-petrol-900">
          <MB>{F.kif}</MB>
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {MINTAK.map((m, k) => {
            const kivalasztott = valasz === k;
            const ez = valasz !== null && k === F.tipus;
            return (
              <button
                key={m.rovid}
                type="button"
                onClick={() => tippel(k)}
                disabled={valasz !== null}
                className={`rounded-xl border px-3.5 py-3 text-left transition ${
                  ez
                    ? "border-emerald-400 bg-emerald-50"
                    : kivalasztott
                      ? "border-rose-400 bg-rose-50"
                      : valasz !== null
                        ? "border-petrol-100 bg-white opacity-60"
                        : "border-petrol-200 bg-white hover:border-petrol-400 hover:bg-petrol-50"
                }`}
              >
                <span
                  className={`szamok text-[13.5px] font-bold ${
                    ez ? "text-emerald-800" : kivalasztott ? "text-rose-800" : "text-petrol-800"
                  }`}
                >
                  {m.rovid}
                </span>
                <span className="mt-0.5 block text-[12px] text-petrol-500">{m.cim}</span>
                {valasz !== null && ez && (
                  <span className="szamok mt-1.5 block text-[12px] text-emerald-900">
                    <M>{m.jel}</M>
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {valasz !== null && (
          <>
            <div
              className={`mt-4 rounded-xl border px-4 py-3 ${
                helyes ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"
              }`}
            >
              <p
                className={`text-[10.5px] font-bold tracking-[0.16em] uppercase ${
                  helyes ? "text-emerald-700" : "text-rose-700"
                }`}
              >
                {helyes ? "Eltaláltad" : `A helyes válasz: ${MINTAK[F.tipus].rovid}`}
              </p>
              <p className="mt-1 text-[13.5px] leading-relaxed text-petrol-800">{F.kulcs}</p>
            </div>

            <div className="mt-4 space-y-2">
              {F.lepesek.slice(0, lathato).map((l, k) => (
                <div key={l.cim} className="rounded-xl border border-petrol-200 bg-white px-4 py-3">
                  <p className="text-[10.5px] font-bold tracking-[0.14em] text-naracs-600 uppercase">
                    {k + 1}. {l.cim}
                  </p>
                  <div className="szamok finom-gorgeto mt-1 overflow-x-auto text-[13.5px] text-petrol-900">
                    <MB>{l.keplet}</MB>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {lathato < F.lepesek.length ? (
                <button
                  type="button"
                  onClick={() => setLathato((n) => n + 1)}
                  className="rounded-lg bg-petrol-700 px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-petrol-800"
                >
                  Következő lépés →
                </button>
              ) : (
                <span className="rounded-lg bg-emerald-50 px-3 py-2 text-[12.5px] font-medium text-emerald-800">
                  Kész a levezetés
                </span>
              )}
              <button
                type="button"
                onClick={kovetkezo}
                className="rounded-lg bg-naracs-500 px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-naracs-600"
              >
                Következő integrál ↻
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
