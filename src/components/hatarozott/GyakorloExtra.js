"use client";

import GyakorloDoboz from "@/components/GyakorloDoboz";
import { M, MB } from "@/components/ui/Keplet";
import { szK } from "@/lib/szamok";

const egesz = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
const valaszt = (t) => t[Math.floor(Math.random() * t.length)];

/* ================= 1. Átlagérték és a ξ hely ================= */

function atlagertekFeladat() {
  if (Math.random() < 0.5) {
    // f(x) = c·x²  a [p; q] szakaszon
    const c = valaszt([1, 2, 3]);
    const p = egesz(0, 2);
    const q = p + egesz(2, 4);
    const integral = (c * (Math.pow(q, 3) - Math.pow(p, 3))) / 3;
    const atlag = integral / (q - p);
    const xi = Math.sqrt(atlag / c);
    return {
      szoveg: (
        <p>
          Mennyi a függvény <strong>átlagértéke</strong> (integrálközepe) a megadott szakaszon, és hol veszi fel? Add
          meg az átlagértéket és a <M>{"\\xi"}</M> helyet 3 tizedesre.
          <MB>{`f(x)=${c === 1 ? "" : c}x^2,\\qquad ${p}\\le x\\le ${q}`}</MB>
        </p>
      ),
      sugo: (
        <p>
          <M>{"\\bar f = \\frac{1}{b-a}\\int_a^b f(x)\\,dx"}</M>. Előbb az integrál:{" "}
          <M>{`\\int ${c === 1 ? "" : c}x^2dx = \\frac{${c}x^3}{3}`}</M>. A <M>{"\\xi"}</M> helyet az{" "}
          <M>{`${c === 1 ? "" : c}\\xi^2 = \\bar f`}</M> egyenletből kapod — és bele kell esnie a szakaszba.
        </p>
      ),
      mezok: [
        { id: "atlag", cimke: "átlagérték", helyes: atlag, tizedes: 3 },
        { id: "xi", cimke: "a ξ hely", helyes: xi, tizedes: 3 },
      ],
      megoldas: (
        <>
          <MB>{`\\int_{${p}}^{${q}}${c === 1 ? "" : c}x^2dx = \\frac{${c}}{3}\\left(${q}^3-${p}^3\\right) = ${szK(
            integral,
            4,
          )}`}</MB>
          <MB>{`\\bar f = \\frac{${szK(integral, 4)}}{${q}-${p}} = ${szK(atlag, 4)}`}</MB>
          <MB>{`\\xi = \\sqrt{\\frac{\\bar f}{${c}}} = ${szK(xi, 4)}`}</MB>
          <p>
            Ellenőrzés: a <M>{"\\xi"}</M> a szakasz <em>felezőpontjától jobbra</em> van, mert a függvény a szakasz
            végén nő meg igazán.
          </p>
        </>
      ),
    };
  }

  // f(x) = m·x + k  a [p; q] szakaszon (itt a ξ a felezőpont)
  const m = valaszt([1, 2, 3, -1, -2]);
  const k = egesz(-3, 5);
  const p = egesz(0, 2);
  const q = p + egesz(2, 4);
  const integral = (m / 2) * (q * q - p * p) + k * (q - p);
  const atlag = integral / (q - p);
  const xi = (p + q) / 2;
  return {
    szoveg: (
      <p>
        Mennyi a függvény <strong>átlagértéke</strong> a megadott szakaszon, és hol veszi fel? Add meg az átlagértéket
        és a <M>{"\\xi"}</M> helyet 3 tizedesre.
        <MB>{`f(x)=${m === 1 ? "" : m === -1 ? "-" : m}x${k >= 0 ? `+${k}` : `${k}`},\\qquad ${p}\\le x\\le ${q}`}</MB>
      </p>
    ),
    sugo: (
      <p>
        Lineáris függvénynél az átlagérték a két végpontbeli érték számtani közepe — a <M>{"\\xi"}</M> hely pedig
        épp a szakasz <strong>felezőpontja</strong>. Ellenőrizd az integrállal is!
      </p>
    ),
    mezok: [
      { id: "atlag", cimke: "átlagérték", helyes: atlag, tizedes: 3 },
      { id: "xi", cimke: "a ξ hely", helyes: xi, tizedes: 3 },
    ],
    megoldas: (
      <>
        <MB>{`\\int_{${p}}^{${q}}f = \\left[\\frac{${m}x^2}{2}${k >= 0 ? `+${k}x` : `${k}x`}\\right]_{${p}}^{${q}} = ${szK(
          integral,
          4,
        )}`}</MB>
        <MB>{`\\bar f = \\frac{${szK(integral, 4)}}{${q - p}} = ${szK(atlag, 4)} = \\frac{f(${p})+f(${q})}{2}`}</MB>
        <MB>{`\\xi = \\frac{${p}+${q}}{2} = ${szK(xi, 3)}`}</MB>
      </>
    ),
  };
}

