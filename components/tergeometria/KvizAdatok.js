import { M } from "@/components/ui/Keplet";

/* ---------- Fogalmi kvíz ---------- */

export const KVIZ = [
  {
    k: (
      <>
        Mi az <M>{"\\mathbf{a}\\cdot\\mathbf{b}"}</M> skaláris szorzat eredménye?
      </>
    ),
    v: [
      <>Egy szám.</>,
      <>Egy vektor, amely merőleges mindkettőre.</>,
      <>Egy vektor, amely az <M>{"\\mathbf{a}"}</M> irányába mutat.</>,
      <>Egy szám, de csak akkor, ha a két vektor merőleges.</>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        A skaláris szorzat neve is ezt mondja: az eredmény <strong>skalár</strong>, azaz szám. Ha egy megoldásban{" "}
        <M>{"\\mathbf{a}\\cdot\\mathbf{b} = (2;\\,3;\\,1)"}</M> szerepel, az azonnal hibás — ahogy a{" "}
        <M>{"\\mathbf{a}\\times\\mathbf{b} = 7"}</M> is. Ez a modul leggyakoribb hibája.
      </>
    ),
  },
  {
    k: (
      <>
        Ha <M>{"\\mathbf{a}\\times\\mathbf{b} = (2;\\,-1;\\,3)"}</M>, mennyi <M>{"\\mathbf{b}\\times\\mathbf{a}"}</M>?
      </>
    ),
    v: [
      <>
        <M>{"(-2;\\,1;\\,-3)"}</M>
      </>,
      <>
        <M>{"(2;\\,-1;\\,3)"}</M>
      </>,
      <>
        <M>{"(3;\\,-1;\\,2)"}</M>
      </>,
      <>Nem határozható meg ennyi adatból.</>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        A vektoriális szorzat <strong>antikommutatív</strong>:{" "}
        <M>{"\\mathbf{b}\\times\\mathbf{a} = -(\\mathbf{a}\\times\\mathbf{b})"}</M>. Ugyanaz az egyenes, ellentétes
        irányítással — a jobbkéz-szabály következménye. Területnél és térfogatnál ez nem baj (abszolút értéket
        veszünk), irányított feladatban (nyomaték, előjeles térfogat) viszont igen.
      </>
    ),
  },
  {
    k: (
      <>
        Két nem nulla vektorra <M>{"\\mathbf{a}\\times\\mathbf{b} = \\mathbf{0}"}</M>. Mit jelent ez?
      </>
    ),
    v: [
      <>A két vektor párhuzamos.</>,
      <>A két vektor merőleges.</>,
      <>A két vektor egyenlő.</>,
      <>Semmit, ez lehetetlen.</>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        <M>{"|\\mathbf{a}\\times\\mathbf{b}| = |\\mathbf{a}||\\mathbf{b}|\\sin\\varphi"}</M>, ez pedig pontosan akkor
        nulla, ha <M>{"\\sin\\varphi = 0"}</M>, azaz <M>{"\\varphi = 0^\\circ"}</M> vagy{" "}
        <M>{"180^\\circ"}</M>. Szemléletesen: a kifeszített paralelogramma elfajul, nincs területe.
      </>
    ),
  },
  {
    k: (
      <>
        Két nem nulla vektorra <M>{"\\mathbf{a}\\cdot\\mathbf{b} = 0"}</M>. Mit jelent ez?
      </>
    ),
    v: [
      <>A két vektor merőleges.</>,
      <>A két vektor párhuzamos.</>,
      <>Valamelyik vektor a nullvektor.</>,
      <>A két vektor hossza egyenlő.</>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        <M>{"\\mathbf{a}\\cdot\\mathbf{b} = |\\mathbf{a}||\\mathbf{b}|\\cos\\varphi"}</M>, tehát nem nulla vektoroknál
        a szorzat csak <M>{"\\cos\\varphi = 0"}</M> miatt lehet nulla. Vigyázz: az <em>egyenes és sík</em>{" "}
        feladatoknál ugyanez a nulla épp <strong>párhuzamosságot</strong> jelent — mert ott a sík normálisával
        szorzol.
      </>
    ),
  },
  {
    k: <>Hány különböző paraméteres egyenletrendszere van egy adott térbeli egyenesnek?</>,
    v: [
      <>Végtelen sok — más kezdőpont és más hosszúságú vagy ellentétes irányvektor is jó.</>,
      <>Pontosan egy.</>,
      <>Kettő: a <M>{"\\mathbf{v}"}</M> és a <M>{"-\\mathbf{v}"}</M> irányvektorral.</>,
      <>Három, a három koordinátatengely szerint.</>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        Az egyenes bármely pontja lehet <M>{"P_0"}</M>, és az irányvektor tetszőleges nem nulla számszorosa is
        irányvektor. Ezért ha a megoldásod más alakú, mint a példatáré, még lehet jó:{" "}
        <strong>behelyettesítéssel ellenőrizz</strong>, ne írd át reflexből.
      </>
    ),
  },
  {
    k: (
      <>
        Mi a <M>{"2x - 3y + z = 5"}</M> sík normálvektora?
      </>
    ),
    v: [
      <>
        <M>{"(2;\\,-3;\\,1)"}</M>
      </>,
      <>
        <M>{"(2;\\,-3;\\,1;\\,5)"}</M>
      </>,
      <>
        <M>{"(5;\\,5;\\,5)"}</M>
      </>,
      <>Egy sík normálvektora nem olvasható le az egyenletből.</>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        Az általános alakban az <M>{"x, y, z"}</M> <strong>együtthatói</strong> a normálvektor koordinátái — a jobb
        oldali állandó csak azt mondja meg, hol helyezkedik el a sík. Ez a térgeometria leggyakrabban használt apró
        trükkje.
      </>
    ),
  },
  {
    k: <>Egyenes és sík hajlásszögénél melyik szögfüggvény szerepel a képletben, és miért?</>,
    v: [
      <>
        <M>{"\\sin\\alpha"}</M>, mert a normálvektorral számolunk, az pedig a síkra merőleges.
      </>,
      <>
        <M>{"\\cos\\alpha"}</M>, mert minden hajlásszög-képletben koszinusz van.
      </>,
      <>
        <M>{"\\operatorname{tg}\\alpha"}</M>, mert a lejtést mérjük.
      </>,
      <>
        <M>{"\\sin\\alpha"}</M>, mert a vektoriális szorzatot használjuk.
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        A skaláris szorzat az irányvektor és a <em>normálvektor</em> <M>{"\\vartheta"}</M> szögét adja, a keresett{" "}
        <M>{"\\alpha"}</M> viszont ennek a pótszöge: <M>{"\\alpha = 90^\\circ - \\vartheta"}</M>, és{" "}
        <M>{"\\cos\\vartheta = \\sin\\alpha"}</M>. Gyors próba: ha az egyenes párhuzamos a síkkal, akkor{" "}
        <M>{"\\mathbf{v}\\cdot\\mathbf{n} = 0"}</M>, és tényleg <M>{"\\alpha = 0^\\circ"}</M> jön ki.
      </>
    ),
  },
  {
    k: (
      <>
        Három vektorra <M>{"(\\mathbf{a}\\times\\mathbf{b})\\cdot\\mathbf{c} = 0"}</M>. Mi következik ebből?
      </>
    ),
    v: [
      <>A három vektor komplanáris: párhuzamosak egy közös síkkal.</>,
      <>Mindhárom vektor merőleges egymásra.</>,
      <>A <M>{"\\mathbf{c}"}</M> a nullvektor.</>,
      <>Az <M>{"\\mathbf{a}"}</M> és <M>{"\\mathbf{b}"}</M> párhuzamos.</>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        A vegyes szorzat abszolút értéke a kifeszített paralelepipedon térfogata. Ha ez nulla, a test lapos: a három
        vektor egy síkba fér. Ezért a leggyorsabb „egy síkban van-e a négy pont?” teszt az{" "}
        <M>{"\\overrightarrow{AB},\\ \\overrightarrow{AC},\\ \\overrightarrow{AD}"}</M> vegyes szorzata. (A felsorolt
        többi eset is nullát ad, de egyik sem <em>következik</em> belőle.)
      </>
    ),
  },
  {
    k: <>Mikor párhuzamos két sík?</>,
    v: [
      <>Ha a normálvektoraik párhuzamosak.</>,
      <>Ha a normálvektoraik merőlegesek.</>,
      <>Ha a jobb oldali állandóik egyenlők.</>,
      <>Ha a normálvektoraik skaláris szorzata nulla.</>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        A sík állását a normálisa határozza meg, tehát két sík pontosan akkor párhuzamos (vagy egybeeső), ha{" "}
        <M>{"\\mathbf{n}_2 = \\lambda\\mathbf{n}_1"}</M>. Ilyenkor a két egyenlet bal oldala egymás számszorosa, és
        csak a konstans dönti el, hogy egybeesnek-e. Ha a normálisok <em>merőlegesek</em>, a két sík éppen
        derékszögben metszi egymást.
      </>
    ),
  },
  {
    k: <>Melyik képlet adja meg két kitérő egyenes távolságát?</>,
    v: [
      <>
        <M>{"d = \\dfrac{\\left|\\overrightarrow{PQ}\\cdot(\\mathbf{v}_1\\times\\mathbf{v}_2)\\right|}{|\\mathbf{v}_1\\times\\mathbf{v}_2|}"}</M>
      </>,
      <>
        <M>{"d = \\dfrac{\\left|\\overrightarrow{PQ}\\times\\mathbf{v}_1\\right|}{|\\mathbf{v}_1|}"}</M>
      </>,
      <>
        <M>{"d = \\left|\\overrightarrow{PQ}\\right|"}</M>
      </>,
      <>
        <M>{"d = \\dfrac{\\left|\\overrightarrow{PQ}\\cdot\\mathbf{v}_1\\right|}{|\\mathbf{v}_1|}"}</M>
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        A számlálóban <strong>vegyes</strong> szorzat áll: a <M>{"\\overrightarrow{PQ}, \\mathbf{v}_1, \\mathbf{v}_2"}</M>{" "}
        által kifeszített paralelepipedon térfogata. A nevező az alaplap területe, a hányados pedig a magasság —
        éppen a két egyenes távolsága. A második képlet a <em>pont és egyenes</em> távolsága, a negyedik pedig egy
        vetülethossz.
      </>
    ),
  },
];

