"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Konfetti from "@/components/ui/Konfetti";
import { M } from "@/components/ui/Keplet";
import { sz } from "@/lib/szamok";
import {
  egyenesParamK,
  hossz,
  kul,
  ossz,
  nyujt,
  parhuzamos,
  sikEgyenletK,
  skalaris,
  vegyes,
  vektorialis,
  vekK,
} from "@/components/tergeometria/vektorok";

const KOROK = 10;
const KULCS = "matek-helyzet-rekord";

const egesz = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
const valaszt = (t) => t[Math.floor(Math.random() * t.length)];

function nemNullVektor(min = -3, max = 3) {
  let v = [0, 0, 0];
  while (hossz(v) < 0.5) v = [egesz(min, max), egesz(min, max), egesz(min, max)];
  return v;
}

function nemParhuzamos(v1) {
  let v2 = nemNullVektor();
  let orseg = 0;
  while (parhuzamos(v1, v2) && orseg < 60) {
    v2 = nemNullVektor();
    orseg += 1;
  }
  return v2;
}

/* ---------- feladatgyártók ---------- */

function ketEgyenes() {
  const tipus = valaszt(["kitero", "kitero", "metszo", "metszo", "parhuzamos", "egybeeso"]);
  const v1 = nemNullVektor();
  const P = [egesz(-3, 3), egesz(-3, 3), egesz(-3, 3)];
  let v2;
  let Q;

  if (tipus === "parhuzamos" || tipus === "egybeeso") {
    const k = valaszt([-2, -1, 2, 3]);
    v2 = nyujt(k, v1);
    if (tipus === "egybeeso") {
      Q = ossz(P, nyujt(valaszt([-2, -1, 1, 2]), v1));
    } else {
      let el = nemNullVektor();
      while (hossz(vektorialis(el, v1)) < 0.5) el = nemNullVektor();
      Q = ossz(P, el);
    }
  } else {
    v2 = nemParhuzamos(v1);
    if (tipus === "metszo") {
      const Mp = [egesz(-3, 3), egesz(-3, 3), egesz(-3, 3)];
      Q = kul(Mp, nyujt(valaszt([-2, -1, 1, 2]), v2));
    } else {
      let orseg = 0;
      do {
        Q = [egesz(-4, 4), egesz(-4, 4), egesz(-4, 4)];
        orseg += 1;
      } while (Math.abs(vegyes(kul(Q, P), v1, v2)) < 0.5 && orseg < 80);
      if (Math.abs(vegyes(kul(Q, P), v1, v2)) < 0.5) return ketEgyenes();
    }
  }

  // a valódi helyzet visszaellenőrzése
  const par = parhuzamos(v1, v2);
  const vegy = vegyes(kul(Q, P), v1, v2);
  let helyes;
  if (par) helyes = hossz(vektorialis(kul(Q, P), v1)) < 1e-9 ? "egybeeso" : "parhuzamos";
  else helyes = Math.abs(vegy) < 1e-9 ? "metszo" : "kitero";

  return {
    fajta: "egyenesek",
    kerdes: (
      <>
        <p className="mb-2">Milyen a két egyenes kölcsönös helyzete?</p>
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-lg bg-teal-50 px-3 py-2">
            <span className="mb-1 block text-[12px] font-semibold text-teal-800">e₁</span>
            <M>{egyenesParamK(P, v1, "t")}</M>
          </div>
          <div className="rounded-lg bg-naracs-50 px-3 py-2">
            <span className="mb-1 block text-[12px] font-semibold text-naracs-800">e₂</span>
            <M>{egyenesParamK(Q, v2, "s")}</M>
          </div>
        </div>
      </>
    ),
    valaszok: [
      { id: "egybeeso", cimke: "egybeeső" },
      { id: "parhuzamos", cimke: "párhuzamos" },
      { id: "metszo", cimke: "metsző" },
      { id: "kitero", cimke: "kitérő" },
    ],
    helyes,
    indoklas: (
      <>
        <p>
          <M>{`\\mathbf{v}_1 = ${vekK(v1)},\\quad \\mathbf{v}_2 = ${vekK(v2)}`}</M> —{" "}
          {par ? "az irányvektorok párhuzamosak." : "az irányvektorok nem párhuzamosak."}
        </p>
        {par ? (
          <p className="mt-1">
            Az <M>{"e_2"}</M> egy pontja <M>{vekK(Q)}</M>;{" "}
            {helyes === "egybeeso"
              ? "rajta van az e₁-en, tehát a két egyenes egybeesik."
              : "nincs rajta az e₁-en, tehát a két egyenes párhuzamos, de nem egybeeső."}
          </p>
        ) : (
          <p className="mt-1">
            A <M>{`\\overrightarrow{PQ} = ${vekK(kul(Q, P))}`}</M> vektor vegyes szorzata az irányvektorokkal{" "}
            <M>{`${sz(vegy, 0)}`}</M> —{" "}
            {helyes === "metszo"
              ? "nulla, tehát a három vektor egy síkban van: az egyenesek metszők."
              : "nem nulla, tehát nincs közös síkjuk: az egyenesek kitérők."}
          </p>
        )}
      </>
    ),
  };
}

