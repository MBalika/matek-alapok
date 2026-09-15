import { M, MB } from "@/components/ui/Keplet";
import { Lap, Doboz } from "./PuskaElemek";

export default function PuskaHatarozott() {
  return (
    <Lap
      szam={7}
      cim="Határozott integrál és alkalmazásai"
      gyerekek={
        <>
          <Doboz cim="Definíció, előjeles terület">
            <MB>{"\\int_a^b f(x)\\,dx = \\lim_{\\max\\Delta x_i\\to0}\\sum_{i=1}^n f(\\xi_i)\\,\\Delta x_i"}</MB>
            <p>
              Alsó és felső összeg: <M>{"s_n=\\sum m_i\\Delta x_i \\le \\sigma_n \\le S_n=\\sum M_i\\Delta x_i"}</M>.
              Integrálható <M>{"\\iff"}</M> <M>{"S_n-s_n\\to0"}</M>.
            </p>
            <p>
              <strong>Elégséges:</strong> folytonos; korlátos és véges sok szakadású; monoton korlátos.
            </p>
            <p>
              Az integrál <strong>előjeles</strong> terület: <M>{"T_{\\text{fölötte}}-T_{\\text{alatta}}"}</M>. Valódi
              terület: <M>{"\\int_a^b|f|"}</M>, a zérushelyeknél darabolva.
            </p>
          </Doboz>

          <Doboz cim="Tulajdonságok, középértéktétel">
            <p>
              <M>{"\\int_a^b cf = c\\int_a^b f"}</M> · <M>{"\\int_a^b(f+g)=\\int_a^b f+\\int_a^b g"}</M> ·{" "}
              <M>{"\\int_a^b f=\\int_a^c f+\\int_c^b f"}</M>
            </p>
            <p>
              <M>{"\\int_a^a f = 0"}</M>, <M>{"\\int_b^a f = -\\int_a^b f"}</M>;{" "}
              <M>{"m(b-a)\\le\\int_a^b f\\le M(b-a)"}</M>
            </p>
            <p>
              <strong>Középértéktétel</strong> (folytonos <M>{"f"}</M>): van <M>{"\\xi"}</M>, hogy{" "}
              <M>{"\\int_a^b f = f(\\xi)(b-a)"}</M>. Átlagérték:{" "}
              <M>{"\\bar f=\\frac{1}{b-a}\\int_a^b f"}</M>.
            </p>
            <p>
              <strong>Nincs:</strong> <M>{"\\int fg \\ne \\int f\\cdot\\int g"}</M>.
            </p>
          </Doboz>

          <Doboz cim="Newton–Leibniz-tétel">
            <MB>{"\\int_a^b f(x)\\,dx = \\left[F(x)\\right]_a^b = F(b)-F(a),\\quad F'=f"}</MB>
            <p>
              <strong>Integrálfüggvény:</strong> <M>{"T(x)=\\int_a^x f(t)\\,dt \\Rightarrow T'(x)=f(x)"}</M> — a
              terület növekedési sebessége a görbe magassága.
            </p>
            <p>
              Határozott integrálnál <strong>nincs +C</strong> (kiesik), és a sorrend <strong>felső mínusz alsó</strong>.
            </p>
          </Doboz>

          <Doboz cim="Technikák — a határokra figyelj!">
            <MB>{"\\int_a^b f(x)dx=\\int_{\\alpha}^{\\beta}f\\left(g(t)\\right)g'(t)\\,dt,\\quad g(\\alpha)=a,\\ g(\\beta)=b"}</MB>
            <p>
              <strong>Új változó → új határ!</strong> Pl. <M>{"u=x^2+16"}</M>: a 0 és 3 helyett 16 és 25.
            </p>
            <MB>{"\\int_a^b uv'\\,dx = \\left[uv\\right]_a^b - \\int_a^b u'v\\,dx"}</MB>
            <p>
              <strong>Szimmetria:</strong> páros <M>{"f"}</M>: <M>{"\\int_{-a}^af=2\\int_0^af"}</M>; páratlan{" "}
              <M>{"f"}</M>: <M>{"\\int_{-a}^af=0"}</M>.
            </p>
          </Doboz>

          <Doboz cim="Terület" szeles>
            <div className="grid gap-x-5 sm:grid-cols-2">
              <div>
                <p>
                  Görbe alatt (<M>{"f\\ge0"}</M>): <M>{"T=\\int_a^b f\\,dx"}</M>; általában{" "}
                  <M>{"T=\\int_a^b|f|\\,dx"}</M>
                </p>
                <p>
                  Két görbe között: <M>{"T=\\int_a^b\\left(f_{\\text{felső}}-f_{\\text{alsó}}\\right)dx"}</M> — a
                  határok a metszéspontok, minden metszéspontnál új szakasz.
                </p>
                <p>
                  <M>{"y"}</M> szerint: <M>{"T=\\int_c^d\\left(g_{\\text{jobb}}-g_{\\text{bal}}\\right)dy"}</M>
                </p>
              </div>
              <div>
                <p>
                  Paraméteres: <M>{"T=\\int_{\\alpha}^{\\beta}y(t)\\,\\dot x(t)\\,dt"}</M> (mínusz, ha{" "}
                  <M>{"x"}</M> csökken)
                </p>
                <p>
                  Polárkoordinátás: <M>{"T=\\frac12\\int_{\\alpha}^{\\beta}r(\\varphi)^2d\\varphi"}</M>
                </p>
                <p>
                  Nevezetes: ellipszis <M>{"ab\\pi"}</M> · ciklois egy íve alatt <M>{"3R^2\\pi"}</M> · kardioid{" "}
                  <M>{"\\frac{3a^2\\pi}{2}"}</M>
                </p>
              </div>
            </div>
          </Doboz>

          <Doboz cim="Ívhossz">
            <MB>{"s=\\int_a^b\\sqrt{1+f'(x)^2}\\;dx"}</MB>
            <p>
              Paraméteres: <M>{"s=\\int_{\\alpha}^{\\beta}\\sqrt{\\dot x^2+\\dot y^2}\\,dt"}</M> · poláris:{" "}
              <M>{"s=\\int_{\\alpha}^{\\beta}\\sqrt{r^2+r'^2}\\,d\\varphi"}</M>
            </p>
            <p>
              Minta: <M>{"\\operatorname{ch}x"}</M> a <M>{"[-\\ln3;\\ln3]"}</M>-on <M>{"\\frac83"}</M>; ciklois{" "}
              <M>{"8R"}</M>; <M>{"\\frac23x^{3/2}"}</M> a <M>{"[0;3]"}</M>-on <M>{"\\frac{14}{3}"}</M>.
            </p>
          </Doboz>

          <Doboz cim="Forgástest térfogata és felszíne">
            <MB>{"V_x=\\pi\\int_a^b f(x)^2dx,\\qquad V_y=\\pi\\int_c^d g(y)^2dy"}</MB>
            <MB>{"F_x=2\\pi\\int_a^b f(x)\\sqrt{1+f'(x)^2}\\;dx"}</MB>
            <p>
              A térfogatban <strong>négyzet, nincs gyök</strong>; a felszínben <strong>első hatvány, van gyök</strong>{" "}
              (az ívelem miatt).
            </p>
            <p>
              Gömb: <M>{"V=\\frac{4R^3\\pi}{3}"}</M>, <M>{"F=4R^2\\pi"}</M> · csonkakúp:{" "}
              <M>{"V=\\frac{\\pi m}{3}\\left(R^2+Rr+r^2\\right)"}</M>
            </p>
          </Doboz>

          <Doboz cim="Súlypont, Pappus–Guldin">
            <MB>{"S_y=\\int_a^b xf\\,dx,\\quad S_x=\\frac12\\int_a^b f^2dx,\\quad T=\\int_a^b f\\,dx"}</MB>
            <p>
              <M>{"x_s=\\frac{S_y}{T}"}</M>, <M>{"y_s=\\frac{S_x}{T}"}</M> — az <M>{"y_s"}</M>-ben ott a{" "}
              <M>{"\\frac12"}</M> és a négyzet is.
            </p>
            <p>
              <strong>Pappus–Guldin:</strong> <M>{"V=2\\pi y_s T"}</M> és <M>{"F=2\\pi y_s s"}</M> (a tengely nem
              metszheti az alakzatot).
            </p>
            <p>
              Félkörlap: <M>{"y_s=\\frac{4R}{3\\pi}\\approx0{,}424R"}</M> · tórusz: <M>{"V=2\\pi^2Rr^2"}</M>,{" "}
              <M>{"F=4\\pi^2Rr"}</M>
            </p>
          </Doboz>

          <Doboz cim="Másodrendű nyomaték">
            <MB>{"I_y=\\int_a^b x^2f\\,dx,\\qquad I_x=\\frac13\\int_a^b f^3dx"}</MB>
            <p>
              <strong>Steiner:</strong> <M>{"I = I_s + T d^2"}</M> (<M>{"d"}</M> a két párhuzamos tengely távolsága).
            </p>
            <p>
              Téglalap: alsó élre <M>{"\\frac{bh^3}{3}"}</M>, súlyponti tengelyre <M>{"\\frac{bh^3}{12}"}</M> ·
              háromszög: <M>{"\\frac{bh^3}{12}"}</M>, illetve <M>{"\\frac{bh^3}{36}"}</M>.
            </p>
          </Doboz>

          <Doboz cim="Tipikus hibák" szeles>
            <div className="grid gap-x-5 sm:grid-cols-2">
              <div>
                <p>
                  1. <strong>Új változó, régi határ</strong> helyettesítésnél — a félév leggyakoribb hibája.
                </p>
                <p>
                  2. Előjeles integrál területként (<M>{"\\int_{-1}^1x^3=0"}</M>, de a terület <M>{"\\frac12"}</M>).
                </p>
                <p>
                  3. <M>{"+C"}</M> határozott integrálnál; felső és alsó határ felcserélése.
                </p>
                <p>4. Két görbénél rossz sorrend → negatív „terület”.</p>
              </div>
              <div>
                <p>
                  5. <M>{"\\pi\\left(\\int f\\right)^2"}</M> a <M>{"\\pi\\int f^2"}</M> helyett.
                </p>
                <p>
                  6. Felszínnél a <M>{"\\sqrt{1+f'^2}"}</M> elhagyása (hengerpalást csonkakúp helyett).
                </p>
                <p>
                  7. <M>{"y"}</M> körüli forgatásnál <M>{"x"}</M> szerinti integrálás.
                </p>
                <p>
                  8. Poláris területnél az <M>{"\\frac12"}</M> vagy a négyzet elhagyása;{" "}
                  <M>{"\\sqrt{u^2}=|u|"}</M> felejtése.
                </p>
              </div>
            </div>
          </Doboz>
        </>
      }
    />
  );
}
