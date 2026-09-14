"use client";

import { useEffect, useRef, useState } from "react";
import { M } from "@/components/ui/Keplet";
import { sz } from "@/lib/szamok";

/** Mandelbrot-halmaz: z → z² + c iteráció. Kattintással nagyítás, a pont pályája is kirajzolható. */

const W = 560;
const H = 380;
const MAXIT = 220;

// paletta: mély petrol → türkiz → narancs → krém (a halmaz belseje sötét)
const ALLOMASOK = [
  [0, [8, 32, 56]],
  [0.22, [16, 92, 120]],
  [0.45, [40, 170, 160]],
  [0.65, [240, 140, 40]],
  [0.85, [255, 222, 170]],
  [1, [255, 255, 255]],
];
const PALETTA = Array.from({ length: 256 }, (_, i) => {
  const u = Math.pow(i / 255, 0.45);
  let a = ALLOMASOK[0], b = ALLOMASOK[ALLOMASOK.length - 1];
  for (let k = 0; k < ALLOMASOK.length - 1; k++) {
    if (u >= ALLOMASOK[k][0] && u <= ALLOMASOK[k + 1][0]) { a = ALLOMASOK[k]; b = ALLOMASOK[k + 1]; break; }
  }
  const w = (u - a[0]) / (b[0] - a[0] || 1);
  return a[1].map((v, j) => Math.round(v + (b[1][j] - v) * w));
});
function szin(it) {
  if (it >= MAXIT) return [12, 30, 40];
  return PALETTA[Math.min(255, Math.round((255 * it) / MAXIT))];
}

function rajzol(canvas, nezet) {
  const ctx = canvas.getContext("2d");
  const kep = ctx.createImageData(W, H);
  const d = kep.data;
  const { cx, cy, sz: meret } = nezet; // meret: a kép szélessége a komplex síkon
  const lep = meret / W;
  let p = 0;
  for (let j = 0; j < H; j++) {
    const ci = cy + (H / 2 - j) * lep;
    for (let i = 0; i < W; i++) {
      const cr = cx + (i - W / 2) * lep;
      let zr = 0, zi = 0, it = 0;
      while (it < MAXIT && zr * zr + zi * zi <= 4) {
        const t = zr * zr - zi * zi + cr;
        zi = 2 * zr * zi + ci;
        zr = t;
        it++;
      }
      const [r, g, b] = szin(it);
      d[p++] = r; d[p++] = g; d[p++] = b; d[p++] = 255;
    }
  }
  ctx.putImageData(kep, 0, 0);
}

const ALAP = { cx: -0.6, cy: 0, sz: 3.4 };

