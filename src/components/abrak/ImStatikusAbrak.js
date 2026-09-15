"use client";

/** Statikus SVG ábrák az Improprius és numerikus integrálás modulhoz. */

const TEAL = "#0f766e";
const NAR = "#e2590a";
const LILA = "#7c3aed";
const SZURKE = "#94a3b8";
const SOTET = "#1d3c48";
const PIROS = "#dc2626";

/** Egyszerű skála: adattartomány → képpont (bal/jobb/fel/le a panel széle). */
function skala(xMin, xMax, yMin, yMax, bal, jobb, fel, le) {
  const px = (x) => bal + ((x - xMin) / (xMax - xMin)) * (jobb - bal);
  const py = (y) => le - ((y - yMin) / (yMax - yMin)) * (le - fel);
  return { px, py, bal, jobb, fel, le, xMin, xMax, yMin, yMax };
}

/** Görbe útvonala mintavételezéssel, a panelre vágva. */
function ut(fn, S, xTol, xIg, db = 220) {
  let d = "";
  let elozoVolt = false;
  for (let i = 0; i <= db; i++) {
    const x = xTol + ((xIg - xTol) * i) / db;
    const y = fn(x);
    if (!Number.isFinite(y) || y > S.yMax * 1.4 || y < S.yMin - (S.yMax - S.yMin) * 0.4) {
      elozoVolt = false;
      continue;
    }
    d += `${elozoVolt ? "L" : "M"}${S.px(x).toFixed(1)},${S.py(y).toFixed(1)} `;
    elozoVolt = true;
  }
  return d;
}

/** Kitöltött terület a görbe alatt (az x tengelyig). */
function terulet(fn, S, xTol, xIg, db = 160) {
  let d = `M${S.px(xTol).toFixed(1)},${S.py(0).toFixed(1)} `;
  for (let i = 0; i <= db; i++) {
    const x = xTol + ((xIg - xTol) * i) / db;
    const y = Math.min(fn(x), S.yMax * 1.05);
    if (!Number.isFinite(y)) continue;
    d += `L${S.px(x).toFixed(1)},${S.py(y).toFixed(1)} `;
  }
  d += `L${S.px(xIg).toFixed(1)},${S.py(0).toFixed(1)} Z`;
  return d;
}

function Tengely({ S, xCimke = "x", yCimke = "y" }) {
  return (
    <>
      <line x1={S.bal} y1={S.py(0)} x2={S.jobb + 10} y2={S.py(0)} stroke="#475569" strokeWidth="1.1" />
      <line x1={S.px(S.xMin)} y1={S.le} x2={S.px(S.xMin)} y2={S.fel - 8} stroke="#475569" strokeWidth="1.1" />
      <text x={S.jobb + 12} y={S.py(0) + 4} fontSize="10.5" fontStyle="italic" fill="#475569">
        {xCimke}
      </text>
      <text x={S.px(S.xMin) + 5} y={S.fel - 11} fontSize="10.5" fontStyle="italic" fill="#475569">
        {yCimke}
      </text>
    </>
  );
}

function Fejlec({ x, y, fo, mellek, szin = SOTET }) {
  return (
    <>
      <text x={x} y={y} fontSize="12.5" fontWeight="700" fill={szin} textAnchor="middle">
        {fo}
      </text>
      <text x={x} y={y + 15} fontSize="10.5" fill="#64748b" textAnchor="middle">
        {mellek}
      </text>
    </>
  );
}

/* ================================================================
   8.1 — a két típus egy képen
   ================================================================ */
