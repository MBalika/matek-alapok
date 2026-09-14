"use client";

import FeladatFilm from "@/components/anim/FeladatFilm";
import { arany, lerp } from "@/components/anim/Idovonal";
import { FeliratA, PontA, VonalA } from "@/components/anim/FilmElemek";

/* KF‑5: a₁ = 1, aₙ₊₁ = √(2 + aₙ) → 2. Pókháló-ábra lépésről lépésre. */

const SZ = 560;
const MA = 400;
const BAL = 54;
const JOBB = 24;
const FENT = 24;
const LENT = 40;
const X_MAX = 2.9;

const NAR = "#e2590a";
const TEAL = "#0f766e";
const LILA = "#7c3aed";
const SZURKE = "#94a3b8";
const SOTET = "#1d3c48";

const f = (x) => Math.sqrt(2 + x);
const TAGOK = (() => {
  const t = [1];
  for (let k = 0; k < 8; k++) t.push(f(t[t.length - 1]));
  return t;
})();

const px = (x) => BAL + (x / X_MAX) * (SZ - BAL - JOBB);
const py = (y) => MA - LENT - (y / X_MAX) * (MA - FENT - LENT);

const T_GORBE = 1.0;
const T_EGYENES = 3.2;
const T_LEPES = 6.2;
const DT = 1.35;
const tLepes = (k) => T_LEPES + k * DT;
const T_FIX = tLepes(5) + 1.2;
const T_EGYENLET = T_FIX + 3.4;
const HOSSZ = T_EGYENLET + 4.2;

const FEJEZETEK = [
  {
    t0: 0,
    cim: "A rekurzió mint függvény",
    szoveg:
      "a₁ = 1, és minden további tagot ugyanaz a szabály állít elő: aₙ₊₁ = f(aₙ), ahol f(x) = √(2+x). A rekurzióhoz tehát egyetlen görbe tartozik.",
    kepletek: ["a_1 = 1,\\qquad a_{n+1} = \\sqrt{2 + a_n}"],
  },
  {
    t0: T_EGYENES,
    cim: "A y = x egyenes szerepe",
    szoveg:
      "A lépés két mozdulat: függőlegesen a görbéig (ez f alkalmazása), majd vízszintesen az y = x egyenesig (az eredményt visszavisszük az x tengelyre, hogy ő legyen a következő bemenet).",
    kepletek: ["y = x \\quad \\text{— a „vidd vissza” egyenes}"],
  },
  {
    t0: T_LEPES,
    cim: "A lépcső indul: a₂ = √3",
    szoveg:
      "a₁ = 1-ből √(2+1) = √3 ≈ 1,732 lesz. A pont feljebb került: a sorozat nő. A következő lépés ugyanez a két mozdulat, csak már 1,732-ből.",
    kepletek: ["a_2 = \\sqrt{3} \\approx 1{,}732,\\qquad a_3 = \\sqrt{3{,}732} \\approx 1{,}932"],
  },
  {
    t0: tLepes(3),
    cim: "Monoton nő és 2 alatt marad",
    szoveg:
      "A lépcső minden foka kisebb az előzőnél, és a lépcső soha nem lépi át a (2;2) pontot. Ez a két dolog — monotonitás és korlátosság — indukcióval igazolható.",
    kepletek: ["a_n < 2 \\ \\Rightarrow\\ a_{n+1} = \\sqrt{2+a_n} < \\sqrt{4} = 2"],
  },
  {
    t0: T_FIX,
    cim: "A metszéspont a fixpont",
    szoveg:
      "A lépcső oda fut, ahol a görbe metszi az y = x egyenest. Itt a lépés már nem változtat semmit: a bemenet és a kimenet ugyanaz.",
    kepletek: ["a_4 \\approx 1{,}983,\\quad a_5 \\approx 1{,}996,\\quad a_6 \\approx 1{,}999"],
  },
  {
    t0: T_EGYENLET,
    cim: "Csak most jöhet az egyenlet",
    szoveg:
      "Mivel a konvergencia már be van látva, a rekurzió mindkét oldalán vehetünk határértéket. A negatív gyököt kizárjuk, mert minden tag pozitív.",
    kepletek: ["A = \\sqrt{2+A} \\ \\Rightarrow\\ A^2 - A - 2 = 0 \\ \\Rightarrow\\ A = 2 \\ \\text{vagy} \\ A = -1"],
  },
];

