"use client";

import { sz } from "@/lib/szamok";

/**
 * Egy sorozat tagjait (n; aₙ) pontokként rajzoló SVG-alap.
 *
 * tagok    – [{ n, ertek }]
 * A        – feltételezett határérték (vízszintes vonal), vagy null
 * eps      – ε-sáv fél-szélessége (A ± eps), vagy null
 * kuszob   – ettől az indextől (n > kuszob) a tagok kiemelt színűek
 * yMin/yMax – kézi lépték; ha nincs, automatikus
 * rateszek – (seged) => JSX, extra SVG-tartalom a pontok fölé
 */

const SZ = 560;
const BAL = 52;
const JOBB = 18;
const FENT = 20;
const LENT = 34;

const BENT = "#0f766e"; // sávon belüli tag
const KINT = "#94a3b8"; // sávon kívüli tag
const HATAR = "#e2590a"; // határérték vonala
const SAV = "#0f766e";

export function sorLeptek({ tagok, magassag = 330, yMin, yMax, nMin, nMax }) {
  const ervenyes = tagok.filter((t) => Number.isFinite(t.ertek));
  const nAlso = nMin ?? (tagok.length ? tagok[0].n : 1);
  const nFelso = nMax ?? (tagok.length ? tagok[tagok.length - 1].n : 10);
  let lo = yMin;
  let hi = yMax;
  if (lo == null || hi == null) {
    const ertekek = ervenyes.map((t) => t.ertek);
    let a = ertekek.length ? Math.min(...ertekek) : 0;
    let b = ertekek.length ? Math.max(...ertekek) : 1;
    if (b - a < 1e-9) {
      a -= 1;
      b += 1;
    }
    const tartalek = (b - a) * 0.12;
    lo = yMin ?? a - tartalek;
    hi = yMax ?? b + tartalek;
  }
  const px = (n) => BAL + ((n - nAlso) / Math.max(1e-9, nFelso - nAlso)) * (SZ - BAL - JOBB);
  const py = (v) => FENT + ((hi - v) / Math.max(1e-9, hi - lo)) * (magassag - FENT - LENT);
  return { px, py, lo, hi, nAlso, nFelso, SZ, magassag };
}

/** „Szép” osztásköz egy tartományhoz. */
function osztas(tartomany, darab = 5) {
  const nyers = tartomany / darab;
  const nagysag = Math.pow(10, Math.floor(Math.log10(Math.max(1e-12, nyers))));
  const maradek = nyers / nagysag;
  const szorzo = maradek > 5 ? 10 : maradek > 2 ? 5 : maradek > 1 ? 2 : 1;
  return szorzo * nagysag;
}

