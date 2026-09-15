"use client";

import FvRajz from "./FvRajz";

/** Statikus ábrák a Függvények modulhoz. */

const TEAL = "#0f766e";
const NAR = "#e2590a";
const LILA = "#7c3aed";
const SOTET = "#1d3c48";
const SZURKE = "#64748b";

/* ============ 4.x Elemi függvények galériája ============ */

/* A tartományokat úgy választjuk, hogy a FvRajz „szép lépése” egész szám legyen
   (a terjedelem 5 és 9 közé essen) — így a tengelyfeliratok nem csúsznak egymásra. */
const GALERIA = [
  { cim: "x²  és  x³", xMin: -3, xMax: 3, yMin: -8, yMax: 8, g: [
    { fn: (x) => x * x, szin: TEAL, cimke: "x²", cimkeX: -2.3 },
    { fn: (x) => x * x * x, szin: NAR, szaggatott: true, cimke: "x³", cimkeX: 1.9 },
  ] },
  { cim: "1/x  és  1/x²", xMin: -3, xMax: 3, yMin: -5, yMax: 5, g: [
    { fn: (x) => 1 / x, szin: TEAL, cimke: "1/x", cimkeX: 2.2 },
    { fn: (x) => 1 / (x * x), szin: NAR, szaggatott: true, cimke: "1/x²", cimkeX: -2.1 },
  ] },
  { cim: "√x  és  ∛x", xMin: -3, xMax: 5, yMin: -2, yMax: 3, g: [
    { fn: (x) => Math.sqrt(x), szin: TEAL, cimke: "√x", cimkeX: 4.2 },
    { fn: (x) => Math.cbrt(x), szin: NAR, szaggatott: true, cimke: "∛x", cimkeX: -2.2 },
  ] },
  { cim: "eˣ  és  e⁻ˣ", xMin: -3, xMax: 3, yMin: -1, yMax: 7, g: [
    { fn: (x) => Math.exp(x), szin: TEAL, cimke: "eˣ", cimkeX: 1.6 },
    { fn: (x) => Math.exp(-x), szin: NAR, szaggatott: true, cimke: "e⁻ˣ", cimkeX: -1.6 },
  ] },
  { cim: "ln x  és  lg x", xMin: -1, xMax: 7, yMin: -3, yMax: 3, g: [
    { fn: (x) => Math.log(x), szin: TEAL, cimke: "ln x", cimkeX: 5.6 },
    { fn: (x) => Math.log10(x), szin: NAR, szaggatott: true, cimke: "lg x", cimkeX: 3.2 },
  ] },
  { cim: "sin x  és  cos x", xMin: -7, xMax: 7, yMin: -2.5, yMax: 2.5, g: [
    { fn: (x) => Math.sin(x), szin: TEAL, cimke: "sin x", cimkeX: 1.6 },
    { fn: (x) => Math.cos(x), szin: NAR, szaggatott: true, cimke: "cos x", cimkeX: -1.6 },
  ] },
  { cim: "tg x  és  ctg x", xMin: -5, xMax: 5, yMin: -5, yMax: 5, g: [
    { fn: (x) => Math.tan(x), szin: TEAL, cimke: "tg x", cimkeX: 0.8 },
    { fn: (x) => 1 / Math.tan(x), szin: NAR, szaggatott: true, cimke: "ctg x", cimkeX: 2.4 },
  ] },
  { cim: "|x|  és  sgn x", xMin: -3, xMax: 3, yMin: -2, yMax: 4, g: [
    { fn: (x) => Math.abs(x), szin: TEAL, cimke: "|x|", cimkeX: -2.2 },
    { fn: (x) => Math.sign(x), szin: NAR, szaggatott: true, cimke: "sgn x", cimkeX: 2.0 },
  ] },
];

export function AbraGaleria() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {GALERIA.map((k) => (
        <div key={k.cim} className="rounded-xl bg-white/70 p-2">
          <p className="text-center text-[12px] font-semibold text-petrol-700">{k.cim}</p>
          <FvRajz
            xMin={k.xMin}
            xMax={k.xMax}
            yMin={k.yMin}
            yMax={k.yMax}
            gorbek={k.g.map((c) => ({ ...c, vastag: 2.2 }))}
            szelesseg={440}
            magassag={250}
            racs={false}
          />
        </div>
      ))}
    </div>
  );
}

/* ============ Hiperbolikus függvények és a láncgörbe ============ */

