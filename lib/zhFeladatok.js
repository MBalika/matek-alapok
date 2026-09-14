// A Zh-szimulátor feladatbankja: az elkészült modulok generátorai.
// Új modul elkészültekor ide kell felvenni a GENERATOROK (és EXTRA_GENERATOROK) listáját.

import { GENERATOROK as K1 } from "@/components/komplex/GyakorloSzekcio";
import { EXTRA_GENERATOROK as K2 } from "@/components/komplex/GyakorloExtra";
import { GENERATOROK as T1 } from "@/components/tergeometria/GyakorloSzekcio";
import { EXTRA_GENERATOROK as T2 } from "@/components/tergeometria/GyakorloExtra";
import { GENERATOROK as S1 } from "@/components/sorozatok/GyakorloSzekcio";
import { EXTRA_GENERATOROK as S2 } from "@/components/sorozatok/GyakorloExtra";

export const ZH_MODULOK = [
  { nev: "Komplex számok", szin: "bg-petrol-600", gen: [...K1, ...K2] },
  { nev: "Térgeometria", szin: "bg-emerald-700", gen: [...T1, ...T2] },
  { nev: "Sorozatok", szin: "bg-violet-700", gen: [...S1, ...S2] },
];
