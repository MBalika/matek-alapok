"use client";

import FeladatFilm from "@/components/anim/FeladatFilm";
import { arany, lerp } from "@/components/anim/Idovonal";
import { FeliratA, VonalA } from "@/components/anim/FilmElemek";

/* KF‑5: milyen c mellett folytonos a darabonként megadott függvény? */

const SZ = 560;
const MA = 400;
const BAL = 52;
const JOBB = 24;
const FENT = 28;
const LENT = 42;

const NAR = "#e2590a";
const TEAL = "#0f766e";
const LILA = "#7c3aed";
const PIROS = "#dc2626";
const SZURKE = "#94a3b8";
const SOTET = "#1d3c48";

const XA = -1.2;
const XF = 3.4;
const YA = -1.2;
const YF = 5.2;

const px = (x) => BAL + ((x - XA) / (XF - XA)) * (SZ - BAL - JOBB);
const py = (y) => FENT + ((YF - y) / (YF - YA)) * (MA - FENT - LENT);

const f = (x) => (x * x - 1) / (x - 1); // = x + 1, ha x ≠ 1

const T_EGYSZ = 4.2;
const T_PONT = 8.0;
const T_CSUSZ = 11.6;
const T_FOLYT = 16.2;
const T_TIPUS = 19.8;
const HOSSZ = 25;

const FEJEZETEK = [
  {
    t0: 0,
    cim: "A feladat",
    szoveg:
      "Milyen c mellett lesz folytonos a függvény? Az x ≠ 1 helyeken a képlet adja az értéket, az x = 1 helyen mi választjuk meg.",
    kepletek: [
      "f(x) = \\begin{cases} \\dfrac{x^2-1}{x-1}, & x \\ne 1\\\\[4pt] c, & x = 1\\end{cases}",
    ],
  },
  {
    t0: T_EGYSZ,
    cim: "Előbb a határérték",
    szoveg:
      "Az x ≠ 1 feltétel miatt szabad egyszerűsíteni: a törtből x + 1 lesz. A határérték tehát 2 — és ez független attól, hogy mit írunk a c helyére.",
    kepletek: [
      "\\lim_{x\\to1}\\frac{x^2-1}{x-1} = \\lim_{x\\to1}\\frac{(x-1)(x+1)}{x-1} = \\lim_{x\\to1}(x+1) = 2",
    ],
  },
  {
    t0: T_PONT,
    cim: "A függvényérték: c",
    szoveg:
      "Tegyük ki az f(1) = c pontot. Amíg c ≠ 2, a pont „lebeg” a lyuk alatt vagy fölött: a függvényérték és a határérték nem esik egybe.",
    kepletek: ["\\lim_{x\\to1}f(x) = 2 \\ne c = f(1)"],
  },
  {
    t0: T_CSUSZ,
    cim: "Csúsztassuk a c-t",
    szoveg:
      "Ahogy c a 2 felé mozog, a rés záródik. Pontosan egyetlen érték mellett ül rá a pont a görbére — ekkor tűnik el a szakadás.",
    kepletek: ["c \\longrightarrow 2"],
  },
  {
    t0: T_FOLYT,
    cim: "c = 2: folytonos",
    szoveg:
      "Mindhárom feltétel teljesül: létezik a (véges) határérték, létezik f(1), és a kettő egyenlő. Minden más c esetén megszüntethető szakadás van.",
    kepletek: ["c = 2 \\iff \\lim_{x\\to1}f(x) = f(1) \\iff f \\text{ folytonos az 1-ben}"],
  },
  {
    t0: T_TIPUS,
    cim: "A három szakadástípus",
    szoveg:
      "Megszüntethető: a határérték létezik, csak az érték rossz. Ugrás: a két egyoldali határérték véges, de különböző. Pólus: valamelyik egyoldali határérték végtelen.",
    kepletek: [
      "\\frac{x^2-1}{x-1},\\qquad \\operatorname{sgn} x,\\qquad \\frac1x",
    ],
  },
];

function cErteke(t) {
  if (t < T_PONT) return null;
  if (t < T_CSUSZ) return 0.6;
  return lerp(0.6, 2, arany(t, T_CSUSZ, T_CSUSZ + 3.2));
}

/* --- a záró képernyő három kis panelje --- */

