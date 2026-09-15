"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Konfetti from "@/components/ui/Konfetti";
import { MB } from "@/components/ui/Keplet";

const KOROK = 10;
const REKORD_KULCS = "matek-modszer-rekord";

const MODSZEREK = [
  { rovid: "Alapintegrál", hosszu: "alapintegrál vagy linearitás — elég átalakítani" },
  { rovid: "Helyettesítés", hosszu: "helyettesítés: f(ax+b), f′/f, fⁿf′ vagy általános" },
  { rovid: "Parciális", hosszu: "parciális integrálás: szorzat, ahol az egyik tényező deriválva egyszerűsödik" },
  { rovid: "Törtek / trig", hosszu: "parciális törtek vagy trigonometrikus trükk" },
];

const FELADATOK = [
  /* ---------- 0: alapintegrál, linearitás ---------- */
  {
    k: "\\int \\left(3x^2+\\frac5x-2\\sin x+\\frac{4}{1+x^2}\\right)dx",
    m: 0,
    ok: "Tagonként, közvetlenül a táblázatból — semmilyen trükk nem kell.",
  },
  {
    k: "\\int \\frac{(2x-3)^2}{\\sqrt x}\\,dx",
    m: 0,
    ok: "Bontsd ki a számlálót, és oszd le tagonként: csupa hatvány marad.",
  },
  {
    k: "\\int \\operatorname{tg}^2 x\\,dx",
    m: 0,
    ok: "A tg²x = 1/cos²x − 1 azonosság után két alapintegrál.",
  },
  {
    k: "\\int \\left(\\sqrt x+\\frac{3}{x^2}-\\frac2x\\right)dx",
    m: 0,
    ok: "Írd át hatványokká: x^{1/2}, 3x^{−2}, −2x^{−1} — tagonként megy.",
  },
  {
    k: "\\int \\left(e^x+2^x\\right)dx",
    m: 0,
    ok: "Két táblázatsor: eˣ és aˣ/ln a.",
  },
  {
    k: "\\int \\left(\\sin x+\\operatorname{ch} x\\right)dx",
    m: 0,
    ok: "Két alapintegrál — csak a szinusz mínuszára kell figyelni.",
  },

  /* ---------- 1: helyettesítés ---------- */
  {
    k: "\\int (3x-2)^7\\,dx",
    m: 1,
    ok: "Lineáris belső függvény: a hatványszabály és egy 1/3 szorzó.",
  },
  {
    k: "\\int \\frac{x}{x^2+4}\\,dx",
    m: 1,
    ok: "A számláló a nevező deriváltjának a fele — logaritmus lesz belőle.",
  },
  {
    k: "\\int \\operatorname{tg} x\\,dx",
    m: 1,
    ok: "sin x / cos x: a számláló a nevező deriváltja (egy mínusszal).",
  },
  {
    k: "\\int 2x\\sqrt{x^2+1}\\,dx",
    m: 1,
    ok: "fⁿ·f′ minta: f = x²+1, és f′ = 2x ott áll a szorzatban.",
  },
  {
    k: "\\int \\sin^3 x\\cos x\\,dx",
    m: 1,
    ok: "fⁿ·f′ minta: f = sin x, f′ = cos x.",
  },
  {
    k: "\\int \\frac{dx}{x\\ln x}",
    m: 1,
    ok: "f′/f minta: f = ln x, és 1/x éppen a deriváltja.",
  },
  {
    k: "\\int \\frac{e^{\\sqrt x}}{\\sqrt x}\\,dx",
    m: 1,
    ok: "Általános helyettesítés: t = √x, dx = 2t dt.",
  },
  {
    k: "\\int \\frac{e^x}{1+e^{2x}}\\,dx",
    m: 1,
    ok: "Minden csak eˣ-től függ: t = eˣ (vagy rögtön az f′/(1+f²) minta).",
  },
  {
    k: "\\int x\\sqrt[3]{1+x}\\,dx",
    m: 1,
    ok: "A köbgyököt tüntetjük el: t = ∛(1+x), x = t³−1.",
  },
  {
    k: "\\int \\frac{\\operatorname{arctg}^2 x}{1+x^2}\\,dx",
    m: 1,
    ok: "fⁿ·f′: f = arctg x, és 1/(1+x²) a deriváltja.",
  },
  {
    k: "\\int e^{4-3x}\\,dx",
    m: 1,
    ok: "Lineáris belső függvény, a szorzó −1/3.",
  },
  {
    k: "\\int \\frac{dx}{1+\\sqrt{2x-1}}",
    m: 1,
    ok: "Gyök lineáris kifejezésből: t = √(2x−1).",
  },
  {
    k: "\\int x^2\\sqrt{1-x^2}\\,dx",
    m: 1,
    ok: "Szinuszos helyettesítés: x = sin t, és a gyök eltűnik.",
  },

  /* ---------- 2: parciális integrálás ---------- */
  {
    k: "\\int x\\,e^{2x}\\,dx",
    m: 2,
    ok: "Polinom · exponenciális: a polinomot deriváljuk, az exponenciálist integráljuk.",
  },
  {
    k: "\\int \\ln x\\,dx",
    m: 2,
    ok: "A klasszikus trükk: ln x = 1·ln x, u = ln x és v′ = 1.",
  },
  {
    k: "\\int x\\operatorname{arctg} x\\,dx",
    m: 2,
    ok: "Arkuszfüggvény mellett mindig az arkuszfüggvény legyen u.",
  },
  {
    k: "\\int x^2e^{x}\\,dx",
    m: 2,
    ok: "Kétszeres parciális integrálás: a polinom fokszáma lépésenként csökken.",
  },
  {
    k: "\\int e^{-x}\\cos 3x\\,dx",
    m: 2,
    ok: "A körbeérő eset: két lépés után egyenletet kapunk magára az integrálra.",
  },
  {
    k: "\\int x\\sin x\\,dx",
    m: 2,
    ok: "Polinom · szögfüggvény: u = x, v′ = sin x.",
  },
  {
    k: "\\int \\operatorname{arctg} x\\,dx",
    m: 2,
    ok: "u = arctg x, v′ = 1 — ugyanaz a trükk, mint az ln x-nél.",
  },

  /* ---------- 3: parciális törtek és trigonometrikus trükkök ---------- */
  {
    k: "\\int \\frac{3x+2}{x^2+x-6}\\,dx",
    m: 3,
    ok: "A nevező két valós gyöke: (x−2)(x+3) — parciális törtekre bontunk.",
  },
  {
    k: "\\int \\frac{2x+4}{x^3-1}\\,dx",
    m: 3,
    ok: "x³−1 = (x−1)(x²+x+1): egy logaritmusos és egy arctg-s tag.",
  },
  {
    k: "\\int \\cos^4 x\\,dx",
    m: 3,
    ok: "Páros hatvány: kétszeri linearizálás cos 2x-re és cos 4x-re.",
  },
  {
    k: "\\int \\sin 2x\\cos 3x\\,dx",
    m: 3,
    ok: "Különböző frekvenciák szorzata: a szorzatból összeget csinálunk.",
  },
  {
    k: "\\int \\frac{dx}{5+4\\cos x}",
    m: 3,
    ok: "Az univerzális helyettesítés esete: t = tg(x/2).",
  },
  {
    k: "\\int \\frac{5x-1}{x^2-x-2}\\,dx",
    m: 3,
    ok: "(x−2)(x+1): két elemi tört, két logaritmus.",
  },
  {
    k: "\\int \\frac{x^3}{x^2-1}\\,dx",
    m: 3,
    ok: "Áltört: előbb polinomosztás, utána marad egy f′/f típusú tag.",
  },
  {
    k: "\\int \\sin^2 x\\,dx",
    m: 3,
    ok: "Páros hatvány: a sin²x = (1−cos 2x)/2 linearizálás.",
  },
];

