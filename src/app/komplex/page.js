import { ModulFejlec, SzakaszSav } from "@/components/ModulKeret";
import { Szakasz, Kartya, Kiemelo, AbraKeret, KetOszlop } from "@/components/ui/Elemek";
import { M, MB, KepletDoboz } from "@/components/ui/Keplet";
import { KidolgozottFeladat, Lepes } from "@/components/KidolgozottFeladat";
import GaussSikFelfedezo from "@/components/abrak/GaussSikFelfedezo";
import SzorzasFelfedezo from "@/components/abrak/SzorzasFelfedezo";
import GyokFelfedezo from "@/components/abrak/GyokFelfedezo";
import { KomplexMuveletKalk, KomplexGyokKalk } from "@/components/abrak/KomplexKalk";
import { AbraOsszeadas, AbraNegyedek, AbraEgyseggyokok } from "@/components/abrak/KomplexStatikusAbrak";
import GyakorloSzekcio from "@/components/komplex/GyakorloSzekcio";
import { modulSlugAlapjan } from "@/lib/oldalterkep";

export const metadata = {
  title: "Komplex számok",
  description:
    "Algebrai és trigonometrikus alak, Gauss-sík, műveletek, Moivre-képlet, gyökvonás és egyenletek — interaktív ábrákkal, kidolgozott feladatokkal és gyakorlással.",
};

const modul = modulSlugAlapjan("/komplex");

function Alcim({ children }) {
  return <h3 className="mt-10 text-xl font-semibold text-petrol-900">{children}</h3>;
}

function Proza({ children }) {
  return <div className="proza mt-3 text-[15px] leading-relaxed text-petrol-700">{children}</div>;
}

