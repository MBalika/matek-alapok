"use client";

import { useState } from "react";
import FvRajz from "./FvRajz";
import { Csuszka } from "./Csuszka";
import { simpson, teruletUt } from "./HoSzamol";
import { M } from "@/components/ui/Keplet";
import { sz } from "@/lib/szamok";

const TEAL = "#0f766e";
const NAR = "#e2590a";
const ZOLD = "#15803d";

const FVEK = [
  {
    cimke: "x² a [0;3]-on",
    latex: "f(x)=x^2",
    fn: (x) => x * x,
    a: 0,
    b: 3,
    x: [-0.4, 3.6],
    y: [-0.8, 10],
    ximkep: "\\xi=\\sqrt3\\approx1{,}732",
    megjegyzes:
      "A jegyzet 4. példája: az átlagérték 3, és a függvény az x = √3 ≈ 1,732 helyen veszi fel — az intervallum közepétől jobbra, mert a parabola a végén nő meg igazán.",
  },
  {
    cimke: "sin x a [0;π]-n",
    latex: "f(x)=\\sin x",
    fn: Math.sin,
    a: 0,
    b: Math.PI,
    x: [-0.3, 3.45],
    y: [-0.25, 1.3],
    ximkep: "\\xi_{1,2}\\approx0{,}690;\\ 2{,}452",
    megjegyzes:
      "Itt az átlagérték 2/π ≈ 0,6366 — és két ξ hely is van, mert a szinusz ezt az értéket kétszer veszi fel. A tétel csak azt állítja, hogy létezik ilyen hely, nem azt, hogy egy van.",
  },
  {
    cimke: "√x a [0;4]-en",
    latex: "f(x)=\\sqrt{x}",
    fn: (x) => (x >= 0 ? Math.sqrt(x) : NaN),
    a: 0,
    b: 4,
    x: [-0.4, 4.6],
    y: [-0.5, 2.6],
    ximkep: "\\xi=\\frac{16}{9}\\approx1{,}778",
    megjegyzes:
      "Az átlagérték 4/3 ≈ 1,333, a hely ξ = 16/9 ≈ 1,778. A gyökfüggvény az elején nő gyorsan, ezért van a ξ a közép előtt… vagy mégsem? Nézd meg: 16/9 < 2, tehát igen.",
  },
  {
    cimke: "e⁻ˣ a [0;2]-n",
    latex: "f(x)=e^{-x}",
    fn: (x) => Math.exp(-x),
    a: 0,
    b: 2,
    x: [-0.3, 2.4],
    y: [-0.2, 1.2],
    ximkep: "\\xi=\\ln\\frac{2}{1-e^{-2}}\\approx0{,}839",
    megjegyzes:
      "Csillapodó folyamat átlaga: (1 − e⁻²)/2 ≈ 0,4323. A ξ ≈ 0,839 hely a bal félben van, mert ott nagyok az értékek — az átlagot „korán” éri el a függvény.",
  },
];

