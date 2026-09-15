"use client";

import GyakorloDoboz from "@/components/GyakorloDoboz";
import { M, MB } from "@/components/ui/Keplet";
import { szK } from "@/lib/szamok";

/* ---------- segédfüggvények ---------- */

const egesz = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
const valaszt = (tomb) => tomb[Math.floor(Math.random() * tomb.length)];
const nemNulla = (min, max) => {
  let v = 0;
  while (v === 0) v = egesz(min, max);
  return v;
};

function tag(c, valtozo = "", elso = false) {
  if (c === 0) return "";
  const jel = c < 0 ? "-" : elso ? "" : "+";
  const abs = Math.abs(c);
  const szam = abs === 1 && valtozo ? "" : String(abs);
  return `${jel}${szam}${valtozo}`;
}

const linearis = (a, b) => `${tag(a, "x", true)}${tag(b)}` || "0";

/* ---------- 1. Folytonossági paraméter ---------- */

function folytonossagFeladat() {
  const a = nemNulla(-3, 3);
  const c = egesz(1, 3);
  const d = valaszt([1, 2]);
  const e = egesz(-4, 4);
  const jobbErtek = d * c * c + e; // a jobb oldali darab értéke a c helyen
  const b = jobbErtek - a * c; // ettől lesz a bal oldali darab is ennyi

  return {
    szoveg: (
      <p>
        Milyen <M>{"b"}</M> mellett folytonos a függvény az <M>{`x = ${c}`}</M> helyen?
        <MB>{`f(x) = \\begin{cases} ${tag(a, "x", true)} + b, & x < ${c}\\\\[4pt] ${tag(d, "x^2", true)}${tag(e)}, & x \\ge ${c}\\end{cases}`}</MB>
      </p>
    ),
    sugo: (
      <p>
        A folytonossághoz a <strong>bal oldali határértéknek</strong>, a{" "}
        <strong>jobb oldali határértéknek</strong> és a <strong>függvényértéknek</strong> is meg kell
        egyeznie. Mindkét darab folytonos külön-külön, ezért elég a két képletet a{" "}
        <M>{`x = ${c}`}</M> helyen egyenlővé tenni.
      </p>
    ),
    mezok: [
      { id: "b", cimke: "A keresett b", helyes: b, tizedes: 2, tures: 0.01 },
      { id: "fc", cimke: `f(${c}) értéke`, helyes: jobbErtek, tizedes: 2, tures: 0.01 },
    ],
    megoldas: (
      <>
        <MB>{`\\lim_{x\\to ${c}-0} f(x) = ${a}\\cdot ${c} + b = ${a * c} + b`}</MB>
        <MB>{`\\lim_{x\\to ${c}+0} f(x) = f(${c}) = ${
          d === 1 ? `${c}^2` : `${d}\\cdot ${c}^2`
        } ${tag(e)} = ${jobbErtek}`}</MB>
        <MB>{`${a * c} + b = ${jobbErtek} \\ \\Longrightarrow\\ b = ${jobbErtek} ${tag(-a * c)} = ${b}`}</MB>
        <p>
          Minden más <M>{"b"}</M> esetén a két egyoldali határérték véges, de különböző:{" "}
          <strong>ugrás</strong> (elsőfajú szakadás) keletkezik, és az ugrás nagysága épp{" "}
          <M>{`\\left|b ${tag(-b)}\\right|`}</M>.
        </p>
      </>
    ),
  };
}

/* ---------- 2. Arkusz-összetétel ---------- */

const PAROK = [
  [3, 5],
  [4, 5],
  [5, 13],
  [12, 13],
  [8, 17],
  [15, 17],
  [7, 25],
  [24, 25],
  [1, 2],
  [2, 3],
  [1, 3],
  [3, 4],
];

