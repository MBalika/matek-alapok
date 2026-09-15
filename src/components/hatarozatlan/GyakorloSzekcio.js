"use client";

import GyakorloDoboz from "@/components/GyakorloDoboz";
import { M, MB } from "@/components/ui/Keplet";
import { szK } from "@/lib/szamok";

/* ---------- segédfüggvények ---------- */

const egesz = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
const valaszt = (tomb) => tomb[Math.floor(Math.random() * tomb.length)];

/** Lineáris kifejezés LaTeX-alakja: „3x-2”, „-x+4”, „x”. */
function lin(a, b) {
  const eleje = a === 1 ? "x" : a === -1 ? "-x" : `${a}x`;
  if (b === 0) return eleje;
  return `${eleje}${b > 0 ? "+" : "-"}${Math.abs(b)}`;
}

/** Együttható a kifejezés előtt: 1 → semmi, −1 → mínusz. */
const egyutt = (c, kif) => (c === 1 ? kif : c === -1 ? `-${kif}` : `${c}${kif}`);

/** Előjeles tag: „ + 3”, „ - 4”; nullánál üres. */
const tag = (c, kif = "") => {
  if (c === 0) return "";
  return `${c > 0 ? "+" : "-"}${Math.abs(c) === 1 && kif ? "" : Math.abs(c)}${kif}`;
};

/* ================= 1. Alapintegrál — lineáris belső függvény ================= */

function alapFeladat() {
  for (let probak = 0; probak < 60; probak++) {
    const tipus = valaszt(["hatvany", "exp", "cos", "sin", "recip"]);
    const a = valaszt([1, 2, 3, -1, -2, -3]);
    const b = egesz(-4, 4);
    const x0 = egesz(-2, 1);
    const x1 = x0 + egesz(1, 3);
    /* az a = ±1, b = 0 eset triviális (nincs is mit helyettesíteni) */
    if (Math.abs(a) === 1 && b === 0) continue;

    let integrandus;
    let Gnev;
    let GLatex;
    let k;
    let F;

    if (tipus === "hatvany") {
      const n = egesz(2, 4);
      integrandus = `\\left(${lin(a, b)}\\right)^{${n}}`;
      Gnev = `G(u) = u^{${n + 1}}`;
      GLatex = `\\left(${lin(a, b)}\\right)^{${n + 1}}`;
      k = 1 / (a * (n + 1));
      F = (x) => (k * Math.pow(a * x + b, n + 1));
    } else if (tipus === "exp") {
      integrandus = `e^{${lin(a, b)}}`;
      Gnev = "G(u) = e^{u}";
      GLatex = `e^{${lin(a, b)}}`;
      k = 1 / a;
      F = (x) => k * Math.exp(a * x + b);
    } else if (tipus === "cos") {
      integrandus = `\\cos\\left(${lin(a, b)}\\right)`;
      Gnev = "G(u) = \\sin u";
      GLatex = `\\sin\\left(${lin(a, b)}\\right)`;
      k = 1 / a;
      F = (x) => k * Math.sin(a * x + b);
    } else if (tipus === "sin") {
      integrandus = `\\sin\\left(${lin(a, b)}\\right)`;
      Gnev = "G(u) = \\cos u";
      GLatex = `\\cos\\left(${lin(a, b)}\\right)`;
      k = -1 / a;
      F = (x) => k * Math.cos(a * x + b);
    } else {
      integrandus = `\\dfrac{1}{${lin(a, b)}}`;
      Gnev = "G(u) = \\ln\\left|u\\right|";
      GLatex = `\\ln\\left|${lin(a, b)}\\right|`;
      k = 1 / a;
      F = (x) => k * Math.log(Math.abs(a * x + b));
    }

    /* a szakaszon nem lehet pólus, és maradjon kezelhető a nagyságrend */
    let jo = true;
    const polus = -b / a; // csak a reciprok esetben számít
    if (tipus === "recip" && polus > x0 - 0.5 && polus < x1 + 0.5) jo = false;
    for (let i = 0; i <= 20; i++) {
      const x = x0 + ((x1 - x0) * i) / 20;
      const u = a * x + b;
      if (tipus === "exp" && Math.abs(u) > 4) jo = false;
      if (tipus === "hatvany" && Math.abs(u) > 4) jo = false;
    }
    const ertek = F(x1) - F(x0);
    if (!jo || !Number.isFinite(ertek) || Math.abs(ertek) > 400 || Math.abs(ertek) < 0.02) continue;

    return {
      szoveg: (
        <p>
          A primitív függvény <M>{`F(x) = k\\cdot ${GLatex}`}</M> alakú, ahol <M>{Gnev}</M>. Add meg a{" "}
          <M>{"k"}</M> szorzót 4 tizedesre, és az <M>{`F(${x1})-F(${x0})`}</M> különbséget 3 tizedesre.
          <MB>{`\\int ${integrandus}\\,dx`}</MB>
        </p>
      ),
      sugo: (
        <p>
          A belső függvény <M>{lin(a, b)}</M>, a meredeksége <M>{`a = ${a}`}</M>. A szabály{" "}
          <M>{"\\int f(ax+b)\\,dx = \\frac1a F(ax+b)+C"}</M>: a láncszabály miatt osztani kell{" "}
          <M>{"a"}</M>-val.{" "}
          {tipus === "hatvany"
            ? "A hatványnál ezen felül még az új kitevővel is osztunk."
            : tipus === "sin"
              ? "A szinusz primitív függvénye −cos, ezért a szorzóban is megjelenik a mínusz."
              : "A többi tényező a táblázatból jön."}
        </p>
      ),
      mezok: [
        { id: "k", cimke: "k (a szorzó)", helyes: k, tizedes: 4, tures: 0.002 },
        { id: "d", cimke: `F(${x1}) − F(${x0})`, helyes: ertek, tizedes: 3 },
      ],
      megoldas: (
        <>
          <MB>{`\\int ${integrandus}\\,dx = ${szK(k, 4)}\\cdot ${GLatex}+C`}</MB>
          <MB>{`F(${x1}) = ${szK(F(x1), 4)}, \\qquad F(${x0}) = ${szK(F(x0), 4)}`}</MB>
          <MB>{`F(${x1})-F(${x0}) = ${szK(ertek, 4)}`}</MB>
          <p>
            Ellenőrzés: deriváld vissza az <M>{`${szK(k, 4)}\\cdot ${GLatex}`}</M> kifejezést — a láncszabály
            behozza az <M>{`${a}`}</M> szorzót, ami pont kiejti a nevezőt.
          </p>
        </>
      ),
    };
  }
  return alapFeladat();
}

