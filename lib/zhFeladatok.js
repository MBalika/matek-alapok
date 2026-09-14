// A Zh-szimulátor feladatbankja: az elkészült modulok generátorai.
// Új modul elkészültekor ide kell felvenni a GENERATOROK (és EXTRA_GENERATOROK) listáját.

import { GENERATOROK as K1 } from "@/components/komplex/GyakorloSzekcio";
import { EXTRA_GENERATOROK as K2 } from "@/components/komplex/GyakorloExtra";

export const ZH_MODULOK = [
  { nev: "Komplex számok", szin: "bg-petrol-600", gen: [...K1, ...K2] },
];
