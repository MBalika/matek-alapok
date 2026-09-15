// A Zh-szimulátor feladatbankja: az elkészült modulok generátorai.
// Új modul elkészültekor ide kell felvenni a GENERATOROK (és EXTRA_GENERATOROK) listáját.

import { GENERATOROK as K1 } from "@/components/komplex/GyakorloSzekcio";
import { EXTRA_GENERATOROK as K2 } from "@/components/komplex/GyakorloExtra";
import { GENERATOROK as T1 } from "@/components/tergeometria/GyakorloSzekcio";
import { EXTRA_GENERATOROK as T2 } from "@/components/tergeometria/GyakorloExtra";
import { GENERATOROK as S1 } from "@/components/sorozatok/GyakorloSzekcio";
import { EXTRA_GENERATOROK as S2 } from "@/components/sorozatok/GyakorloExtra";
import { GENERATOROK as F1 } from "@/components/fuggvenyek/GyakorloSzekcio";
import { EXTRA_GENERATOROK as F2 } from "@/components/fuggvenyek/GyakorloExtra";
import { GENERATOROK as D1 } from "@/components/derivalas/GyakorloSzekcio";
import { EXTRA_GENERATOROK as D2 } from "@/components/derivalas/GyakorloExtra";
import { GENERATOROK as H1 } from "@/components/hatarozatlan/GyakorloSzekcio";
import { EXTRA_GENERATOROK as H2 } from "@/components/hatarozatlan/GyakorloExtra";
import { GENERATOROK as O1 } from "@/components/hatarozott/GyakorloSzekcio";
import { EXTRA_GENERATOROK as O2 } from "@/components/hatarozott/GyakorloExtra";
import { GENERATOROK as I1 } from "@/components/improprius/GyakorloSzekcio";
import { EXTRA_GENERATOROK as I2 } from "@/components/improprius/GyakorloExtra";

export const ZH_MODULOK = [
  { nev: "Komplex számok", szin: "bg-petrol-600", gen: [...K1, ...K2] },
  { nev: "Térgeometria", szin: "bg-emerald-700", gen: [...T1, ...T2] },
  { nev: "Sorozatok", szin: "bg-violet-700", gen: [...S1, ...S2] },
  { nev: "Függvények", szin: "bg-sky-700", gen: [...F1, ...F2] },
  { nev: "Differenciálszámítás", szin: "bg-naracs-600", gen: [...D1, ...D2] },
  { nev: "Határozatlan integrál", szin: "bg-rose-700", gen: [...H1, ...H2] },
  { nev: "Határozott integrál", szin: "bg-teal-700", gen: [...O1, ...O2] },
  { nev: "Improprius és numerikus", szin: "bg-indigo-700", gen: [...I1, ...I2] },
];
