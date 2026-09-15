"use client";

import GyakorloDoboz from "@/components/GyakorloDoboz";
import { M, MB } from "@/components/ui/Keplet";
import { sz, szK } from "@/lib/szamok";
import { simpsonAdatokbol, trapezAdatokbol } from "@/components/abrak/ImNumerika";

const egesz = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
const valaszt = (tomb) => tomb[Math.floor(Math.random() * tomb.length)];

/** x^k LaTeX-alakja együtthatóval: (3, 2) → 3x^{2}; (1, 1) → x */
function hatvanyTag(egyutt, kitevo) {
  const e = egyutt === 1 && kitevo > 0 ? "" : egyutt === -1 && kitevo > 0 ? "-" : String(egyutt);
  const v = kitevo === 0 ? "" : kitevo === 1 ? "x" : `x^{${kitevo}}`;
  return `${e}${v}` || "1";
}

/** „+3” vagy „−3” alak. */
const elojeles = (c) => (c >= 0 ? `+${c}` : `-${Math.abs(c)}`);

/* ================= 1. Belső szakadási hely ================= */

const KOBOK = [
  { ertek: 1, gyok: 1 },
  { ertek: 8, gyok: 2 },
  { ertek: 27, gyok: 3 },
];

function belsoSzakadasFeladat() {
  const A = valaszt(KOBOK);
  const B = valaszt(KOBOK);
  const c = egesz(-2, 3);
  const also = c - A.ertek;
  const felso = c + B.ertek;
  const bal = 3 * A.gyok;
  const jobb = 3 * B.gyok;

  const belsoLatex = c === 0 ? "x" : `x${elojeles(-c)}`;

  return {
    szoveg: (
      <p>
        Az alábbi integrálnál az integrandus egy <strong>belső</strong> pontban nem korlátos. Bontsd két részre, és add
        meg a bal oldali rész, a jobb oldali rész és az egész integrál értékét 3 tizedesre.
        <MB>{`\\int_{${also}}^{${felso}} \\frac{dx}{\\sqrt[3]{\\left(${belsoLatex}\\right)^2}}`}</MB>
      </p>
    ),
    sugo: (
      <p>
        A szakadási hely <M>{`x = ${c}`}</M>, és ez <strong>benne van</strong> az intervallumban. A primitív függvény{" "}
        <M>{`3\\sqrt[3]{${belsoLatex}}`}</M>, mert <M>{"\\int u^{-2/3}du = 3u^{1/3}"}</M>. Mindkét részt külön kell
        határértékkel kezelni.
      </p>
    ),
    mezok: [
      { id: "bal", cimke: "a bal oldali rész", helyes: bal, tizedes: 3 },
      { id: "jobb", cimke: "a jobb oldali rész", helyes: jobb, tizedes: 3 },
      { id: "ossz", cimke: "az egész integrál", helyes: bal + jobb, tizedes: 3 },
    ],
    megoldas: (
      <>
        <MB>{`\\int_{${also}}^{${c}}\\frac{dx}{\\sqrt[3]{(${belsoLatex})^2}} = \\lim_{u\\to${c}-0}\\left[3\\sqrt[3]{${belsoLatex}}\\right]_{${also}}^{u} = 0 - 3\\sqrt[3]{-${A.ertek}} = ${bal}`}</MB>
        <MB>{`\\int_{${c}}^{${felso}}\\frac{dx}{\\sqrt[3]{(${belsoLatex})^2}} = \\lim_{v\\to${c}+0}\\left[3\\sqrt[3]{${belsoLatex}}\\right]_{v}^{${felso}} = 3\\sqrt[3]{${B.ertek}} - 0 = ${jobb}`}</MB>
        <p>
          Mindkét rész konvergens (a kitevő <M>{"2/3 < 1"}</M>), tehát összeadhatók:
        </p>
        <MB>{`\\int_{${also}}^{${felso}} = ${bal} + ${jobb} = ${bal + jobb}`}</MB>
        <p>
          <strong>Figyelem:</strong> ha a szakadást nem vesszük észre és gépiesen behelyettesítünk, az eredmény{" "}
          <M>{`3\\sqrt[3]{${B.ertek}} - 3\\sqrt[3]{-${A.ertek}}`}</M> — ami itt véletlenül ugyanennyi, de{" "}
          <M>{"1/x^2"}</M>-szerű kitevőnél már katasztrofálisan hamis eredményt adna.
        </p>
      </>
    ),
  };
}

