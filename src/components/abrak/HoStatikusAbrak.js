"use client";

/** A Határozott integrál modul statikus ábrái. Minden viewBox 560 széles. */

const TEAL = "#0f766e";
const NAR = "#e2590a";
const LILA = "#7c3aed";
const PIROS = "#dc2626";
const SOTET = "#1d3c48";
const SZURKE = "#64748b";

function Felirat({ x, y, children, szin = SOTET, meret = 12.5, horgony = "middle", vastag = true }) {
  return (
    <text
      x={x}
      y={y}
      fontSize={meret}
      fontWeight={vastag ? 650 : 400}
      textAnchor={horgony}
      style={{ fill: szin, paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
    >
      {children}
    </text>
  );
}

/* ================= 1. Előjeles terület (Példa 2) ================= */

export function AbraElojelesTerulet() {
  const px = (x) => 62 + x * 150;
  const py = (y) => 168 - y * 44;
  return (
    <svg viewBox="0 0 560 290" className="abra w-full select-none">
      {/* tengelyek */}
      <line x1={36} y1={py(0)} x2={520} y2={py(0)} stroke="#475569" strokeWidth="1.3" />
      <line x1={px(0)} y1={252} x2={px(0)} y2={46} stroke="#475569" strokeWidth="1.3" />
      <Felirat x={524} y={py(0) + 4} horgony="start" szin={SZURKE} meret={12}>
        x
      </Felirat>
      <Felirat x={px(0) + 10} y={52} horgony="start" szin={SZURKE} meret={12}>
        y
      </Felirat>

      {/* pozitív rész */}
      <rect x={px(0)} y={py(2)} width={px(1) - px(0)} height={py(0) - py(2)} fill={TEAL} fillOpacity="0.22" />
      <line x1={px(0)} y1={py(2)} x2={px(1)} y2={py(2)} stroke={TEAL} strokeWidth="2.8" />
      <Felirat x={px(0.5)} y={py(1) + 5} szin={TEAL}>
        +2 · 1 = +2
      </Felirat>

      {/* negatív rész */}
      <rect x={px(1)} y={py(0)} width={px(2.5) - px(1)} height={py(-1) - py(0)} fill={PIROS} fillOpacity="0.2" />
      <line x1={px(1)} y1={py(-1)} x2={px(2.5)} y2={py(-1)} stroke={PIROS} strokeWidth="2.8" />
      <line x1={px(1)} y1={py(2)} x2={px(1)} y2={py(-1)} stroke={SZURKE} strokeWidth="1.2" strokeDasharray="4 3" />
      <Felirat x={px(1.75)} y={py(-0.72) + 5} szin={PIROS}>
        −1 · 1,5 = −1,5
      </Felirat>

      {/* osztások */}
      {[1, 2, 2.5].map((v) => (
        <g key={v}>
          <line x1={px(v)} y1={py(0) - 4} x2={px(v)} y2={py(0) + 4} stroke="#475569" strokeWidth="1.2" />
          <Felirat x={px(v)} y={py(0) + 19} szin={SZURKE} meret={11.5} vastag={false}>
            {String(v).replace(".", ",")}
          </Felirat>
        </g>
      ))}
      <Felirat x={px(0) - 12} y={py(2) + 4} horgony="end" szin={SZURKE} meret={11.5} vastag={false}>
        2
      </Felirat>
      <Felirat x={px(0) - 12} y={py(-1) + 4} horgony="end" szin={SZURKE} meret={11.5} vastag={false}>
        −1
      </Felirat>

      {/* összegzés */}
      <Felirat x={px(1.25)} y={244} szin={SOTET} meret={13}>
        az integrál: 2 − 1,5 = 0,5
      </Felirat>
      <Felirat x={px(1.25)} y={266} szin={NAR} meret={13}>
        a terület: 2 + 1,5 = 3,5
      </Felirat>
    </svg>
  );
}

/* ================= 2. Páros és páratlan függvény ================= */

export function AbraParosParatlan() {
  const bal = { ox: 140, oy: 150, k: 58 };
  const jobb = { ox: 410, oy: 150, k: 58 };
  const ut = (P, fn, a, b) => {
    let d = "";
    for (let i = 0; i <= 80; i++) {
      const x = a + ((b - a) * i) / 80;
      d += `${i ? "L" : "M"}${(P.ox + x * P.k).toFixed(1)},${(P.oy - fn(x) * P.k).toFixed(1)} `;
    }
    return d;
  };
  const terulet = (P, fn, a, b) =>
    `M${(P.ox + a * P.k).toFixed(1)},${P.oy.toFixed(1)} ${ut(P, fn, a, b).slice(1)} L${(
      P.ox +
      b * P.k
    ).toFixed(1)},${P.oy.toFixed(1)} Z`;

  const paros = (x) => 0.55 * x * x + 0.25;
  const paratlan = (x) => 0.55 * x * x * x;

  return (
    <svg viewBox="0 0 560 250" className="abra w-full select-none">
      {[bal, jobb].map((P, i) => (
        <g key={i}>
          <line x1={P.ox - 100} y1={P.oy} x2={P.ox + 100} y2={P.oy} stroke="#475569" strokeWidth="1.2" />
          <line x1={P.ox} y1={P.oy + 70} x2={P.ox} y2={P.oy - 105} stroke="#475569" strokeWidth="1.2" />
          <Felirat x={P.ox - 1.5 * P.k} y={P.oy + 19} szin={SZURKE} meret={11.5} vastag={false}>
            −a
          </Felirat>
          <Felirat x={P.ox + 1.5 * P.k} y={P.oy + 19} szin={SZURKE} meret={11.5} vastag={false}>
            a
          </Felirat>
        </g>
      ))}

      {/* páros */}
      <path d={terulet(bal, paros, -1.5, 0)} fill={TEAL} fillOpacity="0.2" />
      <path d={terulet(bal, paros, 0, 1.5)} fill={TEAL} fillOpacity="0.2" />
      <path d={ut(bal, paros, -1.5, 1.5)} fill="none" stroke={TEAL} strokeWidth="2.6" />
      <Felirat x={bal.ox} y={40} szin={SOTET} meret={13}>
        páros függvény
      </Felirat>
      <Felirat x={bal.ox} y={222} szin={TEAL} meret={12.5}>
        a két rész egyenlő
      </Felirat>
      <Felirat x={bal.ox} y={242} szin={SOTET} meret={12.5}>
        ∫ = 2 · (jobb fél)
      </Felirat>

      {/* páratlan */}
      <path d={terulet(jobb, paratlan, -1.5, 0)} fill={PIROS} fillOpacity="0.22" />
      <path d={terulet(jobb, paratlan, 0, 1.5)} fill={NAR} fillOpacity="0.22" />
      <path d={ut(jobb, paratlan, -1.5, 1.5)} fill="none" stroke={LILA} strokeWidth="2.6" />
      <Felirat x={jobb.ox} y={40} szin={SOTET} meret={13}>
        páratlan függvény
      </Felirat>
      <Felirat x={jobb.ox - 52} y={jobb.oy + 44} szin={PIROS} meret={12}>
        −
      </Felirat>
      <Felirat x={jobb.ox + 52} y={jobb.oy - 36} szin={NAR} meret={12}>
        +
      </Felirat>
      <Felirat x={jobb.ox} y={222} szin={PIROS} meret={12.5}>
        a két rész kioltja egymást
      </Felirat>
      <Felirat x={jobb.ox} y={242} szin={SOTET} meret={12.5}>
        ∫ = 0
      </Felirat>
    </svg>
  );
}

/* ================= 3. Polárkoordinátás terület: körcikkek ================= */

export function AbraKorcikkek() {
  const ox = 300;
  const oy = 170;
  const k = 76;
  const r = (fi) => 1 + Math.cos(fi);
  const P = (fi, sugar = null) => [
    ox + (sugar ?? r(fi)) * k * Math.cos(fi),
    oy - (sugar ?? r(fi)) * k * Math.sin(fi),
  ];

  const gorbe = (() => {
    let d = "";
    for (let i = 0; i <= 240; i++) {
      const fi = (2 * Math.PI * i) / 240;
      const [x, y] = P(fi);
      d += `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)} `;
    }
    return `${d}Z`;
  })();

  const cikkek = [];
  const db = 24;
  for (let i = 0; i < db; i++) {
    const f1 = (2 * Math.PI * i) / db;
    const f2 = (2 * Math.PI * (i + 1)) / db;
    const kozep = (f1 + f2) / 2;
    const R = r(kozep);
    const [x1, y1] = P(f1, R);
    const [x2, y2] = P(f2, R);
    cikkek.push(
      <path
        key={i}
        d={`M${ox},${oy} L${x1.toFixed(1)},${y1.toFixed(1)} A${(R * k).toFixed(1)},${(R * k).toFixed(
          1,
        )} 0 0 0 ${x2.toFixed(1)},${y2.toFixed(1)} Z`}
        fill={i % 2 ? NAR : TEAL}
        fillOpacity="0.18"
        stroke={i % 2 ? NAR : TEAL}
        strokeWidth="0.8"
      />,
    );
  }

  const kiemeltFi = 0.55;
  const kiemeltR = r(kiemeltFi);

  return (
    <svg viewBox="0 0 560 320" className="abra w-full select-none">
      <line x1={ox - 130} y1={oy} x2={ox + 230} y2={oy} stroke="#475569" strokeWidth="1.2" />
      <line x1={ox} y1={oy + 150} x2={ox} y2={oy - 150} stroke="#475569" strokeWidth="1.2" />
      {cikkek}
      <path d={gorbe} fill="none" stroke={LILA} strokeWidth="2.6" />

      {/* egy kiemelt körcikk */}
      <line
        x1={ox}
        y1={oy}
        x2={P(kiemeltFi, kiemeltR)[0]}
        y2={P(kiemeltFi, kiemeltR)[1]}
        stroke={SOTET}
        strokeWidth="2"
      />
      <Felirat
        x={ox + kiemeltR * k * Math.cos(kiemeltFi) * 0.55 + 12}
        y={oy - kiemeltR * k * Math.sin(kiemeltFi) * 0.55 - 6}
        szin={SOTET}
        meret={12.5}
        horgony="start"
      >
        r(φ)
      </Felirat>

      <Felirat x={126} y={40} szin={SOTET} meret={13} horgony="start">
        kardioid: r = a(1 + cos φ)
      </Felirat>
      <Felirat x={126} y={278} szin={TEAL} meret={12.5} horgony="start">
        egy körcikk: ΔT ≈ ½ · r(φ)² · Δφ
      </Felirat>
      <Felirat x={126} y={300} szin={NAR} meret={12.5} horgony="start">
        összegezve: T = ½ ∫ r(φ)² dφ = 3a²π/2
      </Felirat>
      <Felirat x={ox + 236} y={oy - 8} szin={SZURKE} meret={11.5} horgony="end" vastag={false}>
        φ = 0
      </Felirat>
    </svg>
  );
}

/* ================= 4. Felszín: csonkakúp-palástok ================= */

export function AbraCsonkakupPalast() {
  const px = (x) => 70 + x * 150;
  const cy = 176;
  const f = (x) => 0.55 + 0.42 * x;
  const ky = 66;
  const lapit = 0.3;

  const x1 = 0.7;
  const x2 = 1.85;
  const r1 = f(x1);
  const r2 = f(x2);

  const also = (x) => cy + f(x) * ky;
  const felso = (x) => cy - f(x) * ky;

  return (
    <svg viewBox="0 0 560 300" className="abra w-full select-none">
      {/* tengely */}
      <line x1={40} y1={cy} x2={520} y2={cy} stroke="#475569" strokeWidth="1.3" strokeDasharray="7 5" />
      <Felirat x={524} y={cy + 4} horgony="start" szin={SZURKE} meret={12}>
        x
      </Felirat>

      {/* a teljes forgásfelület halványan */}
      <path
        d={`M${px(0.15)},${felso(0.15)} L${px(2.7)},${felso(2.7)} L${px(2.7)},${also(2.7)} L${px(0.15)},${also(
          0.15,
        )} Z`}
        fill={TEAL}
        fillOpacity="0.07"
      />
      <line x1={px(0.15)} y1={felso(0.15)} x2={px(2.7)} y2={felso(2.7)} stroke={TEAL} strokeWidth="2.4" />
      <line x1={px(0.15)} y1={also(0.15)} x2={px(2.7)} y2={also(2.7)} stroke={TEAL} strokeWidth="1.6" opacity="0.5" />

      {/* a kiemelt csonkakúp-öv */}
      <path
        d={`M${px(x1)},${felso(x1)} L${px(x2)},${felso(x2)} L${px(x2)},${also(x2)} L${px(x1)},${also(x1)} Z`}
        fill={NAR}
        fillOpacity="0.2"
        stroke={NAR}
        strokeWidth="1.6"
      />
      <ellipse cx={px(x1)} cy={cy} rx={r1 * ky * lapit} ry={r1 * ky} fill="none" stroke={NAR} strokeWidth="1.6" />
      <ellipse cx={px(x2)} cy={cy} rx={r2 * ky * lapit} ry={r2 * ky} fill="none" stroke={NAR} strokeWidth="1.6" />

      {/* sugarak */}
      <line x1={px(x1)} y1={cy} x2={px(x1)} y2={felso(x1)} stroke={LILA} strokeWidth="1.8" />
      <line x1={px(x2)} y1={cy} x2={px(x2)} y2={felso(x2)} stroke={LILA} strokeWidth="1.8" />
      <Felirat x={px(x1) - 10} y={cy - (r1 * ky) / 2} szin={LILA} meret={12} horgony="end">
        r = f(x)
      </Felirat>
      <Felirat x={px(x2) + 10} y={cy - (r2 * ky) / 2} szin={LILA} meret={12} horgony="start">
        R
      </Felirat>

      {/* az alkotó: Δs */}
      <line x1={px(x1)} y1={felso(x1)} x2={px(x2)} y2={felso(x2)} stroke={PIROS} strokeWidth="3" />
      <line
        x1={px(x1)}
        y1={felso(x1)}
        x2={px(x2)}
        y2={felso(x1)}
        stroke={SZURKE}
        strokeWidth="1.2"
        strokeDasharray="4 3"
      />
      <line
        x1={px(x2)}
        y1={felso(x1)}
        x2={px(x2)}
        y2={felso(x2)}
        stroke={SZURKE}
        strokeWidth="1.2"
        strokeDasharray="4 3"
      />
      <Felirat x={(px(x1) + px(x2)) / 2} y={felso(x1) - 12} szin={PIROS} meret={12.5}>
        Δs = √(Δx² + Δy²)
      </Felirat>
      <Felirat x={(px(x1) + px(x2)) / 2} y={felso(x1) + 16} szin={SZURKE} meret={11.5} vastag={false}>
        Δx
      </Felirat>

      <Felirat x={44} y={34} szin={SOTET} meret={13} horgony="start">
        a palástot csonkakúp-övekből rakjuk össze
      </Felirat>
      <Felirat x={44} y={272} szin={NAR} meret={12.5} horgony="start">
        ΔF = π(R + r)·Δs ≈ 2π f(x)·Δs
      </Felirat>
      <Felirat x={44} y={292} szin={TEAL} meret={12.5} horgony="start">
        F = 2π ∫ f(x)·√(1 + f ′(x)²) dx — a gyök az ívelemből jön
      </Felirat>
    </svg>
  );
}
