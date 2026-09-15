"use client";

import { sz } from "@/lib/szamok";

/**
 * Függvénygrafikon-rajzoló (közös segéd a Függvények és a Deriválás modulhoz).
 *
 *   <FvRajz xMin={-4} xMax={4} yMin={-3} yMax={3}
 *           gorbek={[{ fn: (x) => Math.sin(x), szin: "#0f766e", cimke: "sin x" }]}
 *           pontok={[{ x: 1, y: Math.sin(1), szin: "#e2590a", cimke: "P" }]}
 *           egyenesek={[{ m: Math.cos(1), b: Math.sin(1) - Math.cos(1), szin: "#e2590a", szaggatott: true }]}
 *           fuggoleges={[{ x: 2, szin: "#dc2626" }]} vizszintes={[{ y: 1 }]}>
 *     {(S) => <circle cx={S.px(0)} cy={S.py(0)} r="3" />}
 *   </FvRajz>
 *
 * A `children` lehet JSX vagy egy függvény, amely megkapja a skálát (S.px, S.py, S.xMin …), így
 * tetszőleges saját SVG-elem rajzolható a grafikonra. A görbék NaN-nál és ugrásnál megszakadnak
 * (szakadás, aszimptota), ezért a tg x vagy az 1/x is helyesen rajzolódik.
 */

const MARGO = { bal: 44, jobb: 16, fel: 18, le: 32 };

/** Szép osztásköz: 1, 2, 5 · 10^k úgy, hogy 4–9 osztás legyen. */
export function szepLepes(terjedelem, cel = 6) {
  if (!(terjedelem > 0)) return 1;
  const nyers = terjedelem / cel;
  const hatv = Math.pow(10, Math.floor(Math.log10(nyers)));
  const m = nyers / hatv;
  const k = m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10;
  return k * hatv;
}

/** Skála: adat → képpont leképezés. */
export function fvSkala({
  xMin,
  xMax,
  yMin,
  yMax,
  szelesseg = 560,
  magassag = 380,
  margo = MARGO,
}) {
  const w = szelesseg - margo.bal - margo.jobb;
  const h = magassag - margo.fel - margo.le;
  const px = (x) => margo.bal + ((x - xMin) / (xMax - xMin)) * w;
  const py = (y) => margo.fel + h - ((y - yMin) / (yMax - yMin)) * h;
  const xBol = (X) => xMin + ((X - margo.bal) / w) * (xMax - xMin);
  const yBol = (Y) => yMin + ((margo.fel + h - Y) / h) * (yMax - yMin);
  return {
    xMin,
    xMax,
    yMin,
    yMax,
    szelesseg,
    magassag,
    margo,
    w,
    h,
    px,
    py,
    xBol,
    yBol,
  };
}

/** Mintavétel: a görbe darabjai (szakadásnál új darab). */
export function mintavetel(
  fn,
  xMin,
  xMax,
  { db = 480, yMin = -1e9, yMax = 1e9 } = {},
) {
  const darabok = [];
  let akt = [];
  let elozo = null;
  const ugras = (yMax - yMin) * 1.5;
  for (let i = 0; i <= db; i++) {
    const x = xMin + ((xMax - xMin) * i) / db;
    let y;
    try {
      y = fn(x);
    } catch {
      y = NaN;
    }
    if (typeof y !== "number" || !Number.isFinite(y)) {
      if (akt.length > 1) darabok.push(akt);
      akt = [];
      elozo = null;
      continue;
    }
    if (elozo !== null && Math.abs(y - elozo) > ugras) {
      if (akt.length > 1) darabok.push(akt);
      akt = [];
    }
    // a képen kívüli értékeket levágjuk, hogy a vonal ne szaladjon ki
    const yk = Math.max(
      yMin - (yMax - yMin),
      Math.min(yMax + (yMax - yMin), y),
    );
    akt.push({ x, y: yk });
    elozo = y;
  }
  if (akt.length > 1) darabok.push(akt);
  return darabok;
}

function autoTartomany(gorbek, xMin, xMax) {
  const ertekek = [];
  for (const g of gorbek) {
    const a = g.tol ?? xMin;
    const b = g.ig ?? xMax;
    for (let i = 0; i <= 200; i++) {
      const x = a + ((b - a) * i) / 200;
      let y;
      try {
        y = g.fn(x);
      } catch {
        y = NaN;
      }
      if (Number.isFinite(y)) ertekek.push(y);
    }
  }
  if (ertekek.length === 0) return [-5, 5];
  ertekek.sort((p, q) => p - q);
  // a szélső 3 %-ot elhagyjuk (aszimptoták), aztán ráhagyás
  const lo = ertekek[Math.floor(ertekek.length * 0.03)];
  const hi = ertekek[Math.ceil(ertekek.length * 0.97) - 1];
  let yMin = Math.min(lo, 0);
  let yMax = Math.max(hi, 0);
  if (yMax - yMin < 1e-9) {
    yMin -= 1;
    yMax += 1;
  }
  const pad = (yMax - yMin) * 0.1;
  return [yMin - pad, yMax + pad];
}

