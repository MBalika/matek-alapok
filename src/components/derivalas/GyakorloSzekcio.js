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

/** Polinom LaTeX-alakja a legmagasabb fokú tagtól: [1, 0, -3, 2] → x^{3}-3x+2 */
function polinom(egyutthatok, valtozo = "x") {
  const k = egyutthatok.length - 1;
  let s = "";
  egyutthatok.forEach((c, i) => {
    const fok = k - i;
    if (c === 0) return;
    const jel = c > 0 ? (s === "" ? "" : "+") : "-";
    const abs = Math.abs(c);
    const szam = abs === 1 && fok > 0 ? "" : String(abs);
    const v = fok === 0 ? "" : fok === 1 ? valtozo : `${valtozo}^{${fok}}`;
    s += `${jel}${szam}${v}`;
  });
  return s === "" ? "0" : s;
}

/** Előjeles tag kiírása: „+3x”, „−x”. */
const tag = (c, kif) => {
  if (c === 0) return "";
  const jel = c > 0 ? "+" : "-";
  const abs = Math.abs(c);
  return `${jel}${abs === 1 && kif ? "" : abs}${kif}`;
};

/** Együttható a képlet elején (1 és −1 esetén elhagyjuk a számot). */
const elso = (c, kif) => (c === 1 ? kif : c === -1 ? `-${kif}` : `${c}${kif}`);

const kiertekel = (egy, x) => egy.reduce((s, c, i) => s + c * Math.pow(x, egy.length - 1 - i), 0);

/* ================= 1. Deriválás a szabályokkal ================= */

