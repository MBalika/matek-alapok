"use client";

/**
 * Statikus SVG ábrák a Határozatlan integrál modulhoz.
 * A hosszabb magyarázat mindig a képaláírásba kerül, itt csak rövid feliratok állnak.
 */

const TEAL = "#0f766e";
const NAR = "#e2590a";
const LILA = "#7c3aed";
const SZURKE = "#94a3b8";
const SOTET = "#1d3c48";
const PIROS = "#dc2626";

function Hegyek() {
  return (
    <defs>
      <marker
        id="hi-hegy-s"
        viewBox="0 0 10 10"
        refX="8.5"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 1 L 9 5 L 0 9 z" fill={SOTET} />
      </marker>
      <marker
        id="hi-hegy-n"
        viewBox="0 0 10 10"
        refX="8.5"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 1 L 9 5 L 0 9 z" fill={NAR} />
      </marker>
      <marker
        id="hi-hegy-p"
        viewBox="0 0 10 10"
        refX="8.5"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 1 L 9 5 L 0 9 z" fill={PIROS} />
      </marker>
    </defs>
  );
}

function Felirat({ x, y, children, szin = SOTET, meret = 12, horgony = "middle", vastag = true, dolt = false }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={horgony}
      fontSize={meret}
      fontWeight={vastag ? 650 : 400}
      fontStyle={dolt ? "italic" : "normal"}
      style={{ fill: szin, paintOrder: "stroke", stroke: "white", strokeWidth: 3.4 }}
    >
      {children}
    </text>
  );
}

/* ================================================================
   6.1 — a tartó lánca: q → V → M
   Kéttámaszú tartó, egyenletesen megoszló q terheléssel.
   V(x) = q(L/2 − x),  M(x) = q·x·(L − x)/2
   ================================================================ */

