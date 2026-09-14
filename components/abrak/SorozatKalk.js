"use client";

import { useMemo, useState } from "react";
import { forditKifejezes } from "./SorKifejezes";
import { M } from "@/components/ui/Keplet";
import { sz } from "@/lib/szamok";

function szamma(s, alap = 0) {
  const v = Number(String(s).replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(v) ? v : alap;
}

function Mezo({ cimke, ertek, onChange, hely }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[12px] font-medium text-petrol-600">{cimke}</span>
      <input
        type="text"
        inputMode="decimal"
        value={ertek}
        placeholder={hely}
        onChange={(e) => onChange(e.target.value)}
        className="szamok w-full rounded-lg border border-petrol-200 bg-white px-3 py-2 text-[14px] text-petrol-900 outline-none focus:border-petrol-400 focus:ring-2 focus:ring-petrol-100"
      />
    </label>
  );
}

function Ered({ cimke, children }) {
  return (
    <div className="rounded-lg border border-petrol-100 bg-petrol-50/60 px-3.5 py-2.5">
      <p className="text-[10.5px] font-bold tracking-wider text-petrol-500 uppercase">{cimke}</p>
      <div className="szamok mt-1 text-[14px] text-petrol-900">{children}</div>
    </div>
  );
}

/* ================= 1. Explicit sorozat ================= */

const MINTAK = [
  ["(2n+1)/(n+3)", "(2*n+1)/(n+3)"],
  ["(3n²−5n+2)/(2n²+n−7)", "(3*n^2-5*n+2)/(2*n^2+n-7)"],
  ["√(n²+4) − √(n²−n)", "sqrt(n^2+4)-sqrt(n^2-n)"],
  ["(1+3/n)^n", "(1+3/n)^n"],
  ["2ⁿ/n!", "2^n/fakt(n)"],
];

