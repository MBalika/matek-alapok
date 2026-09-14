"use client";

import GyakorloDoboz from "@/components/GyakorloDoboz";
import { M, MB } from "@/components/ui/Keplet";
import { sz, szK } from "@/lib/szamok";
import {
  K, abszolut, argFok, algK, szorzat, hanyados, konjugalt, polarbol, hatvany, gyokok,
  zarojelesK, negyed, radFelirat,
} from "@/lib/komplex";

/* ---------- segédfüggvények ---------- */

const egesz = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
const valaszt = (tomb) => tomb[Math.floor(Math.random() * tomb.length)];
const nemNulla = (min, max) => {
  let v = 0;
  while (v === 0) v = egesz(min, max);
  return v;
};

const NEVEZETES = [30, 45, 60, 120, 135, 150, 210, 225, 240, 300, 315, 330];

/** Pontos alak KaTeX-hez: r·cos φ nevezetes szögnél gyökös tört, szépen egyszerűsítve. */
function pontosKoord(r, fok) {
  const f = ((fok % 360) + 360) % 360;
  // [koszinusz, szinusz] típusa: "s3" = √3/2, "s2" = √2/2, "h" = 1/2
  const tip = { 30: ["s3", "h"], 45: ["s2", "s2"], 60: ["h", "s3"] };
  const hegyes = f <= 90 ? f : f <= 180 ? 180 - f : f <= 270 ? f - 180 : 360 - f;
  if (!tip[hegyes]) return null;
  const gyokjel = { s3: "\\sqrt3", s2: "\\sqrt2", h: "" };
  const ir = (t) => {
    const g = gyokjel[t];
    if (r % 2 === 0) {
      const k = r / 2;
      return g ? (k === 1 ? g : `${k}${g}`) : `${k}`;
    }
    return g ? `\\frac{${r === 1 ? "" : r}${g}}{2}` : `\\frac{${r}}{2}`;
  };
  const [c, s] = tip[hegyes];
  const ea = f > 90 && f < 270 ? "-" : "";
  const eb = f > 180 ? "-" : "";
  return { re: `${ea}${ir(c)}`, im: `${eb}${ir(s)}` };
}

/* ---------- 1. Műveletek algebrai alakban ---------- */

function muveletFeladat() {
  const z1 = K(nemNulla(-6, 6), nemNulla(-6, 6));
  const z2 = K(nemNulla(-5, 5), nemNulla(-5, 5));
  const p = szorzat(z1, z2);
  const h = hanyados(z1, z2);
  const n2 = z2.a * z2.a + z2.b * z2.b;
  const szaml = szorzat(z1, konjugalt(z2));

  return {
    szoveg: (
      <p>
        Legyen <M>{`z_1 = ${algK(z1, 0)}`}</M> és <M>{`z_2 = ${algK(z2, 0)}`}</M>.
        Számítsd ki a <M>{"z_1 z_2"}</M> szorzatot és a <M>{"z_1 / z_2"}</M>{" "}
        hányadost algebrai alakban!
      </p>
    ),
    sugo: (
      <p>
        Szorzásnál bontsd fel a zárójelet, mintha <M>{"i"}</M> egy betű volna, és
        a végén írj <M>{"i^2"}</M> helyére <M>{"-1"}</M>-et. Osztásnál bővíts a{" "}
        <strong>nevező konjugáltjával</strong>: a nevező így{" "}
        <M>{`|z_2|^2 = ${z2.a}^2 + (${z2.b})^2 = ${n2}`}</M> lesz.
      </p>
    ),
    mezok: [
      { id: "pre", cimke: "Re(z₁·z₂)", helyes: p.a, tizedes: 0, tures: 0.01 },
      { id: "pim", cimke: "Im(z₁·z₂)", helyes: p.b, tizedes: 0, tures: 0.01 },
      { id: "hre", cimke: "Re(z₁/z₂)", helyes: h.a, tizedes: 4 },
      { id: "him", cimke: "Im(z₁/z₂)", helyes: h.b, tizedes: 4 },
    ],
    megoldas: (
      <>
        <MB>{`z_1 z_2 = ${zarojelesK(z1, 0)}${zarojelesK(z2, 0)} = ${z1.a * z2.a} ${z1.a * z2.b >= 0 ? "+" : "-"} ${Math.abs(z1.a * z2.b)}i ${z1.b * z2.a >= 0 ? "+" : "-"} ${Math.abs(z1.b * z2.a)}i ${z1.b * z2.b >= 0 ? "+" : "-"} ${Math.abs(z1.b * z2.b)}i^2 = ${algK(p, 0)}`}</MB>
        <MB>{`\\frac{z_1}{z_2} = \\frac{${zarojelesK(z1, 0)}${zarojelesK(konjugalt(z2), 0)}}{${zarojelesK(z2, 0)}${zarojelesK(konjugalt(z2), 0)}} = \\frac{${algK(szaml, 0)}}{${n2}} = ${algK(h, 4)}`}</MB>
      </>
    ),
  };
}

