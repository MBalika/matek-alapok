import { M, MB } from "@/components/ui/Keplet";
import { Lap, Doboz } from "./PuskaElemek";

export default function PuskaFuggvenyek() {
  return (
    <Lap
      szam={4}
      cim="Függvények, határérték, folytonosság"
      gyerekek={
        <>
          <Doboz cim="Értelmezési tartomány — a négy tiltás">
            <p>
              <strong>nevező</strong> <M>{"\\ne 0"}</M> · <strong>páros gyök alatt</strong>{" "}
              <M>{"\\ge 0"}</M> · <strong>logaritmus argumentuma</strong> <M>{"> 0"}</M> ·{" "}
              <strong>arcsin, arccos argumentuma</strong> <M>{"\\in[-1;1]"}</M>
            </p>
            <p>
              Ha gyök a nevezőben áll, a két feltétel összeolvad: <M>{"> 0"}</M>. Például{" "}
              <M>{"\\frac{1}{\\sqrt{x^2-1}}"}</M>: <M>{"|x|>1"}</M> (a <M>{"\\pm1"}</M> is kiesik).
            </p>
            <p>
              <M>{"R_f"}</M>: fejezd ki <M>{"x"}</M>-et <M>{"y"}</M>-ból, és nézd meg, mely{" "}
              <M>{"y"}</M>-ra megoldható.
            </p>
          </Doboz>

          <Doboz cim="Tulajdonságok">
            <p>
              <strong>Szig. mon. nő:</strong> <M>{"x_1<x_2 \\Rightarrow f(x_1)<f(x_2)"}</M> ·{" "}
              <strong>páros:</strong> <M>{"f(-x)=f(x)"}</M> (y tengely) · <strong>páratlan:</strong>{" "}
              <M>{"f(-x)=-f(x)"}</M> (origó)
            </p>
            <p>
              <strong>Periodikus:</strong> <M>{"f(x+p)=f(x)"}</M> · <strong>korlátos:</strong>{" "}
              <M>{"|f(x)|\\le M"}</M> · <strong>kölcs. egyért.:</strong>{" "}
              <M>{"x_1\\ne x_2 \\Rightarrow f(x_1)\\ne f(x_2)"}</M>
            </p>
            <p>
              Szig. monoton <M>{"\\Rightarrow"}</M> kölcs. egyért. <M>{"\\Rightarrow"}</M> van inverz.
              Visszafelé nem: <M>{"1/x"}</M> kölcs. egyért., de nem monoton a <M>{"D_f"}</M>-en.
            </p>
          </Doboz>

          <Doboz cim="Inverz — a recept">
            <p>
              <strong>1.</strong> Ellenőrizd a kölcsönös egyértelműséget (vízszintes vonal-próba), ha
              kell, szűkíts le. · <strong>2.</strong> <M>{"y=f(x)"}</M>-ből fejezd ki <M>{"x"}</M>-et. ·{" "}
              <strong>3.</strong> Betűcsere (kozmetika). · <strong>4.</strong> Írd ki:
            </p>
            <MB>{"D_{f^{-1}} = R_f,\\qquad R_{f^{-1}} = D_f"}</MB>
            <p>
              Grafikon: tükrözés az <M>{"y=x"}</M> egyenesre, <M>{"(a;b)\\mapsto(b;a)"}</M>. Az{" "}
              <M>{"f^{-1}"}</M> <strong>nem</strong> <M>{"1/f"}</M>!
            </p>
          </Doboz>

          <Doboz cim="Arkuszfüggvények" szeles>
            <div className="finom-gorgeto overflow-x-auto">
              <table className="w-full text-[12.5px]">
                <thead className="text-[10px] text-petrol-500 uppercase">
                  <tr>
                    <th className="pb-0.5 text-left font-semibold">Fv.</th>
                    <th className="pb-0.5 text-left font-semibold">leszűkítés</th>
                    <th className="pb-0.5 text-left font-semibold">D</th>
                    <th className="pb-0.5 text-left font-semibold">R</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-petrol-100">
                    <td className="py-0.5">arcsin</td>
                    <td className="py-0.5">
                      <M>{"\\left[-\\frac{\\pi}{2};\\frac{\\pi}{2}\\right]"}</M>
                    </td>
                    <td className="py-0.5">
                      <M>{"[-1;1]"}</M>
                    </td>
                    <td className="py-0.5">
                      <M>{"\\left[-\\frac{\\pi}{2};\\frac{\\pi}{2}\\right]"}</M>
                    </td>
                  </tr>
                  <tr className="border-t border-petrol-100">
                    <td className="py-0.5">arccos</td>
                    <td className="py-0.5">
                      <M>{"[0;\\pi]"}</M>
                    </td>
                    <td className="py-0.5">
                      <M>{"[-1;1]"}</M>
                    </td>
                    <td className="py-0.5">
                      <M>{"[0;\\pi]"}</M>
                    </td>
                  </tr>
                  <tr className="border-t border-petrol-100">
                    <td className="py-0.5">arctg</td>
                    <td className="py-0.5">
                      <M>{"\\left(-\\frac{\\pi}{2};\\frac{\\pi}{2}\\right)"}</M>
                    </td>
                    <td className="py-0.5">
                      <M>{"\\mathbb{R}"}</M>
                    </td>
                    <td className="py-0.5">
                      <M>{"\\left(-\\frac{\\pi}{2};\\frac{\\pi}{2}\\right)"}</M>
                    </td>
                  </tr>
                  <tr className="border-t border-petrol-100">
                    <td className="py-0.5">arcctg</td>
                    <td className="py-0.5">
                      <M>{"(0;\\pi)"}</M>
                    </td>
                    <td className="py-0.5">
                      <M>{"\\mathbb{R}"}</M>
                    </td>
                    <td className="py-0.5">
                      <M>{"(0;\\pi)"}</M>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <M>{"\\arcsin(-x)=-\\arcsin x"}</M>, <M>{"\\operatorname{arctg}(-x)=-\\operatorname{arctg} x"}</M>;{" "}
              <M>{"\\arccos(-x)=\\pi-\\arccos x"}</M>, <M>{"\\operatorname{arcctg}(-x)=\\pi-\\operatorname{arcctg} x"}</M>
            </p>
            <p>
              <M>{"\\cos(\\arcsin x)=\\sin(\\arccos x)=\\sqrt{1-x^2}"}</M> ·{" "}
              <M>{"\\cos(\\operatorname{arctg} x)=\\frac{1}{\\sqrt{1+x^2}}"}</M>
            </p>
            <p>
              <strong>Egyenlet:</strong> <M>{"\\sin x=c \\Rightarrow x=x_0+2k\\pi"}</M> vagy{" "}
              <M>{"\\pi-x_0+2k\\pi"}</M>; <M>{"\\cos x=c \\Rightarrow x=\\pm x_0+2k\\pi"}</M>;{" "}
              <M>{"\\operatorname{tg} x=c \\Rightarrow x=x_0+k\\pi"}</M>
            </p>
          </Doboz>

          <Doboz cim="Hiperbolikus és area">
            <MB>{"\\operatorname{sh} x=\\frac{e^x-e^{-x}}{2},\\quad \\operatorname{ch} x=\\frac{e^x+e^{-x}}{2},\\quad \\operatorname{th} x=\\frac{\\operatorname{sh} x}{\\operatorname{ch} x}"}</MB>
            <MB>{"\\operatorname{ch}^2 x-\\operatorname{sh}^2 x=1,\\quad \\operatorname{ch} 2x=\\operatorname{ch}^2x+\\operatorname{sh}^2x,\\quad e^x=\\operatorname{ch} x+\\operatorname{sh} x"}</MB>
            <MB>{"\\operatorname{arsh} x=\\ln\\left(x+\\sqrt{x^2+1}\\right),\\quad \\operatorname{arth} x=\\tfrac12\\ln\\tfrac{1+x}{1-x}"}</MB>
            <p>
              <M>{"R_{\\operatorname{ch}}=[1;\\infty)"}</M>, <M>{"R_{\\operatorname{th}}=(-1;1)"}</M>.
              Láncgörbe: <M>{"y=a\\operatorname{ch}\\frac xa"}</M> — kötél, kábel (nem parabola).
            </p>
          </Doboz>

          <Doboz cim="Határérték — definíció és technikák">
            <MB>{"\\lim_{x\\to x_0}f(x)=A \\iff \\forall\\varepsilon>0\\ \\exists\\delta>0:"}</MB>
            <MB>{"0<|x-x_0|<\\delta \\ \\Rightarrow\\ |f(x)-A|<\\varepsilon"}</MB>
            <p>
              Létezik <M>{"\\iff"}</M> a bal és a jobb oldali határérték létezik <strong>és egyenlő</strong>.{" "}
              <strong>Átviteli elv</strong> (cáfoláshoz): két sorozat, két különböző érték.
            </p>
            <p>
              <strong>Technikák:</strong> <M>{"\\frac00"}</M> polinomnál → szorzattá alakítás;
              gyöknél → bővítés a konjugálttal; <M>{"\\frac{\\infty}{\\infty}"}</M> → osztás a domináns
              taggal (gyök alatt <M>{"x^2"}</M>-tel!); <M>{"1^{\\infty}"}</M> → <M>{"e"}</M>-alak.
            </p>
            <p>
              Határozatlan alakok: <M>{"\\frac00,\\ \\frac{\\infty}{\\infty},\\ \\infty-\\infty,\\ 0\\cdot\\infty,\\ 1^{\\infty}"}</M>
            </p>
          </Doboz>

          <Doboz cim="Nevezetes határértékek">
            <MB>{"\\lim_{x\\to0}\\frac{\\sin x}{x}=1,\\qquad \\lim_{x\\to0}\\frac{1-\\cos x}{x^2}=\\frac12"}</MB>
            <MB>{"\\lim_{x\\to\\infty}\\left(1+\\frac1x\\right)^x=e,\\qquad \\lim_{x\\to0}\\frac{\\ln(1+x)}{x}=1"}</MB>
            <MB>{"\\lim_{x\\to0}\\frac{e^x-1}{x}=1,\\qquad \\lim_{x\\to0}\\frac{(1+x)^{\\mu}-1}{x}=\\mu"}</MB>
            <p>
              Következmények: <M>{"\\frac{\\sin ax}{bx}\\to\\frac ab"}</M>,{" "}
              <M>{"\\left(1+\\frac ax\\right)^{bx}\\to e^{ab}"}</M>. Csak <strong>radiánban</strong>!
            </p>
          </Doboz>

          <Doboz cim="Folytonosság és szakadások">
            <p>
              <M>{"f"}</M> folytonos <M>{"x_0"}</M>-ban <M>{"\\iff"}</M> (1) létezik a véges határérték,
              (2) létezik <M>{"f(x_0)"}</M>, (3) a kettő egyenlő.
            </p>
            <p>
              <strong>megszüntethető:</strong> a határérték létezik, az érték hiányzik/rossz →
              átdefiniálható · <strong>ugrás (elsőfajú):</strong> bal <M>{"\\ne"}</M> jobb, mindkettő
              véges · <strong>pólus (másodfajú):</strong> valamelyik egyoldali határérték végtelen
            </p>
            <p>
              Az elemi függvények a <strong>teljes</strong> értelmezési tartományukon folytonosak. A{" "}
              <M>{"\\operatorname{tg}"}</M> nem „szakad” a <M>{"\\frac{\\pi}{2}"}</M>-ben: ott nincs
              értelmezve.
            </p>
          </Doboz>

          <Doboz cim="Bolzano és Weierstrass">
            <p>
              <strong>Weierstrass:</strong> <M>{"[a;b]"}</M> <em>korlátos és zárt</em>, <M>{"f"}</M>{" "}
              folytonos <M>{"\\Rightarrow"}</M> <M>{"f"}</M> korlátos, és felveszi a minimumát és a
              maximumát. Nyílt intervallumon nem igaz.
            </p>
            <p>
              <strong>Bolzano:</strong> <M>{"f"}</M> folytonos <M>{"[a;b]"}</M>-n{" "}
              <M>{"\\Rightarrow"}</M> minden <M>{"f(a)"}</M> és <M>{"f(b)"}</M> közti értéket felvesz.
              Ha <M>{"f(a)f(b)<0"}</M>, van gyök. Páratlan fokú valós polinomnak mindig van valós gyöke.
            </p>
            <p>
              <strong>Felezés:</strong> <M>{"c=\\frac{a+b}{2}"}</M>, előjel alapján szűkíts;{" "}
              <M>{"n"}</M> lépés után a hiba <M>{"\\le\\frac{b-a}{2^{n+1}}"}</M>.
            </p>
          </Doboz>

          <Doboz cim="Tipikus hibák" szeles>
            <p>
              <strong>1.</strong> Az <M>{"\\ln"}</M> argumentumára <M>{"\\ge 0"}</M>-t írni{" "}
              <M>{"> 0"}</M> helyett. · <strong>2.</strong> Az <M>{"f^{-1}"}</M>-et reciproknak venni. ·{" "}
              <strong>3.</strong> Inverzet keresni a kölcsönös egyértelműség ellenőrzése nélkül{" "}
              (<M>{"x^2"}</M>). · <strong>4.</strong> Az inverz <M>{"D"}</M> és <M>{"R"}</M> megadását
              elhagyni.
            </p>
            <p>
              <strong>5.</strong> Az <M>{"\\arcsin\\frac12"}</M> (egy szám) és a{" "}
              <M>{"\\sin x=\\frac12"}</M> (végtelen sok megoldás) összekeverése. · <strong>6.</strong>{" "}
              <M>{"\\arccos(-x)=-\\arccos x"}</M> — hamis! · <strong>7.</strong>{" "}
              <M>{"\\operatorname{ch}^2+\\operatorname{sh}^2=1"}</M> — hamis, a{" "}
              <em>különbség</em> az 1.
            </p>
            <p>
              <strong>8.</strong> A határértékhez nem kell <M>{"f(x_0)"}</M> (és fordítva sem). ·{" "}
              <strong>9.</strong> A <M>{"\\frac00"}</M> eredményként való feltüntetése. ·{" "}
              <strong>10.</strong> <M>{"\\lim_{x\\to\\infty}\\frac{\\sin x}{x}=1"}</M> — hamis, ez 0. ·{" "}
              <strong>11.</strong> Weierstrass alkalmazása nyílt intervallumon.
            </p>
          </Doboz>
        </>
      }
    />
  );
}