function szabalyFeladat() {
  const tipus = Math.random() < 0.5 ? "szorzat" : "hanyados";

  if (tipus === "szorzat") {
    // f(x) = (px + q) e^{ax}
    const p = nemNulla(-3, 3);
    const q = egesz(-4, 4);
    const a = valaszt([1, 2, 3, -1, -2]);
    const x0 = valaszt([-1, -0.5, 0, 0.5, 1]);
    // f'(x) = e^{ax}( a p x + (p + a q) )
    const A = a * p;
    const B = p + a * q;
    const fv = Math.exp(a * x0) * (A * x0 + B);
    const fLatex = `\\left(${polinom([p, q])}\\right)e^{${elso(a, "x")}}`;

    return {
      szoveg: (
        <p>
          Deriváld a szorzatszabállyal (a második tényezőnél láncszabállyal!), és add meg a derivált értékét az{" "}
          <M>{`x_0 = ${szK(x0, 1)}`}</M> helyen 3 tizedesre. Add meg azt is, mennyi az <M>{"x"}</M> együtthatója a{" "}
          <M>{`e^{${elso(a, "x")}}`}</M> mellé kiemelt zárójelben.
          <MB>{`f(x) = ${fLatex}`}</MB>
        </p>
      ),
      sugo: (
        <p>
          <M>{"(fg)' = f'g + fg'"}</M>. Itt <M>{`f = ${polinom([p, q])}`}</M> (deriváltja <M>{`${p}`}</M>), és{" "}
          <M>{`g = e^{${elso(a, "x")}}`}</M> (deriváltja <M>{`${elso(a, "")}e^{${elso(a, "x")}}`}</M> — a láncszabály
          miatt jön be az <M>{`${a}`}</M>). A végén emeld ki az exponenciálist.
        </p>
      ),
      mezok: [
        { id: "d", cimke: "f ′(x₀)", helyes: fv, tizedes: 3 },
        { id: "A", cimke: "x együtthatója a zárójelben", helyes: A, tizedes: 0, tures: 0.01 },
      ],
      megoldas: (
        <>
          <MB>{`f'(x) = ${p}\\cdot e^{${elso(a, "x")}} + \\left(${polinom([p, q])}\\right)\\cdot ${elso(
            a,
            "",
          )}e^{${elso(a, "x")}}`}</MB>
          <p>Kiemelve az exponenciálist:</p>
          <MB>{`f'(x) = e^{${elso(a, "x")}}\\left(${polinom([A, B])}\\right)`}</MB>
          <MB>{`f'(${szK(x0, 1)}) = e^{${szK(a * x0, 2)}}\\cdot\\left(${szK(A * x0 + B, 3)}\\right) = ${szK(
            fv,
            4,
          )}`}</MB>
        </>
      ),
    };
  }

  // f(x) = (ax + b)/(x² + c)
  const a = nemNulla(-4, 4);
  const b = egesz(-5, 5);
  const c = egesz(1, 6);
  const x0 = valaszt([-2, -1, 0, 1, 2]);
  // f'(x) = (-a x² - 2b x + a c) / (x² + c)²
  const szamlalo = [-a, -2 * b, a * c];
  const fv = kiertekel(szamlalo, x0) / Math.pow(x0 * x0 + c, 2);

  return {
    szoveg: (
      <p>
        Deriváld a hányadosszabállyal, és add meg a derivált értékét az <M>{`x_0 = ${x0}`}</M> helyen 3 tizedesre. Add
        meg azt is, mennyi a rendezett <strong>számláló</strong> <M>{"x^2"}</M>-es együtthatója.
        <MB>{`f(x) = \\frac{${polinom([a, b])}}{${polinom([1, 0, c])}}`}</MB>
      </p>
    ),
    sugo: (
      <p>
        <M>{"\\left(\\frac fg\\right)' = \\frac{f'g - fg'}{g^2}"}</M> — a számlálóban a{" "}
        <strong>sorrend számít</strong>. Itt <M>{`f' = ${a}`}</M> és <M>{"g' = 2x"}</M>. A nevező a nevező{" "}
        <em>négyzete</em>, azt nem kell kibontani.
      </p>
    ),
    mezok: [
      { id: "d", cimke: "f ′(x₀)", helyes: fv, tizedes: 3 },
      { id: "A", cimke: "x² együtthatója a számlálóban", helyes: -a, tizedes: 0, tures: 0.01 },
    ],
    megoldas: (
      <>
        <MB>{`f'(x) = \\frac{${a}\\left(${polinom([1, 0, c])}\\right) - \\left(${polinom(
          [a, b],
        )}\\right)\\cdot 2x}{\\left(${polinom([1, 0, c])}\\right)^2} = \\frac{${polinom(
          szamlalo,
        )}}{\\left(${polinom([1, 0, c])}\\right)^2}`}</MB>
        <MB>{`f'(${x0}) = \\frac{${szK(kiertekel(szamlalo, x0), 0)}}{${szK(
          Math.pow(x0 * x0 + c, 2),
          0,
        )}} = ${szK(fv, 4)}`}</MB>
        <p>
          A számláló <M>{"x^2"}</M>-es együtthatója <M>{`${-a}`}</M>: ez mindig a nevező deriválásából jövő{" "}
          <M>{"-2x\\cdot ax"}</M> és a <M>{"a\\cdot x^2"}</M> összege.
        </p>
      </>
    ),
  };
}

/* ================= 2. Érintő egyenlete ================= */

