"use client";

import GyakorloDoboz from "@/components/GyakorloDoboz";
import { M, MB } from "@/components/ui/Keplet";
import { sz, szK } from "@/lib/szamok";
import {
  determinansK,
  egyszerusit,
  hossz,
  keresztDetK,
  kul,
  parhuzamos,
  pontSikTav,
  sikEgyenletK,
  skalaris,
  szogFok,
  vegyes,
  vektorialis,
  vekK,
  zar,
} from "./vektorok";

/* ---------- segédfüggvények ---------- */

const egesz = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
const koord = () => egesz(-5, 6);
const pont = () => [koord(), koord(), koord()];

function nemNullVektor() {
  let v = [0, 0, 0];
  while (hossz(v) < 0.9) v = pont();
  return v;
}

/* ---------- 1. Két vektor hajlásszöge ---------- */

function hajlasszogFeladat() {
  let a = nemNullVektor();
  let b = nemNullVektor();
  let orseg = 0;
  while ((parhuzamos(a, b) || Math.abs(skalaris(a, b)) < 1e-9) && orseg < 200) {
    a = nemNullVektor();
    b = nemNullVektor();
    orseg += 1;
  }
  const ab = skalaris(a, b);
  const fi = szogFok(a, b);

  return {
    szoveg: (
      <p>
        Mekkora az <M>{`\\mathbf{a} = ${vekK(a)}`}</M> és a <M>{`\\mathbf{b} = ${vekK(b)}`}</M> vektorok
        hajlásszöge? Add meg a skaláris szorzatot és a szöget fokban, két tizedesre.
      </p>
    ),
    sugo: (
      <p>
        <M>{"\\cos\\varphi = \\dfrac{\\mathbf{a}\\cdot\\mathbf{b}}{|\\mathbf{a}||\\mathbf{b}|}"}</M> —{" "}
        <strong>vektorok</strong> hajlásszögénél nincs abszolút érték a számlálóban, tehát a tompaszög is
        helyes válasz lehet. Itt <M>{`|\\mathbf{a}| = ${szK(hossz(a), 4)}`}</M> és{" "}
        <M>{`|\\mathbf{b}| = ${szK(hossz(b), 4)}`}</M>.
      </p>
    ),
    mezok: [
      { id: "ab", cimke: "a · b", helyes: ab, tizedes: 0, tures: 0.01 },
      { id: "fi", cimke: "φ", egyseg: "°", helyes: fi, tizedes: 2, tures: 0.6 },
    ],
    megoldas: (
      <>
        <MB>{`\\mathbf{a}\\cdot\\mathbf{b} = ${a.map((k, i) => `${zar(k)}\\cdot ${zar(b[i])}`).join(" + ")} = ${szK(ab, 0)}`}</MB>
        <MB>{`|\\mathbf{a}| = \\sqrt{${a.map((k) => szK(k * k, 0)).join(" + ")}} = ${szK(hossz(a), 4)},\\qquad |\\mathbf{b}| = \\sqrt{${b.map((k) => szK(k * k, 0)).join(" + ")}} = ${szK(hossz(b), 4)}`}</MB>
        <MB>{`\\cos\\varphi = \\frac{${szK(ab, 0)}}{${szK(hossz(a), 4)}\\cdot ${szK(hossz(b), 4)}} = ${szK(Math.cos((fi * Math.PI) / 180), 4)}\\ \\Rightarrow\\ \\varphi = ${szK(fi, 2)}^\\circ`}</MB>
        <p>
          A skaláris szorzat {ab > 0 ? "pozitív, tehát hegyesszöget" : "negatív, tehát tompaszöget"} vártunk — és
          valóban {ab > 0 ? "90°-nál kisebb" : "90°-nál nagyobb"} szöget kaptunk. ✓
        </p>
      </>
    ),
  };
}

/* ---------- 2. Vektoriális szorzat és háromszögterület ---------- */

