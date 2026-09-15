"use client";

import FeladatFilm from "@/components/anim/FeladatFilm";
import { arany, lerp, simit, beKi } from "@/components/anim/Idovonal";
import { FeliratA, PontA } from "@/components/anim/FilmElemek";

const TEAL = "#0f766e";
const NAR = "#e2590a";
const LILA = "#7c3aed";
const PIROS = "#dc2626";
const SOTET = "#1d3c48";
const SZURKE = "#94a3b8";

const SZ = 560;
const MA = 350;

const V = (x) => x * (1 - 2 * x) * (1 - 2 * x);
const XOPT = 1 / 6;
const VOPT = 2 / 27;

const FEJEZETEK = [
  {
    t0: 0,
    cim: "1. A lemez",
    szoveg: "Adott egy 1 m × 1 m-es négyzet alakú lemez. Ebből készítünk felül nyitott dobozt.",
    kepletek: [],
  },
  {
    t0: 3.2,
    cim: "2. A sarkok kivágása",
    szoveg:
      "A négy sarokból egyforma, x oldalú négyzeteket vágunk ki. Az x az egyetlen szabadon választható mennyiség — ez lesz a változó.",
    kepletek: ["0 < x < \\tfrac12"],
  },
  {
    t0: 7.0,
    cim: "3. Felhajtás",
    szoveg:
      "A széleket felhajtva a doboz alapéle 1 − 2x, magassága x. Minden méret egyetlen betűvel kifejezve — ez a szöveges feladatok kulcslépése.",
    kepletek: ["a = 1-2x,\\qquad m = x"],
  },
  {
    t0: 11.0,
    cim: "4. A célfüggvény",
    szoveg: "A térfogat V(x) = x(1 − 2x)². Egyváltozós függvény lett belőle, tehát deriválhatunk.",
    kepletek: ["V(x) = x\\left(1-2x\\right)^2"],
  },
  {
    t0: 14.5,
    cim: "5. A V(x) görbe",
    szoveg:
      "Ahogy x nő, a térfogat előbb nő, majd egy maximum után csökken, és x = 1/2-nél nullára esik: ott már nem marad alaplap.",
    kepletek: [],
  },
  {
    t0: 18.5,
    cim: "6. A derivált zérushelyei",
    szoveg:
      "V ′(x) = (1 − 2x)(1 − 6x). Két gyök: x = 1/2 a tartomány széle (ott V = 0), x = 1/6 pedig belső pont — ott vált a derivált pozitívról negatívra.",
    kepletek: ["V'(x) = (1-2x)(1-6x)"],
  },
  {
    t0: 22.5,
    cim: "7. A maximum",
    szoveg:
      "Az x = 1/6 ≈ 16,7 cm-es kivágás adja a legnagyobb térfogatot: V = 2/27 ≈ 0,0741 m³, vagyis körülbelül 74 liter.",
    kepletek: ["V\\left(\\tfrac16\\right) = \\tfrac16\\cdot\\left(\\tfrac23\\right)^2 = \\tfrac{2}{27}"],
  },
];

