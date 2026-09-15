"use client";

/** Statikus SVG ábrák a Differenciálszámítás modulhoz. A hosszabb magyarázat mindig a képaláírásba megy. */

const TEAL = "#0f766e";
const NAR = "#e2590a";
const LILA = "#7c3aed";
const SZURKE = "#94a3b8";
const SOTET = "#1d3c48";
const PIROS = "#dc2626";

/** Egyszerű skála-gyár: adattartomány → képpont. */
function skala(xMin, xMax, yMin, yMax, bal, jobb, fel, le) {
  const px = (x) => bal + ((x - xMin) / (xMax - xMin)) * (jobb - bal);
  const py = (y) => le - ((y - yMin) / (yMax - yMin)) * (le - fel);
  return { px, py };
}

/** Görbe útvonala mintavételezéssel. */
function ut(fn, S, xTol, xIg, db = 160) {
  let d = "";
  let elso = true;
  for (let i = 0; i <= db; i++) {
    const x = xTol + ((xIg - xTol) * i) / db;
    const y = fn(x);
    if (!Number.isFinite(y)) {
      elso = true;
      continue;
    }
    d += `${elso ? "M" : "L"}${S.px(x).toFixed(1)},${S.py(y).toFixed(1)} `;
    elso = false;
  }
  return d;
}

function Tengely({ ox, oy, jobbra, fel, le = 0, bal = 0, xCimke = "x", yCimke = "y" }) {
  return (
    <g>
      <line x1={ox - bal} y1={oy} x2={ox + jobbra} y2={oy} stroke="#64748b" strokeWidth="1.2" />
      <line x1={ox} y1={oy + le} x2={ox} y2={oy - fel} stroke="#64748b" strokeWidth="1.2" />
      <text x={ox + jobbra} y={oy - 6} textAnchor="end" fontSize="11" fontStyle="italic" fill={SOTET}>
        {xCimke}
      </text>
      <text x={ox - 5} y={oy - fel + 3} textAnchor="end" fontSize="11" fontStyle="italic" fill={SOTET}>
        {yCimke}
      </text>
    </g>
  );
}

/* ================= 5.1 — a szelőből érintő ================= */

