"use client";

import { useEffect, useRef, useState } from "react";
import { Cimke, Fogopont, Nyil, NyilHegyek, Tengelyek } from "./SvgElemek";
import { M } from "@/components/ui/Keplet";
import { normalizalSzog, sz, szK } from "@/lib/szamok";
import { K, abszolut, argFok, algK, polarbol } from "@/lib/komplex";
import { Csuszka } from "./Csuszka";

const SZ = 560;
const MA = 400;
const OX = 280;
const OY = 200;
const RAD = Math.PI / 180;
const felso = (k) => String(k).split("").map((d) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[Number(d)]).join("");

/** Hatványspirál: z, z², z³ … egy logaritmikus spirálon. */
export default function HatvanySpiral() {
  const [z, setZ] = useState(polarbol(1.15, 40));
  const [n, setN] = useState(10);
  const [mutat, setMutat] = useState(10); // hány hatvány látszik (lejátszásnál nő)
  const [jatszik, setJatszik] = useState(false);
  const svgRef = useRef(null);

  const r = abszolut(z);
  const fi = argFok(z);

  // lépték: a legnagyobb hatvány is férjen el (170 px), de legfeljebb 90 px/egység
  const rMax = Math.max(1, ...Array.from({ length: n }, (_, k) => Math.pow(r, k + 1)));
  const S = Math.min(90, 170 / rMax);
  const px = (x) => OX + x * S;
  const py = (y) => OY - y * S;

  const hatvanyok = Array.from({ length: n }, (_, i) => {
    const k = i + 1;
    const rk = Math.pow(r, k);
    const a = fi * k;
    return { k, r: rk, fok: normalizalSzog(a), x: rk * Math.cos(a * RAD), y: rk * Math.sin(a * RAD) };
  });

  // spirál görbe a z-től az n-edik hatványig
  const spiral = [];
  const lepesek = Math.max(40, n * 12);
  for (let i = 0; i <= lepesek; i++) {
    const k = 1 + ((n - 1) * i) / lepesek;
    if (k > mutat) break;
    const rk = Math.pow(r, k);
    const a = fi * k;
    spiral.push(`${px(rk * Math.cos(a * RAD)).toFixed(1)},${py(rk * Math.sin(a * RAD)).toFixed(1)}`);
  }

  useEffect(() => {
    if (!jatszik) return undefined;
    setMutat(1);
    let k = 1;
    const id = setInterval(() => {
      k += 1;
      setMutat(k);
      if (k >= n) {
        clearInterval(id);
        setJatszik(false);
      }
    }, 420);
    return () => clearInterval(id);
  }, [jatszik, n]);

  const huzas = (ev) => {
    ev.preventDefault();
    const svg = svgRef.current;
    if (!svg) return;
    const mozgat = (esem) => {
      const rect = svg.getBoundingClientRect();
      const mx = ((esem.clientX - rect.left) / rect.width) * SZ;
      const my = ((esem.clientY - rect.top) / rect.height) * MA;
      const a = (mx - OX) / S;
      const b = (OY - my) / S;
      const rr = Math.max(0.3, Math.min(1.6, Math.round(Math.hypot(a, b) * 100) / 100));
      const fok = Math.round(normalizalSzog((Math.atan2(b, a) * 180) / Math.PI));
      setZ(polarbol(rr, fok));
      setMutat(n);
    };
    mozgat(ev);
    const vege = () => {
      window.removeEventListener("pointermove", mozgat);
      window.removeEventListener("pointerup", vege);
    };
    window.addEventListener("pointermove", mozgat);
    window.addEventListener("pointerup", vege);
  };

  const tipus = Math.abs(r - 1) < 0.02 ? "kor" : r < 1 ? "be" : "ki";

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <svg ref={svgRef} viewBox={`0 0 ${SZ} ${MA}`} className="abra w-full touch-none select-none">
            <NyilHegyek />
            <Tengelyek ox={OX} oy={OY} balra={265} jobbra={265} fel={185} le={185} xCimke="Re" yCimke="Im" />
            <circle cx={OX} cy={OY} r={S} fill="none" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
            <text x={OX + S + 4} y={OY + 14} fontSize="10.5" fill="#94a3b8">|z| = 1</text>

            {spiral.length > 1 && <polyline points={spiral.join(" ")} fill="none" stroke="#8b5cf6" strokeWidth="1.5" opacity="0.6" />}

            {hatvanyok
              .filter((h) => h.k <= mutat)
              .map((h) => (
                <g key={h.k}>
                  {h.k > 1 && <line x1={OX} y1={OY} x2={px(h.x)} y2={py(h.y)} stroke="#a78bfa" strokeWidth="1" opacity="0.5" />}
                  <circle cx={px(h.x)} cy={py(h.y)} r={h.k === n ? 6 : 4.5} fill={h.k === 1 ? "var(--color-jel-ero)" : "var(--color-jel-eredo)"} stroke="white" strokeWidth="1.5" />
                  {(h.k <= 4 || h.k === n || h.k % 3 === 0) && (
                    <Cimke x={px(h.x) + (h.x >= 0 ? 12 : -12)} y={py(h.y) + (h.y >= 0 ? -8 : 16)} szin={h.k === 1 ? "var(--color-jel-ero)" : "var(--color-jel-eredo)"} meret={11} horgony={h.x >= 0 ? "start" : "end"}>
                      {h.k === 1 ? "z" : `z${felso(h.k)}`}
                    </Cimke>
                  )}
                </g>
              ))}

            <Nyil x1={OX} y1={OY} x2={px(z.a)} y2={py(z.b)} szin="ero" vastagsag={3} />
            <Fogopont x={px(z.a)} y={py(z.b)} onPointerDown={huzas} />
          </svg>
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">Húzd a z pontot. A lépték automatikusan igazodik, hogy a hatványok elférjenek.</p>
        </div>

        <div className="p-5">
          <Csuszka cimke="Hány hatványt mutasson, n" ertek={n} min={2} max={16} lepes={1} tizedes={0} onChange={(v) => { setN(v); setMutat(v); }} />
          <div className="mt-3 flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setJatszik(true)}
              disabled={jatszik}
              className="rounded-lg bg-naracs-500 px-3.5 py-1.5 text-[12.5px] font-semibold text-white transition hover:bg-naracs-600 disabled:opacity-60"
            >
              ▶ Lejátszás lépésenként
            </button>
            {[
              ["|z| < 1: befelé", polarbol(0.85, 35)],
              ["|z| = 1: körbejár", polarbol(1, 40)],
              ["|z| > 1: kifelé", polarbol(1.18, 30)],
              ["z = i", polarbol(1, 90)],
            ].map(([nev, ertek]) => (
              <button
                key={nev}
                type="button"
                onClick={() => { setZ(ertek); setMutat(n); }}
                className="rounded-lg bg-white px-2.5 py-1.5 text-[12px] font-medium text-petrol-600 ring-1 ring-petrol-200 transition hover:bg-petrol-50"
              >
                {nev}
              </button>
            ))}
          </div>

          <div className="mt-4 rounded-xl bg-petrol-50 p-4">
            <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">A szabály</p>
            <div className="szamok mt-2 space-y-1.5 text-[13.5px] text-petrol-800">
              <div><M>{`z = ${szK(r, 2)}\\,(\\cos ${szK(fi, 0)}^\\circ + i\\sin ${szK(fi, 0)}^\\circ) = ${algK(z, 2)}`}</M></div>
              <div><M>{`|z^k| = ${szK(r, 2)}^k,\\qquad \\arg z^k = k\\cdot ${szK(fi, 0)}^\\circ`}</M></div>
              <div><M>{`z^{${n}} = ${szK(Math.pow(r, n), 3)}\\,(\\cos ${szK(normalizalSzog(fi * n), 0)}^\\circ + i\\sin ${szK(normalizalSzog(fi * n), 0)}^\\circ) = ${algK(K(hatvanyok[n - 1].x, hatvanyok[n - 1].y), 3)}`}</M></div>
            </div>
          </div>

          <div className={`mt-3 rounded-xl border px-4 py-3 text-[13px] leading-relaxed ${
            tipus === "kor" ? "border-emerald-200 bg-emerald-50 text-emerald-900" : tipus === "be" ? "border-petrol-200 bg-petrol-50 text-petrol-800" : "border-naracs-200 bg-naracs-50 text-naracs-900"
          }`}>
            {tipus === "kor" && <>|z| = 1: a hatványok az <strong>egységkörön</strong> járnak körbe, a hossz nem változik — tiszta forgatás {sz(fi, 0)}°-onként.</>}
            {tipus === "be" && <>|z| &lt; 1: a hatványok <strong>befelé csavarodnak</strong> az origó felé, minden lépésben {sz(r, 2)}-szeresre zsugorodva. A határérték 0.</>}
            {tipus === "ki" && <>|z| &gt; 1: a hatványok <strong>kifelé csavarodnak</strong>, minden lépésben {sz(r, 2)}-szeresre nőve. A spirál a végtelenbe tart.</>}
          </div>
          <p className="mt-2 text-[12px] text-petrol-500">
            Pontosan ez dönti el a rezgések és a szabályozott rendszerek stabilitását: a karakterisztikus egyenlet gyökei az egységkörön belül vagy kívül vannak-e.
          </p>
        </div>
      </div>
    </div>
  );
}
