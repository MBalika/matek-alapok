"use client";

import GyakorloDoboz from "@/components/GyakorloDoboz";
import { M, MB } from "@/components/ui/Keplet";
import { szK } from "@/lib/szamok";

const egesz = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
const valaszt = (tomb) => tomb[Math.floor(Math.random() * tomb.length)];

/** Polinom LaTeX-alakja a legmagasabb fokú tagtól. */
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

const egyutt = (c, kif) => (c === 1 ? kif : `${c}\\cdot ${kif}`);

/* ---------- 1. Rekurzív sorozat határértéke ---------- */

function rekurzioFeladat() {
  if (Math.random() < 0.55) {
    // a_{n+1} = √(p + a_n),  p = k(k−1) → a határérték k
    const k = egesz(2, 6);
    const p = k * (k - 1);
    const a1 = 1;
    const a2 = Math.sqrt(p + a1);
    return {
      szoveg: (
        <p>
          Legyen <M>{`a_1 = ${a1}`}</M> és <M>{`a_{n+1} = \\sqrt{${p} + a_n}`}</M>. A sorozat monoton növő és felülről
          korlátos, tehát konvergens. Add meg <M>{"a_2"}</M>-t és a határértéket (3 tizedesre)!
        </p>
      ),
      sugo: (
        <p>
          A konvergencia adott, ezért felírhatod a fixpont-egyenletet: a rekurzió mindkét oldalán határértéket véve{" "}
          <M>{`A = \\sqrt{${p}+A}`}</M>. Négyzetre emelve másodfokú egyenletet kapsz — a <strong>pozitív</strong> gyök kell.
        </p>
      ),
      mezok: [
        { id: "a2", cimke: "a₂", helyes: a2, tizedes: 3 },
        { id: "A", cimke: "A határérték", helyes: k, tizedes: 3 },
      ],
      megoldas: (
        <>
          <MB>{`a_2 = \\sqrt{${p}+${a1}} = \\sqrt{${p + a1}} = ${szK(a2, 4)}`}</MB>
          <MB>{`A = \\sqrt{${p}+A} \\ \\Rightarrow\\ A^2 = ${p} + A \\ \\Rightarrow\\ A^2 - A - ${p} = 0`}</MB>
          <MB>{`A_{1,2} = \\frac{1 \\pm \\sqrt{1+${4 * p}}}{2} = \\frac{1 \\pm ${2 * k - 1}}{2} \\ \\Rightarrow\\ A = ${k} \\ \\text{vagy} \\ A = ${1 - k}`}</MB>
          <p>
            A negatív gyök kizárva, mert minden tag pozitív. A határérték <M>{`${k}`}</M>. Ellenőrzés: a fixpontnál{" "}
            <M>{`\\sqrt{${p}+${k}} = \\sqrt{${p + k}} = ${k}`}</M> ✓
          </p>
        </>
      ),
    };
  }
  // a_{n+1} = (a_n + c/a_n)/2 → √c  (Newton–Héron)
  const c = valaszt([2, 3, 4, 5, 6, 7, 9, 10, 16]);
  const a1 = c;
  const a2 = (a1 + c / a1) / 2;
  const A = Math.sqrt(c);
  return {
    szoveg: (
      <p>
        Legyen <M>{`a_1 = ${a1}`}</M> és <M>{`a_{n+1} = \\frac12\\left(a_n + \\frac{${c}}{a_n}\\right)`}</M>. A sorozat
        monoton csökkenő és alulról korlátos, tehát konvergens. Add meg <M>{"a_2"}</M>-t és a határértéket (3 tizedesre)!
      </p>
    ),
    sugo: (
      <p>
        A fixpont-egyenlet: <M>{`A = \\frac12\\left(A + \\frac{${c}}{A}\\right)`}</M>. Szorozz be{" "}
        <M>{"2A"}</M>-val, és rendezd. Ez a Newton–Héron-módszer a négyzetgyök kiszámítására.
      </p>
    ),
    mezok: [
      { id: "a2", cimke: "a₂", helyes: a2, tizedes: 3 },
      { id: "A", cimke: "A határérték", helyes: A, tizedes: 3 },
    ],
    megoldas: (
      <>
        <MB>{`a_2 = \\frac12\\left(${a1} + \\frac{${c}}{${a1}}\\right) = ${szK(a2, 4)}`}</MB>
        <MB>{`A = \\frac12\\left(A+\\frac{${c}}{A}\\right) \\ \\Rightarrow\\ 2A^2 = A^2 + ${c} \\ \\Rightarrow\\ A^2 = ${c} \\ \\Rightarrow\\ A = \\sqrt{${c}} = ${szK(A, 5)}`}</MB>
        <p>
          A negatív gyök kizárva (minden tag pozitív). A konvergencia rendkívül gyors: már a negyedik tag hat tizedesjegyre
          pontos.
        </p>
      </>
    ),
  };
}

