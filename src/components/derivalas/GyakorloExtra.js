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

/* ================= 1. Globális szélsőérték zárt intervallumon ================= */

function globalisFeladat() {
  if (Math.random() < 0.5) {
    // másodfokú
    const b = nemNulla(-8, 8);
    const c = egesz(-6, 6);
    const p = egesz(-8, -2);
    const q = egesz(2, 9);
    const csucs = -b / 2;
    const jeloltek = [
      { x: p, y: p * p + b * p + c, mi: "bal végpont" },
      { x: q, y: q * q + b * q + c, mi: "jobb végpont" },
    ];
    if (csucs > p && csucs < q) jeloltek.push({ x: csucs, y: csucs * csucs + b * csucs + c, mi: "stacionárius pont" });
    const max = jeloltek.reduce((u, v) => (v.y > u.y ? v : u));
    const min = jeloltek.reduce((u, v) => (v.y < u.y ? v : u));

    return {
      szoveg: (
        <p>
          Mennyi a függvény legnagyobb és legkisebb értéke a <M>{`\\left[${p};\\, ${q}\\right]`}</M> zárt
          intervallumon? Add meg 3 tizedesre.
          <MB>{`f(x) = ${polinom([1, b, c])}`}</MB>
        </p>
      ),
      sugo: (
        <p>
          Három helyen lehet globális szélsőérték: <strong>stacionárius pontban</strong> (<M>{"f'=0"}</M>), ahol{" "}
          <M>{"f"}</M> nem differenciálható, és az intervallum <strong>végpontjaiban</strong>. Itt{" "}
          <M>{`f'(x) = ${polinom([2, b])}`}</M>, tehát a stacionárius hely <M>{`x = ${szK(csucs, 2)}`}</M> — ha
          beleesik az intervallumba. Utána csak össze kell hasonlítani a függvényértékeket.
        </p>
      ),
      mezok: [
        { id: "max", cimke: "A legnagyobb érték", helyes: max.y, tizedes: 3 },
        { id: "min", cimke: "A legkisebb érték", helyes: min.y, tizedes: 3 },
      ],
      megoldas: (
        <>
          <MB>{`f'(x) = ${polinom([2, b])} = 0 \\ \\Longrightarrow\\ x = ${szK(csucs, 2)}`}</MB>
          <p>A gyanús helyeken felvett értékek:</p>
          <ul className="list-disc pl-5">
            {jeloltek.map((j) => (
              <li key={j.mi}>
                <M>{`f(${szK(j.x, 2)}) = ${szK(j.y, 3)}`}</M> — {j.mi}
              </li>
            ))}
          </ul>
          <p>
            A legnagyobb érték <M>{szK(max.y, 3)}</M> ({max.mi}), a legkisebb <M>{szK(min.y, 3)}</M> ({min.mi}).
          </p>
        </>
      ),
    };
  }

  // harmadfokú: x³ − 3k²x + m
  const k = egesz(1, 3);
  const m = egesz(-5, 5);
  const p = egesz(-5, -k);
  const q = egesz(k, 5);
  const fn = (x) => x * x * x - 3 * k * k * x + m;
  const jeloltek = [
    { x: p, y: fn(p), mi: "bal végpont" },
    { x: q, y: fn(q), mi: "jobb végpont" },
  ];
  [-k, k].forEach((x) => {
    if (x > p && x < q) jeloltek.push({ x, y: fn(x), mi: "stacionárius pont" });
  });
  const max = jeloltek.reduce((u, v) => (v.y > u.y ? v : u));
  const min = jeloltek.reduce((u, v) => (v.y < u.y ? v : u));

  return {
    szoveg: (
      <p>
        Mennyi a függvény legnagyobb és legkisebb értéke a <M>{`\\left[${p};\\, ${q}\\right]`}</M> zárt
        intervallumon?
        <MB>{`f(x) = ${polinom([1, 0, -3 * k * k, m])}`}</MB>
      </p>
    ),
    sugo: (
      <p>
        <M>{`f'(x) = ${polinom([3, 0, -3 * k * k])} = 0 \\Rightarrow x = \\pm ${k}`}</M>. Nézd meg, melyik esik az
        intervallumba, és hasonlítsd össze a függvényértékeket a <strong>végpontokban is</strong> — harmadfokúnál a
        végpont majdnem mindig „nyer”.
      </p>
    ),
    mezok: [
      { id: "max", cimke: "A legnagyobb érték", helyes: max.y, tizedes: 0, tures: 0.01 },
      { id: "min", cimke: "A legkisebb érték", helyes: min.y, tizedes: 0, tures: 0.01 },
    ],
    megoldas: (
      <>
        <MB>{`f'(x) = ${polinom([3, 0, -3 * k * k])} = 3\\left(x^2 - ${k * k}\\right) \\Rightarrow x = \\pm ${k}`}</MB>
        <ul className="list-disc pl-5">
          {jeloltek.map((j) => (
            <li key={`${j.x}`}>
              <M>{`f(${j.x}) = ${j.y}`}</M> — {j.mi}
            </li>
          ))}
        </ul>
        <p>
          Legnagyobb: <M>{`${max.y}`}</M> ({max.mi}) · legkisebb: <M>{`${min.y}`}</M> ({min.mi}).
        </p>
      </>
    ),
  };
}