/* ================= 2. Limeszes összehasonlító kritérium ================= */

function limeszesFeladat() {
  if (Math.random() < 0.6) {
    // f = (A x^m + B) / (C x^k + D)
    const m = valaszt([1, 2, 3]);
    const p = valaszt([1, 2]);
    const k = m + p;
    const A = egesz(1, 5);
    const C = egesz(1, 4);
    const B = egesz(-3, 5);
    const D = egesz(1, 8);
    const L = A / C;

    const szamlalo = `${hatvanyTag(A, m)}${B === 0 ? "" : elojeles(B)}`;
    const nevezo = `${hatvanyTag(C, k)}+${D}`;

    return {
      szoveg: (
        <p>
          Döntsd el a limeszes összehasonlító kritériummal, konvergens-e az alábbi integrál. Add meg a{" "}
          <M>{`g(x) = \\frac{1}{x^{p}}`}</M> összehasonlító függvény <M>{"p"}</M> kitevőjét, a{" "}
          <M>{"L = \\lim_{x\\to\\infty} f(x)/g(x)"}</M> határértéket 3 tizedesre, végül írj 1-et, ha az integrál
          konvergens, és 0-t, ha divergens.
          <MB>{`\\int_1^{\\infty} \\frac{${szamlalo}}{${nevezo}}\\,dx`}</MB>
        </p>
      ),
      sugo: (
        <p>
          Tartsd meg a legnagyobb rendű tagokat: <M>{`\\frac{${hatvanyTag(A, m)}}{${hatvanyTag(C, k)}} = \\frac{${szK(
            A / C,
            4,
          )}}{x^{${k - m}}}`}</M>. Innen <M>{`p = ${k - m}`}</M>, és <M>{"L"}</M> a főegyütthatók hányadosa. A
          konvergenciát a <M>{"p"}</M>-kritérium dönti el: <M>{"p>1"}</M> kell.
        </p>
      ),
      mezok: [
        { id: "p", cimke: "a g(x) = 1/xᵖ kitevője, p", helyes: p, tizedes: 0, tures: 0.01 },
        { id: "L", cimke: "L = lim f/g", helyes: L, tizedes: 3 },
        { id: "k", cimke: "konvergens? (1 = igen, 0 = nem)", helyes: p > 1 ? 1 : 0, tizedes: 0, tures: 0.01 },
      ],
      megoldas: (
        <>
          <p>
            A legnagyobb rendű tagok hányadosa <M>{`\\frac{${A}x^{${m}}}{${C}x^{${k}}} = \\frac{${szK(
              A / C,
              4,
            )}}{x^{${p}}}`}</M>, tehát <M>{`g(x) = \\frac{1}{x^{${p}}}`}</M>.
          </p>
          <MB>{`L = \\lim_{x\\to\\infty} \\frac{\\frac{${szamlalo}}{${nevezo}}}{\\frac{1}{x^{${p}}}} = \\lim_{x\\to\\infty}\\frac{${A}x^{${k}}+\\dots}{${C}x^{${k}}+\\dots} = \\frac{${A}}{${C}} = ${szK(L, 4)}`}</MB>
          <p>
            <M>{`0 < L < \\infty`}</M>, tehát a két integrál egyszerre konvergens vagy divergens. Mivel{" "}
            <M>{`\\int_1^{\\infty}\\frac{dx}{x^{${p}}}`}</M>{" "}
            {p > 1 ? (
              <>
                konvergens (<M>{`p = ${p} > 1`}</M>), a vizsgált integrál is <strong>konvergens</strong>.
              </>
            ) : (
              <>
                divergens (<M>{"p = 1"}</M> a határeset), a vizsgált integrál is <strong>divergens</strong>.
              </>
            )}
          </p>
        </>
      ),
    };
  }

  // f = 1/√(x^{2k} + B x)
  const k = valaszt([1, 2, 3]);
  const B = egesz(1, 9);
  const L = 1;

  return {
    szoveg: (
      <p>
        Döntsd el a limeszes összehasonlító kritériummal, konvergens-e az alábbi integrál. Add meg a{" "}
        <M>{`g(x) = \\frac{1}{x^{p}}`}</M> kitevőjét, az <M>{"L"}</M> határértéket 3 tizedesre, és írj 1-et, ha
        konvergens, 0-t, ha divergens.
        <MB>{`\\int_1^{\\infty} \\frac{dx}{\\sqrt{x^{${2 * k}}+${B}x}}`}</MB>
      </p>
    ),
    sugo: (
      <p>
        A gyök alatt a domináns tag <M>{`x^{${2 * k}}`}</M>, aminek a gyöke <M>{`x^{${k}}`}</M>. Tehát{" "}
        <M>{`g(x) = \\frac{1}{x^{${k}}}`}</M>.
      </p>
    ),
    mezok: [
      { id: "p", cimke: "a g(x) = 1/xᵖ kitevője, p", helyes: k, tizedes: 0, tures: 0.01 },
      { id: "L", cimke: "L = lim f/g", helyes: L, tizedes: 3 },
      { id: "k", cimke: "konvergens? (1 = igen, 0 = nem)", helyes: k > 1 ? 1 : 0, tizedes: 0, tures: 0.01 },
    ],
    megoldas: (
      <>
        <MB>{`L = \\lim_{x\\to\\infty} \\frac{x^{${k}}}{\\sqrt{x^{${2 * k}}+${B}x}} = \\lim_{x\\to\\infty}\\frac{x^{${k}}}{x^{${k}}\\sqrt{1+\\frac{${B}}{x^{${2 * k - 1}}}}} = 1`}</MB>
        <p>
          <M>{`L = 1`}</M> véges és pozitív.{" "}
          {k > 1 ? (
            <>
              Mivel <M>{`\\int_1^{\\infty}\\frac{dx}{x^{${k}}}`}</M> konvergens (<M>{`p = ${k} > 1`}</M>), a vizsgált
              integrál is <strong>konvergens</strong>.
            </>
          ) : (
            <>
              Mivel <M>{"\\int_1^{\\infty}\\frac{dx}{x}"}</M> divergens (<M>{"p = 1"}</M>), a vizsgált integrál is{" "}
              <strong>divergens</strong>.
            </>
          )}
        </p>
      </>
    ),
  };
}

