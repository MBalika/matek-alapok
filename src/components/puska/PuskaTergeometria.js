import { M, MB } from "@/components/ui/Keplet";
import { Lap, Doboz } from "./PuskaElemek";

export default function PuskaTergeometria() {
  return (
    <Lap
      szam={2}
      cim="Térgeometria"
      gyerekek={
        <>
          <Doboz cim="Vektorok a térben">
            <MB>{"\\overrightarrow{P_1P_2} = (x_2-x_1;\\, y_2-y_1;\\, z_2-z_1)"}</MB>
            <MB>{"|\\mathbf{a}| = \\sqrt{a_1^2+a_2^2+a_3^2},\\qquad \\mathbf{e}_a = \\frac{\\mathbf{a}}{|\\mathbf{a}|}"}</MB>
            <p>
              <strong>Végpont mínusz kezdőpont.</strong> Párhuzamosság:{" "}
              <M>{"\\mathbf{u} = \\lambda\\mathbf{v}"}</M>, azaz a koordináták arányosak.
            </p>
          </Doboz>

          <Doboz cim="Skaláris szorzat — szám">
            <MB>{"\\mathbf{u}\\cdot\\mathbf{v} = |\\mathbf{u}||\\mathbf{v}|\\cos\\varphi = u_1v_1+u_2v_2+u_3v_3"}</MB>
            <MB>{"\\cos\\varphi = \\frac{\\mathbf{u}\\cdot\\mathbf{v}}{|\\mathbf{u}||\\mathbf{v}|},\\qquad \\mathbf{u}_\\parallel = \\frac{\\mathbf{u}\\cdot\\mathbf{v}}{|\\mathbf{v}|^2}\\mathbf{v}"}</MB>
            <p>
              <M>{"\\mathbf{u}\\perp\\mathbf{v} \\iff \\mathbf{u}\\cdot\\mathbf{v} = 0"}</M>;{" "}
              <M>{"\\mathbf{u}\\cdot\\mathbf{u} = |\\mathbf{u}|^2"}</M>. Munka:{" "}
              <M>{"W = \\mathbf{F}\\cdot\\mathbf{s}"}</M>.
            </p>
          </Doboz>

          <Doboz cim="Vektoriális szorzat — vektor">
            <MB>{"\\mathbf{a}\\times\\mathbf{b} = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\end{vmatrix} = (a_2b_3-a_3b_2;\\, a_3b_1-a_1b_3;\\, a_1b_2-a_2b_1)"}</MB>
            <p>
              <M>{"|\\mathbf{a}\\times\\mathbf{b}| = |\\mathbf{a}||\\mathbf{b}|\\sin\\varphi = T_{\\text{paral.}}"}</M>,{" "}
              <M>{"T_\\triangle = \\tfrac12|\\mathbf{a}\\times\\mathbf{b}|"}</M>. Jobbkéz-szabály;{" "}
              <M>{"\\mathbf{b}\\times\\mathbf{a} = -\\mathbf{a}\\times\\mathbf{b}"}</M>;{" "}
              <M>{"= \\mathbf{0} \\iff \\text{párhuzamos}"}</M>. Nyomaték:{" "}
              <M>{"\\mathbf{M} = \\mathbf{r}\\times\\mathbf{F}"}</M>.
            </p>
          </Doboz>

          <Doboz cim="Vegyes szorzat — szám">
            <MB>{"(\\mathbf{a}\\times\\mathbf{b})\\cdot\\mathbf{c} = \\begin{vmatrix} a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\\\ c_1 & c_2 & c_3 \\end{vmatrix}"}</MB>
            <p>
              <M>{"V_{\\text{paral.epipedon}} = |(\\mathbf{a}\\times\\mathbf{b})\\cdot\\mathbf{c}|"}</M>,{" "}
              <M>{"V_{\\text{tetraéder}} = \\tfrac16|(\\mathbf{a}\\times\\mathbf{b})\\cdot\\mathbf{c}|"}</M>.
              Komplanáris <M>{"\\iff"}</M> a vegyes szorzat 0. Ciklikus csere nem változtat, két vektor cseréje
              előjelet vált.
            </p>
          </Doboz>

          <Doboz cim="Az egyenes">
            <MB>{"x = x_0+tv_1,\\quad y = y_0+tv_2,\\quad z = z_0+tv_3"}</MB>
            <MB>{"\\frac{x-x_0}{v_1} = \\frac{y-y_0}{v_2} = \\frac{z-z_0}{v_3}"}</MB>
            <p>
              Két ponton át: <M>{"\\mathbf{v} = \\overrightarrow{P_1P_2}"}</M>. Ha valamelyik{" "}
              <M>{"v_i = 0"}</M>, a kanonikus alak nem írható fel — az a koordináta állandó. Végtelen sok helyes
              alak van.
            </p>
          </Doboz>

          <Doboz cim="A sík">
            <MB>{"n_1(x-x_0)+n_2(y-y_0)+n_3(z-z_0) = 0 \\;\\Rightarrow\\; n_1x+n_2y+n_3z = d_0"}</MB>
            <p>
              Az <strong>együtthatók = a normálvektor</strong>. Három pontból:{" "}
              <M>{"\\mathbf{n} = \\overrightarrow{AB}\\times\\overrightarrow{AC}"}</M>. Tengelymetszetes:{" "}
              <M>{"\\frac{x}{p}+\\frac{y}{q}+\\frac{z}{r} = 1"}</M>. Párhuzamos sík: ugyanaz a bal oldal, más{" "}
              <M>{"d_0"}</M>.
            </p>
          </Doboz>

          <Doboz cim="Kölcsönös helyzetek" szeles>
            <p>
              <strong>Két egyenes:</strong> párhuzamosak az irányvektorok? Igen → az egyik pontja rajta van-e a
              másikon: egybeeső / párhuzamos. Nem → <M>{"t_1, t_2"}</M> két egyenletből, majd{" "}
              <strong>behelyettesítés a harmadikba</strong>: teljesül → metsző, nem → <strong>kitérő</strong>.
            </p>
            <p>
              <strong>Egyenes és sík:</strong> <M>{"\\mathbf{v}\\cdot\\mathbf{n} \\ne 0"}</M> → döfi (a paraméteres
              alakot a sík egyenletébe írva <M>{"t"}</M> adódik). <M>{"\\mathbf{v}\\cdot\\mathbf{n} = 0"}</M> →
              párhuzamos, vagy benne fekszik (egy pont behelyettesítése dönt). <em>Itt a nulla jelenti a
              párhuzamosságot!</em>
            </p>
            <p>
              <strong>Két sík:</strong> <M>{"\\mathbf{n}_1 \\parallel \\mathbf{n}_2"}</M> → párhuzamos vagy
              egybeeső; különben metszésvonal, iránya <M>{"\\mathbf{n}_1\\times\\mathbf{n}_2"}</M>, egy pontja az
              egyik változó rögzítésével.
            </p>
          </Doboz>

          <Doboz cim="Távolságok">
            <MB>{"d(P,Q) = \\left|\\overrightarrow{PQ}\\right|"}</MB>
            <MB>{"d(Q, e) = \\frac{\\left|\\overrightarrow{PQ}\\times\\mathbf{v}\\right|}{|\\mathbf{v}|}"}</MB>
            <MB>{"d(Q, S) = \\frac{\\left|n_1x_Q+n_2y_Q+n_3z_Q-d_0\\right|}{\\sqrt{n_1^2+n_2^2+n_3^2}}"}</MB>
            <MB>{"d(e, f) = \\frac{\\left|\\overrightarrow{PQ}\\cdot(\\mathbf{v}_1\\times\\mathbf{v}_2)\\right|}{|\\mathbf{v}_1\\times\\mathbf{v}_2|}"}</MB>
            <p>Mindegyik ugyanaz: „szorzat abszolút értéke osztva egy hosszal”.</p>
          </Doboz>

          <Doboz cim="Szögek — mind hegyesszög">
            <MB>{"\\text{egyenes–egyenes: } \\cos\\varphi = \\frac{|\\mathbf{v}_1\\cdot\\mathbf{v}_2|}{|\\mathbf{v}_1||\\mathbf{v}_2|}"}</MB>
            <MB>{"\\text{egyenes–sík: } \\sin\\alpha = \\frac{|\\mathbf{v}\\cdot\\mathbf{n}|}{|\\mathbf{v}||\\mathbf{n}|}"}</MB>
            <MB>{"\\text{sík–sík: } \\cos\\gamma = \\frac{|\\mathbf{n}_1\\cdot\\mathbf{n}_2|}{|\\mathbf{n}_1||\\mathbf{n}_2|}"}</MB>
            <p>
              Mindháromban abszolút érték, az eredmény <M>{"0^\\circ"}</M> és <M>{"90^\\circ"}</M> között.{" "}
              <strong>Vektorok</strong> hajlásszögénél viszont NINCS abszolút érték.
            </p>
          </Doboz>

          <Doboz cim="Tipikus hibák" szeles>
            <p>
              Skaláris szorzat eredménye szám, a vektoriálisé vektor (ez a leggyakoribb hiba) · a determináns
              középső tagját <strong>kivonjuk</strong> · irányvektor és normálvektor felcserélése · két egyenes
              metszésénél <M>{"t_1"}</M> és <M>{"t_2"}</M> kell, és a <strong>harmadik egyenletet is</strong>{" "}
              ellenőrizni · a szögképletekből kimaradt abszolút érték · egyenes–sík szögnél koszinusz szinusz
              helyett (a pótszöget kapod) · a pont–sík képletből kimaradt <M>{"|\\mathbf{n}|"}</M> · a sík
              egyenlete nincs egy oldalra rendezve · nullával osztás a kanonikus alakban ·{" "}
              <M>{"(\\mathbf{a}\\times\\mathbf{b})\\times\\mathbf{c} \\ne \\mathbf{a}\\times(\\mathbf{b}\\times\\mathbf{c})"}</M>{" "}
              — zárójel nélkül értelmetlen · vektorokkal nem lehet osztani, „egyszerűsíteni”.
            </p>
          </Doboz>
        </>
      }
    />
  );
}
