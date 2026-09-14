# Matematika – Analízis, első félév

Interaktív tananyag a BME Építőmérnöki Kar első féléves **matematika** (analízis)
tárgyához. A [statika-erok](https://statika-erok.vercel.app) testvéroldala: ugyanaz a
felépítés, ugyanazok a komponensek, ugyanaz a technológia. Minden modulban elmélet
mozgatható ábrákkal, az előadás példái lépésenként kidolgozva, kalkulátorok és
véletlenszerűen generált gyakorlófeladatok.

## Állapot

| Modul | Tartalom | Állapot |
| --- | --- | --- |
| Bevezetés | útmutató, jelölések, számkörök, nevezetes szögek | kész |
| 1. Komplex számok | algebrai és trigonometrikus alak, Gauss-sík, Moivre, gyökvonás, egyenletek | kész |
| 2. Térgeometria | vektorok, skaláris/vektoriális/vegyes szorzat, egyenes és sík | váz |
| 3. Sorozatok | konvergencia, rendőrelv, nevezetes határértékek, az e szám | váz |
| 4. Függvények | tulajdonságok, inverz, határérték, folytonosság | váz |
| 5. Differenciálszámítás | derivált, szabályok, középértéktételek, függvényvizsgálat | váz |
| 6. Határozatlan integrál | alapintegrálok, helyettesítés, parciális, racionális törtek | váz |
| 7. Határozott integrál | Riemann-integrál, Newton–Leibniz, alkalmazások | váz |
| 8. Improprius és numerikus integrálás | konvergencia, trapéz- és Simpson-szabály | váz |

A vázmodulok a `Hamarosan` komponenst mutatják a tervezett tartalommal.

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
    <slug>/page.js           2–8. modul (egyelőre váz)
    globals.css              színrendszer és közös stílusok (azonos a statika oldallal)
  components/
    SiteHeader.js            felső navigáció, mobil menü
    SiteFooter.js            lábléc
    ModulKeret.js            modulfejléc és ragadós szakasznavigáció
    KidolgozottFeladat.js    lépésenként feltárható mintapélda
    GyakorloDoboz.js         általános gyakorlófeladat-motor
    Hamarosan.js             a még el nem készült modulok oldala
    ui/
      Elemek.js              szakasz, kártya, kiemelő doboz, ábrakeret
      Keplet.js              KaTeX képletek (M, MB, KepletDoboz)
    abrak/
      SvgElemek.js           közös SVG építőelemek (nyíl, tengely, szögív, fogópont)
      Csuszka.js             feliratos csúszka
      GaussSikFelfedezo.js   interaktív: komplex szám a Gauss-síkon, konjugált, r és φ
      SzorzasFelfedezo.js    interaktív: szorzás és osztás mint forgatva nyújtás
      GyokFelfedezo.js       interaktív: az n-edik gyökök szabályos sokszöge
      KomplexKalk.js         kalkulátorok: műveletek/alakváltás, hatvány/gyökök
      KomplexStatikusAbrak.js  elméleti ábrák: összeadás, negyedek, egységgyökök
    komplex/
      GyakorloSzekcio.js     az 1. modul öt feladatgenerátora
  lib/
    oldalterkep.js           a modulok listája – innen épül a navigáció
    szamok.js                magyar számformázás, szögek
    komplex.js               komplex aritmetika, alakváltás, KaTeX-kiírás
```

## Hogyan bővíthető

**Új modul elkészítése:** a `src/lib/oldalterkep.js`-ben állítsd a modul
`kesz` mezőjét `true`-ra, és a `src/app/<slug>/page.js` fájlban a `Hamarosan`
komponens helyére írd meg a tartalmat a `komplex/page.js` mintájára (négy szakasz:
`elmelet`, `peldak`, `kalkulator`, `gyakorlas`). A navigáció, a lábléc és a
kezdőlapi kártyák automatikusan frissülnek.

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
gyakorlófeladatok a böngészőben generálódnak.