function egyenesSik() {
  const tipus = valaszt(["metszo", "metszo", "parhuzamos", "benne"]);
  const n = nemNullVektor(-3, 3);
  const P = [egesz(-3, 3), egesz(-3, 3), egesz(-3, 3)];
  let v;
  let d;

  if (tipus === "metszo") {
    v = nemNullVektor();
    let orseg = 0;
    while (Math.abs(skalaris(v, n)) < 0.5 && orseg < 60) {
      v = nemNullVektor();
      orseg += 1;
    }
    d = egesz(-6, 6);
  } else {
    let w = nemParhuzamos(n);
    v = vektorialis(n, w);
    if (hossz(v) < 0.5) return egyenesSik();
    const g = v.reduce((s, k) => {
      let x = Math.abs(s);
      let y = Math.abs(k);
      while (y) {
        const t = x % y;
        x = y;
        y = t;
      }
      return x;
    }, 0);
    if (g > 1) v = v.map((k) => k / g);
    d = tipus === "benne" ? skalaris(n, P) : skalaris(n, P) + valaszt([-3, -2, -1, 1, 2, 3]);
  }

  const vn = skalaris(v, n);
  const helyes = Math.abs(vn) > 1e-9 ? "metszo" : Math.abs(skalaris(n, P) - d) < 1e-9 ? "benne" : "parhuzamos";

  return {
    fajta: "egyenes-sik",
    kerdes: (
      <>
        <p className="mb-2">Hogyan helyezkedik el az egyenes a síkhoz képest?</p>
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-lg bg-teal-50 px-3 py-2">
            <span className="mb-1 block text-[12px] font-semibold text-teal-800">e</span>
            <M>{egyenesParamK(P, v, "t")}</M>
          </div>
          <div className="flex items-center rounded-lg bg-violet-50 px-3 py-2">
            <span className="mr-2 text-[12px] font-semibold text-violet-800">S:</span>
            <M>{sikEgyenletK(n, d)}</M>
          </div>
        </div>
      </>
    ),
    valaszok: [
      { id: "metszo", cimke: "metszi a síkot" },
      { id: "parhuzamos", cimke: "párhuzamos vele" },
      { id: "benne", cimke: "benne fekszik" },
    ],
    helyes,
    indoklas: (
      <>
        <p>
          <M>{`\\mathbf{v}\\cdot\\mathbf{n} = ${vekK(v)}\\cdot${vekK(n)} = ${sz(vn, 0)}`}</M>
        </p>
        <p className="mt-1">
          {Math.abs(vn) > 1e-9
            ? "Nem nulla, tehát az egyenes döfi a síkot — pontosan egy közös pont van."
            : `Nulla, tehát az irányvektor merőleges a normálisra. A P₀ pontot behelyettesítve: ${sz(skalaris(n, P), 0)} ${
                Math.abs(skalaris(n, P) - d) < 1e-9 ? "=" : "≠"
              } ${sz(d, 0)}, ezért az egyenes ${Math.abs(skalaris(n, P) - d) < 1e-9 ? "benne fekszik a síkban" : "párhuzamos a síkkal"}.`}
        </p>
        <p className="mt-1 text-[12.5px] text-petrol-500">
          Figyelj: itt fordított a logika — a <strong>nulla</strong> skaláris szorzat jelenti a párhuzamosságot.
        </p>
      </>
    ),
  };
}

