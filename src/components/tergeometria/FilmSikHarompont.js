"use client";

import FeladatFilm from "@/components/anim/FeladatFilm";
import { arany, lerp, rugo } from "@/components/anim/Idovonal";
import { Hegy, NyilA, VonalA, FeliratA, PontA } from "@/components/anim/FilmElemek";
import { vetit } from "@/components/abrak/Ter3D";

/* KF‑4: az A(2;3;−1), B(4;5;2), C(2;5;5) pontokon átmenő sík egyenlete.
   A kamera lassan körbefordul, közben felépül a két oldalvektor, a normálvektor és maga a sík. */

const NAR = "#e2590a";
const KEK = "#2563eb";
const LILA = "#7c3aed";
const TEAL = "#0f766e";
const SZURKE = "#64748b";

const A = [2, 3, -1];
const B = [4, 5, 2];
const C = [2, 5, 5];
const AB = [2, 2, 3];
const AC = [0, 2, 6];
const N = [6, -12, 4]; // AB × AC
const NH = Math.sqrt(36 + 144 + 16); // = 14
const NE = N.map((k) => k / NH);

const KOZEP = [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3, (A[2] + B[2] + C[2]) / 3];

const OX = 268;
const OY = 208;
const S = 42;

const FEJEZETEK = [
  {
    t0: 0,
    cim: "Három pont a térben",
    szoveg:
      "Három, nem egy egyenesre eső pont pontosan egy síkot határoz meg. A kérdés csak az: hogyan jutunk el a pontoktól az egyenletig?",
    kepletek: ["A(2;\\,3;\\,-1),\\quad B(4;\\,5;\\,2),\\quad C(2;\\,5;\\,5)"],
  },
  {
    t0: 3.6,
    cim: "Két oldalvektor — végpont mínusz kezdőpont",
    szoveg:
      "Az A csúcsból indítunk két vektort. Ezek már a síkban fekszenek, tehát bármelyik normálvektorra merőlegesek.",
    kepletek: [
      "\\overrightarrow{AB} = (4-2;\\,5-3;\\,2-(-1)) = (2;\\,2;\\,3)",
      "\\overrightarrow{AC} = (0;\\,2;\\,6)",
    ],
  },
  {
    t0: 7.8,
    cim: "A normálvektor: vektoriális szorzat",
    szoveg:
      "Olyan vektor kell, amely mindkettőre merőleges — pontosan ezt gyártja a vektoriális szorzat. Az első sor szerint kifejtve, a középső tagot kivonva.",
    kepletek: [
      "\\mathbf{n} = \\overrightarrow{AB}\\times\\overrightarrow{AC} = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ 2 & 2 & 3 \\\\ 0 & 2 & 6 \\end{vmatrix} = (6;\\,-12;\\,4)",
    ],
  },
  {
    t0: 12.4,
    cim: "A sík kifeszül",
    szoveg:
      "A sík azokból a P pontokból áll, amelyekre az AP vektor merőleges az n-re. Ez egyetlen skaláris szorzat: n·AP = 0.",
    kepletek: ["6(x-2) - 12(y-3) + 4(z+1) = 0"],
  },
  {
    t0: 16.4,
    cim: "Rendezés és egyszerűsítés",
    szoveg:
      "Kibontva és rendezve megkapjuk az általános alakot. Minden együttható osztható 2-vel — a normálvektor hossza közömbös, csak az iránya számít.",
    kepletek: ["6x - 12y + 4z = -28", "3x - 6y + 2z = -14"],
  },
  {
    t0: 20.2,
    cim: "Ellenőrzés behelyettesítéssel",
    szoveg:
      "Mindhárom pontnak ki kell elégítenie az egyenletet. Ez a legolcsóbb biztosíték: harminc másodperc, és kiderül, ha elszámoltad a determinánst.",
    kepletek: [
      "B:\\ 3\\cdot 4 - 6\\cdot 5 + 2\\cdot 2 = -14\\ \\checkmark",
      "C:\\ 3\\cdot 2 - 6\\cdot 5 + 2\\cdot 5 = -14\\ \\checkmark",
    ],
  },
];

