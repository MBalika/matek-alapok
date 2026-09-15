"use client";

import GyakorloDoboz from "@/components/GyakorloDoboz";
import { M, MB } from "@/components/ui/Keplet";
import { szK } from "@/lib/szamok";

/* ---------- segédek ---------- */

const egesz = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
const valaszt = (t) => t[Math.floor(Math.random() * t.length)];
const nemNulla = (min, max) => {
  let v = 0;
  while (v === 0) v = egesz(min, max);
  return v;
};

/** Polinom LaTeX-alakja a legmagasabb fokú tagtól: [1, 0, -3, 2] → x^{3}-3x+2 */
function polinom(egy, valtozo = "x") {
  const k = egy.length - 1;
  let s = "";
  egy.forEach((c, i) => {
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

const kiertekel = (egy, x) => egy.reduce((s, c, i) => s + c * Math.pow(x, egy.length - 1 - i), 0);

/** A primitív függvény LaTeX-alakja törtekkel: [2,0,-3] → \\frac{2}{3}x^{3}-3x */
function primitivLatex(egy) {
  const k = egy.length - 1;
  let s = "";
  egy.forEach((c, i) => {
    const fok = k - i + 1;
    if (c === 0) return;
    const jel = c > 0 ? (s === "" ? "" : "+") : "-";
    const abs = Math.abs(c);
    const lnko = (p, q) => (q ? lnko(q, p % q) : p);
    const o = lnko(abs, fok);
    const egesztort = abs % fok === 0 ? String(abs / fok) : `\\frac{${abs / o}}{${fok / o}}`;
    const szam = abs % fok === 0 && abs / fok === 1 ? "" : egesztort;
    s += `${jel}${szam}x${fok === 1 ? "" : `^{${fok}}`}`;
  });
  return s === "" ? "0" : s;
}

/** Együttható a képlet elején (1 és −1 esetén elhagyjuk a számot). */
const elso = (c, kif) => (c === 1 ? kif : c === -1 ? `-${kif}` : `${c}${kif}`);

/* ================= 1. Newton–Leibniz ================= */

function newtonLeibnizFeladat() {
  const tipus = valaszt(["polinom", "polinom", "exp", "reciprok", "gyok", "trig"]);

  if (tipus === "polinom") {
    const a3 = valaszt([0, 1, 2, -1]);
    const a2 = nemNulla(-3, 3);
    const a1 = egesz(-4, 4);
    const a0 = egesz(-3, 3);
    const egy = a3 ? [a3, a2, a1, a0] : [a2, a1, a0];
    const p = egesz(-2, 0);
    const q = egesz(1, 3);
    // primitív függvény együtthatói (C = 0)
    const prim = [...egy.map((c, i) => c / (egy.length - i)), 0];
    const Fb = kiertekel(prim, q);
    const Fa = kiertekel(prim, p);
    return {
      szoveg: (
        <p>
          Számítsd ki a határozott integrált a Newton–Leibniz-tétellel! Add meg a <M>{"C=0"}</M> konstanssal vett{" "}
          <M>{"F(x)"}</M> primitív függvény értékét a <strong>felső</strong> határon, és az integrál értékét — mindkettőt 3
          tizedesre.
          <MB>{`\\int_{${p}}^{${q}}\\left(${polinom(egy)}\\right)dx`}</MB>
        </p>
      ),
      sugo: (
        <p>
          Tagonként integrálj: <M>{"\\int x^n dx = \\frac{x^{n+1}}{n+1}"}</M>. A primitív függvény{" "}
          <M>{`F(x)=${primitivLatex(egy)}`}</M>, és az eredmény <M>{"F(b)-F(a)"}</M> — <strong>felső mínusz alsó</strong>.
        </p>
      ),
      mezok: [
        { id: "Fb", cimke: "F(b), a felső határon", helyes: Fb, tizedes: 3 },
        { id: "I", cimke: "az integrál értéke", helyes: Fb - Fa, tizedes: 3 },
      ],
      megoldas: (
        <>
          <MB>{`F(x)=${primitivLatex(egy)}`}</MB>
          <MB>{`F(${q}) = ${szK(Fb, 4)},\\qquad F(${p}) = ${szK(Fa, 4)}`}</MB>
          <MB>{`\\int_{${p}}^{${q}} = ${szK(Fb, 4)} - \\left(${szK(Fa, 4)}\\right) = ${szK(Fb - Fa, 4)}`}</MB>
        </>
      ),
    };
  }

  if (tipus === "exp") {
    const A = valaszt([1, 2, 3]);
    const k = valaszt([1, 2, -1, -2]);
    const b = egesz(1, 2);
    const F = (x) => (A / k) * Math.exp(k * x);
    return {
      szoveg: (
        <p>
          Számítsd ki 3 tizedesre! (Az exponenciális primitív függvényénél a belső együtthatóval <em>osztunk</em>.)
          <MB>{`\\int_{0}^{${b}} ${A === 1 ? "" : A}e^{${elso(k, "x")}}\\,dx`}</MB>
        </p>
      ),
      sugo: (
        <p>
          <M>{"\\int e^{kx}dx = \\frac{e^{kx}}{k}"}</M>, tehát <M>{`F(x)=\\frac{${A}}{${k}}e^{${elso(k, "x")}}`}</M>.
          Ne feledd az alsó határt: <M>{"e^0=1"}</M>.
        </p>
      ),
      mezok: [
        { id: "Fb", cimke: "F(b), a felső határon", helyes: F(b), tizedes: 3 },
        { id: "I", cimke: "az integrál értéke", helyes: F(b) - F(0), tizedes: 3 },
      ],
      megoldas: (
        <>
          <MB>{`F(x)=\\frac{${A}}{${k}}e^{${elso(k, "x")}}`}</MB>
          <MB>{`\\int_0^{${b}} = \\frac{${A}}{${k}}\\left(e^{${szK(k * b, 0)}}-1\\right) = ${szK(
            F(b) - F(0),
            4,
          )}`}</MB>
        </>
      ),
    };
  }

  if (tipus === "reciprok") {
    const c = egesz(1, 5);
    const a = valaszt([1, 2]);
    const b = valaszt([4, 6, 8]);
    const F = (x) => c * Math.log(x);
    return {
      szoveg: (
        <p>
          Számítsd ki 3 tizedesre!
          <MB>{`\\int_{${a}}^{${b}} \\frac{${c}}{x}\\,dx`}</MB>
        </p>
      ),
      sugo: (
        <p>
          <M>{"\\int\\frac{dx}{x} = \\ln|x|"}</M>, tehát <M>{`F(x)=${c}\\ln x`}</M>. A különbség logaritmusa a
          hányados logaritmusa: <M>{`${c}\\ln\\frac{${b}}{${a}}`}</M>.
        </p>
      ),
      mezok: [
        { id: "Fb", cimke: "F(b), a felső határon", helyes: F(b), tizedes: 3 },
        { id: "I", cimke: "az integrál értéke", helyes: F(b) - F(a), tizedes: 3 },
      ],
      megoldas: (
        <>
          <MB>{`\\int_{${a}}^{${b}}\\frac{${c}}{x}dx = ${c}\\left[\\ln x\\right]_{${a}}^{${b}} = ${c}\\ln\\frac{${b}}{${a}} = ${szK(
            F(b) - F(a),
            4,
          )}`}</MB>
        </>
      ),
    };
  }

  if (tipus === "gyok") {
    const c = valaszt([1, 2, 3]);
    const b = valaszt([4, 9]);
    const F = (x) => ((2 * c) / 3) * Math.pow(x, 1.5);
    return {
      szoveg: (
        <p>
          Számítsd ki 3 tizedesre! (Írd át hatványalakra: <M>{"\\sqrt x = x^{1/2}"}</M>.)
          <MB>{`\\int_{0}^{${b}} ${c === 1 ? "" : c}\\sqrt{x}\\,dx`}</MB>
        </p>
      ),
      sugo: (
        <p>
          <M>{"\\int x^{1/2}dx = \\frac{x^{3/2}}{3/2} = \\frac23 x^{3/2}"}</M>, tehát{" "}
          <M>{`F(x)=\\frac{2\\cdot${c}}{3}x^{3/2}`}</M>. A <M>{`${b}^{3/2}`}</M> értéke{" "}
          <M>{`${Math.pow(b, 1.5)}`}</M>.
        </p>
      ),
      mezok: [
        { id: "Fb", cimke: "F(b), a felső határon", helyes: F(b), tizedes: 3 },
        { id: "I", cimke: "az integrál értéke", helyes: F(b) - F(0), tizedes: 3 },
      ],
      megoldas: (
        <>
          <MB>{`\\int_0^{${b}}${c === 1 ? "" : c}\\sqrt x\\,dx = \\left[\\frac{2\\cdot${c}}{3}x^{3/2}\\right]_0^{${b}} = \\frac{${
            2 * c
          }}{3}\\cdot ${Math.pow(b, 1.5)} = ${szK(F(b), 4)}`}</MB>
        </>
      ),
    };
  }

  // trig: ∫_0^{π/k} A·sin(kx) dx  vagy  A·cos(kx)
  const A = valaszt([1, 2, 3]);
  const k = valaszt([1, 2]);
  const szinusz = Math.random() < 0.5;
  const felso = valaszt([Math.PI / 2, Math.PI]);
  const felsoLatex = felso === Math.PI ? "\\pi" : "\\frac{\\pi}{2}";
  const F = szinusz ? (x) => (-A / k) * Math.cos(k * x) : (x) => (A / k) * Math.sin(k * x);
  return {
    szoveg: (
      <p>
        Számítsd ki 3 tizedesre! (A belső <M>{`${k}`}</M>-es szorzó miatt a primitív függvényben{" "}
        <em>osztani</em> kell vele.)
        <MB>{`\\int_{0}^{${felsoLatex}} ${A === 1 ? "" : A}\\${szinusz ? "sin" : "cos"}\\left(${elso(
          k,
          "x",
        )}\\right)dx`}</MB>
      </p>
    ),
    sugo: (
      <p>
        <M>{"\\int\\sin(kx)dx = -\\frac{\\cos(kx)}{k}"}</M> és <M>{"\\int\\cos(kx)dx = \\frac{\\sin(kx)}{k}"}</M>.
        Radiánban számolj!
      </p>
    ),
    mezok: [
      { id: "Fb", cimke: "F(b), a felső határon", helyes: F(felso), tizedes: 3 },
      { id: "I", cimke: "az integrál értéke", helyes: F(felso) - F(0), tizedes: 3 },
    ],
    megoldas: (
      <>
        <MB>{`F(x) = ${szinusz ? `-\\frac{${A}}{${k}}\\cos` : `\\frac{${A}}{${k}}\\sin`}\\left(${elso(
          k,
          "x",
        )}\\right)`}</MB>
        <MB>{`\\int = ${szK(F(felso), 4)} - \\left(${szK(F(0), 4)}\\right) = ${szK(F(felso) - F(0), 4)}`}</MB>
      </>
    ),
  };
}

/* ================= 2. Helyettesítés a határok átírásával ================= */

const GYOKPAROK = [
  [3, 16, 25],
  [4, 9, 25],
  [6, 64, 100],
  [12, 25, 169],
  [8, 36, 100],
  [5, 144, 169],
];

function helyettesitesFeladat() {
  if (Math.random() < 0.6) {
    const [b, c, veg] = valaszt(GYOKPAROK);
    const ertek = Math.sqrt(veg) - Math.sqrt(c);
    return {
      szoveg: (
        <p>
          Helyettesítéssel számold ki! Vezesd be az <M>{`u = x^2+${c}`}</M> változót, és{" "}
          <strong>írd át a határokat is</strong>. Add meg az új alsó és felső határt, valamint az integrál értékét (3
          tizedesre).
          <MB>{`\\int_{0}^{${b}} \\frac{x}{\\sqrt{x^2+${c}}}\\,dx`}</MB>
        </p>
      ),
      sugo: (
        <p>
          <M>{`u=x^2+${c}`}</M> esetén <M>{"du = 2x\\,dx"}</M>, tehát <M>{"x\\,dx = \\frac{du}{2}"}</M>. Az új
          határok: <M>{`x=0 \\Rightarrow u=${c}`}</M> és <M>{`x=${b} \\Rightarrow u=${veg}`}</M>. A maradék{" "}
          <M>{"\\frac12\\int u^{-1/2}du = \\left[\\sqrt u\\right]"}</M>.
        </p>
      ),
      mezok: [
        { id: "u1", cimke: "új alsó határ (u)", helyes: c, tizedes: 0, tures: 0.01 },
        { id: "u2", cimke: "új felső határ (u)", helyes: veg, tizedes: 0, tures: 0.01 },
        { id: "I", cimke: "az integrál értéke", helyes: ertek, tizedes: 3 },
      ],
      megoldas: (
        <>
          <MB>{`\\int_0^{${b}}\\frac{x\\,dx}{\\sqrt{x^2+${c}}} = \\frac12\\int_{${c}}^{${veg}} u^{-1/2}du = \\frac12\\left[2\\sqrt u\\right]_{${c}}^{${veg}}`}</MB>
          <MB>{`= \\sqrt{${veg}}-\\sqrt{${c}} = ${Math.sqrt(veg)} - ${Math.sqrt(c)} = ${szK(ertek, 3)}`}</MB>
          <p>
            Ha valaki a régi <M>{`0`}</M> és <M>{`${b}`}</M> határokat hagyja az <M>{"u"}</M> változónál,{" "}
            <M>{`\\sqrt{${b}}-0`}</M> jönne ki — teljesen más szám.
          </p>
        </>
      ),
    };
  }

  // ∫_0^b 2x·e^{x²} dx
  const b = valaszt([1, 1.5, 2]);
  const ertek = Math.exp(b * b) - 1;
  return {
    szoveg: (
      <p>
        Helyettesítéssel számold ki! Vezesd be az <M>{"u=x^2"}</M> változót, és írd át a határokat is. Add meg az új
        alsó és felső határt, valamint az integrál értékét (3 tizedesre).
        <MB>{`\\int_{0}^{${szK(b, 1)}} 2x\\,e^{x^2}\\,dx`}</MB>
      </p>
    ),
    sugo: (
      <p>
        <M>{"u=x^2"}</M> esetén <M>{"du=2x\\,dx"}</M> — a <M>{"2x"}</M> szorzó épp „elfogy”. Az új határok{" "}
        <M>{"0"}</M> és <M>{`${szK(b * b, 2)}`}</M>, a maradék <M>{"\\int e^u du = e^u"}</M>.
      </p>
    ),
    mezok: [
      { id: "u1", cimke: "új alsó határ (u)", helyes: 0, tizedes: 0, tures: 0.01 },
      { id: "u2", cimke: "új felső határ (u)", helyes: b * b, tizedes: 2, tures: 0.01 },
      { id: "I", cimke: "az integrál értéke", helyes: ertek, tizedes: 3 },
    ],
    megoldas: (
      <>
        <MB>{`\\int_0^{${szK(b, 1)}}2xe^{x^2}dx = \\int_0^{${szK(b * b, 2)}}e^u du = \\left[e^u\\right]_0^{${szK(
          b * b,
          2,
        )}} = e^{${szK(b * b, 2)}}-1 = ${szK(ertek, 3)}`}</MB>
      </>
    ),
  };
}

/* ================= 3. Parciális integrálás határokkal ================= */

function parcialisFeladat() {
  if (Math.random() < 0.5) {
    // ∫_0^b x·e^{ax} dx
    const a = valaszt([1, 2, -1, -2]);
    const b = egesz(1, 2);
    const kiintegralt = (b * Math.exp(a * b)) / a; // [x e^{ax}/a]_0^b
    const maradek = (Math.exp(a * b) - 1) / (a * a); // (1/a)∫_0^b e^{ax}dx
    const ertek = kiintegralt - maradek;
    return {
      szoveg: (
        <p>
          Parciális integrálással számold ki! Legyen <M>{"u=x"}</M> és <M>{`v'=e^{${elso(a, "x")}}`}</M>. Add meg a{" "}
          <M>{"\\left[uv\\right]_a^b"}</M> kiintegrált tag értékét és az integrál végeredményét (3 tizedesre).
          <MB>{`\\int_{0}^{${b}} x\\,e^{${elso(a, "x")}}\\,dx`}</MB>
        </p>
      ),
      sugo: (
        <p>
          <M>{"\\int_a^b uv' = \\left[uv\\right]_a^b - \\int_a^b u'v"}</M>. Itt <M>{"u'=1"}</M> és{" "}
          <M>{`v=\\frac{e^{${elso(a, "x")}}}{${a}}`}</M>. A kiintegrált tagba <strong>azonnal</strong> behelyettesítjük a
          határokat.
        </p>
      ),
      mezok: [
        { id: "uv", cimke: "a kiintegrált tag, [uv]", helyes: kiintegralt, tizedes: 3 },
        { id: "I", cimke: "az integrál értéke", helyes: ertek, tizedes: 3 },
      ],
      megoldas: (
        <>
          <MB>{`\\int_0^{${b}}xe^{${elso(a, "x")}}dx = \\left[\\frac{x e^{${elso(
            a,
            "x",
          )}}}{${a}}\\right]_0^{${b}} - \\frac{1}{${a}}\\int_0^{${b}} e^{${elso(a, "x")}}dx`}</MB>
          <MB>{`= ${szK(kiintegralt, 4)} - ${szK(maradek, 4)} = ${szK(ertek, 4)}`}</MB>
        </>
      ),
    };
  }

  // ∫_0^b x·sin(kx) dx
  const k = valaszt([1, 2]);
  const felso = valaszt([Math.PI, Math.PI / 2]);
  const felsoLatex = felso === Math.PI ? "\\pi" : "\\frac{\\pi}{2}";
  const kiintegralt = (-felso * Math.cos(k * felso)) / k; // [-x cos(kx)/k]_0^b
  const maradek = Math.sin(k * felso) / (k * k); // +(1/k)∫cos(kx)dx
  const ertek = kiintegralt + maradek;
  return {
    szoveg: (
      <p>
        Parciális integrálással számold ki! Legyen <M>{"u=x"}</M> és <M>{`v'=\\sin\\left(${elso(k, "x")}\\right)`}</M>.
        Add meg a <M>{"\\left[uv\\right]_a^b"}</M> kiintegrált tag értékét és az integrál végeredményét (3 tizedesre).
        <MB>{`\\int_{0}^{${felsoLatex}} x\\,\\sin\\left(${elso(k, "x")}\\right)dx`}</MB>
      </p>
    ),
    sugo: (
      <p>
        <M>{`v=-\\frac{\\cos\\left(${elso(k, "x")}\\right)}{${k}}`}</M>, tehát a kiintegrált tag{" "}
        <M>{`\\left[-\\frac{x\\cos\\left(${elso(k, "x")}\\right)}{${k}}\\right]`}</M>. A maradék integrál{" "}
        <M>{`\\frac{1}{${k}}\\int\\cos\\left(${elso(k, "x")}\\right)dx`}</M>.
      </p>
    ),
    mezok: [
      { id: "uv", cimke: "a kiintegrált tag, [uv]", helyes: kiintegralt, tizedes: 3 },
      { id: "I", cimke: "az integrál értéke", helyes: ertek, tizedes: 3 },
    ],
    megoldas: (
      <>
        <MB>{`\\int_0^{${felsoLatex}}x\\sin\\left(${elso(k, "x")}\\right)dx = \\left[-\\frac{x\\cos\\left(${elso(
          k,
          "x",
        )}\\right)}{${k}}\\right]_0^{${felsoLatex}} + \\frac{1}{${k}}\\int_0^{${felsoLatex}}\\cos\\left(${elso(
          k,
          "x",
        )}\\right)dx`}</MB>
        <MB>{`= ${szK(kiintegralt, 4)} + ${szK(maradek, 4)} = ${szK(ertek, 4)}`}</MB>
      </>
    ),
  };
}

/* ================= 4. Két görbe közötti terület ================= */

function teruletFeladat() {
  const r1 = egesz(-3, 0);
  let r2 = egesz(1, 3);
  if (r2 - r1 < 2) r2 = r1 + 2;
  const m = r1 + r2;
  const q = -r1 * r2;
  const T = Math.pow(r2 - r1, 3) / 6;
  const egyenes = polinom([m, q]);
  return {
    szoveg: (
      <p>
        Mekkora területet zár közre a parabola és az egyenes? Add meg a két metszéspont abszcisszáját (a kisebbet
        előbb) és a területet 3 tizedesre.
        <MB>{`y=x^2, \\qquad y=${egyenes}`}</MB>
      </p>
    ),
    sugo: (
      <p>
        Metszéspontok: <M>{`x^2 = ${egyenes}`}</M>, vagyis <M>{`x^2-\\left(${egyenes}\\right)=0`}</M>. A
        metszéspontok között az <strong>egyenes</strong> a felső (helyettesíts be egy közbülső <M>{"x"}</M>-et!),
        tehát <M>{"T=\\int_{x_1}^{x_2}\\left(\\text{egyenes}-x^2\\right)dx"}</M>.
      </p>
    ),
    mezok: [
      { id: "x1", cimke: "kisebbik metszéspont", helyes: r1, tizedes: 0, tures: 0.01 },
      { id: "x2", cimke: "nagyobbik metszéspont", helyes: r2, tizedes: 0, tures: 0.01 },
      { id: "T", cimke: "a terület", helyes: T, tizedes: 3 },
    ],
    megoldas: (
      <>
        <MB>{`x^2 = ${egyenes} \\;\\Rightarrow\\; \\left(x-\\left(${r1}\\right)\\right)\\left(x-${r2}\\right)=0 \\;\\Rightarrow\\; x_1=${r1},\\ x_2=${r2}`}</MB>
        <MB>{`T=\\int_{${r1}}^{${r2}}\\left(${egyenes}-x^2\\right)dx = \\left[${primitivLatex([
          m,
          q,
        ])}-\\frac{x^3}{3}\\right]_{${r1}}^{${r2}} = ${szK(T, 3)}`}</MB>
        <p>
          Egy hasznos gyorsképlet: ha a parabola és az egyenes metszéspontjai <M>{"x_1"}</M> és <M>{"x_2"}</M>, akkor{" "}
          <M>{"T=\\frac{\\left(x_2-x_1\\right)^3}{6}"}</M> — itt{" "}
          <M>{`\\frac{${r2 - r1}^3}{6} = ${szK(T, 3)}`}</M>.
        </p>
      </>
    ),
  };
}

/* ================= 5. Forgástest térfogata ================= */

function forgastestFeladat() {
  const tipus = valaszt(["egyenes", "parabola", "gyok"]);

  if (tipus === "egyenes") {
    const m = valaszt([1, 2, 3]);
    const q = egesz(0, 3);
    const b = egesz(1, 3);
    const V = (Math.PI / (3 * m)) * (Math.pow(m * b + q, 3) - Math.pow(q, 3));
    return {
      szoveg: (
        <p>
          Forgassuk meg az <M>{"x"}</M> tengely körül a görbe alatti tartományt a megadott szakaszon! Add meg a korong
          sugarát a <strong>felső</strong> határnál, és a keletkező test térfogatát 3 tizedesre.
          <MB>{`f(x)=${polinom([m, q])},\\qquad 0\\le x\\le ${b}`}</MB>
        </p>
      ),
      sugo: (
        <p>
          <M>{"V=\\pi\\int_a^b f(x)^2dx"}</M> — <strong>előbb négyzetre emelünk</strong>. A négyzet
          integrálásához használhatod a láncszabály visszafelé alakját:{" "}
          <M>{`\\int \\left(${polinom([m, q])}\\right)^2dx = \\frac{\\left(${polinom([
            m,
            q,
          ])}\\right)^3}{${3 * m}}`}</M>.
        </p>
      ),
      mezok: [
        { id: "r", cimke: "a korong sugara x = b-nél", helyes: m * b + q, tizedes: 2 },
        { id: "V", cimke: "a térfogat", helyes: V, tizedes: 3 },
      ],
      megoldas: (
        <>
          <MB>{`V=\\pi\\int_0^{${b}}\\left(${polinom([m, q])}\\right)^2dx = \\pi\\left[\\frac{\\left(${polinom([
            m,
            q,
          ])}\\right)^3}{${3 * m}}\\right]_0^{${b}}`}</MB>
          <MB>{`= \\frac{\\pi}{${3 * m}}\\left(${szK(Math.pow(m * b + q, 3), 3)}-${szK(
            Math.pow(q, 3),
            0,
          )}\\right) = ${szK(V, 4)}`}</MB>
        </>
      ),
    };
  }

  if (tipus === "parabola") {
    const c = valaszt([1, 2, 0.5]);
    const b = egesz(1, 2);
    const V = (Math.PI * c * c * Math.pow(b, 5)) / 5;
    return {
      szoveg: (
        <p>
          Forgassuk meg az <M>{"x"}</M> tengely körül a görbe alatti tartományt! Add meg a korong sugarát a{" "}
          <strong>felső</strong> határnál, és a test térfogatát 3 tizedesre.
          <MB>{`f(x)=${c === 1 ? "" : szK(c, 1)}x^2,\\qquad 0\\le x\\le ${b}`}</MB>
        </p>
      ),
      sugo: (
        <p>
          <M>{`f^2 = ${szK(c * c, 2)}x^4`}</M>, tehát <M>{"V=\\pi\\int_0^b c^2x^4dx = \\pi c^2\\frac{b^5}{5}"}</M>.
        </p>
      ),
      mezok: [
        { id: "r", cimke: "a korong sugara x = b-nél", helyes: c * b * b, tizedes: 2 },
        { id: "V", cimke: "a térfogat", helyes: V, tizedes: 3 },
      ],
      megoldas: (
        <>
          <MB>{`V=\\pi\\int_0^{${b}}${szK(c * c, 2)}x^4dx = \\pi\\cdot${szK(c * c, 2)}\\cdot\\frac{${b}^5}{5} = ${szK(
            V,
            4,
          )}`}</MB>
        </>
      ),
    };
  }

  const c = valaszt([1, 2]);
  const b = egesz(2, 4);
  const V = (Math.PI * c * c * b * b) / 2;
  return {
    szoveg: (
      <p>
        Forgassuk meg az <M>{"x"}</M> tengely körül a görbe alatti tartományt! Add meg a korong sugarát a{" "}
        <strong>felső</strong> határnál (2 tizedesre), és a test térfogatát 3 tizedesre.
        <MB>{`f(x)=${c === 1 ? "" : c}\\sqrt{x},\\qquad 0\\le x\\le ${b}`}</MB>
      </p>
    ),
    sugo: (
      <p>
        A négyzetre emelés itt <em>megszünteti</em> a gyököt: <M>{`f^2=${c * c}x`}</M>, tehát{" "}
        <M>{`V=\\pi\\int_0^{${b}}${c * c}x\\,dx`}</M>.
      </p>
    ),
    mezok: [
      { id: "r", cimke: "a korong sugara x = b-nél", helyes: c * Math.sqrt(b), tizedes: 2 },
      { id: "V", cimke: "a térfogat", helyes: V, tizedes: 3 },
    ],
    megoldas: (
      <>
        <MB>{`V=\\pi\\int_0^{${b}}${c * c}x\\,dx = \\pi\\left[\\frac{${c * c}x^2}{2}\\right]_0^{${b}} = \\pi\\cdot\\frac{${
          c * c
        }\\cdot ${b * b}}{2} = ${szK(V, 4)}`}</MB>
      </>
    ),
  };
}

export const GENERATOROK = [
  { cim: "Newton–Leibniz-tétel", fn: newtonLeibnizFeladat },
  { cim: "Helyettesítés a határokkal", fn: helyettesitesFeladat },
  { cim: "Parciális integrálás", fn: parcialisFeladat },
  { cim: "Két görbe közötti terület", fn: teruletFeladat },
  { cim: "Forgástest térfogata", fn: forgastestFeladat },
];

export default function GyakorloSzekcio() {
  return (
    <div>
      <GyakorloDoboz
        cim="Newton–Leibniz-tétel"
        leiras="Primitív függvény, majd felső mínusz alsó. A +C-t itt soha ne írd ki — kiesik."
        generator={newtonLeibnizFeladat}
      />
      <GyakorloDoboz
        cim="Helyettesítés a határokkal"
        leiras="Új változó, ÚJ határok. Ez a félév leggyakoribb hibája — itt lehet kigyakorolni."
        generator={helyettesitesFeladat}
        oszlopok={3}
      />
      <GyakorloDoboz
        cim="Parciális integrálás"
        leiras="A kiintegrált tagba azonnal behelyettesítjük a határokat, a maradék integrálban ugyanazok maradnak."
        generator={parcialisFeladat}
      />
      <GyakorloDoboz
        cim="Két görbe közötti terület"
        leiras="Előbb metszéspontok, aztán felső mínusz alsó. A negatív eredmény mindig sorrendhibát jelent."
        generator={teruletFeladat}
        oszlopok={3}
      />
      <GyakorloDoboz
        cim="Forgástest térfogata"
        leiras="V = π∫f² — először négyzetre emelünk, csak utána integrálunk."
        generator={forgastestFeladat}
      />
    </div>
  );
}