/* ---------- 2. Trigonometrikus alak ---------- */

function trigAlakFeladat() {
  const r = egesz(1, 5);
  const fok = valaszt(NEVEZETES);
  const z = polarbol(r, fok);
  const pontos = pontosKoord(r, fok);
  const hegyes = fok <= 90 ? fok : fok <= 180 ? 180 - fok : fok <= 270 ? fok - 180 : 360 - fok;
  const negy = negyed(z);

  return {
    szoveg: (
      <p>
        Írd fel trigonometrikus alakban a{" "}
        <M>{`z = ${pontos ? `${pontos.re} ${pontos.im.startsWith("-") ? "-" : "+"} ${pontos.im.replace(/^-/, "") === "1" ? "" : pontos.im.replace(/^-/, "")}\\,i` : algK(z, 3)}`}</M>{" "}
        (≈ <M>{algK(z, 3)}</M>) komplex számot! Add meg az <M>{"r"}</M> abszolút
        értéket és a <M>{"\\varphi"}</M> argumentumot fokban,{" "}
        <M>{"0^\\circ \\le \\varphi < 360^\\circ"}</M>.
      </p>
    ),
    sugo: (
      <p>
        <M>{"r = \\sqrt{a^2+b^2}"}</M>. A <M>{"\\operatorname{tg}\\varphi = b/a"}</M>{" "}
        képletből először a hegyesszöget számold ki, majd nézd meg az előjelekből a
        negyedet: itt <M>{`a ${z.a > 0 ? ">" : "<"} 0`}</M> és{" "}
        <M>{`b ${z.b > 0 ? ">" : "<"} 0`}</M>, tehát a szám a <strong>{negy}</strong>ben van.
      </p>
    ),
    mezok: [
      { id: "r", cimke: "r = |z|", helyes: r, tizedes: 3 },
      { id: "fi", cimke: "φ", egyseg: "°", helyes: fok, tizedes: 1, tures: 0.6 },
    ],
    megoldas: (
      <>
        <MB>{`r = \\sqrt{(${szK(z.a, 3)})^2 + (${szK(z.b, 3)})^2} = ${r}`}</MB>
        <MB>{`\\operatorname{tg}\\alpha = \\left|\\frac{b}{a}\\right| = ${szK(Math.abs(z.b / z.a), 3)} \\ \\Rightarrow\\ \\alpha = ${hegyes}^\\circ`}</MB>
        <p>
          A szám a {negy}ben van, ezért{" "}
          <M>
            {fok <= 90
              ? `\\varphi = \\alpha = ${fok}^\\circ`
              : fok <= 180
                ? `\\varphi = 180^\\circ - ${hegyes}^\\circ = ${fok}^\\circ`
                : fok <= 270
                  ? `\\varphi = 180^\\circ + ${hegyes}^\\circ = ${fok}^\\circ`
                  : `\\varphi = 360^\\circ - ${hegyes}^\\circ = ${fok}^\\circ`}
          </M>
          , azaz <M>{`\\varphi = ${radFelirat(fok)}`}</M>.
        </p>
        <MB>{`z = ${r}\\left(\\cos ${fok}^\\circ + i\\sin ${fok}^\\circ\\right)`}</MB>
      </>
    ),
  };
}

/* ---------- 3. Hatványozás (Moivre) ---------- */

