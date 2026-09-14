"use client";

/** Statikus SVG ábrák a Sorozatok modulhoz. A hosszabb magyarázat mindig a képaláírásba megy. */

const TEAL = "#0f766e";
const NAR = "#e2590a";
const LILA = "#7c3aed";
const SZURKE = "#94a3b8";
const SOTET = "#1d3c48";

function Tengely({ ox, oy, jobbra, fel, le, xCimke = "n", yCimke = "aₙ" }) {
  return (
    <g>
      <line x1={ox} y1={oy} x2={ox + jobbra} y2={oy} stroke="#64748b" strokeWidth="1.2" />
      <line x1={ox} y1={oy + le} x2={ox} y2={oy - fel} stroke="#64748b" strokeWidth="1.2" />
      <text x={ox + jobbra} y={oy - 6} textAnchor="end" fontSize="11" fontStyle="italic" fill={SOTET}>
        {xCimke}
      </text>
      <text x={ox - 4} y={oy - fel + 2} textAnchor="end" fontSize="11" fill={SOTET}>
        {yCimke}
      </text>
    </g>
  );
}

/** Torlódási pont kontra határérték: (−1)ⁿ és (−1)ⁿ/n. */
export function AbraTorlodas() {
  const N = 13;
  const bal = { ox: 52, oy: 135, sx: 14, sy: 46 };
  const jobb = { ox: 322, oy: 135, sx: 14, sy: 46 };
  const pont = (p, n, v) => [p.ox + n * p.sx, p.oy - v * p.sy];

  return (
    <svg viewBox="0 0 560 230" className="abra w-full">
      {/* bal panel: (−1)^n */}
      <text x={30} y={24} fontSize="13" fontWeight="700" fill={SOTET}>
        aₙ = (−1)ⁿ
      </text>
      <text x={30} y={41} fontSize="11" fill={SZURKE}>
        két torlódási pont — divergens
      </text>
      <Tengely ox={bal.ox} oy={bal.oy} jobbra={N * bal.sx + 16} fel={68} le={68} />
      {[1, -1].map((v) => (
        <g key={v}>
          <line
            x1={bal.ox}
            y1={bal.oy - v * bal.sy}
            x2={bal.ox + N * bal.sx + 8}
            y2={bal.oy - v * bal.sy}
            stroke={NAR}
            strokeWidth="1.3"
            strokeDasharray="4 3"
          />
          <text x={bal.ox - 7} y={bal.oy - v * bal.sy + 4} textAnchor="end" fontSize="10.5" fill={NAR}>
            {v === 1 ? "1" : "−1"}
          </text>
        </g>
      ))}
      {Array.from({ length: N }, (_, i) => i + 1).map((n) => {
        const [x, y] = pont(bal, n, n % 2 === 0 ? 1 : -1);
        return <circle key={n} cx={x} cy={y} r="4" fill={TEAL} stroke="white" strokeWidth="1.1" />;
      })}
      <text x={30} y={210} fontSize="11" fill={SOTET}>
        „Egy idő után mind közel” egyikre
      </text>
      <text x={30} y={224} fontSize="11" fill={SOTET}>
        sem igaz — nincs határérték.
      </text>

      {/* jobb panel: (−1)^n / n */}
      <text x={300} y={24} fontSize="13" fontWeight="700" fill={SOTET}>
        aₙ = (−1)ⁿ⁄n
      </text>
      <text x={300} y={41} fontSize="11" fill={SZURKE}>
        egy torlódási pont: a 0
      </text>
      <Tengely ox={jobb.ox} oy={jobb.oy} jobbra={N * jobb.sx + 16} fel={68} le={68} />
      <rect x={jobb.ox} y={jobb.oy - 15} width={N * jobb.sx + 8} height="30" fill={TEAL} opacity="0.13" />
      <line x1={jobb.ox} y1={jobb.oy} x2={jobb.ox + N * jobb.sx + 8} y2={jobb.oy} stroke={NAR} strokeWidth="1.5" />
      <text x={jobb.ox + N * jobb.sx + 12} y={jobb.oy + 22} fontSize="10.5" fontWeight="650" fill={NAR}>
        A = 0
      </text>
      <text x={jobb.ox - 7} y={jobb.oy - 15 + 4} textAnchor="end" fontSize="10" fill={TEAL}>
        +ε
      </text>
      <text x={jobb.ox - 7} y={jobb.oy + 15 + 4} textAnchor="end" fontSize="10" fill={TEAL}>
        −ε
      </text>
      {Array.from({ length: N }, (_, i) => i + 1).map((n) => {
        const [x, y] = pont(jobb, n, (n % 2 === 0 ? 1 : -1) / n);
        return <circle key={n} cx={x} cy={y} r="4" fill={TEAL} stroke="white" strokeWidth="1.1" />;
      })}
      <text x={300} y={210} fontSize="11" fill={SOTET}>
        A tagok oda-vissza ugrálva is beérnek
      </text>
      <text x={300} y={224} fontSize="11" fill={SOTET}>
        bármilyen keskeny sávba.
      </text>
    </svg>
  );
}