function erintoFeladat() {
  if (Math.random() < 0.6) {
    // harmadfokú polinom
    const a = valaszt([1, -1, 2, -2]);
    const b = egesz(-3, 3);
    const c = egesz(-5, 5);
    const d = egesz(-5, 5);
    const x0 = valaszt([-2, -1, 1, 2]);
    const fx = kiertekel([a, b, c, d], x0);
    const m = 3 * a * x0 * x0 + 2 * b * x0 + c;
    const t = fx - m * x0;

    return {
      szoveg: (
        <p>
          Írd fel az érintő egyenletét az <M>{`x_0 = ${x0}`}</M> helyen, <M>{"y = mx + t"}</M> alakban! Add meg{" "}
          <M>{"m"}</M> és <M>{"t"}</M> értékét.
          <MB>{`f(x) = ${polinom([a, b, c, d])}`}</MB>
        </p>
      ),
      sugo: (
        <p>
          <M>{"y = f'(x_0)(x-x_0)+f(x_0)"}</M>. Előbb számold ki <M>{`f(${x0})`}</M>-t és{" "}
          <M>{`f'(${x0})`}</M>-t <strong>számként</strong>, csak utána helyettesíts be — a leggyakoribb hiba, hogy a
          meredekség helyére a derivált <em>függvény</em> kerül.
        </p>
      ),
      mezok: [
        { id: "m", cimke: "m (meredekség)", helyes: m, tizedes: 0, tures: 0.01 },
        { id: "t", cimke: "t (y-tengelymetszet)", helyes: t, tizedes: 0, tures: 0.01 },
      ],
      megoldas: (
        <>
          <MB>{`f'(x) = ${polinom([3 * a, 2 * b, c])}`}</MB>
          <MB>{`f(${x0}) = ${fx}, \\qquad m = f'(${x0}) = ${m}`}</MB>
          <MB>{`y = ${m}\\left(x ${x0 >= 0 ? "-" : "+"} ${Math.abs(x0)}\\right) ${tag(fx, "") || "+0"} = ${polinom(
            [m, t],
          )}`}</MB>
        </>
      ),
    };
  }

  // a·ln x típus
  const a = valaszt([1, 2, 3, -1, -2]);
  const b = egesz(-3, 3);
  const x0 = valaszt([1, 2, 3, 4]);
  const m = a / x0;
  const fx = a * Math.log(x0) + b;
  const t = fx - m * x0;

  return {
    szoveg: (
      <p>
        Írd fel az érintő egyenletét az <M>{`x_0 = ${x0}`}</M> helyen, <M>{"y = mx + t"}</M> alakban! Mindkét számot 4
        tizedesre add meg.
        <MB>{`f(x) = ${elso(a, "\\ln x")}${tag(b, "")}`}</MB>
      </p>
    ),
    sugo: (
      <p>
        <M>{"(\\ln x)' = \\frac1x"}</M>, tehát <M>{`f'(x) = \\frac{${a}}{x}`}</M>. Az additív konstans deriváltja
        nulla, de a <strong>függvényértékbe</strong> beleszámít!
      </p>
    ),
    mezok: [
      { id: "m", cimke: "m (meredekség)", helyes: m, tizedes: 4, tures: 0.002 },
      { id: "t", cimke: "t (y-tengelymetszet)", helyes: t, tizedes: 4, tures: 0.002 },
    ],
    megoldas: (
      <>
        <MB>{`f'(x) = \\frac{${a}}{x} \\ \\Longrightarrow\\ m = f'(${x0}) = \\frac{${a}}{${x0}} = ${szK(m, 4)}`}</MB>
        <MB>{`f(${x0}) = ${a}\\ln ${x0} ${tag(b, "")} = ${szK(fx, 4)}`}</MB>
        <MB>{`t = f(x_0) - m x_0 = ${szK(fx, 4)} - ${szK(m, 4)}\\cdot ${x0} = ${szK(t, 4)}`}</MB>
      </>
    ),
  };
}

/* ================= 3. L'Hospital-szabály ================= */

