import { M, MB } from "@/components/ui/Keplet";
import { Lap, Doboz } from "./PuskaElemek";

export default function PuskaSorozatok() {
  return (
    <Lap
      szam={3}
      cim="Sorozatok"
      gyerekek={
        <>
          <Doboz cim="Alapfogalmak">
            <p>
              Sorozat: <M>{"a:\\mathbb{N}\\to\\mathbb{R}"}</M>, jelölés <M>{"(a_n)"}</M>, az n-edik tag{" "}
              <M>{"a_n"}</M>.
            </p>
            <p>
              <strong>Monoton növő:</strong> <M>{"a_{n+1}\\ge a_n"}</M> · <strong>csökkenő:</strong>{" "}
              <M>{"a_{n+1}\\le a_n"}</M> (minden n-re). Vizsgálat: <M>{"a_{n+1}-a_n"}</M> előjele, vagy — csak{" "}
              <strong>pozitív tagokra</strong> — <M>{"\\frac{a_{n+1}}{a_n}"}</M> és 1 viszonya.
            </p>
            <p>
              <strong>Korlátos:</strong> van <M>{"K>0"}</M>, hogy <M>{"|a_n|\\le K"}</M> minden n-re. Legkisebb felső
              korlát = szuprémum, legnagyobb alsó = infimum.
            </p>
            <p>
              <strong>Torlódási pont:</strong> minden környezetében végtelen sok tag van.
            </p>
          </Doboz>

          <Doboz cim="Konvergencia (ε–N)">
            <MB>
              {
                "\\lim_{n\\to\\infty}a_n = A \\iff \\forall\\varepsilon>0\\ \\exists N(\\varepsilon):\\ n>N \\Rightarrow |a_n-A|<\\varepsilon"
              }
            </MB>
            <MB>{"\\lim_{n\\to\\infty}a_n = +\\infty \\iff \\forall K\\ \\exists N(K):\\ n>N \\Rightarrow a_n>K"}</MB>
            <p>
              Előbb az ε, utána az N. Minden <M>{"n>N"}</M>-re, nem csak egyre.
            </p>
          </Doboz>

          <Doboz cim="Küszöbindex — a recept" szeles>
            <p>
              <strong>1.</strong> Írd fel és egyszerűsítsd <M>{"|a_n - A|"}</M>-t (közös nevező). ·{" "}
              <strong>2.</strong> Oldd meg az <M>{"|a_n-A|<\\varepsilon"}</M> egyenlőtlenséget n-re. ·{" "}
              <strong>3.</strong> A kapott korlát egész része az <M>{"N(\\varepsilon)"}</M>.
            </p>
            <p>
              Minta: <M>{"a_n=\\frac{2n+1}{n+3}"}</M>, <M>{"|a_n-2|=\\frac{5}{n+3}<\\varepsilon \\iff n>\\frac5\\varepsilon-3"}</M>;{" "}
              <M>{"\\varepsilon=0{,}2 \\Rightarrow N=22"}</M>, <M>{"\\varepsilon=0{,}01 \\Rightarrow N=497"}</M>.
            </p>
          </Doboz>

          <Doboz cim="Tételek">
            <p>
              A határérték <strong>egyértelmű</strong>. · Konvergens <M>{"\\Rightarrow"}</M> korlátos (visszafelé{" "}
              <strong>nem</strong>: <M>{"(-1)^n"}</M>). · Konvergens <M>{"\\iff"}</M> korlátos és pontosan egy torlódási
              pontja van. · Véges sok tag megváltoztatása nem számít.
            </p>
            <p>
              <strong>Monoton + korlátos <M>{"\\Rightarrow"}</M> konvergens</strong> (a határérték a szuprémum, ill.
              infimum).
            </p>
            <p>
              <strong>Rendőrelv:</strong> <M>{"b_n\\le a_n\\le c_n"}</M> és <M>{"b_n,c_n\\to A"}</M>{" "}
              <M>{"\\Rightarrow"}</M> <M>{"a_n\\to A"}</M>.
            </p>
            <p>
              <strong>Nullsorozat × korlátos:</strong> <M>{"a_n\\to0"}</M>, <M>{"(b_n)"}</M> korlátos{" "}
              <M>{"\\Rightarrow"}</M> <M>{"a_nb_n\\to0"}</M>.
            </p>
          </Doboz>

          <Doboz cim="Műveletek és határozatlan alakok" szeles>
            <p>
              Ha <M>{"a_n\\to A"}</M> és <M>{"b_n\\to B"}</M> (mindkettő <strong>véges</strong>):{" "}
              <M>{"a_n\\pm b_n\\to A\\pm B"}</M> · <M>{"a_nb_n\\to AB"}</M> · <M>{"\\frac{a_n}{b_n}\\to\\frac AB"}</M>{" "}
              (<M>{"B\\ne0"}</M>) · <M>{"\\sqrt{a_n}\\to\\sqrt A"}</M>.
            </p>
            <MB>
              {
                "\\frac00,\\quad \\frac{\\infty}{\\infty},\\quad \\infty-\\infty,\\quad 0\\cdot\\infty,\\quad 1^{\\infty},\\quad \\infty^0,\\quad 0^0"
              }
            </MB>
            <p>
              Nem határozatlan: <M>{"\\frac{c}{\\infty}=0"}</M>, <M>{"\\infty+\\infty=\\infty"}</M>,{" "}
              <M>{"\\infty\\cdot c=\\pm\\infty"}</M> (<M>{"c\\ne0"}</M>).
            </p>
          </Doboz>

          <Doboz cim="Polinom per polinom">
            <MB>
              {
                "\\lim_{n\\to\\infty}\\frac{p(n)}{q(n)} = \\begin{cases} 0, & k<m\\\\ \\frac{p_k}{q_m}, & k=m\\\\ \\pm\\infty, & k>m \\end{cases}"
              }
            </MB>
            <p>
              Ossz el mindent a <strong>nevező</strong> legmagasabb fokú tagjával. Az előjelet a főegyütthatók hányadosa
              dönti el.
            </p>
          </Doboz>

          <Doboz cim="Gyökös trükk (∞ − ∞)">
            <MB>{"\\sqrt x-\\sqrt y = \\frac{x-y}{\\sqrt x+\\sqrt y}"}</MB>
            <p>
              Bővíts a konjugálttal. Osztásnál a <strong>gyökjel alatt n²-tel</strong> osztunk:{" "}
              <M>{"\\frac{\\sqrt{n^2+4}}{n} = \\sqrt{1+\\frac{4}{n^2}}"}</M>.
            </p>
            <p>
              <M>{"\\sqrt{n^2+an+b}-n \\to \\frac a2"}</M>
            </p>
          </Doboz>

          <Doboz cim="Nevezetes határértékek">
            <MB>
              {
                "\\lim q^n = \\begin{cases} 0, & |q|<1\\\\ 1, & q=1\\\\ +\\infty, & q>1\\\\ \\text{nincs}, & q\\le-1 \\end{cases}"
              }
            </MB>
            <MB>{"\\sqrt[n]{c}\\to1\\ (c>0),\\quad \\sqrt[n]{n}\\to1,\\quad \\sqrt[n]{p(n)}\\to1"}</MB>
            <MB>{"\\sqrt[n]{a_1^n+\\dots+a_k^n} \\to \\max\\{a_1,\\dots,a_k\\}"}</MB>
            <MB>{"\\frac{1}{n^{\\alpha}}\\to0,\\quad \\frac{n!}{n^n}\\to0,\\quad \\frac{q^n}{n!}\\to0"}</MB>
          </Doboz>

          <Doboz cim="Nagyságrendek">
            <MB>{"\\lg n \\ \\ll\\ n^{\\alpha} \\ \\ll\\ q^{n} \\ \\ll\\ n! \\ \\ll\\ n^{n}"}</MB>
            <p>
              (<M>{"\\alpha>0"}</M>, <M>{"q>1"}</M>.) Hányadosnál mindig az erősebb dönt: erősebb a nevezőben{" "}
              <M>{"\\Rightarrow"}</M> 0, a számlálóban <M>{"\\Rightarrow"}</M> <M>{"+\\infty"}</M>. Kis n-re a sorrend
              félrevezető!
            </p>
          </Doboz>

          <Doboz cim="Az e szám">
            <MB>{"e = \\lim_{n\\to\\infty}\\left(1+\\frac1n\\right)^n \\approx 2{,}71828"}</MB>
            <MB>{"\\left(1+\\frac cn\\right)^n \\to e^c,\\qquad \\left(1+\\frac{1}{b_n}\\right)^{b_n}\\to e\\ (|b_n|\\to\\infty)"}</MB>
            <p>
              <strong>Recept (<M>{"1^{\\infty}"}</M>):</strong> 1) az alapot hozd <M>{"1+\\text{kicsi}"}</M> alakra
              (polinomosztás), 2) a kitevőben jelenjen meg a „kicsi” <strong>reciproka</strong>, 3) a maradék szorzó
              határértéke lesz e kitevője. Mindig számold ki a külső kitevőt!
            </p>
          </Doboz>

          <Doboz cim="Rekurzív sorozatok — recept">
            <p>
              <strong>1.</strong> Korlátosság (teljes indukcióval). · <strong>2.</strong> Monotonitás. ·{" "}
              <strong>3.</strong> Monoton + korlátos <M>{"\\Rightarrow"}</M> konvergens. · <strong>4.</strong>{" "}
              <em>Csak ezután:</em> <M>{"A=f(A)"}</M>, és a nem értelmes gyököt zárd ki.
            </p>
            <p>
              Minta: <M>{"a_1=1,\\ a_{n+1}=\\sqrt{2+a_n}"}</M> <M>{"\\Rightarrow"}</M> <M>{"A^2-A-2=0"}</M>,{" "}
              <M>{"A=2"}</M>. Héron: <M>{"a_{n+1}=\\frac12\\left(a_n+\\frac c{a_n}\\right)\\to\\sqrt c"}</M>.
            </p>
          </Doboz>

          <Doboz cim="Segédképletek">
            <MB>{"1+2+\\dots+n = \\frac{n(n+1)}{2},\\qquad 1+q+\\dots+q^{n-1} = \\frac{q^n-1}{q-1}"}</MB>
            <MB>{"(a+b)^n = \\sum_{k=0}^{n}\\binom nk a^{n-k}b^k,\\qquad \\binom nk = \\frac{n!}{k!(n-k)!}"}</MB>
          </Doboz>

          <Doboz cim="Tipikus hibák" szeles>
            <p>
              Műveleti tétel határozatlan alakra (<M>{"\\infty-\\infty=0"}</M>) · <M>{"q^n\\to0"}</M>-nál az abszolút érték
              elfelejtése · a gyökjel alatt n-nel osztás n² helyett · rekurziónál az <M>{"A=f(A)"}</M> egyenlet a
              konvergencia igazolása előtt · „a korlátos sorozat konvergens” · az ε és az N sorrendjének felcserélése ·
              növekvő tagszámú összeg tagonkénti határértéke · <M>{"1^{\\infty}"}</M> „egy”-nek olvasása · e-típusnál a
              külső kitevő elhagyása · hányadosmódszer előjelváltó sorozatra · „a sorozatnak fel kell vennie a
              határértékét” · a nagyságrendi sorrend megérzésre.
            </p>
          </Doboz>
        </>
      }
    />
  );
}
