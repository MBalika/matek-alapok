"use client";

import FeladatFilm from "@/components/anim/FeladatFilm";
import { arany, lerp } from "@/components/anim/Idovonal";
import { FeliratA, PontA, VonalA } from "@/components/anim/FilmElemek";

/* KF‑4 (a): (√(x+4) − 2)/x → 1/4. A lyuk, a gyöktelenítés, a ráközelítés és az ε–δ sáv. */

const SZ = 560;
const MA = 400;
const BAL = 62;
const JOBB = 26;
const FENT = 30;
const LENT = 44;

const NAR = "#e2590a";
const TEAL = "#0f766e";
const LILA = "#7c3aed";
const SZURKE = "#94a3b8";
const SOTET = "#1d3c48";
const PIROS = "#dc2626";

const f = (x) => (Math.sqrt(x + 4) - 2) / x;
const A = 0.25;

const T_LYUK = 3.4;
const T_NULLA = 6.4;
const T_GYOK = 10.0;
const T_ZOOM = 14.2;
const T_SAV = 18.4;
const T_ZARO = 22.4;
const HOSSZ = 26;

const FEJEZETEK = [
  {
    t0: 0,
    cim: "A függvény és a kérdés",
    szoveg:
      "f(x) = (√(x+4) − 2)/x. A grafikon szép, sima görbe — semmi nem árulkodik arról, hogy a 0-ban baj van.",
    kepletek: ["\\lim_{x\\to 0}\\frac{\\sqrt{x+4}-2}{x} = ?"],
  },
  {
    t0: T_LYUK,
    cim: "A 0-ban lyuk van",
    szoveg:
      "Behelyettesítve a számláló is, a nevező is nulla. A függvény tehát a 0-ban nincs értelmezve — a grafikonon ott egy kilyukasztott pont áll.",
    kepletek: ["f(0) = \\frac{\\sqrt{4}-2}{0} = \\frac{0}{0}\\ \\text{— határozatlan alak}"],
  },
  {
    t0: T_NULLA,
    cim: "A 0/0 nem eredmény",
    szoveg:
      "A 0/0 nem azt jelenti, hogy nincs határérték, hanem azt, hogy még dolgozni kell. A recept gyökös kifejezésnél: bővítés a konjugálttal.",
    kepletek: [
      "\\frac{\\left(\\sqrt{x+4}-2\\right)\\left(\\sqrt{x+4}+2\\right)}{x\\left(\\sqrt{x+4}+2\\right)}",
    ],
  },
  {
    t0: T_GYOK,
    cim: "A gyökök kiejtik egymást",
    szoveg:
      "Az (a − b)(a + b) = a² − b² azonosság miatt a számlálóban (x+4) − 4 = x marad. Ezzel az x egyszerűsíthető — jogosan, mert a határértéknél x ≠ 0.",
    kepletek: [
      "= \\frac{(x+4)-4}{x\\left(\\sqrt{x+4}+2\\right)} = \\frac{1}{\\sqrt{x+4}+2}",
    ],
  },
  {
    t0: T_ZOOM,
    cim: "Ráközelítünk a lyukra",
    szoveg:
      "Az új alak a 0-ban már behelyettesíthető. A kamera ráközelít: a görbe a lyuk mindkét oldalán ugyanahhoz a magassághoz simul.",
    kepletek: ["\\frac{1}{\\sqrt{0+4}+2} = \\frac{1}{4} = 0{,}25"],
  },
  {
    t0: T_SAV,
    cim: "ε és δ: a definíció képe",
    szoveg:
      "Adj meg bármilyen szűk vízszintes ε-sávot 1/4 körül — találunk hozzá olyan függőleges δ-sávot a 0 körül, amelyen belül a görbe végig a sávban marad.",
    kepletek: ["0<|x-0|<\\delta \\ \\Longrightarrow\\ \\left|f(x)-\\tfrac14\\right|<\\varepsilon"],
  },
  {
    t0: T_ZARO,
    cim: "A tanulság",
    szoveg:
      "A határértékhez nem kell, hogy f(0) létezzen. A 0/0 alak felbontható — gyöknél konjugálttal, polinomnál szorzattá alakítással.",
    kepletek: ["\\lim_{x\\to 0}\\frac{\\sqrt{x+4}-2}{x} = \\frac14"],
  },
];

