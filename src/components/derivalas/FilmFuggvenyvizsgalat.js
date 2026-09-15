"use client";

import FeladatFilm from "@/components/anim/FeladatFilm";
import { arany, lerp, simit, beKi } from "@/components/anim/Idovonal";
import { FeliratA, PontA, VonalA } from "@/components/anim/FilmElemek";

const TEAL = "#0f766e";
const NAR = "#e2590a";
const LILA = "#7c3aed";
const PIROS = "#dc2626";
const ZOLD = "#15803d";
const SZURKE = "#94a3b8";
const SOTET = "#1d3c48";

const SZ = 560;
const MA = 360;
const BAL = 44;
const JOBB = 526;
const FEL = 34;
const LE = 300;

const f = (x) => x / (x * x + 1);
const fv = (x) => (1 - x * x) / Math.pow(x * x + 1, 2);
/* A rajzon a deriváltakat kicsinyítve mutatjuk, hogy beférjenek — a zérushelyek helye ettől nem változik. */
const FV_LEPTEK = 0.55;
const FVV_LEPTEK = 0.32;
const fvv = (x) => (2 * x * (x * x - 3)) / Math.pow(x * x + 1, 3);
const GY3 = Math.sqrt(3);

const FEJEZETEK = [
  {
    t0: 0,
    cim: "1. Értelmezési tartomány és zérushely",
    szoveg:
      "A nevező x² + 1 ≥ 1 > 0, tehát a függvény az egész számegyenesen értelmezett, szakadás nincs. Zérushely csak x = 0.",
    kepletek: ["f(x) = \\frac{x}{x^2+1}", "D_f = \\mathbb{R}"],
  },
  {
    t0: 4.2,
    cim: "2. Paritás és aszimptota",
    szoveg:
      "f(−x) = −f(x): a függvény páratlan, a grafikon origóra szimmetrikus. A végtelenben nullához tart, tehát y = 0 vízszintes aszimptota.",
    kepletek: ["\\lim_{x\\to\\pm\\infty}\\frac{x}{x^2+1} = 0"],
  },
  {
    t0: 8.4,
    cim: "3. Az első derivált zérushelyei",
    szoveg:
      "A hányadosszabállyal f ′(x) = (1 − x²)/(x² + 1)². A nevező mindig pozitív, tehát az előjelet az 1 − x² dönti el: zérushelyek x = ±1.",
    kepletek: ["f'(x) = \\frac{1-x^2}{(x^2+1)^2}"],
  },
  {
    t0: 12.6,
    cim: "4. Monotonitás — az előjeltáblázat",
    szoveg:
      "x < −1: f ′ negatív, a függvény csökken. −1 < x < 1: f ′ pozitív, nő. x > 1: ismét csökken. Két előjelváltás, tehát két szélsőérték.",
    kepletek: [],
  },
  {
    t0: 16.8,
    cim: "5. A szélsőértékek",
    szoveg:
      "Az x = −1 helyen negatívról pozitívra vált a derivált: lokális minimum, értéke −1/2. Az x = 1 helyen fordítva: lokális maximum, értéke 1/2. Itt vízszintes az érintő.",
    kepletek: ["f(-1) = -\\tfrac12,\\qquad f(1) = \\tfrac12"],
  },
  {
    t0: 21.5,
    cim: "6. Konvexitás és inflexió",
    szoveg:
      "f ″(x) = 2x(x² − 3)/(x² + 1)³, zérushelyei 0 és ±√3. Mindhárom helyen előjelet vált, tehát mindhárom inflexiós pont.",
    kepletek: ["f''(x) = \\frac{2x(x^2-3)}{(x^2+1)^3}"],
  },
  {
    t0: 25.5,
    cim: "7. A kész kép",
    szoveg:
      "Csökken − nő − csökken, két szélsőértékkel, három inflexióval, y = 0 aszimptotával. Az értékkészlet −1/2 ≤ y ≤ 1/2.",
    kepletek: ["R_f = \\left[-\\tfrac12;\\ \\tfrac12\\right]"],
  },
];

