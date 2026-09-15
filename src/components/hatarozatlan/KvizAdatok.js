import { M, MB } from "@/components/ui/Keplet";

/**
 * Fogalmi kvíz és hibakereső a Határozatlan integrál modulhoz.
 * A KVIZ-ben a helyes válasz mindig a 0. indexű — a komponens kikeveri őket.
 */

export const KVIZ = [
  {
    k: (
      <>
        Mit jelent pontosan a <M>{"+C"}</M> a határozatlan integrál eredményében?
      </>
    ),
    v: [
      <>
        Azt, hogy az eredmény nem egy függvény, hanem egy <strong>függvénysereg</strong>: egy intervallumon bármely két
        primitív függvény csak konstansban tér el.
      </>,
      <>Egy tetszőlegesen választható integrálási határt, amit a feladat szövege rögzít.</>,
      <>
        Egy hibatagot, amely a numerikus integrálás pontatlanságát fejezi ki.
      </>,
      <>
        A <M>{"C"}</M> mindig nulla, csak hagyományból írjuk ki.
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        <p>
          Ha <M>{"F'=f"}</M>, akkor <M>{"(F+C)'=f"}</M> is teljesül, tehát azonnal végtelen sok primitív függvényünk
          van. A Lagrange-középértéktétel következménye szerint <em>több nincs</em>: egy intervallumon két primitív
          függvény különbsége olyan függvény, amelynek a deriváltja azonosan nulla, tehát konstans.
        </p>
        <p className="mt-2">
          Határozott integrálnál a konstans kiesik a kivonáskor — ott nem kell kiírni. Határozatlannál viszont a
          lefelejtése a leggyakoribb pontlevonás.
        </p>
      </>
    ),
  },
  {
    k: <>Igaz-e, hogy egy szorzat integrálja az integrálok szorzata?</>,
    v: [
      <>
        Nem, és ez a leggyakoribb kezdő hiba. Ellenpélda: <M>{"\\int x\\cdot x\\,dx = \\frac{x^3}{3}"}</M>, de{" "}
        <M>{"\\left(\\int x\\,dx\\right)^2 = \\frac{x^4}{4}"}</M>.
      </>,
      <>
        Igen, ugyanúgy, ahogy a deriválásnál is <M>{"(fg)' = f'g'"}</M>.
      </>,
      <>Igen, de csak akkor, ha mindkét tényező folytonos.</>,
      <>Igen, de az eredményhez hozzá kell adni egy korrekciós tagot.</>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        <p>
          Sem az integrálásra, sem a deriválásra nincs „szorzatszabály” ilyen alakban (a deriválásnál is{" "}
          <M>{"(fg)' = f'g+fg'"}</M>). Szorzat integrálásához <strong>parciális integrálás</strong> vagy{" "}
          <strong>helyettesítés</strong> kell — és az sem szabály, csak átalakítás.
        </p>
        <p className="mt-2">
          Ugyanígy hamis a hányadosra vonatkozó „szabály” is: törtnél vagy <M>{"\\frac{f'}{f}"}</M> alakot keresünk,
          vagy parciális törtekre bontunk.
        </p>
      </>
    ),
  },
  {
    k: (
      <>
        Miért <M>{"\\ln\\left|x\\right|"}</M> és nem <M>{"\\ln x"}</M> szerepel az{" "}
        <M>{"\\int \\frac{dx}{x}"}</M> eredményében?
      </>
    ),
    v: [
      <>
        Mert az <M>{"\\frac1x"}</M> negatív <M>{"x"}</M>-re is értelmes, és ott{" "}
        <M>{"\\left(\\ln(-x)\\right)' = \\frac1x"}</M> — a két ágat fogja össze az abszolút érték.
      </>,
      <>
        Mert az <M>{"\\ln"}</M> értéke negatív is lehet, és ezt kell megszüntetni.
      </>,
      <>
        Mert az abszolút érték nélkül az eredmény nem lenne folytonos a <M>{"0"}</M>-ban.
      </>,
      <>
        Csak megszokás: az <M>{"\\ln x"}</M> is teljesen helyes válasz.
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        <p>
          A <M>{"0"}</M> mindkét oldalán van primitív függvény. A negatív ágon a láncszabállyal{" "}
          <M>{"\\left(\\ln(-x)\\right)' = \\frac{1}{-x}\\cdot(-1) = \\frac1x"}</M>, a pozitív ágon{" "}
          <M>{"\\ln x"}</M> — a két képletet fogja össze az <M>{"\\ln\\left|x\\right|"}</M> írásmód.
        </p>
        <p className="mt-2">
          Szigorúan véve a két ágon <strong>független</strong> konstans választható, mert a{" "}
          <M>{"0"}</M> szétvágja az értelmezési tartományt: a „két primitív függvény konstansban tér el” tétel csak{" "}
          <em>intervallumon</em> érvényes.
        </p>
      </>
    ),
  },
  {
    k: (
      <>
        Miért van külön sora az <M>{"\\int x^{n}dx = \\frac{x^{n+1}}{n+1}"}</M> szabály alól az{" "}
        <M>{"n=-1"}</M> esetnek?
      </>
    ),
    v: [
      <>
        Mert <M>{"n=-1"}</M> esetén a képlet nullával osztana — ezért lép a helyére a logaritmus.
      </>,
      <>
        Mert az <M>{"x^{-1}"}</M> nem differenciálható, így nincs primitív függvénye.
      </>,
      <>
        Mert negatív kitevőre a hatványszabály általában sem igaz (pl. <M>{"n=-3"}</M> esetén sem).
      </>,
      <>
        Mert a <M>{"+C"}</M> ilyenkor nem szabadon választható.
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        <p>
          A kitevőt eggyel emelve <M>{"n+1=0"}</M> adódna, és <M>{"\\frac{x^0}{0}"}</M> értelmetlen. Minden más
          kitevőre a szabály működik, <strong>nem csak egészekre</strong>:
        </p>
        <MB>{"\\int \\sqrt x\\,dx = \\frac{x^{3/2}}{3/2}+C, \\qquad \\int \\frac{dx}{x^3} = \\frac{x^{-2}}{-2}+C"}</MB>
      </>
    ),
  },
  {
    k: (
      <>
        Az <M>{"\\int x\\ln x\\,dx"}</M> parciális integrálásánál melyik tényezőt válasszuk{" "}
        <M>{"u"}</M>-nak (amit deriválunk)?
      </>
    ),
    v: [
      <>
        Az <M>{"\\ln x"}</M>-et, mert deriválva <M>{"\\frac1x"}</M> lesz belőle: racionális függvénnyé szelídül.
      </>,
      <>
        Az <M>{"x"}</M>-et, mert a polinomot mindig deriválni szoktuk.
      </>,
      <>Mindegy, mert a két választás ugyanoda vezet.</>,
      <>
        Egyiket sem: a <M>{"v'=1"}</M> választás a helyes, ahogy az <M>{"\\int \\ln x\\,dx"}</M> esetében.
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        <p>
          A szabály nem az, hogy „a polinomot deriváljuk”, hanem hogy <strong>azt deriváljuk, ami egyszerűsödik</strong>
          . A logaritmus és az arkuszfüggvények deriválva racionálissá válnak, <em>integrálva</em> viszont
          kellemetlenek — ezért ők mindig <M>{"u"}</M>-k.
        </p>
        <MB>{"\\int x\\ln x\\,dx = \\frac{x^2}{2}\\ln x - \\frac12\\int x\\,dx = \\frac{x^2}{2}\\ln x-\\frac{x^2}{4}+C"}</MB>
        <p>
          Ha az <M>{"x"}</M>-et választanád <M>{"u"}</M>-nak, a <M>{"v"}</M> felírásához előbb ki kellene számolni az{" "}
          <M>{"\\int \\ln x\\,dx"}</M>-et — vagyis egy nehezebb feladatot.
        </p>
      </>
    ),
  },
  {
    k: (
      <>
        Melyik integrál <strong>nem</strong> oldható meg közvetlenül az <M>{"\\frac{f'}{f}"}</M> mintával?
      </>
    ),
    v: [
      <>
        <M>{"\\int \\frac{dx}{x^2+9}"}</M>
      </>,
      <>
        <M>{"\\int \\frac{2x+3}{x^2+3x+7}\\,dx"}</M>
      </>,
      <>
        <M>{"\\int \\operatorname{tg} x\\,dx"}</M>
      </>,
      <>
        <M>{"\\int \\frac{dx}{x\\ln x}"}</M>
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        <p>
          A minta akkor működik, ha a <strong>számláló a nevező deriváltjának konstansszorosa</strong>. Az{" "}
          <M>{"x^2+9"}</M> deriváltja <M>{"2x"}</M>, a számlálóban viszont <M>{"1"}</M> áll — és az{" "}
          <M>{"1"}</M> nem konstansszorosa <M>{"2x"}</M>-nek (mert <M>{"x"}</M>-től függ). Itt a helyes út a{" "}
          <M>{"9"}</M> kiemelése:
        </p>
        <MB>{"\\int \\frac{dx}{x^2+9} = \\frac13\\operatorname{arctg}\\frac{x}{3}+C"}</MB>
        <p>
          A másik háromnál a számláló tényleg a nevező deriváltja (a harmadiknál egy mínusz, a negyediknél egy
          átrendezés után).
        </p>
      </>
    ),
  },
  {
    k: (
      <>
        A <M>{"t = h(x)"}</M> helyettesítésnél mi történik a <M>{"dx"}</M>-szel?
      </>
    ),
    v: [
      <>
        Át kell írni: <M>{"dt = h'(x)\\,dx"}</M>, és az így keletkező szorzó ott marad az integrálban.
      </>,
      <>
        Semmi, a <M>{"dx"}</M> csak jelölés, változatlanul átmásolható <M>{"dt"}</M>-re.
      </>,
      <>
        Csak akkor kell átírni, ha a helyettesítés nem lineáris.
      </>,
      <>
        A <M>{"dx"}</M> helyére mindig <M>{"\\frac{dt}{t}"}</M> kerül.
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        <p>
          Ez a fejezet leggyakoribb hibája. Ha <M>{"x=t^2"}</M>, akkor <M>{"dx = 2t\\,dt"}</M> — és ez a{" "}
          <M>{"2t"}</M> szorzó nem tűnhet el. Ellenőrzési fogás: a helyettesítés után{" "}
          <strong>egyetlen <M>{"x"}</M> sem maradhat</strong> az integrálban, sem az integrandusban, sem a
          differenciálban.
        </p>
        <p className="mt-2">
          A végén pedig <strong>vissza kell helyettesíteni</strong>: a <M>{"2e^t+C"}</M> nem válasz, csak félkész
          munka.
        </p>
      </>
    ),
  },
  {
    k: (
      <>
        Mit kell tenni először az <M>{"\\int \\frac{x^3}{x^2-1}\\,dx"}</M> integrálnál?
      </>
    ),
    v: [
      <>
        Polinomosztást, mert a számláló foka nagyobb a nevezőénél — parciális törtekre csak valódi tört bontható.
      </>,
      <>
        Rögtön parciális törtekre bontani: <M>{"\\frac{A}{x-1}+\\frac{B}{x+1}"}</M>.
      </>,
      <>
        Teljes négyzetté alakítani a nevezőt.
      </>,
      <>
        Parciálisan integrálni, mert a számlálóban polinom áll.
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        <p>
          Áltörtnél a parciális törtekre bontás <strong>ellentmondó</strong> egyenletrendszert ad. Előbb osztani kell:
        </p>
        <MB>{"\\frac{x^3}{x^2-1} = x + \\frac{x}{x^2-1} \\quad\\Longrightarrow\\quad \\int = \\frac{x^2}{2}+\\frac12\\ln\\left|x^2-1\\right|+C"}</MB>
        <p>
          A maradék tag itt ráadásul <M>{"\\frac{f'}{f}"}</M> típusú, tehát a bontásra nem is volt szükség.
        </p>
      </>
    ),
  },
  {
    k: <>Hogyan lehet biztosan eldönteni, hogy egy integrálási eredmény helyes-e?</>,
    v: [
      <>
        Deriváljuk vissza: ha az integrandust kapjuk, az eredmény biztosan jó.
      </>,
      <>
        Sehogy — csak a megoldókulccsal való összehasonlítás segít.
      </>,
      <>
        Ha az eredmény alakja hasonlít a táblázat egy sorára, akkor jó.
      </>,
      <>
        Behelyettesítünk egyetlen <M>{"x"}</M>-et, és megnézzük, kijön-e ugyanaz a szám.
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        <p>
          Ez a téma legnagyobb ajándéka: az integrálás ellenőrzése <strong>mechanikus</strong>, mert a deriválásra van
          recept. Egyetlen <M>{"x"}</M> behelyettesítése nem elég, hiszen a primitív függvény amúgy is csak konstans
          erejéig meghatározott.
        </p>
        <p className="mt-2">
          Zárthelyin ezt mindig érdemes megcsinálni: általában gyorsabb, mint maga az integrálás, és a leggyakoribb
          hibákat (elmaradt láncszabály-szorzó, rossz előjel) azonnal megmutatja.
        </p>
      </>
    ),
  },
  {
    k: (
      <>
        Létezik-e az <M>{"e^{-x^2}"}</M> függvénynek primitív függvénye?
      </>
    ),
    v: [
      <>
        Létezik (mert folytonos), de nem fejezhető ki véges sok elemi függvénnyel.
      </>,
      <>
        Nem létezik, mert nem sikerült megtalálni.
      </>,
      <>
        Létezik, és parciális integrálással két lépésben megkapható.
      </>,
      <>
        Csak a <M>{"[0;\\,\\infty)"}</M> félegyenesen létezik.
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        <p>
          Minden intervallumon folytonos függvénynek <strong>van</strong> primitív függvénye — ez tétel. A{" "}
          <em>létezés</em> azonban nem jelenti azt, hogy fel is tudjuk írni a szokásos elemi függvényekkel. Az{" "}
          <M>{"e^{-x^2}"}</M>, a <M>{"\\frac{\\sin x}{x}"}</M> és a <M>{"\\sqrt{1+x^4}"}</M> mind ilyen — és ez
          bizonyított tény, nem a mi ügyetlenségünk.
        </p>
        <p className="mt-2">
          Ilyenkor a mérnök <strong>numerikusan</strong> integrál (trapéz-, Simpson-szabály) — erről a 8. modulban lesz
          szó.
        </p>
      </>
    ),
  },
];

