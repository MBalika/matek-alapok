import { M, MB } from "@/components/ui/Keplet";

/**
 * Fogalmi kvíz és hibakereső a Differenciálszámítás modulhoz.
 * A KVIZ-ben a helyes válasz mindig a 0. indexű — a komponens kikeveri őket.
 */

export const KVIZ = [
  {
    k: (
      <>
        Melyik állítás igaz a differenciálhatóság és a folytonosság kapcsolatáról?
      </>
    ),
    v: [
      <>
        Ha <M>{"f"}</M> differenciálható <M>{"x_0"}</M>-ban, akkor ott folytonos is — visszafelé viszont nem igaz.
      </>,
      <>
        Ha <M>{"f"}</M> folytonos <M>{"x_0"}</M>-ban, akkor ott differenciálható is.
      </>,
      <>A két fogalom ugyanazt jelenti, csak más a nevük.</>,
      <>
        A kettő független egymástól: van differenciálható, de nem folytonos függvény is.
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        <p>
          A differenciálhatóságból következik a folytonosság (mert{" "}
          <M>{"f(x)-f(x_0) = \\frac{f(x)-f(x_0)}{x-x_0}\\cdot(x-x_0) \\to f'(x_0)\\cdot 0 = 0"}</M>), fordítva
          azonban <strong>nem</strong>: az <M>{"\\left|x\\right|"}</M> a 0-ban folytonos, de a két egyoldali derivált{" "}
          <M>{"+1"}</M> és <M>{"-1"}</M>, tehát nincs derivált.
        </p>
      </>
    ),
  },
  {
    k: (
      <>
        Egy differenciálható függvényre <M>{"f'(x_0) = 0"}</M>. Mi következik ebből?
      </>
    ),
    v: [
      <>
        Csak annyi, hogy az érintő vízszintes — szélsőérték lehet, de nem biztos (<M>{"x^3"}</M> a 0-ban).
      </>,
      <>
        Biztosan lokális szélsőértéke van <M>{"x_0"}</M>-ban.
      </>,
      <>
        Biztosan lokális <em>maximuma</em> van, hiszen a derivált „lefordul”.
      </>,
      <>
        Biztosan inflexiós pontja van <M>{"x_0"}</M>-ban.
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        <p>
          A Fermat-tétel csak <strong>szükséges</strong> feltételt mond: belső szélsőértékhelyen a derivált nulla. A
          megfordítás hamis: <M>{"\\left(x^3\\right)' = 3x^2"}</M> a 0-ban nulla, de a függvény végig szigorúan nő.
          Dönteni az <strong>előjelváltásból</strong> vagy a második deriváltból lehet.
        </p>
      </>
    ),
  },
  {
    k: (
      <>
        Mennyi <M>{"\\left(\\sin 3x\\right)'"}</M>?
      </>
    ),
    v: [
      <>
        <M>{"3\\cos 3x"}</M>
      </>,
      <>
        <M>{"\\cos 3x"}</M>
      </>,
      <>
        <M>{"3\\cos x"}</M>
      </>,
      <>
        <M>{"\\cos 3"}</M>
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        <p>
          A láncszabály: <M>{"\\left(f(g(x))\\right)' = f'(g(x))\\cdot g'(x)"}</M>. A külső függvény a szinusz
          (deriváltja koszinusz), a belső a <M>{"3x"}</M> (deriváltja 3) — a hármas szorzó tehát <strong>kell</strong>.
          A belső derivált elhagyása a félév leggyakoribb hibája.
        </p>
      </>
    ),
  },
  {
    k: (
      <>
        Melyik határértéknél <strong>nem</strong> szabad alkalmazni a L&apos;Hospital-szabályt?
      </>
    ),
    v: [
      <>
        <M>{"\\lim\\limits_{x\\to0}\\dfrac{x}{x+1}"}</M>, mert behelyettesítve <M>{"\\frac01 = 0"}</M> adódik — nem
        határozatlan.
      </>,
      <>
        <M>{"\\lim\\limits_{x\\to0}\\dfrac{\\sin x}{x}"}</M>
      </>,
      <>
        <M>{"\\lim\\limits_{x\\to\\infty}\\dfrac{x^2}{e^x}"}</M>
      </>,
      <>
        <M>{"\\lim\\limits_{x\\to0}\\dfrac{e^x-1}{x}"}</M>
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        <p>
          A szabály <strong>csak</strong> <M>{"\\frac00"}</M> és <M>{"\\frac{\\infty}{\\infty}"}</M> alakra érvényes.
          Az első esetben a behelyettesítés értelmes számot ad (a határérték 0); ha mégis deriválnánk, a deriváltak
          hányadosa <M>{"\\frac11 = 1"}</M> lenne — hamis eredmény. <strong>Először mindig helyettesíts be.</strong>
        </p>
      </>
    ),
  },
  {
    k: <>Mit mond geometriailag a Lagrange-féle középértéktétel?</>,
    v: [
      <>
        Van olyan belső pont, ahol az érintő <strong>párhuzamos</strong> a végpontokat összekötő húrral.
      </>,
      <>
        Van olyan belső pont, ahol az érintő <strong>vízszintes</strong>.
      </>,
      <>
        Van olyan belső pont, ahol az érintő <strong>merőleges</strong> a húrra.
      </>,
      <>
        A függvény a húr fölött halad az egész <M>{"[a;\\,b]"}</M> szakaszon.
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        <p>
          <M>{"f'(c) = \\frac{f(b)-f(a)}{b-a}"}</M>: a jobb oldal a húr meredeksége (az <em>átlagos</em> változási
          sebesség), a bal a <em>pillanatnyi</em>. A vízszintes érintő a Rolle-tétel speciális esete, amikor{" "}
          <M>{"f(a)=f(b)"}</M>.
        </p>
      </>
    ),
  },
  {
    k: (
      <>
        Egy intervallumon <M>{"f'' > 0"}</M>. Mi következik ebből?
      </>
    ),
    v: [
      <>
        A függvény ott <strong>konvex</strong>: a húr a grafikon fölött halad, a meredekség nő.
      </>,
      <>
        A függvény ott szigorúan <strong>nő</strong>.
      </>,
      <>
        A függvény ott <strong>pozitív</strong>.
      </>,
      <>
        A függvénynek ott <strong>minimuma</strong> van.
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        <p>
          <M>{"f''>0"}</M> azt jelenti, hogy <M>{"f'"}</M> nő — a meredekség egyre nagyobb, a görbe „mosolyog”. Ez
          semmit nem mond a függvény előjeléről és a monotonitásáról: az <M>{"e^{-x}"}</M> mindenütt konvex, mégis
          szigorúan csökken.
        </p>
      </>
    ),
  },
  {
    k: (
      <>
        <M>{"f(x) = x^4"}</M> esetén <M>{"f''(0) = 0"}</M>. Inflexiós pont-e a 0?
      </>
    ),
    v: [
      <>
        Nem: <M>{"f''(x) = 12x^2 \\ge 0"}</M> mindenütt, nincs előjelváltás.
      </>,
      <>
        Igen, mert <M>{"f''(0) = 0"}</M> — ez a feltétel.
      </>,
      <>
        Igen, mert a 0-ban a függvénynek szélsőértéke is van.
      </>,
      <>
        Nem eldönthető a második deriváltból, csak numerikusan.
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        <p>
          Az <M>{"f''(x_0)=0"}</M> csak <strong>szükséges</strong> feltétel; inflexióhoz a második derivált{" "}
          <strong>előjelváltása</strong> kell. Az <M>{"x^4"}</M>-nél a második derivált a 0-t csak „érinti”, nem lépi
          át — a 0-ban lokális <em>minimum</em> van, nem inflexió.
        </p>
      </>
    ),
  },
  {
    k: (
      <>
        Az <M>{"f(x)=x^2"}</M> görbe érintője az <M>{"x_0 = 3"}</M> helyen. Melyik a helyes egyenlet?
      </>
    ),
    v: [
      <>
        <M>{"y = 6(x-3)+9"}</M>
      </>,
      <>
        <M>{"y = 2x(x-3)+9"}</M>
      </>,
      <>
        <M>{"y = 6(x-3)"}</M>
      </>,
      <>
        <M>{"y = 9(x-3)+6"}</M>
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        <p>
          Az egyenlet <M>{"y = f'(x_0)(x-x_0)+f(x_0)"}</M>. A meredekség a <strong>szám</strong>{" "}
          <M>{"f'(3) = 6"}</M>, nem a derivált <em>függvény</em> (<M>{"2x"}</M>) — különben nem is egyenes lenne. Az{" "}
          <M>{"f(x_0)=9"}</M> tag sem maradhat le, különben az egyenes nem menne át az érintési ponton.
        </p>
      </>
    ),
  },
  {
    k: (
      <>
        Az <M>{"\\ln(1+x)"}</M> Maclaurin-polinomjai. Mit lehet mondani a közelítés minőségéről?
      </>
    ),
    v: [
      <>
        A 0 közelében egyre jobb, de <M>{"x>1"}</M>-re a magasabb fokú polinomok is elszállnak.
      </>,
      <>
        Elég nagy fokszámmal minden <M>{"x"}</M>-re tetszőlegesen pontos.
      </>,
      <>
        A fokszám növelése a 0 közelében sem javít semmit.
      </>,
      <>
        Csak a páros fokú polinomok közelítenek jól.
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        <p>
          A maradéktag <M>{"\\left|x-a\\right|^{n+1}"}</M>-nel arányos: a fejlesztési pont közelében a hiba nagyon
          gyorsan csökken, távolabb viszont nőhet. Az <M>{"\\ln(1+x)"}</M> sora csak <M>{"-1<x\\le1"}</M>-re
          konvergens; <M>{"x=2"}</M>-nél a részletösszegek oszcillálva szétszaladnak.
        </p>
      </>
    ),
  },
  {
    k: (
      <>
        Egy hallgató fokban számolva írja fel, hogy <M>{"(\\sin x)' = \\cos x"}</M>. Mi a baj?
      </>
    ),
    v: [
      <>
        A képlet csak radiánban igaz; fokban egy <M>{"\\frac{\\pi}{180}"}</M> szorzó is megjelenne.
      </>,
      <>
        Semmi: a derivált nem függ a szög mértékegységétől.
      </>,
      <>
        Fokban a derivált <M>{"-\\cos x"}</M> lenne.
      </>,
      <>
        Fokban a szinusznak nincs deriváltja.
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        <p>
          A levezetés a <M>{"\\lim\\limits_{t\\to0}\\frac{\\sin t}{t} = 1"}</M> nevezetes határértéken múlik, ami csak
          radiánban igaz. Fokban <M>{"\\sin_{\\text{fok}}(x) = \\sin\\left(\\frac{\\pi x}{180}\\right)"}</M>, tehát a
          láncszabály miatt
        </p>
        <MB>{"\\left(\\sin_{\\text{fok}} x\\right)' = \\frac{\\pi}{180}\\cos\\left(\\frac{\\pi x}{180}\\right)."}</MB>
        <p>Ezért kell minden szöget deriválás (és sorfejtés) előtt radiánra váltani.</p>
      </>
    ),
  },
];

