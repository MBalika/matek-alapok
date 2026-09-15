import { M, MB } from "@/components/ui/Keplet";
import { Lap, Doboz } from "./PuskaElemek";

export default function PuskaHatarozatlan() {
  return (
    <Lap
      szam={6}
      cim="Határozatlan integrál"
      gyerekek={
        <>
          <Doboz cim="Alapintegrálok" szeles>
            <div className="grid gap-x-5 sm:grid-cols-2">
              <div>
                <p>
                  <M>{"\\int x^{n}dx = \\frac{x^{n+1}}{n+1}+C\\ (n\\ne-1)"}</M> ·{" "}
                  <M>{"\\int \\frac{dx}{x} = \\ln\\left|x\\right|+C"}</M>
                </p>
                <p>
                  <M>{"\\int e^{x}dx = e^{x}+C"}</M> · <M>{"\\int a^{x}dx = \\frac{a^{x}}{\\ln a}+C"}</M>
                </p>
                <p>
                  <M>{"\\int \\sin x\\,dx = -\\cos x+C"}</M> · <M>{"\\int \\cos x\\,dx = \\sin x+C"}</M>
                </p>
                <p>
                  <M>{"\\int \\frac{dx}{\\cos^2x} = \\operatorname{tg} x+C"}</M> ·{" "}
                  <M>{"\\int \\frac{dx}{\\sin^2x} = -\\operatorname{ctg} x+C"}</M>
                </p>
                <p>
                  <M>{"\\int \\operatorname{sh} x\\,dx = \\operatorname{ch} x+C"}</M> ·{" "}
                  <M>{"\\int \\operatorname{ch} x\\,dx = \\operatorname{sh} x+C"}</M>
                </p>
              </div>
              <div>
                <p>
                  <M>{"\\int \\frac{dx}{1+x^2} = \\operatorname{arctg} x+C"}</M> ·{" "}
                  <M>{"\\int \\frac{dx}{\\sqrt{1-x^2}} = \\arcsin x+C"}</M>
                </p>
                <p>
                  <M>{"\\int \\frac{dx}{\\sqrt{1+x^2}} = \\ln\\left(x+\\sqrt{1+x^2}\\right)+C"}</M>
                </p>
                <p>
                  <strong>Paraméteres</strong> (<M>{"a>0"}</M>):
                </p>
                <p>
                  <M>{"\\int \\frac{dx}{a^2+x^2} = \\frac1a\\operatorname{arctg}\\frac xa+C"}</M> ·{" "}
                  <M>{"\\int \\frac{dx}{\\sqrt{a^2-x^2}} = \\arcsin\\frac xa+C"}</M>
                </p>
                <p className="text-[12px] text-petrol-600">
                  Figyelj: az arctg-nél <strong>marad</strong> az <M>{"\\frac1a"}</M>, az arcsin-nél{" "}
                  <strong>kiesik</strong>.
                </p>
              </div>
            </div>
          </Doboz>

          <Doboz cim="Linearitás és a +C">
            <MB>{"\\int \\left(f\\pm g\\right) = \\int f \\pm \\int g, \\qquad \\int \\lambda f = \\lambda\\int f"}</MB>
            <p>
              Csak <strong>konstans</strong> emelhető ki: <M>{"\\int x\\sin x\\,dx \\ne x\\int \\sin x\\,dx"}</M>.
            </p>
            <p>
              <M>{"F'=f \\Rightarrow \\int f = F+C"}</M>; egy <strong>intervallumon</strong> két primitív függvény
              csak konstansban tér el. A <M>{"+C"}</M> nélkül a válasz hiányos.
            </p>
            <p>
              Newton–Leibniz: <M>{"\\int_a^b f = F(b)-F(a)"}</M> — ott a konstans kiesik.
            </p>
          </Doboz>

          <Doboz cim="Helyettesítés I. — a három minta">
            <MB>{"\\int f(ax+b)\\,dx = \\frac1a F(ax+b)+C"}</MB>
            <MB>{"\\int \\frac{f'(x)}{f(x)}\\,dx = \\ln\\left|f(x)\\right|+C"}</MB>
            <MB>{"\\int f^{\\,n}(x)f'(x)\\,dx = \\frac{f^{\\,n+1}(x)}{n+1}+C \\ (n\\ne-1)"}</MB>
            <p>
              Minták: <M>{"\\int (3x-2)^7"}</M>, <M>{"\\int \\operatorname{tg} x = -\\ln\\left|\\cos x\\right|"}</M>,{" "}
              <M>{"\\int \\frac{x}{x^2+4} = \\frac12\\ln(x^2+4)"}</M>,{" "}
              <M>{"\\int \\sin^3x\\cos x = \\frac{\\sin^4x}{4}"}</M>.
            </p>
          </Doboz>

          <Doboz cim="Helyettesítés II. — a recept">
            <p>
              <strong>1.</strong> <M>{"x=g(t)"}</M> vagy <M>{"t=h(x)"}</M> · <strong>2.</strong> a{" "}
              <M>{"dx"}</M> átírása: <M>{"dx = g'(t)dt"}</M> · <strong>3.</strong> visszahelyettesítés.
            </p>
            <p>
              <strong>Mit válassz <M>{"t"}</M>-nek?</strong> a gyököt vagy a gyök alattit, a kitevőben állót, az{" "}
              <M>{"e^x"}</M>-et, vagy azt a belső függvényt, aminek a deriváltja is ott van.
            </p>
            <p className="text-[12px] text-petrol-600">
              Fogás: a helyettesítés után <strong>egyetlen <M>{"x"}</M> sem maradhat</strong>.
            </p>
          </Doboz>

          <Doboz cim="Parciális integrálás">
            <MB>{"\\int u\\,v'\\,dx = u\\,v - \\int u'\\,v\\,dx"}</MB>
            <p>
              <strong>Deriváld</strong> (<M>{"u"}</M>): a polinomot — de <M>{"\\ln x"}</M> és arkuszfüggvény mellett{" "}
              <strong>azokat</strong>. <strong>Integráld</strong> (<M>{"v'"}</M>): az exponenciálist, a
              szögfüggvényt; <M>{"\\int \\ln x"}</M> és <M>{"\\int \\operatorname{arctg} x"}</M> esetén{" "}
              <M>{"v'=1"}</M>.
            </p>
            <p>
              <strong>Körbeérő eset</strong> (<M>{"e^{ax}\\sin bx"}</M>): kétszeri alkalmazás után egyenlet adódik{" "}
              <M>{"I"}</M>-re — a szereposztás legyen <strong>következetes</strong>.
            </p>
          </Doboz>

          <Doboz cim="Racionális törtek — a menetrend">
            <p>
              <strong>1.</strong> áltört? <M>{"\\Rightarrow"}</M> polinomosztás · <strong>2.</strong> nevező
              szorzattá: <M>{"(x-\\alpha)^k"}</M>, <M>{"(x^2+px+q)^l"}</M> · <strong>3.</strong> parciális törtek ·{" "}
              <strong>4.</strong> integrálás.
            </p>
            <p>
              <M>{"\\int \\frac{A}{x-\\alpha} = A\\ln\\left|x-\\alpha\\right|"}</M> ·{" "}
              <M>{"\\int \\frac{A}{(x-\\alpha)^k} = \\frac{A}{(1-k)(x-\\alpha)^{k-1}}"}</M>
            </p>
            <p>
              <M>{"\\frac{Bx+D}{x^2+px+q}"}</M>: a számlálót szétszedni{" "}
              <M>{"\\frac{B}{2}(2x+p)"}</M>-re (logaritmus) és konstansra (teljes négyzet, majd{" "}
              <M>{"\\operatorname{arctg}"}</M>).
            </p>
            <p className="text-[12px] text-petrol-600">
              Letakarásos módszer: egyszeres valós gyököknél a gyök behelyettesítése azonnal adja az együtthatót.
            </p>
          </Doboz>

          <Doboz cim="Trigonometrikus trükkök">
            <MB>{"\\sin^2x = \\frac{1-\\cos 2x}{2}, \\quad \\cos^2x = \\frac{1+\\cos 2x}{2}"}</MB>
            <p>
              <M>{"\\sin\\alpha\\cos\\beta = \\frac12\\left(\\sin(\\alpha+\\beta)+\\sin(\\alpha-\\beta)\\right)"}</M>
            </p>
            <p>
              <M>{"\\cos\\alpha\\cos\\beta = \\frac12\\left(\\cos(\\alpha+\\beta)+\\cos(\\alpha-\\beta)\\right)"}</M>
            </p>
            <p>
              <strong>Páros</strong> hatvány → linearizálás · <strong>Páratlan</strong> → egy tényező leválasztása,
              majd <M>{"f^{\\,n}f'"}</M>.
            </p>
            <p>
              Végső eszköz: <M>{"t=\\operatorname{tg}\\frac x2"}</M>, ekkor{" "}
              <M>{"\\sin x = \\frac{2t}{1+t^2}"}</M>, <M>{"\\cos x = \\frac{1-t^2}{1+t^2}"}</M>,{" "}
              <M>{"dx = \\frac{2\\,dt}{1+t^2}"}</M>.
            </p>
          </Doboz>

          <Doboz cim="Gyökös helyettesítések">
            <p>
              <M>{"R\\left(\\sqrt[n]{ax+b}\\right)"}</M> → <M>{"t=\\sqrt[n]{ax+b}"}</M>
            </p>
            <p>
              <M>{"R\\left(\\sqrt{a^2-x^2}\\right)"}</M> → <M>{"x=a\\sin t"}</M>
            </p>
            <p>
              <M>{"R\\left(\\sqrt{a^2+x^2}\\right)"}</M> → <M>{"x=a\\operatorname{sh} t"}</M>
            </p>
            <p>
              <M>{"R\\left(\\sqrt{x^2-a^2}\\right)"}</M> → <M>{"x=a\\operatorname{ch} t"}</M>
            </p>
            <p>
              <M>{"R\\left(e^x\\right)"}</M> → <M>{"t=e^x"}</M>
            </p>
            <p className="text-[12px] text-petrol-600">
              A Pitagorasz-azonosságok tüntetik el a gyököt:{" "}
              <M>{"\\sqrt{a^2-a^2\\sin^2t}=a\\cos t"}</M>.
            </p>
          </Doboz>

          <Doboz cim="Ellenőrzés és gyakori eredmények">
            <p>
              <strong>Deriválj vissza!</strong> Ha <M>{"F'=f"}</M>, az eredmény biztosan jó. Gyorsabb, mint maga az
              integrálás.
            </p>
            <p>
              <M>{"\\int \\operatorname{tg} x = -\\ln\\left|\\cos x\\right|+C"}</M> ·{" "}
              <M>{"\\int \\operatorname{ctg} x = \\ln\\left|\\sin x\\right|+C"}</M>
            </p>
            <p>
              <M>{"\\int \\ln x = x\\ln x-x+C"}</M> ·{" "}
              <M>{"\\int \\operatorname{arctg} x = x\\operatorname{arctg} x-\\frac12\\ln(1+x^2)+C"}</M>
            </p>
            <p>
              <M>{"\\int \\sin^2x = \\frac x2-\\frac{\\sin 2x}{4}+C"}</M> ·{" "}
              <M>{"\\int \\cos^2x = \\frac x2+\\frac{\\sin 2x}{4}+C"}</M>
            </p>
            <p>
              <M>{"\\int \\frac{dx}{\\sin x} = \\ln\\left|\\operatorname{tg}\\frac x2\\right|+C"}</M>
            </p>
          </Doboz>

          <Doboz cim="Tipikus hibák" szeles>
            <div className="grid gap-x-5 sm:grid-cols-2">
              <div>
                <p>
                  <strong>1.</strong> A <M>{"+C"}</M> lefelejtése.
                </p>
                <p>
                  <strong>2.</strong> <M>{"\\int fg \\ne \\left(\\int f\\right)\\left(\\int g\\right)"}</M>, és{" "}
                  <M>{"\\int \\frac fg \\ne \\frac{\\int f}{\\int g}"}</M>.
                </p>
                <p>
                  <strong>3.</strong> Függvény kiemelése az integráljel elé — csak konstans emelhető ki.
                </p>
                <p>
                  <strong>4.</strong> Az <M>{"\\frac1a"}</M> szorzó elfelejtése; vagy fordítva:{" "}
                  <M>{"\\int \\sin\\left(x^2\\right)dx \\ne \\frac{-\\cos x^2}{2x}"}</M> — csak{" "}
                  <M>{"ax+b"}</M> belső függvényre szabad!
                </p>
                <p>
                  <strong>5.</strong> Az abszolút érték elhagyása:{" "}
                  <M>{"\\int \\frac{f'}{f} = \\ln\\left|f\\right|+C"}</M>. (Ha a nevező bizonyíthatóan pozitív, pl.{" "}
                  <M>{"x^2+1"}</M>, ott elhagyható.)
                </p>
              </div>
              <div>
                <p>
                  <strong>6.</strong> A <M>{"dx"}</M> átírásának elmulasztása: <M>{"x=t^2 \\Rightarrow dx=2t\\,dt"}</M>.
                </p>
                <p>
                  <strong>7.</strong> A visszahelyettesítés elfelejtése — a válasz az eredeti változóban kell legyen.
                </p>
                <p>
                  <strong>8.</strong> Rossz szereposztás parciális integrálásnál: ha a maradék integrál nehezebb lett,
                  cseréld fel a szerepeket.
                </p>
                <p>
                  <strong>9.</strong> A szereposztás megcserélése a körbeérő esetben → <M>{"I=I"}</M>.
                </p>
                <p>
                  <strong>10.</strong> Polinomosztás elmulasztása áltörtnél — a parciális törtekre bontás ilyenkor
                  ellentmondásra vezet.
                </p>
              </div>
            </div>
          </Doboz>
        </>
      }
    />
  );
}
