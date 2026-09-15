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

/** Polinom LaTeX-alakja a legmagasabb fokú tagtól: [3, -5, 2] → 3n^{2}-5n+2 */
function polinom(egyutthatok) {
  const k = egyutthatok.length - 1;
  let s = "";
  egyutthatok.forEach((c, i) => {
    const fok = k - i;
    if (c === 0) return;
    const jel = c > 0 ? (s === "" ? "" : "+") : "-";
    const abs = Math.abs(c);
    const szam = abs === 1 && fok > 0 ? "" : String(abs);
    const valtozo = fok === 0 ? "" : fok === 1 ? "n" : `n^{${fok}}`;
    s += `${jel}${szam}${valtozo}`;
  });
  return s === "" ? "0" : s;
}

/** Előjeles tag: +3 / −3 (LaTeX-ben, szorzó nélkül). */
const jeles = (c, valtozo = "") =>
  `${c >= 0 ? "+" : "-"}${Math.abs(c) === 1 && valtozo ? "" : Math.abs(c)}${valtozo}`;

/** Együtthatós tag: 1 esetén elhagyjuk a szorzót. */
const egyutt = (c, kif) => (c === 1 ? kif : `${c}\\cdot ${kif}`);

/** A polinom alakja nⁿ-nel elosztva: [3,-5,2] → 3-\frac{5}{n}+\frac{2}{n^{2}} */
function osztottAlak(egyutthatok) {
  const k = egyutthatok.length - 1;
  let s = "";
  egyutthatok.forEach((c, i) => {
    if (c === 0) return;
    const jel = c > 0 ? (s === "" ? "" : "+") : "-";
    const abs = Math.abs(c);
    if (i === 0) s += `${jel}${abs}`;
    else s += `${jel}\\frac{${abs}}{${i === 1 ? "n" : `n^{${i}}`}}`;
  });
  return s === "" ? "0" : s;
}

/* ---------- 1. Polinom per polinom ---------- */

function polinomFeladat() {
  const masodfoku = Math.random() < 0.55;
  const a = nemNulla(-9, 9);
  const d = egesz(1, 9);
  let szamlalo;
  let nevezo;
  if (masodfoku) {
    szamlalo = [a, egesz(-8, 8), egesz(-8, 8)];
    nevezo = [d, egesz(0, 8), egesz(0, 8)];
  } else {
    szamlalo = [a, egesz(-8, 8)];
    nevezo = [d, egesz(0, 8)];
  }
  const fok = szamlalo.length - 1;
  const A = a / d;
  const kiertekel = (egy, n) =>
    egy.reduce((sum, c, i) => sum + c * Math.pow(n, egy.length - 1 - i), 0);
  const a5 = kiertekel(szamlalo, 5) / kiertekel(nevezo, 5);

  return {
    szoveg: (
      <p>
        Számítsd ki a határértéket, és add meg az <M>{"a_5"}</M> tagot is (3
        tizedesre):
        <MB>{`\\lim_{n\\to\\infty}\\frac{${polinom(szamlalo)}}{${polinom(nevezo)}}`}</MB>
      </p>
    ),
    sugo: (
      <p>
        Ossz el minden tagot a nevező legmagasabb fokú tagjával, itt{" "}
        <M>{`n^{${fok}}`}</M>-nal. Utána minden <M>{"1/n^k"}</M> alakú tag
        nullához tart, és a maradék leolvasható. Azonos fokszámnál a válasz
        mindig a <strong>főegyütthatók hányadosa</strong>.
      </p>
    ),
    mezok: [
      { id: "A", cimke: "A határérték", helyes: A, tizedes: 3 },
      { id: "a5", cimke: "a₅", helyes: a5, tizedes: 3 },
    ],
    megoldas: (
      <>
        <MB>{`\\lim_{n\\to\\infty}\\frac{${polinom(szamlalo)}}{${polinom(nevezo)}} = \\lim_{n\\to\\infty}\\frac{${osztottAlak(szamlalo)}}{${osztottAlak(nevezo)}} = \\frac{${a}}{${d}} = ${szK(A, 4)}`}</MB>
        <p>
          A számláló és a nevező külön-külön konvergens, és a nevező határértéke{" "}
          <M>{`${d} \\ne 0`}</M> — csak ezért szabad a műveleti tételt
          alkalmazni.
        </p>
        <MB>{`a_5 = \\frac{${kiertekel(szamlalo, 5)}}{${kiertekel(nevezo, 5)}} = ${szK(a5, 4)}`}</MB>
      </>
    ),
  };
}

