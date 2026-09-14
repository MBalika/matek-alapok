"use client";

import FeladatFilm from "@/components/anim/FeladatFilm";
import { arany, lerp, rugo } from "@/components/anim/Idovonal";
import { Hegy, NyilA, VonalA, FeliratA, PontA } from "@/components/anim/FilmElemek";
import { vetit } from "@/components/abrak/Ter3D";

/* KF‑6: két kitérő egyenes távolsága.
   f: P(1;1;0), v1 = (2;1;−2)   g: Q(4;0;3), v2 = (1;2;2)
   n = v1 × v2 = (6;−6;3), |n| = 9, PQ·n = 33, d = 33/9 = 11/3 ≈ 3,667 */

const NAR = "#e2590a";
const KEK = "#2563eb";
const LILA = "#7c3aed";
const TEAL = "#0f766e";
const SZURKE = "#64748b";

const P = [1, 1, 0];
const V1 = [2, 1, -2];
const Q = [4, 0, 3];
const V2 = [1, 2, 2];
const PQ = [3, -1, 3];
const N = [6, -6, 3];
const NE = N.map((k) => k / 9);

const KOZEP = [2.6, 0.6, 1.4];
const OX = 262;
const OY = 210;
const S = 30;

const HOSSZ = 24;

const FEJEZETEK = [
  {
    t0: 0,
    cim: "Két egyenes, amely elmegy egymás mellett",
    szoveg:
      "Az irányvektorok nem párhuzamosak, közös pontjuk mégsincs: ez a kitérő helyzet. Forgasd körbe fejben — a képen látszik, hogy az egyik „átbújik” a másik alatt.",
    kepletek: [
      "f:\\ x = 1+2t,\\ y = 1+t,\\ z = -2t",
      "g:\\ x = 4+s,\\ y = 2s,\\ z = 3+2s",
    ],
  },
  {
    t0: 3.8,
    cim: "Egy-egy pont és az összekötő vektor",
    szoveg:
      "Válasszunk mindkét egyenesről egy pontot (a legegyszerűbb a t = 0, illetve s = 0 eset), és kössük össze őket.",
    kepletek: ["P(1;\\,1;\\,0),\\quad Q(4;\\,0;\\,3)", "\\overrightarrow{PQ} = (3;\\,-1;\\,3)"],
  },
  {
    t0: 7.6,
    cim: "A közös merőleges iránya",
    szoveg:
      "A normáltranszverzális mindkét egyenesre merőleges, tehát iránya a két irányvektor vektoriális szorzata.",
    kepletek: [
      "\\mathbf{n} = \\mathbf{v}_1\\times\\mathbf{v}_2 = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ 2 & 1 & -2 \\\\ 1 & 2 & 2 \\end{vmatrix} = (6;\\,-6;\\,3)",
      "|\\mathbf{n}| = \\sqrt{36+36+9} = 9",
    ],
  },
  {
    t0: 11.8,
    cim: "A paralelepipedon felépül",
    szoveg:
      "A PQ, v₁ és v₂ vektorok egy testet feszítenek ki. Az alaplapja a v₁, v₂ paralelogrammája — a két egyenes két párhuzamos síkban fekszik, és ezek a test alap- és fedőlapja.",
    kepletek: ["\\overrightarrow{PQ}\\cdot\\mathbf{n} = 3\\cdot 6 + (-1)(-6) + 3\\cdot 3 = 33"],
  },
  {
    t0: 16.2,
    cim: "Térfogat osztva az alaplappal",
    szoveg:
      "A vegyes szorzat abszolút értéke a térfogat, a vektoriális szorzat hossza az alapterület. A kettő hányadosa a magasság — és éppen ez a két egyenes távolsága.",
    kepletek: [
      "d = \\frac{\\left|\\overrightarrow{PQ}\\cdot(\\mathbf{v}_1\\times\\mathbf{v}_2)\\right|}{|\\mathbf{v}_1\\times\\mathbf{v}_2|} = \\frac{33}{9} = \\frac{11}{3} \\approx 3{,}667",
    ],
  },
  {
    t0: 20.2,
    cim: "Miért jó ez?",
    szoveg:
      "Mert nem kell megkeresni a normáltranszverzálist: egyetlen vegyes szorzat és egyetlen hossz elég. Ha nulla jön ki, az egyenesek nem kitérők — egy síkban vannak.",
    kepletek: ["d = 0 \\iff \\text{a két egyenes metsző vagy párhuzamos}"],
  },
];

function kamera(t) {
  return {
    azimut: -30 + 40 * arany(t, 1, HOSSZ - 1),
    emelkedes: 22 + 8 * Math.sin(arany(t, 0, HOSSZ) * Math.PI * 2),
  };
}

