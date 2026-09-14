// Az oldal szerkezete egy helyen. Új modul felvételéhez elég ide beírni
// egy új elemet, és létrehozni a hozzá tartozó src/app/<slug>/page.js fájlt.

export const kurzus = {
  cim: "Matematika",
  alcim: "Analízis – első félév",
  tanszek: "BME Építőmérnöki Kar",
  targy: "Matematika · előadás- és gyakorlatanyag",
  tankonyv:
    "Az előadásjegyzetek témakörei: komplex számok, térgeometria, sorozatok, függvények, differenciál- és integrálszámítás",
};

const negyLepes = [
  { id: "elmelet", cim: "Elmélet" },
  { id: "peldak", cim: "Kidolgozott feladatok" },
  { id: "kalkulator", cim: "Kalkulátorok" },
  { id: "gyakorlas", cim: "Gyakorlás" },
];

export const modulok = [
  {
    slug: "/",
    szam: null,
    cim: "Bevezetés",
    rovid: "Bevezetés",
    leiras:
      "Mire jó ez az anyag, hogyan használd, és milyen jelöléseket használunk végig.",
    kesz: true,
    szakaszok: [
      { id: "utmutato", cim: "Útmutató ehhez az anyaghoz" },
      { id: "jelolesek", cim: "Jelölésrendszer" },
      { id: "szamkorok", cim: "Számkörök" },
      { id: "pontossag", cim: "Szögek, kerekítés" },
      { id: "modulok", cim: "A nyolc modul" },
    ],
  },
  {
    slug: "/komplex",
    szam: 1,
    cim: "Komplex számok",
    rovid: "Komplex számok",
    leiras:
      "Algebrai és trigonometrikus alak, a Gauss-sík, műveletek, Moivre-képlet, gyökvonás, egyenletek.",
    kesz: true,
    szakaszok: negyLepes,
  },
  {
    slug: "/tergeometria",
    szam: 2,
    cim: "Térgeometria",
    rovid: "Térgeometria",
    leiras:
      "Vektorok a térben, skaláris, vektoriális és vegyes szorzat, egyenes és sík egyenletei, távolságok, szögek.",
    kesz: true,
    szakaszok: negyLepes,
  },
  {
    slug: "/sorozatok",
    szam: 3,
    cim: "Sorozatok",
    rovid: "Sorozatok",
    leiras:
      "Konvergencia és határérték, monoton korlátos sorozatok, rendőrelv, nevezetes határértékek, az e szám.",
    kesz: true,
    szakaszok: negyLepes,
  },
  {
    slug: "/fuggvenyek",
    szam: 4,
    cim: "Függvények, határérték, folytonosság",
    rovid: "Függvények",
    leiras:
      "Függvénytulajdonságok, inverz, elemi függvények, görbék, függvényhatárérték, folytonosság, Bolzano és Weierstrass tétele.",
    kesz: false,
    szakaszok: negyLepes,
  },
  {
    slug: "/derivalas",
    szam: 5,
    cim: "Differenciálszámítás",
    rovid: "Deriválás",
    leiras:
      "A derivált fogalma, deriválási szabályok, középértéktételek, L'Hospital, függvényvizsgálat, Taylor-polinom.",
    kesz: false,
    szakaszok: negyLepes,
  },
  {
    slug: "/hatarozatlan-integral",
    szam: 6,
    cim: "Határozatlan integrál",
    rovid: "Határozatlan ∫",
    leiras:
      "Primitív függvény, alapintegrálok, helyettesítés, parciális integrálás, racionális törtfüggvények.",
    kesz: false,
    szakaszok: negyLepes,
  },
  {
    slug: "/hatarozott-integral",
    szam: 7,
    cim: "Határozott integrál",
    rovid: "Határozott ∫",
    leiras:
      "Riemann-integrál, Newton–Leibniz-tétel, terület, ívhossz, forgástest térfogata és felszíne, súlypont.",
    kesz: false,
    szakaszok: negyLepes,
  },
  {
    slug: "/improprius",
    szam: 8,
    cim: "Improprius és numerikus integrálás",
    rovid: "Improprius ∫",
    leiras:
      "Nem korlátos tartomány és integrandus, konvergenciakritériumok, trapéz- és Simpson-szabály.",
    kesz: false,
    szakaszok: negyLepes,
  },
];

export const extraOldalak = [
  {
    slug: "/zh",
    rovid: "Zh-szimulátor",
    leiras: "Négy véletlen feladat órával, segítség nélkül – mint a zárthelyin.",
  },
  {
    slug: "/puska",
    rovid: "Puska",
    leiras: "Nyomtatható egyoldalas összefoglaló modulonként.",
  },
];

export function modulSlugAlapjan(slug) {
  return modulok.find((m) => m.slug === slug);
}