function allapot(t) {
  const zoomU = arany(t, T_ZOOM, T_ZOOM + 3.0);
  const xFel = lerp(6, 0.55, zoomU);
  const xAl = lerp(-3.6, -0.55, zoomU);
  const yAl = lerp(0.12, 0.222, zoomU);
  const yFel = lerp(0.62, 0.278, zoomU);

  const savU = arany(t, T_SAV, T_SAV + 2.6);
  const eps = savU <= 0.001 ? null : lerp(0.05, 0.008, savU);
  // a konkrét δ: |f(x) − 1/4| < ε  ⇔  kb. |x| < 16ε (a f(x) ≈ 1/4 − x/64 közelítésből)
  const delta = eps == null ? null : Math.min(0.5, 60 * eps);

  return { xAl, xFel, yAl, yFel, eps, delta, zoomU };
}

function Rajz(t) {
  const { xAl, xFel, yAl, yFel, eps, delta, zoomU } = allapot(t);
  const px = (x) => BAL + ((x - xAl) / (xFel - xAl)) * (SZ - BAL - JOBB);
  const py = (y) => FENT + ((yFel - y) / (yFel - yAl)) * (MA - FENT - LENT);

  const gorbeU = arany(t, 0.4, 3.0);
  const db = 260;
  const bal = [];
  const jobb = [];
  for (let i = 0; i <= db; i++) {
    const x = xAl + ((xFel - xAl) * i) / db;
    if (x <= -3.999 || Math.abs(x) < 1e-4) continue;
    const y = f(x);
    if (!Number.isFinite(y) || y < yAl - 0.05 || y > yFel + 0.05) continue;
    const pont = `${px(x).toFixed(1)},${py(y).toFixed(1)}`;
    if (x < 0) bal.push(pont);
    else jobb.push(pont);
  }
  const vagBal = Math.max(2, Math.round(bal.length * gorbeU));
  const vagJobb = Math.max(2, Math.round(jobb.length * gorbeU));

  const lyukU = arany(t, T_LYUK, T_LYUK + 1.0);
  const vonalU = arany(t, T_ZOOM + 1.6, T_ZOOM + 2.8);

  // tengelyfeliratok
  const xJelek = [];
  const dx = zoomU > 0.5 ? 0.2 : 2;
  for (let v = Math.ceil(xAl / dx) * dx; v <= xFel + 1e-9; v += dx)
    xJelek.push(Math.round(v * 100) / 100);
  const yJelek = [];
  const dy = zoomU > 0.5 ? 0.01 : 0.1;
  for (let v = Math.ceil(yAl / dy) * dy; v <= yFel + 1e-9; v += dy)
    yJelek.push(Math.round(v * 1000) / 1000);

  const yNulla = py(Math.max(yAl, Math.min(0, yFel)));
  const tengelyY = Math.min(MA - LENT, Math.max(FENT, yNulla));

  return (
    <svg viewBox={`0 0 ${SZ} ${MA}`} className="abra w-full select-none">
      {/* ε-sáv */}
      {eps != null && (
        <rect
          x={BAL}
          y={py(A + eps)}
          width={SZ - BAL - JOBB}
          height={Math.max(2, py(A - eps) - py(A + eps))}
          fill={NAR}
          opacity="0.15"
        />
      )}
      {/* δ-sáv */}
      {delta != null && (
        <rect
          x={px(-delta)}
          y={FENT}
          width={Math.max(2, px(delta) - px(-delta))}
          height={MA - FENT - LENT}
          fill={LILA}
          opacity="0.13"
        />
      )}

      {/* rács */}
      {yJelek.map((v) => (
        <line
          key={`gy${v}`}
          x1={BAL}
          y1={py(v)}
          x2={SZ - JOBB}
          y2={py(v)}
          stroke="#e2e8f0"
          strokeWidth="0.8"
        />
      ))}

      {/* tengelyek */}
      <line x1={BAL} y1={tengelyY} x2={SZ - JOBB + 6} y2={tengelyY} stroke="#475569" strokeWidth="1.2" />
      <line x1={px(0)} y1={MA - LENT} x2={px(0)} y2={FENT - 6} stroke="#475569" strokeWidth="1.2" />
      {xJelek.map((v) =>
        Math.abs(v) < 1e-9 ? null : (
          <text
            key={`tx${v}`}
            x={px(v)}
            y={MA - LENT + 16}
            fontSize="10.5"
            fill="#64748b"
            textAnchor="middle"
          >
            {String(v).replace(".", ",")}
          </text>
        ),
      )}
      {yJelek.map((v) => (
        <text key={`ty${v}`} x={BAL - 8} y={py(v) + 3.5} fontSize="10.5" fill="#64748b" textAnchor="end">
          {String(Math.round(v * 1000) / 1000).replace(".", ",")}
        </text>
      ))}
      <text x={SZ - JOBB + 2} y={tengelyY - 8} fontSize="12" fontStyle="italic" fill="#475569" textAnchor="end">
        x
      </text>

      {/* a görbe két ága */}
      {bal.length > 2 && (
        <polyline
          points={bal.slice(bal.length - vagBal).join(" ")}
          fill="none"
          stroke={TEAL}
          strokeWidth="2.8"
          strokeLinecap="round"
        />
      )}
      {jobb.length > 2 && (
        <polyline
          points={jobb.slice(0, vagJobb).join(" ")}
          fill="none"
          stroke={TEAL}
          strokeWidth="2.8"
          strokeLinecap="round"
        />
      )}

      {/* a határérték vonala */}
      {vonalU > 0.01 && (
        <VonalA
          x1={BAL}
          y1={py(A)}
          x2={SZ - JOBB}
          y2={py(A)}
          u={vonalU}
          szin={NAR}
          vastag={2}
        />
      )}
      {vonalU > 0.5 && (
        <FeliratA x={SZ - JOBB - 8} y={py(A) - 9} szin={NAR} horgony="end">
          A = 1/4
        </FeliratA>
      )}

      {/* a lyuk */}
      {lyukU > 0.01 && (
        <>
          <circle
            cx={px(0)}
            cy={py(A)}
            r={5.5 * Math.min(1, lyukU)}
            fill="white"
            stroke={PIROS}
            strokeWidth="2.4"
          />
          {t < T_ZOOM && (
            <FeliratA x={px(0) + 12} y={py(A) - 14} szin={PIROS} opacitas={lyukU}>
              itt nincs értelmezve
            </FeliratA>
          )}
        </>
      )}

      {/* 0/0 felirat */}
      {t >= T_NULLA && t < T_GYOK && (
        <FeliratA x={px(0)} y={FENT + 20} szin={PIROS} meret={15} opacitas={arany(t, T_NULLA, T_NULLA + 0.6)}>
          0 / 0
        </FeliratA>
      )}

      {/* ε és δ feliratok */}
      {eps != null && (
        <>
          <FeliratA x={BAL + 8} y={py(A + eps) - 6} szin={NAR} horgony="start" meret={12}>
            {`A + ε = ${(A + eps).toFixed(3).replace(".", ",")}`}
          </FeliratA>
          <FeliratA
            x={Math.min(px(delta) + 6, SZ - JOBB - 6)}
            y={MA - LENT - 8}
            szin={LILA}
            horgony={px(delta) + 6 > SZ - JOBB - 80 ? "end" : "start"}
            meret={12}
          >
            {`δ = ${delta.toFixed(3).replace(".", ",")}`}
          </FeliratA>
        </>
      )}

      {/* közelítő pontok a zoom alatt */}
      {zoomU > 0.4 &&
        [-0.4, -0.2, -0.08, 0.08, 0.2, 0.4].map((x) => (
          <PontA key={x} x={px(x)} y={py(f(x))} r={4} szin={TEAL} u={arany(t, T_ZOOM + 1.0, T_ZOOM + 2.2)} />
        ))}
    </svg>
  );
}

export default function FilmHatarertek() {
  return (
    <FeladatFilm
      cim="A lyuk, a gyöktelenítés és az ε–δ sáv"
      hossz={HOSSZ}
      fejezetek={FEJEZETEK}
      rajz={Rajz}
      megjegyzes="A ráközelítésnél figyeld a függőleges tengely beosztását: 0,01-es lépésekre vált."
    />
  );
}
