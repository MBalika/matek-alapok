"use client";

import FeladatFilm from "@/components/anim/FeladatFilm";
import { arany, lerp, rugo } from "@/components/anim/Idovonal";
import { Hegy, NyilA, FeliratA, IvA, PontA } from "@/components/anim/FilmElemek";

/* (1+i)^10: minden szorzás 45°-kal forgat és √2-szeresére nyújt — a hatványok logaritmikus spirált rajzolnak,
   a kamera pedig fokozatosan kicsinyít, hogy a növekvő pontok a képen maradjanak. */

const OX = 280;
const OY = 210;
const RAD = Math.PI / 180;
const NAR = "#e2590a";
const LILA = "#7c3aed";
const TEAL = "#0f766e";
const SQ2 = Math.SQRT2;

const HATVANYOK = Array.from({ length: 10 }, (_, i) => {
  const k = i + 1;
  const r = Math.pow(SQ2, k);
  const a = 45 * k;
  return { k, r, fok: a, x: r * Math.cos(a * RAD), y: r * Math.sin(a * RAD) };
});

const S0 = 70; // képpont / egység az elején

// a k-adik hatvány megjelenési ideje
const T0 = 6.4;
const DT = 0.95;
const tKez = (k) => T0 + (k - 2) * DT;

const FEJEZETEK = [
  {
    t0: 0,
    cim: "1 + i a síkon",
    szoveg: "Az 1 + i az első negyed átlóján ül: a hossza √2, a szöge 45°. Ez lesz a „lépés”, amit tízszer ismétlünk.",
    kepletek: ["1 + i = \\sqrt2\\left(\\cos 45^\\circ + i\\sin 45^\\circ\\right)"],
  },
  {
    t0: 3.2,
    cim: "Egy szorzás: forgatás és nyújtás",
    szoveg: "(1+i)² = (1+i)(1+i): a szög megduplázódik 90°-ra, a hossz √2·√2 = 2. Az eredmény 2i — a képzetes tengelyen.",
    kepletek: ["(1+i)^2 = 2\\left(\\cos 90^\\circ + i\\sin 90^\\circ\\right) = 2i"],
  },
  {
    t0: T0,
    cim: "Ismételjük: a spirál",
    szoveg: "Minden további szorzás újabb 45° és újabb √2-szeres nyújtás. A pontok egy logaritmikus spirálon ülnek — a kamera közben kicsinyít, hogy elférjenek.",
    kepletek: ["(1+i)^k = (\\sqrt2)^k\\left(\\cos k\\cdot 45^\\circ + i\\sin k\\cdot 45^\\circ\\right)"],
  },
  {
    t0: tKez(10) + 1.2,
    cim: "A tizedik: 32i",
    szoveg: "10 · 45° = 450° = 360° + 90° — egy teljes kör után újra a képzetes tengelyen vagyunk, (√2)¹⁰ = 32 távolságra.",
    kepletek: ["(1+i)^{10} = 32\\left(\\cos 450^\\circ + i\\sin 450^\\circ\\right) = 32\\left(\\cos 90^\\circ + i\\sin 90^\\circ\\right) = 32i"],
  },
  {
    t0: tKez(10) + 4.2,
    cim: "Moivre egy sorban",
    szoveg: "Ez az egész film egyetlen képletben: a hatványozás az abszolút értéket hatványozza, az argumentumot szorozza. Tíz zárójelfelbontás helyett három sor.",
    kepletek: ["z^n = r^n\\left(\\cos n\\varphi + i\\sin n\\varphi\\right)"],
  },
];

function leptek(t) {
  // 1..2 hatvány: S0; utána minden új hatványnál úgy kicsinyítünk, hogy a legnagyobb pont ~175 px-re legyen
  let S = S0;
  for (let k = 3; k <= 10; k++) {
    const cel = Math.min(S0, 175 / Math.pow(SQ2, k));
    const u = arany(t, tKez(k) - 0.4, tKez(k) + 0.5);
    S = Math.exp(lerp(Math.log(S), Math.log(cel), u));
  }
  return S;
}