function lhospitalFeladat() {
  const tipusok = ["sin", "exp", "cos", "ln", "tg"];
  const tipus = valaszt(tipusok);
  const a = egesz(1, 5);
  const b = egesz(1, 5);
  const n = egesz(2, 4);

  if (tipus === "sin" || tipus === "tg") {
    const fv = tipus === "sin" ? "\\sin" : "\\operatorname{tg}";
    const A = a / b;
    return {
      szoveg: (
        <p>
          Számítsd ki a határértéket 3 tizedesre, és add meg, hányszor kell alkalmazni a L&apos;Hospital-szabályt.
          <MB>{`\\lim_{x\\to0}\\frac{${fv}\\left(${elso(a, "x")}\\right)}{${elso(b, "x")}}`}</MB>
        </p>
      ),
      sugo: (
        <p>
          Behelyettesítve <M>{"\\frac00"}</M> adódik, tehát szabad deriválni — <strong>külön a számlálót és külön a
          nevezőt</strong>. A belső derivált a láncszabályból jön.
        </p>
      ),
      mezok: [
        { id: "A", cimke: "A határérték", helyes: A, tizedes: 3 },
        { id: "k", cimke: "Hányszor deriváltál?", helyes: 1, tizedes: 0, tures: 0.01 },
      ],
      megoldas: (
        <>
          <MB>{`\\lim_{x\\to0}\\frac{${fv}(${elso(a, "x")})}{${elso(b, "x")}} = \\lim_{x\\to0}\\frac{${a}${
            tipus === "sin" ? `\\cos(${elso(a, "x")})` : `\\frac{1}{\\cos^2(${elso(a, "x")})}`
          }}{${b}} = \\frac{${a}}{${b}} = ${szK(A, 4)}`}</MB>
          <p>
            Egyetlen alkalmazás elég: a második behelyettesítés már értelmes számot ad. A{" "}
            <M>{`${a}`}</M> szorzó a belső függvény deriváltja.
          </p>
        </>
      ),
    };
  }

  if (tipus === "exp") {
    const A = a / b;
    return {
      szoveg: (
        <p>
          Számítsd ki a határértéket 3 tizedesre, és add meg, hányszor kell alkalmazni a L&apos;Hospital-szabályt.
          <MB>{`\\lim_{x\\to0}\\frac{e^{${elso(a, "x")}}-1}{\\sin\\left(${elso(b, "x")}\\right)}`}</MB>
        </p>
      ),
      sugo: (
        <p>
          <M>{"e^0 - 1 = 0"}</M> és <M>{"\\sin 0 = 0"}</M>, tehát <M>{"\\frac00"}</M>. A számláló deriváltja{" "}
          <M>{`${a}e^{${elso(a, "x")}}`}</M>, a nevezőé <M>{`${b}\\cos(${elso(b, "x")})`}</M>.
        </p>
      ),
      mezok: [
        { id: "A", cimke: "A határérték", helyes: A, tizedes: 3 },
        { id: "k", cimke: "Hányszor deriváltál?", helyes: 1, tizedes: 0, tures: 0.01 },
      ],
      megoldas: (
        <MB>{`\\lim_{x\\to0}\\frac{e^{${elso(a, "x")}}-1}{\\sin(${elso(b, "x")})} = \\lim_{x\\to0}\\frac{${a}e^{${elso(
          a,
          "x",
        )}}}{${b}\\cos(${elso(b, "x")})} = \\frac{${a}}{${b}} = ${szK(A, 4)}`}</MB>
      ),
    };
  }

  if (tipus === "cos") {
    const A = (a * a) / (2 * b);
    return {
      szoveg: (
        <p>
          Számítsd ki a határértéket 3 tizedesre, és add meg, hányszor kell alkalmazni a L&apos;Hospital-szabályt.
          <MB>{`\\lim_{x\\to0}\\frac{1-\\cos\\left(${elso(a, "x")}\\right)}{${elso(b, "x^2")}}`}</MB>
        </p>
      ),
      sugo: (
        <p>
          Egyszeri deriválás után <M>{"\\frac{\\sin(\\dots)}{\\dots x}"}</M> marad, ami <strong>még mindig</strong>{" "}
          <M>{"\\frac00"}</M> — tehát alkalmazd újra. Mindig helyettesíts be, mielőtt újra deriválsz!
        </p>
      ),
      mezok: [
        { id: "A", cimke: "A határérték", helyes: A, tizedes: 3 },
        { id: "k", cimke: "Hányszor deriváltál?", helyes: 2, tizedes: 0, tures: 0.01 },
      ],
      megoldas: (
        <>
          <MB>{`\\lim_{x\\to0}\\frac{1-\\cos(${elso(a, "x")})}{${elso(b, "x^2")}} = \\lim_{x\\to0}\\frac{${a}\\sin(${elso(
            a,
            "x",
          )})}{${2 * b}x}`}</MB>
          <p>
            Ez még mindig <M>{"\\frac00"}</M>, tehát újra:
          </p>
          <MB>{`= \\lim_{x\\to0}\\frac{${a * a}\\cos(${elso(a, "x")})}{${2 * b}} = \\frac{${a * a}}{${
            2 * b
          }} = ${szK(A, 4)}`}</MB>
        </>
      ),
    };
  }

  // ln x / (x^n − 1), x → 1
  const A = 1 / n;
  return {
    szoveg: (
      <p>
        Számítsd ki a határértéket 3 tizedesre, és add meg, hányszor kell alkalmazni a L&apos;Hospital-szabályt.
        <MB>{`\\lim_{x\\to1}\\frac{\\ln x}{x^{${n}}-1}`}</MB>
      </p>
    ),
    sugo: (
      <p>
        <M>{"\\ln 1 = 0"}</M> és <M>{`1^{${n}}-1 = 0`}</M>: <M>{"\\frac00"}</M> alak. A számláló deriváltja{" "}
        <M>{"\\frac1x"}</M>, a nevezőé <M>{`${n}x^{${n - 1}}`}</M>.
      </p>
    ),
    mezok: [
      { id: "A", cimke: "A határérték", helyes: A, tizedes: 3 },
      { id: "k", cimke: "Hányszor deriváltál?", helyes: 1, tizedes: 0, tures: 0.01 },
    ],
    megoldas: (
      <MB>{`\\lim_{x\\to1}\\frac{\\ln x}{x^{${n}}-1} = \\lim_{x\\to1}\\frac{\\frac1x}{${n}x^{${
        n - 1
      }}} = \\frac{1}{${n}} = ${szK(A, 4)}`}</MB>
    ),
  };
}

