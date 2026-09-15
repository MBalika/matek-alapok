"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import FvRajz from "./FvRajz";
import Konfetti from "@/components/ui/Konfetti";
import { M } from "@/components/ui/Keplet";
import { sz } from "@/lib/szamok";

/**
 * „Melyik függvény?” — 10 körös felismerő játék. Megjelenik egy grafikon,
 * és négy hasonló képlet közül kell kiválasztani a helyeset.
 */

const KOROK = 10;
const IDO = 15; // másodperc körönként

const BANK = [
  // --- exponenciális és logaritmus ---
  { cs: "exp", k: "e^{x}", fn: (x) => Math.exp(x), xMin: -3, xMax: 2.5, yMin: -1, yMax: 8, mi: "Mindig pozitív, átmegy a (0; 1) ponton, és jobbra robban." },
  { cs: "exp", k: "e^{-x}", fn: (x) => Math.exp(-x), xMin: -2.5, xMax: 3, yMin: -1, yMax: 8, mi: "Az eˣ tükörképe az y tengelyre: szigorúan csökken, de mindig pozitív." },
  { cs: "exp", k: "\\ln x", fn: (x) => Math.log(x), xMin: -1, xMax: 8, yMin: -3, yMax: 2.5, mi: "Csak x > 0-ra értelmezett, a 0-ban −∞-hez tart, és átmegy az (1; 0) ponton." },
  { cs: "exp", k: "\\lg x", fn: (x) => Math.log10(x), xMin: -1, xMax: 8, yMin: -2, yMax: 1.5, mi: "Ugyanaz az alak, mint az ln x, csak laposabb: lg 10 = 1." },
  { cs: "exp", k: "2^{x}", fn: (x) => Math.pow(2, x), xMin: -3, xMax: 3, yMin: -1, yMax: 8, mi: "Exponenciális 1-nél nagyobb alappal — laposabb, mint az eˣ." },
  { cs: "exp", k: "\\left(\\tfrac12\\right)^{x}", fn: (x) => Math.pow(0.5, x), xMin: -3, xMax: 3, yMin: -1, yMax: 8, mi: "0 < a < 1 alap: csökkenő exponenciális." },

  // --- hatvány- és gyökfüggvények ---
  { cs: "hatvany", k: "x^2", fn: (x) => x * x, xMin: -3, xMax: 3, yMin: -1, yMax: 9, mi: "Páros függvény: az y tengelyre szimmetrikus parabola." },
  { cs: "hatvany", k: "x^3", fn: (x) => x * x * x, xMin: -2.2, xMax: 2.2, yMin: -8, yMax: 8, mi: "Páratlan: az origóra szimmetrikus, és szigorúan monoton nő." },
  { cs: "hatvany", k: "|x|", fn: (x) => Math.abs(x), xMin: -3, xMax: 3, yMin: -1, yMax: 3.5, mi: "Páros, de a 0-ban „csúcsa” van — nem sima, mint a parabola." },
  { cs: "hatvany", k: "\\sqrt{x}", fn: (x) => Math.sqrt(x), xMin: -1, xMax: 8, yMin: -1, yMax: 3.2, mi: "Csak x ≥ 0-ra; a fekvő parabola felső fele." },
  { cs: "hatvany", k: "\\sqrt[3]{x}", fn: (x) => Math.cbrt(x), xMin: -6, xMax: 6, yMin: -2.2, yMax: 2.2, mi: "A köbgyök negatív számokra is értelmezett — páratlan függvény." },
  { cs: "hatvany", k: "x^4", fn: (x) => Math.pow(x, 4), xMin: -2, xMax: 2, yMin: -1, yMax: 9, mi: "Páros, de a 0 körül laposabb, mint az x², a szélén viszont meredekebb." },

  // --- trigonometrikus ---
  { cs: "trig", k: "\\sin x", fn: (x) => Math.sin(x), xMin: -7, xMax: 7, yMin: -1.6, yMax: 1.6, mi: "Páratlan: a 0-ban átmegy, és emelkedik." },
  { cs: "trig", k: "\\cos x", fn: (x) => Math.cos(x), xMin: -7, xMax: 7, yMin: -1.6, yMax: 1.6, mi: "Páros: a 0-ban 1 az értéke, és az y tengelyre szimmetrikus." },
  { cs: "trig", k: "\\operatorname{tg} x", fn: (x) => Math.tan(x), xMin: -5, xMax: 5, yMin: -5, yMax: 5, mi: "π periódusú, a π/2 + kπ helyeken függőleges aszimptotákkal." },
  { cs: "trig", k: "\\operatorname{ctg} x", fn: (x) => 1 / Math.tan(x), xMin: -5, xMax: 5, yMin: -5, yMax: 5, mi: "π periódusú és csökkenő; az aszimptoták a kπ helyeken vannak." },
  { cs: "trig", k: "\\sin 2x", fn: (x) => Math.sin(2 * x), xMin: -7, xMax: 7, yMin: -1.6, yMax: 1.6, mi: "Fele akkora periódus (π), az amplitúdó változatlan 1." },
  { cs: "trig", k: "2\\sin x", fn: (x) => 2 * Math.sin(x), xMin: -7, xMax: 7, yMin: -2.6, yMax: 2.6, mi: "Ugyanaz a 2π periódus, de kétszeres amplitúdó." },

  // --- arkuszfüggvények ---
  { cs: "arkusz", k: "\\arcsin x", fn: (x) => Math.asin(x), xMin: -2, xMax: 2, yMin: -2, yMax: 2, mi: "Csak [−1; 1]-en értelmezett, értékkészlete [−π/2; π/2], és NŐ." },
  { cs: "arkusz", k: "\\arccos x", fn: (x) => Math.acos(x), xMin: -2, xMax: 2, yMin: -0.5, yMax: 3.6, mi: "Csak [−1; 1]-en, értékkészlete [0; π], és CSÖKKEN." },
  { cs: "arkusz", k: "\\operatorname{arctg} x", fn: (x) => Math.atan(x), xMin: -8, xMax: 8, yMin: -2, yMax: 2, mi: "Az egész ℝ-en értelmezett, vízszintes aszimptotái ±π/2." },
  { cs: "arkusz", k: "\\operatorname{arcctg} x", fn: (x) => Math.PI / 2 - Math.atan(x), xMin: -8, xMax: 8, yMin: -0.5, yMax: 3.6, mi: "Csökkenő, az aszimptotái 0 és π." },

  // --- hiperbolikus ---
  { cs: "hip", k: "\\operatorname{sh} x", fn: (x) => Math.sinh(x), xMin: -2.6, xMax: 2.6, yMin: -6, yMax: 6, mi: "Páratlan, az origóban átmegy, és korlátlanul nő." },
  { cs: "hip", k: "\\operatorname{ch} x", fn: (x) => Math.cosh(x), xMin: -2.6, xMax: 2.6, yMin: -1, yMax: 6, mi: "Páros, a minimuma (0; 1) — a láncgörbe alakja." },
  { cs: "hip", k: "\\operatorname{th} x", fn: (x) => Math.tanh(x), xMin: -3.5, xMax: 3.5, yMin: -1.8, yMax: 1.8, mi: "Korlátos: az aszimptotái y = ±1. Az S-görbe." },
  { cs: "hip", k: "\\operatorname{cth} x", fn: (x) => 1 / Math.tanh(x), xMin: -3.5, xMax: 3.5, yMin: -4, yMax: 4, mi: "A 0-ban szakadása van, és soha nem lép a ±1 sávba." },

  // --- eltolt parabolák ---
  { cs: "parabola", k: "x^2-2x", fn: (x) => x * x - 2 * x, xMin: -2, xMax: 4, yMin: -2, yMax: 6, mi: "Gyökei 0 és 2, a csúcs (1; −1)." },
  { cs: "parabola", k: "(x-1)^2", fn: (x) => (x - 1) * (x - 1), xMin: -2, xMax: 4, yMin: -2, yMax: 6, mi: "Csak érinti az x tengelyt, az (1; 0) pontban." },
  { cs: "parabola", k: "x^2+1", fn: (x) => x * x + 1, xMin: -3, xMax: 3, yMin: -2, yMax: 6, mi: "Nincs valós gyöke: a csúcs (0; 1) fölött van a tengelynek." },
  { cs: "parabola", k: "2-x^2", fn: (x) => 2 - x * x, xMin: -3, xMax: 3, yMin: -6, yMax: 3, mi: "Lefelé nyílik, a maximuma (0; 2)." },

  // --- racionális törtek ---
  { cs: "tort", k: "\\frac{1}{x-1}", fn: (x) => 1 / (x - 1), xMin: -3, xMax: 5, yMin: -5, yMax: 5, mi: "Az 1/x jobbra tolva 1-gyel: az aszimptota x = 1." },
  { cs: "tort", k: "\\frac{1}{x+1}", fn: (x) => 1 / (x + 1), xMin: -5, xMax: 3, yMin: -5, yMax: 5, mi: "Az 1/x balra tolva 1-gyel: az aszimptota x = −1." },
  { cs: "tort", k: "\\frac{1}{x^2-1}", fn: (x) => 1 / (x * x - 1), xMin: -3.5, xMax: 3.5, yMin: -5, yMax: 5, mi: "Két aszimptota (±1), és páros függvény." },
  { cs: "tort", k: "\\frac{x}{x^2+1}", fn: (x) => x / (x * x + 1), xMin: -6, xMax: 6, yMin: -1, yMax: 1, mi: "Sehol sincs szakadása, korlátos, és a végtelenben 0-hoz tart." },

  // --- vegyes ---
  { cs: "vegyes", k: "x\\sin x", fn: (x) => x * Math.sin(x), xMin: -10, xMax: 10, yMin: -7, yMax: 9, mi: "Páros (páratlan · páratlan), és a kilengések egyre nagyobbak." },
  { cs: "vegyes", k: "\\frac{\\sin x}{x}", fn: (x) => Math.sin(x) / x, xMin: -12, xMax: 12, yMin: -0.5, yMax: 1.3, mi: "A 0-ban lyuk van, de a határérték 1; a kilengések csillapodnak." },
  { cs: "vegyes", k: "e^{-x^2}", fn: (x) => Math.exp(-x * x), xMin: -3, xMax: 3, yMin: -0.4, yMax: 1.3, mi: "A Gauss-görbe: páros, a maximuma (0; 1), a végtelenben 0." },
  { cs: "vegyes", k: "x+\\frac1x", fn: (x) => x + 1 / x, xMin: -5, xMax: 5, yMin: -7, yMax: 7, mi: "Páratlan; az y = x ferde és az x = 0 függőleges aszimptotával." },
];

