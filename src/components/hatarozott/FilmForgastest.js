"use client";

import FeladatFilm from "@/components/anim/FeladatFilm";
import { arany, beKi, lerp, simit } from "@/components/anim/Idovonal";
import { FeliratA, Hegy, NyilA, PontA } from "@/components/anim/FilmElemek";

const TEAL = "#0f766e";
const NAR = "#e2590a";
const LILA = "#7c3aed";
const SOTET = "#1d3c48";

const SZ = 560;
const MA = 380;

const R = 2;

const FEJEZETEK = [
  {
    t0: 0,
    cim: "1. A félkör",
    szoveg:
      "A gömböt az y = √(R² − x²) félkör megforgatásával kapjuk az x tengely körül. Legyen R = 2.",
    kepletek: ["y=\\sqrt{R^2-x^2},\\quad -R\\le x\\le R"],
  },
  {
    t0: 3.6,
    cim: "2. Korongokra vágjuk",
    szoveg:
      "A testet az x tengelyre merőleges, Δx vastagságú szeletekre vágjuk. Egy szelet közelítőleg henger: az alapkörének sugara f(x).",
    kepletek: ["\\Delta V\\approx f(x)^2\\pi\\,\\Delta x"],
  },
  {
    t0: 7.6,
    cim: "3. Egy korong megforgatva",
    szoveg:
      "Emeljünk ki egy korongot: a profil f(x) magasságú szakasza körré fordul, a korong pedig hengerré. Ez az egyetlen kép, amit meg kell jegyezni.",
    kepletek: ["V_{\\text{henger}}=r^2\\pi m"],
  },
  {
    t0: 11.2,
    cim: "4. Az összes korong",
    szoveg:
      "A korongok térfogatát összeadjuk. Ez egy Riemann-összeg — ahogy a szeletek vékonyodnak, az összeg az integrálhoz tart.",
    kepletek: ["\\sum f(x_i)^2\\pi\\,\\Delta x_i \\longrightarrow \\pi\\int_a^b f^2dx"],
  },
  {
    t0: 15.4,
    cim: "5. Az integrál",
    szoveg:
      "Behelyettesítve f² = R² − x², és a határok −R és R. A primitív függvény R²x − x³/3, az eredmény a jól ismert gömbtérfogat.",
    kepletek: [
      "V=\\pi\\int_{-R}^{R}\\left(R^2-x^2\\right)dx=\\frac{4R^3\\pi}{3}",
    ],
  },
  {
    t0: 19.4,
    cim: "6. És a csonkakúp",
    szoveg:
      "Ugyanez a gondolat egyenes profillal: a korongok sugara lineárisan nő, és a képlet a csonkakúp ismert térfogatát adja vissza.",
    kepletek: ["V=\\frac{\\pi m}{3}\\left(R^2+Rr+r^2\\right)"],
  },
];

/* --- vetítés --- */
const ox = 280;
const cy = 170;
const k = 62; // képpont / egység (vízszintesen és függőlegesen azonos)
const ky = 62;
const lapit = 0.34;

const px = (x) => ox + x * k;
const felkor = (x) => Math.sqrt(Math.max(0, R * R - x * x));
const egyenes = (x) => 0.55 + 0.3 * (x + R); // csonkakúp profil: 0,55 → 1,75

function profilUt(fn, jel = 1, tol = -R, ig = R) {
  let d = "";
  for (let i = 0; i <= 100; i++) {
    const x = tol + ((ig - tol) * i) / 100;
    d += `${i ? "L" : "M"}${px(x).toFixed(1)},${(cy - jel * fn(x) * ky).toFixed(1)} `;
  }
  return d;
}

