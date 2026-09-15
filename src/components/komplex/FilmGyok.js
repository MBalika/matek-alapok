"use client";

import FeladatFilm from "@/components/anim/FeladatFilm";
import { arany, lerp, rugo } from "@/components/anim/Idovonal";
import { Hegy, NyilA, VonalA, FeliratA, IvA, PontA } from "@/components/anim/FilmElemek";

/* ⁴√(−128 − 128√3 i): a szám 256 hosszú, a gyökök 4 hosszúak — a film „ránagyít” a gyökök körére. */

const OX = 280;
const OY = 200;
const RAD = Math.PI / 180;
const NAR = "#e2590a";
const TEAL = "#0f766e";
const LILA = "#7c3aed";

const R = 256;
const FI = 240;
const RHO = 4;
const Z = { x: R * Math.cos(FI * RAD), y: R * Math.sin(FI * RAD) };
const GYOKOK = [0, 1, 2, 3].map((k) => {
  const a = (FI + 360 * k) / 4;
  return { k, fok: a, x: RHO * Math.cos(a * RAD), y: RHO * Math.sin(a * RAD) };
});

const S_NAGY = 0.7; // képpont / egység, amikor z látszik
const S_KICSI = 42; // képpont / egység, amikor a gyökök látszanak

const FEJEZETEK = [
  {
    t0: 0,
    cim: "A szám a Gauss-síkon",
    szoveg: "A −128 − 128√3 i mindkét koordinátája negatív: a III. negyedben van. A hossza 256 — a képen minden egység 0,7 képpont.",
    kepletek: ["r = \\sqrt{128^2 + (128\\sqrt3)^2} = 128\\cdot 2 = 256"],
  },
  {
    t0: 3.2,
    cim: "Az argumentum — a negyedek csapdája",
    szoveg: "tg φ = √3-ból a hegyesszög 60°. A számológép ezt adná, de a szám a III. negyedben van, ezért φ = 180° + 60° = 240°.",
    kepletek: ["\\operatorname{tg}\\varphi = \\tfrac{-128\\sqrt3}{-128} = \\sqrt3 \\ \\Rightarrow\\ \\alpha = 60^\\circ,\\quad \\varphi = 240^\\circ"],
  },
  {
    t0: 6.5,
    cim: "Nagyítás: a gyökök köre",
    szoveg: "A gyökök abszolút értéke ⁴√256 = 4 — hatvannégyszer kisebb, mint z. Ránagyítunk az origó környékére: itt egy egység már 42 képpont.",
    kepletek: ["\\rho = \\sqrt[4]{256} = 4"],
  },
  {
    t0: 10,
    cim: "Az első gyök: a szög negyede",
    szoveg: "A 240°-os szög negyede 60°. Ez a k = 0 gyök: 4(cos 60° + i sin 60°) = 2 + 2√3 i.",
    kepletek: ["\\alpha_0 = \\tfrac{240^\\circ}{4} = 60^\\circ,\\qquad w_0 = 2 + 2\\sqrt3\\,i"],
  },
  {
    t0: 13.2,
    cim: "A többi gyök 90°-onként",
    szoveg: "A 2kπ többletszögek negyede k·90°: a további gyökök 90°-onként követik egymást a 4 sugarú körön, és egy négyzetet feszítenek ki.",
    kepletek: ["\\alpha_k = 60^\\circ + k\\cdot 90^\\circ:\\quad 60^\\circ,\\ 150^\\circ,\\ 240^\\circ,\\ 330^\\circ"],
  },
  {
    t0: 17.5,
    cim: "Ellenőrzés: w₀ négyszer önmagával",
    szoveg: "Minden szorzás 60°-kal forgat és 4-szeresére nyújt: 4 → 16 → 64 → 256, és 60° → 120° → 180° → 240°. A negyedik lépés visszaér z-be — kicsinyítünk, hogy lássuk.",
    kepletek: ["w_0^4 = 4^4\\left(\\cos 240^\\circ + i\\sin 240^\\circ\\right) = -128 - 128\\sqrt3\\,i\\ \\checkmark"],
  },
];