export default function FvRajz({
  xMin = -5,
  xMax = 5,
  yMin,
  yMax,
  gorbek = [],
  pontok = [],
  egyenesek = [],
  fuggoleges = [],
  vizszintes = [],
  tengelyCimkek = { x: "x", y: "y" },
  racs = true,
  szelesseg = 560,
  magassag = 380,
  className = "abra w-full select-none",
  svgRef,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  children,
}) {
  let y0 = yMin;
  let y1 = yMax;
  if (y0 === undefined || y1 === undefined) {
    const [a, b] = autoTartomany(gorbek, xMin, xMax);
    if (y0 === undefined) y0 = a;
    if (y1 === undefined) y1 = b;
  }
  const S = fvSkala({ xMin, xMax, yMin: y0, yMax: y1, szelesseg, magassag });
  const lx = szepLepes(xMax - xMin, Math.max(4, Math.round(S.w / 75)));
  const ly = szepLepes(y1 - y0, Math.max(3, Math.round(S.h / 55)));
  const xOsztasok = [];
  for (let v = Math.ceil(xMin / lx) * lx; v <= xMax + 1e-9; v += lx)
    xOsztasok.push(Math.round(v / lx) * lx);
  const yOsztasok = [];
  for (let v = Math.ceil(y0 / ly) * ly; v <= y1 + 1e-9; v += ly)
    yOsztasok.push(Math.round(v / ly) * ly);

  const xTengelyY = S.py(Math.min(Math.max(0, y0), y1));
  const yTengelyX = S.px(Math.min(Math.max(0, xMin), xMax));
  const xTengelyLent = y0 >= 0; // ha nincs 0 a tartományban, alul/felül fut a tengely

  const utvonal = (darab) =>
    darab
      .map(
        (p, i) =>
          `${i ? "L" : "M"}${S.px(p.x).toFixed(1)},${S.py(p.y).toFixed(1)}`,
      )
      .join(" ");

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${szelesseg} ${magassag}`}
      className={className}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <defs>
        <clipPath id="fv-vago">
          <rect x={S.margo.bal} y={S.margo.fel} width={S.w} height={S.h} />
        </clipPath>
        <marker
          id="fv-hegy"
          viewBox="0 0 10 10"
          refX="8.5"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 9 5 L 0 9 z" fill="#475569" />
        </marker>
      </defs>

      {/* rács */}
      {racs &&
        xOsztasok.map((v) => (
          <line
            key={`gx${v}`}
            x1={S.px(v)}
            y1={S.margo.fel}
            x2={S.px(v)}
            y2={S.margo.fel + S.h}
            stroke="#e2e8f0"
            strokeWidth="0.8"
          />
        ))}
      {racs &&
        yOsztasok.map((v) => (
          <line
            key={`gy${v}`}
            x1={S.margo.bal}
            y1={S.py(v)}
            x2={S.margo.bal + S.w}
            y2={S.py(v)}
            stroke="#e2e8f0"
            strokeWidth="0.8"
          />
        ))}

      {/* tengelyek */}
      <line
        x1={S.margo.bal}
        y1={xTengelyY}
        x2={S.margo.bal + S.w + 6}
        y2={xTengelyY}
        stroke="#475569"
        strokeWidth="1.2"
        markerEnd="url(#fv-hegy)"
      />
      <line
        x1={yTengelyX}
        y1={S.margo.fel + S.h}
        x2={yTengelyX}
        y2={S.margo.fel - 6}
        stroke="#475569"
        strokeWidth="1.2"
        markerEnd="url(#fv-hegy)"
      />
      <text
        x={S.margo.bal + S.w + 2}
        y={xTengelyY - 7}
        fontSize="12"
        fontStyle="italic"
        fill="#475569"
        textAnchor="end"
      >
        {tengelyCimkek.x}
      </text>
      <text
        x={yTengelyX + 8}
        y={S.margo.fel + 4}
        fontSize="12"
        fontStyle="italic"
        fill="#475569"
      >
        {tengelyCimkek.y}
      </text>
      {xOsztasok.map((v) =>
        Math.abs(v) < 1e-9 ? null : (
          <text
            key={`tx${v}`}
            x={S.px(v)}
            y={xTengelyY + (xTengelyLent ? -6 : 14)}
            fontSize="10.5"
            fill="#64748b"
            textAnchor="middle"
          >
            {sz(v, lx < 1 ? (lx < 0.1 ? 2 : 1) : 0)}
          </text>
        ),
      )}
      {yOsztasok.map((v) =>
        Math.abs(v) < 1e-9 ? null : (
          <text
            key={`ty${v}`}
            x={yTengelyX - 6}
            y={S.py(v) + 3.5}
            fontSize="10.5"
            fill="#64748b"
            textAnchor="end"
          >
            {sz(v, ly < 1 ? (ly < 0.1 ? 2 : 1) : 0)}
          </text>
        ),
      )}

      <g clipPath="url(#fv-vago)">
        {/* függőleges és vízszintes segédvonalak (aszimptoták) */}
        {fuggoleges.map((f, i) => (
          <line
            key={`f${i}`}
            x1={S.px(f.x)}
            y1={S.margo.fel}
            x2={S.px(f.x)}
            y2={S.margo.fel + S.h}
            stroke={f.szin ?? "#dc2626"}
            strokeWidth={f.vastag ?? 1.2}
            strokeDasharray={f.szaggatott === false ? undefined : "5 4"}
            opacity={f.opacitas ?? 0.8}
          />
        ))}
        {vizszintes.map((f, i) => (
          <line
            key={`v${i}`}
            x1={S.margo.bal}
            y1={S.py(f.y)}
            x2={S.margo.bal + S.w}
            y2={S.py(f.y)}
            stroke={f.szin ?? "#dc2626"}
            strokeWidth={f.vastag ?? 1.2}
            strokeDasharray={f.szaggatott === false ? undefined : "5 4"}
            opacity={f.opacitas ?? 0.8}
          />
        ))}

        {/* egyenesek: y = m x + b, vagy két pont */}
        {egyenesek.map((e, i) => {
          const x1 = e.x1 ?? xMin;
          const x2 = e.x2 ?? xMax;
          const y1 = e.y1 ?? e.m * x1 + e.b;
          const y2 = e.y2 ?? e.m * x2 + e.b;
          return (
            <line
              key={`e${i}`}
              x1={S.px(x1)}
              y1={S.py(y1)}
              x2={S.px(x2)}
              y2={S.py(y2)}
              stroke={e.szin ?? "#e2590a"}
              strokeWidth={e.vastag ?? 2}
              strokeDasharray={e.szaggatott ? "6 4" : undefined}
              opacity={e.opacitas ?? 1}
            />
          );
        })}

        {/* görbék */}
        {gorbek.map((g, i) =>
          mintavetel(g.fn, g.tol ?? xMin, g.ig ?? xMax, {
            yMin: y0,
            yMax: y1,
            db: g.db ?? 480,
          }).map((darab, j) => (
            <path
              key={`g${i}-${j}`}
              d={utvonal(darab)}
              fill="none"
              stroke={g.szin ?? "#0f766e"}
              strokeWidth={g.vastag ?? 2.4}
              strokeDasharray={g.szaggatott ? "6 4" : undefined}
              opacity={g.opacitas ?? 1}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          )),
        )}
      </g>

      {/* görbecímkék (a görbe jobb végénél) */}
      {gorbek.map((g, i) => {
        if (!g.cimke) return null;
        const xv = g.cimkeX ?? (g.ig ?? xMax) - (xMax - xMin) * 0.06;
        let yv;
        try {
          yv = g.fn(xv);
        } catch {
          yv = NaN;
        }
        if (!Number.isFinite(yv)) return null;
        const yk = Math.max(y0, Math.min(y1, yv));
        return (
          <text
            key={`c${i}`}
            x={S.px(xv)}
            y={S.py(yk) - 8}
            fontSize="12"
            fontWeight="650"
            textAnchor="middle"
            style={{
              fill: g.szin ?? "#0f766e",
              paintOrder: "stroke",
              stroke: "white",
              strokeWidth: 3.5,
            }}
          >
            {g.cimke}
          </text>
        );
      })}

      {/* pontok */}
      {pontok.map((p, i) => (
        <g key={`p${i}`}>
          <circle
            cx={S.px(p.x)}
            cy={S.py(p.y)}
            r={p.r ?? 4.5}
            fill={p.ures ? "white" : (p.szin ?? "#e2590a")}
            stroke={p.ures ? (p.szin ?? "#e2590a") : "white"}
            strokeWidth={p.ures ? 2 : 1.5}
          />
          {p.cimke && (
            <text
              x={S.px(p.x) + (p.dx ?? 9)}
              y={S.py(p.y) + (p.dy ?? -8)}
              fontSize="12"
              fontWeight="650"
              style={{
                fill: p.szin ?? "#e2590a",
                paintOrder: "stroke",
                stroke: "white",
                strokeWidth: 3.5,
              }}
            >
              {p.cimke}
            </text>
          )}
        </g>
      ))}

      {typeof children === "function" ? children(S) : children}
    </svg>
  );
}