export function AbraHiperbolikus() {
  return (
    <div className="grid gap-3 lg:grid-cols-2">
      <div>
        <p className="text-center text-[12px] font-semibold text-petrol-700">
          sh, ch és a két „félexponenciális”
        </p>
        <FvRajz
          xMin={-3}
          xMax={3}
          yMin={-5}
          yMax={7}
          szelesseg={440}
          magassag={300}
          gorbek={[
            { fn: (x) => Math.exp(x) / 2, szin: SZURKE, vastag: 1.3, szaggatott: true, cimke: "eˣ/2", cimkeX: 1.35 },
            { fn: (x) => Math.exp(-x) / 2, szin: SZURKE, vastag: 1.3, szaggatott: true, cimke: "e⁻ˣ/2", cimkeX: -1.35 },
            { fn: (x) => Math.sinh(x), szin: NAR, vastag: 2.6, cimke: "sh x", cimkeX: -2.2 },
            { fn: (x) => Math.cosh(x), szin: TEAL, vastag: 2.6, cimke: "ch x", cimkeX: 2.2 },
          ]}
          pontok={[{ x: 0, y: 1, szin: TEAL, r: 4 }]}
        />
      </div>
      <div>
        <p className="text-center text-[12px] font-semibold text-petrol-700">
          th és cth az y = ±1 aszimptotákkal
        </p>
        <FvRajz
          xMin={-3}
          xMax={3}
          yMin={-3}
          yMax={3}
          szelesseg={440}
          magassag={300}
          gorbek={[
            { fn: (x) => Math.tanh(x), szin: TEAL, vastag: 2.6, cimke: "th x", cimkeX: 2.4 },
            { fn: (x) => 1 / Math.tanh(x), szin: LILA, vastag: 2.2, cimke: "cth x", cimkeX: 0.55 },
          ]}
          vizszintes={[
            { y: 1, szin: SZURKE },
            { y: -1, szin: SZURKE },
          ]}
        />
      </div>
      <div className="mx-auto w-full max-w-xl lg:col-span-2">
        <p className="text-center text-[12px] font-semibold text-petrol-700">
          A láncgörbe: y = a·ch(x/a) — a kötél alakja, nem parabola
        </p>
        <svg viewBox="0 0 560 210" className="abra w-full select-none">
          {/* oszlopok */}
          <rect x="70" y="40" width="10" height="130" fill={SOTET} opacity="0.85" />
          <rect x="480" y="40" width="10" height="130" fill={SOTET} opacity="0.85" />
          <line x1="30" y1="170" x2="530" y2="170" stroke={SZURKE} strokeWidth="1.5" />
          {/* láncgörbe a = 1.6, x ∈ [-2.5, 2.5] → kép */}
          <path
            d={lancgorbeUt(1.6, -2.5, 2.5, 75, 485, 45, 148)}
            fill="none"
            stroke={TEAL}
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* összehasonlító parabola ugyanazon végpontokkal */}
          <path
            d={parabolaUt(75, 485, 45, 148)}
            fill="none"
            stroke={NAR}
            strokeWidth="2"
            strokeDasharray="6 4"
          />
          <text x="280" y="196" fontSize="12" fontWeight="650" fill={TEAL} textAnchor="middle">
            láncgörbe (ch)
          </text>
          <text x="280" y="98" fontSize="12" fontWeight="650" fill={NAR} textAnchor="middle">
            parabola — nem ugyanaz
          </text>
          <text x="30" y="26" fontSize="11.5" fill={SZURKE}>
            Saját súlyával terhelt kötél, függőhíd-kábel, felsővezeték
          </text>
        </svg>
      </div>
    </div>
  );
}

function lancgorbeUt(a, x0, x1, px0, px1, py0, pyMax) {
  const db = 120;
  const ch = (x) => a * Math.cosh(x / a);
  const minY = ch(0);
  const maxY = ch(x1);
  const p = [];
  for (let i = 0; i <= db; i++) {
    const x = x0 + ((x1 - x0) * i) / db;
    const X = px0 + ((x - x0) / (x1 - x0)) * (px1 - px0);
    const Y = pyMax - ((ch(x) - minY) / (maxY - minY)) * (pyMax - py0);
    p.push(`${i ? "L" : "M"}${X.toFixed(1)},${Y.toFixed(1)}`);
  }
  return p.join(" ");
}

function parabolaUt(px0, px1, py0, pyMax) {
  const db = 60;
  const p = [];
  for (let i = 0; i <= db; i++) {
    const u = -1 + (2 * i) / db;
    const X = px0 + ((u + 1) / 2) * (px1 - px0);
    const Y = pyMax - u * u * (pyMax - py0);
    p.push(`${i ? "L" : "M"}${X.toFixed(1)},${Y.toFixed(1)}`);
  }
  return p.join(" ");
}

/* ============ Az egységkör-szendvics: sin x < x < tg x ============ */

