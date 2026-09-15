"use client";

import FeladatFilm from "@/components/anim/FeladatFilm";
import { arany, lerp, simit } from "@/components/anim/Idovonal";
import { FeliratA, PontA } from "@/components/anim/FilmElemek";

const TEAL = "#0f766e";
const NAR = "#e2590a";
const LILA = "#7c3aed";
const ZOLD = "#15803d";
const SOTET = "#1d3c48";
const SZURKE = "#94a3b8";

const SZ = 560;
const MA = 380;

/* ---------- a jobb oldali grafikon skálája ---------- */
const GX0 = 300;
const GX1 = 552;
const GY0 = 152;
const GY1 = 340;
const XMIN = -6;
const XMAX = 5;
const YMIN = -4;
const YMAX = 4;
const px = (x) => GX0 + ((x - XMIN) / (XMAX - XMIN)) * (GX1 - GX0);
const py = (y) => GY1 - ((y - YMIN) / (YMAX - YMIN)) * (GY1 - GY0);

/** Görbe útvonala, pólusnál és kilógásnál megszakítva. */
function ut(fn, tolArany = 1) {
  let d = "";
  let elso = true;
  const db = 300;
  const hatar = XMIN + (XMAX - XMIN) * tolArany;
  for (let i = 0; i <= db; i++) {
    const x = XMIN + ((XMAX - XMIN) * i) / db;
    if (x > hatar) break;
    const y = fn(x);
    if (!Number.isFinite(y) || y < YMIN || y > YMAX) {
      elso = true;
      continue;
    }
    d += `${elso ? "M" : "L"}${px(x).toFixed(1)},${py(y).toFixed(1)} `;
    elso = false;
  }
  return d;
}

const eredeti = (x) => (3 * x + 2) / ((x - 2) * (x + 3));
const elso = (x) => 1.6 / (x - 2);
const masodik = (x) => 1.4 / (x + 3);

/* ---------- a bal oldali számegyenes ---------- */
const NX0 = 22;
const NX1 = 282;
const NY = 132;
const nx = (x) => NX0 + ((x - (-5)) / 10) * (NX1 - NX0);

const FEJEZETEK = [
  {
    t0: 0,
    cim: "1. A feladat",
    szoveg:
      "Két polinom hányadosa. A számláló foka kisebb, mint a nevezőé, tehát valódi tört — nem kell polinomosztás, jöhet rögtön a bontás.",
    kepletek: ["\\int \\frac{3x+2}{x^2+x-6}\\,dx"],
  },
  {
    t0: 3.4,
    cim: "2. A nevező gyökei",
    szoveg:
      "Megoldjuk az x² + x − 6 = 0 egyenletet. A két gyök 2 és −3 — ezeket jelöltük meg a számegyenesen.",
    kepletek: ["x_{1,2} = \\frac{-1\\pm\\sqrt{1+24}}{2} = \\frac{-1\\pm5}{2}"],
  },
  {
    t0: 7.2,
    cim: "3. Szorzattá bontás",
    szoveg:
      "A nevező két gyöktényezőre bomlik. A grafikonon a két függőleges aszimptota pontosan ott áll, ahol a gyökök.",
    kepletek: ["x^2+x-6 = (x-2)(x+3)"],
  },
  {
    t0: 11.0,
    cim: "4. A bontás alakja",
    szoveg:
      "Két egyszeres valós gyök, tehát két tag: mindegyik nevezője egy-egy gyöktényező, a számlálók pedig ismeretlen konstansok.",
    kepletek: ["\\frac{3x+2}{(x-2)(x+3)} = \\frac{A}{x-2}+\\frac{B}{x+3}"],
  },
  {
    t0: 15.0,
    cim: "5. A letakarásos módszer",
    szoveg:
      "Beszorzunk a nevezővel, majd behelyettesítjük a gyököket: mindkétszer az egyik tag eltűnik, és a másik együttható azonnal kiadódik.",
    kepletek: ["3x+2 = A(x+3)+B(x-2)", "x=2:\\ 8=5A \\Rightarrow A=\\tfrac85", "x=-3:\\ -7=-5B \\Rightarrow B=\\tfrac75"],
  },
  {
    t0: 20.0,
    cim: "6. A két elemi tört összege",
    szoveg:
      "A szaggatott görbék az 1,6/(x−2) és az 1,4/(x+3) tagok. Összegük pontosan az eredeti tört — ez a bontás ellenőrzése.",
    kepletek: ["\\frac{1{,}6}{x-2}+\\frac{1{,}4}{x+3}"],
  },
  {
    t0: 24.0,
    cim: "7. Az integrálás",
    szoveg:
      "Mindkét tag 1/(x−α) alakú, tehát logaritmus lesz belőle. Az abszolút érték kell, mert a gyökök körül a nevező előjelet vált.",
    kepletek: ["\\frac85\\ln\\left|x-2\\right|+\\frac75\\ln\\left|x+3\\right|+C"],
  },
];