function moivreFeladat() {
  const r = valaszt([1, 1, 2, 3]);
  const fok = valaszt(NEVEZETES);
  const n = egesz(3, 7);
  const z = polarbol(r, fok);
  const h = hatvany(z, n);
  const nyers = n * fok;
  const red = ((nyers % 360) + 360) % 360;

  return {
    szoveg: (
      <p>
        Legyen <M>{`z = ${r === 1 ? "" : r}\\left(\\cos ${fok}^\\circ + i\\sin ${fok}^\\circ\\right)`}</M>.
        Számítsd ki <M>{`z^{${n}}`}</M>-t, és add meg algebrai alakban!
      </p>
    ),
    sugo: (
      <p>
        Moivre-képlet: <M>{"z^n = r^n(\\cos n\\varphi + i \\sin n\\varphi)"}</M>. A kapott{" "}
        <M>{`${n}\\cdot ${fok}^\\circ = ${nyers}^\\circ`}</M> szöget csökkentsd a{" "}
        <M>{"360^\\circ"}</M> többszöröseivel, mielőtt a szögfüggvényeket kiszámolod.
      </p>
    ),
    mezok: [
      { id: "re", cimke: "Re(zⁿ)", helyes: h.a, tizedes: 3 },
      { id: "im", cimke: "Im(zⁿ)", helyes: h.b, tizedes: 3 },
    ],
    megoldas: (
      <>
        <MB>{`z^{${n}} = ${r}^{${n}}\\left(\\cos(${n}\\cdot ${fok}^\\circ) + i\\sin(${n}\\cdot ${fok}^\\circ)\\right) = ${Math.pow(r, n)}\\left(\\cos ${nyers}^\\circ + i\\sin ${nyers}^\\circ\\right)`}</MB>
        {nyers !== red && (
          <p>
            <M>{`${nyers}^\\circ = ${Math.floor(nyers / 360)}\\cdot 360^\\circ + ${red}^\\circ`}</M>, tehát a
            szög ugyanaz, mint <M>{`${red}^\\circ`}</M>.
          </p>
        )}
        <MB>{`z^{${n}} = ${Math.pow(r, n)}\\left(\\cos ${red}^\\circ + i\\sin ${red}^\\circ\\right) = ${Math.pow(r, n)}\\,(${szK(Math.cos((red * Math.PI) / 180), 4)} + ${szK(Math.sin((red * Math.PI) / 180), 4)}\\,i) = ${algK(h, 3)}`}</MB>
      </>
    ),
  };
}

/* ---------- 4. Gyökvonás ---------- */

