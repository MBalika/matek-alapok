import Link from "next/link";
import { M, MB } from "@/components/ui/Keplet";
import NyomtatasGomb from "@/components/NyomtatasGomb";
import { modulok } from "@/lib/oldalterkep";

export const metadata = {
  title: "Puska",
  description: "Nyomtatható egyoldalas összefoglaló modulonként: képletek, szabályok, tipikus hibák.",
};

function Lap({ szam, cim, gyerekek }) {
  return (
    <section className="puska-lap mb-8 rounded-2xl border border-[color:var(--keret)] bg-white p-5 sm:p-7 print:mb-0 print:rounded-none print:border-0 print:p-0">
      <div className="flex items-center gap-3 border-b-2 border-naracs-500 pb-2">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-naracs-500 text-[15px] font-bold text-white print:bg-black">{szam}</span>
        <h2 className="text-xl font-bold text-petrol-900">{cim}</h2>
        <span className="ml-auto text-[11px] tracking-[0.16em] text-petrol-400 uppercase">Matematika · puska</span>
      </div>
      <div className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">{gyerekek}</div>
    </section>
  );
}

function Doboz({ cim, children, szeles = false }) {
  return (
    <div className={`rounded-xl border border-petrol-100 bg-petrol-50/50 px-3.5 py-2.5 print:border-gray-300 print:bg-white ${szeles ? "sm:col-span-2" : ""}`}>
      <p className="text-[10.5px] font-bold tracking-[0.14em] text-naracs-700 uppercase">{cim}</p>
      <div className="proza szamok mt-1 text-[13px] leading-snug text-petrol-800 [&_.katex-display]:my-1">{children}</div>
    </div>
  );
}