/* ---------- 2. Gyökös kifejezés — konjugálttal bővítés ---------- */

function gyokosFeladat() {
  const tipus = Math.random() < 0.5 ? "egy" : "ketto";
  if (tipus === "egy") {
    // √(n² + an + b) − n → a/2
    const a = egesz(1, 8);
    const b = egesz(0, 9);
    const A = a / 2;
    return {
      szoveg: (
        <p>
          Számítsd ki a határértéket (3 tizedesre), és add meg a konjugálttal
          való bővítés után a <strong>számlálóban</strong> maradó kifejezés{" "}
          <M>{"n"}</M>-es együtthatóját:
          <MB>{`\\lim_{n\\to\\infty}\\left(\\sqrt{${polinom([1, a, b])}} - n\\right)`}</MB>
        </p>
      ),
      sugo: (
        <p>
          <M>{"\\infty-\\infty"}</M> alak: bővíts a konjugálttal, vagyis szorozz
          és ossz a <M>{`\\sqrt{${polinom([1, a, b])}} + n`}</M> kifejezéssel. A
          számlálóban az <M>{"(x-y)(x+y) = x^2-y^2"}</M> azonosság miatt
          eltűnnek a gyökök.
        </p>
      ),
      mezok: [
        { id: "A", cimke: "A határérték", helyes: A, tizedes: 3 },
        {
          id: "c",
          cimke: "n együtthatója a számlálóban",
          helyes: a,
          tizedes: 0,
          tures: 0.01,
        },
      ],
      megoldas: (
        <>
          <MB>{`\\sqrt{${polinom([1, a, b])}} - n = \\frac{\\left(${polinom([1, a, b])}\\right) - n^2}{\\sqrt{${polinom([1, a, b])}} + n} = \\frac{${polinom([a, b])}}{\\sqrt{${polinom([1, a, b])}} + n}`}</MB>
          <p>
            Most osztunk <M>{"n"}</M>-nel; a{" "}
            <strong>gyökjel alatt ez n²-tel való osztást jelent</strong>:
          </p>
          <MB>{`\\lim_{n\\to\\infty}\\frac{${a} + \\frac{${b}}{n}}{\\sqrt{1 + \\frac{${a}}{n} + \\frac{${b}}{n^2}} + 1} = \\frac{${a}}{1+1} = ${szK(A, 3)}`}</MB>
        </>
      ),
    };
  }
  // √(n² + an) − √(n² + bn) → (a−b)/2
  let a = egesz(1, 9);
  let b = egesz(1, 9);
  while (a === b) b = egesz(1, 9);
  const A = (a - b) / 2;
  return {
    szoveg: (
      <p>
        Számítsd ki a határértéket (3 tizedesre), és add meg a konjugálttal való
        bővítés után a <strong>számlálóban</strong> maradó kifejezés{" "}
        <M>{"n"}</M>-es együtthatóját:
        <MB>{`\\lim_{n\\to\\infty}\\left(\\sqrt{n^2+${a}n} - \\sqrt{n^2+${b}n}\\right)`}</MB>
      </p>
    ),
    sugo: (
      <p>
        Két gyök különbsége <M>{"\\infty-\\infty"}</M> alak. Bővíts az
        összegükkel: a számlálóban <M>{`(n^2+${a}n) - (n^2+${b}n)`}</M> marad,
        ami már csak elsőfokú.
      </p>
    ),
    mezok: [
      { id: "A", cimke: "A határérték", helyes: A, tizedes: 3 },
      {
        id: "c",
        cimke: "n együtthatója a számlálóban",
        helyes: a - b,
        tizedes: 0,
        tures: 0.01,
      },
    ],
    megoldas: (
      <>
        <MB>{`\\sqrt{n^2+${a}n} - \\sqrt{n^2+${b}n} = \\frac{(n^2+${a}n)-(n^2+${b}n)}{\\sqrt{n^2+${a}n}+\\sqrt{n^2+${b}n}} = \\frac{${a - b}n}{\\sqrt{n^2+${a}n}+\\sqrt{n^2+${b}n}}`}</MB>
        <MB>{`= \\lim_{n\\to\\infty}\\frac{${a - b}}{\\sqrt{1+\\frac{${a}}{n}}+\\sqrt{1+\\frac{${b}}{n}}} = \\frac{${a - b}}{1+1} = ${szK(A, 3)}`}</MB>
        <p>
          Ellenőrzés: <M>{`n = 1000`}</M> mellett a kifejezés értéke{" "}
          <M>{szK(Math.sqrt(1e6 + a * 1000) - Math.sqrt(1e6 + b * 1000), 4)}</M>{" "}
          — valóban <M>{szK(A, 3)}</M> közelében.
        </p>
      </>
    ),
  };
}