/* ================= 4. Lokális szélsőérték ================= */

function szelsoertekFeladat() {
  const s = egesz(-2, 2);
  const k = egesz(1, 3);
  const m = egesz(-6, 6);
  // f(x) = (x-s)³ - 3k²(x-s) + m
  const B = -3 * s;
  const C = 3 * s * s - 3 * k * k;
  const D = -s * s * s + 3 * k * k * s + m;
  const maxHely = s - k;
  const minHely = s + k;
  const maxErtek = 2 * k * k * k + m;

  return {
    szoveg: (
      <p>
        Keresd meg a függvény lokális szélsőértékhelyeit, és add meg a <strong>maximum értékét</strong> is!
        <MB>{`f(x) = ${polinom([1, B, C, D])}`}</MB>
      </p>
    ),
    sugo: (
      <p>
        <M>{`f'(x) = ${polinom([3, 2 * B, C])}`}</M>. Oldd meg az <M>{"f'(x)=0"}</M> másodfokú egyenletet, majd{" "}
        <strong>döntsd is el</strong>, melyik hol van: <M>{`f''(x) = ${polinom([6, 2 * B])}`}</M>, és ahol{" "}
        <M>{"f''<0"}</M>, ott maximum. Harmadfokú, pozitív főegyütthatóval: a kisebbik hely a maximum.
      </p>
    ),
    mezok: [
      { id: "xmax", cimke: "A maximum helye (x)", helyes: maxHely, tizedes: 0, tures: 0.01 },
      { id: "xmin", cimke: "A minimum helye (x)", helyes: minHely, tizedes: 0, tures: 0.01 },
      { id: "ymax", cimke: "A maximum értéke", helyes: maxErtek, tizedes: 0, tures: 0.01 },
    ],
    megoldas: (
      <>
        <MB>{`f'(x) = ${polinom([3, 2 * B, C])} = 3\\left(x ${maxHely >= 0 ? "-" : "+"} ${Math.abs(
          maxHely,
        )}\\right)\\left(x ${minHely >= 0 ? "-" : "+"} ${Math.abs(minHely)}\\right)`}</MB>
        <p>
          Zérushelyek: <M>{`x_1 = ${maxHely}`}</M> és <M>{`x_2 = ${minHely}`}</M>. A második derivált{" "}
          <M>{`f''(x) = ${polinom([6, 2 * B])}`}</M>:
        </p>
        <MB>{`f''(${maxHely}) = ${6 * maxHely + 2 * B} < 0 \\ \\Rightarrow\\ \\text{maximum}, \\qquad f''(${minHely}) = ${
          6 * minHely + 2 * B
        } > 0 \\ \\Rightarrow\\ \\text{minimum}`}</MB>
        <MB>{`f(${maxHely}) = ${maxErtek}, \\qquad f(${minHely}) = ${-2 * k * k * k + m}`}</MB>
        <p>
          A két szélsőérték különbsége mindig <M>{`4k^3 = ${4 * k * k * k}`}</M> — ez a „púp” magassága.
        </p>
      </>
    ),
  };
}

/* ================= 5. Implicit deriválás ================= */