function kever(t) {
  const m = [...t];
  for (let i = m.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [m[i], m[j]] = [m[j], m[i]];
  }
  return m;
}

/** Egy kör: a helyes függvény + 3 zavaró ugyanabból a csoportból. */
function korOsszeallit(f) {
  const tarsak = kever(BANK.filter((b) => b.cs === f.cs && b.k !== f.k)).slice(0, 3);
  const potlas = kever(BANK.filter((b) => b.k !== f.k && !tarsak.includes(b))).slice(
    0,
    Math.max(0, 3 - tarsak.length),
  );
  const valaszok = kever([f, ...tarsak, ...potlas]);
  return { f, valaszok, helyes: valaszok.indexOf(f) };
}

export default function FvTalald() {
  const [fut, setFut] = useState(false);
  const [sor, setSor] = useState([]);
  const [kor, setKor] = useState(0);
  const [pont, setPont] = useState(0);
  const [valasz, setValasz] = useState(null);
  const [ido, setIdo] = useState(IDO);
  const [kesz, setKesz] = useState(false);
  const [konfetti, setKonfetti] = useState(false);
  const [rekord, setRekord] = useState(null);
  const valaszRef = useRef(null);
  valaszRef.current = valasz;

  useEffect(() => {
    try {
      const r = localStorage.getItem("matek-fvtalald-rekord");
      if (r) setRekord(Number(r));
    } catch {
      /* privát mód */
    }
  }, []);

  const aktualis = sor[kor - 1];

  const zar = useCallback((jo, maradek) => {
    const p = jo ? 70 + Math.round((Math.max(0, maradek) / IDO) * 30) : 0;
    setPont((x) => x + p);
    setValasz((v) => (v === null ? -1 : v));
  }, []);

  useEffect(() => {
    if (!fut || kesz || valasz !== null) return undefined;
    const id = setInterval(() => {
      setIdo((t) => {
        if (t <= 0.1) {
          clearInterval(id);
          return 0;
        }
        return Math.round((t - 0.1) * 10) / 10;
      });
    }, 100);
    return () => clearInterval(id);
  }, [fut, kesz, valasz, kor]);

  useEffect(() => {
    if (ido > 0 || !fut || kesz || valaszRef.current !== null) return;
    zar(false, 0);
  }, [ido, fut, kesz, zar]);

  const indit = () => {
    setSor(kever(BANK).slice(0, KOROK).map(korOsszeallit));
    setKor(1);
    setPont(0);
    setValasz(null);
    setIdo(IDO);
    setKesz(false);
    setFut(true);
  };

  const valaszt = (k) => {
    if (valasz !== null) return;
    setValasz(k);
    if (k === aktualis.helyes) {
      const p = 70 + Math.round((Math.max(0, ido) / IDO) * 30);
      setPont((x) => x + p);
    }
  };

  const kovetkezo = () => {
    if (kor >= KOROK) {
      setKesz(true);
      setFut(false);
      setRekord((r) => {
        const uj = Math.max(r ?? 0, pont);
        try {
          localStorage.setItem("matek-fvtalald-rekord", String(uj));
        } catch {
          /* privát mód */
        }
        return uj;
      });
      if (pont >= 800) setKonfetti(true);
      return;
    }
    setKor((k) => k + 1);
    setValasz(null);
    setIdo(IDO);
  };

  /* ---------- kezdő / záró képernyő ---------- */
  if (!fut || kesz) {
    return (
      <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white shadow-sm shadow-petrol-900/[0.03]">
        <Konfetti aktiv={konfetti} onVege={() => setKonfetti(false)} />
        <div className="flex flex-wrap items-center gap-2 border-b border-[color:var(--keret)] bg-linear-to-r from-petrol-800 to-petrol-700 px-4 py-2.5">
          <span className="rounded-md bg-violet-500 px-2 py-0.5 text-[10.5px] font-bold tracking-[0.14em] text-white uppercase">
            Játék
          </span>
          <span className="text-[13px] font-semibold text-white">Melyik függvény?</span>
        </div>
        <div className="p-5">
          {kesz && (
            <div className="mb-5 rounded-xl border border-naracs-200 bg-naracs-50 p-4 text-center">
              <p className="text-[11px] font-bold tracking-[0.16em] text-naracs-700 uppercase">Vége</p>
              <p className="szamok mt-1 text-4xl font-bold text-petrol-900">
                {pont} <span className="text-lg font-semibold text-petrol-400">/ {KOROK * 100}</span>
              </p>
              <p className="mt-1 text-[14px] text-petrol-700">
                {pont >= 900
                  ? "Kiváló — az elemi függvények képe a helyén van."
                  : pont >= 700
                    ? "Jó! Egy-két családot (arkusz vagy hiperbolikus) még érdemes átnézni."
                    : pont >= 400
                      ? "Közepes — nézd át az elemi függvények galériáját a 4.4-ben."
                      : "Kezdd az elmélettel: a 4.4 és 4.5 galériái pont ezt gyakoroltatják."}
              </p>
            </div>
          )}
          <p className="text-[14px] leading-relaxed text-petrol-700">
            Tíz grafikon, körönként {IDO} másodperc. Négy hasonló képlet közül kell kiválasztanod azt,
            amelyik a képen látható görbét adja. A zavaró válaszok mindig ugyanabból a családból jönnek
            — a döntést tehát a paritás, az értelmezési tartomány, az aszimptoták és a monotonitás
            alapján hozd meg.
          </p>
          <p className="mt-2 text-[13px] text-petrol-600">
            Pontozás: helyes válasz 70 pont, gyorsaság +30. Maximum 1000 pont.
          </p>
          {rekord != null && (
            <p className="szamok mt-3 text-[12.5px] text-naracs-700">Rekordod: {rekord} pont</p>
          )}
          <button
            type="button"
            onClick={indit}
            className="mt-4 rounded-lg bg-naracs-500 px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-naracs-600"
          >
            {kesz ? "Új játék ↻" : "Indulhat ▶"}
          </button>
        </div>
      </div>
    );
  }

  if (!aktualis) return null;
  const f = aktualis.f;

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white shadow-sm shadow-petrol-900/[0.03]">
      <div className="flex flex-wrap items-center gap-2 border-b border-[color:var(--keret)] bg-linear-to-r from-petrol-800 to-petrol-700 px-4 py-2.5">
        <span className="rounded-md bg-violet-500 px-2 py-0.5 text-[10.5px] font-bold tracking-[0.14em] text-white uppercase">
          Játék
        </span>
        <span className="text-[13px] font-semibold text-white">Melyik függvény?</span>
        <span className="szamok ml-auto text-[11.5px] text-petrol-200">
          {kor} / {KOROK} kör · {pont} pont
        </span>
      </div>

      <div className="grid lg:grid-cols-[1.25fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <FvRajz
            xMin={f.xMin}
            xMax={f.xMax}
            yMin={f.yMin}
            yMax={f.yMax}
            magassag={330}
            gorbek={[{ fn: f.fn, szin: "#0f766e", vastag: 2.8, db: 900 }]}
          />
        </div>

        <div className="p-5">
          <div className="flex items-center gap-3">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-petrol-100">
              <div
                className={`h-full rounded-full transition-all ${
                  ido > IDO * 0.3 ? "bg-violet-500" : "bg-rose-500"
                }`}
                style={{ width: `${(ido / IDO) * 100}%` }}
              />
            </div>
            <span className="szamok w-12 text-right text-[12.5px] font-semibold text-petrol-600">
              {sz(ido, 1)} s
            </span>
          </div>

          <div className="mt-4 grid gap-2">
            {aktualis.valaszok.map((v, k) => {
              let stilus =
                "border-petrol-200 bg-white hover:border-petrol-400 hover:bg-petrol-50";
              if (valasz !== null) {
                if (k === aktualis.helyes) stilus = "border-emerald-400 bg-emerald-50";
                else if (k === valasz) stilus = "border-rose-400 bg-rose-50";
                else stilus = "border-petrol-100 bg-white opacity-60";
              }
              return (
                <button
                  key={v.k}
                  type="button"
                  onClick={() => valaszt(k)}
                  disabled={valasz !== null}
                  className={`szamok rounded-xl border px-3.5 py-2.5 text-left text-[15px] text-petrol-900 transition ${stilus}`}
                >
                  <M>{v.k}</M>
                </button>
              );
            })}
          </div>

          {valasz !== null && (
            <div
              className={`mt-3 rounded-xl border px-4 py-3 ${
                valasz === aktualis.helyes
                  ? "border-emerald-200 bg-emerald-50"
                  : "border-rose-200 bg-rose-50"
              }`}
            >
              <p
                className={`text-[11px] font-bold tracking-[0.14em] uppercase ${
                  valasz === aktualis.helyes ? "text-emerald-700" : "text-rose-700"
                }`}
              >
                {valasz === aktualis.helyes
                  ? "Helyes"
                  : valasz === -1
                    ? "Lejárt az idő"
                    : "Nem ez az"}
              </p>
              <div className="szamok mt-1 text-[14px] text-petrol-900">
                <M>{f.k}</M>
              </div>
              <p className="mt-1 text-[12.5px] text-petrol-700">{f.mi}</p>
              <button
                type="button"
                onClick={kovetkezo}
                className="mt-3 rounded-lg bg-naracs-500 px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-naracs-600"
              >
                {kor >= KOROK ? "Eredmény" : "Következő kör →"}
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setFut(false)}
            className="mt-4 text-[12px] text-petrol-500 hover:text-petrol-800"
          >
            Játék megszakítása
          </button>
        </div>
      </div>
    </div>
  );
}