function arkuszFeladat() {
  const [p, q] = valaszt(PAROK);
  const elojel = Math.random() < 0.35 ? -1 : 1;
  const x = (elojel * p) / q;
  const tipus = valaszt(["cosArcsin", "sinArccos", "tgArcsin"]);

  let kifejezes;
  let ertek;
  let szog;
  let szogNev;
  let levezetes;

  if (tipus === "cosArcsin") {
    kifejezes = `\\cos\\left(\\arcsin ${elojel < 0 ? "\\left(-" : ""}\\frac{${p}}{${q}}${elojel < 0 ? "\\right)" : ""}\\right)`;
    ertek = Math.sqrt(1 - x * x);
    szog = (Math.asin(x) * 180) / Math.PI;
    szogNev = `\\arcsin(${szK(x, 4)})`;
    levezetes = (
      <>
        <p>
          Legyen <M>{`\\alpha = \\arcsin(${szK(x, 4)})`}</M>. Ekkor <M>{`\\sin\\alpha = ${szK(x, 4)}`}</M>, és
          a definíció szerint <M>{"-\\tfrac{\\pi}{2}\\le\\alpha\\le\\tfrac{\\pi}{2}"}</M>, tehát{" "}
          <M>{"\\cos\\alpha \\ge 0"}</M> — a gyök előjele <strong>pozitív</strong>.
        </p>
        <MB>{`\\cos\\alpha = \\sqrt{1-\\sin^2\\alpha} = \\sqrt{1-\\frac{${p * p}}{${q * q}}} = \\frac{\\sqrt{${q * q - p * p}}}{${q}} = ${szK(ertek, 5)}`}</MB>
      </>
    );
  } else if (tipus === "sinArccos") {
    kifejezes = `\\sin\\left(\\arccos ${elojel < 0 ? "\\left(-" : ""}\\frac{${p}}{${q}}${elojel < 0 ? "\\right)" : ""}\\right)`;
    ertek = Math.sqrt(1 - x * x);
    szog = (Math.acos(x) * 180) / Math.PI;
    szogNev = `\\arccos(${szK(x, 4)})`;
    levezetes = (
      <>
        <p>
          Legyen <M>{`\\alpha = \\arccos(${szK(x, 4)})`}</M>. Ekkor <M>{"0\\le\\alpha\\le\\pi"}</M>, tehát{" "}
          <M>{"\\sin\\alpha \\ge 0"}</M> — itt is pozitív gyököt veszünk (pedig a koszinusz akár
          negatív is lehet).
        </p>
        <MB>{`\\sin\\alpha = \\sqrt{1-\\cos^2\\alpha} = \\sqrt{1-\\frac{${p * p}}{${q * q}}} = \\frac{\\sqrt{${q * q - p * p}}}{${q}} = ${szK(ertek, 5)}`}</MB>
      </>
    );
  } else {
    kifejezes = `\\operatorname{tg}\\left(\\arcsin ${elojel < 0 ? "\\left(-" : ""}\\frac{${p}}{${q}}${elojel < 0 ? "\\right)" : ""}\\right)`;
    ertek = x / Math.sqrt(1 - x * x);
    szog = (Math.asin(x) * 180) / Math.PI;
    szogNev = `\\arcsin(${szK(x, 4)})`;
    levezetes = (
      <>
        <p>
          Legyen <M>{`\\alpha = \\arcsin(${szK(x, 4)})`}</M>, ekkor <M>{`\\sin\\alpha = ${szK(x, 4)}`}</M> és{" "}
          <M>{`\\cos\\alpha = \\frac{\\sqrt{${q * q - p * p}}}{${q}}`}</M>.
        </p>
        <MB>{`\\operatorname{tg}\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha} = \\frac{${elojel < 0 ? "-" : ""}${p}}{\\sqrt{${q * q - p * p}}} = ${szK(ertek, 5)}`}</MB>
      </>
    );
  }

  return {
    szoveg: (
      <p>
        Számítsd ki pontosan (a derékszögű háromszög segítségével), majd add meg a belső arkuszérték
        szögét fokban is:
        <MB>{kifejezes}</MB>
      </p>
    ),
    sugo: (
      <p>
        Nevezd el a belső arkuszértéket <M>{"\\alpha"}</M>-nak, írd fel, mennyi a szinusza (vagy a
        koszinusza), és használd a <M>{"\\sin^2+\\cos^2 = 1"}</M> azonosságot. Az{" "}
        <strong>előjelet</strong> az arkuszfüggvény értékkészlete dönti el, nem a beírt szám előjele.
      </p>
    ),
    mezok: [
      { id: "ert", cimke: "A kifejezés értéke (4 tizedes)", helyes: ertek, tizedes: 4 },
      { id: "szog", cimke: "A belső szög fokban (1 tizedes)", helyes: szog, tizedes: 1, tures: 0.6 },
    ],
    megoldas: (
      <>
        {levezetes}
        <MB>{`${szogNev} = ${szK(szog, 3)}^\\circ`}</MB>
        <p>
          Vigyázz: ez <strong>egyetlen</strong> szög, nem az egyenlet összes megoldása. Az{" "}
          <M>{"\\arcsin"}</M> és az <M>{"\\operatorname{arctg}"}</M> páratlan, az <M>{"\\arccos"}</M>{" "}
          viszont nem: <M>{"\\arccos(-x) = \\pi - \\arccos x"}</M>.
        </p>
      </>
    ),
  };
}

