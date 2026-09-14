"use client";

import { NyilHegyek3D, Racs3D, Tengelyek3D, keszitVetito } from "./Ter3D";

/* ==================================================================== */
/* 1. Térbeli tartószerkezet — a rudak mint vektorok                     */
/* ==================================================================== */

export function AbraTartoszerkezet() {
  const V = keszitVetito(
    { azimut: -48, emelkedes: 20 },
    { ox: 300, oy: 232, leptek: 52 },
  );
  const L = (p, q, szin = "#64748b", w = 2, op = 1, szagg = false) => {
    const a = V(p);
    const b = V(q);
    return (
      <line
        key={`${p.join()}-${q.join()}`}
        x1={a.x}
        y1={a.y}
        x2={b.x}
        y2={b.y}
        stroke={szin}
        strokeWidth={w}
        opacity={op}
        strokeLinecap="round"
        strokeDasharray={szagg ? "5 4" : undefined}
      />
    );
  };

  const talp = [
    [0, 0, 0],
    [4, 0, 0],
    [4, 2.4, 0],
    [0, 2.4, 0],
  ];
  const fej = talp.map((p) => [p[0], p[1], 1.7]);
  const gerinc = [
    [0, 1.2, 3.0],
    [4, 1.2, 3.0],
  ];

  return (
    <svg viewBox="0 0 560 330" className="abra w-full">
      <NyilHegyek3D />
      <Racs3D V={V} meret={2.6} />

      {/* talpgerendák */}
      {talp.map((p, i) => L(p, talp[(i + 1) % 4], "#94a3b8", 2, 0.8))}
      {/* oszlopok */}
      {talp.map((p, i) => L(p, fej[i], "#475569", 3))}
      {/* koszorú */}
      {fej.map((p, i) => L(p, fej[(i + 1) % 4], "#475569", 2.6))}
      {/* szarufák */}
      {L(fej[0], gerinc[0], "#0f766e", 2.6)}
      {L(fej[3], gerinc[0], "#0f766e", 2.6)}
      {L(fej[1], gerinc[1], "#0f766e", 2.6)}
      {L(fej[2], gerinc[1], "#0f766e", 2.6)}
      {L(gerinc[0], gerinc[1], "#0f766e", 3)}
      {/* átlós merevítés */}
      {L(fej[0], talp[1], "#94a3b8", 1.6, 0.9, true)}

      {/* a kiemelt rúd mint vektor */}
      {(() => {
        const a = V(fej[3]);
        const b = V(gerinc[0]);
        return (
          <line
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="#e2590a"
            strokeWidth="3.6"
            markerEnd="url(#h3-narancs)"
            strokeLinecap="round"
          />
        );
      })()}

      {/* terhelő erő a gerincen */}
      {(() => {
        const a = V(2, 1.2, 3.0);
        const b = V(2, 1.2, 1.6);
        return (
          <line
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="#7c3aed"
            strokeWidth="3.4"
            markerEnd="url(#h3-lila)"
          />
        );
      })()}

      {/* jelmagyarázat a bal felső sarokban */}
      <g>
        <rect
          x="12"
          y="14"
          width="212"
          height="74"
          rx="10"
          fill="white"
          fillOpacity="0.9"
          stroke="#dce9ed"
        />
        <line
          x1="26"
          y1="34"
          x2="52"
          y2="34"
          stroke="#e2590a"
          strokeWidth="3.4"
        />
        <text x="60" y="38" fontSize="12" fontWeight="650" fill="#e2590a">
          rúdirány: v = (0; −1,2; 1,3)
        </text>
        <line
          x1="26"
          y1="56"
          x2="52"
          y2="56"
          stroke="#7c3aed"
          strokeWidth="3.4"
        />
        <text x="60" y="60" fontSize="12" fontWeight="650" fill="#7c3aed">
          terhelés: F = (0; 0; −14) kN
        </text>
        <text x="26" y="80" fontSize="11.5" fill="#64748b">
          minden rúd egy vektor, minden csomópont egy pont
        </text>
      </g>
    </svg>
  );
}

/* ==================================================================== */
/* 2. Vetület és merőleges felbontás (síkbeli ábra)                      */
/* ==================================================================== */

