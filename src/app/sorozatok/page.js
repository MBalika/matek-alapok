import { ModulFejlec, SzakaszSav } from "@/components/ModulKeret";
import { Szakasz, Kartya, Kiemelo, AbraKeret, KetOszlop } from "@/components/ui/Elemek";
import { M, MB, KepletDoboz } from "@/components/ui/Keplet";
import { KidolgozottFeladat, Lepes } from "@/components/KidolgozottFeladat";
import SorozatRajzolo from "@/components/abrak/SorozatRajzolo";
import SorKorlatFelfedezo from "@/components/abrak/SorKorlatFelfedezo";
import SorKuszobindexFelfedezo from "@/components/abrak/SorKuszobindexFelfedezo";
import SorRekurzioFelfedezo from "@/components/abrak/SorRekurzioFelfedezo";
import SorNagysagrendVerseny from "@/components/abrak/SorNagysagrendVerseny";
import SorEszamFelfedezo from "@/components/abrak/SorEszamFelfedezo";
import SorFibonacciSpiral from "@/components/abrak/SorFibonacciSpiral";
import SorHatarertekLovolde from "@/components/abrak/SorHatarertekLovolde";
import { AbraTorlodas, AbraRendorelv, AbraMertani } from "@/components/abrak/SorStatikusAbrak";
import { SorozatKalk, RekurzioKalk } from "@/components/abrak/SorozatKalk";
import GyakorloSzekcio from "@/components/sorozatok/GyakorloSzekcio";
import GyakorloExtra from "@/components/sorozatok/GyakorloExtra";
import FilmKuszobindex from "@/components/sorozatok/FilmKuszobindex";
import FilmRekurzio from "@/components/sorozatok/FilmRekurzio";
import Kviz from "@/components/Kviz";
import Hibakereso from "@/components/Hibakereso";
import { KVIZ, HIBAK } from "@/components/sorozatok/KvizAdatok";
import { modulSlugAlapjan } from "@/lib/oldalterkep";

export const metadata = {
  title: "Sorozatok",
  description:
    "Konvergencia és küszöbindex, monotonitás és korlátosság, rendőrelv, határozatlan alakok, nagyságrendek, rekurzív sorozatok és az e szám — interaktív ábrákkal, kidolgozott feladatokkal és gyakorlással.",
};

const modul = modulSlugAlapjan("/sorozatok");

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