function rajz(t) {
  const uFel = arany(t, 0.3, 1.6, simit);
  const uEgyenlet = arany(t, 3.7, 5.0, simit);
  const uGyokok = arany(t, 5.2, 6.6, simit);
  const uSzorzat = arany(t, 7.5, 8.8, simit);
  const uGorbe = arany(t, 8.6, 10.6, simit);
  const uAnsatz = arany(t, 11.3, 12.6, simit);
  const uBeszoroz = arany(t, 15.3, 16.4, simit);
  const uA = arany(t, 16.8, 17.8, simit);
  const uB = arany(t, 18.2, 19.2, simit);
  const uTagok = arany(t, 20.3, 22.4, simit);
  const uEred = arany(t, 24.3, 25.6, simit);

  return (
    <svg viewBox={`0 0 ${SZ} ${MA}`} className="abra w-full select-none">
      {/* ================= bal oldal: a levezetés ================= */}

      {/* 1. a feladat mint tört */}
      {uFel > 0.01 && (
        <g opacity={uFel}>
          <FeliratA x={26} y={46} szin={SOTET} meret={20} horgony="start">
            ∫
          </FeliratA>
          <FeliratA x={112} y={38} szin={SOTET} meret={15}>
            3x + 2
          </FeliratA>
          <line x1={58} y1={46} x2={166} y2={46} stroke={SOTET} strokeWidth="1.6" />
          <FeliratA x={112} y={64} szin={SOTET} meret={15}>
            x² + x − 6
          </FeliratA>
          <FeliratA x={178} y={54} szin={SOTET} meret={15} horgony="start">
            dx
          </FeliratA>
        </g>
      )}

      {/* 2. a másodfokú egyenlet */}
      <FeliratA x={22} y={94} szin={SZURKE} meret={13.5} horgony="start" opacitas={uEgyenlet}>
        x² + x − 6 = 0 → x = (−1 ± 5)/2
      </FeliratA>

      {/* számegyenes a gyökökkel */}
      {uGyokok > 0.01 && (
        <g opacity={uGyokok}>
          <line x1={NX0} y1={NY} x2={NX1} y2={NY} stroke="#64748b" strokeWidth="1.2" />
          {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((v) => (
            <g key={v}>
              <line x1={nx(v)} y1={NY - 4} x2={nx(v)} y2={NY + 4} stroke="#94a3b8" strokeWidth="1" />
              <text x={nx(v)} y={NY + 17} textAnchor="middle" fontSize="9.5" fill="#94a3b8">
                {v}
              </text>
            </g>
          ))}
          <PontA x={nx(2)} y={NY} r={6} szin={NAR} u={arany(t, 5.6, 6.2)} />
          <PontA x={nx(-3)} y={NY} r={6} szin={LILA} u={arany(t, 6.0, 6.6)} />
          <FeliratA x={nx(2)} y={NY - 12} szin={NAR} meret={12}>
            x₁ = 2
          </FeliratA>
          <FeliratA x={nx(-3)} y={NY - 12} szin={LILA} meret={12}>
            x₂ = −3
          </FeliratA>
        </g>
      )}

      {/* 3. szorzattá bontás */}
      <FeliratA x={22} y={176} szin={SOTET} meret={14} horgony="start" opacitas={uSzorzat}>
        x² + x − 6 = (x − 2)(x + 3)
      </FeliratA>

      {/* 4. a bontás alakja */}
      {uAnsatz > 0.01 && (
        <g opacity={uAnsatz}>
          <FeliratA x={62} y={206} szin={SOTET} meret={14}>
            3x + 2
          </FeliratA>
          <line x1={22} y1={214} x2={104} y2={214} stroke={SOTET} strokeWidth="1.4" />
          <FeliratA x={62} y={230} szin={SOTET} meret={13}>
            (x−2)(x+3)
          </FeliratA>
          <FeliratA x={116} y={218} szin={SOTET} meret={15}>
            =
          </FeliratA>
          <FeliratA x={158} y={206} szin={NAR} meret={14}>
            A
          </FeliratA>
          <line x1={134} y1={214} x2={182} y2={214} stroke={NAR} strokeWidth="1.4" />
          <FeliratA x={158} y={230} szin={NAR} meret={13}>
            x − 2
          </FeliratA>
          <FeliratA x={196} y={218} szin={SOTET} meret={15}>
            +
          </FeliratA>
          <FeliratA x={242} y={206} szin={LILA} meret={14}>
            B
          </FeliratA>
          <line x1={216} y1={214} x2={268} y2={214} stroke={LILA} strokeWidth="1.4" />
          <FeliratA x={242} y={230} szin={LILA} meret={13}>
            x + 3
          </FeliratA>
        </g>
      )}

      {/* 5. letakarásos módszer */}
      <FeliratA x={22} y={266} szin={SOTET} meret={13} horgony="start" opacitas={uBeszoroz}>
        3x + 2 = A(x + 3) + B(x − 2)
      </FeliratA>
      <FeliratA x={22} y={292} szin={NAR} meret={13.5} horgony="start" opacitas={uA}>
        x = 2: 8 = 5A → A = 8/5 = 1,6
      </FeliratA>
      <FeliratA x={22} y={314} szin={LILA} meret={13.5} horgony="start" opacitas={uB}>
        x = −3: −7 = −5B → B = 7/5 = 1,4
      </FeliratA>

      {/* 7. az eredmény */}
      {uEred > 0.01 && (
        <g opacity={uEred}>
          <rect x={14} y={336} width={272} height={32} rx="8" fill="#ecfdf5" stroke={ZOLD} strokeWidth="1.8" />
          <FeliratA x={150} y={357} szin={ZOLD} meret={12.5}>
            1,6·ln|x−2| + 1,4·ln|x+3| + C
          </FeliratA>
        </g>
      )}

      {/* ================= jobb oldal: a grafikon ================= */}
      {uGorbe > 0.01 && (
        <g opacity={uGorbe}>
          {/* tengelyek */}
          <line x1={GX0} y1={py(0)} x2={GX1} y2={py(0)} stroke="#64748b" strokeWidth="1.1" />
          <line x1={px(0)} y1={GY0} x2={px(0)} y2={GY1} stroke="#64748b" strokeWidth="1.1" />
          <FeliratA x={GX1 - 6} y={py(0) - 8} szin="#94a3b8" meret={10.5} horgony="end" vastag={false}>
            x
          </FeliratA>

          {/* aszimptoták */}
          <line x1={px(2)} y1={GY0} x2={px(2)} y2={GY1} stroke={NAR} strokeWidth="1.1" strokeDasharray="4 3" opacity="0.7" />
          <line x1={px(-3)} y1={GY0} x2={px(-3)} y2={GY1} stroke={LILA} strokeWidth="1.1" strokeDasharray="4 3" opacity="0.7" />

          {/* az eredeti tört */}
          <path d={ut(eredeti, lerp(0, 1, arany(t, 8.8, 10.6, simit)))} fill="none" stroke={TEAL} strokeWidth="2.8" />
          <FeliratA x={GX0 + 4} y={GY0 + 12} szin={TEAL} meret={11} horgony="start">
            az eredeti tört
          </FeliratA>
        </g>
      )}

      {/* 6. a két elemi tört */}
      {uTagok > 0.01 && (
        <g opacity={uTagok}>
          <path d={ut(elso)} fill="none" stroke={NAR} strokeWidth="1.8" strokeDasharray="6 4" />
          <path d={ut(masodik)} fill="none" stroke={LILA} strokeWidth="1.8" strokeDasharray="6 4" />
          <FeliratA x={GX0 + 4} y={GY0 + 29} szin={NAR} meret={11} horgony="start">
            1,6/(x−2)
          </FeliratA>
          <FeliratA x={GX0 + 4} y={GY0 + 45} szin={LILA} meret={11} horgony="start">
            1,4/(x+3)
          </FeliratA>
          <FeliratA x={(GX0 + GX1) / 2} y={GY1 + 22} szin={SOTET} meret={10.5}>
            a két szaggatott összege az eredeti
          </FeliratA>
        </g>
      )}
    </svg>
  );
}

export default function FilmParcialisTortek() {
  return (
    <FeladatFilm
      cim="Parciális törtek: ∫ (3x+2)/(x²+x−6) dx"
      hossz={28}
      fejezetek={FEJEZETEK}
      rajz={rajz}
      megjegyzes="Balra a levezetés, jobbra a görbék: a két elemi tört összege az eredeti."
    />
  );
}
