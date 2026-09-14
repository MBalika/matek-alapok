"use client";

import GyakorloDoboz from "@/components/GyakorloDoboz";
import { M, MB } from "@/components/ui/Keplet";
import { szK } from "@/lib/szamok";
import { K, abszolut, argFok, algK, konjugalt, hanyados, szorzat, polarbol, negyed } from "@/lib/komplex";

const egesz = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
const valaszt = (tomb) => tomb[Math.floor(Math.random() * tomb.length)];
const nemNulla = (min, max) => {
  let v = 0;
  while (v === 0) v = egesz(min, max);
  return v;
};

/* ---------- 1. Az i hatványai ---------- */

function iHatvanyFeladat() {
  const n = egesz(37, 2999);
  const m = n % 4;
  const ertek = [K(1, 0), K(0, 1), K(-1, 0), K(0, -1)][m];
  return {
    szoveg: (
      <p>
        Add meg <M>{`i^{${n}}`}</M> értékét algebrai alakban!
      </p>
    ),
    sugo: (
      <p>
        Az <M>{"i"}</M> hatványai négyesével ismétlődnek. Oszd el a kitevőt 4-gyel, és
        csak a <strong>maradék</strong> számít: <M>{`${n} = 4\\cdot ${Math.floor(n / 4)} + ${m}`}</M>.
      </p>
    ),
    mezok: [
      { id: "re", cimke: "Re", helyes: ertek.a, tizedes: 0, tures: 0.01 },
      { id: "im", cimke: "Im", helyes: ertek.b, tizedes: 0, tures: 0.01 },
    ],
    megoldas: (
      <>
        <MB>{`${n} = 4\\cdot ${Math.floor(n / 4)} + ${m} \\ \\Rightarrow\\ i^{${n}} = (i^4)^{${Math.floor(n / 4)}}\\cdot i^{${m}} = 1\\cdot i^{${m}} = ${algK(ertek, 0)}`}</MB>
        <p>
          Elég az utolsó két számjegyet nézni, mert 100 osztható 4-gyel.
        </p>
      </>
    ),
  };
}

/* ---------- 2. Konjugált, abszolút érték, reciprok ---------- */

function konjAbszFeladat() {
  const z = K(nemNulla(-6, 6), nemNulla(-6, 6));
  const n2 = z.a * z.a + z.b * z.b;
  const rec = hanyados(K(1, 0), z);
  return {
    szoveg: (
      <p>
        Legyen <M>{`z = ${algK(z, 0)}`}</M>. Add meg <M>{"|z|"}</M>-t, a{" "}
        <M>{"z\\bar z"}</M> szorzatot, és a <M>{"1/z"}</M> reciprok algebrai alakját!
      </p>
    ),
    sugo: (
      <p>
        <M>{"z\\bar z = a^2 + b^2 = |z|^2"}</M> — mindig valós. A reciprokhoz ezt használd:{" "}
        <M>{"\\dfrac{1}{z} = \\dfrac{\\bar z}{z\\bar z} = \\dfrac{\\bar z}{|z|^2}"}</M>.
      </p>
    ),
    mezok: [
      { id: "abs", cimke: "|z|", helyes: Math.sqrt(n2), tizedes: 4 },
      { id: "zz", cimke: "z·z̄", helyes: n2, tizedes: 0, tures: 0.01 },
      { id: "re", cimke: "Re(1/z)", helyes: rec.a, tizedes: 4 },
      { id: "im", cimke: "Im(1/z)", helyes: rec.b, tizedes: 4 },
    ],
    megoldas: (
      <>
        <MB>{`|z| = \\sqrt{${z.a}^2 + (${z.b})^2} = \\sqrt{${n2}} = ${szK(Math.sqrt(n2), 4)},\\qquad z\\bar z = |z|^2 = ${n2}`}</MB>
        <MB>{`\\frac{1}{z} = \\frac{\\bar z}{|z|^2} = \\frac{${algK(konjugalt(z), 0)}}{${n2}} = ${algK(rec, 4)}`}</MB>
      </>
    ),
  };
}

/* ---------- 3. Egyenlet a gyökeiből (Viète) ---------- */