export function AbraKetTipus() {
  const B = skala(0, 1.15, 0, 5, 50, 245, 78, 258);
  const J = skala(0, 6.4, 0, 1.25, 322, 522, 78, 258);
  const bal = (x) => 1 / Math.sqrt(x);
  const jobb = (x) => 1 / (x * x);

  return (
    <svg viewBox="0 0 560 300" className="abra w-full select-none">
      <Fejlec x={148} y={26} fo="I. típus" mellek="nem korlátos integrandus" />
      <Fejlec x={422} y={26} fo="II. típus" mellek="nem korlátos tartomány" />

      {/* ---------- bal panel ---------- */}
      <path d={terulet(bal, B, 0.09, 1)} fill={TEAL} fillOpacity="0.16" />
      <path d={ut(bal, B, 0.035, 1.15)} fill="none" stroke={TEAL} strokeWidth="2.4" strokeLinecap="round" />
      <Tengely S={B} />
      <line
        x1={B.px(0.09)}
        y1={B.py(0)}
        x2={B.px(0.09)}
        y2={B.py(bal(0.09))}
        stroke={PIROS}
        strokeWidth="1.3"
        strokeDasharray="4 3"
      />
      <line x1={B.px(1)} y1={B.py(0)} x2={B.px(1)} y2={B.py(1)} stroke={SZURKE} strokeWidth="1" strokeDasharray="3 3" />
      <text x={B.px(0.09)} y={B.py(0) + 15} fontSize="11" fill={PIROS} textAnchor="middle">
        c
      </text>
      <text x={B.px(1)} y={B.py(0) + 15} fontSize="11" fill="#64748b" textAnchor="middle">
        1
      </text>
      <text x={B.px(0.62)} y={B.py(1.55)} fontSize="12" fontWeight="650" fill={TEAL}>
        y = 1/√x
      </text>
      <text x={B.px(0.45)} y={B.py(0.6)} fontSize="11.5" fontWeight="650" fill={SOTET} textAnchor="middle">
        T = 2
      </text>
      <path
        d={`M${B.px(0.3)},${B.py(3.5)} L${B.px(0.12)},${B.py(3.5)}`}
        stroke={PIROS}
        strokeWidth="1.4"
        markerEnd="url(#im-hegy-piros)"
      />
      <text x={B.px(0.33)} y={B.py(3.5) + 4} fontSize="11" fill={PIROS}>
        c → 0
      </text>

      {/* ---------- jobb panel ---------- */}
      <path d={terulet(jobb, J, 1, 6.3)} fill={NAR} fillOpacity="0.18" />
      <path d={ut(jobb, J, 0.9, 6.4)} fill="none" stroke={NAR} strokeWidth="2.4" strokeLinecap="round" />
      <Tengely S={J} />
      <line x1={J.px(1)} y1={J.py(0)} x2={J.px(1)} y2={J.py(1)} stroke={SZURKE} strokeWidth="1" strokeDasharray="3 3" />
      <text x={J.px(1)} y={J.py(0) + 15} fontSize="11" fill="#64748b" textAnchor="middle">
        1
      </text>
      <text x={J.px(2.3)} y={J.py(0.72)} fontSize="12" fontWeight="650" fill={NAR}>
        y = 1/x²
      </text>
      <text x={J.px(1.55)} y={J.py(0.16)} fontSize="11.5" fontWeight="650" fill={SOTET} textAnchor="middle">
        T = 1
      </text>
      <path
        d={`M${J.px(4.4)},${J.py(0.62)} L${J.px(6.2)},${J.py(0.62)}`}
        stroke={PIROS}
        strokeWidth="1.4"
        markerEnd="url(#im-hegy-piros)"
      />
      <text x={J.px(4.3)} y={J.py(0.62) + 4} fontSize="11" fill={PIROS} textAnchor="end">
        d → ∞
      </text>

      <defs>
        <marker id="im-hegy-piros" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 9 5 L 0 9 z" fill={PIROS} />
        </marker>
      </defs>

      <text x={280} y={288} fontSize="11.5" fill="#64748b" textAnchor="middle">
        Mindkét esetben: állj meg a kritikus hely előtt, integrálj, és utána vedd a határértéket.
      </text>
    </svg>
  );
}

