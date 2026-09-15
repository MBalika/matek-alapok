import { M, MB } from "@/components/ui/Keplet";

/**
 * Fogalmi kvíz és hibakereső az Improprius és numerikus integrálás modulhoz.
 * A KVIZ-ben a helyes válasz mindig a 0. indexű — a komponens kikeveri őket.
 */

export const KVIZ = [
  {
    k: (
      <>
        Az <M>{"f(x) = \\frac1x"}</M> függvény nullához tart a végtelenben. Mit mondhatunk ebből az{" "}
        <M>{"\\int_1^{\\infty}\\frac{dx}{x}"}</M> integrálról?
      </>
    ),
    v: [
      <>Semmit — a nullához tartás szükséges, de nem elegendő; ez az integrál történetesen divergens.</>,
      <>Konvergens, mert az integrandus nullához tart.</>,
      <>Konvergens, mert az integrandus monoton csökkenő és pozitív.</>,
      <>Konvergens, és az értéke 1.</>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        <p>
          A <M>{"\\lim_{x\\to\\infty} f(x) = 0"}</M> feltétel csak <strong>szükséges</strong> (monoton <M>{"f"}</M>{" "}
          esetén), de <strong>nem elegendő</strong>. Az <M>{"1/x"}</M> nullához tart, mégis
        </p>
        <MB>{"\\int_1^{d}\\frac{dx}{x} = \\ln d \\longrightarrow +\\infty ."}</MB>
        <p>A kérdés sosem az, hogy nullához tart-e, hanem az, hogy milyen gyorsan.</p>
      </>
    ),
  },
  {
    k: (
      <>
        Melyik <M>{"p"}</M>-re konvergens a két nevezetes <M>{"p"}</M>-integrál,{" "}
        <M>{"\\int_1^{\\infty}\\frac{dx}{x^p}"}</M> és <M>{"\\int_0^{1}\\frac{dx}{x^p}"}</M>?
      </>
    ),
    v: [
      <>
        A végtelenben <M>{"p>1"}</M>, a nullában <M>{"p<1"}</M> kell — a két feltétel egymás fordítottja.
      </>,
      <>
        Mindkettőhöz <M>{"p>1"}</M> kell.
      </>,
      <>
        Mindkettőhöz <M>{"p<1"}</M> kell.
      </>,
      <>
        A végtelenben <M>{"p<1"}</M>, a nullában <M>{"p>1"}</M> kell.
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        <p>
          A végtelenben a <strong>gyors fogyás</strong> a jó (nagy kitevő), az érték <M>{"\\frac{1}{p-1}"}</M>; a
          nullában a <strong>lassú növekedés</strong> a jó (kicsi kitevő), az érték <M>{"\\frac{1}{1-p}"}</M>. A{" "}
          <M>{"p=1"}</M> határeset mindkétszer divergens — és épp ezért nem konvergens az{" "}
          <M>{"\\int_0^{\\infty}\\frac{dx}{x^p}"}</M> semmilyen <M>{"p"}</M>-re.
        </p>
      </>
    ),
  },
  {
    k: (
      <>
        Hogyan kell kezelni az <M>{"\\int_{-1}^{1}\\frac{dx}{x^2}"}</M> integrált?
      </>
    ),
    v: [
      <>
        Két részre kell bontani a <M>{"0"}</M>-nál, és mindkét résznek külön kell konvergálnia — itt már az egyik is{" "}
        <M>{"+\\infty"}</M>, tehát az integrál divergens.
      </>,
      <>
        A Newton–Leibniz-formulával: <M>{"\\left[-\\frac1x\\right]_{-1}^{1} = -2"}</M>.
      </>,
      <>
        Szimmetria miatt <M>{"2\\int_0^1\\frac{dx}{x^2}"}</M>, ami konvergens.
      </>,
      <>
        A két oldal <M>{"+\\infty"}</M> és <M>{"-\\infty"}</M>, ezek kiejtik egymást, tehát az érték 0.
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        <p>
          Az <M>{"x=0"}</M> <strong>belső szakadási hely</strong>, ezért a Newton–Leibniz-formula nem alkalmazható. A{" "}
          <M>{"-2"}</M> eredmény ránézésre is képtelenség: az <M>{"1/x^2"}</M> pozitív, a terület nem lehet negatív.
        </p>
        <MB>{"\\int_0^1\\frac{dx}{x^2} = \\lim_{v\\to0+0}\\left(\\frac1v - 1\\right) = +\\infty"}</MB>
      </>
    ),
  },
  {
    k: (
      <>
        Mi a viszony a <M>{"\\lim\\limits_{d\\to\\infty}\\int_{-d}^{d} f(x)\\,dx"}</M> (Cauchy-főérték) és az{" "}
        <M>{"\\int_{-\\infty}^{\\infty} f(x)\\,dx"}</M> improprius integrál között?
      </>
    ),
    v: [
      <>
        A főérték létezhet akkor is, ha az improprius integrál divergens (például <M>{"f(x)=x"}</M> esetén) — a kettő
        nem ugyanaz.
      </>,
      <>A kettő mindig ugyanaz, csak más a jelölés.</>,
      <>
        Az improprius integrál létezhet akkor is, ha a főérték nem — fordítva viszont soha.
      </>,
      <>
        A főérték csak páros függvényekre értelmezhető.
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        <p>
          Az <M>{"f(x)=x"}</M> esetén minden <M>{"d"}</M>-re <M>{"\\int_{-d}^{d}x\\,dx = 0"}</M>, tehát a főérték 0.
          Az improprius integrál viszont divergens, mert már <M>{"\\int_0^{\\infty}x\\,dx = +\\infty"}</M>. A két
          végtelent <strong>egymástól függetlenül</strong> kell kezelni.
        </p>
      </>
    ),
  },
  {
    k: <>Mit bizonyít az, hogy egy nemnegatív <M>{"f"}</M> kisebb egy <strong>divergens</strong> integrálú <M>{"g"}</M>-nél?</>,
    v: [
      <>Semmit — a divergens majoránsból nem következik semmi.</>,
      <>
        Azt, hogy <M>{"\\int f"}</M> is divergens.
      </>,
      <>
        Azt, hogy <M>{"\\int f"}</M> konvergens.
      </>,
      <>
        Azt, hogy <M>{"\\int f"}</M> és <M>{"\\int g"}</M> egyszerre konvergensek vagy divergensek.
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        <p>
          Konvergenciát csak <strong>konvergens majoránssal</strong> (felülről), divergenciát csak{" "}
          <strong>divergens minoránssal</strong> (alulról) lehet bizonyítani. Ellenpélda:{" "}
          <M>{"\\frac{1}{x^2} \\le \\frac1x"}</M>, a nagyobbik integrálja divergens, a kisebbiké mégis konvergens.
        </p>
      </>
    ),
  },
  {
    k: (
      <>
        Milyen feltételt kell teljesítenie a függvényeknek a majoráns-, minoráns- és limeszes kritériumban?
      </>
    ),
    v: [
      <>
        Nemnegatívnak kell lenniük a kritikus hely környezetében.
      </>,
      <>Folytonosan differenciálhatóknak kell lenniük.</>,
      <>Monoton csökkenőknek kell lenniük.</>,
      <>Semmilyen feltétel nem kell, tetszőleges függvényre működnek.</>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        <p>
          Mindhárom kritérium <strong>nemnegatív</strong> (legalább a kritikus hely környékén nemnegatív) függvényeket
          tételez fel. Ha az integrandus előjelet vált, először az <M>{"|f|"}</M>-re kell vizsgálódni (abszolút
          konvergencia), vagy más eszközhöz kell nyúlni.
        </p>
      </>
    ),
  },
  {
    k: (
      <>
        Miért kell a Simpson-szabálynál <M>{"n"}</M>-nek párosnak lennie?
      </>
    ),
    v: [
      <>
        Mert egy parabola mindig <strong>két</strong> szomszédos részintervallumot fog össze (három alappont kell
        hozzá).
      </>,
      <>Mert páratlan <M>{"n"}</M> esetén a <M>{"h"}</M> nem egész szám.</>,
      <>Mert így lesz a hiba <M>{"h^4"}</M>-nel arányos, egyébként csak <M>{"h^2"}</M>-tel.</>,
      <>Nem kell párosnak lennie, ez csak a számolást egyszerűsíti.</>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        <p>
          Egy húrhoz két pont, egy parabolához <strong>három</strong> pont kell, tehát minden parabola két
          részintervallumot fed le. Ha <M>{"n"}</M> páratlan, a végén marad egy pár nélküli részintervallum, és a
          súlyok nem jönnek ki.
        </p>
      </>
    ),
  },
  {
    k: <>Mennyi a súlyok összege a trapéz-, illetve a Simpson-szabályban, <M>{"n"}</M> részintervallum esetén?</>,
    v: [
      <>
        <M>{"2n"}</M>, illetve <M>{"3n"}</M> — és a szorzóval együtt mindkettő <M>{"b-a"}</M>-t ad.
      </>,
      <>
        <M>{"n+1"}</M> mindkét esetben, hiszen ennyi az alappont.
      </>,
      <>
        <M>{"n"}</M>, illetve <M>{"2n"}</M>.
      </>,
      <>
        <M>{"3n"}</M>, illetve <M>{"2n"}</M>.
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        <p>
          Trapéz: <M>{"1+2(n-1)+1 = 2n"}</M>, és <M>{"\\frac h2\\cdot2n = nh = b-a"}</M>. Simpson: a{" "}
          <M>{"n/2"}</M> darab négyes és a <M>{"n/2-1"}</M> darab kettes súly plusz a két 1-es együtt{" "}
          <M>{"3n"}</M>, és <M>{"\\frac h3\\cdot3n = b-a"}</M>. Ez a leggyorsabb ellenőrzés a dolgozatban.
        </p>
      </>
    ),
  },
  {
    k: (
      <>
        A Torricelli-trombita (az <M>{"y=1/x"}</M>, <M>{"x\\ge1"}</M> görbe forgatásából) térfogata és felszíne:
      </>
    ),
    v: [
      <>
        A térfogat véges (<M>{"\\pi"}</M>), a felszín végtelen.
      </>,
      <>Mindkettő véges.</>,
      <>Mindkettő végtelen.</>,
      <>
        A térfogat végtelen, a felszín véges (<M>{"2\\pi"}</M>).
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        <p>
          A térfogat <M>{"\\pi\\int_1^{\\infty}\\frac{dx}{x^2} = \\pi"}</M>, mert a négyzetre emelés miatt{" "}
          <M>{"p=2>1"}</M>. A felszín viszont alulról becsülhető{" "}
          <M>{"2\\pi\\int_1^{\\infty}\\frac{dx}{x}"}</M>-szel, ami divergens (<M>{"p=1"}</M>). Épp a négyzetre emelés
          billenti át a konvergencia határán.
        </p>
      </>
    ),
  },
  {
    k: (
      <>
        Egy <strong>konvex</strong> függvény integrálját trapézszabállyal közelítjük. Mit mondhatunk a közelítésről?
      </>
    ),
    v: [
      <>Felülbecsül, mert a húr a görbe fölött halad.</>,
      <>Alulbecsül, mert a húr a görbe alatt halad.</>,
      <>Pontos, mert a trapézszabály minden függvényre pontos.</>,
      <>Semmit nem lehet mondani, a hiba előjele véletlenszerű.</>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        <p>
          Konvex függvénynél (<M>{"f''>0"}</M>) a két pontot összekötő húr a görbe fölött fut, tehát a trapéz területe
          nagyobb a valódinál. Ezért lett az <M>{"\\int_1^2\\frac{dx}{x}"}</M> példában a trapézközelítés{" "}
          <M>{"0{,}697024 > 0{,}693147"}</M>. Konkáv függvénynél fordítva.
        </p>
      </>
    ),
  },
];

