import { M, MB } from "@/components/ui/Keplet";

/* A helyes válasz mindig a 0. index — a Kviz komponens keveri a sorrendet. */

export const KVIZ = [
  {
    k: (
      <>
        Mit ad meg a <M>{"\\int_a^b f(x)\\,dx"}</M> határozott integrál, ha <M>{"f"}</M> előjelet vált a
        szakaszon?
      </>
    ),
    v: [
      <>
        Az <strong>előjeles</strong> területet: a tengely fölötti rész mínusz a tengely alatti rész.
      </>,
      <>A tengely fölötti és alatti részek területének összegét.</>,
      <>Mindig a geometriai területet, tehát nemnegatív számot.</>,
      <>
        Nulla, mert a pozitív és a negatív részek <em>mindig</em> kioltják egymást.
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        A Riemann-összegben az <M>{"f(\\xi_i)\\Delta x_i"}</M> szorzat negatív ott, ahol a függvény negatív. Ezért az
        integrál különbséget ad. Területhez <M>{"\\int|f|"}</M> kell — a zérushelyeknél darabolva.
      </>
    ),
  },
  {
    k: (
      <>
        Igaz-e, hogy <M>{"\\int_{-1}^{1}x^3dx = 0"}</M>, és ha igen, mekkora a görbe és a tengely közti{" "}
        <strong>terület</strong>?
      </>
    ),
    v: [
      <>
        Az integrál valóban 0 (páratlan függvény), de a terület <M>{"2\\cdot\\frac14 = \\frac12"}</M>.
      </>,
      <>Az integrál 0, tehát a terület is 0.</>,
      <>
        Az integrál <M>{"\\frac12"}</M>, a terület szintén.
      </>,
      <>
        Az integrál 0, a terület pedig <M>{"\\frac14"}</M>.
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        Páratlan függvény integrálja szimmetrikus intervallumon 0. A terület viszont a két fél összege:{" "}
        <M>{"2\\int_0^1x^3dx = 2\\cdot\\frac14 = \\frac12"}</M>. „Nulla integrál” sosem jelenti azt, hogy nincs
        terület.
      </>
    ),
  },
  {
    k: (
      <>
        Az <M>{"\\int_0^3\\frac{x}{\\sqrt{x^2+16}}dx"}</M> integrálban bevezetjük az <M>{"u=x^2+16"}</M>{" "}
        helyettesítést. Mi lesz az új integrál két határa?
      </>
    ),
    v: [
      <>
        <M>{"16"}</M> és <M>{"25"}</M>, mert a határokat is át kell írni az új változóra.
      </>,
      <>
        <M>{"0"}</M> és <M>{"3"}</M>, mert a határok a feladathoz tartoznak, nem a változóhoz.
      </>,
      <>
        <M>{"0"}</M> és <M>{"25"}</M>, mert az alsó határ nulla marad.
      </>,
      <>
        <M>{"4"}</M> és <M>{"5"}</M>, mert a gyök alatti kifejezés gyökét kell venni.
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        A határok mindig az <em>integrálási változó</em> értékei. Ha a változó <M>{"u"}</M> lesz, akkor{" "}
        <M>{"u"}</M>-ban kell megadni őket: <M>{"x=0\\Rightarrow u=16"}</M> és <M>{"x=3\\Rightarrow u=25"}</M>. A
        másik helyes út: visszaalakítani <M>{"x"}</M>-re, és úgy behelyettesíteni.
      </>
    ),
  },
  {
    k: <>Hogyan szól helyesen a Newton–Leibniz-képlet?</>,
    v: [
      <>
        <M>{"\\int_a^b f = F(b)-F(a)"}</M>, ahol <M>{"F'=f"}</M> — <strong>felső mínusz alsó</strong>.
      </>,
      <>
        <M>{"\\int_a^b f = F(a)-F(b)"}</M>, ahol <M>{"F'=f"}</M>.
      </>,
      <>
        <M>{"\\int_a^b f = F(b)-F(a)+C"}</M>, a konstanst itt is ki kell írni.
      </>,
      <>
        <M>{"\\int_a^b f = f(b)-f(a)"}</M>, a függvény két végpontbeli értékének különbsége.
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        A primitív függvényt kell kiértékelni, nem magát a függvényt, és a sorrend felső mínusz alsó. A{" "}
        <M>{"+C"}</M> kiesik a kivonásban, ezért határozott integrálnál soha ne írd ki.
      </>
    ),
  },
  {
    k: (
      <>
        Mit mond a <M>{"T(x)=\\int_a^x f(t)\\,dt"}</M> integrálfüggvényről a differenciál- és integrálszámítás
        kapcsolatáról szóló tétel (folytonos <M>{"f"}</M> esetén)?
      </>
    ),
    v: [
      <>
        <M>{"T'(x)=f(x)"}</M>: a felhalmozott terület változási sebessége a görbe pillanatnyi magassága.
      </>,
      <>
        <M>{"T'(x)=f'(x)"}</M>: a deriválás és az integrálás ugyanazt csinálja.
      </>,
      <>
        <M>{"T(x)=f(x)"}</M>: az integrálfüggvény megegyezik az integrandusszal.
      </>,
      <>
        <M>{"T'(x)=F(b)-F(a)"}</M>, egy állandó.
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        Ha <M>{"x"}</M>-et <M>{"\\Delta x"}</M>-szel növeljük, a terület egy <M>{"f(x)\\Delta x"}</M> méretű
        csíkkal nő, tehát <M>{"\\frac{\\Delta T}{\\Delta x}\\to f(x)"}</M>. Épp ezért primitív függvénye{" "}
        <M>{"T"}</M> az <M>{"f"}</M>-nek — innen jön a Newton–Leibniz-tétel.
      </>
    ),
  },
  {
    k: (
      <>
        Mennyi <M>{"\\int_{-2}^{2}\\left(x^5\\cos x + 3\\right)dx"}</M>, ha csak a szimmetriát használod?
      </>
    ),
    v: [
      <>
        <M>{"12"}</M>, mert az első tag páratlan (integrálja 0), a második 3·4.
      </>,
      <>
        <M>{"0"}</M>, mert az <M>{"x^5\\cos x"}</M> páratlan.
      </>,
      <>
        <M>{"6"}</M>, mert a szimmetria miatt elég a jobb felén integrálni.
      </>,
      <>Nem számolható ki elemi úton, mert nincs primitív függvénye.</>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        Az <M>{"x^5"}</M> páratlan, a <M>{"\\cos x"}</M> páros, a szorzatuk páratlan, tehát a szimmetrikus
        intervallumon 0 az integrálja. A konstans 3 viszont <M>{"3\\cdot(2-(-2))=12"}</M>. A szimmetria a
        részekre külön alkalmazandó.
      </>
    ),
  },
  {
    k: <>Melyik a forgástest (x tengely körüli) térfogatának helyes képlete?</>,
    v: [
      <>
        <M>{"V=\\pi\\int_a^b f(x)^2dx"}</M> — előbb négyzetre emelünk, azután integrálunk.
      </>,
      <>
        <M>{"V=\\pi\\left(\\int_a^b f(x)dx\\right)^2"}</M> — előbb integrálunk, azután négyzetre emelünk.
      </>,
      <>
        <M>{"V=2\\pi\\int_a^b f(x)dx"}</M>.
      </>,
      <>
        <M>{"V=\\pi\\int_a^b f(x)\\sqrt{1+f'(x)^2}\\,dx"}</M>.
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        A korong sugara <M>{"f(x)"}</M>, a körlap területe <M>{"f(x)^2\\pi"}</M> — a négyzet tehát a szumma{" "}
        <em>belsejében</em> van. A negyedik válasz a <strong>felszín</strong> képletének egy elrontott alakja
        (ott <M>{"2\\pi"}</M> és nincs négyzet, de van ívelem).
      </>
    ),
  },
  {
    k: (
      <>
        Az <M>{"\\int_0^1 e^{-x^2}dx"}</M> integrandusának nincs elemi primitív függvénye. Mit jelent ez?
      </>
    ),
    v: [
      <>
        Az integrál értéke létezik (a függvény folytonos), csak nem számolható ki Newton–Leibniz-szel —
        becsülhető és numerikusan tetszőleges pontossággal megkapható.
      </>,
      <>Az integrál nem létezik, a függvény nem integrálható.</>,
      <>Az integrál értéke végtelen.</>,
      <>Az integrál értéke nulla, mert a primitív függvény hiányzik.</>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        A folytonosság elég az integrálhatósághoz. A durva becslés{" "}
        <M>{"e^{-1}\\le\\int_0^1e^{-x^2}dx\\le 1"}</M>, a pontos érték <M>{"\\approx 0{,}7468"}</M>. A „nincs
        primitív függvény” a <em>képletről</em> szól, nem a szám létezéséről.
      </>
    ),
  },
  {
    k: (
      <>
        Egy <M>{"f(x)\\ge0"}</M> görbe alatti tartomány súlypontjának <M>{"y"}</M> koordinátája — melyik képlet
        helyes?
      </>
    ),
    v: [
      <>
        <M>{"y_s=\\frac{\\frac12\\int_a^b f^2dx}{\\int_a^b f\\,dx}"}</M>
      </>,
      <>
        <M>{"y_s=\\frac{\\int_a^b f\\,dx}{b-a}"}</M>, vagyis az átlagérték.
      </>,
      <>
        <M>{"y_s=\\frac{\\int_a^b f^2dx}{\\int_a^b f\\,dx}"}</M>, a felezés nem kell.
      </>,
      <>
        <M>{"y_s=\\frac{f(a)+f(b)}{2}"}</M>.
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        A <M>{"\\Delta x"}</M> szélességű sáv saját súlypontja <strong>félmagasságban</strong> van, ezért a
        nyomaték járuléka <M>{"\\frac{f}{2}\\cdot f\\,\\Delta x"}</M>. Ellenőrzés téglalapon (<M>{"f\\equiv h"}</M>
        ): <M>{"y_s=\\frac{\\frac12h^2b}{hb}=\\frac h2"}</M>. ✓ Az átlagérték egészen más mennyiség.
      </>
    ),
  },
  {
    k: (
      <>
        Az <M>{"y=x^2"}</M> és az <M>{"y=x+2"}</M> görbék közötti területet számolod. Mi történik, ha a{" "}
        <M>{"\\int_{-1}^{2}\\left(x^2-(x+2)\\right)dx"}</M> alakot írod fel?
      </>
    ),
    v: [
      <>
        A helyes érték <M>{"(-1)"}</M>-szeresét, <M>{"-\\frac92"}</M>-et kapod: felcserélted a felső és az alsó
        görbét.
      </>,
      <>Ugyanazt kapod, mert a terület mindig pozitív.</>,
      <>Nullát kapok, mert a két integrál kioltja egymást.</>,
      <>
        A helyes érték felét, mert csak a tartomány egyik felét számoltam ki.
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        A sáv magassága mindig <strong>felső mínusz alsó</strong>. A metszéspontok között (pl. <M>{"x=0"}</M>-ban)
        az egyenes értéke 2, a paraboláé 0, tehát az egyenes a felső. A negatív eredmény mindig sorrendhibát
        jelez — és az <M>{"|\\cdot|"}</M> nem „javítás”, hanem a hiba elfedése.
      </>
    ),
  },
];