/* ---------- 3. Küszöbindex ---------- */

function kuszobFeladat() {
  const epszilonok = [
    [0.1, 10],
    [0.05, 20],
    [0.02, 50],
    [0.01, 100],
  ];
  let a;
  let b;
  let c;
  let d;
  let kul;
  let N;
  let eps;
  let q;
  let probalkozas = 0;
  do {
    a = egesz(1, 6);
    b = egesz(-6, 8);
    c = egesz(1, 4);
    d = egesz(0, 7);
    [eps, q] = valaszt(epszilonok);
    kul = Math.abs(b * c - a * d);
    const R = kul * q - c * d;
    N = Math.max(0, Math.floor(R / (c * c)));
    probalkozas += 1;
  } while ((kul === 0 || c + d <= 0 || N < 3 || N > 4000) && probalkozas < 400);

  const A = a / c;

  return {
    szoveg: (
      <p>
        Az <M>{`a_n = \\frac{${polinom([a, b])}}{${polinom([c, d])}}`}</M>{" "}
        sorozat konvergens. Add meg az <M>{"A"}</M> határértéket (3 tizedesre),
        és azt a <strong>legkisebb</strong> <M>{"N"}</M> egész számot, amelyre{" "}
        <strong>minden</strong> <M>{"n > N"}</M> esetén{" "}
        <M>{`\\left|a_n - A\\right| < ${szK(eps, 2)}`}</M>.
      </p>
    ),
    sugo: (
      <p>
        Először a határérték (azonos fokszám). Utána közös nevezőre hozva{" "}
        <M>{`\\left|a_n - A\\right| = \\frac{${kul}}{${c}\\left(${polinom([c, d])}\\right)}`}</M>
        , és ezt kell <M>{szK(eps, 2)}</M> alá szorítani. A kapott korlát egész
        részéig „rossz” az index.
      </p>
    ),
    mezok: [
      { id: "A", cimke: "A határérték", helyes: A, tizedes: 3 },
      { id: "N", cimke: "N (küszöbindex)", helyes: N, tizedes: 0, tures: 0.01 },
    ],
    megoldas: (
      <>
        <MB>{`A = \\lim_{n\\to\\infty}\\frac{${polinom([a, b])}}{${polinom([c, d])}} = \\frac{${a}}{${c}} = ${szK(A, 4)}`}</MB>
        <MB>{`\\left|a_n - \\frac{${a}}{${c}}\\right| = \\left|\\frac{${c}\\left(${polinom([a, b])}\\right) - ${a}\\left(${polinom([c, d])}\\right)}{${c}\\left(${polinom([c, d])}\\right)}\\right| = \\frac{${kul}}{${c}\\left(${polinom([c, d])}\\right)}`}</MB>
        <MB>{`\\frac{${kul}}{${c}\\left(${polinom([c, d])}\\right)} < ${szK(eps, 2)} \\iff ${c * c}n ${
          c * d === 0 ? "" : `+ ${c * d}`
        } > ${kul * q} \\iff n > ${szK((kul * q - c * d) / (c * c), 4)}`}</MB>
        <p>
          A legkisebb ilyen egész küszöb tehát <M>{`N = ${N}`}</M>: az{" "}
          <M>{`${N + 1}`}</M>. tagtól kezdve minden tag <M>{szK(eps, 2)}</M>-nál
          közelebb van <M>{szK(A, 4)}</M>-hoz. Ellenőrzés:{" "}
          <M>{`\\left|a_{${N + 1}} - A\\right| = ${szK(Math.abs((a * (N + 1) + b) / (c * (N + 1) + d) - A), 5)}`}</M>
          , míg{" "}
          <M>{`\\left|a_{${N}} - A\\right| = ${szK(Math.abs((a * N + b) / (c * N + d) - A), 5)}`}</M>
          .
        </p>
      </>
    ),
  };
}