export function AbraTartoLanc() {
  const bal = 92;
  const jobb = 452;
  const L = jobb - bal;

  // 1. sáv: a tartó
  const yTarto = 88;
  // 2. sáv: a nyíróerő
  const yV = 192;
  const Vmax = 34;
  // 3. sáv: a nyomaték
  const yM = 316;
  const Mmax = 52;

  const nyilak = [];
  for (let i = 0; i <= 8; i++) {
    const X = bal + (L * i) / 8;
    nyilak.push(X);
  }

  // nyomatéki parabola: M(x) = 4·Mmax·u(1−u), u = (x−bal)/L
  let mUt = "";
  for (let i = 0; i <= 60; i++) {
    const u = i / 60;
    const X = bal + L * u;
    const Y = yM - 4 * Mmax * u * (1 - u);
    mUt += `${i ? "L" : "M"}${X.toFixed(1)},${Y.toFixed(1)} `;
  }

  return (
    <svg viewBox="0 0 560 400" className="abra w-full select-none">
      <Hegyek />

      {/* ---------- 1. a terhelt tartó ---------- */}
      <Felirat x={bal - 8} y={yTarto - 44} szin={PIROS} horgony="end" meret={12.5}>
        q(x) = q₀
      </Felirat>
      <rect x={bal} y={yTarto - 38} width={L} height={20} fill="#fee2e2" stroke={PIROS} strokeWidth="1.2" />
      {nyilak.map((X, i) => (
        <line
          key={`q${i}`}
          x1={X}
          y1={yTarto - 18}
          x2={X}
          y2={yTarto - 5}
          stroke={PIROS}
          strokeWidth="1.5"
          markerEnd="url(#hi-hegy-p)"
        />
      ))}
      <rect x={bal} y={yTarto} width={L} height={9} fill="#cbd5e1" stroke={SOTET} strokeWidth="1.4" />
      {/* támaszok */}
      <polygon points={`${bal},${yTarto + 9} ${bal - 10},${yTarto + 26} ${bal + 10},${yTarto + 26}`} fill={SOTET} />
      <polygon points={`${jobb},${yTarto + 9} ${jobb - 10},${yTarto + 26} ${jobb + 10},${yTarto + 26}`} fill={SOTET} />
      <line x1={bal - 16} y1={yTarto + 28} x2={bal + 16} y2={yTarto + 28} stroke={SOTET} strokeWidth="1.6" />
      <line x1={jobb - 16} y1={yTarto + 28} x2={jobb + 16} y2={yTarto + 28} stroke={SOTET} strokeWidth="1.6" />
      <Felirat x={(bal + jobb) / 2} y={yTarto + 44} szin={SZURKE} meret={11.5} vastag={false}>
        L
      </Felirat>

      {/* ---------- 2. nyíróerő-ábra ---------- */}
      <line x1={bal - 14} y1={yV} x2={jobb + 24} y2={yV} stroke="#64748b" strokeWidth="1.1" markerEnd="url(#hi-hegy-s)" />
      <polygon
        points={`${bal},${yV} ${bal},${yV - Vmax} ${jobb},${yV + Vmax} ${jobb},${yV}`}
        fill="#ccfbf1"
        stroke={TEAL}
        strokeWidth="2.2"
      />
      <Felirat x={bal + 8} y={yV - Vmax - 9} szin={TEAL} horgony="start" meret={12}>
        +q₀L/2
      </Felirat>
      <Felirat x={jobb - 8} y={yV + Vmax + 16} szin={TEAL} horgony="end" meret={12}>
        −q₀L/2
      </Felirat>
      <Felirat x={bal - 22} y={yV + 4} szin={TEAL} horgony="end" meret={13}>
        V(x)
      </Felirat>

      {/* ---------- 3. nyomatéki ábra ---------- */}
      <line x1={bal - 14} y1={yM} x2={jobb + 24} y2={yM} stroke="#64748b" strokeWidth="1.1" markerEnd="url(#hi-hegy-s)" />
      <path d={`${mUt} L${jobb},${yM} L${bal},${yM} Z`} fill="#ffedd5" stroke={NAR} strokeWidth="2.4" />
      <line
        x1={(bal + jobb) / 2}
        y1={yM}
        x2={(bal + jobb) / 2}
        y2={yM - Mmax}
        stroke={SZURKE}
        strokeWidth="1"
        strokeDasharray="4 3"
      />
      <Felirat x={(bal + jobb) / 2} y={yM - Mmax - 9} szin={NAR} meret={12}>
        M = q₀L²/8
      </Felirat>
      <Felirat x={bal - 22} y={yM + 4} szin={NAR} horgony="end" meret={13}>
        M(x)
      </Felirat>

      {/* ---------- a lánc nyilai jobb oldalt ---------- */}
      <line x1={500} y1={yTarto + 4} x2={500} y2={yV - 34} stroke={TEAL} strokeWidth="1.8" markerEnd="url(#hi-hegy-n)" />
      <line x1={500} y1={yV + 40} x2={500} y2={yM - 58} stroke={NAR} strokeWidth="1.8" markerEnd="url(#hi-hegy-n)" />
      <Felirat x={512} y={(yTarto + yV) / 2 - 4} szin={TEAL} horgony="start" meret={11.5}>
        ∫
      </Felirat>
      <Felirat x={512} y={(yV + yM) / 2 + 2} szin={NAR} horgony="start" meret={11.5}>
        ∫
      </Felirat>

      {/* ---------- a két összefüggés ---------- */}
      <Felirat x={18} y={yV - 46} szin={TEAL} horgony="start" meret={12}>
        V′ = −q
      </Felirat>
      <Felirat x={18} y={yV - 30} szin={TEAL} horgony="start" meret={11} vastag={false}>
        V = −∫q dx
      </Felirat>
      <Felirat x={18} y={yM - 46} szin={NAR} horgony="start" meret={12}>
        M′ = V
      </Felirat>
      <Felirat x={18} y={yM - 30} szin={NAR} horgony="start" meret={11} vastag={false}>
        M = ∫V dx
      </Felirat>

      <Felirat x={280} y={378} szin={SOTET} meret={12.5}>
        terhelés → nyíróerő → nyomaték: kétszeri integrálás
      </Felirat>
    </svg>
  );
}

