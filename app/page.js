import Link from "next/link";
import { Szakasz, Kartya, Kiemelo, Cimke } from "@/components/ui/Elemek";
import { M, MB } from "@/components/ui/Keplet";
import { modulok, kurzus } from "@/lib/oldalterkep";

export const metadata = {
  title: "Matematika – Analízis, interaktív tananyag",
};

export default function Kezdolap() {
  return (
    <>
      {/* ---------- Nyitókép ---------- */}
      <div className="racs-hatter relative overflow-hidden bg-linear-to-br from-petrol-950 via-petrol-800 to-petrol-600">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="text-[11.5px] font-semibold tracking-[0.2em] text-naracs-300 uppercase">
              {kurzus.targy}
            </p>
            <h1 className="mt-3 text-4xl leading-[1.1] font-bold tracking-tight text-white sm:text-5xl">
              Analízis, első félév
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-petrol-100">
              A félév nyolc témaköre egy helyen: mozgatható ábrákkal
              magyarázott elmélet, az előadás példái lépésről lépésre
              kidolgozva, kalkulátorok az ellenőrzéshez és végtelen sok
              gyakorlófeladat, minden indításkor új számokkal.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/komplex"
                className="rounded-xl bg-naracs-500 px-5 py-3 text-[14px] font-semibold text-white shadow-lg shadow-naracs-900/20 transition hover:bg-naracs-600"
              >
                Kezdés az 1. modullal →
              </Link>
              <a
                href="#utmutato"
                className="rounded-xl border border-white/25 px-5 py-3 text-[14px] font-semibold text-white transition hover:bg-white/10"
              >
                Hogyan használd?
              </a>
            </div>
          </div>

          <div className="hidden lg:block">
            <NyitoAbra />
          </div>
        </div>
      </div>

      {/* ---------- Útmutató ---------- */}
      <Szakasz
        id="utmutato"
        cimke="Bevezetés"
        cim="Útmutató ehhez az anyaghoz"
        bevezeto="Minden modul ugyanazt a négy lépést járja végig. A sorrend nem véletlen: a megértés az ábráknál kezdődik, és csak a gyakorlásnál rögzül."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              szam: "1",
              cim: "Elmélet",
              szoveg:
                "Rövid, ábrás magyarázat. A legtöbb ábrát meg tudod mozgatni: húzd a pontokat, állítsd a csúszkákat, és nézd, mi változik.",
            },
            {
              szam: "2",
              cim: "Kidolgozott feladatok",
              szoveg:
                "Az előadás és a gyakorlat példái, lépésenként feltárható megoldással. Először próbáld meg magad, és csak utána nyisd ki a lépéseket.",
            },
            {
              szam: "3",
              cim: "Kalkulátor",
              szoveg:
                "Ugyanaz a számítás tetszőleges adatokkal. Arra jó, hogy a saját házi feladatod eredményét ellenőrizd, vagy ráérezz az összefüggésekre.",
            },
            {
              szam: "4",
              cim: "Gyakorlás",
              szoveg:
                "Véletlen számokkal generált feladatok azonnali javítással. Addig nyomd az „új feladat” gombot, amíg magabiztos nem leszel.",
            },
          ].map((l) => (
            <Kartya key={l.szam}>
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-petrol-800 text-[14px] font-bold text-white">
                {l.szam}
              </span>
              <h3 className="mt-3 text-[15px] font-semibold text-petrol-900">
                {l.cim}
              </h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-petrol-600">
                {l.szoveg}
              </p>
            </Kartya>
          ))}
        </div>

        <Kiemelo tipus="tipp" cim="Hogyan tanulj ebből">
          <p>
            Az analízis nem képletgyűjtemény, hanem néhány gondolat sokszori
            alkalmazása: a határérték, a linearitás és a „bontsd fel, számold
            ki részenként, rakd össze” elve szinte minden fejezetben
            visszatér. Ha egy feladatnál elakadsz, ne a képletet keresd, hanem
            azt kérdezd meg magadtól: <em>mit jelent ez az objektum
            geometriailag, és mit tudok róla pontosan?</em> A kidolgozott
            feladatokban ez mindig az első lépés.
          </p>
        </Kiemelo>
      </Szakasz>

      {/* ---------- Jelölések ---------- */}
      <Szakasz
        id="jelolesek"
        cimke="Alapok"
        cim="Jelölésrendszer"
        bevezeto="Ezeket a jelöléseket használjuk végig az egész anyagban, ugyanúgy, ahogy az előadáson és a gyakorlaton."
        className="bg-white"
      >
        <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)]">
          <table className="w-full text-[14px]">
            <thead className="bg-petrol-50 text-[11px] tracking-wider text-petrol-500 uppercase">
              <tr>
                <th className="px-4 py-2.5 text-left font-semibold">Jelölés</th>
                <th className="px-4 py-2.5 text-left font-semibold">Jelentés</th>
                <th className="hidden px-4 py-2.5 text-left font-semibold sm:table-cell">
                  Megjegyzés
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {[
                [
                  "\\mathbb{N},\\ \\mathbb{Z},\\ \\mathbb{Q},\\ \\mathbb{R},\\ \\mathbb{C}",
                  "Számhalmazok",
                  "Természetes, egész, racionális, valós, komplex számok.",
                ],
                [
                  "z = a + bi",
                  "Komplex szám algebrai alakja",
                  "a a valós, b a képzetes rész; mindkettő valós szám.",
                ],
                [
                  "|z|,\\ \\bar{z},\\ \\arg z",
                  "Abszolút érték, konjugált, argumentum",
                  "Hossz, tükörkép a valós tengelyre, irányszög.",
                ],
                [
                  "\\vec{a},\\ \\vec{a}\\cdot\\vec{b},\\ \\vec{a}\\times\\vec{b}",
                  "Vektor, skaláris és vektoriális szorzat",
                  "A vektort nyíllal jelöljük, a hosszát |a| adja.",
                ],
                [
                  "a_n \\to A,\\quad \\lim_{n\\to\\infty} a_n = A",
                  "Sorozat határértéke",
                  "„Az a_n tart A-hoz.”",
                ],
                [
                  "\\lim_{x\\to x_0} f(x),\\quad \\lim_{x\\to x_0+0}",
                  "Függvényhatárérték, jobb oldali határérték",
                  "A −0 a bal oldali határértéket jelöli.",
                ],
                [
                  "f'(x),\\ f''(x),\\ \\dfrac{dy}{dx}",
                  "Derivált",
                  "Mindkét jelölést használjuk; ugyanazt jelentik.",
                ],
                [
                  "\\int f(x)\\,dx,\\quad \\int_a^b f(x)\\,dx",
                  "Határozatlan és határozott integrál",
                  "Az első egy függvénysereg (+C), a második egy szám.",
                ],
                [
                  "\\operatorname{tg},\\ \\operatorname{ctg},\\ \\operatorname{arctg},\\ \\operatorname{sh},\\ \\operatorname{ch}",
                  "Szögfüggvények magyar jelölése",
                  "A tan, cot, arctan, sinh, cosh angol megfelelői.",
                ],
              ].map(([jel, jelentes, megj]) => (
                <tr key={jel} className="border-t border-petrol-100">
                  <td className="px-4 py-2.5 whitespace-nowrap">
                    <M>{jel}</M>
                  </td>
                  <td className="px-4 py-2.5 text-petrol-800">{jelentes}</td>
                  <td className="hidden px-4 py-2.5 text-[13px] text-petrol-500 sm:table-cell">
                    {megj}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Kiemelo tipus="figyelem" cim="A leggyakoribb félreértés">
          <p>
            A <M>{"\\operatorname{tg}\\varphi = b/a"}</M> egyenletnek két
            megoldása van a <M>{"0 \\le \\varphi < 2\\pi"}</M> tartományban, a
            számológép viszont csak az egyiket adja vissza. Ez a komplex
            számoknál, a térgeometriában és a polárkoordinátáknál is
            ugyanúgy előjön — <strong>mindig rajzold fel</strong>, melyik
            síknegyedben vagy, és csak utána higgy a számológépnek.
          </p>
        </Kiemelo>
      </Szakasz>

      {/* ---------- Számkörök ---------- */}
      <Szakasz
        id="szamkorok"
        cimke="Alapok"
        cim="Számkörök"
        bevezeto="A félév első témája a számfogalom utolsó bővítése. Érdemes látni, hogy ez ugyanaz a lépés, amit már négyszer megtett a matematika."
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <Kartya cimke="Bővítések" cim="Minden bővítést egy megoldhatatlan egyenlet kényszerít ki">
            <div className="overflow-hidden rounded-lg border border-petrol-100">
              <table className="w-full text-[13.5px]">
                <thead className="bg-petrol-50 text-[10.5px] text-petrol-500 uppercase">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold">Számkör</th>
                    <th className="px-3 py-2 text-left font-semibold">Nem oldható meg</th>
                    <th className="px-3 py-2 text-left font-semibold">Bővítés</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["\\mathbb{N}", "x + 3 = 1", "negatív számok", "\\mathbb{Z}"],
                    ["\\mathbb{Z}", "3x = 1", "törtek", "\\mathbb{Q}"],
                    ["\\mathbb{Q}", "x^2 = 2", "irracionális számok", "\\mathbb{R}"],
                    ["\\mathbb{R}", "x^2 = -1", "képzetes egység", "\\mathbb{C}"],
                  ].map(([bol, egyenlet, mivel, be]) => (
                    <tr key={egyenlet} className="border-t border-petrol-100">
                      <td className="px-3 py-2"><M>{bol}</M></td>
                      <td className="px-3 py-2"><M>{egyenlet}</M></td>
                      <td className="px-3 py-2 text-petrol-600">
                        {mivel} → <M>{be}</M>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Kartya>

          <div>
            <div className="proza text-[14.5px] leading-relaxed text-petrol-700">
              <p>
                A természetes számok között nem lehet kivonni, az egészek
                között nem lehet osztani, a racionálisak között nem lehet
                gyököt vonni, a valósak között pedig nem lehet negatív számból
                gyököt vonni. Mindegyik esetben ugyanaz történt: kitaláltunk
                egy bővebb számkört, amelyben a művelet már mindig elvégezhető,
                és megnéztük, hogy a régi számolási szabályok érvényben
                maradnak-e. Maradtak.
              </p>
              <p>
                A komplex számok tehát nem „képzeltek” és nem misztikusak:
                pontosan olyan jogos bővítés, mint annak idején a negatív számok
                voltak. Az elnevezés csak történelmi teher.
              </p>
            </div>
            <Kiemelo tipus="kulcs" cim="A lánc">
              <MB>
                {
                  "\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R} \\subset \\mathbb{C}"
                }
              </MB>
              <p>
                Minden valós szám egyben komplex szám is — nulla képzetes
                résszel. A <M>{"\\mathbb{C}"}</M>-nél viszont megáll a
                sor: az algebra alaptétele szerint minden polinomegyenletnek van
                itt megoldása, nincs mit tovább bővíteni.
              </p>
            </Kiemelo>
          </div>
        </div>
      </Szakasz>

      {/* ---------- Szögek, pontosság ---------- */}
      <Szakasz
        id="pontossag"
        cimke="Alapok"
        cim="Szögek, kerekítés, tizedesvessző"
        className="bg-white"
      >
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <div className="proza text-[14.5px] leading-relaxed text-petrol-700">
              <p>
                Az analízisben a szögeket <strong>radiánban</strong> mérjük —
                a nevezetes határértékek, a deriválási képletek (
                <M>{"(\\sin x)' = \\cos x"}</M>) és a Moivre-képlet is csak így
                érvényesek. A fok csak a végeredmény „olvasható” kiírásához való.
                A számológépet állítsd RAD módba, és tudd fejből a nevezetes
                szögeket.
              </p>
              <p>
                A számítás során végig legalább négy értékes jeggyel dolgozunk,
                és csak a végeredményt kerekítjük. Ha közben kerekítesz, a hiba
                felhalmozódik: egy háromlépéses feladatnál ez már a második
                tizedesjegyet is elronthatja. A gyakorlófeladatok ezért a
                helyes értéktől legfeljebb 1,5 %-os eltérést fogadnak el.
              </p>
            </div>

            <Kiemelo tipus="kulcs" cim="Ökölszabály">
              <p>
                Ha egy eredmény „csúnya” szám (például 0,86603), nézd meg,
                nem egy nevezetes érték-e: itt épp <M>{"\\sqrt{3}/2"}</M>.
                A pontos alak mindig többet ér, mint a tizedes tört — és
                az ellenőrzés is könnyebb vele.
              </p>
            </Kiemelo>
          </div>

          <Kartya cim="Nevezetes szögek, amik folyton kellenek">
            <div className="overflow-hidden rounded-lg border border-petrol-100">
              <table className="szamok w-full text-[13.5px]">
                <thead className="bg-petrol-50 text-[11px] text-petrol-500 uppercase">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold">fok</th>
                    <th className="px-3 py-2 text-left font-semibold">rad</th>
                    <th className="px-3 py-2 text-left font-semibold">sin</th>
                    <th className="px-3 py-2 text-left font-semibold">cos</th>
                    <th className="px-3 py-2 text-left font-semibold">tg</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["0^\\circ", "0", "0", "1", "0"],
                    ["30^\\circ", "\\pi/6", "1/2", "\\sqrt3/2", "\\sqrt3/3"],
                    ["45^\\circ", "\\pi/4", "\\sqrt2/2", "\\sqrt2/2", "1"],
                    ["60^\\circ", "\\pi/3", "\\sqrt3/2", "1/2", "\\sqrt3"],
                    ["90^\\circ", "\\pi/2", "1", "0", "-"],
                    ["180^\\circ", "\\pi", "0", "-1", "0"],
                  ].map((sor) => (
                    <tr key={sor[0]} className="border-t border-petrol-100">
                      {sor.map((c, i) => (
                        <td key={i} className="px-3 py-1.5">
                          <M>{c}</M>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-[12.5px] text-petrol-500">
              Átváltás: <M>{"\\text{rad} = \\text{fok}\\cdot\\pi/180"}</M>.
              Egy teljes kör <M>{"2\\pi \\approx 6{,}283"}</M>.
            </p>
          </Kartya>
        </div>
      </Szakasz>

      {/* ---------- Modulok ---------- */}
      <Szakasz
        id="modulok"
        cimke="Tartalom"
        cim="A nyolc modul"
        bevezeto="Az anyag az előadás felépítését követi. Érdemes sorban haladni, mert a későbbi modulok az előzőekre épülnek."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {modulok
            .filter((m) => m.szam !== null)
            .map((m) => (
              <Link
                key={m.slug}
                href={m.slug}
                className="group relative overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white p-5 transition hover:border-petrol-300 hover:shadow-lg hover:shadow-petrol-900/5"
              >
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-linear-to-br from-petrol-700 to-petrol-500 text-[18px] font-bold text-white">
                    {m.szam}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-[16px] font-semibold text-petrol-900">
                        {m.cim}
                      </h3>
                      {m.kesz ? (
                        <Cimke szin="zold">elérhető</Cimke>
                      ) : (
                        <Cimke>hamarosan</Cimke>
                      )}
                    </div>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-petrol-600">
                      {m.leiras}
                    </p>
                  </div>
                </div>
                <span className="absolute right-5 bottom-4 text-[13px] font-semibold text-naracs-600 opacity-0 transition group-hover:opacity-100">
                  Megnyitás →
                </span>
              </Link>
            ))}
        </div>
      </Szakasz>
    </>
  );
}

/* ---------------- nyitóábra ---------------- */

function NyitoAbra() {
  // Egy görbe, az érintője egy pontban, és a görbe alatti terület – a félév három fő gondolata egy képen
  const pontok = [];
  for (let i = 0; i <= 60; i++) {
    const x = 70 + i * 5;
    const t = i / 60;
    const y = 235 - 150 * (0.35 + 0.55 * Math.sin(t * 3.4 - 0.6) * Math.exp(-0.25 * t) + 0.25 * t);
    pontok.push([x, y]);
  }
  const d = pontok.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const terulet = `${d} L ${pontok[pontok.length - 1][0]} 250 L 70 250 Z`;
  // érintési pont
  const k = 24;
  const [px, py] = pontok[k];
  const [qx, qy] = pontok[k + 1];
  const m = (qy - py) / (qx - px);
  const hossz = 95;
  const nx = hossz / Math.sqrt(1 + m * m);

  return (
    <svg viewBox="0 0 420 320" className="abra w-full" aria-hidden="true">
      <defs>
        <marker id="ny-nyito" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 1 L 9 5 L 0 9 z" fill="#fdba74" />
        </marker>
        <linearGradient id="ter-nyito" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fdba74" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#fdba74" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      <path d={terulet} fill="url(#ter-nyito)" />

      {/* tengelyek */}
      <line x1="60" y1="250" x2="390" y2="250" stroke="rgba(255,255,255,.3)" strokeWidth="1.5" />
      <line x1="60" y1="250" x2="60" y2="40" stroke="rgba(255,255,255,.3)" strokeWidth="1.5" />

      {/* görbe */}
      <path d={d} fill="none" stroke="#ffffff" strokeWidth="3.4" strokeLinecap="round" />

      {/* érintő */}
      <line
        x1={px - nx}
        y1={py - nx * m}
        x2={px + nx}
        y2={py + nx * m}
        stroke="#fdba74"
        strokeWidth="3"
        strokeLinecap="round"
        markerEnd="url(#ny-nyito)"
      />
      <circle cx={px} cy={py} r="5.5" fill="#f97316" stroke="white" strokeWidth="2" />

      <text x={px + 14} y={py - 14} fill="#fed7aa" fontSize="13" fontWeight="600">
        f′(x₀)
      </text>
      <text x="300" y="238" fill="#fed7aa" fontSize="13" fontWeight="600">
        ∫ f
      </text>
      <text x="375" y="60" fill="#ffffff" fontSize="15" fontWeight="700">
        f
      </text>
    </svg>
  );
}
