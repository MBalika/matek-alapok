import { ModulFejlec, SzakaszSav } from "@/components/ModulKeret";
import { Szakasz, Kartya, Kiemelo, AbraKeret, KetOszlop } from "@/components/ui/Elemek";
import { M, MB, KepletDoboz } from "@/components/ui/Keplet";
import { KidolgozottFeladat, Lepes } from "@/components/KidolgozottFeladat";
import DerSzeloFelfedezo from "@/components/abrak/DerSzeloFelfedezo";
import DerTablazatFelfedezo from "@/components/abrak/DerTablazatFelfedezo";
import DerErintoFelfedezo from "@/components/abrak/DerErintoFelfedezo";
import DerLagrangeFelfedezo from "@/components/abrak/DerLagrangeFelfedezo";
import DerFuggvenyvizsgalo from "@/components/abrak/DerFuggvenyvizsgalo";
import DerDobozFelfedezo from "@/components/abrak/DerDobozFelfedezo";
import DerTaylorFelfedezo from "@/components/abrak/DerTaylorFelfedezo";
import DerMeredekseg from "@/components/abrak/DerMeredekseg";
import {
  AbraSzeloErinto,
  AbraNemDiff,
  AbraKozepertek,
  AbraDifferencial,
} from "@/components/abrak/DerStatikusAbrak";
import { DerDerivaloKalk, DerVizsgaloKalk } from "@/components/abrak/DerKalk";
import GyakorloSzekcio from "@/components/derivalas/GyakorloSzekcio";
import GyakorloExtra from "@/components/derivalas/GyakorloExtra";
import FilmFuggvenyvizsgalat from "@/components/derivalas/FilmFuggvenyvizsgalat";
import FilmDoboz from "@/components/derivalas/FilmDoboz";
import Kviz from "@/components/Kviz";
import Hibakereso from "@/components/Hibakereso";
import { KVIZ, HIBAK } from "@/components/derivalas/KvizAdatok";
import { modulSlugAlapjan } from "@/lib/oldalterkep";

export const metadata = {
  title: "Differenciálszámítás",
  description:
    "A derivált fogalma és jelentése, deriválási szabályok, érintő és normális, implicit és paraméteres alak, középértéktételek, L'Hospital-szabály, teljes függvényvizsgálat, szélsőértékfeladatok és Taylor-polinom — interaktív ábrákkal, kidolgozott feladatokkal és gyakorlással.",
};

const modul = modulSlugAlapjan("/derivalas");

function Alcim({ children }) {
  return <h3 className="mt-10 text-xl font-semibold text-petrol-900">{children}</h3>;
}

function Proza({ children }) {
  return <div className="proza mt-3 text-[15px] leading-relaxed text-petrol-700">{children}</div>;
}

function Probald({ cim, children }) {
  return (
    <div className="mt-6">
      <p className="mb-2 text-[11px] font-bold tracking-[0.16em] text-naracs-600 uppercase">{cim}</p>
      {children}
    </div>
  );
}