export default function KomplexOldal() {
  return (
    <>
      <ModulFejlec
        szam={1}
        cim="Komplex számok"
        leiras="A számfogalom utolsó bővítése: egy új szám, amelynek a négyzete −1, és vele a sík minden pontja számmá válik. Az összeadás vektorösszeadás, a szorzás forgatva nyújtás — ha ezt a két képet megérted, a fejezet fele megvan."
        tartalom={[
          "Az i és az algebrai alak",
          "Gauss-sík, konjugált, abszolút érték",
          "Trigonometrikus alak",
          "Moivre-képlet",
          "Gyökvonás",
          "Egyenletek",
        ]}
      />
      <SzakaszSav szakaszok={modul.szakaszok} />

      {/* ==================== ELMÉLET ==================== */}
      <Szakasz
        id="elmelet"
        cimke="1. rész"
        cim="Elmélet"
        bevezeto="Kilenc gondolat, amiből az egész modul áll. Az ábrákat próbáld ki: a mozgatható ábrák többet tanítanak, mint tíz sor magyarázat."
      >
        {/* --- 1.1 --- */}
        <h3 className="mt-2 text-xl font-semibold text-petrol-900">1.1 Miért van szükség a komplex számokra?</h3>
        <Proza>
          <p>
            A valós számok között az <M>{"x^2 = -1"}</M> egyenletnek nincs megoldása:
            bármit szorzunk önmagával, az eredmény nem lehet negatív. Ez első hallásra
            nem nagy baj — csakhogy a matematika története pontosan azt mutatja, hogy
            ilyenkor mindig ugyanaz történik: kitalálunk egy bővebb számkört, amelyben
            a művelet már mindig elvégezhető. Így jöttek a negatív számok, a törtek
            és a <M>{"\\sqrt2"}</M> is.
          </p>
          <p>
            Érdekes módon nem a másodfokú, hanem a <strong>harmadfokú</strong> egyenlet
            kényszerítette ki a bevezetésüket a 16. században: a Cardano-képlet
            valós gyököket is csak úgy tud kiszámolni, hogy <em>közben</em> negatív
            szám négyzetgyökén megy át. Nem lehetett megúszni.
          </p>
        </Proza>

        <Kiemelo tipus="tipp" cim="Mire jók a mérnöknek">
          <p>
            Rezgések és váltakozó áram leírása (az amplitúdó és a fázis egyetlen
            számban), szerkezetek stabilitásvizsgálata (a karakterisztikus egyenlet
            gyökeinek elhelyezkedése a komplex síkon), és a síkbeli forgatások
            legelegánsabb leírása. Ez nem elvont játék, hanem mindennapi eszköz.
          </p>
        </Kiemelo>

        {/* --- 1.2 --- */}
        <Alcim>1.2 A képzetes egység és az algebrai alak</Alcim>
        <Proza>
          <p>
            Jelölje <M>{"i"}</M> azt a számot, amelyre <M>{"i^2 = -1"}</M>. Ez egy{" "}
            <em>definíció</em>, nem levezetett tény — az igazolás abban áll, hogy a
            bővebb számkörben a szokásos számolási szabályok érvényben maradnak.
            (Villamosmérnöki szövegekben <M>{"i"}</M> helyett <M>{"j"}</M> szerepel,
            mert az <M>{"i"}</M> ott az áramerősség.)
          </p>
        </Proza>

        <Kiemelo tipus="definicio" cim="Definíció — komplex szám, algebrai alak">
          <p>
            Ha <M>{"a"}</M> és <M>{"b"}</M> valós számok, a <M>{"z = a + bi"}</M>{" "}
            alakú kifejezéseket komplex számoknak nevezzük. Itt{" "}
            <M>{"a = \\operatorname{Re} z"}</M> a <strong>valós rész</strong>,{" "}
            <M>{"b = \\operatorname{Im} z"}</M> a <strong>képzetes rész</strong>. A
            komplex számok halmazának jele <M>{"\\mathbb{C}"}</M>. Két komplex
            szám pontosan akkor egyenlő, ha a valós részeik is és a képzetes részeik
            is egyenlők — egy komplex egyenlet tehát <strong>két valós egyenlet</strong>.
          </p>
        </Kiemelo>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Kartya cimke="Az i hatványai" cim="Négyesével ismétlődik">
            <MB>{"i^1 = i,\\quad i^2 = -1,\\quad i^3 = -i,\\quad i^4 = 1"}</MB>
            <p className="mt-2 text-[13px] text-petrol-500">
              <M>{"i^n"}</M>-hez elég <M>{"n"}</M>-et néggyel osztani és a maradékot nézni.
              Például <M>{"2026 = 4\\cdot 506 + 2"}</M>, tehát <M>{"i^{2026} = i^2 = -1"}</M>.
            </p>
          </Kartya>
          <Kartya cimke="Speciális esetek" cim="Valós és tisztán képzetes">
            <p className="text-[14px] leading-relaxed text-petrol-600">
              Ha <M>{"b = 0"}</M>, a szám valós: <M>{"\\mathbb{R} \\subset \\mathbb{C}"}</M>.
              Ha <M>{"a = 0"}</M>, a szám tisztán képzetes (<M>{"3i"}</M>). A{" "}
              <M>{"z = 0"}</M> csak akkor, ha <M>{"a = 0"}</M> <em>és</em>{" "}
              <M>{"b = 0"}</M>.
            </p>
          </Kartya>
        </div>

        <Kiemelo tipus="figyelem" cim="A képzetes rész valós szám!">
          <p>
            A <M>{"z = 4 - 3i"}</M> képzetes része <M>{"\\operatorname{Im} z = -3"}</M>,
            és <strong>nem</strong> <M>{"-3i"}</M>. A képzetes rész az <M>{"i"}</M>{" "}
            együtthatója. Ugyanígy: a komplex számok között <strong>nincs</strong>{" "}
            rendezés — olyan, hogy <M>{"z_1 < z_2"}</M>, nem létezik; csak az
            abszolút értékeket lehet összehasonlítani.
          </p>
        </Kiemelo>

        {/* --- 1.3 --- */}
        <Alcim>1.3 A Gauss-féle számsík</Alcim>
        <Proza>
          <p>
            A <M>{"z = a + bi"}</M> két valós adatot hordoz, ezért kézenfekvő a sík{" "}
            <M>{"(a,\\,b)"}</M> pontjával azonosítani. A vízszintes tengely a{" "}
            <strong>valós</strong>, a függőleges a <strong>képzetes tengely</strong>.
            A számot gyakran hasznosabb az origóból a pontba mutató{" "}
            <strong>vektorként</strong> elképzelni — mert így az összeadás
            vektorösszeadás, a szorzás pedig forgatva nyújtás lesz.
          </p>
        </Proza>

        <div className="mt-6">
          <p className="mb-2 text-[11px] font-bold tracking-[0.16em] text-naracs-600 uppercase">Próbáld ki</p>
          <GaussSikFelfedezo />
        </div>

        {/* --- 1.4 --- */}
        <Alcim>1.4 Konjugált és abszolút érték</Alcim>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <Kartya cimke="Konjugált" cim="Tükrözés a valós tengelyre">
            <MB>{"\\bar{z} = a - bi"}</MB>
            <p className="mt-2 text-[13px] text-petrol-500">
              A képzetes rész előjelét fordítjuk meg. Valós szám konjugáltja önmaga.{" "}
              <M>{"\\overline{z_1 z_2} = \\bar z_1 \\bar z_2"}</M>, és{" "}
              <M>{"z + \\bar z = 2\\operatorname{Re} z"}</M>.
            </p>
          </Kartya>
          <Kartya cimke="Abszolút érték" cim="A vektor hossza">
            <MB>{"|z| = \\sqrt{a^2 + b^2}"}</MB>
            <p className="mt-2 text-[13px] text-petrol-500">
              Az origótól mért távolság. <M>{"|z_1 z_2| = |z_1|\\,|z_2|"}</M>, de az
              összegre csak <M>{"|z_1 + z_2| \\le |z_1| + |z_2|"}</M> igaz
              (háromszög-egyenlőtlenség).
            </p>
          </Kartya>
        </div>

        <KepletDoboz
          cimke="A fejezet kulcsösszefüggése"
          keplet={"z\\cdot\\bar{z} = (a+bi)(a-bi) = a^2 - b^2 i^2 = a^2 + b^2 = |z|^2"}
        />
        <Proza>
          <p>
            Egy szám és a konjugáltjának szorzata tehát <strong>mindig valós, nemnegatív</strong>{" "}
            szám. Ez ugyanaz az <M>{"(x+y)(x-y) = x^2 - y^2"}</M> azonosság, csak{" "}
            <M>{"y^2 = (bi)^2 = -b^2"}</M> miatt összeg lesz belőle. Ezért bővítünk
            osztásnál a nevező konjugáltjával.
          </p>
        </Proza>

        <Kiemelo tipus="figyelem" cim="|z|² ≠ z²">
          <p>
            <M>{"|z|^2 = z\\bar z"}</M> mindig nemnegatív valós; <M>{"z^2"}</M>{" "}
            általában komplex. Például <M>{"z = i"}</M>-re <M>{"|z|^2 = 1"}</M>, de{" "}
            <M>{"z^2 = -1"}</M>.
          </p>
        </Kiemelo>

        <Kiemelo tipus="tipp" cim="Geometria az abszolút értékkel">
          <p>
            <M>{"|z_1 - z_2|"}</M> a két pont távolsága. Ezért <M>{"|z - z_0| = r"}</M>{" "}
            egy <M>{"z_0"}</M> középpontú, <M>{"r"}</M> sugarú kör, <M>{"|z-z_1| = |z-z_2|"}</M>{" "}
            pedig a szakaszfelező merőleges.
          </p>
        </Kiemelo>

        {/* --- 1.5 --- */}
        <Alcim>1.5 Műveletek algebrai alakban</Alcim>
        <Kiemelo tipus="kulcs">
          <p>
            Úgy számolunk, mintha <M>{"i"}</M> egy közönséges betű volna — a végén
            pedig minden <M>{"i^2"}</M> helyére <M>{"-1"}</M>-et írunk. Nem kell
            új szabályt tanulni: a zárójelfelbontás és a nevezetes azonosságok
            változatlanul működnek.
          </p>
        </Kiemelo>

        <div className="mt-2 grid gap-4 lg:grid-cols-3">
          <Kartya cimke="Összeadás" cim="Komponensenként">
            <MB>{"(a_1 + b_1 i) + (a_2 + b_2 i) = (a_1 + a_2) + (b_1 + b_2)i"}</MB>
          </Kartya>
          <Kartya cimke="Szorzás" cim="Zárójelfelbontás">
            <MB>{"(a_1 + b_1 i)(a_2 + b_2 i) = (a_1 a_2 - b_1 b_2) + (a_1 b_2 + a_2 b_1)i"}</MB>
            <p className="mt-2 text-[13px] text-petrol-500">Ne magold: bontsd fel a zárójelet minden feladatban újra.</p>
          </Kartya>
          <Kartya cimke="Osztás" cim="Bővítés a nevező konjugáltjával">
            <MB>{"\\frac{z_1}{z_2} = \\frac{z_1 \\bar z_2}{z_2 \\bar z_2} = \\frac{z_1 \\bar z_2}{|z_2|^2}"}</MB>
            <p className="mt-2 text-[13px] text-petrol-500">Így a nevező valós lesz, és szét lehet bontani valós és képzetes részre.</p>
          </Kartya>
        </div>

        <AbraKeret szam={1} cim="Az összeadás geometriája: a két helyvektor összege, paralelogramma-szabály.">
          <AbraOsszeadas />
        </AbraKeret>

        <Kiemelo tipus="figyelem" cim="Gyakori hibák a műveleteknél">
          <p>
            A zárójelfelbontás végén megmaradt <M>{"i^2"}</M> még nem eredmény. Osztásnál
            a <strong>nevező</strong> konjugáltjával bővíts, és a tört <em>mindkét</em>{" "}
            tagját szorozd vele. Érdemes megjegyezni: <M>{"1/i = -i"}</M>.
          </p>
        </Kiemelo>

        {/* --- 1.6 --- */}
        <Alcim>1.6 A trigonometrikus alak és a negyedek csapdája</Alcim>
        <Proza>
          <p>
            Az algebrai alak az összeadáshoz tökéletes, a hatványozáshoz és a
            gyökvonáshoz viszont használhatatlan — próbáld csak meg{" "}
            <M>{"(1+i)^{10}"}</M>-et zárójelfelbontással. A megoldás: adjuk meg a
            számot <strong>polárkoordinátákkal</strong>, a hosszával és a szögével.
          </p>
        </Proza>

        <Kiemelo tipus="definicio" cim="Definíció — trigonometrikus alak">
          <MB>{"z = a + bi = r(\\cos\\varphi + i\\sin\\varphi),\\qquad r = |z| = \\sqrt{a^2+b^2},\\quad \\operatorname{tg}\\varphi = \\frac{b}{a}"}</MB>
          <p>
            Az <M>{"r"}</M> az abszolút érték, a <M>{"\\varphi"}</M> az{" "}
            <strong>argumentum</strong> (<M>{"\\arg z"}</M>). Megállapodás:{" "}
            <M>{"0 \\le \\varphi < 2\\pi"}</M>. Visszafelé: <M>{"a = r\\cos\\varphi"}</M>,{" "}
            <M>{"b = r\\sin\\varphi"}</M>.
          </p>
        </Kiemelo>

        <Kiemelo tipus="figyelem" cim="A legfontosabb buktató az egész fejezetben">
          <p>
            A <M>{"\\operatorname{tg}\\varphi = b/a"}</M> egyenletnek{" "}
            <strong>két</strong> megoldása van, amelyek <M>{"180^\\circ"}</M>-kal térnek
            el. A számológép mindig csak a <M>{"-90^\\circ"}</M> és <M>{"90^\\circ"}</M>{" "}
            közé esőt adja — vagyis az I. vagy a IV. negyedet. A kötelező menet: (1)
            számold ki az <M>{"\\alpha = \\operatorname{arctg}|b/a|"}</M> hegyesszöget,
            (2) nézd meg <M>{"a"}</M> és <M>{"b"}</M> előjeléből a negyedet, (3) ebből
            add meg <M>{"\\varphi"}</M>-t. <strong>A biztos módszer: rajzold fel a pontot.</strong>
          </p>
        </Kiemelo>

        <AbraKeret szam={2} cim="A négy negyed és az argumentum képlete a hegyesszögből. A példa: z a III. negyedben, φ = 180° + α.">
          <AbraNegyedek />
        </AbraKeret>

        <Proza>
          <p>
            A tengelyekre eső számoknál ne a tangenssel bajlódj: <M>{"8i"}</M>{" "}
            argumentuma <M>{"90^\\circ"}</M>, <M>{"-4"}</M>-é <M>{"180^\\circ"}</M>,{" "}
            <M>{"-5i"}</M>-é <M>{"270^\\circ"}</M>. És még valami: ha{" "}
            <M>{"\\varphi"}</M> jó szög, akkor <M>{"\\varphi + 2k\\pi"}</M> is az — ezt a
            látszólagos kényelmetlenséget a gyökvonásnál óriási haszonnal fogjuk
            kamatoztatni.
          </p>
        </Proza>

        {/* --- 1.7 --- */}
        <Alcim>1.7 Szorzás, osztás, hatványozás — a Moivre-képlet</Alcim>
        <Proza>
          <p>
            Szorozzunk össze két trigonometrikus alakú számot, és rendezzük az
            eredményt valós és képzetes rész szerint. A zárójelekben a középiskolás{" "}
            <strong>addíciós tételek</strong> jelennek meg — és a fejezet lelke egy
            sorban kimondható:
          </p>
        </Proza>

        <KepletDoboz
          cimke="Szorzás trigonometrikus alakban"
          keplet={"z_1 z_2 = r_1 r_2\\left(\\cos(\\varphi_1+\\varphi_2) + i\\sin(\\varphi_1+\\varphi_2)\\right)"}
        />

        <Kiemelo tipus="kulcs" cim="Forgatva nyújtás">
          <p>
            <strong>Az abszolút értékek összeszorzódnak, az argumentumok összeadódnak.</strong>{" "}
            A <M>{"z_2"}</M>-vel való szorzás a <M>{"z_1"}</M> vektort <M>{"\\varphi_2"}</M>{" "}
            szöggel elforgatja és <M>{"r_2"}</M>-szeresére nyújtja. Az <M>{"i"}</M>-vel
            való szorzás ezért pontosan egy <M>{"90^\\circ"}</M>-os forgatás — és
            kétszer <M>{"90^\\circ"}</M> az <M>{"180^\\circ"}</M>, vagyis{" "}
            <M>{"i\\cdot i = -1"}</M>. Itt válik szemléletessé a definíció.
          </p>
        </Kiemelo>

        <div className="mt-6">
          <p className="mb-2 text-[11px] font-bold tracking-[0.16em] text-naracs-600 uppercase">Próbáld ki — húzd a két számot</p>
          <SzorzasFelfedezo />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Kartya cimke="Osztás" cim="Az abszolút értékek osztódnak, a szögek kivonódnak">
            <MB>{"\\frac{z_1}{z_2} = \\frac{r_1}{r_2}\\left(\\cos(\\varphi_1 - \\varphi_2) + i\\sin(\\varphi_1 - \\varphi_2)\\right)"}</MB>
            <MB>{"\\frac{1}{z} = \\frac{1}{r}\\left(\\cos\\varphi - i\\sin\\varphi\\right)"}</MB>
          </Kartya>
          <Kartya cimke="Hatványozás" cim="Moivre-képlet">
            <MB>{"z^n = r^n\\left(\\cos n\\varphi + i\\sin n\\varphi\\right)"}</MB>
            <p className="mt-2 text-[13px] text-petrol-500">
              A szorzási szabály önmagára alkalmazva. A nagy szöget a{" "}
              <M>{"360^\\circ"}</M> többszöröseivel redukáld, mielőtt szögfüggvényt számolsz.
            </p>
          </Kartya>
        </div>

        <Kiemelo tipus="tipp" cim="Kiegészítés: az exponenciális alak">
          <p>
            Az Euler-formula szerint <M>{"e^{i\\varphi} = \\cos\\varphi + i\\sin\\varphi"}</M>,
            így <M>{"z = r e^{i\\varphi}"}</M>. Ezzel a szorzási és hatványozási
            szabályok a hatványozás azonosságaivá válnak:{" "}
            <M>{"r_1 e^{i\\varphi_1}\\cdot r_2 e^{i\\varphi_2} = r_1 r_2 e^{i(\\varphi_1+\\varphi_2)}"}</M>.
            Speciálisan <M>{"e^{i\\pi} + 1 = 0"}</M>.
          </p>
        </Kiemelo>

        {/* --- 1.8 --- */}
        <Alcim>1.8 Gyökvonás</Alcim>
        <Proza>
          <p>
            A <M>{"w"}</M> szám a <M>{"z"}</M> <M>{"n"}</M>-edik gyöke, ha{" "}
            <M>{"w^n = z"}</M>. Ez nem egy művelet eredménye, hanem egy <em>egyenlet</em>{" "}
            — és, ami a meglepetés, több megoldása van. Keressük{" "}
            <M>{"w = \\rho(\\cos\\alpha + i\\sin\\alpha)"}</M> alakban, és írjuk fel{" "}
            <M>{"w^n"}</M>-t Moivre-val:
          </p>
        </Proza>
        <MB>{"\\rho^n\\left(\\cos n\\alpha + i\\sin n\\alpha\\right) = r\\left(\\cos\\varphi + i\\sin\\varphi\\right)"}</MB>
        <Proza>
          <p>
            Az abszolút értékek egyenlők: <M>{"\\rho = \\sqrt[n]{r}"}</M> (közönséges
            valós gyök). A szögek viszont csak <strong>a teljes fordulatok erejéig</strong>{" "}
            egyeznek: <M>{"n\\alpha = \\varphi + 2k\\pi"}</M>. Innen{" "}
            <M>{"\\alpha_k = (\\varphi + 2k\\pi)/n"}</M>, és <M>{"k = n"}</M>-nél már
            ugyanoda érünk vissza, mint <M>{"k = 0"}</M>-nál.
          </p>
        </Proza>

        <Kiemelo tipus="definicio" cim="Tétel — gyökvonás">
          <MB>{"\\sqrt[n]{z} = \\sqrt[n]{r}\\left(\\cos\\frac{\\varphi + 2k\\pi}{n} + i\\sin\\frac{\\varphi + 2k\\pi}{n}\\right),\\qquad k = 0, 1, \\dots, n-1"}</MB>
          <p>
            Minden <M>{"z \\ne 0"}</M> számnak pontosan <M>{"n"}</M> darab{" "}
            <M>{"n"}</M>-edik gyöke van. Mind a <M>{"\\sqrt[n]{r}"}</M> sugarú körön
            fekszenek, egymástól <M>{"2\\pi/n"}</M> szögre: egy{" "}
            <strong>szabályos <M>{"n"}</M>-szög</strong> csúcsai. Ez egyben remek
            ellenőrzés is.
          </p>
        </Kiemelo>

        <div className="mt-6">
          <p className="mb-2 text-[11px] font-bold tracking-[0.16em] text-naracs-600 uppercase">Próbáld ki — húzd a z-t, állítsd az n-et</p>
          <GyokFelfedezo />
        </div>

        <KetOszlop>
          <div>
            <Proza>
              <p>
                A <M>{"z^n = 1"}</M> egyenlet megoldásai az <strong>egységgyökök</strong>:{" "}
                <M>{"\\varepsilon_k = \\cos\\frac{2k\\pi}{n} + i\\sin\\frac{2k\\pi}{n}"}</M>.
                Az egységkörbe írt szabályos <M>{"n"}</M>-szög csúcsai, az egyik mindig
                az <M>{"1"}</M>. Ha egy szám <em>egyetlen</em> gyökét ismered, a többit
                az egységgyökökkel szorozva kapod — ez csak forgat.
              </p>
            </Proza>
            <Kiemelo tipus="figyelem" cim="Tiltott lépés">
              <p>
                A <M>{"\\sqrt{x}\\sqrt{y} = \\sqrt{xy}"}</M> azonosság csak nemnegatív
                valósakra igaz. Különben <M>{"-1 = i\\cdot i = \\sqrt{-1}\\sqrt{-1} = \\sqrt{1} = 1"}</M>{" "}
                jönne ki. Komplex gyököt mindig a fenti képlettel számolj. Az egyetlen
                biztonságos rövidítés: <M>{"\\sqrt{-c} = i\\sqrt{c}"}</M>, ha <M>{"c > 0"}</M>.
              </p>
            </Kiemelo>
          </div>
          <AbraKeret szam={3} cim="A hatodik egységgyökök: szabályos hatszög az egységkörön, összegük nulla.">
            <AbraEgyseggyokok />
          </AbraKeret>
        </KetOszlop>

        {/* --- 1.9 --- */}
        <Alcim>1.9 Egyenletek és az algebra alaptétele</Alcim>
        <Proza>
          <p>
            A másodfokú egyenlet megoldóképlete komplex számok körében is változatlan;
            negatív diszkriminánsnál egyszerűen nem állunk meg, hanem{" "}
            <M>{"\\sqrt{-c} = i\\sqrt c"}</M>-t írunk. A gyökök ilyenkor egymás konjugáltjai.
          </p>
        </Proza>
        <Kiemelo tipus="definicio" cim="Az algebra alaptétele (Gauss)">
          <p>
            Minden legalább elsőfokú, komplex együtthatós polinomnak van komplex gyöke;
            egy <M>{"n"}</M>-edfokú polinomnak — multiplicitással számolva —{" "}
            <strong>pontosan <M>{"n"}</M> gyöke</strong> van, és gyöktényezős szorzattá
            bontható. Valós együtthatós polinomnál a nem valós gyökök konjugált
            párokban járnak, ezért <strong>páratlan fokú valós polinomnak mindig van valós gyöke</strong>.
          </p>
        </Kiemelo>
        <Proza>
          <p>
            Ezért érte meg az egész bővítés: a valósak között a gyökök száma esetleges
            volt (az <M>{"x^2-1"}</M>-nek kettő, az <M>{"x^2+1"}</M>-nek nulla), a
            komplexek között mindig annyi, amennyi a fokszám. A{" "}
            <M>{"\\mathbb{C}"}</M> ebben az értelemben teljes — nincs mit tovább bővíteni.
          </p>
        </Proza>
      </Szakasz>

      {/* ==================== KIDOLGOZOTT FELADATOK ==================== */}
      <Szakasz
        id="peldak"
        cimke="2. rész"
        cim="Kidolgozott feladatok"
        bevezeto="Az előadás öt példája, lépésenként. Először mindig próbáld meg magad — a lépések csak akkor érnek valamit, ha van mihez hasonlítanod."
        className="bg-white"
      >
        {/* ---- KF-1 ---- */}
        <KidolgozottFeladat
          jel="KF‑1"
          ido="4 perc"
          forras="Előadás"
          cim="Négy alapművelet algebrai alakban"
          feladat={
            <p>
              Legyen <M>{"z_1 = 4 + 3i"}</M> és <M>{"z_2 = 8 - 5i"}</M>. Számítsd ki a{" "}
              <M>{"z_1 + z_2"}</M>, <M>{"z_1 - z_2"}</M>, <M>{"z_1 z_2"}</M> és{" "}
              <M>{"z_1 / z_2"}</M> értékét algebrai alakban!
            </p>
          }
          tanulsag={
            <p>
              Az összeadás és a kivonás komponensenként megy, a szorzás közönséges
              zárójelfelbontás <M>{"i^2 = -1"}</M>-gyel, az osztás pedig a nevező
              konjugáltjával való bővítés — a nevező mindig <M>{"|z_2|^2"}</M> lesz.
            </p>
          }
        >
          <Lepes cim="Összeg és különbség — komponensenként">
            <MB>{"z_1 + z_2 = (4+8) + (3-5)i = 12 - 2i"}</MB>
            <MB>{"z_1 - z_2 = (4-8) + (3-(-5))i = -4 + 8i"}</MB>
          </Lepes>
          <Lepes cim="Szorzat — zárójelfelbontás">
            <MB>{"z_1 z_2 = (4+3i)(8-5i) = 32 - 20i + 24i - 15i^2"}</MB>
            <p>
              A <M>{"-15i^2"}</M> tagból <M>{"+15"}</M> lesz, mert <M>{"i^2 = -1"}</M>:
            </p>
            <MB>{"z_1 z_2 = 32 + 15 + 4i = 47 + 4i"}</MB>
          </Lepes>
          <Lepes cim="Hányados — bővítés a nevező konjugáltjával">
            <MB>{"\\frac{z_1}{z_2} = \\frac{(4+3i)(8+5i)}{(8-5i)(8+5i)} = \\frac{32 + 20i + 24i + 15i^2}{64 + 25}"}</MB>
            <MB>{"= \\frac{17 + 44i}{89} = \\frac{17}{89} + \\frac{44}{89}\\,i \\approx 0{,}191 + 0{,}494i"}</MB>
            <p>
              A nevező <M>{"8^2 + 5^2 = 89"}</M> valós — ez volt a bővítés célja.
            </p>
          </Lepes>
        </KidolgozottFeladat>

        {/* ---- KF-2 ---- */}
        <KidolgozottFeladat
          jel="KF‑2"
          ido="5 perc"
          forras="Előadás"
          cim="Trigonometrikus alak — három szám, három negyed"
          feladat={
            <p>
              Írd fel trigonometrikus alakban: <M>{"z_1 = 2 + 2i"}</M>,{" "}
              <M>{"z_2 = 1 - \\sqrt3\\,i"}</M>, <M>{"z_3 = 8i"}</M>.
            </p>
          }
          tanulsag={
            <p>
              Ugyanaz a <M>{"\\operatorname{tg}\\varphi"}</M> érték két különböző
              negyedhez tartozhat — a hegyesszöget a számológép adja, a negyedet az
              előjelek. A tengelyre eső számnál ne is számolj tangenst, olvasd le.
            </p>
          }
        >
          <Lepes cim="z₁ = 2 + 2i — I. negyed">
            <MB>{"r = \\sqrt{2^2 + 2^2} = \\sqrt8 = 2\\sqrt2,\\qquad \\operatorname{tg}\\varphi = \\frac{2}{2} = 1 \\Rightarrow \\alpha = 45^\\circ"}</MB>
            <p>
              <M>{"a > 0,\\ b > 0"}</M>: I. negyed, tehát <M>{"\\varphi = 45^\\circ = \\pi/4"}</M>.
            </p>
            <MB>{"z_1 = 2\\sqrt2\\left(\\cos\\frac{\\pi}{4} + i\\sin\\frac{\\pi}{4}\\right)"}</MB>
          </Lepes>
          <Lepes cim="z₂ = 1 − √3 i — IV. negyed">
            <MB>{"r = \\sqrt{1 + 3} = 2,\\qquad \\operatorname{tg}\\varphi = -\\sqrt3 \\Rightarrow \\alpha = 60^\\circ"}</MB>
            <p>
              <M>{"a > 0,\\ b < 0"}</M>: IV. negyed, ezért{" "}
              <M>{"\\varphi = 360^\\circ - 60^\\circ = 300^\\circ = 5\\pi/3"}</M>. (A
              számológép <M>{"-60^\\circ"}</M>-ot mondana — ugyanaz a pont, de nem
              felel meg a <M>{"0 \\le \\varphi < 2\\pi"}</M> megállapodásnak.)
            </p>
            <MB>{"z_2 = 2\\left(\\cos\\frac{5\\pi}{3} + i\\sin\\frac{5\\pi}{3}\\right)"}</MB>
          </Lepes>
          <Lepes cim="z₃ = 8i — a képzetes tengelyen">
            <p>
              Itt <M>{"a = 0"}</M>, a <M>{"b/a"}</M> hányados nem is értelmes. A
              pont a pozitív képzetes tengelyen van: <M>{"r = 8"}</M>,{" "}
              <M>{"\\varphi = \\pi/2"}</M>.
            </p>
            <MB>{"z_3 = 8\\left(\\cos\\frac{\\pi}{2} + i\\sin\\frac{\\pi}{2}\\right)"}</MB>
          </Lepes>
          <Lepes cim="Ellenőrzés — visszaalakítás">
            <p>
              <M>{"2\\cos 300^\\circ = 2\\cdot\\tfrac12 = 1"}</M> ✓ és{" "}
              <M>{"2\\sin 300^\\circ = 2\\cdot(-\\tfrac{\\sqrt3}{2}) = -\\sqrt3"}</M> ✓. Egy
              tízmásodperces visszahelyettesítés minden negyedhibát kiszűr.
            </p>
          </Lepes>
        </KidolgozottFeladat>

        {/* ---- KF-3 ---- */}
        <KidolgozottFeladat
          jel="KF‑3"
          ido="3 perc"
          forras="Előadás"
          cim="Hatványozás a Moivre-képlettel"
          feladat={<p>Számítsd ki <M>{"(1+i)^{10}"}</M>-t!</p>}
          tanulsag={
            <p>
              Tíz zárójelfelbontás helyett három sor. A nagy szöget mindig redukáld{" "}
              <M>{"360^\\circ"}</M> alá, mielőtt a szögfüggvényeket kiszámolod.
            </p>
          }
        >
          <Lepes cim="Trigonometrikus alak">
            <MB>{"1 + i = \\sqrt2\\left(\\cos\\frac{\\pi}{4} + i\\sin\\frac{\\pi}{4}\\right)"}</MB>
          </Lepes>
          <Lepes cim="Moivre">
            <MB>{"(1+i)^{10} = (\\sqrt2)^{10}\\left(\\cos\\frac{10\\pi}{4} + i\\sin\\frac{10\\pi}{4}\\right) = 32\\left(\\cos\\frac{5\\pi}{2} + i\\sin\\frac{5\\pi}{2}\\right)"}</MB>
          </Lepes>
          <Lepes cim="A szög redukálása">
            <p>
              <M>{"\\tfrac{5\\pi}{2} = 2\\pi + \\tfrac{\\pi}{2}"}</M>, a szög tehát
              ugyanaz, mint <M>{"\\pi/2"}</M>:
            </p>
            <MB>{"(1+i)^{10} = 32\\left(\\cos\\frac{\\pi}{2} + i\\sin\\frac{\\pi}{2}\\right) = 32(0 + i) = 32i"}</MB>
          </Lepes>
        </KidolgozottFeladat>

        {/* ---- KF-4 ---- */}
        <KidolgozottFeladat
          jel="KF‑4"
          ido="8 perc"
          forras="Előadás"
          cim="Negyedik gyök — négy megoldás"
          feladat={
            <p>
              Számítsd ki <M>{"\\sqrt[4]{-128 - 128\\sqrt3\\,i}"}</M> összes értékét,
              és add meg őket algebrai alakban!
            </p>
          }
          tanulsag={
            <p>
              A négy szög <M>{"90^\\circ"}</M>-onként követi egymást a 4 sugarú körön:
              szabályos négyzet. Emellett <M>{"w_2 = -w_0"}</M> és{" "}
              <M>{"w_3 = -w_1"}</M> — az átellenes csúcsok egymás ellentettjei. Ha
              nem így jön ki, valahol hiba van.
            </p>
          }
        >
          <Lepes cim="Trigonometrikus alak — III. negyed">
            <MB>{"r = \\sqrt{128^2 + (128\\sqrt3)^2} = 128\\sqrt{1+3} = 256"}</MB>
            <MB>{"\\operatorname{tg}\\varphi = \\frac{-128\\sqrt3}{-128} = \\sqrt3 \\Rightarrow \\alpha = 60^\\circ"}</MB>
            <p>
              <M>{"a < 0,\\ b < 0"}</M>: III. negyed, tehát{" "}
              <M>{"\\varphi = 180^\\circ + 60^\\circ = 240^\\circ = 4\\pi/3"}</M>. (Itt
              buknak el sokan: a számológép <M>{"60^\\circ"}</M>-ot mondana, az I.
              negyedet.)
            </p>
          </Lepes>
          <Lepes cim="A gyökök abszolút értéke">
            <MB>{"\\rho = \\sqrt[4]{256} = 4"}</MB>
          </Lepes>
          <Lepes cim="A gyökök szögei, k = 0, 1, 2, 3">
            <MB>{"\\alpha_k = \\frac{240^\\circ + k\\cdot 360^\\circ}{4} = 60^\\circ + k\\cdot 90^\\circ"}</MB>
            <MB>{"\\alpha_0 = 60^\\circ,\\quad \\alpha_1 = 150^\\circ,\\quad \\alpha_2 = 240^\\circ,\\quad \\alpha_3 = 330^\\circ"}</MB>
          </Lepes>
          <Lepes cim="Algebrai alak">
            <MB>{"w_0 = 4(\\cos 60^\\circ + i\\sin 60^\\circ) = 4\\left(\\tfrac12 + i\\tfrac{\\sqrt3}{2}\\right) = 2 + 2\\sqrt3\\,i"}</MB>
            <MB>{"w_1 = 4(\\cos 150^\\circ + i\\sin 150^\\circ) = -2\\sqrt3 + 2i"}</MB>
            <MB>{"w_2 = 4(\\cos 240^\\circ + i\\sin 240^\\circ) = -2 - 2\\sqrt3\\,i"}</MB>
            <MB>{"w_3 = 4(\\cos 330^\\circ + i\\sin 330^\\circ) = 2\\sqrt3 - 2i"}</MB>
          </Lepes>
          <Lepes cim="Próba">
            <p>
              <M>{"|w_0| = 4"}</M>, <M>{"\\arg w_0 = 60^\\circ"}</M>, tehát{" "}
              <M>{"w_0^4"}</M> abszolút értéke <M>{"4^4 = 256"}</M>, szöge{" "}
              <M>{"4\\cdot 60^\\circ = 240^\\circ"}</M>:
            </p>
            <MB>{"256(\\cos 240^\\circ + i\\sin 240^\\circ) = 256\\left(-\\tfrac12 - i\\tfrac{\\sqrt3}{2}\\right) = -128 - 128\\sqrt3\\,i \\ ✓"}</MB>
          </Lepes>
        </KidolgozottFeladat>

        {/* ---- KF-5 ---- */}
        <KidolgozottFeladat
          jel="KF‑5"
          ido="4 perc"
          forras="Előadás"
          cim="Másodfokú egyenlet negatív diszkriminánssal"
          feladat={<p>Oldd meg a komplex számok halmazán: <M>{"z^2 + 4z + 13 = 0"}</M>.</p>}
          tanulsag={
            <p>
              A megoldóképlet ugyanaz, csak a <M>{"\\sqrt{-36}"}</M>-ot két értéknek
              tekintjük — a <M>{"\\pm"}</M> jel épp ezt fogja össze. A gyökök konjugált
              párt alkotnak, ahogy valós együtthatóknál mindig.
            </p>
          }
        >
          <Lepes cim="Megoldóképlet">
            <MB>{"z_{1,2} = \\frac{-4 \\pm \\sqrt{16 - 52}}{2} = \\frac{-4 \\pm \\sqrt{-36}}{2}"}</MB>
          </Lepes>
          <Lepes cim="A negatív szám gyöke — a gyökvonás tétele szerint">
            <p>
              <M>{"-36 = 36(\\cos\\pi + i\\sin\\pi)"}</M>, tehát <M>{"\\rho = 6"}</M> és{" "}
              <M>{"\\alpha_k = (\\pi + 2k\\pi)/2"}</M>, <M>{"k = 0, 1"}</M>:
            </p>
            <MB>{"w_0 = 6\\left(\\cos\\tfrac{\\pi}{2} + i\\sin\\tfrac{\\pi}{2}\\right) = 6i,\\qquad w_1 = 6\\left(\\cos\\tfrac{3\\pi}{2} + i\\sin\\tfrac{3\\pi}{2}\\right) = -6i"}</MB>
            <p>
              A gyakorlatban elég annyit írni: <M>{"\\sqrt{-36} = 6i"}</M>, a{" "}
              <M>{"\\pm"}</M> gondoskodik a másikról.
            </p>
          </Lepes>
          <Lepes cim="A gyökök">
            <MB>{"z_{1,2} = \\frac{-4 \\pm 6i}{2} = -2 \\pm 3i"}</MB>
          </Lepes>
          <Lepes cim="Ellenőrzés behelyettesítéssel">
            <MB>{"(-2+3i)^2 + 4(-2+3i) + 13 = (4 - 12i - 9) + (-8 + 12i) + 13 = 0 \\ ✓"}</MB>
          </Lepes>
        </KidolgozottFeladat>
      </Szakasz>

      {/* ==================== KALKULÁTOROK ==================== */}
      <Szakasz
        id="kalkulator"
        cimke="3. rész"
        cim="Kalkulátorok"
        bevezeto="Ugyanazok a számítások tetszőleges adatokkal. Használd a házi feladat ellenőrzésére, vagy arra, hogy ráérezz, mi hogyan változik."
      >
        <div className="space-y-8">
          <div>
            <h3 className="mb-2 text-[16px] font-semibold text-petrol-900">Műveletek és alakváltás</h3>
            <p className="mb-3 text-[14px] text-petrol-600">
              Két komplex szám négy alapművelete, a konjugáltak, abszolút értékek és a
              trigonometrikus alakok. Alaphelyzetben a KF‑1 adatai vannak betöltve.
            </p>
            <KomplexMuveletKalk />
          </div>
          <div>
            <h3 className="mb-2 text-[16px] font-semibold text-petrol-900">Hatványozás és gyökvonás</h3>
            <p className="mb-3 text-[14px] text-petrol-600">
              Moivre-képlet és az összes <M>{"n"}</M>-edik gyök táblázatban. Alaphelyzetben a
              KF‑4 feladat száma van betöltve.
            </p>
            <KomplexGyokKalk />
          </div>
        </div>

        <Kiemelo tipus="tipp" cim="Mire használd a kalkulátort">
          <p>
            Arra, hogy <em>ellenőrizz</em>, ne arra, hogy helyetted számoljon. A
            zárthelyin nem lesz nálad — a kalkulátor akkor ér valamit, ha előbb papíron
            megcsinálod a feladatot, és utána nézed meg, egyezik-e.
          </p>
        </Kiemelo>
      </Szakasz>

      {/* ==================== GYAKORLÁS ==================== */}
      <Szakasz
        id="gyakorlas"
        cimke="4. rész"
        cim="Gyakorlás"
        bevezeto="Minden feladat új számokkal generálódik, az „új feladat” gombbal pedig végtelen sokat kaphatsz. A megoldást csak akkor nézd meg, ha már próbálkoztál. A tizedesvesszőt és a pontot is elfogadja."
        className="bg-white"
      >
        <GyakorloSzekcio />

        <Kiemelo tipus="kulcs" cim="Mikor mehetsz tovább">
          <p>
            Akkor vagy készen ezzel a modullal, ha a trigonometrikus alakra hozást öt
            feladatból ötször hibátlanul megcsinálod — a negyedet is —, és a gyökvonásnál
            magadtól rajzolod fel a szabályos sokszöget ellenőrzésképp. A következő
            modulban a térbeli vektorok jönnek: ott ugyanez a „hossz és irány”
            gondolkodás folytatódik, csak eggyel több dimenzióban.
          </p>
        </Kiemelo>
      </Szakasz>
    </>
  );
}
