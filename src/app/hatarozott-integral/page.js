import { ModulFejlec, SzakaszSav } from "@/components/ModulKeret";
import { Szakasz, Kartya, Kiemelo, AbraKeret, KetOszlop } from "@/components/ui/Elemek";
import { M, MB, KepletDoboz } from "@/components/ui/Keplet";
import { KidolgozottFeladat, Lepes } from "@/components/KidolgozottFeladat";
import HoRiemannFelfedezo from "@/components/abrak/HoRiemannFelfedezo";
import HoAtlagertekFelfedezo from "@/components/abrak/HoAtlagertekFelfedezo";
import HoIntegralfuggveny from "@/components/abrak/HoIntegralfuggveny";
import HoTeruletFelfedezo from "@/components/abrak/HoTeruletFelfedezo";
import HoIvhosszFelfedezo from "@/components/abrak/HoIvhosszFelfedezo";
import HoForgastest from "@/components/abrak/HoForgastest";
import HoSulypontFelfedezo from "@/components/abrak/HoSulypontFelfedezo";
import HoPappusTorusz from "@/components/abrak/HoPappusTorusz";
import HoTeruletBecslo from "@/components/abrak/HoTeruletBecslo";
import {
  AbraElojelesTerulet,
  AbraParosParatlan,
  AbraKorcikkek,
  AbraCsonkakupPalast,
} from "@/components/abrak/HoStatikusAbrak";
import { HoIntegralKalk, HoAlkalmazasKalk } from "@/components/abrak/HoKalk";
import GyakorloSzekcio from "@/components/hatarozott/GyakorloSzekcio";
import GyakorloExtra from "@/components/hatarozott/GyakorloExtra";
import FilmNewtonLeibniz from "@/components/hatarozott/FilmNewtonLeibniz";
import FilmForgastest from "@/components/hatarozott/FilmForgastest";
import Kviz from "@/components/Kviz";
import Hibakereso from "@/components/Hibakereso";
import { KVIZ, HIBAK } from "@/components/hatarozott/KvizAdatok";
import { modulSlugAlapjan } from "@/lib/oldalterkep";

export const metadata = {
  title: "Határozott integrál",
  description:
    "A Riemann-integrál fogalma, alsó és felső összegek, a középértéktétel, az integrálfüggvény és a Newton–Leibniz-tétel, helyettesítés és parciális integrálás határokkal, terület, ívhossz, forgástest térfogata és felszíne, súlypont és tehetetlenségi nyomaték — interaktív ábrákkal, kidolgozott feladatokkal és gyakorlással.",
};

const modul = modulSlugAlapjan("/hatarozott-integral");

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