function Rajz(t) {
  const zU = arany(t, 0.3, 1.6);
  const zFel = arany(t, 1.5, 2.0);
  const rFel = arany(t, 2.0, 2.6);
  const fiIv = arany(t, 3.4, 4.6);
  const alfaIv = arany(t, 4.8, 5.6);
  const fiFel = arany(t, 5.6, 6.1);

  // nagyítás 6.7 → 9.3 között (logaritmikus interpoláció, hogy egyenletes legyen)
  const zoomU = arany(t, 6.7, 9.3);
  // visszakicsinyítés 20.2 → 22.5 között
  const vissza = arany(t, 20.3, 22.6);
  const logS = lerp(lerp(Math.log(S_NAGY), Math.log(S_KICSI), zoomU), Math.log(S_NAGY), vissza);
  const S = Math.exp(logS);

  const korU = arany(t, 8.6, 9.6);
  const w0U = arany(t, 10.3, 11.4);
  const w0Iv = arany(t, 11.4, 12.2);
  const w0Fel = arany(t, 12.0, 12.6);

  const tobbi = [1, 2, 3].map((k) => arany(t, 13.4 + (k - 1) * 1.1, 14.1 + (k - 1) * 1.1, rugo));
  const negyzetU = arany(t, 16.4, 17.3);

  // ellenőrzés: hatványok
  const hatv = [1, 2, 3, 4].map((k) => arany(t, 17.8 + (k - 1) * 0.65, 18.3 + (k - 1) * 0.65, rugo));

  const px = (x) => OX + x * S;
  const py = (y) => OY - y * S;

  const zLathato = S < 3 ? 1 : 0;
  const gyokLathato = S > 3 ? Math.min(1, (S - 3) / 10) : 0;

  return (
    <svg viewBox="0 0 560 400" className="abra w-full select-none">
      <defs>
        <Hegy id="fg-z" szin={NAR} />
        <Hegy id="fg-w" szin={LILA} />
        <Hegy id="fg-t" szin="#475569" />
        <Hegy id="fg-e" szin={TEAL} />
      </defs>

      <line x1={OX - 265} y1={OY} x2={OX + 268} y2={OY} stroke="#475569" strokeWidth="1.2" markerEnd="url(#fg-t)" />
      <line x1={OX} y1={OY + 190} x2={OX} y2={OY - 188} stroke="#475569" strokeWidth="1.2" markerEnd="url(#fg-t)" />
      <text x={OX + 262} y={OY + 17} fontSize="12.5" fontStyle="italic" fill="#1d3c48" textAnchor="end">Re</text>
      <text x={OX + 7} y={OY - 190} fontSize="12.5" fontStyle="italic" fill="#1d3c48">Im</text>

      {/* lépték felirat */}
      <FeliratA x={OX - 250} y={OY - 170} meret={11} vastag={false} szin="#64748b" horgony="start">
        1 egység = {S.toFixed(1).replace(".", ",")} px
      </FeliratA>

      {/* z és jellemzői — csak kis nagyításnál */}
      <g opacity={zLathato}>
        <NyilA x1={OX} y1={OY} x2={px(Z.x)} y2={py(Z.y)} u={zU} szin={NAR} hegy="fg-z" vastag={3.2} />
        <FeliratA x={px(Z.x) - 8} y={py(Z.y) + 18} szin={NAR} opacitas={zFel} horgony="end">z = −128 − 128√3 i</FeliratA>
        <FeliratA x={px(Z.x / 2) - 14} y={py(Z.y / 2) - 6} szin={NAR} meret={11.5} vastag={false} opacitas={rFel} horgony="end">r = 256</FeliratA>
        <IvA cx={OX} cy={OY} r={46} kezdoFok={0} vegFok={FI} u={fiIv} szin={NAR} />
        <FeliratA x={OX + 40} y={OY + 36} szin={NAR} meret={11.5} opacitas={fiIv}>φ = 240°</FeliratA>
        <IvA cx={OX} cy={OY} r={64} kezdoFok={180} vegFok={FI} u={alfaIv} szin={TEAL} />
        <FeliratA x={OX - 82} y={OY + 50} szin={TEAL} meret={11.5} opacitas={alfaIv}>α = 60°</FeliratA>
        <FeliratA x={OX - 150} y={OY + 120} szin={TEAL} meret={11.5} opacitas={fiFel} vastag={false}>III. negyed → φ = 180° + 60°</FeliratA>
        {/* ellenőrzés: a hatványok pontjai kicsinyítés után */}
        {[1, 2, 3, 4].map((k) => {
          const r = Math.pow(RHO, k);
          const a = 60 * k;
          return (
            <PontA key={k} x={px(r * Math.cos(a * RAD))} y={py(r * Math.sin(a * RAD))} r={4.5} szin={TEAL} u={hatv[k - 1] * vissza} />
          );
        })}
      </g>

      {/* a gyökök köre és a gyökök — nagy nagyításnál */}
      <g opacity={gyokLathato}>
        <circle cx={OX} cy={OY} r={RHO * S * korU} fill="none" stroke="#a78bfa" strokeWidth="1.4" strokeDasharray="5 4" />
        <FeliratA x={OX + RHO * S + 8} y={OY - 6} szin={LILA} meret={11.5} vastag={false} opacitas={korU} horgony="start">ρ = 4</FeliratA>

        {/* w0 */}
        <NyilA x1={OX} y1={OY} x2={px(GYOKOK[0].x)} y2={py(GYOKOK[0].y)} u={w0U} szin={LILA} hegy="fg-w" vastag={3} />
        <IvA cx={OX} cy={OY} r={34} kezdoFok={0} vegFok={60} u={w0Iv} szin={LILA} />
        <FeliratA x={OX + 44} y={OY - 14} szin={LILA} meret={11.5} opacitas={w0Iv}>60°</FeliratA>
        <FeliratA x={px(GYOKOK[0].x) + 12} y={py(GYOKOK[0].y) - 8} szin={LILA} opacitas={w0Fel} horgony="start">w₀ = 2 + 2√3 i</FeliratA>

        {/* w1, w2, w3 */}
        {GYOKOK.slice(1).map((w, i) => {
          const u = tobbi[i];
          const elozo = GYOKOK[i];
          return (
            <g key={w.k}>
              <IvA cx={OX} cy={OY} r={34 + 10 * (i + 1)} kezdoFok={elozo.fok} vegFok={w.fok} u={u} szin="#94a3b8" />
              <NyilA x1={OX} y1={OY} x2={px(w.x)} y2={py(w.y)} u={u} szin={LILA} hegy="fg-w" vastag={2.6} opacitas={0.9} />
              <FeliratA
                x={px(w.x) + (w.x >= 0 ? 12 : -12)}
                y={py(w.y) + (w.y >= 0 ? -8 : 18)}
                szin={LILA}
                meret={12}
                opacitas={u}
                horgony={w.x >= 0 ? "start" : "end"}
              >
                {`w${"₀₁₂₃"[w.k]} · ${w.fok}°`}
              </FeliratA>
            </g>
          );
        })}

        {/* a négyzet */}
        {negyzetU > 0.01 && (
          <polygon
            points={GYOKOK.map((w) => `${px(w.x)},${py(w.y)}`).join(" ")}
            fill={`rgba(124,58,237,${0.08 * negyzetU})`}
            stroke={LILA}
            strokeWidth="1.4"
            strokeDasharray="600"
            strokeDashoffset={600 * (1 - negyzetU)}
          />
        )}

        {/* ellenőrzés: forgatva nyújtás a nagyított képen (w0 → w0²=16, a kép szélén túl) */}
        <g opacity={1 - vissza}>
          {[1, 2].map((k) => {
            const r = Math.pow(RHO, k);
            const a = 60 * k;
            const u = hatv[k - 1];
            return (
              <g key={k}>
                <NyilA x1={OX} y1={OY} x2={px(r * Math.cos(a * RAD))} y2={py(r * Math.sin(a * RAD))} u={u} szin={TEAL} hegy="fg-e" vastag={2.2} szaggatott opacitas={0.9} />
                <FeliratA x={px(Math.min(r, 4.6) * Math.cos(a * RAD)) - 14} y={py(Math.min(r, 4.6) * Math.sin(a * RAD)) - 10} szin={TEAL} meret={11.5} opacitas={u} horgony="end">
                  {k === 1 ? "w₀ · w₀ = 16 ∠120°" : "· w₀ = 64 ∠180° …"}
                </FeliratA>
              </g>
            );
          })}
        </g>
      </g>

      {/* kicsinyítés után: a hatványlánc a z-hez */}
      <g opacity={vissza}>
        {[1, 2, 3, 4].map((k) => {
          const r = Math.pow(RHO, k);
          const a = 60 * k;
          const r0 = Math.pow(RHO, k - 1);
          const a0 = 60 * (k - 1);
          return (
            <VonalA
              key={k}
              x1={px(r0 * Math.cos(a0 * RAD))}
              y1={py(r0 * Math.sin(a0 * RAD))}
              x2={px(r * Math.cos(a * RAD))}
              y2={py(r * Math.sin(a * RAD))}
              szin={TEAL}
              vastag={1.6}
              szaggatott={false}
              u={hatv[k - 1]}
            />
          );
        })}
        <FeliratA x={OX + 20} y={OY - 150} szin={TEAL} meret={12} opacitas={vissza * hatv[3]} horgony="start">4 → 16 → 64 → 256, 60° → 240°: w₀⁴ = z ✓</FeliratA>
      </g>
    </svg>
  );
}

export default function FilmGyok() {
  return (
    <FeladatFilm
      cim="Negyedik gyök: négy megoldás a körön"
      hossz={23}
      fejezetek={FEJEZETEK}
      rajz={Rajz}
      megjegyzes="A film ránagyít a gyökök körére, mert a 256 hosszú z mellett a 4 hosszú gyökök nem látszanának. A fejezetekre kattintva ugorhatsz."
    />
  );
}