/* ================= Hibakereső ================= */

export const HIBAK = [
  {
    cim: "Helyettesítés régi határokkal",
    feladat: (
      <>
        Számítsuk ki: <M>{"\\int_0^3 x\\sqrt{x^2+16}\\;dx"}</M>
      </>
    ),
    lepesek: [
      {
        szoveg: (
          <>
            Legyen <M>{"u=x^2+16"}</M>, ekkor <M>{"du=2x\\,dx"}</M>, tehát <M>{"x\\,dx=\\frac{du}{2}"}</M>.
          </>
        ),
      },
      {
        szoveg: (
          <>
            Az integrál az új változóval: <M>{"\\frac12\\int_0^3\\sqrt u\\,du"}</M>, mert a feladat határai 0 és 3.
          </>
        ),
        hibas: true,
        javitas: (
          <>
            Itt a hiba: <strong>új változó, új határok</strong>. Az <M>{"u"}</M> változó a 0 helyett{" "}
            <M>{"0^2+16=16"}</M>-ból, a 3 helyett <M>{"3^2+16=25"}</M>-ből indul. Helyesen{" "}
            <M>{"\\frac12\\int_{16}^{25}\\sqrt u\\,du"}</M>, és innen
            <MB>{"\\frac12\\left[\\frac23u^{3/2}\\right]_{16}^{25} = \\frac13\\left(125-64\\right) = \\frac{61}{3}\\approx 20{,}33"}</MB>
          </>
        ),
      },
      {
        szoveg: (
          <>
            A primitív függvény: <M>{"\\frac12\\cdot\\frac23u^{3/2} = \\frac13u^{3/2}"}</M>.
          </>
        ),
      },
      {
        szoveg: (
          <>
            Behelyettesítve: <M>{"\\frac13\\left(3^{3/2}-0\\right) = \\frac{3\\sqrt3}{3} = \\sqrt3 \\approx 1{,}73"}</M>.
          </>
        ),
      },
    ],
    tanulsag: (
      <>
        A határok az <em>integrálási változó</em> értékei. Ha a változó megváltozik, a határoknak is át kell
        változniuk — vagy vissza kell alakítani a primitív függvényt <M>{"x"}</M>-re, és úgy behelyettesíteni.
      </>
    ),
  },
  {
    cim: "Két görbe között, rossz sorrendben",
    feladat: (
      <>
        Mekkora az <M>{"y=x^2"}</M> parabola és az <M>{"y=x+2"}</M> egyenes közötti terület?
      </>
    ),
    lepesek: [
      {
        szoveg: (
          <>
            Metszéspontok: <M>{"x^2=x+2 \\Rightarrow x^2-x-2=0 \\Rightarrow x_1=-1,\\ x_2=2"}</M>.
          </>
        ),
      },
      {
        szoveg: (
          <>
            A parabola a felső görbe, hiszen magasabb fokú:{" "}
            <M>{"T=\\int_{-1}^{2}\\left(x^2-(x+2)\\right)dx"}</M>.
          </>
        ),
        hibas: true,
        javitas: (
          <>
            Itt a hiba: a fokszámnak semmi köze ahhoz, melyik görbe van <em>fölül</em> a vizsgált szakaszon.
            Helyettesítsünk be egy közbülső értéket, például <M>{"x=0"}</M>-t: az egyenes <M>{"2"}</M>, a parabola{" "}
            <M>{"0"}</M> — tehát az <strong>egyenes</strong> a felső. Helyesen
            <MB>{"T=\\int_{-1}^{2}\\left(x+2-x^2\\right)dx = \\frac92 = 4{,}5"}</MB>
          </>
        ),
      },
      {
        szoveg: (
          <>
            Primitív függvény: <M>{"\\frac{x^3}{3}-\\frac{x^2}{2}-2x"}</M>.
          </>
        ),
      },
      {
        szoveg: (
          <>
            Behelyettesítve: <M>{"\\left(\\frac83-2-4\\right)-\\left(-\\frac13-\\frac12+2\\right) = -\\frac92"}</M>,
            tehát a terület <M>{"-4{,}5"}</M>.
          </>
        ),
      },
    ],
    tanulsag: (
      <>
        A negatív „terület” mindig figyelmeztetés: felcserélted a felső és az alsó görbét. A sorrendet
        behelyettesítéssel vagy ábrával döntsd el, ne ránézésre.
      </>
    ),
  },
  {
    cim: "Forgástest — négyzetre emelés az integrál után",
    feladat: (
      <>
        Mekkora az <M>{"y=\\sqrt x"}</M> görbe alatti tartomány <M>{"x"}</M> tengely körüli megforgatásával
        keletkező test térfogata a <M>{"0\\le x\\le 4"}</M> szakaszon?
      </>
    ),
    lepesek: [
      {
        szoveg: (
          <>
            A képlet: <M>{"V=\\pi\\int_a^b f(x)^2dx"}</M>, mert a korong sugara <M>{"f(x)"}</M>.
          </>
        ),
      },
      {
        szoveg: (
          <>
            Számoljuk ki előbb az integrált:{" "}
            <M>{"\\int_0^4\\sqrt x\\,dx = \\left[\\frac23x^{3/2}\\right]_0^4 = \\frac{16}{3}"}</M>, majd emeljük
            négyzetre: <M>{"V=\\pi\\left(\\frac{16}{3}\\right)^2"}</M>.
          </>
        ),
        hibas: true,
        javitas: (
          <>
            Itt a hiba: a négyzet a <strong>szumma belsejében</strong> van, nem kívül —{" "}
            <M>{"\\pi\\int f^2 \\ne \\pi\\left(\\int f\\right)^2"}</M>. Helyesen előbb négyzetre emelünk:{" "}
            <M>{"f^2 = x"}</M>, és
            <MB>{"V=\\pi\\int_0^4 x\\,dx = \\pi\\left[\\frac{x^2}{2}\\right]_0^4 = 8\\pi \\approx 25{,}13"}</MB>
          </>
        ),
      },
      {
        szoveg: (
          <>
            Tehát <M>{"V=\\pi\\cdot\\frac{256}{9}"}</M>.
          </>
        ),
      },
      {
        szoveg: (
          <>
            Számszerűen <M>{"V\\approx 89{,}36"}</M> — ez több mint a befoglaló henger térfogata (
            <M>{"2^2\\pi\\cdot4\\approx50{,}3"}</M>), de ezt most nem ellenőrizzük.
          </>
        ),
      },
    ],
    tanulsag: (
      <>
        A józansági ellenőrzés itt azonnal megfogta volna a hibát: a forgástest nem lehet nagyobb a befoglaló
        hengernél. Mindig hasonlítsd az eredményt egy ismert testhez.
      </>
    ),
  },
  {
    cim: "Előjeles integrál területként",
    feladat: (
      <>
        Mekkora területet zár be az <M>{"f(x)=x^2-4"}</M> parabola és az <M>{"x"}</M> tengely a{" "}
        <M>{"-3\\le x\\le 3"}</M> szakaszon?
      </>
    ),
    lepesek: [
      {
        szoveg: (
          <>
            A primitív függvény <M>{"F(x)=\\frac{x^3}{3}-4x"}</M>.
          </>
        ),
      },
      {
        szoveg: (
          <>
            A terület egyetlen integrállal megkapható:{" "}
            <M>{"T=\\int_{-3}^{3}\\left(x^2-4\\right)dx = \\left[\\frac{x^3}{3}-4x\\right]_{-3}^{3}"}</M>.
          </>
        ),
        hibas: true,
        javitas: (
          <>
            Itt a hiba: a parabola a <M>{"-2"}</M> és <M>{"2"}</M> között az <M>{"x"}</M> tengely{" "}
            <strong>alatt</strong> van, ezért az egyben vett integrál a pozitív és negatív részek{" "}
            <em>különbségét</em> adja. Területhez a zérushelyeknél darabolni kell:
            <MB>{"T=\\left|\\int_{-3}^{-2}\\right|+\\left|\\int_{-2}^{2}\\right|+\\left|\\int_{2}^{3}\\right| = \\frac73+\\frac{32}{3}+\\frac73 = \\frac{46}{3}\\approx 15{,}33"}</MB>
          </>
        ),
      },
      {
        szoveg: (
          <>
            Behelyettesítve: <M>{"(9-12)-(-9+12) = -3-3 = -6"}</M>.
          </>
        ),
      },
      {
        szoveg: (
          <>
            A területnek pozitívnak kell lennie, tehát a válasz <M>{"T=6"}</M>.
          </>
        ),
      },
    ],
    tanulsag: (
      <>
        Az abszolút érték a <em>végén</em> nem javítja meg a hibát: a pozitív és a negatív darabok addigra már
        kioltották egymást. Területnél mindig keresd meg a zérushelyeket, és darabonként integrálj.
      </>
    ),
  },
];
