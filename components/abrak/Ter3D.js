"use client";

import { useRef, useState } from "react";

/**
 * Közös 3D-rajzoló segéd a térgeometria-modul ábráihoz.
 *
 * Jobbsodrású koordináta-rendszer, a z tengely felfelé mutat. A vetítés
 * forgatható axonometria: az `azimut` a vízszintes körbefordulás, az
 * `emelkedes` a kamera magassági szöge — mindkettő fokban.
 *
 * Az alapnézet (azimut = −35°, emelkedés = 25°) a megszokott tankönyvi kép:
 * az x tengely balra-előre, az y jobbra-előre, a z felfelé mutat.
 */

const RAD = Math.PI / 180;

export const ALAPNEZET = { azimut: -35, emelkedes: 25 };

/** Egy [x, y, z] pont vetítése: X = jobbra, Y = felfelé, m = mélység (nagyobb = közelebb). */
export function vetit(p, nezet) {
  const th = (nezet.azimut + 90) * RAD;
  const el = nezet.emelkedes * RAD;
  const st = Math.sin(th);
  const ct = Math.cos(th);
  const se = Math.sin(el);
  const ce = Math.cos(el);
  const vszintes = p[0] * ct + p[1] * st;
  return {
    X: -p[0] * st + p[1] * ct,
    Y: -vszintes * se + p[2] * ce,
    m: vszintes * ce + p[2] * se,
  };
}

/**
 * Vetítő függvény gyártása. A visszaadott V(x, y, z) (vagy V([x,y,z]))
 * képernyő-koordinátát ad: { x, y, m }.
 */
export function keszitVetito(nezet, { ox, oy, leptek }) {
  const V = (x, y, z) => {
    const p = Array.isArray(x) ? x : [x, y, z];
    const v = vetit(p, nezet);
    return { x: ox + v.X * leptek, y: oy - v.Y * leptek, m: v.m };
  };
  V.leptek = leptek;
  V.nezet = nezet;
  V.ox = ox;
  V.oy = oy;
  return V;
}

/**
 * Lépték úgy, hogy a felsorolt pontok elférjenek a megadott fél-szélességen és
 * fél-magasságon belül. Az origó helye nem változik.
 */
export function leptekIgazitas(pontok, nezet, { felSzeles = 240, felMagas = 172, max = 34 } = {}) {
  let mx = 0.6;
  let my = 0.6;
  pontok.forEach((p) => {
    const q = vetit(p, nezet);
    mx = Math.max(mx, Math.abs(q.X));
    my = Math.max(my, Math.abs(q.Y));
  });
  return Math.min(max, felSzeles / mx, felMagas / my);
}

/**
 * Teljes illesztés: a pontok befoglaló téglalapját a kép közepére igazítja,
 * és a léptéket is ehhez választja. { leptek, ox, oy } -t ad vissza.
 */
export function illeszt(pontok, nezet, { szeles = 560, magas = 400, margo = 34, max = 34 } = {}) {
  let x1 = Infinity;
  let x2 = -Infinity;
  let y1 = Infinity;
  let y2 = -Infinity;
  pontok.forEach((p) => {
    const q = vetit(p, nezet);
    x1 = Math.min(x1, q.X);
    x2 = Math.max(x2, q.X);
    y1 = Math.min(y1, q.Y);
    y2 = Math.max(y2, q.Y);
  });
  const sz = Math.max(0.8, x2 - x1);
  const ma = Math.max(0.8, y2 - y1);
  const leptek = Math.min(max, (szeles - 2 * margo) / sz, (magas - 2 * margo) / ma);
  return {
    leptek,
    ox: szeles / 2 - ((x1 + x2) / 2) * leptek,
    oy: magas / 2 + ((y1 + y2) / 2) * leptek,
  };
}

/** Húzással forgatható nézet. A vízszintes elmozdulás az azimutot, a függőleges az emelkedést állítja. */
export function useForgatas(kezdo = ALAPNEZET) {
  const [nezet, setNezet] = useState(kezdo);
  const ref = useRef(nezet);
  ref.current = nezet;

  const huzas = (ev) => {
    if (ev.button != null && ev.button > 0) return;
    ev.preventDefault();
    const x0 = ev.clientX;
    const y0 = ev.clientY;
    const n0 = ref.current;
    const mozgat = (e) => {
      setNezet({
        azimut: n0.azimut - (e.clientX - x0) * 0.45,
        emelkedes: Math.max(-82, Math.min(86, n0.emelkedes + (e.clientY - y0) * 0.35)),
      });
    };
    const vege = () => {
      window.removeEventListener("pointermove", mozgat);
      window.removeEventListener("pointerup", vege);
    };
    window.addEventListener("pointermove", mozgat);
    window.addEventListener("pointerup", vege);
  };

  const alaphelyzet = () => setNezet(kezdo);
  return { nezet, setNezet, huzas, alaphelyzet };
}

/* ---------------- színek és nyílhegyek ---------------- */