function MiniPanel({ x0, cim, tipus, u }) {
  const W = 165;
  const H = 130;
  const mpx = (v) => x0 + 14 + ((v + 3) / 6) * (W - 28);
  const mpy = (v) => 60 + H - 22 - ((v + 3) / 6) * (H - 34);
  const pontok = [];
  const pontok2 = [];
  for (let i = 0; i <= 120; i++) {
    const x = -3 + (6 * i) / 120;
    let y;
    if (tipus === "megsz") y = x + 1;
    else if (tipus === "ugras") y = Math.sign(x);
    else y = 1 / x;
    if (!Number.isFinite(y) || y < -3 || y > 3) continue;
    if (tipus === "megsz" && Math.abs(x) < 0.03) continue;
    (x < 0 ? pontok : pontok2).push(`${mpx(x).toFixed(1)},${mpy(y).toFixed(1)}`);
  }
  return (
    <g opacity={u}>
      <rect x={x0} y={54} width={W} height={H + 16} rx="10" fill="white" opacity="0.85" />
      <text x={x0 + W / 2} y={72} fontSize="12" fontWeight="700" fill={SOTET} textAnchor="middle">
        {cim}
      </text>
      <line x1={x0 + 10} y1={mpy(0)} x2={x0 + W - 10} y2={mpy(0)} stroke={SZURKE} strokeWidth="1" />
      <line x1={mpx(0)} y1={70} x2={mpx(0)} y2={60 + H - 14} stroke={SZURKE} strokeWidth="1" />
      {pontok.length > 1 && (
        <polyline points={pontok.join(" ")} fill="none" stroke={TEAL} strokeWidth="2.2" />
      )}
      {pontok2.length > 1 && (
        <polyline points={pontok2.join(" ")} fill="none" stroke={TEAL} strokeWidth="2.2" />
      )}
      {tipus === "megsz" && (
        <>
          <circle cx={mpx(0)} cy={mpy(1)} r="4.5" fill="white" stroke={TEAL} strokeWidth="2" />
          <circle cx={mpx(0)} cy={mpy(2.2)} r="4.5" fill={NAR} />
        </>
      )}
      {tipus === "ugras" && (
        <>
          <circle cx={mpx(0)} cy={mpy(-1)} r="4.5" fill="white" stroke={TEAL} strokeWidth="2" />
          <circle cx={mpx(0)} cy={mpy(1)} r="4.5" fill="white" stroke={TEAL} strokeWidth="2" />
          <line
            x1={mpx(0)}
            y1={mpy(-1)}
            x2={mpx(0)}
            y2={mpy(1)}
            stroke={PIROS}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </>
      )}
      {tipus === "polus" && (
        <line
          x1={mpx(0)}
          y1={70}
          x2={mpx(0)}
          y2={60 + H - 14}
          stroke={PIROS}
          strokeWidth="1.4"
          strokeDasharray="4 3"
        />
      )}
    </g>
  );
}