/* ---------- 2. Mértani/hatványos hányados ---------- */

function mertaniFeladat() {
  if (Math.random() < 0.5) {
    // (p·qⁿ + r)/(s·qⁿ + t) → p/s,  q > 1
    const q = egesz(2, 5);
    const p = egesz(1, 6);
    const r = egesz(1, 9);
    const s = egesz(1, 6);
    const t = egesz(1, 9);
    const A = p / s;
    return {
      szoveg: (
        <p>
          Számítsd ki a határértéket (3 tizedesre):
          <MB>{`\\lim_{n\\to\\infty}\\frac{${egyutt(p, `${q}^n`)} + ${r}}{${egyutt(s, `${q}^n`)} + ${t}}`}</MB>
        </p>
      ),
      sugo: (
        <p>
          A domináns tag <M>{`${q}^n`}</M> (mert <M>{`${q} > 1`}</M>). Ossz el mindent ezzel: a konstansok{" "}
          <M>{`\\frac{c}{${q}^n}`}</M> alakban nullához tartanak.
        </p>
      ),
      mezok: [{ id: "A", cimke: "A határérték", helyes: A, tizedes: 3 }],
      megoldas: (
        <>
          <MB>{`\\frac{${egyutt(p, `${q}^n`)} + ${r}}{${egyutt(s, `${q}^n`)} + ${t}} = \\frac{${p} + \\frac{${r}}{${q}^n}}{${s} + \\frac{${t}}{${q}^n}} \\longrightarrow \\frac{${p}+0}{${s}+0} = ${szK(A, 4)}`}</MB>
          <p>
            Ugyanaz a gondolat, mint a polinomoknál: <strong>a legerősebb taggal osztunk</strong>. Itt a legerősebb az
            exponenciális.
          </p>
        </>
      ),
    };
  }
  // (p + r·(1/m)ⁿ)/(s + t·(1/m)ⁿ) → p/s,  |q| < 1
  const m = egesz(2, 5);
  const p = egesz(1, 6);
  const r = egesz(1, 8);
  const s = egesz(1, 6);
  const t = egesz(1, 8);
  const A = p / s;
  return {
    szoveg: (
      <p>
        Számítsd ki a határértéket (3 tizedesre):
        <MB>{`\\lim_{n\\to\\infty}\\frac{${p} + ${egyutt(r, `\\left(\\frac{1}{${m}}\\right)^{n}`)}}{${s} + ${egyutt(t, `\\left(-\\frac{1}{${m}}\\right)^{n}`)}}`}</MB>
      </p>
    ),
    sugo: (
      <p>
        Itt nincs szükség osztásra: mindkét mértani sorozat hányadosának abszolút értéke{" "}
        <M>{`\\frac{1}{${m}} < 1`}</M>, tehát mindkettő <strong>nullához tart</strong> — az előjelváltás sem számít.
      </p>
    ),
    mezok: [{ id: "A", cimke: "A határérték", helyes: A, tizedes: 3 }],
    megoldas: (
      <>
        <MB>{`\\left|\\frac{1}{${m}}\\right| < 1 \\ \\Rightarrow\\ \\left(\\frac{1}{${m}}\\right)^{n} \\to 0, \\qquad \\left(-\\frac{1}{${m}}\\right)^{n} \\to 0`}</MB>
        <MB>{`\\lim_{n\\to\\infty}\\frac{${p} + ${egyutt(r, `\\left(\\frac{1}{${m}}\\right)^{n}`)}}{${s} + ${egyutt(t, `\\left(-\\frac{1}{${m}}\\right)^{n}`)}} = \\frac{${p}+0}{${s}+0} = ${szK(A, 4)}`}</MB>
        <p>
          A <M>{"q^n \\to 0"}</M> feltétele <M>{"|q| < 1"}</M>, nem <M>{"q < 1"}</M> — a negatív alap itt is nullához visz,
          mert az abszolút értéke kicsi.
        </p>
      </>
    ),
  };
}

/* ---------- 3. Monotonitás, korlátosság, szuprémum ---------- */