export const SZINEK = {
  narancs: "#e2590a",
  teal: "#0f766e",
  lila: "#7c3aed",
  sotet: "#1d3c48",
  szurke: "#64748b",
  kek: "#2563eb",
  zold: "#15803d",
  rozsa: "#e11d48",
  vilagos: "#94a3b8",
};

/** A 3D-ábrák nyílhegyei. Egyszer kell kitenni az SVG elejére. */
export function NyilHegyek3D() {
  return (
    <defs>
      {Object.entries(SZINEK).map(([nev, szin]) => (
        <marker
          key={nev}
          id={`h3-${nev}`}
          viewBox="0 0 10 10"
          refX="8.5"
          refY="5"
          markerWidth="6.5"
          markerHeight="6.5"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 9 5 L 0 9 z" fill={szin} />
        </marker>
      ))}
    </defs>
  );
}

/* ---------------- rajzelemek ---------------- */

/** Halvány rács az xy-síkon — ettől lesz térérzete a képnek. */
export function Racs3D({ V, meret = 4, lepes = 1, szin = "#cbd5e1" }) {
  const vonalak = [];
  for (let k = -meret; k <= meret; k += lepes) {
    vonalak.push([
      [k, -meret, 0],
      [k, meret, 0],
    ]);
    vonalak.push([
      [-meret, k, 0],
      [meret, k, 0],
    ]);
  }
  return (
    <g>
      {vonalak.map((sz, i) => {
        const a = V(sz[0]);
        const b = V(sz[1]);
        return (
          <line
            key={i}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={szin}
            strokeWidth="0.8"
            opacity="0.55"
          />
        );
      })}
    </g>
  );
}

/** A három koordinátatengely nyíllal és felirattal. */
export function Tengelyek3D({ V, hossz = 4.2, cimkek = ["x", "y", "z"], szin = "#64748b" }) {
  const O = V(0, 0, 0);
  const vegek = [
    [hossz, 0, 0],
    [0, hossz, 0],
    [0, 0, hossz],
  ];
  const negativ = [
    [-hossz * 0.75, 0, 0],
    [0, -hossz * 0.75, 0],
    [0, 0, -hossz * 0.45],
  ];
  return (
    <g>
      {negativ.map((p, i) => {
        const q = V(p);
        return (
          <line key={`n${i}`} x1={O.x} y1={O.y} x2={q.x} y2={q.y} stroke={szin} strokeWidth="1" opacity="0.35" strokeDasharray="4 4" />
        );
      })}
      {vegek.map((p, i) => {
        const q = V(p);
        const c = V(p[0] * 1.1, p[1] * 1.1, p[2] * 1.1);
        return (
          <g key={i}>
            <line
              x1={O.x}
              y1={O.y}
              x2={q.x}
              y2={q.y}
              stroke={szin}
              strokeWidth="1.2"
              markerEnd="url(#h3-szurke)"
            />
            <text x={c.x} y={c.y + 4} fontSize="12.5" fontStyle="italic" fill={szin} textAnchor="middle">
              {cimkek[i]}
            </text>
          </g>
        );
      })}
      <circle cx={O.x} cy={O.y} r="2.4" fill={szin} />
    </g>
  );
}

/** Nyíl a térben két pont között. */
export function Nyil3D({
  V,
  tol = [0, 0, 0],
  ig,
  szin = "narancs",
  vastagsag = 2.6,
  szaggatott = false,
  opacitas = 1,
  hegyNelkul = false,
}) {
  const a = V(tol);
  const b = V(ig);
  if (Math.hypot(b.x - a.x, b.y - a.y) < 1.2) return null;
  return (
    <line
      x1={a.x}
      y1={a.y}
      x2={b.x}
      y2={b.y}
      stroke={SZINEK[szin] ?? szin}
      strokeWidth={vastagsag}
      strokeLinecap="round"
      strokeDasharray={szaggatott ? "5 4" : undefined}
      markerEnd={hegyNelkul ? undefined : `url(#h3-${szin})`}
      opacity={opacitas}
    />
  );
}

/** Sima szakasz (segédvonal) a térben. */
export function Szakasz3D({ V, tol, ig, szin = "#94a3b8", vastagsag = 1, szaggatott = true, opacitas = 0.9 }) {
  const a = V(tol);
  const b = V(ig);
  return (
    <line
      x1={a.x}
      y1={a.y}
      x2={b.x}
      y2={b.y}
      stroke={SZINEK[szin] ?? szin}
      strokeWidth={vastagsag}
      strokeDasharray={szaggatott ? "4 3" : undefined}
      opacity={opacitas}
    />
  );
}

