"use client";

import FeladatFilm from "@/components/anim/FeladatFilm";
import { arany, beKi, lerp, simit } from "@/components/anim/Idovonal";
import { FeliratA, Hegy, NyilA, PontA } from "@/components/anim/FilmElemek";

const TEAL = "#0f766e";
const NAR = "#e2590a";
const LILA = "#7c3aed";
const SOTET = "#1d3c48";
const SZURKE = "#94a3b8";

const SZ = 560;
const MA = 350;

const FEJEZETEK = [
  {
    t0: 0,
    cim: "1. A feladat",
    szoveg:
      "Mekkora a szinuszdomb alatti terület a 0 és π között? A 2. fejezet módszerével ez hosszú számolás volna.",
    kepletek: ["\\int_0^{\\pi}\\sin x\\,dx = ?"],
  },
  {
    t0: 3.4,
    cim: "2. Téglalapokkal közelítünk",
    szoveg:
      "Felosztjuk a szakaszt, és minden részen egy téglalappal közelítünk. Ahogy n nő, a téglalapok rásimulnak a görbére.",
    kepletek: ["\\sigma_n=\\sum f(\\xi_i)\\,\\Delta x_i"],
  },
  {
    t0: 8.2,
    cim: "3. Az integrálfüggvény",
    szoveg:
      "Tegyük a felső határt változóvá: T(x) a 0-tól x-ig felhalmozott terület. Ez a lila görbe — és a meredeksége minden x-ben épp sin x.",
    kepletek: ["T(x)=\\int_0^x\\sin t\\,dt = 1-\\cos x"],
  },
  {
    t0: 12.4,
    cim: "4. A Newton–Leibniz-tétel",
    szoveg:
      "Mivel T primitív függvénye a szinusznak, elég a végpontokban kiértékelni: felső mínusz alsó. A téglalapokra többé nincs szükség.",
    kepletek: ["\\int_0^{\\pi}\\sin x\\,dx=\\left[-\\cos x\\right]_0^{\\pi}=1+1=2"],
  },
  {
    t0: 16.4,
    cim: "5. Helyettesítésnél a határok is átváltoznak",
    szoveg:
      "Másik feladat: ∫₀³ x/√(x²+16) dx. Az u = x²+16 helyettesítéssel a 0 és 3 határok helyére 16 és 25 kerül.",
    kepletek: ["u=x^2+16,\\quad x\\,dx=\\frac{du}{2}"],
  },
  {
    t0: 20.4,
    cim: "6. És kész",
    szoveg:
      "Az új változóval az integrál egyetlen sor. Aki a régi határokat hagyja ott, az a félév leggyakoribb hibáját követi el.",
    kepletek: ["\\frac12\\int_{16}^{25}u^{-1/2}du=\\left[\\sqrt u\\right]_{16}^{25}=1"],
  },
];

/* --- 1. jelenet koordinátái: a szinuszdomb --- */
const bx = 56;
const jx = 470;
const ay = 268;
const fy = 92;
const px = (x) => bx + (x / Math.PI) * (jx - bx);
const py = (y) => ay - (y / 2) * (ay - fy); // a függőleges tengelyen 0 … 2 fér el

function gorbeUt(ig) {
  let d = "";
  for (let i = 0; i <= 120; i++) {
    const x = (Math.PI * i) / 120;
    if (x > ig) break;
    d += `${i ? "L" : "M"}${px(x).toFixed(1)},${py(Math.sin(x)).toFixed(1)} `;
  }
  return d;
}

function teruletUt() {
  let d = `M${px(0).toFixed(1)},${py(0).toFixed(1)} `;
  for (let i = 0; i <= 120; i++) {
    const x = (Math.PI * i) / 120;
    d += `L${px(x).toFixed(1)},${py(Math.sin(x)).toFixed(1)} `;
  }
  return `${d}L${px(Math.PI).toFixed(1)},${py(0).toFixed(1)} Z`;
}

