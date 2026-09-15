import { M, MB } from "@/components/ui/Keplet";
import { Lap, Doboz } from "./PuskaElemek";

export default function PuskaDerivalas() {
  return (
    <Lap
      szam={5}
      cim="Differenciálszámítás"
      gyerekek={
        <>
          <Doboz cim="A derivált fogalma">
            <MB>
              {
                "f'(x_0) = \\lim_{\\Delta x\\to0}\\frac{f(x_0+\\Delta x)-f(x_0)}{\\Delta x} = \\lim_{x\\to x_0}\\frac{f(x)-f(x_0)}{x-x_0}"
              }
            </MB>
            <p>
              Geometriailag az <strong>érintő meredeksége</strong>, fizikailag a <strong>pillanatnyi változási
              sebesség</strong>. Jelölések: <M>{"f'(x)"}</M>, <M>{"\\frac{df}{dx}"}</M>, <M>{"\\dot s(t)"}</M>.
            </p>
            <p>
              Differenciálható <M>{"\\Rightarrow"}</M> folytonos. Visszafelé <strong>nem</strong>:{" "}
              <M>{"|x|"}</M> a 0-ban (csúcs), <M>{"\\sqrt[3]{x}"}</M> a 0-ban (függőleges érintő).
            </p>
            <p>
              Differenciálható <M>{"\\iff"}</M> a bal és a jobb oldali derivált létezik, véges és egyenlő.
            </p>
          </Doboz>

          <Doboz cim="Deriválási szabályok">
            <p>
              <M>{"(cf)' = cf'"}</M> · <M>{"(f\\pm g)' = f'\\pm g'"}</M> · <M>{"(fg)' = f'g+fg'"}</M>
            </p>
            <MB>{"\\left(\\frac fg\\right)' = \\frac{f'g-fg'}{g^2} \\quad (g\\ne0)"}</MB>
            <MB>{"\\left(f(g(x))\\right)' = f'(g(x))\\cdot g'(x)"}</MB>
            <p>
              <strong>Inverz:</strong> <M>{"\\left(f^{-1}\\right)'(x) = \\frac{1}{f'\\left(f^{-1}(x)\\right)}"}</M>
            </p>
            <p>
              <strong>Logaritmikus</strong> (<M>{"y=f^g"}</M>): <M>{"\\ln y = g\\ln f"}</M>, majd implicit deriválás →{" "}
              <M>{"y' = f^{g}\\left(g'\\ln f + g\\frac{f'}{f}\\right)"}</M>. Minta:{" "}
              <M>{"(x^x)' = x^x(\\ln x+1)"}</M>.
            </p>
          </Doboz>

          <Doboz cim="Alapfüggvények deriváltjai" szeles>
            <div className="grid gap-x-5 sm:grid-cols-2">
              <div>
                <p>
                  <M>{"(c)'=0"}</M> · <M>{"\\left(x^{\\mu}\\right)' = \\mu x^{\\mu-1}"}</M> ·{" "}
                  <M>{"\\left(\\sqrt x\\right)' = \\frac{1}{2\\sqrt x}"}</M> ·{" "}
                  <M>{"\\left(\\frac1x\\right)' = -\\frac{1}{x^2}"}</M>
                </p>
                <p>
                  <M>{"\\left(e^x\\right)' = e^x"}</M> · <M>{"\\left(a^x\\right)' = a^x\\ln a"}</M> ·{" "}
                  <M>{"\\left(\\ln x\\right)' = \\frac1x"}</M> ·{" "}
                  <M>{"\\left(\\log_a x\\right)' = \\frac{1}{x\\ln a}"}</M>
                </p>
                <p>
                  <M>{"\\left(\\sin x\\right)' = \\cos x"}</M> · <M>{"\\left(\\cos x\\right)' = -\\sin x"}</M>
                </p>
              </div>
              <div>
                <p>
                  <M>{"\\left(\\operatorname{tg} x\\right)' = \\frac{1}{\\cos^2x}"}</M> ·{" "}
                  <M>{"\\left(\\operatorname{ctg} x\\right)' = -\\frac{1}{\\sin^2x}"}</M>
                </p>
                <p>
                  <M>{"\\left(\\arcsin x\\right)' = \\frac{1}{\\sqrt{1-x^2}}"}</M> ·{" "}
                  <M>{"\\left(\\arccos x\\right)' = -\\frac{1}{\\sqrt{1-x^2}}"}</M> ·{" "}
                  <M>{"\\left(\\operatorname{arctg} x\\right)' = \\frac{1}{1+x^2}"}</M>
                </p>
                <p>
                  <M>{"\\left(\\operatorname{sh} x\\right)' = \\operatorname{ch} x"}</M> ·{" "}
                  <M>{"\\left(\\operatorname{ch} x\\right)' = \\operatorname{sh} x"}</M> ·{" "}
                  <M>{"\\left(\\operatorname{th} x\\right)' = \\frac{1}{\\operatorname{ch}^2x}"}</M>
                </p>
              </div>
            </div>
            <p>
              <strong>Radián, nem fok!</strong> A trigonometrikus képletek fokban egy{" "}
              <M>{"\\frac{\\pi}{180}"}</M> szorzóval módosulnának.
            </p>
          </Doboz>

          <Doboz cim="Érintő, normális, implicit, paraméteres">
            <MB>{"\\text{érintő: } y = f'(x_0)(x-x_0)+f(x_0)"}</MB>
            <MB>{"\\text{normális: } y = -\\frac{1}{f'(x_0)}(x-x_0)+f(x_0)"}</MB>
            <p>
              <strong>Implicit:</strong> deriváld az egyenlet mindkét oldalát x szerint,{" "}
              <M>{"(y^2)'=2yy'"}</M>, <M>{"(xy)'=y+xy'"}</M>, majd fejezd ki <M>{"y'"}</M>-t. Minta:{" "}
              <M>{"x^2+y^2=25"}</M> → <M>{"y'=-\\frac xy"}</M>; a <M>{"(3;\\,4)"}</M>-ben <M>{"-\\frac34"}</M>.
            </p>
            <p>
              <strong>Paraméteres:</strong> <M>{"\\frac{dy}{dx} = \\frac{\\dot y}{\\dot x}"}</M>,{" "}
              <M>{"\\frac{d^2y}{dx^2} = \\frac{\\ddot y\\dot x - \\dot y\\ddot x}{\\dot x^3}"}</M>.
            </p>
          </Doboz>

          <Doboz cim="Magasabbrendű deriváltak, középértéktételek">
            <p>
              <M>{"f''=(f')'"}</M>: a görbültség iránya. Mérnökileg <M>{"y''\\sim M"}</M>,{" "}
              <M>{"y'''\\sim T"}</M>, <M>{"EIy''''=q"}</M>. <M>{"\\left(\\sin x\\right)^{(n)} = \\sin\\left(x+n\\frac{\\pi}{2}\\right)"}</M>,{" "}
              <M>{"\\left(e^{2x}\\right)^{(n)} = 2^ne^{2x}"}</M>.
            </p>
            <p>
              <strong>Fermat:</strong> belső szélsőértékhelyen <M>{"f'(c)=0"}</M> (csak szükséges!). ·{" "}
              <strong>Rolle:</strong> <M>{"f(a)=f(b) \\Rightarrow \\exists c: f'(c)=0"}</M>.
            </p>
            <MB>{"\\textbf{Lagrange: } f'(c) = \\frac{f(b)-f(a)}{b-a}"}</MB>
            <p>
              <strong>Cauchy:</strong> <M>{"\\frac{f'(c)}{g'(c)} = \\frac{f(b)-f(a)}{g(b)-g(a)}"}</M>. Következmény:{" "}
              <M>{"f'\\equiv0\\Rightarrow f"}</M> konstans; <M>{"f'>0\\Rightarrow"}</M> szigorúan nő;{" "}
              <M>{"e^x\\ge1+x"}</M>.
            </p>
          </Doboz>

          <Doboz cim="L'Hospital — mikor szabad">
            <MB>{"\\lim_{x\\to a}\\frac fg = \\lim_{x\\to a}\\frac{f'}{g'}"}</MB>
            <p>
              <strong>Csak</strong> <M>{"\\frac00"}</M> és <M>{"\\frac{\\infty}{\\infty}"}</M> alakra, és csak ha a
              jobb oldal létezik. Előbb <strong>mindig helyettesíts be!</strong> Számláló és nevező{" "}
              <strong>külön</strong> deriválva — ez nem a hányadosszabály.
            </p>
            <p>
              <M>{"0\\cdot\\infty \\to \\frac{f}{1/g}"}</M> · <M>{"\\infty-\\infty \\to"}</M> közös nevező,
              gyöktelenítés · <M>{"0^0,\\ \\infty^0,\\ 1^{\\infty} \\to"}</M> logaritmus, majd{" "}
              <strong>visszaexponenciálás</strong>.
            </p>
            <p>
              Minták: <M>{"\\frac{\\sin2x}{3x}\\to\\frac23"}</M> · <M>{"x^x\\to1"}</M> ·{" "}
              <M>{"\\left(1+\\frac3x\\right)^x\\to e^3"}</M> · <M>{"\\frac{\\ln x}{x^n}\\to0"}</M> ·{" "}
              <M>{"\\frac{x^n}{a^x}\\to0"}</M>.
            </p>
          </Doboz>

          <Doboz cim="Függvényvizsgálat — a hét lépés">
            <p>
              <strong>1.</strong> Értelmezési tartomány, szakadások · <strong>2.</strong> zérushelyek, tengelymetszet ·{" "}
              <strong>3.</strong> paritás, periodicitás · <strong>4.</strong> határértékek, aszimptoták ·{" "}
              <strong>5.</strong> <M>{"f'"}</M> előjeltáblázata: monotonitás, szélsőérték · <strong>6.</strong>{" "}
              <M>{"f''"}</M> előjeltáblázata: konvexitás, inflexió · <strong>7.</strong> értékkészlet, grafikon.
            </p>
            <p>
              <M>{"f'>0"}</M>: nő · <M>{"f'<0"}</M>: csökken · <M>{"f''>0"}</M>: konvex · <M>{"f''<0"}</M>: konkáv.
            </p>
            <p>
              Szélsőérték: <M>{"f'(x_0)=0"}</M> <strong>és</strong> előjelváltás (vagy <M>{"f''(x_0)\\ne0"}</M>:
              negatív → max, pozitív → min). Inflexió: <M>{"f''(x_0)=0"}</M> <strong>és</strong> előjelváltás.
            </p>
            <p>
              Aszimptota: függőleges a szakadásnál; vízszintes, ha{" "}
              <M>{"\\lim\\limits_{x\\to\\pm\\infty}f = b"}</M>; ferde, ha{" "}
              <M>{"m=\\lim\\frac{f(x)}{x}"}</M> és <M>{"b=\\lim(f(x)-mx)"}</M> véges,{" "}
              <M>{"m\\ne0"}</M>. Vízszintes és ferde kizárja egymást.
            </p>
          </Doboz>

          <Doboz cim="Szélsőértékfeladat receptje">
            <p>
              <strong>1.</strong> Rajz és jelölések · <strong>2.</strong> a vizsgált mennyiség felírása ·{" "}
              <strong>3.</strong> kényszerfeltétel, a fölös változók kiküszöbölése (maradjon{" "}
              <strong>egy</strong> változó) · <strong>4.</strong> értelmezési tartomány · <strong>5.</strong>{" "}
              deriválás, stacionárius pontok, a típus igazolása, <strong>végpontok</strong> · <strong>6.</strong>{" "}
              válasz mértékegységgel.
            </p>
            <p>
              Zárt intervallumon globális szélsőérték csak <strong>stacionárius pontban</strong>, <strong>nem
              differenciálható helyen</strong> vagy a <strong>végpontokban</strong> lehet.
            </p>
            <p>
              Minták: doboz <M>{"V=x(1-2x)^2"}</M> → <M>{"x=\\frac16"}</M>, <M>{"V=\\frac{2}{27}"}</M> · henger{" "}
              <M>{"r=\\sqrt[3]{\\frac{V}{2\\pi}}"}</M>, <M>{"h=2r"}</M> · ferde hajítás{" "}
              <M>{"\\alpha=45^\\circ"}</M>.
            </p>
          </Doboz>

          <Doboz cim="Taylor-polinom és lineáris közelítés">
            <MB>{"T_n(x) = \\sum_{k=0}^{n}\\frac{f^{(k)}(a)}{k!}(x-a)^k,\\qquad \\left|f-T_n\\right|\\le\\frac{M}{(n+1)!}\\left|x-a\\right|^{n+1}"}</MB>
            <p>
              <M>{"e^x = 1+x+\\frac{x^2}{2!}+\\dots"}</M> · <M>{"\\sin x = x-\\frac{x^3}{3!}+\\frac{x^5}{5!}-\\dots"}</M>{" "}
              · <M>{"\\cos x = 1-\\frac{x^2}{2!}+\\frac{x^4}{4!}-\\dots"}</M>
            </p>
            <p>
              <M>{"\\ln(1+x) = x-\\frac{x^2}{2}+\\frac{x^3}{3}-\\dots"}</M> (<M>{"-1<x\\le1"}</M>) ·{" "}
              <M>{"\\frac{1}{1-x} = 1+x+x^2+\\dots"}</M> (<M>{"|x|<1"}</M>)
            </p>
            <p>
              <strong>Differenciál:</strong> <M>{"dy = f'(x_0)\\,dx"}</M> · <strong>lineáris közelítés:</strong>{" "}
              <M>{"f(x_0+\\Delta x)\\approx f(x_0)+f'(x_0)\\Delta x"}</M> (ez <M>{"T_1"}</M>, az érintő).
            </p>
            <p>
              <strong>Hibaterjedés:</strong> <M>{"|\\Delta y|\\approx|f'(x)||\\Delta x|"}</M>; ha{" "}
              <M>{"y=x^n"}</M>, a <strong>relatív</strong> hiba n-szeresére nő (térfogat: 3×).
            </p>
          </Doboz>

          <Doboz cim="Tipikus hibák" szeles>
            <p>
              <M>{"(fg)'=f'g'"}</M> és <M>{"\\left(\\frac fg\\right)'=\\frac{f'}{g'}"}</M> — mindkettő hamis · a{" "}
              <strong>belső derivált</strong> elhagyása (<M>{"(\\sin3x)'=3\\cos3x"}</M>) · a hányadosszabály
              számlálójában felcserélt sorrend · <M>{"(x^x)' = x\\cdot x^{x-1}"}</M> vagy <M>{"x^x\\ln x"}</M>{" "}
              (logaritmikus deriválás kell) · fokban számolt trigonometrikus derivált · „<M>{"f'(x_0)=0"}</M>, tehát
              szélsőérték” (<M>{"x^3"}</M>) · „<M>{"f''(x_0)=0"}</M>, tehát inflexió” (<M>{"x^4"}</M>) ·
              L&apos;Hospital nem határozatlan alakra · a <strong>visszaexponenciálás</strong> elfelejtése{" "}
              (<M>{"\\ln y\\to3 \\Rightarrow y\\to e^3"}</M>) · az érintő egyenletében a derivált{" "}
              <em>függvény</em> a szám helyett, vagy az <M>{"f(x_0)"}</M> tag elhagyása · szélsőértékfeladatnál az
              értelmezési tartomány és a <strong>végpontok</strong> elfelejtése · a Taylor-polinomból a faktoriális
              vagy az <M>{"(x-a)^k"}</M> elhagyása.
            </p>
          </Doboz>
        </>
      }
    />
  );
}