function rajz(t) {
  const uProfil = arany(t, 0.3, 2.4, simit);
  const uVagas = arany(t, 3.8, 6.4, simit);
  const uKiemelt = arany(t, 7.8, 10.2, beKi);
  const uMind = arany(t, 11.4, 14.4, simit);
  const uIntegral = arany(t, 15.6, 17.4, simit);
  const uEredmeny = arany(t, 17.4, 18.8, beKi);
  const csonka = arany(t, 19.6, 21.6, simit);

  const fn = (x) => lerp(felkor(x), egyenes(x), csonka);

  /* a szeletek száma */
  let n = 0;
  if (t >= 3.6) n = 8;
  if (t >= 11.4) n = Math.round(lerp(8, 26, arany(t, 11.6, 14.4, simit)));

  const kiemeltIdx = 5;
  const h = (2 * R) / 8;

  const osszeg = (() => {
    if (!n) return 0;
    const hh = (2 * R) / n;
    let s = 0;
    for (let i = 0; i < n; i++) {
      const xk = -R + hh * (i + 0.5);
      s += Math.PI * fn(xk) * fn(xk) * hh;
    }
    return s;
  })();

  return (
    <svg viewBox={`0 0 ${SZ} ${MA}`} className="abra w-full select-none">
      <defs>
        <Hegy id="fg-nar" szin={NAR} />
        <Hegy id="fg-lila" szin={LILA} />
      </defs>

      {/* tengely */}
      <line x1={px(-R) - 46} y1={cy} x2={px(R) + 52} y2={cy} stroke="#475569" strokeWidth="1.3" />
      <FeliratA x={px(R) + 58} y={cy + 4} szin="#64748b" meret={12} horgony="end" vastag={false}>
        x
      </FeliratA>
      <FeliratA x={px(-R)} y={cy + 22} szin={SOTET} meret={12}>
        {csonka > 0.5 ? "0" : "−R"}
      </FeliratA>
      <FeliratA x={px(R)} y={cy + 22} szin={SOTET} meret={12}>
        {csonka > 0.5 ? "m" : "R"}
      </FeliratA>

      {/* a test sziluettje */}
      {uProfil > 0.02 && (
        <path
          d={`${profilUt(fn, 1)} L${px(R).toFixed(1)},${(cy + fn(R) * ky).toFixed(1)} ${profilUt(fn, -1, R, -R)
            .replace("M", "L")} Z`}
          fill={TEAL}
          fillOpacity={0.08 + 0.08 * uMind}
          stroke="none"
        />
      )}

      {/* korongok */}
      {n > 0 && (
        <g opacity={Math.min(1, uVagas + uMind)}>
          {Array.from({ length: n }, (_, i) => {
            const hh = (2 * R) / n;
            const x0 = -R + hh * i;
            const xk = x0 + hh / 2;
            const r = fn(xk);
            if (r < 1e-3) return null;
            const kiemelt = n === 8 && i === kiemeltIdx && uKiemelt > 0.05;
            return (
              <g key={i} opacity={kiemelt ? 1 : 1}>
                <rect
                  x={px(x0)}
                  y={cy - r * ky}
                  width={px(hh) - px(0)}
                  height={2 * r * ky}
                  fill={kiemelt ? NAR : LILA}
                  fillOpacity={kiemelt ? 0.26 : 0.12}
                  stroke={kiemelt ? NAR : LILA}
                  strokeWidth={n > 16 ? 0.6 : 1.1}
                />
                {(uKiemelt > 0.05 || uMind > 0.05) && (
                  <ellipse
                    cx={px(x0 + hh)}
                    cy={cy}
                    rx={Math.max(1, r * ky * lapit) * (kiemelt ? uKiemelt : Math.min(1, uMind * 1.4))}
                    ry={r * ky}
                    fill="none"
                    stroke={kiemelt ? NAR : LILA}
                    strokeWidth={kiemelt ? 1.8 : 1}
                    opacity={kiemelt ? 1 : 0.8}
                  />
                )}
              </g>
            );
          })}
        </g>
      )}

      {/* a profilgörbe */}
      {uProfil > 0.02 && (
        <path
          d={profilUt(fn, 1, -R, -R + 2 * R * uProfil)}
          fill="none"
          stroke={TEAL}
          strokeWidth="2.8"
        />
      )}
      {uProfil > 0.98 && (
        <path d={profilUt(fn, -1)} fill="none" stroke={TEAL} strokeWidth="1.5" opacity="0.5" />
      )}

      {/* a kiemelt korong sugara */}
      {uKiemelt > 0.05 && n === 8 && (
        <g opacity={uKiemelt}>
          <NyilA
            x1={px(-R + h * (kiemeltIdx + 0.5))}
            y1={cy}
            x2={px(-R + h * (kiemeltIdx + 0.5))}
            y2={cy - fn(-R + h * (kiemeltIdx + 0.5)) * ky}
            u={1}
            szin={NAR}
            hegy="fg-nar"
            vastag={2.2}
          />
          <FeliratA
            x={px(-R + h * (kiemeltIdx + 0.5)) + 30}
            y={cy - (fn(-R + h * (kiemeltIdx + 0.5)) * ky) / 2}
            szin={NAR}
            meret={12.5}
          >
            r = f(x)
          </FeliratA>
          <FeliratA x={px(-R + h * (kiemeltIdx + 0.5))} y={cy + fn(-R + h * (kiemeltIdx + 0.5)) * ky + 22} szin={NAR} meret={12}>
            Δx
          </FeliratA>
        </g>
      )}

      {/* feliratok */}
      <FeliratA x={SZ / 2} y={34} szin={SOTET} meret={13.5}>
        {csonka > 0.5
          ? "csonkakúp: a sugár lineárisan nő"
          : t < 3.6
            ? "y = √(4 − x²) — a félkör R = 2 sugárral"
            : "a testet Δx vastag korongokra szeleteljük"}
      </FeliratA>

      {n > 0 && (uVagas > 0.5 || uMind > 0.02) && csonka < 0.5 && (
        <FeliratA x={SZ / 2} y={MA - 64} szin={LILA} meret={12.5}>
          {n} korong · a térfogatuk összege {osszeg.toFixed(3).replace(".", ",")}
        </FeliratA>
      )}

      {uIntegral > 0.02 && csonka < 0.5 && (
        <g opacity={uIntegral}>
          <FeliratA x={SZ / 2} y={MA - 38} szin={SOTET} meret={13.5}>
            V = π ∫₋₂² (4 − x²) dx = π [4x − x³/3]₋₂²
          </FeliratA>
        </g>
      )}
      {uEredmeny > 0.02 && csonka < 0.5 && (
        <g opacity={uEredmeny}>
          <FeliratA x={SZ / 2} y={MA - 10} szin={NAR} meret={16}>
            = 32π/3 ≈ 33,51
          </FeliratA>
        </g>
      )}
      {csonka > 0.5 && (
        <g opacity={csonka}>
          <FeliratA x={SZ / 2} y={MA - 38} szin={SOTET} meret={13.5}>
            V = π ∫₀ᵐ (kx + r)² dx
          </FeliratA>
          <FeliratA x={SZ / 2} y={MA - 10} szin={NAR} meret={15}>
            = πm(R² + Rr + r²)/3
          </FeliratA>
        </g>
      )}

      {/* felvillanó pont a gömb közepén, hogy a forgástengely látszódjon */}
      {uKiemelt > 0.4 && csonka < 0.5 && <PontA x={px(0)} y={cy} r={3} szin={SOTET} u={1} opacitas={0.6} />}
    </svg>
  );
}

export default function FilmForgastest() {
  return (
    <FeladatFilm
      cim="A gömb térfogata korongmódszerrel"
      hossz={23}
      fejezetek={FEJEZETEK}
      rajz={rajz}
      megjegyzes="A korong sugara f(x), ezért a képletben előbb négyzetre emelünk, és csak utána integrálunk."
    />
  );
}