export function AbraSzendvics() {
  const R = 140;
  const OX = 105;
  const OY = 275;
  const szog = 0.85; // radián
  const Px = OX + R * Math.cos(szog);
  const Py = OY - R * Math.sin(szog);
  const Tx = OX + R;
  const Ty = OY - R * Math.tan(szog);

  return (
    <svg
      viewBox="0 0 560 330"
      className="abra mx-auto block w-full max-w-xl select-none"
    >
      {/* körcikk */}
      <path
        d={`M ${OX} ${OY} L ${OX + R} ${OY} A ${R} ${R} 0 0 0 ${Px} ${Py} Z`}
        fill={LILA}
        fillOpacity="0.16"
        stroke="none"
      />
      {/* beírt háromszög */}
      <polygon points={`${OX},${OY} ${OX + R},${OY} ${Px},${Py}`} fill={TEAL} fillOpacity="0.2" />
      {/* körülírt háromszög */}
      <polygon
        points={`${OX},${OY} ${Tx},${OY} ${Tx},${Ty}`}
        fill="none"
        stroke={NAR}
        strokeWidth="2"
      />
      {/* egységkör */}
      <path
        d={`M ${OX + R} ${OY} A ${R} ${R} 0 0 0 ${OX + R * Math.cos(1.25)} ${OY - R * Math.sin(1.25)}`}
        fill="none"
        stroke={SOTET}
        strokeWidth="2"
      />
      {/* tengelyek */}
      <line x1={OX - 30} y1={OY} x2={OX + R + 48} y2={OY} stroke={SZURKE} strokeWidth="1.3" />
      <line x1={OX} y1={OY + 28} x2={OX} y2={OY - R - 40} stroke={SZURKE} strokeWidth="1.3" />
      {/* sugár */}
      <line x1={OX} y1={OY} x2={Px} y2={Py} stroke={SOTET} strokeWidth="2" />
      <line x1={OX} y1={OY} x2={Tx} y2={Ty} stroke={NAR} strokeWidth="1.6" strokeDasharray="4 3" />
      {/* sin x magasság */}
      <line x1={Px} y1={Py} x2={Px} y2={OY} stroke={TEAL} strokeWidth="2.6" />
      <line x1={Tx} y1={Ty} x2={Tx} y2={OY} stroke={NAR} strokeWidth="2.6" />
      {/* szögjel */}
      <path
        d={`M ${OX + 36} ${OY} A 36 36 0 0 0 ${OX + 36 * Math.cos(szog)} ${OY - 36 * Math.sin(szog)}`}
        fill="none"
        stroke={LILA}
        strokeWidth="1.6"
      />
      <text x={OX + 46} y={OY - 14} fontSize="13" fontWeight="650" fill={LILA}>
        x
      </text>

      <text
        x={Px + 8}
        y={(Py + OY) / 2 + 4}
        fontSize="12.5"
        fontWeight="650"
        style={{ fill: TEAL, paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
      >
        sin x
      </text>
      <text
        x={Tx + 8}
        y={(Ty + OY) / 2 + 4}
        fontSize="12.5"
        fontWeight="650"
        style={{ fill: NAR, paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
      >
        tg x
      </text>
      <text x={OX + R + 4} y={OY + 18} fontSize="12" fill={SZURKE}>
        1
      </text>

      {/* magyarázó oszlop jobbra */}
      <text x={300} y={44} fontSize="12.5" fontWeight="700" fill={SOTET}>
        Három terület, egymásba ágyazva:
      </text>
      <text x={300} y={68} fontSize="12.5" fill={TEAL} fontWeight="650">
        beírt háromszög: ½ sin x
      </text>
      <text x={300} y={90} fontSize="12.5" fill={LILA} fontWeight="650">
        körcikk: ½ x
      </text>
      <text x={300} y={112} fontSize="12.5" fill={NAR} fontWeight="650">
        körülírt háromszög: ½ tg x
      </text>
      <text x={300} y={143} fontSize="13" fontWeight="700" fill={SOTET}>
        sin x &lt; x &lt; tg x
      </text>
      <text x={300} y={166} fontSize="11.5" fill={SZURKE}>
        sin x-szel osztva, majd
      </text>
      <text x={300} y={182} fontSize="11.5" fill={SZURKE}>
        reciprokot véve:
      </text>
      <text x={300} y={206} fontSize="13" fontWeight="700" fill={SOTET}>
        cos x &lt; (sin x)/x &lt; 1
      </text>
      <text x={300} y={230} fontSize="11.5" fill={SZURKE}>
        Rendőrelv, cos x → 1, tehát
      </text>
      <text x={300} y={254} fontSize="13.5" fontWeight="700" fill={NAR}>
        lim (sin x)/x = 1
      </text>
      <text x={300} y={284} fontSize="11.5" fill={SZURKE}>
        Csak radiánban! Fokban ½x
      </text>
      <text x={300} y={300} fontSize="11.5" fill={SZURKE}>
        helyett más volna a körcikk területe.
      </text>
    </svg>
  );
}

/* ============ A három szakadástípus ============ */

export function AbraSzakadasTipusok() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <div>
        <p className="text-center text-[12px] font-semibold text-petrol-700">Megszüntethető</p>
        <FvRajz
          xMin={-2}
          xMax={4}
          yMin={-1}
          yMax={5}
          szelesseg={300}
          magassag={220}
          racs={false}
          gorbek={[{ fn: (x) => (x * x - 1) / (x - 1), szin: TEAL, vastag: 2.4 }]}
          pontok={[
            { x: 1, y: 2, szin: TEAL, ures: true, r: 5 },
            { x: 1, y: 3.6, szin: NAR, r: 5 },
          ]}
        />
        <p className="mt-1 text-center text-[11.5px] leading-snug text-petrol-500">
          A határérték létezik (2), csak az érték rossz. Átdefiniálással megszűnik.
        </p>
      </div>
      <div>
        <p className="text-center text-[12px] font-semibold text-petrol-700">Ugrás (elsőfajú)</p>
        <FvRajz
          xMin={-3}
          xMax={3}
          yMin={-3}
          yMax={3}
          szelesseg={300}
          magassag={220}
          racs={false}
          gorbek={[{ fn: (x) => Math.sign(x), szin: TEAL, vastag: 2.4 }]}
          pontok={[
            { x: 0, y: -1, szin: TEAL, ures: true, r: 5 },
            { x: 0, y: 1, szin: TEAL, ures: true, r: 5 },
            { x: 0, y: 0, szin: NAR, r: 5 },
          ]}
        />
        <p className="mt-1 text-center text-[11.5px] leading-snug text-petrol-500">
          Mindkét egyoldali határérték véges, de különböző. Az ugrás nagysága 2.
        </p>
      </div>
      <div>
        <p className="text-center text-[12px] font-semibold text-petrol-700">Pólus (másodfajú)</p>
        <FvRajz
          xMin={-3}
          xMax={3}
          yMin={-5}
          yMax={5}
          szelesseg={300}
          magassag={220}
          racs={false}
          gorbek={[{ fn: (x) => 1 / x, szin: TEAL, vastag: 2.4 }]}
          fuggoleges={[{ x: 0 }]}
        />
        <p className="mt-1 text-center text-[11.5px] leading-snug text-petrol-500">
          Valamelyik egyoldali határérték végtelen. Semmilyen átdefiniálás nem segít.
        </p>
      </div>
    </div>
  );
}

/* ============ Az inverz mint tükrözés ============ */

export function AbraInverzTukrozes() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div>
        <p className="text-center text-[12px] font-semibold text-petrol-700">
          x³ és a köbgyök — leszűkítés nélkül
        </p>
        <FvRajz
          xMin={-2.6}
          xMax={2.6}
          yMin={-2.6}
          yMax={2.6}
          szelesseg={330}
          magassag={270}
          gorbek={[
            { fn: (x) => x * x * x, szin: TEAL, vastag: 2.6, cimke: "x³", cimkeX: -1.15 },
            { fn: (x) => Math.cbrt(x), szin: NAR, vastag: 2.6, cimke: "∛x", cimkeX: 2.1 },
          ]}
          egyenesek={[{ m: 1, b: 0, szin: SZURKE, szaggatott: true, vastag: 1.3 }]}
        />
      </div>
      <div>
        <p className="text-center text-[12px] font-semibold text-petrol-700">
          x² csak leszűkítve invertálható
        </p>
        <FvRajz
          xMin={-1}
          xMax={4.2}
          yMin={-1}
          yMax={4.2}
          szelesseg={330}
          magassag={270}
          gorbek={[
            { fn: (x) => x * x, tol: 0, ig: 2.05, szin: TEAL, vastag: 2.6, cimke: "x², x ≥ 0", cimkeX: 0.75 },
            { fn: (x) => Math.sqrt(x), tol: 0, ig: 4.2, szin: NAR, vastag: 2.6, cimke: "√x", cimkeX: 3.5 },
          ]}
          egyenesek={[{ m: 1, b: 0, szin: SZURKE, szaggatott: true, vastag: 1.3 }]}
          pontok={[
            { x: 1.6, y: 2.56, szin: TEAL, cimke: "(a; b)", dx: -52, dy: -8 },
            { x: 2.56, y: 1.6, szin: NAR, cimke: "(b; a)", dx: 9, dy: 16 },
          ]}
        >
          {(S) => (
            <line
              x1={S.px(1.6)}
              y1={S.py(2.56)}
              x2={S.px(2.56)}
              y2={S.py(1.6)}
              stroke={LILA}
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
          )}
        </FvRajz>
      </div>
    </div>
  );
}