/* ================= 2. Logaritmusos minta (f′/f) ================= */

function logFeladat() {
  const n = valaszt([2, 3]);
  const c = valaszt([1, 2, 3, 4, 6, -2, -3]);
  const d = egesz(1, 9);
  const x0 = egesz(0, 2);
  const x1 = x0 + egesz(1, 3);

  const szorzo = c / n;
  const nevezo = `x^{${n}}+${d}`;
  const szamlalo = n === 2 ? egyutt(c, "x") : egyutt(c, "x^2");
  const F = (x) => szorzo * Math.log(Math.pow(x, n) + d);
  const ertek = F(x1) - F(x0);

  return {
    szoveg: (
      <p>
        Ismerd fel az <M>{"\\frac{f'}{f}"}</M> mintát! Add meg a logaritmus elé kerülő szorzót 4 tizedesre, és az{" "}
        <M>{`F(${x1})-F(${x0})`}</M> különbséget 4 tizedesre.
        <MB>{`\\int \\frac{${szamlalo}}{${nevezo}}\\,dx`}</MB>
      </p>
    ),
    sugo: (
      <p>
        A nevező deriváltja <M>{`${n}x^{${n - 1}}`}</M>. A számlálóban <M>{szamlalo}</M> áll, tehát a hiányzó
        tényezőt egy <M>{`\\frac{${c}}{${n}}`}</M> szorzóval pótoljuk. Abszolút érték itt nem kell, mert{" "}
        <M>{`x^{${n}}+${d} > 0`}</M> a megadott szakaszon.
      </p>
    ),
    mezok: [
      { id: "k", cimke: "A logaritmus szorzója", helyes: szorzo, tizedes: 4, tures: 0.002 },
      { id: "d", cimke: `F(${x1}) − F(${x0})`, helyes: ertek, tizedes: 4 },
    ],
    megoldas: (
      <>
        <MB>{`\\int \\frac{${szamlalo}}{${nevezo}}dx = \\frac{${c}}{${n}}\\int \\frac{${n}x^{${
          n - 1
        }}}{${nevezo}}dx = ${szK(szorzo, 4)}\\ln\\left(${nevezo}\\right)+C`}</MB>
        <MB>{`F(${x1}) = ${szK(szorzo, 4)}\\ln ${Math.pow(x1, n) + d} = ${szK(F(x1), 4)}`}</MB>
        <MB>{`F(${x0}) = ${szK(szorzo, 4)}\\ln ${Math.pow(x0, n) + d} = ${szK(F(x0), 4)}`}</MB>
        <MB>{`F(${x1})-F(${x0}) = ${szK(ertek, 4)}`}</MB>
      </>
    ),
  };
}