export const HIBAK = [
  {
    cim: "Hol tűnt el a szakadási hely?",
    feladat: (
      <p>
        Számítsuk ki az <M>{"\\int_{-1}^{1}\\frac{dx}{x^2}"}</M> integrált.
      </p>
    ),
    lepesek: [
      {
        szoveg: (
          <>
            Az integrandus <M>{"x^{-2}"}</M>, a primitív függvénye <M>{"\\frac{x^{-1}}{-1} = -\\frac1x"}</M>.
          </>
        ),
      },
      {
        szoveg: (
          <>
            Az <M>{"f(x)=\\frac{1}{x^2}"}</M> a <M>{"[-1;\\,1]"}</M> intervallumon mindenütt folytonos és korlátos,
            tehát a Newton–Leibniz-formula közvetlenül alkalmazható.
          </>
        ),
        hibas: true,
        javitas: (
          <>
            <p>
              Ez <strong>hamis állítás</strong>. Az <M>{"x=0"}</M> pontban az <M>{"1/x^2"}</M> nincs is értelmezve, és
              a nulla közelében nem korlátos — tehát a feltétel sérül, a Newton–Leibniz-formula nem alkalmazható.
            </p>
            <p>
              Helyesen két részre kell bontani, és mindkét részt külön határértékkel kezelni:{" "}
              <M>{"\\int_{-1}^{0}"}</M> és <M>{"\\int_{0}^{1}"}</M>.
            </p>
          </>
        ),
      },
      {
        szoveg: (
          <>
            Behelyettesítve: <M>{"\\left[-\\frac1x\\right]_{-1}^{1} = -1 - 1 = -2"}</M>.
          </>
        ),
      },
      {
        szoveg: (
          <>
            Tehát az integrál konvergens, és az értéke <M>{"-2"}</M>.
          </>
        ),
      },
    ],
    tanulsag: (
      <p>
        A <M>{"-2"}</M> ránézésre is képtelenség: az <M>{"1/x^2"}</M> pozitív függvény, a görbe alatti terület nem
        lehet negatív. Már <M>{"\\int_0^1\\frac{dx}{x^2} = +\\infty"}</M>, tehát az integrál{" "}
        <strong>divergens</strong>. Minden határozott integrálnál nézd meg, hogy az integrandus értelmezve van-e és
        korlátos-e az <em>egész</em> intervallumon.
      </p>
    ),
  },
  {
    cim: "A p-kritérium két esete",
    feladat: (
      <p>
        Döntsük el, konvergens-e az <M>{"\\int_1^{\\infty}\\frac{dx}{\\sqrt{x}}"}</M> integrál.
      </p>
    ),
    lepesek: [
      {
        szoveg: (
          <>
            Az integrandus <M>{"x^{-1/2}"}</M>, tehát ez egy <M>{"p"}</M>-integrál <M>{"p = \\frac12"}</M> kitevővel.
          </>
        ),
      },
      {
        szoveg: (
          <>
            Az <M>{"\\int_1^{\\infty}\\frac{dx}{x^p}"}</M> integrál akkor konvergens, ha <M>{"p < 1"}</M>. Itt{" "}
            <M>{"p = \\frac12 < 1"}</M>, tehát az integrál konvergens.
          </>
        ),
        hibas: true,
        javitas: (
          <>
            <p>
              Felcserélt szabály! A <strong>végtelenben</strong> vett <M>{"p"}</M>-integrál akkor konvergens, ha{" "}
              <M>{"p > 1"}</M>. A <M>{"p<1"}</M> feltétel a <strong>nullában</strong> vett{" "}
              <M>{"\\int_0^1\\frac{dx}{x^p}"}</M> integrálra vonatkozik.
            </p>
            <p>
              Itt <M>{"p = \\frac12 \\le 1"}</M>, tehát az integrál <strong>divergens</strong>.
            </p>
          </>
        ),
      },
      {
        szoveg: (
          <>
            Az értéke a képlet szerint <M>{"\\frac{1}{p-1} = \\frac{1}{\\frac12-1} = -2"}</M>.
          </>
        ),
      },
      {
        szoveg: (
          <>
            Tehát az integrál konvergens, az értéke <M>{"-2"}</M>.
          </>
        ),
      },
    ],
    tanulsag: (
      <p>
        A negatív „érték” maga is figyelmeztető jel: pozitív integrandusnál lehetetlen. A mondóka:{" "}
        <em>a végtelenben a gyors fogyás jó, a nullában a lassú növekedés</em>. Ellenőrzésképpen{" "}
        <M>{"\\int_1^{d}x^{-1/2}dx = 2\\sqrt d - 2 \\to +\\infty"}</M>.
      </p>
    ),
  },
  {
    cim: "A becslés rossz irányban",
    feladat: (
      <p>
        Döntsük el, konvergens-e az <M>{"\\int_1^{\\infty}\\frac{dx}{x^2+1}"}</M> integrál.
      </p>
    ),
    lepesek: [
      {
        szoveg: (
          <>
            Minden <M>{"x \\ge 1"}</M> esetén <M>{"x^2 + 1 > x"}</M>, tehát <M>{"0 < \\frac{1}{x^2+1} < \\frac1x"}</M>.
          </>
        ),
      },
      {
        szoveg: (
          <>
            Az <M>{"\\int_1^{\\infty}\\frac{dx}{x}"}</M> integrál divergens (<M>{"p=1"}</M>).
          </>
        ),
      },
      {
        szoveg: (
          <>
            Ha egy függvény <strong>kisebb</strong> egy divergens integrálú függvénynél, akkor az ő integrálja is
            divergens. Tehát <M>{"\\int_1^{\\infty}\\frac{dx}{x^2+1}"}</M> divergens.
          </>
        ),
        hibas: true,
        javitas: (
          <>
            <p>
              Ez <strong>hamis szabály</strong>. A kisebb függvényről egy divergens majoráns semmit nem mond. A
              kritériumok iránya kötött: konvergenciát <em>konvergens majoránssal</em>, divergenciát{" "}
              <em>divergens minoránssal</em> lehet bizonyítani.
            </p>
            <p>
              Helyes becslés: <M>{"x^2+1 > x^2"}</M>, tehát <M>{"\\frac{1}{x^2+1} < \\frac{1}{x^2}"}</M>, és{" "}
              <M>{"\\int_1^{\\infty}\\frac{dx}{x^2} = 1"}</M> konvergens — így a vizsgált integrál{" "}
              <strong>konvergens</strong>.
            </p>
          </>
        ),
      },
      {
        szoveg: (
          <>
            Mivel divergens, az integrálnak nincs véges értéke — numerikusan sem érdemes közelíteni.
          </>
        ),
      },
    ],
    tanulsag: (
      <p>
        Az integrál valójában konvergens, az értéke <M>{"\\frac{\\pi}{2} - \\frac{\\pi}{4} = \\frac{\\pi}{4} \\approx 0{,}785"}</M>
        . Egy rossz irányú becslés nemcsak hiányos bizonyítás — hanem <em>ellentétes</em> következtetésre vezet.
      </p>
    ),
  },
  {
    cim: "Elrontott Simpson-súlyok",
    feladat: (
      <p>
        Közelítsük az <M>{"\\int_1^{2}\\frac{dx}{x}"}</M> integrált Simpson-szabállyal, <M>{"n=4"}</M> felosztással. Az
        alappontok <M>{"1;\\ 1{,}25;\\ 1{,}5;\\ 1{,}75;\\ 2"}</M>, a függvényértékek{" "}
        <M>{"1;\\ 0{,}8;\\ 0{,}6667;\\ 0{,}5714;\\ 0{,}5"}</M>.
      </p>
    ),
    lepesek: [
      {
        szoveg: (
          <>
            A lépésköz <M>{"h = \\frac{2-1}{4} = 0{,}25"}</M>, és <M>{"n=4"}</M> páros, tehát a Simpson-szabály
            alkalmazható.
          </>
        ),
      },
      {
        szoveg: (
          <>
            A Simpson-súlyok: <M>{"1,\\ 2,\\ 2,\\ 2,\\ 1"}</M>, a szorzó pedig <M>{"\\frac h3"}</M>.
          </>
        ),
        hibas: true,
        javitas: (
          <>
            <p>
              A súlyok helyesen <M>{"1,\\ 4,\\ 2,\\ 4,\\ 1"}</M>: a <strong>páratlan</strong> indexű pontok (a
              parabolák középső pontjai) kapnak 4-es súlyt. Az <M>{"1,2,2,2,1"}</M> a <em>trapézszabály</em> súlyozása.
            </p>
            <p>
              Gyors ellenőrzés: a súlyok összegének <M>{"3n = 12"}</M>-nek kell lennie, hogy{" "}
              <M>{"\\frac h3\\cdot 12 = 1 = b-a"}</M> legyen. Az <M>{"1+2+2+2+1 = 8"}</M> ennek nem felel meg.
            </p>
          </>
        ),
      },
      {
        szoveg: (
          <>
            Az összeg: <M>{"1 + 2\\cdot0{,}8 + 2\\cdot0{,}6667 + 2\\cdot0{,}5714 + 0{,}5 = 5{,}5762"}</M>.
          </>
        ),
      },
      {
        szoveg: (
          <>
            Tehát <M>{"S \\approx \\frac{0{,}25}{3}\\cdot 5{,}5762 = 0{,}4647"}</M>.
          </>
        ),
      },
    ],
    tanulsag: (
      <p>
        A <M>{"0{,}4647"}</M> messze van a valódi <M>{"\\ln 2 = 0{,}693147"}</M> értéktől — a súlyellenőrzés ezt
        azonnal kiszűrte volna. A helyes számolás:{" "}
        <M>{"\\frac{0{,}25}{3}\\left(1+4\\cdot0{,}8+2\\cdot0{,}6667+4\\cdot0{,}5714+0{,}5\\right) = 0{,}693254"}</M>.
      </p>
    ),
  },
];