/* ================= 2. Ívhossz ================= */

function ivhosszFeladat() {
  const m = valaszt([1, 2, 3, 4]);
  const kk = egesz(-2, 3);
  const a = egesz(0, 2);
  const b = a + egesz(2, 5);
  const sEgyenes = (b - a) * Math.sqrt(1 + m * m);

  if (Math.random() < 0.5) {
    // y = ⅔x^{3/2} a [0; c]-n:  s = ⅔((1+c)^{3/2} − 1)
    const c = valaszt([3, 8, 15]);
    const sGorbe = (2 / 3) * (Math.pow(1 + c, 1.5) - 1);
    return {
      szoveg: (
        <p>
          Számold ki a két ívhosszt 3 tizedesre!
          <MB>{`\\text{(a)}\\ y=${m === 1 ? "" : m}x${
            kk >= 0 ? `+${kk}` : `${kk}`
          },\\quad ${a}\\le x\\le ${b} \\qquad \\text{(b)}\\ y=\\tfrac23x^{3/2},\\quad 0\\le x\\le ${c}`}</MB>
        </p>
      ),
      sugo: (
        <p>
          Mindkettőnél <M>{"s=\\int_a^b\\sqrt{1+f'(x)^2}\\,dx"}</M>. Az egyenesnél <M>{`f'=${m}`}</M> állandó, tehát
          a gyök is az. A (b)-nél <M>{"f'=\\sqrt x"}</M>, így <M>{"1+f'^2 = 1+x"}</M> — a gyök alatt szép kifejezés
          áll, és <M>{"\\int\\sqrt{1+x}\\,dx = \\frac23(1+x)^{3/2}"}</M>.
        </p>
      ),
      mezok: [
        { id: "sa", cimke: "(a) az egyenes szakasz hossza", helyes: sEgyenes, tizedes: 3 },
        { id: "sb", cimke: "(b) a görbe ívhossza", helyes: sGorbe, tizedes: 3 },
      ],
      megoldas: (
        <>
          <MB>{`\\text{(a)}\\ s=\\int_{${a}}^{${b}}\\sqrt{1+${m * m}}\\,dx = ${b - a}\\sqrt{${
            1 + m * m
          }} = ${szK(sEgyenes, 4)}`}</MB>
          <MB>{`\\text{(b)}\\ s=\\int_0^{${c}}\\sqrt{1+x}\\,dx = \\left[\\frac23(1+x)^{3/2}\\right]_0^{${c}} = \\frac23\\left(${
            (1 + c) ** 1.5
          }-1\\right) = ${szK(sGorbe, 4)}`}</MB>
          <p>
            Az (a) eredménye Pitagorasszal is megvan: a szakasz vízszintes vetülete <M>{`${b - a}`}</M>, a
            függőleges <M>{`${m * (b - a)}`}</M>.
          </p>
        </>
      ),
    };
  }

  // láncgörbe: y = ch x a [−ln K; ln K] szakaszon, s = K − 1/K
  const K = valaszt([2, 3, 4]);
  const sGorbe = K - 1 / K;
  return {
    szoveg: (
      <p>
        Számold ki a két ívhosszt 3 tizedesre!
        <MB>{`\\text{(a)}\\ y=${m === 1 ? "" : m}x${
          kk >= 0 ? `+${kk}` : `${kk}`
        },\\quad ${a}\\le x\\le ${b} \\qquad \\text{(b)}\\ y=\\operatorname{ch}x,\\quad -\\ln ${K}\\le x\\le \\ln ${K}`}</MB>
      </p>
    ),
    sugo: (
      <p>
        A láncgörbénél <M>{"f'=\\operatorname{sh}x"}</M>, és <M>{"1+\\operatorname{sh}^2x=\\operatorname{ch}^2x"}</M>{" "}
        — a gyök <strong>eltűnik</strong>. Így <M>{"s=\\left[\\operatorname{sh}x\\right]"}</M>, és{" "}
        <M>{`\\operatorname{sh}(\\ln ${K}) = \\frac{${K}-\\frac{1}{${K}}}{2}`}</M>.
      </p>
    ),
    mezok: [
      { id: "sa", cimke: "(a) az egyenes szakasz hossza", helyes: sEgyenes, tizedes: 3 },
      { id: "sb", cimke: "(b) a láncgörbe ívhossza", helyes: sGorbe, tizedes: 3 },
    ],
    megoldas: (
      <>
        <MB>{`\\text{(a)}\\ s = ${b - a}\\sqrt{${1 + m * m}} = ${szK(sEgyenes, 4)}`}</MB>
        <MB>{`\\text{(b)}\\ s=\\int_{-\\ln ${K}}^{\\ln ${K}}\\operatorname{ch}x\\,dx = 2\\operatorname{sh}\\left(\\ln ${K}\\right) = ${K}-\\frac{1}{${K}} = ${szK(
          sGorbe,
          4,
        )}`}</MB>
      </>
    ),
  };
}