/* ================= 3. Torricelli-típusú forgástest ================= */

function torricelliFeladat() {
  const k = valaszt([1, 1, 2, 3]);
  const d = valaszt([2, 4, 5, 10, 20, 50]);
  const Vd = Math.PI * k * k * (1 - 1 / d);
  const Vhatar = Math.PI * k * k;

  return {
    szoveg: (
      <p>
        Forgasd meg az <M>{`y = \\frac{${k}}{x}`}</M> görbe <M>{`1 \\le x \\le ${d}`}</M> darabját az <M>{"x"}</M>{" "}
        tengely körül. Add meg a keletkező forgástest térfogatát 4 tizedesre, továbbá a térfogat határértékét{" "}
        <M>{"d\\to\\infty"}</M> esetén, végül írj 1-et, ha a <strong>felszín</strong> is véges, és 0-t, ha nem.
        <MB>{`V(d) = \\pi\\int_1^{${d}} \\left(\\frac{${k}}{x}\\right)^2 dx`}</MB>
      </p>
    ),
    sugo: (
      <p>
        <M>{`\\left(\\frac{${k}}{x}\\right)^2 = \\frac{${k * k}}{x^2}`}</M>, a primitív függvény{" "}
        <M>{`-\\frac{${k * k}}{x}`}</M>. A felszínhez a <M>{"2\\pi\\int f\\sqrt{1+(f')^2}\\,dx \\ge 2\\pi\\int\\frac{dx}{x}"}</M>{" "}
        alsó becslés kell.
      </p>
    ),
    mezok: [
      { id: "V", cimke: "V(d)", helyes: Vd, tizedes: 4 },
      { id: "H", cimke: "a V(d) határértéke", helyes: Vhatar, tizedes: 4 },
      { id: "F", cimke: "véges a felszín? (1/0)", helyes: 0, tizedes: 0, tures: 0.01 },
    ],
    megoldas: (
      <>
        <MB>{`V(d) = \\pi\\int_1^{${d}}\\frac{${k * k}}{x^2}dx = \\pi\\left[-\\frac{${k * k}}{x}\\right]_1^{${d}} = ${
          k * k
        }\\pi\\left(1-\\frac{1}{${d}}\\right) = ${szK(Vd, 5)}`}</MB>
        <MB>{`\\lim_{d\\to\\infty} V(d) = ${k * k}\\pi = ${szK(Vhatar, 5)}`}</MB>
        <p>
          A felszín viszont <strong>végtelen</strong>: a gyök alatt 1-nél nagyobb szám áll, tehát
        </p>
        <MB>{`F(d) = 2\\pi\\int_1^{d}\\frac{${k}}{x}\\sqrt{1+\\frac{${k * k}}{x^4}}\\,dx \\ \\ge\\ 2\\pi ${
          k === 1 ? "" : k
        }\\int_1^{d}\\frac{dx}{x} = 2\\pi ${k === 1 ? "" : k}\\ln d \\to \\infty`}</MB>
        <p>
          Ez a Torricelli-trombita paradoxona: véges térfogat, végtelen felszín — a <M>{"p=1"}</M> határ két oldala.
        </p>
      </>
    ),
  };
}