export const HIBAK = [
  {
    cim: "A belső derivált eltűnt",
    feladat: (
      <p>
        Deriváld az <M>{"f(x) = \\sin 3x + x^2"}</M> függvényt, és add meg <M>{"f'(0)"}</M> értékét!
      </p>
    ),
    lepesek: [
      {
        szoveg: (
          <>
            A szinusz deriváltja a koszinusz, tehát <M>{"\\left(\\sin 3x\\right)' = \\cos 3x"}</M>.
          </>
        ),
        hibas: true,
        javitas: (
          <>
            <p>
              Itt <strong>összetett függvény</strong> áll: a külső a szinusz, a belső a <M>{"3x"}</M>. A láncszabály
              szerint a külső derivált szorzódik a belső deriválttal:
            </p>
            <MB>{"\\left(\\sin 3x\\right)' = \\cos(3x)\\cdot(3x)' = 3\\cos 3x"}</MB>
            <p>
              Így a helyes derivált <M>{"f'(x) = 3\\cos 3x + 2x"}</M>, és <M>{"f'(0) = 3\\cdot1 + 0 = 3"}</M>, nem 1.
            </p>
          </>
        ),
      },
      {
        szoveg: (
          <>
            A második tag deriváltja a hatványszabállyal <M>{"\\left(x^2\\right)' = 2x"}</M>.
          </>
        ),
      },
      {
        szoveg: (
          <>
            Az összegszabály miatt a két deriváltat összeadjuk:{" "}
            <M>{"f'(x) = \\cos 3x + 2x"}</M>.
          </>
        ),
      },
      {
        szoveg: (
          <>
            Behelyettesítve: <M>{"f'(0) = \\cos 0 + 2\\cdot 0 = 1"}</M>.
          </>
        ),
      },
    ],
    tanulsag: (
      <p>
        Ha a szinusz (vagy bármelyik alapfüggvény) argumentuma nem egyszerűen <M>{"x"}</M>, akkor{" "}
        <strong>mindig kell</strong> a belső derivált. Gyors ellenőrzés: a <M>{"\\sin 3x"}</M> háromszor olyan gyorsan
        hullámzik, mint a <M>{"\\sin x"}</M>, tehát háromszor olyan meredek is.
      </p>
    ),
  },
  {
    cim: "Felcserélt sorrend a hányadosszabályban",
    feladat: (
      <p>
        Deriváld a <M>{"g(x) = \\dfrac{2x+1}{x^2+1}"}</M> függvényt, és add meg <M>{"g'(1)"}</M> értékét!
      </p>
    ),
    lepesek: [
      {
        szoveg: (
          <>
            Legyen <M>{"f = 2x+1"}</M> és <M>{"g = x^2+1"}</M>; ekkor <M>{"f' = 2"}</M> és <M>{"g' = 2x"}</M>.
          </>
        ),
      },
      {
        szoveg: (
          <>
            A hányadosszabály szerint <M>{"\\left(\\dfrac fg\\right)' = \\dfrac{f g' - f' g}{g^2}"}</M>.
          </>
        ),
        hibas: true,
        javitas: (
          <>
            <p>
              A számlálóban a sorrend fordított: előbb a <strong>számláló deriváltja szorozva a nevezővel</strong>:
            </p>
            <MB>{"\\left(\\frac fg\\right)' = \\frac{f'g - fg'}{g^2}"}</MB>
            <p>Ezzel</p>
            <MB>{"g'(x) = \\frac{2\\left(x^2+1\\right) - (2x+1)\\cdot2x}{\\left(x^2+1\\right)^2} = \\frac{-2x^2-2x+2}{\\left(x^2+1\\right)^2},"}</MB>
            <p>
              tehát <M>{"g'(1) = \\frac{-2-2+2}{4} = -\\frac12"}</M> — a helyes érték <strong>negatív</strong>.
            </p>
            <p>
              Örök ellenőrzés: <M>{"\\left(\\frac1x\\right)' = \\frac{0\\cdot x - 1\\cdot 1}{x^2} = -\\frac{1}{x^2}"}</M>{" "}
              ✓. A rossz sorrenddel <M>{"+\\frac{1}{x^2}"}</M> jönne ki.
            </p>
          </>
        ),
      },
      {
        szoveg: (
          <>
            Behelyettesítve:{" "}
            <M>{"g'(x) = \\dfrac{(2x+1)\\cdot 2x - 2\\left(x^2+1\\right)}{\\left(x^2+1\\right)^2} = \\dfrac{2x^2+2x-2}{\\left(x^2+1\\right)^2}"}</M>
            .
          </>
        ),
      },
      {
        szoveg: (
          <>
            Az <M>{"x=1"}</M> helyen <M>{"g'(1) = \\dfrac{2+2-2}{4} = \\dfrac12"}</M>.
          </>
        ),
      },
    ],
    tanulsag: (
      <p>
        A hányadosszabály számlálójában a <strong>mínusz miatt nem mindegy a sorrend</strong>. Ha bizonytalan vagy,
        próbáld ki a szabályt az <M>{"1/x"}</M>-en: az eredménynek <M>{"-1/x^2"}</M>-nek kell lennie.
      </p>
    ),
  },
  {
    cim: "L'Hospital ott, ahol nem szabad",
    feladat: (
      <p>
        Számítsd ki: <M>{"\\lim\\limits_{x\\to1}\\dfrac{x^2+1}{x+1}"}</M>.
      </p>
    ),
    lepesek: [
      {
        szoveg: (
          <>
            A számláló és a nevező is differenciálható az <M>{"x=1"}</M> egy környezetében, és a nevező deriváltja nem
            nulla.
          </>
        ),
      },
      {
        szoveg: (
          <>
            A hányados határozatlan alakú, tehát alkalmazható a L&apos;Hospital-szabály.
          </>
        ),
        hibas: true,
        javitas: (
          <>
            <p>
              Ez hamis állítás. Először <strong>mindig helyettesíts be</strong>:
            </p>
            <MB>{"\\frac{1^2+1}{1+1} = \\frac{2}{2} = 1"}</MB>
            <p>
              Ez értelmes szám, tehát az alak <strong>nem</strong> <M>{"\\frac00"}</M> és nem{" "}
              <M>{"\\frac{\\infty}{\\infty}"}</M> — a szabály feltétele sérül, és a folytonosság miatt készen is
              vagyunk: a határérték <strong>1</strong>, nem 2.
            </p>
          </>
        ),
      },
      {
        szoveg: (
          <>
            A számláló deriváltja <M>{"2x"}</M>, a nevezőé <M>{"1"}</M>.
          </>
        ),
      },
      {
        szoveg: (
          <>
            Tehát a keresett határérték <M>{"\\lim\\limits_{x\\to1}\\dfrac{2x}{1} = 2"}</M>.
          </>
        ),
      },
    ],
    tanulsag: (
      <p>
        A L&apos;Hospital-szabály <em>feltételes</em> eszköz. A behelyettesítés egy másodperc, és megóv attól, hogy
        szabályos levezetéssel hamis eredményt kapj. (Ráadásul a <M>{"\\frac fg \\to \\frac{f'}{g'}"}</M> átmenet nem
        a tört deriválása — a számlálót és a nevezőt <strong>külön</strong> deriváljuk.)
      </p>
    ),
  },
  {
    cim: "Stacionárius pont ≠ szélsőérték",
    feladat: (
      <p>
        Hol van az <M>{"f(x) = x^4 - 4x^3"}</M> függvénynek lokális szélsőértéke, és milyen típusú?
      </p>
    ),
    lepesek: [
      {
        szoveg: (
          <>
            <M>{"f'(x) = 4x^3-12x^2 = 4x^2(x-3)"}</M>, tehát a stacionárius helyek <M>{"x=0"}</M> és{" "}
            <M>{"x=3"}</M>.
          </>
        ),
      },
      {
        szoveg: (
          <>
            Mindkét stacionárius pontban szélsőérték van, hiszen ott a derivált nulla.
          </>
        ),
        hibas: true,
        javitas: (
          <>
            <p>
              Ez a félév klasszikus tévedése: <M>{"f'(x_0)=0"}</M> csak <strong>szükséges</strong> feltétel. Nézzük az{" "}
              <M>{"f' = 4x^2(x-3)"}</M> előjelét a 0 körül: <M>{"4x^2 \\ge 0"}</M> mindig, és{" "}
              <M>{"x-3 < 0"}</M> a 0 közelében — tehát a derivált a 0 <strong>mindkét oldalán negatív</strong>.
            </p>
            <p>
              Nincs előjelváltás, tehát a 0-ban <strong>nincs szélsőérték</strong>, csak egy vízszintes érintő (a
              függvény „megpihen”, majd tovább csökken). A másodrendű teszt itt nem is dönt:{" "}
              <M>{"f''(x) = 12x^2-24x"}</M>, és <M>{"f''(0) = 0"}</M>.
            </p>
            <p>
              Egyetlen szélsőérték van: az <M>{"x=3"}</M> helyen lokális minimum, <M>{"f(3) = 81-108 = -27"}</M>.
            </p>
          </>
        ),
      },
      {
        szoveg: (
          <>
            Az <M>{"x=3"}</M> helyen <M>{"f''(3) = 12\\cdot9 - 24\\cdot3 = 36 > 0"}</M>, tehát ott lokális minimum van,
            értéke <M>{"f(3) = -27"}</M>.
          </>
        ),
      },
      {
        szoveg: (
          <>
            Mivel a két szélsőérték felváltva következik, az <M>{"x=0"}</M> helyen lokális maximum van, értéke{" "}
            <M>{"f(0) = 0"}</M>.
          </>
        ),
      },
    ],
    tanulsag: (
      <p>
        Minden stacionárius pontnál <strong>külön</strong> el kell dönteni a típust: előjelváltás vagy második
        derivált. Ha a derivált gyöke <em>páros multiplicitású</em> (itt az <M>{"x^2"}</M> tényező), ott biztosan nincs
        előjelváltás — és így szélsőérték sem.
      </p>
    ),
  },
];
