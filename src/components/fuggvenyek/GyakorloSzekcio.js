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

/** Előjeles tag LaTeX-ben: +3x / −x / (üres, ha 0). */
function tag(c, valtozo = "", elso = false) {
  if (c === 0) return "";
  const jel = c < 0 ? "-" : elso ? "" : "+";
  const abs = Math.abs(c);
  const szam = abs === 1 && valtozo ? "" : String(abs);
  return `${jel}${szam}${valtozo}`;
}

/** ax + b alak. */
const linearis = (a, b) => `${tag(a, "x", true)}${tag(b)}` || "0";

/** Együttható kiírása: az 1-et elhagyjuk (1x helyett x). */
const szorzo = (k) => (k === 1 ? "" : String(k));

/** Az xᵏ-nal való osztás utáni tag: c/xᵏ, előjellel. */
function osztottTag(c, k) {
  if (c === 0) return "";
  const jel = c < 0 ? "-" : "+";
  const nevezo = k === 1 ? "x" : `x^{${k}}`;
  return `${jel}\\frac{${Math.abs(c)}}{${nevezo}}`;
}

/* ---------- 1. Értelmezési tartomány ---------- */

function ertelmezesFeladat() {
  const a = valaszt([1, 2]);
  const r = egesz(-4, 3); // a gyök alatti kifejezés zérushelye
  const b = -a * r;
  const c = r + egesz(1, 5); // a nevező zérushelye, a D_f belsejében
  const x1 = c + valaszt([1, 2, 3]);
  const ertek = Math.sqrt(a * x1 + b) / (x1 - c);

  return {
    szoveg: (
      <p>
        Add meg az alábbi függvény értelmezési tartományát, majd számítsd ki a helyettesítési értéket:
        <MB>{`f(x) = \\frac{\\sqrt{${linearis(a, b)}}}{x${tag(-c)}}`}</MB>
      </p>
    ),
    sugo: (
      <p>
        Két tiltás egyszerre. A <strong>páros gyök alatt</strong> nemnegatív szám kell:{" "}
        <M>{`${linearis(a, b)} \\ge 0`}</M>. A <strong>nevező</strong> nem lehet nulla:{" "}
        <M>{`x \\ne ${c}`}</M>. A kettő metszete a D<sub>f</sub>.
      </p>
    ),
    mezok: [
      {
        id: "bal",
        cimke: "Az értelmezési tartomány bal végpontja",
        helyes: r,
        tizedes: 2,
        tures: 0.01,
      },
      { id: "ki", cimke: "A kizárt (tiltott) pont", helyes: c, tizedes: 2, tures: 0.01 },
      { id: "ert", cimke: `f(${x1}) értéke (3 tizedes)`, helyes: ertek, tizedes: 3 },
    ],
    megoldas: (
      <>
        <p>
          <strong>Gyök:</strong>{" "}
          <M>{`${linearis(a, b)} \\ge 0 \\iff ${tag(a, "x", true)} \\ge ${-b} \\iff x \\ge ${r}`}</M>.
        </p>
        <p>
          <strong>Nevező:</strong> <M>{`x${tag(-c)} \\ne 0 \\iff x \\ne ${c}`}</M>.
        </p>
        <MB>{`D_f = [${r};\\ ${c}) \\cup (${c};\\ +\\infty)`}</MB>
        <MB>{`f(${x1}) = \\frac{\\sqrt{${a * x1 + b}}}{${x1 - c}} = ${szK(ertek, 4)}`}</MB>
        <p>
          Figyelj: a bal végpont <strong>beletartozik</strong> (a gyök alatt a 0 is megengedett), a
          kizárt pont viszont <strong>nem</strong> — ott a nevező nulla.
        </p>
      </>
    ),
  };
}

/* ---------- 2. Inverz függvény ---------- */