function kever(tomb) {
  const t = [...tomb];
  for (let i = t.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [t[i], t[j]] = [t[j], t[i]];
  }
  return t;
}

export default function HiModszerValaszto() {
  const [fut, setFut] = useState(false);
  const [sor, setSor] = useState([]);
  const [kor, setKor] = useState(0);
  const [pont, setPont] = useState(0);
  const [eredmeny, setEredmeny] = useState(null);
  const [kesz, setKesz] = useState(false);
  const [rekord, setRekord] = useState(null);
  const [konfetti, setKonfetti] = useState(false);
  const kezdet = useRef(0);

  useEffect(() => {
    try {
      const r = localStorage.getItem(REKORD_KULCS);
      if (r) setRekord(Number(r));
    } catch {
      /* privát mód */
    }
  }, []);

  const indit = useCallback(() => {
    setSor(kever(FELADATOK).slice(0, KOROK));
    setKor(1);
    setPont(0);
    setEredmeny(null);
    setKesz(false);
    setFut(true);
    kezdet.current = Date.now();
  }, []);

  const F = sor[kor - 1];

  const valaszt = (k) => {
    if (eredmeny || !F) return;
    const jo = k === F.m;
    const ido = (Date.now() - kezdet.current) / 1000;
    const bonusz = jo ? Math.max(0, Math.round(20 * (1 - ido / 9))) : 0;
    const alap = jo ? 100 : 0;
    setPont((p) => p + alap + bonusz);
    setEredmeny({ tipp: k, jo, alap, bonusz, ido });
  };

  const kovetkezo = () => {
    if (kor >= KOROK) {
      setKesz(true);
      setRekord((r) => {
        const uj = Math.max(r ?? 0, pont);
        try {
          localStorage.setItem(REKORD_KULCS, String(uj));
        } catch {
          /* privát mód */
        }
        return uj;
      });
      if (pont >= 800) setKonfetti(true);
      return;
    }
    setKor((k) => k + 1);
    setEredmeny(null);
    kezdet.current = Date.now();
  };

  if (!fut) {
    return (
      <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white p-6 text-center">
        <p className="text-[11px] font-bold tracking-[0.16em] text-violet-700 uppercase">Melyik módszer?</p>
        <h4 className="mt-1 text-lg font-semibold text-petrol-900">Tíz integrál, tíz döntés — időre</h4>
        <p className="mx-auto mt-2 max-w-md text-[14px] leading-relaxed text-petrol-600">
          Nem kell kiszámolni őket! Csak azt döntsd el, <em>melyik módszerrel</em> állnál neki. Körönként 100 pont a jó
          válaszért, és még 20 a gyorsaságért. Ez a legfontosabb készség a zárthelyin: a felismerés.
        </p>
        {rekord != null && (
          <p className="szamok mt-3 text-[13px] text-petrol-500">
            Eddigi rekordod: <span className="font-semibold text-petrol-800">{rekord}</span> pont
          </p>
        )}
        <button
          type="button"
          onClick={indit}
          className="mt-4 rounded-lg bg-violet-600 px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-violet-700"
        >
          Kezdjük ▶
        </button>
      </div>
    );
  }

  if (kesz) {
    return (
      <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white p-6 text-center">
        <Konfetti aktiv={konfetti} onVege={() => setKonfetti(false)} />
        <p className="text-[11px] font-bold tracking-[0.16em] text-violet-700 uppercase">Vége</p>
        <p className="szamok mt-1 text-4xl font-bold text-petrol-900">
          {pont} <span className="text-lg font-semibold text-petrol-400">/ {KOROK * 120}</span>
        </p>
        <p className="mx-auto mt-2 max-w-md text-[14px] text-petrol-600">
          {pont >= 1000
            ? "Ez már ránézésre megy — pontosan ez kell a zárthelyin."
            : pont >= 800
              ? "Szép eredmény: a módszerválasztás a helyén van, már csak a gyorsaság hiányzik."
              : pont >= 500
                ? "Közepes. Nézd át újra a 6.12 keresési sorrendet, és figyeld, mi árulkodik: szorzat? tört? gyök?"
                : "Menj vissza a 6.5-höz és a mintafelismerőhöz: a három alapeset ránézésre kell menjen."}
        </p>
        {rekord != null && (
          <p className="szamok mt-2 text-[13px] text-petrol-500">
            Rekord: <span className="font-semibold text-petrol-800">{rekord}</span> pont
          </p>
        )}
        <button
          type="button"
          onClick={indit}
          className="mt-4 rounded-lg bg-violet-600 px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-violet-700"
        >
          Újra ↻
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <Konfetti aktiv={konfetti} onVege={() => setKonfetti(false)} />
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-[color:var(--keret)] bg-petrol-50/70 px-5 py-3">
        <span className="text-[10.5px] font-bold tracking-[0.16em] text-violet-700 uppercase">
          {kor}. kör / {KOROK}
        </span>
        <span className="szamok ml-auto text-[13px] font-semibold text-petrol-700">{pont} pont</span>
      </div>

      <div className="p-5 sm:p-6">
        <div className="szamok rounded-xl border border-petrol-200 bg-petrol-50/60 px-4 py-4 text-center text-petrol-900">
          <MB>{F.k}</MB>
        </div>
        <p className="mt-3 text-center text-[13.5px] text-petrol-600">Melyik módszerrel kezdenél?</p>

        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {MODSZEREK.map((m, k) => {
            const ez = eredmeny && k === F.m;
            const tipp = eredmeny && eredmeny.tipp === k;
            return (
              <button
                key={m.rovid}
                type="button"
                onClick={() => valaszt(k)}
                disabled={!!eredmeny}
                className={`rounded-xl border px-3.5 py-3 text-left transition ${
                  ez
                    ? "border-emerald-400 bg-emerald-50"
                    : tipp
                      ? "border-rose-400 bg-rose-50"
                      : eredmeny
                        ? "border-petrol-100 bg-white opacity-60"
                        : "border-petrol-200 bg-white hover:border-violet-400 hover:bg-violet-50"
                }`}
              >
                <span
                  className={`text-[13.5px] font-bold ${
                    ez ? "text-emerald-800" : tipp ? "text-rose-800" : "text-petrol-800"
                  }`}
                >
                  {m.rovid}
                </span>
                <span className="mt-0.5 block text-[11.5px] leading-snug text-petrol-500">{m.hosszu}</span>
              </button>
            );
          })}
        </div>

        {eredmeny && (
          <div
            className={`mt-4 rounded-xl border px-4 py-3 ${
              eredmeny.jo ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"
            }`}
          >
            <p
              className={`szamok text-[11px] font-bold tracking-[0.14em] uppercase ${
                eredmeny.jo ? "text-emerald-700" : "text-rose-700"
              }`}
            >
              {eredmeny.jo ? `+${eredmeny.alap} pont` : "0 pont"}
              {eredmeny.bonusz > 0 ? ` · +${eredmeny.bonusz} gyorsaság` : ""} · {eredmeny.ido.toFixed(1).replace(".", ",")} s
            </p>
            <p className="mt-1 text-[13.5px] leading-relaxed text-petrol-800">{F.ok}</p>
            <button
              type="button"
              onClick={kovetkezo}
              className="mt-3 rounded-lg bg-naracs-500 px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-naracs-600"
            >
              {kor >= KOROK ? "Eredmény" : "Következő kör →"}
            </button>
          </div>
        )}

        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-petrol-100">
          <div
            className="h-full rounded-full bg-violet-500 transition-all"
            style={{ width: `${((kor - 1) / KOROK) * 100}%` }}
          />
        </div>
        <button
          type="button"
          onClick={() => setFut(false)}
          className="mt-3 text-[12px] text-petrol-500 hover:text-petrol-800"
        >
          Játék megszakítása
        </button>
      </div>
    </div>
  );
}
