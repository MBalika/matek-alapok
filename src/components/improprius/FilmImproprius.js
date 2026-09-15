"use client";

import FeladatFilm from "@/components/anim/FeladatFilm";
import { arany, lerp, simit, beKi } from "@/components/anim/Idovonal";
import { FeliratA } from "@/components/anim/FilmElemek";

const TEAL = "#0f766e";
const NAR = "#e2590a";
const PIROS = "#dc2626";
const SOTET = "#1d3c48";
const SZURKE = "#94a3b8";
const ZOLD = "#047857";

const SZ = 560;
const MA = 350;

/* a grafikon doboza */
const GX0 = 46;
const GX1 = 428;
const GY0 = 66;
const GY1 = 282;

/* a jobb oldali mérőszalag */
const MX = 474;
const MSZEL = 40;

const FEJEZETEK = [
  {
    t0: 0,
    cim: "1. A feladat",
    szoveg:
      "Mennyi az e^(−x) görbe alatti terület nullától a végtelenig? A tartomány nem korlátos, tehát rendes Riemann-integrálról szó sem lehet.",
    kepletek: ["\\int_0^{\\infty} e^{-x}\\,dx = \\;?"],
  },
  {
    t0: 3.6,
    cim: "2. Állj meg d-nél",
    szoveg:
      "Vágjuk el a tartományt egy véges d helyen. Eddig már rendes határozott integrál, amit ki tudunk számolni.",
    kepletek: ["\\int_0^{d} e^{-x}\\,dx = \\left[-e^{-x}\\right]_0^{d} = 1-e^{-d}"],
  },
  {
    t0: 7.4,
    cim: "3. A d elszalad",
    szoveg:
      "Most told a d-t jobbra. A lépték nyúlik, a hozzáadott terület egyre vékonyabb — a mérőszalag alig mozdul tovább.",
    kepletek: ["1-e^{-d} \\;\\longrightarrow\\; 1"],
  },
  {
    t0: 12.6,
    cim: "4. Konvergens, az értéke 1",
    szoveg:
      "A csonkolt integrálok határértéke véges: az improprius integrál konvergens. Az exponenciális lecsengés mindig „elég gyors”.",
    kepletek: ["\\int_0^{\\infty} e^{-x}\\,dx = 1"],
  },
  {
    t0: 16.2,
    cim: "5. És most az 1/x",
    szoveg:
      "Ugyanez a menet egy másik függvénnyel: 1-től d-ig. Ez is nullához tart — ránézésre semmi különbség.",
    kepletek: ["\\int_1^{d}\\frac{dx}{x} = \\ln d"],
  },
  {
    t0: 21,
    cim: "6. A terület nem áll meg",
    szoveg:
      "A mérőszalag itt nem áll be: ln d minden határon túl nő. Divergens. A nullához tartás tehát szükséges, de nem elegendő — a kérdés mindig az, milyen gyorsan.",
    kepletek: ["\\int_1^{\\infty}\\frac{dx}{x^p}:\\ p>1 \\Rightarrow \\text{konv.}"],
  },
];