/* ================= 2. Inflexiós pont ================= */

function inflexioFeladat() {
  if (Math.random() < 0.55) {
    // negyedfokú: f'' = 12(x−r1)(x−r2)
    let r1 = egesz(-3, 2);
    let r2 = egesz(-2, 3);
    if (r1 === r2) r2 = r1 + 1;
    if (r1 > r2) [r1, r2] = [r2, r1];
    const a = -2 * (r1 + r2); // az x³ együtthatója
    const b = 6 * r1 * r2; // az x² együtthatója
    const c = egesz(-4, 4);
    const egyutt = [1, a, b, c, 0];

    return {
      szoveg: (
        <p>
          Hol vannak a függvény inflexiós pontjai? Add meg a két helyet (a kisebbiket előbb).
          <MB>{`f(x) = ${polinom(egyutt)}`}</MB>
        </p>
      ),
      sugo: (
        <p>
          Kétszer deriválj: <M>{`f''(x) = ${polinom([12, 6 * a, 2 * b])}`}</M>. Az inflexióhoz{" "}
          <strong>nem elég</strong>, hogy <M>{"f''=0"}</M> — kell az előjelváltás is. Itt a másodfokú kifejezésnek két
          különböző gyöke van, tehát mindkettőnél vált.
        </p>
      ),
      mezok: [
        { id: "x1", cimke: "Az első inflexiós hely", helyes: r1, tizedes: 0, tures: 0.01 },
        { id: "x2", cimke: "A második inflexiós hely", helyes: r2, tizedes: 0, tures: 0.01 },
      ],
      megoldas: (
        <>
          <MB>{`f'(x) = ${polinom([4, 3 * a, 2 * b, c])}`}</MB>
          <MB>{`f''(x) = ${polinom([12, 6 * a, 2 * b])} = 12\\left(x ${r1 >= 0 ? "-" : "+"} ${Math.abs(
            r1,
          )}\\right)\\left(x ${r2 >= 0 ? "-" : "+"} ${Math.abs(r2)}\\right)`}</MB>
          <p>
            A gyökök <M>{`${r1}`}</M> és <M>{`${r2}`}</M>; mivel egyszeres gyökök, a második derivált mindkettőnél{" "}
            <strong>előjelet vált</strong>, tehát mindkettő valódi inflexiós pont. (Kettős gyöknél — például{" "}
            <M>{"x^4"}</M> esetén a 0-ban — nem lenne az!)
          </p>
        </>
      ),
    };
  }

  // x·e^{−ax}
  const a = egesz(1, 4);
  const x0 = 2 / a;
  const y0 = x0 * Math.exp(-2);

  return {
    szoveg: (
      <p>
        Hol van a függvény inflexiós pontja, és mekkora ott a függvényérték? Mindkettőt 4 tizedesre add meg.
        <MB>{`f(x) = x\\,e^{-${a === 1 ? "" : a}x}`}</MB>
      </p>
    ),
    sugo: (
      <p>
        Szorzatszabály, majd még egyszer: <M>{`f'(x) = \\left(1-${a === 1 ? "" : a}x\\right)e^{-${
          a === 1 ? "" : a
        }x}`}</M>{" "}
        és <M>{`f''(x) = ${a}\\left(${a === 1 ? "" : a}x-2\\right)e^{-${a === 1 ? "" : a}x}`}</M>. Az exponenciális
        sosem nulla, tehát csak a zárójel számít.
      </p>
    ),
    mezok: [
      { id: "x", cimke: "Az inflexiós hely", helyes: x0, tizedes: 4, tures: 0.002 },
      { id: "y", cimke: "A függvényérték ott", helyes: y0, tizedes: 4, tures: 0.002 },
    ],
    megoldas: (
      <>
        <MB>{`f'(x) = e^{-${a === 1 ? "" : a}x} - ${a}x\\,e^{-${a === 1 ? "" : a}x} = \\left(1-${
          a === 1 ? "" : a
        }x\\right)e^{-${a === 1 ? "" : a}x}`}</MB>
        <MB>{`f''(x) = -${a}e^{-${a === 1 ? "" : a}x} - ${a}\\left(1-${a === 1 ? "" : a}x\\right)e^{-${
          a === 1 ? "" : a
        }x} = ${a}\\left(${a === 1 ? "" : a}x-2\\right)e^{-${a === 1 ? "" : a}x}`}</MB>
        <MB>{`${a === 1 ? "" : a}x-2 = 0 \\ \\Longrightarrow\\ x = \\frac{2}{${a}} = ${szK(x0, 4)}`}</MB>
        <MB>{`f\\left(${szK(x0, 4)}\\right) = ${szK(x0, 4)}\\cdot e^{-2} = ${szK(y0, 5)}`}</MB>
        <p>
          A zárójel előjelet vált, tehát valódi inflexió: előtte konkáv, utána konvex a görbe.
        </p>
      </>
    ),
  };
}