/* ================================================================
   8.4 — a paradoxon: 1/x és 1/x² felhalmozott területe
   ================================================================ */
export function AbraParadoxon() {
  const B = skala(0, 6.4, 0, 1.25, 48, 248, 74, 250);
  const J = skala(1, 20, 0, 3.2, 330, 524, 74, 250);
  const egyPer = (x) => 1 / x;
  const negyzet = (x) => 1 / (x * x);

  return (
    <svg viewBox="0 0 560 300" className="abra w-full select-none">
      <Fejlec x={148} y={24} fo="A két görbe" mellek="ránézésre alig különböznek" />
      <Fejlec x={427} y={24} fo="A felhalmozott terület 1-től d-ig" mellek="itt dől el minden" />

      {/* bal: a két görbe */}
      <path d={terulet(negyzet, B, 1, 6.3)} fill={TEAL} fillOpacity="0.14" />
      <path d={ut(egyPer, B, 0.85, 6.4)} fill="none" stroke={NAR} strokeWidth="2.4" />
      <path d={ut(negyzet, B, 0.95, 6.4)} fill="none" stroke={TEAL} strokeWidth="2.4" />
      <Tengely S={B} />
      <line x1={B.px(1)} y1={B.py(0)} x2={B.px(1)} y2={B.py(1.12)} stroke={SZURKE} strokeWidth="1" strokeDasharray="3 3" />
      <text x={B.px(1)} y={B.py(0) + 15} fontSize="11" fill="#64748b" textAnchor="middle">
        1
      </text>
      <text x={B.px(3.1)} y={B.py(0.45)} fontSize="12" fontWeight="650" fill={NAR}>
        1/x
      </text>
      <text x={B.px(2.5)} y={B.py(0.03)} fontSize="12" fontWeight="650" fill={TEAL}>
        1/x²
      </text>

      {/* jobb: a felhalmozott terület */}
      <path d={ut((d) => Math.log(d), J, 1, 20)} fill="none" stroke={NAR} strokeWidth="2.6" />
      <path d={ut((d) => 1 - 1 / d, J, 1, 20)} fill="none" stroke={TEAL} strokeWidth="2.6" />
      <line x1={J.px(1)} y1={J.py(1)} x2={J.px(20)} y2={J.py(1)} stroke={TEAL} strokeWidth="1.1" strokeDasharray="5 4" opacity="0.75" />
      <Tengely S={J} xCimke="d" yCimke="T(d)" />
      <text x={J.px(20) - 4} y={J.py(1) - 7} fontSize="11" fontWeight="650" fill={TEAL} textAnchor="end">
        1-hez tart
      </text>
      <text x={J.px(6.5)} y={J.py(2.7)} fontSize="12" fontWeight="650" fill={NAR}>
        ln d → ∞
      </text>
      <text x={J.px(13)} y={J.py(0.45)} fontSize="12" fontWeight="650" fill={TEAL}>
        1 − 1/d
      </text>
      {[5, 10, 15, 20].map((v) => (
        <text key={v} x={J.px(v)} y={J.py(0) + 15} fontSize="10.5" fill="#64748b" textAnchor="middle">
          {v}
        </text>
      ))}

      <text x={280} y={288} fontSize="11.5" fill="#64748b" textAnchor="middle">
        Nem az a kérdés, végtelen-e a tartomány, hanem az, milyen gyorsan fogy a függvény.
      </text>
    </svg>
  );
}

/* ================================================================
   8.5 — a p-kritérium két esete egy képen
   ================================================================ */