/* ================= 4. Mért adatok trapézzal és Simpsonnal ================= */

function mertAdatFeladat() {
  const n = valaszt([4, 6]);
  const h = valaszt([0.5, 1, 2]);
  const x0 = valaszt([0, 1, 2]);
  // A mért értékek egy sima (de véletlen) görbét követnek, apró „mérési zajjal”:
  // így a trapéz- és a Simpson-összeg közel esik egymáshoz, mint a valóságban.
  const alap = 0.6 + Math.random() * 2.2;
  const amp = 2 + Math.random() * 6;
  const dolt = (Math.random() - 0.5) * 2.4;
  const xs = [];
  const ys = [];
  for (let i = 0; i <= n; i++) {
    xs.push(x0 + i * h);
    const t = i / n;
    const nyers = alap + amp * Math.sin(Math.PI * t) + dolt * t + (Math.random() - 0.5) * 0.3;
    ys.push(Math.round(Math.max(0.3, nyers) * 10) / 10);
  }
  const T = trapezAdatokbol(xs, ys);
  const S = simpsonAdatokbol(xs, ys);
  const hSzoveg = Number.isInteger(h) ? String(h) : szK(h, 1);
  const vegSzoveg = Number.isInteger(x0 + n * h) ? String(x0 + n * h) : szK(x0 + n * h, 1);

  const tabla = (
    <div className="my-3 overflow-hidden rounded-lg border border-petrol-200">
      <table className="szamok w-full text-[13px]">
        <tbody>
          <tr className="bg-petrol-50 text-petrol-600">
            <td className="px-2 py-1 font-semibold">xᵢ</td>
            {xs.map((x) => (
              <td key={x} className="px-2 py-1 text-right">
                {Number.isInteger(x) ? String(x) : sz(x, 1)}
              </td>
            ))}
          </tr>
          <tr className="border-t border-petrol-100 text-petrol-800">
            <td className="px-2 py-1 font-semibold">yᵢ</td>
            {ys.map((y, i) => (
              <td key={i} className="px-2 py-1 text-right">
                {sz(y, 1)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );

  return {
    szoveg: (
      <>
        <p>
          Egy mérés eredményeként az alábbi <M>{`(x_i;\\,y_i)`}</M> párokat kaptuk (a lépésköz egyenletes,{" "}
          <M>{`h = ${hSzoveg}`}</M>). Képlet nincs — közelítsd az{" "}
          <M>{`\\int_{${x0}}^{${vegSzoveg}} y\\,dx`}</M> integrált trapéz- és Simpson-szabállyal, 3 tizedesre.
        </p>
        {tabla}
      </>
    ),
    sugo: (
      <p>
        Trapéz: <M>{"\\frac h2\\left(y_0+2y_1+\\dots+2y_{n-1}+y_n\\right)"}</M>. Simpson:{" "}
        <M>{"\\frac h3\\left(y_0+4y_1+2y_2+\\dots+4y_{n-1}+y_n\\right)"}</M>. Itt <M>{`n = ${n}`}</M> páros, tehát a
        Simpson-szabály alkalmazható. Ellenőrzés: a súlyok összege <M>{`2n = ${2 * n}`}</M>, illetve{" "}
        <M>{`3n = ${3 * n}`}</M>.
      </p>
    ),
    mezok: [
      { id: "T", cimke: "trapézösszeg", helyes: T, tizedes: 3, tures: 0.004 },
      { id: "S", cimke: "Simpson-összeg", helyes: S, tizedes: 3, tures: 0.004 },
    ],
    megoldas: (
      <>
        <MB>{`T = \\frac{${hSzoveg}}{2}\\left(${ys
          .map((y, i) => `${i === 0 || i === n ? "" : "2\\cdot"}${szK(y, 1)}`)
          .join("+")}\\right) = ${szK(T, 4)}`}</MB>
        <MB>{`S = \\frac{${hSzoveg}}{3}\\left(${ys
          .map((y, i) => {
            const w = i === 0 || i === n ? "" : i % 2 === 1 ? "4\\cdot" : "2\\cdot";
            return `${w}${szK(y, 1)}`;
          })
          .join("+")}\\right) = ${szK(S, 4)}`}</MB>
        <p>
          A két érték közel van egymáshoz, de nem azonos. Mért adatoknál általában a Simpson-összeg a pontosabb —
          feltéve, hogy a pontok elég sűrűn követik a valódi görbét.
        </p>
      </>
    ),
  };
}

/* ================= a szekció ================= */

export const EXTRA_GENERATOROK = [
  { cim: "Belső szakadási hely", fn: belsoSzakadasFeladat },
  { cim: "Limeszes összehasonlító kritérium", fn: limeszesFeladat },
  { cim: "Torricelli-típusú forgástest", fn: torricelliFeladat },
  { cim: "Mért adatok numerikus integrálása", fn: mertAdatFeladat },
];

export default function GyakorloExtra() {
  return (
    <div>
      <GyakorloDoboz
        cim="Belső szakadási hely"
        leiras="A kritikus pont az intervallum belsejében van — két külön határérték, külön-külön kell konvergálniuk."
        generator={belsoSzakadasFeladat}
        oszlopok={3}
      />
      <GyakorloDoboz
        cim="Limeszes összehasonlító kritérium"
        leiras="A legnagyobb rendű tagokból válaszd a g-t, aztán számold ki a hányados határértékét."
        generator={limeszesFeladat}
        oszlopok={3}
      />
      <GyakorloDoboz
        cim="Torricelli-típusú forgástest"
        leiras="A térfogat 1/x²-tel, a felszín 1/x-szel arányos — az egyik konvergál, a másik nem."
        generator={torricelliFeladat}
        oszlopok={3}
      />
      <GyakorloDoboz
        cim="Mért adatok numerikus integrálása"
        leiras="Nincs képlet, csak számok — pontosan az a helyzet, amivel a mérnök a legtöbbször találkozik."
        generator={mertAdatFeladat}
      />
    </div>
  );
}