function vektorialisFeladat() {
  let a = nemNullVektor();
  let b = nemNullVektor();
  let orseg = 0;
  while (parhuzamos(a, b) && orseg < 200) {
    a = nemNullVektor();
    b = nemNullVektor();
    orseg += 1;
  }
  const c = vektorialis(a, b);
  const T = hossz(c) / 2;

  return {
    szoveg: (
      <p>
        Számítsd ki az <M>{`\\mathbf{a} = ${vekK(a)}`}</M> és <M>{`\\mathbf{b} = ${vekK(b)}`}</M> vektorok
        vektoriális szorzatát, és add meg az általuk kifeszített <strong>háromszög</strong> területét (két
        tizedesre)!
      </p>
    ),
    sugo: (
      <p>
        Determinánsként, az első sor szerint kifejtve — és a középső tagot <strong>kivonjuk</strong>:
        <M>{"\\ (a_2b_3-a_3b_2;\\ a_3b_1-a_1b_3;\\ a_1b_2-a_2b_1)"}</M>. A háromszög területe a paralelogramma
        területének a fele.
      </p>
    ),
    mezok: [
      { id: "c1", cimke: "(a × b)₁", helyes: c[0], tizedes: 0, tures: 0.01 },
      { id: "c2", cimke: "(a × b)₂", helyes: c[1], tizedes: 0, tures: 0.01 },
      { id: "c3", cimke: "(a × b)₃", helyes: c[2], tizedes: 0, tures: 0.01 },
      { id: "T", cimke: "A háromszög területe", helyes: T, tizedes: 2 },
    ],
    megoldas: (
      <>
        <MB>{`\\mathbf{a}\\times\\mathbf{b} = ${keresztDetK(a, b)}`}</MB>
        <MB>{`\\mathbf{i}:\\ ${zar(a[1])}\\cdot ${zar(b[2])} - ${zar(a[2])}\\cdot ${zar(b[1])} = ${szK(c[0], 0)}`}</MB>
        <MB>{`\\mathbf{j}:\\ -\\left(${zar(a[0])}\\cdot ${zar(b[2])} - ${zar(a[2])}\\cdot ${zar(b[0])}\\right) = ${szK(c[1], 0)}`}</MB>
        <MB>{`\\mathbf{k}:\\ ${zar(a[0])}\\cdot ${zar(b[1])} - ${zar(a[1])}\\cdot ${zar(b[0])} = ${szK(c[2], 0)}`}</MB>
        <MB>{`|\\mathbf{a}\\times\\mathbf{b}| = \\sqrt{${c.map((k) => szK(k * k, 0)).join(" + ")}} = ${szK(hossz(c), 4)},\\qquad T_\\triangle = \\frac{${szK(hossz(c), 4)}}{2} = ${szK(T, 4)}`}</MB>
        <p>
          Ellenőrzés: <M>{`(\\mathbf{a}\\times\\mathbf{b})\\cdot\\mathbf{a} = ${szK(skalaris(c, a), 0)}`}</M> és{" "}
          <M>{`(\\mathbf{a}\\times\\mathbf{b})\\cdot\\mathbf{b} = ${szK(skalaris(c, b), 0)}`}</M> — a szorzat
          mindkét tényezőre merőleges.
        </p>
      </>
    ),
  };
}

/* ---------- 3. Vegyes szorzat és tetraédertérfogat ---------- */

function tetraederFeladat() {
  let A = pont();
  let B = pont();
  let C = pont();
  let D = pont();
  let det = 0;
  let orseg = 0;
  while (Math.abs(det) < 0.5 && orseg < 300) {
    A = pont();
    B = pont();
    C = pont();
    D = pont();
    det = vegyes(kul(B, A), kul(C, A), kul(D, A));
    orseg += 1;
  }
  const AB = kul(B, A);
  const AC = kul(C, A);
  const AD = kul(D, A);
  const V = Math.abs(det) / 6;

  return {
    szoveg: (
      <p>
        Mekkora az <M>{`A${vekK(A)}`}</M>, <M>{`B${vekK(B)}`}</M>, <M>{`C${vekK(C)}`}</M>,{" "}
        <M>{`D${vekK(D)}`}</M> csúcsú tetraéder térfogata? Add meg a vegyes szorzatot (az <M>{"A"}</M> csúcsból
        induló <M>{"\\overrightarrow{AB},\\ \\overrightarrow{AC},\\ \\overrightarrow{AD}"}</M> sorrendben) és a
        térfogatot három tizedesre.
      </p>
    ),
    sugo: (
      <p>
        Először élvektorok: <M>{"\\overrightarrow{AB} = B - A"}</M> és társai. A vegyes szorzat a három vektorból
        képzett <M>{"3\\times 3"}</M> determináns; a tetraéder térfogata ennek a hatoda (abszolút értékben).
        Itt <M>{`\\overrightarrow{AB} = ${vekK(AB)}`}</M>.
      </p>
    ),
    mezok: [
      { id: "det", cimke: "(AB × AC) · AD", helyes: det, tizedes: 0, tures: 0.01 },
      { id: "V", cimke: "A tetraéder térfogata", helyes: V, tizedes: 3 },
    ],
    megoldas: (
      <>
        <MB>{`\\overrightarrow{AB} = ${vekK(AB)},\\quad \\overrightarrow{AC} = ${vekK(AC)},\\quad \\overrightarrow{AD} = ${vekK(AD)}`}</MB>
        <MB>{`\\left(\\overrightarrow{AB}\\times\\overrightarrow{AC}\\right)\\cdot\\overrightarrow{AD} = ${determinansK(AB, AC, AD)} = ${szK(det, 0)}`}</MB>
        <MB>{`V = \\frac{1}{6}\\left|${szK(det, 0)}\\right| = ${szK(V, 4)}`}</MB>
        <p>
          A vegyes szorzat {det > 0 ? "pozitív, tehát a három élvektor jobbsodrású" : "negatív, tehát a három élvektor balsodrású"};
          a térfogat mindig az abszolút érték. Mivel nem nulla, a négy pont valóban nincs egy síkban.
        </p>
      </>
    ),
  };
}