export function AbraVetulet() {
  const OX = 80;
  const OY = 215;
  const S = 46;
  const P = (x, y) => [OX + x * S, OY - y * S];
  const v = [4.2, 1.05];
  const u = [2.4, 2.6];
  const t = (u[0] * v[0] + u[1] * v[1]) / (v[0] * v[0] + v[1] * v[1]);
  const upar = [v[0] * t, v[1] * t];
  const [vx, vy] = P(v[0], v[1]);
  const [ux, uy] = P(u[0], u[1]);
  const [px, py] = P(upar[0], upar[1]);
  const [ox, oy] = P(0, 0);
  // derékszög-jel a talppontnál
  const ev = [v[0] / Math.hypot(...v), v[1] / Math.hypot(...v)];
  const en = [-ev[1], ev[0]];
  const d = 13;
  const j1 = [px - ev[0] * d, py + ev[1] * d];
  const j2 = [j1[0] + en[0] * d, j1[1] - en[1] * d];
  const j3 = [px + en[0] * d, py - en[1] * d];

  return (
    <svg viewBox="0 0 520 260" className="abra w-full">
      <defs>
        <marker
          id="vet-n"
          viewBox="0 0 10 10"
          refX="8.5"
          refY="5"
          markerWidth="6.5"
          markerHeight="6.5"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 9 5 L 0 9 z" fill="#e2590a" />
        </marker>
        <marker
          id="vet-k"
          viewBox="0 0 10 10"
          refX="8.5"
          refY="5"
          markerWidth="6.5"
          markerHeight="6.5"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 9 5 L 0 9 z" fill="#2563eb" />
        </marker>
        <marker
          id="vet-t"
          viewBox="0 0 10 10"
          refX="8.5"
          refY="5"
          markerWidth="6.5"
          markerHeight="6.5"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 9 5 L 0 9 z" fill="#0f766e" />
        </marker>
        <marker
          id="vet-l"
          viewBox="0 0 10 10"
          refX="8.5"
          refY="5"
          markerWidth="6.5"
          markerHeight="6.5"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 9 5 L 0 9 z" fill="#7c3aed" />
        </marker>
      </defs>

      {/* a v iránya mint egyenes */}
      <line
        x1={ox - 30}
        y1={oy + 30 * (v[1] / v[0])}
        x2={P(5.6, (5.6 * v[1]) / v[0])[0]}
        y2={P(5.6, (5.6 * v[1]) / v[0])[1]}
        stroke="#cbd5e1"
        strokeWidth="1.2"
        strokeDasharray="5 4"
      />

      {/* merőleges vetítővonal */}
      <line
        x1={ux}
        y1={uy}
        x2={px}
        y2={py}
        stroke="#94a3b8"
        strokeWidth="1.2"
        strokeDasharray="4 3"
      />

      {/* derékszög */}
      <path
        d={`M ${j1[0]} ${j1[1]} L ${j2[0]} ${j2[1]} L ${j3[0]} ${j3[1]}`}
        fill="none"
        stroke="#94a3b8"
        strokeWidth="1.2"
      />

      <line
        x1={ox}
        y1={oy}
        x2={vx}
        y2={vy}
        stroke="#2563eb"
        strokeWidth="3"
        markerEnd="url(#vet-k)"
      />
      <line
        x1={ox}
        y1={oy}
        x2={px}
        y2={py}
        stroke="#0f766e"
        strokeWidth="3.4"
        markerEnd="url(#vet-t)"
      />
      <line
        x1={px}
        y1={py}
        x2={ux}
        y2={uy}
        stroke="#7c3aed"
        strokeWidth="3"
        markerEnd="url(#vet-l)"
      />
      <line
        x1={ox}
        y1={oy}
        x2={ux}
        y2={uy}
        stroke="#e2590a"
        strokeWidth="3.4"
        markerEnd="url(#vet-n)"
      />

      <circle cx={ox} cy={oy} r="3.5" fill="#1d3c48" />

      {[
        [ux + 12, uy - 6, "#e2590a", "u", "start"],
        [vx + 12, vy + 6, "#2563eb", "v", "start"],
        [px - 6, py + 24, "#0f766e", "u∥ = (u·e)e", "middle"],
        [(px + ux) / 2 + 16, (py + uy) / 2, "#7c3aed", "u⊥ = u − u∥", "start"],
      ].map(([x, y, szin, sz, h]) => (
        <text
          key={sz}
          x={x}
          y={y}
          fontSize="13"
          fontWeight="650"
          textAnchor={h}
          style={{
            fill: szin,
            paintOrder: "stroke",
            stroke: "white",
            strokeWidth: 3.5,
          }}
        >
          {sz}
        </text>
      ))}

      <path
        d={`M ${ox + 44 * Math.cos(Math.atan2(v[1], v[0]))} ${oy - 44 * Math.sin(Math.atan2(v[1], v[0]))} A 44 44 0 0 0 ${ox + 44 * Math.cos(Math.atan2(u[1], u[0]))} ${oy - 44 * Math.sin(Math.atan2(u[1], u[0]))}`}
        fill="none"
        stroke="#64748b"
        strokeWidth="1.3"
      />
      <text
        x={ox + 62}
        y={oy - 34}
        fontSize="12"
        style={{
          fill: "#64748b",
          paintOrder: "stroke",
          stroke: "white",
          strokeWidth: 3.5,
        }}
      >
        φ
      </text>

      <text x={318} y={50} fontSize="12.5" fontWeight="650" fill="#1d3c48">
        Minden u egyértelműen
      </text>
      <text x={318} y={68} fontSize="12.5" fontWeight="650" fill="#1d3c48">
        felbomlik két részre:
      </text>
      <text x={318} y={90} fontSize="12" fill="#475569">
        egy v-vel párhuzamosra
      </text>
      <text x={318} y={107} fontSize="12" fill="#475569">
        és egy v-re merőlegesre.
      </text>
      <text x={318} y={136} fontSize="12.5" fill="#0f766e">
        |u∥| = |u|·|cos φ|
      </text>
      <text x={318} y={156} fontSize="12.5" fill="#7c3aed">
        |u⊥| = |u|·sin φ
      </text>
    </svg>
  );
}

