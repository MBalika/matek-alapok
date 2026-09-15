"use client";

import GyakorloDoboz from "@/components/GyakorloDoboz";
import { M, MB } from "@/components/ui/Keplet";
import { szK } from "@/lib/szamok";

/* ---------- segédfüggvények ---------- */

const egesz = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
const valaszt = (tomb) => tomb[Math.floor(Math.random() * tomb.length)];

const egyutt = (c, kif) => (c === 1 ? kif : c === -1 ? `-${kif}` : `${c}${kif}`);

const tag = (c, kif = "") => {
  if (c === 0) return "";
  return `${c > 0 ? "+" : "-"}${Math.abs(c) === 1 && kif ? "" : Math.abs(c)}${kif}`;
};

/* ================= 1. Trigonometrikus linearizálás ================= */

function linearizalasFeladat() {
  const paros = valaszt(["cos", "sin"]);
  const a = valaszt([1, 2, 3, -1, -2]);
  const c = valaszt([1, 2, 3, 4, 6, -2]);

  const p = c / 2;
  const q = (paros === "cos" ? 1 : -1) * (c / (4 * a));
  const fv = paros === "cos" ? "\\cos" : "\\sin";
  const azonossag =
    paros === "cos"
      ? `\\cos^2 u = \\frac{1+\\cos 2u}{2}`
      : `\\sin^2 u = \\frac{1-\\cos 2u}{2}`;

  return {
    szoveg: (
      <p>
        Linearizálj, majd integrálj! A primitív függvény <M>{`F(x) = px + q\\sin\\left(${egyutt(2 * a, "x")}\\right)`}</M>{" "}
        alakú. Add meg <M>{"p"}</M> és <M>{"q"}</M> értékét 4 tizedesre.
        <MB>{`\\int ${egyutt(c, `${fv}^2\\left(${egyutt(a, "x")}\\right)`)}dx`}</MB>
      </p>
    ),
    sugo: (
      <p>
        Használd a linearizáló azonosságot: <M>{azonossag}</M>. Itt <M>{`u = ${egyutt(a, "x")}`}</M>, tehát a
        keletkező koszinusz argumentuma <M>{egyutt(2 * a, "x")}</M> lesz — az integrálásakor{" "}
        <M>{`\\frac{1}{${2 * a}}`}</M> szorzó jön be.
      </p>
    ),
    mezok: [
      { id: "p", cimke: "p (az x együtthatója)", helyes: p, tizedes: 4, tures: 0.002 },
      { id: "q", cimke: "q (a sin előtti szorzó)", helyes: q, tizedes: 4, tures: 0.002 },
    ],
    megoldas: (
      <>
        <MB>{`${egyutt(c, `${fv}^2\\left(${egyutt(a, "x")}\\right)`)} = ${c}\\cdot\\frac{1${
          paros === "cos" ? "+" : "-"
        }\\cos\\left(${egyutt(2 * a, "x")}\\right)}{2}`}</MB>
        <MB>{`\\int = \\frac{${c}}{2}x ${paros === "cos" ? "+" : "-"} \\frac{${c}}{2}\\cdot\\frac{1}{${
          2 * a
        }}\\sin\\left(${egyutt(2 * a, "x")}\\right)+C`}</MB>
        <MB>{`p = ${szK(p, 4)}, \\qquad q = ${szK(q, 4)}`}</MB>
        <p>
          Ellenőrzés:{" "}
          <M>{`F'(x) = ${szK(p, 4)} ${q * 2 * a >= 0 ? "+" : "-"} ${szK(
            Math.abs(q * 2 * a),
            4,
          )}\\cos\\left(${egyutt(2 * a, "x")}\\right)`}</M>{" "}
          — és ez valóban az integrandus linearizált alakja.
        </p>
      </>
    ),
  };
}

/* ================= 2. Helyettesítés — számérték ================= */