/* ---------- 4. Sík egyenlete három pontból ---------- */

function sikFeladat() {
  let A;
  let B;
  let C;
  let n;
  let ns;
  let orseg = 0;
  do {
    A = pont();
    B = pont();
    C = pont();
    n = vektorialis(kul(B, A), kul(C, A));
    ns = hossz(n) > 0.5 ? egyszerusit(n) : [0, 0, 0];
    orseg += 1;
  } while ((hossz(n) < 0.5 || ns[0] <= 0) && orseg < 400);

  const AB = kul(B, A);
  const AC = kul(C, A);
  const arany = n[0] / ns[0];
  const d = skalaris(n, A);
  const ds = d / arany;

  return {
    szoveg: (
      <p>
        Írd fel az <M>{`A${vekK(A)}`}</M>, <M>{`B${vekK(B)}`}</M>, <M>{`C${vekK(C)}`}</M> pontokon átmenő sík
        egyenletét <M>{"Ax + By + Cz = D"}</M> alakban! A <strong>legkisebb egész együtthatós</strong> alakot add
        meg, amelyben <M>{"A > 0"}</M>.
      </p>
    ),
    sugo: (
      <p>
        A normálvektor <M>{"\\mathbf{n} = \\overrightarrow{AB}\\times\\overrightarrow{AC}"}</M>, itt{" "}
        <M>{`\\overrightarrow{AB} = ${vekK(AB)}`}</M> és <M>{`\\overrightarrow{AC} = ${vekK(AC)}`}</M>. Az{" "}
        <M>{"x, y, z"}</M> együtthatói éppen a normálvektor koordinátái, a jobb oldal pedig{" "}
        <M>{"\\mathbf{n}\\cdot\\overrightarrow{OA}"}</M>. Végül oszd végig a legnagyobb közös osztóval.
      </p>
    ),
    mezok: [
      { id: "A", cimke: "A (x együtthatója)", helyes: ns[0], tizedes: 0, tures: 0.01 },
      { id: "B", cimke: "B (y együtthatója)", helyes: ns[1], tizedes: 0, tures: 0.01 },
      { id: "C", cimke: "C (z együtthatója)", helyes: ns[2], tizedes: 0, tures: 0.01 },
      { id: "D", cimke: "D (jobb oldal)", helyes: ds, tizedes: 0, tures: 0.01 },
    ],
    megoldas: (
      <>
        <MB>{`\\overrightarrow{AB} = ${vekK(AB)},\\qquad \\overrightarrow{AC} = ${vekK(AC)}`}</MB>
        <MB>{`\\mathbf{n} = ${keresztDetK(AB, AC)} = ${vekK(n)}`}</MB>
        <MB>{`${sikEgyenletK(n, d)}`}</MB>
        {(Math.abs(arany) > 1.0001 || arany < 0) && (
          <p>
            {Math.abs(arany) > 1.0001
              ? `Minden együttható osztható ${sz(Math.abs(arany), 0)}-vel`
              : "Az egyenletet átszorozzuk"}
            {arany < 0 ? " (és az előjeleket megfordítjuk, hogy A > 0 legyen)" : ""}:
          </p>
        )}
        <MB>{`${sikEgyenletK(ns, ds)}`}</MB>
        <p>
          Ellenőrzés — mindhárom pontot behelyettesítve ugyanazt a jobb oldalt kell kapni:{" "}
          <M>{`B:\\ ${szK(skalaris(ns, B), 0)}`}</M>, <M>{`C:\\ ${szK(skalaris(ns, C), 0)}`}</M> ✓
        </p>
      </>
    ),
  };
}