export default function SorozatokOldal() {
  return (
    <>
      <ModulFejlec
        szam={3}
        cim="Sorozatok"
        leiras="Itt kezdődik az analízis. Egyetlen kérdés köré épül az egész fejezet: mit jelent az, hogy egy végtelen sok tagból álló lista „tart valahova”? A válasz az ε-sáv és a küszöbindex képe — ha ezt megérted, a határérték, a folytonosság és később a derivált is ugyanarra az ötletre épül."
        tartalom={[
          "A sorozat és megadási módjai",
          "Monotonitás, korlátosság",
          "Konvergencia, küszöbindex",
          "Határozatlan alakok",
          "Rendőrelv, rekurzió",
          "Nagyságrendek, az e szám",
        ]}
      />
      <SzakaszSav szakaszok={modul.szakaszok} />

      {/* ==================== ELMÉLET ==================== */}
      <Szakasz
        id="elmelet"
        cimke="1. rész"
        cim="Elmélet"
        bevezeto="Tíz gondolat, amiből az egész modul áll. Az ábrákat próbáld ki: az ε-sáv és a pókháló-ábra többet tanít, mint tíz sor magyarázat."
      >
        {/* --- 3.1 --- */}
        <h3 className="mt-2 text-xl font-semibold text-petrol-900">3.1 Mi a sorozat, és hogyan adjuk meg?</h3>
        <Proza>
          <p>
            A sorozat a legegyszerűbb objektum az analízisben, és mégis ezen keresztül épül fel az egész tárgy: a
            határérték, a folytonosság, a differenciál- és az integrálszámítás mind a sorozatok konvergenciájára vezethető
            vissza. Érdemes tehát <em>megérteni</em>, nem pedig megtanulni.
          </p>
        </Proza>

        <Kiemelo tipus="definicio" cim="Definíció — számsorozat">
          <p>
            Számsorozatnak nevezünk minden olyan függvényt, amelynek értelmezési tartománya a pozitív egész számok
            halmaza, értékkészlete pedig a valós számok részhalmaza:
          </p>
          <MB>{"a:\\ \\mathbb{N}\\to\\mathbb{R},\\qquad n\\mapsto a_n \\qquad (n = 1,\\,2,\\,3,\\dots)"}</MB>
          <p>
            A függvényértéket nem <M>{"a(n)"}</M>, hanem indexes alakban <M>{"a_n"}</M> jelöli; ez a sorozat{" "}
            <strong>n-edik tagja</strong>. Magát a sorozatot <M>{"(a_n)"}</M> jelöli.
          </p>
        </Kiemelo>

        <Proza>
          <p>
            Két dolgot érdemes rögtön tisztázni. Az <strong>indexelés kezdete nem szent</strong>: néha kényelmesebb{" "}
            <M>{"n = 0"}</M>-tól indulni, néha <M>{"n = 3"}</M>-tól (ha az első tagoknál nullával kellene osztani). Ez a
            lényegen nem változtat — a határértéket csak a „vég” érdekli, az első néhány tag elhagyása vagy hozzávétele a
            konvergencián <em>soha</em> nem változtat.
          </p>
          <p>
            A másik: <strong>a sorozat nem azonos az értékkészletével</strong>. Az <M>{"a_n = (-1)^n"}</M> sorozatnak
            végtelen sok tagja van, noha ezek csak két különböző értéket vesznek fel. A sorozat lényegéhez hozzátartozik a{" "}
            <em>sorrend</em> is.
          </p>
        </Proza>

        <div className="mt-5 grid gap-4 lg:grid-cols-3 [&>*]:min-w-0">
          <Kartya cimke="1. megadási mód" cim="Explicit képlet">
            <p className="text-[14px] leading-relaxed text-petrol-600">
              Behelyettesítéssel bármelyik tag azonnal megkapható.
            </p>
            <MB>{"a_n = \\frac{n+1}{n}:\\quad 2,\\ \\tfrac32,\\ \\tfrac43,\\ \\dots"}</MB>
            <p className="mt-1 text-[13px] text-petrol-500">
              A <M>{"(-1)^n"}</M> tényező az alternáló sorozatok építőköve: pontosan azt csinálja, hogy a tagok előjele
              váltakozik.
            </p>
          </Kartya>
          <Kartya cimke="2. megadási mód" cim="Rekurzió">
            <p className="text-[14px] leading-relaxed text-petrol-600">
              Nem a tagot írjuk fel, hanem azt, hogyan jön az előzőkből — kezdeti feltétellel.
            </p>
            <MB>{"a_1 = a_2 = 1,\\quad a_{n+2} = a_{n+1} + a_n"}</MB>
            <p className="mt-1 text-[13px] text-petrol-500">
              A Fibonacci-sorozat: <M>{"1,\\ 1,\\ 2,\\ 3,\\ 5,\\ 8,\\ 13,\\dots"}</M>
            </p>
          </Kartya>
          <Kartya cimke="3. megadási mód" cim="Szabállyal">
            <p className="text-[14px] leading-relaxed text-petrol-600">
              Nincs képlet, csak egyértelmű utasítás — ettől még teljes értékű sorozat.
            </p>
            <p className="mt-2 text-[13.5px] text-petrol-700">
              <M>{"a_n"}</M> = az <M>{"n"}</M>-edik prímszám: <M>{"2,\\ 3,\\ 5,\\ 7,\\ 11,\\dots"}</M>
            </p>
            <p className="mt-1 text-[13px] text-petrol-500">
              A képlet hiánya csak annyit jelent, hogy nehezebb velük <em>számolni</em>.
            </p>
          </Kartya>
        </div>

        <Kiemelo tipus="tipp" cim="Mérnöki példa: a kamatos kamat">
          <p>
            Ha egy <M>{"K_0"}</M> tőkét évi <M>{"p"}</M> százalékos kamatra teszünk be, az <M>{"n"}</M>-edik év végi tőke{" "}
            <M>{"K_{n+1} = K_n\\left(1+\\frac{p}{100}\\right)"}</M> — ez rekurzív alak. Itt szerencsére „meg is tudjuk
            oldani” a rekurziót: <M>{"K_n = K_0\\left(1+\\frac{p}{100}\\right)^n"}</M>. Általában viszont ez{" "}
            <strong>nem megy</strong>, és épp ez a rekurzív megadás fő nehézsége. A 3.7-ben megtanuljuk, hogyan lehet
            mégis kiszámolni a határértéket — explicit képlet nélkül.
          </p>
        </Kiemelo>

        <Probald cim="Próbáld ki — rajzold ki a sorozatot">
          <SorozatRajzolo />
        </Probald>

        <Kiemelo tipus="figyelem" cim="A jelölés két értelme">
          <p>
            Az <M>{"a_n"}</M> szimbólum egy <strong>számot</strong> jelöl (az <M>{"n"}</M>-edik tagot), az{" "}
            <M>{"(a_n)"}</M> pedig az <strong>egész sorozatot</strong>. Az „<M>{"(a_n)"}</M> konvergens” mondat értelmes,
            az „<M>{"a_5"}</M> konvergens” nem. A zárójelet a gyakorlatban sokszor elhagyják, de fejben mindig tudnod
            kell, melyikről van szó.
          </p>
        </Kiemelo>

        {/* --- 3.2 --- */}
        <Alcim>3.2 Monotonitás és korlátosság</Alcim>
        <Proza>
          <p>
            Mielőtt a határértékhez érnénk, két olyan tulajdonságot kell megismernünk, amelyek önmagukban is fontosak,
            együtt pedig — mint a 3.7-ben látni fogjuk — <em>elegendők</em> a konvergenciához.
          </p>
        </Proza>

        <Kiemelo tipus="definicio" cim="Definíció — monotonitás és korlátosság">
          <p>
            Az <M>{"(a_n)"}</M> sorozat <strong>monoton növő</strong>, ha <M>{"a_{n+1}\\ge a_n"}</M>{" "}
            <em>minden</em> <M>{"n"}</M>-re; <strong>szigorúan növő</strong>, ha <M>{"a_{n+1} > a_n"}</M>. Ugyanígy
            csökkenőre a fordított egyenlőtlenséggel.
          </p>
          <p className="mt-2">
            <strong>Felülről korlátos</strong>, ha van olyan <M>{"K"}</M>, hogy <M>{"a_n\\le K"}</M> minden{" "}
            <M>{"n"}</M>-re; <strong>alulról korlátos</strong>, ha van olyan <M>{"k"}</M>, hogy <M>{"a_n\\ge k"}</M>;{" "}
            <strong>korlátos</strong>, ha mindkettő — azaz ha van olyan <M>{"K>0"}</M>, hogy <M>{"|a_n|\\le K"}</M>.
          </p>
        </Kiemelo>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 [&>*]:min-w-0">
          <Kartya cimke="1. módszer" cim="Különbségmódszer">
            <MB>{"a_{n+1} - a_n \\ \\lessgtr\\ 0\\ ?"}</MB>
            <p className="mt-2 text-[13.5px] leading-relaxed text-petrol-600">
              Például <M>{"a_n = \\frac{n}{n+1}"}</M> esetén
            </p>
            <MB>{"a_{n+1}-a_n = \\frac{(n+1)^2 - n(n+2)}{(n+1)(n+2)} = \\frac{1}{(n+1)(n+2)} > 0,"}</MB>
            <p className="text-[13px] text-petrol-500">tehát a sorozat szigorúan monoton növő.</p>
          </Kartya>
          <Kartya cimke="2. módszer" cim="Hányadosmódszer — csak pozitív tagokra">
            <MB>{"\\frac{a_{n+1}}{a_n} \\ \\lessgtr\\ 1\\ ?"}</MB>
            <p className="mt-2 text-[13.5px] leading-relaxed text-petrol-600">
              <M>{"a_n = \\frac{2^n}{n!}"}</M> esetén
            </p>
            <MB>{"\\frac{a_{n+1}}{a_n} = \\frac{2^{n+1}}{(n+1)!}\\cdot\\frac{n!}{2^n} = \\frac{2}{n+1},"}</MB>
            <p className="text-[13px] text-petrol-500">
              ami <M>{"n\\ge2"}</M>-től kisebb 1-nél: a második tagtól kezdve szigorúan csökken.
            </p>
          </Kartya>
        </div>

        <Kiemelo tipus="figyelem" cim="A hányadosmódszer csapdája">
          <p>
            A hányadosmódszer <strong>csak pozitív tagú</strong> sorozatra használható. Ha a tagok negatívak, a hányados
            egynél nagyobb volta épp az ellenkezőjét jelenti: <M>{"-4"}</M>-ből <M>{"-8"}</M>-ba lépve a hányados{" "}
            <M>{"2 > 1"}</M>, pedig a sorozat <em>csökkent</em>. Előjelváltó sorozatnál (<M>{"(-1)^n"}</M>-es tényező)
            mindig különbségmódszer — vagy vizsgáld az abszolút értéket.
          </p>
        </Kiemelo>

        <Probald cim="Próbáld ki — húzd a korlátokat">
          <SorKorlatFelfedezo />
        </Probald>

        <Kiemelo tipus="tipp" cim="A leghasznosabb trükk az egész modulban">
          <p>
            A korlátosságnál majdnem mindig segít, ha a képletet olyan alakra hozod, amelyben a „lényeg” és a „maradék”
            szét van választva. A <M>{"\\frac{2n+1}{n} = 2 + \\frac1n"}</M> típusú polinomosztás azonnal megmutatja{" "}
            <strong>a korlátokat és a határértéket is</strong>: <M>{"2 < a_n \\le 3"}</M>, és a határérték 2.
          </p>
          <p className="mt-2">
            Vigyázz: a korlát <strong>nem</strong> a legkisebb ilyen szám. Ha <M>{"K"}</M> felső korlát, akkor{" "}
            <M>{"K+1"}</M> és <M>{"K+100"}</M> is az. A legkisebb felső korlát neve <strong>szuprémum</strong>, a
            legnagyobb alsóé <strong>infimum</strong>.
          </p>
        </Kiemelo>

        {/* --- 3.3 --- */}
        <Alcim>3.3 Torlódási pont — és miért nem ugyanaz, mint a határérték</Alcim>
        <Kiemelo tipus="definicio" cim="Definíció — torlódási pont">
          <p>
            Az <M>{"A"}</M> valós szám az <M>{"(a_n)"}</M> sorozat <strong>torlódási pontja</strong>, ha <M>{"A"}</M>{" "}
            minden környezetében a sorozatnak <strong>végtelen sok</strong> tagja van. Pontosabban: minden{" "}
            <M>{"\\varepsilon > 0"}</M> esetén végtelen sok olyan <M>{"n"}</M> index van, amelyre{" "}
            <M>{"|a_n - A| < \\varepsilon"}</M>.
          </p>
        </Kiemelo>

        <Proza>
          <p>
            A torlódási pont tehát olyan érték, amelyhez a sorozat „újra és újra visszatér”. Egy sorozatnak lehet nulla,
            egy, több, sőt végtelen sok torlódási pontja is. Az <M>{"1/n"}</M>-nek egy (a 0), a <M>{"(-1)^n"}</M>-nek
            kettő (<M>{"-1"}</M> és 1), az <M>{"a_n = n"}</M>-nek egy sem.
          </p>
        </Proza>

        <AbraKeret
          szam="3.1"
          cim="Ugyanaz a váltakozó előjel, mégis más a viselkedés: bal oldalon két „vonzási középpont”, jobb oldalon egyetlen — az utóbbi a határérték."
        >
          <AbraTorlodas />
        </AbraKeret>

        <Kiemelo tipus="kulcs" cim="A kettő viszonya">
          <p>
            A határértéknél azt követeljük meg, hogy egy indextől kezdve <strong>minden</strong> tag közel legyen; a
            torlódási pontnál csak azt, hogy <strong>végtelen sok</strong> tag közel legyen. Ebből következik: a
            határérték mindig torlódási pont, de fordítva nem igaz. És a lényeg:{" "}
            <strong>
              a sorozat pontosan akkor konvergens, ha korlátos és pontosan egy torlódási pontja van.
            </strong>{" "}
            A <M>{"(-1)^n"}</M> épp azért divergens, mert két „vonzási középpontja” van, és nem tud dönteni köztük.
          </p>
        </Kiemelo>

        <Kiemelo tipus="figyelem" cim="A torlódási pontot nem kell felvennie">
          <p>
            Az <M>{"a_n = (-1)^n\\left(1+\\frac1n\\right)"}</M> sorozat torlódási pontjai <M>{"-1"}</M> és 1 — noha
            magukat ezeket az értékeket a sorozat <em>egyszer sem</em> veszi fel. Ugyanígy: az <M>{"1/n"}</M> sorozat
            egyetlen tagja sem nulla, a határértéke mégis 0. Szigorúan monoton sorozat soha nem veszi fel a határértékét.
          </p>
        </Kiemelo>

        {/* --- 3.4 --- */}
        <Alcim>3.4 A konvergencia: a küszöbindexes definíció</Alcim>
        <Proza>
          <p>
            Ez a modul legfontosabb szakasza. A definíció első olvasásra nehéznek tűnik, de ha egyszer megérted a mögötte
            lévő képet, soha többé nem fogod elfelejteni.
          </p>
          <p>
            Nézzük az <M>{"a_n = \\frac{2n+1}{n+3}"}</M> sorozatot:{" "}
            <M>{"a_1 = 0{,}75"}</M>, <M>{"a_2 = 1"}</M>, <M>{"a_{10} \\approx 1{,}615"}</M>,{" "}
            <M>{"a_{100} \\approx 1{,}951"}</M>. Látszik, hogy a tagok a 2 felé közelednek. De mit jelent pontosan, hogy
            „közelednek”? A naiv válasz — „a tagok egyre közelebb kerülnek a 2-höz” — két okból sem jó definíció: a{" "}
            <M>{"3 - \\frac1n"}</M> sorozat tagjai is „egyre közelebb kerülnek” a 10-hez (hiszen nőnek), mégsem tartanak
            hozzá; és egy sorozat úgy is tarthat valahova, hogy közben oda-vissza ugrál (<M>{"\\frac{(-1)^n}{n}"}</M>).
          </p>
          <p>
            A helyes megfogalmazás nem a <em>közeledésről</em>, hanem a <em>közelségről</em> szól:{" "}
            <strong>
              bármilyen kicsi hibahatárt is szabunk meg előre, a sorozat egy idő után véglegesen ezen belülre kerül.
            </strong>
          </p>
        </Proza>

        <Kiemelo tipus="tipp" cim="A mérnöki kép">
          <p>
            Képzeld el, hogy egy szabályozott rendszer (mondjuk egy termosztát) a 2 értékre áll be, és <M>{"a_n"}</M> a
            mért érték az <M>{"n"}</M>-edik időlépésben. A megrendelő azt mondja: „nekem <M>{"\\pm 0{,}2"}</M> pontosság
            kell”. Megnézed, melyik időponttól kezdve marad a mérés végig ezen a tűrésen belül — itt a 22. lépéstől.
            Erre azt mondja: „meggondoltam magam, <M>{"\\pm 0{,}01"}</M> kell”. Újraszámolod: a 497. lépéstől jó.
          </p>
          <p className="mt-2">
            A sorozat <strong>pontosan akkor</strong> konvergál 2-höz, ha <strong>bármilyen</strong> szigorú tűrést szab
            is meg a megrendelő, te mindig tudsz mutatni egy ilyen időpontot. Ez az egész definíció.
          </p>
        </Kiemelo>

        <Kiemelo tipus="definicio" cim="Definíció — határérték, konvergencia">
          <p>
            Az <M>{"A\\in\\mathbb{R}"}</M> szám az <M>{"(a_n)"}</M> sorozat <strong>határértéke</strong>, ha
          </p>
          <MB>
            {
              "\\forall \\varepsilon > 0\\ \\ \\exists N(\\varepsilon):\\quad n > N(\\varepsilon) \\ \\Longrightarrow\\ \\left|a_n - A\\right| < \\varepsilon ."
            }
          </MB>
          <p>
            Ha van ilyen <M>{"A"}</M>, a sorozat <strong>konvergens</strong>, és <M>{"\\lim_{n\\to\\infty}a_n = A"}</M>;
            ha nincs, <strong>divergens</strong>. Az <M>{"N(\\varepsilon)"}</M> a <strong>küszöbindex</strong> — a
            jelölésben az <M>{"\\varepsilon"}</M> szándékosan szerepel: a küszöbindex <em>függ</em> a megkövetelt
            pontosságtól.
          </p>
        </Kiemelo>

        <Probald cim="Próbáld ki — szűkítsd a sávot, nézd a küszöböt">
          <SorKuszobindexFelfedezo />
        </Probald>

        <Proza>
          <p>
            Így olvasd az ábrát. <strong>1.</strong> Kijelöljük a feltételezett határértéket (a narancs vonal).{" "}
            <strong>2.</strong> Köré rajzolunk egy <M>{"\\varepsilon"}</M> szélességű <strong>sávot</strong> fel- és
            lefelé. Az <M>{"|a_n - A| < \\varepsilon"}</M> egyenlőtlenség pontosan azt jelenti, hogy az <M>{"a_n"}</M>{" "}
            pont ebben a sávban van. <strong>3.</strong> A sorozat akkor konvergens, ha a sávon kívül csak{" "}
            <strong>véges sok</strong> tag maradhat — ezek az elején vannak, és az utánuk következő index a küszöbindex.{" "}
            <strong>4.</strong> A döntő pont: ez <strong>minden</strong> sávszélességre igaz kell legyen. Ha szűkíted a
            sávot, a küszöbindex egyre jobbra csúszik — de mindig <em>létezik</em>.
          </p>
        </Proza>

        <Kiemelo tipus="kulcs" cim="A recept küszöbindexes feladatra">
          <p>
            <strong>1.</strong> Írd fel és egyszerűsítsd az <M>{"|a_n - A|"}</M> kifejezést (közös nevező!). ·{" "}
            <strong>2.</strong> Oldd meg az <M>{"|a_n - A| < \\varepsilon"}</M> egyenlőtlenséget <M>{"n"}</M>-re. ·{" "}
            <strong>3.</strong> A kapott korlát lesz <M>{"N(\\varepsilon)"}</M>; ha egész kell, vedd az egész részét.
          </p>
        </Kiemelo>

        <Kiemelo tipus="figyelem" cim="Három gyakori félreértés">
          <p>
            <strong>„Elég, ha egy tag beleesik a sávba.”</strong> Nem. Az <M>{"N"}</M> utáni <em>összes</em> tagnak bent
            kell lennie; egyetlen kiszökő tag <M>{"N"}</M> után már megbuktatja az adott <M>{"\\varepsilon"}</M>-t.
          </p>
          <p className="mt-2">
            <strong>
              „Az <M>{"N"}</M>-et előbb kell megadni, mint az <M>{"\\varepsilon"}</M>-t.”
            </strong>{" "}
            Fordítva! A sorrend kötött: <em>előbb</em> jön a tetszőleges <M>{"\\varepsilon"}</M>, <em>utána</em> keresünk
            hozzá <M>{"N"}</M>-et. Ezért írjuk <M>{"N(\\varepsilon)"}</M>-t. Ha a levezetésedben az <M>{"N"}</M> nem
            tartalmazza az <M>{"\\varepsilon"}</M>-t, valószínűleg hibáztál.
          </p>
          <p className="mt-2">
            <strong>„A tagoknak monoton kell közeledniük.”</strong> Nem kell. A definíció nem mond semmit arról, hogyan
            jutnak be a tagok a sávba — akár oda-vissza ugrálva is beérhetnek.
          </p>
        </Kiemelo>

        {/* --- 3.5 --- */}
        <Alcim>3.5 A határérték alaptulajdonságai</Alcim>
        <KetOszlop>
          <div>
            <Kiemelo tipus="definicio" cim="Tétel — a határérték egyértelmű">
              <p>Egy sorozatnak legfeljebb egy határértéke lehet.</p>
            </Kiemelo>
            <Proza>
              <p>
                <strong>Bizonyítás (indirekt).</strong> Tegyük fel, hogy <M>{"a_n\\to A"}</M> és <M>{"a_n\\to B"}</M>,
                ahol <M>{"A\\ne B"}</M>. Legyen <M>{"\\varepsilon = \\frac{|A-B|}{2} > 0"}</M> — a két szám távolságának
                a fele. Ha <M>{"n"}</M> elég nagy, a háromszög-egyenlőtlenség szerint
              </p>
              <MB>{"|A-B| \\le |a_n - A| + |a_n - B| < \\varepsilon + \\varepsilon = |A-B|,"}</MB>
              <p>
                vagyis <M>{"|A-B| < |A-B|"}</M> — ellentmondás. Szemléletesen: ha két különböző szám volna a határérték,
                a köréjük rajzolt elég kicsi sávok nem metszenék egymást, a sorozatnak viszont egy idő után mindkettőben
                benne kellene lennie. Egy pont nem lehet egyszerre két helyen.
              </p>
            </Proza>
          </div>
          <div>
            <Kiemelo tipus="definicio" cim="Tétel — konvergens sorozat korlátos">
              <p>Minden konvergens sorozat korlátos.</p>
            </Kiemelo>
            <Proza>
              <p>
                <strong>Bizonyítás.</strong> Legyen <M>{"a_n\\to A"}</M>, és válasszuk <M>{"\\varepsilon = 1"}</M>-et.
                Ekkor van olyan <M>{"N"}</M>, hogy <M>{"n>N"}</M> esetén <M>{"A-1 < a_n < A+1"}</M>. Ami ezen kívül
                marad, az az <M>{"a_1,\\dots,a_N"}</M> — <strong>véges sok</strong> szám, amelyek között van legnagyobb
                és legkisebb. Így
              </p>
              <MB>{"K = \\max\\left\\{|a_1|,\\dots,|a_N|,\\ |A|+1\\right\\}"}</MB>
              <p>
                korlátja a sorozatnak.
              </p>
            </Proza>
          </div>
        </KetOszlop>

        <Kiemelo tipus="figyelem" cim="A megfordítás HAMIS">
          <p>
            A korlátosság szükséges, de <strong>nem elégséges</strong> feltétele a konvergenciának. Ellenpélda:{" "}
            <M>{"a_n = (-1)^n"}</M> korlátos, mégis divergens. A tétel viszont ebben az irányban remekül használható:{" "}
            <strong>ha egy sorozat nem korlátos, akkor biztosan nem konvergens</strong> — ez gyakran a leggyorsabb módja
            a divergencia kimutatásának.
          </p>
        </Kiemelo>

        <Kiemelo tipus="kulcs" cim="Nullsorozat szorozva korláttal">
          <p>
            A 0-hoz tartó sorozatokat <strong>nullsorozatnak</strong> hívjuk, és minden konvergencia visszavezethető
            rájuk: <M>{"a_n \\to A \\iff a_n - A \\to 0 \\iff |a_n - A| \\to 0"}</M>. Innen a fejezet egyik
            legkényelmesebb eszköze:
          </p>
          <MB>{"a_n \\to 0,\\ \\ (b_n)\\ \\text{korlátos} \\ \\Longrightarrow\\ a_n b_n \\to 0"}</MB>
          <p>
            A <M>{"(b_n)"}</M>-nek <em>nem kell</em> konvergensnek lennie! Ezért <M>{"\\frac{\\sin n}{n}\\to0"}</M>{" "}
            (a <M>{"\\sin n"}</M> divergens, de <M>{"|\\sin n|\\le1"}</M>), és ugyanígy{" "}
            <M>{"\\frac{(-1)^n}{n}\\to0"}</M>, <M>{"\\frac{(-1)^n n}{n^2+1}\\to0"}</M>.
          </p>
        </Kiemelo>

        {/* --- 3.6 --- */}
        <Alcim>3.6 Műveletek és a határozatlan alakok</Alcim>
        <Proza>
          <p>
            Kevés olyan határértéket számolunk ki a definícióból, mint a 3.4-ben. A gyakorlatban ismert határértékeket
            kombinálunk — ehhez kell a műveleti tétel.
          </p>
        </Proza>

        <KepletDoboz
          cimke="Műveleti tétel — ha aₙ → A és bₙ → B, mindkettő VÉGES"
          keplet={
            "a_n \\pm b_n \\to A \\pm B,\\qquad a_n b_n \\to AB,\\qquad \\frac{a_n}{b_n}\\to\\frac{A}{B}\\ \\ (B\\ne0),\\qquad \\sqrt{a_n}\\to\\sqrt A"
          }
        />

        <Kiemelo tipus="figyelem" cim="A feltétel nem díszítés">
          <p>
            Mindegyik pont azt köti ki, hogy a részhatárértékek <em>külön-külön létezzenek és végesek legyenek</em>. Ha
            ez nem teljesül, a tétel <strong>nem alkalmazható</strong> — és ilyenkor bármi megtörténhet. Például{" "}
            <M>{"a_n = n"}</M> és <M>{"b_n = -n"}</M> esetén <M>{"a_n+b_n = 0 \\to 0"}</M>, holott egyik sem konvergens.
            Ebből nem szabad arra következtetni, hogy „<M>{"\\infty-\\infty = 0"}</M>”.
          </p>
        </Kiemelo>

        <Kiemelo tipus="definicio" cim="A hét határozatlan alak">
          <MB>
            {
              "\\frac{0}{0},\\qquad \\frac{\\infty}{\\infty},\\qquad \\infty-\\infty,\\qquad 0\\cdot\\infty,\\qquad 1^{\\infty},\\qquad \\infty^0,\\qquad 0^0"
            }
          </MB>
          <p>
            „Határozatlan” nem azt jelenti, hogy nincs határérték, és nem is azt, hogy nem lehet kiszámolni — hanem hogy{" "}
            <strong>az alak önmagában nem árulja el az eredményt</strong>. Nézd, mennyi minden jöhet ki ugyanabból az{" "}
            <M>{"\\frac{\\infty}{\\infty}"}</M> alakból: <M>{"\\frac{n^2}{n}\\to\\infty"}</M>,{" "}
            <M>{"\\frac{n}{n^2}\\to0"}</M>, <M>{"\\frac{3n}{n}\\to3"}</M>, és{" "}
            <M>{"\\frac{n\\left(2+(-1)^n\\right)}{n}"}</M>-nek nincs is határértéke.
          </p>
        </Kiemelo>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 [&>*]:min-w-0">
          <Kartya cimke="Nem határozatlan" cim="Ezeket szabadon használhatod">
            <div className="finom-gorgeto overflow-x-auto">
              <table className="w-full text-[13.5px]">
                <thead className="text-[11px] text-petrol-500 uppercase">
                  <tr>
                    <th className="pb-1 text-left font-semibold">Alak</th>
                    <th className="pb-1 text-left font-semibold">Eredmény</th>
                    <th className="pb-1 text-left font-semibold">Példa</th>
                  </tr>
                </thead>
                <tbody className="text-petrol-700">
                  <tr className="border-t border-petrol-100">
                    <td className="py-1">véges / ∞</td>
                    <td className="py-1">0</td>
                    <td className="py-1">
                      <M>{"\\tfrac{5}{n}\\to0"}</M>
                    </td>
                  </tr>
                  <tr className="border-t border-petrol-100">
                    <td className="py-1">pozitív / 0⁺</td>
                    <td className="py-1">+∞</td>
                    <td className="py-1">
                      <M>{"\\tfrac{3}{1/n} = 3n"}</M>
                    </td>
                  </tr>
                  <tr className="border-t border-petrol-100">
                    <td className="py-1">∞ + ∞</td>
                    <td className="py-1">+∞</td>
                    <td className="py-1">
                      <M>{"n+n^2"}</M>
                    </td>
                  </tr>
                  <tr className="border-t border-petrol-100">
                    <td className="py-1">∞ · pozitív</td>
                    <td className="py-1">+∞</td>
                    <td className="py-1">
                      <M>{"5n"}</M>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Kartya>
          <Kartya cimke="A fokszám-szabály" cim="Polinom per polinom">
            <MB>
              {
                "\\lim_{n\\to\\infty}\\frac{p(n)}{q(n)} = \\begin{cases} 0, & k<m\\\\[2pt] \\dfrac{p_k}{q_m}, & k=m\\\\[2pt] \\pm\\infty, & k>m \\end{cases}"
              }
            </MB>
            <p className="mt-2 text-[13px] leading-relaxed text-petrol-500">
              <M>{"k"}</M> és <M>{"m"}</M> a fokszámok, <M>{"p_k"}</M> és <M>{"q_m"}</M> a főegyütthatók. Az utolsó
              esetben az előjelet a <M>{"p_k/q_m"}</M> hányados előjele dönti el.
            </p>
          </Kartya>
        </div>

        <Kiemelo tipus="kulcs" cim="Két recept, amit minden zárthelyin használni fogsz">
          <p>
            <strong>Polinom per polinom:</strong> ossz el a számlálóban és a nevezőben minden tagot{" "}
            <em>a nevező legmagasabb fokú tagjával</em>. Ezután minden <M>{"1/n^k"}</M> alakú tag nullához tart, és az
            eredmény leolvasható.
          </p>
          <p className="mt-2">
            <strong>Gyökös különbség (<M>{"\\infty-\\infty"}</M>):</strong> bővíts a <em>konjugálttal</em>, azaz használd
            az <M>{"(x-y)(x+y) = x^2-y^2"}</M> azonosságot, hogy a gyökök eltűnjenek:{" "}
            <M>{"\\sqrt x - \\sqrt y = \\frac{x-y}{\\sqrt x + \\sqrt y}"}</M>.
          </p>
        </Kiemelo>

        <Kiemelo tipus="figyelem" cim="A leggyakrabban elrontott lépés">
          <p>
            Amikor <M>{"n"}</M>-nel osztasz, a <strong>gyökjel alatt <M>{"n^2"}</M>-tel</strong> kell osztani:
          </p>
          <MB>{"\\frac{\\sqrt{n^2+4}}{n} = \\sqrt{\\frac{n^2+4}{n^2}} = \\sqrt{1+\\frac{4}{n^2}},\\qquad \\text{és NEM } \\sqrt{1+\\frac4n}."}</MB>
        </Kiemelo>

        {/* --- 3.7 --- */}
        <Alcim>3.7 Rendőrelv és a monoton korlátos sorozatok tétele</Alcim>
        <Kiemelo tipus="definicio" cim="Tétel — közrefogási elv („rendőrelv”)">
          <p>
            Ha egy <M>{"N_0"}</M> indextől kezdve <M>{"b_n \\le a_n \\le c_n"}</M>, és{" "}
            <M>{"\\lim b_n = \\lim c_n = A"}</M>, akkor <M>{"(a_n)"}</M> is konvergens, és <M>{"a_n \\to A"}</M>.
          </p>
        </Kiemelo>
        <Proza>
          <p>
            Ha két rendőr közrefog egy gyanúsítottat, és mindkét rendőr az őrszobára megy, akkor a gyanúsított is oda fog
            érkezni — nincs más választása. A tétel ereje abban van, hogy <strong>nem kell tudnunk semmit</strong>{" "}
            <M>{"(a_n)"}</M> képletéről: se monotonitást, se pontos alakot. Elég, ha be tudjuk szorítani két kezelhető
            sorozat közé.
          </p>
        </Proza>

        <AbraKeret
          szam="3.2"
          cim="A rendőrelv: az alsó és a felső becslés ugyanoda tart, tehát a közrefogott sorozatnak sincs hová mennie."
        >
          <AbraRendorelv />
        </AbraKeret>

        <Kiemelo tipus="definicio" cim="Tétel — monoton korlátos sorozat konvergens">
          <p>
            Ha <M>{"(a_n)"}</M> <strong>monoton növő</strong> és <strong>felülről korlátos</strong>, akkor konvergens, és
            a határértéke a sorozat <strong>szuprémuma</strong>. Hasonlóan: monoton csökkenő és alulról korlátos sorozat
            konvergens, a határértéke az infimuma.
          </p>
        </Kiemelo>

        <Proza>
          <p>
            Ez talán az egész félév legfontosabb tétele, mert ez az első olyan eszközünk, amely a határérték{" "}
            <strong>ismerete nélkül</strong> garantálja a konvergenciát. A bizonyítás a valós számok{" "}
            <strong>teljességi axiómáján</strong> múlik: minden nem üres, felülről korlátos halmaznak van legkisebb felső
            korlátja. Legyen <M>{"A"}</M> ez a szuprémum. Mivel <M>{"A"}</M> a <em>legkisebb</em> felső korlát, az{" "}
            <M>{"A-\\varepsilon"}</M> már nem az, tehát van olyan <M>{"N"}</M>, amelyre <M>{"a_N > A-\\varepsilon"}</M>.
            A monotonitás miatt minden <M>{"n>N"}</M>-re <M>{"A-\\varepsilon < a_n \\le A < A+\\varepsilon"}</M> — és ez
            pontosan a konvergencia definíciója.
          </p>
          <p>
            Miért kell ehhez axióma? Mert a <em>racionális</em> számok körében nem igaz az állítás: az{" "}
            <M>{"1;\\ 1{,}4;\\ 1{,}41;\\ 1{,}414;\\dots"}</M> sorozat monoton nő, felülről korlátos, minden tagja
            racionális — a határértéke mégsem az. A <M>{"\\mathbb{Q}"}</M> „lyukas”; a teljességi axióma épp azt mondja
            ki, hogy a valós számok egyenesén nincsenek ilyen lyukak.
          </p>
        </Proza>

        <Kiemelo tipus="figyelem" cim="A feltételek nem hagyhatók el">
          <p>
            <M>{"a_n = n"}</M> monoton nő, de nem korlátos — divergens. <M>{"a_n = (-1)^n"}</M> korlátos, de nem
            monoton — divergens. A megfordítás sem igaz: a konvergencia nem vonja maga után a monotonitást (lásd{" "}
            <M>{"\\frac{(-1)^n}{n}"}</M>).
          </p>
        </Kiemelo>

        <Proza>
          <p>
            <strong>A tétel igazi haszna: a rekurzív sorozatok.</strong> Ha egy sorozat rekurzív, általában nincs
            esélyünk explicit képletet találni. A monoton korlátos tétel viszont ilyenkor is működik, és a határérték
            kiszámítására egy elegáns trükköt kínál: ha <M>{"a_n\\to A"}</M>, akkor <M>{"a_{n+1}\\to A"}</M> is (ugyanaz
            a sorozat, egy taggal eltolva), tehát a rekurziós összefüggés mindkét oldalán vehetünk határértéket, és az{" "}
            <M>{"A = f(A)"}</M> <strong>fixpont-egyenletet</strong> kapjuk.
          </p>
        </Proza>

        <Probald cim="Próbáld ki — pókháló-ábra: hova fut a lépcső?">
          <SorRekurzioFelfedezo />
        </Probald>

        <Kiemelo tipus="figyelem" cim="Sorrendi hiba — nagyon gyakori!">
          <p>
            A fixpont-egyenlet felírása <strong>csak akkor jogos, ha már tudjuk, hogy a sorozat konvergens</strong>. Ha
            ezt kihagyod, abszurd eredményre juthatsz: az <M>{"a_1 = 1,\\ a_{n+1} = 2a_n"}</M> sorozatra az{" "}
            <M>{"A = 2A"}</M> egyenlet <M>{"A = 0"}</M>-t adna — pedig a sorozat (<M>{"1, 2, 4, 8,\\dots"}</M>) a
            végtelenbe tart. A helyes sorrend mindig:{" "}
            <strong>korlátosság → monotonitás → konvergencia → és csak ezután az egyenlet</strong>.
          </p>
        </Kiemelo>

        {/* --- 3.8 --- */}
        <Alcim>3.8 Divergencia, nagyságrendek, nevezetes határértékek</Alcim>
        <Proza>
          <p>
            Divergens minden olyan sorozat, amelynek nincs véges határértéke. Ez azonban kétféleképpen fordulhat elő, és
            a kettőt érdemes megkülönböztetni.
          </p>
        </Proza>

        <Kiemelo tipus="definicio" cim="Definíció — tágabb értelemben vett határérték">
          <p>
            Az <M>{"(a_n)"}</M> sorozat határértéke <M>{"+\\infty"}</M>, ha <strong>minden</strong> <M>{"K"}</M> valós
            számhoz létezik olyan <M>{"N(K)"}</M> index, hogy minden <M>{"n > N(K)"}</M> esetén <M>{"a_n > K"}</M>.
            Hasonlóan <M>{"-\\infty"}</M>-re.
          </p>
        </Kiemelo>

        <Proza>
          <p>
            Ugyanaz a gondolat, más sávval: a véges határértéknél egy <em>vékony sávba</em> kellett bekerülnie a
            sorozatnak, itt egy <em>magas félsíkba</em>. „Bármilyen magasra teszed a lécet, a sorozat egy idő után
            véglegesen fölötte marad.” Az ilyen sorozat viszont <strong>divergens</strong> (nincs véges határértéke),
            csak épp szabályosan viselkedik. Az igazi divergencia ehhez képest az, amikor a sorozat se nem tart véges
            számhoz, se nem szalad a végtelenbe: <M>{"(-1)^n"}</M> <em>oszcillálva divergens</em>, <M>{"(-2)^n"}</M>{" "}
            pedig nem korlátos <em>és</em> oszcillál.
          </p>
        </Proza>

        <AbraKeret szam="3.3" cim="A mértani sorozat négy esete. A nullához tartás feltétele |q| < 1 — nem q < 1.">
          <AbraMertani />
        </AbraKeret>

        <Kiemelo tipus="kulcs" cim="A nagyságrendi sorrend">
          <MB>{"\\lg n \\ \\ll\\ n^{\\alpha} \\ \\ll\\ q^{n} \\ \\ll\\ n! \\ \\ll\\ n^{n} \\qquad (\\alpha>0,\\ q>1)"}</MB>
          <p>
            A <M>{"\\ll"}</M> jelentése: ha <M>{"(x_n)\\ll(y_n)"}</M>, akkor <M>{"\\frac{x_n}{y_n}\\to0"}</M> és{" "}
            <M>{"\\frac{y_n}{x_n}\\to+\\infty"}</M>. Magyarul: a logaritmus lassabban nő minden hatványnál, minden
            hatvány lassabban minden exponenciálisnál, az exponenciális lassabban a faktoriálisnál, a faktoriális pedig
            lassabban, mint <M>{"n^n"}</M>. <strong>Hányadosnál mindig az erősebb dönt.</strong>
          </p>
        </Kiemelo>

        <Probald cim="Próbáld ki — melyik nő gyorsabban?">
          <SorNagysagrendVerseny />
        </Probald>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 [&>*]:min-w-0">
          <Kartya cimke="Nevezetes határértékek" cim="Gyökök">
            <MB>{"\\sqrt[n]{c}\\to1\\ \\ (c>0),\\qquad \\sqrt[n]{n}\\to1,\\qquad \\sqrt[n]{p(n)}\\to1"}</MB>
            <p className="mt-2 text-[13px] leading-relaxed text-petrol-500">
              Meglepő, de igaz: a gyök alatti szám a végtelenbe tart (ez „felfelé húzná” az eredményt), a gyökkitevő
              viszont szintén nő (ez „lefelé”). A gyökkitevő nyer. Számokkal:{" "}
              <M>{"\\sqrt[10]{10}\\approx1{,}259"}</M>, <M>{"\\sqrt[100]{100}\\approx1{,}047"}</M>,{" "}
              <M>{"\\sqrt[1000]{1000}\\approx1{,}007"}</M>.
            </p>
          </Kartya>
          <Kartya cimke="Nevezetes határértékek" cim="Összegek a gyök alatt">
            <MB>{"\\sqrt[n]{a_1^n + \\dots + a_k^n} \\to \\max\\{a_1,\\dots,a_k\\}"}</MB>
            <p className="mt-2 text-[13px] leading-relaxed text-petrol-500">
              A <strong>nagyobbik alap</strong> dönt, mert a többi tag hozzá képest elhanyagolható. Rendőrelvvel három
              sorban látszik; ugyanez működik akkor is, ha a gyök alatt polinom is van:{" "}
              <M>{"\\sqrt[n]{5^n+n^{10}}\\to5"}</M>.
            </p>
          </Kartya>
        </div>

        <Kiemelo tipus="figyelem" cim="A nagyságrendi sorrend nem „megérzés”">
          <p>
            Sokan azt hiszik, hogy <M>{"n^{100}"}</M> nagyobb, mint <M>{"2^n"}</M>, mert „a kitevő nagyobb”. Kis{" "}
            <M>{"n"}</M>-ekre ez igaz is — de a határértéket a <em>végtelenben</em> nézzük, és ott mindig az
            exponenciális nyer. Konkrétan a 997. lépésnél előzi meg <M>{"2^n"}</M> az <M>{"n^{100}"}</M>-t.
          </p>
        </Kiemelo>

        {/* --- 3.9 --- */}
        <Alcim>3.9 Az e szám</Alcim>
        <Proza>
          <p>
            Ez a szakasz egyetlen sorozatról szól — de ez a sorozat az egész matematika egyik legfontosabb állandóját
            definiálja. Nézzük az <M>{"a_n = \\left(1+\\frac1n\\right)^n"}</M> sorozatot. Két, egymással ellentétes hatás
            versenyez benne: az alap egyre <em>csökken</em> és 1-hez tart (ez a hatványt 1 felé húzná), a kitevő viszont
            egyre <em>nő</em> (ez felfelé). Ez az <M>{"1^{\\infty}"}</M> határozatlan alak: számolni kell.
          </p>
        </Proza>

        <Probald cim="Próbáld ki — a kamat, ami nem szalad el">
          <SorEszamFelfedezo />
        </Probald>

        <Kiemelo tipus="definicio" cim="Tétel és definíció — az e szám">
          <p>
            Az <M>{"a_n = \\left(1+\\frac1n\\right)^n"}</M> sorozat <strong>szigorúan monoton növő</strong> és{" "}
            <strong>felülről korlátos</strong> (egy felső korlátja 3), ezért konvergens. A határértéke
          </p>
          <MB>{"e := \\lim_{n\\to\\infty}\\left(1+\\frac1n\\right)^n \\approx 2{,}718281828459\\dots"}</MB>
          <p>
            Az <M>{"e"}</M> irracionális (sőt transzcendens); az <M>{"e"}</M> alapú (természetes) logaritmus jele{" "}
            <M>{"\\ln"}</M>.
          </p>
        </Kiemelo>

        <Proza>
          <p>
            A bizonyítás vázlata a <strong>binomiális tétellel</strong> megy. Kifejtve{" "}
            <M>{"\\binom nk \\frac{1}{n^k} = \\frac{1}{k!}\\left(1-\\frac1n\\right)\\cdots\\left(1-\\frac{k-1}{n}\\right)"}</M>,
            tehát
          </p>
          <MB>
            {
              "a_n = 1 + 1 + \\frac{1}{2!}\\left(1-\\frac1n\\right) + \\frac{1}{3!}\\left(1-\\frac1n\\right)\\left(1-\\frac2n\\right) + \\dots"
            }
          </MB>
          <p>
            <strong>Monotonitás:</strong> <M>{"n"}</M>-ről <M>{"n+1"}</M>-re lépve minden zárójel nagyobb lesz (nagyobb
            nevezőből kisebbet vonunk le), és a végén megjelenik egy plusz pozitív tag — tehát <M>{"a_{n+1} > a_n"}</M>.{" "}
            <strong>Korlátosság:</strong> minden zárójel kisebb 1-nél, ezért elhagyhatók, és <M>{"k! \\ge 2^{k-1}"}</M>{" "}
            miatt
          </p>
          <MB>{"a_n \\le 1 + 1 + \\frac{1}{2} + \\frac{1}{2^2} + \\dots + \\frac{1}{2^{n-1}} < 1 + 2 = 3."}</MB>
          <p>
            A 3.7 tétele szerint a sorozat konvergens.
          </p>
        </Proza>

        <Kiemelo tipus="kulcs" cim="A recept 1^∞ alakú feladatokra">
          <MB>{"\\lim_{n\\to\\infty}\\left(1+\\frac{1}{b_n}\\right)^{b_n} = e \\quad (|b_n|\\to\\infty),\\qquad \\lim_{n\\to\\infty}\\left(1+\\frac cn\\right)^n = e^c"}</MB>
          <p>
            <strong>1.</strong> Alakítsd az alapot „1 + valami kicsi” formára — általában polinomosztással. ·{" "}
            <strong>2.</strong> Írd fel a kitevőt úgy, hogy a „valami kicsi” <strong>reciproka</strong> megjelenjen benne
            szorzóként. · <strong>3.</strong> A reciprok-kitevős rész <M>{"e"}</M>-hez tart, a maradék szorzó
            határértéke lesz a kitevő.
          </p>
        </Kiemelo>

        <Kiemelo tipus="figyelem" cim="Nem minden 1^∞ ad e-t!">
          <p>
            <M>{"\\left(1+\\frac{1}{n^2}\\right)^{n} = \\left[\\left(1+\\frac{1}{n^2}\\right)^{n^2}\\right]^{1/n} \\to e^0 = 1"}</M>
            , mert a külső kitevő, <M>{"\\frac1n"}</M>, nullához tart — itt az alap „túl gyorsan” tart 1-hez a kitevőhöz
            képest. <strong>Mindig számold ki a külső kitevő határértékét</strong>, ne tippelj.
          </p>
        </Kiemelo>

        <Kiemelo tipus="tipp" cim="Miért épp ez a szám a „természetes”?">
          <p>
            Mert az <M>{"e^x"}</M> az egyetlen olyan exponenciális függvény, amelynek a deriváltja önmaga. Emiatt minden
            olyan folyamat, ahol a <strong>változás sebessége arányos a pillanatnyi mennyiséggel</strong> — radioaktív
            bomlás, hűlés, kamatos kamat, a beton szilárdulása, csillapított rezgés — az <M>{"e"}</M> hatványaival
            írható le. A fenti sorozat maga a „folytonosan kamatozó” tőke modellje.
          </p>
        </Kiemelo>

        {/* --- 3.10 --- */}
        <Alcim>3.10 Miért szép? — a Fibonacci-hányadosok és az aranymetszés</Alcim>
        <Proza>
          <p>
            Ez a rész nem tananyag, csak látvány — és egy szép alkalmazása mindannak, amit eddig tanultunk. A Fibonacci-
            sorozat szomszédos tagjainak hányadosa, <M>{"F_{n+1}/F_n"}</M>, egy konkrét irracionális számhoz tart: az
            aranymetszés arányához. A trükk ugyanaz, mint a rekurzív sorozatoknál — a rekurziót elosztva{" "}
            <M>{"F_n"}</M>-nel az <M>{"x = 1 + 1/x"}</M> fixpont-egyenletet kapjuk.
          </p>
        </Proza>
        <div className="mt-4">
          <SorFibonacciSpiral />
        </div>
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
          ido="7 perc"
          forras="Előadás, 3.4. példa"
          cim="Küszöbindex a definícióból"
          feladat={
            <p>
              Bizonyítsd a definíció alapján, hogy <M>{"\\lim\\limits_{n\\to\\infty}\\dfrac{2n+1}{n+3} = 2"}</M>, és add
              meg a küszöbindexet <M>{"\\varepsilon = 0{,}2"}</M>, illetve <M>{"\\varepsilon = 0{,}01"}</M> esetén!
              Igazold ugyanígy, hogy <M>{"\\lim\\limits_{n\\to\\infty}\\dfrac1n = 0"}</M>.
            </p>
          }
          tanulsag={
            <p>
              A küszöbindexes feladat mindig ugyanaz a három lépés: különbség egyszerűsítése, egyenlőtlenség megoldása{" "}
              <M>{"n"}</M>-re, egész rész. A kulcs az, hogy az <M>{"N"}</M>-nek <strong>tartalmaznia kell</strong> az{" "}
              <M>{"\\varepsilon"}</M>-t — ha nem tartalmazza, valahol hiba van.
            </p>
          }
        >
          <Lepes cim="1. lépés — a különbség kiszámítása">
            <MB>{"\\left|a_n - 2\\right| = \\left|\\frac{2n+1}{n+3} - 2\\right| = \\left|\\frac{2n+1-2(n+3)}{n+3}\\right| = \\left|\\frac{-5}{n+3}\\right| = \\frac{5}{n+3}"}</MB>
            <p>
              Az abszolút érték elhagyható, mert <M>{"n+3 > 0"}</M>.
            </p>
          </Lepes>
          <Lepes cim="2. lépés — az egyenlőtlenség megoldása n-re">
            <MB>{"\\frac{5}{n+3} < \\varepsilon \\quad\\Longleftrightarrow\\quad n+3 > \\frac{5}{\\varepsilon} \\quad\\Longleftrightarrow\\quad n > \\frac{5}{\\varepsilon} - 3"}</MB>
            <p>
              Mivel <strong>minden</strong> <M>{"\\varepsilon>0"}</M>-hoz találtunk ilyen küszöböt, a határérték valóban
              2. Ezzel a bizonyítás kész.
            </p>
          </Lepes>
          <Lepes cim="3. lépés — a konkrét értékek">
            <KepletDoboz
              cimke="Tűrés: 0,2"
              keplet={"n > \\frac{5}{\\varepsilon} - 3"}
              behelyettesitve={"n > \\frac{5}{0{,}2} - 3 = 25 - 3 = 22"}
              eredmeny={"N(0{,}2) = 22"}
            />
            <KepletDoboz
              cimke="Tűrés: 0,01"
              keplet={"n > \\frac{5}{\\varepsilon} - 3"}
              behelyettesitve={"n > \\frac{5}{0{,}01} - 3 = 500 - 3 = 497"}
              eredmeny={"N(0{,}01) = 497"}
            />
          </Lepes>
          <Lepes cim="4. lépés — ellenőrzés (érdemes megcsinálni!)">
            <MB>{"a_{22} = \\frac{45}{25} = 1{,}8 \\ \\Rightarrow\\ \\left|a_{22}-2\\right| = 0{,}2 \\ \\not< 0{,}2"}</MB>
            <MB>{"a_{23} = \\frac{47}{26} \\approx 1{,}8077 \\ \\Rightarrow\\ \\left|a_{23}-2\\right| \\approx 0{,}192 < 0{,}2 \\ \\checkmark"}</MB>
            <p>
              A 22. tag eltérése <em>pontosan</em> <M>{"0{,}2"}</M> — még nem kisebb nála —, a 23.-tól viszont már minden
              tag bent van. Ezért a legkisebb megfelelő küszöb éppen <M>{"N = 22"}</M>.
            </p>
          </Lepes>
          <Lepes cim="5. lépés — ugyanez az 1/n sorozatra">
            <MB>{"\\left|\\frac1n - 0\\right| = \\frac1n < \\varepsilon \\quad\\Longleftrightarrow\\quad n > \\frac{1}{\\varepsilon}"}</MB>
            <p>
              Tehát <M>{"N(\\varepsilon) = \\frac{1}{\\varepsilon}"}</M> jó választás. Például{" "}
              <M>{"\\varepsilon = 0{,}02"}</M> esetén <M>{"N = 50"}</M>: az 51. tagtól kezdve minden tag{" "}
              <M>{"0{,}02"}</M>-nél közelebb van a nullához. Ez az <strong>archimédeszi tulajdonság</strong> analízisbeli
              megfogalmazása: nincs olyan kicsi pozitív szám, amelynél minden <M>{"1/n"}</M> nagyobb volna.
            </p>
          </Lepes>
        </KidolgozottFeladat>

        <div className="my-6">
          <p className="mb-2 text-[11px] font-bold tracking-[0.16em] text-naracs-600 uppercase">
            Film — a sáv záródása és a küszöbindex
          </p>
          <FilmKuszobindex />
        </div>

        {/* ---- KF-2 ---- */}
        <KidolgozottFeladat
          jel="KF‑2"
          ido="6 perc"
          forras="Előadás, 5.3. példa"
          cim="Polinom per polinom — a három eset"
          feladat={
            <p>
              Számítsd ki: <M>{"\\lim\\limits_{n\\to\\infty}\\dfrac{3n^2-5n+2}{2n^2+n-7}"}</M>,{" "}
              <M>{"\\lim\\limits_{n\\to\\infty}\\dfrac{n^3+2n}{4n^2+5n+7}"}</M>, és{" "}
              <M>{"\\lim\\limits_{n\\to\\infty}\\dfrac{4n^2+5n+7}{n^3-7}"}</M>.
            </p>
          }
          tanulsag={
            <p>
              A három eset a fokszámok viszonyából azonnal adódik, de a dolgozatban{" "}
              <strong>írd le a domináns taggal való osztást is</strong> — az eredmény önmagában nem levezetés. És
              figyelj: osztás után a nevező határértéke nem lehet nulla, különben a műveleti tétel nem alkalmazható.
            </p>
          }
        >
          <Lepes cim="(a) Azonos fokszám — osztás n²-tel">
            <MB>{"\\lim_{n\\to\\infty}\\frac{3n^2-5n+2}{2n^2+n-7} = \\lim_{n\\to\\infty}\\frac{3 - \\frac5n + \\frac{2}{n^2}}{2 + \\frac1n - \\frac{7}{n^2}} = \\frac{3-0+0}{2+0-0} = \\frac32"}</MB>
            <p>
              Most már <strong>szabad</strong> a műveleti tételt alkalmazni, mert a számláló és a nevező külön-külön is
              konvergens, és a nevező határértéke <M>{"2 \\ne 0"}</M>.
            </p>
          </Lepes>
          <Lepes cim="(b) A számláló fokszáma nagyobb">
            <MB>{"\\lim_{n\\to\\infty}\\frac{n^3+2n}{4n^2+5n+7} = \\lim_{n\\to\\infty}\\frac{n + \\frac2n}{4 + \\frac5n + \\frac{7}{n^2}}"}</MB>
            <p>
              A nevező 4-hez tart, a számláló viszont <M>{"+\\infty"}</M>-hez. A hányados tehát <M>{"+\\infty"}</M>-hez
              tart: a sorozat <strong>divergens</strong>, tágabb értelemben vett határértéke <M>{"+\\infty"}</M>.
            </p>
          </Lepes>
          <Lepes cim="(c) A nevező fokszáma nagyobb">
            <MB>{"\\lim_{n\\to\\infty}\\frac{4n^2+5n+7}{n^3-7} = \\lim_{n\\to\\infty}\\frac{\\frac4n + \\frac{5}{n^2} + \\frac{7}{n^3}}{1 - \\frac{7}{n^3}} = \\frac{0}{1} = 0"}</MB>
          </Lepes>
          <Lepes cim="Az általános szabály">
            <MB>
              {
                "\\lim_{n\\to\\infty}\\frac{p(n)}{q(n)} = \\begin{cases} 0, & k<m\\\\[2pt] \\frac{p_k}{q_m}, & k=m\\\\[2pt] \\pm\\infty, & k>m \\end{cases}"
              }
            </MB>
            <p>
              Ahol <M>{"k"}</M> és <M>{"m"}</M> a fokszámok, <M>{"p_k"}</M> és <M>{"q_m"}</M> a főegyütthatók. Számpróba{" "}
              <M>{"n = 10^6"}</M>-ra: (a) <M>{"\\approx 1{,}499997"}</M> ✓, (c) <M>{"\\approx 4\\cdot10^{-6}"}</M> ✓.
            </p>
          </Lepes>
        </KidolgozottFeladat>

        {/* ---- KF-3 ---- */}
        <KidolgozottFeladat
          jel="KF‑3"
          ido="7 perc"
          forras="Előadás, 5.4. példa"
          cim="Gyökös kifejezések — bővítés a konjugálttal"
          feladat={
            <p>
              Számítsd ki: <M>{"\\lim\\limits_{n\\to\\infty}\\left(\\sqrt{n^2+4} - \\sqrt{n^2-n}\\right)"}</M> és{" "}
              <M>{"\\lim\\limits_{n\\to\\infty}\\left(\\sqrt{n+1} - \\sqrt{n}\\right)"}</M>.
            </p>
          }
          tanulsag={
            <p>
              Két, <M>{"+\\infty"}</M>-hez tartó sorozat különbsége az egyik esetben <M>{"\\frac12"}</M>, a másikban 0 —
              ugyanaz az alak, más az eredmény. Pontosan ezért nevezzük „határozatlannak”. A módszer viszont mindkétszer
              ugyanaz: bővítés a konjugálttal, majd osztás a domináns taggal.
            </p>
          }
        >
          <Lepes cim="1. lépés — felismerés és bővítés">
            <p>
              Mindkét tag <M>{"+\\infty"}</M>-hez tart, tehát <M>{"\\infty-\\infty"}</M> alak: dolgoznunk kell.
              Bővítsünk a konjugálttal, vagyis az <M>{"(x-y)(x+y) = x^2-y^2"}</M> azonossággal:
            </p>
            <MB>{"\\sqrt{n^2+4} - \\sqrt{n^2-n} = \\frac{\\left(\\sqrt{n^2+4} - \\sqrt{n^2-n}\\right)\\left(\\sqrt{n^2+4} + \\sqrt{n^2-n}\\right)}{\\sqrt{n^2+4} + \\sqrt{n^2-n}}"}</MB>
          </Lepes>
          <Lepes cim="2. lépés — a számláló összeomlik">
            <MB>{"\\left(n^2+4\\right) - \\left(n^2-n\\right) = n+4 \\qquad\\Longrightarrow\\qquad \\lim_{n\\to\\infty}\\frac{n+4}{\\sqrt{n^2+4} + \\sqrt{n^2-n}}"}</MB>
            <p>
              A gyökök eltűntek: elsőfokú számláló maradt, a nevező pedig nagyságrendileg <M>{"2n"}</M>.
            </p>
          </Lepes>
          <Lepes cim="3. lépés — osztás n-nel (a gyök alatt n²-tel!)">
            <MB>{"\\lim_{n\\to\\infty}\\frac{1 + \\frac4n}{\\sqrt{1 + \\frac{4}{n^2}} + \\sqrt{1 - \\frac1n}} = \\frac{1+0}{\\sqrt1 + \\sqrt1} = \\frac12"}</MB>
            <p>
              Számpróba: <M>{"n = 1000"}</M> esetén{" "}
              <M>{"\\sqrt{1\\,000\\,004} - \\sqrt{999\\,000} \\approx 1000{,}002 - 999{,}500 = 0{,}502"}</M> ✓
            </p>
          </Lepes>
          <Lepes cim="4. lépés — a második feladat">
            <MB>{"\\sqrt{n+1}-\\sqrt n = \\frac{(n+1)-n}{\\sqrt{n+1}+\\sqrt n} = \\frac{1}{\\sqrt{n+1}+\\sqrt n} \\longrightarrow 0"}</MB>
            <p>
              Itt a számláló konstans 1 marad, a nevező viszont a végtelenbe tart — véges osztva végtelennel, tehát 0.{" "}
              <M>{"n = 10^6"}</M>-ra az érték <M>{"\\approx 0{,}0005"}</M> ✓
            </p>
          </Lepes>
        </KidolgozottFeladat>

        {/* ---- KF-4 ---- */}
        <KidolgozottFeladat
          jel="KF‑4"
          ido="9 perc"
          forras="Előadás, 6.1. példa"
          cim="Rendőrelv — három klasszikus"
          feladat={
            <p>
              Számítsd ki a rendőrelvvel: <M>{"\\lim\\limits_{n\\to\\infty}\\sqrt[n]{2^n+3^n}"}</M>, az{" "}
              <M>{"S_n = \\dfrac{1}{\\sqrt{n^2+1}} + \\dfrac{1}{\\sqrt{n^2+2}} + \\dots + \\dfrac{1}{\\sqrt{n^2+n}}"}</M>{" "}
              összeg határértékét, és <M>{"\\lim\\limits_{n\\to\\infty}\\dfrac{n!}{n^n}"}</M>.
            </p>
          }
          tanulsag={
            <p>
              A rendőrelv akkor a legerősebb, amikor a képlet <em>kezelhetetlen</em>: nem kell róla semmit tudnunk, csak
              két oldalról beszorítani. A második feladat a legfontosabb tanulság: ha az összeg{" "}
              <strong>tagszáma is n-től függ</strong>, tagonként <strong>tilos</strong> határértéket venni.
            </p>
          }
        >
          <Lepes cim="(a) A gyök alatt két hatvány — a nagyobbik alap dönt">
            <MB>{"3^n \\le 2^n + 3^n \\le 3^n + 3^n = 2\\cdot3^n"}</MB>
            <p>
              Az <M>{"n"}</M>-edik gyök monoton növő függvény, tehát megtartja az egyenlőtlenségeket:
            </p>
            <MB>{"3 \\le \\sqrt[n]{2^n+3^n} \\le 3\\sqrt[n]{2}"}</MB>
            <p>
              Mivel <M>{"\\sqrt[n]{2}\\to1"}</M>, a jobb oldal is 3-hoz tart, tehát a rendőrelv szerint a határérték{" "}
              <strong>3</strong>. Általánosan:{" "}
              <M>{"\\lim\\sqrt[n]{a_1^n+\\dots+a_k^n} = \\max\\{a_1,\\dots,a_k\\}"}</M>.
            </p>
          </Lepes>
          <Lepes cim="(b) Növekvő tagszámú összeg — a csapda">
            <p>
              Itt <strong>nem szabad</strong> tagonként határértéket venni! Minden tag 0-hoz tart, de a tagok{" "}
              <em>száma is nő</em> — a műveleti tétel csak rögzített, véges sok tagra szól. A megoldás: a szumma{" "}
              <M>{"n"}</M> darab tagot tartalmaz, mindegyik a legkisebb és a legnagyobb közé esik.
            </p>
            <MB>{"\\frac{n}{\\sqrt{n^2+n}} \\le S_n \\le \\frac{n}{\\sqrt{n^2+1}}"}</MB>
          </Lepes>
          <Lepes cim="(b folytatás) — mindkét rendőr 1-hez tart">
            <MB>{"\\frac{n}{\\sqrt{n^2+n}} = \\frac{1}{\\sqrt{1+\\frac1n}} \\to 1,\\qquad \\frac{n}{\\sqrt{n^2+1}} = \\frac{1}{\\sqrt{1+\\frac{1}{n^2}}} \\to 1"}</MB>
            <p>
              A rendőrelv szerint tehát <M>{"S_n \\to 1"}</M>. Számpróba: <M>{"S_{10} \\approx 0{,}9739"}</M>,{" "}
              <M>{"S_{100} \\approx 0{,}9975"}</M>, <M>{"S_{10\\,000} \\approx 0{,}99997"}</M> ✓
            </p>
          </Lepes>
          <Lepes cim="(c) n! per nⁿ — három sorban">
            <MB>{"\\frac{n!}{n^n} = \\frac{1\\cdot2\\cdot3\\cdots n}{n\\cdot n\\cdot n\\cdots n} = \\frac1n\\cdot\\frac2n\\cdot\\frac3n\\cdots\\frac nn"}</MB>
            <p>
              Az első tényező <M>{"\\frac1n"}</M>, a többi mind legfeljebb 1. Tehát{" "}
              <M>{"0 < \\frac{n!}{n^n} \\le \\frac1n"}</M>, és a rendőrelv szerint a határérték <strong>0</strong>. Ez
              szép példa arra, hogy a rendőrelvvel néha három sorban elintézhető az, ami másképp reménytelen.
            </p>
          </Lepes>
        </KidolgozottFeladat>

        {/* ---- KF-5 ---- */}
        <KidolgozottFeladat
          jel="KF‑5"
          ido="10 perc"
          forras="Előadás, 6.3. példa"
          cim="Rekurzív sorozat — a teljes gondolatmenet"
          feladat={
            <p>
              Legyen <M>{"a_1 = 1"}</M> és <M>{"a_{n+1} = \\sqrt{2 + a_n}"}</M>. Konvergens-e a sorozat, és ha igen, mi a
              határértéke?
            </p>
          }
          tanulsag={
            <p>
              A négy lépés sorrendje kötelező:{" "}
              <strong>korlátosság → monotonitás → konvergencia → és csak ezután az egyenlet</strong>. Ha a 4. lépéssel
              kezdenél, az <M>{"a_{n+1} = 2a_n"}</M> sorozatra „bebizonyítanád”, hogy 0-hoz tart — pedig a végtelenbe
              szalad.
            </p>
          }
        >
          <Lepes cim="0. lépés — nézd meg, mi történik">
            <MB>{"a_1 = 1,\\quad a_2 = \\sqrt3 \\approx 1{,}732,\\quad a_3 = \\sqrt{3{,}732} \\approx 1{,}932,\\quad a_4 \\approx 1{,}983,\\quad a_5 \\approx 1{,}996"}</MB>
            <p>Úgy tűnik, a sorozat nő és 2 felé tart. Ezt kell most bizonyítani.</p>
          </Lepes>
          <Lepes cim="1. lépés — felülről korlátos (teljes indukcióval)">
            <p>
              Állítjuk, hogy <M>{"a_n < 2"}</M> minden <M>{"n"}</M>-re.
            </p>
            <p>
              <em>Kezdet:</em> <M>{"a_1 = 1 < 2"}</M> ✓
            </p>
            <p>
              <em>Lépés:</em> ha <M>{"a_n < 2"}</M>, akkor{" "}
              <M>{"a_{n+1} = \\sqrt{2+a_n} < \\sqrt{2+2} = 2"}</M> ✓
            </p>
          </Lepes>
          <Lepes cim="2. lépés — monoton növő">
            <p>
              Azt kell igazolni, hogy <M>{"a_{n+1} > a_n"}</M>, azaz <M>{"\\sqrt{2+a_n} > a_n"}</M>. Mindkét oldal
              pozitív, tehát négyzetre emelhetünk:
            </p>
            <MB>{"2 + a_n > a_n^2 \\iff a_n^2 - a_n - 2 < 0 \\iff \\left(a_n-2\\right)\\left(a_n+1\\right) < 0"}</MB>
            <p>
              Ez pontosan akkor teljesül, ha <M>{"-1 < a_n < 2"}</M> — és ezt az 1. lépésben már beláttuk (a tagok
              pozitívak). ✓
            </p>
          </Lepes>
          <Lepes cim="3. lépés — a tétel alkalmazása">
            <p>
              A sorozat monoton nő és felülről korlátos, tehát a 3.7 tétele szerint <strong>konvergens</strong>. Jelölje
              a határértékét <M>{"A"}</M>. Csak most szabad tovább menni.
            </p>
          </Lepes>
          <Lepes cim="4. lépés — a határérték kiszámítása">
            <p>
              Ha <M>{"a_n \\to A"}</M>, akkor <M>{"a_{n+1} \\to A"}</M> is (ugyanaz a sorozat, egy taggal eltolva), és{" "}
              <M>{"\\sqrt{2+a_n} \\to \\sqrt{2+A}"}</M>. A rekurzió mindkét oldalán határértéket véve:
            </p>
            <KepletDoboz
              cimke="Fixpont-egyenlet"
              keplet={"A = \\sqrt{2+A}"}
              behelyettesitve={"A^2 = 2 + A \\ \\Longrightarrow\\ A^2 - A - 2 = 0 \\ \\Longrightarrow\\ A_{1,2} = \\frac{1\\pm3}{2}"}
              eredmeny={"A = 2 \\quad \\text{(a másik gyök, } {-1}\\text{, kiesik: minden tag pozitív)}"}
            />
          </Lepes>
        </KidolgozottFeladat>

        <div className="my-6">
          <p className="mb-2 text-[11px] font-bold tracking-[0.16em] text-naracs-600 uppercase">
            Film — a lépcső a fixpont felé
          </p>
          <FilmRekurzio />
        </div>

        {/* ---- KF-6 ---- */}
        <KidolgozottFeladat
          jel="KF‑6"
          ido="8 perc"
          forras="Előadás, 8.4. példa"
          cim="e-típusú határértékek — négy változat"
          feladat={
            <p>
              Számítsd ki: <M>{"\\left(1+\\frac1n\\right)^{2n}"}</M>, <M>{"\\left(1+\\frac3n\\right)^{n}"}</M>,{" "}
              <M>{"\\left(\\frac{n-1}{n+1}\\right)^{n}"}</M> és <M>{"\\left(\\frac{2n+3}{2n+1}\\right)^{n}"}</M>{" "}
              határértékét!
            </p>
          }
          tanulsag={
            <p>
              Mind a négy ugyanaz a három lépés: <strong>alap 1 + kicsi alakra</strong>, <strong>kitevő igazítása</strong>{" "}
              a kicsi reciprokával, majd a <strong>külső kitevő határértéke</strong>. A leggyakoribb hiba a harmadik
              lépés elhagyása — attól lesz <M>{"e"}</M> a válasz <M>{"e^2"}</M> helyett.
            </p>
          }
        >
          <Lepes cim="(a) A legegyszerűbb: a kitevő többszöröse">
            <MB>{"\\left(1+\\frac1n\\right)^{2n} = \\left[\\left(1+\\frac1n\\right)^{n}\\right]^{2} \\longrightarrow e^2 \\approx 7{,}389"}</MB>
          </Lepes>
          <Lepes cim="(b) A számláló nem 1 — írd át a kitevőt">
            <p>
              A „kicsi” rész <M>{"\\frac3n"}</M>, ennek reciproka <M>{"\\frac n3"}</M>. Írjuk a kitevőt{" "}
              <M>{"n = \\frac n3\\cdot3"}</M> alakban:
            </p>
            <MB>{"\\left(1+\\frac3n\\right)^{n} = \\left[\\left(1+\\frac{1}{n/3}\\right)^{n/3}\\right]^{3} \\longrightarrow e^3 \\approx 20{,}086"}</MB>
          </Lepes>
          <Lepes cim="(c) Tört alap — előbb polinomosztás">
            <MB>{"\\frac{n-1}{n+1} = \\frac{(n+1)-2}{n+1} = 1 - \\frac{2}{n+1} = 1 + \\frac{-2}{n+1}"}</MB>
            <p>
              A „kicsi” rész <M>{"\\frac{-2}{n+1}"}</M>, ennek reciproka <M>{"-\\frac{n+1}{2}"}</M>:
            </p>
            <MB>{"\\left(1+\\frac{-2}{n+1}\\right)^{n} = \\left[\\left(1+\\frac{-2}{n+1}\\right)^{-\\frac{n+1}{2}}\\right]^{-\\frac{2n}{n+1}}"}</MB>
            <p>
              A szögletes zárójel <M>{"e"}</M>-hez tart, a külső kitevő <M>{"-\\frac{2n}{n+1} \\to -2"}</M>, tehát a
              határérték <M>{"e^{-2} = \\frac{1}{e^2} \\approx 0{,}1353"}</M>. Ellenőrzés: <M>{"n = 1000"}</M> esetén{" "}
              <M>{"\\left(\\frac{999}{1001}\\right)^{1000} \\approx 0{,}13534"}</M> ✓
            </p>
          </Lepes>
          <Lepes cim="(d) Vigyázz, itt a külső kitevő 1-hez tart">
            <MB>{"\\frac{2n+3}{2n+1} = 1 + \\frac{2}{2n+1} \\quad\\Longrightarrow\\quad \\left(1+\\frac{2}{2n+1}\\right)^{n} = \\left[\\left(1+\\frac{2}{2n+1}\\right)^{\\frac{2n+1}{2}}\\right]^{\\frac{2n}{2n+1}}"}</MB>
            <p>
              A belső rész <M>{"e"}</M>-hez, a külső kitevő <M>{"\\frac{2n}{2n+1} \\to 1"}</M> — tehát a határérték{" "}
              <M>{"e^1 = e \\approx 2{,}718"}</M>. Számpróba <M>{"n = 10^6"}</M>-ra: <M>{"\\approx 2{,}71828"}</M> ✓
            </p>
          </Lepes>
        </KidolgozottFeladat>
      </Szakasz>

      {/* ==================== KALKULÁTOROK ==================== */}
      <Szakasz
        id="kalkulator"
        cimke="3. rész"
        cim="Kalkulátorok"
        bevezeto="Ugyanazok a számítások tetszőleges képlettel. Használd a házi feladat ellenőrzésére, vagy arra, hogy ráérezz, mi hogyan változik."
      >
        <div className="space-y-8">
          <div>
            <h3 className="mb-2 text-[16px] font-semibold text-petrol-900">Sorozat-vizsgáló</h3>
            <p className="mb-3 text-[14px] text-petrol-600">
              Tagok táblázata, a különbségek és a hányadosok (monotonitás-gyanú), numerikus határérték-becslés nagy{" "}
              <M>{"n"}</M>-ekre, és a küszöbindex megkeresése adott <M>{"\\varepsilon"}</M>-hoz. Alaphelyzetben a KF‑1
              sorozata van betöltve.
            </p>
            <SorozatKalk />
          </div>
          <div>
            <h3 className="mb-2 text-[16px] font-semibold text-petrol-900">Rekurzív sorozat</h3>
            <p className="mb-3 text-[14px] text-petrol-600">
              A <M>{"a_{n+1} = f(a_n)"}</M> alakú sorozatok első 30 tagja, a fixpont-egyenlet numerikus megoldása és a
              pókháló-ábra. Alaphelyzetben a KF‑5 feladata van betöltve.
            </p>
            <RekurzioKalk />
          </div>
        </div>

        <Kiemelo tipus="tipp" cim="Mire használd a kalkulátort">
          <p>
            Arra, hogy <em>ellenőrizz</em>, ne arra, hogy helyetted számoljon. A zárthelyin nem lesz nálad — és a
            numerikus „határérték-becslés” nem bizonyítás: a <M>{"\\frac{\\ln n}{n}"}</M> például még{" "}
            <M>{"n = 10^6"}</M>-nál is csak <M>{"0{,}0000138"}</M>, de az <M>{"1/\\ln n"}</M> ennél sokkal lassabban
            közelít a nullához. A számok meggyőznek, a levezetés bizonyít.
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
            Játék — a típusfelismerés gyakorlása
          </p>
          <SorHatarertekLovolde />
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
            Akkor vagy készen ezzel a modullal, ha (1) le tudod írni az <M>{"\\varepsilon"}</M>–<M>{"N"}</M> definíciót
            fejből, helyes sorrendben, (2) öt polinom per polinom feladatból ötször hibátlanul kihozod az eredményt{" "}
            <em>a domináns taggal való osztással együtt</em>, (3) egy rekurzív feladatnál magadtól a korlátossággal
            kezdesz, nem az egyenlettel, és (4) ránézésre megmondod, melyik nő gyorsabban: <M>{"n^{20}"}</M> vagy{" "}
            <M>{"1{,}1^n"}</M>. A következő modulban a függvények jönnek: ott ugyanez a küszöb-gondolat folytatódik,
            csak nem indexek, hanem valós pontok környezetében.
          </p>
        </Kiemelo>
      </Szakasz>
    </>
  );
}