export default function HatarozottIntegralOldal() {
  return (
    <>
      <ModulFejlec
        szam={7}
        cim="Határozott integrál és alkalmazásai"
        leiras="Ez a modul egyetlen mondatra épül: ha egy mennyiség változó sűrűséggel oszlik el egy szakasz mentén, akkor vágd sok kis darabra, minden darabon tekintsd állandónak, add össze a járulékokat, és finomítsd a felosztást. Ebből lesz a terület, az ívhossz, a térfogat, a felszín, a súlypont és a tehetetlenségi nyomaték — mind ugyanaz a gondolat, más integrandusszal."
        tartalom={[
          "Alsó és felső összeg, Riemann-integrál",
          "Középértéktétel, átlagérték",
          "Newton–Leibniz-tétel",
          "Helyettesítés és parciális — a határokkal",
          "Terület, ívhossz, forgástest",
          "Súlypont, Pappus–Guldin, nyomaték",
        ]}
      />
      <SzakaszSav szakaszok={modul.szakaszok} />

      {/* ==================== ELMÉLET ==================== */}
      <Szakasz
        id="elmelet"
        cimke="1. rész"
        cim="Elmélet"
        bevezeto="Tizenkét lépés a téglalapokkal való közrefogástól a gerenda keresztmetszeti jellemzőiig. Az ábrákat próbáld ki: a finomodó felosztás, a súlypont alá tolt tű és a forgó kardioid többet tanít, mint húsz sor magyarázat."
      >
        {/* --- 7.1 --- */}
        <h3 className="mt-2 text-xl font-semibold text-petrol-900">
          7.1 Miért kell a határozott integrál? — a terület problémája
        </h3>
        <Proza>
          <p>
            A területről meglepően keveset tudunk. Az egész középiskolai tudásunk két állításon nyugszik: az{" "}
            <M>{"a"}</M> és <M>{"b"}</M> oldalú téglalap területe <M>{"a\\cdot b"}</M>, és ha egy alakzat egy másikat
            tartalmaz, akkor a területe sem lehet kisebb. Ebből a kettőből — kirakással és közrefogással — levezethető a
            háromszög, a trapéz, a sokszög területe.
          </p>
          <p>
            A <strong>görbe vonallal határolt</strong> alakzatok viszont kilógnak ebből a rendszerből: egy parabola
            alatti területet semmiféle véges sok téglalappal nem lehet <em>pontosan</em> kirakni. A kiút a matematika
            egyik legtermékenyebb ötlete: <strong>közrefogás</strong>. Ha a keresett területet tetszőlegesen pontosan be
            tudjuk szorítani két olyan érték közé, amelyeket ki tudunk számolni — mert téglalapokból állnak —, akkor a
            területet meghatároztuk, még ha „egy csapásra” soha nem kapjuk is meg.
          </p>
        </Proza>

        <Kiemelo tipus="kulcs" cim="Az integrál lényege egy mondatban">
          <p>
            Ha egy mennyiség <strong>változó sűrűséggel</strong> oszlik el egy szakasz mentén, akkor az egészet úgy
            kapjuk meg, hogy a szakaszt sok kis darabra vágjuk, minden darabon a sűrűséget{" "}
            <strong>állandónak</strong> tekintjük (így a darab járuléka egyszerű szorzat), a járulékokat összeadjuk,
            végül finomítjuk a felosztást. A terület csak a legszemléletesebb példa erre a sémára.
          </p>
        </Kiemelo>

        <Proza>
          <p>
            Ezért nem lesz a modul végén húsz új képlet, amit magolni kell: az ívhossz, a térfogat, a felszín és a
            súlypont képlete mind <em>ugyanennek a gondolatnak</em> a variánsa. Csak az a kérdés, hogy egy kis darab
            mivel járul hozzá az egészhez.
          </p>
        </Proza>

        <div className="mt-5 grid gap-4 lg:grid-cols-2 [&>*]:min-w-0">
          <Kartya cimke="Mérnöki kapcsolat" cim="Megoszló teher">
            <p className="text-[13.5px] leading-relaxed text-petrol-600">
              Ha egy tartót <M>{"q(x)"}</M> [kN/m] intenzitású megoszló teher terhel, az eredő erő{" "}
              <M>{"\\int_a^b q(x)\\,dx"}</M>, a támadáspontja pedig a teherábra súlypontja alatt van. A teherábra
              területe és súlypontja tehát két <em>integrál</em>.
            </p>
          </Kartya>
          <Kartya cimke="Mérnöki kapcsolat" cim="Keresztmetszeti jellemzők">
            <p className="text-[13.5px] leading-relaxed text-petrol-600">
              A statikai nyomaték és a másodrendű (tehetetlenségi) nyomaték — amiből a hajlított gerenda feszültségeit
              számoljuk — definíció szerint integrálok. A <M>{"\\frac{bh^3}{12}"}</M> képletet a 7.11-ben magunk
              vezetjük le.
            </p>
          </Kartya>
          <Kartya cimke="Mérnöki kapcsolat" cim="Munka, út, tömeg">
            <p className="text-[13.5px] leading-relaxed text-petrol-600">
              Változó erő munkája <M>{"\\int F\\,ds"}</M>, változó sebességnél a megtett út{" "}
              <M>{"\\int v(t)\\,dt"}</M>, változó sűrűségű rúd tömege <M>{"\\int \\varrho(x)\\,dx"}</M>. Mindegyik
              ugyanaz a séma.
            </p>
          </Kartya>
          <Kartya cimke="Mérnöki kapcsolat" cim="Átlagérték">
            <p className="text-[13.5px] leading-relaxed text-petrol-600">
              Az átlagsebesség, az átlaghőmérséklet vagy az effektív feszültség <em>mind</em> integrállal definiált. A
              7.4-ben kiderül, hogy az átlagot a függvény fel is veszi valahol.
            </p>
          </Kartya>
        </div>

        {/* --- 7.2 --- */}
        <Alcim>7.2 Felosztás, alsó és felső közelítő összeg</Alcim>
        <Proza>
          <p>
            Először is fel kell darabolnunk az intervallumot. Az osztópontokat nem kötelező egyenletesen elhelyezni, de
            a példákban általában így tesszük, mert akkor minden részintervallum hossza ugyanaz.
          </p>
        </Proza>

        <Kiemelo tipus="definicio" cim="Definíció — felosztás">
          <p>
            Az <M>{"a\\le x\\le b"}</M> intervallum egy <strong>felosztásán</strong> az
          </p>
          <MB>{"a = x_0 < x_1 < x_2 < \\dots < x_n = b"}</MB>
          <p>
            osztópontok rendszerét értjük; az <M>{"i"}</M>-edik részintervallum hossza{" "}
            <M>{"\\Delta x_i = x_i - x_{i-1}"}</M>. A felosztás <strong>finomsága</strong> a leghosszabb
            részintervallum hossza, <M>{"\\max_i \\Delta x_i"}</M>.
          </p>
        </Kiemelo>

        <Proza>
          <p>
            Legyen <M>{"f"}</M> korlátos, és jelölje <M>{"m_i"}</M>, illetve <M>{"M_i"}</M> az <M>{"i"}</M>-edik
            részintervallumon felvett legkisebb, illetve legnagyobb függvényértéket. (Folytonos függvénynél a
            Weierstrass-tétel szerint ezek léteznek; általános esetben infimumot és szuprémumot írunk.) Ha{" "}
            <M>{"f\\ge0"}</M>, akkor az <M>{"i"}</M>-edik sáv területe biztosan a két téglalap területe közé esik:{" "}
            <M>{"m_i\\Delta x_i \\le \\operatorname{ter}_i \\le M_i\\Delta x_i"}</M>.
          </p>
        </Proza>

        <Kiemelo tipus="definicio" cim="Definíció — alsó és felső összeg (Darboux-összegek)">
          <MB>{"s_n=\\sum_{i=1}^n m_i\\,\\Delta x_i \\qquad S_n=\\sum_{i=1}^n M_i\\,\\Delta x_i"}</MB>
          <p>
            Minden felosztásra <M>{"s_n \\le S_n"}</M>, és ha <M>{"f\\ge0"}</M>, akkor a keresett <M>{"T"}</M> terület
            mindkettő közé esik: <M>{"s_n \\le T \\le S_n"}</M>.
          </p>
        </Kiemelo>

        <Kiemelo tipus="kulcs" cim="Finomítási tétel">
          <p>
            Ha egy felosztáshoz új osztópontot veszünk hozzá, az alsó összeg <strong>nem csökken</strong>, a felső
            összeg pedig <strong>nem nő</strong>:
          </p>
          <MB>{"s_n \\le s_{n+1} \\le \\dots \\le S_{n+1} \\le S_n"}</MB>
          <p>
            Sőt: <em>bármelyik</em> alsó összeg kisebb-egyenlő <em>bármelyik</em> felső összegnél, akkor is, ha
            teljesen különböző felosztásokból származnak. Az ok egyszerű: ha egy részintervallumot kettévágunk, a két
            félen a minimum külön-külön legalább akkora, mint az egészen volt.
          </p>
        </Kiemelo>

        <Probald cim="Próbáld ki — told az n csúszkát, és nézd, hogyan szűkül a rés">
          <HoRiemannFelfedezo />
        </Probald>

        <Proza>
          <p>
            Az <M>{"f(x)=x^2"}</M> függvénynél a <M>{"0\\le x\\le1"}</M> szakaszon a számolás végig elvégezhető
            kézzel: az osztópontok <M>{"x_i = \\frac in"}</M>, és mivel a függvény növekvő, a minimum a bal, a maximum
            a jobb végpontban van. Az első <M>{"k"}</M> négyzetszám összegképletével
          </p>
          <MB>{"S_n=\\frac{1}{n^3}\\cdot\\frac{n(n+1)(2n+1)}{6}=\\frac{(n+1)(2n+1)}{6n^2},\\qquad s_n=\\frac{(n-1)(2n-1)}{6n^2}"}</MB>
          <p>
            és mindkettő <M>{"\\frac13"}</M>-hoz tart. A rés nagysága pontosan <M>{"S_n-s_n=\\frac1n"}</M>, ami
            nullához tart — a részleteket a KF‑1-ben számoljuk végig.
          </p>
        </Proza>

        <Kiemelo tipus="figyelem" cim="A közrefogás nem mindig szűkül">
          <p>
            Ha a rés <strong>nem</strong> tart nullához, akkor nincs jól meghatározott terület. A klasszikus ellenpélda
            a Dirichlet-függvény (<M>{"1"}</M> a racionális, <M>{"0"}</M> az irracionális helyeken): minden
            részintervallumban van racionális és irracionális szám is, tehát <M>{"m_i=0"}</M> és <M>{"M_i=1"}</M>{" "}
            mindig, így <M>{"s_n=0"}</M>, <M>{"S_n=b-a"}</M>. A rés soha nem szűkül.
          </p>
        </Kiemelo>

        {/* --- 7.3 --- */}
        <Alcim>7.3 A Riemann-integrál definíciója és az előjeles terület</Alcim>
        <Proza>
          <p>
            Az alsó és felső összeg helyett gyakran kényelmesebb <strong>közbülső helyeket</strong> használni: minden
            részintervallumból válasszunk egy tetszőleges <M>{"\\xi_i"}</M> pontot. Mivel{" "}
            <M>{"m_i \\le f(\\xi_i) \\le M_i"}</M>, minden ilyen összeg az alsó és a felső összeg között van:{" "}
            <M>{"s_n \\le \\sigma_n \\le S_n"}</M>.
          </p>
        </Proza>

        <Kiemelo tipus="definicio" cim="Definíció — Riemann-integrál">
          <p>
            Az <M>{"f"}</M> függvény <strong>Riemann-integrálható</strong> az <M>{"a\\le x\\le b"}</M> intervallumon,
            ha a
          </p>
          <MB>{"\\lim_{\\max\\Delta x_i\\to0}\\;\\sum_{i=1}^{n} f(\\xi_i)\\,\\Delta x_i"}</MB>
          <p>
            határérték létezik, és <strong>független</strong> mind a felosztástól, mind a <M>{"\\xi_i"}</M> közbülső
            helyek megválasztásától. Ezt a közös határértéket nevezzük <M>{"f"}</M> határozott integráljának:
          </p>
          <MB>{"\\int_a^b f(x)\\,dx"}</MB>
          <p>
            Itt <M>{"a"}</M> az alsó, <M>{"b"}</M> a felső határ, <M>{"f"}</M> az integrandus, <M>{"x"}</M> az
            integrálási változó.
          </p>
        </Kiemelo>

        <Kiemelo tipus="tipp" cim="Az integrálási változó „néma”">
          <p>
            Az <M>{"\\int_a^b f(x)dx"}</M>, <M>{"\\int_a^b f(t)dt"}</M> és <M>{"\\int_a^b f(u)du"}</M>{" "}
            <strong>ugyanaz a szám</strong>. A határozott integrál értéke nem függ attól, minek hívjuk a futó változót
            — ellentétben a határozatlan integrállal, ami <em>függvény</em>. Ezt a 7.5-ben ki is fogjuk használni.
          </p>
        </Kiemelo>

        <Proza>
          <p>
            Ha <M>{"f"}</M> negatív értékeket is felvesz, a definíció változatlan marad — de az{" "}
            <M>{"f(\\xi_i)\\Delta x_i"}</M> szorzat ott negatív lesz.
          </p>
        </Proza>

        <Kiemelo tipus="kulcs" cim="A határozott integrál előjeles területet ad">
          <MB>{"\\int_a^b f(x)\\,dx = T_{\\text{fölötte}} - T_{\\text{alatta}}"}</MB>
          <p>
            Ez nem hiba, hanem tulajdonság: épp ez teszi lehetővé, hogy az integrál irányfüggő mennyiségeket
            (elmozdulás, munkavégzés, nyomaték) írjon le. Ha <strong>területet</strong> kérdeznek, <M>{"|f|"}</M>-et
            kell integrálni, azaz a zérushelyeknél ketté kell vágni az intervallumot.
          </p>
        </Kiemelo>

        <AbraKeret
          szam="7.1"
          cim="A lépcsős függvény integrálja a két téglalap előjeles területe: 2 − 1,5 = 0,5. A síkidom geometriai területe ezzel szemben 3,5."
        >
          <AbraElojelesTerulet />
        </AbraKeret>

        <KetOszlop>
          <div>
            <Kiemelo tipus="kulcs" cim="Mikor integrálható egy függvény?">
              <p>Elégséges feltételek:</p>
              <p className="mt-1">
                1. Ha <M>{"f"}</M> <strong>folytonos</strong> az <M>{"[a;\\,b]"}</M> zárt intervallumon, akkor ott
                Riemann-integrálható.
              </p>
              <p>
                2. Ha <M>{"f"}</M> <strong>korlátos</strong>, és véges sok pont kivételével folytonos (véges sok
                ugrása van), akkor is integrálható.
              </p>
              <p>
                3. Ha <M>{"f"}</M> <strong>monoton</strong> és korlátos, akkor integrálható — akkor is, ha végtelen
                sok szakadása van.
              </p>
            </Kiemelo>
          </div>
          <div>
            <Kiemelo tipus="definicio" cim="Megállapodás a határokról">
              <MB>{"\\int_a^a f(x)\\,dx = 0,\\qquad \\int_b^a f(x)\\,dx = -\\int_a^b f(x)\\,dx"}</MB>
              <p>
                A határok felcserélése előjelet vált. Ezzel a megállapodással az intervallum szerinti additivitás
                minden <M>{"a"}</M>, <M>{"b"}</M>, <M>{"c"}</M> elrendezésre igaz marad — akkor is, ha{" "}
                <M>{"c"}</M> az intervallumon kívül esik.
              </p>
            </Kiemelo>
          </div>
        </KetOszlop>

        {/* --- 7.4 --- */}
        <Alcim>7.4 Tulajdonságok és a középértéktétel</Alcim>
        <Proza>
          <p>
            A következő szabályok mind közvetlenül a definícióból jönnek: a Riemann-összegekre nyilvánvalóan igazak, és
            a határátmenet megőrzi őket.
          </p>
        </Proza>

        <Kiemelo tipus="kulcs" cim="Linearitás, monotonitás, additivitás">
          <MB>{"\\int_a^b c\\,f = c\\int_a^b f,\\qquad \\int_a^b\\left(f+g\\right) = \\int_a^b f + \\int_a^b g"}</MB>
          <MB>{"f \\le g \\;\\Longrightarrow\\; \\int_a^b f \\le \\int_a^b g, \\qquad \\left|\\int_a^b f\\right| \\le \\int_a^b |f|"}</MB>
          <MB>{"\\int_a^b f = \\int_a^c f + \\int_c^b f"}</MB>
          <p>
            A monotonitás következménye a <strong>durva becslés</strong>: ha <M>{"m \\le f(x) \\le M"}</M> az egész
            intervallumon, akkor <M>{"m(b-a) \\le \\int_a^b f \\le M(b-a)"}</M>.
          </p>
        </Kiemelo>

        <Kiemelo tipus="figyelem" cim="Ami NINCS: az integrál nem szorzattartó">
          <MB>{"\\int_a^b f(x)g(x)\\,dx \\ne \\int_a^b f(x)\\,dx \\cdot \\int_a^b g(x)\\,dx"}</MB>
          <p>
            Ellenpélda: <M>{"f=g=x"}</M> a <M>{"[0;\\,1]"}</M> szakaszon. A bal oldal <M>{"\\frac13"}</M>, a jobb{" "}
            <M>{"\\frac12\\cdot\\frac12=\\frac14"}</M>. Hányadosra ugyanez a helyzet. Szorzat integrálására a parciális
            integrálás való (7.6).
          </p>
        </Kiemelo>

        <Proza>
          <p>
            A becslés ereje látszik az <M>{"\\int_0^1 e^{-x^2}dx"}</M> példáján, aminek nincs elemi primitív
            függvénye. A <M>{"0\\le x\\le1"}</M> szakaszon <M>{"e^{-1} \\le e^{-x^2} \\le 1"}</M>, tehát
          </p>
          <MB>{"0{,}3679 \\;\\le\\; \\int_0^1 e^{-x^2}dx \\;\\le\\; 1"}</MB>
          <p>
            A valódi érték <M>{"\\approx 0{,}7468"}</M> — a becslés durva, de ingyen van, és a nagyságrendet jól adja.
            (A kalkulátorral ki is számolhatod.)
          </p>
        </Proza>

        <Kiemelo tipus="definicio" cim="Az integrálszámítás középértéktétele">
          <p>
            Ha <M>{"f"}</M> folytonos az <M>{"a\\le x\\le b"}</M> intervallumon, akkor létezik olyan <M>{"\\xi"}</M>{" "}
            belső pont, amelyre
          </p>
          <MB>{"\\int_a^b f(x)\\,dx = f(\\xi)\\cdot(b-a)"}</MB>
          <p>
            A <M>{"\\bar f = \\frac{1}{b-a}\\int_a^b f(x)\\,dx"}</M> számot az <M>{"f"}</M>{" "}
            <strong>átlagértékének</strong> (integrálközepének) nevezzük.
          </p>
        </Kiemelo>

        <Proza>
          <p>
            <strong>A bizonyítás két sor.</strong> A durva becslésből <M>{"(b-a)"}</M>-val osztva{" "}
            <M>{"m \\le \\bar f \\le M"}</M>. A Bolzano-tétel szerint viszont a folytonos <M>{"f"}</M> a minimuma és a
            maximuma közötti <strong>minden</strong> értéket felveszi valahol — így ezt is. Ez a hely a{" "}
            <M>{"\\xi"}</M>.
          </p>
          <p>
            Szemléletesen: a hullámzó görbe alatti területet „ki lehet simítani” egy ugyanakkora területű téglalappá, és
            a téglalap magassága az átlagérték. Mérnöki nyelven: a változó megoszló terhet helyettesíthetjük egy
            ugyanakkora eredőjű egyenletes teherrel.
          </p>
        </Proza>

        <Probald cim="Próbáld ki — állítsd be a téglalapot pontosan akkorára, mint a görbe alatti terület">
          <HoAtlagertekFelfedezo />
        </Probald>

        <Kiemelo tipus="figyelem" cim="Az átlagérték nem a végpontok átlaga">
          <p>
            Az <M>{"x^2"}</M> átlaga a <M>{"[0;\\,3]"}</M> szakaszon <M>{"3"}</M>, nem{" "}
            <M>{"\\frac{0+9}{2}=4{,}5"}</M>. A helye <M>{"\\xi=\\sqrt3\\approx1{,}732"}</M>, ami az intervallum
            közepétől jobbra van — mert a függvény a szakasz végén nő meg igazán. A végpontátlag csak{" "}
            <strong>lineáris</strong> függvénynél jó, ott viszont a <M>{"\\xi"}</M> épp a felezőpont.
          </p>
        </Kiemelo>

        {/* --- 7.5 --- */}
        <Alcim>7.5 Az integrálfüggvény és a Newton–Leibniz-tétel</Alcim>
        <Proza>
          <p>
            Ez a fejezet a téma szíve. Eddig a határozott integrál a <em>területről</em> szólt, a határozatlan integrál
            pedig a <em>deriválás megfordításáról</em> — látszólag semmi közük egymáshoz. Most kiderül, hogy ugyanannak
            a dolognak a két oldala.
          </p>
          <p>Az ötlet: tegyük a felső határt változóvá.</p>
        </Proza>

        <Kiemelo tipus="definicio" cim="Definíció — integrálfüggvény (területfüggvény)">
          <MB>{"T(x) = \\int_a^x f(t)\\,dt, \\qquad a \\le x \\le b"}</MB>
          <p>
            Figyeld meg, miért írtunk <M>{"t"}</M>-t az integrandusban: a felső határ neve <M>{"x"}</M>, tehát nem
            használhatjuk ugyanazt a betűt a futó változóra is. <M>{"f\\ge0"}</M> esetén <M>{"T(x)"}</M> jelentése az{" "}
            <M>{"a"}</M>-tól <M>{"x"}</M>-ig <strong>felhalmozódott terület</strong>; nyilván <M>{"T(a)=0"}</M>.
          </p>
        </Kiemelo>

        <Kiemelo tipus="kulcs" cim="A kulcstétel — a differenciál- és integrálszámítás kapcsolata">
          <p>
            Ha <M>{"f"}</M> folytonos, akkor az integrálfüggvénye differenciálható, és
          </p>
          <MB>{"T'(x) = f(x)"}</MB>
          <p>
            vagyis <M>{"T"}</M> az <M>{"f"}</M> egy <strong>primitív függvénye</strong>.
          </p>
        </Kiemelo>

        <Proza>
          <p>
            <strong>A bizonyítás.</strong> Az additivitás szerint{" "}
            <M>{"T(x+\\Delta x)-T(x)=\\int_x^{x+\\Delta x}f(t)\\,dt"}</M> — ez a keskeny sáv területe. Alkalmazzuk rá a
            középértéktételt: van olyan <M>{"\\xi"}</M> az <M>{"x"}</M> és <M>{"x+\\Delta x"}</M> között, amelyre ez
            épp <M>{"f(\\xi)\\Delta x"}</M>. Elosztva <M>{"\\Delta x"}</M>-szel:
          </p>
          <MB>{"\\frac{T(x+\\Delta x)-T(x)}{\\Delta x} = f(\\xi)"}</MB>
          <p>
            Ha <M>{"\\Delta x\\to0"}</M>, a közrefogott <M>{"\\xi\\to x"}</M>, és mivel <M>{"f"}</M>{" "}
            <strong>folytonos</strong>, <M>{"f(\\xi)\\to f(x)"}</M>. A bal oldal viszont definíció szerint{" "}
            <M>{"T'(x)"}</M>. ∎
          </p>
          <p>
            Józan ésszel ugyanez: ha <M>{"x"}</M>-et egy csöppet megnöveljük, a terület egy <M>{"\\Delta x"}</M>{" "}
            szélességű, nagyjából <M>{"f(x)"}</M> magasságú csíkkal nő, tehát{" "}
            <M>{"\\frac{\\Delta T}{\\Delta x}\\approx f(x)"}</M>. <strong>A terület növekedési sebessége épp a görbe
            pillanatnyi magassága.</strong>
          </p>
        </Proza>

        <Probald cim="Próbáld ki — húzd az x-et, és nézd a két ábrát együtt">
          <HoIntegralfuggveny />
        </Probald>

        <Proza>
          <p>
            Most már csak egy lépés kell. Tudjuk, hogy <M>{"T"}</M> primitív függvénye <M>{"f"}</M>-nek. Ha{" "}
            <M>{"F"}</M> egy <em>tetszőleges</em> másik primitív függvény, akkor <M>{"T(x)=F(x)+C"}</M> (két primitív
            függvény csak konstansban térhet el). Az <M>{"x=a"}</M> helyettesítéssel <M>{"0=F(a)+C"}</M>, tehát{" "}
            <M>{"C=-F(a)"}</M>. Írjunk most <M>{"x=b"}</M>-t:
          </p>
        </Proza>

        <Kiemelo tipus="kulcs" cim="Newton–Leibniz-tétel (az integrálszámítás alaptétele)">
          <MB>{"\\int_a^b f(x)\\,dx = \\left[F(x)\\right]_a^b = F(b)-F(a), \\qquad F'=f"}</MB>
          <p>
            Bármelyik primitív függvény megfelel, mert a különbségképzés kiüti a konstanst. Mérnöki kép: ha{" "}
            <M>{"f(t)"}</M> a pillanatnyi sebesség, akkor <M>{"F(t)"}</M> a megtett út. A megtett út kétféleképpen
            számolható: összegezzük a kis <M>{"v\\,\\Delta t"}</M> útdarabokat (ez az integrál), vagy leolvassuk a
            kilométerórát az elején és a végén, és kivonjuk őket (ez az <M>{"F(b)-F(a)"}</M>). A kettőnek egyeznie
            kell — <strong>ez</strong> a Newton–Leibniz-tétel.
          </p>
        </Kiemelo>

        <Kiemelo tipus="figyelem" cim="A konstans elhagyható — de csak itt">
          <p>
            Ha <M>{"F(x)+C"}</M>-vel számolnánk, a <M>{"C"}</M> kiesne:{" "}
            <M>{"\\left(F(b)+C\\right)-\\left(F(a)+C\\right)=F(b)-F(a)"}</M>. Ezért határozott integrálnál soha ne írj{" "}
            <M>{"+C"}</M>-t — határozatlan integrálnál viszont <strong>kötelező</strong>. És a sorrend mindig{" "}
            <strong>felső mínusz alsó</strong>.
          </p>
        </Kiemelo>

        {/* --- 7.6 --- */}
        <Alcim>7.6 Integrálási módszerek határozott integrálnál</Alcim>
        <Proza>
          <p>
            A primitív függvényt ugyanúgy keressük, mint a határozatlan integrálnál — egyetlen új dologra kell
            figyelni: a <strong>határok kezelésére</strong>.
          </p>
        </Proza>

        <Kiemelo tipus="definicio" cim="Helyettesítés határozott integrálnál">
          <p>
            Ha <M>{"x=g(t)"}</M> folytonosan differenciálható, <M>{"g(\\alpha)=a"}</M> és <M>{"g(\\beta)=b"}</M>,
            akkor
          </p>
          <MB>{"\\int_a^b f(x)\\,dx = \\int_{\\alpha}^{\\beta} f\\left(g(t)\\right)g'(t)\\,dt"}</MB>
          <p>
            Vagyis a helyettesítéssel <strong>a határokat is át kell írni</strong> az új változóra.
          </p>
        </Kiemelo>

        <Kiemelo tipus="figyelem" cim="A leggyakoribb hiba az egész félévben">
          <p>
            Ha új változót vezetsz be, a régi határok <strong>érvényüket vesztik</strong>. Két helyes eljárás van:
          </p>
          <p className="mt-1">
            1. <strong>Átírod a határokat</strong> (ez a gyorsabb): kiszámolod, hogy az <M>{"x=a"}</M>-hoz milyen{" "}
            <M>{"t"}</M> tartozik, és visszahelyettesíteni nem kell.
          </p>
          <p>
            2. <strong>Nem írod át</strong>, de akkor a primitív függvényt vissza kell alakítanod <M>{"x"}</M>-re, és
            csak azután helyettesítesz.
          </p>
          <p className="mt-1">
            A kettő keverése — <strong>új változó, régi határ</strong> — biztos pontvesztés.
          </p>
        </Kiemelo>

        <Kiemelo tipus="definicio" cim="Parciális integrálás">
          <MB>{"\\int_a^b u(x)\\,v'(x)\\,dx = \\left[u(x)v(x)\\right]_a^b - \\int_a^b u'(x)\\,v(x)\\,dx"}</MB>
          <p>
            A kiintegrált tagba <strong>azonnal behelyettesítjük a határokat</strong>, a maradék integrálban pedig
            ugyanazok a határok maradnak. A szabály a szorzat deriválási szabályából jön:{" "}
            <M>{"(uv)'=u'v+uv'"}</M>, amit <M>{"a"}</M>-tól <M>{"b"}</M>-ig integrálva és átrendezve kapjuk az
            állítást.
          </p>
        </Kiemelo>

        <Kiemelo tipus="tipp" cim="Szimmetria — ingyen kapott eredmények">
          <MB>{"f \\text{ páros:}\\quad \\int_{-a}^{a}f = 2\\int_0^a f, \\qquad f \\text{ páratlan:}\\quad \\int_{-a}^{a}f = 0"}</MB>
          <p>
            Ezt mindig nézd meg, <em>mielőtt</em> számolni kezdesz: az <M>{"\\int_{-1}^{1}x^3\\cos x\\,dx"}</M> nulla,
            és ehhez egyetlen primitív függvényt sem kell keresni (páratlan szorozva párossal páratlan). Vigyázz
            viszont: a páratlan függvény integrálja nulla, a <em>területe</em> nem!
          </p>
        </Kiemelo>

        <AbraKeret
          szam="7.2"
          cim="Páros függvénynél a két fél egyenlő, ezért elég az egyiket kiszámolni. Páratlan függvénynél a bal oldali negatív rész pontosan kioltja a jobb oldali pozitívat."
        >
          <AbraParosParatlan />
        </AbraKeret>

        {/* --- 7.7 --- */}
        <Alcim>7.7 Síkidomok területe</Alcim>
        <Proza>
          <p>Ez a határozott integrál legközvetlenebb alkalmazása — épp ebből indultunk ki.</p>
        </Proza>

        <Kiemelo tipus="kulcs" cim="A három alapeset">
          <p>
            <strong>Görbe alatt</strong> (<M>{"f\\ge0"}</M> az <M>{"[a;\\,b]"}</M>-n): <M>{"T=\\int_a^b f(x)\\,dx"}</M>.
            Ha <M>{"f"}</M> előjelet vált, keresd meg a zérushelyeket, és <M>{"T=\\int_a^b|f(x)|\\,dx"}</M>.
          </p>
          <MB>{"T=\\int_a^b\\left(f_{\\text{felső}}(x)-f_{\\text{alsó}}(x)\\right)dx"}</MB>
          <p>
            <strong>Két görbe között</strong>: a határok rendszerint a metszéspontok abszcisszái. Végül{" "}
            <strong>y szerint</strong> integrálva, ha a tartományt vízszintes sávokra érdemes vágni:
          </p>
          <MB>{"T=\\int_c^d\\left(g_{\\text{jobb}}(y)-g_{\\text{bal}}(y)\\right)dy"}</MB>
        </Kiemelo>

        <Kiemelo tipus="tipp" cim="Miért nem kell itt az előjelekkel bajlódni?">
          <p>
            Mert az <M>{"f_1-f_2"}</M> különbség a <strong>függőleges sáv magassága</strong>, ami mindig pozitív, ha
            jól állapítottuk meg, melyik a felső görbe. Teljesen mindegy, hogy közben az <M>{"x"}</M> tengely fölött
            vagy alatt vagyunk-e. Ha bizonytalan vagy, tolj el mindkét görbét ugyanannyival fölfelé — a köztük lévő
            terület nem változik, a képlet meg pont ezt fejezi ki.
          </p>
        </Kiemelo>

        <Probald cim="Próbáld ki — cseréld meg a görbék sorrendjét, és nézd, mi lesz a területből">
          <HoTeruletFelfedezo />
        </Probald>

        <Kiemelo tipus="figyelem" cim="Több metszéspont = több szakasz">
          <p>
            Ha a görbék <strong>többször</strong> metszik egymást, minden metszéspontnál külön szakaszra kell bontani,
            mert a felső–alsó szerep cserélődik. Az <M>{"y=x^3"}</M> és <M>{"y=x"}</M> esetében három metszéspont van
            (<M>{"-1"}</M>, <M>{"0"}</M>, <M>{"1"}</M>), és a két tartomány területe külön-külön <M>{"\\frac14"}</M> —
            egyben integrálva viszont nullát kapnánk.
          </p>
        </Kiemelo>

        {/* --- 7.8 --- */}
        <Alcim>7.8 Paraméteres és polárkoordinátás görbék területe</Alcim>
        <Proza>
          <p>
            Sok görbét nem lehet (vagy nem érdemes) <M>{"y=f(x)"}</M> alakban felírni — gondolj egy körre, ellipszisre
            vagy cikloisra. Ezeket <strong>paraméteresen</strong> adjuk meg: <M>{"x=x(t)"}</M>, <M>{"y=y(t)"}</M>. A
            területet a szokásos módon, függőleges sávokra vágva kapjuk; a sáv szélessége a Lagrange-féle
            középértéktétel szerint <M>{"\\Delta x_i = \\dot x(\\tau_i)\\Delta t_i"}</M>.
          </p>
        </Proza>

        <Kiemelo tipus="kulcs" cim="Paraméteres és poláris területképlet">
          <MB>{"T=\\int_{\\alpha}^{\\beta} y(t)\\,\\dot x(t)\\,dt \\qquad \\left(x(t)\\text{ növekvő}\\right)"}</MB>
          <p>
            Ha <M>{"x(t)"}</M> csökken (a görbét jobbról balra járjuk be), mínusz előjel kell. Könnyű megjegyezni: a
            területnek pozitívnak kell lennie, tehát az előjelet úgy választjuk, hogy az legyen.
          </p>
          <MB>{"T=\\frac12\\int_{\\alpha}^{\\beta} r(\\varphi)^2\\,d\\varphi"}</MB>
          <p>
            Polárkoordinátás alaknál a téglalapokra osztás értelmetlen; helyette <strong>körcikkekre</strong> vágunk. A{" "}
            <M>{"r"}</M> sugarú, <M>{"\\Delta\\varphi"}</M> középponti szögű körcikk területe{" "}
            <M>{"\\frac12 r^2\\Delta\\varphi"}</M>, hiszen a teljes kör területéből (<M>{"r^2\\pi"}</M>) a{" "}
            <M>{"\\frac{\\Delta\\varphi}{2\\pi}"}</M> hányad jut rá.
          </p>
        </Kiemelo>

        <AbraKeret
          szam="7.3"
          cim="A polárkoordinátás terület körcikkekből épül fel: minden Δφ szöghöz egy „tortaszelet” tartozik, aminek a területe ½·r(φ)²·Δφ."
        >
          <AbraKorcikkek />
        </AbraKeret>

        <div className="mt-5 grid gap-4 lg:grid-cols-3 [&>*]:min-w-0">
          <Kartya cimke="Nevezetes" cim="Ellipszis">
            <MB>{"T = ab\\pi"}</MB>
            <p className="text-[13.5px] leading-relaxed text-petrol-600">
              Az <M>{"x=a\\cos t"}</M>, <M>{"y=b\\sin t"}</M> alakból. Ellenőrzés: <M>{"a=b=R"}</M> esetén{" "}
              <M>{"R^2\\pi"}</M>, a kör területe. ✓
            </p>
          </Kartya>
          <Kartya cimke="Nevezetes" cim="Ciklois egy íve alatt">
            <MB>{"T = 3R^2\\pi"}</MB>
            <p className="text-[13.5px] leading-relaxed text-petrol-600">
              Pontosan <strong>háromszorosa</strong> a guruló kör területének. A ciklois a guruló kerék kerületi
              pontjának pályája.
            </p>
          </Kartya>
          <Kartya cimke="Nevezetes" cim="Kardioid és spirál">
            <MB>{"T_{\\text{kard}} = \\frac{3a^2\\pi}{2}"}</MB>
            <p className="text-[13.5px] leading-relaxed text-petrol-600">
              Az arkhimédeszi spirál első fordulata alatt <M>{"T=\\frac{4a^2\\pi^3}{3}"}</M>. Mindkettő a{" "}
              <M>{"\\frac12\\int r^2d\\varphi"}</M> képletből.
            </p>
          </Kartya>
        </div>

        {/* --- 7.9 --- */}
        <Alcim>7.9 Görbe ívhossza</Alcim>
        <Proza>
          <p>
            A gondolatmenet ugyanaz, mint a területnél, csak most nem téglalapokkal, hanem <strong>húrokkal</strong>{" "}
            közelítünk. Az <M>{"i"}</M>-edik húr hossza Pitagorasz-tétellel
          </p>
          <MB>{"\\Delta s_i = \\sqrt{\\left(\\Delta x_i\\right)^2+\\left(\\Delta y_i\\right)^2} = \\Delta x_i\\sqrt{1+\\left(\\frac{\\Delta y_i}{\\Delta x_i}\\right)^{2}}"}</MB>
          <p>
            A Lagrange-középértéktétel szerint <M>{"\\frac{\\Delta y_i}{\\Delta x_i}=f'(\\xi_i)"}</M> valamely
            közbülső helyen, tehát <M>{"\\Delta s_i = \\sqrt{1+f'(\\xi_i)^2}\\,\\Delta x_i"}</M> — ami pontosan egy
            Riemann-összeg tagja.
          </p>
        </Proza>

        <Kiemelo tipus="kulcs" cim="Ívhossz — három alak">
          <MB>{"s = \\int_a^b\\sqrt{1+f'(x)^2}\\;dx"}</MB>
          <MB>{"s = \\int_{\\alpha}^{\\beta}\\sqrt{\\dot x(t)^2+\\dot y(t)^2}\\;dt, \\qquad s = \\int_{\\alpha}^{\\beta}\\sqrt{r(\\varphi)^2+r'(\\varphi)^2}\\;d\\varphi"}</MB>
          <p>
            A paraméteres képlet szemléletes jelentése: <M>{"\\sqrt{\\dot x^2+\\dot y^2}"}</M> a pillanatnyi{" "}
            <strong>sebesség nagysága</strong>, a megtett út pedig a sebesség integrálja.
          </p>
        </Kiemelo>

        <Probald cim="Próbáld ki — hány húr kell, hogy a töröttvonal elérje az ívhosszt?">
          <HoIvhosszFelfedezo />
        </Probald>

        <Kiemelo tipus="figyelem" cim="Az ívhossz-integrálok „csúnyák”">
          <p>
            A gyök alatt szinte mindig olyan kifejezés keletkezik, aminek nincs elemi primitív függvénye — például az
            ellipszis kerülete ilyen (ezért vannak az elliptikus integrálok). Emiatt a vizsgafeladatokban{" "}
            <em>speciálisan megválasztott</em> függvények szerepelnek, ahol a gyök alatt teljes négyzet áll. Ha a te
            számolásodban nem egyszerűsödik semmi, valószínűleg elszámoltad a deriváltat.
          </p>
        </Kiemelo>

        <Kiemelo tipus="tipp" cim="Gyökvonásnál kell az abszolút érték">
          <p>
            <M>{"\\sqrt{u^2}=|u|"}</M>, nem <M>{"u"}</M>. A ciklois ívhosszánál{" "}
            <M>{"\\sqrt{4R^2\\sin^2\\frac t2}=2R\\left|\\sin\\frac t2\\right|"}</M>, és az abszolút érték csak azért
            hagyható el, mert a <M>{"0\\le t\\le2\\pi"}</M> tartományon <M>{"\\sin\\frac t2 \\ge 0"}</M>.
          </p>
        </Kiemelo>

        {/* --- 7.10 --- */}
        <Alcim>7.10 Forgástest térfogata és felszíne</Alcim>
        <Proza>
          <p>
            Forgassuk meg az <M>{"y=f(x)"}</M> görbe alatti tartományt az <M>{"x"}</M> tengely körül. A keletkező test
            térfogatát úgy kapjuk, hogy <strong>vékony korongokra</strong> szeleteljük: az <M>{"x"}</M> helyen vett,{" "}
            <M>{"\\Delta x"}</M> vastagságú szelet egy henger, amelynek alapkörsugara <M>{"f(x)"}</M>, térfogata
            tehát <M>{"f(x)^2\\pi\\,\\Delta x"}</M>.
          </p>
        </Proza>

        <Kiemelo tipus="kulcs" cim="Térfogat és felszín">
          <MB>{"V_x = \\pi\\int_a^b f(x)^2\\,dx, \\qquad V_y = \\pi\\int_c^d g(y)^2\\,dy"}</MB>
          <MB>{"F_x = 2\\pi\\int_a^b f(x)\\sqrt{1+f'(x)^2}\\;dx = 2\\pi\\int_{\\alpha}^{\\beta}y\\sqrt{\\dot x^2+\\dot y^2}\\;dt"}</MB>
          <p>
            Paraméteres alakban a térfogat <M>{"V_x=\\pi\\int_{\\alpha}^{\\beta}y(t)^2\\dot x(t)\\,dt"}</M> — ugyanaz,
            mint a területnél, csak <M>{"y"}</M> helyett <M>{"y^2\\pi"}</M> áll.
          </p>
        </Kiemelo>

        <Probald cim="Próbáld ki — forgasd körbe a profilt, és vágd korongokra">
          <HoForgastest />
        </Probald>

        <Kiemelo tipus="figyelem" cim="Térfogat vagy felszín? És hol a négyzet?">
          <p>
            Két különböző hiba, mindkettő gyakori:
          </p>
          <MB>{"\\pi\\int_a^b f^2dx \\;\\ne\\; \\pi\\left(\\int_a^b f\\,dx\\right)^{2}"}</MB>
          <p>
            A korong sugara <M>{"f(x)"}</M>, és a <em>körlap területe</em> tartalmazza a négyzetet — tehát{" "}
            <strong>először négyzetre emelünk, azután integrálunk</strong>.
          </p>
          <p className="mt-2">
            A felszínnél viszont <strong>első hatvány és gyök</strong> van: a felület a <em>palást</em> mentén gyűlik,
            ezért az ívelem jelenik meg benne. Ha elhagyod a <M>{"\\sqrt{1+f'^2}"}</M> tényezőt, hengerpalástokkal
            számolsz, ami rendszeresen kisebb (hibás) eredményt ad.
          </p>
        </Kiemelo>

        <AbraKeret
          szam="7.4"
          cim="A forgásfelületet nem hengerpalástokkal, hanem csonkakúp-palástokkal rakjuk össze: az alkotó a Δs ívelem, nem a Δx."
        >
          <AbraCsonkakupPalast />
        </AbraKeret>

        <Kiemelo tipus="tipp" cim="Két ellenőrzés, amit mindig érdemes elvégezni">
          <p>
            (1) A forgástest térfogata soha nem lehet nagyobb a befoglaló hengerénél (<M>{"r_{\\max}^2\\pi(b-a)"}</M>
            ). (2) A gömb felszínénél a két gyök kiejti egymást:{" "}
            <M>{"\\sqrt{R^2-x^2}\\cdot\\frac{R}{\\sqrt{R^2-x^2}} = R"}</M>, ezért lesz{" "}
            <M>{"F=2\\pi R\\cdot 2R = 4R^2\\pi"}</M>. Mellékeredmény (Arkhimédész tétele): a gömbfelület bármely{" "}
            <M>{"h"}</M> magasságú övének felszíne <M>{"2\\pi R h"}</M> — csak a magasságtól függ, attól nem, hol van.
          </p>
        </Kiemelo>

        <Kiemelo tipus="figyelem" cim="Az y tengely körüli forgatás">
          <p>
            Ha az <M>{"y"}</M> tengely a forgástengely, akkor a korongok <strong>vízszintesek</strong>, a sugaruk{" "}
            <M>{"x=g(y)"}</M>, és <strong>y szerint</strong> integrálunk <M>{"c"}</M>-től <M>{"d"}</M>-ig. A határok is{" "}
            <M>{"y"}</M> értékek lesznek. Ez a KF‑5 (b) része.
          </p>
        </Kiemelo>

        {/* --- 7.11 --- */}
        <Alcim>7.11 Statikai nyomaték, súlypont, tehetetlenségi nyomaték</Alcim>
        <Proza>
          <p>
            Ez a fejezet a mérnöki gyakorlat szempontjából a legfontosabb: a gerendák keresztmetszeti jellemzőit
            pontosan így számoljuk. Kiindulásnak emlékezz a tömegpontokra: ha az <M>{"S_i(x_i;y_i)"}</M> pontokban{" "}
            <M>{"m_i"}</M> tömegek ülnek, a súlypont <M>{"x_s=\\frac{\\sum m_ix_i}{\\sum m_i}"}</M>. A számlálóban álló
            mennyiség a <strong>statikai nyomaték</strong>. Homogén síkidomnál a „tömeg” szerepét a{" "}
            <strong>terület</strong> veszi át.
          </p>
          <p>
            Vágjuk a síkidomot függőleges sávokra. Az <M>{"x"}</M> helyen lévő, <M>{"\\Delta x"}</M> szélességű sáv
            területe <M>{"f(x)\\Delta x"}</M>, a <em>saját</em> súlypontja pedig az{" "}
            <M>{"\\left(x;\\ \\frac{f(x)}{2}\\right)"}</M> pontban van, mert a sáv egy keskeny téglalap. Innen a két
            nyomaték járuléka <M>{"x f(x)\\Delta x"}</M>, illetve <M>{"\\frac{f(x)}{2}f(x)\\Delta x"}</M>.
          </p>
        </Proza>

        <Kiemelo tipus="kulcs" cim="Statikai nyomatékok és a súlypont">
          <MB>{"S_y = \\int_a^b x\\,f(x)\\,dx, \\qquad S_x = \\frac12\\int_a^b f(x)^2\\,dx, \\qquad T = \\int_a^b f(x)\\,dx"}</MB>
          <MB>{"x_s = \\frac{S_y}{T}, \\qquad y_s = \\frac{S_x}{T}"}</MB>
        </Kiemelo>

        <Kiemelo tipus="figyelem" cim="A kettes és a négyzet az y_s képletben">
          <p>
            Az <M>{"y_s"}</M> számlálójában <M>{"f^2"}</M> <strong>és</strong> <M>{"\\frac12"}</M> is szerepel, mert a
            sáv saját súlypontja félmagasságban van. Ezt szokás elfelejteni. Jó ellenőrzés: téglalapnál (
            <M>{"f\\equiv h"}</M>) <M>{"y_s = \\frac{\\frac12h^2b}{hb} = \\frac h2"}</M> kell kijöjjön. ✓
          </p>
        </Kiemelo>

        <Probald cim="Próbáld ki — húzd a tűt a súlypont alá, különben a tartomány billen">
          <HoSulypontFelfedezo />
        </Probald>

        <Kiemelo tipus="definicio" cim="Tehetetlenségi (másodrendű) nyomaték">
          <MB>{"I_y = \\int_a^b x^2 f(x)\\,dx, \\qquad I_x = \\frac13\\int_a^b f(x)^3\\,dx"}</MB>
          <p>
            Ugyanaz a séma, csak most a távolság <strong>négyzetével</strong> súlyozunk. Az <M>{"I_x"}</M>-ben azért
            áll <M>{"\\frac13"}</M> és harmadik hatvány, mert a sávban a <M>{"0"}</M>-tól <M>{"f(x)"}</M>-ig terjedő{" "}
            <M>{"y"}</M> koordinátákat is integrálni kell:{" "}
            <M>{"\\int_0^{f(x)}y^2dy = \\frac{f(x)^3}{3}"}</M>.
          </p>
          <p className="mt-2">
            <strong>Steiner-tétel:</strong> <M>{"I = I_s + T d^2"}</M>, ahol <M>{"d"}</M> a két párhuzamos tengely
            távolsága. Innen a téglalapra <M>{"I_{x} = \\frac{bh^3}{3}"}</M> (alsó él) és{" "}
            <M>{"I_{s} = \\frac{bh^3}{12}"}</M> (súlyponti tengely).
          </p>
        </Kiemelo>

        <Kiemelo tipus="tipp" cim="Miért érdekes ez a gerendánál?">
          <p>
            A hajlított gerenda merevsége <M>{"EI"}</M>-vel arányos, és az <M>{"I"}</M>-ben a magasság{" "}
            <strong>köbön</strong> szerepel: ha kétszer olyan magas gerendát választasz, nyolcszor merevebb lesz. Ezért
            állnak élükre a fagerendák, és ezért van a szelvény anyagának nagy része a szélső szálakban (I-tartó). Az
            L- és T-szelvény súlypontját a fenti ábrán is kipróbálhatod.
          </p>
        </Kiemelo>

        {/* --- 7.12 --- */}
        <Alcim>7.12 Miért szép? — a Pappus–Guldin-tétel</Alcim>
        <Proza>
          <p>
            A modul végére maradt a legelegánsabb állítás. Ha egy síkidomot olyan tengely körül forgatunk meg, amely
            nem metszi, akkor a keletkező test térfogatához <em>nem kell integrálni</em>: elég a síkidom területét
            megszorozni azzal az úttal, amit a súlypontja megtesz.
          </p>
        </Proza>

        <Kiemelo tipus="kulcs" cim="Pappus–Guldin-tételek">
          <MB>{"V = 2\\pi\\,y_s\\,T, \\qquad F = 2\\pi\\,y_s\\,s"}</MB>
          <p>
            Az elsőben <M>{"T"}</M> a forgatott <strong>síkidom</strong> területe, a másodikban <M>{"s"}</M> a
            forgatott <strong>görbe</strong> ívhossza; <M>{"y_s"}</M> mindkettőben a súlypont tengelytől mért
            távolsága. A bizonyítás egy sor:
          </p>
          <MB>{"V = \\pi\\int f^2dx = 2\\pi\\cdot\\frac12\\int f^2dx = 2\\pi S_x = 2\\pi y_s T"}</MB>
          <p>
            Vagyis a tétel nem új képlet, hanem a statikai nyomaték átírása.
          </p>
        </Kiemelo>

        <Probald cim="Próbáld ki — forgasd körbe a kört, és nézd a súlypont pályáját">
          <HoPappusTorusz />
        </Probald>

        <Proza>
          <p>
            A tórusz („úszógumi”) így egyetlen szorzás: a forgatott körlap területe <M>{"r^2\\pi"}</M>, a súlypontja{" "}
            <M>{"R"}</M> távolságra van, tehát <M>{"V = 2\\pi R\\cdot r^2\\pi = 2\\pi^2Rr^2"}</M>. A felszín ugyanígy a
            kör kerületéből: <M>{"F = 2\\pi R\\cdot 2r\\pi = 4\\pi^2Rr"}</M>. Ugyanezt paraméteres integrállal is
            kiszámolhatod (a jegyzet 32. példája) — de minek.
          </p>
          <p>
            És ha visszafelé olvasod a tételt: a félkörlap súlypontját is megkaphatod belőle! A félkörlapot
            megforgatva gömböt kapunk, tehát{" "}
            <M>{"\\frac{4R^3\\pi}{3} = 2\\pi y_s\\cdot\\frac{R^2\\pi}{2}"}</M>, amiből{" "}
            <M>{"y_s = \\frac{4R}{3\\pi}"}</M> — egyetlen egyenletből, integrálás nélkül. Ez a matematikának az a
            pillanata, amikor két dolog, amit külön tanultunk, egymásból következik.
          </p>
        </Proza>
      </Szakasz>

      {/* ==================== KIDOLGOZOTT FELADATOK ==================== */}
      <Szakasz
        id="peldak"
        cimke="2. rész"
        cim="Kidolgozott feladatok"
        bevezeto="Az előadás példái, ugyanazokkal a számokkal, lépésenként feltárva. Előbb próbáld meg magad — a lépések csak akkor érnek valamit, ha előtte volt egy saját ötleted."
      >
        {/* ---- KF-1 ---- */}
        <KidolgozottFeladat
          jel="KF‑1"
          ido="8 perc"
          forras="Előadás, 1. és 4. példa"
          cim="Alsó és felső összeg, és az átlagérték"
          feladat={
            <>
              <p>
                <strong>(a)</strong> Számítsd ki az <M>{"f(x)=x^2"}</M> függvény alsó és felső összegét az{" "}
                <M>{"n"}</M> egyenlő részre osztott <M>{"0\\le x\\le1"}</M> intervallumon, és határozd meg, mihez
                tartanak! Mennyi <M>{"s_4"}</M> és <M>{"S_4"}</M>?
              </p>
              <p className="mt-2">
                <strong>(b)</strong> Mennyi az <M>{"f(x)=x^2"}</M> átlagértéke a <M>{"0\\le x\\le3"}</M> szakaszon, és
                hol veszi fel?
              </p>
            </>
          }
          tanulsag={
            <p>
              Az (a) mutatja, hogy a definíció szerinti számolás <em>működik</em> — és azt is, hogy minden egyes
              függvénynél külön küzdelem volna. A 7.5-beli tétel után ugyanez <M>{"\\left[\\frac{x^3}{3}\\right]_0^1"}</M>
              , egyetlen sor. A (b)-ben figyeld meg, hogy az átlagértéket a függvény <strong>fel is veszi</strong>: ez
              a folytonosságon múlik, lépcsős függvénynél nem igaz.
            </p>
          }
        >
          <Lepes cim="(a1) A felosztás és a szélsőértékek">
            <p>
              Egyenletes felosztásnál <M>{"\\Delta x_i=\\frac1n"}</M> és az osztópontok <M>{"x_i=\\frac in"}</M>. Mivel{" "}
              <M>{"x^2"}</M> növekvő a <M>{"[0;\\,1]"}</M> szakaszon, minden részintervallumon a{" "}
              <strong>bal</strong> végpontban van a minimum, a <strong>jobb</strong> végpontban a maximum:
            </p>
            <MB>{"m_i = \\left(\\frac{i-1}{n}\\right)^{2}, \\qquad M_i = \\left(\\frac{i}{n}\\right)^{2}"}</MB>
          </Lepes>
          <Lepes cim="(a2) Az összegek zárt alakja">
            <p>
              Az első <M>{"k"}</M> négyzetszám összegképletével (
              <M>{"1^2+2^2+\\dots+k^2=\\frac{k(k+1)(2k+1)}{6}"}</M>):
            </p>
            <KepletDoboz
              cimke="Felső összeg"
              keplet={"S_n = \\sum_{i=1}^{n}\\frac{i^2}{n^2}\\cdot\\frac1n = \\frac{1}{n^3}\\cdot\\frac{n(n+1)(2n+1)}{6}"}
              eredmeny={"S_n = \\frac{(n+1)(2n+1)}{6n^2}"}
            />
            <KepletDoboz
              cimke="Alsó összeg"
              keplet={"s_n = \\frac{1}{n^3}\\cdot\\frac{(n-1)n(2n-1)}{6}"}
              eredmeny={"s_n = \\frac{(n-1)(2n-1)}{6n^2}"}
            />
          </Lepes>
          <Lepes cim="(a3) Konkrét értékek n = 4-re">
            <p>Behelyettesítve:</p>
            <MB>{"s_4 = \\frac{3\\cdot7}{96} = \\frac{7}{32} = 0{,}21875, \\qquad S_4 = \\frac{5\\cdot9}{96} = \\frac{15}{32} = 0{,}46875"}</MB>
            <p>
              A terület tehát e két szám közé esik. A rés <M>{"S_4-s_4=\\frac{8}{32}=\\frac14"}</M>, és általában
              pontosan <M>{"S_n-s_n=\\frac1n"}</M>.
            </p>
          </Lepes>
          <Lepes cim="(a4) Határátmenet">
            <p>Mindkét sorozat hányados-határértéke a főtagok arányából adódik:</p>
            <MB>{"\\lim_{n\\to\\infty}\\frac{(n+1)(2n+1)}{6n^2} = \\lim_{n\\to\\infty}\\frac{2n^2+3n+1}{6n^2} = \\frac{2}{6} = \\frac13"}</MB>
            <p>
              és ugyanígy <M>{"s_n\\to\\frac13"}</M>. A két sorozat <strong>közös</strong> határértéke{" "}
              <M>{"\\frac13"}</M>, tehát a parabola alatti terület pontosan <M>{"\\frac13"}</M>.
            </p>
          </Lepes>
          <Lepes cim="(b) Az átlagérték a [0; 3] szakaszon">
            <KepletDoboz
              cimke="Integrál és átlag"
              keplet={"\\int_0^3 x^2dx = \\left[\\frac{x^3}{3}\\right]_0^3 = 9"}
              behelyettesitve={"\\bar f = \\frac{1}{3-0}\\cdot 9"}
              eredmeny={"\\bar f = 3"}
            />
            <p>
              A hely: <M>{"\\xi^2 = 3"}</M>, azaz <M>{"\\xi = \\sqrt3 \\approx 1{,}732"}</M> — az intervallum
              közepétől (<M>{"1{,}5"}</M>) jobbra, hiszen a függvény a szakasz végén nő meg igazán. Ezt a{" "}
              <em>7.4-es ábrán</em> is beállíthatod: a téglalap magassága 3, és a görbével két ponton találkozik.
            </p>
          </Lepes>
        </KidolgozottFeladat>

        {/* ---- KF-2 ---- */}
        <KidolgozottFeladat
          jel="KF‑2"
          ido="12 perc"
          forras="Előadás, 5–9. és 12–13. példa"
          cim="Newton–Leibniz és a technikák: helyettesítés, parciális"
          feladat={
            <>
              <p>Számítsd ki:</p>
              <p className="mt-1">
                <strong>(a)</strong> <M>{"\\int_0^{\\pi}\\sin x\\,dx"}</M> &nbsp;·&nbsp; <strong>(b)</strong>{" "}
                <M>{"\\int_0^{\\pi/2}\\cos^3x\\,dx"}</M>
              </p>
              <p className="mt-1">
                <strong>(c)</strong> <M>{"\\int_0^{3}\\frac{x}{\\sqrt{x^2+16}}\\,dx"}</M> (helyettesítéssel, a határok
                átírásával)
              </p>
              <p className="mt-1">
                <strong>(d)</strong> <M>{"\\int_0^{\\pi}x\\sin x\\,dx"}</M> &nbsp;·&nbsp; <strong>(e)</strong>{" "}
                <M>{"\\int_1^{e}\\ln x\\,dx"}</M>
              </p>
            </>
          }
          tanulsag={
            <p>
              Öt feladat, három technika. A legfontosabb tanulság a (c): <strong>új változó, új határ</strong>. A (d)
              és (e) mutatja a parciális integrálás két tipikus helyzetét — a szorzatnál azt deriváljuk, ami
              egyszerűsödik, a „magányos” <M>{"\\ln x"}</M>-nél pedig a <M>{"v'=1"}</M> trükköt vetjük be.
            </p>
          }
        >
          <Lepes cim="(a) A legegyszerűbb eset">
            <KepletDoboz
              keplet={"\\int_0^{\\pi}\\sin x\\,dx = \\left[-\\cos x\\right]_0^{\\pi}"}
              behelyettesitve={"= -\\cos\\pi - \\left(-\\cos 0\\right) = 1+1"}
              eredmeny={"= 2"}
            />
            <p>
              Két perc alatt megvan az, amit a 7.2 módszerével órákig számolnánk. Vigyázz az előjelekre: a primitív
              függvény <M>{"-\\cos x"}</M>, és a <M>{"-\\cos\\pi = +1"}</M>.
            </p>
          </Lepes>
          <Lepes cim="(b) Trigonometrikus átalakítás">
            <p>Az integrandust alakítjuk át, hogy primitív függvényt találjunk:</p>
            <MB>{"\\cos^3x = \\cos^2x\\cdot\\cos x = \\left(1-\\sin^2x\\right)\\cos x"}</MB>
            <p>
              Ennek primitív függvénye <M>{"\\sin x - \\frac{\\sin^3x}{3}"}</M> (láncszabállyal ellenőrizhető — a{" "}
              <M>{"\\cos x"}</M> épp a belső derivált).
            </p>
            <KepletDoboz
              keplet={"\\int_0^{\\pi/2}\\cos^3x\\,dx = \\left[\\sin x-\\frac{\\sin^3x}{3}\\right]_0^{\\pi/2}"}
              behelyettesitve={"= \\left(1-\\frac13\\right) - 0"}
              eredmeny={"= \\frac23"}
            />
          </Lepes>
          <Lepes cim="(c) Helyettesítés — a határokat is átírjuk">
            <p>
              Legyen <M>{"u = x^2+16"}</M>, ekkor <M>{"du = 2x\\,dx"}</M>, azaz <M>{"x\\,dx = \\frac{du}{2}"}</M>. Az
              új határok:
            </p>
            <MB>{"x=0 \\;\\Rightarrow\\; u=16, \\qquad x=3 \\;\\Rightarrow\\; u=25"}</MB>
            <KepletDoboz
              cimke="Az új változóval"
              keplet={"\\int_0^3\\frac{x\\,dx}{\\sqrt{x^2+16}} = \\frac12\\int_{16}^{25}u^{-1/2}\\,du"}
              behelyettesitve={"= \\frac12\\left[2\\sqrt u\\right]_{16}^{25} = \\sqrt{25}-\\sqrt{16}"}
              eredmeny={"= 5-4 = 1"}
            />
            <p>
              Ha valaki a régi <M>{"0"}</M> és <M>{"3"}</M> határokat hagyja ott az <M>{"u"}</M> változónál,{" "}
              <M>{"\\sqrt3 \\approx 1{,}73"}</M> jönne ki — teljesen más szám. Ez a félév leggyakoribb hibája.
            </p>
          </Lepes>
          <Lepes cim="(d) Parciális integrálás: x·sin x">
            <p>
              Legyen <M>{"u=x"}</M> (ezt deriváljuk, mert egyszerűsödik) és <M>{"v'=\\sin x"}</M>, tehát{" "}
              <M>{"u'=1"}</M>, <M>{"v=-\\cos x"}</M>.
            </p>
            <KepletDoboz
              keplet={"\\int_0^{\\pi}x\\sin x\\,dx = \\left[-x\\cos x\\right]_0^{\\pi} + \\int_0^{\\pi}\\cos x\\,dx"}
              behelyettesitve={"= \\left(-\\pi\\cdot(-1)-0\\right) + \\left[\\sin x\\right]_0^{\\pi} = \\pi + 0"}
              eredmeny={"= \\pi \\approx 3{,}1416"}
            />
          </Lepes>
          <Lepes cim="(e) A v′ = 1 trükk: ln x">
            <p>
              Itt nincs szorzat — mégis parciálisan megy: <M>{"u=\\ln x"}</M> és <M>{"v'=1"}</M>, tehát{" "}
              <M>{"v=x"}</M> és <M>{"u'=\\frac1x"}</M>.
            </p>
            <KepletDoboz
              keplet={"\\int_1^e\\ln x\\,dx = \\left[x\\ln x\\right]_1^e - \\int_1^e x\\cdot\\frac1x\\,dx"}
              behelyettesitve={"= (e\\cdot1-0) - \\left[x\\right]_1^e = e - (e-1)"}
              eredmeny={"= 1"}
            />
            <p>
              Ugyanez a trükk működik az <M>{"\\operatorname{arctg}x"}</M>-nél is:{" "}
              <M>{"\\int_0^1\\operatorname{arctg}x\\,dx = \\frac{\\pi}{4}-\\frac{\\ln2}{2} \\approx 0{,}4388"}</M>.
            </p>
          </Lepes>
        </KidolgozottFeladat>

        <div className="my-6">
          <p className="mb-2 text-[11px] font-bold tracking-[0.16em] text-naracs-600 uppercase">
            Film — a Newton–Leibniz-tétel és a határok átírása
          </p>
          <FilmNewtonLeibniz />
        </div>

        {/* ---- KF-3 ---- */}
        <KidolgozottFeladat
          jel="KF‑3"
          ido="10 perc"
          forras="Előadás, 15–17. példa"
          cim="Síkidomok területe — három alapeset"
          feladat={
            <>
              <p>
                <strong>(a)</strong> Mekkora területet zár be az <M>{"f(x)=x^2-4"}</M> parabola az <M>{"x"}</M>{" "}
                tengellyel?
              </p>
              <p className="mt-2">
                <strong>(b)</strong> Mekkora az <M>{"y=x^2"}</M> parabola és az <M>{"y=x+2"}</M> egyenes közötti
                terület?
              </p>
              <p className="mt-2">
                <strong>(c)</strong> Mekkora az <M>{"x=4-y^2"}</M> parabola és az <M>{"y"}</M> tengely által
                közrezárt terület?
              </p>
            </>
          }
          tanulsag={
            <p>
              Három feladat, három döntés. (a) Területet kérdeztek, nem integrált — <strong>abszolút érték</strong>.
              (b) Előbb metszéspontok, aztán <strong>felső mínusz alsó</strong>, behelyettesítéssel ellenőrizve. (c)
              Ha a tartomány „fekvő”, <strong>y szerint</strong> integrálj: egy integrál két helyett.
            </p>
          }
        >
          <Lepes cim="(a) A zérushelyek és az előjel">
            <p>
              A zérushelyek <M>{"x=\\pm2"}</M>, és közöttük a parabola a tengely <strong>alatt</strong> van (
              <M>{"f(0)=-4"}</M>). Az integrál:
            </p>
            <KepletDoboz
              keplet={"\\int_{-2}^{2}\\left(x^2-4\\right)dx = \\left[\\frac{x^3}{3}-4x\\right]_{-2}^{2}"}
              behelyettesitve={"= \\left(\\frac83-8\\right)-\\left(-\\frac83+8\\right)"}
              eredmeny={"= -\\frac{32}{3}"}
            />
            <p>
              Az előjel negatív, tehát a <strong>terület</strong> ennek abszolút értéke:{" "}
              <M>{"T=\\frac{32}{3}\\approx10{,}67"}</M>. (Ha a feladat a <M>{"[-3;\\,3]"}</M> szakaszt kérné, három
              darabra kellene bontani — lásd a Hibakereső 4. feladatát.)
            </p>
          </Lepes>
          <Lepes cim="(b1) Metszéspontok és a sorrend">
            <p>
              <M>{"x^2 = x+2 \\Rightarrow x^2-x-2=0 \\Rightarrow x_1=-1,\\ x_2=2"}</M>. Melyik a felső? A
              metszéspontok között, például <M>{"x=0"}</M>-ban: az egyenes <M>{"2"}</M>, a parabola <M>{"0"}</M> —
              tehát az <strong>egyenes</strong> a felső.
            </p>
          </Lepes>
          <Lepes cim="(b2) Az integrál">
            <KepletDoboz
              keplet={"T = \\int_{-1}^{2}\\left(x+2-x^2\\right)dx = \\left[\\frac{x^2}{2}+2x-\\frac{x^3}{3}\\right]_{-1}^{2}"}
              behelyettesitve={"= \\left(2+4-\\frac83\\right) - \\left(\\frac12-2+\\frac13\\right) = \\frac{10}{3}+\\frac{7}{6}"}
              eredmeny={"T = \\frac92 = 4{,}5"}
            />
            <p>
              Hasznos gyorsképlet: parabola és egyenes között a terület mindig{" "}
              <M>{"\\frac{\\left(x_2-x_1\\right)^3}{6}"}</M> — itt <M>{"\\frac{27}{6}=4{,}5"}</M>. ✓
            </p>
          </Lepes>
          <Lepes cim="(c) Integrálás y szerint">
            <p>
              A metszéspontok: <M>{"4-y^2=0 \\Rightarrow y=\\pm2"}</M>. A tartomány „fekvő” parabolaszelet;{" "}
              <M>{"x"}</M> szerint integrálva két ágra kellene bontani, <M>{"y"}</M> szerint viszont egyetlen
              integrál:
            </p>
            <KepletDoboz
              keplet={"T = \\int_{-2}^{2}\\left(4-y^2\\right)dy = \\left[4y-\\frac{y^3}{3}\\right]_{-2}^{2}"}
              behelyettesitve={"= \\left(8-\\frac83\\right)-\\left(-8+\\frac83\\right)"}
              eredmeny={"T = \\frac{32}{3}\\approx 10{,}67"}
            />
            <p>
              Használhattuk volna a párosságot is: <M>{"2\\int_0^2\\left(4-y^2\\right)dy"}</M>. És figyeld meg, hogy
              ugyanaz a <M>{"\\frac{32}{3}"}</M> jött ki, mint az (a)-ban — nem véletlen: a két tartomány{" "}
              <strong>egybevágó</strong>, csak tükrözve és elforgatva (az egyik a <M>{"4-x^2"}</M>, a másik a{" "}
              <M>{"4-y^2"}</M> „alatt” van).
            </p>
          </Lepes>
        </KidolgozottFeladat>

        {/* ---- KF-4 ---- */}
        <KidolgozottFeladat
          jel="KF‑4"
          ido="12 perc"
          forras="Előadás, 18., 21., 22. és 24. példa"
          cim="Paraméteres és poláris terület, ívhossz"
          feladat={
            <>
              <p>
                <strong>(a)</strong> Mekkora az <M>{"\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1"}</M> ellipszis területe?
              </p>
              <p className="mt-2">
                <strong>(b)</strong> Mekkora területet zár be az <M>{"r=a(1+\\cos\\varphi)"}</M> kardioid?
              </p>
              <p className="mt-2">
                <strong>(c)</strong> Mekkora az <M>{"y=\\operatorname{ch}x"}</M> láncgörbe ívhossza a{" "}
                <M>{"-\\ln3 \\le x \\le \\ln3"}</M> szakaszon?
              </p>
              <p className="mt-2">
                <strong>(d)</strong> Mekkora a ciklois egy ívének hossza (<M>{"x=R(t-\\sin t)"}</M>,{" "}
                <M>{"y=R(1-\\cos t)"}</M>, <M>{"0\\le t\\le 2\\pi"}</M>)?
              </p>
            </>
          }
          tanulsag={
            <p>
              A paraméteres és poláris feladatok receptje mindig ugyanaz: írd fel a <M>{"\\dot x"}</M>,{" "}
              <M>{"\\dot y"}</M> deriváltakat, tedd be a képletbe, és a trigonometrikus azonosságokkal egyszerűsíts. A
              két kulcsazonosság ebben a feladatban: <M>{"\\sin^2t = \\frac{1-\\cos2t}{2}"}</M> és{" "}
              <M>{"1-\\cos t = 2\\sin^2\\frac t2"}</M>. Az eredmények szépsége (<M>{"ab\\pi"}</M>, <M>{"8R"}</M>) nem
              véletlen — ezeket érdemes fejből tudni ellenőrzéshez.
            </p>
          }
        >
          <Lepes cim="(a) Az ellipszis területe">
            <p>
              Paraméteres alak: <M>{"x=a\\cos t"}</M>, <M>{"y=b\\sin t"}</M>. A szimmetria miatt elég az első
              negyed (<M>{"0\\le t\\le\\frac\\pi2"}</M>), ahol <M>{"x"}</M> az <M>{"a"}</M>-tól <M>{"0"}</M>-ig{" "}
              <strong>csökken</strong>, tehát mínusz előjellel dolgozunk. <M>{"\\dot x = -a\\sin t"}</M>:
            </p>
            <KepletDoboz
              keplet={"T_{1/4} = -\\int_0^{\\pi/2}b\\sin t\\cdot\\left(-a\\sin t\\right)dt = ab\\int_0^{\\pi/2}\\sin^2t\\,dt"}
              behelyettesitve={"= ab\\left[\\frac t2-\\frac{\\sin 2t}{4}\\right]_0^{\\pi/2} = ab\\cdot\\frac{\\pi}{4}"}
              eredmeny={"T = 4\\cdot\\frac{ab\\pi}{4} = ab\\pi"}
            />
            <p>
              Ellenőrzés: <M>{"a=b=R"}</M> esetén <M>{"R^2\\pi"}</M>, a kör területe. ✓
            </p>
          </Lepes>
          <Lepes cim="(b) A kardioid területe">
            <p>
              Itt a poláris képlet kell, és a <M>{"\\cos^2"}</M> linearizálása. A három tag integrálja a{" "}
              <M>{"[0;\\,2\\pi]"}</M> szakaszon rendre <M>{"2\\pi"}</M>, <M>{"0"}</M> és <M>{"\\pi"}</M>:
            </p>
            <KepletDoboz
              keplet={"T = \\frac12\\int_0^{2\\pi}a^2\\left(1+\\cos\\varphi\\right)^2d\\varphi = \\frac{a^2}{2}\\int_0^{2\\pi}\\left(1+2\\cos\\varphi+\\cos^2\\varphi\\right)d\\varphi"}
              behelyettesitve={"= \\frac{a^2}{2}\\left(2\\pi+0+\\pi\\right)"}
              eredmeny={"T = \\frac{3a^2\\pi}{2}"}
            />
            <p>
              Például <M>{"a=2"}</M> esetén <M>{"T=6\\pi\\approx18{,}85"}</M>. Ugyanezekkel a tagokkal jön ki a
              ciklois alatti terület is: <M>{"R^2(2\\pi-0+\\pi) = 3R^2\\pi"}</M>.
            </p>
          </Lepes>
          <Lepes cim="(c) A láncgörbe ívhossza">
            <p>
              <M>{"f'(x)=\\operatorname{sh}x"}</M>, és a hiperbolikus alapazonosság szerint{" "}
              <M>{"1+\\operatorname{sh}^2x = \\operatorname{ch}^2x"}</M>. Ezért a gyök <strong>eltűnik</strong>:
            </p>
            <KepletDoboz
              keplet={"s = \\int_{-\\ln3}^{\\ln3}\\sqrt{\\operatorname{ch}^2x}\\;dx = \\left[\\operatorname{sh}x\\right]_{-\\ln3}^{\\ln3} = 2\\operatorname{sh}(\\ln3)"}
              behelyettesitve={"= 2\\cdot\\frac{3-\\frac13}{2} = 3-\\frac13"}
              eredmeny={"s = \\frac83 \\approx 2{,}667"}
            />
            <p>
              (Használtuk, hogy <M>{"\\operatorname{sh}u=\\frac{e^u-e^{-u}}{2}"}</M> és <M>{"e^{\\ln3}=3"}</M>.) A
              láncgörbe a szabadon lógó kábel alakja — a felsővezeték és a függőhíd kábele is ilyen.
            </p>
          </Lepes>
          <Lepes cim="(d) A ciklois ívhossza">
            <p>
              <M>{"\\dot x = R(1-\\cos t)"}</M>, <M>{"\\dot y = R\\sin t"}</M>, tehát a gyök alatt
            </p>
            <MB>{"\\dot x^2+\\dot y^2 = R^2\\left(1-2\\cos t+\\cos^2t+\\sin^2t\\right) = 2R^2\\left(1-\\cos t\\right) = 4R^2\\sin^2\\frac t2"}</MB>
            <p>
              A felezőszög-azonosság után a gyök <M>{"2R\\left|\\sin\\frac t2\\right|"}</M>, és az abszolút érték
              elhagyható, mert <M>{"0\\le t\\le2\\pi"}</M> esetén <M>{"\\sin\\frac t2 \\ge 0"}</M>.
            </p>
            <KepletDoboz
              keplet={"s = \\int_0^{2\\pi}2R\\sin\\frac t2\\,dt = 2R\\left[-2\\cos\\frac t2\\right]_0^{2\\pi}"}
              behelyettesitve={"= -4R\\left(\\cos\\pi-\\cos0\\right) = -4R(-1-1)"}
              eredmeny={"s = 8R"}
            />
            <p>
              Egy ciklois-ív hossza tehát pontosan a kerék sugarának <strong>nyolcszorosa</strong> — meglepően
              egyszerű eredmény egy ilyen bonyolult görbénél.
            </p>
          </Lepes>
        </KidolgozottFeladat>

        {/* ---- KF-5 ---- */}
        <KidolgozottFeladat
          jel="KF‑5"
          ido="12 perc"
          forras="Előadás, 26–28. és 30–31. példa"
          cim="Forgástest: térfogat és felszín"
          feladat={
            <>
              <p>
                <strong>(a)</strong> Vezesd le a gömb térfogatát az <M>{"y=\\sqrt{R^2-x^2}"}</M> félkör
                megforgatásával!
              </p>
              <p className="mt-2">
                <strong>(b)</strong> Forgassuk meg az <M>{"y=x^2"}</M> parabola, az <M>{"y"}</M> tengely és az{" "}
                <M>{"y=4"}</M> egyenes által határolt tartományt az <strong>y tengely</strong> körül!
              </p>
              <p className="mt-2">
                <strong>(c)</strong> Mekkora a csonkakúp térfogata (alsó sugár <M>{"R"}</M>, felső <M>{"r"}</M>,
                magasság <M>{"m"}</M>)?
              </p>
              <p className="mt-2">
                <strong>(d)</strong> Mekkora annak a felületnek a felszíne, amelyet az <M>{"y=\\sqrt x"}</M> görbe{" "}
                <M>{"0\\le x\\le2"}</M> darabjának megforgatásával kapunk?
              </p>
            </>
          }
          tanulsag={
            <p>
              A (b) a legtanulságosabb: <strong>y tengely körül y szerint</strong> integrálunk, és a határok is{" "}
              <M>{"y"}</M> értékek. A (d)-ben látszik, miért érdemes az egész{" "}
              <M>{"f\\sqrt{1+f'^2}"}</M> szorzatot egyben egyszerűsíteni: külön-külön mindkét tényező csúnya, együtt
              viszont <M>{"\\sqrt{x+\\frac14}"}</M>. A (c) ellenőrzései (<M>{"r=R"}</M> → henger, <M>{"r=0"}</M> →
              kúp) mutatják, hogyan lehet egy képletet „letesztelni”.
            </p>
          }
        >
          <Lepes cim="(a) A gömb térfogata">
            <p>
              A négyzetre emelés itt megszünteti a gyököt — ez a korongmódszer legkellemesebb esete:
            </p>
            <KepletDoboz
              keplet={"V = \\pi\\int_{-R}^{R}\\left(\\sqrt{R^2-x^2}\\right)^2dx = \\pi\\int_{-R}^{R}\\left(R^2-x^2\\right)dx"}
              behelyettesitve={"= \\pi\\left[R^2x-\\frac{x^3}{3}\\right]_{-R}^{R} = \\pi\\left(\\frac{2R^3}{3}+\\frac{2R^3}{3}\\right)"}
              eredmeny={"V = \\frac{4R^3\\pi}{3}"}
            />
            <p>
              Ugyanez paraméteresen (<M>{"x=R\\cos t"}</M>, <M>{"y=R\\sin t"}</M>) is kijön, ott a{" "}
              <M>{"\\sin^3"}</M> integrálja kell — és mínusz előjel, mert <M>{"x"}</M> csökken.
            </p>
          </Lepes>
          <Lepes cim="(b) Forgatás az y tengely körül">
            <p>
              Fejezzük ki <M>{"x"}</M>-et: <M>{"x=\\sqrt y"}</M>, és a határok <M>{"0\\le y\\le4"}</M> (ezek{" "}
              <M>{"y"}</M> értékek!).
            </p>
            <KepletDoboz
              keplet={"V_y = \\pi\\int_0^4\\left(\\sqrt y\\right)^2dy = \\pi\\int_0^4 y\\,dy"}
              behelyettesitve={"= \\pi\\left[\\frac{y^2}{2}\\right]_0^4 = \\pi\\cdot\\frac{16}{2}"}
              eredmeny={"V_y = 8\\pi \\approx 25{,}13"}
            />
            <p>
              Ellenőrzés: a befoglaló henger sugara 2, magassága 4, térfogata <M>{"16\\pi"}</M> — a kapott{" "}
              <M>{"8\\pi"}</M> ennek épp a fele, ami egy ilyen „tölcsérre” hihető.
            </p>
          </Lepes>
          <Lepes cim="(c) A csonkakúp">
            <p>
              Fektessük az alkotót leíró egyenest úgy, hogy <M>{"x=0"}</M>-nál <M>{"r"}</M>, <M>{"x=m"}</M>-nél{" "}
              <M>{"R"}</M> legyen: <M>{"f(x)=\\frac{R-r}{m}x+r"}</M>.
            </p>
            <KepletDoboz
              keplet={"V = \\pi\\int_0^m\\left(\\frac{R-r}{m}x+r\\right)^{2}dx = \\pi\\left[\\frac{m}{3(R-r)}\\left(\\frac{R-r}{m}x+r\\right)^{3}\\right]_0^m"}
              behelyettesitve={"= \\frac{\\pi m}{3(R-r)}\\left(R^3-r^3\\right) = \\frac{\\pi m}{3(R-r)}(R-r)\\left(R^2+Rr+r^2\\right)"}
              eredmeny={"V = \\frac{\\pi m}{3}\\left(R^2+Rr+r^2\\right)"}
            />
            <p>
              Ellenőrzés: <M>{"r=R"}</M> esetén <M>{"\\frac{\\pi m}{3}\\cdot3R^2 = R^2\\pi m"}</M>, a henger
              térfogata ✓; <M>{"r=0"}</M> esetén <M>{"\\frac{R^2\\pi m}{3}"}</M>, a kúp térfogata ✓.
            </p>
          </Lepes>
          <Lepes cim="(d) A felszín">
            <p>
              <M>{"f'=\\frac{1}{2\\sqrt x}"}</M>, tehát <M>{"1+f'^2 = \\frac{4x+1}{4x}"}</M>, és a szorzat
              egyszerűsödik:
            </p>
            <MB>{"f\\sqrt{1+f'^2} = \\sqrt x\\cdot\\frac{\\sqrt{4x+1}}{2\\sqrt x} = \\frac{\\sqrt{4x+1}}{2} = \\sqrt{x+\\frac14}"}</MB>
            <KepletDoboz
              keplet={"F = 2\\pi\\int_0^2\\sqrt{x+\\frac14}\\,dx = 2\\pi\\left[\\frac23\\left(x+\\frac14\\right)^{3/2}\\right]_0^2"}
              behelyettesitve={"= \\frac{4\\pi}{3}\\left(\\left(\\frac94\\right)^{3/2}-\\left(\\frac14\\right)^{3/2}\\right) = \\frac{4\\pi}{3}\\cdot\\frac{26}{8}"}
              eredmeny={"F = \\frac{13\\pi}{3} \\approx 13{,}614"}
            />
            <p>
              A gömbnél ugyanez a trükk még látványosabb: ott a két gyök teljesen kiejti egymást, és{" "}
              <M>{"F=2\\pi R\\int_{-R}^{R}1\\,dx = 4R^2\\pi"}</M>.
            </p>
          </Lepes>
        </KidolgozottFeladat>

        <div className="my-6">
          <p className="mb-2 text-[11px] font-bold tracking-[0.16em] text-naracs-600 uppercase">
            Film — a gömb térfogata korongmódszerrel
          </p>
          <FilmForgastest />
        </div>

        {/* ---- KF-6 ---- */}
        <KidolgozottFeladat
          jel="KF‑6"
          ido="12 perc"
          forras="Előadás, 33–36. példa"
          cim="Súlypont, Pappus–Guldin és másodrendű nyomaték"
          feladat={
            <>
              <p>
                <strong>(a)</strong> Hol van az <M>{"y=\\sin x"}</M> görbe alatti tartomány súlypontja a{" "}
                <M>{"0\\le x\\le\\pi"}</M> szakaszon?
              </p>
              <p className="mt-2">
                <strong>(b)</strong> Hol van a félkörlap súlypontja?
              </p>
              <p className="mt-2">
                <strong>(c)</strong> Mekkora a tórusz térfogata Pappus–Guldin-nal?
              </p>
              <p className="mt-2">
                <strong>(d)</strong> Mekkora a <M>{"b\\times h"}</M> téglalap másodrendű nyomatéka az alsó élre, és a
                súlyponti tengelyre?
              </p>
            </>
          }
          tanulsag={
            <p>
              A súlypont <strong>nyomaték osztva a területtel</strong> — és a nyomatékok, nem a súlypontok adódnak
              össze. Ez az összetett keresztmetszeteknél (T-, L-, I-szelvény) létfontosságú. A (d) eredménye,{" "}
              <M>{"\\frac{bh^3}{12}"}</M>, a Szilárdságtan legtöbbet használt képlete: a magasság{" "}
              <strong>köbön</strong> szerepel benne.
            </p>
          }
        >
          <Lepes cim="(a1) Terület és S_y">
            <p>
              A terület a KF‑2 (a)-ból: <M>{"T=\\int_0^\\pi\\sin x\\,dx = 2"}</M>. Az <M>{"y"}</M> tengelyre
              vonatkozó nyomaték épp a KF‑2 (d) eredménye:
            </p>
            <KepletDoboz
              cimke="Statikai nyomaték és x_s"
              keplet={"S_y = \\int_0^{\\pi}x\\sin x\\,dx = \\pi"}
              behelyettesitve={"x_s = \\frac{S_y}{T} = \\frac{\\pi}{2}"}
              eredmeny={"x_s = \\frac{\\pi}{2} \\approx 1{,}5708"}
            />
            <p>
              Ez a szimmetriából is látszott volna: a szinuszív szimmetrikus az <M>{"x=\\frac\\pi2"}</M> egyenesre.
            </p>
          </Lepes>
          <Lepes cim="(a2) S_x és y_s">
            <p>
              Itt jön a <M>{"\\frac12"}</M> és a négyzet, és a <M>{"\\sin^2"}</M> linearizálása:
            </p>
            <KepletDoboz
              keplet={"S_x = \\frac12\\int_0^{\\pi}\\sin^2x\\,dx = \\frac12\\int_0^{\\pi}\\frac{1-\\cos2x}{2}dx"}
              behelyettesitve={"= \\frac12\\left[\\frac x2-\\frac{\\sin2x}{4}\\right]_0^{\\pi} = \\frac12\\cdot\\frac{\\pi}{2}"}
              eredmeny={"S_x = \\frac{\\pi}{4}, \\qquad y_s = \\frac{\\pi/4}{2} = \\frac{\\pi}{8} \\approx 0{,}3927"}
            />
            <p>
              A súlypont tehát <M>{"\\left(\\frac{\\pi}{2};\\ \\frac{\\pi}{8}\\right)"}</M>. Józansági ellenőrzés: a
              maximum 1, tehát a <M>{"0{,}39"}</M> magasság hihető.
            </p>
          </Lepes>
          <Lepes cim="(b) A félkörlap súlypontja">
            <p>
              <M>{"f(x)=\\sqrt{R^2-x^2}"}</M>, <M>{"-R\\le x\\le R"}</M>. Szimmetria miatt <M>{"x_s=0"}</M>.
            </p>
            <KepletDoboz
              keplet={"S_x = \\frac12\\int_{-R}^{R}\\left(R^2-x^2\\right)dx = \\frac12\\cdot\\frac{4R^3}{3} = \\frac{2R^3}{3}"}
              behelyettesitve={"T = \\frac{R^2\\pi}{2}, \\qquad y_s = \\frac{2R^3/3}{R^2\\pi/2}"}
              eredmeny={"y_s = \\frac{4R}{3\\pi} \\approx 0{,}4244\\,R"}
            />
            <p>
              A félkörlap súlypontja a sugár kb. <strong>42 %</strong>-ánál van, nem a felénél. Figyeld meg, hogy az{" "}
              <M>{"S_x"}</M> integrálja ugyanaz, mint a gömb térfogatánál — ez nem véletlen, lásd a (c)-t.
            </p>
          </Lepes>
          <Lepes cim="(c) A tórusz Pappus–Guldin-nal">
            <p>
              A forgatott alakzat egy <M>{"r"}</M> sugarú körlap, területe <M>{"T=r^2\\pi"}</M>, a súlypontja (a kör
              középpontja) <M>{"R"}</M> távolságra van a tengelytől:
            </p>
            <KepletDoboz
              keplet={"V = 2\\pi\\,y_s\\,T = 2\\pi R\\cdot r^2\\pi"}
              eredmeny={"V = 2\\pi^2Rr^2"}
            />
            <p>
              A felszín ugyanígy, de a <em>görbe</em> ívhosszával: <M>{"s=2r\\pi"}</M>, tehát{" "}
              <M>{"F = 2\\pi R\\cdot2r\\pi = 4\\pi^2Rr"}</M> — pontosan az, ami a paraméteres felszínintegrálból is
              kijön. És visszafelé: a félkörlap <M>{"y_s"}</M>-ét is megkaphatjuk a gömb térfogatából, ahogy a
              7.12-ben láttuk.
            </p>
          </Lepes>
          <Lepes cim="(d) A téglalap másodrendű nyomatéka">
            <p>
              Legyen a téglalap szélessége <M>{"b"}</M>, magassága <M>{"h"}</M>, az alsó éle az <M>{"x"}</M>{" "}
              tengelyen: <M>{"f(x)\\equiv h"}</M>, <M>{"0\\le x\\le b"}</M>.
            </p>
            <KepletDoboz
              cimke="Az alsó élre"
              keplet={"I_x = \\frac13\\int_0^{b}h^3dx"}
              eredmeny={"I_x = \\frac{bh^3}{3}"}
            />
            <KepletDoboz
              cimke="A súlyponti tengelyre (Steiner)"
              keplet={"I_{x,s} = I_x - T\\cdot y_s^2 = \\frac{bh^3}{3} - bh\\left(\\frac h2\\right)^{2}"}
              behelyettesitve={"= \\frac{bh^3}{3}-\\frac{bh^3}{4}"}
              eredmeny={"I_{x,s} = \\frac{bh^3}{12}"}
            />
            <p>
              Konkrétan: egy <M>{"12\\times24"}</M> cm-es gerendánál <M>{"I_s = \\frac{12\\cdot24^3}{12} = 13824"}</M>{" "}
              cm⁴, míg fektetve (<M>{"24\\times12"}</M>) csak <M>{"3456"}</M> cm⁴ — négyszer kisebb. Ezért állnak
              élükre a gerendák.
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
            <h3 className="mb-2 text-[16px] font-semibold text-petrol-900">Határozott integrál kalkulátor</h3>
            <p className="mb-3 text-[14px] text-petrol-600">
              Írj be egy képletet és a két határt: megkapod az <strong>előjeles</strong> integrált, a valódi (abszolút)
              területet és az átlagértéket, a grafikonon pedig külön színnel a tengely fölötti és alatti részeket. A
              számítás összetett Simpson-formulával megy, 4000 osztással. Alaphelyzetben a KF‑2 (a) feladata van
              betöltve.
            </p>
            <HoIntegralKalk />
          </div>
          <div>
            <h3 className="mb-2 text-[16px] font-semibold text-petrol-900">Alkalmazás-kalkulátor</h3>
            <p className="mb-3 text-[14px] text-petrol-600">
              Ugyanaz a képlet és <M>{"[a;\\,b]"}</M> szakasz, de most az <strong>alkalmazások</strong>: ívhossz,
              terület, az <M>{"x"}</M> tengely körüli forgástest térfogata és palástjának felszíne, valamint a görbe
              alatti tartomány súlypontja — a Pappus-ellenőrzéssel együtt. Alaphelyzetben a KF‑5 (d) feladata (
              <M>{"\\sqrt x"}</M> a <M>{"[0;\\,2]"}</M>-n) van betöltve.
            </p>
            <HoAlkalmazasKalk />
          </div>
        </div>

        <Kiemelo tipus="tipp" cim="Mire használd a kalkulátort">
          <p>
            Arra, hogy <em>ellenőrizz</em>, ne arra, hogy helyetted számoljon. A zárthelyin nem lesz nálad, és a
            numerikus érték nem levezetés. Viszont kiválóan alkalmas arra, hogy meglásd: az{" "}
            <M>{"\\int_0^1e^{-x^2}dx"}</M> értéke létezik (<M>{"\\approx0{,}7468"}</M>) annak ellenére, hogy nincs
            elemi primitív függvénye — és hogy az előjeles integrál és a terület tényleg különböző szám, ha a görbe
            metszi a tengelyt (próbáld ki az <M>{"x^2-4"}</M> gombot a <M>{"[-3;\\,3]"}</M> szakaszon).
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
          cim="Érted, vagy csak integrálod?"
          leiras="Tíz kérdés a modul tipikus félreértéseiről — egyik sem számolós. Minden válasz után rövid magyarázat."
          kerdesek={KVIZ}
        />

        <Hibakereso feladatok={HIBAK} />

        <div className="my-6">
          <p className="mb-2 text-[11px] font-bold tracking-[0.16em] text-violet-700 uppercase">
            Játék — mekkora a terület?
          </p>
          <HoTeruletBecslo />
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
            Akkor vagy készen ezzel a modullal, ha (1) el tudod mondani, miért ad az integrál <em>előjeles</em>{" "}
            területet, és mikor nem egyezik az integrál a területtel, (2) helyettesítésnél <strong>magadtól</strong>{" "}
            átírod a határokat, (3) két görbe közötti területnél behelyettesítéssel döntöd el, melyik a felső, és
            minden metszéspontnál új szakaszt kezdesz, (4) fejből felírod a <M>{"V=\\pi\\int f^2"}</M>,{" "}
            <M>{"F=2\\pi\\int f\\sqrt{1+f'^2}"}</M> és <M>{"s=\\int\\sqrt{1+f'^2}"}</M> képleteket — és meg tudod
            mondani, melyikben miért van (vagy nincs) gyök, és (5) ki tudod számolni egy egyszerű síkidom súlypontját
            és másodrendű nyomatékát. A következő modulban az improprius integrál jön: ott ugyanezeket a képleteket
            fogjuk <strong>végtelen</strong> határokra és nem korlátos integrandusokra kiterjeszteni — és kiderül,
            hogy a Torricelli-trombitának véges a térfogata, de végtelen a felszíne.
          </p>
        </Kiemelo>
      </Szakasz>
    </>
  );
}