function implicitFeladat() {
  let a;
  let b;
  let x0;
  let y0;
  let nevezo;
  do {
    a = nemNulla(-3, 3);
    b = nemNulla(-3, 3);
    x0 = nemNulla(-3, 3);
    y0 = nemNulla(-3, 3);
    nevezo = a * x0 + 2 * b * y0;
  } while (nevezo === 0);
  const c = x0 * x0 + a * x0 * y0 + b * y0 * y0;
  const szamlalo = -(2 * x0 + a * y0);
  const yv = szamlalo / nevezo;

  return {
    szoveg: (
      <p>
        Mennyi <M>{"y'"}</M> az alábbi görbe <M>{`(${x0};\\, ${y0})`}</M> pontjában? Add meg 3 tizedesre, és add meg
        az <M>{"y'"}</M> együtthatóját (a <M>{`${polinom([a], "x")} + ${2 * b}y`}</M> kifejezés értékét) is.
        <MB>{`x^2 ${tag(a, "xy")} ${tag(b, "y^2")} = ${c}`}</MB>
      </p>
    ),
    sugo: (
      <p>
        Deriváld <strong>mindkét oldalt</strong> x szerint, és tekintsd <M>{"y"}</M>-t x függvényének:{" "}
        <M>{"(y^2)' = 2yy'"}</M>, <M>{"(xy)' = y + xy'"}</M>. Utána rendezd <M>{"y'"}</M>-re. Ellenőrizd először, hogy
        a pont rajta van-e a görbén!
      </p>
    ),
    mezok: [
      { id: "y", cimke: "y ′ a pontban", helyes: yv, tizedes: 3 },
      { id: "n", cimke: "y ′ együtthatója", helyes: nevezo, tizedes: 0, tures: 0.01 },
    ],
    megoldas: (
      <>
        <p>
          Ellenőrzés: <M>{`${x0 * x0} ${tag(a * x0 * y0, "")} ${tag(b * y0 * y0, "")} = ${c}`}</M> ✓
        </p>
        <MB>{`2x ${tag(a, "")}\\left(y + xy'\\right) ${tag(2 * b, "yy'")} = 0`}</MB>
        <MB>{`y'\\left(${polinom([a], "x")} ${tag(2 * b, "y")}\\right) = -\\left(2x ${tag(a, "y")}\\right)`}</MB>
        <MB>{`y' = -\\frac{2x ${tag(a, "y")}}{${polinom([a], "x")} ${tag(2 * b, "y")}} = -\\frac{${
          2 * x0 + a * y0
        }}{${nevezo}} = ${szK(yv, 4)}`}</MB>
      </>
    ),
  };
}

export const GENERATOROK = [
  { cim: "Deriválás a szabályokkal", fn: szabalyFeladat },
  { cim: "Érintő egyenlete", fn: erintoFeladat },
  { cim: "L'Hospital-szabály", fn: lhospitalFeladat },
  { cim: "Lokális szélsőérték", fn: szelsoertekFeladat },
  { cim: "Implicit deriválás", fn: implicitFeladat },
];

export default function GyakorloSzekcio() {
  return (
    <div>
      <GyakorloDoboz
        cim="Deriválás a szabályokkal"
        leiras="Szorzat- és hányadosszabály, láncszabállyal kombinálva. A sorrend a hányadosnál nem mindegy!"
        generator={szabalyFeladat}
      />
      <GyakorloDoboz
        cim="Érintő egyenlete"
        leiras="A meredekség az f ′(x₀) szám, nem a derivált függvény. Az f(x₀) tag sem maradhat le."
        generator={erintoFeladat}
      />
      <GyakorloDoboz
        cim="L'Hospital-szabály"
        leiras="Először mindig helyettesíts be: csak határozatlan alakra szabad deriválni. Számláló és nevező külön!"
        generator={lhospitalFeladat}
      />
      <GyakorloDoboz
        cim="Lokális szélsőérték"
        leiras="f ′ = 0 csak szükséges feltétel — a típust a második derivált vagy az előjelváltás dönti el."
        generator={szelsoertekFeladat}
        oszlopok={3}
      />
      <GyakorloDoboz
        cim="Implicit deriválás"
        leiras="y-t x függvényének tekintjük, így minden y-os tagnál megjelenik egy y ′ szorzó a láncszabályból."
        generator={implicitFeladat}
      />
    </div>
  );
}
