import { ModulFejlec, SzakaszSav } from "@/components/ModulKeret";
import { Szakasz, Kartya, Kiemelo, AbraKeret, KetOszlop } from "@/components/ui/Elemek";
import { M, MB, KepletDoboz } from "@/components/ui/Keplet";
import { KidolgozottFeladat, Lepes } from "@/components/KidolgozottFeladat";
import FvErtelmezesFelfedezo from "@/components/abrak/FvErtelmezesFelfedezo";
import FvTulajdonsagFelfedezo from "@/components/abrak/FvTulajdonsagFelfedezo";
import FvInverzFelfedezo from "@/components/abrak/FvInverzFelfedezo";
import FvArkuszFelfedezo from "@/components/abrak/FvArkuszFelfedezo";
import FvGorbeFelfedezo from "@/components/abrak/FvGorbeFelfedezo";
import FvHatarertekFelfedezo from "@/components/abrak/FvHatarertekFelfedezo";
import FvSzakadasFelfedezo from "@/components/abrak/FvSzakadasFelfedezo";
import FvBolzanoFelezo from "@/components/abrak/FvBolzanoFelezo";
import FvTalald from "@/components/abrak/FvTalald";
import {
  AbraGaleria,
  AbraHiperbolikus,
  AbraSzendvics,
  AbraSzakadasTipusok,
  AbraInverzTukrozes,
} from "@/components/abrak/FvStatikusAbrak";
import { FvVizsgaloKalk, FvNevezetesKalk } from "@/components/abrak/FvKalk";
import GyakorloSzekcio from "@/components/fuggvenyek/GyakorloSzekcio";
import GyakorloExtra from "@/components/fuggvenyek/GyakorloExtra";
import FilmHatarertek from "@/components/fuggvenyek/FilmHatarertek";
import FilmSzakadas from "@/components/fuggvenyek/FilmSzakadas";
import Kviz from "@/components/Kviz";
import Hibakereso from "@/components/Hibakereso";
import { KVIZ, HIBAK } from "@/components/fuggvenyek/KvizAdatok";
import { modulSlugAlapjan } from "@/lib/oldalterkep";

export const metadata = {
  title: "Függvények, határérték, folytonosság",
  description:
    "Értelmezési tartomány és a négy tiltás, függvénytulajdonságok, inverz, arkusz- és area-függvények, görbék megadási módjai, ε–δ határérték, nevezetes határértékek, folytonosság, Bolzano és Weierstrass — interaktív ábrákkal, kidolgozott feladatokkal és gyakorlással.",
};

const modul = modulSlugAlapjan("/fuggvenyek");

function Alcim({ children }) {
  return <h3 className="mt-10 text-xl font-semibold text-petrol-900">{children}</h3>;
}

function Proza({ children }) {
  return (
    <div className="proza mt-3 text-[15px] leading-relaxed text-petrol-700">{children}</div>
  );
}

function Probald({ cim, children }) {
  return (
    <div className="mt-6">
      <p className="mb-2 text-[11px] font-bold tracking-[0.16em] text-naracs-600 uppercase">{cim}</p>
      {children}
    </div>
  );
}

