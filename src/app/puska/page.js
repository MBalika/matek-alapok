import Link from "next/link";
import PuskaKomplex from "@/components/puska/PuskaKomplex";
import PuskaTergeometria from "@/components/puska/PuskaTergeometria";
import PuskaSorozatok from "@/components/puska/PuskaSorozatok";
import PuskaFuggvenyek from "@/components/puska/PuskaFuggvenyek";
import PuskaDerivalas from "@/components/puska/PuskaDerivalas";
import PuskaHatarozatlan from "@/components/puska/PuskaHatarozatlan";
import PuskaHatarozott from "@/components/puska/PuskaHatarozott";
import PuskaImproprius from "@/components/puska/PuskaImproprius";
import NyomtatasGomb from "@/components/NyomtatasGomb";
import { modulok } from "@/lib/oldalterkep";

export const metadata = {
  title: "Puska",
  description:
    "Nyomtatható egyoldalas összefoglaló modulonként: képletek, szabályok, tipikus hibák.",
};

export default function PuskaOldal() {
  const hatralevo = modulok.filter((m) => m.szam !== null && !m.kesz);
  return (
    <>
      <div className="racs-hatter nyomtatasban-rejtve border-b border-petrol-800 bg-linear-to-br from-petrol-900 via-petrol-800 to-petrol-700">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-naracs-500 text-[15px] font-bold text-white">
              ✎
            </span>
            <span className="text-[11px] font-semibold tracking-[0.2em] text-petrol-300 uppercase">
              Összefoglaló
            </span>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Puska — modulonként egy oldal
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-petrol-200">
            A legfontosabb képletek, szabályok és a tipikus hibák, modulonként
            egy oldalon. Nyomtasd ki, vagy mentsd PDF-be — de előbb próbáld meg
            fejből leírni, aztán hasonlítsd össze.
          </p>
          <div className="mt-5">
            <NyomtatasGomb />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 print:max-w-none print:p-0">
        <PuskaKomplex />
        <PuskaTergeometria />
        <PuskaSorozatok />
        <PuskaFuggvenyek />
        <PuskaDerivalas />
        <PuskaHatarozatlan />
        <PuskaHatarozott />
        <PuskaImproprius />

        {hatralevo.length > 0 && (
          <div className="nyomtatasban-rejtve rounded-2xl border border-dashed border-petrol-200 bg-petrol-50/50 p-5 text-[13.5px] text-petrol-600">
            <p className="font-semibold text-petrol-800">
              A további modulok puskája a modulok elkészültével kerül ide:
            </p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {hatralevo.map((m) => (
                <li key={m.slug}>
                  <Link
                    href={m.slug}
                    className="rounded-full bg-white px-3 py-1 text-[12.5px] text-petrol-600 ring-1 ring-petrol-200"
                  >
                    {m.szam}. {m.rovid}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
