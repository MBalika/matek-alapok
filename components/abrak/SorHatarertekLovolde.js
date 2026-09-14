"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Konfetti from "@/components/ui/Konfetti";
import { M } from "@/components/ui/Keplet";
import { sz } from "@/lib/szamok";

const KOROK = 10;
const IDO = 20; // másodperc körönként

const E = Math.E;

/* kategoria: "veges" | "plusz" | "minusz" | "nincs" */
const BANK = [
  { k: "\\frac{3n-1}{n+2}", kat: "veges", ertek: 3, mi: "Azonos fokszám: a főegyütthatók hányadosa, 3/1 = 3." },
  { k: "\\frac{n^2+1}{2n^2-n}", kat: "veges", ertek: 0.5, mi: "Azonos fokszám: 1/2." },
  { k: "\\frac{n+1}{n^2}", kat: "veges", ertek: 0, mi: "A nevező fokszáma nagyobb, tehát 0." },
  { k: "\\frac{n^3-2n}{5n^2+1}", kat: "plusz", mi: "A számláló fokszáma nagyobb, a főegyütthatók előjele pozitív → +∞." },
  { k: "\\frac{1-2n^3}{n^2+1}", kat: "minusz", mi: "A számláló fokszáma nagyobb, a főegyüttható −2 < 0 → −∞." },
  { k: "5n - n^2", kat: "minusz", mi: "A −n² dominál: −∞." },
  { k: "(-1)^n", kat: "nincs", mi: "Két torlódási pont (−1 és 1), nincs határérték — még tágabb értelemben sem." },
  { k: "\\frac{(-1)^n}{n}", kat: "veges", ertek: 0, mi: "Korlátos szorozva nullsorozattal: 0." },
  { k: "(-1)^n\\cdot n", kat: "nincs", mi: "Nem korlátos és oszcillál: nincs határérték semmilyen értelemben." },
  { k: "(-1)^n\\cdot\\frac{n}{n+1}", kat: "nincs", mi: "Két torlódási pont: −1 és 1. Divergens." },
  { k: "\\left(\\frac23\\right)^n", kat: "veges", ertek: 0, mi: "|q| < 1, tehát qⁿ → 0." },
  { k: "(-3)^n", kat: "nincs", mi: "q ≤ −1: korlátlanul oszcillál, nincs határértéke." },
  { k: "\\left(\\frac32\\right)^n", kat: "plusz", mi: "q > 1, tehát qⁿ → +∞." },
  { k: "\\left(-\\frac12\\right)^n", kat: "veges", ertek: 0, mi: "|q| = 1/2 < 1 — az előjelváltás nem számít, a határérték 0." },
  { k: "\\sqrt{n^2+n}-n", kat: "veges", ertek: 0.5, mi: "Konjugálttal bővítve n/(√(n²+n)+n) → 1/2." },
  { k: "\\sqrt{n+3}-\\sqrt{n}", kat: "veges", ertek: 0, mi: "3/(√(n+3)+√n) → 0." },
  { k: "\\sqrt{4n^2+n}-2n", kat: "veges", ertek: 0.25, mi: "n/(√(4n²+n)+2n) → 1/4." },
  { k: "\\left(1+\\frac1n\\right)^n", kat: "veges", ertek: E, mi: "Ez az e szám definíciója: ≈ 2,718." },
  { k: "\\left(1+\\frac2n\\right)^n", kat: "veges", ertek: E * E, mi: "(1 + c/n)ⁿ → eᶜ, itt e² ≈ 7,389." },
  { k: "\\left(\\frac{n-1}{n+1}\\right)^n", kat: "veges", ertek: Math.exp(-2), mi: "1 − 2/(n+1) alak, a külső kitevő −2 → e⁻² ≈ 0,135." },
  { k: "\\left(1+\\frac{1}{n^2}\\right)^n", kat: "veges", ertek: 1, mi: "A külső kitevő 1/n → 0, tehát e⁰ = 1. Nem minden 1^∞ ad e-t!" },
  { k: "\\sqrt[n]{3^n+4^n}", kat: "veges", ertek: 4, mi: "A nagyobbik alap dönt: max(3;4) = 4." },
  { k: "\\sqrt[n]{n}", kat: "veges", ertek: 1, mi: "Nevezetes határérték: 1." },
  { k: "\\sqrt[n]{7}", kat: "veges", ertek: 1, mi: "Rögzített c > 0 esetén ⁿ√c → 1." },
  { k: "\\frac{n!}{n^n}", kat: "veges", ertek: 0, mi: "n^n erősebb a faktoriálisnál: 0." },
  { k: "\\frac{2^n}{n!}", kat: "veges", ertek: 0, mi: "A faktoriális erősebb az exponenciálisnál: 0." },
  { k: "\\frac{n!}{2^n}", kat: "plusz", mi: "A faktoriális erősebb, és ő van a számlálóban: +∞." },
  { k: "\\frac{n^2}{2^n}", kat: "veges", ertek: 0, mi: "Az exponenciális erősebb a hatványnál: 0." },
  { k: "\\frac{2^n}{n^2}", kat: "plusz", mi: "Az exponenciális erősebb, és a számlálóban van: +∞." },
  { k: "\\frac{\\ln n}{n}", kat: "veges", ertek: 0, mi: "A logaritmus a leglassabb: 0." },
  { k: "\\frac{\\sin n}{n}", kat: "veges", ertek: 0, mi: "Korlátos (|sin n| ≤ 1) szorozva nullsorozattal: 0." },
  { k: "\\frac{3^n-2^n}{3^n+2^n}", kat: "veges", ertek: 1, mi: "3ⁿ-nel osztva: (1 − (2/3)ⁿ)/(1 + (2/3)ⁿ) → 1." },
  { k: "\\frac{1+2+\\dots+n}{n^2}", kat: "veges", ertek: 0.5, mi: "Az összeg n(n+1)/2, osztva n²-tel → 1/2. Tagonként nem szabad határértéket venni!" },
  { k: "\\frac{3n+(-1)^n}{n+2}", kat: "veges", ertek: 3, mi: "A (−1)ⁿ korlátos, n mellett elhanyagolható: 3." },
];

