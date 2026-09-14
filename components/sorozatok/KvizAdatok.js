import { M } from "@/components/ui/Keplet";

/* ---------- Fogalmi kvíz ---------- */

export const KVIZ = [
  {
    k: <>Igaz-e, hogy minden korlátos sorozat konvergens?</>,
    v: [
      <>
        Nem. Ellenpélda: <M>{"(-1)^n"}</M> korlátos, de divergens.
      </>,
      <>Igen, a korlátosság épp ezt jelenti.</>,
      <>Igen, de csak akkor, ha minden tagja pozitív.</>,
      <>Csak monoton sorozatokra nem igaz.</>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        A korlátosság <strong>szükséges</strong>, de nem elégséges feltétel. A{" "}
        <M>{"(-1)^n"}</M> sorozat a <M>{"[-1;\\,1]"}</M> intervallumban marad,
        mégsem tart sehova: két torlódási pontja van. Konvergenciához
        korlátosság <em>és</em> pontosan egy torlódási pont kell — vagy
        monotonitás + korlátosság.
      </>
    ),
  },
  {
    k: (
      <>Egy sorozatról tudjuk, hogy konvergens. Mi következik ebből biztosan?</>
    ),
    v: [
      <>Korlátos.</>,
      <>Monoton.</>,
      <>Felveszi a határértékét.</>,
      <>Minden tagja azonos előjelű.</>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        Konvergens <M>{"\\Rightarrow"}</M> korlátos: <M>{"\\varepsilon = 1"}</M>
        -gyel az <M>{"N"}</M> utáni tagok mind az <M>{"(A-1;\\,A+1)"}</M> sávban
        vannak, előtte pedig csak véges sok tag van, azok között van legnagyobb
        és legkisebb. Monotonitás nem következik (<M>{"(-1)^n/n"}</M>), és a
        határértéket sem kell felvennie (<M>{"1/n \\to 0"}</M>, de egyik tag sem
        nulla).
      </>
    ),
  },
  {
    k: (
      <>
        Az <M>{"a_n = (-1)^n\\left(1+\\frac1n\\right)"}</M> sorozatnak mennyi a
        torlódási pontja, és konvergens-e?
      </>
    ),
    v: [
      <>
        Két torlódási pontja van (<M>{"-1"}</M> és <M>{"1"}</M>), ezért
        divergens.
      </>,
      <>
        Egy torlódási pontja van, a <M>{"0"}</M>, ezért konvergens.
      </>,
      <>Nincs torlódási pontja, mert egyik értéket sem veszi fel.</>,
      <>
        Két torlódási pontja van, de attól még konvergens az <M>{"1"}</M>-hez.
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        A páros indexű tagok <M>{"1"}</M>-hez, a páratlanok <M>{"-1"}</M>-hez
        tartanak. Torlódási pont az, amelynek <em>minden</em> környezetében{" "}
        <strong>végtelen sok</strong> tag van — ehhez nem kell, hogy a sorozat
        fel is vegye az értéket. Konvergenciához viszont az kell, hogy egy
        indextől kezdve <strong>minden</strong> tag közel legyen: ez két
        torlódási pontnál lehetetlen.
      </>
    ),
  },
  {
    k: (
      <>
        Legyen <M>{"a_1 = 1"}</M> és <M>{"a_{n+1} = 2a_n"}</M>. Valaki felírja
        az <M>{"A = 2A"}</M> egyenletet, és <M>{"A = 0"}</M>-t kap. Hol a hiba?
      </>
    ),
    v: [
      <>
        Az egyenletet csak akkor szabad felírni, ha a konvergenciát már
        igazoltuk — itt a sorozat divergens.
      </>,
      <>
        Az egyenlet rossz, helyesen <M>{"A = 2A + 1"}</M>.
      </>,
      <>
        A <M>{"0"}</M> nem lehet határérték, mert a sorozat minden tagja
        pozitív.
      </>,
      <>Semmi hiba nincs, a sorozat tényleg nullához tart.</>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        Az <M>{"A = f(A)"}</M> egyenlet felírása <strong>feltételezi</strong>,
        hogy a határérték létezik. Az <M>{"1,\\,2,\\,4,\\,8,\\dots"}</M> sorozat
        a végtelenbe tart, tehát nincs (véges) határértéke. A helyes sorrend
        mindig: korlátosság <M>{"\\to"}</M> monotonitás <M>{"\\to"}</M>{" "}
        konvergencia <M>{"\\to"}</M> és csak ezután az egyenlet.
      </>
    ),
  },
  {
    k: (
      <>
        Két sorozat is <M>{"+\\infty"}</M>-hez tart. Mennyi a különbségük
        határértéke?
      </>
    ),
    v: [
      <>Bármi lehet: nulla, véges szám, végtelen, vagy nem is létezik.</>,
      <>
        Mindig <M>{"0"}</M>, hiszen a két végtelen kiejti egymást.
      </>,
      <>
        Mindig <M>{"+\\infty"}</M>.
      </>,
      <>Mindig létezik, csak ki kell számolni.</>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        Ez az <M>{"\\infty - \\infty"}</M> határozatlan alak. Példák:{" "}
        <M>{"\\sqrt{n^2+4}-\\sqrt{n^2-n} \\to \\tfrac12"}</M>,{" "}
        <M>{"\\sqrt{n+1}-\\sqrt{n} \\to 0"}</M>,{" "}
        <M>{"n^2 - n \\to +\\infty"}</M>, és <M>{"n + (-1)^n n"}</M>-nek nincs
        határértéke. Az alak önmagában nem árulja el az eredményt — át kell
        alakítani a kifejezést.
      </>
    ),
  },
  {
    k: (
      <>
        Mennyi{" "}
        <M>{"\\lim\\limits_{n\\to\\infty}\\left(1+\\frac1n\\right)^{n}"}</M>?
      </>
    ),
    v: [
      <>
        <M>{"e \\approx 2{,}718"}</M>
      </>,
      <>
        <M>{"1"}</M>, mert az alap 1-hez tart.
      </>,
      <>
        <M>{"+\\infty"}</M>, mert a kitevő végtelenhez tart.
      </>,
      <>Nincs határértéke, mert két ellentétes hatás verseng.</>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        Ez az <M>{"1^{\\infty}"}</M> határozatlan alak. Az alap{" "}
        <strong>soha nem egyenlő</strong> 1-gyel, csak közeledik hozzá — és a
        parányi <M>{"1/n"}</M> többlet <M>{"n"}</M>-szeres hatványozásban
        összeadódik. A sorozat szigorúan nő, és 3 alatt marad, tehát monoton +
        korlátos, azaz konvergens; a határértéke maga az <M>{"e"}</M>.
      </>
    ),
  },
  {
    k: (
      <>
        Melyik <M>{"q"}</M> értékre <strong>nem</strong> igaz, hogy{" "}
        <M>{"q^n \\to 0"}</M>?
      </>
    ),
    v: [
      <>
        <M>{"q = -3"}</M>
      </>,
      <>
        <M>{"q = -0{,}9"}</M>
      </>,
      <>
        <M>{"q = 0{,}5"}</M>
      </>,
      <>
        <M>{"q = -\\tfrac13"}</M>
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        A feltétel <M>{"|q| < 1"}</M>, <strong>nem</strong> <M>{"q < 1"}</M>. A{" "}
        <M>{"-3"}</M> kisebb egynél, de <M>{"(-3)^n"}</M> abszolút értékben
        minden határon túl nő, közben előjelet vált — nincs határértéke még
        tágabb értelemben sem. A másik három alap abszolút értéke 1-nél kisebb,
        ezért mind nullsorozatot ad.
      </>
    ),
  },
  {
    k: (
      <>
        Rendezd növekvő „erősség” szerint: <M>{"2^n"}</M>, <M>{"n!"}</M>,{" "}
        <M>{"n^n"}</M>, <M>{"n^{10}"}</M>.
      </>
    ),
    v: [
      <>
        <M>{"n^{10} \\ll 2^n \\ll n! \\ll n^n"}</M>
      </>,
      <>
        <M>{"2^n \\ll n^{10} \\ll n! \\ll n^n"}</M>
      </>,
      <>
        <M>{"n^{10} \\ll 2^n \\ll n^n \\ll n!"}</M>
      </>,
      <>
        <M>{"n! \\ll n^n \\ll 2^n \\ll n^{10}"}</M>
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        A lánc: <M>{"\\lg n \\ll n^{\\alpha} \\ll q^n \\ll n! \\ll n^n"}</M>.
        Kis <M>{"n"}</M>-re a sorrend félrevezető lehet (<M>{"n^{10}"}</M>{" "}
        sokáig nagyobb, mint <M>{"2^n"}</M>), de a határértéket a végtelenben
        nézzük. Hányadosnál mindig az erősebb dönt: ha az erősebb a nevezőben
        van, a határérték 0.
      </>
    ),
  },
  {
    k: (
      <>
        Mit jelent pontosan, hogy <M>{"N(\\varepsilon) = 22"}</M> a küszöbindex{" "}
        <M>{"\\varepsilon = 0{,}2"}</M> mellett?
      </>
    ),
    v: [
      <>
        Minden <M>{"n > 22"}</M> esetén <M>{"|a_n - A| < 0{,}2"}</M>.
      </>,
      <>
        A <M>{"22"}</M>. tag eltérése pontosan <M>{"0{,}2"}</M>.
      </>,
      <>
        Van olyan <M>{"n > 22"}</M>, amelyre <M>{"|a_n - A| < 0{,}2"}</M>.
      </>,
      <>
        A <M>{"22"}</M>. tagtól kezdve a sorozat monoton közeledik <M>{"A"}</M>
        -hoz.
      </>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        A definícióban „<strong>minden</strong> <M>{"n > N"}</M>” szerepel — nem
        elég, ha egyetlen tag beesik a sávba, és egyetlen kiszökő tag{" "}
        <M>{"N"}</M> után már megbuktatja az adott <M>{"\\varepsilon"}</M>-t. A
        monoton közeledés nem követelmény: a tagok oda-vissza ugrálva is
        beérhetnek.
      </>
    ),
  },
  {
    k: (
      <>
        Legyen <M>{"(a_n)"}</M> és <M>{"(b_n)"}</M> is divergens. Lehet-e az{" "}
        <M>{"(a_n + b_n)"}</M> összeg konvergens?
      </>
    ),
    v: [
      <>
        Igen, például <M>{"a_n = (-1)^n"}</M> és <M>{"b_n = (-1)^{n+1}"}</M>{" "}
        esetén az összeg azonosan <M>{"0"}</M>.
      </>,
      <>Nem, két divergens sorozat összege mindig divergens.</>,
      <>Csak akkor, ha mindkettő korlátos és periodikus.</>,
      <>Nem, mert a műveleti tétel ezt kizárja.</>,
    ],
    helyes: 0,
    magyarazat: (
      <>
        A műveleti tétel csak egy irányban működik: konvergens részekből
        következtet az összegre. Visszafelé semmi nem következik. Másik
        ellenpélda: <M>{"a_n = n"}</M> és <M>{"b_n = -n"}</M> — mindkettő
        divergens, az összegük az azonosan nulla sorozat. Ebből persze nem
        szabad azt hinni, hogy „<M>{"\\infty-\\infty = 0"}</M>”.
      </>
    ),
  },
];

