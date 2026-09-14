"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { NyilHegyek, Tengelyek, Nyil, Cimke } from "./SvgElemek";
import Konfetti from "@/components/ui/Konfetti";
import { M } from "@/components/ui/Keplet";
import { normalizalSzog, sz } from "@/lib/szamok";
import { polarbol, algK } from "@/lib/komplex";

const SZ = 560;
const MA = 400;
const OX = 280;
const OY = 200;
const L = 38; // képpont / egység
const KOROK = 10;

const valaszt = (t) => t[Math.floor(Math.random() * t.length)];
const SZOGEK = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330];

function ujCel(mod) {
  const r = valaszt([1, 1.5, 2, 2.5, 3, 3.5, 4]);
  const fok = mod === "hol" ? valaszt(SZOGEK) : valaszt([...SZOGEK, 15, 75, 105, 165, 195, 255, 285, 345]);
  return { r, fok, z: polarbol(r, fok) };
}

function pontszamTavolsag(d) {
  if (d <= 0.25) return 100;
  if (d >= 1.75) return 0;
  return Math.round(100 * (1 - (d - 0.25) / 1.5));
}

/** Célbalövés a Gauss-síkon: trig alak → hova esik; pont → r és φ. */
export default function CelbaLoves() {
  const [mod, setMod] = useState("hol");
  const [kor, setKor] = useState(0);
  const [cel, setCel] = useState(null);
  const [pont, setPont] = useState(0);
  const [tipp, setTipp] = useState(null); // {a,b} kattintás
  const [rBe, setRBe] = useState("");
  const [fiBe, setFiBe] = useState("");
  const [eredmeny, setEredmeny] = useState(null); // { pont, szoveg }
  const [kesz, setKesz] = useState(false);
  const [konfetti, setKonfetti] = useState(false);
  const [rekord, setRekord] = useState(null);
  const svgRef = useRef(null);

  useEffect(() => {
    try {
      const r = localStorage.getItem("matek-celbaloves-rekord");
      if (r) setRekord(JSON.parse(r));
    } catch {
      /* nincs */
    }
  }, []);

  const indit = useCallback((m) => {
    setMod(m);
    setKor(1);
    setPont(0);
    setCel(ujCel(m));
    setTipp(null);
    setRBe("");
    setFiBe("");
    setEredmeny(null);
    setKesz(false);
  }, []);

  const kovetkezo = () => {
    if (kor >= KOROK) {
      setKesz(true);
      const ossz = pont;
      setRekord((r) => {
        const uj = { ...(r || {}), [mod]: Math.max(r?.[mod] ?? 0, ossz) };
        try {
          localStorage.setItem("matek-celbaloves-rekord", JSON.stringify(uj));
        } catch {
          /* privát mód */
        }
        return uj;
      });
      if (ossz >= 800) setKonfetti(true);
      return;
    }
    setKor((k) => k + 1);
    setCel(ujCel(mod));
    setTipp(null);
    setRBe("");
    setFiBe("");
    setEredmeny(null);
  };

  const katt = (e) => {
    if (mod !== "hol" || eredmeny || !cel) return;
    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width) * SZ;
    const my = ((e.clientY - rect.top) / rect.height) * MA;
    const a = (mx - OX) / L;
    const b = (OY - my) / L;
    const d = Math.hypot(a - cel.z.a, b - cel.z.b);
    const p = pontszamTavolsag(d);
    setTipp({ a, b });
    setPont((x) => x + p);
    setEredmeny({
      pont: p,
      szoveg:
        p === 100
          ? "Telitalálat!"
          : p >= 60
            ? `Közel: ${sz(d, 2)} egységre a céltól.`
            : p > 0
              ? `Nem rossz irány, de ${sz(d, 2)} egység a hiba — nézd meg a negyedet.`
              : `Mellé: ${sz(d, 2)} egység. A(z) ${cel.fok}° a ${negyedNev(cel.fok)}.`,
    });
  };

  const ellenoriz = () => {
    if (mod !== "melyik" || eredmeny || !cel) return;
    const r = Number(String(rBe).replace(",", "."));
    const fi = Number(String(fiBe).replace(",", "."));
    const rJo = Number.isFinite(r) && Math.abs(r - cel.r) <= 0.15;
    const dFi = Number.isFinite(fi) ? Math.abs(normalizalSzog(fi) - cel.fok) : 999;
    const fiJo = Math.min(dFi, 360 - dFi) <= 3;
    const p = (rJo ? 50 : 0) + (fiJo ? 50 : 0);
    setPont((x) => x + p);
    setEredmeny({
      pont: p,
      szoveg:
        p === 100
          ? "Mindkettő jó!"
          : rJo
            ? `Az r jó, a szög nem: helyesen φ = ${cel.fok}° (${negyedNev(cel.fok)}).`
            : fiJo
              ? `A szög jó, az r nem: helyesen r = ${sz(cel.r, 1)}.`
              : `Helyesen r = ${sz(cel.r, 1)}, φ = ${cel.fok}°.`,
    });
  };

  const px = (a) => OX + a * L;
  const py = (b) => OY - b * L;

  /* ---------- kezdőképernyő ---------- */
  if (kor === 0 || kesz) {
    return (
      <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white shadow-sm shadow-petrol-900/[0.03]">
        <Konfetti aktiv={konfetti} onVege={() => setKonfetti(false)} />
        <div className="flex flex-wrap items-center gap-2 border-b border-[color:var(--keret)] bg-linear-to-r from-petrol-800 to-petrol-700 px-4 py-2.5">
          <span className="rounded-md bg-violet-500 px-2 py-0.5 text-[10.5px] font-bold tracking-[0.14em] text-white uppercase">Játék</span>
          <span className="text-[13px] font-semibold text-white">Célbalövés a Gauss-síkon</span>
        </div>
        <div className="p-5">
          {kesz && (
            <div className="mb-5 rounded-xl border border-naracs-200 bg-naracs-50 p-4 text-center">
              <p className="text-[11px] font-bold tracking-[0.16em] text-naracs-700 uppercase">Vége</p>
              <p className="szamok mt-1 text-4xl font-bold text-petrol-900">
                {pont} <span className="text-lg font-semibold text-petrol-400">/ {KOROK * 100}</span>
              </p>
              <p className="mt-1 text-[14px] text-petrol-700">
                {pont >= 900 ? "Kiváló — a negyedek a helyükön vannak." : pont >= 700 ? "Jó! Egy-két negyed még bizonytalan." : pont >= 400 ? "Közepes — rajzold fel a nevezetes szögeket, és gyakorolj még." : "Érdemes visszamenni a trigonometrikus alakhoz: a szög és a negyed kapcsolata még nem ül."}
              </p>
            </div>
          )}
          <p className="text-[14px] leading-relaxed text-petrol-700">
            Tíz kör, körönként legfeljebb 100 pont. Két játékmód:
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <button type="button" onClick={() => indit("hol")} className="rounded-xl border border-petrol-200 bg-white p-4 text-left transition hover:border-petrol-400 hover:bg-petrol-50">
              <p className="text-[14.5px] font-semibold text-petrol-900">Hol van?</p>
              <p className="mt-1 text-[13px] text-petrol-600">Megadok egy számot trigonometrikus alakban — kattints oda, ahol a síkon van. Minél közelebb, annál több pont.</p>
              {rekord?.hol != null && <p className="szamok mt-2 text-[12px] text-naracs-700">Rekordod: {rekord.hol} pont</p>}
            </button>
            <button type="button" onClick={() => indit("melyik")} className="rounded-xl border border-petrol-200 bg-white p-4 text-left transition hover:border-petrol-400 hover:bg-petrol-50">
              <p className="text-[14.5px] font-semibold text-petrol-900">Melyik szám?</p>
              <p className="mt-1 text-[13px] text-petrol-600">Egy pont villan fel a síkon — add meg az r abszolút értéket és a φ szöget fokban. 50–50 pont.</p>
              {rekord?.melyik != null && <p className="szamok mt-2 text-[12px] text-naracs-700">Rekordod: {rekord.melyik} pont</p>}
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- futó játék ---------- */
  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white shadow-sm shadow-petrol-900/[0.03]">
      <div className="flex flex-wrap items-center gap-2 border-b border-[color:var(--keret)] bg-linear-to-r from-petrol-800 to-petrol-700 px-4 py-2.5">
        <span className="rounded-md bg-violet-500 px-2 py-0.5 text-[10.5px] font-bold tracking-[0.14em] text-white uppercase">Játék</span>
        <span className="text-[13px] font-semibold text-white">{mod === "hol" ? "Hol van?" : "Melyik szám?"}</span>
        <span className="szamok ml-auto text-[11.5px] text-petrol-200">
          {kor} / {KOROK} kör · {pont} pont
        </span>
      </div>
      <div className="grid lg:grid-cols-[1.35fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <svg ref={svgRef} viewBox={`0 0 ${SZ} ${MA}`} onClick={katt} className={`abra w-full select-none ${mod === "hol" && !eredmeny ? "cursor-crosshair" : ""}`}>
            <NyilHegyek />
            {/* rács: egységenként */}
            {Array.from({ length: 15 }, (_, i) => i - 7).map((k) => (
              <line key={`v${k}`} x1={px(k)} y1={OY - 190} x2={px(k)} y2={OY + 190} stroke="#dbe5e9" strokeWidth={k === 0 ? 0 : 1} />
            ))}
            {Array.from({ length: 11 }, (_, i) => i - 5).map((k) => (
              <line key={`h${k}`} x1={OX - 270} y1={py(k)} x2={OX + 270} y2={py(k)} stroke="#dbe5e9" strokeWidth={k === 0 ? 0 : 1} />
            ))}
            {[1, 2, 3, 4].map((r) => (
              <circle key={r} cx={OX} cy={OY} r={r * L} fill="none" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="3 4" />
            ))}
            <Tengelyek ox={OX} oy={OY} balra={265} jobbra={265} fel={185} le={185} xCimke="Re" yCimke="Im" />
            {[1, 2, 3, 4].map((k) => (
              <text key={k} x={px(k) - 3} y={OY + 14} fontSize="10" fill="#94a3b8">{k}</text>
            ))}

            {/* "melyik" mód: a célpont látszik */}
            {mod === "melyik" && cel && (
              <>
                <Nyil x1={OX} y1={OY} x2={px(cel.z.a)} y2={py(cel.z.b)} szin="ero" vastagsag={3} />
                <circle cx={px(cel.z.a)} cy={py(cel.z.b)} r="6" fill="var(--color-jel-ero)" stroke="white" strokeWidth="2" />
              </>
            )}

            {/* "hol" mód: a tipp és a cél megjelenítése */}
            {mod === "hol" && tipp && (
              <>
                <circle cx={px(tipp.a)} cy={py(tipp.b)} r="7" fill="none" stroke="#7c3aed" strokeWidth="2.2" />
                <circle cx={px(tipp.a)} cy={py(tipp.b)} r="2" fill="#7c3aed" />
                <line x1={px(tipp.a)} y1={py(tipp.b)} x2={px(cel.z.a)} y2={py(cel.z.b)} stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
                <Nyil x1={OX} y1={OY} x2={px(cel.z.a)} y2={py(cel.z.b)} szin="ero" vastagsag={2.6} />
                <circle cx={px(cel.z.a)} cy={py(cel.z.b)} r="6" fill="var(--color-jel-ero)" stroke="white" strokeWidth="2" />
                <Cimke x={px(cel.z.a) + (cel.z.a >= 0 ? 14 : -14)} y={py(cel.z.b) - 10} szin="var(--color-jel-ero)" meret={12} horgony={cel.z.a >= 0 ? "start" : "end"}>
                  {algK(cel.z, 2).replace(/\{,\}/g, ",")}
                </Cimke>
              </>
            )}
          </svg>
          {mod === "hol" && !eredmeny && <p className="mt-1 text-center text-[11.5px] text-petrol-400">Kattints a síkra, ahol a szám van.</p>}
        </div>

        <div className="p-5">
          <p className="text-[10.5px] font-bold tracking-[0.16em] text-naracs-600 uppercase">{kor}. kör</p>
          {mod === "hol" ? (
            <div className="szamok mt-2 text-[17px] text-petrol-900">
              <M>{cel.r === 1
                ? `z = \\cos ${cel.fok}^\\circ + i\\sin ${cel.fok}^\\circ`
                : `z = ${sz(cel.r, 1)}\\left(\\cos ${cel.fok}^\\circ + i\\sin ${cel.fok}^\\circ\\right)`}</M>
            </div>
          ) : (
            <>
              <p className="mt-2 text-[14px] text-petrol-700">A narancs pont melyik szám? Olvasd le a rácsról (egy egység a rács egy négyzete).</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <label className="block">
                  <span className="mb-1 block text-[12px] font-medium text-petrol-600">r = |z|</span>
                  <input type="text" inputMode="decimal" value={rBe} disabled={!!eredmeny} onChange={(e) => setRBe(e.target.value)} onKeyDown={(e) => e.key === "Enter" && ellenoriz()} placeholder="?" className="szamok w-full rounded-lg border border-petrol-200 px-3 py-2 text-[14px] text-petrol-900 outline-none focus:border-petrol-400" />
                </label>
                <label className="block">
                  <span className="mb-1 block text-[12px] font-medium text-petrol-600">φ (fok)</span>
                  <input type="text" inputMode="decimal" value={fiBe} disabled={!!eredmeny} onChange={(e) => setFiBe(e.target.value)} onKeyDown={(e) => e.key === "Enter" && ellenoriz()} placeholder="?" className="szamok w-full rounded-lg border border-petrol-200 px-3 py-2 text-[14px] text-petrol-900 outline-none focus:border-petrol-400" />
                </label>
              </div>
              {!eredmeny && (
                <button type="button" onClick={ellenoriz} className="mt-3 rounded-lg bg-petrol-700 px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-petrol-800">
                  Ellenőrzés
                </button>
              )}
            </>
          )}

          {eredmeny && (
            <div className={`mt-4 rounded-xl border px-4 py-3 ${eredmeny.pont >= 60 ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"}`}>
              <p className={`szamok text-[11px] font-bold tracking-[0.14em] uppercase ${eredmeny.pont >= 60 ? "text-emerald-700" : "text-rose-700"}`}>+{eredmeny.pont} pont</p>
              <p className="mt-1 text-[13.5px] text-petrol-800">{eredmeny.szoveg}</p>
              <p className="szamok mt-1 text-[12.5px] text-petrol-600">
                <M>{`z = ${algK(cel.z, 2)}`}</M> · a {negyedNev(cel.fok)}
              </p>
              <button type="button" onClick={kovetkezo} className="mt-3 rounded-lg bg-naracs-500 px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-naracs-600">
                {kor >= KOROK ? "Eredmény" : "Következő kör →"}
              </button>
            </div>
          )}

          <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-petrol-100">
            <div className="h-full rounded-full bg-violet-500 transition-all" style={{ width: `${((kor - 1) / KOROK) * 100}%` }} />
          </div>
          <button type="button" onClick={() => setKor(0)} className="mt-3 text-[12px] text-petrol-500 hover:text-petrol-800">
            Játék megszakítása
          </button>
        </div>
      </div>
    </div>
  );
}

function negyedNev(fok) {
  const f = normalizalSzog(fok);
  if (f === 0) return "pozitív valós tengelyen";
  if (f === 90) return "pozitív képzetes tengelyen";
  if (f === 180) return "negatív valós tengelyen";
  if (f === 270) return "negatív képzetes tengelyen";
  if (f < 90) return "I. negyedben";
  if (f < 180) return "II. negyedben";
  if (f < 270) return "III. negyedben";
  return "IV. negyedben";
}
