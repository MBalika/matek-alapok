import { M, MB } from "@/components/ui/Keplet";
import { Lap, Doboz } from "./PuskaElemek";

export default function PuskaImproprius() {
  return (
    <Lap
      szam={8}
      cim="Improprius és numerikus integrálás"
      gyerekek={
        <>
          <Doboz cim="A két típus — mindig határátmenet" szeles>
            <div className="grid gap-x-5 sm:grid-cols-2">
              <div>
                <p>
                  <strong>I. típus</strong> (nem korlátos integrandus):
                </p>
                <MB>{"\\int_a^b f = \\lim_{c\\to b-0}\\int_a^{c} f \\quad\\text{(jobb végpont)}"}</MB>
                <MB>{"\\int_a^b f = \\lim_{c\\to a+0}\\int_c^{b} f \\quad\\text{(bal végpont)}"}</MB>
              </div>
              <div>
                <p>
                  <strong>II. típus</strong> (nem korlátos tartomány):
                </p>
                <MB>{"\\int_a^{\\infty} f = \\lim_{d\\to\\infty}\\int_a^{d} f"}</MB>
                <MB>{"\\int_{-\\infty}^{\\infty} f = \\lim_{c\\to-\\infty}\\int_c^{0} f + \\lim_{d\\to\\infty}\\int_0^{d} f"}</MB>
              </div>
            </div>
            <p>
              <strong>Konvergens</strong> = minden határérték létezik és <em>véges</em>. Több kritikus hely esetén
              mindegyiket <strong>külön</strong> kell kezelni; ha bármelyik rész divergens, az egész az.
            </p>
          </Doboz>

          <Doboz cim="A nevezetes p-integrálok (fejből!)">
            <MB>{"\\int_1^{\\infty}\\frac{dx}{x^p} = \\frac{1}{p-1}\\ (p>1);\\ \\text{div., ha } p\\le1"}</MB>
            <MB>{"\\int_0^{1}\\frac{dx}{x^p} = \\frac{1}{1-p}\\ (p<1);\\ \\text{div., ha } p\\ge1"}</MB>
            <p>
              <em>A végtelenben a nagy kitevő a jó, a nullában a kicsi.</em> A <M>{"p=1"}</M> eset mindig divergens.
              Ezért <M>{"\\int_0^{\\infty}\\frac{dx}{x^p}"}</M> soha nem konvergens.
            </p>
          </Doboz>

          <Doboz cim="Majoráns és minoráns — az irány kötött!">
            <p>
              Mindenhol <M>{"f,g,h \\ge 0"}</M> a kritikus hely környékén.
            </p>
            <p>
              <strong>Majoráns:</strong> ha <M>{"f\\le g"}</M> és <M>{"\\int g"}</M> <em>konvergens</em>, akkor{" "}
              <M>{"\\int f"}</M> konvergens.
            </p>
            <p>
              <strong>Minoráns:</strong> ha <M>{"f\\ge h"}</M> és <M>{"\\int h"}</M> <em>divergens</em>, akkor{" "}
              <M>{"\\int f"}</M> divergens.
            </p>
            <p>
              Divergens majoránsból és konvergens minoránsból <strong>semmi</strong> nem következik. Elég, ha az
              egyenlőtlenség csak a kritikus hely környékén áll fenn.
            </p>
          </Doboz>

          <Doboz cim="Limeszes kritérium — a recept">
            <MB>{"\\lim_{x\\to\\infty}\\frac{f(x)}{g(x)} = L,\\quad 0<L<\\infty"}</MB>
            <p>
              Ekkor <M>{"\\int f"}</M> és <M>{"\\int g"}</M> <strong>egyszerre</strong> konvergens vagy divergens.
            </p>
            <p>
              <strong>1.</strong> Tartsd meg a legnagyobb rendű tagokat. <strong>2.</strong> Innen{" "}
              <M>{"g=1/x^p"}</M>. <strong>3.</strong> Számold ki <M>{"L"}</M>-et, majd döntsön a p-kritérium.
            </p>
            <p>
              Racionális tört: konvergens <M>{"\\iff"}</M> a nevező foka legalább kettővel nagyobb.{" "}
              <M>{"L=0"}</M> vagy <M>{"L=\\infty"}</M> esetén rosszul választottál <M>{"g"}</M>-t.
            </p>
          </Doboz>

          <Doboz cim="Belső szakadás és a Cauchy-csapda">
            <MB>{"\\int_a^b f = \\lim_{u\\to c-0}\\int_a^{u} f + \\lim_{v\\to c+0}\\int_{v}^{b} f"}</MB>
            <p>
              Mindkét tagnak <strong>külön</strong> végesnek kell lennie; <M>{"+\\infty"}</M> és <M>{"-\\infty"}</M>{" "}
              nem ejti ki egymást. Klasszikus csapda:
            </p>
            <MB>{"\\int_{-1}^{1}\\frac{dx}{x^2} \\ne -2 \\quad(\\text{divergens!})"}</MB>
            <p>
              A <M>{"\\lim_{d\\to\\infty}\\int_{-d}^{d} f"}</M> (Cauchy-főérték) <strong>nem</strong> az improprius
              integrál: <M>{"f(x)=x"}</M>-re 0-t ad, pedig az integrál divergens.
            </p>
          </Doboz>

          <Doboz cim="Torricelli-trombita (y = 1/x, x ≥ 1)">
            <MB>{"V = \\pi\\int_1^{\\infty}\\frac{dx}{x^2} = \\pi \\quad(\\text{véges})"}</MB>
            <MB>{"F = 2\\pi\\int_1^{\\infty}\\frac1x\\sqrt{1+\\tfrac{1}{x^4}}\\,dx \\ge 2\\pi\\int_1^{\\infty}\\frac{dx}{x} = \\infty"}</MB>
            <p>
              Véges térfogat, végtelen felszín. A négyzetre emelés (<M>{"f^2 = 1/x^2"}</M>) billenti át a{" "}
              <M>{"p=1"}</M> határon.
            </p>
          </Doboz>

          <Doboz cim="Trapézszabály">
            <p>
              <M>{"h = \\frac{b-a}{n}"}</M>, <M>{"x_i = a+ih"}</M>, <M>{"y_i = f(x_i)"}</M>, <M>{"i=0\\dots n"}</M>.
            </p>
            <MB>{"\\int_a^b f \\approx \\frac h2\\left(y_0+2y_1+\\dots+2y_{n-1}+y_n\\right)"}</MB>
            <MB>{"\\left|E_T\\right| \\le \\frac{(b-a)h^2}{12}M_2,\\quad M_2=\\max|f''|"}</MB>
            <p>
              Másodrendű (<M>{"n"}</M> duplázása → hiba negyedére), egyenesre pontos. Konvex függvénynél{" "}
              <strong>felülbecsül</strong>.
            </p>
          </Doboz>

          <Doboz cim="Simpson-szabály (n páros!)">
            <MB>{"\\int_a^b f \\approx \\frac h3\\left(y_0+4y_1+2y_2+4y_3+\\dots+4y_{n-1}+y_n\\right)"}</MB>
            <MB>{"\\left|E_S\\right| \\le \\frac{(b-a)h^4}{180}M_4,\\quad M_4=\\max\\left|f^{(4)}\\right|"}</MB>
            <p>
              Negyedrendű (<M>{"n"}</M> duplázása → hiba tizenhatodára), és <strong>harmadfokú</strong> polinomra is
              pontos. Egy parabola két részintervallumot fog össze, ezért kell páros <M>{"n"}</M>.
            </p>
          </Doboz>

          <Doboz cim="Súlyellenőrzés és mintapélda">
            <p>
              A súlyok összege trapéznál <M>{"2n"}</M>, Simpsonnál <M>{"3n"}</M>; a szorzóval együtt mindkettő{" "}
              <M>{"b-a"}</M>. Ez a leggyorsabb hibaszűrő.
            </p>
            <p>
              <M>{"\\int_1^2\\frac{dx}{x} = \\ln2 = 0{,}693147"}</M>, <M>{"n=4"}</M>:
            </p>
            <p>
              trapéz <M>{"0{,}697024"}</M> (hiba <M>{"0{,}003877"}</M>), Simpson <M>{"0{,}693254"}</M> (hiba{" "}
              <M>{"0{,}000107"}</M>) — ugyanabból az 5 értékből, 36-szor pontosabban.
            </p>
            <p>
              Gyakori konvergens integrálok: <M>{"\\int_0^{\\infty}e^{-kx}dx=\\frac1k"}</M>,{" "}
              <M>{"\\int_{-\\infty}^{\\infty}\\frac{dx}{1+x^2}=\\pi"}</M>, <M>{"\\int_0^1\\ln x\\,dx=-1"}</M>,{" "}
              <M>{"\\int_0^{\\infty}xe^{-x^2}dx=\\frac12"}</M>.
            </p>
          </Doboz>

          <Doboz cim="Tipikus hibák" szeles>
            <div className="grid gap-x-5 sm:grid-cols-2">
              <div>
                <p>
                  <strong>1.</strong> A szakadási hely észrevétlen marad, és jön a gépies Newton–Leibniz (
                  <M>{"\\int_{-1}^{1}x^{-2} = -2"}</M> — pozitív függvénynél lehetetlen).
                </p>
                <p>
                  <strong>2.</strong> Belső szakadásnál csak az egyik oldalt nézzük.
                </p>
                <p>
                  <strong>3.</strong> Cauchy-főérték az improprius integrál helyett.
                </p>
                <p>
                  <strong>4.</strong> A p-kritérium két esetének felcserélése.
                </p>
                <p>
                  <strong>5.</strong> „A függvény nullához tart, tehát konvergens” — hamis.
                </p>
                <p>
                  <strong>6.</strong> Majoráns/minoráns rossz irányban.
                </p>
              </div>
              <div>
                <p>
                  <strong>7.</strong> Előjelet váltó integrandusra alkalmazott összehasonlító kritérium.
                </p>
                <p>
                  <strong>8.</strong> <M>{"L=0"}</M> vagy <M>{"L=\\infty"}</M> félreértése a limeszes kritériumban.
                </p>
                <p>
                  <strong>9.</strong> Simpson páratlan <M>{"n"}</M>-nel.
                </p>
                <p>
                  <strong>10.</strong> Rossz súlyok, vagy <M>{"\\frac h2"}</M> és <M>{"\\frac h3"}</M> felcserélése.
                </p>
                <p>
                  <strong>11.</strong> Osztópont (<M>{"n+1"}</M>) és részintervallum (<M>{"n"}</M>) összekeverése.
                </p>
                <p>
                  <strong>12.</strong> Improprius integrál numerikus közelítése a konvergencia igazolása nélkül.
                </p>
              </div>
            </div>
          </Doboz>
        </>
      }
    />
  );
}