/* ================= 3. Hatványminta (fⁿ·f′) ================= */

function hatvanyMintaFeladat() {
  const tipus = valaszt(["x", "sin", "ln"]);
  const n = egesz(2, 5);
  const c = valaszt([1, 2, 3, 4, 6, -2, -3]);

  if (tipus === "x") {
    const d = egesz(1, 6);
    const szorzo = c / (2 * (n + 1));
    return {
      szoveg: (
        <p>
          A primitív függvény <M>{`F(x) = k\\left(x^2+${d}\\right)^{m}`}</M> alakú. Add meg a <M>{"k"}</M> szorzót 4
          tizedesre és az <M>{"m"}</M> kitevőt.
          <MB>{`\\int ${egyutt(c, "x")}\\left(x^2+${d}\\right)^{${n}}dx`}</MB>
        </p>
      ),
      sugo: (
        <p>
          <M>{`f = x^2+${d}`}</M>, tehát <M>{"f' = 2x"}</M>. A szorzatban <M>{egyutt(c, "x")}</M> áll, vagyis a{" "}
          <M>{`\\frac{${c}}{2}`}</M> szorzóval igazítunk. Utána a hatványszabály: a kitevő eggyel nő, és osztunk az
          új kitevővel.
        </p>
      ),
      mezok: [
        { id: "k", cimke: "k (a szorzó)", helyes: szorzo, tizedes: 4, tures: 0.002 },
        { id: "m", cimke: "m (a kitevő)", helyes: n + 1, tizedes: 0, tures: 0.01 },
      ],
      megoldas: (
        <>
          <MB>{`\\int ${egyutt(c, "x")}\\left(x^2+${d}\\right)^{${n}}dx = \\frac{${c}}{2}\\int \\left(x^2+${d}\\right)^{${n}}\\cdot 2x\\,dx`}</MB>
          <MB>{`= \\frac{${c}}{2}\\cdot\\frac{\\left(x^2+${d}\\right)^{${n + 1}}}{${
            n + 1
          }}+C = ${szK(szorzo, 4)}\\left(x^2+${d}\\right)^{${n + 1}}+C`}</MB>
        </>
      ),
    };
  }

  if (tipus === "sin") {
    const szorzo = c / (n + 1);
    return {
      szoveg: (
        <p>
          A primitív függvény <M>{"F(x) = k\\sin^{m} x"}</M> alakú. Add meg a <M>{"k"}</M> szorzót 4 tizedesre és az{" "}
          <M>{"m"}</M> kitevőt.
          <MB>{`\\int ${egyutt(c, `\\sin^{${n}} x`)}\\cos x\\,dx`}</MB>
        </p>
      ),
      sugo: (
        <p>
          <M>{"f = \\sin x"}</M> és <M>{"f' = \\cos x"}</M> — a derivált ott áll a szorzatban, tehát tiszta{" "}
          <M>{"f^{\\,n}f'"}</M> minta. Semmilyen igazítás nem kell, csak a konstans szorzó marad kívül.
        </p>
      ),
      mezok: [
        { id: "k", cimke: "k (a szorzó)", helyes: szorzo, tizedes: 4, tures: 0.002 },
        { id: "m", cimke: "m (a kitevő)", helyes: n + 1, tizedes: 0, tures: 0.01 },
      ],
      megoldas: (
        <MB>{`\\int ${egyutt(c, `\\sin^{${n}} x`)}\\cos x\\,dx = ${c}\\cdot\\frac{\\sin^{${
          n + 1
        }}x}{${n + 1}}+C = ${szK(szorzo, 4)}\\sin^{${n + 1}}x+C`}</MB>
      ),
    };
  }

  const szorzo = c / (n + 1);
  return {
    szoveg: (
      <p>
        A primitív függvény <M>{"F(x) = k\\ln^{m} x"}</M> alakú. Add meg a <M>{"k"}</M> szorzót 4 tizedesre és az{" "}
        <M>{"m"}</M> kitevőt.
        <MB>{`\\int \\frac{${egyutt(c, `\\ln^{${n}} x`)}}{x}\\,dx`}</MB>
      </p>
    ),
    sugo: (
      <p>
        Írd át szorzattá: <M>{`\\frac{\\ln^{${n}}x}{x} = \\ln^{${n}}x\\cdot\\frac1x`}</M>. Itt{" "}
        <M>{"f = \\ln x"}</M> és <M>{"f' = \\frac1x"}</M>, tehát <M>{"f^{\\,n}f'"}</M> minta.
      </p>
    ),
    mezok: [
      { id: "k", cimke: "k (a szorzó)", helyes: szorzo, tizedes: 4, tures: 0.002 },
      { id: "m", cimke: "m (a kitevő)", helyes: n + 1, tizedes: 0, tures: 0.01 },
    ],
    megoldas: (
      <MB>{`\\int ${egyutt(c, `\\ln^{${n}} x`)}\\cdot\\frac1x\\,dx = ${c}\\cdot\\frac{\\ln^{${n + 1}}x}{${
        n + 1
      }}+C = ${szK(szorzo, 4)}\\ln^{${n + 1}}x+C`}</MB>
    ),
  };
}