/* ==================================================================== */
/* 3. A vektoriális szorzat determinánsa — a „takard le az oszlopot” recept */
/* ==================================================================== */

export function AbraDeterminans() {
  const oszlopX = [96, 156, 216];
  const sorY = [64, 96, 128];
  const fejlec = ["i", "j", "k"];
  const a = ["a₁", "a₂", "a₃"];
  const b = ["b₁", "b₂", "b₃"];
  const blokkok = [
    { x: 300, jel: "+", takar: 0, kifejt: "a₂b₃ − a₃b₂", szin: "#e2590a" },
    { x: 300, jel: "−", takar: 1, kifejt: "a₁b₃ − a₃b₁", szin: "#0f766e" },
    { x: 300, jel: "+", takar: 2, kifejt: "a₁b₂ − a₂b₁", szin: "#7c3aed" },
  ];

  return (
    <svg viewBox="0 0 560 250" className="abra w-full">
      <rect
        x="64"
        y="42"
        width="182"
        height="104"
        rx="10"
        fill="white"
        stroke="#dce9ed"
      />
      {fejlec.map((f, i) => (
        <text
          key={f}
          x={oszlopX[i]}
          y={sorY[0]}
          fontSize="14"
          fontWeight="700"
          fontStyle="italic"
          textAnchor="middle"
          fill="#1d3c48"
        >
          {f}
        </text>
      ))}
      {a.map((t, i) => (
        <text
          key={t}
          x={oszlopX[i]}
          y={sorY[1]}
          fontSize="13.5"
          textAnchor="middle"
          fill="#475569"
        >
          {t}
        </text>
      ))}
      {b.map((t, i) => (
        <text
          key={t}
          x={oszlopX[i]}
          y={sorY[2]}
          fontSize="13.5"
          textAnchor="middle"
          fill="#475569"
        >
          {t}
        </text>
      ))}
      <text x="155" y="178" fontSize="11" textAnchor="middle" fill="#64748b">
        formális determináns
      </text>

      {blokkok.map((bl, i) => {
        const y = 48 + i * 56;
        return (
          <g key={i}>
            <line
              x1="252"
              y1={y + 8}
              x2="286"
              y2={y + 8}
              stroke={bl.szin}
              strokeWidth="1.4"
              strokeDasharray="4 3"
            />
            <rect
              x="290"
              y={y - 12}
              width="252"
              height="44"
              rx="9"
              fill="white"
              stroke={bl.szin}
              strokeOpacity="0.45"
            />
            <text
              x="304"
              y={y + 16}
              fontSize="17"
              fontWeight="700"
              fill={bl.szin}
            >
              {bl.jel}
            </text>
            <text x="326" y={y + 6} fontSize="11.5" fill="#64748b">
              a {["1.", "2.", "3."][bl.takar]} oszlopot letakarva
            </text>
            <text
              x="326"
              y={y + 24}
              fontSize="13.5"
              fontWeight="650"
              fill={bl.szin}
            >
              {bl.kifejt}
            </text>
          </g>
        );
      })}

      <text x="64" y="214" fontSize="13.5" fontWeight="650" fill="#1d3c48">
        a × b = (a₂b₃ − a₃b₂; a₃b₁ − a₁b₃; a₁b₂ − a₂b₁)
      </text>
      <text x="64" y="236" fontSize="12" fill="#b91c1c">
        A középső tagot ki kell vonni — itt bukik el a legtöbb számolás.
      </text>
    </svg>
  );
}