export function SorozatKalk() {
  const [keplet, setKeplet] = useState("(2*n+1)/(n+3)");
  const [db, setDb] = useState("12");
  const [eps, setEps] = useState("0,01");

  const f = useMemo(() => forditKifejezes(keplet, ["n"]), [keplet]);
  const N = Math.max(3, Math.min(40, Math.round(szamma(db, 12))));
  const e = Math.max(1e-9, szamma(eps, 0.01));

  const tagok = useMemo(() => {
    if (!f.ok) return [];
    return Array.from({ length: N }, (_, i) => {
      const n = i + 1;
      return { n, ertek: f.fn(n) };
    });
  }, [f, N]);

  const nagyok = useMemo(() => {
    if (!f.ok) return [];
    return [
      { n: 1e3, cimke: "1 000" },
      { n: 1e4, cimke: "10 000" },
      { n: 1e5, cimke: "100 000" },
      { n: 1e6, cimke: "1 000 000" },
    ].map((x) => ({ ...x, ertek: f.fn(x.n) }));
  }, [f]);

  // Numerikus határérték-becslés. A nyers aₙ még 1/n nagyságrendű hibát hordoz,
  // ezért Richardson-extrapolációval finomítjuk (ez a küszöbindexhez fontos).
  const becsles = useMemo(() => {
    if (!f.ok) return NaN;
    const a6 = f.fn(1e6);
    const a7 = f.fn(1e7);
    if (!Number.isFinite(a6) || !Number.isFinite(a7)) return NaN;
    const finom = (10 * a7 - a6) / 9;
    return Number.isFinite(finom) ? finom : a7;
  }, [f]);

  const stabil =
    nagyok.length === 4 &&
    nagyok.every((x) => Number.isFinite(x.ertek)) &&
    Number.isFinite(becsles) &&
    Math.abs(nagyok[3].ertek - nagyok[2].ertek) < Math.max(1e-6, Math.abs(nagyok[3].ertek) * 1e-3);

  // küszöbindex numerikus keresése a becsült határértékhez
  const kuszob = useMemo(() => {
    if (!f.ok || !stabil) return null;
    const hatar = e * (1 - 1e-9); // a lebegőpontos kerekítés ne engedjen be határesetet
    const jo = (n) => Math.abs(f.fn(n) - becsles) < hatar;
    if (jo(1)) return 0;
    // felső korlát keresése duplázással, majd felezés
    let felso = 2;
    while (felso <= 1e7 && !jo(felso)) felso *= 2;
    if (felso > 1e7) return null;
    let also = Math.floor(felso / 2); // itt még nem jó
    while (felso - also > 1) {
      const kozep = Math.floor((also + felso) / 2);
      if (jo(kozep)) felso = kozep;
      else also = kozep;
    }
    return also; // az utolsó „rossz” index, tehát N
  }, [f, stabil, becsles, e]);

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_1.35fr]">
        <div>
          <p className="text-[10.5px] font-bold tracking-[0.16em] text-naracs-600 uppercase">Bemenet</p>
          <div className="mt-3 space-y-3">
            <Mezo cimke="aₙ képlete (n a változó)" ertek={keplet} onChange={setKeplet} hely="(2*n+1)/(n+3)" />
            <div className="grid grid-cols-2 gap-2">
              <Mezo cimke="Hány tag (3–40)" ertek={db} onChange={setDb} hely="12" />
              <Mezo cimke="ε a küszöbindexhez" ertek={eps} onChange={setEps} hely="0,01" />
            </div>
          </div>
          <p className="mt-2 text-[11.5px] text-petrol-500">
            Használható: <span className="szamok">+ − * / ^ ( )</span>, sqrt, ln, exp, sin, cos, abs, fakt (n!), pi, e.
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {MINTAK.map(([nev, k]) => (
              <button
                key={nev}
                type="button"
                onClick={() => setKeplet(k)}
                className="rounded-lg bg-white px-2.5 py-1.5 text-[12px] font-medium text-petrol-600 ring-1 ring-petrol-200 transition hover:bg-petrol-50"
              >
                {nev}
              </button>
            ))}
          </div>

          {!f.ok && <p className="mt-3 rounded-lg bg-rose-50 px-3 py-2 text-[12.5px] text-rose-700">{f.hiba}</p>}

          {f.ok && (
            <div className="mt-4 space-y-2.5">
              <Ered cimke="Határérték-becslés nagy n-ekre">
                {nagyok.map((x) => (
                  <div key={x.n} className="flex justify-between text-[13px]">
                    <span className="text-petrol-500">n = {x.cimke}</span>
                    <span>{Number.isFinite(x.ertek) ? sz(x.ertek, 6) : "nem véges"}</span>
                  </div>
                ))}
                <p className="mt-1.5 text-[12px] text-petrol-600">
                  {stabil
                    ? `Az értékek beálltak — a határérték nagy valószínűséggel ${sz(becsles, 5)}.`
                    : "Az értékek nem álltak be: a sorozat vagy divergens, vagy nagyon lassan konvergál."}
                </p>
              </Ered>
              <Ered cimke={`Küszöbindex ε = ${sz(e, 4)} mellett`}>
                {kuszob == null ? (
                  <span className="text-[13px] text-petrol-500">Csak konvergens (beálló) sorozatnál értelmes.</span>
                ) : (
                  <>
                    N = {kuszob} — az {kuszob + 1}. tagtól kezdve minden tag {sz(e, 4)}-nál közelebb van a becsült
                    határértékhez.
                  </>
                )}
              </Ered>
            </div>
          )}
        </div>

        <div>
          <p className="text-[10.5px] font-bold tracking-[0.16em] text-naracs-600 uppercase">Az első {N} tag</p>
          <div className="finom-gorgeto mt-2 max-h-[430px] overflow-auto rounded-xl border border-petrol-100">
            <table className="szamok w-full text-[13px]">
              <thead className="sticky top-0 bg-petrol-50 text-[11px] font-semibold text-petrol-500">
                <tr>
                  <th className="px-3 py-1.5 text-left font-semibold">n</th>
                  <th className="px-3 py-1.5 text-right font-semibold">aₙ</th>
                  <th className="px-3 py-1.5 text-right font-semibold">aₙ₊₁ − aₙ</th>
                  <th className="px-3 py-1.5 text-right font-semibold">aₙ₊₁ / aₙ</th>
                </tr>
              </thead>
              <tbody>
                {tagok.map((t, i) => {
                  const kov = i + 1 < tagok.length ? tagok[i + 1].ertek : null;
                  const d = kov == null ? null : kov - t.ertek;
                  const h = kov == null || Math.abs(t.ertek) < 1e-12 ? null : kov / t.ertek;
                  return (
                    <tr key={t.n} className="border-t border-petrol-100">
                      <td className="px-3 py-1 text-left text-petrol-600">{t.n}</td>
                      <td className="px-3 py-1 text-right text-petrol-900">{Number.isFinite(t.ertek) ? sz(t.ertek, 6) : "–"}</td>
                      <td className={`px-3 py-1 text-right ${d == null ? "text-petrol-300" : d > 0 ? "text-emerald-700" : d < 0 ? "text-naracs-700" : "text-petrol-500"}`}>
                        {d == null || !Number.isFinite(d) ? "–" : sz(d, 6)}
                      </td>
                      <td className="px-3 py-1 text-right text-petrol-600">{h == null || !Number.isFinite(h) ? "–" : sz(h, 4)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[12px] leading-relaxed text-petrol-500">
            A <strong>különbség</strong> oszlop előjele a monotonitás gyanúja: csupa zöld → növő, csupa narancs → csökkenő. A{" "}
            <strong>hányados</strong> oszlop pozitív tagú sorozatnál ugyanezt mondja meg az 1-hez viszonyítva — hatványos és
            faktoriálisos képleteknél ez a kényelmesebb.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ================= 2. Rekurzív sorozat ================= */

const REK_MINTAK = [
  ["√(2+a) — KF‑5", "sqrt(2+a)", "1"],
  ["√(6+a)", "sqrt(6+a)", "1"],
  ["(a + 2/a)/2 — Héron", "(a+2/a)/2", "2"],
  ["2a (divergens!)", "2*a", "1"],
  ["(a+6)/2", "(a+6)/2", "1"],
];

const REK_SZ = 420;
const REK_MA = 300;

export function RekurzioKalk() {
  const [keplet, setKeplet] = useState("sqrt(2+a)");
  const [a1, setA1] = useState("1");

  const f = useMemo(() => forditKifejezes(keplet, ["a"]), [keplet]);
  const kezdo = szamma(a1, 1);

  const sor = useMemo(() => {
    if (!f.ok) return [];
    const t = [kezdo];
    for (let k = 0; k < 29; k++) {
      const kov = f.fn(t[t.length - 1]);
      t.push(kov);
      if (!Number.isFinite(kov)) break;
    }
    return t;
  }, [f, kezdo]);

  const utolso = sor.length ? sor[sor.length - 1] : NaN;
  const elozo = sor.length > 1 ? sor[sor.length - 2] : NaN;
  const konvergal = Number.isFinite(utolso) && Number.isFinite(elozo) && Math.abs(utolso - elozo) < 1e-9;

  // fixpont numerikus keresése: f(x) − x = 0 az [a₁ környéke] tartományon
  const fixpont = useMemo(() => {
    if (!f.ok) return null;
    const g = (x) => f.fn(x) - x;
    const gyokok = [];
    for (let x = -20; x <= 20; x += 0.05) {
      const y1 = g(x);
      const y2 = g(x + 0.05);
      if (Number.isFinite(y1) && Number.isFinite(y2) && y1 * y2 <= 0 && Math.abs(y1) < 1e6) {
        let also = x;
        let felso = x + 0.05;
        for (let i = 0; i < 80; i++) {
          const kozep = (also + felso) / 2;
          if (g(also) * g(kozep) <= 0) felso = kozep;
          else also = kozep;
        }
        const gyok = (also + felso) / 2;
        if (!gyokok.some((r) => Math.abs(r - gyok) < 1e-6)) gyokok.push(gyok);
      }
    }
    return gyokok;
  }, [f]);

  const px = (x, xMax) => 44 + (x / xMax) * (REK_SZ - 64);
  const py = (y, yMax) => REK_MA - 34 - (y / yMax) * (REK_MA - 52);

  const hatar = Math.max(2.2, ...sor.filter(Number.isFinite).map((x) => Math.abs(x) * 1.3));
  const xMax = Math.min(20, hatar);

  const gorbe = [];
  if (f.ok) {
    for (let i = 0; i <= 160; i++) {
      const x = (i / 160) * xMax;
      const y = f.fn(x);
      if (Number.isFinite(y) && y >= 0 && y <= xMax * 1.02) gorbe.push(`${px(x, xMax).toFixed(1)},${py(y, xMax).toFixed(1)}`);
    }
  }
  const lepcso = [];
  for (let k = 0; k + 1 < Math.min(sor.length, 14); k++) {
    const x = sor[k];
    const y = sor[k + 1];
    if (!Number.isFinite(x) || !Number.isFinite(y) || x < 0 || y < 0 || x > xMax || y > xMax) break;
    lepcso.push({ kulcs: `f${k}`, x1: px(x, xMax), y1: py(k === 0 ? 0 : x, xMax), x2: px(x, xMax), y2: py(y, xMax) });
    lepcso.push({ kulcs: `v${k}`, x1: px(x, xMax), y1: py(y, xMax), x2: px(y, xMax), y2: py(y, xMax) });
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_1.35fr]">
        <div>
          <p className="text-[10.5px] font-bold tracking-[0.16em] text-naracs-600 uppercase">Bemenet</p>
          <div className="mt-3 space-y-3">
            <Mezo cimke="aₙ₊₁ = f(aₙ) — a képletben a az előző tag" ertek={keplet} onChange={setKeplet} hely="sqrt(2+a)" />
            <Mezo cimke="a₁ (kezdőérték)" ertek={a1} onChange={setA1} hely="1" />
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {REK_MINTAK.map(([nev, k, kezd]) => (
              <button
                key={nev}
                type="button"
                onClick={() => {
                  setKeplet(k);
                  setA1(kezd);
                }}
                className="rounded-lg bg-white px-2.5 py-1.5 text-[12px] font-medium text-petrol-600 ring-1 ring-petrol-200 transition hover:bg-petrol-50"
              >
                {nev}
              </button>
            ))}
          </div>

          {!f.ok && <p className="mt-3 rounded-lg bg-rose-50 px-3 py-2 text-[12.5px] text-rose-700">{f.hiba}</p>}

          {f.ok && (
            <div className="mt-4 space-y-2.5">
              <Ered cimke="A sorozat viselkedése">
                {konvergal ? (
                  <>
                    A 30. tagig beállt: <strong>{sz(utolso, 8)}</strong>
                  </>
                ) : Number.isFinite(utolso) ? (
                  <>Még nem állt be; a 30. tag {sz(utolso, 6)}.</>
                ) : (
                  <span className="text-rose-600">Elszáll (nem véges) — a sorozat divergens.</span>
                )}
              </Ered>
              <Ered cimke="A fixpont-egyenlet (A = f(A)) gyökei">
                {fixpont && fixpont.length ? (
                  fixpont.map((r) => (
                    <div key={r} className="text-[13px]">
                      A = {sz(r, 6)}
                    </div>
                  ))
                ) : (
                  <span className="text-[13px] text-petrol-500">A [−20; 20] tartományban nincs valós megoldás.</span>
                )}
                <p className="mt-1.5 text-[12px] text-petrol-600">
                  A gyök csak akkor a határérték, ha a konvergencia külön be van látva. A „2a” mintánál a fixpont 0, a sorozat
                  mégis a végtelenbe szalad.
                </p>
              </Ered>
            </div>
          )}
        </div>

        <div>
          <p className="text-[10.5px] font-bold tracking-[0.16em] text-naracs-600 uppercase">Tagok és pókháló-ábra</p>
          <div className="mt-2 grid gap-3 sm:grid-cols-[1fr_1.1fr]">
            <div className="finom-gorgeto max-h-[300px] overflow-auto rounded-xl border border-petrol-100">
              <table className="szamok w-full text-[12.5px]">
                <thead className="sticky top-0 bg-petrol-50 text-[11px] font-semibold text-petrol-500">
                  <tr>
                    <th className="px-2.5 py-1.5 text-left font-semibold">n</th>
                    <th className="px-2.5 py-1.5 text-right font-semibold">aₙ</th>
                  </tr>
                </thead>
                <tbody>
                  {sor.map((x, k) => (
                    <tr key={k} className="border-t border-petrol-100">
                      <td className="px-2.5 py-0.5 text-left text-petrol-600">{k + 1}</td>
                      <td className="px-2.5 py-0.5 text-right text-petrol-900">{Number.isFinite(x) ? sz(x, 8) : "–"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="racs-vilagos rounded-xl border border-petrol-100 p-2">
              <svg viewBox={`0 0 ${REK_SZ} ${REK_MA}`} className="abra w-full select-none">
                <line x1={44} y1={REK_MA - 34} x2={REK_SZ - 16} y2={REK_MA - 34} stroke="#64748b" strokeWidth="1.2" />
                <line x1={44} y1={REK_MA - 34} x2={44} y2={14} stroke="#64748b" strokeWidth="1.2" />
                <line
                  x1={px(0, xMax)}
                  y1={py(0, xMax)}
                  x2={px(xMax, xMax)}
                  y2={py(xMax, xMax)}
                  stroke="#94a3b8"
                  strokeWidth="1.3"
                  strokeDasharray="5 4"
                />
                {gorbe.length > 1 && <polyline points={gorbe.join(" ")} fill="none" stroke="#0f766e" strokeWidth="2.1" />}
                {lepcso.map((v) => (
                  <line key={v.kulcs} x1={v.x1} y1={v.y1} x2={v.x2} y2={v.y2} stroke="#7c3aed" strokeWidth="1.5" />
                ))}
                {fixpont?.filter((r) => r >= 0 && r <= xMax).map((r) => (
                  <circle key={r} cx={px(r, xMax)} cy={py(r, xMax)} r="5" fill="#e2590a" stroke="white" strokeWidth="1.6" />
                ))}
                <text x={REK_SZ - 18} y={REK_MA - 18} textAnchor="end" fontSize="11" fontStyle="italic" fill="#1d3c48">
                  x
                </text>
                <text x={px(xMax * 0.8, xMax)} y={py(xMax * 0.8, xMax) - 7} fontSize="10.5" fill="#64748b">
                  y = x
                </text>
              </svg>
            </div>
          </div>
          <p className="mt-2 text-[12px] leading-relaxed text-petrol-500">
            A pókháló-ábra a lépéseket mutatja: függőlegesen a görbéig, vízszintesen az <M>{"y = x"}</M> egyenesig. Ha a lépcső
            befelé fut a metszéspont felé, a sorozat konvergál; ha kifelé, akkor nem.
          </p>
        </div>
      </div>
    </div>
  );
}
