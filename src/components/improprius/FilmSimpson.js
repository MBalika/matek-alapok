"use client";

import FeladatFilm from "@/components/anim/FeladatFilm";
import { arany, simit } from "@/components/anim/Idovonal";
import { FeliratA } from "@/components/anim/FilmElemek";

const TEAL = "#0f766e";
const NAR = "#e2590a";
const LILA = "#7c3aed";
const PIROS = "#dc2626";
const SOTET = "#1d3c48";
const ZOLD = "#047857";

const SZ = 560;
const MA = 350;

const GX0 = 48;
const GX1 = 372;
const GY0 = 62;
const GY1 = 268;

const A = 1;
const B = 2;
const N = 4;
const H = (B - A) / N;
const XS = [1, 1.25, 1.5, 1.75, 2];
const YS = XS.map((x) => 1 / x);

const T = 1171 / 1680; // 0,697024
const S = 1747 / 2520; // 0,693254
const PONTOS = Math.log(2); // 0,693147

const XMIN = 0.94;
const XMAX = 2.08;
const YMAX = 1.16;
const px = (x) => GX0 + ((x - XMIN) / (XMAX - XMIN)) * (GX1 - GX0);
const py = (y) => GY1 - (y / YMAX) * (GY1 - GY0);
const f = (x) => 1 / x;

const FEJEZETEK = [
  {
    t0: 0,
    cim: "1. A feladat",
    szoveg:
      "Közelítsük az 1/x integrálját 1-től 2-ig. Ennek ismerjük a pontos értékét (ln 2), ezért kiváló tesztpélda: a hibát meg tudjuk mérni.",
    kepletek: ["\\int_1^{2}\\frac{dx}{x} = \\ln 2 = 0{,}693147\\dots"],
  },
  {
    t0: 3.6,
    cim: "2. Öt alappont",
    szoveg:
      "n = 4 részintervallum, tehát h = 0,25 és öt osztópont. Vigyázz: n a részintervallumok száma, az alappontoké n + 1.",
    kepletek: ["h = \\frac{b-a}{n} = 0{,}25"],
  },
  {
    t0: 7.4,
    cim: "3. Húrok — a trapézok",
    szoveg:
      "Kössük össze a szomszédos pontokat egyenessel. Az 1/x konvex, ezért a húr a görbe fölött fut: a pirossal jelölt rész a felülbecslés.",
    kepletek: ["T_i = \\frac{y_{i-1}+y_i}{2}\\,h"],
  },
  {
    t0: 11.6,
    cim: "4. A trapézösszeg",
    szoveg:
      "A belső pontok kétszer szerepelnek, a szélsők egyszer — innen az 1, 2, 2, 2, 1 súlyozás. Az eredmény 0,697024, a hiba 0,003877.",
    kepletek: ["\\frac{h}{2}\\left(y_0+2y_1+2y_2+2y_3+y_4\\right) = 0{,}697024"],
  },
  {
    t0: 15.2,
    cim: "5. Parabolaívek",
    szoveg:
      "Most fogjunk össze két-két részintervallumot, és fektessünk a három pontjukra parabolát. A parabola szinte rásimul a görbére.",
    kepletek: ["T_i = \\frac{h}{3}\\left(y_{i-1}+4y_i+y_{i+1}\\right)"],
  },
  {
    t0: 19,
    cim: "6. A két hiba",
    szoveg:
      "A Simpson-összeg 0,693254, a hibája 0,000107 — mintegy 36-szor kisebb, pedig pontosan ugyanazt az öt függvényértéket használta fel.",
    kepletek: ["\\frac{h}{3}\\left(y_0+4y_1+2y_2+4y_3+y_4\\right) = 0{,}693254"],
  },
];

/** Parabola a (x0,y0), (x1,y1), (x2,y2) pontokon, x1 középponttal. */
function parabola(i0) {
  const y0 = YS[i0];
  const y1 = YS[i0 + 1];
  const y2 = YS[i0 + 2];
  const a = (y0 - 2 * y1 + y2) / (2 * H * H);
  const b = (y2 - y0) / (2 * H);
  return (x) => {
    const u = x - XS[i0 + 1];
    return a * u * u + b * u + y1;
  };
}

