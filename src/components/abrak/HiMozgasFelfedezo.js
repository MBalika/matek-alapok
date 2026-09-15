"use client";

import { useEffect, useRef, useState } from "react";
import FvRajz from "./FvRajz";
import { Csuszka } from "./Csuszka";
import { M } from "@/components/ui/Keplet";
import { sz } from "@/lib/szamok";

const TEAL = "#0f766e";
const NAR = "#e2590a";
const LILA = "#7c3aed";

const T1 = 3; // a szakaszhatár
const TVEG = 6;

/**
 * Gyorsulás → sebesség → út: a kétszeri integrálás és az integrációs
 * konstansok fizikai jelentése (kezdősebesség, kezdőpozíció).
 */
export default function HiMozgasFelfedezo() {
  const [a1, setA1] = useState(2);
  const [a2, setA2] = useState(-1);
  const [v0, setV0] = useState(0);
  const [s0, setS0] = useState(0);
  const [t, setT] = useState(TVEG);
  const [jatszik, setJatszik] = useState(false);
  const raf = useRef(null);
  const utolso = useRef(null);

  useEffect(() => {
    if (!jatszik) {
      utolso.current = null;
      return undefined;
    }
    const lepes = (most) => {
      if (utolso.current == null) utolso.current = most;
      const dt = (most - utolso.current) / 1000;
      utolso.current = most;
      setT((elozo) => {
        const uj = elozo + dt * 1.2;
        if (uj >= TVEG) {
          setJatszik(false);
          return TVEG;
        }
        return uj;
      });
      raf.current = requestAnimationFrame(lepes);
    };
    raf.current = requestAnimationFrame(lepes);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [jatszik]);

  const aFv = (x) => (x <= T1 ? a1 : a2);
  const vFv = (x) => (x <= T1 ? v0 + a1 * x : v0 + a1 * T1 + a2 * (x - T1));
  const sFv = (x) => {
    if (x <= T1) return s0 + v0 * x + (a1 * x * x) / 2;
    const u = x - T1;
    const sT1 = s0 + v0 * T1 + (a1 * T1 * T1) / 2;
    return sT1 + vFv(T1) * u + (a2 * u * u) / 2;
  };

  /**
   * Ésszerű y-tartomány mintavételből. A `minTerjedelem` azért kell, hogy a
   * tengelyfeliratok ne préselődjenek össze (a FvRajz 6 osztást céloz meg).
   */
  const tart = (fn, padAlap, minTerjedelem) => {
    let lo = 0;
    let hi = 0;
    for (let k = 0; k <= 120; k++) {
      const y = fn((TVEG * k) / 120);
      lo = Math.min(lo, y);
      hi = Math.max(hi, y);
    }
    const p = Math.max((hi - lo) * 0.2, padAlap);
    let a = lo - p;
    let b = hi + p;
    if (b - a < minTerjedelem) {
      const k = (minTerjedelem - (b - a)) / 2;
      a -= k;
      b += k;
    }
    return [a, b];
  };
  const vT = tart(vFv, 1, 9.2);
  const sT = tart(sFv, 2, 12);

  const jelolo = (fn, y0, y1, szin) => (S) => (
    <g>
      <line
        x1={S.px(t)}
        y1={S.margo.fel}
        x2={S.px(t)}
        y2={S.margo.fel + S.h}
        stroke="#94a3b8"
        strokeWidth="1.2"
        strokeDasharray="4 3"
      />
      <circle
        cx={S.px(t)}
        cy={S.py(Math.max(y0, Math.min(y1, fn(t))))}
        r="5"
        fill={szin}
        stroke="white"
        strokeWidth="1.6"
      />
    </g>
  );

  const indit = () => {
    if (t >= TVEG - 1e-6) setT(0);
    setJatszik(true);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <p className="mb-0.5 text-[11.5px] font-semibold text-petrol-600">a(t) — gyorsulás (m/s²)</p>
          <FvRajz
            xMin={0}
            xMax={TVEG}
            yMin={-4.6}
            yMax={4.6}
            gorbek={[{ fn: aFv, szin: LILA, vastag: 2.8, db: 600 }]}
            tengelyCimkek={{ x: "t", y: "a" }}
            magassag={160}
            className="abra w-full select-none"
          >
            {jelolo(aFv, -4.6, 4.6, LILA)}
          </FvRajz>

          <p className="mt-2 mb-0.5 text-[11.5px] font-semibold text-petrol-600">
            v(t) = ∫a dt — sebesség (m/s)
          </p>
          <FvRajz
            xMin={0}
            xMax={TVEG}
            yMin={vT[0]}
            yMax={vT[1]}
            gorbek={[{ fn: vFv, szin: TEAL, vastag: 2.8, db: 600 }]}
            tengelyCimkek={{ x: "t", y: "v" }}
            magassag={160}
            className="abra w-full select-none"
          >
            {jelolo(vFv, vT[0], vT[1], TEAL)}
          </FvRajz>

          <p className="mt-2 mb-0.5 text-[11.5px] font-semibold text-petrol-600">s(t) = ∫v dt — út (m)</p>
          <FvRajz
            xMin={0}
            xMax={TVEG}
            yMin={sT[0]}
            yMax={sT[1]}
            gorbek={[{ fn: sFv, szin: NAR, vastag: 2.8, db: 600 }]}
            tengelyCimkek={{ x: "t", y: "s" }}
            magassag={160}
            className="abra w-full select-none"
          >
            {jelolo(sFv, sT[0], sT[1], NAR)}
          </FvRajz>
        </div>

        <div className="p-5">
          <p className="text-[10.5px] font-bold tracking-[0.16em] text-violet-700 uppercase">A gyorsulás két szakaszon</p>
          <div className="mt-2 space-y-3">
            <Csuszka
              cimke="a₁ — az első 3 másodpercben"
              ertek={a1}
              egyseg="m/s²"
              min={-3}
              max={3}
              lepes={0.5}
              tizedes={1}
              onChange={setA1}
            />
            <Csuszka
              cimke="a₂ — a 3. másodperc után"
              ertek={a2}
              egyseg="m/s²"
              min={-3}
              max={3}
              lepes={0.5}
              tizedes={1}
              onChange={setA2}
            />
          </div>

          <p className="mt-5 text-[10.5px] font-bold tracking-[0.16em] text-naracs-700 uppercase">
            A két integrációs konstans
          </p>
          <div className="mt-2 space-y-3">
            <Csuszka
              cimke="v₀ — kezdősebesség (a v görbe C-je)"
              ertek={v0}
              egyseg="m/s"
              min={-4}
              max={4}
              lepes={0.5}
              tizedes={1}
              onChange={setV0}
            />
            <Csuszka
              cimke="s₀ — kezdőpozíció (az s görbe C-je)"
              ertek={s0}
              egyseg="m"
              min={-5}
              max={5}
              lepes={0.5}
              tizedes={1}
              onChange={setS0}
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={jatszik ? () => setJatszik(false) : indit}
              className="rounded-lg bg-naracs-500 px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-naracs-600"
            >
              {jatszik ? "❚❚ Szünet" : t >= TVEG - 1e-6 ? "▶ Újra" : "▶ Indítás"}
            </button>
            <span className="szamok rounded-md bg-petrol-100 px-2.5 py-1 text-[12.5px] font-semibold text-petrol-800">
              t = {sz(t, 2)} s
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={TVEG}
            step={0.05}
            value={t}
            onChange={(e) => {
              setJatszik(false);
              setT(Number(e.target.value));
            }}
            className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-petrol-100 accent-[color:var(--color-naracs-500)]"
            aria-label="Idő"
          />

          <div className="mt-4 rounded-xl border border-petrol-200 bg-white p-4">
            <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">A pillanatnyi értékek</p>
            <div className="szamok mt-1.5 space-y-0.5 text-[13.5px] text-petrol-900">
              <p className="text-violet-800">a = {sz(aFv(t), 2)} m/s²</p>
              <p className="text-emerald-800">v = {sz(vFv(t), 2)} m/s</p>
              <p className="text-naracs-800">s = {sz(sFv(t), 2)} m</p>
            </div>
          </div>

          <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-[10.5px] font-bold tracking-[0.16em] text-emerald-700 uppercase">Amit érdemes látni</p>
            <p className="mt-1 text-[13px] leading-relaxed text-emerald-900">
              A <M>{"v_0"}</M> és az <M>{"s_0"}</M> csúszka <strong>csak eltolja</strong> a görbét, az alakján nem
              változtat — pontosan ez a <M>{"+C"}</M>. Az <M>{"a"}</M> tehát a mozgás <em>alakját</em> írja elő, a
              kezdeti feltételek pedig azt, hogy melyik tagot választjuk ki a függvényseregből.
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-emerald-900">
              Az építőmérnöki megfelelője ugyanez: <M>{"V = -\\int q\\,dx"}</M> és <M>{"M = \\int V\\,dx"}</M> — ott a
              két konstanst a megtámasztási feltételek rögzítik.
            </p>
          </div>

          <p className="mt-3 text-[12.5px] leading-relaxed text-petrol-500">
            Figyeld meg: ahol <M>{"a=0"}</M>, ott a <M>{"v"}</M> vízszintes; ahol <M>{"v=0"}</M>, ott az{" "}
            <M>{"s"}</M> görbének szélsőértéke van. Ugyanaz a kapcsolat, mint függvény és deriváltja között — csak
            visszafelé olvasva.
          </p>
        </div>
      </div>
    </div>
  );
}