const VALASZOK = [
  { id: "veges", nev: "véges határérték (szám)" },
  { id: "plusz", nev: "+∞" },
  { id: "minusz", nev: "−∞" },
  { id: "nincs", nev: "oszcillál / nincs" },
];

function kever(t) {
  const m = [...t];
  for (let i = m.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [m[i], m[j]] = [m[j], m[i]];
  }
  return m;
}

export default function SorHatarertekLovolde() {
  const [fut, setFut] = useState(false);
  const [sor, setSor] = useState([]);
  const [kor, setKor] = useState(0);
  const [pont, setPont] = useState(0);
  const [fazis, setFazis] = useState("kategoria"); // kategoria | ertek | eredmeny
  const [katValasz, setKatValasz] = useState(null);
  const [beirt, setBeirt] = useState("");
  const [ido, setIdo] = useState(IDO);
  const [eredmeny, setEredmeny] = useState(null);
  const [kesz, setKesz] = useState(false);
  const [konfetti, setKonfetti] = useState(false);
  const [rekord, setRekord] = useState(null);
  const fazisRef = useRef(fazis);
  fazisRef.current = fazis;

  useEffect(() => {
    try {
      const r = localStorage.getItem("matek-hovatart-rekord");
      if (r) setRekord(Number(r));
    } catch {
      /* privát mód */
    }
  }, []);

  const feladat = sor[kor - 1];

  const zar = useCallback(
    (katJo, ertekJo, maradek) => {
      const alap = katJo ? 50 : 0;
      const ertekPont = katJo && ertekJo ? 30 : 0;
      const gyorsasag = katJo ? Math.round((Math.max(0, maradek) / IDO) * 20) : 0;
      const p = alap + ertekPont + gyorsasag;
      setPont((x) => x + p);
      setEredmeny({ p, katJo, ertekJo });
      setFazis("eredmeny");
    },
    [],
  );

  // visszaszámláló
  useEffect(() => {
    if (!fut || kesz || fazis === "eredmeny") return undefined;
    const id = setInterval(() => {
      setIdo((t) => {
        if (t <= 0.1) {
          clearInterval(id);
          return 0;
        }
        return Math.round((t - 0.1) * 10) / 10;
      });
    }, 100);
    return () => clearInterval(id);
  }, [fut, kesz, fazis, kor]);

  useEffect(() => {
    if (ido > 0 || !fut || kesz || fazisRef.current === "eredmeny") return;
    // ha a kategória már megvolt és csak az érték hiányzik, a kategóriapont jár
    zar(fazisRef.current === "ertek", false, 0);
  }, [ido, fut, kesz, zar]);

  const indit = () => {
    setSor(kever(BANK).slice(0, KOROK));
    setKor(1);
    setPont(0);
    setFazis("kategoria");
    setKatValasz(null);
    setBeirt("");
    setIdo(IDO);
    setEredmeny(null);
    setKesz(false);
    setFut(true);
  };

  const kategoriat = (id) => {
    if (fazis !== "kategoria") return;
    setKatValasz(id);
    if (id === "veges" && feladat.kat === "veges") {
      setFazis("ertek");
      return;
    }
    zar(id === feladat.kat, false, ido);
  };

  const ertekBe = () => {
    if (fazis !== "ertek") return;
    const v = Number(String(beirt).replace(",", "."));
    const cel = feladat.ertek;
    const tures = Math.max(0.02, Math.abs(cel) * 0.02);
    zar(true, Number.isFinite(v) && Math.abs(v - cel) <= tures, ido);
  };

  const kovetkezo = () => {
    if (kor >= KOROK) {
      setKesz(true);
      setFut(false);
      setRekord((r) => {
        const uj = Math.max(r ?? 0, pont);
        try {
          localStorage.setItem("matek-hovatart-rekord", String(uj));
        } catch {
          /* privát mód */
        }
        return uj;
      });
      if (pont >= 800) setKonfetti(true);
      return;
    }
    setKor((k) => k + 1);
    setFazis("kategoria");
    setKatValasz(null);
    setBeirt("");
    setIdo(IDO);
    setEredmeny(null);
  };

  const helyesNev = (kat) => VALASZOK.find((v) => v.id === kat)?.nev ?? "";

  /* ---------- kezdő / záró képernyő ---------- */
  if (!fut || kesz) {
    return (
      <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white shadow-sm shadow-petrol-900/[0.03]">
        <Konfetti aktiv={konfetti} onVege={() => setKonfetti(false)} />
        <div className="flex flex-wrap items-center gap-2 border-b border-[color:var(--keret)] bg-linear-to-r from-petrol-800 to-petrol-700 px-4 py-2.5">
          <span className="rounded-md bg-violet-500 px-2 py-0.5 text-[10.5px] font-bold tracking-[0.14em] text-white uppercase">
            Játék
          </span>
          <span className="text-[13px] font-semibold text-white">Hova tart?</span>
        </div>
        <div className="p-5">
          {kesz && (
            <div className="mb-5 rounded-xl border border-naracs-200 bg-naracs-50 p-4 text-center">
              <p className="text-[11px] font-bold tracking-[0.16em] text-naracs-700 uppercase">Vége</p>
              <p className="szamok mt-1 text-4xl font-bold text-petrol-900">
                {pont} <span className="text-lg font-semibold text-petrol-400">/ {KOROK * 100}</span>
              </p>
              <p className="mt-1 text-[14px] text-petrol-700">
                {pont >= 900
                  ? "Kiváló — a nagyságrendek és a nevezetes határértékek a helyükön vannak."
                  : pont >= 700
                    ? "Jó! Egy-két típus (e-típus vagy gyökös) még bizonytalan."
                    : pont >= 400
                      ? "Közepes — nézd át a nagyságrend-láncot és a qⁿ eseteit."
                      : "Érdemes visszamenni az elmélethez: a típusfelismerés még nem megy."}
              </p>
            </div>
          )}
          <p className="text-[14px] leading-relaxed text-petrol-700">
            Tíz sorozat, körönként {IDO} másodperc. Először döntsd el, <strong>hova tart</strong>: véges számhoz, +∞-hez,
            −∞-hez, vagy sehova. Ha véges, a második lépésben a konkrét értéket is be kell írnod.
          </p>
          <p className="mt-2 text-[13px] text-petrol-600">
            Pontozás: jó kategória 50 pont, jó érték +30, gyorsaság +20. Maximum 1000 pont.
          </p>
          {rekord != null && <p className="szamok mt-3 text-[12.5px] text-naracs-700">Rekordod: {rekord} pont</p>}
          <button
            type="button"
            onClick={indit}
            className="mt-4 rounded-lg bg-naracs-500 px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-naracs-600"
          >
            {kesz ? "Új játék ↻" : "Indulhat ▶"}
          </button>
        </div>
      </div>
    );
  }

  /* ---------- futó játék ---------- */
  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white shadow-sm shadow-petrol-900/[0.03]">
      <div className="flex flex-wrap items-center gap-2 border-b border-[color:var(--keret)] bg-linear-to-r from-petrol-800 to-petrol-700 px-4 py-2.5">
        <span className="rounded-md bg-violet-500 px-2 py-0.5 text-[10.5px] font-bold tracking-[0.14em] text-white uppercase">
          Játék
        </span>
        <span className="text-[13px] font-semibold text-white">Hova tart?</span>
        <span className="szamok ml-auto text-[11.5px] text-petrol-200">
          {kor} / {KOROK} kör · {pont} pont
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-petrol-100">
            <div
              className={`h-full rounded-full transition-all ${ido > IDO * 0.3 ? "bg-violet-500" : "bg-rose-500"}`}
              style={{ width: `${(ido / IDO) * 100}%` }}
            />
          </div>
          <span className="szamok w-12 text-right text-[12.5px] font-semibold text-petrol-600">{sz(ido, 1)} s</span>
        </div>

        <div className="mt-5 rounded-xl bg-petrol-50 px-4 py-5 text-center">
          <p className="text-[11px] font-bold tracking-[0.16em] text-petrol-500 uppercase">Mennyi a határérték?</p>
          <div className="szamok mt-2 text-[19px] text-petrol-900">
            <M>{`\\lim_{n\\to\\infty} ${feladat.k}`}</M>
          </div>
        </div>

        {fazis === "kategoria" && (
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {VALASZOK.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => kategoriat(v.id)}
                className="rounded-xl border border-petrol-200 bg-white px-4 py-3 text-left text-[14px] font-medium text-petrol-800 transition hover:border-petrol-400 hover:bg-petrol-50"
              >
                {v.nev}
              </button>
            ))}
          </div>
        )}

        {fazis === "ertek" && (
          <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-[13px] text-emerald-900">
              Jó irány — véges a határérték. <strong>Mennyi pontosan?</strong> (tizedesvessző és pont is jó; e ≈ 2,718)
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <input
                type="text"
                inputMode="decimal"
                value={beirt}
                autoFocus
                onChange={(e) => setBeirt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && ertekBe()}
                placeholder="?"
                className="szamok w-32 rounded-lg border border-petrol-200 bg-white px-3 py-2 text-[14.5px] text-petrol-900 outline-none focus:border-petrol-400"
              />
              <button
                type="button"
                onClick={ertekBe}
                className="rounded-lg bg-petrol-700 px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-petrol-800"
              >
                Beküldés
              </button>
            </div>
          </div>
        )}

        {fazis === "eredmeny" && eredmeny && (
          <div
            className={`mt-4 rounded-xl border px-4 py-3 ${
              eredmeny.p >= 70 ? "border-emerald-200 bg-emerald-50" : eredmeny.p > 0 ? "border-naracs-200 bg-naracs-50" : "border-rose-200 bg-rose-50"
            }`}
          >
            <p
              className={`szamok text-[11px] font-bold tracking-[0.14em] uppercase ${
                eredmeny.p >= 70 ? "text-emerald-700" : eredmeny.p > 0 ? "text-naracs-700" : "text-rose-700"
              }`}
            >
              +{eredmeny.p} pont
            </p>
            <p className="mt-1 text-[13.5px] text-petrol-800">
              {eredmeny.katJo ? (
                feladat.kat === "veges" ? (
                  eredmeny.ertekJo ? (
                    <>Mindkettő jó.</>
                  ) : (
                    <>
                      A kategória jó, az érték nem: helyesen <span className="szamok font-semibold">{sz(feladat.ertek, 4)}</span>.
                    </>
                  )
                ) : (
                  <>Jó.</>
                )
              ) : (
                <>
                  Helyesen: <strong>{helyesNev(feladat.kat)}</strong>
                  {feladat.kat === "veges" ? (
                    <>
                      , mégpedig <span className="szamok font-semibold">{sz(feladat.ertek, 4)}</span>
                    </>
                  ) : null}
                  {katValasz == null ? " — lejárt az idő." : "."}
                </>
              )}
            </p>
            <p className="mt-1 text-[12.5px] text-petrol-600">{feladat.mi}</p>
            <button
              type="button"
              onClick={kovetkezo}
              className="mt-3 rounded-lg bg-naracs-500 px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-naracs-600"
            >
              {kor >= KOROK ? "Eredmény" : "Következő kör →"}
            </button>
          </div>
        )}

        <button type="button" onClick={() => setFut(false)} className="mt-4 text-[12px] text-petrol-500 hover:text-petrol-800">
          Játék megszakítása
        </button>
      </div>
    </div>
  );
}