export function AbraPKriterium() {
  const B = skala(0, 1.15, 0, 5, 50, 245, 80, 250);
  const J = skala(0, 6.4, 0, 1.3, 322, 522, 80, 250);
  const gyok = (x) => 1 / Math.sqrt(x);
  const negyzet = (x) => 1 / (x * x);

  return (
    <svg viewBox="0 0 560 300" className="abra w-full select-none">
      <Fejlec x={148} y={26} fo="A nullában: p < 1 a jó" mellek="szelíden nőjön" />
      <Fejlec x={422} y={26} fo="A végtelenben: p > 1 a jó" mellek="gyorsan fogyjon" />

      {/* bal: 0 körül */}
      <path d={terulet(gyok, B, 0.02, 1)} fill="#10b981" fillOpacity="0.15" />
      <path d={ut(gyok, B, 0.035, 1.15)} fill="none" stroke="#047857" strokeWidth="2.4" />
      <path d={ut(negyzet, B, 0.45, 1.15)} fill="none" stroke={PIROS} strokeWidth="2.4" />
      <Tengely S={B} />
      <text x={B.px(0.42)} y={B.py(2.35)} fontSize="11.5" fontWeight="650" fill="#047857">
        1/√x ✓
      </text>
      <text x={B.px(0.55)} y={B.py(3.9)} fontSize="11.5" fontWeight="650" fill={PIROS}>
        1/x² ✗
      </text>
      <text x={B.px(0.55)} y={B.py(0.75)} fontSize="11" fill={SOTET} textAnchor="middle">
        ∫ = 2
      </text>
      <text x={B.px(1)} y={B.py(0) + 15} fontSize="11" fill="#64748b" textAnchor="middle">
        1
      </text>

      {/* jobb: ∞ felé */}
      <path d={terulet(negyzet, J, 1, 6.3)} fill="#10b981" fillOpacity="0.15" />
      <path d={ut(negyzet, J, 0.92, 6.4)} fill="none" stroke="#047857" strokeWidth="2.4" />
      <path d={ut(gyok, J, 0.8, 6.4)} fill="none" stroke={PIROS} strokeWidth="2.4" />
      <Tengely S={J} />
      <text x={J.px(3.8)} y={J.py(0.72)} fontSize="11.5" fontWeight="650" fill={PIROS}>
        1/√x ✗
      </text>
      <text x={J.px(2.6)} y={J.py(0.30)} fontSize="11.5" fontWeight="650" fill="#047857">
        1/x² ✓
      </text>
      <text x={J.px(1.12)} y={J.py(0.11)} fontSize="10.5" fill={SOTET}>
        ∫ = 1
      </text>
      <text x={J.px(1)} y={J.py(0) + 15} fontSize="11" fill="#64748b" textAnchor="middle">
        1
      </text>

      <text x={280} y={286} fontSize="11.5" fill="#64748b" textAnchor="middle">
        Ugyanaz a két görbe, két különböző tartományon — a szerepük pontosan felcserélődik.
      </text>
    </svg>
  );
}

/* ================================================================
   8.10 — a trapéz és a parabola elve egy részintervallumon
   ================================================================ */