function Rajz(t) {
  const c = cErteke(t);
  const tipusU = arany(t, T_TIPUS, T_TIPUS + 1.4);
  const foU = 1 - tipusU;

  const gorbeU = arany(t, 0.3, 2.6);
  const bal = [];
  const jobb = [];
  for (let i = 0; i <= 200; i++) {
    const x = XA + ((XF - XA) * i) / 200;
    if (Math.abs(x - 1) < 0.012) continue;
    const y = f(x);
    if (y < YA || y > YF) continue;
    (x < 1 ? bal : jobb).push(`${px(x).toFixed(1)},${py(y).toFixed(1)}`);
  }
  const vagBal = Math.max(2, Math.round(bal.length * gorbeU));
  const vagJobb = Math.max(2, Math.round(jobb.length * Math.max(0, gorbeU * 1.6 - 0.6)));

  const lyukU = arany(t, T_EGYSZ + 0.6, T_EGYSZ + 1.6);
  const folytonos = c != null && Math.abs(c - 2) < 0.02;

  return (
    <svg viewBox={`0 0 ${SZ} ${MA}`} className="abra w-full select-none">
      <g opacity={foU}>
        {/* rács */}
        {[-1, 0, 1, 2, 3, 4, 5].map((v) => (
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
        <line x1={BAL} y1={py(0)} x2={SZ - JOBB + 6} y2={py(0)} stroke="#475569" strokeWidth="1.2" />
        <line x1={px(0)} y1={MA - LENT} x2={px(0)} y2={FENT - 6} stroke="#475569" strokeWidth="1.2" />
        {[-1, 1, 2, 3].map((v) => (
          <text key={`tx${v}`} x={px(v)} y={py(0) + 15} fontSize="10.5" fill="#64748b" textAnchor="middle">
            {v}
          </text>
        ))}
        {[-1, 1, 2, 3, 4, 5].map((v) => (
          <text key={`ty${v}`} x={BAL - 8} y={py(v) + 3.5} fontSize="10.5" fill="#64748b" textAnchor="end">
            {v}
          </text>
        ))}
        <text x={SZ - JOBB + 2} y={py(0) - 8} fontSize="12" fontStyle="italic" fill="#475569" textAnchor="end">
          x
        </text>

        {/* a görbe (x + 1) */}
        {bal.length > 2 && (
          <polyline
            points={bal.slice(0, vagBal).join(" ")}
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

        {/* x = 1 segédvonal */}
        <VonalA
          x1={px(1)}
          y1={MA - LENT}
          x2={px(1)}
          y2={FENT}
          u={arany(t, T_EGYSZ, T_EGYSZ + 0.8)}
          szin={SZURKE}
          vastag={1.2}
        />

        {/* a lyuk (a határérték helye) */}
        {lyukU > 0.01 && (
          <>
            <circle
              cx={px(1)}
              cy={py(2)}
              r={5.5 * Math.min(1, lyukU)}
              fill="white"
              stroke={TEAL}
              strokeWidth="2.4"
            />
            <FeliratA x={px(1) - 12} y={py(2) - 10} szin={TEAL} horgony="end" opacitas={lyukU}>
              határérték = 2
            </FeliratA>
          </>
        )}

        {/* az f(1) = c pont */}
        {c != null && (
          <>
            {Math.abs(c - 2) > 0.03 && (
              <line
                x1={px(1)}
                y1={py(c)}
                x2={px(1)}
                y2={py(2)}
                stroke={PIROS}
                strokeWidth="3.4"
                strokeLinecap="round"
              />
            )}
            <circle cx={px(1)} cy={py(c)} r="6" fill={NAR} stroke="white" strokeWidth="2" />
            <FeliratA x={px(1) + 14} y={py(c) + 5} szin={NAR} horgony="start">
              {`f(1) = c = ${c.toFixed(2).replace(".", ",")}`}
            </FeliratA>
            {Math.abs(c - 2) > 0.03 && (
              <FeliratA
                x={px(1) - 12}
                y={(py(c) + py(2)) / 2 + 4}
                szin={PIROS}
                horgony="end"
                meret={12}
              >
                {`rés: ${Math.abs(2 - c).toFixed(2).replace(".", ",")}`}
              </FeliratA>
            )}
          </>
        )}

        {folytonos && (
          <FeliratA x={SZ / 2} y={FENT + 14} szin="#047857" meret={14}>
            c = 2 → a szakadás megszűnt, a függvény folytonos
          </FeliratA>
        )}
      </g>

      {/* záró: három típus */}
      {tipusU > 0.01 && (
        <>
          <MiniPanel x0={20} cim="Megszüntethető" tipus="megsz" u={tipusU} />
          <MiniPanel x0={198} cim="Ugrás (elsőfajú)" tipus="ugras" u={tipusU} />
          <MiniPanel x0={376} cim="Pólus (másodfajú)" tipus="polus" u={tipusU} />
          <FeliratA x={SZ / 2} y={34} szin={SOTET} meret={14} opacitas={tipusU}>
            A három szakadástípus
          </FeliratA>
          <FeliratA x={SZ / 2} y={232} szin={SZURKE} meret={11.5} opacitas={tipusU} vastag={false}>
            csak a bal oldali tehető folytonossá egyetlen érték átdefiniálásával
          </FeliratA>
        </>
      )}
    </svg>
  );
}

export default function FilmSzakadas() {
  return (
    <FeladatFilm
      cim="A paraméter, ami folytonossá tesz"
      hossz={HOSSZ}
      fejezetek={FEJEZETEK}
      rajz={Rajz}
      megjegyzes="A rés nagysága |2 − c|; a folytonosság egyetlen c értéknél áll be."
    />
  );
}
