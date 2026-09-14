import { M, MB } from "@/components/ui/Keplet";
import { Lap, Doboz } from "./PuskaElemek";

export default function PuskaKomplex() {
  return (
    <Lap
      szam={1}
      cim="Komplex számok"
      gyerekek={
        <>
          <Doboz cim="Alapok">
            <MB>
              {
                "i^2 = -1,\\quad i^3 = -i,\\quad i^4 = 1,\\quad \\tfrac{1}{i} = -i"
              }
            </MB>
            <p>
              <M>{"z = a + bi"}</M>; <M>{"\\operatorname{Re} z = a"}</M>,{" "}
              <M>{"\\operatorname{Im} z = b"}</M> — a képzetes rész{" "}
              <strong>valós szám</strong>. Nincs rendezés: <M>{"z_1 < z_2"}</M>{" "}
              értelmetlen.
            </p>
          </Doboz>
          <Doboz cim="Konjugált, abszolút érték">
            <MB>
              {
                "\\bar z = a - bi,\\qquad |z| = \\sqrt{a^2+b^2},\\qquad z\\bar z = |z|^2"
              }
            </MB>
            <p>
              <M>{"|z_1 z_2| = |z_1||z_2|"}</M>, de{" "}
              <M>{"|z_1+z_2| \\le |z_1|+|z_2|"}</M>. <M>{"|z-z_0| = r"}</M>:
              kör.
            </p>
          </Doboz>
          <Doboz cim="Műveletek algebrai alakban">
            <MB>
              {
                "(a_1+b_1 i)(a_2+b_2 i) = (a_1a_2 - b_1b_2) + (a_1b_2 + a_2b_1)i"
              }
            </MB>
            <MB>{"\\frac{z_1}{z_2} = \\frac{z_1\\bar z_2}{|z_2|^2}"}</MB>
            <p>
              Úgy számolj, mintha i egy betű volna, a végén i² = −1. Osztásnál a{" "}
              <strong>nevező</strong> konjugáltjával bővíts.
            </p>
          </Doboz>
          <Doboz cim="Trigonometrikus és exponenciális alak">
            <MB>{"z = r(\\cos\\varphi + i\\sin\\varphi) = r e^{i\\varphi}"}</MB>
            <MB>
              {
                "r = \\sqrt{a^2+b^2},\\qquad \\operatorname{tg}\\varphi = \\frac{b}{a},\\qquad a = r\\cos\\varphi,\\ b = r\\sin\\varphi"
              }
            </MB>
          </Doboz>
          <Doboz cim="Negyedek — az argumentum" szeles>
            <p>
              <M>{"\\alpha = \\operatorname{arctg}|b/a|"}</M> hegyesszög, aztán:
              I. (+,+): <M>{"\\varphi = \\alpha"}</M> · II. (−,+):{" "}
              <M>{"180^\\circ - \\alpha"}</M> · III. (−,−):{" "}
              <M>{"180^\\circ + \\alpha"}</M> · IV. (+,−):{" "}
              <M>{"360^\\circ - \\alpha"}</M>. Tengelyen: <M>{"bi"}</M>,{" "}
              <M>{"b>0"}</M> → 90°; <M>{"b<0"}</M> → 270°; negatív valós → 180°.{" "}
              <strong>Rajzold fel a pontot.</strong>
            </p>
          </Doboz>
          <Doboz cim="Szorzás, osztás, hatványozás">
            <MB>
              {
                "z_1 z_2 = r_1 r_2\\left(\\cos(\\varphi_1+\\varphi_2) + i\\sin(\\varphi_1+\\varphi_2)\\right)"
              }
            </MB>
            <MB>
              {
                "\\frac{z_1}{z_2} = \\frac{r_1}{r_2}\\left(\\cos(\\varphi_1-\\varphi_2) + i\\sin(\\varphi_1-\\varphi_2)\\right)"
              }
            </MB>
            <MB>
              {
                "z^n = r^n(\\cos n\\varphi + i\\sin n\\varphi)\\quad\\text{(Moivre)}"
              }
            </MB>
            <p>
              Abszolút értékek szorzódnak, szögek összeadódnak: forgatva
              nyújtás. i-vel szorzás = +90°.
            </p>
          </Doboz>
          <Doboz cim="Gyökvonás">
            <MB>
              {
                "\\sqrt[n]{z} = \\sqrt[n]{r}\\left(\\cos\\frac{\\varphi + k\\cdot 360^\\circ}{n} + i\\sin\\frac{\\varphi + k\\cdot 360^\\circ}{n}\\right),\\ k = 0,\\dots,n-1"
              }
            </MB>
            <p>
              Pontosan n gyök, egy körön, szabályos n-szög, egymástól 360°/n-re.
              Egységgyökök: r = 1, φ = 0.
            </p>
          </Doboz>
          <Doboz cim="Egyenletek">
            <p>
              Megoldóképlet változatlan; <M>{"\\sqrt{-c} = i\\sqrt c"}</M>.
              Valós együtthatóknál a gyökök konjugált párok. Algebra alaptétele:
              n-edfokú polinomnak pontosan n komplex gyöke van.
            </p>
          </Doboz>
          <Doboz cim="Nevezetes értékek">
            <p>
              cos/sin: 30° → √3/2, 1/2 · 45° → √2/2, √2/2 · 60° → 1/2, √3/2.{" "}
              <M>{"1+i = \\sqrt2\\,e^{i\\pi/4}"}</M>, <M>{"e^{i\\pi} = -1"}</M>.
            </p>
          </Doboz>
          <Doboz cim="Tipikus hibák" szeles>
            <p>
              A negyed elrontása (a számológép csak ±90°-ot ad) ·{" "}
              <M>{"\\sqrt{x}\\sqrt{y} = \\sqrt{xy}"}</M> negatívokra (−1 = 1
              jönne ki) · csak a k = 0 gyök felírása · <M>{"|z|^2"}</M> és{" "}
              <M>{"z^2"}</M> keverése · Im z i-vel együtt · a számláló
              konjugáltjával bővítés · Moivre-nál a nagy szög nem redukálva.
            </p>
          </Doboz>
        </>
      }
    />
  );
}
