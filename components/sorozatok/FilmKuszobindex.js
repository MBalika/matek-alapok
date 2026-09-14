"use client";

import FeladatFilm from "@/components/anim/FeladatFilm";
import { arany, lerp } from "@/components/anim/Idovonal";
import { FeliratA, PontA, VonalA } from "@/components/anim/FilmElemek";

/* KF‑1: (2n+1)/(n+3) → 2. A sáv záródása, a küszöbindex, majd szigorúbb ε. */

const SZ = 560;
const MA = 400;
const BAL = 56;
const JOBB = 22;
const FENT = 26;
const LENT = 42;

const NAR = "#e2590a";
const TEAL = "#0f766e";
const SZURKE = "#94a3b8";
const SOTET = "#1d3c48";

const a = (n) => (2 * n + 1) / (n + 3);
const A = 2;

const T_PONT = 0.5;
const T_VONAL = 4.6;
const T_SAV = 7.8;
const T_KUSZOB = 11.4;
const T_ZOOM = 15.6;
const T_ZARO = 20.4;
const HOSSZ = 24.5;

const FEJEZETEK = [
  {
    t0: 0,
    cim: "A sorozat első negyven tagja",
    szoveg:
      "aₙ = (2n+1)/(n+3). A tagok láthatóan a 2 felé kúsznak — de a „kúszik felé” önmagában nem definíció. Kell valami mérhető.",
    kepletek: ["a_1 = \\frac34,\\quad a_{10} = \\frac{21}{13} \\approx 1{,}615,\\quad a_{100} = \\frac{201}{103} \\approx 1{,}951"],
  },
  {
    t0: T_VONAL,
    cim: "A feltételezett határérték",
    szoveg: "Húzzuk be az A = 2 vonalat, és nézzük meg, mekkora az eltérés. Közös nevezőre hozva a különbség egyszerű alakot ölt.",
    kepletek: ["\\left|a_n - 2\\right| = \\left|\\frac{2n+1-2(n+3)}{n+3}\\right| = \\frac{5}{n+3}"],
  },
  {
    t0: T_SAV,
    cim: "A megrendelő tűrése: ε = 0,2",
    szoveg:
      "A sáv A ± ε magasságban záródik össze. A |aₙ − 2| < ε feltétel pontosan azt jelenti, hogy a pont ebben a sávban van.",
    kepletek: ["2 - 0{,}2 < a_n < 2 + 0{,}2"],
  },
  {
    t0: T_KUSZOB,
    cim: "A küszöbindex: N = 22",
    szoveg:
      "Megoldjuk az egyenlőtlenséget n-re. A 22. tag eltérése pontosan 0,2 — még nem kisebb nála; a 23-tól viszont már minden tag bent van, és soha nem lép ki.",
    kepletek: ["\\frac{5}{n+3} < 0{,}2 \\iff n+3 > 25 \\iff n > 22"],
  },
  {
    t0: T_ZOOM,
    cim: "Szigorúbb tűrés: ε = 0,01",
    szoveg:
      "A megrendelő meggondolta magát. A sáv összeszűkül, a kamera ráközelít — a küszöb messzebbre csúszik, de továbbra is létezik.",
    kepletek: ["\\frac{5}{n+3} < 0{,}01 \\iff n > \\frac{5}{0{,}01} - 3 = 497"],
  },
  {
    t0: T_ZARO,
    cim: "Ez az egész definíció",
    szoveg:
      "Bármilyen kicsi ε-t kap, mindig tudsz mutatni hozzá egy N-et. A sorrend kötött: előbb az ε, utána az N — ezért írjuk N(ε)-t.",
    kepletek: ["\\forall \\varepsilon > 0\\ \\exists N(\\varepsilon):\\ n > N(\\varepsilon) \\Rightarrow \\left|a_n - 2\\right| < \\varepsilon"],
  },
];

function allapot(t) {
  const zoomU = arany(t, T_ZOOM, T_ZOOM + 3.2);
  const nMax = Math.exp(lerp(Math.log(40), Math.log(620), zoomU));
  const yAl = lerp(1.08, 1.958, zoomU);
  const yFel = lerp(2.38, 2.042, zoomU);

  const savU = arany(t, T_SAV, T_SAV + 1.6);
  const eps = savU <= 0.001 ? null : lerp(0.62, 0.2, savU) * (1 - zoomU) + 0.01 * zoomU;
  const N = eps == null ? null : Math.floor(5 / eps - 3);

  return { nMax, yAl, yFel, eps, N, zoomU };
}