export default function FuggvenyekOldal() {
  return (
    <>
      <ModulFejlec
        szam={4}
        cim="Függvények, határérték, folytonosság"
        leiras="A sorozatoknál megtanult küszöb-gondolat most valós pontok környezetére költözik. Előbb rendet teszünk a függvények körül — mit szabad betenni, mi jöhet ki, mikor lehet visszafelé kérdezni —, aztán jön a fejezet magja: a határérték ε–δ definíciója, és ami ráépül, a folytonosság."
        tartalom={[
          "Értelmezési tartomány, a négy tiltás",
          "Paritás, periodicitás, inverz",
          "Arkusz- és area-függvények",
          "Görbék: paraméteres és polár alak",
          "ε–δ határérték, nevezetes határértékek",
          "Folytonosság, Bolzano, Weierstrass",
        ]}
      />
      <SzakaszSav szakaszok={modul.szakaszok} />

      {/* ==================== ELMÉLET ==================== */}
      <Szakasz
        id="elmelet"
        cimke="1. rész"
        cim="Elmélet"
        bevezeto="Tizenegy szakasz, egyetlen ívben: a függvény fogalmától a folytonosság két nagy tételéig. Az ábrákat próbáld ki — a paritás tükrözése és az ε–δ sávok többet tanítanak, mint húsz sor szöveg."
      >
        {/* --- 4.1 --- */}
        <h3 className="mt-2 text-xl font-semibold text-petrol-900">
          4.1 A függvény fogalma — és a négy tiltás
        </h3>
        <Proza>
          <p>
            A középiskolából ismerős kép: a függvény egy „gép”, amibe beteszünk egy számot, és kijön
            belőle egy másik. Ez a szemlélet nem rossz, de pontosabban kell fogalmaznunk, mert később
            olyan függvényekkel is dolgozunk, amelyeknek <em>nincs képlete</em> — például a felezéssel
            előállított gyök vagy egy mért terhelésgörbe. A lényeg tehát nem a képlet, hanem a{" "}
            <strong>hozzárendelés</strong>.
          </p>
        </Proza>

        <Kiemelo tipus="definicio" cim="Definíció — függvény, értelmezési tartomány, értékkészlet">
          <p>
            Legyen <M>{"A"}</M> és <M>{"B"}</M> két nemüres halmaz. Ha az <M>{"A"}</M> halmaz{" "}
            <strong>minden</strong> eleméhez hozzárendeljük a <M>{"B"}</M> halmaz{" "}
            <strong>pontosan egy</strong> elemét, akkor egy <M>{"A"}</M>-ból <M>{"B"}</M>-be képező{" "}
            <strong>függvényt</strong> definiálunk:
          </p>
          <MB>{"f:\\ A \\to B,\\qquad y = f(x)."}</MB>
          <p>
            Az <M>{"f"}</M> <strong>értelmezési tartománya</strong> (<M>{"D_f"}</M>) azoknak az
            elemeknek a halmaza, amelyekhez a függvény hozzárendel valamit; az{" "}
            <strong>értékkészlete</strong> pedig azoké, amelyeket ténylegesen fel is vesz:
          </p>
          <MB>{"R_f = \\left\\{\\, y \\in B \\;:\\; \\exists\\, x \\in D_f,\\ f(x) = y \\,\\right\\}."}</MB>
        </Kiemelo>

        <Proza>
          <p>
            A definíció két szava hordozza a lényeget: <strong>minden</strong> <M>{"x\\in A"}</M>
            -hez tartozik érték (nem maradhat ki bemenet), és <strong>pontosan egy</strong> érték
            tartozik hozzá (egy bemenethez nem lehet két kimenet). Ez utóbbi a{" "}
            <strong>függőleges egyenes próba</strong>: egy síkgörbe pontosan akkor lehet függvény
            grafikonja, ha minden függőleges egyenes legfeljebb egy pontban metszi. Ezért nem függvény
            az <M>{"x^2+y^2=1"}</M> körvonal — a felső fele, <M>{"y=\\sqrt{1-x^2}"}</M>, viszont már az.
          </p>
          <p>
            Ebben a félévben szinte kizárólag <strong>valós-valós</strong> függvényekkel dolgozunk. Ha
            egy függvényt csak képlettel adunk meg, a hallgatólagos megállapodás szerint az
            értelmezési tartomány a <strong>lehető legbővebb</strong> valós halmaz, amelyen a képlet
            értelmes. A gyakorlatban négy dolgot kell megnézni — és ez a négy tiltás a{" "}
            <em>legtöbb pontot érő</em> tudás az egész fejezetben.
          </p>
        </Proza>

        <Kartya cimke="Ezt jegyezd meg" cim="A négy tiltás">
          <div className="finom-gorgeto overflow-x-auto">
            <table className="w-full text-[13.5px]">
              <thead className="text-[11px] text-petrol-500 uppercase">
                <tr>
                  <th className="pb-1 text-left font-semibold">Ami korlátoz</th>
                  <th className="pb-1 text-left font-semibold">Feltétel</th>
                  <th className="pb-1 text-left font-semibold">Példa</th>
                </tr>
              </thead>
              <tbody className="text-petrol-700">
                <tr className="border-t border-petrol-100">
                  <td className="py-1.5">nevező</td>
                  <td className="py-1.5">nem lehet nulla</td>
                  <td className="py-1.5">
                    <M>{"\\dfrac{1}{x-1}:\\ x \\ne 1"}</M>
                  </td>
                </tr>
                <tr className="border-t border-petrol-100">
                  <td className="py-1.5">páros gyök</td>
                  <td className="py-1.5">a gyök alatt nemnegatív</td>
                  <td className="py-1.5">
                    <M>{"\\sqrt{x-1}:\\ x \\ge 1"}</M>
                  </td>
                </tr>
                <tr className="border-t border-petrol-100">
                  <td className="py-1.5">logaritmus</td>
                  <td className="py-1.5">
                    az argumentuma <strong>szigorúan</strong> pozitív
                  </td>
                  <td className="py-1.5">
                    <M>{"\\ln(x-1):\\ x > 1"}</M>
                  </td>
                </tr>
                <tr className="border-t border-petrol-100">
                  <td className="py-1.5">arcsin, arccos</td>
                  <td className="py-1.5">
                    az argumentuma <M>{"[-1;\\,1]"}</M>-beli
                  </td>
                  <td className="py-1.5">
                    <M>{"\\arcsin\\dfrac x2:\\ |x| \\le 2"}</M>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Kartya>

        <Probald cim="Próbáld ki — hol NINCS értelmezve?">
          <FvErtelmezesFelfedezo />
        </Probald>

        <Kiemelo tipus="figyelem" cim="A két leggyakoribb csapda">
          <p>
            <strong>1. A logaritmusnál szigorú az egyenlőtlenség.</strong> Az <M>{"\\ln 0"}</M> nem
            értelmezett, tehát <M>{"\\ln(x-2)"}</M> esetén <M>{"x > 2"}</M>, nem <M>{"x\\ge2"}</M>. A
            páros gyöknél viszont a 0 megengedett: <M>{"\\sqrt{x-2}"}</M> esetén <M>{"x\\ge2"}</M>.
          </p>
          <p className="mt-2">
            <strong>2. Ha gyök áll a nevezőben, a két tiltás összeolvad.</strong> Az{" "}
            <M>{"\\frac{1}{\\sqrt{x^2-1}}"}</M> esetén nem elég <M>{"x^2-1\\ge0"}</M>: a nevező sem
            lehet nulla, tehát <M>{"x^2-1>0"}</M>, vagyis <M>{"|x|>1"}</M> — a <M>{"\\pm1"}</M> is
            kiesik.
          </p>
        </Kiemelo>

        <Kiemelo tipus="tipp" cim="Az értékkészlet megkeresésének receptje">
          <p>
            Írd fel az <M>{"y = f(x)"}</M> egyenletet, és fejezd ki belőle <M>{"x"}</M>-et. Amelyik{" "}
            <M>{"y"}</M>-ra az egyenlet megoldható, az benne van az <M>{"R_f"}</M>-ben. Például az{" "}
            <M>{"y = \\frac{1}{x-1}"}</M> egyenletből <M>{"x = 1+\\frac1y"}</M>, ami minden{" "}
            <M>{"y \\ne 0"}</M> esetén megoldható, tehát <M>{"R_f = \\mathbb{R}\\setminus\\{0\\}"}</M>{" "}
            — a nullát a függvény soha nem veszi fel, hiszen egy tört csak akkor nulla, ha a számlálója
            az.
          </p>
        </Kiemelo>

        <Proza>
          <p>
            Végül két „képlet nélküli” függvény, amelyek végig velünk maradnak. Az{" "}
            <strong>előjelfüggvény</strong> a <M>{"\\operatorname{sgn} x"}</M>: értéke <M>{"-1"}</M>,
            ha <M>{"x<0"}</M>, <M>{"0"}</M>, ha <M>{"x=0"}</M>, és <M>{"1"}</M>, ha <M>{"x>0"}</M>. Az{" "}
            <strong>egészrész</strong>, <M>{"[x]"}</M>, az <M>{"x"}</M>-nél nem nagyobb legnagyobb
            egész (<M>{"[-2{,}7] = -3"}</M>, nem <M>{"-2"}</M>!), a <strong>törtrész</strong> pedig{" "}
            <M>{"\\{x\\} = x - [x]"}</M>. Mindkettő értelmezési tartománya az egész{" "}
            <M>{"\\mathbb{R}"}</M>, az értékkészletük viszont meglepő: az elsőé három elem, a
            másodiké <M>{"\\mathbb{Z}"}</M>.
          </p>
        </Proza>

        {/* --- 4.2 --- */}
        <Alcim>4.2 Függvénytulajdonságok: monotonitás, paritás, periodicitás, korlátosság</Alcim>
        <Proza>
          <p>
            Ezek a „jelzők” nem öncélúak: a monotonitásból az inverz létezése következik, a
            paritásból és a periodicitásból pedig rengeteg számolást lehet megspórolni — elég a
            függvényt a tartomány egy darabján ismerni.
          </p>
        </Proza>

        <Kiemelo tipus="definicio" cim="Definíciók — a négy tulajdonság">
          <p>
            <strong>Szigorúan monoton növekvő</strong>, ha <M>{"x_1 < x_2"}</M> esetén{" "}
            <M>{"f(x_1) < f(x_2)"}</M>; tág értelemben monoton növekvő, ha csak{" "}
            <M>{"f(x_1) \\le f(x_2)"}</M> (lehetnek vízszintes szakaszai).
          </p>
          <p className="mt-2">
            <strong>Páros</strong>, ha <M>{"D_f"}</M> szimmetrikus az origóra és{" "}
            <M>{"f(-x) = f(x)"}</M> — a grafikon az <M>{"y"}</M> tengelyre szimmetrikus.{" "}
            <strong>Páratlan</strong>, ha <M>{"f(-x) = -f(x)"}</M> — a grafikon az origóra
            szimmetrikus.
          </p>
          <p className="mt-2">
            <strong>Periodikus</strong>, ha van olyan <M>{"p>0"}</M>, hogy <M>{"f(x+p) = f(x)"}</M>{" "}
            minden <M>{"x\\in D_f"}</M> esetén; a legkisebb ilyen <M>{"p"}</M> az{" "}
            <strong>alapperiódus</strong>. <strong>Korlátos</strong>, ha van olyan <M>{"M>0"}</M>,
            hogy <M>{"|f(x)| \\le M"}</M> minden <M>{"x"}</M>-re.
          </p>
          <p className="mt-2">
            <strong>Kölcsönösen egyértelmű</strong> (injektív), ha különböző helyeken különböző értéket
            vesz fel: <M>{"x_1 \\ne x_2 \\Rightarrow f(x_1) \\ne f(x_2)"}</M>.
          </p>
        </Kiemelo>

        <Probald cim="Próbáld ki — tükrözés és vonal-próba">
          <FvTulajdonsagFelfedezo />
        </Probald>

        <Proza>
          <p>
            Így használd az ábrát. A <strong>paritáshoz</strong> kapcsold be a tükrözést: ha az{" "}
            <M>{"f(-x)"}</M> szaggatott görbe <em>pontosan</em> ráfekszik az eredetire, a függvény
            páros; ha a <M>{"-f(-x)"}</M> fekszik rá, páratlan. A <strong>kölcsönös
            egyértelműséghez</strong> húzd a piros vízszintes vonalat: ha találsz olyan magasságot,
            ahol két metszéspont van, a függvény nem kölcsönösen egyértelmű — tehát nincs inverze.
          </p>
        </Proza>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 [&>*]:min-w-0">
          <Kartya cimke="Paritás" cim="Melyik micsoda?">
            <p className="text-[13.5px] leading-relaxed text-petrol-600">
              <strong>Páros:</strong> <M>{"x^2"}</M>, <M>{"x^4"}</M>, <M>{"\\cos x"}</M>,{" "}
              <M>{"|x|"}</M>, <M>{"\\operatorname{ch} x"}</M>
            </p>
            <p className="mt-1 text-[13.5px] leading-relaxed text-petrol-600">
              <strong>Páratlan:</strong> <M>{"x"}</M>, <M>{"x^3"}</M>, <M>{"\\frac1x"}</M>,{" "}
              <M>{"\\sin x"}</M>, <M>{"\\operatorname{tg} x"}</M>, <M>{"\\operatorname{sh} x"}</M>,{" "}
              <M>{"\\arcsin x"}</M>
            </p>
            <p className="mt-1 text-[13.5px] leading-relaxed text-petrol-600">
              <strong>Egyik sem:</strong> <M>{"x^2+x"}</M>, <M>{"e^x"}</M>, <M>{"\\ln x"}</M>,{" "}
              <M>{"\\arccos x"}</M>
            </p>
            <p className="mt-2 text-[13px] text-petrol-500">
              Az elnevezés onnan jön, hogy az <M>{"x^n"}</M> pontosan akkor páros (páratlan)
              függvény, ha <M>{"n"}</M> páros (páratlan) szám. A szorzat paritása a „szorzatszabályt”
              követi: páratlan · páratlan = páros, ezért <M>{"x\\sin x"}</M> <strong>páros</strong>.
            </p>
          </Kartya>
          <Kartya cimke="Kapcsolat" cim="Monotonitás és inverz">
            <MB>{"\\text{szig. monoton} \\Rightarrow \\text{kölcs. egyértelmű} \\Rightarrow \\exists f^{-1}"}</MB>
            <p className="mt-2 text-[13.5px] leading-relaxed text-petrol-600">
              A nyilak <strong>nem fordíthatók meg</strong>. Az <M>{"f(x)=1/x"}</M> kölcsönösen
              egyértelmű a <M>{"\\mathbb{R}\\setminus\\{0\\}"}</M> halmazon, mégsem monoton ott: az{" "}
              <M>{"x_1=-1 < x_2 = 1"}</M> párra <M>{"f(x_1) = -1 < 1 = f(x_2)"}</M>, pedig mindkét ágon
              külön-külön csökken.
            </p>
            <p className="mt-2 text-[13px] text-petrol-500">
              Ezért mondjuk mindig: a monotonitás egy <em>halmazhoz</em> tartozik. A két ágat nem
              szabad összemosni.
            </p>
          </Kartya>
        </div>

        <Kiemelo tipus="figyelem" cim="A tangens alapperiódusa fele a szinuszénak">
          <p>
            Igaz, hogy <M>{"\\operatorname{tg}(x+2\\pi) = \\operatorname{tg} x"}</M>, de ez nem a{" "}
            <em>legkisebb</em> periódus. Ez a különbség az egyenletmegoldásnál számít: a tangenses
            egyenletnél <M>{"+k\\pi"}</M>-t írunk, a szinuszosnál <M>{"+2k\\pi"}</M>-t. És vigyázz:
            attól, hogy szinusz szerepel egy képletben, még nem lesz periodikus — az{" "}
            <M>{"x\\sin x"}</M> például nem az, mert a kilengések egyre nagyobbak.
          </p>
        </Kiemelo>

        {/* --- 4.3 --- */}
        <Alcim>4.3 Az inverz függvény</Alcim>
        <Proza>
          <p>
            Az inverz a „visszafelé kérdezés”: ha az <M>{"f"}</M> gép az <M>{"x"}</M>-ből{" "}
            <M>{"y"}</M>-t csinál, az inverz gép az <M>{"y"}</M>-ból csinálja vissza az{" "}
            <M>{"x"}</M>-et. Ez csak akkor egyértelmű, ha a gép nem „mosott össze” két bemenetet —
            vagyis ha <M>{"f"}</M> kölcsönösen egyértelmű. Mérnöki nyelven: a kalibrációs görbéből
            csak akkor lehet visszaolvasni a mért mennyiséget, ha a görbe nem fordul vissza.
          </p>
        </Proza>

        <Kiemelo tipus="definicio" cim="Definíció — inverz függvény">
          <p>
            Legyen <M>{"f"}</M> kölcsönösen egyértelmű. Az <M>{"f"}</M> <strong>inverze</strong> az az{" "}
            <M>{"f^{-1}"}</M> függvény, amely minden <M>{"y \\in R_f"}</M> értékhez azt az egyetlen{" "}
            <M>{"x \\in D_f"}</M> értéket rendeli, amelyre <M>{"f(x)=y"}</M>:
          </p>
          <MB>{"y = f(x) \\quad \\Longleftrightarrow \\quad x = f^{-1}(y)."}</MB>
          <p>
            Ekkor <M>{"D_{f^{-1}} = R_f"}</M> és <M>{"R_{f^{-1}} = D_f"}</M>, továbbá{" "}
            <M>{"f^{-1}(f(x)) = x"}</M> és <M>{"f(f^{-1}(y)) = y"}</M>.
          </p>
        </Kiemelo>

        <Kiemelo tipus="kulcs" cim="A számolás receptje — négy lépés">
          <p>
            <strong>1.</strong> Ellenőrizd a kölcsönös egyértelműséget; ha kell, szűkíts le egy ágra. ·{" "}
            <strong>2.</strong> Írd fel az <M>{"y=f(x)"}</M> egyenletet, és fejezd ki belőle{" "}
            <M>{"x"}</M>-et. · <strong>3.</strong> Cseréld fel a betűket (ez csak kozmetika). ·{" "}
            <strong>4.</strong> <strong>Mindig add meg</strong> az inverz értelmezési tartományát és
            értékkészletét is — ezen szokott a legtöbb pont múlni.
          </p>
        </Kiemelo>

        <Probald cim="Próbáld ki — a tükrözés az y = x egyenesre">
          <FvInverzFelfedezo />
        </Probald>

        <AbraKeret
          szam="4.1"
          cim="Balra: az x³ és a köbgyök egymás tükörképei, leszűkítés nélkül. Jobbra: az x² csak az x ≥ 0 ágon invertálható, és a tükrözés az (a; b) pontból (b; a)-t csinál."
        >
          <AbraInverzTukrozes />
        </AbraKeret>

        <Kiemelo tipus="figyelem" cim="Az f⁻¹ jelölés NEM reciprok">
          <p>
            Az <M>{"f^{-1}(x)"}</M> az inverz függvény, <strong>nem</strong> az{" "}
            <M>{"\\frac{1}{f(x)}"}</M>. Az <M>{"f(x)=x^3"}</M> inverze <M>{"\\sqrt[3]{x}"}</M>, nem{" "}
            <M>{"x^{-3}"}</M>. A trigonometriában ezért is jobb az <M>{"\\arcsin"}</M> jelölés a{" "}
            <M>{"\\sin^{-1}"}</M>-nél. Az ellenőrzésnél pedig ne egyetlen ponttal próbálkozz: a
            fixpontokon a hibás képlet is „átmegy”.
          </p>
        </Kiemelo>

        {/* --- 4.4 --- */}
        <Alcim>4.4 Az elemi függvények áttekintése</Alcim>
        <Proza>
          <p>
            <strong>Elemi függvénynek</strong> nevezzük azokat, amelyeket egy alapkészletből építünk
            fel véges sok művelettel (összeadás, szorzás, osztás, összetétel, invertálás). Ez a
            készlet a félév egész további részében a „szótárunk” — a deriválási és integrálási
            táblázatok is ezekre épülnek.
          </p>
        </Proza>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 [&>*]:min-w-0">
          <Kartya cimke="1. család" cim="Algebrai függvények">
            <p className="text-[13.5px] leading-relaxed text-petrol-600">
              Csak a négy alapművelet és a gyökvonás szerepel bennük.
            </p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-petrol-700">
              <strong>racionális egész</strong> (polinom): <M>{"3x^2-5x+2"}</M> ·{" "}
              <strong>racionális tört</strong>: <M>{"\\frac{x+1}{x^2-4}"}</M> ·{" "}
              <strong>irracionális</strong>: <M>{"\\sqrt{x^2+1}"}</M>
            </p>
            <p className="mt-2 text-[13px] text-petrol-500">
              Az <M>{"x^n"}</M> páros <M>{"n"}</M>-re páros függvény, páratlan <M>{"n"}</M>-re
              páratlan és szigorúan növő. Általános valós <M>{"\\mu"}</M> kitevőre az{" "}
              <M>{"x^{\\mu} = e^{\\mu\\ln x}"}</M> definícióval dolgozunk — ez csak <M>{"x>0"}</M>{" "}
              esetén értelmes.
            </p>
          </Kartya>
          <Kartya cimke="2. család" cim="Transzcendens függvények">
            <p className="text-[13.5px] leading-relaxed text-petrol-600">
              Nem írhatók fel véges sok alapművelettel és gyökvonással.
            </p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-petrol-700">
              <strong>exponenciális</strong> <M>{"a^x"}</M> · <strong>logaritmus</strong>{" "}
              <M>{"\\log_a x"}</M> · <strong>trigonometrikus</strong> és inverzeik (arkuszok) ·{" "}
              <strong>hiperbolikus</strong> és inverzeik (areák)
            </p>
            <MB>{"a^{x+y}=a^xa^y,\\qquad \\log_a(xy)=\\log_a x+\\log_a y"}</MB>
            <MB>{"\\log_a x^{\\mu} = \\mu\\log_a x,\\qquad \\log_a x = \\frac{\\ln x}{\\ln a}"}</MB>
          </Kartya>
        </div>

        <AbraKeret
          szam="4.2"
          cim="Az elemi függvények galériája. A folytonos zöld és a szaggatott narancs görbe mindig egy „rokonpárt” mutat — érdemes a különbségeket megjegyezni, mert a felismerésen sok múlik."
        >
          <AbraGaleria />
        </AbraKeret>

        <Kiemelo tipus="figyelem" cim="A logaritmus azonosságai nem „ingyen” igazak">
          <p>
            A <M>{"\\log_a(xy) = \\log_a x + \\log_a y"}</M> szabály csak <M>{"x>0"}</M>{" "}
            <strong>és</strong> <M>{"y>0"}</M> esetén alkalmazható. Az{" "}
            <M>{"\\ln(x^2) = 2\\ln x"}</M> átalakítás <M>{"x<0"}</M> esetén hibás: a bal oldal ott is
            értelmes, a jobb nem. Helyesen <M>{"\\ln(x^2) = 2\\ln|x|"}</M>.
          </p>
        </Kiemelo>

        {/* --- 4.5 --- */}
        <Alcim>4.5 Trigonometrikus függvények és inverzeik</Alcim>
        <Proza>
          <p>
            Egyik trigonometrikus függvény sem kölcsönösen egyértelmű, hiszen periodikusak: a{" "}
            <M>{"\\sin x = \\frac12"}</M> egyenletnek végtelen sok megoldása van. Inverzet tehát csak
            úgy kaphatunk, ha a függvényt <strong>leszűkítjük</strong> egy olyan intervallumra, amelyen
            már szigorúan monoton. A választás konvenció, de nem önkényes: az intervallumot úgy
            választjuk, hogy a függvény ott szigorúan monoton legyen, az <strong>egész
            értékkészletét</strong> felvegye, és lehetőleg a nulla közelében legyen. Ezt hívjuk{" "}
            <strong>főágnak</strong>.
          </p>
        </Proza>

        <Kiemelo tipus="definicio" cim="A négy arkuszfüggvény">
          <p>
            A <M>{"\\sin x"}</M> a <M>{"\\left[-\\frac{\\pi}{2};\\ \\frac{\\pi}{2}\\right]"}</M>{" "}
            intervallumon szigorúan nő; itt vett inverze az <strong>arkusz szinusz</strong>. A{" "}
            <M>{"\\cos x"}</M> a <M>{"[0;\\ \\pi]"}</M>-n szigorúan csökken; inverze az{" "}
            <strong>arkusz koszinusz</strong>.
          </p>
          <MB>{"\\arcsin x:\\ D=[-1;1],\\ R=\\left[-\\tfrac{\\pi}{2};\\tfrac{\\pi}{2}\\right];\\qquad \\arccos x:\\ D=[-1;1],\\ R=[0;\\pi]"}</MB>
          <MB>{"\\operatorname{arctg} x:\\ D=\\mathbb{R},\\ R=\\left(-\\tfrac{\\pi}{2};\\tfrac{\\pi}{2}\\right);\\qquad \\operatorname{arcctg} x:\\ D=\\mathbb{R},\\ R=(0;\\pi)"}</MB>
        </Kiemelo>

        <Probald cim="Próbáld ki — egy szám vagy végtelen sok megoldás?">
          <FvArkuszFelfedezo />
        </Probald>

        <Kiemelo tipus="figyelem" cim="Az arkuszfüggvény EGY számot ad vissza, nem az összes megoldást">
          <p>
            Az <M>{"\\arcsin\\frac12 = \\frac{\\pi}{6}"}</M>, pont. Ha viszont a{" "}
            <M>{"\\sin x = \\frac12"}</M> <strong>egyenletet</strong> kell megoldani, a periodicitás és
            a szimmetria miatt minden megoldást fel kell sorolni:
          </p>
          <MB>{"x = \\frac{\\pi}{6}+2k\\pi \\qquad \\text{vagy} \\qquad x = \\frac{5\\pi}{6}+2k\\pi,\\qquad k\\in\\mathbb{Z}."}</MB>
          <p>
            És ne feledd: az <M>{"\\arcsin"}</M> és az <M>{"\\operatorname{arctg}"}</M>{" "}
            <strong>páratlan</strong>, az <M>{"\\arccos"}</M> és az <M>{"\\operatorname{arcctg}"}</M>{" "}
            viszont <strong>nem</strong>:
          </p>
          <MB>{"\\arcsin(-x) = -\\arcsin x,\\qquad \\arccos(-x) = \\pi - \\arccos x."}</MB>
        </Kiemelo>

        <Kiemelo tipus="tipp" cim="Vegyes összetételek — a háromszög-trükk">
          <p>
            A <M>{"\\cos(\\arcsin x)"}</M> típusú kifejezéseknél nevezd el a belső értéket:{" "}
            <M>{"\\alpha = \\arcsin x"}</M>. Ekkor <M>{"\\sin\\alpha = x"}</M>, és a{" "}
            <M>{"\\sin^2+\\cos^2=1"}</M> azonosságból <M>{"\\cos\\alpha = \\pm\\sqrt{1-x^2}"}</M>. Az{" "}
            <strong>előjelet az értékkészlet dönti el</strong>: mivel{" "}
            <M>{"-\\frac{\\pi}{2}\\le\\alpha\\le\\frac{\\pi}{2}"}</M>, a koszinusz nemnegatív, tehát a{" "}
            <M>{"+"}</M> jel érvényes.
          </p>
          <MB>{"\\cos(\\arcsin x) = \\sqrt{1-x^2},\\qquad \\sin(\\arccos x) = \\sqrt{1-x^2},\\qquad \\cos(\\operatorname{arctg} x) = \\frac{1}{\\sqrt{1+x^2}}"}</MB>
        </Kiemelo>

        {/* --- 4.6 --- */}
        <Alcim>4.6 Hiperbolikus függvények és az area-inverzek</Alcim>
        <Kiemelo tipus="definicio" cim="Definíció — hiperbolikus függvények">
          <MB>{"\\operatorname{sh} x = \\frac{e^x-e^{-x}}{2},\\qquad \\operatorname{ch} x = \\frac{e^x+e^{-x}}{2}"}</MB>
          <MB>{"\\operatorname{th} x = \\frac{\\operatorname{sh} x}{\\operatorname{ch} x} = \\frac{e^x-e^{-x}}{e^x+e^{-x}},\\qquad \\operatorname{cth} x = \\frac{1}{\\operatorname{th} x}"}</MB>
          <p>
            Nevük szinusz-, koszinusz-, tangens- és kotangens hiperbolikusz (angolszász jelöléssel{" "}
            <M>{"\\sinh,\\ \\cosh,\\ \\tanh,\\ \\coth"}</M>).
          </p>
        </Kiemelo>

        <AbraKeret
          szam="4.3"
          cim="Balra a sh és a ch a két „félexponenciálissal”, amelyekből összeállnak. Középen a th és a cth az y = ±1 aszimptotákkal. Alul a láncgörbe — és mellette szaggatottan az a parabola, amellyel gyakran összetévesztik."
        >
          <AbraHiperbolikus />
        </AbraKeret>

        <KetOszlop>
          <div>
            <Kiemelo tipus="kulcs" cim="Az alapazonosság és társai">
              <MB>{"\\operatorname{ch}^2 x - \\operatorname{sh}^2 x = 1"}</MB>
              <MB>{"\\operatorname{sh} 2x = 2\\operatorname{sh} x\\operatorname{ch} x,\\qquad \\operatorname{ch} 2x = \\operatorname{ch}^2 x + \\operatorname{sh}^2 x"}</MB>
              <p>
                Az első igazolása egy sor: a két négyzet különbsége{" "}
                <M>{"\\frac{(e^{2x}+2+e^{-2x})-(e^{2x}-2+e^{-2x})}{4} = 1"}</M>.
              </p>
            </Kiemelo>
            <Proza>
              <p>
                <strong>Miért „hiperbolikus”?</strong> Mert a <M>{"(\\cos t;\\,\\sin t)"}</M> pont az{" "}
                <M>{"x^2+y^2=1"}</M> egységkörön fut, a <M>{"(\\operatorname{ch} t;\\,\\operatorname{sh} t)"}</M>{" "}
                pont pedig az <M>{"x^2-y^2=1"}</M> <strong>egységhiperbola</strong> jobb ágán. És
                figyeld meg: <M>{"e^x = \\operatorname{ch} x + \\operatorname{sh} x"}</M> — a{" "}
                <M>{"\\operatorname{ch}"}</M> az <M>{"e^x"}</M> páros, a <M>{"\\operatorname{sh}"}</M>{" "}
                a páratlan része.
              </p>
            </Proza>
          </div>
          <div>
            <Kiemelo tipus="kulcs" cim="Az area-függvények zárt alakja">
              <MB>{"\\operatorname{arsh} x = \\ln\\left(x+\\sqrt{x^2+1}\\right),\\quad x\\in\\mathbb{R}"}</MB>
              <MB>{"\\operatorname{arch} x = \\ln\\left(x+\\sqrt{x^2-1}\\right),\\quad x\\ge1"}</MB>
              <MB>{"\\operatorname{arth} x = \\tfrac12\\ln\\frac{1+x}{1-x},\\quad |x|<1"}</MB>
            </Kiemelo>
            <Proza>
              <p>
                <strong>Az arsh levezetése.</strong> Legyen <M>{"\\operatorname{sh} y = x"}</M>, azaz{" "}
                <M>{"e^y - e^{-y} = 2x"}</M>. Szorozzunk be <M>{"e^y"}</M>-nal (ez pozitív, tehát nem
                vezet hamis gyökhöz): <M>{"(e^y)^2 - 2x e^y - 1 = 0"}</M>, innen{" "}
                <M>{"e^y = x \\pm \\sqrt{x^2+1}"}</M>. Mivel <M>{"e^y>0"}</M> és{" "}
                <M>{"\\sqrt{x^2+1}>|x|"}</M>, csak a <M>{"+"}</M> jel jöhet szóba. Ellenőrzés:{" "}
                <M>{"\\operatorname{arsh} 0 = \\ln 1 = 0"}</M> ✓
              </p>
              <p>
                Számpéldák: <M>{"\\operatorname{arsh} 1 = \\ln(1+\\sqrt2) \\approx 0{,}8814"}</M>,{" "}
                <M>{"\\operatorname{arsh} 2 = \\ln(2+\\sqrt5) \\approx 1{,}4436"}</M>,{" "}
                <M>{"\\operatorname{arth}\\frac12 = \\frac12\\ln3 \\approx 0{,}5493"}</M>.
              </p>
            </Proza>
          </div>
        </KetOszlop>

        <Kiemelo tipus="tipp" cim="Mérnöki jelentés: a láncgörbe">
          <p>
            A két végén felfüggesztett, saját súlyával terhelt kötél alakja az{" "}
            <M>{"y = a\\operatorname{ch}\\frac{x}{a}"}</M> <strong>láncgörbe</strong> — nem parabola,
            bár nagyon hasonlít rá. Ez a függőhíd-kábelek, a nagyfeszültségű vezetékek és a
            felsővezetékek alakja; a <M>{"a"}</M> paraméter a kötélerő és a fajlagos súly hányadosa.
            (A függőhíd <em>fő</em>kábele viszont, ha a pályaszerkezet súlya dominál, tényleg
            parabola — a különbség attól függ, mi terheli.)
          </p>
        </Kiemelo>

        <Kiemelo tipus="figyelem" cim="Hol tér el a trigonometriától?">
          <MB>{"\\cos^2 x + \\sin^2 x = 1 \\quad \\text{de} \\quad \\operatorname{ch}^2 x - \\operatorname{sh}^2 x = 1"}</MB>
          <MB>{"\\cos 2x = \\cos^2 x - \\sin^2 x \\quad \\text{de} \\quad \\operatorname{ch} 2x = \\operatorname{ch}^2 x + \\operatorname{sh}^2 x"}</MB>
          <p>
            Az <strong>Osborn-szabály</strong>: a trigonometrikus azonosságból úgy kapjuk a
            hiperbolikusat, hogy <em>két szinusz szorzata mellett előjelet váltunk</em>. A{" "}
            <M>{"\\operatorname{sh} 2x = 2\\operatorname{sh} x\\operatorname{ch} x"}</M> képletben
            nincs két szinusz szorzata, ezért ott nincs előjelváltás.
          </p>
        </Kiemelo>

        {/* --- 4.7 --- */}
        <Alcim>4.7 Görbék megadási módjai</Alcim>
        <Proza>
          <p>
            Eddig grafikonokról beszéltünk: <M>{"y=f(x)"}</M> alakú görbékről. A mérnöki gyakorlatban
            azonban rengeteg olyan görbe fordul elő — körív, ellipszis, fogaskerékprofil, útpálya
            átmeneti íve —, amely nem ilyen. Ezért négyféle megadási móddal dolgozunk.
          </p>
        </Proza>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 [&>*]:min-w-0">
          <Kartya cimke="1–2. mód" cim="Explicit és implicit">
            <p className="text-[13.5px] leading-relaxed text-petrol-600">
              <strong>Explicit:</strong> <M>{"y=f(x)"}</M> — az <M>{"y"}</M>-t közvetlenül kifejezzük.
              Előnye, hogy azonnal látszanak a függvénytulajdonságok; hátránya, hogy sok görbe nem
              írható le így.
            </p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-petrol-600">
              <strong>Implicit:</strong> <M>{"F(x,\\,y) = 0"}</M> — csak az összefüggést adjuk meg. A
              kúpszeletek így a legszebbek:
            </p>
            <MB>{"x^2+y^2=r^2,\\qquad \\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1,\\qquad \\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1"}</MB>
          </Kartya>
          <Kartya cimke="3–4. mód" cim="Paraméteres és polár">
            <p className="text-[13.5px] leading-relaxed text-petrol-600">
              <strong>Paraméteres:</strong> <M>{"x=x(t)"}</M>, <M>{"y=y(t)"}</M>. Szemléletesen a{" "}
              <M>{"t"}</M> az <em>idő</em>, a görbe pedig egy mozgó pont pályája.
            </p>
            <MB>{"\\text{kör: } x=R\\cos t,\\ y=R\\sin t;\\qquad \\text{ellipszis: } x=a\\cos t,\\ y=b\\sin t"}</MB>
            <MB>{"\\text{hiperbola jobb ága: } x=a\\operatorname{ch} t,\\ y=b\\operatorname{sh} t"}</MB>
            <p className="mt-1 text-[13.5px] leading-relaxed text-petrol-600">
              <strong>Polár:</strong> <M>{"r = r(\\varphi)"}</M>, ahol{" "}
              <M>{"x=r\\cos\\varphi"}</M>, <M>{"y=r\\sin\\varphi"}</M>.
            </p>
          </Kartya>
        </div>

        <Probald cim="Próbáld ki — rajzold ki a görbét a paraméterrel">
          <FvGorbeFelfedezo />
        </Probald>

        <Kiemelo tipus="definicio" cim="A ciklois">
          <p>
            Az <M>{"R"}</M> sugarú, csúszásmentesen guruló kör kerületének egy rögzített pontja által
            leírt pálya. Ha a kör <M>{"t"}</M> szöggel fordult el, a középpontja az{" "}
            <M>{"(Rt;\\,R)"}</M> pontban van, a jelölt pont pedig ehhez képest{" "}
            <M>{"(-R\\sin t;\\,-R\\cos t)"}</M> helyzetben:
          </p>
          <MB>{"x = R(t-\\sin t),\\qquad y = R(1-\\cos t),\\qquad t \\ge 0."}</MB>
          <p>
            A ciklois két klasszikus szélsőérték-feladat megoldása: ez a{" "}
            <strong>brachisztochron</strong> (az a lejtőalak, amelyen a golyó a leggyorsabban gurul le
            két pont között — <em>nem</em> az egyenes!), és egyúttal <strong>tautochron</strong> is
            (bárhonnan indítva ugyanannyi idő alatt ér le a legalsó pontba).
          </p>
        </Kiemelo>

        <Kiemelo tipus="tipp" cim="A kétféle spirál különbsége">
          <p>
            Az <strong>Arkhimédész-spirálnál</strong> (<M>{"r = a\\varphi"}</M>) a menetek távolsága{" "}
            <strong>állandó</strong> — ilyen a feltekert kötél, a hanglemez barázdája vagy a csavarvonal
            vetülete. A <strong>logaritmikus spirálnál</strong> (<M>{"r = e^{a\\varphi}"}</M>) a menetek
            távolsága <strong>mértani sorozat</strong> szerint nő, ezért a görbe „önmagához hasonló”:
            bármilyen nagyításban ugyanúgy néz ki. Ezért találjuk meg a csigaházban, a ciklonok
            felhőképében és a galaxisok karjaiban.
          </p>
        </Kiemelo>

        {/* --- 4.8 --- */}
        <Alcim>4.8 A függvény határértéke</Alcim>
        <Proza>
          <p>
            Nézzük az <M>{"f(x) = \\frac{x^2-4}{x-2}"}</M> függvényt. Az <M>{"x=2"}</M> helyen ez nem
            értelmes (<M>{"\\frac00"}</M>). De mi történik a <em>közelében</em>? Ha{" "}
            <M>{"x = 1{,}99"}</M>, akkor <M>{"f(x) = 3{,}99"}</M>; ha <M>{"x = 2{,}001"}</M>, akkor{" "}
            <M>{"f(x) = 4{,}001"}</M>. Úgy tűnik, a függvényértékek 4-hez tartanak — annak ellenére,
            hogy a 2 helyen a függvény nincs értelmezve.
          </p>
          <p>
            Ez a határérték alapgondolata:{" "}
            <strong>
              nem az érdekel, mi történik <M>{"x_0"}</M>-ban, hanem az, hogy mihez közelítenek az
              értékek <M>{"x_0"}</M> közelében
            </strong>
            . A fogalom nélkül a differenciálhányados, az integrál és a sorösszeg — gyakorlatilag az
            egész analízis — megfogalmazhatatlan volna. A sorozatoknál megtanult ε-sáv képe most
            majdnem változatlanul köszön vissza: csak az indexek helyett valós pontok környezetét
            nézzük.
          </p>
        </Proza>

        <Kiemelo tipus="definicio" cim="Definíció — a határérték pontos alakja">
          <p>
            Az <M>{"f"}</M> függvénynek az <M>{"x_0"}</M> helyen a határértéke az <M>{"A"}</M> szám,
            ha <strong>minden</strong> <M>{"\\varepsilon>0"}</M> számhoz <strong>létezik</strong>{" "}
            olyan <M>{"\\delta>0"}</M>, hogy minden <M>{"x\\in D_f"}</M> esetén
          </p>
          <MB>{"0 < |x-x_0| < \\delta \\quad \\Longrightarrow \\quad |f(x)-A| < \\varepsilon."}</MB>
          <p>
            Jelölés: <M>{"\\lim\\limits_{x\\to x_0} f(x) = A"}</M>.
          </p>
        </Kiemelo>

        <Probald cim="Próbáld ki — szűkítsd a sávot, keresd a deltát">
          <FvHatarertekFelfedezo />
        </Probald>

        <Proza>
          <p>
            A definícióban minden szónak súlya van. A <strong>„minden ε-hoz”</strong> azt jelenti, hogy
            az ellenfél adja meg, milyen pontosan akarja megközelíteni <M>{"A"}</M>-t; a{" "}
            <strong>„létezik δ”</strong> a mi válaszunk arra, milyen közel kell mennünk{" "}
            <M>{"x_0"}</M>-hoz; a <strong><M>{"0<|x-x_0|"}</M></strong> feltétel pedig{" "}
            <strong>kizárja</strong> az <M>{"x=x_0"}</M> esetet — ezért lehet határértéke egy
            függvénynek ott is, ahol nincs értelmezve.
          </p>
        </Proza>

        <KetOszlop>
          <div>
            <Kiemelo tipus="definicio" cim="Átviteli elv">
              <p>
                A <M>{"\\lim\\limits_{x\\to x_0} f(x) = A"}</M> egyenlőség pontosan akkor teljesül, ha{" "}
                <strong>minden</strong> olyan <M>{"x_n"}</M> sorozatra, amelyre{" "}
                <M>{"x_n\\in D_f"}</M>, <M>{"x_n \\ne x_0"}</M> és <M>{"x_n\\to x_0"}</M>, fennáll,
                hogy <M>{"f(x_n)\\to A"}</M>.
              </p>
            </Kiemelo>
            <Proza>
              <p>
                <strong>Mikor melyiket?</strong> Az ε–δ definíció akkor kényelmes, ha{" "}
                <em>be akarjuk bizonyítani</em>, hogy egy határérték létezik. Az átviteli elv akkor, ha{" "}
                <em>cáfolni</em> akarunk: elég két olyan sorozatot mutatni, amelyek mentén a
                függvényértékek különböző számokhoz tartanak. Például a <M>{"\\sin\\frac1x"}</M>{" "}
                függvénynek a 0-ban nincs határértéke, mert az <M>{"x_n = \\frac{1}{n\\pi}"}</M>{" "}
                sorozat mentén a függvényérték végig 0, az{" "}
                <M>{"x_n' = \\frac{1}{\\frac{\\pi}{2}+2n\\pi}"}</M> mentén viszont végig 1.
              </p>
            </Proza>
          </div>
          <div>
            <Kiemelo tipus="definicio" cim="Egyoldali határértékek">
              <p>
                <strong>Jobb oldali:</strong> minden <M>{"\\varepsilon>0"}</M>-hoz van olyan{" "}
                <M>{"\\delta>0"}</M>, hogy <M>{"x_0 < x < x_0+\\delta"}</M> esetén{" "}
                <M>{"|f(x)-A|<\\varepsilon"}</M>. Jelölés:{" "}
                <M>{"\\lim\\limits_{x\\to x_0+0} f(x)"}</M>. A bal oldali ugyanez{" "}
                <M>{"x_0-\\delta < x < x_0"}</M> alakkal.
              </p>
              <p className="mt-2">
                <strong>Tétel.</strong> A határérték <strong>pontosan akkor</strong> létezik, ha
                létezik a bal és a jobb oldali határérték, <strong>és a kettő egyenlő</strong>.
              </p>
            </Kiemelo>
            <Proza>
              <p>
                Példák: <M>{"\\lim\\limits_{x\\to0+0}\\operatorname{sgn} x = 1"}</M>, de{" "}
                <M>{"\\lim\\limits_{x\\to0-0}\\operatorname{sgn} x = -1"}</M> — a kettő különbözik,
                tehát a 0 helyen <strong>nincs</strong> határérték, pedig a függvény ott értelmezve
                van. A törtrészre <M>{"\\lim\\limits_{x\\to0+0}\\{x\\} = 0"}</M>, míg{" "}
                <M>{"\\lim\\limits_{x\\to0-0}\\{x\\} = 1"}</M>.
              </p>
            </Proza>
          </div>
        </KetOszlop>

        <Kiemelo tipus="definicio" cim="Végtelen határérték és határérték a végtelenben">
          <p>
            Két, gyakran összekevert fogalom: az egyikben a <em>függvényérték</em>, a másikban a{" "}
            <em>hely</em> megy a végtelenbe.
          </p>
          <MB>{"\\lim_{x\\to x_0} f(x) = +\\infty:\\quad \\forall P>0\\ \\exists\\delta>0:\\ 0<|x-x_0|<\\delta \\Rightarrow f(x)>P"}</MB>
          <MB>{"\\lim_{x\\to +\\infty} f(x) = A:\\quad \\forall\\varepsilon>0\\ \\exists M:\\ x>M \\Rightarrow |f(x)-A|<\\varepsilon"}</MB>
          <p>
            Példák: <M>{"\\lim\\limits_{x\\to1}\\frac{1}{(x-1)^2} = +\\infty"}</M> (a nevező nullához
            tart, de mindig pozitív); <M>{"\\lim\\limits_{x\\to\\infty}\\operatorname{arctg} x = \\frac{\\pi}{2}"}</M>{" "}
            — ezért vízszintes aszimptota az <M>{"y = \\pi/2"}</M> egyenes.
          </p>
        </Kiemelo>

        <KepletDoboz
          cimke="Műveleti tétel — ha lim f = A és lim g = B, mindkettő VÉGES"
          keplet={
            "\\lim_{x\\to x_0}\\left(f \\pm g\\right) = A\\pm B,\\qquad \\lim_{x\\to x_0} fg = AB,\\qquad \\lim_{x\\to x_0}\\frac fg = \\frac AB\\ \\ (B\\ne0)"
          }
        />

        <Kiemelo tipus="figyelem" cim="A +∞ nem szám">
          <p>
            Amikor azt írjuk, hogy a határérték <M>{"+\\infty"}</M>, valójában azt mondjuk, hogy a
            határérték <strong>nem létezik</strong> véges értelemben — csak épp tudjuk, hogyan nem
            létezik. Ezért nem szabad a végtelennel úgy számolni, mint egy számmal:
          </p>
          <MB>{"\\frac00,\\qquad \\frac{\\infty}{\\infty},\\qquad \\infty-\\infty,\\qquad 0\\cdot\\infty,\\qquad 1^{\\infty}"}</MB>
          <p>
            Ezek <strong>határozatlan alakok</strong>: az alak önmagában nem árulja el az eredményt.
            Nem azt jelenti, hogy nincs határérték, és nem is azt, hogy nem lehet kiszámolni — hanem
            hogy még dolgozni kell.
          </p>
        </Kiemelo>

        <Kiemelo tipus="kulcs" cim="A három legfontosabb technika">
          <p>
            <strong>1. <M>{"\\frac00"}</M> polinomnál:</strong> szorzattá alakítás, majd
            egyszerűsítés. Az egyszerűsítés jogos, mert a határérték számolásakor{" "}
            <M>{"x \\ne x_0"}</M>:
          </p>
          <MB>{"\\lim_{x\\to2}\\frac{x^2-4}{x-2} = \\lim_{x\\to2}\\frac{(x-2)(x+2)}{x-2} = \\lim_{x\\to2}(x+2) = 4"}</MB>
          <p className="mt-2">
            <strong>2. Gyökös kifejezésnél:</strong> bővítés a konjugálttal, hogy az{" "}
            <M>{"(a-b)(a+b) = a^2-b^2"}</M> azonosság kiejtse a gyököt.
          </p>
          <p className="mt-2">
            <strong>3. Racionális tört a végtelenben:</strong> osztás a <strong>domináns
            taggal</strong>. Azonos fokszám esetén a főegyütthatók hányadosa a határérték; ha a nevező
            fokszáma nagyobb, a határérték 0; ha a számlálóé, akkor <M>{"\\pm\\infty"}</M>.
          </p>
        </Kiemelo>

        {/* --- 4.9 --- */}
        <Alcim>4.9 Nevezetes határértékek</Alcim>
        <Proza>
          <p>
            Az alábbi képleteket <strong>fejből kell tudni</strong>. Mindegyik <M>{"\\frac00"}</M> vagy{" "}
            <M>{"1^{\\infty}"}</M> alakú határozatlan kifejezés, amelyet nem lehet egyszerű algebrával
            feloldani — ezek a „hiányzó láncszemek”, amelyek nélkül a deriválási szabályokat sem
            lehetne levezetni.
          </p>
        </Proza>

        <KepletDoboz
          cimke="Az öt nevezetes határérték"
          keplet={
            "\\lim_{x\\to0}\\frac{\\sin x}{x} = 1,\\qquad \\lim_{x\\to\\infty}\\left(1+\\frac1x\\right)^{x} = e,\\qquad \\lim_{x\\to0}\\frac{\\ln(1+x)}{x} = 1"
          }
          behelyettesitve={
            "\\lim_{x\\to0}\\frac{e^x-1}{x} = 1,\\qquad \\lim_{x\\to0}\\frac{(1+x)^{\\mu}-1}{x} = \\mu"
          }
          eredmeny={"\\lim_{x\\to0}\\frac{1-\\cos x}{x^2} = \\frac12"}
        />

        <AbraKeret
          szam="4.4"
          cim="Az egységkör-szendvics: a beírt háromszög benne van a körcikkben, az pedig a körülírt háromszögben. A területek összehasonlításából adódik a sin x < x < tg x egyenlőtlenség, abból pedig a rendőrelvvel az 1. nevezetes határérték."
        >
          <AbraSzendvics />
        </AbraKeret>

        <Proza>
          <p>
            <strong>Az 1. nevezetes határérték bizonyítása.</strong> Legyen először{" "}
            <M>{"0<x<\\frac{\\pi}{2}"}</M>. A három terület: a beírt háromszögé{" "}
            <M>{"\\frac12\\sin x"}</M>, a körcikké <M>{"\\frac12 x"}</M> (mert a cikk a teljes kör{" "}
            <M>{"\\frac{x}{2\\pi}"}</M> része), a körülírt háromszögé <M>{"\\frac12\\operatorname{tg} x"}</M>.
            A tartalmazásokból <M>{"\\sin x < x < \\frac{\\sin x}{\\cos x}"}</M>, majd{" "}
            <M>{"\\sin x"}</M>-szel osztva és reciprokot véve{" "}
            <M>{"\\cos x < \\frac{\\sin x}{x} < 1"}</M>. Mivel <M>{"\\cos x \\to 1"}</M>, a rendőrelv
            szerint <M>{"\\frac{\\sin x}{x}\\to1"}</M>. Végül a <M>{"\\frac{\\sin x}{x}"}</M> páros
            függvény, ezért a bal oldali határérték is 1. ∎
          </p>
          <p>
            <strong>A 4. bizonyítása.</strong> Legyen <M>{"y = e^x-1"}</M>; ekkor <M>{"y\\to0"}</M>, és{" "}
            <M>{"x = \\ln(1+y)"}</M>, tehát{" "}
            <M>{"\\frac{e^x-1}{x} = \\frac{y}{\\ln(1+y)} \\to 1"}</M> a 3. nevezetes határérték
            alapján. A 3. maga a 2.-ből jön: <M>{"\\frac{\\ln(1+x)}{x} = \\ln(1+x)^{1/x} \\to \\ln e = 1"}</M>,
            mert a logaritmus <em>folytonos</em>, tehát bevihető a határérték alá — ez az első hely,
            ahol a folytonosságot ténylegesen használjuk.
          </p>
        </Proza>

        <Kiemelo tipus="figyelem" cim="Csak radiánban igaz!">
          <p>
            Ha <M>{"x"}</M>-et fokban mérnénk, a körcikk területe nem <M>{"\\frac12 x"}</M> volna, és a
            határérték <M>{"\\frac{\\pi}{180}"}</M>-ra jönne ki. Az analízisben ezért dolgozunk mindig
            radiánban. És vigyázz a másik tipikus tévedésre:{" "}
            <M>{"\\lim\\limits_{x\\to\\infty}\\frac{\\sin x}{x}"}</M> nem 1, hanem{" "}
            <strong>0</strong> — korlátos osztva végtelenbe tartóval.
          </p>
        </Kiemelo>

        <Kiemelo tipus="kulcs" cim="A használatuk kulcsa">
          <p>
            Mindig alakítsd a kifejezést úgy, hogy a képlet <em>pontosan</em> a nevezetes alakban
            jelenjen meg. Ha <M>{"\\sin 5x"}</M> szerepel, akkor <M>{"5x"}</M>-szel kell osztani, és
            ezt kompenzálni:
          </p>
          <MB>{"\\frac{\\sin 5x}{x} = 5\\cdot\\frac{\\sin 5x}{5x} \\longrightarrow 5"}</MB>
          <p>
            Ugyanez az <M>{"e"}</M>-alakoknál: a „kicsi” rész <strong>reciprokának</strong> kell
            megjelennie a kitevőben, a maradék szorzó pedig az <M>{"e"}</M> kitevője lesz:
          </p>
          <MB>{"\\left(1+\\frac{a}{x}\\right)^{bx} = \\left[\\left(1+\\frac{1}{x/a}\\right)^{x/a}\\right]^{ab} \\longrightarrow e^{ab}"}</MB>
        </Kiemelo>

        {/* --- 4.10 --- */}
        <Alcim>4.10 Folytonosság és a szakadástípusok</Alcim>
        <Proza>
          <p>
            Szemléletesen a folytonos függvény az, amelynek grafikonja „egy vonallal megrajzolható”.
            Ez jó kép, de nem definíció; a pontos megfogalmazás a határértékre épül — és pontosan
            azért ilyen körülményes, mert három különböző dolognak kell egyszerre teljesülnie.
          </p>
        </Proza>

        <Kiemelo tipus="definicio" cim="Definíció — folytonosság egy pontban">
          <p>
            Az <M>{"f"}</M> <strong>folytonos</strong> az <M>{"x_0"}</M> helyen, ha teljesül mindhárom
            feltétel: <strong>(1)</strong> létezik a véges{" "}
            <M>{"\\lim\\limits_{x\\to x_0} f(x)"}</M> határérték; <strong>(2)</strong> az{" "}
            <M>{"f"}</M> értelmezve van <M>{"x_0"}</M>-ban; <strong>(3)</strong> a kettő megegyezik:
          </p>
          <MB>{"\\lim_{x\\to x_0} f(x) = f(x_0)."}</MB>
          <p>
            Az <M>{"f"}</M> <strong>folytonos függvény</strong>, ha az értelmezési tartománya minden
            pontjában folytonos.
          </p>
        </Kiemelo>

        <Proza>
          <p>
            <strong>Mit mond ez valójában?</strong> Azt, hogy a határátmenet és a függvény alkalmazása{" "}
            <strong>felcserélhető</strong>: a limesz „bevihető” a függvény alá. Ezt használtuk a 3.
            nevezetes határértéknél, amikor a logaritmust bevittük a limesz alá — és ezt fogjuk
            használni a helyettesítéses integrálásnál is.
          </p>
        </Proza>

        <Kiemelo tipus="kulcs" cim="Tétel — az elemi függvények folytonosak">
          <p>
            Az elemi függvények az <strong>egész értelmezési tartományukon</strong> folytonosak: minden
            polinom és racionális törtfüggvény, továbbá <M>{"\\sin x"}</M>, <M>{"\\cos x"}</M>,{" "}
            <M>{"e^x"}</M>, <M>{"\\operatorname{sh} x"}</M>, <M>{"\\operatorname{ch} x"}</M> az egész{" "}
            <M>{"\\mathbb{R}"}</M>-en, <M>{"\\ln x"}</M> a pozitív számokon, <M>{"\\sqrt x"}</M> a
            nemnegatívakon. Folytonos függvények összege, különbsége, szorzata, hányadosa (ahol a
            nevező nem nulla) és összetétele is folytonos.
          </p>
        </Kiemelo>

        <Kiemelo tipus="figyelem" cim="A tangens „nem szakad meg”">
          <p>
            Sokan azt mondják, hogy a <M>{"\\operatorname{tg} x"}</M> szakadásos a{" "}
            <M>{"\\frac{\\pi}{2}"}</M> helyen. Ez pongyola: a <M>{"\\frac{\\pi}{2}"}</M>{" "}
            <strong>nincs benne</strong> az értelmezési tartományban, tehát ott sem folytonosságról,
            sem szakadásról nem beszélhetünk. A <M>{"\\operatorname{tg} x"}</M> a saját értelmezési
            tartományán folytonos.
          </p>
        </Kiemelo>

        <Probald cim="Próbáld ki — csúsztasd a paramétert, zárd be a rést">
          <FvSzakadasFelfedezo />
        </Probald>

        <AbraKeret
          szam="4.5"
          cim="A három szakadástípus. Csak a bal oldali tehető folytonossá egyetlen érték átdefiniálásával; a másik kettőn semmilyen c nem segít."
        >
          <AbraSzakadasTipusok />
        </AbraKeret>

        <Kiemelo tipus="definicio" cim="Szakadástípusok">
          <div className="finom-gorgeto overflow-x-auto">
            <table className="w-full text-[13.5px]">
              <thead className="text-[11px] text-petrol-500 uppercase">
                <tr>
                  <th className="pb-1 text-left font-semibold">Típus</th>
                  <th className="pb-1 text-left font-semibold">Jellemző</th>
                  <th className="pb-1 text-left font-semibold">Példa</th>
                </tr>
              </thead>
              <tbody className="text-petrol-700">
                <tr className="border-t border-petrol-100">
                  <td className="py-1.5">megszüntethető</td>
                  <td className="py-1.5">a határérték létezik, csak az érték rossz vagy hiányzik</td>
                  <td className="py-1.5">
                    <M>{"\\dfrac{\\sin x}{x}"}</M> a 0-ban
                  </td>
                </tr>
                <tr className="border-t border-petrol-100">
                  <td className="py-1.5">ugrás (elsőfajú)</td>
                  <td className="py-1.5">a két egyoldali határérték véges, de különböző</td>
                  <td className="py-1.5">
                    <M>{"\\operatorname{sgn} x"}</M> a 0-ban
                  </td>
                </tr>
                <tr className="border-t border-petrol-100">
                  <td className="py-1.5">pólus (másodfajú)</td>
                  <td className="py-1.5">valamelyik egyoldali határérték végtelen</td>
                  <td className="py-1.5">
                    <M>{"\\dfrac1x"}</M> a 0-ban
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2">
            Megszüntethető szakadás esetén az <M>{"f(x_0) := \\lim\\limits_{x\\to x_0} f(x)"}</M>{" "}
            <strong>átdefiniálással</strong> a függvény folytonossá tehető.
          </p>
        </Kiemelo>

        {/* --- 4.11 --- */}
        <Alcim>4.11 Weierstrass és Bolzano tétele — és miért szép?</Alcim>
        <Proza>
          <p>
            A folytonosság igazi ereje két tételben mutatkozik meg. Mindkettő <strong>zárt</strong>{" "}
            intervallumra vonatkozik — és mindkettőben pontosan ez a feltétel a kritikus.
          </p>
        </Proza>

        <KetOszlop>
          <div>
            <Kiemelo tipus="definicio" cim="Weierstrass tétele">
              <p>
                Ha az <M>{"f"}</M> folytonos a <strong>korlátos és zárt</strong>{" "}
                <M>{"[a;\\,b]"}</M> intervallumon, akkor ott korlátos, és <strong>felveszi</strong> a
                legkisebb és a legnagyobb értékét: van olyan{" "}
                <M>{"x_{\\min},\\ x_{\\max} \\in [a;\\,b]"}</M>, hogy
              </p>
              <MB>{"f(x_{\\min}) \\le f(x) \\le f(x_{\\max}) \\quad \\text{minden } x\\in[a;\\,b]\\text{-re.}"}</MB>
            </Kiemelo>
            <Proza>
              <p>
                <strong>Miért nem magától értetődő?</strong> Mert nem elég, hogy a függvény korlátos —
                az is kell, hogy a felső korlátot <em>el is érje</em>. A <M>{"(0;\\,1)"}</M> nyílt
                intervallumon az <M>{"f(x)=x"}</M> korlátos, de nincs legnagyobb értéke: az 1-et sosem
                éri el, de bármilyen annál kisebb számnál nagyobb értéket felvesz. A zártság tehát épp
                a „szélek elérését” garantálja.
              </p>
            </Proza>
          </div>
          <div>
            <Kiemelo tipus="definicio" cim="Bolzano tétele (középértéktétel)">
              <p>
                Ha az <M>{"f"}</M> folytonos az <M>{"[a;\\,b]"}</M> intervallumon, akkor{" "}
                <strong>minden</strong>, <M>{"f(a)"}</M> és <M>{"f(b)"}</M> közé eső{" "}
                <M>{"y_0"}</M> értéket felvesz.
              </p>
              <p className="mt-2">
                <strong>Következmény (gyökkeresés).</strong> Ha <M>{"f(a)"}</M> és <M>{"f(b)"}</M>{" "}
                <strong>ellentétes előjelű</strong>, akkor <M>{"f"}</M>-nek van gyöke az
                intervallumban.
              </p>
              <p className="mt-2">
                <strong>2. következmény.</strong> Minden <strong>páratlan fokú</strong>, valós
                együtthatós polinomnak van valós gyöke.
              </p>
            </Kiemelo>
            <Proza>
              <p>
                Szemléletesen: a folytonos függvény grafikonja nem tud „átugrani” egy vízszintes
                egyenest — valahol metszenie kell. Mérnökként ez azért fontos, mert egy páratlan fokú
                karakterisztikus egyenletnek <strong>mindig</strong> van valós megoldása: egy
                harmadfokú egyenlettel leírt rendszernek mindig van valós sajátértéke. Páros fokszám
                esetén ez nem igaz — az <M>{"x^2+1"}</M> polinomnak nincs valós gyöke.
              </p>
            </Proza>
          </div>
        </KetOszlop>

        <Kiemelo tipus="figyelem" cim="Mindkét feltétel kell — és a folytonosság sem hagyható el">
          <p>
            Az <M>{"f(x) = \\frac1x"}</M> a <M>{"(0;\\,1)"}</M> nyílt intervallumon folytonos, de{" "}
            <strong>nem korlátos</strong> (az intervallum nem zárt). Az <M>{"f(x)=x"}</M> a teljes{" "}
            <M>{"\\mathbb{R}"}</M>-en folytonos, de nem korlátos (az intervallum nem korlátos). És a
            folytonosság sem hagyható el: a <M>{"[0;\\,1]"}</M>-en értelmezett, <M>{"x \\ne 0"}</M>{" "}
            esetén <M>{"1/x"}</M>, a 0-ban pedig 0 értékű függvény zárt, korlátos intervallumon él,
            mégsem korlátos.
          </p>
        </Kiemelo>

        <Proza>
          <p>
            <strong>És most jön a szép rész.</strong> Bolzano tétele nem csak elméleti: ez a numerikus
            gyökkeresés alapja. Ha <M>{"f(a)"}</M> és <M>{"f(b)"}</M> előjele különböző, nézzük meg a
            felezőpontot, <M>{"c = \\frac{a+b}{2}"}</M>. Ha <M>{"f(c)"}</M> előjele{" "}
            <M>{"f(a)"}</M>-éval egyezik, a gyök a jobb felében van, különben a bal felében. Így minden
            lépésben megfelezzük az intervallumot. A tétel tehát nem csak azt mondja meg, hogy{" "}
            <em>van</em> gyök: egyúttal <em>receptet</em> is ad a megkeresésére. Ez az{" "}
            <strong>intervallumfelezéses módszer</strong>, és a mai napig ezt használjuk, ha semmit nem
            tudunk a függvényről — egyensúlyi egyenletek, keresztmetszeti ellenőrzések, iterációs
            méretezés.
          </p>
        </Proza>

        <Probald cim="Próbáld ki — fogd be a gyököt felezéssel">
          <FvBolzanoFelezo />
        </Probald>

        <Kiemelo tipus="tipp" cim="Miért szép ez?">
          <p>
            Mert egy tisztán <em>egzisztencia</em>-tétel (van gyök) átfordul egy{" "}
            <em>algoritmusba</em> (így találod meg), és az algoritmus pontossága előre megjósolható:{" "}
            <M>{"n"}</M> felezés után a hiba legfeljebb <M>{"\\frac{b-a}{2^{n+1}}"}</M>. Tíz lépés az
            ezredrészére szűkít, húsz lépés a milliomodrészére. Lassú — a későbbi Newton-módszer sokkal
            gyorsabb —, de <strong>mindig működik</strong>, és soha nem szalad el. A biztonságkritikus
            számításokban épp ezért kedvelt.
          </p>
        </Kiemelo>
      </Szakasz>

      {/* ==================== KIDOLGOZOTT FELADATOK ==================== */}
      <Szakasz
        id="peldak"
        cimke="2. rész"
        cim="Kidolgozott feladatok"
        bevezeto="Az előadás hat példája, lépésenként, ugyanazokkal a számokkal. Először mindig próbáld meg magad — a lépések csak akkor érnek valamit, ha van mihez hasonlítanod."
        className="bg-white"
      >
        {/* ---- KF-1 ---- */}
        <KidolgozottFeladat
          jel="KF‑1"
          ido="8 perc"
          forras="Előadás, 1.2 és 2.2 példa"
          cim="Értelmezési tartomány, értékkészlet, paritás"
          feladat={
            <>
              <p>
                <strong>(a)</strong> Add meg az <M>{"f(x) = \\dfrac{1}{x-1}"}</M> értelmezési
                tartományát és értékkészletét.
              </p>
              <p>
                <strong>(b)</strong> Add meg a <M>{"g(x) = \\dfrac{\\sqrt{4-x^2}}{\\ln(x+1)}"}</M>{" "}
                értelmezési tartományát.
              </p>
              <p>
                <strong>(c)</strong> Páros, páratlan vagy egyik sem a <M>{"h(x) = x\\sin x"}</M>?
              </p>
            </>
          }
          tanulsag={
            <p>
              Három tiltás, három külön feltétel — és a metszetük a válasz. A (b) feladat a klasszikus
              csapda: a nevezőben álló logaritmus miatt <strong>két</strong> feltételt ad (pozitív
              argumentum <em>és</em> nem nulla érték). A paritásnál pedig soha ne tippelj a
              grafikonról: számold ki az <M>{"f(-x)"}</M>-et.
            </p>
          }
        >
          <Lepes cim="(a) A nevező tiltása">
            <MB>{"x-1 \\ne 0 \\quad\\Longrightarrow\\quad D_f = \\mathbb{R}\\setminus\\{1\\}"}</MB>
            <p>
              Az értékkészlethez fejezzük ki <M>{"x"}</M>-et: az <M>{"y = \\frac{1}{x-1}"}</M>{" "}
              egyenletből <M>{"x = 1+\\frac1y"}</M>, ami minden <M>{"y \\ne 0"}</M> esetén megoldható.
            </p>
            <MB>{"R_f = \\mathbb{R}\\setminus\\{0\\}"}</MB>
            <p>
              A nullát a függvény soha nem veszi fel: egy tört csak akkor nulla, ha a{" "}
              <em>számlálója</em> az — itt viszont a számláló állandó 1.
            </p>
          </Lepes>
          <Lepes cim="(b) Első feltétel — a gyök">
            <MB>{"4-x^2 \\ge 0 \\iff x^2 \\le 4 \\iff -2 \\le x \\le 2"}</MB>
            <p>
              A páros gyök alatt nemnegatív szám kell; a 0 itt <strong>megengedett</strong>, ezért a
              végpontok beletartoznak.
            </p>
          </Lepes>
          <Lepes cim="(b) Második és harmadik feltétel — a logaritmus mint nevező">
            <p>
              A logaritmus argumentuma szigorúan pozitív:
            </p>
            <MB>{"x+1 > 0 \\iff x > -1"}</MB>
            <p>De a logaritmus a nevezőben áll, tehát nem lehet nulla:</p>
            <MB>{"\\ln(x+1) \\ne 0 \\iff x+1 \\ne 1 \\iff x \\ne 0"}</MB>
          </Lepes>
          <Lepes cim="(b) A három feltétel metszete">
            <KepletDoboz
              cimke="A három halmaz"
              keplet={"[-2;\\ 2] \\ \\cap\\ (-1;\\ +\\infty) \\ \\cap\\ \\mathbb{R}\\setminus\\{0\\}"}
              behelyettesitve={"(-1;\\ 2] \\ \\cap\\ \\mathbb{R}\\setminus\\{0\\}"}
              eredmeny={"D_g = (-1;\\ 0) \\cup (0;\\ 2]"}
            />
            <p>
              Figyeld meg a zárójeleket: a <M>{"-1"}</M> nyitott (logaritmus), a 2 zárt (gyök), a 0
              pedig kilyukasztva (nevező).
            </p>
          </Lepes>
          <Lepes cim="(c) A paritás — számolással, nem ránézésre">
            <MB>{"h(-x) = (-x)\\sin(-x) = (-x)(-\\sin x) = x\\sin x = h(x)"}</MB>
            <p>
              Tehát <strong>páros</strong>: páratlan szor páratlan párosat ad. Ellenőrzés számokkal:{" "}
              <M>{"h(1) = \\sin 1 \\approx 0{,}8415"}</M> és{" "}
              <M>{"h(-1) = (-1)\\sin(-1) = \\sin 1 \\approx 0{,}8415"}</M> ✓
            </p>
            <p>
              Vigyázz: ez a függvény <strong>nem periodikus</strong>, pedig szinusz van benne — a
              kilengések amplitúdója <M>{"|x|"}</M>-szel nő, tehát nem korlátos sem.
            </p>
          </Lepes>
        </KidolgozottFeladat>

        {/* ---- KF-2 ---- */}
        <KidolgozottFeladat
          jel="KF‑2"
          ido="7 perc"
          forras="Előadás, 3. fejezet, 1–3. példa"
          cim="Inverz függvény — három eset"
          feladat={
            <>
              <p>
                <strong>(a)</strong> Add meg az <M>{"f(x) = \\dfrac{3}{2+x}"}</M> inverzét{" "}
                <M>{"D"}</M> és <M>{"R"}</M> megadásával.
              </p>
              <p>
                <strong>(b)</strong> Mi az <M>{"f(x)=e^x"}</M> inverze?
              </p>
              <p>
                <strong>(c)</strong> Miért nincs inverze az <M>{"f(x)=x^2"}</M> függvénynek az egész{" "}
                <M>{"\\mathbb{R}"}</M>-en, és mi a helyzet leszűkítve?
              </p>
            </>
          }
          tanulsag={
            <p>
              Az inverz nem csak egy képlet: <M>{"D_{f^{-1}} = R_f"}</M> és{" "}
              <M>{"R_{f^{-1}} = D_f"}</M> nélkül a válasz <strong>hiányos</strong>. És mindig
              ellenőrizz egy olyan ponttal, amely nem fixpont — az <M>{"x=1"}</M> a (a) feladatban
              történetesen fixpont, ezért ott a hibás (reciprok) képlet is „átmenne”.
            </p>
          }
        >
          <Lepes cim="(a) Kölcsönös egyértelműség, majd x kifejezése">
            <p>
              <M>{"D_f = \\mathbb{R}\\setminus\\{-2\\}"}</M>. A függvény ezen a halmazon kölcsönösen
              egyértelmű (a vízszintes vonal-próba minden magasságon egy metszéspontot ad), tehát van
              inverze.
            </p>
            <MB>{"y = \\frac{3}{2+x} \\;\\Longrightarrow\\; y(2+x) = 3 \\;\\Longrightarrow\\; 2y+xy = 3 \\;\\Longrightarrow\\; x = \\frac{3-2y}{y}"}</MB>
          </Lepes>
          <Lepes cim="(a) Betűcsere és a tartományok">
            <KepletDoboz
              cimke="Az inverz teljes megadása"
              keplet={"f^{-1}(x) = \\frac{3-2x}{x}"}
              behelyettesitve={"D_{f^{-1}} = R_f = \\mathbb{R}\\setminus\\{0\\}"}
              eredmeny={"R_{f^{-1}} = D_f = \\mathbb{R}\\setminus\\{-2\\}"}
            />
            <p>
              Miért esik ki a 0? Mert a <M>{"\\frac{3}{2+x}"}</M> tört soha nem nulla — ez az eredeti
              függvény értékkészletéből hiányzó érték, és épp ez lesz az inverz tiltott pontja.
            </p>
            <p>
              <strong>Ellenőrzés két ponttal:</strong> <M>{"f(1) = \\frac33 = 1"}</M> és{" "}
              <M>{"f^{-1}(1) = \\frac{3-2}{1} = 1"}</M> ✓; <M>{"f(4) = \\frac36 = 0{,}5"}</M> és{" "}
              <M>{"f^{-1}(0{,}5) = \\frac{3-1}{0{,}5} = 4"}</M> ✓
            </p>
          </Lepes>
          <Lepes cim="(b) Az exponenciális inverze">
            <MB>{"y = e^x \\;\\Longrightarrow\\; x = \\ln y \\;\\Longrightarrow\\; f^{-1}(x) = \\ln x"}</MB>
            <MB>{"D_{f^{-1}} = R_f = (0;\\ +\\infty),\\qquad R_{f^{-1}} = D_f = \\mathbb{R}"}</MB>
            <p>
              Innen ered az <M>{"e^{\\ln x} = x"}</M> (<M>{"x>0"}</M>) és a <M>{"\\ln(e^x) = x"}</M>{" "}
              (minden <M>{"x"}</M>-re) azonosság. A két grafikon egymás tükörképe az <M>{"y=x"}</M>{" "}
              egyenesre.
            </p>
          </Lepes>
          <Lepes cim="(c) A leszűkítés">
            <p>
              Az <M>{"f(x)=x^2"}</M> az egész <M>{"\\mathbb{R}"}</M>-en <strong>nem</strong> kölcsönösen
              egyértelmű: <M>{"f(2) = f(-2) = 4"}</M>, és az <M>{"y = x^2"}</M> egyenletből{" "}
              <M>{"x = \\pm\\sqrt y"}</M> — két megoldás, tehát nincs inverz.
            </p>
            <MB>{"x \\ge 0: \\quad f^{-1}(x) = \\sqrt{x};\\qquad\\qquad x \\le 0: \\quad f^{-1}(x) = -\\sqrt{x}"}</MB>
            <p>
              Mindkét leszűkítés jó — csak <strong>meg kell mondani</strong>, melyik ágról van szó.
              Pontosan ez történik az arkusz- és az area-függvényeknél is: a{" "}
              <M>{"\\operatorname{ch}"}</M> páros, ezért az <M>{"\\operatorname{arch}"}</M> az{" "}
              <M>{"x\\ge0"}</M> ághoz tartozik.
            </p>
          </Lepes>
        </KidolgozottFeladat>

        {/* ---- KF-3 ---- */}
        <KidolgozottFeladat
          jel="KF‑3"
          ido="7 perc"
          forras="Előadás, 5.3. példa"
          cim="Arkuszfüggvények: egyenlet, érték, összetétel"
          feladat={
            <>
              <p>
                <strong>(a)</strong> Oldd meg a valós számok halmazán:{" "}
                <M>{"\\sin x = \\dfrac{\\sqrt3}{2}"}</M>.
              </p>
              <p>
                <strong>(b)</strong> Mennyi <M>{"\\arcsin\\left(-\\dfrac{\\sqrt2}{2}\\right)"}</M> és{" "}
                <M>{"\\arccos\\left(-\\dfrac12\\right)"}</M>?
              </p>
              <p>
                <strong>(c)</strong> Mennyi <M>{"\\cos\\left(\\arcsin\\dfrac23\\right)"}</M>?
              </p>
            </>
          }
          tanulsag={
            <p>
              Három különböző kérdés három különböző válasz-típussal: az (a) egy{" "}
              <em>végtelen halmaz</em>, a (b) egy <em>szám</em>, a (c) egy{" "}
              <em>kiszámolt kifejezés</em>. A leggyakoribb hiba a második megoldássereg elfelejtése az
              (a)-ban, és az <M>{"\\arccos(-x) = -\\arccos x"}</M> hamis azonosság a (b)-ben.
            </p>
          }
        >
          <Lepes cim="(a) Az alapmegoldás">
            <MB>{"\\arcsin\\frac{\\sqrt3}{2} = \\frac{\\pi}{3} \\approx 1{,}0472\\ \\ (60^\\circ)"}</MB>
            <p>
              Ez az arkusz szinusz által adott <em>egyetlen</em> érték, a{" "}
              <M>{"\\left[-\\frac{\\pi}{2};\\ \\frac{\\pi}{2}\\right]"}</M> főágból.
            </p>
          </Lepes>
          <Lepes cim="(a) A teljes megoldáshalmaz">
            <p>
              A szinusz a <M>{"\\pi - x"}</M> helyen ugyanazt az értéket veszi fel, és{" "}
              <M>{"2\\pi"}</M> szerint periodikus. Ezért két megoldássereg van:
            </p>
            <MB>{"x = \\frac{\\pi}{3}+2k\\pi \\qquad \\text{vagy} \\qquad x = \\pi - \\frac{\\pi}{3}+2k\\pi = \\frac{2\\pi}{3}+2k\\pi,\\qquad k\\in\\mathbb{Z}"}</MB>
            <p>
              Ellenőrzés: <M>{"\\sin\\frac{2\\pi}{3} = \\sin 120^\\circ = \\frac{\\sqrt3}{2}"}</M> ✓
            </p>
          </Lepes>
          <Lepes cim="(b) Két arkuszérték — és a paritás különbsége">
            <MB>{"\\arcsin\\left(-\\frac{\\sqrt2}{2}\\right) = -\\frac{\\pi}{4} \\approx -0{,}7854"}</MB>
            <p>
              Ez az a <M>{"-\\frac{\\pi}{2}"}</M> és <M>{"\\frac{\\pi}{2}"}</M> közötti szög, amelynek
              szinusza <M>{"-\\frac{\\sqrt2}{2}"}</M>. Vegyük észre: az arkusz szinusz{" "}
              <strong>páratlan</strong>.
            </p>
            <MB>{"\\arccos\\left(-\\frac12\\right) = \\pi - \\arccos\\frac12 = \\pi - \\frac{\\pi}{3} = \\frac{2\\pi}{3} \\approx 2{,}0944"}</MB>
            <p>
              Az arkusz koszinusz <strong>nem</strong> páratlan! Az értékkészlete{" "}
              <M>{"[0;\\ \\pi]"}</M>, tehát soha nem ad negatív értéket. A helyes azonosság:{" "}
              <M>{"\\arccos(-x) = \\pi - \\arccos x"}</M>.
            </p>
          </Lepes>
          <Lepes cim="(c) Az összetétel — a háromszög-trükk">
            <p>
              Jelölje <M>{"\\alpha = \\arcsin\\frac23"}</M>. Ekkor <M>{"\\sin\\alpha = \\frac23"}</M>, és
              a definíció szerint <M>{"-\\frac{\\pi}{2}\\le\\alpha\\le\\frac{\\pi}{2}"}</M>, tehát{" "}
              <M>{"\\cos\\alpha \\ge 0"}</M> — a négyzetgyök előjele <strong>pozitív</strong>.
            </p>
            <KepletDoboz
              cimke="A számolás"
              keplet={"\\cos\\alpha = \\sqrt{1-\\sin^2\\alpha}"}
              behelyettesitve={"\\sqrt{1-\\left(\\tfrac23\\right)^2} = \\sqrt{1-\\tfrac49} = \\sqrt{\\tfrac59}"}
              eredmeny={"\\cos\\left(\\arcsin\\tfrac23\\right) = \\frac{\\sqrt5}{3} \\approx 0{,}7454"}
            />
            <p>
              Általánosan: <M>{"\\cos(\\arcsin x) = \\sqrt{1-x^2}"}</M>, ha{" "}
              <M>{"-1\\le x\\le 1"}</M>. Ugyanígy <M>{"\\sin(\\arccos x) = \\sqrt{1-x^2}"}</M>.
            </p>
          </Lepes>
        </KidolgozottFeladat>

        {/* ---- KF-4 ---- */}
        <KidolgozottFeladat
          jel="KF‑4"
          ido="10 perc"
          forras="Előadás, 8.5 és 9.2 példa"
          cim="Négy határérték — négy technika"
          feladat={
            <p>
              Számítsd ki: <M>{"\\lim\\limits_{x\\to0}\\dfrac{\\sqrt{x+4}-2}{x}"}</M>,{" "}
              <M>{"\\lim\\limits_{x\\to\\infty}\\dfrac{3x^2-x+1}{2x^2+5}"}</M>,{" "}
              <M>{"\\lim\\limits_{x\\to0}\\dfrac{\\sin 5x}{\\sin 3x}"}</M> és{" "}
              <M>{"\\lim\\limits_{x\\to\\infty}\\left(1+\\dfrac3x\\right)^{2x}"}</M>.
            </p>
          }
          tanulsag={
            <p>
              Négy határozatlan alak, négy külön technika: <strong>gyöktelenítés</strong>,{" "}
              <strong>domináns taggal osztás</strong>, <strong>nevezetes alakra igazítás</strong> és{" "}
              <strong>e-alak</strong>. Ha felismerted a típust, a megoldás három sor. A típusfelismerés
              gyakorlására való a lenti játék.
            </p>
          }
        >
          <Lepes cim="(a) Gyöktelenítés — bővítés a konjugálttal">
            <p>
              Behelyettesítve <M>{"\\frac{\\sqrt4-2}{0} = \\frac00"}</M>: határozatlan alak. Bővítsünk
              a konjugálttal:
            </p>
            <MB>{"\\frac{\\left(\\sqrt{x+4}-2\\right)\\left(\\sqrt{x+4}+2\\right)}{x\\left(\\sqrt{x+4}+2\\right)} = \\frac{(x+4)-4}{x\\left(\\sqrt{x+4}+2\\right)} = \\frac{1}{\\sqrt{x+4}+2}"}</MB>
            <KepletDoboz
              cimke="Az új alakba a 0 behelyettesíthető"
              keplet={"\\lim_{x\\to0}\\frac{1}{\\sqrt{x+4}+2}"}
              behelyettesitve={"\\frac{1}{\\sqrt{4}+2} = \\frac{1}{2+2}"}
              eredmeny={"\\lim_{x\\to0}\\frac{\\sqrt{x+4}-2}{x} = \\frac14 = 0{,}25"}
            />
            <p>
              Számpróba: <M>{"x = 0{,}001"}</M> esetén az eredeti kifejezés{" "}
              <M>{"\\approx 0{,}249984"}</M> ✓
            </p>
          </Lepes>
          <Lepes cim="(b) Racionális tört a végtelenben — osztás x²-tel">
            <MB>{"\\frac{3x^2-x+1}{2x^2+5} = \\frac{3-\\frac1x+\\frac{1}{x^2}}{2+\\frac{5}{x^2}} \\longrightarrow \\frac{3-0+0}{2+0} = \\frac32"}</MB>
            <p>
              Most már <strong>szabad</strong> a műveleti tételt alkalmazni, mert a számláló és a
              nevező külön-külön is konvergens, és a nevező határértéke <M>{"2 \\ne 0"}</M>. Számpróba{" "}
              <M>{"x = 10^6"}</M>-ra: <M>{"\\approx 1{,}4999995"}</M> ✓
            </p>
          </Lepes>
          <Lepes cim="(c) Kettős szinusz — igazítás a nevezetes alakhoz">
            <p>
              Mindkét szinusz mellé oda kell tenni a <em>saját</em> argumentumát a nevezőbe; a
              kompenzáló szorzó kívülre kerül:
            </p>
            <MB>{"\\frac{\\sin 5x}{\\sin 3x} = \\frac{5}{3}\\cdot\\frac{\\dfrac{\\sin 5x}{5x}}{\\dfrac{\\sin 3x}{3x}} \\longrightarrow \\frac53\\cdot\\frac11 = \\frac53 \\approx 1{,}6667"}</MB>
            <p>
              Miért szabad ezt? Mert <M>{"\\frac{\\sin 5x}{\\sin 3x} = \\frac{\\sin5x}{5x}\\cdot\\frac{3x}{\\sin3x}\\cdot\\frac{5x}{3x}"}</M>,
              és az utolsó tényező épp <M>{"\\frac53"}</M>.
            </p>
          </Lepes>
          <Lepes cim="(d) e-alak — a kicsi reciproka a kitevőben">
            <p>
              A „kicsi” rész <M>{"\\frac3x"}</M>, ennek reciproka <M>{"\\frac x3"}</M>. Legyen{" "}
              <M>{"u = \\frac x3"}</M>, ekkor <M>{"x = 3u"}</M>, a kitevő <M>{"2x = 6u"}</M>, és{" "}
              <M>{"u\\to\\infty"}</M>:
            </p>
            <KepletDoboz
              cimke="Átírás és határátmenet"
              keplet={"\\left(1+\\frac3x\\right)^{2x} = \\left(1+\\frac1u\\right)^{6u} = \\left[\\left(1+\\frac1u\\right)^{u}\\right]^{6}"}
              behelyettesitve={"\\left[\\,e\\,\\right]^{6}"}
              eredmeny={"\\lim_{x\\to\\infty}\\left(1+\\frac3x\\right)^{2x} = e^{6} \\approx 403{,}43"}
            />
            <p>
              Számpróba <M>{"x = 10^7"}</M>-re: <M>{"\\approx 403{,}428"}</M> ✓ A leggyakoribb hiba a
              külső kitevő elhagyása — attól lesz a válasz <M>{"e"}</M> az <M>{"e^6"}</M> helyett.
            </p>
          </Lepes>
        </KidolgozottFeladat>

        <div className="my-6">
          <p className="mb-2 text-[11px] font-bold tracking-[0.16em] text-naracs-600 uppercase">
            Film — a lyuk, a gyöktelenítés és az ε–δ sáv
          </p>
          <FilmHatarertek />
        </div>

        {/* ---- KF-5 ---- */}
        <KidolgozottFeladat
          jel="KF‑5"
          ido="7 perc"
          forras="Előadás, 10.2. példa"
          cim="Folytonosság: szakadástípus és paraméter"
          feladat={
            <>
              <p>
                <strong>(a)</strong> Milyen típusú szakadása van a 0 helyen az{" "}
                <M>{"f(x) = \\dfrac{\\sin x}{x}"}</M> (ha <M>{"x \\ne 0"}</M>),{" "}
                <M>{"f(0) = 3"}</M> függvénynek, és hogyan tehető folytonossá?
              </p>
              <p>
                <strong>(b)</strong> Milyen <M>{"c"}</M> mellett folytonos a{" "}
                <M>{"g(x) = \\dfrac{x^2-1}{x-1}"}</M> (ha <M>{"x \\ne 1"}</M>), <M>{"g(1) = c"}</M>{" "}
                függvény?
              </p>
            </>
          }
          tanulsag={
            <p>
              A recept mindkét esetben ugyanaz: <strong>előbb a határérték</strong>, és csak utána
              hasonlítjuk össze a függvényértékkel. A határérték kiszámolásához a{" "}
              <M>{"x = x_0"}</M> hely <em>nem is kell</em> — ezért működik akkor is, ha a függvény ott
              rossz értéket vesz fel, vagy egyáltalán nincs értelmezve.
            </p>
          }
        >
          <Lepes cim="(a) Előbb a határérték">
            <MB>{"\\lim_{x\\to0}\\frac{\\sin x}{x} = 1 \\qquad \\text{(1. nevezetes határérték)}"}</MB>
            <p>
              A határérték tehát létezik és véges. A függvényérték viszont <M>{"f(0) = 3"}</M> — a
              kettő <strong>nem egyezik</strong>, tehát a függvény a 0 helyen nem folytonos.
            </p>
          </Lepes>
          <Lepes cim="(a) A típus és a javítás">
            <p>
              Mivel a (véges) határérték létezik, csak az érték rossz, ez{" "}
              <strong>megszüntethető szakadás</strong>. Az átdefiniálás:
            </p>
            <MB>{"f(0) := \\lim_{x\\to0}\\frac{\\sin x}{x} = 1"}</MB>
            <p>
              Ezzel a választással a függvény mindenhol folytonos lesz. Egyetlen pont értékének
              megváltoztatásával tehát „meggyógyítható” — ezért hívjuk megszüntethetőnek.
            </p>
          </Lepes>
          <Lepes cim="(b) A határérték kiszámítása">
            <p>
              Behelyettesítve <M>{"\\frac{1-1}{1-1} = \\frac00"}</M>: határozatlan alak, tehát
              szorzattá alakítunk. Az egyszerűsítés jogos, mert a határértéknél <M>{"x \\ne 1"}</M>:
            </p>
            <MB>{"\\lim_{x\\to1}\\frac{x^2-1}{x-1} = \\lim_{x\\to1}\\frac{(x-1)(x+1)}{x-1} = \\lim_{x\\to1}(x+1) = 2"}</MB>
          </Lepes>
          <Lepes cim="(b) A feltétel három pontja">
            <KepletDoboz
              cimke="A folytonosság három feltétele az x₀ = 1 helyen"
              keplet={"(1)\\ \\exists \\lim_{x\\to1} g(x) = 2 \\quad\\checkmark\\qquad (2)\\ \\exists g(1) = c \\quad\\checkmark"}
              behelyettesitve={"(3)\\ \\lim_{x\\to1} g(x) = g(1) \\iff 2 = c"}
              eredmeny={"c = 2"}
            />
            <p>
              Minden más <M>{"c"}</M> esetén megszüntethető szakadása van, és az „ugrás” nagysága{" "}
              <M>{"|c-2|"}</M>. Például <M>{"c = 5"}</M> esetén a grafikon egy magányos pontból és a
              lyukas egyenesből áll.
            </p>
          </Lepes>
        </KidolgozottFeladat>

        <div className="my-6">
          <p className="mb-2 text-[11px] font-bold tracking-[0.16em] text-naracs-600 uppercase">
            Film — a paraméter, ami folytonossá tesz
          </p>
          <FilmSzakadas />
        </div>

        {/* ---- KF-6 ---- */}
        <KidolgozottFeladat
          jel="KF‑6"
          ido="8 perc"
          forras="Előadás, 11. fejezet"
          cim="Bolzano tétele és az intervallumfelezés"
          feladat={
            <p>
              Van-e gyöke az <M>{"f(x) = x^3-6x+2"}</M> függvénynek a <M>{"[0;\\ 1]"}</M>{" "}
              intervallumon? Ha igen, szűkítsd a gyököt tartalmazó intervallumot{" "}
              <strong>három</strong> felezési lépéssel, és becsüld meg a hibát.
            </p>
          }
          tanulsag={
            <p>
              Bolzano tétele két dolgot kíván: <strong>folytonosságot</strong> és{" "}
              <strong>előjelváltást</strong>. Mindkettőt ki kell mondani — a polinomok folytonossága
              nem magától értetődő tény, hanem tétel. A felezés pedig nem csak gyakorlati eszköz:
              maga a bizonyítás konstrukciója.
            </p>
          }
        >
          <Lepes cim="1. lépés — a tétel feltételeinek ellenőrzése">
            <MB>{"f(0) = 2 > 0, \\qquad f(1) = 1-6+2 = -3 < 0"}</MB>
            <p>
              A polinom az egész <M>{"\\mathbb{R}"}</M>-en folytonos (elemi függvény), és a két
              végponton ellentétes előjelű. Bolzano tétele szerint tehát <strong>van gyök</strong> a{" "}
              <M>{"(0;\\ 1)"}</M> intervallumban.
            </p>
          </Lepes>
          <Lepes cim="2. lépés — az első felezés">
            <MB>{"c_1 = \\frac{0+1}{2} = 0{,}5,\\qquad f(0{,}5) = 0{,}125-3+2 = -0{,}875 < 0"}</MB>
            <p>
              Az <M>{"f(0{,}5)"}</M> előjele az <M>{"f(1)"}</M>-ével egyezik, tehát a gyök a{" "}
              <strong>bal</strong> félben van:
            </p>
            <MB>{"[0;\\ 0{,}5]"}</MB>
          </Lepes>
          <Lepes cim="3. lépés — a második és harmadik felezés">
            <MB>{"c_2 = 0{,}25,\\qquad f(0{,}25) = 0{,}015625-1{,}5+2 = 0{,}515625 > 0 \\ \\Longrightarrow\\ [0{,}25;\\ 0{,}5]"}</MB>
            <MB>{"c_3 = 0{,}375,\\qquad f(0{,}375) \\approx 0{,}0527-2{,}25+2 = -0{,}1973 < 0 \\ \\Longrightarrow\\ [0{,}25;\\ 0{,}375]"}</MB>
          </Lepes>
          <Lepes cim="4. lépés — a becslés és a hiba">
            <KepletDoboz
              cimke="Három felezés után"
              keplet={"x_0 \\in [0{,}25;\\ 0{,}375]"}
              behelyettesitve={"x_0 \\approx \\frac{0{,}25+0{,}375}{2} = 0{,}3125"}
              eredmeny={"\\left|x_0 - 0{,}3125\\right| \\le \\frac{1-0}{2^{4}} = 0{,}0625"}
            />
            <p>
              A pontos érték <M>{"x_0 \\approx 0{,}33988"}</M>, tehát a tényleges hiba{" "}
              <M>{"\\approx 0{,}027"}</M> — jóval a garantált korláton belül ✓
            </p>
            <p>
              Tíz felezés után a hiba már <M>{"\\frac{1}{2^{11}} \\approx 0{,}0005"}</M> alatt van. A
              módszer lassú (lépésenként kb. 0,3 tizedesjegy), de{" "}
              <strong>soha nem mond csődöt</strong>, ha az induló intervallumon van előjelváltás.
            </p>
          </Lepes>
        </KidolgozottFeladat>
      </Szakasz>

      {/* ==================== KALKULÁTOROK ==================== */}
      <Szakasz
        id="kalkulator"
        cimke="3. rész"
        cim="Kalkulátorok"
        bevezeto="Ugyanazok a vizsgálatok tetszőleges képlettel. Használd a házi feladat ellenőrzésére, vagy arra, hogy ráérezz, mi hogyan változik — de a numerikus becslés soha nem helyettesíti a levezetést."
      >
        <div className="space-y-8">
          <div>
            <h3 className="mb-2 text-[16px] font-semibold text-petrol-900">Függvényvizsgáló</h3>
            <p className="mb-3 text-[14px] text-petrol-600">
              Grafikon, numerikus értelmezési tartomány-becslés, paritásteszt, értéktáblázat, valamint
              határérték-becslés egy megadott <M>{"x_0"}</M> helyen (bal és jobb oldalról,{" "}
              <M>{"10^{-1}"}</M>-től <M>{"10^{-6}"}</M>-ig) és a végtelenben. Alaphelyzetben a KF‑4
              első feladata van betöltve.
            </p>
            <FvVizsgaloKalk />
          </div>
          <div>
            <h3 className="mb-2 text-[16px] font-semibold text-petrol-900">
              Nevezetes határértékek
            </h3>
            <p className="mb-3 text-[14px] text-petrol-600">
              Az öt nevezetes határérték <M>{"a"}</M> és <M>{"b"}</M> paraméterekkel: a pontos érték és
              a numerikus közelítés egymás mellett. Figyeld meg, hol romlik el a numerika — és gondold
              végig, miért.
            </p>
            <FvNevezetesKalk />
          </div>
        </div>

        <Kiemelo tipus="tipp" cim="Mire használd a kalkulátort">
          <p>
            Arra, hogy <em>ellenőrizz</em>, ne arra, hogy helyetted számoljon. A zárthelyin nem lesz
            nálad — és a numerikus becslés nem bizonyítás. Két konkrét csapda: a{" "}
            <M>{"\\frac{\\sqrt{x+4}-2}{x}"}</M> kifejezés <M>{"x = 10^{-9}"}</M>-nél már teljesen rossz
            értéket ad (két majdnem egyenlő szám különbségét osztjuk nagyon kicsivel), a{" "}
            <M>{"\\frac{1}{\\ln x}"}</M> pedig olyan lassan tart a nullához, hogy a számokból sosem
            látnád. A számok meggyőznek, a levezetés bizonyít.
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
        <Kviz
          cim="Érted, vagy csak számolod?"
          leiras="Tíz kérdés a modul tipikus félreértéseiről. Minden válasz után rövid magyarázat."
          kerdesek={KVIZ}
        />

        <Hibakereso feladatok={HIBAK} />

        <div className="my-6">
          <p className="mb-2 text-[11px] font-bold tracking-[0.16em] text-violet-700 uppercase">
            Játék — a grafikonok felismerése
          </p>
          <FvTalald />
        </div>

        <h3 className="mt-10 text-xl font-semibold text-petrol-900">Számolós gyakorlás</h3>
        <p className="mt-2 text-[14px] text-petrol-600">
          Az öt alaptípus, ami a zárthelyin biztosan előkerül. Öt egymás utáni hibátlan megoldás után
          konfetti jár.
        </p>
        <GyakorloSzekcio />

        <h3 className="mt-10 text-xl font-semibold text-petrol-900">További feladattípusok</h3>
        <p className="mt-2 text-[14px] text-petrol-600">Ezek is bekerülnek a Zh-szimulátorba.</p>
        <GyakorloExtra />

        <Kiemelo tipus="kulcs" cim="Mikor mehetsz tovább">
          <p>
            Akkor vagy készen ezzel a modullal, ha (1) egy összetett képletről ránézésre felsorolod a
            négy tiltást, és meg tudod adni a <M>{"D_f"}</M>-et intervallumokkal, (2) egy törtfüggvény
            inverzét a <M>{"D"}</M> és <M>{"R"}</M> megadásával együtt le tudod írni, (3) a{" "}
            <M>{"\\frac00"}</M>, <M>{"\\frac{\\infty}{\\infty}"}</M>, <M>{"\\infty-\\infty"}</M> és{" "}
            <M>{"1^{\\infty}"}</M> alakokhoz automatikusan a helyes technikát választod, és (4) meg
            tudod különböztetni a három szakadástípust, valamint ki tudod mondani Bolzano és
            Weierstrass tételének <em>összes</em> feltételét.
          </p>
          <p className="mt-2">
            A következő modulban a deriválás jön: ott a határérték már nem cél, hanem{" "}
            <em>eszköz</em> — a <M>{"\\lim\\limits_{x\\to x_0}\\frac{f(x)-f(x_0)}{x-x_0}"}</M>{" "}
            kifejezés minden egyes esetben <M>{"\\frac00"}</M> alakú, és pontosan az itt tanult
            technikákkal bontható fel.
          </p>
        </Kiemelo>
      </Szakasz>
    </>
  );
}
