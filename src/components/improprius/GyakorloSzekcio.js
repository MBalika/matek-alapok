"use client";

import GyakorloDoboz from "@/components/GyakorloDoboz";
import { M, MB } from "@/components/ui/Keplet";
import { sz, szK } from "@/lib/szamok";
import { osztopontok, simpson, trapez } from "@/components/abrak/ImNumerika";

/* ---------- segédek ---------- */

const egesz = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
const valaszt = (tomb) => tomb[Math.floor(Math.random() * tomb.length)];

/** Tört LaTeX-alakja: {szam: 1, nev: 2} → \frac12 */
const tort = (szam, nev) => (nev === 1 ? `${szam}` : `\\frac{${szam}}{${nev}}`);

/* ================= 1. I. típusú improprius integrál ================= */

const I_TIPUSOK = [
  { szam: 1, nev: 2, aLehet: [1, 4, 9] },
  { szam: 1, nev: 3, aLehet: [1, 8, 27] },
  { szam: 2, nev: 3, aLehet: [1, 8, 27] },
  { szam: 1, nev: 4, aLehet: [1, 16] },
  { szam: 3, nev: 4, aLehet: [1, 16] },
];

function elsoTipusFeladat() {
  const valtozat = Math.random();

  if (valtozat < 0.55) {
    // ∫_0^a dx / x^p, p = szam/nev < 1
    const T = valaszt(I_TIPUSOK);
    const p = T.szam / T.nev;
    const a = valaszt(T.aLehet);
    const ertek = Math.pow(a, 1 - p) / (1 - p);
    const pLatex = tort(T.szam, T.nev);

    return {
      szoveg: (
        <p>
          Számítsd ki az alábbi improprius integrált. A kritikus hely a <strong>nulla</strong>: ott az integrandus nem
          korlátos. Add meg az integrál értékét 3 tizedesre, és azt is, hol van a kritikus (szinguláris) hely.
          <MB>{`\\int_0^{${a}} \\frac{dx}{x^{${pLatex}}}`}</MB>
        </p>
      ),
      sugo: (
        <p>
          A recept: <M>{`\\int_{\\varepsilon}^{${a}} x^{-p}dx = \\left[\\frac{x^{1-p}}{1-p}\\right]_{\\varepsilon}^{${a}}`}</M>, majd{" "}
          <M>{"\\varepsilon \\to 0+0"}</M>. Mivel itt <M>{`p = ${pLatex} < 1`}</M>, az <M>{"\\varepsilon^{1-p}"}</M>{" "}
          tag nullához tart, tehát az integrál konvergens.
        </p>
      ),
      mezok: [
        { id: "ertek", cimke: "az integrál értéke", helyes: ertek, tizedes: 3 },
        { id: "hely", cimke: "a szinguláris hely, x =", helyes: 0, tizedes: 0, tures: 0.01 },
      ],
      megoldas: (
        <>
          <MB>{`\\int_0^{${a}}\\frac{dx}{x^{${pLatex}}} = \\lim_{\\varepsilon\\to0+0}\\left[\\frac{x^{1-${pLatex}}}{1-${pLatex}}\\right]_{\\varepsilon}^{${a}}`}</MB>
          <p>
            A kitevő <M>{`1-p = ${szK(1 - p, 4)} > 0`}</M>, ezért <M>{"\\varepsilon^{1-p}\\to0"}</M>, és marad a felső
            határ:
          </p>
          <MB>{`= \\frac{${a}^{\\,${szK(1 - p, 4)}}}{${szK(1 - p, 4)}} = ${szK(ertek, 4)}`}</MB>
          <p>
            Ellenőrzés a p-kritériummal: <M>{`p = ${pLatex} < 1`}</M>, tehát a nullában konvergens. ✓
          </p>
        </>
      ),
    };
  }

  // ∫_a^b dx/√(x−a) vagy ∫_a^b dx/√(b−x)
  const also = Math.random() < 0.5;
  const s = valaszt([1, 2, 3, 4]);
  const a = egesz(-3, 4);
  const b = a + s * s;
  const ertek = 2 * s;
  // „x − a” helyes alakja negatív a esetén is: x+3, x, x−2
  const belso = also ? (a === 0 ? "x" : a < 0 ? `x+${-a}` : `x-${a}`) : `${b}-x`;

  return {
    szoveg: (
      <p>
        Számítsd ki az alábbi improprius integrált 3 tizedesre, és add meg, melyik helyen nem korlátos az integrandus.
        <MB>{`\\int_{${a}}^{${b}} \\frac{dx}{\\sqrt{${belso}}}`}</MB>
      </p>
    ),
    sugo: (
      <p>
        A gyök alatti kifejezés a <M>{`x = ${also ? a : b}`}</M> helyen tűnik el — ott robban fel az integrandus. A
        primitív függvény <M>{also ? `2\\sqrt{${belso}}` : `-2\\sqrt{${belso}}`}</M>.
      </p>
    ),
    mezok: [
      { id: "ertek", cimke: "az integrál értéke", helyes: ertek, tizedes: 3 },
      { id: "hely", cimke: "a szinguláris hely, x =", helyes: also ? a : b, tizedes: 0, tures: 0.01 },
    ],
    megoldas: (
      <>
        <p>
          A szingularitás a <strong>{also ? "alsó" : "felső"}</strong> végpontnál van, tehát ott kell határértéket venni:
        </p>
        <MB>
          {also
            ? `\\int_{${a}}^{${b}}\\frac{dx}{\\sqrt{${belso}}} = \\lim_{c\\to${a}+0}\\left[2\\sqrt{${belso}}\\right]_{c}^{${b}} = 2\\sqrt{${b - a}} - 0 = ${szK(ertek, 0)}`
            : `\\int_{${a}}^{${b}}\\frac{dx}{\\sqrt{${belso}}} = \\lim_{c\\to${b}-0}\\left[-2\\sqrt{${belso}}\\right]_{${a}}^{c} = 0 + 2\\sqrt{${b - a}} = ${szK(ertek, 0)}`}
        </MB>
        <p>
          A kitevő itt <M>{"p = \\tfrac12 < 1"}</M> (a kritikus hely környékén), tehát konvergens.
        </p>
      </>
    ),
  };
}