/* ================= 3. Lineáris közelítés ================= */

function kozelitesFeladat() {
  const tipus = valaszt(["gyok", "kobgyok", "sin"]);

  if (tipus === "gyok") {
    const n = egesz(4, 12);
    const d = valaszt([-2, -1, 1, 2]);
    const x0 = n * n;
    const kozelites = n + d / (2 * n);
    const pontos = Math.sqrt(x0 + d);
    const hiba = Math.abs(kozelites - pontos);

    return {
      szoveg: (
        <p>
          Becsüld meg lineáris közelítéssel (érintő menti közelítéssel) a <M>{`\\sqrt{${x0 + d}}`}</M> értékét! Add meg
          a közelítő értéket 4 tizedesre, és a valódi hibát <M>{"10^{-4}"}</M> egységekben, 2 tizedesre.
        </p>
      ),
      sugo: (
        <p>
          Válaszd <M>{"f(x)=\\sqrt x"}</M>-et, <M>{`x_0 = ${x0}`}</M>-t (ez négyzetszám!) és{" "}
          <M>{`\\Delta x = ${d}`}</M>-t. Ekkor <M>{`f(x_0) = ${n}`}</M> és{" "}
          <M>{`f'(x_0) = \\frac{1}{2\\sqrt{${x0}}} = \\frac{1}{${2 * n}}`}</M>.
        </p>
      ),
      mezok: [
        { id: "k", cimke: "A közelítő érték", helyes: kozelites, tizedes: 4, tures: 0.0005 },
        {
          id: "h",
          cimke: "A valódi hiba (10⁻⁴ egységben)",
          helyes: hiba * 1e4,
          tizedes: 2,
          tures: Math.max(0.15, hiba * 1e4 * 0.02),
        },
      ],
      megoldas: (
        <>
          <MB>{`f(x_0+\\Delta x) \\approx f(x_0) + f'(x_0)\\Delta x = ${n} + \\frac{${d}}{${
            2 * n
          }} = ${szK(kozelites, 5)}`}</MB>
          <MB>{`\\sqrt{${x0 + d}} = ${szK(pontos, 7)} \\ \\Longrightarrow\\ \\text{hiba} = ${szK(
            hiba,
            7,
          )} = ${szK(hiba * 1e4, 3)}\\cdot10^{-4}`}</MB>
          <p>
            A hiba nagyságrendje <M>{"(\\Delta x)^2"}</M>-tel arányos — ezért ilyen kicsi.
          </p>
        </>
      ),
    };
  }

  if (tipus === "kobgyok") {
    const n = egesz(2, 6);
    const d = valaszt([-0.2, -0.1, 0.1, 0.2, 0.3]);
    const x0 = n * n * n;
    const kozelites = n + d / (3 * n * n);
    const pontos = Math.cbrt(x0 + d);
    const hiba = Math.abs(kozelites - pontos);

    return {
      szoveg: (
        <p>
          Becsüld meg lineáris közelítéssel a <M>{`\\sqrt[3]{${szK(x0 + d, 1)}}`}</M> értékét! Add meg a közelítő
          értéket 5 tizedesre, és a valódi hibát <M>{"10^{-4}"}</M> egységekben, 2 tizedesre.
        </p>
      ),
      sugo: (
        <p>
          <M>{"f(x) = \\sqrt[3]{x} = x^{1/3}"}</M>, tehát <M>{"f'(x) = \\frac{1}{3\\sqrt[3]{x^2}}"}</M>. Válaszd{" "}
          <M>{`x_0 = ${x0}`}</M>-t (köbszám), <M>{`\\Delta x = ${szK(d, 1)}`}</M>-t; ekkor{" "}
          <M>{`f'(x_0) = \\frac{1}{${3 * n * n}}`}</M>.
        </p>
      ),
      mezok: [
        { id: "k", cimke: "A közelítő érték", helyes: kozelites, tizedes: 5, tures: 0.0002 },
        {
          id: "h",
          cimke: "A valódi hiba (10⁻⁴ egységben)",
          helyes: hiba * 1e4,
          tizedes: 2,
          tures: Math.max(0.15, hiba * 1e4 * 0.02),
        },
      ],
      megoldas: (
        <>
          <MB>{`\\sqrt[3]{${szK(x0 + d, 1)}} \\approx ${n} + \\frac{${szK(d, 1)}}{${
            3 * n * n
          }} = ${szK(kozelites, 6)}`}</MB>
          <MB>{`\\text{pontos} = ${szK(pontos, 7)} \\ \\Longrightarrow\\ \\text{hiba} = ${szK(
            hiba * 1e4,
            3,
          )}\\cdot10^{-4}`}</MB>
        </>
      ),
    };
  }

  // sin(30° + δ)
  const delta = valaszt([1, 2, 3, -1, -2, -3]);
  const rad = (delta * Math.PI) / 180;
  const kozelites = 0.5 + (Math.sqrt(3) / 2) * rad;
  const pontos = Math.sin(((30 + delta) * Math.PI) / 180);
  const hiba = Math.abs(kozelites - pontos);

  return {
    szoveg: (
      <p>
        Becsüld meg lineáris közelítéssel a <M>{`\\sin ${30 + delta}^\\circ`}</M> értékét a <M>{"30^\\circ"}</M>-ból
        kiindulva! Add meg a közelítő értéket 5 tizedesre, és a valódi hibát <M>{"10^{-4}"}</M> egységekben, 2
        tizedesre.
      </p>
    ),
    sugo: (
      <p>
        <strong>Radiánra kell váltani!</strong> <M>{"1^\\circ = \\frac{\\pi}{180} \\approx 0{,}017453"}</M> rad, tehát{" "}
        <M>{`\\Delta x = ${delta}\\cdot\\frac{\\pi}{180} = ${szK(rad, 6)}`}</M>. A képlet{" "}
        <M>{"\\sin(x_0+\\Delta x) \\approx \\sin x_0 + \\cos x_0\\cdot\\Delta x"}</M>.
      </p>
    ),
    mezok: [
      { id: "k", cimke: "A közelítő érték", helyes: kozelites, tizedes: 5, tures: 0.0002 },
      {
          id: "h",
          cimke: "A valódi hiba (10⁻⁴ egységben)",
          helyes: hiba * 1e4,
          tizedes: 2,
          tures: Math.max(0.15, hiba * 1e4 * 0.02),
        },
    ],
    megoldas: (
      <>
        <MB>{`\\sin ${30 + delta}^\\circ \\approx \\sin 30^\\circ + \\cos 30^\\circ\\cdot ${szK(
          rad,
          6,
        )} = 0{,}5 + 0{,}86603\\cdot ${szK(rad, 6)} = ${szK(kozelites, 6)}`}</MB>
        <MB>{`\\text{pontos} = ${szK(pontos, 7)} \\ \\Longrightarrow\\ \\text{hiba} = ${szK(
          hiba * 1e4,
          3,
        )}\\cdot10^{-4}`}</MB>
        <p>
          Fokban számolva a <M>{"(\\sin x)' = \\cos x"}</M> képlet <strong>nem érvényes</strong> — az eredmény
          57-szeres hibát adna.
        </p>
      </>
    ),
  };
}