export default function PuskaOldal() {
  const hatralevo = modulok.filter((m) => m.szam !== null && !m.kesz);
  return (
    <>
      <div className="racs-hatter nyomtatasban-rejtve border-b border-petrol-800 bg-linear-to-br from-petrol-900 via-petrol-800 to-petrol-700">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-naracs-500 text-[15px] font-bold text-white">✎</span>
            <span className="text-[11px] font-semibold tracking-[0.2em] text-petrol-300 uppercase">Összefoglaló</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">Puska — modulonként egy oldal</h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-petrol-200">
            A legfontosabb képletek, szabályok és a tipikus hibák, modulonként egy oldalon. Nyomtasd ki, vagy mentsd
            PDF-be — de előbb próbáld meg fejből leírni, aztán hasonlítsd össze.
          </p>
          <div className="mt-5">
            <NyomtatasGomb />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 print:max-w-none print:p-0">
        <Lap
          szam={1}
          cim="Komplex számok"
          gyerekek={
            <>
              <Doboz cim="Alapok">
                <MB>{"i^2 = -1,\\quad i^3 = -i,\\quad i^4 = 1,\\quad \\tfrac{1}{i} = -i"}</MB>
                <p>
                  <M>{"z = a + bi"}</M>; <M>{"\\operatorname{Re} z = a"}</M>, <M>{"\\operatorname{Im} z = b"}</M> — a képzetes rész <strong>valós szám</strong>. Nincs rendezés: <M>{"z_1 < z_2"}</M> értelmetlen.
                </p>
              </Doboz>
              <Doboz cim="Konjugált, abszolút érték">
                <MB>{"\\bar z = a - bi,\\qquad |z| = \\sqrt{a^2+b^2},\\qquad z\\bar z = |z|^2"}</MB>
                <p>
                  <M>{"|z_1 z_2| = |z_1||z_2|"}</M>, de <M>{"|z_1+z_2| \\le |z_1|+|z_2|"}</M>. <M>{"|z-z_0| = r"}</M>: kör.
                </p>
              </Doboz>
              <Doboz cim="Műveletek algebrai alakban">
                <MB>{"(a_1+b_1 i)(a_2+b_2 i) = (a_1a_2 - b_1b_2) + (a_1b_2 + a_2b_1)i"}</MB>
                <MB>{"\\frac{z_1}{z_2} = \\frac{z_1\\bar z_2}{|z_2|^2}"}</MB>
                <p>Úgy számolj, mintha i egy betű volna, a végén i² = −1. Osztásnál a <strong>nevező</strong> konjugáltjával bővíts.</p>
              </Doboz>
              <Doboz cim="Trigonometrikus és exponenciális alak">
                <MB>{"z = r(\\cos\\varphi + i\\sin\\varphi) = r e^{i\\varphi}"}</MB>
                <MB>{"r = \\sqrt{a^2+b^2},\\qquad \\operatorname{tg}\\varphi = \\frac{b}{a},\\qquad a = r\\cos\\varphi,\\ b = r\\sin\\varphi"}</MB>
              </Doboz>
              <Doboz cim="Negyedek — az argumentum" szeles>
                <p>
                  <M>{"\\alpha = \\operatorname{arctg}|b/a|"}</M> hegyesszög, aztán: I. (+,+): <M>{"\\varphi = \\alpha"}</M> · II. (−,+): <M>{"180^\\circ - \\alpha"}</M> · III. (−,−): <M>{"180^\\circ + \\alpha"}</M> · IV. (+,−): <M>{"360^\\circ - \\alpha"}</M>. Tengelyen: <M>{"bi"}</M>, <M>{"b>0"}</M> → 90°; <M>{"b<0"}</M> → 270°; negatív valós → 180°. <strong>Rajzold fel a pontot.</strong>
                </p>
              </Doboz>
              <Doboz cim="Szorzás, osztás, hatványozás">
                <MB>{"z_1 z_2 = r_1 r_2\\left(\\cos(\\varphi_1+\\varphi_2) + i\\sin(\\varphi_1+\\varphi_2)\\right)"}</MB>
                <MB>{"\\frac{z_1}{z_2} = \\frac{r_1}{r_2}\\left(\\cos(\\varphi_1-\\varphi_2) + i\\sin(\\varphi_1-\\varphi_2)\\right)"}</MB>
                <MB>{"z^n = r^n(\\cos n\\varphi + i\\sin n\\varphi)\\quad\\text{(Moivre)}"}</MB>
                <p>Abszolút értékek szorzódnak, szögek összeadódnak: forgatva nyújtás. i-vel szorzás = +90°.</p>
              </Doboz>
              <Doboz cim="Gyökvonás">
                <MB>{"\\sqrt[n]{z} = \\sqrt[n]{r}\\left(\\cos\\frac{\\varphi + k\\cdot 360^\\circ}{n} + i\\sin\\frac{\\varphi + k\\cdot 360^\\circ}{n}\\right),\\ k = 0,\\dots,n-1"}</MB>
                <p>Pontosan n gyök, egy körön, szabályos n-szög, egymástól 360°/n-re. Egységgyökök: r = 1, φ = 0.</p>
              </Doboz>
              <Doboz cim="Egyenletek">
                <p>
                  Megoldóképlet változatlan; <M>{"\\sqrt{-c} = i\\sqrt c"}</M>. Valós együtthatóknál a gyökök konjugált párok. Algebra alaptétele: n-edfokú polinomnak pontosan n komplex gyöke van.
                </p>
              </Doboz>
              <Doboz cim="Nevezetes értékek">
                <p>
                  cos/sin: 30° → √3/2, 1/2 · 45° → √2/2, √2/2 · 60° → 1/2, √3/2. <M>{"1+i = \\sqrt2\\,e^{i\\pi/4}"}</M>, <M>{"e^{i\\pi} = -1"}</M>.
                </p>
              </Doboz>
              <Doboz cim="Tipikus hibák" szeles>
                <p>
                  A negyed elrontása (a számológép csak ±90°-ot ad) · <M>{"\\sqrt{x}\\sqrt{y} = \\sqrt{xy}"}</M> negatívokra (−1 = 1 jönne ki) · csak a k = 0 gyök felírása · <M>{"|z|^2"}</M> és <M>{"z^2"}</M> keverése · Im z i-vel együtt · a számláló konjugáltjával bővítés · Moivre-nál a nagy szög nem redukálva.
                </p>
              </Doboz>
            </>
          }
        />

        {hatralevo.length > 0 && (
          <div className="nyomtatasban-rejtve rounded-2xl border border-dashed border-petrol-200 bg-petrol-50/50 p-5 text-[13.5px] text-petrol-600">
            <p className="font-semibold text-petrol-800">A további modulok puskája a modulok elkészültével kerül ide:</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {hatralevo.map((m) => (
                <li key={m.slug}>
                  <Link href={m.slug} className="rounded-full bg-white px-3 py-1 text-[12.5px] text-petrol-600 ring-1 ring-petrol-200">
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
