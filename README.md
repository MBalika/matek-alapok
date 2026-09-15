# Matematika – Analízis, első félév

Interaktív tananyag a BME Építőmérnöki Kar első féléves **matematika** (analízis)
tárgyához. A [statika-erok](https://statika-erok.vercel.app) testvéroldala: ugyanaz a
felépítés, ugyanazok a komponensek, ugyanaz a technológia. Minden modulban elmélet
mozgatható ábrákkal, az előadás példái lépésenként kidolgozva, kalkulátorok és
véletlenszerűen generált gyakorlófeladatok — továbbá kvíz, hibakereső, animált
„film” megoldások, játék, Zh-szimulátor, egyoldalas puska és sötét mód.

## Állapot

| Modul | Tartalom | Állapot |
| --- | --- | --- |
| Bevezetés | útmutató, jelölések, számkörök, nevezetes szögek | kész |
| 1. Komplex számok | algebrai és trigonometrikus alak, Gauss-sík, Moivre, gyökvonás, egyenletek | kész |
| 2. Térgeometria | vektorok, skaláris/vektoriális/vegyes szorzat, egyenes és sík, távolságok, szögek | kész |
| 3. Sorozatok | konvergencia, küszöbindex, határozatlan alakok, rendőrelv, rekurzió, nagyságrendek, az e szám | kész |
| 4. Függvények | tulajdonságok, inverz, arkusz- és hiperbolikus függvények, görbék, határérték, folytonosság, Bolzano | kész |
| 5. Differenciálszámítás | derivált, szabályok, érintő, középértéktételek, L'Hospital, függvényvizsgálat, szélsőérték, Taylor | kész |
| 6. Határozatlan integrál | alapintegrálok, helyettesítés, parciális, racionális törtek, trig és gyökös | kész |
| 7. Határozott integrál | Riemann-integrál, Newton–Leibniz, terület, ívhossz, forgástest, súlypont, nyomaték | kész |
| 8. Improprius és numerikus integrálás | két típus, p-kritérium, összehasonlító kritériumok, Torricelli, trapéz- és Simpson-szabály | kész |

Mind a nyolc modul elkészült; a `Hamarosan` komponens csak tartalék.

Külön oldalak: **/zh** (Zh-szimulátor: 4–8 feladat a kiválasztott modulokból,
órával, eredmény mezőnként, előzmények a böngészőben) és **/puska** (modulonként
egyoldalas képletgyűjtemény, nyomtatható). Minden kész modulban: 6–8 interaktív
ábra, 5–6 kidolgozott feladat az előadás példáiból, két animált film, két
kalkulátor, kvíz, hibakereső, játék és 9 feladatgenerátor. Modulonkénti extrák:
1. Mandelbrot-halmaz, forgó mutató, hatványspirál, Célbalövés; 2. forgatható 3D
ábrák (Ter3D), nyomaték-játszótér, „Párhuzamos, metsző vagy kitérő?”;
3. ε-sáv és küszöbindex-felfedező, pókháló-ábra, nagyságrend-verseny, e-szám,
Fibonacci-spirál, „Hova tart?”; 4. értelmezési tartomány, inverz-tükrözés, arkusz,
paraméteres/poláris görbék, ε–δ, szakadások, Bolzano-felezés, „Melyik függvény?”;
5. szelő→érintő, f és f′, érintő/normális, Lagrange, függvényvizsgáló, dobozfeladat,
Taylor-polinomok, „Mennyi a meredekség?”; 6. primitív függvények serege, villámkártyák,
mintafelismerő, parciális választó, parciális törtek, a→v→s, „Melyik módszer?”;
7. Riemann-összegek, átlagérték, integrálfüggvény, terület, ívhossz, forgástest,
súlypont-billegő, Pappus–Guldin, „Mekkora a terület?”; 8. szingularitás és végtelen
tartomány, kritériumok, Torricelli-trombita, trapéz/Simpson, mért adatok,
„Konvergens vagy divergens?”.

## Futtatás helyben

```bash
npm install
npm run dev       # fejlesztői szerver: http://localhost:3000
npm run build     # éles build
npm run start     # az éles build kiszolgálása
```

Node 20 vagy újabb szükséges.

## Telepítés GitHubra és Vercelre

Ugyanúgy, mint a statika-erok esetében.

1. Hozz létre egy üres repót a GitHubon (például `matek-alapok`).
2. Ebben a mappában:

   ```bash
   git init
   git add .
   git commit -m "Matematika – Analízis: bevezetés és 1. modul"
   git branch -M main
   git remote add origin https://github.com/<felhasznalonev>/matek-alapok.git
   git push -u origin main
   ```

3. A [vercel.com](https://vercel.com) felületén: **Add New → Project → Import Git
   Repository**, és válaszd ki a repót. A Vercel felismeri a Next.js projektet, nem
   kell semmit beállítani.
4. A `main` ágra való minden további push automatikusan új verziót telepít.

## A projekt felépítése

```
src/
  app/
    layout.js                közös fejléc, lábléc, metaadatok
    page.js                  Bevezetés (kezdőlap)
    komplex/page.js          1. modul – teljes tartalom
    tergeometria/page.js     2. modul
    sorozatok/page.js        3. modul
    fuggvenyek/page.js       4. modul
    derivalas/page.js        5. modul
    hatarozatlan-integral/page.js  6. modul
    hatarozott-integral/page.js    7. modul
    improprius/page.js       8. modul
    zh/page.js               Zh-szimulátor oldal
    puska/page.js            egyoldalas puska (nyomtatható)
    globals.css              színrendszer és közös stílusok (azonos a statika oldallal)
  components/
    SiteHeader.js            felső navigáció, mobil menü
    SiteFooter.js            lábléc
    ModulKeret.js            modulfejléc és ragadós szakasznavigáció
    KidolgozottFeladat.js    lépésenként feltárható mintapélda
    GyakorloDoboz.js         általános gyakorlófeladat-motor (konfetti 5 jó válasz után)
    Kviz.js                  feleletválasztós kvíz motor
    Hibakereso.js            „hol a hiba?” feladatmotor
    SotetKapcsolo.js         sötét mód kapcsoló (localStorage: matek-tema)
    NyomtatasGomb.js         nyomtatás / PDF gomb a puskához
    Hamarosan.js             a még el nem készült modulok oldala
    ui/
      Elemek.js              szakasz, kártya, kiemelő doboz, ábrakeret
      Keplet.js              KaTeX képletek (M, MB, KepletDoboz)
      Konfetti.js            konfetti-animáció
    anim/
      FeladatFilm.js         animált, fejezetekre osztott „film” lejátszó
      Idovonal.js            időzítés, könnyítő görbék (useIdovonal, arany, lerp)
      FilmElemek.js          animált SVG elemek (nyíl, vonal, ív, felirat, pont)
    zh/
      ZhSzimulator.js        Zh-szimulátor (órával, kiértékeléssel, előzményekkel)
    abrak/
      SvgElemek.js           közös SVG építőelemek (nyíl, tengely, szögív, fogópont)
      Csuszka.js             feliratos csúszka
      GaussSikFelfedezo.js   interaktív: komplex szám a Gauss-síkon, konjugált, r és φ
      SzorzasFelfedezo.js    interaktív: szorzás és osztás mint forgatva nyújtás
      GyokFelfedezo.js       interaktív: az n-edik gyökök szabályos sokszöge
      KomplexKalk.js         kalkulátorok: műveletek/alakváltás, hatvány/gyökök
      KomplexStatikusAbrak.js  elméleti ábrák: összeadás, negyedek, egységgyökök
      HatvanySpiral.js       interaktív: z, z², z³ … a logaritmikus spirálon
      ForgoMutato.js         animáció: forgó mutató és a szinuszos vetülete
      Mandelbrot.js          Mandelbrot-halmaz (canvas), pálya és nagyítás
      CelbaLoves.js          játék: hol van a szám a Gauss-síkon?
      Ter3D.js               forgatható axonometrikus 3D-rajzolás (vetit, useForgatas, Nyil3D, Sik3D …)
      Ter*.js                a 2. modul interaktív és statikus ábrái, kalkulátorai, nyomaték-játszótér
      HelyzetFelismero.js    játék: párhuzamos, metsző vagy kitérő?
      SorKifejezes.js        biztonságos képlet-kiértékelő (n-től függő kifejezések)
      SorRajz.js             sorozat-grafikon ε-sávval és küszöbindexszel
      Sor*.js                a 3. modul felfedezői, kalkulátorai, statikus ábrái
      SorHatarertekLovolde.js  játék: hova tart a sorozat?
      FvRajz.js              KÖZÖS függvénygrafikon-rajzoló (görbék, pontok, érintők, aszimptoták, saját SVG)
      Fv*.js, Der*.js, Hi*.js, Ho*.js, Im*.js  a 4–8. modul felfedezői, kalkulátorai, statikus ábrái, játékai
    komplex/
      GyakorloSzekcio.js     az 1. modul öt feladatgenerátora (GENERATOROK)
      GyakorloExtra.js       további négy feladattípus (EXTRA_GENERATOROK)
      KvizAdatok.js          a kvíz kérdései és a hibakereső feladatai
      FilmSpiral.js          film: (1+i)¹⁰ a hatványspirálon
      FilmGyok.js            film: a −128−128√3 i negyedik gyökei
    tergeometria/            a 2. modul generátorai, kvíz/hibakereső adatai, filmjei, vektorok.js segéd
    sorozatok/               a 3. modul generátorai, kvíz/hibakereső adatai, filmjei
    fuggvenyek/, derivalas/, hatarozatlan/, hatarozott/, improprius/  ugyanez a 4–8. modulhoz
    puska/
      PuskaElemek.js         a puska Lap és Doboz építőelemei
      Puska<Modul>.js        modulonként egy oldal
  lib/
    oldalterkep.js           a modulok listája – innen épül a navigáció
    szamok.js                magyar számformázás, szögek
    komplex.js               komplex aritmetika, alakváltás, KaTeX-kiírás
    zhFeladatok.js           a Zh-szimulátor feladatgenerátorainak jegyzéke modulonként
```

## Hogyan bővíthető

**Új modul elkészítése:** a `src/lib/oldalterkep.js`-ben állítsd a modul
`kesz` mezőjét `true`-ra, és a `src/app/<slug>/page.js` fájlban a `Hamarosan`
komponens helyére írd meg a tartalmat a `komplex/page.js` mintájára (négy szakasz:
`elmelet`, `peldak`, `kalkulator`, `gyakorlas`). A navigáció, a lábléc és a
kezdőlapi kártyák automatikusan frissülnek. Ha a modulnak vannak
gyakorlófeladat-generátorai, vedd fel őket a `src/lib/zhFeladatok.js` listájába —
onnantól a Zh-szimulátor is húz belőlük —, és írd meg a modul puskáját a
`src/app/puska/page.js`-ben.

**Kvíz és hibakereső:** a `Kviz` komponens `kerdesek` tömböt kap
(`{ k, v: [négy válasz], helyes: index, magyarazat }`), a `Hibakereso` pedig
`feladatok` tömböt (`{ cim, feladat, lepesek: [{ szoveg, hibas, javitas }], tanulsag }`).
Mintának lásd a `komplex/KvizAdatok.js`-t.

**Film (animált megoldás):** a `FeladatFilm` komponens `fejezetek` listát
(`{ t0, cim, szoveg, kepletek }`) és egy `rajz(t)` függvényt kap, amely az adott
időpillanathoz tartozó SVG-t adja vissza; az `anim/Idovonal.js` `arany(t, t0, t1)`
függvénye 0 és 1 közé képezi az időt, ebből lehet a nyilakat, íveket növeszteni.

**Új kidolgozott feladat:**

```jsx
<KidolgozottFeladat jel="KF‑6" ido="6 perc" cim="..." feladat={<p>...</p>}
                    tanulsag={<p>...</p>}>
  <Lepes cim="Első lépés">...</Lepes>
  <Lepes cim="Második lépés">...</Lepes>
</KidolgozottFeladat>
```

**Új gyakorlófeladat-típus:** írj egy generátorfüggvényt, amely minden hívásnál
új feladatot ad vissza, és add át a `GyakorloDoboz`-nak:

```js
function ujFeladat() {
  return {
    szoveg: <p>…</p>,          // a feladat kiírása
    sugo: <p>…</p>,            // opcionális segítség
    mezok: [{ id: "re", cimke: "Re(z)", helyes: 2.5, tizedes: 3 }],
    megoldas: <>…</>,          // a teljes levezetés
  };
}
```

A `mezok` elemeinél a `tures` mezővel állítható az elfogadott eltérés
(alapértelmezés: a helyes érték 1,5 %-a, de legalább 0,01). Szögekhez érdemes
`tures: 0.6`-ot adni.

**Képletek:** a `M` komponens soron belüli, a `MB` önálló sorban álló KaTeX
képletet renderel. A magyar tizedesvesszőt automatikusan kezeli. A magyar
szögfüggvény-jelölésekhez `\operatorname{tg}`, `\operatorname{arctg}` stb.

**Komplex számok kiírása:** a `lib/komplex.js` `algK(z, tizedes)` függvénye
KaTeX-kompatibilis algebrai alakot ad („3 + 2i”, „−i”, „7”), a `trigK` pedig
trigonometrikus alakot.

## Háttéranyag

Az előadásjegyzetek témakörei (komplex számok, térgeometria, sorozatok,
függvények, differenciál- és integrálszámítás). Az 1. modul kidolgozott feladatai
az előadás példáit követik: a négy alapművelet (4+3i, 8−5i), a három
trigonometrikus alak, (1+i)¹⁰, a −128−128√3 i negyedik gyökei és a
z²+4z+13 = 0 egyenlet.

## Technikai háttér

Next.js (App Router) · React · Tailwind CSS · KaTeX. Nincs adatbázis és nincs
szerveroldali logika: az egész oldal statikusan előrenderelhető, a
gyakorlófeladatok a böngészőben generálódnak. A Zh-előzmények, a játék rekordja és
a sötét mód beállítása a böngésző localStorage-ában marad (`matek-zh-elozmenyek`,
`matek-celbaloves-rekord`, `matek-tema`).