/* ================= 4. Taylor-polinom értéke ================= */

const TAYLOR = [
  {
    nev: "e^x",
    fn: Math.exp,
    egy: (k) => {
      let p = 1;
      for (let i = 2; i <= k; i++) p *= i;
      return 1 / p;
    },
    sor: "e^x = 1+x+\\frac{x^2}{2!}+\\frac{x^3}{3!}+\\dots",
    fokok: [3, 4],
  },
  {
    nev: "\\sin x",
    fn: Math.sin,
    egy: (k) => (k === 1 ? 1 : k === 3 ? -1 / 6 : 0),
    sor: "\\sin x = x-\\frac{x^3}{3!}+\\frac{x^5}{5!}-\\dots",
    fokok: [3],
  },
  {
    nev: "\\cos x",
    fn: Math.cos,
    egy: (k) => (k === 0 ? 1 : k === 2 ? -0.5 : k === 4 ? 1 / 24 : 0),
    sor: "\\cos x = 1-\\frac{x^2}{2!}+\\frac{x^4}{4!}-\\dots",
    fokok: [4],
  },
  {
    nev: "\\ln(1+x)",
    fn: (x) => Math.log(1 + x),
    egy: (k) => (k === 0 ? 0 : (k % 2 === 1 ? 1 : -1) / k),
    sor: "\\ln(1+x) = x-\\frac{x^2}{2}+\\frac{x^3}{3}-\\frac{x^4}{4}+\\dots",
    fokok: [3, 4],
  },
];