/* ================= 3. Súlypont ================= */

function sulypontFeladat() {
  if (Math.random() < 0.5) {
    // f(x) = m·x  a [0; b]-n (háromszög)
    const m = valaszt([1, 2, 3, 0.5]);
    const b = egesz(2, 4);
    const T = (m * b * b) / 2;
    const xs = (2 * b) / 3;
    const ys = (m * b) / 3;
    return {
      szoveg: (
        <p>
          Hol van a görbe alatti (háromszög alakú) tartomány <strong>súlypontja</strong>? Add meg a súlypont két
          koordinátáját 3 tizedesre.
          <MB>{`f(x)=${m === 1 ? "" : szK(m, 1)}x,\\qquad 0\\le x\\le ${b}`}</MB>
        </p>
      ),
      sugo: (
        <p>
          <M>{"x_s=\\frac{\\int_0^b xf\\,dx}{\\int_0^b f\\,dx}"}</M> és{" "}
          <M>{"y_s=\\frac{\\frac12\\int_0^b f^2dx}{\\int_0^b f\\,dx}"}</M>. Az <M>{"y_s"}</M>-ben ne felejtsd el sem a{" "}
          <M>{"\\frac12"}</M>-et, sem a négyzetet!
        </p>
      ),
      mezok: [
        { id: "xs", cimke: "xₛ", helyes: xs, tizedes: 3 },
        { id: "ys", cimke: "yₛ", helyes: ys, tizedes: 3 },
      ],
      megoldas: (
        <>
          <MB>{`T=\\int_0^{${b}}${m === 1 ? "" : szK(m, 1)}x\\,dx = \\frac{${szK(m, 1)}\\cdot${b}^2}{2} = ${szK(
            T,
            4,
          )}`}</MB>
          <MB>{`S_y=\\int_0^{${b}}${m === 1 ? "" : szK(m, 1)}x^2dx = \\frac{${szK(m, 1)}\\cdot${b}^3}{3},\\qquad x_s = \\frac{2\\cdot${b}}{3} = ${szK(
            xs,
            4,
          )}`}</MB>
          <MB>{`S_x=\\frac12\\int_0^{${b}}${szK(m * m, 2)}x^2dx = \\frac{${szK(m * m, 2)}\\cdot${b}^3}{6},\\qquad y_s = \\frac{${szK(
            m,
            1,
          )}\\cdot${b}}{3} = ${szK(ys, 4)}`}</MB>
          <p>
            Ellenőrzés a háromszög elemi súlypontképletével: a csúcsok <M>{`(0;0)`}</M>, <M>{`(${b};0)`}</M> és{" "}
            <M>{`(${b};${szK(m * b, 1)})`}</M>, az átlaguk épp ez a pont. ✓
          </p>
        </>
      ),
    };
  }

  // f(x) = c·x²  a [0; b]-n
  const c = valaszt([1, 2, 0.5]);
  const b = egesz(2, 3);
  const T = (c * Math.pow(b, 3)) / 3;
  const xs = (3 * b) / 4;
  const ys = (3 * c * b * b) / 10;
  return {
    szoveg: (
      <p>
        Hol van a görbe alatti tartomány <strong>súlypontja</strong>? Add meg a súlypont két koordinátáját 3
        tizedesre.
        <MB>{`f(x)=${c === 1 ? "" : szK(c, 1)}x^2,\\qquad 0\\le x\\le ${b}`}</MB>
      </p>
    ),
    sugo: (
      <p>
        <M>{"T=\\int_0^b cx^2dx=\\frac{cb^3}{3}"}</M>, <M>{"S_y=\\int_0^b cx^3dx=\\frac{cb^4}{4}"}</M> és{" "}
        <M>{"S_x=\\frac12\\int_0^b c^2x^4dx=\\frac{c^2b^5}{10}"}</M>. Innen már csak osztás.
      </p>
    ),
    mezok: [
      { id: "xs", cimke: "xₛ", helyes: xs, tizedes: 3 },
      { id: "ys", cimke: "yₛ", helyes: ys, tizedes: 3 },
    ],
    megoldas: (
      <>
        <MB>{`T=\\frac{${szK(c, 1)}\\cdot${b}^3}{3}=${szK(T, 4)}`}</MB>
        <MB>{`x_s=\\frac{c b^4/4}{c b^3/3}=\\frac{3b}{4}=${szK(xs, 4)}`}</MB>
        <MB>{`y_s=\\frac{c^2b^5/10}{cb^3/3}=\\frac{3cb^2}{10}=${szK(ys, 4)}`}</MB>
        <p>
          Figyeld meg: a súlypont a <M>{"\\frac34 b"}</M> helyen van, tehát jobbra tolódik — a parabola alatti
          tartomány „vastagabb” vége ott van.
        </p>
      </>
    ),
  };
}