/* ---------- 3. Egyoldali határérték és ugrás ---------- */

function egyoldaliFeladat() {
  const a = egesz(1, 5);
  const p = egesz(-3, 3);
  const q = egesz(-4, 4);
  const bal = q - a;
  const jobb = q + a;
  const ugras = 2 * a;

  return {
    szoveg: (
      <p>
        Add meg a két egyoldali határértéket és az ugrás nagyságát a <M>{`x_0 = ${p}`}</M> helyen:
        <MB>{`f(x) = \\frac{${a === 1 ? "" : a}\\left|x${tag(-p)}\\right|}{x${tag(-p)}}${tag(q)}`}</MB>
      </p>
    ),
    sugo: (
      <p>
        Bontsd fel az abszolút értéket. Ha <M>{`x > ${p}`}</M>, akkor <M>{`|x${tag(-p)}| = x${tag(-p)}`}</M>,
        és a tört értéke <M>{a}</M>. Ha <M>{`x < ${p}`}</M>, akkor az abszolút érték előjelet vált, és a
        tört értéke <M>{-a}</M>.
      </p>
    ),
    mezok: [
      { id: "bal", cimke: "Bal oldali határérték", helyes: bal, tizedes: 2, tures: 0.01 },
      { id: "jobb", cimke: "Jobb oldali határérték", helyes: jobb, tizedes: 2, tures: 0.01 },
      { id: "ug", cimke: "Az ugrás nagysága", helyes: ugras, tizedes: 2, tures: 0.01 },
    ],
    megoldas: (
      <>
        <MB>{`x > ${p}:\\quad f(x) = \\frac{${a === 1 ? "" : a}\\left(x${tag(-p)}\\right)}{x${tag(-p)}}${tag(q)} = ${a}${tag(q)} = ${jobb}`}</MB>
        <MB>{`x < ${p}:\\quad f(x) = \\frac{${a === 1 ? "" : a}\\left(-(x${tag(-p)})\\right)}{x${tag(-p)}}${tag(q)} = ${-a}${tag(q)} = ${bal}`}</MB>
        <p>
          A két egyoldali határérték véges, de különböző, tehát a <M>{`x_0 = ${p}`}</M> helyen{" "}
          <strong>ugrás</strong> (elsőfajú szakadás) van; a függvénynek itt nincs határértéke. Az ugrás
          nagysága
        </p>
        <MB>{`\\left|${jobb} - (${bal})\\right| = ${ugras}`}</MB>
        <p>
          Ez a szakadás <strong>nem</strong> szüntethető meg átdefiniálással — bármit írnánk{" "}
          <M>{`f(${p})`}</M> helyére, a határérték akkor sem létezne.
        </p>
      </>
    ),
  };
}

/* ---------- 4. Bolzano-felezés ---------- */