function helyettesitesFeladat() {
  const tipus = valaszt(["arctg", "log"]);
  const a = valaszt([1, 2, 3, -1, -2]);
  const x0 = egesz(-1, 1);
  const x1 = x0 + egesz(1, 2);

  const k = 1 / a;
  if (tipus === "arctg") {
    const F = (x) => k * Math.atan(Math.exp(a * x));
    const ertek = F(x1) - F(x0);
    return {
      szoveg: (
        <p>
          Helyettesítéssel oldd meg! A primitív függvény <M>{`F(x) = k\\operatorname{arctg}\\left(e^{${egyutt(
            a,
            "x",
          )}}\\right)`}</M>{" "}
          alakú. Add meg <M>{"k"}</M>-t 4 tizedesre és az <M>{`F(${x1})-F(${x0})`}</M> különbséget 4 tizedesre.
          <MB>{`\\int \\frac{e^{${egyutt(a, "x")}}}{1+e^{${egyutt(2 * a, "x")}}}\\,dx`}</MB>
        </p>
      ),
      sugo: (
        <p>
          Vedd észre, hogy <M>{`e^{${egyutt(2 * a, "x")}} = \\left(e^{${egyutt(a, "x")}}\\right)^2`}</M>, tehát
          minden csak <M>{`e^{${egyutt(a, "x")}}`}</M>-től függ. Legyen <M>{`t = e^{${egyutt(a, "x")}}`}</M>, ekkor{" "}
          <M>{`dt = ${a}e^{${egyutt(a, "x")}}dx`}</M>, és marad <M>{`\\frac{1}{${a}}\\int\\frac{dt}{1+t^2}`}</M>.
        </p>
      ),
      mezok: [
        { id: "k", cimke: "k (az arctg szorzója)", helyes: k, tizedes: 4, tures: 0.002 },
        { id: "d", cimke: `F(${x1}) − F(${x0})`, helyes: ertek, tizedes: 4 },
      ],
      megoldas: (
        <>
          <MB>{`\\int \\frac{e^{${egyutt(a, "x")}}}{1+\\left(e^{${egyutt(a, "x")}}\\right)^2}dx = \\frac{1}{${a}}\\operatorname{arctg}\\left(e^{${egyutt(
            a,
            "x",
          )}}\\right)+C`}</MB>
          <MB>{`F(${x1}) = ${szK(F(x1), 4)}, \\qquad F(${x0}) = ${szK(F(x0), 4)}`}</MB>
          <MB>{`F(${x1})-F(${x0}) = ${szK(ertek, 4)}`}</MB>
        </>
      ),
    };
  }

  const F = (x) => k * Math.log(1 + Math.exp(a * x));
  const ertek = F(x1) - F(x0);
  return {
    szoveg: (
      <p>
        Ismerd fel a <M>{"\\frac{f'}{f}"}</M> mintát! A primitív függvény{" "}
        <M>{`F(x) = k\\ln\\left(1+e^{${egyutt(a, "x")}}\\right)`}</M> alakú. Add meg <M>{"k"}</M>-t 4 tizedesre és az{" "}
        <M>{`F(${x1})-F(${x0})`}</M> különbséget 4 tizedesre.
        <MB>{`\\int \\frac{e^{${egyutt(a, "x")}}}{1+e^{${egyutt(a, "x")}}}\\,dx`}</MB>
      </p>
    ),
    sugo: (
      <p>
        A nevező deriváltja <M>{`${a}e^{${egyutt(a, "x")}}`}</M> — a számláló ennek{" "}
        <M>{`\\frac{1}{${a}}`}</M>-szerese. Abszolút érték nem kell, mert{" "}
        <M>{`1+e^{${egyutt(a, "x")}} > 0`}</M> mindig.
      </p>
    ),
    mezok: [
      { id: "k", cimke: "k (a logaritmus szorzója)", helyes: k, tizedes: 4, tures: 0.002 },
      { id: "d", cimke: `F(${x1}) − F(${x0})`, helyes: ertek, tizedes: 4 },
    ],
    megoldas: (
      <>
        <MB>{`\\int \\frac{e^{${egyutt(a, "x")}}}{1+e^{${egyutt(a, "x")}}}dx = \\frac{1}{${a}}\\ln\\left(1+e^{${egyutt(
          a,
          "x",
        )}}\\right)+C`}</MB>
        <MB>{`F(${x1}) = ${szK(F(x1), 4)}, \\qquad F(${x0}) = ${szK(F(x0), 4)}`}</MB>
        <MB>{`F(${x1})-F(${x0}) = ${szK(ertek, 4)}`}</MB>
      </>
    ),
  };
}

/* ================= 3. Racionális tört polinomosztással ================= */

function polinomosztasFeladat() {
  for (let probak = 0; probak < 60; probak++) {
    const a = egesz(-5, 5);
    const b = egesz(-6, 6);
    const c = egesz(-4, 4);
    if (c === 0 && a === 0) continue;
    const konstans = a + c;
    const maradek = c * c + a * c + b;
    if (maradek === 0) continue; // ekkor nem marad logaritmusos tag
    if (Math.abs(maradek) > 40) continue;

    return {
      szoveg: (
        <p>
          A tört áltört, ezért előbb <strong>polinomosztás</strong> kell. A hányados <M>{"x + r"}</M> alakú, a
          maradék pedig egy szám. Add meg az <M>{"r"}</M> konstans tagot és a maradékot.
          <MB>{`\\int \\frac{x^2${tag(a, "x")}${tag(b)}}{x${tag(-c)}}\\,dx`}</MB>
        </p>
      ),
      sugo: (
        <p>
          Végezz maradékos osztást: <M>{`x^2${tag(a, "x")}${tag(b)} = \\left(x${tag(-c)}\\right)(x+r)+m`}</M>.
          Gyorsfogás: a maradék mindig a számláló helyettesítési értéke a nevező gyökénél, vagyis{" "}
          <M>{`x = ${c}`}</M> behelyettesítésével adódik.
        </p>
      ),
      mezok: [
        { id: "r", cimke: "r (a hányados konstans tagja)", helyes: konstans, tizedes: 0, tures: 0.01 },
        { id: "m", cimke: "m (a maradék)", helyes: maradek, tizedes: 0, tures: 0.01 },
      ],
      megoldas: (
        <>
          <MB>{`\\frac{x^2${tag(a, "x")}${tag(b)}}{x${tag(-c)}} = x${tag(konstans)} + \\frac{${maradek}}{x${tag(
            -c,
          )}}`}</MB>
          <p>
            Ellenőrzés a gyöknél: <M>{`x = ${c}`}</M> esetén a számláló{" "}
            <M>{`${c * c}${tag(a * c)}${tag(b)} = ${maradek}`}</M> ✓
          </p>
          <MB>{`\\int = \\frac{x^2}{2}${tag(konstans, "x")} + ${maradek}\\ln\\left|x${tag(-c)}\\right|+C`}</MB>
        </>
      ),
    };
  }
  return polinomosztasFeladat();
}