function gyokFeladat() {
  const n = valaszt([2, 3, 3, 4]);
  const rho = valaszt([1, 2, 2, 3]);
  const alfa0 = valaszt([15, 20, 30, 40, 45, 60, 75]);
  // z = w0^n, hogy „szép” legyen a gyök
  const z = polarbol(Math.pow(rho, n), n * alfa0);
  const fi = argFok(z);
  const w = gyokok(z, n);

  return {
    szoveg: (
      <p>
        Határozd meg a <M>{`z = ${algK(z, 3)}`}</M> komplex szám{" "}
        <M>{`${n}`}</M>-edik gyökeit! Add meg a gyökök közös abszolút értékét, a{" "}
        <M>{"k = 0"}</M>-hoz tartozó gyök szögét és algebrai alakját.
      </p>
    ),
    sugo: (
      <p>
        Először trigonometrikus alak: <M>{`r = ${szK(abszolut(z), 3)}`}</M>,{" "}
        <M>{`\\varphi = ${szK(fi, 1)}^\\circ`}</M> (a <strong>{negyed(z)}</strong>). Aztán{" "}
        <M>{`\\rho = \\sqrt[${n}]{r}`}</M> és <M>{`\\alpha_k = (\\varphi + k\\cdot 360^\\circ)/${n}`}</M>.
        Összesen {n} gyök van, egymástól <M>{`${360 / n}^\\circ`}</M>-ra.
      </p>
    ),
    mezok: [
      { id: "rho", cimke: "ρ = |wₖ|", helyes: rho, tizedes: 3 },
      { id: "a0", cimke: "α₀ (k = 0)", egyseg: "°", helyes: w[0].fok, tizedes: 1, tures: 0.6 },
      { id: "re", cimke: "Re(w₀)", helyes: w[0].a, tizedes: 3 },
      { id: "im", cimke: "Im(w₀)", helyes: w[0].b, tizedes: 3 },
    ],
    megoldas: (
      <>
        <MB>{`z = ${szK(abszolut(z), 3)}\\left(\\cos ${szK(fi, 1)}^\\circ + i\\sin ${szK(fi, 1)}^\\circ\\right)`}</MB>
        <MB>{`\\rho = \\sqrt[${n}]{${szK(abszolut(z), 3)}} = ${rho},\\qquad \\alpha_k = \\frac{${szK(fi, 1)}^\\circ + k\\cdot 360^\\circ}{${n}}`}</MB>
        <div className="finom-gorgeto overflow-x-auto">
          <table className="szamok w-full text-[13px]">
            <thead className="text-[11px] text-petrol-500 uppercase">
              <tr>
                <th className="pb-1 text-left">k</th>
                <th className="pb-1 text-left">αₖ</th>
                <th className="pb-1 text-left">wₖ</th>
              </tr>
            </thead>
            <tbody>
              {w.map((p) => (
                <tr key={p.k} className="border-t border-petrol-200">
                  <td className="py-1">{p.k}</td>
                  <td className="py-1">{sz(p.fok, 1)}°</td>
                  <td className="py-1"><M>{`${rho}(\\cos ${szK(p.fok, 1)}^\\circ + i\\sin ${szK(p.fok, 1)}^\\circ) = ${algK(K(p.a, p.b), 3)}`}</M></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2">
          Ellenőrzés: a gyökök a <M>{`${rho}`}</M> sugarú körön szabályos {n}-szöget alkotnak.
        </p>
      </>
    ),
  };
}

/* ---------- 5. Másodfokú egyenlet ---------- */

function masodfokuFeladat() {
  const m = nemNulla(-5, 5);
  const nn = egesz(1, 5);
  // gyökök: m ± n i  → z² − 2m z + (m² + n²) = 0
  const p = -2 * m;
  const q = m * m + nn * nn;
  const D = p * p - 4 * q; // = −4n²
  const pStr = p === 0 ? "" : `${p > 0 ? "+" : "-"} ${Math.abs(p)}z `;

  return {
    szoveg: (
      <p>
        Oldd meg a komplex számok halmazán: <M>{`z^2 ${pStr}+ ${q} = 0`}</M>. Add meg
        a <strong>pozitív képzetes részű</strong> gyököt!
      </p>
    ),
    sugo: (
      <p>
        A megoldóképlet változatlanul érvényes. A diszkrimináns{" "}
        <M>{`D = ${p}^2 - 4\\cdot ${q} = ${D}`}</M> negatív, és{" "}
        <M>{`\\sqrt{${D}} = \\pm\\sqrt{${-D}}\\,i = \\pm ${2 * nn}i`}</M>.
      </p>
    ),
    mezok: [
      { id: "re", cimke: "Re(z)", helyes: m, tizedes: 2, tures: 0.02 },
      { id: "im", cimke: "Im(z) (a pozitív)", helyes: nn, tizedes: 2, tures: 0.02 },
    ],
    megoldas: (
      <>
        <MB>{`z_{1,2} = \\frac{${-p} \\pm \\sqrt{${p}^2 - 4\\cdot ${q}}}{2} = \\frac{${-p} \\pm \\sqrt{${D}}}{2} = \\frac{${-p} \\pm ${2 * nn}i}{2}`}</MB>
        <MB>{`z_1 = ${algK(K(m, nn), 0)},\\qquad z_2 = ${algK(K(m, -nn), 0)}`}</MB>
        <p>
          A két gyök egymás konjugáltja — valós együtthatós egyenletnél mindig így van.
          Ellenőrzés: <M>{`z_1 + z_2 = ${2 * m} = ${-p}`}</M> és{" "}
          <M>{`z_1 z_2 = ${m}^2 + ${nn}^2 = ${q}`}</M> (Viète-formulák).
        </p>
      </>
    ),
  };
}

/* ---------- a szekció ---------- */

export default function GyakorloSzekcio() {
  return (
    <div>
      <GyakorloDoboz
        cim="Szorzás és osztás algebrai alakban"
        leiras="Zárójelfelbontás, i² = −1, osztásnál a nevező konjugáltjával bővítünk."
        generator={muveletFeladat}
      />
      <GyakorloDoboz
        cim="Trigonometrikus alak — a negyedek csapdája"
        leiras="Abszolút érték és argumentum. A számológép szöge csak a hegyesszög; a negyedet neked kell eldöntened."
        generator={trigAlakFeladat}
      />
      <GyakorloDoboz
        cim="Hatványozás a Moivre-képlettel"
        leiras="rⁿ és n·φ — a nagy szöget redukáld 360° alá."
        generator={moivreFeladat}
      />
      <GyakorloDoboz
        cim="Gyökvonás"
        leiras="n-edik gyök: n darab, egy körön, szabályos sokszögben."
        generator={gyokFeladat}
      />
      <GyakorloDoboz
        cim="Másodfokú egyenlet negatív diszkriminánssal"
        leiras="A megoldóképlet komplex gyökökkel, konjugált gyökpár."
        generator={masodfokuFeladat}
      />
    </div>
  );
}