function Rajz(t) {
  const { nMax, yAl, yFel, eps, N, zoomU } = allapot(t);
  const px = (n) => BAL + ((n - 1) / (nMax - 1)) * (SZ - BAL - JOBB);
  const py = (v) => FENT + ((yFel - v) / (yFel - yAl)) * (MA - FENT - LENT);

  const pontU = arany(t, T_PONT, T_PONT + 3.6);
  const lathatoN = Math.max(pontU * 40, zoomU > 0.01 ? nMax : 0);
  const lepes = Math.max(1, Math.ceil(nMax / 70));

  const pontok = [];
  for (let n = 1; n <= Math.min(nMax, lathatoN); n += n <= 40 ? 1 : lepes) {
    if (a(n) < yAl || a(n) > yFel) continue;
    pontok.push(n);
  }

  const vonalU = arany(t, T_VONAL, T_VONAL + 1.3);
  const kuszobU = arany(t, T_KUSZOB, T_KUSZOB + 1.1);

  const yJelolok = [];
  const dy = zoomU > 0.5 ? 0.02 : 0.25;
  for (let v = Math.ceil(yAl / dy) * dy; v <= yFel + 1e-9; v += dy) yJelolok.push(Math.round(v * 1000) / 1000);
  const nJelolok = [];
  const dn = Math.max(1, Math.round(nMax / 8 / 5) * 5);
  for (let n = dn; n <= nMax; n += dn) nJelolok.push(n);

  return (
    <svg viewBox={`0 0 ${SZ} ${MA}`} className="abra w-full select-none">
      {/* ε-sáv */}
      {eps != null && (
        <>
          <rect
            x={BAL}
            y={Math.max(FENT - 6, py(A + eps))}
            width={SZ - BAL - JOBB}
            height={Math.max(1.5, Math.min(MA - LENT, py(A - eps)) - Math.max(FENT - 6, py(A + eps)))}
            fill={TEAL}
            opacity="0.16"
          />
          <line x1={BAL} y1={py(A + eps)} x2={SZ - JOBB} y2={py(A + eps)} stroke={TEAL} strokeWidth="1.1" strokeDasharray="4 3" />
          <line x1={BAL} y1={py(A - eps)} x2={SZ - JOBB} y2={py(A - eps)} stroke={TEAL} strokeWidth="1.1" strokeDasharray="4 3" />
          {py(A + eps) > FENT + 6 && (
            <FeliratA x={BAL + 6} y={py(A + eps) - 7} szin={TEAL} meret={11.5} horgony="start">
              A + ε
            </FeliratA>
          )}
          {py(A - eps) < MA - LENT - 6 && (
            <FeliratA x={BAL + 6} y={py(A - eps) + 15} szin={TEAL} meret={11.5} horgony="start">
              A − ε
            </FeliratA>
          )}
        </>
      )}

      {/* rács */}
      {yJelolok.map((v) => (
        <g key={`y${v}`}>
          <line x1={BAL} y1={py(v)} x2={SZ - JOBB} y2={py(v)} stroke="#dbe5e9" strokeWidth="0.9" />
          <text x={BAL - 7} y={py(v) + 4} textAnchor="end" fontSize="10.5" fill={SZURKE}>
            {v.toFixed(zoomU > 0.5 ? 2 : 2).replace(".", ",")}
          </text>
        </g>
      ))}

      {/* tengelyek */}
      <line x1={BAL} y1={MA - LENT} x2={SZ - JOBB + 4} y2={MA - LENT} stroke="#475569" strokeWidth="1.2" />
      <line x1={BAL} y1={MA - LENT} x2={BAL} y2={FENT - 10} stroke="#475569" strokeWidth="1.2" />
      <text x={SZ - JOBB + 2} y={MA - LENT - 8} textAnchor="end" fontSize="12" fontStyle="italic" fill={SOTET}>
        n
      </text>
      <text x={BAL - 44} y={FENT + 2} fontSize="12" fill={SOTET}>
        aₙ
      </text>
      {nJelolok.map((n) => (
        <g key={`n${n}`}>
          <line x1={px(n)} y1={MA - LENT} x2={px(n)} y2={MA - LENT + 4} stroke="#475569" strokeWidth="1" />
          <text x={px(n)} y={MA - LENT + 19} textAnchor="middle" fontSize="10.5" fill={SZURKE}>
            {n}
          </text>
        </g>
      ))}

      {/* A = 2 */}
      <VonalA x1={BAL} y1={py(A)} x2={SZ - JOBB} y2={py(A)} u={vonalU} szin={NAR} vastag={1.8} szaggatott={false} />
      <FeliratA x={SZ - JOBB - 4} y={py(A) - 8} szin={NAR} meret={12} opacitas={vonalU} horgony="end">
        A = 2
      </FeliratA>

      {/* tagok */}
      {pontok.map((n) => {
        const bent = eps != null && Math.abs(a(n) - A) < eps;
        return (
          <PontA
            key={n}
            x={px(n)}
            y={py(a(n))}
            r={nMax > 60 ? 2.8 : 4.2}
            szin={eps == null ? SOTET : bent ? TEAL : SZURKE}
            u={1}
          />
        );
      })}

      {/* küszöbindex */}
      {N != null && kuszobU > 0.01 && N <= nMax && (
        <>
          <line
            x1={px(N)}
            y1={MA - LENT}
            x2={px(N)}
            y2={FENT - 6}
            stroke={SOTET}
            strokeWidth="1.3"
            strokeDasharray="3 3"
            opacity={kuszobU}
          />
          <FeliratA
            x={px(N) + (px(N) > SZ * 0.58 ? -7 : 7)}
            y={FENT + 8}
            szin={SOTET}
            meret={12.5}
            opacitas={kuszobU}
            horgony={px(N) > SZ * 0.58 ? "end" : "start"}
          >
            N({eps < 0.05 ? "0,01" : "0,2"}) = {N}
          </FeliratA>
          <FeliratA
            x={px(N) + (px(N) > SZ * 0.58 ? -7 : 7)}
            y={FENT + 25}
            szin={TEAL}
            meret={11}
            opacitas={kuszobU}
            horgony={px(N) > SZ * 0.58 ? "end" : "start"}
          >
            innentől MIND a sávban van
          </FeliratA>
        </>
      )}
    </svg>
  );
}

export default function FilmKuszobindex() {
  return (
    <FeladatFilm
      cim="Küszöbindex: (2n+1)/(n+3) → 2"
      hossz={HOSSZ}
      fejezetek={FEJEZETEK}
      rajz={Rajz}
      megjegyzes="A szürke pontok még kívül vannak a sávon, a zöldek már bent. A végén a kamera ráközelít a 2 környezetére, hogy a tízszer szűkebb sáv is látsszon."
    />
  );
}