/* ================= 4. Teljes négyzet és arctg ================= */

function teljesNegyzetFeladat() {
  const u = valaszt([-4, -3, -2, -1, 1, 2, 3, 4]);
  const v = egesz(1, 5);
  const p = 2 * u;
  const q = u * u + v * v;
  const k = 1 / v;

  return {
    szoveg: (
      <p>
        A nevezőnek nincs valós gyöke, ezért <strong>teljes négyzetté</strong> alakítunk:{" "}
        <M>{"x^2+px+q = (x+u)^2+v^2"}</M>. Add meg <M>{"u"}</M>-t, a pozitív <M>{"v"}</M>-t, és az arkusz tangens elé
        kerülő <M>{"k = 1/v"}</M> szorzót 4 tizedesre.
        <MB>{`\\int \\frac{dx}{x^2${tag(p, "x")}${tag(q)}}`}</MB>
      </p>
    ),
    sugo: (
      <p>
        A teljes négyzet: <M>{`x^2${tag(p, "x")} = \\left(x${tag(u)}\\right)^2 - ${u * u}`}</M>, tehát{" "}
        <M>{`x^2${tag(p, "x")}${tag(q)} = \\left(x${tag(u)}\\right)^2 + ${q - u * u}`}</M>. A{" "}
        <M>{"\\int \\frac{dx}{w^2+v^2} = \\frac1v\\operatorname{arctg}\\frac{w}{v}"}</M> alapképlet zárja a sort.
      </p>
    ),
    mezok: [
      { id: "u", cimke: "u", helyes: u, tizedes: 0, tures: 0.01 },
      { id: "v", cimke: "v (pozitív)", helyes: v, tizedes: 0, tures: 0.01 },
      { id: "k", cimke: "k = 1/v", helyes: k, tizedes: 4, tures: 0.002 },
    ],
    megoldas: (
      <>
        <MB>{`x^2${tag(p, "x")}${tag(q)} = \\left(x${tag(u)}\\right)^2+${v}^2`}</MB>
        <MB>{`\\int \\frac{dx}{\\left(x${tag(u)}\\right)^2+${v * v}} = \\frac{1}{${v}}\\operatorname{arctg}\\frac{x${tag(
          u,
        )}}{${v}}+C = ${szK(k, 4)}\\operatorname{arctg}\\frac{x${tag(u)}}{${v}}+C`}</MB>
        <p>
          A diszkrimináns <M>{`${p}^2-4\\cdot${q} = ${p * p - 4 * q}<0`}</M>, tehát tényleg nincs valós gyök — ez
          indokolja, hogy arkusz tangens és nem logaritmus lesz az eredmény.
        </p>
      </>
    ),
  };
}

export const EXTRA_GENERATOROK = [
  { cim: "Trigonometrikus linearizálás", fn: linearizalasFeladat },
  { cim: "Helyettesítés — számérték", fn: helyettesitesFeladat },
  { cim: "Racionális tört polinomosztással", fn: polinomosztasFeladat },
  { cim: "Teljes négyzet és arctg", fn: teljesNegyzetFeladat },
];

export default function GyakorloExtra() {
  return (
    <div>
      <GyakorloDoboz
        cim="Trigonometrikus linearizálás"
        leiras="Páros hatványnál mindig linearizálunk: a kétszeres szög azonossága lineárissá teszi az integrandust."
        generator={linearizalasFeladat}
      />
      <GyakorloDoboz
        cim="Helyettesítés — számérték"
        leiras="Ha minden csak az exponenciálistól függ, a t = eᵃˣ helyettesítés racionális törtet csinál a feladatból."
        generator={helyettesitesFeladat}
      />
      <GyakorloDoboz
        cim="Racionális tört polinomosztással"
        leiras="Ha a számláló foka nem kisebb a nevezőénél, a parciális törtekre bontás nem oldható meg — előbb osztani kell."
        generator={polinomosztasFeladat}
      />
      <GyakorloDoboz
        cim="Teljes négyzet és arctg"
        leiras="Valós gyök nélküli másodfokú nevezőnél a teljes négyzet vezet az arkusz tangenshez."
        generator={teljesNegyzetFeladat}
        oszlopok={3}
      />
    </div>
  );
}