export default function HoAtlagertekFelfedezo() {
  const [i, setI] = useState(0);
  const F = FVEK[i];
  const integral = simpson(F.fn, F.a, F.b, 2000);
  const atlag = integral / (F.b - F.a);
  const [h, setH] = useState(FVEK[0].fn(FVEK[0].b) * 0.35);

  const valt = (j) => {
    setI(j);
    const G = FVEK[j];
    setH(Math.round(G.fn(G.b) * 0.35 * 100) / 100);
  };

  const teglalapT = h * (F.b - F.a);
  const kul = teglalapT - integral;
  const talalt = Math.abs(kul) < Math.max(0.02, Math.abs(integral) * 0.008);

  // a ξ helyek: ahol f(x) = h
  const xik = [];
  {
    const db = 600;
    let elozoX = null;
    let elozoY = null;
    for (let k = 0; k <= db; k++) {
      const x = F.a + ((F.b - F.a) * k) / db;
      const y = F.fn(x) - h;
      if (!Number.isFinite(y)) {
        elozoX = null;
        elozoY = null;
        continue;
      }
      if (elozoY !== null && elozoY * y <= 0 && elozoY !== 0) {
        let lo = elozoX;
        let hi = x;
        let ylo = elozoY;
        for (let j = 0; j < 50; j++) {
          const kz = (lo + hi) / 2;
          const yk = F.fn(kz) - h;
          if (ylo * yk <= 0) hi = kz;
          else {
            lo = kz;
            ylo = yk;
          }
        }
        xik.push((lo + hi) / 2);
      }
      elozoX = x;
      elozoY = y;
    }
  }

  const maxH = Math.max(...[0, 0.25, 0.5, 0.75, 1].map((u) => F.fn(F.a + (F.b - F.a) * u))) * 1.05;

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <FvRajz
            xMin={F.x[0]}
            xMax={F.x[1]}
            yMin={F.y[0]}
            yMax={F.y[1]}
            gorbek={[{ fn: F.fn, szin: TEAL, vastag: 2.8, tol: F.a, ig: F.b }]}
            className="abra w-full select-none"
          >
            {(S) => (
              <g>
                <path
                  d={teruletUt(S, () => 0, F.fn, F.a, F.b)}
                  fill={TEAL}
                  fillOpacity="0.16"
                  stroke="none"
                />
                <rect
                  x={S.px(F.a)}
                  y={S.py(h)}
                  width={S.px(F.b) - S.px(F.a)}
                  height={Math.max(0, S.py(0) - S.py(h))}
                  fill={talalt ? ZOLD : NAR}
                  fillOpacity="0.17"
                  stroke={talalt ? ZOLD : NAR}
                  strokeWidth="2"
                />
                <text
                  x={S.px(F.a) + 6}
                  y={S.py(h) - 9}
                  fontSize="12"
                  fontWeight="650"
                  textAnchor="start"
                  style={{
                    fill: talalt ? ZOLD : NAR,
                    paintOrder: "stroke",
                    stroke: "white",
                    strokeWidth: 3.5,
                  }}
                >
                  téglalap magassága: {sz(h, 3)}
                </text>
                {talalt &&
                  xik.map((xi, k) => (
                    <g key={k}>
                      <circle cx={S.px(xi)} cy={S.py(h)} r="5" fill={ZOLD} stroke="white" strokeWidth="1.5" />
                      <text
                        x={S.px(xi)}
                        y={S.py(h) + 20}
                        fontSize="12"
                        fontWeight="700"
                        textAnchor="middle"
                        style={{ fill: ZOLD, paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
                      >
                        ξ = {sz(xi, 3)}
                      </text>
                    </g>
                  ))}
              </g>
            )}
          </FvRajz>
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            {talalt
              ? "A két terület megegyezik — ez az átlagérték, és a ξ helyeken fel is veszi a függvény."
              : "Húzd a csúszkát addig, amíg a téglalap területe pontosan a görbe alatti területtel egyezik."}
          </p>
        </div>

        <div className="p-5">
          <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">Feladat</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {FVEK.map((k, j) => (
              <button
                key={k.cimke}
                type="button"
                onClick={() => valt(j)}
                className={`rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition ${
                  i === j
                    ? "bg-petrol-700 text-white"
                    : "bg-white text-petrol-600 ring-1 ring-petrol-200 hover:bg-petrol-50"
                }`}
              >
                {k.cimke}
              </button>
            ))}
          </div>

          <div className="mt-4">
            <Csuszka
              cimke="A téglalap magassága"
              ertek={h}
              min={0}
              max={Math.round(maxH * 100) / 100}
              lepes={Math.max(0.005, Math.round((maxH / 200) * 1000) / 1000)}
              tizedes={3}
              onChange={setH}
            />
          </div>

          <div className="mt-2 flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setH(Math.round(atlag * 1000) / 1000)}
              className="rounded-lg bg-white px-2.5 py-1.5 text-[12px] font-medium text-emerald-700 ring-1 ring-emerald-200 transition hover:bg-emerald-50"
            >
              Beállítás pontosan
            </button>
          </div>

          <div className="szamok mt-4 space-y-1.5 rounded-xl bg-petrol-50 p-4 text-[13.5px] text-petrol-800">
            <div>
              <M>{F.latex}</M>
            </div>
            <div className="flex items-baseline justify-between">
              <span>görbe alatti terület</span>
              <span className="font-semibold" style={{ color: TEAL }}>
                {sz(integral, 4)}
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <span>a téglalap területe</span>
              <span className="font-semibold" style={{ color: talalt ? ZOLD : NAR }}>
                {sz(teglalapT, 4)}
              </span>
            </div>
            <div className="flex items-baseline justify-between border-t border-petrol-200 pt-1.5">
              <span>különbség</span>
              <span className="font-semibold text-petrol-900">{sz(kul, 4)}</span>
            </div>
          </div>

          <div
            className={`mt-3 rounded-xl border p-4 ${
              talalt ? "border-emerald-200 bg-emerald-50" : "border-naracs-200 bg-naracs-50"
            }`}
          >
            <p
              className={`text-[10.5px] font-bold tracking-[0.16em] uppercase ${
                talalt ? "text-emerald-700" : "text-naracs-700"
              }`}
            >
              Az átlagérték
            </p>
            <div className="szamok mt-1.5 text-[13.5px] text-petrol-900">
              <M>{`\\bar f = \\frac{1}{b-a}\\int_a^b f = ${sz(atlag, 4).replace(",", "{,}")}`}</M>
            </div>
            <div className="szamok mt-1 text-[13px] text-petrol-700">
              <M>{F.ximkep}</M>
            </div>
          </div>

          <p className="mt-3 text-[12.5px] leading-relaxed text-petrol-500">{F.megjegyzes}</p>
        </div>
      </div>
    </div>
  );
}