/* ================= 4. Parciális integrálás ================= */

function parcialisFeladat() {
  const tipus = valaszt(["exp", "cos", "sin"]);
  const a = valaszt([1, 2, 3, 4, -1, -2, -3]);

  if (tipus === "exp") {
    const A = 1 / a;
    const B = -1 / (a * a);
    return {
      szoveg: (
        <p>
          A primitív függvény <M>{`F(x) = (Ax+B)e^{${egyutt(a, "x")}}`}</M> alakú. Add meg <M>{"A"}</M> és{" "}
          <M>{"B"}</M> értékét 4 tizedesre.
          <MB>{`\\int x\\,e^{${egyutt(a, "x")}}\\,dx`}</MB>
        </p>
      ),
      sugo: (
        <p>
          Válaszd <M>{"u = x"}</M>-et (deriválva 1 lesz) és <M>{`v' = e^{${egyutt(a, "x")}}`}</M>-et, amiből{" "}
          <M>{`v = \\frac{1}{${a}}e^{${egyutt(a, "x")}}`}</M>. A maradék integrál már alapintegrál.
        </p>
      ),
      mezok: [
        { id: "A", cimke: "A (az x együtthatója)", helyes: A, tizedes: 4, tures: 0.002 },
        { id: "B", cimke: "B (a konstans tag)", helyes: B, tizedes: 4, tures: 0.002 },
      ],
      megoldas: (
        <>
          <MB>{`\\int xe^{${egyutt(a, "x")}}dx = \\frac{x}{${a}}e^{${egyutt(a, "x")}} - \\frac{1}{${a}}\\int e^{${egyutt(
            a,
            "x",
          )}}dx`}</MB>
          <MB>{`= \\frac{x}{${a}}e^{${egyutt(a, "x")}} - \\frac{1}{${a * a}}e^{${egyutt(a, "x")}}+C`}</MB>
          <MB>{`A = \\frac{1}{${a}} = ${szK(A, 4)}, \\qquad B = -\\frac{1}{${a * a}} = ${szK(B, 4)}`}</MB>
        </>
      ),
    };
  }

  if (tipus === "cos") {
    const A = 1 / a;
    const B = 1 / (a * a);
    return {
      szoveg: (
        <p>
          A primitív függvény <M>{`F(x) = Ax\\sin\\left(${egyutt(a, "x")}\\right)+B\\cos\\left(${egyutt(
            a,
            "x",
          )}\\right)`}</M>{" "}
          alakú. Add meg <M>{"A"}</M> és <M>{"B"}</M> értékét 4 tizedesre.
          <MB>{`\\int x\\cos\\left(${egyutt(a, "x")}\\right)dx`}</MB>
        </p>
      ),
      sugo: (
        <p>
          <M>{"u = x"}</M>, <M>{`v' = \\cos\\left(${egyutt(a, "x")}\\right)`}</M>, tehát{" "}
          <M>{`v = \\frac{1}{${a}}\\sin\\left(${egyutt(a, "x")}\\right)`}</M>. A maradék integrál{" "}
          <M>{`-\\frac{1}{${a}}\\int \\sin\\left(${egyutt(a, "x")}\\right)dx`}</M>, ami koszinuszt ad.
        </p>
      ),
      mezok: [
        { id: "A", cimke: "A (a sin előtti szorzó)", helyes: A, tizedes: 4, tures: 0.002 },
        { id: "B", cimke: "B (a cos előtti szorzó)", helyes: B, tizedes: 4, tures: 0.002 },
      ],
      megoldas: (
        <>
          <MB>{`\\int x\\cos\\left(${egyutt(a, "x")}\\right)dx = \\frac{x}{${a}}\\sin\\left(${egyutt(
            a,
            "x",
          )}\\right) - \\frac{1}{${a}}\\int \\sin\\left(${egyutt(a, "x")}\\right)dx`}</MB>
          <MB>{`= \\frac{x}{${a}}\\sin\\left(${egyutt(a, "x")}\\right) + \\frac{1}{${
            a * a
          }}\\cos\\left(${egyutt(a, "x")}\\right)+C`}</MB>
          <MB>{`A = ${szK(A, 4)}, \\qquad B = ${szK(B, 4)}`}</MB>
        </>
      ),
    };
  }

  const A = -1 / a;
  const B = 1 / (a * a);
  return {
    szoveg: (
      <p>
        A primitív függvény <M>{`F(x) = Ax\\cos\\left(${egyutt(a, "x")}\\right)+B\\sin\\left(${egyutt(
          a,
          "x",
        )}\\right)`}</M>{" "}
        alakú. Add meg <M>{"A"}</M> és <M>{"B"}</M> értékét 4 tizedesre.
        <MB>{`\\int x\\sin\\left(${egyutt(a, "x")}\\right)dx`}</MB>
      </p>
    ),
    sugo: (
      <p>
        <M>{"u = x"}</M>, <M>{`v' = \\sin\\left(${egyutt(a, "x")}\\right)`}</M>, amiből{" "}
        <M>{`v = -\\frac{1}{${a}}\\cos\\left(${egyutt(a, "x")}\\right)`}</M> — figyelj a mínuszra, ez a leggyakoribb
        hiba ennél a típusnál.
      </p>
    ),
    mezok: [
      { id: "A", cimke: "A (a cos előtti szorzó)", helyes: A, tizedes: 4, tures: 0.002 },
      { id: "B", cimke: "B (a sin előtti szorzó)", helyes: B, tizedes: 4, tures: 0.002 },
    ],
    megoldas: (
      <>
        <MB>{`\\int x\\sin\\left(${egyutt(a, "x")}\\right)dx = -\\frac{x}{${a}}\\cos\\left(${egyutt(
          a,
          "x",
        )}\\right) + \\frac{1}{${a}}\\int \\cos\\left(${egyutt(a, "x")}\\right)dx`}</MB>
        <MB>{`= -\\frac{x}{${a}}\\cos\\left(${egyutt(a, "x")}\\right) + \\frac{1}{${a * a}}\\sin\\left(${egyutt(
          a,
          "x",
        )}\\right)+C`}</MB>
        <MB>{`A = ${szK(A, 4)}, \\qquad B = ${szK(B, 4)}`}</MB>
      </>
    ),
  };
}

