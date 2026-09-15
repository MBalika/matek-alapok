"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Konfetti from "@/components/ui/Konfetti";
import { M } from "@/components/ui/Keplet";
import { sz } from "@/lib/szamok";

const KOROK = 10;
const IDO = 22; // másodperc körönként

/**
 * kat: "konv" | "div"
 * ertek: ha konvergens ÉS elemi úton kiszámolható, a pontos érték (különben null)
 */
const BANK = [
  { k: "\\int_0^1 \\frac{dx}{\\sqrt{x}}", kat: "konv", ertek: 2, mi: "I. típusú p-integrál, p = 1/2 < 1: 1/(1−p) = 2." },
  { k: "\\int_0^1 \\frac{dx}{x}", kat: "div", ertek: null, mi: "A nullában p = 1 — a határeset mindig divergens." },
  { k: "\\int_0^1 \\frac{dx}{x^2}", kat: "div", ertek: null, mi: "A nullában p = 2 ≥ 1, tehát divergens." },
  { k: "\\int_0^1 \\frac{dx}{\\sqrt[3]{x}}", kat: "konv", ertek: 1.5, mi: "p = 1/3 < 1: 1/(1−1/3) = 3/2." },
  { k: "\\int_1^{\\infty} \\frac{dx}{x}", kat: "div", ertek: null, mi: "A végtelenben p = 1 — divergens (ln d → ∞)." },
  { k: "\\int_1^{\\infty} \\frac{dx}{x^2}", kat: "konv", ertek: 1, mi: "p = 2 > 1: 1/(p−1) = 1." },
  { k: "\\int_1^{\\infty} \\frac{dx}{x^3}", kat: "konv", ertek: 0.5, mi: "p = 3 > 1: 1/(3−1) = 1/2." },
  { k: "\\int_1^{\\infty} \\frac{dx}{\\sqrt{x}}", kat: "div", ertek: null, mi: "p = 1/2 ≤ 1 a végtelenben: divergens." },
  { k: "\\int_1^{\\infty} \\frac{dx}{x\\sqrt{x}}", kat: "konv", ertek: 2, mi: "x^{-3/2}, p = 3/2 > 1: 1/(3/2−1) = 2." },
  { k: "\\int_0^{\\infty} e^{-x}\\,dx", kat: "konv", ertek: 1, mi: "Az exponenciális lecsengés mindig elég gyors: [−e^{−x}] = 1." },
  { k: "\\int_0^{\\infty} e^{-2x}\\,dx", kat: "konv", ertek: 0.5, mi: "∫₀^∞ e^{−kx}dx = 1/k, itt 1/2." },
  { k: "\\int_0^{\\infty} e^{-x/2}\\,dx", kat: "konv", ertek: 2, mi: "k = 1/2, tehát 1/k = 2." },
  { k: "\\int_0^{\\infty} x e^{-x^2}\\,dx", kat: "konv", ertek: 0.5, mi: "A belső derivált szorzóval: [−½e^{−x²}]₀^∞ = 1/2." },
  { k: "\\int_{-\\infty}^{\\infty} \\frac{dx}{1+x^2}", kat: "konv", ertek: Math.PI, mi: "arctg a primitív függvény: π/2 + π/2 = π ≈ 3,1416." },
  { k: "\\int_0^{\\infty} \\frac{dx}{1+x^2}", kat: "konv", ertek: Math.PI / 2, mi: "[arctg x]₀^∞ = π/2 ≈ 1,5708." },
  { k: "\\int_{-1}^{1} \\frac{dx}{\\sqrt{1-x^2}}", kat: "konv", ertek: Math.PI, mi: "arcsin a primitív függvény, mindkét végponton véges: π." },
  { k: "\\int_{-1}^{1} \\frac{dx}{x^2}", kat: "div", ertek: null, mi: "Belső szakadás a 0-ban! Már az egyik fél is +∞ — a −2 „eredmény” hibás." },
  { k: "\\int_0^1 \\ln x\\,dx", kat: "konv", ertek: -1, mi: "Parciálisan: [x ln x − x]₀¹ = −1 (a c·ln c → 0)." },
  { k: "\\int_1^{\\infty} \\frac{\\ln x}{x^2}\\,dx", kat: "konv", ertek: 1, mi: "Parciálisan: −(ln x)/x − 1/x, a végtelenben 0, az 1-nél −(−1) = 1." },
  { k: "\\int_1^{\\infty} \\frac{dx}{\\ln x}", kat: "div", ertek: null, mi: "ln x < x, tehát 1/ln x > 1/x — divergens minoráns." },
  { k: "\\int_2^{\\infty} \\frac{dx}{x^2-1}", kat: "konv", ertek: Math.log(3) / 2, mi: "Parciális törtek: ½ln((x−1)/(x+1)), az érték ½ln3 ≈ 0,5493." },
  { k: "\\int_3^{\\infty} \\frac{dx}{x^2-4}", kat: "konv", ertek: Math.log(5) / 4, mi: "¼ln((x−2)/(x+2)) → ¼ln5 ≈ 0,4024." },
  { k: "\\int_0^{\\infty} \\frac{dx}{\\sqrt{x}\\,(1+x)}", kat: "konv", ertek: Math.PI, mi: "x = t² helyettesítéssel 2 arctg√x, az érték π/2 + π/2 = π." },
  { k: "\\int_1^{\\infty} e^{-x^2}\\,dx", kat: "konv", ertek: null, mi: "e^{−x²} ≤ e^{−x} (x ≥ 1): konvergens majoráns. Az érték nem elemi." },
  { k: "\\int_1^{\\infty} \\frac{dx}{x^2+\\sqrt{x}}", kat: "konv", ertek: null, mi: "Kisebb, mint 1/x², ami konvergens — majoránskritérium." },
  { k: "\\int_1^{\\infty} \\frac{2+\\sin x}{x}\\,dx", kat: "div", ertek: null, mi: "Legalább 1/x, ami divergens — minoránskritérium." },
  { k: "\\int_1^{\\infty} \\frac{2+\\cos x}{x^{3/2}}\\,dx", kat: "konv", ertek: null, mi: "Legfeljebb 3/x^{3/2}, ami konvergens (p = 3/2 > 1)." },
  { k: "\\int_1^{\\infty} \\frac{dx}{\\sqrt{x^4+5x}}", kat: "konv", ertek: null, mi: "Limeszes kritérium g = 1/x²-tel, L = 1 — konvergens." },
  { k: "\\int_1^{\\infty} \\frac{\\sqrt{2x+3}}{x}\\,dx", kat: "div", ertek: null, mi: "Limeszes kritérium g = 1/√x-szel, L = √2 — divergens." },
  { k: "\\int_1^{\\infty} \\frac{x+1}{x^2+3}\\,dx", kat: "div", ertek: null, mi: "g = 1/x, L = 1: divergens. A nevező foka csak eggyel nagyobb." },
  { k: "\\int_1^{\\infty} \\frac{3x^2-1}{x^4+x+7}\\,dx", kat: "konv", ertek: null, mi: "g = 1/x², L = 3: konvergens. A nevező foka kettővel nagyobb." },
  { k: "\\int_1^{\\infty} \\frac{dx}{x^3+1}", kat: "konv", ertek: null, mi: "Kisebb, mint 1/x³ — konvergens majoráns." },
  { k: "\\int_0^{\\infty} \\cos x\\,dx", kat: "div", ertek: null, mi: "sin d örökké ingadozik: a határérték nem létezik, tehát divergens." },
  { k: "\\int_0^{\\infty} \\frac{dx}{x^p}\\ (\\text{bármely } p)", kat: "div", ertek: null, mi: "Ami a nullában jó (p < 1), az a végtelenben rossz — soha nem konvergens." },
  { k: "\\int_0^4 \\frac{dx}{\\sqrt{4-x}}", kat: "konv", ertek: 4, mi: "A felső végpont szinguláris: [−2√(4−x)]₀⁴ = 2·2 = 4." },
  { k: "\\int_1^2 \\frac{dx}{\\sqrt{x-1}}", kat: "konv", ertek: 2, mi: "Az alsó végpont szinguláris: [2√(x−1)]₁² = 2." },
  { k: "\\int_0^9 \\frac{dx}{\\sqrt[3]{(x-1)^2}}", kat: "konv", ertek: 9, mi: "Belső szakadás x = 1-nél; a két rész 3 és 6, összesen 9." },
  { k: "\\int_1^{\\infty} \\frac{dx}{\\sqrt{x}+x}", kat: "div", ertek: null, mi: "g = 1/x, L = 1 — divergens (vagy: ≥ 1/(2x))." },
];

