"use client";

import { useMemo, useState } from "react";
import FvRajz from "./FvRajz";
import { forditKifejezes } from "./SorKifejezes";
import { M, MB } from "@/components/ui/Keplet";
import { sz } from "@/lib/szamok";

const TEAL = "#0f766e";
const NAR = "#e2590a";

const szamma = (s) => Number(String(s).replace(",", ".").trim());

/** Tömör KaTeX-szám: egésznél tizedesek nélkül, egyébként legfeljebb 3 tizedes. */
function tomorSzam(v) {
  if (!Number.isFinite(v)) return "0";
  if (Math.abs(v - Math.round(v)) < 1e-9) return String(Math.round(v));
  return sz(v, 3)
    .replace(/0+$/, "")
    .replace(/,$/, "")
    .replace(",", "{,}");
}

/** Központi differencia. */
function derivalt(fn, x, h = 1e-5) {
  const l = Math.max(h, Math.abs(x) * h);
  const a = fn(x + l);
  const b = fn(x - l);
  if (!Number.isFinite(a) || !Number.isFinite(b)) return NaN;
  return (a - b) / (2 * l);
}

/* ================================================================
   1. „Jól integráltál?” — visszaderiválós ellenőrző
   ================================================================ */

const PELDAK = [
  { cim: "KF‑1 (3x−2)⁷", f: "(3*x-2)^7", F: "(3*x-2)^8/24", tol: 0, ig: 1.2 },
  { cim: "KF‑1 x/(x²+4)", f: "x/(x^2+4)", F: "ln(x^2+4)/2", tol: -3, ig: 3 },
  { cim: "KF‑2 e^√x / √x", f: "exp(sqrt(x))/sqrt(x)", F: "2*exp(sqrt(x))", tol: 0.2, ig: 4 },
  { cim: "KF‑3 x·e²ˣ", f: "x*exp(2*x)", F: "x*exp(2*x)/2-exp(2*x)/4", tol: -2, ig: 1 },
  { cim: "KF‑3 ln x", f: "ln(x)", F: "x*ln(x)-x", tol: 0.3, ig: 3 },
  { cim: "KF‑4 e⁻ˣ·cos 3x", f: "exp(-x)*cos(3*x)", F: "exp(-x)*(3*sin(3*x)-cos(3*x))/10", tol: 0, ig: 3 },
  { cim: "KF‑5 racionális", f: "(3*x+2)/(x^2+x-6)", F: "1,6*ln(abs(x-2))+1,4*ln(abs(x+3))", tol: 2.4, ig: 6 },
  { cim: "Hibás tipp!", f: "cos(3*x)", F: "sin(3*x)", tol: -2, ig: 2 },
];