function ketSik() {
  const tipus = valaszt(["metszo", "metszo", "parhuzamos", "egybeeso"]);
  const n1 = nemNullVektor(-3, 3);
  const d1 = egesz(-6, 6);
  let n2;
  let d2;
  if (tipus === "metszo") {
    n2 = nemParhuzamos(n1);
    d2 = egesz(-6, 6);
  } else {
    const k = valaszt([-2, -1, 2, 3]);
    n2 = nyujt(k, n1);
    d2 = tipus === "egybeeso" ? k * d1 : k * d1 + valaszt([-3, -2, -1, 1, 2, 3]);
  }
  const par = parhuzamos(n1, n2);
  let helyes;
  if (!par) helyes = "metszo";
  else {
    const k = n2.find((x, i) => Math.abs(n1[i]) > 1e-9) / n1.find((x) => Math.abs(x) > 1e-9);
    helyes = Math.abs(d2 - k * d1) < 1e-9 ? "egybeeso" : "parhuzamos";
  }

  return {
    fajta: "sikok",
    kerdes: (
      <>
        <p className="mb-2">Milyen a két sík kölcsönös helyzete?</p>
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="flex items-center rounded-lg bg-teal-50 px-3 py-2">
            <span className="mr-2 text-[12px] font-semibold text-teal-800">S₁:</span>
            <M>{sikEgyenletK(n1, d1)}</M>
          </div>
          <div className="flex items-center rounded-lg bg-naracs-50 px-3 py-2">
            <span className="mr-2 text-[12px] font-semibold text-naracs-800">S₂:</span>
            <M>{sikEgyenletK(n2, d2)}</M>
          </div>
        </div>
      </>
    ),
    valaszok: [
      { id: "metszo", cimke: "metsző (van metszésvonal)" },
      { id: "parhuzamos", cimke: "párhuzamos" },
      { id: "egybeeso", cimke: "egybeeső" },
    ],
    helyes,
    indoklas: (
      <>
        <p>
          <M>{`\\mathbf{n}_1 = ${vekK(n1)},\\quad \\mathbf{n}_2 = ${vekK(n2)}`}</M>
        </p>
        <p className="mt-1">
          {!par ? (
            <>
              A normálvektorok nem párhuzamosak, ezért a két sík metszi egymást. A metszésvonal iránya{" "}
              <M>{`\\mathbf{n}_1\\times\\mathbf{n}_2 = ${vekK(vektorialis(n1, n2))}`}</M>.
            </>
          ) : helyes === "egybeeso" ? (
            "A normálvektorok párhuzamosak, és a jobb oldali állandó is ugyanazzal a számmal szorzódott: a két egyenlet ugyanazt a síkot írja le."
          ) : (
            "A normálvektorok párhuzamosak, de a jobb oldal nem illik a szorzóhoz: a két sík párhuzamos, de nem esik egybe."
          )}
        </p>
      </>
    ),
  };
}

const GYARTOK = [ketEgyenes, ketEgyenes, egyenesSik, ketSik];

/* ---------- a játék ---------- */