/* ==================================================================== */
/* 4. Az egyenes paraméteres alakja                                      */
/* ==================================================================== */

export function AbraEgyenesAlak() {
  const V = keszitVetito(
    { azimut: -40, emelkedes: 20 },
    { ox: 214, oy: 196, leptek: 44 },
  );
  const P0 = [-1, 1.2, 0.3];
  const v = [1.5, -1.1, 0.8];
  const pont = (t) => [P0[0] + t * v[0], P0[1] + t * v[1], P0[2] + t * v[2]];
  const A = V(pont(-1.4));
  const B = V(pont(2.3));

  return (
    <svg viewBox="0 0 560 300" className="abra w-full">
      <NyilHegyek3D />
      <Racs3D V={V} meret={3} />
      <Tengelyek3D V={V} hossz={3.6} />

      <line
        x1={A.x}
        y1={A.y}
        x2={B.x}
        y2={B.y}
        stroke="#0f766e"
        strokeWidth="2.6"
        strokeLinecap="round"
      />

      {[-1, 0, 1, 2].map((t) => {
        const q = V(pont(t));
        return (
          <g key={t}>
            <circle
              cx={q.x}
              cy={q.y}
              r={t === 0 ? 5.5 : 4}
              fill={t === 0 ? "#e2590a" : "#0f766e"}
              stroke="white"
              strokeWidth="1.6"
            />
            {t !== 0 && (
              <text
                x={q.x - 9}
                y={t < 0 ? q.y - 10 : q.y + 20}
                fontSize="11.5"
                fontWeight="650"
                textAnchor="end"
                style={{
                  fill: "#0f766e",
                  paintOrder: "stroke",
                  stroke: "white",
                  strokeWidth: 3.5,
                }}
              >
                t = {t}
              </text>
            )}
          </g>
        );
      })}

      {(() => {
        const o = V(0, 0, 0);
        const p = V(P0);
        const q = V(pont(1));
        return (
          <>
            <line
              x1={o.x}
              y1={o.y}
              x2={p.x}
              y2={p.y}
              stroke="#7c3aed"
              strokeWidth="2.4"
              markerEnd="url(#h3-lila)"
              strokeDasharray="5 4"
            />
            <line
              x1={p.x}
              y1={p.y}
              x2={q.x}
              y2={q.y}
              stroke="#e2590a"
              strokeWidth="3.2"
              markerEnd="url(#h3-narancs)"
            />
            <text
              x={(o.x + p.x) / 2 - 8}
              y={(o.y + p.y) / 2 + 18}
              fontSize="12.5"
              fontWeight="650"
              textAnchor="end"
              style={{
                fill: "#7c3aed",
                paintOrder: "stroke",
                stroke: "white",
                strokeWidth: 3.5,
              }}
            >
              OP₀
            </text>
            <text
              x={(p.x + q.x) / 2 + 12}
              y={(p.y + q.y) / 2 - 12}
              fontSize="12.5"
              fontWeight="650"
              textAnchor="start"
              style={{
                fill: "#e2590a",
                paintOrder: "stroke",
                stroke: "white",
                strokeWidth: 3.5,
              }}
            >
              v (irányvektor)
            </text>
            <text
              x={p.x + 10}
              y={p.y + 20}
              fontSize="12.5"
              fontWeight="650"
              style={{
                fill: "#e2590a",
                paintOrder: "stroke",
                stroke: "white",
                strokeWidth: 3.5,
              }}
            >
              P₀ (t = 0)
            </text>
          </>
        );
      })()}

      <text x="384" y="40" fontSize="13.5" fontWeight="650" fill="#1d3c48">
        OP = OP₀ + t·v
      </text>
      <text x="384" y="62" fontSize="12" fill="#475569">
        A t „idő”: t = 0-nál a
      </text>
      <text x="384" y="80" fontSize="12" fill="#475569">
        P₀ pontban vagyunk, és
      </text>
      <text x="384" y="98" fontSize="12" fill="#475569">
        v „sebességgel” haladunk.
      </text>
      <text x="384" y="128" fontSize="12.5" fill="#0f766e">
        x = x₀ + t·v₁
      </text>
      <text x="384" y="147" fontSize="12.5" fill="#0f766e">
        y = y₀ + t·v₂
      </text>
      <text x="384" y="166" fontSize="12.5" fill="#0f766e">
        z = z₀ + t·v₃
      </text>
    </svg>
  );
}

