"use client";

import { useState } from "react";
import { M, MB } from "@/components/ui/Keplet";

/**
 * Parciális integrálás: a szereposztás kiválasztása.
 * A diák eldönti, melyik tényező legyen u (amit deriválunk); a panel megmutatja
 * u′-t, v-t és a keletkező új integrált — és hogy az könnyebb lett-e.
 */

const FELADATOK = [
  {
    kif: "\\int x\\,e^{2x}\\,dx",
    forras: "18. példa",
    tenyezok: ["x", "e^{2x}"],
    valasztas: [
      {
        uDer: "u' = 1",
        v: "v = \\frac{e^{2x}}{2}",
        uj: "\\int 1\\cdot\\frac{e^{2x}}{2}\\,dx = \\frac12\\int e^{2x}dx",
        jo: true,
        szoveg:
          "A polinom deriválva eltűnt, az exponenciális integrálva nem romlott el. Az új integrál alapintegrál — egy lépésben kész.",
        ered: "\\int xe^{2x}dx = \\frac{xe^{2x}}{2}-\\frac{e^{2x}}{4}+C",
      },
      {
        uDer: "u' = 2e^{2x}",
        v: "v = \\frac{x^2}{2}",
        uj: "\\int 2e^{2x}\\cdot\\frac{x^2}{2}\\,dx = \\int x^2e^{2x}dx",
        jo: false,
        szoveg:
          "A polinom fokszáma nőtt: az új integrál nehezebb, mint az eredeti. Ilyenkor állj meg, és cseréld fel a szerepeket.",
      },
    ],
  },
  {
    kif: "\\int x\\ln x\\,dx",
    forras: "választási szabály",
    tenyezok: ["x", "\\ln x"],
    valasztas: [
      {
        uDer: "u' = 1",
        v: "v = x\\ln x - x",
        uj: "\\int 1\\cdot\\left(x\\ln x-x\\right)dx",
        jo: false,
        szoveg:
          "Ahhoz, hogy v-t megkapd, előbb ki kellett számolnod ∫ln x dx-et — és az új integrál még mindig logaritmusos. Ez visszafelé haladás.",
      },
      {
        uDer: "u' = \\frac1x",
        v: "v = \\frac{x^2}{2}",
        uj: "\\int \\frac1x\\cdot\\frac{x^2}{2}\\,dx = \\frac12\\int x\\,dx",
        jo: true,
        szoveg:
          "Az ln x deriválva racionálissá szelídült, és az 1/x kiejtette az x² felét. Ez az ökölszabály: logaritmus mellett mindig a logaritmus legyen u.",
        ered: "\\int x\\ln x\\,dx = \\frac{x^2}{2}\\ln x-\\frac{x^2}{4}+C",
      },
    ],
  },
  {
    kif: "\\int \\left(x^2+2x-3\\right)\\cos 3x\\,dx",
    forras: "19. példa",
    tenyezok: ["x^2+2x-3", "\\cos 3x"],
    valasztas: [
      {
        uDer: "u' = 2x+2",
        v: "v = \\frac{\\sin 3x}{3}",
        uj: "\\frac13\\int (2x+2)\\sin 3x\\,dx",
        jo: true,
        szoveg:
          "A polinom fokszáma kettőről egyre csökkent. Még egy parciális integrálás, és el is tűnik — a másodfokú polinomnál pontosan kétszer kell alkalmazni.",
        ered:
          "= \\frac{\\left(x^2+2x-3\\right)\\sin 3x}{3}+\\frac{(2x+2)\\cos 3x}{9}-\\frac{2\\sin 3x}{27}+C",
      },
      {
        uDer: "u' = -3\\sin 3x",
        v: "v = \\frac{x^3}{3}+x^2-3x",
        uj: "3\\int \\sin 3x\\left(\\frac{x^3}{3}+x^2-3x\\right)dx",
        jo: false,
        szoveg:
          "A polinom fokszáma kettőről háromra nőtt, a szögfüggvény pedig semmit nem egyszerűsödött. Minden további lépés csak rontana.",
      },
    ],
  },
  {
    kif: "\\int x\\operatorname{arctg} x\\,dx",
    forras: "21. példa",
    tenyezok: ["x", "\\operatorname{arctg} x"],
    valasztas: [
      {
        uDer: "u' = 1",
        v: "v = x\\operatorname{arctg} x-\\frac12\\ln\\left(1+x^2\\right)",
        uj: "\\int \\left(x\\operatorname{arctg} x-\\frac12\\ln\\left(1+x^2\\right)\\right)dx",
        jo: false,
        szoveg:
          "A v felírásához előbb ki kellett integrálni az arctg x-et — vagyis egy nehezebb feladatot oldottál meg ahhoz, hogy nekiláss ennek.",
      },
      {
        uDer: "u' = \\frac{1}{1+x^2}",
        v: "v = \\frac{x^2}{2}",
        uj: "\\frac12\\int \\frac{x^2}{1+x^2}\\,dx",
        jo: true,
        szoveg:
          "Az arkusz tangens deriválva racionális törtté vált — a maradék integrált a „nullát adunk hozzá” trükkel intézzük el (4. példa).",
        ered: "\\int x\\operatorname{arctg} x\\,dx = \\frac{x^2+1}{2}\\operatorname{arctg} x-\\frac{x}{2}+C",
      },
    ],
  },
  {
    kif: "\\int \\ln x\\,dx = \\int 1\\cdot\\ln x\\,dx",
    forras: "20. példa",
    tenyezok: ["1", "\\ln x"],
    valasztas: [
      {
        uDer: "u' = 0",
        v: "v = x\\ln x-x",
        uj: "\\int 0\\cdot v\\,dx = 0",
        jo: false,
        szoveg:
          "Formálisan „működik”, de a v felírásához éppen azt kellett kiszámolni, amit keresünk. Körbeértünk: ez az azonosság igaz, de haszontalan.",
      },
      {
        uDer: "u' = \\frac1x",
        v: "v = x",
        uj: "\\int \\frac1x\\cdot x\\,dx = \\int 1\\,dx",
        jo: true,
        szoveg:
          "Ez a klasszikus trükk: a „hiányzó” tényező az 1, és azt integráljuk. Ugyanígy megy az ∫arcsin x dx és az ∫arctg x dx is.",
        ered: "\\int \\ln x\\,dx = x\\ln x-x+C",
      },
    ],
  },
  {
    kif: "\\int e^{-x}\\cos 3x\\,dx",
    forras: "22. példa — a körbeérő eset",
    mindegy: true,
    tenyezok: ["e^{-x}", "\\cos 3x"],
    valasztas: [
      {
        uDer: "u' = -e^{-x}",
        v: "v = \\frac{\\sin 3x}{3}",
        uj: "\\frac13\\int e^{-x}\\sin 3x\\,dx",
        jo: true,
        szoveg:
          "Az új integrál se nem könnyebb, se nem nehezebb — ugyanolyan típusú. Ez itt nem baj: a második lépés után egyenletet kapunk I-re. A lényeg, hogy a második lépésben is az exponenciálist deriváld!",
        ered: "I = \\frac{e^{-x}\\left(3\\sin 3x-\\cos 3x\\right)}{10}+C",
      },
      {
        uDer: "u' = -3\\sin 3x",
        v: "v = -e^{-x}",
        uj: "-3\\int e^{-x}\\sin 3x\\,dx",
        jo: true,
        szoveg:
          "Ez is jó — a körbeérő esetben mindegy, melyiket deriválod. A döntő az, hogy a második lépésben ugyanazt a fajta függvényt válaszd u-nak, különben az I = I azonossághoz jutsz.",
        ered: "I = \\frac{e^{-x}\\left(3\\sin 3x-\\cos 3x\\right)}{10}+C",
      },
    ],
  },
];