function inverzFeladat() {
  let a;
  let b;
  let c;
  let d;
  do {
    a = nemNulla(-4, 4);
    b = egesz(-6, 6);
    c = valaszt([1, 2]);
    d = nemNulla(-6, 6);
  } while (a * d - b * c === 0);

  const kizartF = -d / c; // f-ből kizárt
  const kizartI = a / c; // f⁻¹-ből kizárt
  // f⁻¹(x) = (b − d x) / (c x − a)
  let t = egesz(-4, 4);
  while (Math.abs(c * t - a) < 1e-9) t += 1;
  const ertek = (b - d * t) / (c * t - a);

  return {
    szoveg: (
      <p>
        Add meg az <M>{`f(x) = \\dfrac{${linearis(a, b)}}{${linearis(c, d)}}`}</M> függvény inverzét,
        és olvasd le belőle a kért adatokat.
      </p>
    ),
    sugo: (
      <p>
        Írd fel az <M>{"y = f(x)"}</M> egyenletet, szorozz fel a nevezővel, gyűjtsd össze az{" "}
        <M>{"x"}</M>-es tagokat, majd emelj ki <M>{"x"}</M>-et. A betűcsere csak a végén jön — és ne
        feledd: <M>{"D_{f^{-1}} = R_f"}</M>, <M>{"R_{f^{-1}} = D_f"}</M>.
      </p>
    ),
    mezok: [
      { id: "kf", cimke: "Az f-ből kizárt pont", helyes: kizartF, tizedes: 3, tures: 0.01 },
      { id: "ki", cimke: "Az f⁻¹-ből kizárt pont", helyes: kizartI, tizedes: 3, tures: 0.01 },
      { id: "ert", cimke: `f⁻¹(${t}) értéke (3 tizedes)`, helyes: ertek, tizedes: 3 },
    ],
    megoldas: (
      <>
        <MB>{`y = \\frac{${linearis(a, b)}}{${linearis(c, d)}} \\ \\Longrightarrow\\ y\\left(${linearis(c, d)}\\right) = ${linearis(a, b)}`}</MB>
        <MB>{`${tag(c, "xy", true)}${tag(d, "y")} = ${linearis(a, b)}`}</MB>
        <MB>{`x\\left(${tag(c, "y", true)}${tag(-a)}\\right) = ${tag(-d, "y", true)}${tag(b)} \\ \\Longrightarrow\\ x = \\frac{${tag(-d, "y", true)}${tag(b)}}{${tag(c, "y", true)}${tag(-a)}}`}</MB>
        <MB>{`f^{-1}(x) = \\frac{${tag(-d, "x", true)}${tag(b)}}{${tag(c, "x", true)}${tag(-a)}}`}</MB>
        <p>
          Az <M>{"f"}</M> nevezője a <M>{`x = ${szK(kizartF, 3)}`}</M> helyen nulla, az{" "}
          <M>{"f^{-1}"}</M> nevezője pedig a <M>{`x = ${szK(kizartI, 3)}`}</M> helyen — és ez utóbbi
          épp az <M>{"f"}</M> értékkészletéből hiányzó érték.
        </p>
        <MB>{`f^{-1}\\left(${t}\\right) = \\frac{${-d}\\cdot\\left(${t}\\right)${tag(b)}}{${c}\\cdot\\left(${t}\\right)${tag(-a)}} = \\frac{${b - d * t}}{${c * t - a}} = ${szK(ertek, 4)}`}</MB>
      </>
    ),
  };
}

/* ---------- 3. Gyöktelenítéses határérték ---------- */

function gyoktelenitesFeladat() {
  if (Math.random() < 0.55) {
    // (√(x + k²) − k) / x  →  1/(2k)
    const k = egesz(2, 7);
    const A = 1 / (2 * k);
    const f1 = Math.sqrt(1 + k * k) - k;
    return {
      szoveg: (
        <p>
          Számítsd ki gyöktelenítéssel:
          <MB>{`\\lim_{x\\to 0}\\frac{\\sqrt{x+${k * k}}-${k}}{x}`}</MB>
          és add meg a függvény értékét az <M>{"x = 1"}</M> helyen is.
        </p>
      ),
      sugo: (
        <p>
          <M>{"\\frac00"}</M> alak. Bővíts a konjugálttal, azaz szorozd a számlálót és a nevezőt is{" "}
          <M>{`\\left(\\sqrt{x+${k * k}}+${k}\\right)`}</M>-vel. A számlálóban az{" "}
          <M>{"(a-b)(a+b) = a^2-b^2"}</M> azonosság miatt eltűnik a gyök.
        </p>
      ),
      mezok: [
        { id: "A", cimke: "A határérték (4 tizedes)", helyes: A, tizedes: 4 },
        { id: "f1", cimke: "A függvény értéke x = 1-nél (4 tizedes)", helyes: f1, tizedes: 4 },
      ],
      megoldas: (
        <>
          <MB>{`\\frac{\\sqrt{x+${k * k}}-${k}}{x} = \\frac{(x+${k * k})-${k * k}}{x\\left(\\sqrt{x+${k * k}}+${k}\\right)} = \\frac{1}{\\sqrt{x+${k * k}}+${k}}`}</MB>
          <p>
            Az egyszerűsítés jogos, mert a határérték számolásakor <M>{"x \\ne 0"}</M>. Az új alakba a
            0 már behelyettesíthető:
          </p>
          <MB>{`\\frac{1}{\\sqrt{${k * k}}+${k}} = \\frac{1}{${2 * k}} = ${szK(A, 5)}`}</MB>
          <MB>{`f(1) = \\frac{\\sqrt{${1 + k * k}}-${k}}{1} = ${szK(f1, 5)}`}</MB>
        </>
      ),
    };
  }
  // √(x² + bx) − x  →  b/2   (x → ∞)
  const b = egesz(2, 9);
  const A = b / 2;
  const f100 = Math.sqrt(100 * 100 + b * 100) - 100;
  return {
    szoveg: (
      <p>
        Számítsd ki:
        <MB>{`\\lim_{x\\to \\infty}\\left(\\sqrt{x^2+${b}x}-x\\right)`}</MB>
        és add meg a kifejezés értékét az <M>{"x = 100"}</M> helyen is (4 tizedes).
      </p>
    ),
    sugo: (
      <p>
        <M>{"\\infty-\\infty"}</M> alak: bővíts a konjugálttal. A gyökök kiesése után osztás{" "}
        <M>{"x"}</M>-szel — de a gyökjel alatt <strong>x²-tel</strong>!
      </p>
    ),
    mezok: [
      { id: "A", cimke: "A határérték (3 tizedes)", helyes: A, tizedes: 3 },
      { id: "f", cimke: "Az érték x = 100-nál (4 tizedes)", helyes: f100, tizedes: 4 },
    ],
    megoldas: (
      <>
        <MB>{`\\sqrt{x^2+${b}x}-x = \\frac{\\left(x^2+${b}x\\right)-x^2}{\\sqrt{x^2+${b}x}+x} = \\frac{${b}x}{\\sqrt{x^2+${b}x}+x}`}</MB>
        <MB>{`= \\frac{${b}}{\\sqrt{1+\\frac{${b}}{x}}+1} \\longrightarrow \\frac{${b}}{1+1} = ${szK(A, 3)}`}</MB>
        <p>
          A közelítés lassú: <M>{`x = 100`}</M> esetén még csak <M>{szK(f100, 4)}</M> — a határérték
          viszont <M>{szK(A, 3)}</M>.
        </p>
      </>
    ),
  };
}