/* ==================================================================== */
/* 5. Két egyenes négy kölcsönös helyzete                                */
/* ==================================================================== */

function HelyzetPanel({ x, cim, rajz, felirat, szin }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <rect
        x="2"
        y="20"
        width="128"
        height="86"
        rx="10"
        fill="white"
        stroke="#dce9ed"
      />
      {rajz}
      <text
        x="66"
        y="14"
        fontSize="12.5"
        fontWeight="700"
        textAnchor="middle"
        fill={szin}
      >
        {cim}
      </text>
      <text x="66" y="124" fontSize="10" textAnchor="middle" fill="#64748b">
        {felirat}
      </text>
    </g>
  );
}

export function AbraNegyHelyzet() {
  const vonal = (x1, y1, x2, y2, szin, w = 2.4, dash) => (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={szin}
      strokeWidth={w}
      strokeLinecap="round"
      strokeDasharray={dash}
    />
  );
  return (
    <svg viewBox="0 0 560 210" className="abra w-full">
      <HelyzetPanel
        x={0}
        cim="egybeeső"
        szin="#0f766e"
        felirat="minden pont közös"
        rajz={
          <>
            {vonal(16, 88, 114, 38, "#0f766e", 5)}
            {vonal(16, 88, 114, 38, "#e2590a", 2, "7 6")}
          </>
        }
      />
      <HelyzetPanel
        x={142}
        cim="párhuzamos"
        szin="#0f766e"
        felirat="nincs közös pont"
        rajz={
          <>
            {vonal(16, 92, 114, 42, "#0f766e")}
            {vonal(16, 72, 114, 22, "#e2590a")}
          </>
        }
      />
      <HelyzetPanel
        x={284}
        cim="metsző"
        szin="#7c3aed"
        felirat="egy közös pont"
        rajz={
          <>
            {vonal(14, 38, 116, 88, "#0f766e")}
            {vonal(14, 88, 116, 38, "#e2590a")}
            <circle
              cx="65"
              cy="63"
              r="4.5"
              fill="#7c3aed"
              stroke="white"
              strokeWidth="1.6"
            />
          </>
        }
      />
      <HelyzetPanel
        x={425}
        cim="kitérő"
        szin="#e11d48"
        felirat="nem metszi, nem ∥"
        rajz={
          <>
            {vonal(14, 38, 116, 88, "#0f766e")}
            {vonal(14, 88, 50, 70, "#e2590a")}
            {vonal(82, 54, 116, 38, "#e2590a")}
            <path
              d="M 50 70 Q 66 58 82 54"
              fill="none"
              stroke="#e2590a"
              strokeWidth="2.2"
              strokeDasharray="3 3"
              opacity="0.5"
            />
          </>
        }
      />
      <text
        x="280"
        y="162"
        fontSize="12"
        fontWeight="650"
        textAnchor="middle"
        fill="#1d3c48"
      >
        1. Párhuzamosak az irányvektorok? → egybeeső vagy párhuzamos
      </text>
      <text
        x="280"
        y="184"
        fontSize="12"
        fontWeight="650"
        textAnchor="middle"
        fill="#1d3c48"
      >
        2. Ha nem: a harmadik egyenlet dönt — metsző vagy kitérő
      </text>
    </svg>
  );
}