const HOSSZ = 24.5;

function kamera(t) {
  return {
    azimut: -38 + 34 * arany(t, 1.5, HOSSZ - 1.5),
    emelkedes: 24 - 6 * Math.sin((arany(t, 0, HOSSZ) * Math.PI * 2) / 1),
  };
}

function Rajz(t) {
  const nezet = kamera(t);
  const P = (p) => {
    const q = vetit([p[0] - KOZEP[0], p[1] - KOZEP[1], p[2] - KOZEP[2]], nezet);
    return { x: OX + q.X * S, y: OY - q.Y * S };
  };
  const pontU = [arany(t, 0.4, 1.2, rugo), arany(t, 1.0, 1.8, rugo), arany(t, 1.6, 2.4, rugo)];
  const abU = arany(t, 4.0, 5.2);
  const acU = arany(t, 5.2, 6.4);
  const nU = arany(t, 8.4, 9.8, rugo);
  const sikU = arany(t, 12.8, 14.4);
  const egyenletU = arany(t, 16.8, 17.6);
  const ellU = arany(t, 20.6, 21.6);

  const a = P(A);
  const b = P(B);
  const c = P(C);
  const nVeg = P([A[0] + 3.2 * NE[0], A[1] + 3.2 * NE[1], A[2] + 3.2 * NE[2]]);

  // a síkdarab: az A-ból kifeszítve, kicsit túlnyúlva
  const u1 = AB.map((k) => k / Math.hypot(...AB));
  const w0 = AC.map((k, i) => k - u1[i] * (AC[0] * u1[0] + AC[1] * u1[1] + AC[2] * u1[2]));
  const u2 = w0.map((k) => k / Math.hypot(...w0));
  const R = 2.8;
  const sarkok = [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ].map(([s1, s2]) =>
    P([
      KOZEP[0] + R * (s1 * u1[0] + s2 * u2[0]),
      KOZEP[1] + R * (s1 * u1[1] + s2 * u2[1]),
      KOZEP[2] + R * (s1 * u1[2] + s2 * u2[2]),
    ]),
  );

  // kis tengelykereszt az origóban
  const O = P([0, 0, 0]);
  const tx = P([2.4, 0, 0]);
  const ty = P([0, 2.4, 0]);
  const tz = P([0, 0, 2.4]);

  return (
    <svg viewBox="0 0 560 420" className="abra w-full select-none">
      <defs>
        <Hegy id="fsh-n" szin={NAR} />
        <Hegy id="fsh-k" szin={KEK} />
        <Hegy id="fsh-l" szin={LILA} />
        <Hegy id="fsh-sz" szin={SZURKE} />
      </defs>

      {/* tengelykereszt */}
      <line x1={O.x} y1={O.y} x2={tx.x} y2={tx.y} stroke={SZURKE} strokeWidth="1" markerEnd="url(#fsh-sz)" opacity="0.6" />
      <line x1={O.x} y1={O.y} x2={ty.x} y2={ty.y} stroke={SZURKE} strokeWidth="1" markerEnd="url(#fsh-sz)" opacity="0.6" />
      <line x1={O.x} y1={O.y} x2={tz.x} y2={tz.y} stroke={SZURKE} strokeWidth="1" markerEnd="url(#fsh-sz)" opacity="0.6" />
      <FeliratA x={tx.x + 6} y={tx.y + 4} meret={11} vastag={false} szin={SZURKE} opacitas={0.8}>
        x
      </FeliratA>
      <FeliratA x={ty.x + 6} y={ty.y + 4} meret={11} vastag={false} szin={SZURKE} opacitas={0.8}>
        y
      </FeliratA>
      <FeliratA x={tz.x + 6} y={tz.y + 2} meret={11} vastag={false} szin={SZURKE} opacitas={0.8}>
        z
      </FeliratA>

      {/* a sík */}
      {sikU > 0.01 && (
        <polygon
          points={sarkok.map((s) => `${s.x.toFixed(1)},${s.y.toFixed(1)}`).join(" ")}
          fill={TEAL}
          fillOpacity={0.16 * sikU}
          stroke={TEAL}
          strokeWidth="1.4"
          strokeOpacity={0.8 * sikU}
        />
      )}

      {/* háromszög */}
      <VonalA x1={a.x} y1={a.y} x2={b.x} y2={b.y} u={abU} szin={SZURKE} vastag={1} />
      <VonalA x1={a.x} y1={a.y} x2={c.x} y2={c.y} u={acU} szin={SZURKE} vastag={1} />
      <VonalA x1={b.x} y1={b.y} x2={c.x} y2={c.y} u={arany(t, 6.2, 7.0)} szin={SZURKE} vastag={1} />

      {/* oldalvektorok */}
      <NyilA x1={a.x} y1={a.y} x2={b.x} y2={b.y} u={abU} szin={NAR} hegy="fsh-n" vastag={3} />
      <NyilA x1={a.x} y1={a.y} x2={c.x} y2={c.y} u={acU} szin={KEK} hegy="fsh-k" vastag={3} />
      <FeliratA x={lerp(a.x, b.x, 0.5) + 12} y={lerp(a.y, b.y, 0.5) + 18} szin={NAR} meret={12} opacitas={abU} horgony="start">
        AB = (2; 2; 3)
      </FeliratA>
      <FeliratA x={lerp(a.x, c.x, 0.5) - 12} y={lerp(a.y, c.y, 0.5)} szin={KEK} meret={12} opacitas={acU} horgony="end">
        AC = (0; 2; 6)
      </FeliratA>

      {/* normálvektor */}
      <NyilA x1={a.x} y1={a.y} x2={nVeg.x} y2={nVeg.y} u={nU} szin={LILA} hegy="fsh-l" vastag={3.4} />
      <FeliratA x={nVeg.x} y={nVeg.y - 14} szin={LILA} meret={12.5} opacitas={nU}>
        n = (6; −12; 4)
      </FeliratA>

      {/* pontok */}
      <PontA x={a.x} y={a.y} r={6} szin={NAR} u={pontU[0]} />
      <PontA x={b.x} y={b.y} r={5.5} szin={SZURKE} u={pontU[1]} />
      <PontA x={c.x} y={c.y} r={5.5} szin={SZURKE} u={pontU[2]} />
      <FeliratA x={a.x - 12} y={a.y + 18} szin={NAR} opacitas={pontU[0]} horgony="end">
        A(2; 3; −1)
      </FeliratA>
      <FeliratA x={b.x + 12} y={b.y + 6} szin="#1d3c48" opacitas={pontU[1]} horgony="start">
        B(4; 5; 2)
      </FeliratA>
      <FeliratA x={c.x + 12} y={c.y - 10} szin="#1d3c48" opacitas={pontU[2]} horgony="start">
        C(2; 5; 5)
      </FeliratA>

      {/* feliratok */}
      <FeliratA x={22} y={34} szin={TEAL} meret={14} opacitas={egyenletU} horgony="start">
        3x − 6y + 2z = −14
      </FeliratA>
      <FeliratA x={22} y={56} szin={SZURKE} meret={11.5} vastag={false} opacitas={egyenletU} horgony="start">
        az együtthatók a normálvektor koordinátái
      </FeliratA>
      <FeliratA x={22} y={394} szin="#15803d" meret={12} opacitas={ellU} horgony="start">
        B és C is kielégíti: −14 = −14 ✓
      </FeliratA>
    </svg>
  );
}

export default function FilmSikHarompont() {
  return (
    <FeladatFilm
      cim="Sík három pontból — KF‑4 lépésről lépésre"
      hossz={HOSSZ}
      fejezetek={FEJEZETEK}
      rajz={Rajz}
      megjegyzes="A kamera közben lassan körbefordul, hogy lásd: a lila normálvektor tényleg merőlegesen áll ki a síkból."
    />
  );
}