export default function HiParcialisValaszto() {
  const [i, setI] = useState(0);
  const [valasz, setValasz] = useState(null);

  const F = FELADATOK[i];
  const V = valasz === null ? null : F.valasztas[valasz];

  const kovetkezo = () => {
    setI((k) => (k + 1) % FELADATOK.length);
    setValasz(null);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-[color:var(--keret)] bg-petrol-50/70 px-5 py-3">
        <span className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">Szereposztás</span>
        <span className="text-[13px] font-semibold text-petrol-900">
          {i + 1}. feladat / {FELADATOK.length}
        </span>
        <span className="ml-auto text-[11.5px] text-petrol-400">{F.forras}</span>
      </div>

      <div className="p-5 sm:p-6">
        <div className="szamok rounded-xl border border-petrol-200 bg-petrol-50/60 px-4 py-3 text-petrol-900">
          <MB>{F.kif}</MB>
        </div>
        <p className="mt-3 text-[13.5px] text-petrol-600">
          Melyik tényező legyen <M>{"u"}</M> (amit <strong>deriválunk</strong>)? A másik lesz <M>{"v'"}</M> (amit{" "}
          <strong>integrálunk</strong>).
        </p>

        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {F.tenyezok.map((t, k) => {
            const kivalasztott = valasz === k;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setValasz(k)}
                className={`rounded-xl border px-3.5 py-3 text-center transition ${
                  kivalasztott
                    ? F.valasztas[k].jo
                      ? "border-emerald-400 bg-emerald-50"
                      : "border-rose-400 bg-rose-50"
                    : "border-petrol-200 bg-white hover:border-petrol-400 hover:bg-petrol-50"
                }`}
              >
                <span className="szamok text-[15px] text-petrol-900">
                  <M>{`u = ${t}`}</M>
                </span>
                <span className="mt-1 block text-[11.5px] text-petrol-500">
                  ekkor <M>{`v' = ${F.tenyezok[1 - k]}`}</M>
                </span>
              </button>
            );
          })}
        </div>

        {V && (
          <div
            className={`mt-4 rounded-xl border p-4 ${
              V.jo ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"
            }`}
          >
            <p
              className={`text-[10.5px] font-bold tracking-[0.16em] uppercase ${
                V.jo ? "text-emerald-700" : "text-rose-700"
              }`}
            >
              {V.jo
                ? F.mindegy
                  ? "Ez is járható út"
                  : "Jó választás — az új integrál egyszerűbb"
                : "Rossz választás — az új integrál nehezebb"}
            </p>

            <div className="szamok finom-gorgeto mt-2 overflow-x-auto text-[14px] text-petrol-900">
              <div className="flex flex-wrap gap-x-6 gap-y-1">
                <span>
                  <M>{V.uDer}</M>
                </span>
                <span>
                  <M>{V.v}</M>
                </span>
              </div>
            </div>

            <div className="szamok mt-2 rounded-lg bg-white/70 px-3 py-2 text-[13.5px] text-petrol-900">
              <MB>{"\\int u\\,v'\\,dx = u\\,v - \\int u'\\,v\\,dx"}</MB>
            </div>

            <p className="mt-2 text-[12px] font-semibold tracking-wide text-petrol-500 uppercase">A maradék integrál</p>
            <div className="szamok finom-gorgeto overflow-x-auto text-[14px] text-petrol-900">
              <MB>{V.uj}</MB>
            </div>

            <p className="mt-1 text-[13.5px] leading-relaxed text-petrol-800">{V.szoveg}</p>

            {V.ered && (
              <div className="szamok finom-gorgeto mt-2 overflow-x-auto rounded-lg bg-naracs-50 px-3 py-2 text-[13.5px] text-naracs-900">
                <MB>{V.ered}</MB>
              </div>
            )}
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {valasz !== null && (
            <button
              type="button"
              onClick={() => setValasz(null)}
              className="rounded-lg bg-white px-4 py-2 text-[13px] font-medium text-petrol-700 ring-1 ring-petrol-200 transition hover:bg-petrol-50"
            >
              A másik választás
            </button>
          )}
          <button
            type="button"
            onClick={kovetkezo}
            className="rounded-lg bg-naracs-500 px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-naracs-600"
          >
            Következő feladat ↻
          </button>
        </div>
      </div>
    </div>
  );
}