/* ================= 2. II. típusú improprius integrál ================= */

function masodikTipusFeladat() {
  const valtozat = Math.random();

  if (valtozat < 0.34) {
    // ∫_0^∞ e^{-kx} dx
    const k = egesz(1, 6);
    const ertek = 1 / k;
    return {
      szoveg: (
        <p>
          Számítsd ki az alábbi improprius integrált 4 tizedesre. Add meg azt is, mennyi a{" "}
          <M>{`F(x) = -\\frac{1}{${k}}e^{-${k}x}`}</M> primitív függvény értéke az <strong>alsó</strong> határon.
          <MB>{`\\int_0^{\\infty} e^{-${k === 1 ? "" : k}x}\\,dx`}</MB>
        </p>
      ),
      sugo: (
        <p>
          <M>{`\\int_0^{d} e^{-${k === 1 ? "" : k}x}dx = \\left[-\\frac{1}{${k}}e^{-${k === 1 ? "" : k}x}\\right]_0^{d}`}</M>, és{" "}
          <M>{"e^{-kd}\\to0"}</M>, ha <M>{"d\\to\\infty"}</M> és <M>{"k>0"}</M>.
        </p>
      ),
      mezok: [
        { id: "ertek", cimke: "az integrál értéke", helyes: ertek, tizedes: 4 },
        { id: "also", cimke: "F(0)", helyes: -1 / k, tizedes: 4 },
      ],
      megoldas: (
        <>
          <MB>{`\\int_0^{\\infty} e^{-${k === 1 ? "" : k}x}dx = \\lim_{d\\to\\infty}\\left(-\\frac{1}{${k}}e^{-${k === 1 ? "" : k}d} + \\frac{1}{${k}}\\right) = \\frac{1}{${k}} = ${szK(ertek, 4)}`}</MB>
          <p>
            Általánosan <M>{"\\int_0^{\\infty}e^{-kx}dx = \\frac1k"}</M>, ha <M>{"k>0"}</M> — ezt érdemes megjegyezni.
          </p>
        </>
      ),
    };
  }

  if (valtozat < 0.7) {
    // ∫_a^∞ dx/x^p, p > 1
    const P = valaszt([
      { szam: 3, nev: 2 },
      { szam: 2, nev: 1 },
      { szam: 5, nev: 2 },
      { szam: 3, nev: 1 },
      { szam: 4, nev: 1 },
    ]);
    const p = P.szam / P.nev;
    const a = valaszt([1, 2, 4]);
    const Fa = Math.pow(a, 1 - p) / (1 - p);
    const ertek = -Fa;
    const pLatex = tort(P.szam, P.nev);
    return {
      szoveg: (
        <p>
          Számítsd ki az alábbi improprius integrált 4 tizedesre, és add meg az{" "}
          <M>{`F(x) = \\frac{x^{1-p}}{1-p}`}</M> primitív függvény értékét az alsó határon (<M>{`F(${a})`}</M>).
          <MB>{`\\int_{${a}}^{\\infty} \\frac{dx}{x^{${pLatex}}}`}</MB>
        </p>
      ),
      sugo: (
        <p>
          Mivel <M>{`p = ${pLatex} > 1`}</M>, a kitevő <M>{"1-p<0"}</M>, ezért <M>{"d^{1-p}\\to0"}</M>. Marad{" "}
          <M>{"-F(a)"}</M>.
        </p>
      ),
      mezok: [
        { id: "ertek", cimke: "az integrál értéke", helyes: ertek, tizedes: 4 },
        { id: "also", cimke: `F(${a})`, helyes: Fa, tizedes: 4 },
      ],
      megoldas: (
        <>
          <MB>{`\\int_{${a}}^{d}x^{-${pLatex}}dx = \\left[\\frac{x^{${szK(1 - p, 4)}}}{${szK(1 - p, 4)}}\\right]_{${a}}^{d} \\;\\longrightarrow\\; 0 - \\frac{${a}^{${szK(1 - p, 4)}}}{${szK(1 - p, 4)}}`}</MB>
          <MB>{`= ${szK(ertek, 5)}`}</MB>
          <p>
            Ellenőrzés: <M>{`a = 1`}</M> esetén a képlet <M>{"\\frac{1}{p-1}"}</M>-et ad, itt{" "}
            <M>{`\\frac{1}{${szK(p - 1, 2)}} = ${szK(1 / (p - 1), 4)}`}</M>.
          </p>
        </>
      ),
    };
  }

  // ∫_0^∞ dx/(x²+c²) = π/(2c)
  const c = egesz(1, 5);
  const ertek = Math.PI / (2 * c);
  return {
    szoveg: (
      <p>
        Számítsd ki az alábbi improprius integrált 4 tizedesre, és add meg a primitív függvény határértékét a
        végtelenben (<M>{`\\lim_{x\\to\\infty}\\frac{1}{${c}}\\operatorname{arctg}\\frac{x}{${c}}`}</M>).
        <MB>{`\\int_0^{\\infty}\\frac{dx}{x^2+${c * c}}`}</MB>
      </p>
    ),
    sugo: (
      <p>
        <M>{`\\int\\frac{dx}{x^2+c^2} = \\frac1c\\operatorname{arctg}\\frac xc`}</M>, itt <M>{`c = ${c}`}</M>. Az{" "}
        <M>{"\\operatorname{arctg}"}</M> határértéke a végtelenben <M>{"\\pi/2"}</M>.
      </p>
    ),
    mezok: [
      { id: "ertek", cimke: "az integrál értéke", helyes: ertek, tizedes: 4 },
      { id: "hatar", cimke: "a primitív függvény határértéke ∞-ben", helyes: Math.PI / (2 * c), tizedes: 4 },
    ],
    megoldas: (
      <>
        <MB>{`\\int_0^{d}\\frac{dx}{x^2+${c * c}} = \\left[\\frac{1}{${c}}\\operatorname{arctg}\\frac{x}{${c}}\\right]_0^{d} \\;\\longrightarrow\\; \\frac{1}{${c}}\\cdot\\frac{\\pi}{2} - 0`}</MB>
        <MB>{`= \\frac{\\pi}{${2 * c}} = ${szK(ertek, 5)}`}</MB>
        <p>
          Itt a primitív függvény határértéke és az integrál értéke történetesen megegyezik, mert az alsó határon a
          primitív függvény nulla.
        </p>
      </>
    ),
  };
}