/* ================= 5. Parciális törtek: A és B ================= */

function tortFeladat() {
  for (let probak = 0; probak < 60; probak++) {
    const alfa = egesz(-4, 4);
    const beta = egesz(-4, 4);
    if (alfa === beta) continue;
    const a = valaszt([1, 2, 3, 4, 5, -2, -3]);
    const b = egesz(-6, 6);
    const A = (a * alfa + b) / (alfa - beta);
    const B = (a * beta + b) / (beta - alfa);
    if (Math.abs(A) < 0.05 || Math.abs(B) < 0.05) continue;
    if (Math.abs(A) > 12 || Math.abs(B) > 12) continue;

    /* a kibontott nevező: (x−α)(x−β) = x² − (α+β)x + αβ */
    const p = -(alfa + beta);
    const q = alfa * beta;
    const nevezo = `x^2${tag(p, "x")}${tag(q)}`;

    return {
      szoveg: (
        <p>
          Bontsd parciális törtekre! A bontás <M>{`\\frac{A}{x${tag(-alfa)}}+\\frac{B}{x${tag(-beta)}}`}</M> alakú,
          ahol a nevezők gyöktényezők. Add meg <M>{"A"}</M> és <M>{"B"}</M> értékét 3 tizedesre.
          <MB>{`\\int \\frac{${egyutt(a, "x")}${tag(b)}}{${nevezo}}\\,dx`}</MB>
        </p>
      ),
      sugo: (
        <p>
          A nevező gyökei <M>{`${alfa}`}</M> és <M>{`${beta}`}</M>, tehát{" "}
          <M>{`${nevezo} = \\left(x${tag(-alfa)}\\right)\\left(x${tag(-beta)}\\right)`}</M>. Szorozz be a nevezővel,
          majd helyettesítsd be a gyököket egyenként — a <strong>letakarásos módszer</strong> egy lépésben megadja
          mindkét együtthatót.
        </p>
      ),
      mezok: [
        { id: "A", cimke: `A (az x${tag(-alfa)} nevezőhöz)`, helyes: A, tizedes: 3, tures: 0.01 },
        { id: "B", cimke: `B (az x${tag(-beta)} nevezőhöz)`, helyes: B, tizedes: 3, tures: 0.01 },
      ],
      megoldas: (
        <>
          <MB>{`${egyutt(a, "x")}${tag(b)} = A\\left(x${tag(-beta)}\\right)+B\\left(x${tag(-alfa)}\\right)`}</MB>
          <MB>{`x = ${alfa}: \\quad ${a * alfa + b} = A\\left(${alfa - beta}\\right) \\;\\Rightarrow\\; A = ${szK(
            A,
            3,
          )}`}</MB>
          <MB>{`x = ${beta}: \\quad ${a * beta + b} = B\\left(${beta - alfa}\\right) \\;\\Rightarrow\\; B = ${szK(
            B,
            3,
          )}`}</MB>
          <p>Az integrál ezek után két logaritmus:</p>
          <MB>{`\\int = ${szK(A, 3)}\\ln\\left|x${tag(-alfa)}\\right| ${
            B >= 0 ? "+" : "-"
          } ${szK(Math.abs(B), 3)}\\ln\\left|x${tag(-beta)}\\right|+C`}</MB>
        </>
      ),
    };
  }
  return tortFeladat();
}