/** A rendőrelv: két becslő sorozat közrefogja a harmadikat. */
export function AbraRendorelv() {
  const OX = 58;
  const OY = 152;
  const SX = 27;
  const SY = 70;
  const N = 16;
  const A = 1;
  const px = (n) => OX + n * SX;
  const py = (v) => OY - v * SY;
  const b = (n) => 1 - 0.8 / (n + 0.5);
  const c = (n) => 1 + 1.1 / (n + 0.5);
  const a = (n) => 1 + (0.32 * Math.sin(n * 1.9) - 0.05) / (n + 0.5);

  const sor = Array.from({ length: N }, (_, i) => i + 1);
  const gorbe = (fn) => sor.map((n) => `${px(n)},${py(fn(n))}`).join(" ");

  return (
    <svg viewBox="0 0 540 185" className="abra w-full">
      <Tengely ox={OX} oy={OY} jobbra={N * SX + 30} fel={135} le={20} />
      <line x1={OX} y1={py(A)} x2={OX + N * SX + 22} y2={py(A)} stroke={NAR} strokeWidth="1.5" />
      <text x={OX + N * SX + 26} y={py(A) + 4} fontSize="11.5" fontWeight="650" fill={NAR}>
        A
      </text>
      <text x={OX - 7} y={py(A) + 4} textAnchor="end" fontSize="10.5" fill={NAR}>
        A
      </text>

      <polyline points={gorbe(c)} fill="none" stroke={LILA} strokeWidth="1.6" strokeDasharray="5 3" />
      <polyline points={gorbe(b)} fill="none" stroke={LILA} strokeWidth="1.6" strokeDasharray="5 3" />
      {sor.map((n) => (
        <g key={n}>
          <line x1={px(n)} y1={py(b(n))} x2={px(n)} y2={py(c(n))} stroke={LILA} strokeWidth="0.8" opacity="0.3" />
          <circle cx={px(n)} cy={py(c(n))} r="3" fill={LILA} />
          <circle cx={px(n)} cy={py(b(n))} r="3" fill={LILA} />
          <circle cx={px(n)} cy={py(a(n))} r="4" fill={TEAL} stroke="white" strokeWidth="1.2" />
        </g>
      ))}

      <text x={px(2) + 6} y={py(c(2)) - 10} fontSize="11.5" fontWeight="650" fill={LILA}>
        cₙ (felső rendőr)
      </text>
      <text x={px(2) + 6} y={py(b(2)) + 20} fontSize="11.5" fontWeight="650" fill={LILA}>
        bₙ (alsó rendőr)
      </text>
      <text
        x={px(11)}
        y={py(a(11)) - 13}
        fontSize="11.5"
        fontWeight="650"
        fill={TEAL}
        style={{ paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
      >
        aₙ (a közrefogott)
      </text>
    </svg>
  );
}

/** A mértani sorozat négy esete. */
export function AbraMertani() {
  const esetek = [
    { cim: "0 < q < 1", q: 0.7, szoveg: "qⁿ → 0", szin: TEAL },
    { cim: "−1 < q < 0", q: -0.7, szoveg: "qⁿ → 0 (váltakozva)", szin: TEAL },
    { cim: "q > 1", q: 1.28, szoveg: "qⁿ → +∞", szin: NAR },
    { cim: "q = −1", q: -1, szoveg: "nincs határérték", szin: "#e11d48" },
  ];
  const N = 11;
  const SX = 11;
  const SY = 26;

  return (
    <svg viewBox="0 0 540 250" className="abra w-full">
      {esetek.map((e, i) => {
        const ox = 56 + (i % 2) * 270;
        const oy = 86 + Math.floor(i / 2) * 128;
        return (
          <g key={e.cim}>
            <text x={ox - 22} y={oy - 62} fontSize="12.5" fontWeight="700" fill={SOTET}>
              {e.cim}
            </text>
            <text x={ox - 22} y={oy - 46} fontSize="11" fill={e.szin}>
              {e.szoveg}
            </text>
            <line x1={ox - 22} y1={oy} x2={ox + N * SX + 16} y2={oy} stroke="#64748b" strokeWidth="1.1" />
            <line x1={ox - 22} y1={oy + 36} x2={ox - 22} y2={oy - 38} stroke="#64748b" strokeWidth="1.1" />
            {Array.from({ length: N }, (_, k) => k + 1).map((n) => {
              const v = Math.max(-1.35, Math.min(1.35, Math.pow(e.q, n)));
              return (
                <g key={n}>
                  <line x1={ox + n * SX} y1={oy} x2={ox + n * SX} y2={oy - v * SY} stroke={e.szin} strokeWidth="0.9" opacity="0.4" />
                  <circle cx={ox + n * SX} cy={oy - v * SY} r="3.2" fill={e.szin} stroke="white" strokeWidth="0.9" />
                </g>
              );
            })}
            <text x={ox + N * SX + 20} y={oy + 4} fontSize="10.5" fontStyle="italic" fill={SZURKE}>
              n
            </text>
          </g>
        );
      })}
    </svg>
  );
}
