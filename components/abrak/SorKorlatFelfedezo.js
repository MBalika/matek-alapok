"use client";

import { useMemo, useRef, useState } from "react";
import SorRajz, { sorLeptek } from "./SorRajz";
import { M } from "@/components/ui/Keplet";
import { sz } from "@/lib/szamok";

const SZ = 560;
const MA = 340;

const SOROZATOK = [
  {
    cimke: "n⁄(n+1)",
    latex: "a_n = \\frac{n}{n+1}",
    fn: (n) => n / (n + 1),
    yMin: -0.2,
    yMax: 1.6,
    kezdoAlso: 0.2,
    kezdoFelso: 1.3,
    szoveg: "Szigorúan nő. Alsó korlát bármi, ami ≤ ½ (a legnagyobb alsó korlát, az infimum, épp az első tag: ½), felső korlát bármi, ami ≥ 1. A szuprémum 1 — és ez egyben a határérték is.",
  },
  {
    cimke: "(2n+1)⁄n",
    latex: "a_n = \\frac{2n+1}{n} = 2 + \\frac1n",
    fn: (n) => (2 * n + 1) / n,
    yMin: 1.4,
    yMax: 3.6,
    kezdoAlso: 1.8,
    kezdoFelso: 3.2,
    szoveg: "Szigorúan csökken. A 2 + 1/n alak azonnal megmutatja a korlátokat: 2 < aₙ ≤ 3. A szuprémum 3 (fel is veszi, n = 1-nél), az infimum 2 (soha nem veszi fel).",
  },
  {
    cimke: "(−1)ⁿ",
    latex: "a_n = (-1)^n",
    fn: (n) => (n % 2 === 0 ? 1 : -1),
    yMin: -2.2,
    yMax: 2.2,
    kezdoAlso: -1.6,
    kezdoFelso: 1.6,
    szoveg: "Korlátos (−1 és 1 között), de nem monoton — és nem is konvergens. A korlátosság önmagában tehát nem elég a konvergenciához!",
  },
  {
    cimke: "3ⁿ⁄n!",
    latex: "a_n = \\frac{3^n}{n!}",
    fn: (n) => {
      let p = 1;
      for (let i = 1; i <= n; i++) p *= 3 / i;
      return p;
    },
    yMin: -0.6,
    yMax: 5.4,
    kezdoAlso: 0,
    kezdoFelso: 4.8,
    szoveg: "Az első három tag nő (3; 4,5; 4,5), utána szigorúan csökken: a hányados 3/(n+1) az n ≥ 3-tól kisebb 1-nél. Nem monoton az egész tartományon, de korlátos: 0 < aₙ ≤ 4,5.",
  },
  {
    cimke: "n⁄4",
    latex: "a_n = \\frac{n}{4}",
    fn: (n) => n / 4,
    yMin: -1,
    yMax: 8,
    kezdoAlso: 0,
    kezdoFelso: 6,
    szoveg: "Monoton nő, de nem korlátos: bármilyen magasra teszed a felső vonalat, a sorozat előbb-utóbb átlépi. Nem korlátos ⇒ nem konvergens.",
  },
];