function bolzanoFeladat() {
  const n = egesz(1, 3);
  const m = egesz(n + 2, 9);
  const f = (x) => x * x * x - m * x + n;

  // két felezés, a lépések megőrzésével
  let a = 0;
  let b = 1;
  const lepesek = [];
  for (let k = 0; k < 2; k++) {
    const c = (a + b) / 2;
    const fc = f(c);
    const balra = f(a) * fc < 0;
    if (balra) b = c;
    else a = c;
    lepesek.push({ c, fc, balra, a, b });
  }
  const felezopont = (a + b) / 2;

  // a gyök sok felezéssel
  let ga = 0;
  let gb = 1;
  for (let k = 0; k < 60; k++) {
    const c = (ga + gb) / 2;
    if (f(ga) * f(c) <= 0) gb = c;
    else ga = c;
  }
  const gyok = (ga + gb) / 2;

  const kepl = `x^3${tag(-m, "x")}${tag(n)}`;

  return {
    szoveg: (
      <p>
        Az <M>{`f(x) = ${kepl}`}</M> polinomnak Bolzano tétele szerint van gyöke a{" "}
        <M>{"[0;\\ 1]"}</M> intervallumon. Végezz el <strong>két</strong> intervallumfelezést, és add
        meg a megmaradó intervallum felezőpontját, valamint a gyököt 3 tizedesre (ehhez folytasd a
        felezést, vagy használd a 4.11 szakasz felező ábráját).
      </p>
    ),
    sugo: (
      <p>
        <M>{`f(0) = ${n} > 0`}</M> és <M>{`f(1) = ${1 - m + n} < 0`}</M>, tehát van előjelváltás. Nézd
        meg <M>{"f(0{,}5)"}</M> előjelét: ha <M>{"f(0)"}</M>-éval egyezik, a gyök a jobb félben van,
        különben a balban. Aztán ugyanez a megmaradt felére.
      </p>
    ),
    mezok: [
      {
        id: "fp",
        cimke: "A 2. felezés utáni intervallum felezőpontja",
        helyes: felezopont,
        tizedes: 3,
        tures: 0.005,
      },
      { id: "gy", cimke: "A gyök (3 tizedes)", helyes: gyok, tizedes: 3, tures: 0.002 },
    ],
    megoldas: (
      <>
        <MB>{`f(0) = ${n} > 0,\\qquad f(1) = 1 - ${m} + ${n} = ${1 - m + n} < 0`}</MB>
        <p>
          A polinom folytonos, és a két végponton ellentétes előjelű — Bolzano tétele szerint van gyök
          a <M>{"(0;\\ 1)"}</M> intervallumban.
        </p>
        {lepesek.map((l, k) => (
          <MB key={k}>
            {`${k + 1}.\\ \\text{felezés:}\\quad c = ${szK(l.c, 3)},\\quad f(c) = ${szK(l.fc, 5)} \\ \\Longrightarrow\\ [${szK(l.a, 3)};\\ ${szK(l.b, 3)}]`}
          </MB>
        ))}
        <MB>{`\\text{felezőpont} = \\frac{${szK(a, 3)}+${szK(b, 3)}}{2} = ${szK(felezopont, 4)}`}</MB>
        <p>
          Elég sok felezés után a gyök <M>{szK(gyok, 6)}</M>. A hiba két lépés után legfeljebb{" "}
          <M>{"\\frac{1-0}{2^{3}} = 0{,}125"}</M>, tíz lépés után már <M>{"0{,}0005"}</M> alatt van — a
          felezés lassú, de <strong>mindig</strong> működik.
        </p>
      </>
    ),
  };
}

/* ---------- a szekció ---------- */

export const EXTRA_GENERATOROK = [
  { cim: "Folytonossági paraméter", fn: folytonossagFeladat },
  { cim: "Arkusz-összetételek", fn: arkuszFeladat },
  { cim: "Egyoldali határérték és ugrás", fn: egyoldaliFeladat },
  { cim: "Bolzano-tétel és intervallumfelezés", fn: bolzanoFeladat },
];

export default function GyakorloExtra() {
  return (
    <div>
      <GyakorloDoboz
        cim="Folytonossági paraméter"
        leiras="A két darabnak a törésponton ugyanazt az értéket kell adnia — ez egyetlen egyenlet."
        generator={folytonossagFeladat}
      />
      <GyakorloDoboz
        cim="Arkusz-összetételek"
        leiras="A gyök előjelét mindig az arkuszfüggvény értékkészlete dönti el, nem a beírt szám."
        generator={arkuszFeladat}
      />
      <GyakorloDoboz
        cim="Egyoldali határérték és ugrás"
        leiras="Bontsd fel az abszolút értéket a két oldalon külön-külön."
        generator={egyoldaliFeladat}
        oszlopok={3}
      />
      <GyakorloDoboz
        cim="Bolzano-tétel és intervallumfelezés"
        leiras="Előjelváltás + folytonosság ⇒ van gyök. A felezés meg is találja."
        generator={bolzanoFeladat}
      />
    </div>
  );
}