/* ================= 3. A p-kritérium két iránya ================= */

function pKriteriumFeladat() {
  const P = valaszt([
    { szam: 3, nev: 2 },
    { szam: 2, nev: 1 },
    { szam: 5, nev: 2 },
    { szam: 3, nev: 1 },
    { szam: 4, nev: 1 },
    { szam: 5, nev: 1 },
  ]);
  const p = P.szam / P.nev;
  const m = valaszt([2, 3, 4]);
  const pLatex = tort(P.szam, P.nev);
  const qLatex = tort(P.nev, P.szam);
  const q = P.nev / P.szam; // = 1/p
  const vegtelen = 1 / (p - 1);
  const nulla = 1 / (1 - q); // = p/(p−1)

  return {
    szoveg: (
      <p>
        Legyen <M>{`p = ${pLatex}`}</M>, és <M>{`q = \\frac1p = ${qLatex}`}</M>. Add meg a két nevezetes{" "}
        <M>{"p"}</M>-integrál értékét 3 tizedesre, végül azt is, hogy melyik a <strong>legkisebb egész</strong>{" "}
        <M>{"k"}</M>, amelyre az <M>{`\\int_1^{\\infty}\\frac{dx}{x^{k/${m}}}`}</M> integrál már konvergens.
        <MB>{`\\text{(a)}\\ \\int_1^{\\infty}\\frac{dx}{x^{${pLatex}}} \\qquad \\text{(b)}\\ \\int_0^{1}\\frac{dx}{x^{${qLatex}}}`}</MB>
      </p>
    ),
    sugo: (
      <p>
        A két szabály: <M>{"\\int_1^{\\infty}\\frac{dx}{x^p} = \\frac{1}{p-1}"}</M>, ha <M>{"p>1"}</M>, és{" "}
        <M>{"\\int_0^1\\frac{dx}{x^q} = \\frac{1}{1-q}"}</M>, ha <M>{"q<1"}</M>. Itt{" "}
        <M>{`q = ${qLatex} = ${szK(q, 4)}`}</M>. A harmadik kérdésnél a feltétel <M>{`k/${m} > 1`}</M>.
      </p>
    ),
    mezok: [
      { id: "a", cimke: "(a) az első integrál értéke", helyes: vegtelen, tizedes: 3 },
      { id: "b", cimke: "(b) a második integrál értéke", helyes: nulla, tizedes: 3 },
      { id: "k", cimke: "a legkisebb egész k", helyes: m + 1, tizedes: 0, tures: 0.01 },
    ],
    megoldas: (
      <>
        <MB>{`\\text{(a)}\\quad \\int_1^{\\infty}\\frac{dx}{x^{${pLatex}}} = \\frac{1}{p-1} = \\frac{1}{${szK(p - 1, 3)}} = ${szK(vegtelen, 4)}`}</MB>
        <MB>{`\\text{(b)}\\quad q = ${qLatex} < 1 \\ \\Rightarrow\\ \\int_0^{1}\\frac{dx}{x^{${qLatex}}} = \\frac{1}{1-q} = ${szK(nulla, 4)}`}</MB>
        <p>
          Figyeld meg: a két érték különbsége pontosan 1 (<M>{"\\frac{p}{p-1} - \\frac{1}{p-1} = 1"}</M>) — gyors
          ellenőrzés.
        </p>
        <MB>{`\\text{(c)}\\quad \\frac{k}{${m}} > 1 \\iff k > ${m} \\ \\Rightarrow\\ k_{\\min} = ${m + 1}`}</MB>
        <p>
          A <M>{`k = ${m}`}</M> eset épp a <M>{"p=1"}</M> határeset, ami még <strong>divergens</strong>.
        </p>
      </>
    ),
  };
}