export function AbraTrapezElv() {
  const B = skala(0.9, 2.1, 0, 1.15, 52, 250, 60, 240);
  const J = skala(0.9, 2.1, 0, 1.15, 326, 524, 60, 240);
  const f = (x) => 1 / x;

  const hur = (x1, x2) => {
    const S = B;
    return `M${S.px(x1)},${S.py(f(x1))} L${S.px(x2)},${S.py(f(x2))}`;
  };

  // a hiba (a húr és a görbe közötti terület) az [1; 2] szakaszon
  let hibaUt = `M${B.px(1)},${B.py(f(1))} `;
  for (let i = 0; i <= 80; i++) {
    const x = 1 + i / 80;
    hibaUt += `L${B.px(x).toFixed(1)},${B.py(f(x)).toFixed(1)} `;
  }
  hibaUt += `L${B.px(2)},${B.py(f(2))} Z`;

  // parabola a három ponton (1; 1,5; 2)
  const p0 = f(1);
  const p1 = f(1.5);
  const p2 = f(2);
  const par = (x) => {
    const t = x - 1.5;
    const a = (p0 - 2 * p1 + p2) / (2 * 0.25);
    const b = (p2 - p0) / (2 * 0.5);
    return a * t * t + b * t + p1;
  };
  let parUt = "";
  for (let i = 0; i <= 120; i++) {
    const x = 1 + i / 120;
    parUt += `${i ? "L" : "M"}${J.px(x).toFixed(1)},${J.py(par(x)).toFixed(1)} `;
  }

  return (
    <svg viewBox="0 0 560 290" className="abra w-full select-none">
      <Fejlec x={151} y={26} fo="Trapéz: húr" mellek="a hiba a húr és a görbe közt" />
      <Fejlec x={425} y={26} fo="Simpson: parabola" mellek="a hiba szabad szemmel nem látszik" />

      {/* bal: húr */}
      <path d={hibaUt} fill={PIROS} fillOpacity="0.22" />
      <path
        d={`M${B.px(1)},${B.py(0)} L${B.px(1)},${B.py(p0)} L${B.px(2)},${B.py(p2)} L${B.px(2)},${B.py(0)} Z`}
        fill={NAR}
        fillOpacity="0.1"
      />
      <path d={ut(f, B, 0.9, 2.1)} fill="none" stroke={TEAL} strokeWidth="2.4" />
      <path d={hur(1, 2)} stroke={NAR} strokeWidth="2.2" fill="none" />
      <Tengely S={B} />
      {[1, 2].map((v) => (
        <g key={v}>
          <line x1={B.px(v)} y1={B.py(0)} x2={B.px(v)} y2={B.py(f(v))} stroke={SZURKE} strokeWidth="1" strokeDasharray="3 3" />
          <circle cx={B.px(v)} cy={B.py(f(v))} r="3.6" fill={NAR} stroke="white" strokeWidth="1.2" />
          <text x={B.px(v)} y={B.py(0) + 15} fontSize="11" fill="#64748b" textAnchor="middle">
            {v === 1 ? "xᵢ₋₁" : "xᵢ"}
          </text>
        </g>
      ))}
      <text x={B.px(1.5)} y={B.py(0.83)} fontSize="11" fontWeight="650" fill={PIROS} textAnchor="middle">
        hiba
      </text>
      <text x={B.px(1.95)} y={B.py(0.95)} fontSize="11.5" fontWeight="650" fill={TEAL} textAnchor="end">
        y = 1/x
      </text>

      {/* jobb: parabola */}
      <path
        d={`M${J.px(1)},${J.py(0)} ${parUt.replace(/^M/, "L")} L${J.px(2)},${J.py(0)} Z`}
        fill={LILA}
        fillOpacity="0.12"
      />
      <path d={ut(f, J, 0.9, 2.1)} fill="none" stroke={TEAL} strokeWidth="3.2" opacity="0.35" />
      <path d={parUt} fill="none" stroke={LILA} strokeWidth="2.2" strokeDasharray="6 3" />
      <Tengely S={J} />
      {[1, 1.5, 2].map((v) => (
        <g key={v}>
          <line x1={J.px(v)} y1={J.py(0)} x2={J.px(v)} y2={J.py(f(v))} stroke={SZURKE} strokeWidth="1" strokeDasharray="3 3" />
          <circle cx={J.px(v)} cy={J.py(f(v))} r="3.6" fill={LILA} stroke="white" strokeWidth="1.2" />
          <text x={J.px(v)} y={J.py(0) + 15} fontSize="11" fill="#64748b" textAnchor="middle">
            {v === 1 ? "xᵢ₋₁" : v === 1.5 ? "xᵢ" : "xᵢ₊₁"}
          </text>
        </g>
      ))}
      <text x={J.px(1.62)} y={J.py(0.87)} fontSize="11.5" fontWeight="650" fill={LILA}>
        parabola
      </text>

      <text x={280} y={278} fontSize="11.5" fill="#64748b" textAnchor="middle">
        A húrhoz két pont kell, a parabolához három — ezért fog össze kettőt a Simpson.
      </text>
    </svg>
  );
}
