import { M, MB } from "@/components/ui/Keplet";

/* ---------- Fogalmi kvíz ---------- */

export const KVIZ = [
  {
    k: <>Mennyi a <M>{"z = 4 - 3i"}</M> szám képzetes része?</>,
    v: [<><M>{"-3"}</M></>, <><M>{"-3i"}</M></>, <><M>{"3"}</M></>, <><M>{"4"}</M></>],
    helyes: 0,
    magyarazat: <>A képzetes rész az <M>{"i"}</M> együtthatója, tehát mindig <strong>valós szám</strong>: <M>{"\\operatorname{Im} z = -3"}</M>. A <M>{"-3i"}</M> a képzetes <em>tag</em>, nem a képzetes rész.</>,
  },
  {
    k: <>Hány különböző negyedik gyöke van a <M>{"z = -16"}</M> számnak a komplex számok között?</>,
    v: [<>Négy.</>, <>Kettő: <M>{"2i"}</M> és <M>{"-2i"}</M>.</>, <>Egy sincs, mert negatív.</>, <>Végtelen sok.</>],
    helyes: 0,
    magyarazat: <>Minden nem nulla komplex számnak pontosan <M>{"n"}</M> darab <M>{"n"}</M>-edik gyöke van, itt négy: <M>{"\\pm\\sqrt2 \\pm \\sqrt2\\,i"}</M>, a 2 sugarú körön egy négyzet csúcsaiban. A <M>{"k"}</M> értékét csak <M>{"0,\\dots,n-1"}</M>-ig érdemes futtatni, utána ismétlődik.</>,
  },
  {
    k: <>Mit csinál geometriailag az <M>{"i"}</M>-vel való szorzás a Gauss-síkon?</>,
    v: [<>Elforgat <M>{"90^\\circ"}</M>-kal az origó körül.</>, <>Tükröz a valós tengelyre.</>, <>Kétszeresére nyújt.</>, <>Elforgat <M>{"180^\\circ"}</M>-kal.</>],
    helyes: 0,
    magyarazat: <>Az <M>{"i"}</M> abszolút értéke 1, argumentuma <M>{"90^\\circ"}</M>; a szorzásnál az argumentumok összeadódnak, a hossz nem változik. Ezért <M>{"i\\cdot i = -1"}</M>: kétszer <M>{"90^\\circ"}</M> az <M>{"180^\\circ"}</M>.</>,
  },
  {
    k: <>A <M>{"z = -1 - \\sqrt3\\,i"}</M> számra a számológép <M>{"\\operatorname{arctg}(\\sqrt3) = 60^\\circ"}</M>-ot ad. Mennyi valójában az argumentum?</>,
    v: [<><M>{"240^\\circ"}</M></>, <><M>{"60^\\circ"}</M></>, <><M>{"120^\\circ"}</M></>, <><M>{"300^\\circ"}</M></>],
    helyes: 0,
    magyarazat: <>Mindkét koordináta negatív, a szám a III. negyedben van, ezért <M>{"\\varphi = 180^\\circ + 60^\\circ = 240^\\circ"}</M>. A <M>{"\\operatorname{tg}\\varphi = \\sqrt3"}</M> egyenletnek <M>{"60^\\circ"}</M> és <M>{"240^\\circ"}</M> is megoldása — a negyedet az előjelek döntik el, nem a gép.</>,
  },
  {
    k: <>Melyik állítás igaz minden <M>{"z"}</M> komplex számra?</>,
    v: [<><M>{"|z|^2 = z\\bar z"}</M></>, <><M>{"|z|^2 = z^2"}</M></>, <><M>{"|z| = z"}</M>, ha <M>{"z"}</M> nem negatív.</>, <><M>{"|z_1 + z_2| = |z_1| + |z_2|"}</M></>],
    helyes: 0,
    magyarazat: <>Az abszolút érték négyzete a szám és a konjugáltjának szorzata: <M>{"(a+bi)(a-bi) = a^2+b^2"}</M>. A <M>{"z^2"}</M> általában komplex (<M>{"i^2 = -1"}</M>, de <M>{"|i|^2 = 1"}</M>). Az összegre csak a háromszög-egyenlőtlenség (<M>{"\\le"}</M>) igaz.</>,
  },
  {
    k: <>Hol a hiba: <M>{"-1 = i\\cdot i = \\sqrt{-1}\\cdot\\sqrt{-1} = \\sqrt{(-1)(-1)} = \\sqrt1 = 1"}</M>?</>,
    v: [<>A <M>{"\\sqrt x\\sqrt y = \\sqrt{xy}"}</M> azonosság csak nemnegatív valósakra érvényes.</>, <><M>{"i\\cdot i"}</M> nem <M>{"-1"}</M>, hanem <M>{"1"}</M>.</>, <><M>{"\\sqrt1"}</M> nem 1.</>, <>Nincs hiba, a komplex számok ellentmondásosak.</>],
    helyes: 0,
    magyarazat: <>A gyökvonás komplex számokon többértékű, ezért a valós azonosságok nem vihetők át gondolkodás nélkül. Komplex gyököt mindig trigonometrikus alakban, a gyökképlettel számolj — az egyetlen biztonságos rövidítés <M>{"\\sqrt{-c} = i\\sqrt c"}</M> (<M>{"c>0"}</M>).</>,
  },
  {
    k: <>Egy valós együtthatós másodfokú egyenlet egyik gyöke <M>{"2 + 5i"}</M>. Mi a másik?</>,
    v: [<><M>{"2 - 5i"}</M></>, <><M>{"-2 + 5i"}</M></>, <><M>{"-2 - 5i"}</M></>, <>Bármi lehet.</>],
    helyes: 0,
    magyarazat: <>Valós együtthatók mellett a nem valós gyökök konjugált párokban járnak. Ellenőrzés Viète-vel: az összeg <M>{"4"}</M>, a szorzat <M>{"4+25 = 29"}</M> — mindkettő valós, ahogy kell.</>,
  },
  {
    k: <>Mennyi <M>{"(\\cos 30^\\circ + i\\sin 30^\\circ)^{12}"}</M>?</>,
    v: [<><M>{"1"}</M></>, <><M>{"-1"}</M></>, <><M>{"i"}</M></>, <><M>{"12"}</M></>],
    helyes: 0,
    magyarazat: <>Moivre: <M>{"r=1"}</M>, a szög <M>{"12\\cdot 30^\\circ = 360^\\circ"}</M>, ami ugyanaz, mint <M>{"0^\\circ"}</M>. Tehát <M>{"\\cos 0 + i\\sin 0 = 1"}</M>. A hatványozás egységnyi abszolút értéknél tiszta forgatás.</>,
  },
  {
    k: <>Melyik művelethez <strong>nem</strong> érdemes trigonometrikus alakot használni?</>,
    v: [<>Összeadás.</>, <>Hatványozás.</>, <>Gyökvonás.</>, <>Osztás.</>],
    helyes: 0,
    magyarazat: <>Összeadásnál a komponensek adódnak össze — az algebrai alak való rá. Szorzásnál, osztásnál, hatványozásnál és gyökvonásnál viszont a trigonometrikus alak három sorra rövidíti a számolást.</>,
  },
  {
    k: <>Mit ír le a <M>{"|z - (2+i)| = 3"}</M> egyenlet a Gauss-síkon?</>,
    v: [<>A <M>{"2+i"}</M> középpontú, 3 sugarú kört.</>, <>A <M>{"2+i"}</M> ponton átmenő egyenest.</>, <>Az origó középpontú, 3 sugarú kört.</>, <>Egyetlen pontot.</>],
    helyes: 0,
    magyarazat: <><M>{"|z - z_0|"}</M> a <M>{"z"}</M> és <M>{"z_0"}</M> pontok távolsága. Azok a pontok, amelyek a <M>{"2+i"}</M>-től 3-ra vannak, egy kört alkotnak. Ez a legegyszerűbb példa arra, hogy az abszolút érték geometria.</>,
  },
];