/* ================= 4–5. Numerikus integrálás ================= */

const NUM_FUGGVENYEK = [
  {
    latex: "\\frac1x",
    fn: (x) => 1 / x,
    aLehet: [1],
    bLehet: [2, 3, 4],
    pontos: (a, b) => Math.log(b) - Math.log(a),
    pontosLatex: (a, b) => `\\ln ${b}`,
    primitiv: "\\ln x",
  },
  {
    latex: "x^2",
    fn: (x) => x * x,
    aLehet: [0],
    bLehet: [1, 2, 3],
    pontos: (a, b) => (b * b * b - a * a * a) / 3,
    pontosLatex: (a, b) => `\\frac{${b}^3}{3}`,
    primitiv: "\\frac{x^3}{3}",
  },
  {
    latex: "\\frac{1}{1+x}",
    fn: (x) => 1 / (1 + x),
    aLehet: [0],
    bLehet: [1, 2, 3],
    pontos: (a, b) => Math.log(1 + b) - Math.log(1 + a),
    pontosLatex: (a, b) => `\\ln ${1 + b}`,
    primitiv: "\\ln(1+x)",
  },
  {
    latex: "e^{-x}",
    fn: (x) => Math.exp(-x),
    aLehet: [0],
    bLehet: [1, 2],
    pontos: (a, b) => Math.exp(-a) - Math.exp(-b),
    pontosLatex: (a, b) => `1-e^{-${b}}`,
    primitiv: "-e^{-x}",
  },
  {
    latex: "\\sqrt{x}",
    fn: (x) => Math.sqrt(x),
    aLehet: [0, 1],
    bLehet: [4, 9],
    pontos: (a, b) => (2 / 3) * (Math.pow(b, 1.5) - Math.pow(a, 1.5)),
    pontosLatex: (a, b) => `\\frac23\\left(${b}\\sqrt{${b}}-${a === 0 ? "0" : `${a}\\sqrt{${a}}`}\\right)`,
    primitiv: "\\frac23 x\\sqrt{x}",
  },
];