function taylorFeladat() {
  const F = valaszt(TAYLOR);
  const n = valaszt(F.fokok);
  const h = valaszt([0.1, 0.2, 0.25, 0.3, 0.5]);
  let ertek = 0;
  for (let k = n; k >= 0; k--) ertek = ertek * h + F.egy(k);
  const pontos = F.fn(h);
  const cn = F.egy(n);

  return {
    szoveg: (
      <p>
        Írd fel az alábbi függvény <M>{`T_{${n}}`}</M> Maclaurin-polinomját (a 0 körül), és számítsd ki az értékét az{" "}
        <M>{`x = ${szK(h, 2)}`}</M> helyen! Add meg az <M>{`x^{${n}}`}</M>-es tag együtthatóját és a polinom értékét.
        <MB>{`f(x) = ${F.nev}`}</MB>
      </p>
    ),
    sugo: (
      <p>
        A <M>{"k"}</M>-adik együttható <M>{"\\frac{f^{(k)}(0)}{k!}"}</M>. A nevezetes sor:{" "}
        <span className="szamok">
          <M>{F.sor}</M>
        </span>
        . A faktoriálist ne felejtsd el a nevezőből!
      </p>
    ),
    mezok: [
      { id: "c", cimke: `x^${n} együtthatója`, helyes: cn, tizedes: 5, tures: 0.002 },
      { id: "T", cimke: `T_${n}(${szK(h, 2).replace("{,}", ",")})`, helyes: ertek, tizedes: 5, tures: 0.0005 },
    ],
    megoldas: (
      <>
        <MB>{`T_{${n}}(x) = ${(() => {
          const t = [];
          for (let k = 0; k <= n; k++) {
            const c = F.egy(k);
            if (Math.abs(c) < 1e-14) continue;
            const jel = c > 0 ? (t.length === 0 ? "" : "+") : "-";
            const abs = Math.abs(c);
            const hatv = k === 0 ? "" : k === 1 ? "x" : `x^{${k}}`;
            const nev = Math.round(1 / abs);
            const resz =
              Math.abs(abs * nev - 1) < 1e-9 && nev !== 1
                ? `\\frac{${hatv || "1"}}{${nev}}`
                : Math.abs(abs - 1) < 1e-9
                  ? hatv || "1"
                  : `${szK(abs, 5)}${hatv}`;
            t.push(`${jel}${resz}`);
          }
          return t.join("");
        })()}`}</MB>
        <MB>{`T_{${n}}\\left(${szK(h, 2)}\\right) = ${szK(ertek, 6)}`}</MB>
        <p>
          A pontos érték <M>{szK(pontos, 6)}</M>, a közelítés hibája{" "}
          <M>{szK(Math.abs(pontos - ertek), 6)}</M>. A fejlesztési ponthoz (a 0-hoz) közelebb a hiba drasztikusan
          kisebb: ez a <M>{"\\left|x-a\\right|^{n+1}"}</M> tényező hatása.
        </p>
      </>
    ),
  };
}