function rajz(t) {
  /* --- animált x --- */
  let x = 0;
  if (t < 3.4) x = 0;
  else if (t < 7.0) x = lerp(0, 0.25, arany(t, 3.6, 6.6, simit));
  else if (t < 14.5) x = 0.25;
  else if (t < 18.5) x = lerp(0.25, 0.45, arany(t, 14.8, 17.6, simit));
  else if (t < 22.5) x = lerp(0.45, 0.05, arany(t, 18.8, 21.6, simit));
  else x = lerp(0.05, XOPT, arany(t, 22.8, 24.4, beKi));

  /* --- felhajtás aránya --- */
  const hajt = arany(t, 7.2, 10.4, beKi);
  const a = 1 - 2 * x;

  /* ---- bal oldal: a lemez / doboz ---- */
  const bx = 34;
  const by = 42;
  const BL = 132;
  const c = BL * x;

  const kereszt = [
    [bx + c, by],
    [bx + BL - c, by],
    [bx + BL - c, by + c],
    [bx + BL, by + c],
    [bx + BL, by + BL - c],
    [bx + BL - c, by + BL - c],
    [bx + BL - c, by + BL],
    [bx + c, by + BL],
    [bx + c, by + BL - c],
    [bx, by + BL - c],
    [bx, by + c],
    [bx + c, by + c],
  ]
    .map((p) => p.join(","))
    .join(" ");

  /* axonometrikus doboz (a felhajtás után) */
  const ox = 30;
  const oy = 322;
  const L = 104;
  const P = (X, Y, Z) => [ox + (X + Y * 0.45) * L, oy - (Z + Y * 0.26) * L];
  const h = x * hajt;
  const alap = [P(0, 0, 0), P(a, 0, 0), P(a, a, 0), P(0, a, 0)];
  const felso = [P(0, 0, h), P(a, 0, h), P(a, a, h), P(0, a, h)];
  const sokszog = (pts) => pts.map((p) => p.join(",")).join(" ");

  /* ---- jobb oldal: a V(x) görbe ---- */
  const gx0 = 320;
  const gx1 = 518;
  const gy0 = 70;
  const gy1 = 280;
  const px = (v) => gx0 + (v / 0.5) * (gx1 - gx0);
  const py = (v) => gy1 - (v / 0.085) * (gy1 - gy0);

  const uGorbe = arany(t, 14.8, 17.8, simit);
  const uDer = arany(t, 19.0, 21.2);
  const uMax = arany(t, 23.0, 24.6);

  let d = "";
  for (let i = 0; i <= 160; i++) {
    const v = (0.5 * i) / 160;
    if (v > 0.5 * uGorbe) break;
    d += `${i ? "L" : "M"}${px(v).toFixed(1)},${py(V(v)).toFixed(1)} `;
  }

  return (
    <svg viewBox={`0 0 ${SZ} ${MA}`} className="abra w-full select-none">
      {/* ================= bal: lemez ================= */}
      <FeliratA x={bx + BL / 2} y={28} szin={SOTET} meret={12.5}>
        1 m × 1 m lemez
      </FeliratA>
      <rect x={bx} y={by} width={BL} height={BL} fill="none" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
      <polygon points={kereszt} fill="#ccfbf1" stroke={TEAL} strokeWidth="2" />
      {c > 0.8 &&
        [
          [bx, by],
          [bx + BL - c, by],
          [bx, by + BL - c],
          [bx + BL - c, by + BL - c],
        ].map((p, i) => (
          <rect
            key={i}
            x={p[0]}
            y={p[1]}
            width={c}
            height={c}
            fill="#fee2e2"
            stroke={PIROS}
            strokeWidth="1.3"
            strokeDasharray="4 3"
          />
        ))}
      {c > 0.8 && (
        <>
          <rect
            x={bx + c}
            y={by + c}
            width={BL - 2 * c}
            height={BL - 2 * c}
            fill="none"
            stroke={NAR}
            strokeWidth="1.4"
            strokeDasharray="5 3"
          />
          <line x1={bx} y1={by + BL + 11} x2={bx + c} y2={by + BL + 11} stroke={PIROS} strokeWidth="2" />
          <FeliratA x={bx + c / 2} y={by + BL + 25} szin={PIROS} meret={11.5}>
            x
          </FeliratA>
          <line x1={bx + c} y1={by + BL + 11} x2={bx + BL - c} y2={by + BL + 11} stroke={TEAL} strokeWidth="2" />
          <FeliratA x={bx + BL / 2} y={by + BL + 25} szin={TEAL} meret={11.5}>
            1 − 2x
          </FeliratA>
        </>
      )}

      {/* ================= bal alul: a doboz ================= */}
      {hajt > 0.02 && (
        <>
          <polygon points={sokszog(alap)} fill="#99f6e4" stroke={TEAL} strokeWidth="1.6" opacity="0.9" />
          <polygon
            points={sokszog([alap[3], alap[2], felso[2], felso[3]])}
            fill="#5eead4"
            stroke={TEAL}
            strokeWidth="1.2"
            opacity="0.45"
          />
          <polygon
            points={sokszog([alap[0], alap[3], felso[3], felso[0]])}
            fill="#5eead4"
            stroke={TEAL}
            strokeWidth="1.2"
            opacity="0.45"
          />
          <polygon
            points={sokszog([alap[0], alap[1], felso[1], felso[0]])}
            fill="#2dd4bf"
            stroke={TEAL}
            strokeWidth="1.8"
            opacity="0.7"
          />
          <polygon
            points={sokszog([alap[1], alap[2], felso[2], felso[1]])}
            fill="#14b8a6"
            stroke={TEAL}
            strokeWidth="1.8"
            opacity="0.6"
          />
          <polygon points={sokszog(felso)} fill="none" stroke={NAR} strokeWidth="2.2" />
          <line
            x1={felso[1][0] + 9}
            y1={felso[1][1]}
            x2={alap[1][0] + 9}
            y2={alap[1][1]}
            stroke={PIROS}
            strokeWidth="2"
          />
          <FeliratA x={felso[1][0] + 22} y={(felso[1][1] + alap[1][1]) / 2 + 4} szin={PIROS} meret={11.5}>
            x
          </FeliratA>
          <FeliratA x={(alap[0][0] + alap[1][0]) / 2} y={alap[0][1] + 17} szin={TEAL} meret={11.5}>
            1 − 2x
          </FeliratA>
        </>
      )}

      {/* ================= jobb: a V(x) görbe ================= */}
      {uGorbe > 0.01 && (
        <>
          {/* tengelyek */}
          <line x1={gx0} y1={gy1} x2={gx1 + 6} y2={gy1} stroke="#475569" strokeWidth="1.2" />
          <line x1={gx0} y1={gy1} x2={gx0} y2={gy0 - 6} stroke="#475569" strokeWidth="1.2" />
          <FeliratA x={gx1 + 10} y={gy1 + 4} szin="#475569" meret={11} vastag={false} horgony="start">
            x (m)
          </FeliratA>
          <FeliratA x={gx0 - 4} y={gy0 - 10} szin="#475569" meret={11} vastag={false} horgony="end">
            V (m³)
          </FeliratA>
          {[0.1, 0.2, 0.3, 0.4, 0.5].map((v) => (
            <text key={v} x={px(v)} y={gy1 + 14} textAnchor="middle" fontSize="10" fill="#64748b">
              {String(v).replace(".", ",")}
            </text>
          ))}
          <path d={d} fill="none" stroke={TEAL} strokeWidth="2.6" strokeLinecap="round" />
        </>
      )}

      {/* a pillanatnyi pont */}
      {uGorbe > 0.3 && x > 0 && x < 0.5 && (
        <>
          <line
            x1={px(x)}
            y1={py(V(x))}
            x2={px(x)}
            y2={gy1}
            stroke={SZURKE}
            strokeWidth="1.1"
            strokeDasharray="4 3"
          />
          <PontA x={px(x)} y={py(V(x))} r={5.5} szin={NAR} u={1} />
          {/* a végén a maximum felirata veszi át a helyét, hogy ne fedjék egymást */}
          {uMax < 0.3 && (
            <FeliratA x={px(x)} y={py(V(x)) - 12} szin={NAR} meret={11.5}>
              V = {V(x).toFixed(4).replace(".", ",")}
            </FeliratA>
          )}
        </>
      )}

      {/* a derivált zérushelyei */}
      {uDer > 0.01 && (
        <>
          <line
            x1={px(XOPT)}
            y1={gy1}
            x2={px(XOPT)}
            y2={py(VOPT)}
            stroke={LILA}
            strokeWidth="1.6"
            strokeDasharray="5 3"
            opacity={uDer}
          />
          <FeliratA x={px(XOPT)} y={gy1 + 30} szin={LILA} meret={11.5} opacitas={uDer}>
            x = 1/6
          </FeliratA>
          <FeliratA x={px(0.5)} y={gy1 + 30} szin={SZURKE} meret={11.5} opacitas={uDer} horgony="end">
            x = 1/2
          </FeliratA>
        </>
      )}

      {/* a maximum */}
      {uMax > 0.01 && (
        <>
          <line
            x1={gx0}
            y1={py(VOPT)}
            x2={px(XOPT)}
            y2={py(VOPT)}
            stroke={LILA}
            strokeWidth="1.6"
            strokeDasharray="5 3"
            opacity={uMax}
          />
          <FeliratA x={gx0 + 8} y={py(VOPT) - 15} szin={LILA} meret={12} horgony="start" opacitas={uMax}>
            V = 2/27 ≈ 0,0741 m³
          </FeliratA>
          <FeliratA x={(gx0 + gx1) / 2} y={MA - 12} szin={SOTET} meret={12.5} opacitas={uMax}>
            ≈ 74 liter · a kivágás oldala 16,7 cm
          </FeliratA>
        </>
      )}
    </svg>
  );
}

export default function FilmDoboz() {
  return (
    <FeladatFilm
      cim="A dobozfeladat: mekkora kivágás adja a legnagyobb térfogatot?"
      hossz={27}
      fejezetek={FEJEZETEK}
      rajz={rajz}
      megjegyzes="Bal oldalt a lemez és a doboz, jobb oldalt a V(x) görbe épül."
    />
  );
}