export const HIBAK = [
  {
    cim: "Eltűnt a láncszabály szorzója",
    feladat: (
      <p>
        Számítsd ki: <M>{"\\int \\left(\\cos 3x + x\\right)dx"}</M>, majd add meg a primitív függvény értékét az{" "}
        <M>{"x=\\frac{\\pi}{6}"}</M> helyen (a <M>{"C=0"}</M> választással).
      </p>
    ),
    lepesek: [
      {
        szoveg: (
          <>
            A koszinusz primitív függvénye a szinusz, tehát <M>{"\\int \\cos 3x\\,dx = \\sin 3x"}</M>.
          </>
        ),
        hibas: true,
        javitas: (
          <>
            <p>
              A belső függvény <M>{"3x"}</M>, nem <M>{"x"}</M>. A szabály{" "}
              <M>{"\\int f(ax+b)\\,dx = \\frac1a F(ax+b)+C"}</M>, tehát osztani kell 3-mal:
            </p>
            <MB>{"\\int \\cos 3x\\,dx = \\frac{\\sin 3x}{3}+C"}</MB>
            <p>
              Ellenőrzés: <M>{"\\left(\\frac{\\sin 3x}{3}\\right)' = \\frac{3\\cos 3x}{3} = \\cos 3x"}</M> ✓ — míg a
              hibás alaknál <M>{"\\left(\\sin 3x\\right)' = 3\\cos 3x"}</M>, vagyis háromszor annyi.
            </p>
          </>
        ),
      },
      {
        szoveg: (
          <>
            A második tag a hatványszabályból: <M>{"\\int x\\,dx = \\frac{x^2}{2}"}</M>.
          </>
        ),
      },
      {
        szoveg: (
          <>
            A linearitás miatt tagonként adhatjuk össze:{" "}
            <M>{"F(x) = \\sin 3x + \\frac{x^2}{2}"}</M>.
          </>
        ),
      },
      {
        szoveg: (
          <>
            Behelyettesítve: <M>{"F\\left(\\frac{\\pi}{6}\\right) = \\sin\\frac{\\pi}{2}+\\frac{\\pi^2}{72} = 1+0{,}137 = 1{,}137"}</M>.
          </>
        ),
      },
    ],
    tanulsag: (
      <p>
        Ha egy alapfüggvény argumentuma nem egyszerűen <M>{"x"}</M>, akkor <strong>mindig</strong> jár az{" "}
        <M>{"\\frac1a"}</M> szorzó. A helyes eredmény{" "}
        <M>{"F(x) = \\frac{\\sin 3x}{3}+\\frac{x^2}{2}"}</M>, és{" "}
        <M>{"F\\left(\\frac{\\pi}{6}\\right) = \\frac13+0{,}137 = 0{,}470"}</M>. Egy visszaderiválás azonnal
        leleplezte volna a hibát.
      </p>
    ),
  },
  {
    cim: "Logaritmus arkusz tangens helyett",
    feladat: (
      <p>
        Számítsd ki: <M>{"\\int \\frac{dx}{x^2+9}"}</M>, majd add meg az <M>{"F(3)-F(0)"}</M> különbséget.
      </p>
    ),
    lepesek: [
      {
        szoveg: (
          <>
            A nevező deriváltja <M>{"2x"}</M>, a számlálóban viszont <M>{"1"}</M> áll — a számláló tehát nem
            konstansszorosa a nevező deriváltjának.
          </>
        ),
      },
      {
        szoveg: (
          <>
            Tört integrálásakor mindig logaritmus keletkezik a nevezőből, tehát{" "}
            <M>{"\\int \\frac{dx}{x^2+9} = \\ln\\left(x^2+9\\right)+C"}</M>.
          </>
        ),
        hibas: true,
        javitas: (
          <>
            <p>
              Ez hamis: logaritmus <strong>csak</strong> az <M>{"\\frac{f'}{f}"}</M> alaknál keletkezik. Itt a
              nevezőből kiemeljük a 9-et, hogy <M>{"1+u^2"}</M> álljon ott:
            </p>
            <MB>{"\\int \\frac{dx}{9\\left(1+\\left(\\frac x3\\right)^2\\right)} = \\frac19\\cdot 3\\operatorname{arctg}\\frac x3+C = \\frac13\\operatorname{arctg}\\frac x3+C"}</MB>
            <p>
              Ellenőrzés: <M>{"\\left(\\ln\\left(x^2+9\\right)\\right)' = \\frac{2x}{x^2+9}"}</M> — ez nyilvánvalóan
              nem az integrandus.
            </p>
          </>
        ),
      },
      {
        szoveg: (
          <>
            <M>{"F(3) = \\ln 18 \\approx 2{,}890"}</M> és <M>{"F(0) = \\ln 9 \\approx 2{,}197"}</M>.
          </>
        ),
      },
      {
        szoveg: (
          <>
            A különbség tehát <M>{"F(3)-F(0) = \\ln 2 \\approx 0{,}693"}</M>.
          </>
        ),
      },
    ],
    tanulsag: (
      <p>
        „Tört a nevezőben” önmagában semmit nem jelent. Az <M>{"\\frac{f'}{f}"}</M> mintát <em>ellenőrizni</em> kell; ha
        nem teljesül, és a nevező valós gyök nélküli másodfokú, akkor <strong>arkusz tangens</strong> jön. A helyes
        érték <M>{"\\frac13\\operatorname{arctg} 1 = \\frac{\\pi}{12} \\approx 0{,}262"}</M>.
      </p>
    ),
  },
  {
    cim: "Rossz előjel a parciális integrálásban",
    feladat: (
      <p>
        Számítsd ki parciális integrálással: <M>{"\\int x\\cos x\\,dx"}</M>.
      </p>
    ),
    lepesek: [
      {
        szoveg: (
          <>
            Szereposztás: <M>{"u = x"}</M> és <M>{"v' = \\cos x"}</M>, tehát <M>{"u' = 1"}</M> és{" "}
            <M>{"v = \\sin x"}</M>.
          </>
        ),
      },
      {
        szoveg: (
          <>
            A parciális integrálás képlete <M>{"\\int uv'\\,dx = uv + \\int u'v\\,dx"}</M>, tehát{" "}
            <M>{"\\int x\\cos x\\,dx = x\\sin x + \\int \\sin x\\,dx"}</M>.
          </>
        ),
        hibas: true,
        javitas: (
          <>
            <p>
              A képletben <strong>mínusz</strong> áll, nem plusz:
            </p>
            <MB>{"\\int u\\,v'\\,dx = u\\,v - \\int u'\\,v\\,dx"}</MB>
            <p>
              Ez közvetlenül a szorzatszabályból jön: <M>{"(uv)' = u'v+uv'"}</M> integrálásakor{" "}
              <M>{"uv = \\int u'v + \\int uv'"}</M>, és innen az <M>{"\\int u'v"}</M> tagot{" "}
              <em>át kell vinni</em> a másik oldalra. Helyesen:
            </p>
            <MB>{"\\int x\\cos x\\,dx = x\\sin x - \\int \\sin x\\,dx = x\\sin x+\\cos x+C"}</MB>
          </>
        ),
      },
      {
        szoveg: (
          <>
            A maradék integrál alapintegrál: <M>{"\\int \\sin x\\,dx = -\\cos x"}</M>.
          </>
        ),
      },
      {
        szoveg: (
          <>
            Összerakva: <M>{"\\int x\\cos x\\,dx = x\\sin x - \\cos x + C"}</M>.
          </>
        ),
      },
    ],
    tanulsag: (
      <p>
        A mínusz jel nem díszítés. Gyors ellenőrzés a hibás eredményre:{" "}
        <M>{"\\left(x\\sin x-\\cos x\\right)' = \\sin x + x\\cos x + \\sin x = x\\cos x + 2\\sin x"}</M> — nem az
        integrandus. A helyes eredményre viszont{" "}
        <M>{"\\left(x\\sin x+\\cos x\\right)' = \\sin x+x\\cos x-\\sin x = x\\cos x"}</M> ✓
      </p>
    ),
  },
  {
    cim: "A dx nem lett átírva",
    feladat: (
      <p>
        Számítsd ki helyettesítéssel: <M>{"\\int x\\,e^{x^2}\\,dx"}</M>.
      </p>
    ),
    lepesek: [
      {
        szoveg: (
          <>
            A kényelmetlen rész a kitevőben álló <M>{"x^2"}</M>, ezért legyen <M>{"t = x^2"}</M>.
          </>
        ),
      },
      {
        szoveg: (
          <>
            Behelyettesítve az integrandus <M>{"e^t"}</M> lesz, tehát{" "}
            <M>{"\\int x\\,e^{x^2}dx = \\int e^t\\,dt = e^t"}</M>.
          </>
        ),
        hibas: true,
        javitas: (
          <>
            <p>
              A <M>{"dx"}</M> nem maradhat változatlanul, és az <M>{"x"}</M> szorzó sem tűnhet el csak úgy. A{" "}
              <M>{"t=x^2"}</M> helyettesítésből
            </p>
            <MB>{"dt = 2x\\,dx \\qquad\\Longrightarrow\\qquad x\\,dx = \\frac{dt}{2}"}</MB>
            <p>
              vagyis éppen az <M>{"x"}</M> szorzó „nyelődik el” a differenciálban:
            </p>
            <MB>{"\\int x\\,e^{x^2}dx = \\frac12\\int e^t\\,dt = \\frac12 e^t+C"}</MB>
          </>
        ),
      },
      {
        szoveg: (
          <>
            Visszahelyettesítve <M>{"t = x^2"}</M>: az eredmény <M>{"e^{x^2}+C"}</M>.
          </>
        ),
      },
      {
        szoveg: (
          <>
            A primitív függvény értéke <M>{"x=1"}</M>-nél tehát <M>{"e \\approx 2{,}718"}</M>.
          </>
        ),
      },
    ],
    tanulsag: (
      <p>
        Két fogás védi meg ettől a hibától. (1) A helyettesítés után <strong>egyetlen <M>{"x"}</M> sem maradhat</strong>{" "}
        az integrálban — itt az <M>{"x"}</M> szorzót a <M>{"dt=2x\\,dx"}</M> nyeli el. (2) Deriválj vissza:{" "}
        <M>{"\\left(e^{x^2}\\right)' = 2x\\,e^{x^2}"}</M>, ami kétszerese az integrandusnak. A helyes eredmény{" "}
        <M>{"\\frac12 e^{x^2}+C"}</M>, értéke <M>{"x=1"}</M>-nél <M>{"\\frac{e}{2}\\approx 1{,}359"}</M>.
      </p>
    ),
  },
];