export default function SorRajz({
  tagok,
  A = null,
  eps = null,
  kuszob = null,
  yMin,
  yMax,
  nMin,
  nMax,
  magassag = 330,
  yCimke = "aₙ",
  pontMeret = 4,
  szarral = true,
  rateszek,
  masodikSor = null, // [{ n, ertek }] halvány összehasonlító sorozat
  masodikSzin = "#7c3aed",
}) {
  const s = sorLeptek({ tagok, magassag, yMin, yMax, nMin, nMax });
  const { px, py, lo, hi, nAlso, nFelso } = s;

  const nullaY = lo <= 0 && hi >= 0 ? py(0) : py(lo);
  const dy = osztas(hi - lo, 4);
  const jelolokY = [];
  for (let v = Math.ceil(lo / dy) * dy; v <= hi + 1e-9; v += dy) jelolokY.push(v);
  const dn = Math.max(1, Math.round(osztas(nFelso - nAlso, 6)));
  const jelolokN = [];
  for (let n = nAlso; n <= nFelso; n += dn) jelolokN.push(n);
  if (jelolokN[jelolokN.length - 1] !== nFelso && nFelso - jelolokN[jelolokN.length - 1] > dn * 0.4) {
    jelolokN.push(nFelso);
  }

  return (
    <svg viewBox={`0 0 ${SZ} ${magassag}`} className="abra w-full touch-none select-none">
      {/* ε-sáv */}
      {A != null && eps != null && eps > 0 && (
        <>
          <rect
            x={BAL}
            y={Math.max(FENT - 4, py(A + eps))}
            width={SZ - BAL - JOBB}
            height={Math.max(1, Math.min(magassag - LENT, py(A - eps)) - Math.max(FENT - 4, py(A + eps)))}
            fill={SAV}
            opacity="0.13"
          />
          <line x1={BAL} y1={py(A + eps)} x2={SZ - JOBB} y2={py(A + eps)} stroke={SAV} strokeWidth="1" strokeDasharray="4 3" />
          <line x1={BAL} y1={py(A - eps)} x2={SZ - JOBB} y2={py(A - eps)} stroke={SAV} strokeWidth="1" strokeDasharray="4 3" />
        </>
      )}

      {/* rács */}
      {jelolokY.map((v) => (
        <g key={`y${v}`}>
          <line x1={BAL} y1={py(v)} x2={SZ - JOBB} y2={py(v)} stroke="#dbe5e9" strokeWidth="1" />
          <text x={BAL - 7} y={py(v) + 4} textAnchor="end" fontSize="10.5" fill="#94a3b8">
            {sz(v, Math.abs(dy) >= 1 ? 0 : Math.abs(dy) >= 0.1 ? 1 : 2)}
          </text>
        </g>
      ))}

      {/* tengelyek */}
      <line x1={BAL} y1={nullaY} x2={SZ - JOBB + 4} y2={nullaY} stroke="#64748b" strokeWidth="1.25" />
      <line x1={BAL} y1={magassag - LENT} x2={BAL} y2={FENT - 8} stroke="#64748b" strokeWidth="1.25" />
      <text x={SZ - JOBB + 2} y={nullaY - 7} textAnchor="end" fontSize="12" fontStyle="italic" fill="#1d3c48">
        n
      </text>
      <text x={BAL - 40} y={FENT + 2} fontSize="12" fill="#1d3c48">
        {yCimke}
      </text>

      {jelolokN.map((n) => (
        <g key={`n${n}`}>
          <line x1={px(n)} y1={nullaY} x2={px(n)} y2={nullaY + 4} stroke="#64748b" strokeWidth="1" />
          <text x={px(n)} y={magassag - LENT + 20} textAnchor="middle" fontSize="10.5" fill="#94a3b8">
            {n}
          </text>
        </g>
      ))}

      {/* határérték vonala */}
      {A != null && (
        <>
          <line x1={BAL} y1={py(A)} x2={SZ - JOBB} y2={py(A)} stroke={HATAR} strokeWidth="1.6" />
          <text x={SZ - JOBB - 2} y={py(A) - 6} textAnchor="end" fontSize="11.5" fontWeight="650" fill={HATAR}>
            A = {sz(A, Math.abs(A) >= 10 ? 1 : 3)}
          </text>
        </>
      )}

      {/* összehasonlító sorozat */}
      {masodikSor?.filter((t) => Number.isFinite(t.ertek) && t.ertek >= lo && t.ertek <= hi).map((t) => (
        <circle key={`m${t.n}`} cx={px(t.n)} cy={py(t.ertek)} r={pontMeret - 1.2} fill={masodikSzin} opacity="0.45" />
      ))}

      {/* a sorozat tagjai */}
      {tagok.map((t) => {
        if (!Number.isFinite(t.ertek)) return null;
        const y = py(t.ertek);
        if (y < FENT - 14 || y > magassag - LENT + 12) return null;
        const belul = kuszob == null ? true : t.n > kuszob;
        const szin = kuszob == null ? BENT : belul ? BENT : KINT;
        return (
          <g key={t.n}>
            {szarral && <line x1={px(t.n)} y1={nullaY} x2={px(t.n)} y2={y} stroke={szin} strokeWidth="0.9" opacity="0.35" />}
            <circle cx={px(t.n)} cy={y} r={pontMeret} fill={szin} stroke="white" strokeWidth="1.2" />
          </g>
        );
      })}

      {/* küszöbindex jelölése */}
      {kuszob != null && kuszob >= nAlso && kuszob <= nFelso && (
        <>
          <line x1={px(kuszob)} y1={FENT - 8} x2={px(kuszob)} y2={magassag - LENT} stroke="#1d3c48" strokeWidth="1.1" strokeDasharray="2 3" />
          <text x={px(kuszob) + 5} y={FENT + 4} fontSize="11.5" fontWeight="650" fill="#1d3c48">
            N = {kuszob}
          </text>
        </>
      )}

      {rateszek?.(s)}
    </svg>
  );
}