function pontTablazat(F, xs, sulyok) {
  return (
    <div className="my-3 overflow-hidden rounded-lg border border-petrol-200">
      <table className="szamok w-full text-[12.5px]">
        <thead className="bg-petrol-50 text-petrol-500">
          <tr>
            <th className="px-2 py-1 text-left font-semibold">i</th>
            <th className="px-2 py-1 text-right font-semibold">xᵢ</th>
            <th className="px-2 py-1 text-right font-semibold">yᵢ</th>
            <th className="px-2 py-1 text-right font-semibold">súly</th>
          </tr>
        </thead>
        <tbody className="text-petrol-800">
          {xs.map((x, i) => (
            <tr key={i} className="border-t border-petrol-100">
              <td className="px-2 py-0.5">{i}</td>
              <td className="px-2 py-0.5 text-right">{sz(x, 4)}</td>
              <td className="px-2 py-0.5 text-right">{sz(F.fn(x), 6)}</td>
              <td className="px-2 py-0.5 text-right">{sulyok[i]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function trapezFeladat() {
  const F = valaszt(NUM_FUGGVENYEK);
  const a = valaszt(F.aLehet);
  const b = valaszt(F.bLehet);
  const n = valaszt([2, 4, 6, 8]);
  const h = (b - a) / n;
  const xs = osztopontok(a, b, n);
  const T = trapez(F.fn, a, b, n);
  const pontos = F.pontos(a, b);
  const sulyok = xs.map((_, i) => (i === 0 || i === n ? 1 : 2));

  return {
    szoveg: (
      <p>
        Közelítsd az alábbi integrált a <strong>trapézszabállyal</strong>, <M>{`n = ${n}`}</M> részintervallummal. Add
        meg a közelítő értéket és a pontos értéket is, mindkettőt 4 tizedesre.
        <MB>{`\\int_{${a}}^{${b}} ${F.latex}\\,dx`}</MB>
      </p>
    ),
    sugo: (
      <p>
        <M>{`h = \\frac{b-a}{n} = \\frac{${b - a}}{${n}} = ${szK(h, 4)}`}</M>, a súlyok <M>{"1,2,2,\\dots,2,1"}</M>, a
        szorzó <M>{"\\frac h2"}</M>. A pontos értékhez a primitív függvény <M>{F.primitiv}</M>.
      </p>
    ),
    mezok: [
      { id: "T", cimke: "trapéz-közelítés", helyes: T, tizedes: 4, tures: 0.0006 },
      { id: "P", cimke: "a pontos érték", helyes: pontos, tizedes: 4, tures: 0.0006 },
    ],
    megoldas: (
      <>
        <p>
          <M>{`h = ${szK(h, 4)}`}</M>, az alappontok és a súlyok:
        </p>
        {pontTablazat(F, xs, sulyok)}
        <MB>{`T = \\frac{h}{2}\\left(y_0 + 2y_1 + \\dots + y_{${n}}\\right) = ${szK(T, 6)}`}</MB>
        <MB>{`\\int_{${a}}^{${b}} ${F.latex}\\,dx = ${F.pontosLatex(a, b)} = ${szK(pontos, 6)}`}</MB>
        <p>
          A hiba <M>{`${szK(T - pontos, 6)}`}</M>. {T > pontos ? "A trapézszabály felülbecsült — a függvény konvex ezen a szakaszon." : "A trapézszabály alulbecsült — a függvény konkáv ezen a szakaszon."}
        </p>
      </>
    ),
  };
}

function simpsonFeladat() {
  const F = valaszt(NUM_FUGGVENYEK);
  const a = valaszt(F.aLehet);
  const b = valaszt(F.bLehet);
  const n = valaszt([2, 4, 6, 8]);
  const h = (b - a) / n;
  const xs = osztopontok(a, b, n);
  const S = simpson(F.fn, a, b, n);
  const pontos = F.pontos(a, b);
  const sulyok = xs.map((_, i) => (i === 0 || i === n ? 1 : i % 2 === 1 ? 4 : 2));

  return {
    szoveg: (
      <p>
        Közelítsd az alábbi integrált a <strong>Simpson-szabállyal</strong>, <M>{`n = ${n}`}</M> részintervallummal
        (páros, tehát alkalmazható). Add meg a közelítő értéket 4 tizedesre, és a <strong>súlyok összegét</strong> is.
        <MB>{`\\int_{${a}}^{${b}} ${F.latex}\\,dx`}</MB>
      </p>
    ),
    sugo: (
      <p>
        A súlyok <M>{"1,4,2,4,\\dots,4,1"}</M>, a szorzó <M>{"\\frac h3"}</M>. A súlyok összege mindig{" "}
        <M>{"3n"}</M> — ez a gyors ellenőrzés, mert <M>{"\\frac h3\\cdot3n = b-a"}</M>.
      </p>
    ),
    mezok: [
      { id: "S", cimke: "Simpson-közelítés", helyes: S, tizedes: 4, tures: 0.0006 },
      { id: "W", cimke: "a súlyok összege", helyes: 3 * n, tizedes: 0, tures: 0.01 },
    ],
    megoldas: (
      <>
        <p>
          <M>{`h = ${szK(h, 4)}`}</M>, az alappontok és a Simpson-súlyok:
        </p>
        {pontTablazat(F, xs, sulyok)}
        <MB>{`S = \\frac{h}{3}\\left(y_0 + 4y_1 + 2y_2 + \\dots + y_{${n}}\\right) = ${szK(S, 6)}`}</MB>
        <p>
          A pontos érték <M>{`${F.pontosLatex(a, b)} = ${szK(pontos, 6)}`}</M>, tehát a hiba{" "}
          <M>{`${szK(S - pontos, 8)}`}</M> — nagyságrendekkel kisebb, mint a trapézhiba{" "}
          <M>{`(${szK(trapez(F.fn, a, b, n) - pontos, 6)})`}</M>.
        </p>
        <MB>{`\\text{súlyok összege} = 3n = 3\\cdot${n} = ${3 * n}`}</MB>
      </>
    ),
  };
}

/* ================= a szekció ================= */

export const GENERATOROK = [
  { cim: "I. típusú improprius integrál", fn: elsoTipusFeladat },
  { cim: "II. típusú improprius integrál", fn: masodikTipusFeladat },
  { cim: "A p-kritérium két iránya", fn: pKriteriumFeladat },
  { cim: "Trapézszabály", fn: trapezFeladat },
  { cim: "Simpson-szabály", fn: simpsonFeladat },
];

export default function GyakorloSzekcio() {
  return (
    <div>
      <GyakorloDoboz
        cim="I. típusú improprius integrál"
        leiras="Nem korlátos integrandus véges intervallumon. Előbb mindig azonosítsd, hol a kritikus hely!"
        generator={elsoTipusFeladat}
      />
      <GyakorloDoboz
        cim="II. típusú improprius integrál"
        leiras="Végtelen tartomány. Vágd el d-nél, integrálj, majd vedd a határértéket."
        generator={masodikTipusFeladat}
      />
      <GyakorloDoboz
        cim="A p-kritérium két iránya"
        leiras="A végtelenben a nagy kitevő a jó, a nullában a kicsi. Ugyanaz a p, két ellentétes szabály."
        generator={pKriteriumFeladat}
        oszlopok={3}
      />
      <GyakorloDoboz
        cim="Trapézszabály"
        leiras="Súlyok: 1, 2, 2, …, 2, 1, a szorzó h/2. A pontos értéket a Newton–Leibniz-formulából kapod."
        generator={trapezFeladat}
      />
      <GyakorloDoboz
        cim="Simpson-szabály"
        leiras="Súlyok: 1, 4, 2, 4, …, 4, 1, a szorzó h/3. Csak páros n-nel!"
        generator={simpsonFeladat}
      />
    </div>
  );
}