function monotonFeladat() {
  const a = egesz(1, 6);
  const c = egesz(1, 6);
  let b = egesz(-8, 12);
  while (b - a * c === 0) b = egesz(-8, 12);
  const K = b - a * c; // a_n = a + K/(n+c)
  const no = K < 0; // K < 0 → a K/(n+c) tag nő (negatívból közelít 0-hoz) → a sorozat nő
  const a1 = (a * 1 + b) / (1 + c);
  const A = a;
  const szup = no ? A : a1;

  return {
    szoveg: (
      <p>
        Vizsgáld az <M>{`a_n = \\frac{${polinom([a, b])}}{${polinom([1, c])}}`}</M> sorozatot. Add meg az első tagot, a
        határértéket és a sorozat <strong>szuprémumát</strong> (legkisebb felső korlátját) — mindet 3 tizedesre!
      </p>
    ),
    sugo: (
      <p>
        Polinomosztással <M>{`a_n = ${a} + \\frac{${K}}{${polinom([1, c])}}`}</M>. Ebből a monotonitás azonnal látszik: a{" "}
        <M>{`\\frac{${K}}{n+${c}}`}</M> tag abszolút értéke csökken. Ha a sorozat <strong>nő</strong>, a szuprémum a
        határérték (nem veszi fel); ha <strong>csökken</strong>, a szuprémum az első tag.
      </p>
    ),
    mezok: [
      { id: "a1", cimke: "a₁", helyes: a1, tizedes: 3 },
      { id: "A", cimke: "A határérték", helyes: A, tizedes: 3 },
      { id: "sup", cimke: "szuprémum", helyes: szup, tizedes: 3 },
    ],
    megoldas: (
      <>
        <MB>{`a_n = \\frac{${polinom([a, b])}}{${polinom([1, c])}} = \\frac{${a}\\left(${polinom([1, c])}\\right) ${K >= 0 ? "+" : "-"} ${Math.abs(K)}}{${polinom([1, c])}} = ${a} + \\frac{${K}}{${polinom([1, c])}}`}</MB>
        <MB>{`a_1 = \\frac{${a + b}}{${1 + c}} = ${szK(a1, 4)}, \\qquad \\lim_{n\\to\\infty} a_n = ${a}`}</MB>
        <p>
          A <M>{`\\frac{${K}}{n+${c}}`}</M> tag {K > 0 ? "pozitív és csökken" : "negatív és nő (0-hoz)"}, tehát a sorozat{" "}
          <strong>{no ? "szigorúan monoton növő" : "szigorúan monoton csökkenő"}</strong>. Ezért{" "}
          {no ? (
            <>
              a legkisebb tag az <M>{"a_1"}</M> (ez az infimum, fel is veszi), a szuprémum pedig a határérték,{" "}
              <M>{`${a}`}</M> — amelyet a sorozat soha nem ér el.
            </>
          ) : (
            <>
              a legnagyobb tag az <M>{"a_1"}</M>, tehát a szuprémum <M>{szK(a1, 4)}</M> (fel is veszi), az infimum pedig a
              határérték, <M>{`${a}`}</M>.
            </>
          )}
        </p>
        <MB>{`${no ? `${szK(a1, 4)} \\le a_n < ${a}` : `${a} < a_n \\le ${szK(a1, 4)}`}`}</MB>
      </>
    ),
  };
}

/* ---------- 4. Nullsorozat × korlátos, rendőrelv ---------- */