function rajz(t) {
  const uPont = arany(t, 3.8, 6.8, simit);
  const lathatoPontok = Math.min(5, Math.floor(uPont * 5.6));
  const uTrapez = arany(t, 7.6, 11.2, simit);
  const trapezDb = t < 7.6 ? 0 : Math.min(4, Math.floor(uTrapez * 4.5));
  const uTOssz = arany(t, 11.8, 13);
  const trapezHalvany = t >= 15.2 ? 1 - arany(t, 15.2, 16.2) : 1;
  const uPar = arany(t, 15.6, 18.6, simit);
  const parDb = t < 15.6 ? 0 : Math.min(2, Math.floor(uPar * 2.4));
  const uSOssz = arany(t, 19.2, 20.4);
  const uHiba = arany(t, 20.6, 22.2);

  /* görbe */
  let gorbe = "";
  for (let i = 0; i <= 200; i++) {
    const x = XMIN + ((XMAX - XMIN) * i) / 200;
    gorbe += `${i ? "L" : "M"}${px(x).toFixed(1)},${py(f(x)).toFixed(1)} `;
  }

  /* hibafolt a húr és a görbe között */
  const hibaFolt = (k) => {
    let d = `M${px(XS[k]).toFixed(1)},${py(YS[k]).toFixed(1)} `;
    for (let i = 0; i <= 30; i++) {
      const x = XS[k] + ((XS[k + 1] - XS[k]) * i) / 30;
      d += `L${px(x).toFixed(1)},${py(f(x)).toFixed(1)} `;
    }
    d += `L${px(XS[k + 1]).toFixed(1)},${py(YS[k + 1]).toFixed(1)} Z`;
    return d;
  };

  const hibaSkala = 132 / 0.0042; // képpont / hibaegység
  const HY = 318;

  return (
    <svg viewBox={`0 0 ${SZ} ${MA}`} className="abra w-full select-none">
      <FeliratA x={(GX0 + GX1) / 2} y={28} szin={SOTET} meret={13}>
        y = 1/x az [1; 2] szakaszon
      </FeliratA>

      {/* tengelyek */}
      <line x1={GX0} y1={GY1} x2={GX1 + 12} y2={GY1} stroke="#475569" strokeWidth="1.2" />
      <line x1={GX0} y1={GY1} x2={GX0} y2={GY0 - 10} stroke="#475569" strokeWidth="1.2" />
      <FeliratA x={GX1 + 16} y={GY1 + 4} szin="#64748b" meret={11} vastag={false} horgony="start" dolt>
        x
      </FeliratA>

      {/* trapézok */}
      {trapezHalvany > 0.01 &&
        Array.from({ length: trapezDb }, (_, k) => (
          <g key={`tr${k}`} opacity={trapezHalvany}>
            <polygon
              points={[
                [px(XS[k]), py(0)],
                [px(XS[k]), py(YS[k])],
                [px(XS[k + 1]), py(YS[k + 1])],
                [px(XS[k + 1]), py(0)],
              ]
                .map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`)
                .join(" ")}
              fill={NAR}
              fillOpacity="0.15"
              stroke={NAR}
              strokeWidth="1.8"
            />
            <path d={hibaFolt(k)} fill={PIROS} fillOpacity="0.4" />
          </g>
        ))}

      {/* parabolák */}
      {Array.from({ length: parDb }, (_, k) => {
        const par = parabola(2 * k);
        let d = "";
        for (let i = 0; i <= 40; i++) {
          const x = XS[2 * k] + ((XS[2 * k + 2] - XS[2 * k]) * i) / 40;
          d += `${i ? "L" : "M"}${px(x).toFixed(1)},${py(par(x)).toFixed(1)} `;
        }
        return (
          <g key={`par${k}`}>
            <path
              d={`M${px(XS[2 * k]).toFixed(1)},${py(0).toFixed(1)} ${d.replace(/^M/, "L")} L${px(XS[2 * k + 2]).toFixed(
                1,
              )},${py(0).toFixed(1)} Z`}
              fill={LILA}
              fillOpacity="0.13"
            />
            <path d={d} fill="none" stroke={LILA} strokeWidth="2.4" />
          </g>
        );
      })}

      {/* görbe */}
      <path d={gorbe} fill="none" stroke={TEAL} strokeWidth="2.8" strokeLinecap="round" />

      {/* alappontok */}
      {XS.slice(0, lathatoPontok).map((x, k) => (
        <g key={`p${k}`}>
          <line x1={px(x)} y1={py(0)} x2={px(x)} y2={py(YS[k])} stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx={px(x)} cy={py(YS[k])} r="4" fill={TEAL} stroke="white" strokeWidth="1.4" />
          <text x={px(x)} y={GY1 + 16} fontSize="10.5" fill="#64748b" textAnchor="middle">
            {x.toFixed(2).replace(".", ",")}
          </text>
          <FeliratA x={px(x)} y={py(YS[k]) - 11} szin={SOTET} meret={10.5}>
            {YS[k].toFixed(3).replace(".", ",")}
          </FeliratA>
        </g>
      ))}

      {/* jobb oldali számpanel */}
      <FeliratA x={398} y={GY0 + 2} szin="#64748b" meret={11} vastag={false} horgony="start">
        h = 0,25 · n = 4
      </FeliratA>
      {uTOssz > 0.01 && (
        <>
          <rect x={396} y={GY0 + 16} width={150} height={44} rx="7" fill="#fff7ed" stroke="#fdba74" opacity={uTOssz} />
          <FeliratA x={406} y={GY0 + 34} szin={NAR} meret={11.5} horgony="start" opacitas={uTOssz}>
            Trapéz (n = 4)
          </FeliratA>
          <FeliratA x={406} y={GY0 + 52} szin={SOTET} meret={14} horgony="start" opacitas={uTOssz}>
            0,697024
          </FeliratA>
        </>
      )}
      {uSOssz > 0.01 && (
        <>
          <rect x={396} y={GY0 + 70} width={150} height={44} rx="7" fill="#f5f3ff" stroke="#c4b5fd" opacity={uSOssz} />
          <FeliratA x={406} y={GY0 + 88} szin={LILA} meret={11.5} horgony="start" opacitas={uSOssz}>
            Simpson (n = 4)
          </FeliratA>
          <FeliratA x={406} y={GY0 + 106} szin={SOTET} meret={14} horgony="start" opacitas={uSOssz}>
            0,693254
          </FeliratA>
        </>
      )}
      {uSOssz > 0.01 && (
        <>
          <rect x={396} y={GY0 + 124} width={150} height={44} rx="7" fill="#ecfdf5" stroke="#6ee7b7" opacity={uSOssz} />
          <FeliratA x={406} y={GY0 + 142} szin={ZOLD} meret={11.5} horgony="start" opacitas={uSOssz}>
            Pontos: ln 2
          </FeliratA>
          <FeliratA x={406} y={GY0 + 160} szin={SOTET} meret={14} horgony="start" opacitas={uSOssz}>
            0,693147
          </FeliratA>
        </>
      )}

      {/* hibaoszlopok */}
      {uHiba > 0.01 && (
        <>
          <FeliratA x={48} y={HY - 22} szin={SOTET} meret={12} horgony="start" opacitas={uHiba}>
            A két hiba egymás mellett:
          </FeliratA>
          <rect x={48} y={HY - 12} width={(T - PONTOS) * hibaSkala * uHiba} height={13} rx="3" fill={NAR} />
          <FeliratA x={52 + (T - PONTOS) * hibaSkala} y={HY - 1} szin={NAR} meret={11.5} horgony="start" opacitas={uHiba}>
            trapéz: 0,003877
          </FeliratA>
          <rect x={48} y={HY + 8} width={Math.max(1.5, (S - PONTOS) * hibaSkala * uHiba)} height={13} rx="3" fill={LILA} />
          <FeliratA x={56} y={HY + 19} szin={LILA} meret={11.5} horgony="start" opacitas={uHiba}>
            Simpson: 0,000107 (36-szor kisebb)
          </FeliratA>
        </>
      )}
      {t >= 7.6 && t < 15.2 && (
        <FeliratA x={(GX0 + GX1) / 2} y={MA - 12} szin={PIROS} meret={11.5} vastag={false}>
          A piros foltok a felülbecslés — konvex függvénynél a húr mindig a görbe fölött fut.
        </FeliratA>
      )}
    </svg>
  );
}

export default function FilmSimpson() {
  return (
    <FeladatFilm
      cim="Trapéz és Simpson ugyanazon az öt ponton"
      hossz={24}
      fejezetek={FEJEZETEK}
      rajz={rajz}
      megjegyzes="A hibaoszlopok a film végén jelennek meg — ugyanazon a léptéken."
    />
  );
}