function kever(t) {
  const m = [...t];
  for (let i = m.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [m[i], m[j]] = [m[j], m[i]];
  }
  return m;
}

export default function ImKonvergensE() {
  const [fut, setFut] = useState(false);
  const [sor, setSor] = useState([]);
  const [kor, setKor] = useState(0);
  const [pont, setPont] = useState(0);
  const [fazis, setFazis] = useState("dontes"); // dontes | ertek | eredmeny
  const [dontes, setDontes] = useState(null);
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
      const r = localStorage.getItem("matek-konvergens-rekord");
      if (r) setRekord(Number(r));
    } catch {
      /* privát mód */
    }
  }, []);

  const feladat = sor[kor - 1];

  const zar = useCallback((katJo, ertekJo, maradek, ertekKell) => {
    const alap = katJo ? 50 : 0;
    const ertekPont = katJo && ertekKell && ertekJo ? 30 : katJo && !ertekKell ? 30 : 0;
    const gyorsasag = katJo ? Math.round((Math.max(0, maradek) / IDO) * 20) : 0;
    const p = alap + ertekPont + gyorsasag;
    setPont((x) => x + p);
    setEredmeny({ p, katJo, ertekJo, ertekKell });
    setFazis("eredmeny");
  }, []);

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
    zar(fazisRef.current === "ertek", false, 0, true);
  }, [ido, fut, kesz, zar]);

  const indit = () => {
    setSor(kever(BANK).slice(0, KOROK));
    setKor(1);
    setPont(0);
    setFazis("dontes");
    setDontes(null);
    setBeirt("");
    setIdo(IDO);
    setEredmeny(null);
    setKesz(false);
    setFut(true);
  };

  const dontesre = (id) => {
    if (fazis !== "dontes") return;
    setDontes(id);
    if (id === "konv" && feladat.kat === "konv" && feladat.ertek != null) {
      setFazis("ertek");
      return;
    }
    zar(id === feladat.kat, false, ido, false);
  };

  const ertekBe = () => {
    if (fazis !== "ertek") return;
    const v = Number(String(beirt).replace(",", "."));
    const cel = feladat.ertek;
    const tures = Math.max(0.02, Math.abs(cel) * 0.02);
    zar(true, Number.isFinite(v) && Math.abs(v - cel) <= tures, ido, true);
  };

  const kovetkezo = () => {
    if (kor >= KOROK) {
      setKesz(true);
      setFut(false);
      setRekord((r) => {
        const uj = Math.max(r ?? 0, pont);
        try {
          localStorage.setItem("matek-konvergens-rekord", String(uj));
        } catch {
          /* privát mód */
        }
        return uj;
      });
      if (pont >= 800) setKonfetti(true);
      return;
    }
    setKor((k) => k + 1);
    setFazis("dontes");
    setDontes(null);
    setBeirt("");
    setIdo(IDO);
    setEredmeny(null);
  };

  /* ---------- kezdő / záró képernyő ---------- */
  if (!fut || kesz) {
    return (
      <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white shadow-sm shadow-petrol-900/[0.03]">
        <Konfetti aktiv={konfetti} onVege={() => setKonfetti(false)} />
        <div className="flex flex-wrap items-center gap-2 border-b border-[color:var(--keret)] bg-linear-to-r from-petrol-800 to-petrol-700 px-4 py-2.5">
          <span className="rounded-md bg-violet-500 px-2 py-0.5 text-[10.5px] font-bold tracking-[0.14em] text-white uppercase">
            Játék
          </span>
          <span className="text-[13px] font-semibold text-white">Konvergens vagy divergens?</span>
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
                  ? "Kiváló — a p-kritérium és az összehasonlító kritériumok a helyükön vannak."
                  : pont >= 700
                    ? "Jó! Egy-két típus (belső szakadás vagy limeszes kritérium) még bizonytalan."
                    : pont >= 400
                      ? "Közepes — nézd át a p-kritérium két esetét, könnyű felcserélni őket."
                      : "Érdemes visszamenni a 8.5–8.7 pontokhoz: a típusfelismerés még nem megy."}
              </p>
            </div>
          )}
          <p className="text-[14px] leading-relaxed text-petrol-700">
            Tíz improprius integrál, körönként {IDO} másodperc. Először döntsd el, <strong>konvergens-e</strong>. Ha
            konvergens és elemi úton kiszámolható, a második lépésben az <strong>értéket</strong> is be kell írnod.
          </p>
          <p className="mt-2 text-[13px] text-petrol-600">
            Pontozás: jó döntés 50 pont, jó érték +30, gyorsaság +20. Maximum 1000 pont.
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
        <span className="text-[13px] font-semibold text-white">Konvergens vagy divergens?</span>
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
          <p className="text-[11px] font-bold tracking-[0.16em] text-petrol-500 uppercase">Konvergens ez az integrál?</p>
          <div className="szamok mt-2 text-[19px] text-petrol-900">
            <M>{feladat.k}</M>
          </div>
        </div>

        {fazis === "dontes" && (
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => dontesre("konv")}
              className="rounded-xl border-2 border-emerald-300 bg-emerald-50 px-4 py-4 text-[15px] font-semibold text-emerald-900 transition hover:border-emerald-500 hover:bg-emerald-100"
            >
              Konvergens
            </button>
            <button
              type="button"
              onClick={() => dontesre("div")}
              className="rounded-xl border-2 border-rose-300 bg-rose-50 px-4 py-4 text-[15px] font-semibold text-rose-900 transition hover:border-rose-500 hover:bg-rose-100"
            >
              Divergens
            </button>
          </div>
        )}

        {fazis === "ertek" && (
          <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-[13px] text-emerald-900">
              Jó irány — konvergens. <strong>Mennyi az értéke?</strong> (tizedesvessző és pont is jó; π ≈ 3,1416)
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <input
                type="text"
                inputMode="decimal"
                value={beirt}
                autoFocus
                onChange={(ev) => setBeirt(ev.target.value)}
                onKeyDown={(ev) => ev.key === "Enter" && ertekBe()}
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
              eredmeny.p >= 70
                ? "border-emerald-200 bg-emerald-50"
                : eredmeny.p > 0
                  ? "border-naracs-200 bg-naracs-50"
                  : "border-rose-200 bg-rose-50"
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
                eredmeny.ertekKell ? (
                  eredmeny.ertekJo ? (
                    <>Mindkettő jó.</>
                  ) : (
                    <>
                      A döntés jó, az érték nem: helyesen{" "}
                      <span className="szamok font-semibold">{sz(feladat.ertek, 4)}</span>.
                    </>
                  )
                ) : (
                  <>Jó.</>
                )
              ) : (
                <>
                  Helyesen: <strong>{feladat.kat === "konv" ? "konvergens" : "divergens"}</strong>
                  {feladat.kat === "konv" && feladat.ertek != null ? (
                    <>
                      , az értéke <span className="szamok font-semibold">{sz(feladat.ertek, 4)}</span>
                    </>
                  ) : null}
                  {dontes == null ? " — lejárt az idő." : "."}
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