function Rajz(t) {
  const gorbeU = arany(t, T_GORBE, T_GORBE + 1.5);
  const egyenesU = arany(t, T_EGYENES, T_EGYENES + 1.2);
  const fixU = arany(t, T_FIX, T_FIX + 1.0);
  const egyenletU = arany(t, T_EGYENLET, T_EGYENLET + 1.2);

  const gorbe = [];
  const vegX = X_MAX * gorbeU;
  for (let i = 0; i <= 120; i++) {
    const x = (i / 120) * vegX;
    gorbe.push(`${px(x).toFixed(1)},${py(f(x)).toFixed(1)}`);
  }

  return (
    <svg viewBox={`0 0 ${SZ} ${MA}`} className="abra w-full select-none">
      {/* rács */}
      {[0.5, 1, 1.5, 2, 2.5].map((v) => (
        <g key={v}>
          <line x1={BAL} y1={py(v)} x2={SZ - JOBB} y2={py(v)} stroke="#e6eef1" strokeWidth="0.9" />
          <line x1={px(v)} y1={MA - LENT} x2={px(v)} y2={FENT - 4} stroke="#e6eef1" strokeWidth="0.9" />
          <text x={BAL - 7} y={py(v) + 4} textAnchor="end" fontSize="10.5" fill={SZURKE}>
            {String(v).replace(".", ",")}
          </text>
          <text x={px(v)} y={MA - LENT + 18} textAnchor="middle" fontSize="10.5" fill={SZURKE}>
            {String(v).replace(".", ",")}
          </text>
        </g>
      ))}

      <line x1={BAL} y1={MA - LENT} x2={SZ - JOBB + 4} y2={MA - LENT} stroke="#475569" strokeWidth="1.2" />
      <line x1={BAL} y1={MA - LENT} x2={BAL} y2={FENT - 8} stroke="#475569" strokeWidth="1.2" />
      <text x={SZ - JOBB + 2} y={MA - LENT + 18} textAnchor="end" fontSize="12" fontStyle="italic" fill={SOTET}>
        x
      </text>
      <text x={BAL - 38} y={FENT + 2} fontSize="12" fontStyle="italic" fill={SOTET}>
        y
      </text>

      {/* y = x */}
      <VonalA x1={px(0)} y1={py(0)} x2={px(X_MAX)} y2={py(X_MAX)} u={egyenesU} szin={SZURKE} vastag={1.5} szaggatott />
      <FeliratA x={px(2.62)} y={py(2.62) - 9} szin="#64748b" meret={11.5} opacitas={egyenesU} horgony="middle">
        y = x
      </FeliratA>

      {/* y = f(x) */}
      {gorbeU > 0.01 && <polyline points={gorbe.join(" ")} fill="none" stroke={TEAL} strokeWidth="2.4" />}
      <FeliratA x={px(0.12)} y={py(f(0.12)) - 12} szin={TEAL} meret={12} opacitas={arany(t, T_GORBE + 0.9, T_GORBE + 1.6)} horgony="start">
        y = √(2 + x)
      </FeliratA>

      {/* a lépcső */}
      {TAGOK.slice(0, 6).map((x, k) => {
        const u1 = arany(t, tLepes(k), tLepes(k) + 0.55);
        const u2 = arany(t, tLepes(k) + 0.55, tLepes(k) + 1.05);
        const y = TAGOK[k + 1];
        const kezdY = k === 0 ? 0 : x;
        return (
          <g key={k}>
            <VonalA x1={px(x)} y1={py(kezdY)} x2={px(x)} y2={py(y)} u={u1} szin={LILA} vastag={2} szaggatott={false} />
            <VonalA x1={px(x)} y1={py(y)} x2={px(y)} y2={py(y)} u={u2} szin={LILA} vastag={2} szaggatott={false} />
            {k <= 2 && (
              <FeliratA
                x={px(x)}
                y={MA - LENT - 9 - k * 15}
                szin={LILA}
                meret={11.5}
                opacitas={arany(t, tLepes(k), tLepes(k) + 0.4)}
                horgony="middle"
              >
                a{["₁", "₂", "₃"][k]}
              </FeliratA>
            )}
            <PontA x={px(x)} y={MA - LENT} r={3.4} szin={LILA} u={arany(t, tLepes(k), tLepes(k) + 0.3)} />
          </g>
        );
      })}

      {/* fixpont */}
      <PontA x={px(2)} y={py(2)} r={7} szin={NAR} u={fixU} />
      <FeliratA x={px(2) + 12} y={py(2) + 5} szin={NAR} meret={12.5} opacitas={fixU} horgony="start">
        fixpont: (2; 2)
      </FeliratA>

      {/* záró egyenlet */}
      <FeliratA x={BAL + 8} y={FENT + 16} szin={SOTET} meret={13} opacitas={egyenletU} horgony="start">
        A = √(2 + A) ⟹ A² − A − 2 = 0 ⟹ A = 2
      </FeliratA>
      <FeliratA x={BAL + 8} y={FENT + 34} szin="#64748b" meret={11.5} opacitas={egyenletU} horgony="start">
        (a másik gyök, −1, kiesik: minden tag pozitív)
      </FeliratA>
    </svg>
  );
}

export default function FilmRekurzio() {
  return (
    <FeladatFilm
      cim="Rekurzió: a₁ = 1, aₙ₊₁ = √(2 + aₙ)"
      hossz={HOSSZ}
      fejezetek={FEJEZETEK}
      rajz={Rajz}
      megjegyzes="A lila lépcső minden foka egy rekurziós lépés. A lépcső magától a metszéspontba fut — de ezt a konvergenciát a monotonitás és a korlátosság garantálja, nem az ábra."
    />
  );
}