function Rajz(t) {
  const nezet = kamera(t);
  const V = (p) => {
    const q = vetit([p[0] - KOZEP[0], p[1] - KOZEP[1], p[2] - KOZEP[2]], nezet);
    return { x: OX + q.X * S, y: OY - q.Y * S };
  };
  const eg = (A, v, k) => V([A[0] + k * v[0], A[1] + k * v[1], A[2] + k * v[2]]);

  const fU = arany(t, 0.4, 1.6);
  const gU = arany(t, 1.4, 2.6);
  const pontU = arany(t, 4.2, 5.0, rugo);
  const pqU = arany(t, 5.2, 6.4);
  const nU = arany(t, 8.4, 9.8, rugo);
  const testU = arany(t, 12.4, 14.6);
  const magU = arany(t, 16.6, 17.6);
  const vegU = arany(t, 20.6, 21.6);

  const f1 = eg(P, V1, -0.9);
  const f2 = eg(P, V1, 2.0);
  const g1 = eg(Q, V2, -0.9);
  const g2 = eg(Q, V2, 1.6);
  const p = V(P);
  const q = V(Q);
  const nVeg = V([P[0] + 3.6 * NE[0], P[1] + 3.6 * NE[1], P[2] + 3.6 * NE[2]]);

  // a paralelepipedon csúcsai: P + i·v1 + j·v2 + k·PQ
  const cs = (i, j, k) =>
    V([
      P[0] + i * V1[0] + j * V2[0] + k * PQ[0],
      P[1] + i * V1[1] + j * V2[1] + k * PQ[1],
      P[2] + i * V1[2] + j * V2[2] + k * PQ[2],
    ]);
  const lapok = [
    [cs(0, 0, 0), cs(1, 0, 0), cs(1, 1, 0), cs(0, 1, 0)],
    [cs(0, 0, 1), cs(1, 0, 1), cs(1, 1, 1), cs(0, 1, 1)],
    [cs(0, 0, 0), cs(1, 0, 0), cs(1, 0, 1), cs(0, 0, 1)],
    [cs(0, 1, 0), cs(1, 1, 0), cs(1, 1, 1), cs(0, 1, 1)],
    [cs(0, 0, 0), cs(0, 1, 0), cs(0, 1, 1), cs(0, 0, 1)],
    [cs(1, 0, 0), cs(1, 1, 0), cs(1, 1, 1), cs(1, 0, 1)],
  ];

  // a magasság szakasza: P-ből az n irányába d = 11/3 hosszan
  const d = 11 / 3;
  const magVeg = V([P[0] + d * NE[0], P[1] + d * NE[1], P[2] + d * NE[2]]);

  const O = V([0, 0, 0]);
  const tx = V([2.2, 0, 0]);
  const ty = V([0, 2.2, 0]);
  const tz = V([0, 0, 2.2]);

  return (
    <svg viewBox="0 0 560 420" className="abra w-full select-none">
      <defs>
        <Hegy id="fkt-n" szin={NAR} />
        <Hegy id="fkt-k" szin={KEK} />
        <Hegy id="fkt-l" szin={LILA} />
        <Hegy id="fkt-sz" szin={SZURKE} />
        <Hegy id="fkt-t" szin={TEAL} />
      </defs>

      <line x1={O.x} y1={O.y} x2={tx.x} y2={tx.y} stroke={SZURKE} strokeWidth="1" markerEnd="url(#fkt-sz)" opacity="0.55" />
      <line x1={O.x} y1={O.y} x2={ty.x} y2={ty.y} stroke={SZURKE} strokeWidth="1" markerEnd="url(#fkt-sz)" opacity="0.55" />
      <line x1={O.x} y1={O.y} x2={tz.x} y2={tz.y} stroke={SZURKE} strokeWidth="1" markerEnd="url(#fkt-sz)" opacity="0.55" />

      {/* paralelepipedon */}
      {testU > 0.01 &&
        lapok.map((lap, i) => (
          <polygon
            key={i}
            points={lap.map((s) => `${s.x.toFixed(1)},${s.y.toFixed(1)}`).join(" ")}
            fill={TEAL}
            fillOpacity={0.09 * testU}
            stroke={TEAL}
            strokeWidth="1.1"
            strokeOpacity={0.6 * testU}
          />
        ))}

      {/* alaplap kiemelve */}
      {testU > 0.01 && (
        <polygon
          points={[cs(0, 0, 0), cs(1, 0, 0), cs(1, 1, 0), cs(0, 1, 0)]
            .map((s) => `${s.x.toFixed(1)},${s.y.toFixed(1)}`)
            .join(" ")}
          fill={TEAL}
          fillOpacity={0.22 * testU}
          stroke={TEAL}
          strokeWidth="1.8"
          strokeOpacity={testU}
        />
      )}

      {/* a két egyenes */}
      <VonalA x1={f1.x} y1={f1.y} x2={f2.x} y2={f2.y} u={fU} szin={NAR} vastag={3} szaggatott={false} />
      <VonalA x1={g1.x} y1={g1.y} x2={g2.x} y2={g2.y} u={gU} szin={KEK} vastag={3} szaggatott={false} />
      <FeliratA x={f2.x + 8} y={f2.y + 4} szin={NAR} meret={12.5} opacitas={fU} horgony="start">
        f
      </FeliratA>
      <FeliratA x={g2.x + 8} y={g2.y + 4} szin={KEK} meret={12.5} opacitas={gU} horgony="start">
        g
      </FeliratA>

      {/* irányvektorok */}
      <NyilA x1={p.x} y1={p.y} x2={V([P[0] + V1[0], P[1] + V1[1], P[2] + V1[2]]).x} y2={V([P[0] + V1[0], P[1] + V1[1], P[2] + V1[2]]).y} u={arany(t, 8.0, 8.8)} szin={NAR} hegy="fkt-n" vastag={2.6} />
      <NyilA x1={q.x} y1={q.y} x2={V([Q[0] + V2[0], Q[1] + V2[1], Q[2] + V2[2]]).x} y2={V([Q[0] + V2[0], Q[1] + V2[1], Q[2] + V2[2]]).y} u={arany(t, 8.0, 8.8)} szin={KEK} hegy="fkt-k" vastag={2.6} />

      {/* PQ */}
      <NyilA x1={p.x} y1={p.y} x2={q.x} y2={q.y} u={pqU} szin={SZURKE} hegy="fkt-sz" vastag={2.6} szaggatott />
      <FeliratA x={lerp(p.x, q.x, 0.42) - 12} y={lerp(p.y, q.y, 0.42) + 20} szin={SZURKE} meret={12} opacitas={pqU} horgony="end">
        PQ = (3; −1; 3)
      </FeliratA>

      {/* normálvektor */}
      <NyilA x1={p.x} y1={p.y} x2={nVeg.x} y2={nVeg.y} u={nU} szin={LILA} hegy="fkt-l" vastag={3.2} />
      <FeliratA x={nVeg.x} y={nVeg.y - 16} szin={LILA} meret={12.5} opacitas={nU}>
        n = v₁ × v₂ = (6; −6; 3)
      </FeliratA>

      {/* magasság */}
      {magU > 0.01 && (
        <>
          <line
            x1={p.x}
            y1={p.y}
            x2={lerp(p.x, magVeg.x, magU)}
            y2={lerp(p.y, magVeg.y, magU)}
            stroke="#15803d"
            strokeWidth="4"
            strokeLinecap="round"
            opacity={magU}
          />
          <FeliratA x={lerp(p.x, magVeg.x, 0.5) - 14} y={lerp(p.y, magVeg.y, 0.5) + 14} szin="#15803d" meret={12.5} opacitas={magU} horgony="end">
            d = 11/3
          </FeliratA>
        </>
      )}

      <PontA x={p.x} y={p.y} r={5.5} szin={NAR} u={pontU} />
      <PontA x={q.x} y={q.y} r={5.5} szin={KEK} u={pontU} />
      <FeliratA x={p.x - 10} y={p.y + 16} szin={NAR} opacitas={pontU} horgony="end">
        P(1; 1; 0)
      </FeliratA>
      <FeliratA x={q.x + 12} y={q.y + 20} szin={KEK} opacitas={pontU} horgony="start">
        Q(4; 0; 3)
      </FeliratA>

      <FeliratA x={22} y={34} szin={TEAL} meret={13} opacitas={testU} horgony="start">
        V = |PQ·(v₁×v₂)| = 33
      </FeliratA>
      <FeliratA x={22} y={54} szin={TEAL} meret={13} opacitas={testU} horgony="start">
        T = |v₁×v₂| = 9
      </FeliratA>
      <FeliratA x={22} y={392} szin="#15803d" meret={13.5} opacitas={vegU} horgony="start">
        d = V / T = 33 / 9 = 11/3 ≈ 3,667
      </FeliratA>
    </svg>
  );
}

export default function FilmKiteroTavolsag() {
  return (
    <FeladatFilm
      cim="Két kitérő egyenes távolsága — KF‑6 lépésről lépésre"
      hossz={HOSSZ}
      fejezetek={FEJEZETEK}
      rajz={Rajz}
      megjegyzes="A zöld szakasz a normáltranszverzális hossza: a paralelepipedon magassága, azaz a két egyenes távolsága."
    />
  );
}