function rajz(t) {
  /* --- kameramozgás: a szélsőértékeknél közelítünk --- */
  const be = arany(t, 17.0, 19.0, beKi);
  const ki = arany(t, 25.8, 27.2, beKi);
  const kozelites = be - ki;
  const xMin = lerp(-5, -2.6, Math.max(0, kozelites));
  const xMax = -xMin;
  const yMax = lerp(0.78, 0.62, Math.max(0, kozelites));
  const yMin = -yMax;

  const px = (x) => BAL + ((x - xMin) / (xMax - xMin)) * (JOBB - BAL);
  const py = (y) => LE - ((y - yMin) / (yMax - yMin)) * (LE - FEL);

  const utvonal = (fn, tol, ig, db = 260) => {
    let d = "";
    let elso = true;
    for (let i = 0; i <= db; i++) {
      const x = tol + ((ig - tol) * i) / db;
      const y = fn(x);
      if (!Number.isFinite(y)) {
        elso = true;
        continue;
      }
      d += `${elso ? "M" : "L"}${px(x).toFixed(1)},${py(y).toFixed(1)} `;
      elso = false;
    }
    return d;
  };

  /* --- 1. fejezet: a görbe kirajzolódik --- */
  const uGorbe = arany(t, 0.6, 3.6, simit);
  /* --- 2. aszimptota --- */
  const uAszimptota = arany(t, 4.4, 5.8);
  const uParitas = arany(t, 6.2, 7.4);
  /* --- 3. derivált --- */
  const uDer = arany(t, 8.8, 11.0, simit);
  const uDerPont = arany(t, 11.0, 12.2);
  /* --- 4. monotonitás --- */
  const uMon = arany(t, 13.0, 15.6, simit);
  /* --- 5. szélsőérték --- */
  const uSzels = arany(t, 17.4, 19.4);
  /* --- 6. inflexió --- */
  const uInfl = arany(t, 21.9, 23.6);
  const uInflPont = arany(t, 23.2, 25.0);
  /* --- 7. összegzés --- */
  const uKesz = arany(t, 26.0, 27.5);

  const xTengelyY = py(0);

  /* monotonitási szakaszok */
  const szakaszok = [
    { tol: xMin, ig: -1, szin: PIROS },
    { tol: -1, ig: 1, szin: ZOLD },
    { tol: 1, ig: xMax, szin: PIROS },
  ];

  return (
    <svg viewBox={`0 0 ${SZ} ${MA}`} className="abra w-full select-none">
      {/* rács */}
      {[-4, -3, -2, -1, 1, 2, 3, 4]
        .filter((v) => v > xMin && v < xMax)
        .map((v) => (
          <line key={`gx${v}`} x1={px(v)} y1={FEL} x2={px(v)} y2={LE} stroke="#e2e8f0" strokeWidth="0.8" />
        ))}
      {[-0.5, 0.5].map((v) => (
        <line key={`gy${v}`} x1={BAL} y1={py(v)} x2={JOBB} y2={py(v)} stroke="#e2e8f0" strokeWidth="0.8" />
      ))}

      {/* tengelyek */}
      <line x1={BAL} y1={xTengelyY} x2={JOBB} y2={xTengelyY} stroke="#475569" strokeWidth="1.2" />
      <line x1={px(0)} y1={LE} x2={px(0)} y2={FEL} stroke="#475569" strokeWidth="1.2" />
      <text x={JOBB - 2} y={xTengelyY - 7} textAnchor="end" fontSize="12" fontStyle="italic" fill="#475569">
        x
      </text>
      <text x={px(0) + 8} y={FEL + 10} fontSize="12" fontStyle="italic" fill="#475569">
        y
      </text>
      {[-4, -2, 2, 4]
        .filter((v) => v > xMin && v < xMax)
        .map((v) => (
          <text key={`tx${v}`} x={px(v)} y={xTengelyY + 14} textAnchor="middle" fontSize="10.5" fill="#64748b">
            {v}
          </text>
        ))}
      {[-0.5, 0.5].map((v) => (
        <text key={`ty${v}`} x={px(0) - 6} y={py(v) + 3.5} textAnchor="end" fontSize="10.5" fill="#64748b">
          {v === 0.5 ? "0,5" : "−0,5"}
        </text>
      ))}

      {/* 2. aszimptota */}
      {uAszimptota > 0.01 && (
        <>
          <line
            x1={BAL}
            y1={py(0)}
            x2={BAL + (JOBB - BAL) * uAszimptota}
            y2={py(0)}
            stroke={PIROS}
            strokeWidth="1.8"
            strokeDasharray="6 4"
            opacity="0.85"
          />
          <FeliratA x={JOBB - 16} y={py(0) - 10} szin={PIROS} meret={12} horgony="end" opacitas={uAszimptota}>
            y = 0 aszimptota
          </FeliratA>
        </>
      )}

      {/* 4. monotonitási szakaszok színezve */}
      {uMon > 0.01 &&
        szakaszok.map((s, i) => {
          const u = Math.max(0, Math.min(1, uMon * 3 - i));
          if (u <= 0.01) return null;
          return (
            <path
              key={i}
              d={utvonal(f, s.tol, s.tol + (s.ig - s.tol) * u, 120)}
              fill="none"
              stroke={s.szin}
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0.34"
            />
          );
        })}

      {/* 1. maga a görbe */}
      {uGorbe > 0.01 && (
        <path
          d={utvonal(f, xMin, xMin + (xMax - xMin) * uGorbe)}
          fill="none"
          stroke={TEAL}
          strokeWidth="3"
          strokeLinecap="round"
        />
      )}

      {/* 3. az első derivált */}
      {uDer > 0.01 && (
        <>
          <path
            d={utvonal((x) => fv(x) * FV_LEPTEK, xMin, xMin + (xMax - xMin) * uDer)}
            fill="none"
            stroke={NAR}
            strokeWidth="2"
            strokeDasharray="6 4"
            opacity="0.9"
          />
          <FeliratA x={BAL + 14} y={FEL + 16} szin={NAR} meret={12} horgony="start" opacitas={uDer}>
            f ′(x) — kicsinyítve
          </FeliratA>
        </>
      )}
      {uDerPont > 0.01 &&
        [-1, 1].map((x) => (
          <g key={`d${x}`}>
            <PontA x={px(x)} y={py(0)} r={5} szin={NAR} u={uDerPont} />
            <VonalA
              x1={px(x)}
              y1={py(0)}
              x2={px(x)}
              y2={py(f(x))}
              u={uDerPont}
              szin={SZURKE}
              vastag={1.2}
            />
          </g>
        ))}

      {/* 5. szélsőértékek: vízszintes érintők */}
      {uSzels > 0.01 &&
        [-1, 1].map((x) => (
          <g key={`s${x}`}>
            <line
              x1={px(x - 1.1 * uSzels)}
              y1={py(f(x))}
              x2={px(x + 1.1 * uSzels)}
              y2={py(f(x))}
              stroke={NAR}
              strokeWidth="2.6"
              opacity={uSzels}
            />
            <PontA x={px(x)} y={py(f(x))} r={6} szin={NAR} u={uSzels} />
            <FeliratA
              x={px(x)}
              y={py(f(x)) + (x > 0 ? -16 : 26)}
              szin={NAR}
              meret={12}
              opacitas={uSzels}
            >
              {x > 0 ? "max: (1; 0,5)" : "min: (−1; −0,5)"}
            </FeliratA>
          </g>
        ))}

      {/* 6. második derivált és inflexió */}
      {uInfl > 0.01 && (
        <>
          <path
            d={utvonal((x) => fvv(x) * FVV_LEPTEK, xMin, xMin + (xMax - xMin) * uInfl)}
            fill="none"
            stroke={LILA}
            strokeWidth="1.8"
            strokeDasharray="3 3"
            opacity="0.8"
          />
          <FeliratA x={BAL + 14} y={FEL + 32} szin={LILA} meret={12} horgony="start" opacitas={uInfl}>
            f ″(x) — kicsinyítve
          </FeliratA>
        </>
      )}
      {uInflPont > 0.01 &&
        [-GY3, 0, GY3].map((x) => (
          <PontA key={`i${x}`} x={px(x)} y={py(f(x))} r={5} szin={LILA} u={uInflPont} />
        ))}
      {uInflPont > 0.4 && (
        <FeliratA
          x={px(GY3) + 10}
          y={py(f(GY3)) - 8}
          szin={LILA}
          meret={11.5}
          horgony="start"
          opacitas={uInflPont}
        >
          inflexió: √3 ≈ 1,73
        </FeliratA>
      )}

      {/* 7. összegzés */}
      {uKesz > 0.01 && (
        <FeliratA x={SZ / 2} y={MA - 14} szin={SOTET} meret={12.5} opacitas={uKesz}>
          csökken · nő · csökken — értékkészlet: −0,5 ≤ y ≤ 0,5
        </FeliratA>
      )}
      {t < 8.6 && uParitas > 0.01 && (
        <FeliratA x={SZ / 2} y={MA - 14} szin={SOTET} meret={12.5} opacitas={uParitas}>
          f(−x) = −f(x): origóra szimmetrikus
        </FeliratA>
      )}
    </svg>
  );
}

export default function FilmFuggvenyvizsgalat() {
  return (
    <FeladatFilm
      cim="Teljes függvényvizsgálat: x / (x² + 1)"
      hossz={29}
      fejezetek={FEJEZETEK}
      rajz={rajz}
      megjegyzes="A kamera a szélsőértékeknél ráközelít, a végén visszahúz."
    />
  );
}