function vieteFeladat() {
  const m = nemNulla(-4, 4);
  const n = egesz(1, 5);
  const p = -2 * m; // z² + p z + q
  const q = m * m + n * n;
  return {
    szoveg: (
      <p>
        Egy valós együtthatós, <M>{"z^2 + pz + q = 0"}</M> alakú egyenlet egyik gyöke{" "}
        <M>{`${algK(K(m, n), 0)}`}</M>. Add meg <M>{"p"}</M>-t és <M>{"q"}</M>-t!
      </p>
    ),
    sugo: (
      <p>
        Valós együtthatóknál a másik gyök a konjugált: <M>{`${algK(K(m, -n), 0)}`}</M>.
        Viète: <M>{"z_1 + z_2 = -p"}</M>, <M>{"z_1 z_2 = q"}</M>. A konjugált pár összege{" "}
        <M>{"2\\operatorname{Re} z"}</M>, szorzata <M>{"|z|^2"}</M>.
      </p>
    ),
    mezok: [
      { id: "p", cimke: "p", helyes: p, tizedes: 0, tures: 0.01 },
      { id: "q", cimke: "q", helyes: q, tizedes: 0, tures: 0.01 },
    ],
    megoldas: (
      <>
        <MB>{`z_1 + z_2 = ${algK(K(m, n), 0)} + (${algK(K(m, -n), 0)}) = ${2 * m} = -p \\ \\Rightarrow\\ p = ${p}`}</MB>
        <MB>{`z_1 z_2 = |z_1|^2 = ${m}^2 + ${n}^2 = ${q} = q`}</MB>
        <p>
          Az egyenlet: <M>{`z^2 ${p >= 0 ? "+" : "-"} ${Math.abs(p)}z + ${q} = 0`}</M>. Ellenőrzés:
          a diszkrimináns <M>{`${p}^2 - 4\\cdot ${q} = ${p * p - 4 * q} < 0`}</M>, ahogy komplex gyököknél kell.
        </p>
      </>
    ),
  };
}

/* ---------- 4. Szorzás trigonometrikus alakban ---------- */

function trigSzorzasFeladat() {
  const r1 = egesz(1, 4);
  const r2 = egesz(1, 3);
  const f1 = valaszt([30, 45, 60, 120, 135, 150]);
  const f2 = valaszt([30, 45, 60, 90, 120, 150, 210, 240]);
  const z1 = polarbol(r1, f1);
  const z2 = polarbol(r2, f2);
  const p = szorzat(z1, z2);
  const fp = (f1 + f2) % 360;
  return {
    szoveg: (
      <p>
        Legyen <M>{`z_1 = ${r1}(\\cos ${f1}^\\circ + i\\sin ${f1}^\\circ)`}</M> és{" "}
        <M>{`z_2 = ${r2}(\\cos ${f2}^\\circ + i\\sin ${f2}^\\circ)`}</M>. Add meg a{" "}
        <M>{"z_1 z_2"}</M> szorzat abszolút értékét, argumentumát (<M>{"0^\\circ \\le \\varphi < 360^\\circ"}</M>) és algebrai alakját!
      </p>
    ),
    sugo: (
      <p>
        Az abszolút értékek szorzódnak, az argumentumok összeadódnak. Ha az összeg eléri a{" "}
        <M>{"360^\\circ"}</M>-ot, vonj le belőle <M>{"360^\\circ"}</M>-ot.
      </p>
    ),
    mezok: [
      { id: "r", cimke: "|z₁z₂|", helyes: r1 * r2, tizedes: 2, tures: 0.02 },
      { id: "fi", cimke: "arg(z₁z₂)", egyseg: "°", helyes: fp, tizedes: 1, tures: 0.6 },
      { id: "re", cimke: "Re(z₁z₂)", helyes: p.a, tizedes: 3 },
      { id: "im", cimke: "Im(z₁z₂)", helyes: p.b, tizedes: 3 },
    ],
    megoldas: (
      <>
        <MB>{`z_1 z_2 = ${r1}\\cdot ${r2}\\left(\\cos(${f1}^\\circ + ${f2}^\\circ) + i\\sin(${f1}^\\circ + ${f2}^\\circ)\\right) = ${r1 * r2}\\left(\\cos ${f1 + f2}^\\circ + i\\sin ${f1 + f2}^\\circ\\right)`}</MB>
        {f1 + f2 !== fp && (
          <p>
            <M>{`${f1 + f2}^\\circ - 360^\\circ = ${fp}^\\circ`}</M>.
          </p>
        )}
        <MB>{`z_1 z_2 = ${r1 * r2}(\\cos ${fp}^\\circ + i\\sin ${fp}^\\circ) = ${algK(p, 3)}`}</MB>
        <p>Geometriailag: a <M>{"z_1"}</M>-et <M>{`${f2}^\\circ`}</M>-kal elforgattuk és <M>{`${r2}`}</M>-szeresére nyújtottuk. A szorzat a {negyed(p)}ben van.</p>
      </>
    ),
  };
}

export const EXTRA_GENERATOROK = [
  { cim: "Az i hatványai", fn: iHatvanyFeladat },
  { cim: "Konjugált, abszolút érték, reciprok", fn: konjAbszFeladat },
  { cim: "Egyenlet a gyökeiből (Viète)", fn: vieteFeladat },
  { cim: "Szorzás trigonometrikus alakban", fn: trigSzorzasFeladat },
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