export default function Mandelbrot() {
  const ref = useRef(null);
  const [nezet, setNezet] = useState(ALAP);
  const [palya, setPalya] = useState(null); // { c, pontok, szokik }
  const [szamol, setSzamol] = useState(false);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    setSzamol(true);
    const id = setTimeout(() => {
      rajzol(c, nezet);
      setSzamol(false);
    }, 20);
    return () => clearTimeout(id);
  }, [nezet]);

  const pontKoord = (e) => {
    const c = ref.current;
    const rect = c.getBoundingClientRect();
    const i = ((e.clientX - rect.left) / rect.width) * W;
    const j = ((e.clientY - rect.top) / rect.height) * H;
    const lep = nezet.sz / W;
    return { re: nezet.cx + (i - W / 2) * lep, im: nezet.cy + (H / 2 - j) * lep };
  };

  const katt = (e) => {
    const c = pontKoord(e);
    if (e.shiftKey) {
      setNezet((n) => ({ cx: c.re, cy: c.im, sz: n.sz / 2.5 }));
      return;
    }
    // pálya: z0 = 0, z → z² + c, legfeljebb 60 lépés
    const pontok = [];
    let zr = 0, zi = 0, szokik = false;
    for (let k = 0; k < 60; k++) {
      pontok.push([zr, zi]);
      const t = zr * zr - zi * zi + c.re;
      zi = 2 * zr * zi + c.im;
      zr = t;
      if (zr * zr + zi * zi > 4) {
        szokik = true;
        pontok.push([zr, zi]);
        break;
      }
    }
    setPalya({ c, pontok, szokik });
  };

  const lep = nezet.sz / W;
  const P = ([re, im]) => [((re - nezet.cx) / lep + W / 2), (H / 2 - (im - nezet.cy) / lep)];

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.5fr_1fr]">
        <div className="relative flex items-center border-b border-[color:var(--keret)] bg-[#08203a] lg:border-r lg:border-b-0">
          <div className="relative w-full">
          <canvas ref={ref} width={W} height={H} onClick={katt} className="block w-full cursor-crosshair select-none" />
          {palya && (
            <svg viewBox={`0 0 ${W} ${H}`} className="pointer-events-none absolute inset-0 h-full w-full">
              <polyline
                points={palya.pontok.map((p) => P(p).map((v) => v.toFixed(1)).join(",")).join(" ")}
                fill="none"
                stroke={palya.szokik ? "#fb923c" : "#6ee7b7"}
                strokeWidth="1.4"
                opacity="0.9"
              />
              {palya.pontok.map((p, i) => {
                const [x, y] = P(p);
                if (x < -20 || x > W + 20 || y < -20 || y > H + 20) return null;
                return <circle key={i} cx={x} cy={y} r={i === 0 ? 4 : 2.2} fill={palya.szokik ? "#fb923c" : "#6ee7b7"} stroke="white" strokeWidth="0.8" />;
              })}
              {(() => {
                const [x, y] = P([palya.c.re, palya.c.im]);
                return <circle cx={x} cy={y} r="5" fill="none" stroke="white" strokeWidth="1.6" />;
              })()}
            </svg>
          )}
          </div>
          {szamol && (
            <span className="absolute top-2 right-2 rounded bg-black/50 px-2 py-0.5 text-[11px] text-white">számol…</span>
          )}
          <p className="absolute bottom-2 left-2 rounded bg-black/45 px-2 py-0.5 text-[11px] text-white">
            kattintás: a pont pályája · Shift + kattintás: nagyítás
          </p>
        </div>

        <div className="p-5">
          <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">Az iteráció</p>
          <div className="szamok mt-2 text-[14px] text-petrol-800">
            <M>{"z_0 = 0,\\qquad z_{k+1} = z_k^2 + c"}</M>
          </div>
          <p className="mt-2 text-[13px] leading-relaxed text-petrol-600">
            Minden <M>{"c"}</M> pontra elindítjuk ezt a sorozatot. Ha a <M>{"z_k"}</M> pontok
            örökre korlátosak maradnak, <M>{"c"}</M> a halmazhoz tartozik (sötét); ha elszöknek, a
            szín azt mutatja, hány lépés után. A négyzetre emelés komplex számon:
            a szög duplázódik, a hossz négyzetre emelődik — ezt láttad a hatványspirálnál.
          </p>

          {palya ? (
            <div className={`mt-4 rounded-xl border px-4 py-3 ${palya.szokik ? "border-naracs-200 bg-naracs-50" : "border-emerald-200 bg-emerald-50"}`}>
              <p className="szamok text-[13px] text-petrol-800">
                <M>{`c = ${sz(palya.c.re, 3)} ${palya.c.im < 0 ? "-" : "+"} ${sz(Math.abs(palya.c.im), 3)}\\,i`}</M>
              </p>
              <p className="mt-1 text-[13px] text-petrol-700">
                {palya.szokik
                  ? `Elszökik: ${palya.pontok.length - 1} lépés után |z| > 2 — a pont nincs a halmazban.`
                  : "60 lépés után is korlátos: a pont a halmazhoz tartozik (a pálya befelé csavarodik vagy ciklusra áll be)."}
              </p>
            </div>
          ) : (
            <p className="mt-4 rounded-xl border border-dashed border-petrol-200 px-4 py-3 text-[13px] text-petrol-500">
              Kattints a képre, és nézd meg, mit csinál a sorozat az adott <M>{"c"}</M> pontból indulva.
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-1.5">
            {[
              ["Alaphelyzet", ALAP],
              ["Elefántvölgy", { cx: 0.28, cy: 0.008, sz: 0.12 }],
              ["Csikóhal-völgy", { cx: -0.745, cy: 0.11, sz: 0.06 }],
              ["Mini-Mandelbrot", { cx: -1.768, cy: 0.0, sz: 0.06 }],
            ].map(([nev, n]) => (
              <button key={nev} type="button" onClick={() => { setNezet(n); setPalya(null); }} className="rounded-lg bg-white px-2.5 py-1.5 text-[12px] font-medium text-petrol-600 ring-1 ring-petrol-200 transition hover:bg-petrol-50">
                {nev}
              </button>
            ))}
            <button type="button" onClick={() => setNezet((n) => ({ ...n, sz: n.sz * 2 }))} className="rounded-lg bg-white px-2.5 py-1.5 text-[12px] font-medium text-petrol-600 ring-1 ring-petrol-200 transition hover:bg-petrol-50">
              − kicsinyítés
            </button>
          </div>
          <p className="mt-3 text-[12px] text-petrol-500">
            Nagyítás: {sz(3.4 / nezet.sz, 1)}× · a kép szélessége {sz(nezet.sz, 4)} egység. Ez a kép azért lehet
            végtelenül részletes, mert minden pontjában ugyanaz az egyszerű komplex szorzás dolgozik.
          </p>
        </div>
      </div>
    </div>
  );
}