/* ---------- 4. e-típusú határérték ---------- */

function eTipusFeladat() {
  if (Math.random() < 0.5) {
    // (1 + a/n)^{bn} → e^{ab}
    const a = valaszt([-2, -1, 1, 2, 3]);
    const b = valaszt([1, 2, 3]);
    const k = a * b;
    if (Math.abs(k) > 4) return eTipusFeladat();
    const A = Math.exp(k);
    return {
      szoveg: (
        <p>
          Számítsd ki (a kitevő egész szám, a határérték 3 tizedesre):
          <MB>{`\\lim_{n\\to\\infty}\\left(1 ${a < 0 ? "-" : "+"} \\frac{${Math.abs(a)}}{n}\\right)^{${b === 1 ? "" : b}n}`}</MB>
        </p>
      ),
      sugo: (
        <p>
          Alakítsd az alapot <M>{"1 + 1/b_n"}</M> formára: itt a „kicsi” rész{" "}
          <M>{`\\frac{${a}}{n}`}</M>, a reciproka <M>{`\\frac{n}{${a}}`}</M>. A
          kitevőt írd fel úgy, hogy ez a reciprok szorzóként megjelenjen.
        </p>
      ),
      mezok: [
        { id: "k", cimke: "e kitevője", helyes: k, tizedes: 0, tures: 0.01 },
        { id: "A", cimke: "A határérték", helyes: A, tizedes: 3 },
      ],
      megoldas: (
        <>
          <MB>{`\\left(1+\\frac{${a}}{n}\\right)^{${b === 1 ? "" : b}n} = \\left[\\left(1+\\frac{${a}}{n}\\right)^{\\frac{n}{${a}}}\\right]^{${a}\\cdot ${b}} \\longrightarrow e^{${k}}`}</MB>
          <MB>{`e^{${k}} = ${szK(A, 4)}`}</MB>
          <p>
            A szögletes zárójelben lévő rész <M>{"e"}</M>-hez tart, a külső
            kitevő pedig <M>{`\\frac{${b}n}{n/${a}} = ${k}`}</M>. A kitevőt soha
            ne hagyd el!
          </p>
        </>
      ),
    };
  }
  // ((n+a)/(n+b))^n → e^{a−b}
  let a = egesz(-3, 5);
  let b = egesz(-3, 5);
  while (a === b || Math.abs(a - b) > 4 || 1 + b <= 0) {
    a = egesz(-3, 5);
    b = egesz(-3, 5);
  }
  const k = a - b;
  const A = Math.exp(k);
  return {
    szoveg: (
      <p>
        Számítsd ki (a kitevő egész szám, a határérték 3 tizedesre):
        <MB>{`\\lim_{n\\to\\infty}\\left(\\frac{${polinom([1, a])}}{${polinom([1, b])}}\\right)^{n}`}</MB>
      </p>
    ),
    sugo: (
      <p>
        Polinomosztással{" "}
        <M>{`\\frac{${polinom([1, a])}}{${polinom([1, b])}} = 1 + \\frac{${k}}{${polinom([1, b])}}`}</M>
        . A „kicsi” rész reciproka <M>{`\\frac{${polinom([1, b])}}{${k}}`}</M> —
        ezt kell a kitevőbe beépíteni.
      </p>
    ),
    mezok: [
      { id: "k", cimke: "e kitevője", helyes: k, tizedes: 0, tures: 0.01 },
      { id: "A", cimke: "A határérték", helyes: A, tizedes: 3 },
    ],
    megoldas: (
      <>
        <MB>{`\\frac{${polinom([1, a])}}{${polinom([1, b])}} = \\frac{\\left(${polinom([1, b])}\\right) ${jeles(k, "")}}{${polinom([1, b])}} = 1 + \\frac{${k}}{${polinom([1, b])}}`}</MB>
        <MB>{`\\left(1+\\frac{${k}}{${polinom([1, b])}}\\right)^{n} = \\left[\\left(1+\\frac{${k}}{${polinom([1, b])}}\\right)^{\\frac{${polinom([1, b])}}{${k}}}\\right]^{\\frac{${k}n}{${polinom([1, b])}}} \\longrightarrow e^{${k}}`}</MB>
        <p>
          A külső kitevő <M>{`\\frac{${k}n}{${polinom([1, b])}} \\to ${k}`}</M>,
          tehát a határérték <M>{`e^{${k}} = ${szK(A, 4)}`}</M>.
        </p>
      </>
    ),
  };
}