function Rajz(t) {
  const S = leptek(t);
  const px = (x) => OX + x * S;
  const py = (y) => OY - y * S;

  const z1U = arany(t, 0.3, 1.3);
  const z1Fel = arany(t, 1.2, 1.7);
  const iv1 = arany(t, 1.7, 2.4);
  const z2U = arany(t, 3.4, 4.4, rugo);
  const iv2 = arany(t, 4.4, 5.1);
  const z2Fel = arany(t, 5.0, 5.5);

  const hatvU = HATVANYOK.map((h) => (h.k <= 2 ? 1 : arany(t, tKez(h.k), tKez(h.k) + 0.6, rugo)));
  // a spirál eddig a szögig rajzolódik
  let maxFok = 45;
  HATVANYOK.forEach((h, i) => {
    if (h.k >= 2) maxFok = Math.max(maxFok, lerp(45 * (h.k - 1), 45 * h.k, h.k === 2 ? z2U : hatvU[i]));
  });
  const spiralPontok = [];
  for (let a = 45; a <= maxFok + 1e-6; a += 3) {
    const r = Math.pow(SQ2, a / 45);
    spiralPontok.push(`${px(r * Math.cos(a * RAD)).toFixed(1)},${py(r * Math.sin(a * RAD)).toFixed(1)}`);
  }
  const vegFel = arany(t, tKez(10) + 1.4, tKez(10) + 2.0);
  const korU = arany(t, tKez(10) + 2.2, tKez(10) + 3.2);

  return (
    <svg viewBox="0 0 560 420" className="abra w-full select-none">
      <defs>
        <Hegy id="fs-n" szin={NAR} />
        <Hegy id="fs-l" szin={LILA} />
        <Hegy id="fs-t" szin="#475569" />
      </defs>

      <line x1={OX - 265} y1={OY} x2={OX + 268} y2={OY} stroke="#475569" strokeWidth="1.2" markerEnd="url(#fs-t)" />
      <line x1={OX} y1={OY + 200} x2={OX} y2={OY - 198} stroke="#475569" strokeWidth="1.2" markerEnd="url(#fs-t)" />
      <text x={OX + 262} y={OY + 17} fontSize="12.5" fontStyle="italic" fill="#1d3c48" textAnchor="end">Re</text>
      <text x={OX + 7} y={OY - 200} fontSize="12.5" fontStyle="italic" fill="#1d3c48">Im</text>
      <FeliratA x={OX - 250} y={OY - 180} meret={11} vastag={false} szin="#64748b" horgony="start">
        1 egység = {S.toFixed(1).replace(".", ",")} px
      </FeliratA>

      {/* egységkör */}
      <circle cx={OX} cy={OY} r={S} fill="none" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />

      {/* spirál */}
      {spiralPontok.length > 1 && (
        <polyline points={spiralPontok.join(" ")} fill="none" stroke={LILA} strokeWidth="1.6" opacity="0.55" />
      )}

      {/* 1+i */}
      <NyilA x1={OX} y1={OY} x2={px(1)} y2={py(1)} u={z1U} szin={NAR} hegy="fs-n" vastag={3} />
      <FeliratA x={px(1) + 10} y={py(1) - 8} szin={NAR} opacitas={z1Fel * (S > 20 ? 1 : 0)} horgony="start">1 + i</FeliratA>
      <IvA cx={OX} cy={OY} r={Math.min(30, S * 0.6)} kezdoFok={0} vegFok={45} u={iv1} szin={NAR} />
      <FeliratA x={OX + Math.min(38, S * 0.75)} y={OY - 6} szin={NAR} meret={11.5} opacitas={iv1 * (S > 20 ? 1 : 0)} horgony="start">45°</FeliratA>

      {/* (1+i)² */}
      <NyilA x1={OX} y1={OY} x2={px(0)} y2={py(2)} u={z2U} szin={LILA} hegy="fs-l" vastag={2.8} />
      <IvA cx={OX} cy={OY} r={Math.min(46, S * 0.9)} kezdoFok={45} vegFok={90} u={iv2} szin={LILA} />
      <FeliratA x={OX + 10} y={py(2) - 8} szin={LILA} opacitas={z2Fel * (S > 20 ? 1 : 0)} horgony="start">(1+i)² = 2i</FeliratA>

      {/* további hatványok */}
      {HATVANYOK.filter((h) => h.k >= 3).map((h, i) => {
        const u = hatvU[i + 2];
        const utolso = h.k === 10;
        return (
          <g key={h.k}>
            <PontA x={px(h.x)} y={py(h.y)} r={utolso ? 6 : 4.5} szin={utolso ? NAR : LILA} u={u} />
            <FeliratA
              x={px(h.x) + (h.x >= 0 ? 10 : -10)}
              y={py(h.y) + (h.y >= 0 ? -8 : 16)}
              szin={utolso ? NAR : LILA}
              meret={11}
              vastag={utolso}
              opacitas={u}
              horgony={h.x >= 0 ? "start" : "end"}
            >
              {utolso ? "(1+i)¹⁰ = 32i" : `k = ${h.k} · ${h.fok}°`}
            </FeliratA>
          </g>
        );
      })}

      {/* a végén: egy teljes kör + 90° */}
      <IvA cx={OX} cy={OY} r={Math.max(24, S * 2.2)} kezdoFok={0} vegFok={359.9} u={Math.min(1, korU * 1.25)} szin={TEAL} vastag={1.6} />
      <IvA cx={OX} cy={OY} r={Math.max(24, S * 2.2) + 7} kezdoFok={0} vegFok={90} u={Math.max(0, (korU - 0.8) * 5)} szin={TEAL} vastag={1.6} />
      <FeliratA x={OX - 12} y={OY - Math.max(24, S * 2.2) - 10} szin={TEAL} meret={11.5} opacitas={korU} horgony="end">450° = 360° + 90°</FeliratA>
      <FeliratA x={OX + 20} y={OY + 180} szin={NAR} meret={12} opacitas={vegFel} horgony="start">|(1+i)¹⁰| = (√2)¹⁰ = 32</FeliratA>
    </svg>
  );
}

export default function FilmSpiral() {
  return (
    <FeladatFilm
      cim="(1+i)¹⁰ — tíz forgatás, egy spirál"
      hossz={tKez(10) + 7.5}
      fejezetek={FEJEZETEK}
      rajz={Rajz}
      megjegyzes="A lila pontok a hatványok; a kamera minden lépésnél kicsinyít, mert a hossz √2-szeresére nő."
    />
  );
}