export default function HelyzetFelismero() {
  const [kor, setKor] = useState(0);
  const [feladat, setFeladat] = useState(null);
  const [pont, setPont] = useState(0);
  const [valasz, setValasz] = useState(null);
  const [mp, setMp] = useState(0);
  const [kesz, setKesz] = useState(false);
  const [rekord, setRekord] = useState(null);
  const [konfetti, setKonfetti] = useState(false);
  const ora = useRef(null);

  useEffect(() => {
    try {
      const r = localStorage.getItem(KULCS);
      if (r) setRekord(Number(r));
    } catch {
      /* privát mód */
    }
  }, []);

  useEffect(() => {
    if (kor === 0 || kesz || valasz) {
      if (ora.current) clearInterval(ora.current);
      return undefined;
    }
    ora.current = setInterval(() => setMp((s) => s + 1), 1000);
    return () => clearInterval(ora.current);
  }, [kor, kesz, valasz]);

  const ujKor = useCallback((n) => {
    setFeladat(valaszt(GYARTOK)());
    setValasz(null);
    setMp(0);
    setKor(n);
  }, []);

  const indit = () => {
    setPont(0);
    setKesz(false);
    setKonfetti(false);
    ujKor(1);
  };

  const valasztas = (id) => {
    if (valasz || !feladat) return;
    const jo = id === feladat.helyes;
    const gyorsasag = jo ? Math.max(0, 40 - 4 * mp) : 0;
    const kapott = (jo ? 60 : 0) + gyorsasag;
    setValasz({ id, jo, kapott, gyorsasag });
    setPont((p) => p + kapott);
  };

  const tovabb = () => {
    if (kor >= KOROK) {
      setKesz(true);
      setRekord((r) => {
        const uj = Math.max(r ?? 0, pont);
        try {
          localStorage.setItem(KULCS, String(uj));
        } catch {
          /* privát mód */
        }
        return uj;
      });
      if (pont >= 800) setKonfetti(true);
      return;
    }
    ujKor(kor + 1);
  };

  /* ---------- kezdő- és záróképernyő ---------- */
  if (kor === 0 || kesz) {
    return (
      <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white shadow-sm shadow-petrol-900/[0.03]">
        <Konfetti aktiv={konfetti} onVege={() => setKonfetti(false)} />
        <div className="flex flex-wrap items-center gap-2 border-b border-[color:var(--keret)] bg-linear-to-r from-petrol-800 to-petrol-700 px-4 py-2.5">
          <span className="rounded-md bg-violet-500 px-2 py-0.5 text-[10.5px] font-bold tracking-[0.14em] text-white uppercase">
            Játék
          </span>
          <span className="text-[13px] font-semibold text-white">Párhuzamos, metsző vagy kitérő?</span>
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
                  ? "Kiváló — a döntési sorrend a helyén van, és gyorsan is megy."
                  : pont >= 700
                    ? "Jó! A helyzeteket látod; a gyorsaságon még lehet javítani."
                    : pont >= 450
                      ? "Közepes — a párhuzamosság-vizsgálat megy, a kitérő/metsző döntés még bizonytalan."
                      : "Nézd át a 2.8 szakaszt: először mindig az irányvektorok arányosságát vizsgáld, utána jön a harmadik egyenlet."}
              </p>
            </div>
          )}
          <p className="text-[14px] leading-relaxed text-petrol-700">
            Tíz kör: két egyenes, egy egyenes és egy sík, vagy két sík. Döntsd el a kölcsönös helyzetüket! Helyes
            válasz <strong>60 pont</strong>, plusz gyorsasági bónusz (10 másodpercen belül csökkenő mértékben, összesen
            legfeljebb 40 pont). A válasz után mindig megkapod a rövid indoklást.
          </p>
          {rekord != null && (
            <p className="szamok mt-2 text-[12.5px] text-naracs-700">Rekordod: {rekord} pont</p>
          )}
          <button
            type="button"
            onClick={indit}
            className="mt-4 rounded-lg bg-naracs-500 px-4 py-2 text-[13.5px] font-semibold text-white transition hover:bg-naracs-600"
          >
            {kesz ? "Új játék ↻" : "Indulhat!"}
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
        <span className="text-[13px] font-semibold text-white">Párhuzamos, metsző vagy kitérő?</span>
        <span className="szamok ml-auto text-[11.5px] text-petrol-200">
          {kor} / {KOROK} kör · {pont} pont · {mp} mp
        </span>
      </div>

      <div className="p-4 sm:p-5">
        <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-petrol-100">
          <div
            className="h-full rounded-full bg-violet-500 transition-all"
            style={{ width: `${((kor - 1) / KOROK) * 100}%` }}
          />
        </div>

        <div className="szamok proza text-[14px] text-petrol-900">{feladat?.kerdes}</div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {feladat?.valaszok.map((v) => {
            let stilus = "border-petrol-200 bg-white hover:border-petrol-400 hover:bg-petrol-50";
            if (valasz) {
              if (v.id === feladat.helyes) stilus = "border-emerald-400 bg-emerald-50";
              else if (v.id === valasz.id) stilus = "border-rose-400 bg-rose-50";
              else stilus = "border-petrol-100 bg-white opacity-60";
            }
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => valasztas(v.id)}
                disabled={!!valasz}
                className={`rounded-xl border px-3.5 py-2.5 text-left text-[14px] font-medium text-petrol-800 transition ${stilus}`}
              >
                {v.cimke}
              </button>
            );
          })}
        </div>

        {valasz && (
          <div
            className={`mt-4 rounded-xl border px-4 py-3 ${
              valasz.jo ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"
            }`}
          >
            <p
              className={`szamok text-[11px] font-bold tracking-[0.14em] uppercase ${
                valasz.jo ? "text-emerald-700" : "text-rose-700"
              }`}
            >
              {valasz.jo ? `Helyes · +${valasz.kapott} pont (ebből ${valasz.gyorsasag} gyorsasági)` : "Nem ez az · +0 pont"}
            </p>
            <div className="proza szamok mt-1.5 text-[13.5px] leading-relaxed text-petrol-800">
              {feladat.indoklas}
            </div>
            <button
              type="button"
              onClick={tovabb}
              className="mt-3 rounded-lg bg-naracs-500 px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-naracs-600"
            >
              {kor >= KOROK ? "Eredmény" : "Következő kör →"}
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={() => setKor(0)}
          className="mt-4 text-[12px] text-petrol-500 transition hover:text-petrol-800"
        >
          Játék megszakítása
        </button>
      </div>
    </div>
  );
}