/* ---------- 4. Racionális tört határértéke ---------- */

function racionalisFeladat() {
  const a = nemNulla(-6, 6);
  const d = egesz(1, 6);
  const b = egesz(-8, 8);
  const c = egesz(-8, 8);
  const e = egesz(-9, 9);
  const k = egesz(2, 7);
  const A = a / d;
  const B = 2 * k;

  const szamlaloL = `${tag(a, "x^2", true)}${tag(b, "x")}${tag(c)}` || "0";
  const nevezoL = `${tag(d, "x^2", true)}${tag(e)}` || "0";

  return {
    szoveg: (
      <p>
        Két határérték, két módszer:
        <MB>{`\\lim_{x\\to\\infty}\\frac{${szamlaloL}}{${nevezoL}} \\qquad\\text{és}\\qquad \\lim_{x\\to ${k}}\\frac{x^2-${k * k}}{x-${k}}`}</MB>
      </p>
    ),
    sugo: (
      <p>
        Az elsőnél <strong>oszd el minden tagot</strong> a nevező legmagasabb fokú tagjával{" "}
        <M>{"(x^2)"}</M>: minden <M>{"1/x^k"}</M> alakú tag nullához tart, és marad a főegyütthatók
        hányadosa. A másodiknál <M>{"\\frac00"}</M> alak van: <strong>szorzattá alakítás</strong>{" "}
        <M>{"(a^2-b^2)"}</M>, majd egyszerűsítés.
      </p>
    ),
    mezok: [
      { id: "A", cimke: "Az első határérték (4 tizedes)", helyes: A, tizedes: 4 },
      { id: "B", cimke: "A második határérték", helyes: B, tizedes: 2, tures: 0.01 },
    ],
    megoldas: (
      <>
        <MB>{`\\frac{${szamlaloL}}{${nevezoL}} = \\frac{${a}${osztottTag(b, 1)}${osztottTag(c, 2)}}{${d}${osztottTag(e, 2)}} \\longrightarrow \\frac{${a}}{${d}} = ${szK(A, 4)}`}</MB>
        <p>
          Azonos fokszám esetén a válasz mindig a <strong>főegyütthatók hányadosa</strong> — a
          levezetést viszont írd le, az eredmény önmagában nem megoldás.
        </p>
        <MB>{`\\frac{x^2-${k * k}}{x-${k}} = \\frac{(x-${k})(x+${k})}{x-${k}} = x+${k} \\longrightarrow ${B}`}</MB>
      </>
    ),
  };
}

/* ---------- 5. Nevezetes határértékek ---------- */