/* ---------- Hibakereső ---------- */

export const HIBAK = [
  {
    cim: "Vektoriális szorzat — hol a hiba?",
    feladat: (
      <>
        Számítsd ki az <M>{"\\mathbf{a} = (3;\\,-1;\\,2)"}</M> és <M>{"\\mathbf{b} = (5;\\,4;\\,-1)"}</M> vektorok
        vektoriális szorzatát!
      </>
    ),
    lepesek: [
      {
        szoveg: (
          <>
            Determinánsként írjuk fel:{" "}
            <M>{"\\mathbf{a}\\times\\mathbf{b} = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ 3 & -1 & 2 \\\\ 5 & 4 & -1 \\end{vmatrix}"}</M>
          </>
        ),
      },
      {
        szoveg: (
          <>
            Az <M>{"\\mathbf{i}"}</M> együtthatója: <M>{"(-1)\\cdot(-1) - 2\\cdot 4 = 1 - 8 = -7"}</M>
          </>
        ),
      },
      {
        szoveg: (
          <>
            A <M>{"\\mathbf{j}"}</M> együtthatója: <M>{"3\\cdot(-1) - 2\\cdot 5 = -3 - 10 = -13"}</M>
          </>
        ),
        hibas: true,
        javitas: (
          <>
            A középső tagot <strong>ki kell vonni</strong>: a kifejtésben a <M>{"\\mathbf{j}"}</M> előjele mínusz.
            Helyesen <M>{"-\\left(3\\cdot(-1) - 2\\cdot 5\\right) = -(-13) = +13"}</M>. A váltakozó előjel a
            determináns kifejtési szabálya, nem elírás.
          </>
        ),
      },
      {
        szoveg: (
          <>
            A <M>{"\\mathbf{k}"}</M> együtthatója: <M>{"3\\cdot 4 - (-1)\\cdot 5 = 12 + 5 = 17"}</M>
          </>
        ),
      },
      {
        szoveg: (
          <>
            Az eredmény: <M>{"\\mathbf{a}\\times\\mathbf{b} = (-7;\\,-13;\\,17)"}</M>
          </>
        ),
      },
    ],
    tanulsag: (
      <>
        Harminc másodperces ellenőrzés: a szorzatnak mindkét tényezőre merőlegesnek kell lennie. A hibás
        eredménnyel <M>{"(-7)\\cdot 3 + (-13)\\cdot(-1) + 17\\cdot 2 = -21 + 13 + 34 = 26 \\ne 0"}</M> — azonnal
        kiderül a baj. A helyes <M>{"(-7;\\,13;\\,17)"}</M> esetén <M>{"-21 - 13 + 34 = 0"}</M> ✓
      </>
    ),
  },
  {
    cim: "Hajlásszög — hol a hiba?",
    feladat: (
      <>
        Mekkora az <M>{"\\mathbf{a} = (3;\\,4;\\,5)"}</M> és <M>{"\\mathbf{b} = (2;\\,1;\\,0)"}</M> vektorok
        hajlásszöge?
      </>
    ),
    lepesek: [
      {
        szoveg: (
          <>
            <M>{"\\mathbf{a}\\cdot\\mathbf{b} = 3\\cdot 2 + 4\\cdot 1 + 5\\cdot 0 = 10"}</M>
          </>
        ),
      },
      {
        szoveg: (
          <>
            <M>{"|\\mathbf{a}| = \\sqrt{9+16+25} = \\sqrt{50} = 5\\sqrt2,\\qquad |\\mathbf{b}| = \\sqrt{4+1+0} = \\sqrt5"}</M>
          </>
        ),
      },
      {
        szoveg: (
          <>
            <M>{"\\cos\\varphi = \\dfrac{10}{5\\sqrt2} = 1{,}414"}</M>
          </>
        ),
        hibas: true,
        javitas: (
          <>
            <strong>Mindkét</strong> hosszal osztani kell:{" "}
            <M>{"\\cos\\varphi = \\dfrac{10}{5\\sqrt2\\cdot\\sqrt5} = \\dfrac{10}{5\\sqrt{10}} = \\dfrac{2}{\\sqrt{10}} \\approx 0{,}6325"}</M>.
            A <M>{"|\\mathbf{b}|"}</M> maradt ki a nevezőből.
          </>
        ),
      },
      {
        szoveg: (
          <>
            <M>{"\\varphi = \\arccos 1{,}414 \\approx 45^\\circ"}</M>
          </>
        ),
      },
    ],
    tanulsag: (
      <>
        A koszinusz soha nem lehet 1-nél nagyobb — ha ilyet kapsz, biztosan kimaradt egy osztás. A helyes érték{" "}
        <M>{"\\varphi = \\arccos 0{,}6325 \\approx 50{,}77^\\circ"}</M>, és mivel a skaláris szorzat pozitív volt,
        hegyesszöget is vártunk.
      </>
    ),
  },
  {
    cim: "Egyenes és sík szöge — hol a hiba?",
    feladat: (
      <>
        Mekkora szöget zár be a <M>{"\\mathbf{v} = (2;\\,-1;\\,2)"}</M> irányvektorú egyenes a{" "}
        <M>{"2x - 3y + z = 5"}</M> síkkal?
      </>
    ),
    lepesek: [
      {
        szoveg: (
          <>
            A sík normálvektora <M>{"\\mathbf{n} = (2;\\,-3;\\,1)"}</M>, az együtthatókból leolvasva.
          </>
        ),
      },
      {
        szoveg: (
          <>
            <M>{"\\mathbf{v}\\cdot\\mathbf{n} = 4 + 3 + 2 = 9,\\qquad |\\mathbf{v}| = 3,\\qquad |\\mathbf{n}| = \\sqrt{14}"}</M>
          </>
        ),
      },
      {
        szoveg: (
          <>
            <M>{"\\cos\\alpha = \\dfrac{9}{3\\sqrt{14}} = 0{,}8018 \\Rightarrow \\alpha \\approx 36{,}70^\\circ"}</M>
          </>
        ),
        hibas: true,
        javitas: (
          <>
            Itt <strong>szinusz</strong> áll a képletben:{" "}
            <M>{"\\sin\\alpha = \\dfrac{|\\mathbf{v}\\cdot\\mathbf{n}|}{|\\mathbf{v}||\\mathbf{n}|} = 0{,}8018"}</M>,
            ezért <M>{"\\alpha \\approx 53{,}30^\\circ"}</M>. A kiszámolt <M>{"36{,}70^\\circ"}</M> az irányvektor és
            a <em>normálvektor</em> szöge — a kettő összege pontosan <M>{"90^\\circ"}</M>.
          </>
        ),
      },
      {
        szoveg: <>A keresett hajlásszög tehát körülbelül <M>{"36{,}70^\\circ"}</M>.</>,
      },
    ],
    tanulsag: (
      <>
        Ha bizonytalan vagy, tesztelj egy szélső esettel: ha az egyenes <em>párhuzamos</em> a síkkal, akkor{" "}
        <M>{"\\mathbf{v}\\cdot\\mathbf{n} = 0"}</M>, és a hajlásszögnek <M>{"0^\\circ"}</M>-nak kell lennie. Ez csak
        a szinuszos alakkal jön ki.
      </>
    ),
  },
  {
    cim: "Pont és sík távolsága — hol a hiba?",
    feladat: (
      <>
        Mekkora a <M>{"Q(3;\\,2;\\,-1)"}</M> pont távolsága a <M>{"2x - 3y + z = 5"}</M> síktól?
      </>
    ),
    lepesek: [
      {
        szoveg: (
          <>
            A sík normálvektora <M>{"\\mathbf{n} = (2;\\,-3;\\,1)"}</M>, és az egyenlet már 0-ra rendezhető
            alakban áll: <M>{"2x - 3y + z - 5 = 0"}</M>.
          </>
        ),
      },
      {
        szoveg: (
          <>
            Behelyettesítünk: <M>{"2\\cdot 3 - 3\\cdot 2 + (-1) - 5 = 6 - 6 - 1 - 5 = -6"}</M>
          </>
        ),
      },
      {
        szoveg: (
          <>
            A távolság tehát <M>{"d = \\left|-6\\right| = 6"}</M>.
          </>
        ),
        hibas: true,
        javitas: (
          <>
            Hiányzik a nevező: el kell osztani a normálvektor hosszával.{" "}
            <M>{"|\\mathbf{n}| = \\sqrt{4+9+1} = \\sqrt{14}"}</M>, tehát{" "}
            <M>{"d = \\dfrac{6}{\\sqrt{14}} = \\dfrac{3\\sqrt{14}}{7} \\approx 1{,}604"}</M>.
          </>
        ),
      },
      {
        szoveg: (
          <>
            Ellenőrzésként a talppont: <M>{"M\\left(\\tfrac{27}{7};\\, \\tfrac{5}{7};\\, -\\tfrac{4}{7}\\right)"}</M>.
          </>
        ),
      },
    ],
    tanulsag: (
      <>
        Egyszerű próba: szorozd meg a sík egyenletét 10-zel (<M>{"20x - 30y + 10z = 50"}</M> — ugyanaz a sík!). A
        számláló tízszereződik, a távolság viszont nem változhat. Csak a <M>{"|\\mathbf{n}|"}</M>-nel való osztás
        teszi a képletet mértékhelyessé.
      </>
    ),
  },
];