export default function SorKorlatFelfedezo() {
  const [i, setI] = useState(0);
  const [n, setN] = useState(26);
  const [also, setAlso] = useState(SOROZATOK[0].kezdoAlso);
  const [felso, setFelso] = useState(SOROZATOK[0].kezdoFelso);
  const [nyilak, setNyilak] = useState(true);
  const svgRef = useRef(null);

  const s = SOROZATOK[i];
  const tagok = useMemo(() => Array.from({ length: n }, (_, k) => ({ n: k + 1, ertek: s.fn(k + 1) })), [s, n]);
  const leptek = sorLeptek({ tagok, magassag: MA, yMin: s.yMin, yMax: s.yMax, nMin: 1, nMax: n });

  const valt = (uj) => {
    setI(uj);
    setAlso(SOROZATOK[uj].kezdoAlso);
    setFelso(SOROZATOK[uj].kezdoFelso);
  };

  const huzas = (melyik) => (ev) => {
    ev.preventDefault();
    const svg = svgRef.current;
    if (!svg) return;
    const mozgat = (esem) => {
      const rect = svg.getBoundingClientRect();
      const my = ((esem.clientY - rect.top) / rect.height) * MA;
      // py(v) = 20 + ((hi - v)/(hi-lo)) * (MA - 20 - 34)
      const v = leptek.hi - ((my - 20) / (MA - 54)) * (leptek.hi - leptek.lo);
      const kerek = Math.round(Math.min(leptek.hi, Math.max(leptek.lo, v)) * 20) / 20;
      if (melyik === "also") setAlso(kerek);
      else setFelso(kerek);
    };
    mozgat(ev);
    const vege = () => {
      window.removeEventListener("pointermove", mozgat);
      window.removeEventListener("pointerup", vege);
    };
    window.addEventListener("pointermove", mozgat);
    window.addEventListener("pointerup", vege);
  };

  const ertekek = tagok.map((t) => t.ertek);
  const min = Math.min(...ertekek);
  const max = Math.max(...ertekek);
  const aloJo = also <= min + 1e-9;
  const feJo = felso >= max - 1e-9;
  const kilogoAlul = tagok.filter((t) => t.ertek < also - 1e-9).length;
  const kilogoFelul = tagok.filter((t) => t.ertek > felso + 1e-9).length;

  const kulonbsegek = tagok.slice(1).map((t, k) => t.ertek - tagok[k].ertek);
  const mindNo = kulonbsegek.every((d) => d > 1e-12);
  const mindCsokken = kulonbsegek.every((d) => d < -1e-12);

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <div ref={svgRef}>
            <SorRajz
              tagok={tagok}
              yMin={s.yMin}
              yMax={s.yMax}
              nMin={1}
              nMax={n}
              magassag={MA}
              pontMeret={n > 34 ? 3.2 : 4}
              szarral={false}
              rateszek={({ px, py }) => (
                <g>
                  {/* monotonitás-nyilak a szomszédos tagok között */}
                  {nyilak &&
                    tagok.slice(1).map((t, k) => {
                      const d = t.ertek - tagok[k].ertek;
                      const szin = d > 1e-12 ? "#0f766e" : d < -1e-12 ? "#e2590a" : "#94a3b8";
                      return (
                        <line
                          key={`ny${t.n}`}
                          x1={px(tagok[k].n)}
                          y1={py(tagok[k].ertek)}
                          x2={px(t.n)}
                          y2={py(t.ertek)}
                          stroke={szin}
                          strokeWidth="1.6"
                          opacity="0.65"
                        />
                      );
                    })}

                  {/* felső korlát próbája */}
                  <line
                    x1={52}
                    y1={py(felso)}
                    x2={SZ - 18}
                    y2={py(felso)}
                    stroke={feJo ? "#0f766e" : "#e11d48"}
                    strokeWidth="2.2"
                  />
                  <text x={56} y={py(felso) - 6} fontSize="11.5" fontWeight="650" fill={feJo ? "#0f766e" : "#e11d48"}>
                    K = {sz(felso, 2)} {feJo ? "✓ felső korlát" : "✗ van fölötte tag"}
                  </text>
                  <g onPointerDown={huzas("felso")} style={{ touchAction: "none" }}>
                    <circle cx={SZ - 34} cy={py(felso)} r="16" fill="transparent" className="fogopont" />
                    <circle cx={SZ - 34} cy={py(felso)} r="6.5" fill="white" stroke={feJo ? "#0f766e" : "#e11d48"} strokeWidth="2.5" className="fogopont" />
                  </g>

                  {/* alsó korlát próbája */}
                  <line
                    x1={52}
                    y1={py(also)}
                    x2={SZ - 18}
                    y2={py(also)}
                    stroke={aloJo ? "#0f766e" : "#e11d48"}
                    strokeWidth="2.2"
                  />
                  <text x={56} y={py(also) + 15} fontSize="11.5" fontWeight="650" fill={aloJo ? "#0f766e" : "#e11d48"}>
                    k = {sz(also, 2)} {aloJo ? "✓ alsó korlát" : "✗ van alatta tag"}
                  </text>
                  <g onPointerDown={huzas("also")} style={{ touchAction: "none" }}>
                    <circle cx={SZ - 34} cy={py(also)} r="16" fill="transparent" className="fogopont" />
                    <circle cx={SZ - 34} cy={py(also)} r="6.5" fill="white" stroke={aloJo ? "#0f766e" : "#e11d48"} strokeWidth="2.5" className="fogopont" />
                  </g>

                  {/* kilógó tagok pirosan */}
                  {tagok
                    .filter((t) => t.ertek > felso + 1e-9 || t.ertek < also - 1e-9)
                    .map((t) => (
                      <circle key={`ki${t.n}`} cx={px(t.n)} cy={py(t.ertek)} r={n > 34 ? 3.6 : 4.6} fill="#e11d48" stroke="white" strokeWidth="1.2" />
                    ))}
                </g>
              )}
            />
          </div>
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            Húzd a két vízszintes vonalat a jobb oldali fogópontjuknál. Zöld: minden tag a vonal jó oldalán van.
          </p>
        </div>

        <div className="p-5">
          <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">Sorozat</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {SOROZATOK.map((k, j) => (
              <button
                key={k.cimke}
                type="button"
                onClick={() => valt(j)}
                className={`rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition ${
                  i === j ? "bg-petrol-700 text-white" : "bg-white text-petrol-600 ring-1 ring-petrol-200 hover:bg-petrol-50"
                }`}
              >
                {k.cimke}
              </button>
            ))}
          </div>

          <div className="szamok mt-4 text-[15px] text-petrol-900">
            <M>{s.latex}</M>
          </div>

          <div
            className={`mt-3 rounded-xl border px-4 py-3 text-[13px] leading-relaxed ${
              aloJo && feJo ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-rose-200 bg-rose-50 text-rose-900"
            }`}
          >
            {aloJo && feJo ? (
              <>
                Az első {n} tag mind a <strong>[{sz(also, 2)}; {sz(felso, 2)}]</strong> sávban van. Ha ez minden n-re igaz, a
                sorozat <strong>korlátos</strong>.
              </>
            ) : (
              <>
                {kilogoFelul > 0 && <>{kilogoFelul} tag a felső vonal fölött van. </>}
                {kilogoAlul > 0 && <>{kilogoAlul} tag az alsó vonal alatt van. </>}
                Egyetlen kilógó tag is megbuktatja a korlátot — húzd feljebb/lejjebb a vonalat.
              </>
            )}
          </div>

          <div className="mt-3 rounded-xl bg-petrol-50 p-4">
            <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">Monotonitás</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-petrol-800">
              {mindNo
                ? "Minden összekötő szakasz zöld: aₙ₊₁ − aₙ > 0 minden vizsgált n-re, tehát a sorozat szigorúan monoton növő."
                : mindCsokken
                  ? "Minden összekötő szakasz narancs: aₙ₊₁ − aₙ < 0 minden vizsgált n-re, tehát a sorozat szigorúan monoton csökkenő."
                  : "Vegyes a színezés: van növekvő és csökkenő lépés is — a sorozat nem monoton (legfeljebb egy indextől kezdve az)."}
            </p>
            <p className="mt-2 text-[12.5px] text-petrol-600">
              Az első {n} tag legkisebbike {sz(min, 3)}, legnagyobbika {sz(max, 3)}.
            </p>
          </div>

          <label className="mt-3 block">
            <span className="mb-1 flex items-baseline justify-between">
              <span className="text-[12.5px] font-medium text-petrol-600">Hány tag</span>
              <span className="szamok rounded-md bg-petrol-100 px-2 py-0.5 text-[12.5px] font-semibold text-petrol-800">{n}</span>
            </span>
            <input
              type="range"
              min={6}
              max={50}
              step={1}
              value={n}
              onChange={(e) => setN(Number(e.target.value))}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-petrol-100 accent-[color:var(--color-naracs-500)]"
            />
          </label>

          <label className="mt-3 flex items-center gap-2 text-[12.5px] text-petrol-600">
            <input type="checkbox" checked={nyilak} onChange={(e) => setNyilak(e.target.checked)} className="accent-[color:var(--color-naracs-500)]" />
            Monotonitás-nyilak mutatása
          </label>

          <p className="mt-3 text-[12.5px] leading-relaxed text-petrol-500">{s.szoveg}</p>
        </div>
      </div>
    </div>
  );
}