function nevezetesFeladat() {
  const a = egesz(1, 5);
  let b = egesz(1, 5);
  while (b === a) b = egesz(1, 5);
  const c = egesz(1, 3);
  const d = egesz(1, 2);
  const A = a / b;
  const B = Math.exp(c * d);

  const ax = `${szorzo(a)}x`;
  const bx = `${szorzo(b)}x`;
  const dx = `${szorzo(d)}x`;
  // a „kicsi” reciproka: c = 1 esetén egyszerűen x
  const belso =
    c === 1
      ? "\\left(1+\\frac1x\\right)^{x}"
      : `\\left(1+\\frac{1}{x/${c}}\\right)^{x/${c}}`;

  return {
    szoveg: (
      <p>
        Nevezetes határértékek — alakítsd a kifejezést pontosan a képlet alakjára:
        <MB>{`\\lim_{x\\to 0}\\frac{\\sin ${ax}}{\\sin ${bx}} \\qquad\\text{és}\\qquad \\lim_{x\\to\\infty}\\left(1+\\frac{${c}}{x}\\right)^{${dx}}`}</MB>
      </p>
    ),
    sugo: (
      <p>
        Az elsőnél bővíts úgy, hogy mindkét szinusz mellett a <em>saját</em> argumentuma álljon a
        nevezőben: <M>{`\\frac{\\sin ${ax}}{${ax}}`}</M> és <M>{`\\frac{\\sin ${bx}}{${bx}}`}</M>. A
        másodiknál a „kicsi” rész <M>{`\\frac{${c}}{x}`}</M>, ennek reciproka{" "}
        <M>{`\\frac{x}{${c}}`}</M> — ezt kell a kitevőben megjeleníteni.
      </p>
    ),
    mezok: [
      { id: "A", cimke: "Az első határérték (4 tizedes)", helyes: A, tizedes: 4 },
      { id: "B", cimke: "A második határérték (3 tizedes)", helyes: B, tizedes: 3 },
    ],
    megoldas: (
      <>
        <MB>{`\\frac{\\sin ${ax}}{\\sin ${bx}} = \\frac{${a}}{${b}}\\cdot\\frac{\\dfrac{\\sin ${ax}}{${ax}}}{\\dfrac{\\sin ${bx}}{${bx}}} \\longrightarrow \\frac{${a}}{${b}}\\cdot\\frac11 = ${szK(A, 5)}`}</MB>
        <MB>{`\\left(1+\\frac{${c}}{x}\\right)^{${dx}} = \\left[${belso}\\right]^{${c * d}} \\longrightarrow e^{${c * d}} = ${szK(B, 4)}`}</MB>
        <p>
          A kitevőt azért írhatjuk át, mert <M>{`${dx} = \\frac{x}{${c}}\\cdot ${c * d}`}</M>. A külső
          kitevő határértéke lesz az <M>{"e"}</M> kitevője — ezt a lépést szokták elhagyni, és ezért
          jön ki <M>{"e"}</M> az <M>{`e^{${c * d}}`}</M> helyett.
        </p>
      </>
    ),
  };
}

/* ---------- a szekció ---------- */

export const GENERATOROK = [
  { cim: "Értelmezési tartomány — gyök és nevező", fn: ertelmezesFeladat },
  { cim: "Inverz függvény", fn: inverzFeladat },
  { cim: "Gyöktelenítéses határérték", fn: gyoktelenitesFeladat },
  { cim: "Racionális tört határértéke", fn: racionalisFeladat },
  { cim: "Nevezetes határértékek", fn: nevezetesFeladat },
];

export default function GyakorloSzekcio() {
  return (
    <div>
      <GyakorloDoboz
        cim="Értelmezési tartomány — gyök és nevező"
        leiras="A négy tiltás közül itt kettő is szerepel. A bal végpont beletartozik, a kizárt pont nem."
        generator={ertelmezesFeladat}
        oszlopok={3}
      />
      <GyakorloDoboz
        cim="Inverz függvény"
        leiras="Fejezd ki x-et, majd add meg az inverz értelmezési tartományát is — ezen szokott a legtöbb pont múlni."
        generator={inverzFeladat}
        oszlopok={3}
      />
      <GyakorloDoboz
        cim="Gyöktelenítéses határérték"
        leiras="Bővítés a konjugálttal: az (a−b)(a+b) = a²−b² azonosság kiejti a gyököt."
        generator={gyoktelenitesFeladat}
      />
      <GyakorloDoboz
        cim="Racionális tört határértéke"
        leiras="A végtelenben a domináns taggal osztunk; véges helyen szorzattá alakítunk és egyszerűsítünk."
        generator={racionalisFeladat}
      />
      <GyakorloDoboz
        cim="Nevezetes határértékek"
        leiras={
          <>
            A képlet csak <em>pontosan</em> abban az alakban használható, ahogy megtanultad — igazítsd
            hozzá a kifejezést.
          </>
        }
        generator={nevezetesFeladat}
      />
    </div>
  );
}