export const EXTRA_GENERATOROK = [
  { cim: "Globális szélsőérték zárt intervallumon", fn: globalisFeladat },
  { cim: "Inflexiós pont", fn: inflexioFeladat },
  { cim: "Lineáris közelítés", fn: kozelitesFeladat },
  { cim: "Taylor-polinom értéke", fn: taylorFeladat },
];

export default function GyakorloExtra() {
  return (
    <div>
      <GyakorloDoboz
        cim="Globális szélsőérték zárt intervallumon"
        leiras="A végpontokat is ki kell értékelni — ott nulla derivált nélkül is lehet szélsőérték."
        generator={globalisFeladat}
      />
      <GyakorloDoboz
        cim="Inflexiós pont"
        leiras="f ″ = 0 önmagában nem elég: előjelváltás kell hozzá."
        generator={inflexioFeladat}
      />
      <GyakorloDoboz
        cim="Lineáris közelítés"
        leiras="f(x₀ + Δx) ≈ f(x₀) + f ′(x₀)Δx. Szögeknél előbb radiánra váltunk!"
        generator={kozelitesFeladat}
      />
      <GyakorloDoboz
        cim="Taylor-polinom értéke"
        leiras="A k-adik együttható f⁽ᵏ⁾(0)/k!. A faktoriális a nevezőben marad."
        generator={taylorFeladat}
      />
    </div>
  );
}
