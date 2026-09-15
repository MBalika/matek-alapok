import { M, MB } from "@/components/ui/Keplet";

/* A helyes válasz mindig a 0. index — a Kviz komponens keveri a sorrendet. */

export const KVIZ = [
  {
    k: (
      <>
        Mi dönti el, hogy egy képlettel megadott függvénynek mi az értelmezési tartománya?
      </>
    ),
    v: [
      <>
        A képletben szereplő <strong>tiltások</strong>: a nevező nem lehet nulla, a páros gyök alatt
        nemnegatív szám kell, a logaritmus argumentuma pozitív, az arkusz szinusz és koszinusz
        argumentuma pedig <M>{"[-1;\\ 1]"}</M>-beli.
      </>,
      <>Az, hogy hol értelmes a képlet — vagyis mindig az egész valós számegyenes.</>,
      <>
        Az, hogy hol vesz fel a függvény véges értéket; ahol a grafikon a végtelenbe szalad, ott a
        függvény nincs értelmezve.
      </>,
      <>
        Az értékkészlete: a <M>{"D_f"}</M> mindig ugyanaz a halmaz, mint az <M>{"R_f"}</M>, csak a
        másik tengelyen nézve.
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        Az értelmezési tartomány a <em>bemenetek</em> halmaza, és négy dolgot kell végignézni. Az{" "}
        <M>{"1/(x-1)"}</M> például a végtelenbe szalad az <M>{"x\\to1"}</M> határátmenetben, de az{" "}
        <M>{"1"}</M>-en kívül minden valós szám benne van a <M>{"D_f"}</M>-ben.
      </>
    ),
  },
  {
    k: <>Lehet egy függvény egyszerre páros és páratlan?</>,
    v: [
      <>
        Igen, de csak akkor, ha az értelmezési tartományán <strong>azonosan nulla</strong>.
      </>,
      <>Nem, ez logikai ellentmondás; egyetlen ilyen függvény sincs.</>,
      <>
        Igen, például a <M>{"\\cos x"}</M> ilyen, mert a grafikonja az y tengelyre és az origóra is
        szimmetrikus.
      </>,
      <>Igen, minden konstans függvény ilyen.</>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        Ha egyszerre <M>{"f(-x) = f(x)"}</M> és <M>{"f(-x) = -f(x)"}</M>, akkor{" "}
        <M>{"f(x) = -f(x)"}</M>, vagyis <M>{"2f(x) = 0"}</M>, tehát <M>{"f(x) = 0"}</M> minden{" "}
        <M>{"x"}</M>-re. A nem nulla konstans függvény páros, de nem páratlan.
      </>
    ),
  },
  {
    k: (
      <>
        Miért mondjuk, hogy az <M>{"f(x) = x^2"}</M> függvénynek <em>nincs</em> inverze?
      </>
    ),
    v: [
      <>
        Mert az egész <M>{"\\mathbb{R}"}</M>-en nem kölcsönösen egyértelmű:{" "}
        <M>{"f(2) = f(-2) = 4"}</M>, tehát a 4-hez nem lehet egyértelműen visszarendelni egy{" "}
        <M>{"x"}</M>-et. Leszűkítve (például <M>{"x\\ge0"}</M>-ra) már van inverze.
      </>,
      <>
        Mert a <M>{"\\sqrt{x}"}</M> csak a nemnegatív számokon értelmezett, az <M>{"x^2"}</M> viszont
        mindenhol.
      </>,
      <>Mert nem monoton, és csak monoton függvénynek lehet inverze — leszűkítve sem.</>,
      <>
        Mert az <M>{"x^2"}</M> páros függvény, márpedig páros függvénynek soha nincs inverze, még
        leszűkítve sem.
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        A döntő feltétel a <strong>kölcsönös egyértelműség</strong> — szemléletesen a vízszintes
        vonal-próba. A szigorú monotonitás elegendő, de nem szükséges: az <M>{"1/x"}</M> kölcsönösen
        egyértelmű a <M>{"\\mathbb{R}\\setminus\\{0\\}"}</M> halmazon, noha ott nem monoton.
      </>
    ),
  },
  {
    k: (
      <>
        Mennyi az <M>{"\\arcsin"}</M> értékkészlete, és hány értéket ad vissza egy adott számra?
      </>
    ),
    v: [
      <>
        Az értékkészlete <M>{"\\left[-\\frac{\\pi}{2};\\ \\frac{\\pi}{2}\\right]"}</M>, és mindig{" "}
        <strong>pontosan egy</strong> számot ad vissza.
      </>,
      <>
        Az értékkészlete <M>{"[0;\\ 2\\pi)"}</M>, és minden lehetséges megoldást visszaad{" "}
        <M>{"+2k\\pi"}</M> alakban.
      </>,
      <>
        Az értékkészlete <M>{"[-1;\\ 1]"}</M>, hiszen ez a szinusz értékkészlete is.
      </>,
      <>
        Az értékkészlete <M>{"[0;\\ \\pi]"}</M>, ugyanaz, mint az <M>{"\\arccos"}</M>-é.
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        Az arkuszfüggvény egy <em>függvény</em>: egy bemenethez egy kimenet. A{" "}
        <M>{"\\sin x = \\frac12"}</M> <strong>egyenletnek</strong> viszont végtelen sok megoldása van:{" "}
        <M>{"\\frac{\\pi}{6}+2k\\pi"}</M> és <M>{"\\frac{5\\pi}{6}+2k\\pi"}</M>. A kettőt ne keverd
        össze.
      </>
    ),
  },
  {
    k: (
      <>
        Igaz-e, hogy a <M>{"\\lim\\limits_{x\\to x_0} f(x)"}</M> létezéséhez szükséges, hogy az{" "}
        <M>{"f"}</M> értelmezve legyen az <M>{"x_0"}</M> helyen?
      </>
    ),
    v: [
      <>
        Nem. A definícióban a <M>{"0 < |x-x_0|"}</M> feltétel kifejezetten <strong>kizárja</strong> az{" "}
        <M>{"x = x_0"}</M> esetet — épp ezért van határértéke a <M>{"\\frac{\\sin x}{x}"}</M>{" "}
        függvénynek a 0-ban.
      </>,
      <>
        Igen, hiszen a határérték definíció szerint <M>{"f(x_0)"}</M>, csak más szóval.
      </>,
      <>
        Igen, különben a <M>{"|f(x)-A|"}</M> kifejezés értelmetlen lenne az <M>{"x_0"}</M> helyen.
      </>,
      <>
        Csak akkor, ha a függvény folytonos; nem folytonos függvénynél a határérték sosem létezik.
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        A határérték a <em>környezetről</em> szól, nem a pontról. Fordítva is igaz: attól, hogy{" "}
        <M>{"f(x_0)"}</M> létezik, még nem biztos, hogy egyenlő a határértékkel — ez épp a
        megszüntethető szakadás esete.
      </>
    ),
  },
  {
    k: (
      <>
        Az <M>{"f"}</M> bal oldali határértéke az <M>{"x_0"}</M> helyen <M>{"-1"}</M>, a jobb oldali{" "}
        <M>{"+1"}</M>. Mit mondhatunk?
      </>
    ),
    v: [
      <>
        Az <M>{"x_0"}</M> helyen <strong>nincs</strong> határérték, és ugrás (elsőfajú szakadás) van —
        akkor is, ha a függvény ott értelmezve van.
      </>,
      <>
        A határérték a kettő számtani közepe, vagyis <M>{"0"}</M>.
      </>,
      <>
        A határérték <M>{"+1"}</M>, mert mindig a jobb oldali határérték számít.
      </>,
      <>
        A függvénynek megszüntethető szakadása van, és az <M>{"f(x_0) := 0"}</M> átdefiniálással
        folytonossá tehető.
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        A határérték pontosan akkor létezik, ha a két egyoldali határérték létezik{" "}
        <strong>és egyenlő</strong>. Az <M>{"\\operatorname{sgn} x"}</M> a klasszikus példa: a 0-ban
        értelmezve van (az értéke 0), a határértéke mégsem létezik.
      </>
    ),
  },
  {
    k: (
      <>
        Van-e határértéke a <M>{"\\sin\\dfrac1x"}</M> függvénynek a 0 helyen?
      </>
    ),
    v: [
      <>
        Nincs. Az <M>{"x_n = \\frac{1}{n\\pi}"}</M> sorozat mentén a függvényérték végig 0, az{" "}
        <M>{"x_n' = \\frac{1}{\\frac{\\pi}{2}+2n\\pi}"}</M> mentén végig 1 — az átviteli elv szerint
        tehát nincs.
      </>,
      <>
        Van, mégpedig 0, mert a szinusz korlátos, és <M>{"\\frac1x"}</M> „kiátlagolódik”.
      </>,
      <>
        Van, mégpedig 1, mert <M>{"\\frac{\\sin t}{t}\\to1"}</M>.
      </>,
      <>
        Van, mégpedig <M>{"+\\infty"}</M>, mert az <M>{"\\frac1x"}</M> a végtelenbe tart.
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        Az átviteli elv a leggyorsabb <em>cáfoló</em> eszköz: elég két olyan sorozatot mutatni, amelyek
        mentén a függvényértékek különböző számokhoz tartanak. Vigyázz: az <M>{"x\\sin\\frac1x"}</M>{" "}
        határértéke már létezik (0), mert ott egy nullsorozat szorozza a korlátos tényezőt.
      </>
    ),
  },
  {
    k: (
      <>
        Mit mond ki Bolzano tételének gyökkeresésre vonatkozó következménye?
      </>
    ),
    v: [
      <>
        Ha <M>{"f"}</M> <strong>folytonos</strong> az <M>{"[a;\\,b]"}</M>-n <strong>és</strong>{" "}
        <M>{"f(a)"}</M>, <M>{"f(b)"}</M> ellentétes előjelű, akkor van gyök az intervallumban.
      </>,
      <>
        Ha <M>{"f(a)"}</M> és <M>{"f(b)"}</M> ellentétes előjelű, akkor van gyök — a folytonosság nem
        feltétel, csak kényelmes.
      </>,
      <>
        Ha <M>{"f"}</M> folytonos az <M>{"[a;\\,b]"}</M>-n, akkor van gyöke az intervallumban.
      </>,
      <>
        Ha <M>{"f"}</M> folytonos és ellentétes előjelű a végpontokon, akkor{" "}
        <strong>pontosan egy</strong> gyöke van.
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        Mindkét feltétel kell. Az <M>{"\\frac1x"}</M> a <M>{"[-1;\\,1]"}</M>-en előjelet vált, mégsincs
        gyöke — mert nem folytonos (nincs is értelmezve a 0-ban). És a tétel csak a gyök{" "}
        <em>létezését</em> állítja: az <M>{"x^3-x"}</M>-nek a <M>{"[-2;\\,2]"}</M>-n három gyöke van.
      </>
    ),
  },
  {
    k: (
      <>
        Weierstrass tétele szerint a folytonos függvény felveszi a maximumát. Melyik feltétel a
        kritikus?
      </>
    ),
    v: [
      <>
        Az intervallum <strong>zárt és korlátos</strong> volta. A nyílt <M>{"(0;\\,1)"}</M>-en az{" "}
        <M>{"f(x)=x"}</M> folytonos és korlátos, mégsincs maximuma.
      </>,
      <>
        Az, hogy a függvény monoton legyen — monotonitás nélkül a szélsőérték nem található meg.
      </>,
      <>
        Az, hogy a függvény korlátos legyen; ez nem következik a tétel többi feltételéből.
      </>,
      <>
        Az, hogy az intervallum nyílt legyen, különben a végpontokban a folytonosság nem értelmezhető.
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        A korlátosság a tétel <em>állítása</em>, nem a feltétele. A zártság garantálja, hogy a „szélek”
        elérhetők: a <M>{"(0;\\,1)"}</M>-en az <M>{"f(x)=x"}</M> minden 1-nél kisebb értéket felvesz, de
        az 1-et soha. A korlátosság is kell: <M>{"\\mathbb{R}"}</M>-en az <M>{"f(x)=x"}</M> nem korlátos.
      </>
    ),
  },
  {
    k: (
      <>
        Az <M>{"\\left(1+\\frac1x\\right)^{x}"}</M> alapja 1-hez tart. Mennyi a határértéke{" "}
        <M>{"x\\to\\infty"}</M> esetén?
      </>
    ),
    v: [
      <>
        <M>{"e \\approx 2{,}718"}</M> — az <M>{"1^{\\infty}"}</M> határozatlan alak, itt épp ez
        definiálja az <M>{"e"}</M> számot.
      </>,
      <>
        <M>{"1"}</M>, mert az alap 1-hez tart, és <M>{"1"}</M> bármelyik hatványa <M>{"1"}</M>.
      </>,
      <>
        <M>{"+\\infty"}</M>, mert a kitevő a végtelenbe tart, az alap pedig 1-nél nagyobb.
      </>,
      <>
        Nincs határértéke, mert az <M>{"1^{\\infty}"}</M> alak nem számolható ki.
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        „Határozatlan alak” nem azt jelenti, hogy nincs határérték, hanem azt, hogy az alak önmagában
        nem árulja el. Ugyanebből az alakból <M>{"\\left(1+\\frac{1}{x^2}\\right)^{x}\\to1"}</M> és{" "}
        <M>{"\\left(1+\\frac3x\\right)^{2x}\\to e^6"}</M> is kijöhet — mindig számold ki a külső kitevő
        határértékét.
      </>
    ),
  },
];