export function AbraSzeloErinto() {
  const S = skala(-0.4, 5.6, -0.5, 5.6, 44, 520, 34, 300);
  const f = (x) => (x * x) / 5;
  const x0 = 1.5;
  const y0 = f(x0);
  const P = [S.px(x0), S.py(y0)];

  // három szelő, egyre közelebbi második ponttal
  const masodik = [5, 3.4, 2.4];
  const szinek = ["#cbd5e1", "#94a3b8", "#64748b"];

  const egyenes = (m, tol, ig) => {
    const y1 = y0 + m * (tol - x0);
    const y2 = y0 + m * (ig - x0);
    return { x1: S.px(tol), y1: S.py(y1), x2: S.px(ig), y2: S.py(y2) };
  };

  return (
    <svg viewBox="0 0 560 340" className="abra w-full">
      <Tengely ox={S.px(0)} oy={S.py(0)} jobbra={520 - S.px(0)} fel={S.py(0) - 30} le={16} bal={S.px(0) - 40} />

      {/* szelők */}
      {masodik.map((x1, i) => {
        const m = (f(x1) - y0) / (x1 - x0);
        const e = egyenes(m, 0.7, 5.5);
        return (
          <g key={x1}>
            <line x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke={szinek[i]} strokeWidth="1.8" />
            <circle cx={S.px(x1)} cy={S.py(f(x1))} r="4" fill={szinek[i]} stroke="white" strokeWidth="1.4" />
          </g>
        );
      })}

      {/* érintő */}
      {(() => {
        const e = egyenes(2 * x0 / 5, 0.1, 5.3);
        return <line x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke={NAR} strokeWidth="2.6" />;
      })()}

      {/* a görbe */}
      <path d={ut(f, S, -0.3, 5.4)} fill="none" stroke={TEAL} strokeWidth="2.8" strokeLinecap="round" />

      {/* az érintési pont */}
      <circle cx={P[0]} cy={P[1]} r="5.5" fill={NAR} stroke="white" strokeWidth="2" />

      {/* feliratok — mind fehér kontúrral, hogy a vonalakon is olvashatók legyenek */}
      {[
        { x: P[0] - 12, y: P[1] - 14, h: "end", sz: NAR, m: 12.5, t: "P(x₀; f(x₀))" },
        { x: S.px(5) + 8, y: S.py(f(5)) - 6, h: "start", sz: "#64748b", m: 12, t: "Q₁" },
        { x: S.px(3.4) + 8, y: S.py(f(3.4)) - 4, h: "start", sz: "#64748b", m: 12, t: "Q₂" },
        { x: S.px(2.4) + 9, y: S.py(f(2.4)) + 4, h: "start", sz: "#64748b", m: 12, t: "Q₃" },
        { x: 120, y: 60, h: "start", sz: "#64748b", m: 12.5, t: "szelők: Q → P" },
        { x: 120, y: 78, h: "start", sz: SZURKE, m: 11.5, t: "meredekség = Δy / Δx" },
        { x: 120, y: 322, h: "start", sz: NAR, m: 12.5, t: "érintő: a szelők határhelyzete" },
        { x: S.px(5.4), y: S.py(f(5.4)) - 14, h: "end", sz: TEAL, m: 12.5, t: "y = f(x)" },
      ].map((c) => (
        <text
          key={c.t}
          x={c.x}
          y={c.y}
          textAnchor={c.h}
          fontSize={c.m}
          fontWeight="700"
          style={{ fill: c.sz, paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
        >
          {c.t}
        </text>
      ))}
    </svg>
  );
}

/* ================= 5.3 — három „rossz” eset ================= */

export function AbraNemDiff() {
  const panelek = [
    {
      cim: "Szakadás",
      alcim: "nem is folytonos",
      rajz: (S) => (
        <>
          <path d={ut((x) => (x < 0 ? x + 1 : x - 1), S, -1.8, -0.02, 60)} fill="none" stroke={TEAL} strokeWidth="2.6" />
          <path d={ut((x) => x - 1, S, 0.02, 1.8, 60)} fill="none" stroke={TEAL} strokeWidth="2.6" />
          <circle cx={S.px(0)} cy={S.py(1)} r="4" fill="white" stroke={TEAL} strokeWidth="2" />
          <circle cx={S.px(0)} cy={S.py(-1)} r="4" fill={TEAL} stroke="white" strokeWidth="1.5" />
        </>
      ),
    },
    {
      cim: "Csúcs",
      alcim: "két különböző meredekség",
      rajz: (S) => (
        <>
          <path d={ut((x) => Math.abs(x) - 0.9, S, -1.8, 1.8, 80)} fill="none" stroke={TEAL} strokeWidth="2.6" />
          <line x1={S.px(-1.5)} y1={S.py(0.6)} x2={S.px(0)} y2={S.py(-0.9)} stroke={NAR} strokeWidth="1.6" strokeDasharray="5 3" />
          <line x1={S.px(0)} y1={S.py(-0.9)} x2={S.px(1.5)} y2={S.py(0.6)} stroke={LILA} strokeWidth="1.6" strokeDasharray="5 3" />
          <circle cx={S.px(0)} cy={S.py(-0.9)} r="4.5" fill={PIROS} stroke="white" strokeWidth="1.6" />
        </>
      ),
    },
    {
      cim: "Függőleges érintő",
      alcim: "nincs meredeksége",
      rajz: (S) => (
        <>
          <path
            d={ut((x) => Math.cbrt(x) * 1.15, S, -1.8, 1.8, 200)}
            fill="none"
            stroke={TEAL}
            strokeWidth="2.6"
          />
          <line x1={S.px(0)} y1={S.py(-1.7)} x2={S.px(0)} y2={S.py(1.7)} stroke={NAR} strokeWidth="1.8" strokeDasharray="5 3" />
          <circle cx={S.px(0)} cy={S.py(0)} r="4.5" fill={PIROS} stroke="white" strokeWidth="1.6" />
        </>
      ),
    },
  ];

  return (
    <svg viewBox="0 0 560 235" className="abra w-full">
      {panelek.map((p, i) => {
        const bal = 18 + i * 182;
        const S = skala(-2, 2, -2, 2, bal + 14, bal + 158, 62, 200);
        return (
          <g key={p.cim}>
            <text x={bal + 86} y={26} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={SOTET}>
              {p.cim}
            </text>
            <text x={bal + 86} y={43} textAnchor="middle" fontSize="10.5" fill={SZURKE}>
              {p.alcim}
            </text>
            <rect
              x={bal + 8}
              y={56}
              width={156}
              height={150}
              rx="10"
              fill="white"
              stroke="#e2e8f0"
              strokeWidth="1"
            />
            <line x1={S.px(-2)} y1={S.py(0)} x2={S.px(2)} y2={S.py(0)} stroke="#cbd5e1" strokeWidth="1" />
            <line x1={S.px(0)} y1={S.py(-2)} x2={S.px(0)} y2={S.py(2)} stroke="#cbd5e1" strokeWidth="1" />
            {p.rajz(S)}
            <text x={bal + 86} y={224} textAnchor="middle" fontSize="11" fontWeight="650" fill={PIROS}>
              {i === 0 ? "x = 0: nincs derivált" : i === 1 ? "|x|: nincs derivált" : "∛x: nincs derivált"}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ================= 5.8 — Rolle és Lagrange ================= */

export function AbraKozepertek() {
  const f = (x) => -0.55 * (x - 1) * (x - 1) * (x - 4) + 1.2;
  // f'(x) = -1.65x² + 6.6x - 4.95 — a ξ helyeket ebből másodfokú megoldóképlettel kapjuk

  return (
    <svg viewBox="0 0 560 260" className="abra w-full">
      {/* ---- bal: Rolle ---- */}
      {(() => {
        const S = skala(-0.3, 4.6, -0.6, 4.6, 40, 250, 44, 210);
        // f(a) = f(b) nem teljesül a jobb oldali függvényre; ezért Rolle-hoz saját parabolát használunk
        const g = (x) => 3.4 - 1.1 * (x - 2) * (x - 2);
        const c = 2;
        return (
          <g>
            <text x={145} y={24} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={SOTET}>
              Rolle: f(a) = f(b)
            </text>
            <Tengely ox={S.px(0)} oy={S.py(0)} jobbra={250 - S.px(0)} fel={S.py(0) - 40} le={10} bal={8} />
            <path d={ut(g, S, 0.15, 3.9)} fill="none" stroke={TEAL} strokeWidth="2.6" />
            <line x1={S.px(0.6)} y1={S.py(g(0.6))} x2={S.px(3.4)} y2={S.py(g(3.4))} stroke={SZURKE} strokeWidth="1.6" strokeDasharray="5 3" />
            <line x1={S.px(1)} y1={S.py(g(c))} x2={S.px(3)} y2={S.py(g(c))} stroke={NAR} strokeWidth="2.4" />
            <circle cx={S.px(0.6)} cy={S.py(g(0.6))} r="4.5" fill={SZURKE} stroke="white" strokeWidth="1.5" />
            <circle cx={S.px(3.4)} cy={S.py(g(3.4))} r="4.5" fill={SZURKE} stroke="white" strokeWidth="1.5" />
            <circle cx={S.px(c)} cy={S.py(g(c))} r="5" fill={NAR} stroke="white" strokeWidth="1.8" />
            <text x={S.px(0.6)} y={S.py(0) + 15} textAnchor="middle" fontSize="11.5" fill={SOTET}>
              a
            </text>
            <text x={S.px(3.4)} y={S.py(0) + 15} textAnchor="middle" fontSize="11.5" fill={SOTET}>
              b
            </text>
            <text x={S.px(c)} y={S.py(0) + 15} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={NAR}>
              c
            </text>
            <text x={S.px(c)} y={S.py(g(c)) - 12} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={NAR}>
              f′(c) = 0
            </text>
          </g>
        );
      })()}

      {/* ---- jobb: Lagrange ---- */}
      {(() => {
        const S = skala(-0.3, 4.6, -0.6, 4.6, 320, 530, 44, 210);
        const a = 0.4;
        const b = 3.2;
        const m = (f(b) - f(a)) / (b - a);
        // a ξ helyek: fv(x) = m
        const A = -1.65;
        const B = 6.6;
        const C = -4.95 - m;
        const D = Math.sqrt(B * B - 4 * A * C);
        const xi1 = (-B + D) / (2 * A);
        const xi2 = (-B - D) / (2 * A);
        const xi = xi1 > a && xi1 < b ? xi1 : xi2;
        return (
          <g>
            <text x={425} y={24} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={SOTET}>
              Lagrange: érintő ∥ húr
            </text>
            <Tengely ox={S.px(0)} oy={S.py(0)} jobbra={530 - S.px(0)} fel={S.py(0) - 40} le={10} bal={8} />
            <path d={ut(f, S, 0.05, 4.3)} fill="none" stroke={TEAL} strokeWidth="2.6" />
            <line x1={S.px(a)} y1={S.py(f(a))} x2={S.px(b)} y2={S.py(f(b))} stroke={LILA} strokeWidth="2.2" />
            <line
              x1={S.px(xi - 1.3)}
              y1={S.py(f(xi) - 1.3 * m)}
              x2={S.px(xi + 1.3)}
              y2={S.py(f(xi) + 1.3 * m)}
              stroke={NAR}
              strokeWidth="2.4"
            />
            <circle cx={S.px(a)} cy={S.py(f(a))} r="4.5" fill={LILA} stroke="white" strokeWidth="1.5" />
            <circle cx={S.px(b)} cy={S.py(f(b))} r="4.5" fill={LILA} stroke="white" strokeWidth="1.5" />
            <circle cx={S.px(xi)} cy={S.py(f(xi))} r="5" fill={NAR} stroke="white" strokeWidth="1.8" />
            <text x={S.px(a)} y={S.py(0) + 15} textAnchor="middle" fontSize="11.5" fill={SOTET}>
              a
            </text>
            <text x={S.px(b)} y={S.py(0) + 15} textAnchor="middle" fontSize="11.5" fill={SOTET}>
              b
            </text>
            <text x={S.px(xi)} y={S.py(0) + 15} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={NAR}>
              ξ
            </text>
          </g>
        );
      })()}

      <text x={145} y={236} textAnchor="middle" fontSize="11" fill={SZURKE}>
        narancs: vízszintes érintő
      </text>
      <text x={425} y={236} textAnchor="middle" fontSize="11" fill={SZURKE}>
        lila: húr · narancs: érintő a ξ helyen
      </text>
    </svg>
  );
}

/* ================= 5.12 — a differenciál ================= */

export function AbraDifferencial() {
  const S = skala(-0.2, 3.4, -0.3, 4.3, 70, 430, 40, 300);
  const f = (x) => 0.42 * x * x + 0.35;
  const x0 = 1.2;
  const dx = 1.5;
  const y0 = f(x0);
  const m = 0.84 * x0;
  const yErinto = y0 + m * dx;
  const yValodi = f(x0 + dx);

  return (
    <svg viewBox="0 0 560 340" className="abra w-full">
      <Tengely ox={S.px(0)} oy={S.py(0)} jobbra={440 - S.px(0)} fel={S.py(0) - 34} le={14} bal={26} />

      {/* görbe és érintő */}
      <path d={ut(f, S, -0.15, 3.3)} fill="none" stroke={TEAL} strokeWidth="2.8" />
      <line
        x1={S.px(0.1)}
        y1={S.py(y0 + m * (0.1 - x0))}
        x2={S.px(3.2)}
        y2={S.py(y0 + m * (3.2 - x0))}
        stroke={NAR}
        strokeWidth="2.4"
      />

      {/* segédvonalak */}
      <line x1={S.px(x0)} y1={S.py(y0)} x2={S.px(x0 + dx)} y2={S.py(y0)} stroke={SZURKE} strokeWidth="1.4" strokeDasharray="4 3" />
      <line x1={S.px(x0 + dx)} y1={S.py(y0)} x2={S.px(x0 + dx)} y2={S.py(yValodi)} stroke={SZURKE} strokeWidth="1.4" strokeDasharray="4 3" />
      <line x1={S.px(x0)} y1={S.py(y0)} x2={S.px(x0)} y2={S.py(0)} stroke={SZURKE} strokeWidth="1" strokeDasharray="3 3" />

      {/* dy és Δy szakaszok */}
      <line x1={S.px(x0 + dx) - 12} y1={S.py(y0)} x2={S.px(x0 + dx) - 12} y2={S.py(yErinto)} stroke={NAR} strokeWidth="3.2" strokeLinecap="round" />
      <line x1={S.px(x0 + dx) + 12} y1={S.py(y0)} x2={S.px(x0 + dx) + 12} y2={S.py(yValodi)} stroke={LILA} strokeWidth="3.2" strokeLinecap="round" />
      <line x1={S.px(x0 + dx)} y1={S.py(yErinto)} x2={S.px(x0 + dx)} y2={S.py(yValodi)} stroke={PIROS} strokeWidth="3.6" strokeLinecap="round" />

      {/* pontok */}
      <circle cx={S.px(x0)} cy={S.py(y0)} r="5" fill={NAR} stroke="white" strokeWidth="1.8" />
      <circle cx={S.px(x0 + dx)} cy={S.py(yValodi)} r="5" fill={LILA} stroke="white" strokeWidth="1.8" />
      <circle cx={S.px(x0 + dx)} cy={S.py(yErinto)} r="4" fill="white" stroke={NAR} strokeWidth="2" />

      {/* feliratok — rövidek, fehér kontúrral, hogy ne fedjék a vonalakat */}
      {[
        { x: S.px(x0), y: S.py(0) + 16, h: "middle", sz: SOTET, m: 11.5, t: "x₀" },
        { x: S.px(x0 + dx), y: S.py(0) + 16, h: "middle", sz: SOTET, m: 11.5, t: "x₀ + Δx" },
        { x: S.px(x0 + dx / 2), y: S.py(y0) + 17, h: "middle", sz: SZURKE, m: 12, t: "Δx = dx" },
        {
          x: S.px(x0 + dx) - 20,
          y: (S.py(y0) + S.py(yErinto)) / 2 + 4,
          h: "end",
          sz: NAR,
          m: 12.5,
          t: "dy",
        },
        {
          x: S.px(x0 + dx) + 20,
          y: (S.py(y0) + S.py(yValodi)) / 2 + 26,
          h: "start",
          sz: LILA,
          m: 12.5,
          t: "Δy",
        },
        {
          x: S.px(x0 + dx) + 20,
          y: (S.py(yErinto) + S.py(yValodi)) / 2 + 4,
          h: "start",
          sz: PIROS,
          m: 12,
          t: "hiba",
        },
        { x: S.px(3.15) + 5, y: S.py(y0 + m * (3.15 - x0)) - 6, h: "start", sz: NAR, m: 12, t: "érintő" },
        { x: S.px(3.05) + 6, y: S.py(f(3.05)) + 4, h: "start", sz: TEAL, m: 12, t: "y = f(x)" },
        { x: 62, y: 26, h: "start", sz: SOTET, m: 12, t: "dy = f′(x₀)·dx — az érintő menti változás" },
      ].map((c) => (
        <text
          key={c.t}
          x={c.x}
          y={c.y}
          textAnchor={c.h}
          fontSize={c.m}
          fontWeight="700"
          style={{ fill: c.sz, paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
        >
          {c.t}
        </text>
      ))}
    </svg>
  );
}