function rajz(t) {
  /* --- áttűnés a két jelenet között --- */
  const elso = 1 - arany(t, 15.8, 16.6, simit);
  const masodik = arany(t, 16.0, 16.9, simit);

  /* n a 2. fejezetben */
  let n = 0;
  if (t >= 3.4) n = Math.round(lerp(4, 34, arany(t, 3.6, 7.8, simit)));
  const teglOp = t < 12.6 ? 1 : 1 - arany(t, 12.8, 14.2, simit);
  const osszeg = (() => {
    if (!n) return 0;
    let s = 0;
    const h = Math.PI / n;
    for (let i = 0; i < n; i++) s += Math.sin(h * (i + 0.5)) * h;
    return s;
  })();

  const uGorbe = arany(t, 0.4, 2.6, simit);
  const uTerulet = arany(t, 1.4, 3.0, simit) * (t < 12.4 ? 0.45 : 1);
  const uT = arany(t, 8.4, 11.4, simit);
  const xT = Math.PI * uT;
  const uTetel = arany(t, 12.6, 14.0);
  const uKettes = arany(t, 14.2, 15.4, beKi);

  /* --- 2. jelenet: a határok átírása --- */
  const sx0 = 92;
  const sx1 = 470;
  const uy = 150;
  const vy = 250;
  const uHatar = arany(t, 17.6, 19.6, beKi);
  const uVeg = arany(t, 20.6, 22.0, simit);
  const xAr = (x) => sx0 + (x / 3) * (sx1 - sx0);
  const uAr = (u) => sx0 + ((u - 16) / 9) * (sx1 - sx0);

  return (
    <svg viewBox={`0 0 ${SZ} ${MA}`} className="abra w-full select-none">
      <defs>
        <Hegy id="nl-nar" szin={NAR} />
        <Hegy id="nl-lila" szin={LILA} />
        <Hegy id="nl-szurke" szin={SZURKE} />
      </defs>

      {/* ===================== 1. jelenet ===================== */}
      {elso > 0.01 && (
        <g opacity={elso}>
          {/* tengelyek */}
          <line x1={bx - 26} y1={ay} x2={jx + 30} y2={ay} stroke="#475569" strokeWidth="1.3" />
          <line x1={bx} y1={ay + 22} x2={bx} y2={fy - 24} stroke="#475569" strokeWidth="1.3" />
          <FeliratA x={px(Math.PI)} y={ay + 20} szin={SOTET} meret={12}>
            π
          </FeliratA>
          <FeliratA x={bx - 10} y={ay + 20} szin={SOTET} meret={12}>
            0
          </FeliratA>
          <FeliratA x={bx - 12} y={py(1) + 4} szin={SZURKE} meret={11.5} horgony="end" vastag={false}>
            1
          </FeliratA>
          <FeliratA x={bx - 12} y={py(2) + 4} szin={SZURKE} meret={11.5} horgony="end" vastag={false}>
            2
          </FeliratA>

          {/* a terület */}
          {uTerulet > 0.02 && <path d={teruletUt()} fill={NAR} fillOpacity={0.24 * uTerulet} />}

          {/* téglalapok */}
          {n > 0 && teglOp > 0.01 && (
            <g opacity={teglOp}>
              {Array.from({ length: n }, (_, i) => {
                const h = Math.PI / n;
                const kozep = h * (i + 0.5);
                const y = Math.sin(kozep);
                return (
                  <rect
                    key={i}
                    x={px(h * i)}
                    y={py(y)}
                    width={px(h) - px(0)}
                    height={py(0) - py(y)}
                    fill={TEAL}
                    fillOpacity="0.2"
                    stroke={TEAL}
                    strokeWidth={n > 20 ? 0.5 : 1}
                  />
                );
              })}
            </g>
          )}

          {/* a görbe */}
          {uGorbe > 0.01 && (
            <path d={gorbeUt(Math.PI * uGorbe)} fill="none" stroke={TEAL} strokeWidth="2.8" />
          )}

          {/* az integrálfüggvény */}
          {uT > 0.01 && (
            <g>
              <path
                d={(() => {
                  let d = "";
                  for (let i = 0; i <= 120; i++) {
                    const x = (Math.PI * i) / 120;
                    if (x > xT) break;
                    d += `${i ? "L" : "M"}${px(x).toFixed(1)},${py(1 - Math.cos(x)).toFixed(1)} `;
                  }
                  return d;
                })()}
                fill="none"
                stroke={LILA}
                strokeWidth="2.6"
              />
              <PontA x={px(xT)} y={py(1 - Math.cos(xT))} r={5} szin={LILA} u={1} />
              <FeliratA x={px(1.95)} y={py(1.78)} szin={LILA} meret={12.5}>
                T(x) = 1 − cos x
              </FeliratA>
            </g>
          )}

          {/* feliratok */}
          {n > 0 && teglOp > 0.5 && (
            <FeliratA x={px(Math.PI / 2)} y={fy - 34} szin={TEAL} meret={13}>
              n = {n} téglalap, összegük {osszeg.toFixed(4).replace(".", ",")}
            </FeliratA>
          )}
          {uTetel > 0.02 && (
            <g opacity={uTetel}>
              <FeliratA x={px(Math.PI / 2)} y={fy - 56} szin={SOTET} meret={13}>
                [−cos x]₀^π = (+1) − (−1)
              </FeliratA>
            </g>
          )}
          {uKettes > 0.02 && (
            <text
              x={px(Math.PI / 2)}
              y={py(0.55)}
              fontSize={34 * Math.min(1, uKettes + 0.3)}
              fontWeight="800"
              textAnchor="middle"
              opacity={uKettes}
              style={{ fill: NAR, paintOrder: "stroke", stroke: "white", strokeWidth: 5 }}
            >
              = 2
            </text>
          )}
        </g>
      )}

      {/* ===================== 2. jelenet ===================== */}
      {masodik > 0.01 && (
        <g opacity={masodik}>
          <FeliratA x={SZ / 2} y={62} szin={SOTET} meret={14}>
            ∫₀³ x / √(x² + 16) dx,  u = x² + 16
          </FeliratA>

          {/* x tengely */}
          <line x1={sx0 - 34} y1={uy} x2={sx1 + 34} y2={uy} stroke="#475569" strokeWidth="1.4" />
          <FeliratA x={sx1 + 42} y={uy + 4} szin={SZURKE} meret={12} horgony="end" vastag={false}>
            x
          </FeliratA>
          {[0, 1, 2, 3].map((v) => (
            <g key={v}>
              <line x1={xAr(v)} y1={uy - 5} x2={xAr(v)} y2={uy + 5} stroke="#475569" strokeWidth="1.2" />
              <FeliratA x={xAr(v)} y={uy - 12} szin={SOTET} meret={12}>
                {v}
              </FeliratA>
            </g>
          ))}

          {/* u tengely */}
          <line x1={sx0 - 34} y1={vy} x2={sx1 + 34} y2={vy} stroke="#475569" strokeWidth="1.4" />
          <FeliratA x={sx1 + 42} y={vy + 4} szin={SZURKE} meret={12} horgony="end" vastag={false}>
            u
          </FeliratA>
          {[16, 19, 22, 25].map((v) => (
            <g key={v}>
              <line x1={uAr(v)} y1={vy - 5} x2={uAr(v)} y2={vy + 5} stroke="#475569" strokeWidth="1.2" />
              <FeliratA x={uAr(v)} y={vy + 20} szin={SOTET} meret={12}>
                {v}
              </FeliratA>
            </g>
          ))}

          {/* a két határ „átcsúszik” */}
          <NyilA x1={xAr(0)} y1={uy + 8} x2={uAr(16)} y2={vy - 8} u={uHatar} szin={NAR} hegy="nl-nar" vastag={2.4} />
          <NyilA x1={xAr(3)} y1={uy + 8} x2={uAr(25)} y2={vy - 8} u={uHatar} szin={NAR} hegy="nl-nar" vastag={2.4} />
          {uHatar > 0.8 && (
            <>
              <PontA x={uAr(16)} y={vy} r={5} szin={NAR} u={1} />
              <PontA x={uAr(25)} y={vy} r={5} szin={NAR} u={1} />
              <FeliratA x={(xAr(1.5) + uAr(20)) / 2} y={(uy + vy) / 2 + 4} szin={NAR} meret={12.5}>
                x = 0 → u = 16 · x = 3 → u = 25
              </FeliratA>
            </>
          )}

          {uVeg > 0.02 && (
            <g opacity={uVeg}>
              <FeliratA x={SZ / 2} y={302} szin={SOTET} meret={14}>
                ½ ∫₁₆²⁵ u^(−1/2) du = [√u]₁₆²⁵ = 5 − 4
              </FeliratA>
              <FeliratA x={SZ / 2} y={330} szin={NAR} meret={17}>
                = 1
              </FeliratA>
            </g>
          )}
        </g>
      )}
    </svg>
  );
}

export default function FilmNewtonLeibniz() {
  return (
    <FeladatFilm
      cim="A Newton–Leibniz-tétel munka közben"
      hossz={24}
      fejezetek={FEJEZETEK}
      rajz={rajz}
      megjegyzes="A téglalapok csak a megértéshez kellenek: a tétel után a primitív függvény két behelyettesítése elég."
    />
  );
}