/* ==================== Hibakereső ==================== */

export const HIBAK = [
  {
    cim: "Értelmezési tartomány logaritmussal",
    feladat: (
      <>
        Add meg az <M>{"f(x) = \\dfrac{\\ln(x-2)}{\\sqrt{7-x}}"}</M> függvény értelmezési tartományát.
      </>
    ),
    lepesek: [
      {
        szoveg: (
          <>
            Két korlátozó elem van a képletben: a logaritmus a számlálóban és a gyök a nevezőben. Mindkettő
            feltételét fel kell írni, és a két halmaz metszetét kell venni.
          </>
        ),
      },
      {
        szoveg: (
          <>
            A logaritmus argumentumának <strong>nemnegatívnak</strong> kell lennie:{" "}
            <M>{"x-2 \\ge 0"}</M>, tehát <M>{"x \\ge 2"}</M>.
          </>
        ),
        hibas: true,
        javitas: (
          <>
            A logaritmus argumentuma <strong>szigorúan pozitív</strong> kell legyen, nem csak
            nemnegatív: <M>{"x-2 > 0"}</M>, tehát <M>{"x > 2"}</M>. Az <M>{"\\ln 0"}</M> nem értelmezett
            (a logaritmus a 0-ban <M>{"-\\infty"}</M>-hez tart). A helyes végeredmény:
            <MB>{"D_f = (2;\\ 7)"}</MB>
            A 2 tehát <em>nincs</em> benne, és a 7 sem — az utóbbi azért, mert a gyök a nevezőben áll.
          </>
        ),
      },
      {
        szoveg: (
          <>
            A gyök a nevezőben van, ezért a gyök alatt <strong>szigorúan pozitív</strong> szám kell:{" "}
            <M>{"7-x > 0"}</M>, tehát <M>{"x < 7"}</M>.
          </>
        ),
      },
      {
        szoveg: (
          <>
            A két feltétel metszete: <M>{"2 \\le x < 7"}</M>, vagyis{" "}
            <M>{"D_f = [2;\\ 7)"}</M>.
          </>
        ),
      },
    ],
    tanulsag: (
      <>
        A négy tiltás közül a logaritmusé a leggyakrabban elrontott: ott <strong>szigorú</strong>{" "}
        egyenlőtlenség van, a páros gyöknél viszont megengedett a 0 — kivéve, ha a gyök nevezőben áll,
        mert akkor a nevező-tiltás is életbe lép.
      </>
    ),
  },
  {
    cim: "Inverz függvény keresése",
    feladat: (
      <>
        Add meg az <M>{"f(x) = \\dfrac{3}{2+x}"}</M> függvény inverzét, az értelmezési tartományával
        együtt.
      </>
    ),
    lepesek: [
      {
        szoveg: (
          <>
            Az <M>{"f"}</M> kölcsönösen egyértelmű a <M>{"D_f = \\mathbb{R}\\setminus\\{-2\\}"}</M>{" "}
            halmazon, tehát van inverze. Írjuk fel az <M>{"y = \\dfrac{3}{2+x}"}</M> egyenletet.
          </>
        ),
      },
      {
        szoveg: (
          <>
            Az inverz definíció szerint a függvény <strong>reciproka</strong>, tehát{" "}
            <M>{"f^{-1}(x) = \\dfrac{2+x}{3}"}</M>.
          </>
        ),
        hibas: true,
        javitas: (
          <>
            Az <M>{"f^{-1}"}</M> jelölés <strong>nem</strong> reciprokot jelent! Az inverz az a
            függvény, amely „visszafejti” az <M>{"f"}</M>-et. Ki kell fejezni <M>{"x"}</M>-et:
            <MB>{"y(2+x) = 3 \\ \\Longrightarrow\\ 2y + xy = 3 \\ \\Longrightarrow\\ x = \\frac{3-2y}{y}"}</MB>
            <MB>{"f^{-1}(x) = \\frac{3-2x}{x},\\qquad D_{f^{-1}} = \\mathbb{R}\\setminus\\{0\\}"}</MB>
            Ellenőrzés: <M>{"f(1) = 1"}</M> és <M>{"f^{-1}(1) = 1"}</M> ✓
          </>
        ),
      },
      {
        szoveg: (
          <>
            Az így kapott <M>{"\\dfrac{2+x}{3}"}</M> képlet minden valós számra értelmes, tehát{" "}
            <M>{"D_{f^{-1}} = \\mathbb{R}"}</M> és <M>{"R_{f^{-1}} = \\mathbb{R}"}</M>.
          </>
        ),
      },
      {
        szoveg: (
          <>
            Ellenőrzésképp: <M>{"f(1) = \\dfrac33 = 1"}</M>, és a kapott képletbe 1-et helyettesítve{" "}
            <M>{"\\dfrac{2+1}{3} = 1"}</M> — stimmel.
          </>
        ),
      },
    ],
    tanulsag: (
      <>
        A véletlenül egyező ellenőrzés a legalattomosabb: az <M>{"x = 1"}</M> történetesen fixpont, ezért
        a hibás képlet is „átmegy” rajta. Ellenőrizz mindig <strong>másik</strong> ponttal is:{" "}
        <M>{"f(4) = 0{,}5"}</M>, és a helyes inverz szerint <M>{"f^{-1}(0{,}5) = 4"}</M>, a reciprok
        szerint viszont <M>{"2{,}5"}</M> jönne ki.
      </>
    ),
  },
  {
    cim: "Határérték 0/0 alakban",
    feladat: (
      <>
        Számítsd ki: <M>{"\\lim\\limits_{x\\to 3}\\dfrac{x^2-9}{x^2-4x+3}"}</M>.
      </>
    ),
    lepesek: [
      {
        szoveg: (
          <>
            Helyettesítsünk be: a számláló <M>{"9-9 = 0"}</M>, a nevező <M>{"9-12+3 = 0"}</M>. Tehát{" "}
            <M>{"\\frac00"}</M> alakú a kifejezés.
          </>
        ),
      },
      {
        szoveg: (
          <>
            Mivel a behelyettesítés <M>{"\\frac00"}</M>-t adott, a hányadosnak{" "}
            <strong>nincs határértéke</strong> a 3 helyen — a nullával való osztás értelmetlen.
          </>
        ),
        hibas: true,
        javitas: (
          <>
            A <M>{"\\frac00"}</M> nem eredmény, hanem <strong>határozatlan alak</strong>: annyit jelent,
            hogy még dolgozni kell. A recept: szorzattá alakítás és egyszerűsítés (ez jogos, mert a
            határértéknél <M>{"x \\ne 3"}</M>):
            <MB>{"\\frac{x^2-9}{x^2-4x+3} = \\frac{(x-3)(x+3)}{(x-3)(x-1)} = \\frac{x+3}{x-1} \\longrightarrow \\frac{6}{2} = 3"}</MB>
          </>
        ),
      },
      {
        szoveg: (
          <>
            Ebből következően a grafikonon az <M>{"x = 3"}</M> helyen függőleges aszimptota van, a
            függvény ott a végtelenbe szalad.
          </>
        ),
      },
      {
        szoveg: (
          <>
            A válasz tehát: a határérték nem létezik, a <M>{"3"}</M> helyen másodfajú (pólus jellegű)
            szakadás van.
          </>
        ),
      },
    ],
    tanulsag: (
      <>
        Egy gyors számpróba azonnal leleplezi a hibát: <M>{"x = 2{,}9"}</M>-nél a hányados{" "}
        <M>{"\\approx 3{,}105"}</M>, <M>{"x = 3{,}1"}</M>-nél <M>{"\\approx 2{,}905"}</M> — semmi jele
        annak, hogy elszaladna. A <M>{"\\frac00"}</M> alak éppúgy adhat véges számot, mint{" "}
        <M>{"\\pm\\infty"}</M>-t vagy semmit; az alak önmagában nem árul el semmit.
      </>
    ),
  },
  {
    cim: "Trigonometrikus egyenlet arkusszal",
    feladat: (
      <>
        Oldd meg a valós számok halmazán: <M>{"\\sin x = \\dfrac{\\sqrt3}{2}"}</M>.
      </>
    ),
    lepesek: [
      {
        szoveg: (
          <>
            Az alapmegoldás az arkusz szinusszal kapható:{" "}
            <M>{"\\arcsin\\dfrac{\\sqrt3}{2} = \\dfrac{\\pi}{3}"}</M>.
          </>
        ),
      },
      {
        szoveg: (
          <>
            A szinusz <M>{"2\\pi"}</M> szerint periodikus, ezért a megoldáshalmaz{" "}
            <M>{"x = \\dfrac{\\pi}{3}+2k\\pi"}</M>, és <strong>több megoldás nincs</strong>, hiszen az
            arkusz szinusz minden lehetséges értéket megad.
          </>
        ),
        hibas: true,
        javitas: (
          <>
            Az arkusz szinusz <strong>egyetlen</strong> számot ad vissza (a főágból), nem az összes
            megoldást. A szinusz a <M>{"\\pi - x"}</M> helyen ugyanazt az értéket veszi fel, ezért van
            egy második megoldássereg is:
            <MB>{"x = \\frac{\\pi}{3}+2k\\pi \\qquad \\text{vagy} \\qquad x = \\pi - \\frac{\\pi}{3}+2k\\pi = \\frac{2\\pi}{3}+2k\\pi"}</MB>
            Ellenőrzés: <M>{"\\sin\\frac{2\\pi}{3} = \\frac{\\sqrt3}{2}"}</M> ✓
          </>
        ),
      },
      {
        szoveg: (
          <>
            A <M>{"[0;\\,2\\pi)"}</M> intervallumon tehát az <M>{"x = 60^\\circ"}</M> az egyetlen
            megoldás.
          </>
        ),
      },
      {
        szoveg: (
          <>
            Végül: tangenses egyenletnél <M>{"+k\\pi"}</M>-t írnánk, mert a tangens alapperiódusa{" "}
            <M>{"\\pi"}</M>, nem <M>{"2\\pi"}</M>.
          </>
        ),
      },
    ],
    tanulsag: (
      <>
        Az <strong>arkuszfüggvény</strong> és a <strong>trigonometrikus egyenlet</strong> két különböző
        dolog. A szinuszos egyenletnél mindig két megoldássereg van (<M>{"x_0"}</M> és{" "}
        <M>{"\\pi-x_0"}</M>), a koszinuszosnál <M>{"\\pm x_0"}</M>, a tangensesnél viszont csak egy,
        de <M>{"+k\\pi"}</M> lépésközzel.
      </>
    ),
  },
];