/** Pont a térben, opcionális felirattal. */
export function Pont3D({ V, p, szin = "narancs", r = 4.5, cimke, cimkeDx = 10, cimkeDy = -8, meret = 12 }) {
  const q = V(p);
  const c = SZINEK[szin] ?? szin;
  return (
    <g>
      <circle cx={q.x} cy={q.y} r={r} fill={c} stroke="white" strokeWidth="1.6" />
      {cimke && (
        <text
          x={q.x + cimkeDx}
          y={q.y + cimkeDy}
          fontSize={meret}
          fontWeight="650"
          textAnchor={cimkeDx < 0 ? "end" : "start"}
          style={{ fill: c, paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
        >
          {cimke}
        </text>
      )}
    </g>
  );
}

/** Felirat a térbeli pont mellett (háttérrel, hogy a vonalak fölött is olvasható legyen). */
export function Felirat3D({ V, p, children, szin = "#1d3c48", meret = 12, dx = 0, dy = 0, horgony = "middle" }) {
  const q = V(p);
  return (
    <text
      x={q.x + dx}
      y={q.y + dy}
      fontSize={meret}
      fontWeight="650"
      textAnchor={horgony}
      style={{ fill: SZINEK[szin] ?? szin, paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
    >
      {children}
    </text>
  );
}

/** Paralelogramma-darab: a `pont`-ból az `u` és `w` vektorok feszítik ki. */
export function Sik3D({ V, pont = [0, 0, 0], u, w, szin = "#7c3aed", kitoltes = 0.13, keret = 1.2, szaggatott = false }) {
  const sarkok = [
    pont,
    [pont[0] + u[0], pont[1] + u[1], pont[2] + u[2]],
    [pont[0] + u[0] + w[0], pont[1] + u[1] + w[1], pont[2] + u[2] + w[2]],
    [pont[0] + w[0], pont[1] + w[1], pont[2] + w[2]],
  ].map((p) => V(p));
  return (
    <polygon
      points={sarkok.map((s) => `${s.x.toFixed(1)},${s.y.toFixed(1)}`).join(" ")}
      fill={SZINEK[szin] ?? szin}
      fillOpacity={kitoltes}
      stroke={SZINEK[szin] ?? szin}
      strokeWidth={keret}
      strokeDasharray={szaggatott ? "5 4" : undefined}
    />
  );
}

/** Paralelepipedon (vegyes szorzat szemléltetéséhez): élek + halvány lapok. */
export function Test3D({ V, a, b, c, szin = "#0f766e", kitoltes = 0.1 }) {
  const P = (i, j, k) => [a[0] * i + b[0] * j + c[0] * k, a[1] * i + b[1] * j + c[1] * k, a[2] * i + b[2] * j + c[2] * k];
  const lapok = [
    [P(0, 0, 0), P(1, 0, 0), P(1, 1, 0), P(0, 1, 0)],
    [P(0, 0, 1), P(1, 0, 1), P(1, 1, 1), P(0, 1, 1)],
    [P(0, 0, 0), P(1, 0, 0), P(1, 0, 1), P(0, 0, 1)],
    [P(0, 1, 0), P(1, 1, 0), P(1, 1, 1), P(0, 1, 1)],
    [P(0, 0, 0), P(0, 1, 0), P(0, 1, 1), P(0, 0, 1)],
    [P(1, 0, 0), P(1, 1, 0), P(1, 1, 1), P(1, 0, 1)],
  ];
  const szinKod = SZINEK[szin] ?? szin;
  // hátulról előre rajzolunk: a lap közepének mélysége dönt
  const rendezett = lapok
    .map((lap) => {
      const pontok = lap.map((p) => V(p));
      const kozep = pontok.reduce((s, q) => s + q.m, 0) / 4;
      return { pontok, kozep };
    })
    .sort((x, y) => x.kozep - y.kozep);
  return (
    <g>
      {rendezett.map((lap, i) => (
        <polygon
          key={i}
          points={lap.pontok.map((s) => `${s.x.toFixed(1)},${s.y.toFixed(1)}`).join(" ")}
          fill={szinKod}
          fillOpacity={kitoltes}
          stroke={szinKod}
          strokeWidth="1.1"
          strokeOpacity={i < 3 ? 0.35 : 0.85}
        />
      ))}
    </g>
  );
}

/** Egyenes darabja a térben (paraméteres alak, t a [t1, t2] szakaszon). */
export function Egyenes3D({ V, pont, irany, t1 = -6, t2 = 6, szin = "#0f766e", vastagsag = 2, szaggatott = false, opacitas = 1 }) {
  const P = (t) => [pont[0] + t * irany[0], pont[1] + t * irany[1], pont[2] + t * irany[2]];
  const a = V(P(t1));
  const b = V(P(t2));
  return (
    <line
      x1={a.x}
      y1={a.y}
      x2={b.x}
      y2={b.y}
      stroke={SZINEK[szin] ?? szin}
      strokeWidth={vastagsag}
      strokeDasharray={szaggatott ? "6 4" : undefined}
      strokeLinecap="round"
      opacity={opacitas}
    />
  );
}

/** „Húzd a képet a forgatáshoz” felirat az ábra aljára. */
export function ForgatasFelirat({ nezet }) {
  return (
    <p className="mt-1 text-center text-[11.5px] text-petrol-400">
      Húzd a képet a forgatáshoz · nézet: {Math.round(((nezet.azimut % 360) + 360) % 360)}° /{" "}
      {Math.round(nezet.emelkedes)}°
    </p>
  );
}