/* ---------- 5. n-edik gyök és nagyságrend ---------- */

function gyokNagysagrendFeladat() {
  const tipus = valaszt(["osszeg", "polinom", "mertani"]);

  if (tipus === "osszeg") {
    // ⁿ√(aⁿ + bⁿ) → max(a, b)
    let a = egesz(2, 7);
    let b = egesz(2, 7);
    while (a === b) b = egesz(2, 7);
    const A = Math.max(a, b);
    return {
      szoveg: (
        <p>
          Add meg a domináns tag alapját és a határértéket (3 tizedesre):
          <MB>{`\\lim_{n\\to\\infty}\\sqrt[n]{${a}^n + ${b}^n}`}</MB>
        </p>
      ),
      sugo: (
        <p>
          Rendőrelv: a nagyobbik hatvány már önmagában alsó becslés, a duplája
          felső becslés. A <M>{"\\sqrt[n]{2} \\to 1"}</M> miatt a két szélső
          sorozat ugyanoda tart.
        </p>
      ),
      mezok: [
        {
          id: "alap",
          cimke: "A domináns tag alapja",
          helyes: A,
          tizedes: 0,
          tures: 0.01,
        },
        { id: "A", cimke: "A határérték", helyes: A, tizedes: 3 },
      ],
      megoldas: (
        <>
          <MB>{`${A}^n \\le ${a}^n + ${b}^n \\le 2\\cdot ${A}^n \\ \\Rightarrow\\ ${A} \\le \\sqrt[n]{${a}^n+${b}^n} \\le ${A}\\sqrt[n]{2}`}</MB>
          <p>
            Mivel <M>{"\\sqrt[n]{2} \\to 1"}</M>, mindkét szélső sorozat{" "}
            <M>{`${A}`}</M>-hoz tart, tehát a rendőrelv szerint a határérték{" "}
            <M>{`${A}`}</M>. Általánosan:{" "}
            <M>
              {
                "\\lim \\sqrt[n]{a_1^n + \\dots + a_k^n} = \\max\\{a_1,\\dots,a_k\\}"
              }
            </M>
            .
          </p>
        </>
      ),
    };
  }

  if (tipus === "polinom") {
    // ⁿ√(aⁿ + n^k) → a
    const a = egesz(2, 6);
    const k = egesz(2, 5);
    return {
      szoveg: (
        <p>
          Add meg a domináns tag alapját és a határértéket (3 tizedesre):
          <MB>{`\\lim_{n\\to\\infty}\\sqrt[n]{${a}^n + n^{${k}}}`}</MB>
        </p>
      ),
      sugo: (
        <p>
          A nagyságrendi sorrend szerint <M>{`n^{${k}} \\ll ${a}^n`}</M>, tehát
          nagy <M>{"n"}</M>-re <M>{`n^{${k}} \\le ${a}^n`}</M>. Ezzel a gyök
          alatti kifejezés két oldalról becsülhető.
        </p>
      ),
      mezok: [
        {
          id: "alap",
          cimke: "A domináns tag alapja",
          helyes: a,
          tizedes: 0,
          tures: 0.01,
        },
        { id: "A", cimke: "A határérték", helyes: a, tizedes: 3 },
      ],
      megoldas: (
        <>
          <MB>{`${a}^n \\le ${a}^n + n^{${k}} \\le 2\\cdot ${a}^n \\ \\Rightarrow\\ ${a} \\le \\sqrt[n]{${a}^n+n^{${k}}} \\le ${a}\\sqrt[n]{2} \\longrightarrow ${a}`}</MB>
          <p>
            Az exponenciális erősebb minden hatványnál, ezért a polinomiális tag
            a gyök alatt „eltűnik”. A határérték <M>{`${a}`}</M>.
          </p>
        </>
      ),
    };
  }

  // (p·aⁿ + q·bⁿ)/(r·bⁿ + s) → q/r  (b > a)
  const a = egesz(2, 4);
  const b = egesz(5, 7);
  const p = egesz(1, 4);
  const q = egesz(1, 5);
  const r = egesz(1, 4);
  const s = egesz(1, 9);
  const A = q / r;
  return {
    szoveg: (
      <p>
        Add meg a domináns tag alapját és a határértéket (3 tizedesre):
        <MB>{`\\lim_{n\\to\\infty}\\frac{${egyutt(p, `${a}^n`)} + ${egyutt(q, `${b}^n`)}}{${egyutt(r, `${b}^n`)} + ${s}}`}</MB>
      </p>
    ),
    sugo: (
      <p>
        Ossz el mindent a legerősebb taggal, itt <M>{`${b}^n`}</M>-nel. Utána{" "}
        <M>{`\\left(\\frac{${a}}{${b}}\\right)^n \\to 0`}</M> (mert a hányados
        abszolút értéke 1-nél kisebb) és <M>{`\\frac{${s}}{${b}^n} \\to 0`}</M>.
      </p>
    ),
    mezok: [
      {
        id: "alap",
        cimke: "A domináns tag alapja",
        helyes: b,
        tizedes: 0,
        tures: 0.01,
      },
      { id: "A", cimke: "A határérték", helyes: A, tizedes: 3 },
    ],
    megoldas: (
      <>
        <MB>{`\\frac{${egyutt(p, `${a}^n`)} + ${egyutt(q, `${b}^n`)}}{${egyutt(r, `${b}^n`)} + ${s}} = \\frac{${egyutt(p, `\\left(\\frac{${a}}{${b}}\\right)^n`)} + ${q}}{${r} + \\frac{${s}}{${b}^n}} \\longrightarrow \\frac{0 + ${q}}{${r} + 0} = ${szK(A, 4)}`}</MB>
        <p>
          A <M>{`\\left(\\frac{${a}}{${b}}\\right)^n`}</M> mértani sorozat
          hányadosa <M>{szK(a / b, 3)}</M>, abszolút értékben 1-nél kisebb,
          tehát nullához tart.
        </p>
      </>
    ),
  };
}