/* ================= 4. Másodrendű (tehetetlenségi) nyomaték ================= */

function nyomatekFeladat() {
  const b = egesz(2, 6);
  const h = egesz(2, 5);
  if (Math.random() < 0.55) {
    const Ialap = (b * Math.pow(h, 3)) / 3;
    const Is = (b * Math.pow(h, 3)) / 12;
    return {
      szoveg: (
        <p>
          Egy <strong>téglalap</strong> keresztmetszet szélessége <M>{`b=${b}`}</M>, magassága <M>{`h=${h}`}</M>{" "}
          (cm). Az alsó éle az <M>{"x"}</M> tengelyen fekszik. Mekkora a másodrendű nyomatéka (a) az{" "}
          <strong>alsó élre</strong>, (b) a <strong>súlyponti</strong>, alsó éllel párhuzamos tengelyre? Add meg
          mindkettőt 3 tizedesre (cm⁴-ben).
          <MB>{`I_x=\\frac13\\int_a^b f(x)^3dx`}</MB>
        </p>
      ),
      sugo: (
        <p>
          A téglalapnál <M>{`f\\equiv ${h}`}</M> állandó, tehát <M>{`I_x=\\frac13\\cdot ${h}^3\\cdot ${b}`}</M>. A
          súlyponti tengelyre a Steiner-tétellel: <M>{"I_s = I_x - T d^2"}</M>, ahol <M>{`T=${b * h}`}</M> és a
          távolság <M>{`d=\\frac{h}{2}`}</M>.
        </p>
      ),
      mezok: [
        { id: "Ia", cimke: "(a) I az alsó élre", egyseg: "cm⁴", helyes: Ialap, tizedes: 3 },
        { id: "Is", cimke: "(b) I a súlyponti tengelyre", egyseg: "cm⁴", helyes: Is, tizedes: 3 },
      ],
      megoldas: (
        <>
          <MB>{`I_x = \\frac{bh^3}{3} = \\frac{${b}\\cdot ${h}^3}{3} = ${szK(Ialap, 4)}`}</MB>
          <MB>{`I_s = I_x - T\\left(\\frac h2\\right)^2 = ${szK(Ialap, 4)} - ${b * h}\\cdot ${szK(
            (h / 2) ** 2,
            2,
          )} = ${szK(Is, 4)} = \\frac{bh^3}{12}`}</MB>
          <p>
            Ez az a <M>{"\\frac{bh^3}{12}"}</M>, amit a Szilárdságtanban minden gerendánál használni fogsz — a
            magasság <strong>köbön</strong> szerepel, ezért éri meg magas gerendát választani.
          </p>
        </>
      ),
    };
  }

  // háromszög: a befogója az x tengelyen, f(x) = h·x/b
  const Ialap = (b * Math.pow(h, 3)) / 12;
  const Is = (b * Math.pow(h, 3)) / 36;
  return {
    szoveg: (
      <p>
        Egy <strong>derékszögű háromszög</strong> befogói <M>{`b=${b}`}</M> és <M>{`h=${h}`}</M> (cm): az{" "}
        <M>{`f(x)=\\frac{${h}}{${b}}x`}</M> egyenes, az <M>{"x"}</M> tengely és az <M>{`x=${b}`}</M> egyenes
        határolja. Mekkora a másodrendű nyomatéka (a) az <M>{"x"}</M> <strong>tengelyre</strong>, (b) a{" "}
        <strong>súlyponti</strong>, azzal párhuzamos tengelyre? Add meg mindkettőt 3 tizedesre (cm⁴-ben).
        <MB>{`I_x=\\frac13\\int_0^{b} f(x)^3dx`}</MB>
      </p>
    ),
    sugo: (
      <p>
        <M>{`f^3=\\frac{${h}^3}{${b}^3}x^3`}</M>, tehát <M>{`I_x=\\frac13\\cdot\\frac{h^3}{b^3}\\cdot\\frac{b^4}{4}=\\frac{bh^3}{12}`}</M>.
        A háromszög súlypontja <M>{"\\frac h3"}</M> magasan van, a területe <M>{`\\frac{bh}{2}=${szK(
          (b * h) / 2,
          1,
        )}`}</M> — ezekkel jön a Steiner-tétel.
      </p>
    ),
    mezok: [
      { id: "Ia", cimke: "(a) I az x tengelyre", egyseg: "cm⁴", helyes: Ialap, tizedes: 3 },
      { id: "Is", cimke: "(b) I a súlyponti tengelyre", egyseg: "cm⁴", helyes: Is, tizedes: 3 },
    ],
    megoldas: (
      <>
        <MB>{`I_x=\\frac13\\int_0^{${b}}\\frac{${h}^3}{${b}^3}x^3dx = \\frac{bh^3}{12} = \\frac{${b}\\cdot${h}^3}{12} = ${szK(
          Ialap,
          4,
        )}`}</MB>
        <MB>{`I_s = I_x - T\\left(\\frac h3\\right)^2 = ${szK(Ialap, 4)} - ${szK((b * h) / 2, 2)}\\cdot ${szK(
          (h / 3) ** 2,
          4,
        )} = ${szK(Is, 4)} = \\frac{bh^3}{36}`}</MB>
      </>
    ),
  };
}