function korlatosFeladat() {
  if (Math.random() < 0.55) {
    // (a·n + b·(−1)ⁿ)/(c·n + d) → a/c
    const a = egesz(1, 6);
    const b = egesz(1, 6);
    const c = egesz(1, 5);
    const d = egesz(0, 8);
    const A = a / c;
    const a10 = (a * 10 + b) / (c * 10 + d);
    return {
      szoveg: (
        <p>
          Számítsd ki a határértéket és az <M>{"a_{10}"}</M> tagot (3 tizedesre):
          <MB>{`a_n = \\frac{${a === 1 ? "" : a}n + ${b === 1 ? "" : b}(-1)^n}{${c === 1 ? "" : c}n ${d === 0 ? "" : `+ ${d}`}}`}</MB>
        </p>
      ),
      sugo: (
        <p>
          A <M>{"(-1)^n"}</M> tag <strong>korlátos</strong>, de <M>{"n"}</M> mellett elhanyagolható. Ossz el mindent{" "}
          <M>{"n"}</M>-nel: a <M>{`\\frac{${b}(-1)^n}{n}`}</M> tag korlátos szorozva nullsorozattal, tehát nullához tart.
        </p>
      ),
      mezok: [
        { id: "A", cimke: "A határérték", helyes: A, tizedes: 3 },
        { id: "a10", cimke: "a₁₀", helyes: a10, tizedes: 3 },
      ],
      megoldas: (
        <>
          <MB>{`a_n = \\frac{${a} + \\frac{${b}(-1)^n}{n}}{${c} ${d === 0 ? "" : `+ \\frac{${d}}{n}`}} \\longrightarrow \\frac{${a}+0}{${c}+0} = ${szK(A, 4)}`}</MB>
          <p>
            Rendőrelvvel is megy:{" "}
            <M>{`\\frac{${a}n-${b}}{${c}n${d === 0 ? "" : `+${d}`}} \\le a_n \\le \\frac{${a}n+${b}}{${c}n${d === 0 ? "" : `+${d}`}}`}</M>
            , és mindkét szélső sorozat <M>{szK(A, 4)}</M>-hoz tart.
          </p>
          <MB>{`a_{10} = \\frac{${a * 10} + ${b}}{${c * 10 + d}} = ${szK(a10, 4)}`}</MB>
        </>
      ),
    };
  }
  // (a·n + b·sin n)/(c·n² + d)  → 0   vagy   (a·n + b·cos n)/(c·n + d) → a/c
  const nullara = Math.random() < 0.5;
  const a = egesz(1, 6);
  const b = egesz(1, 6);
  const c = egesz(1, 5);
  const d = egesz(1, 9);
  const A = nullara ? 0 : a / c;
  return {
    szoveg: (
      <p>
        Számítsd ki a határértéket (3 tizedesre):
        <MB>{`\\lim_{n\\to\\infty}\\frac{${a === 1 ? "" : a}n + ${b === 1 ? "" : b}\\sin n}{${c === 1 ? "" : c}n^{${nullara ? 2 : 1}} + ${d}}`}</MB>
      </p>
    ),
    sugo: (
      <p>
        A <M>{"\\sin n"}</M> sorozat divergens, de <strong>korlátos</strong>: <M>{"|\\sin n| \\le 1"}</M>. Ezért a
        határértéket a polinomiális részek fokszáma dönti el, pontosan úgy, mint egy polinom per polinomnál.
      </p>
    ),
    mezok: [{ id: "A", cimke: "A határérték", helyes: A, tizedes: 3 }],
    megoldas: (
      <>
        <MB>{
          nullara
            ? `\\frac{${a}n + ${b}\\sin n}{${c}n^{2} + ${d}} = \\frac{\\frac{${a}}{n} + \\frac{${b}\\sin n}{n^{2}}}{${c} + \\frac{${d}}{n^{2}}} \\longrightarrow \\frac{0+0}{${c}+0} = 0`
            : `\\frac{${a}n + ${b}\\sin n}{${c}n + ${d}} = \\frac{${a} + \\frac{${b}\\sin n}{n}}{${c} + \\frac{${d}}{n}} \\longrightarrow \\frac{${a}+0}{${c}+0} = ${szK(A, 4)}`
        }</MB>
        <p>
          {nullara ? (
            <>
              A nevező fokszáma nagyobb, tehát a határérték <strong>0</strong>. A <M>{"\\sin n"}</M> tag nem számít: korlátos
              sorozat szorozva nullsorozattal nullsorozat.
            </>
          ) : (
            <>
              Azonos fokszám: a határérték a főegyütthatók hányadosa, <M>{`\\frac{${a}}{${c}} = ${szK(A, 4)}`}</M>. A{" "}
              <M>{"\\sin n"}</M> tag eltűnik, mert <M>{`\\left|\\frac{${b}\\sin n}{n}\\right| \\le \\frac{${b}}{n} \\to 0`}</M>.
            </>
          )}
        </p>
      </>
    ),
  };
}

export const EXTRA_GENERATOROK = [
  { cim: "Rekurzív sorozat határértéke", fn: rekurzioFeladat },
  { cim: "Mértani hányados", fn: mertaniFeladat },
  { cim: "Monotonitás, korlátosság, szuprémum", fn: monotonFeladat },
  { cim: "Nullsorozat × korlátos, rendőrelv", fn: korlatosFeladat },
];

export default function GyakorloExtra() {
  return (
    <div>
      {EXTRA_GENERATOROK.map((g) => (
        <GyakorloDoboz key={g.cim} cim={g.cim} generator={g.fn} />
      ))}
    </div>
  );
}