/* ================================================================
   2.5 / 3. fejezet — az 1/x és az ln|x| két ága
   ================================================================ */

export function AbraLnAbszolut() {
  const xMin = -4.2;
  const xMax = 4.2;
  const yMin = -3.2;
  const yMax = 3.2;
  const bal = 46;
  const jobb = 514;
  const fel = 26;
  const le = 314;
  const px = (x) => bal + ((x - xMin) / (xMax - xMin)) * (jobb - bal);
  const py = (y) => le - ((y - yMin) / (yMax - yMin)) * (le - fel);

  const ut = (fn, a, b, db = 140) => {
    let d = "";
    let elso = true;
    for (let i = 0; i <= db; i++) {
      const x = a + ((b - a) * i) / db;
      const y = fn(x);
      if (!Number.isFinite(y) || y < yMin - 0.4 || y > yMax + 0.4) {
        elso = true;
        continue;
      }
      d += `${elso ? "M" : "L"}${px(x).toFixed(1)},${py(y).toFixed(1)} `;
      elso = false;
    }
    return d;
  };

  const also = (x) => 1 / x;
  const lnAbs = (x) => Math.log(Math.abs(x));

  return (
    <svg viewBox="0 0 560 360" className="abra w-full select-none">
      <Hegyek />
      {/* tengelyek */}
      <line x1={bal - 6} y1={py(0)} x2={jobb + 8} y2={py(0)} stroke="#64748b" strokeWidth="1.2" markerEnd="url(#hi-hegy-s)" />
      <line x1={px(0)} y1={le + 6} x2={px(0)} y2={fel - 8} stroke="#64748b" strokeWidth="1.2" markerEnd="url(#hi-hegy-s)" />
      <Felirat x={jobb + 4} y={py(0) - 8} szin="#64748b" horgony="end" meret={11.5} vastag={false} dolt>
        x
      </Felirat>

      {/* 1/x */}
      <path d={ut(also, -4.1, -0.32)} fill="none" stroke={SZURKE} strokeWidth="2" strokeDasharray="6 4" />
      <path d={ut(also, 0.32, 4.1)} fill="none" stroke={SZURKE} strokeWidth="2" strokeDasharray="6 4" />
      <Felirat x={px(3.3)} y={py(also(3.3)) - 12} szin="#64748b" meret={12}>
        f(x) = 1/x
      </Felirat>

      {/* ln|x| két ága, eltérő konstanssal */}
      <path d={ut((x) => lnAbs(x), 0.06, 4.1)} fill="none" stroke={TEAL} strokeWidth="2.6" />
      <path d={ut((x) => lnAbs(x) + 1.2, -4.1, -0.06)} fill="none" stroke={NAR} strokeWidth="2.6" />
      <path d={ut((x) => lnAbs(x), -4.1, -0.06)} fill="none" stroke={NAR} strokeWidth="1.5" opacity="0.4" strokeDasharray="4 3" />

      <Felirat x={px(2.9)} y={py(lnAbs(2.9)) - 12} szin={TEAL} meret={12.5}>
        ln|x| + C₂
      </Felirat>
      <Felirat x={px(-2.9)} y={py(lnAbs(2.9) + 1.2) - 12} szin={NAR} meret={12.5}>
        ln|x| + C₁
      </Felirat>

      {/* a két ág elválasztása */}
      <line x1={px(0)} y1={fel} x2={px(0)} y2={le} stroke={PIROS} strokeWidth="1.2" strokeDasharray="5 4" opacity="0.7" />
      <Felirat x={px(0) - 12} y={le - 6} szin={PIROS} horgony="end" meret={11.5}>
        x &lt; 0
      </Felirat>
      <Felirat x={px(0) + 12} y={le - 6} szin={PIROS} horgony="start" meret={11.5}>
        x &gt; 0
      </Felirat>
      <Felirat x={280} y={344} szin={SOTET} meret={12}>
        két külön intervallum → két független konstans
      </Felirat>
    </svg>
  );
}