/* ---------- Hibakereső: egy helyen hibás megoldások ---------- */

export const HIBAK = [
  {
    cim: "Polinom per polinom — hol a hiba?",
    feladat: (
      <>
        Számítsd ki:{" "}
        <M>
          {"\\lim\\limits_{n\\to\\infty}\\dfrac{3n^2 - 5n + 2}{2n^2 + n - 7}"}
        </M>
        .
      </>
    ),
    lepesek: [
      {
        szoveg: (
          <>
            A számláló és a nevező is másodfokú, tehát a fokszámuk megegyezik.
          </>
        ),
      },
      {
        szoveg: (
          <>
            A nevező „vezető tagja” <M>{"n"}</M>, ezért osszunk el minden tagot{" "}
            <M>{"n"}</M>-nel:{" "}
            <M>{"\\dfrac{3n - 5 + \\frac{2}{n}}{2n + 1 - \\frac{7}{n}}"}</M>
          </>
        ),
        hibas: true,
        javitas: (
          <>
            A <strong>nevező legmagasabb fokú tagjával</strong> kell osztani,
            itt <M>{"n^2"}</M>-tel, nem <M>{"n"}</M>-nel. Helyesen:{" "}
            <M>
              {
                "\\dfrac{3 - \\frac5n + \\frac{2}{n^2}}{2 + \\frac1n - \\frac{7}{n^2}}"
              }
            </M>
            . Az <M>{"n"}</M>-nel való osztás után a számláló és a nevező
            külön-külön <M>{"+\\infty"}</M>-hez tart, tehát semmivel nem
            jutottunk előrébb: továbbra is <M>{"\\frac{\\infty}{\\infty}"}</M>{" "}
            alakunk van.
          </>
        ),
      },
      {
        szoveg: (
          <>
            A törtes tagok (<M>{"\\frac2n"}</M>, <M>{"\\frac7n"}</M>) nullához
            tartanak, a maradék <M>{"3n"}</M> és <M>{"2n"}</M> hányadosa pedig{" "}
            <M>{"\\frac{3n}{2n}"}</M>.
          </>
        ),
      },
      {
        szoveg: (
          <>
            Az eredmény a maradék tagok hányadosa:{" "}
            <M>{"\\dfrac{3}{2} = 1{,}5"}</M>.
          </>
        ),
      },
    ],
    tanulsag: (
      <>
        A végeredmény történetesen jó, a <em>levezetés</em> viszont nem: a
        második lépés után még mindig határozatlan alak állt. Zárthelyin a lépés
        a pont, nem a szám. Az általános szabály:{" "}
        <M>{"\\lim \\frac{p(n)}{q(n)} = \\frac{p_k}{q_m}"}</M>, ha a két fokszám
        egyenlő.
      </>
    ),
  },
  {
    cim: "Gyökös különbség — hol a hiba?",
    feladat: (
      <>
        Számítsd ki:{" "}
        <M>
          {
            "\\lim\\limits_{n\\to\\infty}\\left(\\sqrt{n^2+4} - \\sqrt{n^2-n}\\right)"
          }
        </M>
        .
      </>
    ),
    lepesek: [
      {
        szoveg: (
          <>
            <M>{"\\sqrt{n^2+4} \\to +\\infty"}</M> és{" "}
            <M>{"\\sqrt{n^2-n} \\to +\\infty"}</M>.
          </>
        ),
      },
      {
        szoveg: (
          <>
            A különbség határértéke a határértékek különbsége, tehát{" "}
            <M>{"+\\infty - \\infty = 0"}</M>.
          </>
        ),
        hibas: true,
        javitas: (
          <>
            A műveleti tétel <strong>csak véges</strong> részhatárértékekre
            érvényes. Az <M>{"\\infty-\\infty"}</M> határozatlan alak: dolgozni
            kell vele. Bővítsünk a konjugálttal:{" "}
            <M>
              {
                "\\dfrac{(n^2+4)-(n^2-n)}{\\sqrt{n^2+4}+\\sqrt{n^2-n}} = \\dfrac{n+4}{\\sqrt{n^2+4}+\\sqrt{n^2-n}}"
              }
            </M>
            .
          </>
        ),
      },
      {
        szoveg: (
          <>
            Ellenőrzésül <M>{"n = 1000"}</M>:{" "}
            <M>{"\\sqrt{1000004} - \\sqrt{999000} \\approx 0{,}502"}</M>.
          </>
        ),
      },
      { szoveg: <>Tehát a sorozat konvergens.</> },
    ],
    tanulsag: (
      <>
        A helyes eredmény <M>{"\\frac12"}</M>: <M>{"n"}</M>-nel osztva (a gyök
        alatt <M>{"n^2"}</M>-tel!){" "}
        <M>
          {
            "\\dfrac{1+\\frac4n}{\\sqrt{1+\\frac{4}{n^2}}+\\sqrt{1-\\frac1n}} \\to \\dfrac{1}{2}"
          }
        </M>
        . A harmadik lépés számpróbája már lebuktatta volna a hibát — érdemes
        mindig beszúrni egy nagy <M>{"n"}</M>-et.
      </>
    ),
  },
  {
    cim: "e-típusú határérték — hol a hiba?",
    feladat: (
      <>
        Számítsd ki:{" "}
        <M>
          {"\\lim\\limits_{n\\to\\infty}\\left(1+\\dfrac{2}{n}\\right)^{n}"}
        </M>
        .
      </>
    ),
    lepesek: [
      {
        szoveg: (
          <>
            Az alap <M>{"1 + \\frac2n"}</M> alakú, a „kicsi” rész{" "}
            <M>{"\\frac2n"}</M>, ennek reciproka <M>{"\\frac n2"}</M>.
          </>
        ),
      },
      {
        szoveg: (
          <>
            A zárójelben lévő rész tehát <M>{"e"}</M>-hez tart, így a határérték{" "}
            <M>{"e \\approx 2{,}718"}</M>.
          </>
        ),
        hibas: true,
        javitas: (
          <>
            Kimaradt a <strong>külső kitevő</strong>. Helyesen{" "}
            <M>
              {
                "\\left(1+\\frac2n\\right)^{n} = \\left[\\left(1+\\frac2n\\right)^{\\frac n2}\\right]^{2}"
              }
            </M>
            : a szögletes zárójel <M>{"e"}</M>-hez tart, a külső kitevő{" "}
            <M>{"2"}</M>, tehát a határérték <M>{"e^2 \\approx 7{,}389"}</M>.
          </>
        ),
      },
      {
        szoveg: (
          <>
            Az <M>{"1^{\\infty}"}</M> alak tehát itt is <M>{"e"}</M> valamelyik
            hatványát adja.
          </>
        ),
      },
      { szoveg: <>A sorozat konvergens, a határértéke véges pozitív szám.</> },
    ],
    tanulsag: (
      <>
        A recept harmadik lépése kötelező:{" "}
        <strong>számold ki a külső kitevő határértékét</strong>. Így jön ki{" "}
        <M>{"\\left(1+\\frac cn\\right)^n \\to e^c"}</M>, és így derül ki az is,
        hogy <M>{"\\left(1+\\frac{1}{n^2}\\right)^{n} \\to e^0 = 1"}</M> — nem
        minden <M>{"1^{\\infty}"}</M> ad <M>{"e"}</M>-t.
      </>
    ),
  },
  {
    cim: "Rekurzív sorozat — hol a hiba?",
    feladat: (
      <>
        Legyen <M>{"a_1 = 3"}</M> és <M>{"a_{n+1} = 2a_n"}</M>. Konvergens-e a
        sorozat, és mi a határértéke?
      </>
    ),
    lepesek: [
      {
        szoveg: (
          <>
            Az első tagok: <M>{"3,\\ 6,\\ 12,\\ 24,\\ 48,\\ \\dots"}</M>
          </>
        ),
      },
      {
        szoveg: (
          <>
            Jelölje <M>{"A"}</M> a határértéket. A rekurzió mindkét oldalán
            határértéket véve <M>{"A = 2A"}</M>, ebből <M>{"A = 0"}</M>.
          </>
        ),
        hibas: true,
        javitas: (
          <>
            Az <M>{"A = f(A)"}</M> egyenlet felírása csak akkor jogos, ha a
            konvergenciát <strong>előbb</strong> igazoltuk. Itt a sorozat
            monoton nő, de <em>nem korlátos</em> (
            <M>{"a_n = 3\\cdot 2^{n-1} \\to +\\infty"}</M>), tehát divergens —
            nincs mit behelyettesíteni.
          </>
        ),
      },
      {
        szoveg: (
          <>
            A <M>{"0"}</M> valóban kielégíti az <M>{"A = 2A"}</M> egyenletet.
          </>
        ),
      },
      { szoveg: <>Más megoldása az egyenletnek nincs.</> },
    ],
    tanulsag: (
      <>
        A helyes sorrend mindig:{" "}
        <strong>
          korlátosság → monotonitás → konvergencia → és csak ezután az egyenlet
        </strong>
        . A KF‑5-ben épp ezért kellett indukcióval belátni, hogy{" "}
        <M>{"a_n < 2"}</M>, mielőtt az <M>{"A = \\sqrt{2+A}"}</M> egyenletet
        felírtuk.
      </>
    ),
  },
];