export const EXTRA_GENERATOROK = [
  { cim: "Átlagérték és a ξ hely", fn: atlagertekFeladat },
  { cim: "Ívhossz", fn: ivhosszFeladat },
  { cim: "Síkidom súlypontja", fn: sulypontFeladat },
  { cim: "Másodrendű nyomaték", fn: nyomatekFeladat },
];

export default function GyakorloExtra() {
  return (
    <div>
      <GyakorloDoboz
        cim="Átlagérték és a ξ hely"
        leiras="Az integrálközép egy szám: a görbe alatti területet kisimító téglalap magassága."
        generator={atlagertekFeladat}
      />
      <GyakorloDoboz
        cim="Ívhossz"
        leiras="A gyök alatt teljes négyzetnek kell összeállnia — ha nem áll össze, nézd meg újra a deriváltat."
        generator={ivhosszFeladat}
      />
      <GyakorloDoboz
        cim="Síkidom súlypontja"
        leiras="Nyomaték osztva a területtel. Az yₛ-ben ott a ½ és a négyzet is."
        generator={sulypontFeladat}
      />
      <GyakorloDoboz
        cim="Másodrendű nyomaték"
        leiras="A keresztmetszeti jellemzők alapfeladata — Steiner-tétellel a súlyponti tengelyre."
        generator={nyomatekFeladat}
      />
    </div>
  );
}