/* ================================================================
   8. fejezet — a racionális törtek négy lépése és az elemi törtek
   ================================================================ */

export function AbraRacionalisFolyamat() {
  const lepesek = [
    { cim: "1. Áltört?", szoveg: "deg p ≥ deg q →", also: "polinomosztás" },
    { cim: "2. Nevező", szoveg: "gyöktényezők és", also: "másodfokú tagok" },
    { cim: "3. Bontás", szoveg: "ismeretlen", also: "együtthatókkal" },
    { cim: "4. Integrálás", szoveg: "a négy elemi", also: "tört szerint" },
  ];
  const w = 120;
  const h = 62;
  const y0 = 34;

  const elemi = [
    { jel: "A/(x−α)", ered: "A·ln|x−α|" },
    { jel: "A/(x−α)ᵏ", ered: "hatvány" },
    { jel: "1/(x²+px+q)", ered: "arctg" },
    { jel: "(Bx+D)/(x²+px+q)", ered: "ln + arctg" },
  ];
  const ew = 126;
  const eh = 58;
  const ey = 190;

  return (
    <svg viewBox="0 0 560 300" className="abra w-full select-none">
      <Hegyek />
      {lepesek.map((l, i) => {
        const x = 12 + i * (w + 16);
        return (
          <g key={l.cim}>
            <rect x={x} y={y0} width={w} height={h} rx="10" fill="#ecfeff" stroke={TEAL} strokeWidth="1.6" />
            <Felirat x={x + w / 2} y={y0 + 20} szin={TEAL} meret={12.5}>
              {l.cim}
            </Felirat>
            <Felirat x={x + w / 2} y={y0 + 36} szin={SOTET} meret={10.5} vastag={false}>
              {l.szoveg}
            </Felirat>
            <Felirat x={x + w / 2} y={y0 + 50} szin={SOTET} meret={10.5} vastag={false}>
              {l.also}
            </Felirat>
            {i < 3 && (
              <line
                x1={x + w + 2}
                y1={y0 + h / 2}
                x2={x + w + 13}
                y2={y0 + h / 2}
                stroke={SOTET}
                strokeWidth="1.6"
                markerEnd="url(#hi-hegy-s)"
              />
            )}
          </g>
        );
      })}

      <Felirat x={280} y={134} szin={NAR} meret={12.5}>
        a 4. lépés: minden tag a négy elemi típus egyike
      </Felirat>
      <line x1={280} y1={142} x2={280} y2={ey - 8} stroke={NAR} strokeWidth="1.6" markerEnd="url(#hi-hegy-n)" />

      {elemi.map((e, i) => {
        const x = 8 + i * (ew + 10);
        return (
          <g key={e.jel}>
            <rect x={x} y={ey} width={ew} height={eh} rx="10" fill="#fff7ed" stroke={NAR} strokeWidth="1.5" />
            <Felirat x={x + ew / 2} y={ey + 22} szin={SOTET} meret={11.5}>
              {e.jel}
            </Felirat>
            <line x1={x + 14} y1={ey + 31} x2={x + ew - 14} y2={ey + 31} stroke="#fdba74" strokeWidth="1" />
            <Felirat x={x + ew / 2} y={ey + 47} szin={NAR} meret={11.5}>
              {e.ered}
            </Felirat>
          </g>
        );
      })}

      <Felirat x={280} y={282} szin={LILA} meret={12}>
        minden racionális tört elemi függvényekkel integrálható
      </Felirat>
    </svg>
  );
}