/* ==================================================================== */
/* 6. Távolságok: pont–sík vetítéssel, kitérők normáltranszverzálissal    */
/* ==================================================================== */

export function AbraTavolsagok() {
  const V = keszitVetito(
    { azimut: -38, emelkedes: 24 },
    { ox: 148, oy: 200, leptek: 36 },
  );
  const V2 = keszitVetito(
    { azimut: -58, emelkedes: 26 },
    { ox: 414, oy: 190, leptek: 34 },
  );

  // bal panel: sík z = 0 darabja, Q a sík fölött
  const Q = [0.6, 0.4, 2.3];
  const T = [0.6, 0.4, 0];

  // jobb panel: két kitérő egyenes
  const P = [-2.2, -1.2, 0];
  const v1 = [1, 0.55, 0];
  const R = [-1.2, 1.8, 2.0];
  const v2 = [0.4, -1.2, 0.15];
  const A1 = V2([P[0] - 0.4 * v1[0], P[1] - 0.4 * v1[1], P[2]]);
  const B1 = V2([P[0] + 4.4 * v1[0], P[1] + 4.4 * v1[1], P[2]]);
  const A2 = V2([R[0] - 0.4 * v2[0], R[1] - 0.4 * v2[1], R[2]]);
  const B2 = V2([R[0] + 4.4 * v2[0], R[1] + 4.4 * v2[1], R[2]]);

  return (
    <svg viewBox="0 0 560 300" className="abra w-full">
      <NyilHegyek3D />

      {/* ---- bal panel ---- */}
      {(() => {
        const sarkok = [
          [-2.4, -2, 0],
          [2.4, -2, 0],
          [2.4, 2, 0],
          [-2.4, 2, 0],
        ].map((p) => V(p));
        const q = V(Q);
        const t = V(T);
        const n = V([T[0], T[1], 1.3]);
        return (
          <>
            <polygon
              points={sarkok.map((s) => `${s.x},${s.y}`).join(" ")}
              fill="#0f766e"
              fillOpacity="0.12"
              stroke="#0f766e"
              strokeWidth="1.4"
            />
            <line
              x1={q.x}
              y1={q.y}
              x2={t.x}
              y2={t.y}
              stroke="#e2590a"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              x1={t.x}
              y1={t.y}
              x2={n.x}
              y2={n.y}
              stroke="#7c3aed"
              strokeWidth="2.2"
              markerEnd="url(#h3-lila)"
              strokeDasharray="5 4"
            />
            <circle
              cx={q.x}
              cy={q.y}
              r="5"
              fill="#e2590a"
              stroke="white"
              strokeWidth="1.6"
            />
            <circle
              cx={t.x}
              cy={t.y}
              r="4"
              fill="#1d3c48"
              stroke="white"
              strokeWidth="1.4"
            />
            <text
              x={q.x + 10}
              y={q.y - 6}
              fontSize="12.5"
              fontWeight="650"
              style={{
                fill: "#e2590a",
                paintOrder: "stroke",
                stroke: "white",
                strokeWidth: 3.5,
              }}
            >
              Q
            </text>
            <text
              x={t.x + 10}
              y={t.y + 16}
              fontSize="12"
              fontWeight="650"
              style={{
                fill: "#1d3c48",
                paintOrder: "stroke",
                stroke: "white",
                strokeWidth: 3.5,
              }}
            >
              talppont
            </text>
            <text
              x={(q.x + t.x) / 2 - 10}
              y={(q.y + t.y) / 2}
              fontSize="12.5"
              fontWeight="700"
              textAnchor="end"
              style={{
                fill: "#e2590a",
                paintOrder: "stroke",
                stroke: "white",
                strokeWidth: 3.5,
              }}
            >
              d
            </text>
            <text
              x={n.x + 6}
              y={n.y - 4}
              fontSize="12"
              fontWeight="650"
              style={{
                fill: "#7c3aed",
                paintOrder: "stroke",
                stroke: "white",
                strokeWidth: 3.5,
              }}
            >
              n
            </text>
            <text
              x="148"
              y="276"
              fontSize="12.5"
              fontWeight="650"
              textAnchor="middle"
              fill="#1d3c48"
            >
              pont – sík: vetítés a normálisra
            </text>
            <text
              x="148"
              y="294"
              fontSize="12"
              textAnchor="middle"
              fill="#475569"
            >
              d = |PQ·n| / |n|
            </text>
          </>
        );
      })()}

      <line
        x1="282"
        y1="30"
        x2="282"
        y2="268"
        stroke="#dce9ed"
        strokeWidth="1.4"
      />

      {/* ---- jobb panel: kitérő egyenesek ---- */}
      <line
        x1={A1.x}
        y1={A1.y}
        x2={B1.x}
        y2={B1.y}
        stroke="#0f766e"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <line
        x1={A2.x}
        y1={A2.y}
        x2={B2.x}
        y2={B2.y}
        stroke="#e2590a"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      {(() => {
        // a normáltranszverzális: közös merőleges
        const n = [
          v1[1] * v2[2] - v1[2] * v2[1],
          v1[2] * v2[0] - v1[0] * v2[2],
          v1[0] * v2[1] - v1[1] * v2[0],
        ];
        const nh = Math.hypot(...n);
        const PQ = [R[0] - P[0], R[1] - P[1], R[2] - P[2]];
        // talppontok közelítése: a legrövidebb szakasz végpontjai
        const a11 = v1[0] * v1[0] + v1[1] * v1[1] + v1[2] * v1[2];
        const a12 = -(v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2]);
        const a22 = v2[0] * v2[0] + v2[1] * v2[1] + v2[2] * v2[2];
        const b1 = PQ[0] * v1[0] + PQ[1] * v1[1] + PQ[2] * v1[2];
        const b2 = -(PQ[0] * v2[0] + PQ[1] * v2[1] + PQ[2] * v2[2]);
        const det = a11 * a22 - a12 * a12;
        const s = (b1 * a22 - a12 * b2) / det;
        const u = (a11 * b2 - a12 * b1) / det;
        const X = [P[0] + s * v1[0], P[1] + s * v1[1], P[2] + s * v1[2]];
        const Y = [R[0] + u * v2[0], R[1] + u * v2[1], R[2] + u * v2[2]];
        const x = V2(X);
        const y = V2(Y);
        const p = V2(P);
        const rr = V2(R);
        return (
          <>
            <line
              x1={p.x}
              y1={p.y}
              x2={rr.x}
              y2={rr.y}
              stroke="#94a3b8"
              strokeWidth="1.4"
              strokeDasharray="4 3"
            />
            <line
              x1={x.x}
              y1={x.y}
              x2={y.x}
              y2={y.y}
              stroke="#7c3aed"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <circle
              cx={p.x}
              cy={p.y}
              r="4"
              fill="#0f766e"
              stroke="white"
              strokeWidth="1.4"
            />
            <circle
              cx={rr.x}
              cy={rr.y}
              r="4"
              fill="#e2590a"
              stroke="white"
              strokeWidth="1.4"
            />
            <text
              x={p.x - 8}
              y={p.y + 16}
              fontSize="12"
              fontWeight="650"
              textAnchor="end"
              style={{
                fill: "#0f766e",
                paintOrder: "stroke",
                stroke: "white",
                strokeWidth: 3.5,
              }}
            >
              P, v₁
            </text>
            <text
              x={rr.x - 8}
              y={rr.y - 16}
              fontSize="12"
              fontWeight="650"
              textAnchor="end"
              style={{
                fill: "#e2590a",
                paintOrder: "stroke",
                stroke: "white",
                strokeWidth: 3.5,
              }}
            >
              Q, v₂
            </text>
            <text
              x={(x.x + y.x) / 2 + 10}
              y={(x.y + y.y) / 2}
              fontSize="12.5"
              fontWeight="700"
              style={{
                fill: "#7c3aed",
                paintOrder: "stroke",
                stroke: "white",
                strokeWidth: 3.5,
              }}
            >
              d
            </text>
            <text
              x="418"
              y="276"
              fontSize="12.5"
              fontWeight="650"
              textAnchor="middle"
              fill="#1d3c48"
            >
              kitérő egyenesek: közös merőleges
            </text>
            <text
              x="418"
              y="294"
              fontSize="12"
              textAnchor="middle"
              fill="#475569"
            >
              d = |PQ·(v₁×v₂)| / |v₁×v₂|
            </text>
          </>
        );
      })()}
    </svg>
  );
}