export const GENERATOROK = [
  { cim: "Alapintegrál — lineáris belső függvény", fn: alapFeladat },
  { cim: "Logaritmusos minta (f′/f)", fn: logFeladat },
  { cim: "Hatványminta (fⁿ·f′)", fn: hatvanyMintaFeladat },
  { cim: "Parciális integrálás", fn: parcialisFeladat },
  { cim: "Parciális törtek: A és B", fn: tortFeladat },
];

export default function GyakorloSzekcio() {
  return (
    <div>
      <GyakorloDoboz
        cim="Alapintegrál — lineáris belső függvény"
        leiras="Az 1/a szorzó a láncszabály kiegyenlítése. A szinusznál a primitív függvény −cos, tehát ott a mínusz is a szorzóba kerül."
        generator={alapFeladat}
      />
      <GyakorloDoboz
        cim="Logaritmusos minta (f′/f)"
        leiras="Ha a számláló a nevező deriváltjának konstansszorosa, az eredmény logaritmus. A konstanst a linearitással igazítjuk."
        generator={logFeladat}
      />
      <GyakorloDoboz
        cim="Hatványminta (fⁿ·f′)"
        leiras="A kitevő eggyel nő, és osztunk az új kitevővel — a belső derivált pedig ott kell álljon a szorzatban."
        generator={hatvanyMintaFeladat}
      />
      <GyakorloDoboz
        cim="Parciális integrálás"
        leiras="Polinom mellett mindig a polinomot deriváljuk. A második tag előjelére külön figyelj!"
        generator={parcialisFeladat}
      />
      <GyakorloDoboz
        cim="Parciális törtek: A és B"
        leiras="Két egyszeres valós gyök: a letakarásos módszerrel másodpercek alatt megvannak az együtthatók."
        generator={tortFeladat}
      />
    </div>
  );
}