export default function DerivalasOldal() {
  return (
    <>
      <ModulFejlec
        szam={5}
        cim="Differenciálszámítás"
        leiras="Ez a modul egyetlen ötletre épül: ha egy görbére elég közelről ránagyítunk, egyenesnek látszik. Ennek az egyenesnek a meredeksége a derivált — és ebből az egy számból kiolvasható, hol nő a függvény, hol van szélsőértéke, merre görbül, mihez tart egy határozatlan alak, és hogyan lehet egy bonyolult képletet polinommal helyettesíteni."
        tartalom={[
          "A differenciálhányados",
          "Deriválási szabályok, láncszabály",
          "Érintő, implicit, paraméteres alak",
          "Középértéktételek, L'Hospital",
          "Teljes függvényvizsgálat",
          "Szélsőértékfeladatok, Taylor-polinom",
        ]}
      />
      <SzakaszSav szakaszok={modul.szakaszok} />

      {/* ==================== ELMÉLET ==================== */}
      <Szakasz
        id="elmelet"
        cimke="1. rész"
        cim="Elmélet"
        bevezeto="Tizenkét gondolat, amiből az egész modul áll. Az ábrákat próbáld ki: a szelőből érintővé váló egyenes, a monotonitás-előjeltáblázat és a Taylor-polinomok egymásra simulása többet tanít, mint húsz sor magyarázat."
      >
        {/* --- 5.1 --- */}
        <h3 className="mt-2 text-xl font-semibold text-petrol-900">5.1 Miért deriválunk? — a két alapkérdés</h3>
        <Proza>
          <p>
            A differenciálszámítás két, egymástól látszólag távoli kérdésből nőtt ki, és pontosan az a szép benne, hogy
            a két kérdésre <em>ugyanaz</em> a válasz.
          </p>
          <p>
            <strong>Az érintő problémája.</strong> Egy görbéhez húzott érintő meredekségét szeretnénk kiszámolni. Csakhogy
            egy egyenes meredekségéhez <em>két</em> pont kell, az érintőnek viszont csak <em>egy</em> közös pontja van a
            görbével. A kiút: veszünk egy <strong>szelőt</strong> (ennek két metszéspontja van, tehát a meredeksége
            kiszámolható), majd a második pontot ráfuttatjuk az elsőre. A szelő ekkor „átbillen” az érintőbe.
          </p>
          <p>
            <strong>A pillanatnyi sebesség problémája.</strong> Egy mozgó test <M>{"s(t)"}</M> út–idő függvényénél az
            átlagsebesség <M>{"\\frac{s(t_1)-s(t_0)}{t_1-t_0}"}</M>. De mit jelent az, hogy a sebességmérő{" "}
            <em>ebben a pillanatban</em> 72 km/h-t mutat? Egy pillanat alatt nulla utat teszünk meg nulla idő alatt, a{" "}
            <M>{"\\frac00"}</M> hányados pedig értelmetlen. A megoldás ugyanaz: egyre rövidebb időszakaszokon számolunk
            átlagsebességet, és megnézzük, mihez tartanak ezek az értékek.
          </p>
        </Proza>

        <Kiemelo tipus="kulcs" cim="A két kérdés ugyanaz">
          <p>
            Az érintő meredeksége és a pillanatnyi sebesség ugyanannak a határértéknek a két arca. A derivált általánosan
            azt méri, hogy <strong>milyen gyorsan változik a függvény értéke a változó egységnyi változására</strong>.
            Ha ezt egyszer megérted, minden további csak technika.
          </p>
        </Kiemelo>

        <AbraKeret
          szam="5.1"
          cim="A Q pont ráfut P-re: a szelők meredeksége az érintő meredekségéhez tart. Ez a határátmenet maga a derivált."
        >
          <AbraSzeloErinto />
        </AbraKeret>

        <Kiemelo tipus="tipp" cim="Mire jó ez az építőmérnöknek?">
          <p>
            Egy tartón a megoszló terhelés, a nyíróerő és a hajlítónyomaték között <strong>deriválási kapcsolat</strong>{" "}
            áll fenn:
          </p>
          <MB>{"M'(x) = T(x), \\qquad T'(x) = -q(x), \\qquad EI\\,y''''(x) = q(x)"}</MB>
          <p>
            Innen azonnal adódik a statika egyik legfontosabb szabálya: a <strong>nyomatéki ábra szélsőértéke</strong>{" "}
            ott van, ahol a nyíróerő nullát vesz fel — ez pontosan a szélsőérték-számítás <M>{"f'=0"}</M> feltétele. A
            legkisebb anyagfelhasználású tartály vagy a leggazdaságosabb nyomvonal keresése szélsőértékfeladat; a mért
            adatok hibájának terjedését a differenciál írja le (5.12); a Newton-módszer és a végeselem-módszer alapja
            pedig az, hogy a függvényt egy pont környezetében egyenessel vagy polinommal helyettesítjük.
          </p>
        </Kiemelo>

        {/* --- 5.2 --- */}
        <Alcim>5.2 A differenciálhányados</Alcim>
        <Proza>
          <p>
            Legyen <M>{"f"}</M> értelmezve az <M>{"x_0"}</M> egy környezetében, és lépjünk <M>{"x_0"}</M>-ból{" "}
            <M>{"\\Delta x \\ne 0"}</M>-t. A függvényérték megváltozása ekkor{" "}
            <M>{"\\Delta y = f(x_0+\\Delta x)-f(x_0)"}</M>.
          </p>
        </Proza>

        <Kiemelo tipus="definicio" cim="Definíció — különbségi hányados">
          <MB>{"\\frac{\\Delta y}{\\Delta x} = \\frac{f(x_0+\\Delta x)-f(x_0)}{\\Delta x}"}</MB>
          <p>
            Ez a szám két dolgot jelent egyszerre: <strong>geometriailag</strong> az{" "}
            <M>{"\\left(x_0;\\,f(x_0)\\right)"}</M> és <M>{"\\left(x_0+\\Delta x;\\,f(x_0+\\Delta x)\\right)"}</M>{" "}
            pontokon átmenő <strong>szelő meredekségét</strong>, <strong>fizikailag</strong> pedig a{" "}
            <M>{"\\Delta x"}</M> hosszúságú szakaszra vonatkozó <strong>átlagos változási sebességet</strong>.
          </p>
        </Kiemelo>

        <Kiemelo tipus="definicio" cim="Definíció — differenciálhányados (derivált)">
          <p>Ha a</p>
          <MB>{"\\lim_{\\Delta x\\to0}\\frac{f(x_0+\\Delta x)-f(x_0)}{\\Delta x}"}</MB>
          <p>
            határérték létezik és <strong>véges</strong>, akkor <M>{"f"}</M> az <M>{"x_0"}</M> pontban{" "}
            <strong>differenciálható</strong> (deriválható), a határértéket pedig <M>{"f"}</M>{" "}
            <strong>differenciálhányadosának</strong> nevezzük az <M>{"x_0"}</M> helyen. Jele <M>{"f'(x_0)"}</M>. Az{" "}
            <M>{"x = x_0+\\Delta x"}</M> helyettesítéssel ugyanez gyakran kényelmesebb alakban:
          </p>
          <MB>{"f'(x_0) = \\lim_{x\\to x_0}\\frac{f(x)-f(x_0)}{x-x_0}"}</MB>
        </Kiemelo>

        <Kiemelo tipus="tipp" cim="Miért kell ide határérték?">
          <p>
            Mert <M>{"\\Delta x = 0"}</M> esetén a hányados <M>{"\\frac00"}</M> alakú, tehát közvetlenül nem
            számolható. A határérték viszont azt kérdezi, mihez <em>közelítenek</em> az értékek, ha <M>{"\\Delta x"}</M>{" "}
            egyre kisebb, de <strong>soha nem nulla</strong>. A derivált tehát nem osztás eredménye, hanem{" "}
            <strong>határérték</strong> — pontosan az a fogalom, amit a Sorozatok modulban építettünk fel.
          </p>
        </Kiemelo>

        <Probald cim="Próbáld ki — húzd a pontot, told a lépést nullához">
          <DerSzeloFelfedezo />
        </Probald>

        <div className="mt-5 grid gap-4 lg:grid-cols-3 [&>*]:min-w-0">
          <Kartya cimke="Jelölés" cim="Lagrange">
            <MB>{"f'(x)"}</MB>
            <p className="text-[13.5px] leading-relaxed text-petrol-600">
              Arra emlékeztet, hogy a derivált maga is <strong>függvény</strong>: minden <M>{"x"}</M>-hez rendel egy
              meredekséget.
            </p>
          </Kartya>
          <Kartya cimke="Jelölés" cim="Leibniz">
            <MB>{"\\frac{df}{dx}"}</MB>
            <p className="text-[13.5px] leading-relaxed text-petrol-600">
              A <strong>hányados</strong> jelleget hangsúlyozza, és azt, hogy mi szerint deriválunk. A láncszabály
              szinte magától adódik benne.
            </p>
          </Kartya>
          <Kartya cimke="Jelölés" cim="Newton (fizika)">
            <MB>{"\\dot s(t)"}</MB>
            <p className="text-[13.5px] leading-relaxed text-petrol-600">
              Kizárólag <strong>idő szerinti</strong> deriválásra. A pont a sebesség, a két pont a gyorsulás.
            </p>
          </Kartya>
        </div>

        <Proza>
          <p>
            Nézzünk két deriválást <strong>közvetlenül a definícióból</strong> — ez lesz a KF‑1 első fele is. Az{" "}
            <M>{"f(x)=x^2"}</M> esetén a nevezetes azonossággal
          </p>
          <MB>{"\\frac{(x_0+\\Delta x)^2 - x_0^2}{\\Delta x} = \\frac{2x_0\\Delta x + (\\Delta x)^2}{\\Delta x} = 2x_0+\\Delta x \\longrightarrow 2x_0,"}</MB>
          <p>
            tehát <M>{"\\left(x^2\\right)' = 2x"}</M>. Az <M>{"f(x)=\\frac1x"}</M> esetén közös nevezőre hozva
          </p>
          <MB>{"\\frac{\\frac{1}{x_0+\\Delta x}-\\frac{1}{x_0}}{\\Delta x} = \\frac{-\\Delta x}{\\Delta x\\, x_0(x_0+\\Delta x)} = \\frac{-1}{x_0(x_0+\\Delta x)} \\longrightarrow -\\frac{1}{x_0^2}."}</MB>
          <p>
            Mindkét esetben ugyanaz a trükk: a <M>{"\\Delta x"}</M> kiesik a nevezőből, és a maradékba már be lehet
            helyettesíteni nullát.
          </p>
        </Proza>

        <Kiemelo tipus="definicio" cim="Definíció — egyoldali derivált, derivált függvény">
          <p>
            A <M>{"\\Delta x"}</M>-et csak az egyik oldalról közelítve kapjuk a <strong>bal</strong>, illetve{" "}
            <strong>jobb oldali deriváltat</strong>. Az <M>{"f"}</M> pontosan akkor differenciálható{" "}
            <M>{"x_0"}</M>-ban, ha mindkettő létezik, véges és <strong>egyenlő</strong>.
          </p>
          <p className="mt-2">
            Ha <M>{"f"}</M> az <M>{"I"}</M> intervallum minden pontjában differenciálható, akkor az{" "}
            <M>{"x \\mapsto f'(x)"}</M> hozzárendelést <M>{"f"}</M> <strong>derivált függvényének</strong> nevezzük.
            (Zárt intervallum végpontjaiban csak egyoldali derivált értelmezhető.)
          </p>
        </Kiemelo>

        {/* --- 5.3 --- */}
        <Alcim>5.3 Differenciálhatóság és folytonosság</Alcim>

        <Kiemelo tipus="definicio" cim="Tétel — a differenciálhatóságból következik a folytonosság">
          <p>
            Ha <M>{"f"}</M> differenciálható az <M>{"x_0"}</M> pontban, akkor ott <strong>folytonos</strong> is.
          </p>
          <p className="mt-2">
            <em>Bizonyítás.</em> <M>{"x \\ne x_0"}</M> esetén
          </p>
          <MB>{"f(x)-f(x_0) = \\frac{f(x)-f(x_0)}{x-x_0}\\cdot (x-x_0)."}</MB>
          <p>
            Ha <M>{"x \\to x_0"}</M>, az első tényező <M>{"f'(x_0)"}</M>-hoz (véges számhoz) tart, a második nullához, a
            szorzat tehát nullához: <M>{"\\lim\\limits_{x\\to x_0}f(x) = f(x_0)"}</M>, ami éppen a folytonosság. ∎
          </p>
        </Kiemelo>

        <Kiemelo tipus="figyelem" cim="A megfordítás hamis">
          <p>
            A folytonosságból <strong>nem</strong> következik a differenciálhatóság. A klasszikus ellenpélda az{" "}
            <M>{"f(x)=\\left|x\\right|"}</M> a 0-ban: a különbségi hányados{" "}
            <M>{"\\frac{\\left|\\Delta x\\right|}{\\Delta x}"}</M>, ami <M>{"\\Delta x>0"}</M> esetén 1,{" "}
            <M>{"\\Delta x<0"}</M> esetén <M>{"-1"}</M>. A két egyoldali derivált tehát
          </p>
          <MB>{"f'_{\\text{jobb}}(0) = 1, \\qquad f'_{\\text{bal}}(0) = -1,"}</MB>
          <p>
            ezek nem egyenlők, így a derivált nem létezik. A grafikonon a 0-ban <strong>csúcs</strong> van: ott nem
            húzható egyértelmű érintő.
          </p>
        </Kiemelo>

        <AbraKeret
          szam="5.2"
          cim="A differenciálhatóság három tipikus módon romolhat el: szakadás, csúcs (törés), függőleges érintő. Az első esetben a folytonosság is sérül, a másik kettőben nem."
        >
          <AbraNemDiff />
        </AbraKeret>

        <Kiemelo tipus="tipp" cim="A szemléletes megfogalmazás">
          <p>
            A differenciálhatóság azt jelenti, hogy a grafikon a szóban forgó pont kicsi környezetében{" "}
            <strong>gyakorlatilag egyenesnek látszik</strong>: ha egyre jobban ránagyítunk, egyre inkább az érintőt
            látjuk. A <M>{"\\left|x\\right|"}</M> grafikonján hiába nagyítunk, a csúcs csúcs marad. Ezt a „lokális
            egyenesség” képet érdemes fejben tartani — a lineáris közelítés (5.12) pontosan ezt használja ki.
          </p>
        </Kiemelo>

        {/* --- 5.4 --- */}
        <Alcim>5.4 Deriválási szabályok</Alcim>
        <Proza>
          <p>
            A definíció alapján deriválni fáradságos; néhány szabállyal viszont minden elemi függvény deriváltja
            megkapható. Végig feltesszük, hogy <M>{"f"}</M> és <M>{"g"}</M> differenciálható a vizsgált{" "}
            <M>{"x"}</M> helyen.
          </p>
        </Proza>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 [&>*]:min-w-0">
          <Kartya cimke="1. szabály" cim="Linearitás">
            <MB>{"(c)' = 0, \\quad (cf)' = cf', \\quad (f\\pm g)' = f'\\pm g'"}</MB>
            <p className="mt-1 text-[13.5px] leading-relaxed text-petrol-600">
              Az összegszabály azért igaz, mert a különbségi hányados maga is szétesik összegre; a konstans deriváltja
              pedig azért nulla, mert ott a számláló azonosan 0.
            </p>
          </Kartya>
          <Kartya cimke="2. szabály" cim="Szorzatszabály">
            <MB>{"(fg)'(x) = f'(x)g(x)+f(x)g'(x)"}</MB>
            <p className="mt-1 text-[13.5px] leading-relaxed text-petrol-600">
              A bizonyításban a számlálóhoz hozzáadjuk és kivonjuk az <M>{"f(x)g(x+\\Delta x)"}</M> tagot, így két
              ismerős alakú rész marad.
            </p>
          </Kartya>
          <Kartya cimke="3. szabály" cim="Hányadosszabály">
            <MB>{"\\left(\\frac fg\\right)'(x) = \\frac{f'(x)g(x)-f(x)g'(x)}{g^2(x)}"}</MB>
            <p className="mt-1 text-[13.5px] leading-relaxed text-petrol-600">
              A számlálóban a <strong>sorrend számít</strong>. Ellenőrzés:{" "}
              <M>{"\\left(\\frac1x\\right)' = \\frac{0\\cdot x - 1}{x^2} = -\\frac{1}{x^2}"}</M> — egyezik az 5.2
              példával ✓
            </p>
          </Kartya>
          <Kartya cimke="4. szabály" cim="Láncszabály">
            <MB>{"\\left(f(g(x))\\right)' = f'(g(x))\\cdot g'(x)"}</MB>
            <p className="mt-1 text-[13.5px] leading-relaxed text-petrol-600">
              Szavakban: <strong>külső derivált szorozva a belső deriválttal.</strong> Leibniz-jelöléssel{" "}
              <M>{"\\frac{dy}{dx} = \\frac{dy}{du}\\cdot\\frac{du}{dx}"}</M>, mintha <M>{"du"}</M>-val
              egyszerűsítenénk.
            </p>
          </Kartya>
        </div>

        <Kiemelo tipus="figyelem" cim="A szorzat deriváltja NEM a deriváltak szorzata">
          <p>
            Gyors ellenőrzés: <M>{"f=g=x"}</M> esetén <M>{"(x\\cdot x)' = \\left(x^2\\right)' = 2x"}</M>, miközben{" "}
            <M>{"f'g' = 1\\cdot1 = 1"}</M>. Ugyanígy <M>{"\\left(\\frac fg\\right)' \\ne \\frac{f'}{g'}"}</M>. Ez a
            leggyakoribb hiba az első zárthelyin.
          </p>
        </Kiemelo>

        <Proza>
          <p>
            A láncszabály gyakorlása apró példákon a leghatékonyabb. Figyeld meg, hogy a <strong>belső derivált</strong>{" "}
            mindig egy külön szorzóként jelenik meg:
          </p>
          <MB>{"\\left(\\sin\\left(3x^2+1\\right)\\right)' = \\cos\\left(3x^2+1\\right)\\cdot 6x = 6x\\cos\\left(3x^2+1\\right)"}</MB>
          <MB>{"\\left(e^{-x^2}\\right)' = e^{-x^2}\\cdot(-2x) = -2x\\,e^{-x^2}, \\qquad \\left(\\sqrt{1+x^2}\\right)' = \\frac{1}{2\\sqrt{1+x^2}}\\cdot 2x = \\frac{x}{\\sqrt{1+x^2}}"}</MB>
          <MB>{"\\left(\\ln\\left(\\cos x\\right)\\right)' = \\frac{-\\sin x}{\\cos x} = -\\operatorname{tg} x, \\qquad \\left(\\sin^3x\\right)' = 3\\sin^2x\\cos x"}</MB>
          <p>
            Az utolsónál a <em>külső</em> függvény a köbre emelés, a belső a szinusz! Többszörös összetételnél ugyanez
            ismétlődik kívülről befelé: <M>{"\\left(e^{\\sin(2x)}\\right)' = e^{\\sin(2x)}\\cos(2x)\\cdot2"}</M>.
          </p>
        </Proza>

        <KetOszlop>
          <Kiemelo tipus="definicio" cim="Az inverz függvény deriváltja">
            <p>
              Ha <M>{"f"}</M> szigorúan monoton, differenciálható és <M>{"f'\\left(f^{-1}(x)\\right)\\ne0"}</M>, akkor
            </p>
            <MB>{"\\left(f^{-1}\\right)'(x) = \\frac{1}{f'\\left(f^{-1}(x)\\right)}"}</MB>
            <p>
              <em>Bizonyítás:</em> <M>{"f\\left(f^{-1}(x)\\right)=x"}</M>, ezt a láncszabállyal deriválva{" "}
              <M>{"f'\\left(f^{-1}(x)\\right)\\left(f^{-1}\\right)'(x)=1"}</M>. ∎
            </p>
            <p className="mt-2">
              <strong>Geometriai tartalom:</strong> az <M>{"f^{-1}"}</M> grafikonja az <M>{"f"}</M> grafikonjának
              tükörképe az <M>{"y=x"}</M> egyenesre, a tükrözés pedig az érintő meredekségét a{" "}
              <strong>reciprokára</strong> változtatja — ezért nincs értelme a formulának ott, ahol az eredeti érintő
              vízszintes volt.
            </p>
          </Kiemelo>
          <Kiemelo tipus="definicio" cim="Logaritmikus deriválás">
            <p>
              Ha az alap <em>és</em> a kitevő is <M>{"x"}</M>-től függ (például <M>{"y=x^x"}</M>), egyik alapszabály
              sem alkalmazható: ez sem hatvány-, sem exponenciális függvény. A recept: logaritmust veszünk, majd
              implicit módon deriválunk.
            </p>
            <MB>{"\\ln y = g\\ln f \\ \\Longrightarrow\\ \\frac{y'}{y} = g'\\ln f + g\\frac{f'}{f}"}</MB>
            <MB>{"y' = f^{g}\\left(g'\\ln f + g\\frac{f'}{f}\\right)"}</MB>
            <p>
              Minta: <M>{"y=x^x"}</M> esetén <M>{"\\ln y = x\\ln x"}</M>, deriválva{" "}
              <M>{"\\frac{y'}{y} = \\ln x + 1"}</M>, tehát <M>{"\\left(x^x\\right)' = x^x\\left(\\ln x+1\\right)"}</M>.
            </p>
          </Kiemelo>
        </KetOszlop>

        <Kiemelo tipus="tipp" cim="Mikor érdemes logaritmikusan deriválni?">
          <p>
            Nemcsak <M>{"f^g"}</M> alaknál: <strong>sok tényező szorzatánál</strong> is, mert a logaritmus a szorzatot
            összeggé alakítja. A <M>{"y = \\frac{(x+1)^3\\sqrt{x-2}}{(x+5)^7}"}</M> deriválása szorzat- és
            hányadosszabállyal rémálom, logaritmus után viszont három egyszerű tag összege.
          </p>
        </Kiemelo>

        {/* --- 5.5 --- */}
        <Alcim>5.5 Az alapfüggvények deriváltjai</Alcim>
        <Proza>
          <p>Ezt a táblázatot kívülről kell tudni; zárójelben az szerepel, hol érvényes a képlet.</p>
        </Proza>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 [&>*]:min-w-0">
          <Kartya cimke="Táblázat" cim="Hatvány, exponenciális, logaritmus">
            <div className="space-y-1.5 text-[14px] text-petrol-800">
              <div>
                <M>{"(c)' = 0"}</M> · <M>{"\\left(x^{\\mu}\\right)' = \\mu x^{\\mu-1}"}</M>
              </div>
              <div>
                <M>{"\\left(\\sqrt x\\right)' = \\frac{1}{2\\sqrt x}"}</M> ·{" "}
                <M>{"\\left(\\frac1x\\right)' = -\\frac{1}{x^2}"}</M>
              </div>
              <div>
                <M>{"\\left(e^x\\right)' = e^x"}</M> · <M>{"\\left(a^x\\right)' = a^x\\ln a"}</M>
              </div>
              <div>
                <M>{"\\left(\\ln x\\right)' = \\frac1x"}</M> ·{" "}
                <M>{"\\left(\\log_a x\\right)' = \\frac{1}{x\\ln a}"}</M>
              </div>
              <div>
                <M>{"\\left(\\operatorname{sh} x\\right)' = \\operatorname{ch} x"}</M> ·{" "}
                <M>{"\\left(\\operatorname{ch} x\\right)' = \\operatorname{sh} x"}</M> ·{" "}
                <M>{"\\left(\\operatorname{th} x\\right)' = \\frac{1}{\\operatorname{ch}^2 x}"}</M>
              </div>
            </div>
          </Kartya>
          <Kartya cimke="Táblázat" cim="Trigonometrikus és arkusz">
            <div className="space-y-1.5 text-[14px] text-petrol-800">
              <div>
                <M>{"\\left(\\sin x\\right)' = \\cos x"}</M> · <M>{"\\left(\\cos x\\right)' = -\\sin x"}</M>
              </div>
              <div>
                <M>{"\\left(\\operatorname{tg} x\\right)' = \\frac{1}{\\cos^2 x}"}</M> ·{" "}
                <M>{"\\left(\\operatorname{ctg} x\\right)' = -\\frac{1}{\\sin^2 x}"}</M>
              </div>
              <div>
                <M>{"\\left(\\arcsin x\\right)' = \\frac{1}{\\sqrt{1-x^2}}"}</M>{" "}
                <span className="text-[12px] text-petrol-500">
                  (<M>{"|x|<1"}</M>)
                </span>
              </div>
              <div>
                <M>{"\\left(\\arccos x\\right)' = -\\frac{1}{\\sqrt{1-x^2}}"}</M>
              </div>
              <div>
                <M>{"\\left(\\operatorname{arctg} x\\right)' = \\frac{1}{1+x^2}"}</M> ·{" "}
                <M>{"\\left(\\operatorname{arcctg} x\\right)' = -\\frac{1}{1+x^2}"}</M>
              </div>
            </div>
          </Kartya>
        </div>

        <Kiemelo tipus="figyelem" cim="Radián, nem fok!">
          <p>
            A <M>{"\\left(\\sin x\\right)'=\\cos x"}</M> képlet <strong>csak radiánban</strong> igaz, mert a levezetés
            a <M>{"\\frac{\\sin t}{t}\\to1"}</M> nevezetes határértéken alapul. Fokban mérve{" "}
            <M>{"\\sin_{\\text{fok}}(x) = \\sin\\left(\\frac{\\pi x}{180}\\right)"}</M>, tehát a láncszabály miatt egy{" "}
            <M>{"\\frac{\\pi}{180}\\approx0{,}0175"}</M> szorzó jelenne meg — minden trigonometrikus derivált 57-szeres
            hibával. Szöget deriválás (és sorfejtés) előtt <strong>mindig</strong> radiánra váltunk.
          </p>
        </Kiemelo>

        <Proza>
          <p>Négy levezetés, hogy a táblázat ne csak lista legyen:</p>
        </Proza>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 [&>*]:min-w-0">
          <Kartya cimke="1. levezetés" cim="Szinusz">
            <p className="text-[13.5px] leading-relaxed text-petrol-600">
              A <M>{"\\sin\\alpha-\\sin\\beta = 2\\cos\\frac{\\alpha+\\beta}{2}\\sin\\frac{\\alpha-\\beta}{2}"}</M>{" "}
              azonossággal:
            </p>
            <MB>{"\\frac{\\sin(x+\\Delta x)-\\sin x}{\\Delta x} = \\cos\\left(x+\\frac{\\Delta x}{2}\\right)\\cdot\\frac{\\sin\\frac{\\Delta x}{2}}{\\frac{\\Delta x}{2}} \\to \\cos x"}</MB>
          </Kartya>
          <Kartya cimke="2. levezetés" cim="Exponenciális">
            <MB>{"\\frac{e^{x+\\Delta x}-e^x}{\\Delta x} = e^x\\cdot\\frac{e^{\\Delta x}-1}{\\Delta x} \\to e^x"}</MB>
            <p className="text-[13.5px] leading-relaxed text-petrol-600">
              Általános alapra <M>{"a^x = e^{x\\ln a}"}</M>, tehát a láncszabállyal{" "}
              <M>{"\\left(a^x\\right)' = a^x\\ln a"}</M>: az <M>{"e"}</M> pontosan az az alap, amelynél ez a szorzó 1 —
              ezért „természetes”.
            </p>
          </Kartya>
          <Kartya cimke="3. levezetés" cim="Logaritmus (inverz szabállyal)">
            <p className="text-[13.5px] leading-relaxed text-petrol-600">
              <M>{"y=\\ln x"}</M>, azaz <M>{"x = e^y"}</M>, tehát
            </p>
            <MB>{"\\left(\\ln x\\right)' = \\frac{1}{\\left(e^y\\right)'} = \\frac{1}{e^y} = \\frac1x"}</MB>
          </Kartya>
          <Kartya cimke="4. levezetés" cim="Arkusz tangens">
            <p className="text-[13.5px] leading-relaxed text-petrol-600">
              <M>{"y=\\operatorname{arctg} x"}</M>, azaz <M>{"\\operatorname{tg} y = x"}</M>; az inverz szabállyal{" "}
              <M>{"\\left(\\operatorname{arctg} x\\right)' = \\cos^2 y"}</M>, és az{" "}
              <M>{"1+\\operatorname{tg}^2y = \\frac{1}{\\cos^2y}"}</M> azonosságból
            </p>
            <MB>{"\\cos^2y = \\frac{1}{1+x^2}"}</MB>
          </Kartya>
        </div>

        <Probald cim="Próbáld ki — a derivált mint „meredekség-függvény”">
          <DerTablazatFelfedezo />
        </Probald>

        {/* --- 5.6 --- */}
        <Alcim>5.6 Érintő és normális; implicit és paraméteres alak</Alcim>

        <Kiemelo tipus="definicio" cim="Az érintő és a normális egyenlete">
          <MB>{"\\text{érintő: } \\ y = f'(x_0)\\left(x-x_0\\right)+f(x_0)"}</MB>
          <MB>{"\\text{normális: } \\ y = -\\frac{1}{f'(x_0)}\\left(x-x_0\\right)+f(x_0)"}</MB>
          <p>
            A <strong>normális</strong> az érintőre merőleges egyenes az érintési pontban; a merőlegesség miatt
            meredeksége a negatív reciprok (ez <M>{"f'(x_0)\\ne0"}</M> esetén értelmes — vízszintes érintőnél a
            normális függőleges).
          </p>
        </Kiemelo>

        <Kiemelo tipus="figyelem" cim="Két hiba, ami mindig előjön">
          <p>
            <strong>1.</strong> A meredekség helyére a derivált <em>függvény</em> kerül a konkrét{" "}
            <M>{"f'(x_0)"}</M> <strong>szám</strong> helyett — így az „érintő” nem is egyenes lesz.{" "}
            <strong>2.</strong> Lemarad az <M>{"f(x_0)"}</M> tag, és az egyenes nem megy át az érintési ponton.
            Ellenőrzés: helyettesíts <M>{"x=x_0"}</M>-t az egyenletbe, és jöjjön ki <M>{"f(x_0)"}</M>.
          </p>
        </Kiemelo>

        <Probald cim="Próbáld ki — érintő és normális bármely pontban">
          <DerErintoFelfedezo />
        </Probald>

        <Proza>
          <p>
            <strong>Implicit alak.</strong> Sok görbét nem <M>{"y=f(x)"}</M>, hanem egy <M>{"F(x,y)=0"}</M> egyenlet ad
            meg (például a kör: <M>{"x^2+y^2=25"}</M>); ilyenkor nem kell — és gyakran nem is lehet —{" "}
            <M>{"y"}</M>-t kifejezni. A módszer: tekintsük <M>{"y"}</M>-t az <M>{"x"}</M> függvényének, és deriváljuk
            az egyenlet <strong>mindkét oldalát</strong> <M>{"x"}</M> szerint. Az <M>{"y"}</M>-t tartalmazó tagoknál a
            láncszabály miatt megjelenik egy <M>{"y'"}</M> szorzó:
          </p>
          <MB>{"\\left(y^2\\right)' = 2y\\,y', \\qquad \\left(xy\\right)' = y + xy', \\qquad \\left(\\sin y\\right)' = \\cos y\\cdot y'"}</MB>
          <p>
            Végül a kapott egyenletből <M>{"y'"}</M>-t kifejezzük. A körnél:{" "}
            <M>{"2x+2yy'=0"}</M>, azaz <M>{"y' = -\\frac{x}{y}"}</M>; a <M>{"(3;\\,4)"}</M> pontban{" "}
            <M>{"y' = -\\frac34"}</M>, az érintő <M>{"3x+4y=25"}</M>. Szemléleti ellenőrzés: a kör érintője merőleges a
            sugárra; a sugár meredeksége <M>{"\\frac43"}</M>, a merőlegesé <M>{"-\\frac34"}</M> ✓
          </p>
          <p>
            <strong>Paraméteres alak.</strong> Ha a görbét az <M>{"x=x(t)"}</M>, <M>{"y=y(t)"}</M> alak adja meg, és{" "}
            <M>{"\\dot x(t)\\ne0"}</M>, akkor
          </p>
          <MB>{"\\frac{dy}{dx} = \\frac{\\dot y(t)}{\\dot x(t)}, \\qquad \\frac{d^2y}{dx^2} = \\frac{\\ddot y \\dot x - \\dot y \\ddot x}{\\dot x^3}"}</MB>
          <p>
            A második deriváltnál arra kell ügyelni, hogy az <M>{"\\frac{\\dot y}{\\dot x}"}</M> hányadost{" "}
            <M>{"t"}</M> szerint deriváljuk, majd <em>még egyszer</em> osztunk <M>{"\\dot x"}</M>-tal — mert{" "}
            <M>{"\\frac{d}{dx} = \\frac{1}{\\dot x}\\cdot\\frac{d}{dt}"}</M>.
          </p>
        </Proza>

        {/* --- 5.7 --- */}
        <Alcim>5.7 Magasabbrendű deriváltak</Alcim>

        <Kiemelo tipus="definicio" cim="Definíció">
          <p>
            Ha az <M>{"f'"}</M> derivált függvény maga is differenciálható, a deriváltját <M>{"f"}</M>{" "}
            <strong>második deriváltjának</strong> nevezzük: <M>{"f''(x) = \\left(f'(x)\\right)'"}</M>. Hasonlóan{" "}
            <M>{"f'''"}</M>, és <M>{"n\\ge4"}</M> esetén <M>{"f^{(n)}"}</M>. Leibniz-jelöléssel{" "}
            <M>{"\\frac{d^2y}{dx^2}"}</M>.
          </p>
        </Kiemelo>

        <KetOszlop>
          <div>
            <Kiemelo tipus="tipp" cim="Mit jelentenek?">
              <p>
                Ha <M>{"s(t)"}</M> az út, akkor <M>{"\\dot s = v"}</M> a sebesség, <M>{"\\ddot s = a"}</M> a gyorsulás.
                Geometriailag az első derivált a meredekség, a második a <strong>görbültség iránya</strong>:{" "}
                <M>{"f''>0"}</M> esetén a grafikon felfelé nyílik (konvex), <M>{"f''<0"}</M> esetén lefelé (konkáv).
              </p>
              <p className="mt-2">
                Építőmérnöki nyelven: ha <M>{"y(x)"}</M> a lehajlás, akkor <M>{"y'"}</M> az elfordulás,{" "}
                <M>{"y''"}</M> arányos a hajlítónyomatékkal, <M>{"y'''"}</M> a nyíróerővel, <M>{"y''''"}</M> a
                megoszló terheléssel. A tartó viselkedése tehát végig deriváltakkal írható le.
              </p>
            </Kiemelo>
          </div>
          <Kartya cimke="Három minta" cim="Ismétlődő deriváltak">
            <p className="text-[13.5px] leading-relaxed text-petrol-600">
              A szinusz deriváltjai négyesével ismétlődnek:
            </p>
            <MB>{"\\left(\\sin x\\right)^{(n)} = \\sin\\left(x+n\\frac{\\pi}{2}\\right)"}</MB>
            <p className="text-[13.5px] leading-relaxed text-petrol-600">
              Az <M>{"f(x)=e^{2x}"}</M>-nél minden deriválás egy 2-es szorzót hoz be:{" "}
              <M>{"f^{(n)}(x) = 2^n e^{2x}"}</M>.
            </p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-petrol-600">
              Az <M>{"f(x)=x^3+3x^2+5x+1"}</M> deriváltjai <M>{"3x^2+6x+5"}</M>, <M>{"6x+6"}</M>, <M>{"6"}</M>,{" "}
              <M>{"0"}</M>: egy <M>{"n"}</M>-edfokú polinom <M>{"(n+1)"}</M>-edik deriváltja mindig azonosan nulla. Az{" "}
              <M>{"x=1"}</M> helyen <M>{"f(1)=10"}</M>, <M>{"f'(1)=14"}</M>, <M>{"f''(1)=12"}</M>,{" "}
              <M>{"f'''(1)=6"}</M> — ezekre az 5.12-ben lesz szükségünk.
            </p>
          </Kartya>
        </KetOszlop>

        <Proza>
          <p>
            Szorzatra a binomiális tételre emlékeztető <strong>Leibniz-szabály</strong> érvényes:
          </p>
          <MB>{"\\left(fg\\right)^{(n)} = \\sum_{k=0}^{n}\\binom nk f^{(k)}g^{(n-k)}"}</MB>
        </Proza>

        {/* --- 5.8 --- */}
        <Alcim>5.8 A differenciálszámítás középértéktételei</Alcim>
        <Proza>
          <p>
            Ez a fejezet elméletinek tűnhet, de éppen ezek a tételek <em>indokolják meg</em> mindazt, amit a
            függvényvizsgálatban és a L&apos;Hospital-szabálynál teszünk. Ha valaki megkérdezi, „miért igaz, hogy{" "}
            <M>{"f'>0"}</M> esetén a függvény nő”, a válasz a Lagrange-tétel.
          </p>
        </Proza>

        <Kiemelo tipus="definicio" cim="Fermat-tétel — a belső szélsőérték szükséges feltétele">
          <p>
            Ha <M>{"f"}</M>-nek az intervallum <strong>belső</strong> <M>{"c"}</M> pontjában lokális szélsőértéke van,
            és <M>{"f"}</M> differenciálható <M>{"c"}</M>-ben, akkor <M>{"f'(c)=0"}</M>.
          </p>
          <p className="mt-2">
            <em>Bizonyítás (maximum esetén).</em> Kis <M>{"\\Delta x"}</M>-re{" "}
            <M>{"f(c+\\Delta x)-f(c)\\le0"}</M>, tehát a különbségi hányados előjelét az osztó előjele dönti el:{" "}
            <M>{"\\Delta x>0"}</M>-ból <M>{"f'_{\\text{jobb}}(c)\\le0"}</M>, <M>{"\\Delta x<0"}</M>-ból{" "}
            <M>{"f'_{\\text{bal}}(c)\\ge0"}</M>. Mivel a két egyoldali derivált egyenlő, ez csak{" "}
            <M>{"f'(c)=0"}</M> mellett lehetséges. ∎
          </p>
        </Kiemelo>

        <Kiemelo tipus="figyelem" cim="Csak szükséges, nem elégséges!">
          <p>
            Az <M>{"f(x)=x^3"}</M> függvénynél <M>{"f'(0)=0"}</M>, mégsincs szélsőérték. A tétel ráadásul csak{" "}
            <strong>belső</strong> pontokra és <strong>differenciálható</strong> függvényre szól: az intervallum
            végpontjában vagy egy csúcsban (mint <M>{"\\left|x\\right|"}</M> a 0-ban) nulla derivált nélkül is lehet
            szélsőérték.
          </p>
        </Kiemelo>

        <KetOszlop>
          <Kiemelo tipus="definicio" cim="Rolle tétele">
            <p>
              Ha <M>{"f"}</M> folytonos az <M>{"[a;\\,b]"}</M> zárt intervallumon, differenciálható a belsejében, és{" "}
              <M>{"f(a)=f(b)"}</M>, akkor létezik olyan <M>{"c"}</M> (<M>{"a<c<b"}</M>), amelyre{" "}
              <M>{"f'(c)=0"}</M>.
            </p>
            <p className="mt-2">
              Szemléletesen: ha a görbe ugyanolyan magasan indul és érkezik, közben van olyan pont, ahol{" "}
              <strong>vízszintes az érintő</strong> — valahol meg kell fordulnia.
            </p>
          </Kiemelo>
          <Kiemelo tipus="definicio" cim="Lagrange középértéktétele">
            <p>
              Ha <M>{"f"}</M> folytonos <M>{"[a;\\,b]"}</M>-n és differenciálható a belsejében, akkor van olyan{" "}
              <M>{"c"}</M>, amelyre
            </p>
            <MB>{"f'(c) = \\frac{f(b)-f(a)}{b-a}"}</MB>
            <p>
              <em>Bizonyítás:</em> vonjuk ki <M>{"f"}</M>-ből a húr egyenletét; a különbségre <M>{"g(a)=g(b)=0"}</M>,
              tehát alkalmazható a Rolle-tétel. ∎
            </p>
          </Kiemelo>
        </KetOszlop>

        <AbraKeret
          szam="5.3"
          cim="Rolle és Lagrange tétele: a c helyen az érintő vízszintes, illetve párhuzamos a húrral. A Rolle-tétel a Lagrange speciális esete, amikor f(a) = f(b)."
        >
          <AbraKozepertek />
        </AbraKeret>

        <Kiemelo tipus="tipp" cim="Mit mond ez valójában?">
          <p>
            A jobb oldal az <strong>átlagos</strong>, a bal oldal a <strong>pillanatnyi</strong> változási sebesség: van
            tehát olyan pillanat, amikor a kettő egyenlő. Ha egy autó 2 óra alatt 180 km-t tett meg, volt olyan
            pillanat, amikor a sebességmérője pontosan 90 km/h-t mutatott — erre épül a szakaszos sebességellenőrzés.
          </p>
        </Kiemelo>

        <Probald cim="Próbáld ki — húzd a végpontokat, keresd a ξ helyeket">
          <DerLagrangeFelfedezo />
        </Probald>

        <Kiemelo tipus="kulcs" cim="A Lagrange-tétel négy következménye">
          <p>
            Legyen <M>{"f"}</M> differenciálható az <M>{"I"}</M> intervallumon.
          </p>
          <p className="mt-2">
            <strong>1.</strong> Ha <M>{"f'\\equiv0"}</M>, akkor <M>{"f"}</M> <strong>konstans</strong>. ·{" "}
            <strong>2.</strong> Ha <M>{"f' = g'"}</M>, akkor <M>{"f"}</M> és <M>{"g"}</M> csak konstansban tér el —{" "}
            <em>ez az integrálszámítás „+C” tagjának oka</em>. · <strong>3.</strong> Ha <M>{"f'>0"}</M>, akkor{" "}
            <M>{"f"}</M> szigorúan monoton nő; ha <M>{"f'<0"}</M>, szigorúan csökken. · <strong>4.</strong> Ha{" "}
            <M>{"\\left|f'\\right|\\le K"}</M>, akkor{" "}
            <M>{"\\left|f(x_1)-f(x_2)\\right| \\le K\\left|x_1-x_2\\right|"}</M>.
          </p>
        </Kiemelo>

        <Proza>
          <p>
            <strong>Egyenlőtlenség bizonyítása középértéktétellel.</strong> Igazoljuk, hogy{" "}
            <M>{"e^x\\ge1+x"}</M>. Legyen <M>{"h(x)=e^x-1-x"}</M>; ekkor <M>{"h(0)=0"}</M>, és{" "}
            <M>{"h'(x)=e^x-1"}</M> az <M>{"x>0"}</M> helyeken pozitív, <M>{"x<0"}</M>-on negatív. A 3. következmény
            szerint <M>{"h"}</M> a 0 előtt csökken, utána nő, tehát ott <strong>globális minimuma</strong> van, értéke
            0; így <M>{"h(x)\\ge0"}</M> mindenütt. ∎ Geometriailag: az <M>{"e^x"}</M> görbe mindenütt a 0-beli
            érintője fölött halad — ez a konvexitás következménye.
          </p>
          <p>
            Végül a <strong>Cauchy-féle középértéktétel</strong>: ha <M>{"f"}</M> és <M>{"g"}</M> folytonos{" "}
            <M>{"[a;\\,b]"}</M>-n, differenciálható a belsejében és <M>{"g'\\ne0"}</M>, akkor van olyan{" "}
            <M>{"c"}</M>, amelyre
          </p>
          <MB>{"\\frac{f'(c)}{g'(c)} = \\frac{f(b)-f(a)}{g(b)-g(a)}"}</MB>
          <p>
            A <M>{"g(x)=x"}</M> választással visszakapjuk a Lagrange-tételt, tehát ez valódi általánosítás; a
            jelentősége az, hogy a <strong>L&apos;Hospital-szabály bizonyítása</strong> rajta múlik.
          </p>
        </Proza>

        {/* --- 5.9 --- */}
        <Alcim>5.9 A L&apos;Hospital-szabály</Alcim>
        <Proza>
          <p>
            A <M>{"\\frac fg"}</M> típusú határértékek könnyen számolhatók, amíg a nevező határértéke nem nulla. Gond
            akkor van, ha a hányados <M>{"\\frac00"}</M> vagy <M>{"\\frac{\\infty}{\\infty}"}</M> alakú — ezek{" "}
            <strong>határozatlan alakok</strong>: pusztán az alakból nem derül ki a határérték. Mindhárom alábbi{" "}
            <M>{"\\frac00"}</M> alakú, mégis három különböző az eredmény:
          </p>
          <MB>{"\\lim_{x\\to0}\\frac{x}{x} = 1, \\qquad \\lim_{x\\to0}\\frac{x^2}{x} = 0, \\qquad \\lim_{x\\to0}\\frac{x}{x^2} = \\infty"}</MB>
        </Proza>

        <Kiemelo tipus="definicio" cim="A L'Hospital-szabály">
          <p>
            Tegyük fel, hogy <M>{"f"}</M> és <M>{"g"}</M> differenciálható az <M>{"a"}</M> pont egy környezetében
            (magát az <M>{"a"}</M> pontot esetleg kivéve), ott <M>{"g'(x)\\ne0"}</M>, és mindkét függvény határértéke 0
            (vagy mindkettő abszolút értékben végtelen). Ha a deriváltak hányadosának van határértéke, akkor
          </p>
          <MB>{"\\lim_{x\\to a}\\frac{f(x)}{g(x)} = \\lim_{x\\to a}\\frac{f'(x)}{g'(x)}"}</MB>
          <p>
            A szabály <M>{"a=\\pm\\infty"}</M> esetén és egyoldali határértékekre is érvényes.{" "}
            <em>A bizonyítás gondolata:</em> Cauchy tétele szerint valamely, az <M>{"a"}</M> és <M>{"x"}</M> közé eső{" "}
            <M>{"\\xi"}</M>-re <M>{"\\frac{f(x)}{g(x)} = \\frac{f'(\\xi)}{g'(\\xi)}"}</M>, és ha{" "}
            <M>{"x\\to a"}</M>, akkor a közrefogott <M>{"\\xi"}</M> is <M>{"a"}</M>-hoz tart. ∎
          </p>
        </Kiemelo>

        <Kiemelo tipus="figyelem" cim="Három gyakori félreértés">
          <p>
            <strong>1. Csak határozatlan alakra szabad alkalmazni.</strong> Először <em>mindig</em> helyettesíts be:{" "}
            <M>{"\\lim\\limits_{x\\to0}\\frac{\\cos x}{x+1} = 1"}</M>, itt deriválva hamis 0-t kapnánk.{" "}
            <strong>2. Ez nem a hányadosszabály!</strong> A számlálót és a nevezőt <strong>külön-külön</strong>{" "}
            deriváljuk. <strong>3. Nem mindig segít:</strong> ha a deriváltak hányadosának nincs határértéke, a szabály
            nem mond semmit — <M>{"\\lim\\limits_{x\\to\\infty}\\frac{x+\\sin x}{x} = 1"}</M>, de a deriváltak
            hányadosa <M>{"1+\\cos x"}</M>, aminek nincs határértéke.
          </p>
        </Kiemelo>

        <Kartya cimke="Táblázat" cim="A többi öt határozatlan alak visszavezetése" className="mt-5">
          <div className="space-y-2 text-[14px] text-petrol-800">
            <p>
              <M>{"0\\cdot\\infty"}</M> → <M>{"f\\cdot g = \\dfrac{f}{1/g}"}</M> → <M>{"\\frac00"}</M> vagy{" "}
              <M>{"\\frac{\\infty}{\\infty}"}</M>
            </p>
            <p>
              <M>{"\\infty-\\infty"}</M> → közös nevező, gyöktelenítés → <M>{"\\frac00"}</M>
            </p>
            <p>
              <M>{"0^0,\\ \\infty^0,\\ 1^{\\infty}"}</M> → <M>{"f^g = e^{g\\ln f}"}</M>, a{" "}
              <strong>kitevőt</strong> vizsgáljuk → <M>{"0\\cdot\\infty"}</M>
            </p>
          </div>
          <p className="mt-3 text-[13.5px] leading-relaxed text-petrol-600">
            A hatványalakoknál mindig logaritmust veszünk: ha <M>{"y = f^{g}"}</M>, akkor{" "}
            <M>{"\\ln y = g\\ln f"}</M>; ennek a határértékét számoljuk ki, majd a végén{" "}
            <strong>visszaexponenciálunk</strong>: ha <M>{"\\ln y\\to L"}</M>, akkor <M>{"y\\to e^L"}</M>. A
            visszaexponenciálást ne felejtsd el — ez a fejezet legdrágább egysoros hibája.
          </p>
        </Kartya>

        <Kiemelo tipus="tipp" cim="A növekedési rangsor — egy sorban">
          <p>
            Tetszőleges <M>{"n"}</M> kitevőre és <M>{"a>1"}</M> alapra
          </p>
          <MB>{"\\lim_{x\\to\\infty}\\frac{\\ln x}{x^n} = 0 \\qquad\\text{és}\\qquad \\lim_{x\\to\\infty}\\frac{x^n}{a^x} = 0,"}</MB>
          <p>
            azaz <strong>a logaritmus lassabban nő minden hatványnál, a hatvány pedig minden exponenciálisnál</strong>.
            Ez ugyanaz a rangsor, amit a Sorozatok modulban láttál — csak most már be is tudjuk bizonyítani:{" "}
            <M>{"\\frac{x^2}{e^x}\\to\\frac{2x}{e^x}\\to\\frac{2}{e^x}\\to0"}</M>.
          </p>
        </Kiemelo>

        {/* --- 5.10 --- */}
        <Alcim>5.10 Teljes függvényvizsgálat</Alcim>
        <Proza>
          <p>
            A cél a grafikon <strong>alakhelyes</strong> felvázolása és a függvény jellemzőinek megadása pusztán a
            képletből. Az egész eljárás két előjeltáblázatra épül: az elsőn a monotonitást, a másodikon a görbületet
            olvassuk le.
          </p>
        </Proza>

        <KetOszlop>
          <Kiemelo tipus="definicio" cim="Monotonitás és szélsőérték">
            <p>
              Differenciálható függvényre <M>{"f'\\ge0"}</M> pontosan akkor, ha <M>{"f"}</M> monoton nő. Ha a belső
              pontokban <M>{"f'>0"}</M>, a monotonitás <strong>szigorú</strong>. (A bizonyítás a Lagrange-tétel:{" "}
              <M>{"f(x_2)-f(x_1) = f'(c)(x_2-x_1)"}</M>.)
            </p>
            <p className="mt-2">
              <strong>Elsőrendű (előjelváltásos) teszt.</strong> Ha <M>{"f'"}</M> az <M>{"x_0"}</M> helyen pozitívról
              negatívra vált, ott lokális <strong>maximum</strong>; ha negatívról pozitívra, lokális{" "}
              <strong>minimum</strong> van. Ha nincs előjelváltás, nincs szélsőérték sem.
            </p>
            <p className="mt-2">
              <strong>Másodrendű teszt.</strong> Ha <M>{"f'(x_0)=0"}</M>, akkor <M>{"f''(x_0)<0"}</M> esetén maximum,{" "}
              <M>{"f''(x_0)>0"}</M> esetén minimum van; <M>{"f''(x_0)=0"}</M> esetén a teszt{" "}
              <strong>nem dönt</strong>.
            </p>
          </Kiemelo>
          <Kiemelo tipus="definicio" cim="Konvexitás és inflexió">
            <p>
              Az <M>{"f"}</M> az <M>{"I"}</M>-n <strong>konvex</strong>, ha bármely két pontját összekötő húr a
              grafikon <strong>fölött</strong> halad; <strong>konkáv</strong>, ha a húr alatta van. Kétszer
              differenciálható függvényre <M>{"f''>0"}</M> esetén konvex, <M>{"f''<0"}</M> esetén konkáv.
            </p>
            <p className="mt-2">
              Az <M>{"x_0"}</M> hely <strong>inflexiós pont</strong>, ha ott a függvény konvexből konkávba (vagy
              fordítva) vált. Ehhez <em>szükséges</em>, hogy <M>{"f''(x_0)=0"}</M> legyen, <em>elégséges</em> pedig,
              hogy <M>{"f''"}</M> ott <strong>előjelet váltson</strong>.
            </p>
            <p className="mt-2">
              Memorizálás: ha <M>{"f''>0"}</M>, akkor <M>{"f'"}</M> nő — a meredekség egyre nagyobb, a grafikon
              „mosolyog”. Mérnöki kép: a saját súlya alatt belógó kötél (láncgörbe, <M>{"\\operatorname{ch} x"}</M>)
              konvex.
            </p>
          </Kiemelo>
        </KetOszlop>

        <Kiemelo tipus="figyelem" cim="Két csapda a szélsőértéknél és az inflexiónál">
          <p>
            <strong>A szigorú monotonitáshoz nem kell, hogy a derivált sehol se legyen nulla:</strong> az{" "}
            <M>{"x^3"}</M> szigorúan monoton nő, pedig <M>{"f'(0)=0"}</M>. Ezért az „akkor és csak akkor” csak a nem
            szigorú változatra igaz.
          </p>
          <p className="mt-2">
            <strong>Az <M>{"f''(x_0)=0"}</M> önmagában nem elég az inflexióhoz:</strong> az{" "}
            <M>{"f(x)=x^4"}</M> esetén <M>{"f''(0)=0"}</M>, de <M>{"f''(x)=12x^2\\ge0"}</M> mindenütt — nincs
            előjelváltás, tehát a 0 <strong>nem</strong> inflexiós pont (hanem minimumhely).
          </p>
        </Kiemelo>

        <Kiemelo tipus="definicio" cim="Aszimptoták">
          <p>
            <strong>Függőleges</strong> aszimptota az <M>{"x=a"}</M> egyenes, ha ott a függvény határértéke{" "}
            <M>{"\\pm\\infty"}</M> (jellemzően a nevező zérushelyeinél). <strong>Vízszintes</strong> az{" "}
            <M>{"y=b"}</M>, ha <M>{"\\lim\\limits_{x\\to\\pm\\infty}f(x) = b"}</M>. <strong>Ferde</strong> az{" "}
            <M>{"y=mx+b"}</M>, ha
          </p>
          <MB>{"m = \\lim_{x\\to\\pm\\infty}\\frac{f(x)}{x} \\quad\\text{és}\\quad b = \\lim_{x\\to\\pm\\infty}\\left(f(x)-mx\\right)"}</MB>
          <p>
            létezik és véges, <M>{"m\\ne0"}</M>. <strong>Vízszintes és ferde kizárja egymást</strong> ugyanabban az
            irányban. Racionális törtfüggvénynél egyszerű a szabály: ha a számláló foka <strong>eggyel</strong> nagyobb
            a nevezőénél, van ferde aszimptota, és polinomosztással azonnal meg is kapjuk — például{" "}
            <M>{"\\frac{x^2}{x-1} = x+1+\\frac{1}{x-1}"}</M>.
          </p>
        </Kiemelo>

        <Kiemelo tipus="kulcs" cim="A teljes vizsgálat menete — mindig ebben a sorrendben">
          <p>
            <strong>1.</strong> Értelmezési tartomány, szakadási helyek. · <strong>2.</strong> Zérushelyek,
            tengelymetszet. · <strong>3.</strong> Paritás (páros: <M>{"f(-x)=f(x)"}</M>; páratlan:{" "}
            <M>{"f(-x)=-f(x)"}</M>), periodicitás. · <strong>4.</strong> Határértékek az értelmezési tartomány szélein
            és a szakadásoknál, aszimptoták. · <strong>5.</strong> <M>{"f'"}</M> zérushelyei és előjeltáblázata:
            monotonitás, lokális szélsőértékek. · <strong>6.</strong> <M>{"f''"}</M> zérushelyei és előjeltáblázata:
            konvexitás, inflexió. · <strong>7.</strong> Értékkészlet, majd a grafikon felvázolása.
          </p>
        </Kiemelo>

        <Probald cim="Próbáld ki — f, f ′ és f ″ egymás alatt">
          <DerFuggvenyvizsgalo />
        </Probald>

        {/* --- 5.11 --- */}
        <Alcim>5.11 Szélsőértékfeladatok</Alcim>

        <Kiemelo tipus="definicio" cim="Weierstrass tétele — és hol keressük a szélsőértéket">
          <p>
            Zárt, korlátos intervallumon folytonos függvény felveszi a legnagyobb és a legkisebb értékét. Globális
            szélsőérték csak <strong>háromféle</strong> helyen lehet:
          </p>
          <p className="mt-2">
            <strong>1.</strong> <strong>stacionárius pontban</strong> (<M>{"f'=0"}</M>), · <strong>2.</strong> olyan
            pontban, ahol <M>{"f"}</M> <strong>nem differenciálható</strong> (csúcs, törés), · <strong>3.</strong> az
            intervallum <strong>végpontjaiban</strong>.
          </p>
          <p className="mt-2">
            Összegyűjtjük tehát az összes ilyen gyanús helyet, és összehasonlítjuk az ott felvett függvényértékeket.
            Semmilyen deriválás nem helyettesíti ezt az összehasonlítást.
          </p>
        </Kiemelo>

        <Kiemelo tipus="figyelem" cim="A végpontokat ne hagyd ki!">
          <p>
            Az <M>{"f(x)=e^{-\\left|x\\right|}"}</M> a <M>{"[-2;\\,3]"}</M> intervallumon: a 0-ban csúcs van, máshol a
            derivált nem nulla. A gyanús helyeken <M>{"f(0)=1"}</M>, <M>{"f(-2)\\approx0{,}135"}</M>,{" "}
            <M>{"f(3)\\approx0{,}0498"}</M> — a globális maximum tehát 1 az <M>{"x=0"}</M> helyen (ahol nincs is
            derivált!), a minimum pedig a <M>{"x=3"}</M> végpontban.
          </p>
        </Kiemelo>

        <Kiemelo tipus="kulcs" cim="Szöveges optimalizálás — a hatlépéses recept">
          <p>
            <strong>1. Rajz</strong> és jelölések. · <strong>2.</strong> A szélsőértékre vizsgálandó mennyiség felírása
            (általában több változóval). · <strong>3.</strong> A <strong>kényszerfeltétel</strong> felírása (adott
            kerület, térfogat stb.), és vele a fölös változók kiküszöbölése — maradjon <strong>egyetlen</strong>{" "}
            változó. · <strong>4.</strong> Az <strong>értelmezési tartomány</strong> tisztázása (mely értékek
            lehetségesek fizikailag). · <strong>5.</strong> Deriválás, stacionárius pontok, a szélsőérték jellegének
            igazolása, a végpontok ellenőrzése. · <strong>6.</strong> <strong>Visszatérés a szöveghez</strong>: a
            kérdezett mennyiség megadása mértékegységgel.
          </p>
        </Kiemelo>

        <Probald cim="Próbáld ki — a klasszikus dobozfeladat">
          <DerDobozFelfedezo />
        </Probald>

        <Proza>
          <p>
            Két további klasszikus, amit érdemes fejből tudni. <strong>A leggazdaságosabb hengeres tartály:</strong>{" "}
            adott <M>{"V"}</M> térfogatnál a felület <M>{"A = 2r^2\\pi+2r\\pi h"}</M>, a kényszer{" "}
            <M>{"V = r^2\\pi h"}</M>, ahonnan <M>{"h = \\frac{V}{r^2\\pi}"}</M>, és egyetlen változó marad:
          </p>
          <MB>{"A(r) = 2r^2\\pi + \\frac{2V}{r}, \\qquad A'(r) = 4r\\pi - \\frac{2V}{r^2} = 0 \\ \\Longrightarrow\\ r = \\sqrt[3]{\\frac{V}{2\\pi}}"}</MB>
          <p>
            Ez valóban minimum, mert <M>{"A''(r) = 4\\pi+\\frac{4V}{r^3}>0"}</M> minden <M>{"r>0"}</M>-ra. A tanulság
            szép: a hozzá tartozó magasság <M>{"h = \\frac{V}{r^2\\pi} = 2r"}</M>, vagyis{" "}
            <strong>a magasság egyenlő az átmérővel</strong>.
          </p>
          <p>
            <strong>A ferde hajítás:</strong> a repülési idő <M>{"t = \\frac{2v_0\\sin\\alpha}{g}"}</M>, tehát a
            vízszintes távolság <M>{"s(\\alpha) = \\frac{v_0^2\\sin2\\alpha}{g}"}</M>. Innen{" "}
            <M>{"s'(\\alpha) = \\frac{2v_0^2\\cos2\\alpha}{g} = 0"}</M> miatt <M>{"\\alpha = 45^\\circ"}</M>, és mivel
            ott <M>{"s''<0"}</M>, ez maximum: <M>{"s_{\\max} = \\frac{v_0^2}{g}"}</M>.
          </p>
        </Proza>

        {/* --- 5.12 --- */}
        <Alcim>5.12 Miért szép? — a Taylor-polinom és a lineáris közelítés</Alcim>
        <Proza>
          <p>
            A polinomok értéke négy alapművelettel kiszámolható, az <M>{"e^x"}</M>, a <M>{"\\sin x"}</M> vagy az{" "}
            <M>{"\\ln x"}</M> értéke viszont nem. Kézenfekvő a kérdés: <strong>melyik az a legfeljebb </strong>
            <M>{"n"}</M>-<strong>edfokú polinom, amely egy adott </strong>
            <M>{"a"}</M> <strong>pont környezetében a legjobban közelíti a függvényt?</strong> A válasz: az, amelyik az{" "}
            <M>{"a"}</M> helyen nemcsak a függvényértékben, hanem az <strong>első <M>{"n"}</M> deriváltjában is</strong>{" "}
            megegyezik vele. (Az első derivált egyezése a meredekséget, a másodiké a görbületet állítja be.)
          </p>
          <p>
            Keressük a polinomot <M>{"p(x) = c_0+c_1(x-a)+\\dots+c_n(x-a)^n"}</M> alakban. Deriválgatva, és minden
            lépés után <M>{"x=a"}</M>-t helyettesítve (ilyenkor az <M>{"(x-a)"}</M> hatványai eltűnnek):
          </p>
          <MB>{"p(a) = c_0, \\quad p'(a) = c_1, \\quad p''(a) = 2c_2, \\quad \\dots, \\quad p^{(n)}(a) = n!\\,c_n"}</MB>
          <p>
            Ha tehát <M>{"p^{(k)}(a) = f^{(k)}(a)"}</M> teljesüljön minden <M>{"k\\le n"}</M>-re, akkor{" "}
            <M>{"c_k = \\frac{f^{(k)}(a)}{k!}"}</M> — és készen is vagyunk.
          </p>
        </Proza>

        <Kiemelo tipus="definicio" cim="Definíció — Taylor-polinom">
          <MB>{"T_n(x) = \\sum_{k=0}^{n}\\frac{f^{(k)}(a)}{k!}\\left(x-a\\right)^k"}</MB>
          <p>
            Az <M>{"a=0"}</M> esethez tartozó polinomot <strong>Maclaurin-polinomnak</strong> nevezzük. Az{" "}
            <M>{"n=1"}</M> eset éppen az <strong>érintő</strong>: <M>{"T_1(x) = f(a)+f'(a)(x-a)"}</M> — a
            Taylor-polinom tehát az érintő általánosítása magasabb fokra.
          </p>
        </Kiemelo>

        <Kiemelo tipus="definicio" cim="Taylor tétele Lagrange-féle maradéktaggal">
          <p>
            Ha <M>{"f"}</M> az <M>{"a"}</M> és <M>{"x"}</M> közti szakaszon <M>{"(n+1)"}</M>-szer differenciálható,
            akkor <M>{"f(x) = T_n(x)+R_n(x)"}</M>, ahol valamely, <M>{"a"}</M> és <M>{"x"}</M> közé eső{" "}
            <M>{"\\xi"}</M>-re
          </p>
          <MB>{"R_n(x) = \\frac{f^{(n+1)}(\\xi)}{(n+1)!}\\left(x-a\\right)^{n+1}"}</MB>
          <p>
            <strong>Gyakorlati hibabecslés:</strong> ha <M>{"\\left|f^{(n+1)}\\right|\\le M"}</M> az egész szakaszon,
            akkor <M>{"\\left|f(x)-T_n(x)\\right| \\le \\frac{M}{(n+1)!}\\left|x-a\\right|^{n+1}"}</M>. (Az{" "}
            <M>{"n=0"}</M> eset egyébként pontosan a Lagrange-féle középértéktétel.)
          </p>
        </Kiemelo>

        <Kiemelo tipus="tipp" cim="Két dolgot olvass ki a maradéktagból">
          <p>
            A hiba <M>{"\\left|x-a\\right|^{n+1}"}</M>-nel arányos: a fejlesztési pont közelében nagyon pontos a
            közelítés, távolabb gyorsan romlik. A nevezőben pedig <M>{"(n+1)!"}</M> áll, ami rendkívül gyorsan nő —
            ezért már néhány tag is meglepően jó.
          </p>
        </Kiemelo>

        <Kartya cimke="Fejből" cim="A nevezetes sorfejtések (a = 0)" className="mt-5">
          <MB>{"e^x = 1+x+\\frac{x^2}{2!}+\\frac{x^3}{3!}+\\dots \\qquad \\frac{1}{1-x} = 1+x+x^2+x^3+\\dots \\ \\ \\left(\\left|x\\right|<1\\right)"}</MB>
          <MB>{"\\sin x = x-\\frac{x^3}{3!}+\\frac{x^5}{5!}-\\dots \\qquad \\cos x = 1-\\frac{x^2}{2!}+\\frac{x^4}{4!}-\\dots"}</MB>
          <MB>{"\\ln\\left(1+x\\right) = x-\\frac{x^2}{2}+\\frac{x^3}{3}-\\dots \\ \\ \\left(-1<x\\le1\\right) \\qquad \\left(1+x\\right)^{\\alpha} = 1+\\alpha x+\\frac{\\alpha(\\alpha-1)}{2!}x^2+\\dots"}</MB>
          <p className="mt-2 text-[13.5px] leading-relaxed text-petrol-600">
            Miért hiányoznak a páros tagok a szinuszból? Mert a <M>{"\\sin"}</M> páratlan, és a Maclaurin-polinomja
            örökli ezt a szimmetriát. Jó ellenőrzési lehetőség: ha a szinusz sorába <M>{"x^2"}</M>-es tag kerül,
            valamit elrontottunk.
          </p>
        </Kartya>

        <Probald cim="Próbáld ki — hogyan fekszik rá a polinom a görbére">
          <DerTaylorFelfedezo />
        </Probald>

        <Proza>
          <p>
            <strong>A differenciál.</strong> Differenciálható függvénynél a megváltozás{" "}
            <M>{"\\Delta y = f'(x_0)\\Delta x + \\varepsilon(\\Delta x)\\cdot\\Delta x"}</M> alakú, ahol{" "}
            <M>{"\\varepsilon(\\Delta x)\\to0"}</M>: az első tag lineáris <M>{"\\Delta x"}</M>-ben, a második
            „másodrendűen kicsi”. Az <M>{"f"}</M> függvény <M>{"x_0"}</M> pontbeli <strong>differenciálja</strong>
          </p>
          <MB>{"dy = f'(x_0)\\,dx, \\qquad dx = \\Delta x"}</MB>
          <p>
            tehát a megváltozás <strong>lineáris főrésze</strong>: az a változás, amelyet akkor kapnánk, ha a függvény
            az <M>{"x_0"}</M>-beli <strong>érintője mentén</strong> haladna tovább. Ez azért hasznos, mert a{" "}
            <M>{"dy"}</M> egyetlen szorzással számolható, a <M>{"\\Delta y"}</M> pedig általában nem — és kis{" "}
            <M>{"\\Delta x"}</M>-re a kettő gyakorlatilag egyenlő. Innen érthető a Leibniz-jelölés is:{" "}
            <M>{"f'(x) = \\frac{dy}{dx}"}</M> valóban két differenciál hányadosa.
          </p>
        </Proza>

        <AbraKeret
          szam="5.4"
          cim="A differenciál: dy az érintő menti, Δy a valódi változás. A kettő eltérése (piros) magasabb rendben kicsi — ezért cserélhető fel a kettő kis Δx-re."
        >
          <AbraDifferencial />
        </AbraKeret>

        <Kiemelo tipus="kulcs" cim="Hibaterjedés — a mérnöki alkalmazás">
          <p>
            Ha az <M>{"x"}</M> mennyiséget <M>{"\\Delta x"}</M> abszolút hibával mérjük, és belőle{" "}
            <M>{"y=f(x)"}</M>-et számoljuk:
          </p>
          <MB>{"\\left|\\Delta y\\right| \\approx \\left|f'(x)\\right|\\left|\\Delta x\\right|, \\qquad \\left|\\frac{\\Delta y}{y}\\right| \\approx \\left|\\frac{f'(x)\\,x}{f(x)}\\right|\\cdot\\left|\\frac{\\Delta x}{x}\\right|"}</MB>
          <p>
            Hatványfüggvényre egyszerű a szabály: ha <M>{"y=x^n"}</M>, akkor{" "}
            <M>{"\\frac{\\Delta y}{y}\\approx n\\frac{\\Delta x}{x}"}</M>, azaz a <strong>relatív hiba</strong>{" "}
            <M>{"n"}</M>-szeresére nő — térfogatnál (<M>{"n=3"}</M>) a hossz relatív hibájának háromszorosával,
            területnél a kétszeresével kell számolni. Milliméteres pontosságú hosszmérésből tehát{" "}
            <em>nem</em> következik milliméter-pontos térfogat.
          </p>
        </Kiemelo>

        <Kiemelo tipus="tipp" cim="És miért szép ez az egész?">
          <p>
            Mert egyetlen gondolat — „nézzük meg a függvényt nagyon közelről” — összeköti a geometriát (érintő), a
            fizikát (sebesség), a numerikus matematikát (Newton-módszer, végeselem), a mérnöki hibaszámítást és a
            zsebszámológép belsejét: a <M>{"\\sin"}</M> gombot megnyomva a gép egy Taylor-polinomot értékel ki. A
            derivált az a lencse, amelyen keresztül a bonyolult görbe egyszerű egyenesnek látszik — és ez az egyszerűség
            elég ahhoz, hogy az egész analízist felépítsük rá.
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
          forras="Előadás, 2.4 és 15/1–2. példa"
          cim="Deriválás a definícióból és a szabályokkal"
          feladat={
            <>
              <p>
                <strong>(a)</strong> Vezesd le a definícióból az <M>{"\\left(x^2\\right)'"}</M> és az{" "}
                <M>{"\\left(\\frac1x\\right)'"}</M> deriváltat!
              </p>
              <p className="mt-2">
                <strong>(b)</strong> Deriváld a szabályokkal: <M>{"f(x) = x^2e^{3x}"}</M> és{" "}
                <M>{"g(x) = \\dfrac{3x-1}{x^2+1}"}</M>.
              </p>
              <p className="mt-2">
                <strong>(c)</strong> Deriváld logaritmikusan: <M>{"h(x) = x^{\\sin x}"}</M> (<M>{"x>0"}</M>).
              </p>
            </>
          }
          tanulsag={
            <p>
              A definíció a <em>fogalom</em>, a szabályok az <em>eszköz</em>. A dolgozatban szabályokkal deriválsz, de a
              definíciót tudni kell — például ha egy csúcs vagy egy szakadás miatt a szabályok nem alkalmazhatók. A{" "}
              <M>{"x^{\\sin x}"}</M> típusnál pedig ne próbálkozz: sem <M>{"\\sin x\\cdot x^{\\sin x-1}"}</M>, sem{" "}
              <M>{"x^{\\sin x}\\ln x"}</M> nem jó — <strong>logaritmus kell</strong>.
            </p>
          }
        >
          <Lepes cim="(a1) x² a definícióból">
            <MB>{"\\frac{(x_0+\\Delta x)^2 - x_0^2}{\\Delta x} = \\frac{x_0^2 + 2x_0\\Delta x + (\\Delta x)^2 - x_0^2}{\\Delta x} = \\frac{\\Delta x\\left(2x_0+\\Delta x\\right)}{\\Delta x} = 2x_0+\\Delta x"}</MB>
            <p>
              A <M>{"\\Delta x"}</M> kiesett a nevezőből — most már szabad nullához tartani:{" "}
              <M>{"2x_0+\\Delta x \\to 2x_0"}</M>. Tehát <M>{"\\left(x^2\\right)' = 2x"}</M>.
            </p>
          </Lepes>
          <Lepes cim="(a2) 1/x a definícióból">
            <MB>{"\\frac{\\frac{1}{x_0+\\Delta x}-\\frac{1}{x_0}}{\\Delta x} = \\frac{\\frac{x_0-(x_0+\\Delta x)}{x_0(x_0+\\Delta x)}}{\\Delta x} = \\frac{-\\Delta x}{\\Delta x\\,x_0(x_0+\\Delta x)} = \\frac{-1}{x_0(x_0+\\Delta x)}"}</MB>
            <p>
              Határátmenettel <M>{"-\\frac{1}{x_0^2}"}</M>, tehát{" "}
              <M>{"\\left(\\frac1x\\right)' = -\\frac{1}{x^2}"}</M> (<M>{"x\\ne0"}</M>). Ugyanez a hatványszabályból is
              kijön: <M>{"\\left(x^{-1}\\right)' = -x^{-2}"}</M> ✓
            </p>
          </Lepes>
          <Lepes cim="(b1) x²·e³ˣ — szorzatszabály + láncszabály">
            <p>
              Két tényező: <M>{"u = x^2"}</M> (<M>{"u' = 2x"}</M>) és <M>{"v = e^{3x}"}</M>. A <M>{"v"}</M> összetett,
              a belső <M>{"3x"}</M> deriváltja 3, tehát <M>{"v' = 3e^{3x}"}</M>.
            </p>
            <KepletDoboz
              cimke="Szorzatszabály"
              keplet={"f' = u'v + uv'"}
              behelyettesitve={"f'(x) = 2x\\,e^{3x} + x^2\\cdot 3e^{3x}"}
              eredmeny={"f'(x) = x e^{3x}\\left(2+3x\\right)"}
            />
            <p>
              A kiemelés nem kötelező, de a zérushelyek (itt <M>{"x=0"}</M> és <M>{"x=-\\frac23"}</M>) azonnal
              leolvashatók belőle — a függvényvizsgálatnál ez aranyat ér.
            </p>
          </Lepes>
          <Lepes cim="(b2) (3x−1)/(x²+1) — hányadosszabály">
            <KepletDoboz
              cimke="Hányadosszabály"
              keplet={"\\left(\\frac fg\\right)' = \\frac{f'g-fg'}{g^2}"}
              behelyettesitve={"g'(x) = \\frac{3\\left(x^2+1\\right)-\\left(3x-1\\right)\\cdot 2x}{\\left(x^2+1\\right)^2}"}
              eredmeny={"g'(x) = \\frac{-3x^2+2x+3}{\\left(x^2+1\\right)^2}"}
            />
            <p>
              A számláló kibontása: <M>{"3x^2+3-6x^2+2x = -3x^2+2x+3"}</M>. A nevezőt{" "}
              <strong>nem bontjuk ki</strong> — így marad látható, hogy mindig pozitív, tehát a derivált előjelét
              egyedül a számláló adja.
            </p>
          </Lepes>
          <Lepes cim="(c) x^(sin x) — logaritmikus deriválás">
            <p>
              Sem hatvány-, sem exponenciális függvény, mert az alap <em>és</em> a kitevő is <M>{"x"}</M>-től függ.
              Logaritmáljunk:
            </p>
            <MB>{"\\ln h = \\sin x\\cdot\\ln x"}</MB>
            <p>Most deriváljuk mindkét oldalt x szerint (bal oldalon a láncszabály, jobb oldalon szorzatszabály):</p>
            <MB>{"\\frac{h'}{h} = \\cos x\\cdot\\ln x + \\sin x\\cdot\\frac1x"}</MB>
            <KepletDoboz
              cimke="Visszaszorzás h-val"
              keplet={"h' = h\\left(\\cos x\\ln x + \\frac{\\sin x}{x}\\right)"}
              eredmeny={"h'(x) = x^{\\sin x}\\left(\\cos x\\ln x + \\frac{\\sin x}{x}\\right)"}
            />
            <p>
              A <strong>visszaszorzás</strong> lépése a leggyakrabban elfelejtett: a bal oldalon{" "}
              <M>{"\\frac{h'}{h}"}</M> áll, nem <M>{"h'"}</M>.
            </p>
          </Lepes>
        </KidolgozottFeladat>

        {/* ---- KF-2 ---- */}
        <KidolgozottFeladat
          jel="KF‑2"
          ido="9 perc"
          forras="Előadás, 6. fejezet és 15/3–4. példa"
          cim="Érintő, normális, implicit és paraméteres alak"
          feladat={
            <>
              <p>
                <strong>(a)</strong> Írd fel az <M>{"f(x)=x^3-2x"}</M> görbe érintőjének és normálisának egyenletét az{" "}
                <M>{"x_0=1"}</M> helyen!
              </p>
              <p className="mt-2">
                <strong>(b)</strong> Mennyi <M>{"y'"}</M> az <M>{"x^2+xy+y^3=3"}</M> görbe <M>{"(1;\\,1)"}</M>{" "}
                pontjában?
              </p>
              <p className="mt-2">
                <strong>(c)</strong> A ciklois <M>{"x = R(t-\\sin t)"}</M>, <M>{"y = R(1-\\cos t)"}</M>. Mekkora az
                érintő meredeksége a <M>{"t=\\frac{\\pi}{2}"}</M> helyen? És mennyi{" "}
                <M>{"\\frac{dy}{dx}"}</M> az <M>{"x=t^2"}</M>, <M>{"y=t^3-3t"}</M> görbén a <M>{"t=2"}</M>{" "}
                paraméterértéknél?
              </p>
            </>
          }
          tanulsag={
            <p>
              Mindhárom esetben ugyanaz a fogalom, csak más az „adagolás”. Explicit alaknál a derivált közvetlenül
              adódik; implicit alaknál a láncszabály hoz be egy <M>{"y'"}</M> szorzót, amit ki kell fejezni;
              paraméteres alaknál a két sebességkomponens hányadosa adja a meredekséget. Implicitnél mindig{" "}
              <strong>ellenőrizd először</strong>, hogy a megadott pont rajta van-e a görbén.
            </p>
          }
        >
          <Lepes cim="(a) Érintő és normális az x₀ = 1 helyen">
            <p>
              <M>{"f(1) = 1-2 = -1"}</M> és <M>{"f'(x) = 3x^2-2"}</M>, tehát <M>{"f'(1) = 1"}</M>.
            </p>
            <KepletDoboz
              cimke="Érintő"
              keplet={"y = f'(x_0)(x-x_0)+f(x_0)"}
              behelyettesitve={"y = 1\\cdot(x-1) + (-1)"}
              eredmeny={"y = x-2"}
            />
            <KepletDoboz
              cimke="Normális"
              keplet={"y = -\\frac{1}{f'(x_0)}(x-x_0)+f(x_0)"}
              behelyettesitve={"y = -1\\cdot(x-1) + (-1)"}
              eredmeny={"y = -x"}
            />
            <p>
              Ellenőrzés: <M>{"x=1"}</M>-et behelyettesítve mindkét egyenletből <M>{"y=-1"}</M> jön ki — tényleg
              átmennek az érintési ponton ✓ A két meredekség szorzata <M>{"1\\cdot(-1) = -1"}</M>: merőlegesek ✓
            </p>
          </Lepes>
          <Lepes cim="(b1) Implicit deriválás — először az ellenőrzés">
            <p>
              Rajta van-e a pont a görbén? <M>{"1^2 + 1\\cdot1 + 1^3 = 3"}</M> ✓ Ha nem lenne, az egész számolás
              értelmetlen volna.
            </p>
            <p>
              Most deriváljuk az egyenlet mindkét oldalát <M>{"x"}</M> szerint, <M>{"y"}</M>-t az <M>{"x"}</M>{" "}
              függvényének tekintve. Az <M>{"xy"}</M> tagra szorzatszabály, az <M>{"y^3"}</M>-re láncszabály:
            </p>
            <MB>{"2x + \\left(y + xy'\\right) + 3y^2y' = 0"}</MB>
          </Lepes>
          <Lepes cim="(b2) Rendezés y′-re és behelyettesítés">
            <MB>{"y'\\left(x+3y^2\\right) = -\\left(2x+y\\right) \\qquad\\Longrightarrow\\qquad y' = -\\frac{2x+y}{x+3y^2}"}</MB>
            <KepletDoboz
              cimke="A (1; 1) pontban"
              keplet={"y' = -\\frac{2x+y}{x+3y^2}"}
              behelyettesitve={"y' = -\\frac{2\\cdot1+1}{1+3\\cdot1^2} = -\\frac{3}{4}"}
              eredmeny={"y'(1;\\,1) = -0{,}75"}
            />
            <p>
              Figyeld meg: a végeredményben <em>mindkét</em> koordináta szerepel — implicit alaknál ez normális. Az
              érintő egyenlete <M>{"y = -\\frac34(x-1)+1"}</M>, azaz <M>{"3x+4y=7"}</M>.
            </p>
          </Lepes>
          <Lepes cim="(c1) A ciklois t = π/2-nél">
            <p>
              A két paraméteres derivált: <M>{"\\dot x = R\\left(1-\\cos t\\right)"}</M> és{" "}
              <M>{"\\dot y = R\\sin t"}</M>.
            </p>
            <KepletDoboz
              cimke="Paraméteres derivált"
              keplet={"\\frac{dy}{dx} = \\frac{\\dot y}{\\dot x} = \\frac{R\\sin t}{R\\left(1-\\cos t\\right)} = \\frac{\\sin t}{1-\\cos t}"}
              behelyettesitve={"t = \\frac{\\pi}{2}: \\quad \\frac{\\sin\\frac{\\pi}{2}}{1-\\cos\\frac{\\pi}{2}} = \\frac{1}{1-0}"}
              eredmeny={"\\frac{dy}{dx} = 1 \\quad\\Longrightarrow\\quad \\text{az érintő } 45^\\circ\\text{-os}"}
            />
            <p>
              A sugár <M>{"R"}</M> kiesett — ez jó jel: a ciklois alakja nem függ a kör méretétől, csak a lépték
              változik.
            </p>
          </Lepes>
          <Lepes cim="(c2) x = t², y = t³ − 3t a t = 2 helyen">
            <MB>{"\\dot x = 2t = 4, \\qquad \\dot y = 3t^2-3 = 9 \\qquad\\Longrightarrow\\qquad \\frac{dy}{dx} = \\frac94 = 2{,}25"}</MB>
            <p>
              Itt <M>{"\\dot x = 4 \\ne 0"}</M>, tehát a képlet alkalmazható. (A <M>{"t=0"}</M> helyen{" "}
              <M>{"\\dot x = 0"}</M> lenne — ott a görbének függőleges érintője van, és a formula nem használható.)
            </p>
          </Lepes>
        </KidolgozottFeladat>

        {/* ---- KF-3 ---- */}
        <KidolgozottFeladat
          jel="KF‑3"
          ido="8 perc"
          forras="Előadás, 9.3. példa"
          cim="L'Hospital-szabály — négy változat"
          feladat={
            <p>
              Számítsd ki: <M>{"\\lim\\limits_{x\\to0}\\dfrac{\\sin 2x}{3x}"}</M>,{" "}
              <M>{"\\lim\\limits_{x\\to0}\\dfrac{e^x-1-x}{x^2+x^3}"}</M>,{" "}
              <M>{"\\lim\\limits_{x\\to0^+}x^x"}</M> és{" "}
              <M>{"\\lim\\limits_{x\\to\\infty}\\left(1+\\dfrac3x\\right)^x"}</M>.
            </p>
          }
          tanulsag={
            <p>
              A recept mindig ugyanaz: <strong>1.</strong> behelyettesítés — tényleg határozatlan-e az alak?{" "}
              <strong>2.</strong> ha hatványalak, logaritmus. <strong>3.</strong> deriválás külön-külön.{" "}
              <strong>4.</strong> újra behelyettesítés; ha megint határozatlan, ismételjük. <strong>5.</strong>{" "}
              hatványalaknál <strong>visszaexponenciálás</strong>. Ha ezt az öt lépést végigviszed, nem lehet hibázni.
            </p>
          }
        >
          <Lepes cim="1. feladat — a legegyszerűbb 0/0">
            <p>
              Behelyettesítve <M>{"\\frac{\\sin 0}{0} = \\frac00"}</M>: határozatlan, szabad deriválni. A számláló
              deriváltja a láncszabállyal <M>{"2\\cos 2x"}</M>, a nevezőé 3.
            </p>
            <KepletDoboz
              keplet={"\\lim_{x\\to0}\\frac{\\sin 2x}{3x} = \\lim_{x\\to0}\\frac{2\\cos 2x}{3}"}
              behelyettesitve={"= \\frac{2\\cos 0}{3} = \\frac{2\\cdot1}{3}"}
              eredmeny={"= \\frac23 \\approx 0{,}6667"}
            />
            <p>
              A 2-es szorzó a belső derivált! Enélkül <M>{"\\frac13"}</M> jönne ki — ez a hiba szinte minden
              évfolyamon megjelenik.
            </p>
          </Lepes>
          <Lepes cim="2. feladat — ismételt alkalmazás">
            <p>
              Amíg határozatlan alak marad, a szabály ismételhető. Az első két lépésben a behelyettesítés{" "}
              <M>{"\\frac00"}</M>-t ad, a harmadikban már nem:
            </p>
            <MB>{"\\lim_{x\\to0}\\frac{e^x-1-x}{x^2+x^3} = \\lim_{x\\to0}\\frac{e^x-1}{2x+3x^2} = \\lim_{x\\to0}\\frac{e^x}{2+6x} = \\frac{1}{2}"}</MB>
            <p>
              Ellenőrzés a másik irányból, sorfejtéssel:{" "}
              <M>{"e^x-1-x = \\frac{x^2}{2}+\\frac{x^3}{6}+\\dots"}</M>, a nevező <M>{"x^2(1+x)"}</M>, a hányados
              tehát <M>{"\\frac{\\frac12+\\frac x6+\\dots}{1+x} \\to \\frac12"}</M> ✓
            </p>
          </Lepes>
          <Lepes cim="3. feladat — 0⁰ alak, logaritmussal">
            <p>
              Az <M>{"x^x"}</M> határértéke <M>{"x\\to0^+"}</M> esetén <M>{"0^0"}</M> alakú — ez határozatlan.
              Logaritmáljunk: <M>{"\\ln\\left(x^x\\right) = x\\ln x"}</M>, ami <M>{"0\\cdot(-\\infty)"}</M> alakú.
              Hányadossá alakítva már alkalmazható a szabály:
            </p>
            <MB>{"\\lim_{x\\to0^+}x\\ln x = \\lim_{x\\to0^+}\\frac{\\ln x}{\\frac1x} = \\lim_{x\\to0^+}\\frac{\\frac1x}{-\\frac{1}{x^2}} = \\lim_{x\\to0^+}\\left(-x\\right) = 0"}</MB>
            <KepletDoboz
              cimke="Visszaexponenciálás"
              keplet={"\\ln y \\to 0 \\quad\\Longrightarrow\\quad y \\to e^0"}
              eredmeny={"\\lim_{x\\to0^+}x^x = 1"}
            />
            <p>
              Számpróba: <M>{"0{,}01^{0{,}01} \\approx 0{,}955"}</M>, <M>{"0{,}0001^{0{,}0001} \\approx 0{,}9991"}</M>{" "}
              — tényleg 1 felé megy ✓
            </p>
          </Lepes>
          <Lepes cim="4. feladat — 1^∞ alak">
            <p>
              Az alap 1-hez tart, a kitevő végtelenhez: <M>{"1^{\\infty}"}</M>, határozatlan. Logaritmálva{" "}
              <M>{"\\ln y = x\\ln\\left(1+\\frac3x\\right)"}</M>, ami <M>{"\\infty\\cdot0"}</M> — írjuk hányadossá:
            </p>
            <MB>{"\\ln y = \\frac{\\ln\\left(1+\\frac3x\\right)}{\\frac1x} \\ \\longrightarrow\\ \\lim_{x\\to\\infty}\\frac{\\frac{1}{1+\\frac3x}\\cdot\\left(-\\frac{3}{x^2}\\right)}{-\\frac{1}{x^2}} = \\lim_{x\\to\\infty}\\frac{3}{1+\\frac3x} = 3"}</MB>
            <KepletDoboz
              cimke="Visszaexponenciálás"
              keplet={"\\ln y \\to 3 \\quad\\Longrightarrow\\quad y \\to e^3"}
              eredmeny={"\\lim_{x\\to\\infty}\\left(1+\\frac3x\\right)^x = e^3 \\approx 20{,}086"}
            />
            <p>
              Ez ugyanaz a nevezetes határérték, amit a Sorozatok modulban láttál:{" "}
              <M>{"\\left(1+\\frac ax\\right)^x\\to e^a"}</M>. A <strong>3, nem e³</strong> a logaritmus határértéke —
              a visszaexponenciálás nélkül 3-at írnánk válasznak, ami durva hiba.
            </p>
          </Lepes>
        </KidolgozottFeladat>

        {/* ---- KF-4 ---- */}
        <KidolgozottFeladat
          jel="KF‑4"
          ido="12 perc"
          forras="Előadás, 10.5. mintapélda"
          cim="Teljes függvényvizsgálat: x / (x² + 1)"
          feladat={
            <p>
              Végezd el az <M>{"f(x) = \\dfrac{x}{x^2+1}"}</M> függvény teljes vizsgálatát a hét lépés szerint, és
              vázold fel a grafikont!
            </p>
          }
          tanulsag={
            <p>
              A hét lépést <strong>mindig ugyanabban a sorrendben</strong> érdemes végigcsinálni: a paritás fél munkát
              spórol, a határértékek megadják a „keretet”, a két előjeltáblázat pedig gyakorlatilag megrajzolja a
              görbét. A dolgozatban a táblázatok maguk is pontot érnek — ne csak a végeredményt írd le.
            </p>
          }
        >
          <Lepes cim="1–3. lépés — értelmezési tartomány, zérushely, paritás">
            <p>
              A nevező <M>{"x^2+1\\ge1>0"}</M>, tehát az értelmezési tartomány a teljes <M>{"\\mathbb{R}"}</M>,
              szakadás nincs. Zérushely: <M>{"f(x)=0"}</M> pontosan <M>{"x=0"}</M>-ban, a grafikon átmegy az origón.
            </p>
            <MB>{"f(-x) = \\frac{-x}{x^2+1} = -f(x)"}</MB>
            <p>
              A függvény <strong>páratlan</strong>: a grafikon origóra szimmetrikus. Innen elég a pozitív felet
              vizsgálni, a többit tükrözzük — ez a fele munka.
            </p>
          </Lepes>
          <Lepes cim="4. lépés — határértékek és aszimptoták">
            <MB>{"\\lim_{x\\to\\pm\\infty}\\frac{x}{x^2+1} = \\lim_{x\\to\\pm\\infty}\\frac{\\frac1x}{1+\\frac{1}{x^2}} = \\frac{0}{1} = 0"}</MB>
            <p>
              Tehát <M>{"y=0"}</M> <strong>vízszintes aszimptota</strong> mindkét irányban. Függőleges nincs (a nevező
              sosem nulla), ferdét pedig <strong>nem kell keresni</strong>: ahol már van véges határérték a
              végtelenben, ott ferde aszimptota nem lehet.
            </p>
          </Lepes>
          <Lepes cim="5. lépés — az első derivált és a monotonitás">
            <KepletDoboz
              cimke="Hányadosszabály"
              keplet={"f'(x) = \\frac{1\\cdot\\left(x^2+1\\right)-x\\cdot2x}{\\left(x^2+1\\right)^2}"}
              eredmeny={"f'(x) = \\frac{1-x^2}{\\left(x^2+1\\right)^2}"}
            />
            <p>
              A nevező mindig pozitív, tehát az előjelet egyedül az <M>{"1-x^2"}</M> szabja meg; zérushelyek{" "}
              <M>{"x=\\pm1"}</M>.
            </p>
            <div className="my-3 overflow-hidden rounded-xl border border-petrol-200">
              <table className="w-full text-[13.5px]">
                <thead className="bg-petrol-50 text-petrol-600">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold">tartomány</th>
                    <th className="px-3 py-2 text-left font-semibold">f ′ előjele</th>
                    <th className="px-3 py-2 text-left font-semibold">f viselkedése</th>
                  </tr>
                </thead>
                <tbody className="text-petrol-800">
                  <tr className="border-t border-petrol-100">
                    <td className="px-3 py-1.5">
                      <M>{"x<-1"}</M>
                    </td>
                    <td className="px-3 py-1.5">negatív</td>
                    <td className="px-3 py-1.5">szigorúan csökken</td>
                  </tr>
                  <tr className="border-t border-petrol-100">
                    <td className="px-3 py-1.5">
                      <M>{"-1<x<1"}</M>
                    </td>
                    <td className="px-3 py-1.5">pozitív</td>
                    <td className="px-3 py-1.5">szigorúan nő</td>
                  </tr>
                  <tr className="border-t border-petrol-100">
                    <td className="px-3 py-1.5">
                      <M>{"x>1"}</M>
                    </td>
                    <td className="px-3 py-1.5">negatív</td>
                    <td className="px-3 py-1.5">szigorúan csökken</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Tehát <M>{"x=-1"}</M>-ben <strong>lokális minimum</strong> (<M>{"f(-1)=-\\frac12"}</M>),{" "}
              <M>{"x=1"}</M>-ben <strong>lokális maximum</strong> (<M>{"f(1)=\\frac12"}</M>).
            </p>
          </Lepes>
          <Lepes cim="6. lépés — a második derivált, konvexitás, inflexió">
            <MB>{"f''(x) = \\frac{2x\\left(x^2-3\\right)}{\\left(x^2+1\\right)^3}"}</MB>
            <p>
              Zérushelyei <M>{"x=0"}</M> és <M>{"x=\\pm\\sqrt3"}</M>. A nevező pozitív, tehát az előjelet a{" "}
              <M>{"2x\\left(x^2-3\\right)"}</M> szorzat adja:
            </p>
            <div className="my-3 overflow-hidden rounded-xl border border-violet-200">
              <table className="w-full text-[13.5px]">
                <thead className="bg-violet-50 text-violet-800">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold">tartomány</th>
                    <th className="px-3 py-2 text-left font-semibold">f ″ előjele</th>
                    <th className="px-3 py-2 text-left font-semibold">alak</th>
                  </tr>
                </thead>
                <tbody className="text-petrol-800">
                  <tr className="border-t border-violet-100">
                    <td className="px-3 py-1.5">
                      <M>{"x<-\\sqrt3"}</M>
                    </td>
                    <td className="px-3 py-1.5">negatív</td>
                    <td className="px-3 py-1.5">konkáv</td>
                  </tr>
                  <tr className="border-t border-violet-100">
                    <td className="px-3 py-1.5">
                      <M>{"-\\sqrt3<x<0"}</M>
                    </td>
                    <td className="px-3 py-1.5">pozitív</td>
                    <td className="px-3 py-1.5">konvex</td>
                  </tr>
                  <tr className="border-t border-violet-100">
                    <td className="px-3 py-1.5">
                      <M>{"0<x<\\sqrt3"}</M>
                    </td>
                    <td className="px-3 py-1.5">negatív</td>
                    <td className="px-3 py-1.5">konkáv</td>
                  </tr>
                  <tr className="border-t border-violet-100">
                    <td className="px-3 py-1.5">
                      <M>{"x>\\sqrt3"}</M>
                    </td>
                    <td className="px-3 py-1.5">pozitív</td>
                    <td className="px-3 py-1.5">konvex</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Mindhárom helyen van előjelváltás, tehát három <strong>inflexiós pont</strong> van:{" "}
              <M>{"\\left(-\\sqrt3;\\,-\\frac{\\sqrt3}{4}\\right)"}</M>, <M>{"\\left(0;\\,0\\right)"}</M> és{" "}
              <M>{"\\left(\\sqrt3;\\,\\frac{\\sqrt3}{4}\\right)"}</M>, ahol{" "}
              <M>{"\\frac{\\sqrt3}{4}\\approx0{,}433"}</M>.
            </p>
          </Lepes>
          <Lepes cim="7. lépés — értékkészlet és a kész kép">
            <p>
              A függvény folytonos, a végtelenben nullához tart, legnagyobb értéke <M>{"\\frac12"}</M>, legkisebb{" "}
              <M>{"-\\frac12"}</M>: az értékkészlet <M>{"-\\frac12\\le y\\le\\frac12"}</M>.
            </p>
            <p>
              Összefoglalva a grafikon alakja: a <M>{"-\\infty"}</M> felől 0-hoz simul, csökken a{" "}
              <M>{"(-1;\\,-0{,}5)"}</M> minimumig, onnan nő az origón át a <M>{"(1;\\,0{,}5)"}</M> maximumig, majd
              ismét 0-hoz tart — mindezt origóra szimmetrikusan.
            </p>
          </Lepes>
        </KidolgozottFeladat>

        <div className="my-6">
          <p className="mb-2 text-[11px] font-bold tracking-[0.16em] text-naracs-600 uppercase">
            Film — a függvényvizsgálat lépésről lépésre
          </p>
          <FilmFuggvenyvizsgalat />
        </div>

        {/* ---- KF-5 ---- */}
        <KidolgozottFeladat
          jel="KF‑5"
          ido="11 perc"
          forras="Előadás, 11.1–11.2. példa"
          cim="Szélsőértékfeladatok — zárt intervallum és szöveges optimalizálás"
          feladat={
            <>
              <p>
                <strong>(a)</strong> Mennyi az <M>{"f(x)=x^2+3x+1"}</M> legnagyobb és legkisebb értéke a{" "}
                <M>{"[-10;\\,10]"}</M> intervallumon?
              </p>
              <p className="mt-2">
                <strong>(b)</strong> Egy <M>{"1\\,\\text{m}\\times1\\,\\text{m}"}</M>-es lemez sarkaiból egyenlő
                négyzeteket vágunk ki, majd a széleket felhajtva felül nyitott dobozt készítünk. Mekkora kivágással
                lesz a térfogat a legnagyobb?
              </p>
              <p className="mt-2">
                <strong>(c)</strong> Adott <M>{"V"}</M> térfogatú, zárt hengeres tartályt készítünk. Milyen{" "}
                <M>{"r"}</M> sugárnál a legkisebb a lemezfelület?
              </p>
            </>
          }
          tanulsag={
            <p>
              Szöveges feladatnál a nehézség sosem a deriválás, hanem a <strong>felírás</strong>: rajz, célfüggvény,
              kényszer, egyetlen változó, értelmezési tartomány. Ha idáig eljutottál, a többi rutin. És a végén mindig{" "}
              <strong>térj vissza a szöveghez</strong> — a kérdés nem „mennyi x”, hanem „mekkora kivágás” vagy „milyen
              sugár”, mértékegységgel.
            </p>
          }
        >
          <Lepes cim="(a) Globális szélsőérték zárt intervallumon">
            <p>
              Három helyen lehet globális szélsőérték: stacionárius pont, nem differenciálható hely, végpont. Itt a
              függvény mindenütt differenciálható, tehát csak az első és a harmadik jön szóba.
            </p>
            <KepletDoboz
              cimke="Stacionárius pont"
              keplet={"f'(x) = 2x+3 = 0"}
              behelyettesitve={"x = -1{,}5, \\qquad f(-1{,}5) = 2{,}25 - 4{,}5 + 1"}
              eredmeny={"f(-1{,}5) = -1{,}25"}
            />
            <p>
              A végpontokban <M>{"f(-10) = 100-30+1 = 71"}</M> és <M>{"f(10) = 100+30+1 = 131"}</M>.
            </p>
            <p>
              A legnagyobb érték tehát <strong>131</strong> (a jobb végpontban), a legkisebb{" "}
              <strong>−1,25</strong> (belső pontban). Vedd észre: a maximum ott van, ahol a derivált{" "}
              <em>nem</em> nulla — ezért kötelező a végpontokat is megnézni.
            </p>
          </Lepes>
          <Lepes cim="(b1) A dobozfeladat felírása">
            <p>
              Ha a kivágott négyzet oldala <M>{"x"}</M>, akkor a doboz alapéle <M>{"1-2x"}</M>, magassága{" "}
              <M>{"x"}</M>. A térfogat tehát
            </p>
            <MB>{"V(x) = x\\left(1-2x\\right)^2, \\qquad 0<x<\\frac12"}</MB>
            <p>
              Az értelmezési tartomány fizikai: negatív kivágás nincs, és <M>{"x\\ge\\frac12"}</M> esetén nem maradna
              alaplap. Ez a korlát a megoldás végén fontos lesz.
            </p>
          </Lepes>
          <Lepes cim="(b2) Deriválás és a maximum">
            <p>Szorzatszabállyal, majd kiemeléssel:</p>
            <MB>{"V'(x) = \\left(1-2x\\right)^2 + x\\cdot 2\\left(1-2x\\right)\\cdot(-2) = \\left(1-2x\\right)^2 - 4x\\left(1-2x\\right)"}</MB>
            <MB>{"V'(x) = \\left(1-2x\\right)\\left[\\left(1-2x\\right)-4x\\right] = \\left(1-2x\\right)\\left(1-6x\\right)"}</MB>
            <p>
              Zérushelyek: <M>{"x=\\frac12"}</M> (a tartomány széle, ott <M>{"V=0"}</M>) és <M>{"x=\\frac16"}</M>. Az{" "}
              <M>{"x=\\frac16"}</M> helyen <M>{"V'"}</M> pozitívról negatívra vált (a <M>{"1-6x"}</M> tényező vált
              előjelet, a <M>{"1-2x"}</M> végig pozitív), tehát ott <strong>maximum</strong> van.
            </p>
            <KepletDoboz
              cimke="A maximális térfogat"
              keplet={"V\\left(\\frac16\\right) = \\frac16\\left(1-\\frac13\\right)^2 = \\frac16\\left(\\frac23\\right)^2"}
              behelyettesitve={"= \\frac16\\cdot\\frac49 = \\frac{4}{54}"}
              eredmeny={"V_{\\max} = \\frac{2}{27} \\approx 0{,}0741\\ \\text{m}^3 \\approx 74\\ \\text{liter}"}
            />
            <p>
              A tartomány szélein <M>{"V\\to0"}</M>, tehát ez a globális maximum. Visszatérve a szöveghez: a kivágott
              négyzet oldala <M>{"\\frac16\\ \\text{m} \\approx 16{,}7"}</M> cm.
            </p>
          </Lepes>
          <Lepes cim="(c) A leggazdaságosabb hengeres tartály">
            <p>
              A felület <M>{"A = 2r^2\\pi+2r\\pi h"}</M> — két változó. A kényszer <M>{"V = r^2\\pi h"}</M>, ahonnan{" "}
              <M>{"h = \\frac{V}{r^2\\pi}"}</M>. Behelyettesítve egyetlen változó marad:
            </p>
            <KepletDoboz
              cimke="Célfüggvény és derivált"
              keplet={"A(r) = 2r^2\\pi + \\frac{2V}{r}"}
              behelyettesitve={"A'(r) = 4r\\pi - \\frac{2V}{r^2} = 0"}
              eredmeny={"r = \\sqrt[3]{\\frac{V}{2\\pi}}"}
            />
            <p>
              Ez valóban minimum, mert <M>{"A''(r) = 4\\pi+\\frac{4V}{r^3}>0"}</M> minden <M>{"r>0"}</M>-ra. A
              hozzá tartozó magasság
            </p>
            <MB>{"h = \\frac{V}{r^2\\pi} = \\frac{2\\pi r^3}{r^2\\pi} = 2r,"}</MB>
            <p>
              vagyis <strong>a magasság egyenlő az átmérővel</strong>. Konkrétan <M>{"V=1\\ \\text{m}^3"}</M> esetén{" "}
              <M>{"r\\approx0{,}5419"}</M> m, <M>{"h\\approx1{,}0839"}</M> m és{" "}
              <M>{"A\\approx5{,}536\\ \\text{m}^2"}</M>. (A gyakorlatban a konzervdobozok magasabbak ennél — mert a
              fedél és az alj vastagabb lemezből készül, tehát a modell kényszere más.)
            </p>
          </Lepes>
        </KidolgozottFeladat>

        <div className="my-6">
          <p className="mb-2 text-[11px] font-bold tracking-[0.16em] text-naracs-600 uppercase">
            Film — a dobozfeladat felépítése
          </p>
          <FilmDoboz />
        </div>

        {/* ---- KF-6 ---- */}
        <KidolgozottFeladat
          jel="KF‑6"
          ido="10 perc"
          forras="Előadás, 12.4 és 13.2–13.3. példa"
          cim="Taylor-polinom, lineáris közelítés és hibabecslés"
          feladat={
            <>
              <p>
                <strong>(a)</strong> Közelítsd az <M>{"e"}</M> számot az <M>{"e^x"}</M> ötödrendű
                Maclaurin-polinomjával, és becsüld meg a hibát!
              </p>
              <p className="mt-2">
                <strong>(b)</strong> Mennyi <M>{"\\sin 0{,}5"}</M> a harmadrendű Taylor-polinommal, és mekkora a hiba?
              </p>
              <p className="mt-2">
                <strong>(c)</strong> Becsüld meg lineáris közelítéssel <M>{"\\sqrt{101}"}</M> és{" "}
                <M>{"\\sin 31^\\circ"}</M> értékét!
              </p>
              <p className="mt-2">
                <strong>(d)</strong> Egy kocka alakú betontömb élét <M>{"a=2{,}00"}</M> m-nek mérjük{" "}
                <M>{"\\pm5"}</M> mm pontossággal. Mekkora a térfogat abszolút és relatív hibája?
              </p>
            </>
          }
          tanulsag={
            <p>
              A Taylor-polinom és a lineáris közelítés ugyanaz a gondolat, csak más fokszámon. A hibabecslés nem
              „szépségdíj”: nélküle nem tudod, hány tizedesjegy megbízható a kapott számból. A mérnöki gyakorlatban a
              hibaterjedés a fontosabb — a hosszmérés pontossága <em>nem</em> öröklődik automatikusan a térfogatra.
            </p>
          }
        >
          <Lepes cim="(a) Az e szám T₅-tel">
            <p>
              Az <M>{"e^x"}</M> minden deriváltja <M>{"e^x"}</M>, a 0-ban mind 1, tehát{" "}
              <M>{"c_k = \\frac{1}{k!}"}</M>:
            </p>
            <KepletDoboz
              keplet={"e \\approx T_5(1) = 1+1+\\frac{1}{2}+\\frac16+\\frac{1}{24}+\\frac{1}{120}"}
              behelyettesitve={"= \\frac{120+120+60+20+5+1}{120} = \\frac{326}{120}"}
              eredmeny={"= \\frac{163}{60} \\approx 2{,}71667"}
            />
            <p>
              Hibabecslés: <M>{"f^{(6)}(t)=e^t \\le e<3"}</M> a <M>{"[0;\\,1]"}</M> szakaszon, tehát
            </p>
            <MB>{"\\left|e-T_5(1)\\right| \\le \\frac{3}{6!} = \\frac{3}{720} = \\frac{1}{240} \\approx 0{,}00417"}</MB>
            <p>
              A valódi hiba <M>{"e - 2{,}71667 \\approx 0{,}00162"}</M> — a becslés tehát helyes és nem is túl durva
              (kevesebb mint háromszoros ráhagyás).
            </p>
          </Lepes>
          <Lepes cim="(b) sin 0,5 harmadrendű polinommal">
            <p>
              A <M>{"\\sin"}</M> Maclaurin-polinomja <M>{"T_3(x) = x-\\frac{x^3}{6}"}</M>, tehát
            </p>
            <KepletDoboz
              keplet={"\\sin 0{,}5 \\approx 0{,}5-\\frac{0{,}5^3}{6}"}
              behelyettesitve={"= 0{,}5 - \\frac{0{,}125}{6}"}
              eredmeny={"\\approx 0{,}479167"}
            />
            <p>
              Mivel a negyedfokú tag együtthatója nulla, itt <M>{"T_3 = T_4"}</M> — tehát a{" "}
              <strong>negyedrendű</strong> maradéktaggal becsülhetünk, ami sokkal élesebb. A deriváltak abszolút
              értéke legfeljebb 1, így
            </p>
            <MB>{"\\left|\\sin0{,}5-T_3(0{,}5)\\right| \\le \\frac{0{,}5^5}{5!} = \\frac{0{,}03125}{120} \\approx 2{,}6\\cdot10^{-4}"}</MB>
            <p>
              A pontos érték <M>{"0{,}479426"}</M>, a valódi hiba szintén <M>{"\\approx2{,}6\\cdot10^{-4}"}</M> — a
              becslés itt gyakorlatilag <strong>éles</strong>.
            </p>
          </Lepes>
          <Lepes cim="(c) Lineáris közelítés: √101 és sin 31°">
            <p>
              Az <M>{"f(x)=\\sqrt x"}</M>, <M>{"x_0=100"}</M> (négyzetszám!), <M>{"\\Delta x=1"}</M> választással{" "}
              <M>{"f(100)=10"}</M> és <M>{"f'(100)=\\frac{1}{2\\sqrt{100}}=\\frac{1}{20}=0{,}05"}</M>:
            </p>
            <MB>{"\\sqrt{101}\\approx 10 + 0{,}05\\cdot1 = 10{,}05"}</MB>
            <p>
              A pontos érték <M>{"10{,}049876\\dots"}</M>, a hiba kisebb, mint <M>{"1{,}3\\cdot10^{-4}"}</M>.
            </p>
            <p>
              A második: <strong>váltsunk radiánra</strong>, mert a derivált képlete csak úgy érvényes.{" "}
              <M>{"1^\\circ = \\frac{\\pi}{180}\\approx0{,}017453"}</M> rad, tehát
            </p>
            <KepletDoboz
              keplet={"\\sin31^\\circ \\approx \\sin30^\\circ+\\cos30^\\circ\\cdot\\Delta x"}
              behelyettesitve={"= 0{,}5+0{,}86603\\cdot0{,}017453"}
              eredmeny={"\\approx 0{,}515115"}
            />
            <p>
              A pontos érték <M>{"0{,}515038"}</M>, a hiba <M>{"8\\cdot10^{-5}"}</M> alatt van. Fokban számolva{" "}
              <M>{"0{,}5+0{,}86603\\cdot1 = 1{,}366"}</M> jönne ki — ami nem is lehetne szinusz.
            </p>
          </Lepes>
          <Lepes cim="(d) A betontömb hibabecslése">
            <p>
              A térfogat <M>{"V = a^3 = 8\\ \\text{m}^3"}</M>, a differenciál <M>{"dV = 3a^2\\,da"}</M>:
            </p>
            <KepletDoboz
              cimke="Abszolút hiba"
              keplet={"dV = 3a^2\\,da"}
              behelyettesitve={"= 3\\cdot 2^2\\cdot 0{,}005 = 3\\cdot4\\cdot0{,}005"}
              eredmeny={"dV = 0{,}06\\ \\text{m}^3 = 60\\ \\text{liter}"}
            />
            <p>
              Relatív hibában: az él relatív hibája <M>{"\\frac{0{,}005}{2} = 0{,}25\\%"}</M>, a térfogaté ennek{" "}
              <strong>háromszorosa</strong>, <M>{"0{,}75\\%"}</M> — és valóban{" "}
              <M>{"\\frac{0{,}06}{8} = 0{,}0075"}</M> ✓
            </p>
            <p>
              <strong>A tanulság:</strong> 5 mm-es hosszmérési pontosságból 60 liternyi bizonytalanság lesz a
              térfogatban. Ha a beton ára köbméterre megy, ez a szám forintosítható.
            </p>
          </Lepes>
        </KidolgozottFeladat>
      </Szakasz>

      {/* ==================== KALKULÁTOROK ==================== */}
      <Szakasz
        id="kalkulator"
        cimke="3. rész"
        cim="Kalkulátorok"
        bevezeto="Ugyanazok a számítások tetszőleges képlettel. Használd a házi feladat ellenőrzésére, vagy arra, hogy ráérezz, mi hogyan változik. A vessző és a pont is elfogadott tizedesjelként."
      >
        <div className="space-y-8">
          <div>
            <h3 className="mb-2 text-[16px] font-semibold text-petrol-900">Deriváló és érintő-kalkulátor</h3>
            <p className="mb-3 text-[14px] text-petrol-600">
              Írj be egy képletet, és add meg az <M>{"x_0"}</M> helyet: megkapod a numerikus első és második
              deriváltat (központi differenciával), az érintő és a normális egyenletét, a grafikont az érintővel — és
              ha a képlet beleesik a kalkulátor szűk szimbolikus táblájába (<M>{"a\\cdot x^n"}</M>,{" "}
              <M>{"a/x"}</M>, <M>{"a\\cdot g(bx+c)"}</M>), a derivált <em>képletét</em> is. Alaphelyzetben a KF‑2
              feladata van betöltve.
            </p>
            <DerDerivaloKalk />
          </div>
          <div>
            <h3 className="mb-2 text-[16px] font-semibold text-petrol-900">Függvényvizsgáló</h3>
            <p className="mb-3 text-[14px] text-petrol-600">
              Numerikus teljes vizsgálat egy megadott <M>{"[a;\\,b]"}</M> szakaszon: zérushelyek, stacionárius pontok
              és típusuk, inflexiós pontok (előjelváltás-ellenőrzéssel!), globális szélsőérték a végpontokkal együtt,
              és <M>{"f"}</M>, <M>{"f'"}</M>, <M>{"f''"}</M> grafikonja egymás alatt. Alaphelyzetben a KF‑4 függvénye
              van betöltve.
            </p>
            <DerVizsgaloKalk />
          </div>
        </div>

        <Kiemelo tipus="tipp" cim="Mire használd a kalkulátort">
          <p>
            Arra, hogy <em>ellenőrizz</em>, ne arra, hogy helyetted számoljon. A zárthelyin nem lesz nálad — és a
            numerikus derivált nem bizonyítás: a központi differencia hibája <M>{"\\sim h^2"}</M>, de túl kicsi{" "}
            <M>{"h"}</M>-nál a lebegőpontos kivonás öli meg a pontosságot. Ezért ad néha a második derivált 4–5 értékes
            jegyet, nem többet. A képlettel kiszámolt derivált mindig pontosabb.
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
          cim="Érted, vagy csak deriválod?"
          leiras="Tíz kérdés a modul tipikus félreértéseiről — egyik sem számolós. Minden válasz után rövid magyarázat."
          kerdesek={KVIZ}
        />

        <Hibakereso feladatok={HIBAK} />

        <div className="my-6">
          <p className="mb-2 text-[11px] font-bold tracking-[0.16em] text-violet-700 uppercase">
            Játék — mennyi a meredekség?
          </p>
          <DerMeredekseg />
        </div>

        <h3 className="mt-10 text-xl font-semibold text-petrol-900">Számolós gyakorlás</h3>
        <p className="mt-2 text-[14px] text-petrol-600">
          Az öt alaptípus, ami a zárthelyin biztosan előkerül. Öt egymás utáni hibátlan megoldás után konfetti jár.
        </p>
        <GyakorloSzekcio />

        <h3 className="mt-10 text-xl font-semibold text-petrol-900">További feladattípusok</h3>
        <p className="mt-2 text-[14px] text-petrol-600">Ezek is bekerülnek a Zh-szimulátorba.</p>
        <GyakorloExtra />

        <Kiemelo tipus="kulcs" cim="Mikor mehetsz tovább">
          <p>
            Akkor vagy készen ezzel a modullal, ha (1) le tudod írni a differenciálhányados definícióját fejből, és meg
            tudod mondani, miért kell benne határérték, (2) öt vegyes deriválásból ötször hibátlanul kihozod az
            eredményt — <em>a belső deriváltakkal együtt</em>, (3) egy szélsőértékfeladatnál magadtól felírod az
            értelmezési tartományt és ellenőrzöd a végpontokat, (4) ránézésre megmondod, szabad-e egy adott
            határértéknél a L&apos;Hospital-szabály, és (5) le tudsz vezetni egy teljes függvényvizsgálatot a hét lépés
            szerint, két előjeltáblázattal. A következő modulban az integrálszámítás jön: ott ugyanezeket a
            deriváltakat fogjuk <strong>visszafelé</strong> olvasni — a „+C” tag pedig épp a Lagrange-tétel 2.
            következménye lesz.
          </p>
        </Kiemelo>
      </Szakasz>
    </>
  );
}
