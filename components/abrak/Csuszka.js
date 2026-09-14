"use client";

import { sz } from "@/lib/szamok";

/** Feliratos csúszka az interaktív ábrákhoz. */
export function Csuszka({ cimke, ertek, egyseg, min, max, lepes, tizedes = 1, onChange }) {
  return (
    <label className="block">
      <span className="mb-1 flex items-baseline justify-between">
        <span className="text-[12.5px] font-medium text-petrol-600">{cimke}</span>
        <span className="szamok rounded-md bg-petrol-100 px-2 py-0.5 text-[12.5px] font-semibold text-petrol-800">
          {sz(ertek, tizedes)}
          {egyseg ? ` ${egyseg}` : ""}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={lepes}
        value={ertek}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-petrol-100 accent-[color:var(--color-naracs-500)]"
      />
    </label>
  );
}