/* ---------- 5. Pont és sík távolsága ---------- */

function pontSikFeladat() {
  let n = nemNullVektor();
  while (hossz(n) < 1.2) n = nemNullVektor();
  const d = egesz(-8, 8);
  let Q = pont();
  let orseg = 0;
  while (Math.abs(skalaris(n, Q) - d) < 0.5 && orseg < 200) {
    Q = pont();
    orseg += 1;
  }
  const tav = pontSikTav(Q, n, d);
  const szamlalo = skalaris(n, Q) - d;

  return {
    szoveg: (
      <p>
        Mekkora a <M>{`Q${vekK(Q)}`}</M> pont távolsága az <M>{sikEgyenletK(n, d)}</M> síktól? Három tizedesre
        add meg.
      </p>
    ),
    sugo: (
      <p>
        <M>{"d = \\dfrac{|n_1x_Q + n_2y_Q + n_3z_Q - d_0|}{\\sqrt{n_1^2+n_2^2+n_3^2}}"}</M>. A nevező{" "}
        <strong>nem hagyható el</strong>: ha a sík egyenletét végigszoroznád tízzel, a számláló tízszereződne, a
        távolság viszont nem változhat. Itt <M>{`|\\mathbf{n}| = ${szK(hossz(n), 4)}`}</M>.
      </p>
    ),
    mezok: [{ id: "d", cimke: "Távolság", helyes: tav, tizedes: 3 }],
    megoldas: (
      <>
        <MB>{`\\mathbf{n} = ${vekK(n)},\\qquad |\\mathbf{n}| = \\sqrt{${n.map((k) => szK(k * k, 0)).join(" + ")}} = ${szK(hossz(n), 4)}`}</MB>
        <MB>{`n_1x_Q + n_2y_Q + n_3z_Q - d_0 = ${n.map((k, i) => `${zar(k)}\\cdot ${zar(Q[i])}`).join(" + ")} - ${zar(d)} = ${szK(szamlalo, 0)}`}</MB>
        <MB>{`d = \\frac{\\left|${szK(szamlalo, 0)}\\right|}{${szK(hossz(n), 4)}} = ${szK(tav, 4)}`}</MB>
        <p>
          A számláló előjele azt is elárulja, a sík melyik oldalán van a pont — a távolsághoz persze abszolút
          értéket veszünk.
        </p>
      </>
    ),
  };
}

/* ---------- a szekció ---------- */

export const GENERATOROK = [
  { cim: "Két vektor hajlásszöge", fn: hajlasszogFeladat },
  { cim: "Vektoriális szorzat és háromszögterület", fn: vektorialisFeladat },
  { cim: "Vegyes szorzat és tetraédertérfogat", fn: tetraederFeladat },
  { cim: "Sík egyenlete három pontból", fn: sikFeladat },
  { cim: "Pont és sík távolsága", fn: pontSikFeladat },
];

export default function GyakorloSzekcio() {
  return (
    <div>
      <GyakorloDoboz
        cim="Két vektor hajlásszöge"
        leiras="Skaláris szorzat, hosszak, arkuszkoszinusz. Vektoroknál nincs abszolút érték — a tompaszög is jó válasz."
        generator={hajlasszogFeladat}
      />
      <GyakorloDoboz
        cim="Vektoriális szorzat és háromszögterület"
        leiras="Determináns az első sor szerint kifejtve; a középső tagot kivonjuk. A terület a szorzat hosszának a fele."
        generator={vektorialisFeladat}
      />
      <GyakorloDoboz
        cim="Vegyes szorzat és tetraédertérfogat"
        leiras="Négy pontból három élvektor, abból egy 3×3 determináns — a tetraéder térfogata ennek a hatoda."
        generator={tetraederFeladat}
      />
      <GyakorloDoboz
        cim="Sík egyenlete három pontból"
        leiras="Két oldalvektor, vektoriális szorzat, majd behelyettesítés. A legkisebb egész alakot kérjük, A > 0-val."
        generator={sikFeladat}
        oszlopok={2}
      />
      <GyakorloDoboz
        cim="Pont és sík távolsága"
        leiras="A behelyettesítéses képlet — és a nevező, amiről a legtöbben megfeledkeznek."
        generator={pontSikFeladat}
        oszlopok={1}
      />
    </div>
  );
}