export function HiEllenorzoKalk() {
  const [fSzoveg, setFSzoveg] = useState(PELDAK[3].f);
  const [FSzoveg, setFSzoveg2] = useState(PELDAK[3].F);
  const [tol, setTol] = useState(String(PELDAK[3].tol));
  const [ig, setIg] = useState(String(PELDAK[3].ig));

  const fF = useMemo(() => forditKifejezes(fSzoveg, ["x"]), [fSzoveg]);
  const FF = useMemo(() => forditKifejezes(FSzoveg, ["x"]), [FSzoveg]);

  const a = szamma(tol);
  const b = szamma(ig);
  const ervenyesSzakasz = Number.isFinite(a) && Number.isFinite(b) && b > a;

  const betolt = (p) => {
    setFSzoveg(p.f);
    setFSzoveg2(p.F);
    setTol(String(p.tol).replace(".", ","));
    setIg(String(p.ig).replace(".", ","));
  };

  /* Mintavétel a táblázathoz és az ítélethez. */
  const eredmeny = useMemo(() => {
    if (!fF.ok || !FF.ok || !ervenyesSzakasz) return null;
    const sorok = [];
    for (let k = 0; k <= 8; k++) {
      const x = a + ((b - a) * (k + 0.5)) / 9;
      const cel = fF.fn(x);
      const der = derivalt(FF.fn, x);
      sorok.push({ x, cel, der, kul: Math.abs(cel - der) });
    }
    const jok = sorok.filter((s) => Number.isFinite(s.cel) && Number.isFinite(s.der));
    let maxRel = 0;
    for (const s of jok) {
      const nevezo = Math.max(1e-6, Math.abs(s.cel));
      maxRel = Math.max(maxRel, s.kul / nevezo);
    }
    return { sorok, ervenyesDb: jok.length, maxRel, egyezik: jok.length >= 4 && maxRel < 5e-3 };
  }, [fF, FF, a, b, ervenyesSzakasz]);

  const gorbek = [];
  if (fF.ok) gorbek.push({ fn: fF.fn, szin: TEAL, vastag: 3.4, cimke: "f(x)" });
  if (FF.ok) gorbek.push({ fn: (x) => derivalt(FF.fn, x), szin: NAR, vastag: 2, szaggatott: true, cimke: "F ′(x)" });

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          {ervenyesSzakasz && gorbek.length > 0 ? (
            <FvRajz xMin={a} xMax={b} gorbek={gorbek} className="abra w-full select-none" />
          ) : (
            <div className="flex h-[300px] items-center justify-center text-[13px] text-petrol-400">
              Adj meg érvényes képleteket és szakaszt.
            </div>
          )}
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            Vastag teal: az integrandus. Szaggatott narancs: a beírt F numerikus deriváltja. Ha a kettő fedi egymást,
            az eredmény jó.
          </p>

          {eredmeny && (
            <div className="finom-gorgeto mt-2 overflow-x-auto">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="text-petrol-500">
                    <th className="px-2 py-1 text-left font-semibold">x</th>
                    <th className="px-2 py-1 text-right font-semibold">f(x)</th>
                    <th className="px-2 py-1 text-right font-semibold">F ′(x)</th>
                    <th className="px-2 py-1 text-right font-semibold">eltérés</th>
                  </tr>
                </thead>
                <tbody className="szamok">
                  {eredmeny.sorok.map((s) => {
                    const van = Number.isFinite(s.cel) && Number.isFinite(s.der);
                    const rendben = van && s.kul <= Math.max(1e-6, Math.abs(s.cel)) * 5e-3;
                    return (
                      <tr
                        key={s.x}
                        className={rendben ? "text-emerald-800" : van ? "text-rose-700" : "text-petrol-300"}
                      >
                        <td className="px-2 py-0.5">{sz(s.x, 2)}</td>
                        <td className="px-2 py-0.5 text-right">{van ? sz(s.cel, 4) : "–"}</td>
                        <td className="px-2 py-0.5 text-right">{van ? sz(s.der, 4) : "–"}</td>
                        <td className="px-2 py-0.5 text-right">{van ? sz(s.kul, 5) : "–"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="p-5">
          <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">Betöltés</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {PELDAK.map((p) => (
              <button
                key={p.cim}
                type="button"
                onClick={() => betolt(p)}
                className={`rounded-lg px-2.5 py-1.5 text-[11.5px] font-medium transition ${
                  p.cim === "Hibás tipp!"
                    ? "bg-white text-rose-700 ring-1 ring-rose-200 hover:bg-rose-50"
                    : "bg-white text-petrol-600 ring-1 ring-petrol-200 hover:bg-petrol-50"
                }`}
              >
                {p.cim}
              </button>
            ))}
          </div>

          <label className="mt-4 block">
            <span className="mb-1 block text-[12.5px] font-medium text-petrol-600">Az integrandus, f(x)</span>
            <input
              type="text"
              value={fSzoveg}
              onChange={(e) => setFSzoveg(e.target.value)}
              className="szamok w-full rounded-lg border border-petrol-200 bg-white px-3 py-2 text-[14px] text-petrol-900 outline-none focus:border-petrol-400 focus:ring-2 focus:ring-petrol-100"
            />
          </label>
          {!fF.ok && <p className="mt-1 text-[12px] text-rose-600">{fF.hiba}</p>}

          <label className="mt-3 block">
            <span className="mb-1 block text-[12.5px] font-medium text-petrol-600">A tipped, F(x)</span>
            <input
              type="text"
              value={FSzoveg}
              onChange={(e) => setFSzoveg2(e.target.value)}
              className="szamok w-full rounded-lg border border-petrol-200 bg-white px-3 py-2 text-[14px] text-petrol-900 outline-none focus:border-petrol-400 focus:ring-2 focus:ring-petrol-100"
            />
          </label>
          {!FF.ok && <p className="mt-1 text-[12px] text-rose-600">{FF.hiba}</p>}

          <div className="mt-3 grid grid-cols-2 gap-2">
            <label className="block">
              <span className="mb-1 block text-[12.5px] font-medium text-petrol-600">A szakasz kezdete</span>
              <input
                type="text"
                inputMode="decimal"
                value={tol}
                onChange={(e) => setTol(e.target.value)}
                className="szamok w-full rounded-lg border border-petrol-200 bg-white px-3 py-2 text-[14px] text-petrol-900 outline-none focus:border-petrol-400"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-[12.5px] font-medium text-petrol-600">A szakasz vége</span>
              <input
                type="text"
                inputMode="decimal"
                value={ig}
                onChange={(e) => setIg(e.target.value)}
                className="szamok w-full rounded-lg border border-petrol-200 bg-white px-3 py-2 text-[14px] text-petrol-900 outline-none focus:border-petrol-400"
              />
            </label>
          </div>

          {eredmeny ? (
            <div
              className={`mt-4 rounded-xl border p-4 ${
                eredmeny.egyezik ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"
              }`}
            >
              <p
                className={`text-[10.5px] font-bold tracking-[0.16em] uppercase ${
                  eredmeny.egyezik ? "text-emerald-700" : "text-rose-700"
                }`}
              >
                {eredmeny.egyezik ? "Egyezik — az eredményed jó" : "Nem egyezik"}
              </p>
              <p className="mt-1 text-[13.5px] leading-relaxed text-petrol-800">
                {eredmeny.ervenyesDb < 4
                  ? "Túl kevés érvényes mintapont — valószínűleg a szakasz kilóg az értelmezési tartományból."
                  : eredmeny.egyezik
                    ? `A legnagyobb relatív eltérés ${sz(eredmeny.maxRel * 100, 4)} %, ami a numerikus deriválás hibahatárán belül van. A +C-t persze ez az ellenőrzés nem látja — ki ne felejtsd!`
                    : `A legnagyobb relatív eltérés ${sz(
                        eredmeny.maxRel * 100,
                        2,
                      )} %. Nézd meg a táblázatot: ha az eltérés mindenütt ugyanannyiszorosa az f-nek, akkor egy konstans szorzó hiányzik (tipikusan a láncszabály 1/a tényezője).`}
              </p>
            </div>
          ) : (
            <p className="mt-4 rounded-xl border border-petrol-200 bg-petrol-50 px-4 py-3 text-[13px] text-petrol-700">
              Írj be egy érvényes <M>{"f"}</M> és <M>{"F"}</M> képletet, és egy szakaszt, amelyen mindkettő értelmes.
            </p>
          )}

          <p className="mt-3 text-[12.5px] leading-relaxed text-petrol-500">
            Írásmód: a szorzást <strong>ki kell írni</strong> (<span className="szamok">3*x</span>, nem{" "}
            <span className="szamok">3x</span>). Használható: <span className="szamok">sqrt, ln, exp, sin, cos, tg,
            ctg, arcsin, arctg, sh, ch, th, abs, pi, e</span> és a <span className="szamok">^</span> hatványozás.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   2. Parciális tört kalkulátor: (ax+b)/(x²+px+q)
   ================================================================ */

export function HiParcialisTortKalk() {
  const [aSz, setASz] = useState("3");
  const [bSz, setBSz] = useState("2");
  const [pSz, setPSz] = useState("1");
  const [qSz, setQSz] = useState("-6");

  const a = szamma(aSz);
  const b = szamma(bSz);
  const p = szamma(pSz);
  const q = szamma(qSz);
  const ervenyes = [a, b, p, q].every(Number.isFinite);
  const D = ervenyes ? p * p - 4 * q : NaN;

  const eset = !ervenyes ? "hiba" : D > 1e-9 ? "ket" : D < -1e-9 ? "komplex" : "ketszeres";

  let adat = null;
  if (eset === "ket") {
    const gy = Math.sqrt(D);
    const alfa = (-p + gy) / 2;
    const beta = (-p - gy) / 2;
    const A = (a * alfa + b) / (alfa - beta);
    const B = (a * beta + b) / (beta - alfa);
    adat = { alfa, beta, A, B };
  } else if (eset === "ketszeres") {
    const alfa = -p / 2;
    adat = { alfa, A: a, B: a * alfa + b };
  } else if (eset === "komplex") {
    const u = p / 2;
    const v = Math.sqrt(q - (p * p) / 4);
    adat = { u, v, logSzorzo: a / 2, arcSzorzo: (b - (a * p) / 2) / v };
  }

  const F = (x) => {
    if (!adat) return NaN;
    if (eset === "ket") {
      return adat.A * Math.log(Math.abs(x - adat.alfa)) + adat.B * Math.log(Math.abs(x - adat.beta));
    }
    if (eset === "ketszeres") {
      return adat.A * Math.log(Math.abs(x - adat.alfa)) - adat.B / (x - adat.alfa);
    }
    return adat.logSzorzo * Math.log(x * x + p * x + q) + adat.arcSzorzo * Math.atan((x + adat.u) / adat.v);
  };
  const f = (x) => {
    const n = x * x + p * x + q;
    return Math.abs(n) < 1e-9 ? NaN : (a * x + b) / n;
  };

  /* Egyetlen pontban ellenőrizzük numerikusan is. */
  const xP = eset === "ket" ? Math.max(adat.alfa, adat.beta) + 1.7 : eset === "ketszeres" ? adat.alfa + 1.7 : 0.6;
  const ellf = f(xP);
  const ellD = derivalt(F, xP);
  const rendben =
    Number.isFinite(ellf) && Number.isFinite(ellD) && Math.abs(ellf - ellD) <= Math.max(1e-6, Math.abs(ellf) * 5e-3);

  const tagSz = (c) => (c >= 0 ? `+ ${tomorSzam(c)}` : `- ${tomorSzam(-c)}`);
  /** Előjeles tag kiírása „+ 3x”, „− x”, „+ 4” alakban; nullánál semmi. */
  const kifTag = (c, kif = "") => {
    if (Math.abs(c) < 1e-12) return "";
    const jel = c > 0 ? "+" : "-";
    const abs = Math.abs(c);
    const szam = kif && Math.abs(abs - 1) < 1e-12 ? "" : tomorSzam(abs);
    return ` ${jel} ${szam}${kif}`;
  };
  /** A kifejezés eleje (első tag, előjel nélkül ha pozitív). */
  const elsoTag = (c, kif = "") => {
    if (Math.abs(c) < 1e-12) return "";
    const abs = Math.abs(c);
    const szam = kif && Math.abs(abs - 1) < 1e-12 ? "" : tomorSzam(abs);
    return `${c < 0 ? "-" : ""}${szam}${kif}`;
  };
  const nevezo = `x^2${kifTag(p, "x")}${kifTag(q)}`;
  const szamlalo = Math.abs(a) < 1e-12 ? tomorSzam(b) : `${elsoTag(a, "x")}${kifTag(b)}`;

  const also = adat ? (eset === "ket" ? Math.min(adat.alfa, adat.beta) - 3 : eset === "ketszeres" ? adat.alfa - 3 : -4) : -4;
  const felso = adat ? (eset === "ket" ? Math.max(adat.alfa, adat.beta) + 3 : eset === "ketszeres" ? adat.alfa + 3 : 4) : 4;

  /* Ésszerű y-tartomány: a minták középső 90 %-a, ±10-re vágva. */
  const yTart = (() => {
    const v = [];
    for (let i = 0; i <= 400; i++) {
      const x = also + ((felso - also) * i) / 400;
      for (const g of [f, F]) {
        const y = g(x);
        if (Number.isFinite(y) && Math.abs(y) < 50) v.push(y);
      }
    }
    if (v.length < 10) return [-6, 6];
    v.sort((m, n) => m - n);
    let lo = Math.min(0, v[Math.floor(v.length * 0.05)]);
    let hi = Math.max(0, v[Math.ceil(v.length * 0.95) - 1]);
    if (hi - lo < 1) {
      lo -= 1;
      hi += 1;
    }
    const pad = (hi - lo) * 0.18;
    return [Math.max(-12, lo - pad), Math.min(12, hi + pad)];
  })();

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          {ervenyes ? (
            <FvRajz
              xMin={also}
              xMax={felso}
              yMin={yTart[0]}
              yMax={yTart[1]}
              gorbek={[
                {
                  fn: f,
                  szin: TEAL,
                  vastag: 2.8,
                  cimke: "f(x)",
                  cimkeX: also + (felso - also) * 0.28,
                },
                {
                  fn: F,
                  szin: NAR,
                  vastag: 2.4,
                  cimke: "F(x)",
                  cimkeX: also + (felso - also) * 0.72,
                },
              ]}
              className="abra w-full select-none"
            />
          ) : (
            <div className="flex h-[300px] items-center justify-center text-[13px] text-petrol-400">
              Adj meg négy számot.
            </div>
          )}
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            Teal: az integrandus. Narancs: a kiszámolt primitív függvény (C = 0 választással).
          </p>
        </div>

        <div className="p-5">
          <div className="szamok text-[15px] text-petrol-900">
            <MB>{`\\int \\frac{${szamlalo}}{${nevezo}}\\,dx`}</MB>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[
              ["a", aSz, setASz],
              ["b", bSz, setBSz],
              ["p", pSz, setPSz],
              ["q", qSz, setQSz],
            ].map(([cimke, ertek, be]) => (
              <label key={cimke} className="block">
                <span className="mb-1 block text-[12.5px] font-medium text-petrol-600">{cimke}</span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={ertek}
                  onChange={(e) => be(e.target.value)}
                  className="szamok w-full rounded-lg border border-petrol-200 bg-white px-2.5 py-2 text-[14px] text-petrol-900 outline-none focus:border-petrol-400"
                />
              </label>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {[
              { cim: "KF‑5", v: ["3", "2", "1", "-6"] },
              { cim: "Komplex gyökök", v: ["1", "0", "4", "13"] },
              { cim: "Kétszeres gyök", v: ["2", "1", "-4", "4"] },
              { cim: "Tiszta arctg", v: ["0", "1", "0", "9"] },
            ].map((e) => (
              <button
                key={e.cim}
                type="button"
                onClick={() => {
                  setASz(e.v[0]);
                  setBSz(e.v[1]);
                  setPSz(e.v[2]);
                  setQSz(e.v[3]);
                }}
                className="rounded-lg bg-white px-2.5 py-1.5 text-[11.5px] font-medium text-petrol-600 ring-1 ring-petrol-200 transition hover:bg-petrol-50"
              >
                {e.cim}
              </button>
            ))}
          </div>

          {ervenyes && (
            <>
              <div className="mt-4 rounded-xl border border-petrol-200 bg-white p-4">
                <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">
                  A diszkrimináns: {sz(D, 2)}
                </p>
                <p className="mt-1 text-[13px] text-petrol-700">
                  {eset === "ket"
                    ? "Két különböző valós gyök — a nevező gyöktényezőkre bomlik, két logaritmus lesz az eredmény."
                    : eset === "ketszeres"
                      ? "Kétszeres valós gyök — a bontásban egy logaritmusos és egy hatványos tag áll."
                      : "Nincs valós gyök — teljes négyzetté alakítunk, az eredmény egy logaritmus és egy arkusz tangens."}
                </p>
              </div>

              <div className="szamok finom-gorgeto mt-3 overflow-x-auto rounded-xl border border-naracs-200 bg-naracs-50 p-4 text-[13.5px] text-naracs-900">
                {eset === "ket" && (
                  <>
                    <MB>{`${nevezo} = \\left(x ${tagSz(-adat.alfa)}\\right)\\left(x ${tagSz(-adat.beta)}\\right)`}</MB>
                    <MB>{`A = ${tomorSzam(adat.A)}, \\qquad B = ${tomorSzam(adat.B)}`}</MB>
                    <MB>{`\\int = ${tomorSzam(adat.A)}\\ln\\left|x ${tagSz(
                      -adat.alfa,
                    )}\\right| ${tagSz(adat.B)}\\ln\\left|x ${tagSz(-adat.beta)}\\right|+C`}</MB>
                  </>
                )}
                {eset === "ketszeres" && (
                  <>
                    <MB>{`${nevezo} = \\left(x ${tagSz(-adat.alfa)}\\right)^2`}</MB>
                    <MB>{`\\int = ${tomorSzam(adat.A)}\\ln\\left|x ${tagSz(
                      -adat.alfa,
                    )}\\right| ${tagSz(-adat.B)}\\cdot\\frac{1}{x ${tagSz(-adat.alfa)}}+C`}</MB>
                  </>
                )}
                {eset === "komplex" && (
                  <>
                    <MB>{`${nevezo} = \\left(x${kifTag(adat.u)}\\right)^2 + ${tomorSzam(adat.v)}^2`}</MB>
                    {Math.abs(adat.logSzorzo) > 1e-12 && (
                      <MB>{`${szamlalo} = ${tomorSzam(adat.logSzorzo)}\\left(2x${kifTag(
                        p,
                      )}\\right)${kifTag(b - (a * p) / 2)}`}</MB>
                    )}
                    <MB>{`\\int = ${
                      Math.abs(adat.logSzorzo) > 1e-12
                        ? `${tomorSzam(adat.logSzorzo)}\\ln\\left(${nevezo}\\right)${kifTag(adat.arcSzorzo)}`
                        : `${elsoTag(adat.arcSzorzo)}`
                    }\\operatorname{arctg}\\frac{x${kifTag(adat.u)}}{${tomorSzam(adat.v)}}+C`}</MB>
                  </>
                )}
              </div>

              <div
                className={`mt-3 rounded-xl border px-4 py-3 text-[13px] ${
                  rendben ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-rose-200 bg-rose-50 text-rose-900"
                }`}
              >
                <span className="szamok font-semibold">
                  Ellenőrzés x = {sz(xP, 2)}-nél: F ′ = {sz(ellD, 5)}, f = {sz(ellf, 5)}
                </span>{" "}
                {rendben ? "✓ egyezik" : "— nézd meg a bemenetet"}
              </div>
            </>
          )}

          <p className="mt-3 text-[12.5px] leading-relaxed text-petrol-500">
            A kalkulátor csak <strong>valódi</strong> törtet kezel (a számláló elsőfokú, a nevező másodfokú). Ha a
            számláló foka nagyobb lenne, előbb polinomosztás kell.
          </p>
        </div>
      </div>
    </div>
  );
}