function rajz(t) {
  const bFazis = t >= 15.6;

  /* --- d és a lépték --- */
  let d;
  if (!bFazis) {
    if (t < 3.8) d = 0;
    else if (t < 7.4) d = lerp(0, 2, arany(t, 3.9, 6.9, simit));
    else if (t < 12.6) d = lerp(2, 26, arany(t, 7.6, 12.2, beKi));
    else d = 26;
  } else {
    if (t < 17) d = 1;
    else if (t < 21) d = lerp(1, 3, arany(t, 16.6, 20.2, simit));
    else d = lerp(3, 26, arany(t, 21.2, 25.4, beKi));
  }

  const xMax = Math.max(4.2, d * 1.18);
  const yMax = 1.18;
  const px = (x) => GX0 + (x / xMax) * (GX1 - GX0);
  const py = (y) => GY1 - (y / yMax) * (GY1 - GY0);

  const fn = bFazis ? (x) => (x >= 1 ? 1 / x : NaN) : (x) => Math.exp(-x);
  const tol = bFazis ? 1 : 0;
  const ertek = bFazis ? (d > 1 ? Math.log(d) : 0) : 1 - Math.exp(-d);

  /* görbe */
  let gorbe = "";
  for (let i = 0; i <= 220; i++) {
    const x = tol + ((xMax - tol) * i) / 220;
    const y = fn(x);
    if (!Number.isFinite(y) || y > yMax) continue;
    gorbe += `${gorbe ? "L" : "M"}${px(x).toFixed(1)},${py(y).toFixed(1)} `;
  }

  /* satírozott terület */
  let terulet = "";
  if (d > tol + 1e-6) {
    terulet = `M${px(tol).toFixed(1)},${py(0).toFixed(1)} `;
    for (let i = 0; i <= 200; i++) {
      const x = tol + ((d - tol) * i) / 200;
      terulet += `L${px(x).toFixed(1)},${py(Math.min(fn(x), yMax)).toFixed(1)} `;
    }
    terulet += `L${px(d).toFixed(1)},${py(0).toFixed(1)} Z`;
  }

  /* mérőszalag */
  const mMax = bFazis ? 3.6 : 1.3;
  const mAlj = GY1;
  const mTeto = GY0;
  const mY = (v) => mAlj - (Math.min(v, mMax) / mMax) * (mAlj - mTeto);
  const cel = bFazis ? null : 1;

  /* osztások az x tengelyen */
  const lepes = xMax <= 5 ? 1 : xMax <= 12 ? 2 : 5;
  const osztasok = [];
  for (let v = 0; v <= xMax; v += lepes) osztasok.push(v);

  return (
    <svg viewBox={`0 0 ${SZ} ${MA}`} className="abra w-full select-none">
      <FeliratA x={(GX0 + GX1) / 2} y={30} szin={SOTET} meret={13}>
        {bFazis ? "y = 1/x,  a terület 1-től d-ig" : "y = e⁻ˣ,  a terület 0-tól d-ig"}
      </FeliratA>

      {/* tengelyek */}
      <line x1={GX0} y1={GY1} x2={GX1 + 14} y2={GY1} stroke="#475569" strokeWidth="1.2" />
      <line x1={GX0} y1={GY1} x2={GX0} y2={GY0 - 10} stroke="#475569" strokeWidth="1.2" />
      <FeliratA x={GX1 + 18} y={GY1 + 4} szin="#64748b" meret={11} vastag={false} horgony="start" dolt>
        x
      </FeliratA>
      {osztasok.map((v) => (
        <g key={v}>
          <line x1={px(v)} y1={GY1} x2={px(v)} y2={GY1 + 4} stroke="#94a3b8" strokeWidth="1" />
          <text x={px(v)} y={GY1 + 16} fontSize="10" fill="#64748b" textAnchor="middle">
            {v}
          </text>
        </g>
      ))}

      {/* terület és görbe */}
      {terulet && <path d={terulet} fill={bFazis ? NAR : TEAL} fillOpacity="0.2" />}
      <path d={gorbe} fill="none" stroke={bFazis ? NAR : TEAL} strokeWidth="2.6" strokeLinecap="round" />

      {/* a d vonal */}
      {d > tol + 1e-6 && (
        <>
          <line x1={px(d)} y1={GY1} x2={px(d)} y2={py(Math.min(fn(d), yMax))} stroke={PIROS} strokeWidth="1.6" strokeDasharray="4 3" />
          <FeliratA x={px(d)} y={GY0 - 14} szin={PIROS} meret={11.5}>
            d = {d.toFixed(1).replace(".", ",")}
          </FeliratA>
        </>
      )}

      {/* a csonkolt integrál értéke */}
      {d > tol + 1e-6 && (
        <FeliratA x={GX0 + 10} y={GY0 + 16} szin={SOTET} meret={12.5} horgony="start">
          {bFazis ? "∫₁ᵈ dx/x = " : "∫₀ᵈ e⁻ˣ dx = "}
          {ertek.toFixed(4).replace(".", ",")}
        </FeliratA>
      )}

      {/* ---------- mérőszalag ---------- */}
      <rect x={MX} y={mTeto} width={MSZEL} height={mAlj - mTeto} rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
      <rect
        x={MX + 2}
        y={mY(ertek)}
        width={MSZEL - 4}
        height={Math.max(0, mAlj - 2 - mY(ertek))}
        rx="4"
        fill={bFazis ? NAR : TEAL}
        fillOpacity="0.55"
      />
      {cel != null && (
        <>
          <line x1={MX - 8} y1={mY(cel)} x2={MX + MSZEL + 8} y2={mY(cel)} stroke={ZOLD} strokeWidth="1.8" strokeDasharray="5 3" />
          <FeliratA x={MX + MSZEL / 2} y={mY(cel) - 8} szin={ZOLD} meret={11.5}>
            1
          </FeliratA>
        </>
      )}
      {bFazis && (
        <FeliratA x={MX + MSZEL / 2} y={mTeto - 10} szin={PIROS} meret={11.5}>
          → ∞
        </FeliratA>
      )}
      <FeliratA x={MX + MSZEL / 2} y={mAlj + 16} szin="#64748b" meret={10.5} vastag={false}>
        terület
      </FeliratA>
      <FeliratA x={MX + MSZEL / 2} y={mAlj + 30} szin={SOTET} meret={12}>
        {ertek.toFixed(3).replace(".", ",")}
      </FeliratA>

      {/* záró üzenetek */}
      {!bFazis && t >= 12.8 && (
        <FeliratA x={(GX0 + GX1) / 2} y={MA - 14} szin={ZOLD} meret={13} opacitas={arany(t, 12.8, 13.8)}>
          Konvergens: az érték 1-hez tart, és ott meg is áll.
        </FeliratA>
      )}
      {bFazis && t >= 21.2 && (
        <FeliratA x={(GX0 + GX1) / 2} y={MA - 14} szin={PIROS} meret={13} opacitas={arany(t, 21.2, 22.2)}>
          Divergens: ln d lassan, de minden határon túl nő.
        </FeliratA>
      )}
      {!bFazis && t < 12.8 && t > 7.6 && (
        <FeliratA x={(GX0 + GX1) / 2} y={MA - 14} szin={SZURKE} meret={12} vastag={false}>
          A hozzáadott csík egyre vékonyabb — ezért állhat meg az összeg.
        </FeliratA>
      )}
    </svg>
  );
}

export default function FilmImproprius() {
  return (
    <FeladatFilm
      cim="Két végtelen tartomány, két különböző sors"
      hossz={26}
      fejezetek={FEJEZETEK}
      rajz={rajz}
      megjegyzes="Bal oldalt a görbe és a satírozott terület, jobb oldalt a felhalmozott érték mérőszalagja."
    />
  );
}