/* ---------- a szekció ---------- */

export const GENERATOROK = [
  { cim: "Polinom per polinom", fn: polinomFeladat },
  { cim: "Gyökös kifejezés — bővítés a konjugálttal", fn: gyokosFeladat },
  { cim: "Küszöbindex", fn: kuszobFeladat },
  { cim: "e-típusú határérték", fn: eTipusFeladat },
  { cim: "n-edik gyök és mértani hányados", fn: gyokNagysagrendFeladat },
];

export default function GyakorloSzekcio() {
  return (
    <div>
      <GyakorloDoboz
        cim="Polinom per polinom"
        leiras="Azonos fokszám: a főegyütthatók hányadosa. Oszd el mindent a nevező legmagasabb fokú tagjával."
        generator={polinomFeladat}
      />
      <GyakorloDoboz
        cim="Gyökös kifejezés — bővítés a konjugálttal"
        leiras="∞ − ∞ alak. A gyökjel alatt n²-tel osztunk, nem n-nel!"
        generator={gyokosFeladat}
      />
      <GyakorloDoboz
        cim="Küszöbindex"
        leiras="Előbb az ε, utána az N. A feladat a legkisebb olyan N egészet kéri, amely után már minden tag a sávban van."
        generator={kuszobFeladat}
      />
      <GyakorloDoboz
        cim="e-típusú határérték"
        leiras={
          <>
            <M>{"1^{\\infty}"}</M> alak: hozd az alapot{" "}
            <M>{"1 + \\text{kicsi}"}</M> formára, és igazítsd a kitevőt. A külső
            kitevő határértéke lesz <M>{"e"}</M> kitevője.
          </>
        }
        generator={eTipusFeladat}
      />
      <GyakorloDoboz
        cim="n-edik gyök és mértani hányados"
        leiras="A legerősebb tag dönt: rendőrelv, illetve osztás a domináns taggal."
        generator={gyokNagysagrendFeladat}
      />
    </div>
  );
}