/* ---------- Hibakereső: egy helyen hibás megoldások ---------- */

export const HIBAK = [
  {
    cim: "Trigonometrikus alak — hol a hiba?",
    feladat: <>Írd fel trigonometrikus alakban: <M>{"z = -2 + 2i"}</M>.</>,
    lepesek: [
      { szoveg: <><M>{"r = \\sqrt{(-2)^2 + 2^2} = \\sqrt8 = 2\\sqrt2"}</M></> },
      { szoveg: <><M>{"\\operatorname{tg}\\varphi = \\dfrac{2}{-2} = -1"}</M></> },
      {
        szoveg: <>A számológép szerint <M>{"\\varphi = \\operatorname{arctg}(-1) = -45^\\circ"}</M>, ami <M>{"315^\\circ"}</M>-nak felel meg.</>,
        hibas: true,
        javitas: <>A <M>{"-2+2i"}</M> a <strong>II. negyedben</strong> van (<M>{"a<0,\\ b>0"}</M>), a <M>{"315^\\circ"}</M> viszont a IV. negyed. A hegyesszög <M>{"45^\\circ"}</M>, ezért <M>{"\\varphi = 180^\\circ - 45^\\circ = 135^\\circ"}</M>. Ugyanaz a tangensérték két negyedhez tartozik — a gép mindig csak az egyiket adja.</>,
      },
      { szoveg: <><M>{"z = 2\\sqrt2\\left(\\cos\\varphi + i\\sin\\varphi\\right)"}</M></> },
    ],
    tanulsag: <>Trig alakra hozásnál az utolsó lépés mindig a visszahelyettesítés: <M>{"2\\sqrt2\\cos 315^\\circ = +2"}</M> lett volna, nem <M>{"-2"}</M> — ez azonnal lebuktatja a rossz negyedet.</>,
  },
  {
    cim: "Osztás — hol a hiba?",
    feladat: <>Számítsd ki: <M>{"\\dfrac{3+i}{1-2i}"}</M>.</>,
    lepesek: [
      { szoveg: <>Bővítünk, hogy a nevező valós legyen.</> },
      {
        szoveg: <><M>{"\\dfrac{3+i}{1-2i} = \\dfrac{(3+i)(3-i)}{(1-2i)(3-i)}"}</M></>,
        hibas: true,
        javitas: <>A <strong>nevező</strong> konjugáltjával kell bővíteni, nem a számlálóéval: <M>{"\\dfrac{(3+i)(1+2i)}{(1-2i)(1+2i)}"}</M>. Így lesz a nevező <M>{"1^2+2^2 = 5"}</M>, valós szám.</>,
      },
      { szoveg: <>A számlálót kifejtjük, <M>{"i^2 = -1"}</M>.</> },
      { szoveg: <>Az eredményt szétbontjuk valós és képzetes részre.</> },
    ],
    tanulsag: <>Helyesen: <M>{"\\dfrac{(3+i)(1+2i)}{5} = \\dfrac{3 + 6i + i + 2i^2}{5} = \\dfrac{1 + 7i}{5} = 0{,}2 + 1{,}4i"}</M>.</>,
  },
  {
    cim: "Szorzás — hol a hiba?",
    feladat: <>Számítsd ki: <M>{"(2+3i)(4-i)"}</M>.</>,
    lepesek: [
      { szoveg: <>Zárójelfelbontás tagonként: <M>{"2\\cdot 4 + 2\\cdot(-i) + 3i\\cdot 4 + 3i\\cdot(-i)"}</M></> },
      { szoveg: <><M>{"= 8 - 2i + 12i - 3i^2"}</M></> },
      {
        szoveg: <><M>{"= 8 + 10i - 3i^2 = 5 + 10i"}</M>, mert <M>{"i^2 = i\\cdot i"}</M>, és <M>{"-3i^2 = -3"}</M>.</>,
        hibas: true,
        javitas: <><M>{"i^2 = -1"}</M>, ezért <M>{"-3i^2 = -3\\cdot(-1) = +3"}</M>. Helyesen: <M>{"8 + 10i + 3 = 11 + 10i"}</M>. Az <M>{"i^2"}</M> előtti mínusz és a <M>{"-1"}</M> együtt pluszt ad — ez a leggyakoribb előjelhiba.</>,
      },
      { szoveg: <>Az eredmény algebrai alakban: valós rész és képzetes rész.</> },
    ],
    tanulsag: <>Ellenőrzés abszolút értékkel: <M>{"|2+3i|\\cdot|4-i| = \\sqrt{13}\\cdot\\sqrt{17} = \\sqrt{221}"}</M>, és <M>{"|11+10i| = \\sqrt{221}"}</M> ✓ — a hibás <M>{"5+10i"}</M> abszolút értéke <M>{"\\sqrt{125}"}</M> lett volna.</>,
  },
  {
    cim: "Gyökvonás — hol a hiba?",
    feladat: <>Határozd meg a <M>{"z = 8i"}</M> szám harmadik gyökeit.</>,
    lepesek: [
      { szoveg: <>Trigonometrikus alak: <M>{"r = 8"}</M>, <M>{"\\varphi = 90^\\circ"}</M>, mert a szám a pozitív képzetes tengelyen van.</> },
      { szoveg: <><M>{"\\rho = \\sqrt[3]{8} = 2"}</M></> },
      { szoveg: <><M>{"\\alpha_0 = \\dfrac{90^\\circ}{3} = 30^\\circ"}</M>, tehát <M>{"w_0 = 2(\\cos 30^\\circ + i\\sin 30^\\circ) = \\sqrt3 + i"}</M></> },
      {
        szoveg: <>Ellenőrzés: <M>{"(\\sqrt3+i)^3 = 8i"}</M> ✓, tehát <M>{"\\sqrt[3]{8i} = \\sqrt3 + i"}</M>.</>,
        hibas: true,
        javitas: <>Ez csak <strong>egy</strong> a három gyök közül. A képlet <M>{"\\alpha_k = (90^\\circ + k\\cdot 360^\\circ)/3"}</M>, <M>{"k = 0,1,2"}</M>: <M>{"30^\\circ,\\ 150^\\circ,\\ 270^\\circ"}</M>. A gyökök: <M>{"\\sqrt3 + i"}</M>, <M>{"-\\sqrt3 + i"}</M>, <M>{"-2i"}</M> — a 2 sugarú körön szabályos háromszögben.</>,
      },
    ],
    tanulsag: <>Az ellenőrzés helyes volt, de nem bizonyítja, hogy nincs több gyök. Egy <M>{"n"}</M>-edik gyökvonásnak mindig <M>{"n"}</M> megoldása van — ha kevesebbet írsz, a feladat nincs kész.</>,
  },
];
