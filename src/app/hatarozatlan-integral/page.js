import { ModulFejlec, SzakaszSav } from "@/components/ModulKeret";
import { Szakasz, Kartya, Kiemelo, AbraKeret, KetOszlop } from "@/components/ui/Elemek";
import { M, MB, KepletDoboz } from "@/components/ui/Keplet";
import { KidolgozottFeladat, Lepes } from "@/components/KidolgozottFeladat";
import HiPrimitivSereg from "@/components/abrak/HiPrimitivSereg";
import HiTablazatKerdezo from "@/components/abrak/HiTablazatKerdezo";
import HiLinearisFelfedezo from "@/components/abrak/HiLinearisFelfedezo";
import HiMintaFelismero from "@/components/abrak/HiMintaFelismero";
import HiParcialisValaszto from "@/components/abrak/HiParcialisValaszto";
import HiParcialisTortek from "@/components/abrak/HiParcialisTortek";
import HiMozgasFelfedezo from "@/components/abrak/HiMozgasFelfedezo";
import HiModszerValaszto from "@/components/abrak/HiModszerValaszto";
import {
  AbraTartoLanc,
  AbraLnAbszolut,
  AbraRacionalisFolyamat,
} from "@/components/abrak/HiStatikusAbrak";
import { HiEllenorzoKalk, HiParcialisTortKalk } from "@/components/abrak/HiKalk";
import FilmParcialis from "@/components/hatarozatlan/FilmParcialis";
import FilmParcialisTortek from "@/components/hatarozatlan/FilmParcialisTortek";
import GyakorloSzekcio from "@/components/hatarozatlan/GyakorloSzekcio";
import GyakorloExtra from "@/components/hatarozatlan/GyakorloExtra";
import Kviz from "@/components/Kviz";
import Hibakereso from "@/components/Hibakereso";
import { KVIZ, HIBAK } from "@/components/hatarozatlan/KvizAdatok";
import { modulSlugAlapjan } from "@/lib/oldalterkep";

export const metadata = {
  title: "Határozatlan integrál",
  description:
    "Primitív függvény és a +C, alapintegrálok, linearitás, helyettesítéses és parciális integrálás, racionális törtfüggvények, trigonometrikus és gyökös kifejezések — interaktív ábrákkal, a jegyzet kidolgozott példáival és végtelen gyakorlófeladattal.",
};

const modul = modulSlugAlapjan("/hatarozatlan-integral");

function Alcim({ children }) {
  return <h3 className="mt-10 text-xl font-semibold text-petrol-900">{children}</h3>;
}

function Proza({ children }) {
  return <div className="proza mt-3 text-[15px] leading-relaxed text-petrol-700">{children}</div>;
}

function Probald({ cim, children }) {
  return (
    <div className="mt-6">
      <p className="mb-2 text-[11px] font-bold tracking-[0.16em] text-naracs-600 uppercase">{cim}</p>
      {children}
    </div>
  );
}

export default function HatarozatlanIntegralOldal() {
  return (
    <>
      <ModulFejlec
        szam={6}
        cim="Határozatlan integrál"
        leiras="Ez a modul a deriválás megfordítása. A deriválásra van recept — szorzat-, hányados-, láncszabály —, az integrálásra nincs: csak módszerek vannak, és a gyakorlat, ami megmondja, melyiket mikor vedd elő. Cserébe kapsz valamit, ami a deriválásnál nem volt: minden eredményedet magad tudod ellenőrizni, egyetlen visszaderiválással."
        tartalom={[
          "Primitív függvény és a +C",
          "Alapintegrálok, linearitás",
          "Helyettesítés: a három minta",
          "Általános helyettesítés",
          "Parciális integrálás",
          "Racionális, trigonometrikus, gyökös",
        ]}
      />
      <SzakaszSav szakaszok={modul.szakaszok} />

      {/* ==================== ELMÉLET ==================== */}
      <Szakasz
        id="elmelet"
        cimke="1. rész"
        cim="Elmélet"
        bevezeto="Tizenkét lépésben az egész technika. A módszerek sorrendje nem véletlen: minden újabb fejezet arra az esetre való, amit az előzők nem tudnak elintézni. Az ábrákat próbáld ki — a primitív függvények serege és a módszerfelismerő többet tanít, mint húsz sor magyarázat."
      >
        {/* --- 6.1 --- */}
        <h3 className="mt-2 text-xl font-semibold text-petrol-900">6.1 Mit jelent integrálni?</h3>
        <Proza>
          <p>
            Kezdjük ott, ahol az előadás is kezdte. Legyen <M>{"f"}</M> egy folytonos, pozitív függvény az{" "}
            <M>{"a \\le x \\le b"}</M> intervallumon, és kérdezzük meg: <strong>mekkora a görbe alatti terület?</strong>
          </p>
          <p>
            Jelölje <M>{"T(x)"}</M> azt a területet, amit a görbe, az <M>{"x"}</M> tengely, az <M>{"a"}</M> helyen
            húzott függőleges és az <M>{"x"}</M> helyen húzott függőleges fog közre. Ez egy <em>új függvény</em>:
            minden <M>{"x"}</M>-hez rendel egy területet. Növeljük meg <M>{"x"}</M>-et egy kicsivel,{" "}
            <M>{"\\Delta x"}</M>-szel. A hozzájött terület egy vékony, közelítőleg <strong>téglalap</strong> alakú
            sáv: szélessége <M>{"\\Delta x"}</M>, magassága körülbelül <M>{"f(x)"}</M>. Tehát
          </p>
          <MB>{"T(x+\\Delta x)-T(x) \\approx f(x)\\,\\Delta x, \\qquad \\text{azaz} \\qquad \\frac{T(x+\\Delta x)-T(x)}{\\Delta x} \\approx f(x)."}</MB>
          <p>
            A bal oldal a <M>{"T"}</M> függvény differenciahányadosa. Ha <M>{"\\Delta x \\to 0"}</M>, a határértéke a
            derivált:
          </p>
          <MB>{"T'(x) = f(x)."}</MB>
        </Proza>

        <Kiemelo tipus="kulcs" cim="Ez a felismerés az egész integrálszámítás alapja">
          <p>
            A területfüggvény deriváltja maga az eredeti függvény. Ha tehát ki akarunk számolni egy görbe alatti
            területet, nem kell téglalapokkal vesződnünk: elég <strong>olyan függvényt találni, amelynek{" "}
            <M>{"f"}</M> a deriváltja</strong>. A területszámítás így visszavezetődik a{" "}
            <strong>deriválás megfordítására</strong> — és pontosan ez a modul témája.
          </p>
        </Kiemelo>

        <Proza>
          <p>
            A jelenség nem csak a területnél bukkan fel. Mindig ez a helyzet, valahányszor egy mennyiség{" "}
            <em>változási sebességét</em> ismerjük, és magát a mennyiséget keressük: ismerjük egy jármű{" "}
            <M>{"v(t)"}</M> sebességét, keressük a megtett <M>{"s(t)"}</M> utat (<M>{"s' = v"}</M>); ismerjük egy
            hajlított rúd görbületét, keressük a lehajlási görbét. És ott van a tartószerkezetek alapláncolata:
          </p>
          <MB>{"V'(x) = -q(x), \\qquad M'(x) = V(x)"}</MB>
          <p>
            azaz a megoszló terhelésből a nyíróerő, abból pedig a nyomaték <strong>integrálással</strong> áll elő. A
            statikán ezt fogod naponta használni — az integrálási állandókat pedig a megtámasztási feltételek
            rögzítik.
          </p>
        </Proza>

        <AbraKeret
          szam="6.1"
          cim="Kéttámaszú tartó egyenletesen megoszló terheléssel: a q → V → M lánc két egymás utáni integrálás. A konstans terhelésből lineáris nyíróerő-ábra, abból parabolikus nyomatéki ábra lesz — a fokszám lépésenként eggyel nő."
        >
          <AbraTartoLanc />
        </AbraKeret>

        <Kiemelo tipus="figyelem" cim="Két integrálfogalom — ne keverd össze őket">
          <div className="mt-1 overflow-x-auto">
            <table className="w-full text-[13.5px]">
              <thead>
                <tr className="text-petrol-500">
                  <th className="px-2 py-1 text-left font-semibold">Fogalom</th>
                  <th className="px-2 py-1 text-left font-semibold">Mi az eredménye?</th>
                  <th className="px-2 py-1 text-left font-semibold">Jelölés</th>
                </tr>
              </thead>
              <tbody className="text-petrol-800">
                <tr>
                  <td className="px-2 py-1 font-semibold">Határozatlan</td>
                  <td className="px-2 py-1">egy függvénysereg</td>
                  <td className="px-2 py-1">
                    <M>{"\\int f(x)\\,dx"}</M>
                  </td>
                </tr>
                <tr>
                  <td className="px-2 py-1 font-semibold">Határozott</td>
                  <td className="px-2 py-1">egy szám (előjeles terület)</td>
                  <td className="px-2 py-1">
                    <M>{"\\int_a^b f(x)\\,dx"}</M>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2">
            A kettőt a <strong>Newton–Leibniz-tétel</strong> kapcsolja össze:{" "}
            <M>{"\\int_a^b f(x)\\,dx = F(b)-F(a)"}</M>, ahol <M>{"F"}</M> egy primitív függvény. Ezért érdemes a
            határozatlan integrálást ilyen alaposan megtanulni: a 7. modul, a határozott integrál is ezen áll vagy
            bukik.
          </p>
        </Kiemelo>

        {/* --- 6.2 --- */}
        <Alcim>6.2 A primitív függvény és a +C</Alcim>

        <Kiemelo tipus="definicio" cim="Definíció — primitív függvény">
          <p>
            Az <M>{"F"}</M> függvény az <M>{"f"}</M> függvény <strong>primitív függvénye</strong> az <M>{"I"}</M>{" "}
            intervallumon, ha <M>{"F"}</M> differenciálható <M>{"I"}</M>-n, és minden <M>{"x \\in I"}</M> esetén
          </p>
          <MB>{"F'(x) = f(x)."}</MB>
          <p>
            Vagyis a primitív függvény az, amiből <em>visszafelé</em> deriválva az eredetit kapjuk. Három azonnal
            ellenőrizhető példa: <M>{"2x"}</M>-é az <M>{"x^2"}</M>, <M>{"\\cos x"}</M>-é a <M>{"\\sin x"}</M>, az{" "}
            <M>{"e^x"}</M>-é pedig önmaga.
          </p>
        </Kiemelo>

        <Proza>
          <p>
            Ha <M>{"F"}</M> primitív függvénye <M>{"f"}</M>-nek, akkor <M>{"F+3"}</M> is az, hiszen a konstans
            deriváltja nulla. A 3 helyére bármilyen valós szám írható — tehát ha egyet találtunk, azonnal végtelen
            sokat találtunk. A valódi kérdés az, hogy <strong>van-e még más is</strong>.
          </p>
        </Proza>

        <Kiemelo tipus="definicio" cim="Tétel — a primitív függvények szerkezete">
          <p>
            Legyen <M>{"F"}</M> és <M>{"G"}</M> egyaránt primitív függvénye <M>{"f"}</M>-nek ugyanazon az{" "}
            <M>{"I"}</M> <strong>intervallumon</strong>. Ekkor van olyan <M>{"C"}</M> valós szám, amellyel{" "}
            <M>{"G(x) = F(x)+C"}</M> minden <M>{"x \\in I"}</M> esetén.
          </p>
          <p className="mt-2">
            <em>Bizonyítás.</em> A <M>{"H = G-F"}</M> különbségfüggvényre{" "}
            <M>{"H' = G'-F' = f-f = 0"}</M> az egész <M>{"I"}</M>-n. Egy olyan függvény viszont, amelynek a
            deriváltja egy intervallumon azonosan nulla, ott szükségképpen konstans — ez a Lagrange-féle
            középértéktétel következménye (5. modul). Tehát <M>{"H = C"}</M>, ahonnan <M>{"G = F+C"}</M>. ∎
          </p>
        </Kiemelo>

        <Kiemelo tipus="definicio" cim="Definíció — határozatlan integrál">
          <p>
            Az <M>{"f"}</M> függvény <strong>határozatlan integrálja</strong> az összes primitív függvényének
            halmaza:
          </p>
          <MB>{"\\int f(x)\\,dx = F(x)+C, \\qquad C \\in \\mathbb{R}."}</MB>
          <p>
            A <M>{"C"}</M> neve <strong>integrációs konstans</strong>, az <M>{"f"}</M> függvényé{" "}
            <strong>integrandus</strong>, a <M>{"dx"}</M> pedig azt jelöli, hogy az integrálás változója{" "}
            <M>{"x"}</M>.
          </p>
        </Kiemelo>

        <Kiemelo tipus="tipp" cim="A geometriai kép">
          <p>
            A primitív függvények grafikonjai <strong>egybevágó, függőlegesen eltolt görbék</strong> — egy görbesereg.
            Ha egy rögzített <M>{"x_0"}</M> helyen mindegyiknél megrajzoljuk az érintőt, azok{" "}
            <strong>párhuzamosak</strong> lesznek, hiszen mindegyik meredeksége <M>{"f(x_0)"}</M>.
          </p>
          <p className="mt-2">
            Ez pontosan megfelel a szemléletnek: a görbe <em>alakját</em> (a növekedés-csökkenés menetét) az{" "}
            <M>{"f"}</M> írja elő, de arról, hogy milyen <em>magasan</em> fusson, semmit nem mond. Ezt a hiányzó
            információt pótolja a <M>{"C"}</M>.
          </p>
        </Kiemelo>

        <Probald cim="Próbáld ki — told a C csúszkát, és nézd az érintőket">
          <HiPrimitivSereg />
        </Probald>

        <Kiemelo tipus="figyelem" cim="A +C nem díszítés!">
          <p>
            Az integrálási feladat megoldása nem egy függvény, hanem egy <em>függvénysereg</em>. Ha lefelejted a{" "}
            <M>{"+C"}</M>-t, a válaszod hiányos — a dolgozatokban ez a leggyakoribb pontlevonás. Kivétel:{" "}
            <strong>határozott</strong> integrál kiszámításánál a konstans kiesik a kivonáskor, ott nem kell kiírni.
          </p>
        </Kiemelo>

        <Proza>
          <p>
            <strong>Mikor létezik primitív függvény?</strong> Minden intervallumon <strong>folytonos</strong>{" "}
            függvénynek van primitív függvénye azon az intervallumon — ez tétel. Két dologra viszont érdemes
            figyelni.
          </p>
          <p>
            Először: a <em>létezés</em> nem jelenti azt, hogy a primitív függvény fel is <em>írható</em> a szokásos
            elemi függvényekkel. Az <M>{"e^{-x^2}"}</M>, a <M>{"\\frac{\\sin x}{x}"}</M> vagy a{" "}
            <M>{"\\sqrt{1+x^4}"}</M> mind ilyen: bizonyítható, hogy egyiket sem lehet véges sok elemi függvényből
            összeállítani. Ez nem a mi ügyetlenségünk, hanem a dolog természete — ilyenkor a mérnök{" "}
            <strong>numerikusan</strong> integrál (8. modul).
          </p>
          <p>
            Másodszor: a fenti tétel <strong>intervallumra</strong> vonatkozik. Ha az értelmezési tartomány több
            darabból áll, a konstans darabonként külön választható.
          </p>
        </Proza>

        <AbraKeret
          szam="6.2"
          cim="Az 1/x és a primitív függvénye. A 0 két külön intervallumra vágja az értelmezési tartományt, ezért a két ágon a konstans egymástól függetlenül választható meg — az ábrán a bal ág 1,2-vel feljebb csúszott, mégis mindkettő primitív függvény."
        >
          <AbraLnAbszolut />
        </AbraKeret>

        <Kiemelo tipus="tipp" cim="Az ellenőrzés: deriválj vissza!">
          <p>
            Ez a téma legfontosabb gyakorlati tanácsa. <strong>Minden integrálási eredmény ellenőrizhető</strong>: ha
            a kapott <M>{"F"}</M>-et deriválva megkapod az integrandust, az eredmény biztosan helyes. Ha nem, hiba van
            benne.
          </p>
          <p className="mt-2">
            Tegyük fel, hogy valaki azt állítja: <M>{"\\int x\\cos x\\,dx = x\\sin x+\\cos x+C"}</M>. Ellenőrizzük
            szorzatszabállyal:
          </p>
          <MB>{"\\left(x\\sin x+\\cos x\\right)' = 1\\cdot\\sin x + x\\cos x - \\sin x = x\\cos x \\;\\checkmark"}</MB>
          <p>
            Ehhez nem kellett tudnunk, <em>hogyan</em> jött ki — csak deriválni kellett. Ez az ellenőrzés általában
            sokkal gyorsabb, mint maga az integrálás, mert a deriválás mechanikus. Használd ki minden dolgozatban.
          </p>
        </Kiemelo>

        {/* --- 6.3 --- */}
        <Alcim>6.3 Alapintegrálok</Alcim>
        <Proza>
          <p>
            Az alapintegrálok táblázata nem más, mint a deriválási táblázat <strong>visszafelé olvasva</strong>. Ezért
            nem is kell külön megtanulni: ha a deriváltakat tudod, ezeket is tudod. Érdemes mégis végigmenni rajta,
            mert nem a tudás, hanem a <em>felismerés gyorsasága</em> számít.
          </p>
        </Proza>

        <Kartya cimke="Táblázat" cim="Alapintegrálok (C mindenütt tetszőleges valós konstans)">
          <div className="finom-gorgeto overflow-x-auto">
            <table className="w-full text-[14px]">
              <tbody className="text-petrol-800">
                {[
                  ["\\int x^{n}dx", "\\frac{x^{n+1}}{n+1}+C \\ (n \\ne -1)", "\\int \\operatorname{ch} x\\,dx", "\\operatorname{sh} x+C"],
                  ["\\int \\frac{1}{x}dx", "\\ln\\left|x\\right|+C", "\\int \\frac{dx}{\\operatorname{ch}^{2}x}", "\\operatorname{th} x+C"],
                  ["\\int e^{x}dx", "e^{x}+C", "\\int \\frac{dx}{\\operatorname{sh}^{2}x}", "-\\operatorname{cth} x+C"],
                  ["\\int a^{x}dx", "\\frac{a^{x}}{\\ln a}+C", "\\int \\frac{dx}{1+x^{2}}", "\\operatorname{arctg} x+C"],
                  ["\\int \\sin x\\,dx", "-\\cos x+C", "\\int \\frac{dx}{1-x^{2}}", "\\frac12\\ln\\left|\\frac{1+x}{1-x}\\right|+C"],
                  ["\\int \\cos x\\,dx", "\\sin x+C", "\\int \\frac{dx}{\\sqrt{1-x^{2}}}", "\\arcsin x+C"],
                  ["\\int \\frac{dx}{\\cos^{2}x}", "\\operatorname{tg} x+C", "\\int \\frac{dx}{\\sqrt{1+x^{2}}}", "\\operatorname{arsh} x+C"],
                  ["\\int \\frac{dx}{\\sin^{2}x}", "-\\operatorname{ctg} x+C", "\\int \\frac{dx}{\\sqrt{x^{2}-1}}", "\\operatorname{arch} x+C"],
                  ["\\int \\operatorname{sh} x\\,dx", "\\operatorname{ch} x+C", "", ""],
                ].map((sor, i) => (
                  <tr key={i} className="border-t border-petrol-100">
                    <td className="px-2 py-1.5">
                      <M>{sor[0]}</M>
                    </td>
                    <td className="px-2 py-1.5 text-petrol-600">
                      <M>{sor[1]}</M>
                    </td>
                    <td className="px-2 py-1.5">{sor[2] ? <M>{sor[2]}</M> : null}</td>
                    <td className="px-2 py-1.5 text-petrol-600">{sor[3] ? <M>{sor[3]}</M> : null}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[13.5px] text-petrol-600">
            A két utolsó sor logaritmusos alakban:{" "}
            <M>{"\\operatorname{arsh} x = \\ln\\left(x+\\sqrt{1+x^2}\\right)"}</M> és{" "}
            <M>{"\\operatorname{arch} x = \\ln\\left|x+\\sqrt{x^2-1}\\right|"}</M> — a konstansbeli eltérést elnyeli a{" "}
            <M>{"C"}</M>.
          </p>
        </Kartya>

        <KetOszlop>
          <div>
            <Kiemelo tipus="kulcs" cim="A hatványszabály kivétele">
              <p>
                Az <M>{"\\int x^n dx = \\frac{x^{n+1}}{n+1}"}</M> képlet <M>{"n=-1"}</M> esetén nullával osztana — és
                éppen ez az eset kapott külön sort a logaritmussal. Érdemes észben tartani, hogy a szabály{" "}
                <strong>nem csak egész</strong> <M>{"n"}</M>-re működik:
              </p>
              <MB>{"\\int \\sqrt x\\,dx = \\frac{x^{3/2}}{3/2}+C = \\frac23 x\\sqrt x+C"}</MB>
              <MB>{"\\int \\frac{dx}{x^3} = \\frac{x^{-2}}{-2}+C = -\\frac{1}{2x^2}+C"}</MB>
            </Kiemelo>
          </div>
          <div>
            <Kiemelo tipus="figyelem" cim="Nincs „szorzatszabály” az integrálásra!">
              <MB>{"\\int f(x)g(x)\\,dx \\ne \\left(\\int f\\right)\\left(\\int g\\right)"}</MB>
              <MB>{"\\int \\frac{f(x)}{g(x)}dx \\ne \\frac{\\int f}{\\int g}"}</MB>
              <p>
                Egyetlen ellenpélda is elég: <M>{"\\int x\\cdot x\\,dx = \\frac{x^3}{3}"}</M>, de{" "}
                <M>{"\\left(\\int x\\,dx\\right)^2 = \\frac{x^4}{4}"}</M>. Ez a <strong>leggyakoribb</strong> kezdő
                hiba. Szorzatra a parciális integrálás (6.7) való, de az sem „szabály”, csak átalakítás.
              </p>
            </Kiemelo>
          </div>
        </KetOszlop>

        <Kiemelo tipus="figyelem" cim="Az abszolút érték az ln|x|-ben">
          <p>
            Az <M>{"\\ln x"}</M> csak <M>{"x>0"}</M> esetén értelmes, az <M>{"\\frac1x"}</M> viszont{" "}
            <M>{"x<0"}</M> esetén is. Negatív <M>{"x"}</M>-re a láncszabállyal{" "}
            <M>{"\\left(\\ln(-x)\\right)' = \\frac{1}{-x}\\cdot(-1) = \\frac1x"}</M>, tehát az <M>{"x<0"}</M> ágon{" "}
            <M>{"\\ln(-x)"}</M> a primitív függvény, az <M>{"x>0"}</M> ágon <M>{"\\ln x"}</M> — a kettőt fogja össze
            az <M>{"\\ln\\left|x\\right|"}</M> írásmód (lásd a 6.2 ábrát).
          </p>
        </Kiemelo>

        <Probald cim="Próbáld ki — villámkártyák a táblázathoz">
          <HiTablazatKerdezo />
        </Probald>

        {/* --- 6.4 --- */}
        <Alcim>6.4 A linearitás — és az átalakítás mint munkamódszer</Alcim>

        <Kiemelo tipus="definicio" cim="Tétel — linearitás">
          <p>
            Ha <M>{"f"}</M>-nek és <M>{"g"}</M>-nek van primitív függvénye, és <M>{"\\lambda \\in \\mathbb{R}"}</M>,
            akkor
          </p>
          <MB>{"\\int \\left(f(x) \\pm g(x)\\right)dx = \\int f(x)\\,dx \\pm \\int g(x)\\,dx"}</MB>
          <MB>{"\\int \\lambda f(x)\\,dx = \\lambda \\int f(x)\\,dx"}</MB>
          <p className="mt-2">
            <em>Bizonyítás.</em> Mindkét állítás azonnal adódik a deriválás megfelelő szabályából: ha{" "}
            <M>{"F'=f"}</M> és <M>{"G'=g"}</M>, akkor <M>{"(F\\pm G)' = f\\pm g"}</M>, illetve{" "}
            <M>{"(\\lambda F)' = \\lambda f"}</M>. ∎
          </p>
        </Kiemelo>

        <Kiemelo tipus="figyelem" cim="A konstans kiemelése csak konstansra igaz!">
          <p>
            A <M>{"\\lambda"}</M> <strong>szám</strong>, nem függvény. Tehát{" "}
            <M>{"\\int x\\sin x\\,dx \\ne x\\int \\sin x\\,dx"}</M>: az <M>{"x"}</M>-et nem szabad kivinni az
            integráljel elé. Ez a hiba nagyon csábító, mert a jelölés hasonlít a konstans kiemelésére — de a derivált
            visszaszámolásakor azonnal kiderül, hogy rossz.
          </p>
        </Kiemelo>

        <Proza>
          <p>
            A linearitás önmagában kevés lenne, de rengeteg feladat <strong>átalakítás után</strong> visszavezethető
            rá. Ez az egyik legfontosabb szokás, amit érdemes felvenni:{" "}
            <em>mielőtt bonyolult módszerhez nyúlnál, próbáld meg átalakítani az integrandust.</em> Három tipikus
            mozdulat:
          </p>
        </Proza>

        <div className="mt-5 grid gap-4 lg:grid-cols-3 [&>*]:min-w-0">
          <Kartya cimke="1. mozdulat" cim="Bontsd ki, oszd le">
            <MB>{"\\int \\frac{(2x-3)^2}{\\sqrt x}\\,dx"}</MB>
            <p className="text-[13.5px] leading-relaxed text-petrol-600">
              A számlálót kibontva és tagonként osztva csupa hatvány marad:{" "}
              <M>{"4x^{3/2}-12x^{1/2}+9x^{-1/2}"}</M>, az eredmény{" "}
              <M>{"\\frac85 x^{5/2}-8x^{3/2}+18\\sqrt x+C"}</M>.
            </p>
          </Kartya>
          <Kartya cimke="2. mozdulat" cim="Használj azonosságot">
            <MB>{"\\int \\operatorname{tg}^2 x\\,dx"}</MB>
            <p className="text-[13.5px] leading-relaxed text-petrol-600">
              A táblázatban nincs ilyen sor, de <M>{"\\operatorname{tg}^2x = \\frac{1}{\\cos^2x}-1"}</M>, tehát az
              eredmény <M>{"\\operatorname{tg} x - x + C"}</M>.
            </p>
          </Kartya>
          <Kartya cimke="3. mozdulat" cim="Adj hozzá nullát">
            <MB>{"\\int \\frac{x^2}{1+x^2}\\,dx"}</MB>
            <p className="text-[13.5px] leading-relaxed text-petrol-600">
              A számlálóhoz hozzáadunk és kivonunk 1-et:{" "}
              <M>{"\\frac{x^2+1-1}{1+x^2} = 1-\\frac{1}{1+x^2}"}</M>, tehát{" "}
              <M>{"x-\\operatorname{arctg} x+C"}</M>. Ez a racionális törtek alapmozdulata.
            </p>
          </Kartya>
        </div>

        {/* --- 6.5 --- */}
        <Alcim>6.5 Helyettesítés I. — a három nevezetes alapeset</Alcim>
        <Proza>
          <p>
            A helyettesítéses integrálás nem más, mint a <strong>láncszabály megfordítása</strong>. Mielőtt az
            általános alakot felírnánk, érdemes megtanulni azt a három speciális esetet, amely a feladatok többségét
            lefedi — ezeket <em>ránézésre</em> kell felismerni, helyettesítés kiírása nélkül.
          </p>
        </Proza>

        <Kiemelo tipus="definicio" cim="1. Az f(ax+b) eset">
          <p>
            Ha <M>{"\\int f(x)\\,dx = F(x)+C"}</M> és <M>{"a \\ne 0"}</M>, akkor
          </p>
          <MB>{"\\int f(ax+b)\\,dx = \\frac1a F(ax+b)+C."}</MB>
          <p>
            <em>Indoklás deriválással:</em>{" "}
            <M>{"\\left(\\frac1a F(ax+b)\\right)' = \\frac1a F'(ax+b)\\cdot a = f(ax+b)"}</M> ✓
          </p>
        </Kiemelo>

        <Kiemelo tipus="tipp" cim="Honnan jön az 1/a?">
          <p>
            A láncszabály deriváláskor <em>megszorozza</em> az eredményt a belső függvény deriváltjával, vagyis{" "}
            <M>{"a"}</M>-val. Integráláskor ezt kell kiegyenlítenünk, ezért kell <strong>osztani</strong>{" "}
            <M>{"a"}</M>-val. Geometriailag: az <M>{"f(2x)"}</M> grafikonja az <M>{"f"}</M> vízszintesen felére
            nyomott képe, így a görbe alatti terület is feleződik.
          </p>
        </Kiemelo>

        <Probald cim="Próbáld ki — állítsd az a és b csúszkát">
          <HiLinearisFelfedezo />
        </Probald>

        <Kiemelo tipus="figyelem" cim="Csak lineáris belső függvényre igaz!">
          <p>
            A szabály azért működik, mert az <M>{"ax+b"}</M> deriváltja a <em>konstans</em> <M>{"a"}</M>. Ha a belső
            függvény nem lineáris, az „osztunk a belső deriváltjával” mozdulat <strong>hibás</strong>:
          </p>
          <MB>{"\\int \\sin\\left(x^2\\right)dx \\ne \\frac{1}{2x}\\left(-\\cos x^2\\right)"}</MB>
          <p>
            Deriváld vissza, és látni fogod, hogy nem stimmel (a hányadosszabályból extra tag jön). Az{" "}
            <M>{"\\int \\sin x^2\\,dx"}</M> egyébként nem is fejezhető ki elemi függvényekkel.
          </p>
        </Kiemelo>

        <div className="mt-6 grid gap-4 lg:grid-cols-2 [&>*]:min-w-0">
          <Kiemelo tipus="definicio" cim="2. Az f′/f eset — a logaritmus">
            <MB>{"\\int \\frac{f'(x)}{f(x)}\\,dx = \\ln\\left|f(x)\\right|+C"}</MB>
            <p>
              <strong>Mikor gyanakodj?</strong> Ha a <strong>számláló a nevező deriváltja</strong> — vagy annak
              konstansszorosa. Ilyenkor semmi mást nem kell tenni, csak a nevező logaritmusát venni; a
              konstansszorzót a linearitással igazítjuk el.
            </p>
            <p className="mt-2">
              <em>Indoklás:</em> <M>{"f>0"}</M> esetén <M>{"\\left(\\ln f\\right)' = \\frac{f'}{f}"}</M>;{" "}
              <M>{"f<0"}</M> esetén <M>{"\\left(\\ln(-f)\\right)' = \\frac{-f'}{-f} = \\frac{f'}{f}"}</M>. A kettőt
              fogja össze az abszolút érték.
            </p>
          </Kiemelo>
          <Kiemelo tipus="definicio" cim="3. Az fⁿ·f′ eset — a hatvány">
            <MB>{"\\int f^{\\,n}(x)\\,f'(x)\\,dx = \\frac{f^{\\,n+1}(x)}{n+1}+C \\quad (n \\ne -1)"}</MB>
            <p>
              <em>Indoklás:</em>{" "}
              <M>{"\\left(\\frac{f^{\\,n+1}}{n+1}\\right)' = \\frac{(n+1)f^{\\,n}f'}{n+1} = f^{\\,n}f'"}</M> ✓ Az{" "}
              <M>{"n=-1"}</M> eset éppen az előző, logaritmusos szabály — a két minta tehát ugyanannak a
              gondolatnak a két fele.
            </p>
          </Kiemelo>
        </div>

        <Probald cim="Próbáld ki — melyik mintába illik? (12 integrál a jegyzetből)">
          <HiMintaFelismero />
        </Probald>

        {/* --- 6.6 --- */}
        <Alcim>6.6 Helyettesítés II. — az általános helyettesítés</Alcim>
        <Proza>
          <p>
            Ha a fenti három minta egyike sem illik, akkor <strong>új változót vezetünk be</strong>. A cél mindig
            ugyanaz: a kényelmetlen részt (gyök, kitevő, bonyolult belső függvény) elnevezzük <M>{"t"}</M>-nek, és
            reméljük, hogy az új integrál egyszerűbb lesz.
          </p>
        </Proza>

        <Kiemelo tipus="definicio" cim="Tétel — helyettesítéses integrálás">
          <p>
            Legyen <M>{"x = g(t)"}</M> differenciálható, szigorúan monoton függvény. Ekkor
          </p>
          <MB>{"\\int f(x)\\,dx = \\int f\\left(g(t)\\right)g'(t)\\,dt,"}</MB>
          <p>
            és a kiszámolt eredménybe végül vissza kell helyettesíteni <M>{"t = g^{-1}(x)"}</M>-et.
          </p>
          <p className="mt-2">
            <em>Indoklás:</em> ha <M>{"F'=f"}</M>, akkor a láncszabály szerint{" "}
            <M>{"\\frac{d}{dt}F\\left(g(t)\\right) = f\\left(g(t)\\right)g'(t)"}</M>, tehát a jobb oldal primitív
            függvénye <M>{"F(g(t))"}</M>, ami visszahelyettesítés után éppen <M>{"F(x)"}</M>. ∎
          </p>
        </Kiemelo>

        <KetOszlop>
          <Kiemelo tipus="kulcs" cim="A gyakorlati recept — három dolgot kell felírni">
            <p>
              <strong>1.</strong> A helyettesítés: <M>{"x = g(t)"}</M>, vagy fordítva <M>{"t = h(x)"}</M>.
            </p>
            <p className="mt-1">
              <strong>2.</strong> A <M>{"dx"}</M> átírása: <M>{"x=g(t)"}</M> esetén <M>{"dx = g'(t)\\,dt"}</M>. (Ha{" "}
              <M>{"t=h(x)"}</M>-ből indultál: <M>{"dt = h'(x)\\,dx"}</M>.)
            </p>
            <p className="mt-1">
              <strong>3.</strong> A visszahelyettesítés a végén — a válasz <M>{"x"}</M>-ben kell legyen, nem{" "}
              <M>{"t"}</M>-ben!
            </p>
          </Kiemelo>
          <Kiemelo tipus="tipp" cim="Mit érdemes t-nek választani?">
            <p>Négy bevált szabály:</p>
            <ul className="mt-1 list-disc space-y-0.5 pl-5">
              <li>a gyök alatti kifejezést, vagy magát a gyököt,</li>
              <li>a kitevőben álló kifejezést,</li>
              <li>
                az <M>{"e^x"}</M>-et, ha minden csak tőle függ,
              </li>
              <li>azt a belső függvényt, amelynek a deriváltja is ott van a szorzatban.</li>
            </ul>
          </Kiemelo>
        </KetOszlop>

        <Kiemelo tipus="figyelem" cim="A dx átírását elfelejteni a leggyakoribb hiba ebben a fejezetben">
          <p>
            A <M>{"dx"}</M> nem díszítőelem: ha <M>{"x = t^2"}</M>, akkor <M>{"dx = 2t\\,dt"}</M>, és ez a{" "}
            <M>{"2t"}</M> szorzó ott marad az integrálban. Enélkül teljesen más — hibás — eredményt kapsz.{" "}
            <strong>Ellenőrzési fogás:</strong> a helyettesítés után egyetlen <M>{"x"}</M> sem maradhat az
            integrálban.
          </p>
        </Kiemelo>

        {/* --- 6.7 --- */}
        <Alcim>6.7 Parciális integrálás</Alcim>
        <Proza>
          <p>
            A parciális integrálás a <strong>szorzatszabály megfordítása</strong>. Induljunk ki a deriválási
            szorzatszabályból, és integráljuk mindkét oldalt. A bal oldal integrálja <M>{"u(x)v(x)"}</M> (hiszen
            éppen egy derivált integrálját vesszük), a jobb oldalon pedig a linearitás miatt tagonként
            integrálhatunk:
          </p>
          <MB>{"\\left(uv\\right)' = u'v+uv' \\quad\\Longrightarrow\\quad uv = \\int u'v\\,dx + \\int uv'\\,dx"}</MB>
        </Proza>

        <Kiemelo tipus="definicio" cim="Tétel — parciális integrálás">
          <MB>{"\\int u(x)\\,v'(x)\\,dx = u(x)\\,v(x) - \\int u'(x)\\,v(x)\\,dx"}</MB>
          <p>
            Rövid alakban: <M>{"\\int uv' = uv - \\int u'v"}</M>. A <strong>mínusz</strong> abból jön, hogy az{" "}
            <M>{"\\int u'v"}</M> tagot át kell vinni a másik oldalra.
          </p>
        </Kiemelo>

        <Kiemelo tipus="tipp" cim="Mit csinál ez valójában?">
          <p>
            Nem oldja meg a feladatot, hanem <strong>kicseréli</strong> egy másikra. A tényezők közül az egyiket
            deriváljuk (<M>{"u \\to u'"}</M>), a másikat integráljuk (<M>{"v' \\to v"}</M>). Csak akkor nyertünk, ha
            az új integrál <strong>könnyebb</strong>, mint az eredeti. Ezért a döntő kérdés mindig ez:{" "}
            <em>melyik tényező legyen u és melyik v′?</em>
          </p>
        </Kiemelo>

        <Kartya cimke="Választási szabály" cim="Azt válaszd u-nak, ami deriválva egyszerűsödik">
          <div className="finom-gorgeto overflow-x-auto">
            <table className="w-full text-[14px]">
              <thead>
                <tr className="text-petrol-500">
                  <th className="px-2 py-1.5 text-left font-semibold">Az integrandus</th>
                  <th className="px-2 py-1.5 text-left font-semibold">u (deriváljuk)</th>
                  <th className="px-2 py-1.5 text-left font-semibold">v′ (integráljuk)</th>
                </tr>
              </thead>
              <tbody className="text-petrol-800">
                {[
                  ["polinom · e^{ax}", "a polinom", "e^{ax}"],
                  ["polinom · \\sin \\text{ vagy } \\cos", "a polinom", "a szögfüggvény"],
                  ["polinom · \\ln x", "\\ln x", "a polinom"],
                  ["polinom · \\operatorname{arctg} \\text{ vagy } \\arcsin", "az arkuszfüggvény", "a polinom"],
                  ["e^{ax}\\sin bx \\text{ vagy } \\cos bx", "mindegy — de következetesen!", "a másik"],
                ].map((sor, i) => (
                  <tr key={i} className="border-t border-petrol-100">
                    <td className="px-2 py-1.5">
                      <M>{sor[0]}</M>
                    </td>
                    <td className="px-2 py-1.5">{sor[1].startsWith("\\") ? <M>{sor[1]}</M> : sor[1]}</td>
                    <td className="px-2 py-1.5">{sor[2].startsWith("e^") ? <M>{sor[2]}</M> : sor[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[13.5px] leading-relaxed text-petrol-600">
            A logika egyszerű. A polinom deriválva <strong>fokot veszít</strong>, tehát ha mellette{" "}
            <M>{"e^{ax}"}</M> vagy szögfüggvény áll (ezek integrálva nem romlanak el), a polinomot deriváljuk. Az{" "}
            <M>{"\\ln x"}</M> és az arkuszfüggvények viszont <em>integrálva</em> lennének kellemetlenek,{" "}
            <em>deriválva</em> pedig racionális függvénnyé szelídülnek — ezért őket mindig <M>{"u"}</M>-nak
            választjuk.
          </p>
        </Kartya>

        <Kiemelo tipus="figyelem" cim="Rossz választás esetén rosszabb lesz a helyzet">
          <p>
            Ha az <M>{"\\int xe^x dx"}</M>-ben <M>{"u = e^x"}</M>-et és <M>{"v' = x"}</M>-et választanánk:
          </p>
          <MB>{"\\int xe^x dx = \\frac{x^2}{2}e^x - \\int \\frac{x^2}{2}e^x\\,dx"}</MB>
          <p>
            A maradék integrál <strong>nehezebb</strong>, mint az eredeti (a polinom fokszáma nőtt). Ilyenkor nem kell
            kétségbeesni: állj meg, és cseréld fel a szerepeket.
          </p>
        </Kiemelo>

        <Probald cim="Próbáld ki — válaszd ki te az u-t, és nézd meg, mi lesz belőle">
          <HiParcialisValaszto />
        </Probald>

        <Kiemelo tipus="kulcs" cim="A „körbeérő” eset">
          <p>
            Van egy különleges típus — <M>{"e^{ax}\\sin bx"}</M> és <M>{"e^{ax}\\cos bx"}</M> —, ahol kétszeri
            parciális integrálás után <strong>visszakapjuk az eredeti integrált</strong>. Ez elsőre kudarcnak tűnik,
            pedig éppen ez a megoldás kulcsa: <strong>egyenletet</strong> kapunk a keresett integrálra, amit meg lehet
            oldani (lásd KF‑4).
          </p>
          <p className="mt-2">
            Két dologra kell figyelni. (1) A szereposztás legyen <strong>következetes</strong>: ha az elsőben a
            szögfüggvény volt <M>{"u"}</M>, a másodikban is az legyen — különben az <M>{"I=I"}</M> azonossághoz jutsz,
            ami igaz, de haszontalan. (2) A végén ne felejtsd el a <M>{"+C"}</M>-t: az egyenletrendezés során
            könnyen „elveszik”.
          </p>
        </Kiemelo>

        {/* --- 6.8 --- */}
        <Alcim>6.8 Racionális törtfüggvények</Alcim>
        <Proza>
          <p>
            Két polinom hányadosát <strong>racionális törtfüggvénynek</strong> nevezzük. Ez az egyetlen nagyobb
            függvényosztály, amelyre teljesen <strong>általános</strong> eljárás van: minden racionális törtfüggvény
            integrálható elemi függvényekkel, és az alábbi négy lépéssel biztosan meg is kapjuk az eredményt.
          </p>
        </Proza>

        <Kiemelo tipus="kulcs" cim="A négy lépés">
          <p>
            <strong>1.</strong> Ha a számláló fokszáma nem kisebb a nevezőénél (<M>{"\\deg p \\ge \\deg q"}</M>):{" "}
            <strong>polinomosztás</strong>, hogy valódi tört maradjon.
          </p>
          <p className="mt-1">
            <strong>2.</strong> A nevező <strong>szorzattá bontása</strong> gyöktényezőkre és valós gyök nélküli
            másodfokú tényezőkre.
          </p>
          <p className="mt-1">
            <strong>3.</strong> <strong>Parciális törtekre bontás</strong> — ismeretlen együtthatókkal felírni, majd
            megoldani.
          </p>
          <p className="mt-1">
            <strong>4.</strong> Az <strong>elemi törtek integrálása</strong> a nevezetes alapesetek szerint.
          </p>
        </Kiemelo>

        <AbraKeret
          szam="6.3"
          cim="A racionális törtek integrálásának menetrendje. A negyedik lépésben minden tag a négy elemi típus egyikébe esik: logaritmus, hatvány, arkusz tangens, vagy a kettő kombinációja."
        >
          <AbraRacionalisFolyamat />
        </AbraKeret>

        <Proza>
          <p>
            A <strong>2. lépésnél</strong> az algebra alaptétele áll a háttérben: valós együtthatós polinomnál a nem
            valós gyökök konjugált párokban járnak, és egy ilyen pár összeszorozva valós együtthatós másodfokú
            tényezőt ad. Így minden valós polinom felbomlik{" "}
            <M>{"(x-\\alpha)^k"}</M> és <M>{"(x^2+px+q)^l"}</M> alakú tényezők szorzatára, ahol a másodfokú
            tényezőknek nincs valós gyökük (<M>{"p^2-4q<0"}</M>).
          </p>
          <p>
            A <strong>3. lépésnél</strong> minden tényező a saját típusa szerint járul hozzá: egyszeres valós gyök egy
            tagot ad (<M>{"\\frac{A}{x-\\alpha}"}</M>), <M>{"k"}</M>-szoros gyök <M>{"k"}</M> tagot (a nevezőben
            növekvő hatványokkal), egyszeres komplex gyökpár egy <M>{"\\frac{Bx+D}{x^2+px+q}"}</M> alakú tagot. Az
            ismeretlen együtthatókat vagy <strong>együttható-összehasonlítással</strong>, vagy — egyszeres valós
            gyököknél sokkal gyorsabban — a <strong>letakarásos módszerrel</strong> (a gyökök behelyettesítésével)
            kapjuk meg.
          </p>
        </Proza>

        <Probald cim="Próbáld ki — találd ki az A és B együtthatókat">
          <HiParcialisTortek />
        </Probald>

        <Kiemelo tipus="definicio" cim="A 4. lépés — a négy elemi tört">
          <MB>{"\\textbf{(1)}\\quad \\int \\frac{A}{x-\\alpha}\\,dx = A\\ln\\left|x-\\alpha\\right|+C"}</MB>
          <MB>{"\\textbf{(2)}\\quad \\int \\frac{A}{(x-\\alpha)^k}\\,dx = \\frac{A}{(1-k)(x-\\alpha)^{k-1}}+C \\quad (k\\ge2)"}</MB>
          <MB>{"\\textbf{(3)}\\quad x^2+px+q = \\left(x+\\frac p2\\right)^2+\\left(q-\\frac{p^2}{4}\\right) \\;\\longrightarrow\\; \\operatorname{arctg}"}</MB>
          <MB>{"\\textbf{(4)}\\quad Bx+D = \\frac B2\\left(2x+p\\right)+\\left(D-\\frac{Bp}{2}\\right)"}</MB>
          <p>
            A (4) esetben a számlálót <strong>szétszedjük</strong> a nevező deriváltjára (ez logaritmust ad) és egy
            konstansra (ez a (3) esetre vezet, tehát arkusz tangenst ad).
          </p>
        </Kiemelo>

        <Kiemelo tipus="figyelem" cim="Az abszolút érték a logaritmusban">
          <p>
            Az <M>{"\\ln\\left|x-1\\right|"}</M>-nél kell, mert <M>{"x-1"}</M> lehet negatív. A{" "}
            <M>{"\\ln\\left(x^2+x+1\\right)"}</M>-nél viszont <strong>nem kell</strong>, mert egy valós gyök nélküli,
            pozitív főegyütthatójú másodfokú kifejezés mindig pozitív. Kiírni nem hiba, de a fölösleges abszolút érték
            azt sugallja, hogy nem gondoltad végig.
          </p>
        </Kiemelo>

        {/* --- 6.9 --- */}
        <Alcim>6.9 Trigonometrikus kifejezések</Alcim>
        <Proza>
          <p>
            Szögfüggvényeket tartalmazó integrálnál szinte mindig <strong>azonossággal alakítunk</strong> először, és
            csak utána integrálunk. A kérdés csak az, melyik azonossággal — és erre a{" "}
            <em>hatványok paritása</em> ad választ.
          </p>
        </Proza>

        <Kartya cimke="Kézikönyv" cim="Melyik trükk mikor?">
          <div className="finom-gorgeto overflow-x-auto">
            <table className="w-full text-[14px]">
              <thead>
                <tr className="text-petrol-500">
                  <th className="px-2 py-1.5 text-left font-semibold">Ha ezt látod</th>
                  <th className="px-2 py-1.5 text-left font-semibold">Ezt csináld</th>
                  <th className="px-2 py-1.5 text-left font-semibold">Példa</th>
                </tr>
              </thead>
              <tbody className="text-petrol-800">
                <tr className="border-t border-petrol-100">
                  <td className="px-2 py-1.5">páros hatvány</td>
                  <td className="px-2 py-1.5">
                    linearizálás: <M>{"\\cos^2x = \\frac{1+\\cos 2x}{2}"}</M>
                  </td>
                  <td className="px-2 py-1.5">
                    <M>{"\\int \\cos^4x\\,dx"}</M>
                  </td>
                </tr>
                <tr className="border-t border-petrol-100">
                  <td className="px-2 py-1.5">páratlan hatvány</td>
                  <td className="px-2 py-1.5">
                    egy tényező leválasztása, majd <M>{"f^{\\,n}f'"}</M>
                  </td>
                  <td className="px-2 py-1.5">
                    <M>{"\\int \\cos^3x\\,dx"}</M>
                  </td>
                </tr>
                <tr className="border-t border-petrol-100">
                  <td className="px-2 py-1.5">különböző frekvenciák szorzata</td>
                  <td className="px-2 py-1.5">szorzatból összeg</td>
                  <td className="px-2 py-1.5">
                    <M>{"\\int \\sin 2x\\cos 3x\\,dx"}</M>
                  </td>
                </tr>
                <tr className="border-t border-petrol-100">
                  <td className="px-2 py-1.5">semmi nem segít</td>
                  <td className="px-2 py-1.5">
                    univerzális helyettesítés: <M>{"t=\\operatorname{tg}\\frac x2"}</M>
                  </td>
                  <td className="px-2 py-1.5">
                    <M>{"\\int \\frac{dx}{5+4\\cos x}"}</M>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Kartya>

        <div className="mt-6 grid gap-4 lg:grid-cols-2 [&>*]:min-w-0">
          <Kiemelo tipus="definicio" cim="A négy azonosság">
            <MB>{"\\sin^2x = \\frac{1-\\cos 2x}{2}, \\qquad \\cos^2x = \\frac{1+\\cos 2x}{2}"}</MB>
            <MB>{"\\sin\\alpha\\cos\\beta = \\frac12\\left(\\sin(\\alpha+\\beta)+\\sin(\\alpha-\\beta)\\right)"}</MB>
            <MB>{"\\cos\\alpha\\cos\\beta = \\frac12\\left(\\cos(\\alpha+\\beta)+\\cos(\\alpha-\\beta)\\right)"}</MB>
            <MB>{"\\sin\\alpha\\sin\\beta = \\frac12\\left(\\cos(\\alpha-\\beta)-\\cos(\\alpha+\\beta)\\right)"}</MB>
          </Kiemelo>
          <Kiemelo tipus="definicio" cim="Az univerzális helyettesítés">
            <p>
              A <M>{"t = \\operatorname{tg}\\frac x2"}</M> helyettesítés a szinuszt és a koszinuszt egyaránt
              racionális kifejezéssé alakítja, utána a 6.8 eljárása használható:
            </p>
            <MB>{"\\sin x = \\frac{2t}{1+t^2}, \\quad \\cos x = \\frac{1-t^2}{1+t^2}, \\quad dx = \\frac{2\\,dt}{1+t^2}"}</MB>
            <p>
              A <M>{"\\cos"}</M>-ra vonatkozó képlet a kétszeres szög azonosságából jön:{" "}
              <M>{"\\cos x = \\frac{\\cos^2\\frac x2-\\sin^2\\frac x2}{\\cos^2\\frac x2+\\sin^2\\frac x2} = \\frac{1-t^2}{1+t^2}"}</M>
              , a <M>{"dx"}</M> pedig az <M>{"x = 2\\operatorname{arctg} t"}</M> deriválásából.
            </p>
          </Kiemelo>
        </div>

        <Kiemelo tipus="figyelem" cim="Az univerzális helyettesítés mindig működik, de gyakran hosszú">
          <p>
            Ha a feladat megoldható linearizálással vagy leválasztással, azt válaszd — a{" "}
            <M>{"t=\\operatorname{tg}\\frac x2"}</M> sokszor csúnya racionális törtet gyárt. Tekintsd{" "}
            <strong>végső eszköznek</strong>, ne elsőnek.
          </p>
        </Kiemelo>

        {/* --- 6.10 --- */}
        <Alcim>6.10 Gyökös kifejezések</Alcim>
        <Proza>
          <p>
            A gyökös integrálok mind ugyanazon a gondolaton alapulnak:{" "}
            <strong>olyan helyettesítést keresünk, amitől a gyök eltűnik.</strong> A típus felismerése után a
            helyettesítés gépies — ezt a táblázatot érdemes bemagolni.
          </p>
        </Proza>

        <KetOszlop>
          <Kartya cimke="Táblázat" cim="Melyik gyökhöz melyik helyettesítés?">
            <div className="finom-gorgeto overflow-x-auto">
              <table className="w-full text-[14px]">
                <tbody className="text-petrol-800">
                  {[
                    ["R\\left(\\sqrt[n]{ax+b}\\right)", "t = \\sqrt[n]{ax+b}"],
                    ["R\\left(\\sqrt[n]{\\frac{ax+b}{cx+d}}\\right)", "t = \\sqrt[n]{\\frac{ax+b}{cx+d}}"],
                    ["R\\left(\\sqrt{a^2-x^2}\\right)", "x = a\\sin t"],
                    ["R\\left(\\sqrt{a^2+x^2}\\right)", "x = a\\operatorname{sh} t"],
                    ["R\\left(\\sqrt{x^2-a^2}\\right)", "x = a\\operatorname{ch} t"],
                    ["R\\left(e^{x}\\right)", "t = e^{x}"],
                  ].map((sor, i) => (
                    <tr key={i} className="border-t border-petrol-100">
                      <td className="px-2 py-1.5">
                        <M>{sor[0]}</M>
                      </td>
                      <td className="px-2 py-1.5 text-naracs-800">
                        <M>{sor[1]}</M>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-[13px] text-petrol-500">
              (<M>{"R"}</M> tetszőleges racionális kifejezést jelöl.)
            </p>
          </Kartya>
          <Kiemelo tipus="tipp" cim="Miért éppen ezek?">
            <p>
              A trigonometrikus és hiperbolikus helyettesítéseknél a <strong>Pitagorasz-féle azonosságok</strong>{" "}
              teszik el a gyököt:
            </p>
            <MB>{"\\sqrt{a^2-a^2\\sin^2t} = a\\sqrt{\\cos^2t} = a\\cos t"}</MB>
            <MB>{"\\sqrt{a^2+a^2\\operatorname{sh}^2t} = a\\operatorname{ch} t"}</MB>
            <MB>{"\\sqrt{a^2\\operatorname{ch}^2t-a^2} = a\\operatorname{sh} t"}</MB>
            <p>
              (A <M>{"\\operatorname{ch}^2t-\\operatorname{sh}^2t=1"}</M> a hiperbolikus függvények
              alapösszefüggése.) Az utolsó két esetben a gyök elhagyásához <M>{"t \\ge 0"}</M>-t szokás feltenni,
              hogy a mennyiségek nemnegatívak legyenek.
            </p>
          </Kiemelo>
        </KetOszlop>

        {/* --- 6.11 --- */}
        <Alcim>6.11 Melyik módszerrel próbálkozzunk?</Alcim>
        <Proza>
          <p>
            A tapasztalat előbb-utóbb ránézésre megmondja a módszert, de addig is hasznos egy rendezett keresési
            sorrend. Ezen a listán fentről lefelé haladj — a lentebbi módszerek mindig hosszabbak.
          </p>
        </Proza>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 [&>*]:min-w-0">
          {[
            {
              szam: "1.",
              cim: "Átalakítható?",
              szoveg:
                "Bontsd ki, oszd le tagonként, használj azonosságot, adj hozzá nullát. Ha utána a táblázatból megy, kész vagy.",
            },
            {
              szam: "2.",
              cim: "Illik a három mintába?",
              szoveg:
                "f(ax+b)? A számláló a nevező deriváltja? Ott van a belső derivált a szorzatban? Ezek ránézésre mennek.",
            },
            {
              szam: "3.",
              cim: "Van kellemetlen rész?",
              szoveg:
                "Gyök, kitevő, e^x — nevezd el t-nek, és írd át a dx-et. A gyökös táblázat megmondja, mit válassz.",
            },
            {
              szam: "4.",
              cim: "Szorzat?",
              szoveg:
                "Parciális integrálás. Azt deriváld, ami egyszerűsödik: a polinomot — de ln és arkusz mellett azokat.",
            },
            {
              szam: "5.",
              cim: "Racionális tört?",
              szoveg:
                "Négy lépés: polinomosztás, szorzattá bontás, parciális törtek, integrálás. Ez mindig működik.",
            },
            {
              szam: "6.",
              cim: "Szögfüggvény?",
              szoveg:
                "Paritás szerint linearizálás vagy leválasztás; frekvenciák szorzatánál összeggé alakítás; végső esetben t = tg(x/2).",
            },
          ].map((l) => (
            <Kartya key={l.szam} cimke={`${l.szam} lépés`} cim={l.cim}>
              <p className="text-[13.5px] leading-relaxed text-petrol-600">{l.szoveg}</p>
            </Kartya>
          ))}
        </div>

        <Kiemelo tipus="kulcs" cim="És ha egyik sem működik?">
          <p>
            Előfordul. Két oka lehet: vagy nem vetted észre a jó átalakítást (érdemes az integrandust átírni:
            kibontani, közös nevezőre hozni, azonosságot alkalmazni), vagy tényleg <strong>nincs elemi primitív
            függvény</strong>. Vizsgapéldáknál az első a valószínűbb — a zárthelyi feladatai mindig megoldhatók.
          </p>
        </Kiemelo>

        {/* --- 6.12 --- */}
        <Alcim>6.12 Miért szép? — a +C fizikai jelentése</Alcim>
        <Proza>
          <p>
            A <M>{"+C"}</M> elsőre bosszantó formalitásnak tűnik. Pedig ha egy valódi feladatot nézel meg, kiderül,
            hogy <strong>pontosan ez hordozza a kezdeti feltételeket</strong>.
          </p>
          <p>
            Vegyünk egy mozgást: adott az <M>{"a(t)"}</M> gyorsulás. A sebesség <M>{"v = \\int a\\,dt"}</M>, az út{" "}
            <M>{"s = \\int v\\,dt"}</M> — két integrálás, két konstans. Az első konstans a{" "}
            <strong>kezdősebesség</strong>, a második a <strong>kezdőpozíció</strong>. A gyorsulás a mozgás{" "}
            <em>alakját</em> írja elő; hogy pontosan hol és milyen gyorsan kezdünk, azt a két konstans mondja meg.
          </p>
          <p>
            Told a csúszkákat, és nézd meg: az <M>{"a"}</M> változtatása <em>átformálja</em> a görbéket, a{" "}
            <M>{"v_0"}</M> és az <M>{"s_0"}</M> viszont csak <em>eltolja</em> őket. Ugyanez a tartó{" "}
            <M>{"q \\to V \\to M"}</M> lánca is: ott a két konstanst a megtámasztási feltételek rögzítik.
          </p>
        </Proza>

        <Probald cim="Próbáld ki — gyorsulás, sebesség, út">
          <HiMozgasFelfedezo />
        </Probald>

        <Kiemelo tipus="kulcs" cim="Amit ebből a modulból magaddal viszel">
          <p>
            Az integrálás nem egy újabb szabálygyűjtemény, hanem <strong>a deriválás megfordítása</strong> — és mivel
            a megfordításra nincs univerzális recept, a technika helyét a <em>felismerés</em> veszi át. Cserébe
            viszont kapsz valamit, ami a matematikában ritkaság: <strong>az eredményed helyességét mindig magad tudod
            eldönteni</strong>, egyetlen visszaderiválással. Ha ezt a szokást felveszed, a zárthelyin nem fogsz vakon
            szurkolni a pontokért.
          </p>
        </Kiemelo>
      </Szakasz>

      {/* ==================== KIDOLGOZOTT FELADATOK ==================== */}
      <Szakasz
        id="peldak"
        cimke="2. rész"
        cim="Kidolgozott feladatok"
        bevezeto="Az előadás példái, lépésenként, ugyanazokkal a számokkal. Minden eredményt visszaderiválunk — ezt te is csináld meg papíron, mert a dolgozatban ez lesz az egyetlen ellenőrzési lehetőséged."
        className="bg-white"
      >
        {/* ---- KF-1 ---- */}
        <KidolgozottFeladat
          jel="KF‑1"
          ido="8 perc"
          forras="Előadás, 5–12. példa"
          cim="A három alapeset — ránézésre"
          feladat={
            <>
              <p>
                <strong>(a)</strong> <M>{"\\int (3x-2)^7\\,dx"}</M>
              </p>
              <p className="mt-2">
                <strong>(b)</strong> <M>{"\\int \\frac{dx}{9+x^2}"}</M> és <M>{"\\int \\frac{dx}{\\sqrt{9-x^2}}"}</M>
              </p>
              <p className="mt-2">
                <strong>(c)</strong> <M>{"\\int \\operatorname{tg} x\\,dx"}</M> és{" "}
                <M>{"\\int \\frac{x}{x^2+4}\\,dx"}</M>
              </p>
              <p className="mt-2">
                <strong>(d)</strong> <M>{"\\int 2x\\sqrt{x^2+1}\\,dx"}</M>
              </p>
            </>
          }
          tanulsag={
            <p>
              A három minta lefedi a feladatok nagy részét, és mindegyik <em>egyetlen</em> kérdésre vezet: mi a belső
              függvény, és ott van-e a deriváltja? A (b) két fele mutatja, miért nem szabad ezeket fejből „tudni”: az
              arkusz tangensnél <strong>marad</strong> az <M>{"\\frac13"}</M>, az arkusz szinusznál{" "}
              <strong>kiesik</strong>. Vezesd le mindig, vagy nézd meg a puskán.
            </p>
          }
        >
          <Lepes cim="(a) Lineáris belső függvény">
            <p>
              A külső függvény <M>{"f(u) = u^7"}</M>, ennek primitív függvénye <M>{"F(u) = \\frac{u^8}{8}"}</M>. A
              belső <M>{"3x-2"}</M> meredeksége <M>{"a = 3"}</M>.
            </p>
            <KepletDoboz
              cimke="A szabály"
              keplet={"\\int f(ax+b)\\,dx = \\frac1a F(ax+b)+C"}
              behelyettesitve={"\\int (3x-2)^7dx = \\frac13\\cdot\\frac{(3x-2)^8}{8}+C"}
              eredmeny={"\\int (3x-2)^7dx = \\frac{(3x-2)^8}{24}+C"}
            />
            <p>
              <strong>Ellenőrzés:</strong>{" "}
              <M>{"\\left(\\frac{(3x-2)^8}{24}\\right)' = \\frac{8(3x-2)^7\\cdot 3}{24} = (3x-2)^7"}</M> ✓ A
              láncszabály visszahozta a 3-at, ami kiejtette a nevezőben lévő 3-at.
            </p>
          </Lepes>
          <Lepes cim="(b) Az a²-es alapesetek — a trükk a kiemelés">
            <p>
              Mindkét integrálnál ugyanaz a mozdulat: emeljük ki a 9-et, hogy <M>{"1+u^2"}</M>, illetve{" "}
              <M>{"1-u^2"}</M> alak keletkezzen.
            </p>
            <MB>{"\\int \\frac{dx}{9+x^2} = \\int \\frac{dx}{9\\left(1+\\left(\\frac x3\\right)^2\\right)} = \\frac19\\cdot 3\\operatorname{arctg}\\frac x3+C = \\frac13\\operatorname{arctg}\\frac x3+C"}</MB>
            <MB>{"\\int \\frac{dx}{\\sqrt{9-x^2}} = \\int \\frac{dx}{3\\sqrt{1-\\left(\\frac x3\\right)^2}} = \\frac13\\cdot 3\\arcsin\\frac x3+C = \\arcsin\\frac x3+C"}</MB>
            <p>
              Figyeld meg a különbséget: az elsőben a <M>{"\\frac19"}</M> és a belső <M>{"\\frac13"}</M> reciproka, a
              3 szorzódik, és marad <M>{"\\frac13"}</M>; a másodikban a gyök miatt csak <M>{"\\frac13"}</M> jön ki a
              nevezőből, amit a 3 pontosan kiejt.
            </p>
          </Lepes>
          <Lepes cim="(c) Logaritmus-minta, két igazítással">
            <p>
              Az elsőnél írjuk át törtté: <M>{"\\operatorname{tg} x = \\frac{\\sin x}{\\cos x}"}</M>. A nevező{" "}
              <M>{"\\cos x"}</M>, ennek deriváltja <M>{"-\\sin x"}</M> — a mínuszt ki kell emelnünk:
            </p>
            <MB>{"\\int \\operatorname{tg} x\\,dx = -\\int \\frac{-\\sin x}{\\cos x}\\,dx = -\\ln\\left|\\cos x\\right|+C"}</MB>
            <p>
              A másodiknál a nevező deriváltja <M>{"2x"}</M>, a számlálóban <M>{"x"}</M> áll — a hiányzó 2-est egy{" "}
              <M>{"\\frac12"}</M> szorzóval pótoljuk:
            </p>
            <MB>{"\\int \\frac{x}{x^2+4}dx = \\frac12\\int \\frac{2x}{x^2+4}dx = \\frac12\\ln\\left(x^2+4\\right)+C"}</MB>
            <p>
              Abszolút érték itt <strong>nem kell</strong>, mert <M>{"x^2+4>0"}</M> minden <M>{"x"}</M>-re.
            </p>
          </Lepes>
          <Lepes cim="(d) Hatvány-minta">
            <p>
              Legyen <M>{"f(x) = x^2+1"}</M>; ekkor <M>{"f'(x) = 2x"}</M>, ami ott áll a szorzatban, a gyök pedig{" "}
              <M>{"n = \\frac12"}</M> kitevőt jelent.
            </p>
            <KepletDoboz
              cimke="Hatvány-minta"
              keplet={"\\int f^{\\,n}f'\\,dx = \\frac{f^{\\,n+1}}{n+1}+C"}
              behelyettesitve={"\\int \\left(x^2+1\\right)^{1/2}\\left(x^2+1\\right)'dx = \\frac{\\left(x^2+1\\right)^{3/2}}{3/2}+C"}
              eredmeny={"\\int 2x\\sqrt{x^2+1}\\,dx = \\frac23\\left(x^2+1\\right)\\sqrt{x^2+1}+C"}
            />
            <p>
              <strong>Ellenőrzés:</strong>{" "}
              <M>{"\\left(\\frac23\\left(x^2+1\\right)^{3/2}\\right)' = \\frac23\\cdot\\frac32\\left(x^2+1\\right)^{1/2}\\cdot 2x = 2x\\sqrt{x^2+1}"}</M>{" "}
              ✓
            </p>
          </Lepes>
        </KidolgozottFeladat>

        {/* ---- KF-2 ---- */}
        <KidolgozottFeladat
          jel="KF‑2"
          ido="8 perc"
          forras="Előadás, 15–17. példa"
          cim="Általános helyettesítés — három klasszikus"
          feladat={
            <>
              <p>
                <strong>(a)</strong> <M>{"\\int \\frac{e^{\\sqrt x}}{\\sqrt x}\\,dx"}</M>
              </p>
              <p className="mt-2">
                <strong>(b)</strong> <M>{"\\int x\\sqrt[3]{1+x}\\,dx"}</M>
              </p>
              <p className="mt-2">
                <strong>(c)</strong> <M>{"\\int \\frac{e^x}{1+e^{2x}}\\,dx"}</M>
              </p>
            </>
          }
          tanulsag={
            <p>
              Mindhárom esetben ugyanaz a három lépés: <strong>elnevezés</strong>, a <M>{"dx"}</M>{" "}
              <strong>átírása</strong>, <strong>visszahelyettesítés</strong>. A második lépés a kritikus — ha a{" "}
              <M>{"dx"}</M> nem változik, az eredmény hibás lesz. Ellenőrzési fogás: a helyettesítés után egyetlen{" "}
              <M>{"x"}</M> sem maradhat.
            </p>
          }
        >
          <Lepes cim="(a) A kellemetlen rész a gyök">
            <MB>{"\\sqrt x = t \\;\\Longrightarrow\\; x = t^2 \\;\\Longrightarrow\\; dx = 2t\\,dt"}</MB>
            <p>Behelyettesítve minden szépen egyszerűsödik:</p>
            <MB>{"\\int \\frac{e^t}{t}\\cdot 2t\\,dt = 2\\int e^t\\,dt = 2e^t+C"}</MB>
            <KepletDoboz
              cimke="Visszahelyettesítés"
              keplet={"t = \\sqrt x"}
              eredmeny={"\\int \\frac{e^{\\sqrt x}}{\\sqrt x}dx = 2e^{\\sqrt x}+C"}
            />
            <p>
              <strong>Ellenőrzés:</strong>{" "}
              <M>{"\\left(2e^{\\sqrt x}\\right)' = 2e^{\\sqrt x}\\cdot\\frac{1}{2\\sqrt x} = \\frac{e^{\\sqrt x}}{\\sqrt x}"}</M>{" "}
              ✓
            </p>
          </Lepes>
          <Lepes cim="(b) A köbgyököt tüntetjük el">
            <MB>{"t = \\sqrt[3]{1+x} \\;\\Longrightarrow\\; t^3 = 1+x \\;\\Longrightarrow\\; x = t^3-1 \\;\\Longrightarrow\\; dx = 3t^2\\,dt"}</MB>
            <p>
              Figyeld meg, hogy nem csak a gyököt kell átírni, hanem a szorzatban álló <M>{"x"}</M>-et is — ezért
              kellett kifejeznünk <M>{"x"}</M>-et <M>{"t"}</M>-vel:
            </p>
            <MB>{"\\int \\left(t^3-1\\right)\\cdot t\\cdot 3t^2\\,dt = 3\\int \\left(t^6-t^3\\right)dt = 3\\left(\\frac{t^7}{7}-\\frac{t^4}{4}\\right)+C"}</MB>
            <KepletDoboz
              cimke="Visszahelyettesítés"
              keplet={"t = (1+x)^{1/3}"}
              eredmeny={"\\int x\\sqrt[3]{1+x}\\,dx = \\frac37(1+x)^{7/3}-\\frac34(1+x)^{4/3}+C"}
            />
          </Lepes>
          <Lepes cim="(c) Minden csak eˣ-től függ">
            <p>
              Vegyük észre, hogy <M>{"e^{2x} = \\left(e^x\\right)^2"}</M>, tehát az egész kifejezés csak{" "}
              <M>{"e^x"}</M>-től függ:
            </p>
            <MB>{"t = e^x \\;\\Longrightarrow\\; x = \\ln t \\;\\Longrightarrow\\; dx = \\frac1t\\,dt"}</MB>
            <MB>{"\\int \\frac{t}{1+t^2}\\cdot\\frac1t\\,dt = \\int \\frac{dt}{1+t^2} = \\operatorname{arctg} t+C"}</MB>
            <KepletDoboz
              cimke="Visszahelyettesítés"
              keplet={"t = e^x"}
              eredmeny={"\\int \\frac{e^x}{1+e^{2x}}dx = \\operatorname{arctg}\\left(e^x\\right)+C"}
            />
            <p>
              Ez a példa a <M>{"\\frac{f'}{1+f^2}"}</M> mintával is azonnal megoldható lett volna, hiszen{" "}
              <M>{"\\left(e^x\\right)' = e^x"}</M> — a helyettesítés kiírása csak biztonsági öv.
            </p>
          </Lepes>
        </KidolgozottFeladat>

        <div className="my-8">
          <p className="mb-2 text-[11px] font-bold tracking-[0.16em] text-naracs-600 uppercase">
            Film — a következő feladathoz
          </p>
          <FilmParcialis />
        </div>

        {/* ---- KF-3 ---- */}
        <KidolgozottFeladat
          jel="KF‑3"
          ido="10 perc"
          forras="Előadás, 18–21. példa"
          cim="Parciális integrálás — négy szereposztás"
          feladat={
            <>
              <p>
                <strong>(a)</strong> <M>{"\\int x\\,e^{2x}\\,dx"}</M>
              </p>
              <p className="mt-2">
                <strong>(b)</strong> <M>{"\\int \\left(x^2+2x-3\\right)\\cos 3x\\,dx"}</M>
              </p>
              <p className="mt-2">
                <strong>(c)</strong> <M>{"\\int \\ln x\\,dx"}</M>
              </p>
              <p className="mt-2">
                <strong>(d)</strong> <M>{"\\int x\\operatorname{arctg} x\\,dx"}</M>
              </p>
            </>
          }
          tanulsag={
            <p>
              A négy feladat a választási szabály négy sora. Polinom mellett a polinomot deriváljuk (mert fokot
              veszít), <M>{"\\ln"}</M> és arkuszfüggvény mellett viszont <em>azokat</em> (mert deriválva racionálissá
              szelídülnek). Ha a maradék integrál nehezebb lett, a választás rossz volt — cseréld fel a szerepeket, ne
              küzdj tovább.
            </p>
          }
        >
          <Lepes cim="(a) Polinom · exponenciális">
            <p>
              <M>{"u = x"}</M> (deriválva 1 lesz) és <M>{"v' = e^{2x}"}</M> (ebből{" "}
              <M>{"v = \\frac12 e^{2x}"}</M>):
            </p>
            <KepletDoboz
              cimke="A képlet"
              keplet={"\\int u\\,v'\\,dx = u\\,v-\\int u'\\,v\\,dx"}
              behelyettesitve={"\\int xe^{2x}dx = x\\cdot\\frac{e^{2x}}{2}-\\int 1\\cdot\\frac{e^{2x}}{2}\\,dx"}
              eredmeny={"\\int xe^{2x}dx = \\frac{xe^{2x}}{2}-\\frac{e^{2x}}{4}+C"}
            />
            <p>
              <strong>Ellenőrzés:</strong>{" "}
              <M>{"\\left(\\frac{xe^{2x}}{2}-\\frac{e^{2x}}{4}\\right)' = \\frac{e^{2x}}{2}+xe^{2x}-\\frac{e^{2x}}{2} = xe^{2x}"}</M>{" "}
              ✓ A két „fél <M>{"e^{2x}"}</M>” pont kiütötte egymást — ez a film utolsó fejezete.
            </p>
          </Lepes>
          <Lepes cim="(b) Másodfokú polinom: kétszer kell">
            <p>
              <em>Első lépés:</em> <M>{"u = x^2+2x-3"}</M>, <M>{"v' = \\cos 3x"}</M>, tehát{" "}
              <M>{"u' = 2x+2"}</M> és <M>{"v = \\frac{\\sin 3x}{3}"}</M>.
            </p>
            <MB>{"\\int \\left(x^2+2x-3\\right)\\cos 3x\\,dx = \\left(x^2+2x-3\\right)\\frac{\\sin 3x}{3}-\\frac13\\int (2x+2)\\sin 3x\\,dx"}</MB>
            <p>
              <em>Második lépés:</em> a megmaradt integrálra <M>{"u = 2x+2"}</M>, <M>{"v' = \\sin 3x"}</M>, tehát{" "}
              <M>{"u' = 2"}</M> és <M>{"v = -\\frac{\\cos 3x}{3}"}</M>.
            </p>
            <MB>{"\\int (2x+2)\\sin 3x\\,dx = -(2x+2)\\frac{\\cos 3x}{3}+\\frac23\\int \\cos 3x\\,dx = -(2x+2)\\frac{\\cos 3x}{3}+\\frac{2\\sin 3x}{9}"}</MB>
            <KepletDoboz
              cimke="Összerakva"
              keplet={"-\\frac13\\left[-(2x+2)\\frac{\\cos 3x}{3}+\\frac{2\\sin 3x}{9}\\right] = +\\frac{(2x+2)\\cos 3x}{9}-\\frac{2\\sin 3x}{27}"}
              eredmeny={"\\int \\left(x^2+2x-3\\right)\\cos 3x\\,dx = \\frac{\\left(x^2+2x-3\\right)\\sin 3x}{3}+\\frac{(2x+2)\\cos 3x}{9}-\\frac{2\\sin 3x}{27}+C"}
            />
            <p>
              A fokszám lépésenként csökkent: 2 → 1 → 0. Egy <M>{"n"}</M>-edfokú polinomnál pontosan{" "}
              <M>{"n+1"}</M> lépés kell — érdemes előre tudni, hány sort fogsz írni.
            </p>
          </Lepes>
          <Lepes cim="(c) A klasszikus trükk: 1 · ln x">
            <p>
              Itt látszólag nincs szorzat — de van, csak észre kell venni:{" "}
              <M>{"\\ln x = 1\\cdot\\ln x"}</M>. Legyen <M>{"u = \\ln x"}</M> és <M>{"v' = 1"}</M>, ekkor{" "}
              <M>{"u' = \\frac1x"}</M> és <M>{"v = x"}</M>:
            </p>
            <KepletDoboz
              cimke="Behelyettesítve"
              keplet={"\\int \\ln x\\,dx = x\\ln x-\\int \\frac1x\\cdot x\\,dx"}
              behelyettesitve={"= x\\ln x-\\int 1\\,dx"}
              eredmeny={"\\int \\ln x\\,dx = x\\ln x-x+C"}
            />
            <p>
              <strong>Ellenőrzés:</strong>{" "}
              <M>{"\\left(x\\ln x-x\\right)' = \\ln x+x\\cdot\\frac1x-1 = \\ln x"}</M> ✓ Ugyanígy megy az{" "}
              <M>{"\\int \\arcsin x\\,dx"}</M> és az <M>{"\\int \\operatorname{arctg} x\\,dx"}</M> is — mindig{" "}
              <M>{"v'=1"}</M> választással.
            </p>
          </Lepes>
          <Lepes cim="(d) Polinom · arkuszfüggvény">
            <p>
              A választási szabály szerint <M>{"u = \\operatorname{arctg} x"}</M> (mert deriválva racionális lesz),{" "}
              <M>{"v' = x"}</M>, így <M>{"u' = \\frac{1}{1+x^2}"}</M> és <M>{"v = \\frac{x^2}{2}"}</M>:
            </p>
            <MB>{"\\int x\\operatorname{arctg} x\\,dx = \\frac{x^2}{2}\\operatorname{arctg} x-\\frac12\\int \\frac{x^2}{1+x^2}\\,dx"}</MB>
            <p>
              A maradék integrált a „nullát adunk hozzá” trükkel intézzük el (6.4):{" "}
              <M>{"\\int \\frac{x^2}{1+x^2}dx = x-\\operatorname{arctg} x"}</M>. Tehát
            </p>
            <KepletDoboz
              cimke="Összevonás"
              keplet={"\\frac{x^2}{2}\\operatorname{arctg} x-\\frac x2+\\frac{\\operatorname{arctg} x}{2}"}
              eredmeny={"\\int x\\operatorname{arctg} x\\,dx = \\frac{x^2+1}{2}\\operatorname{arctg} x-\\frac x2+C"}
            />
          </Lepes>
        </KidolgozottFeladat>

        {/* ---- KF-4 ---- */}
        <KidolgozottFeladat
          jel="KF‑4"
          ido="7 perc"
          forras="Előadás, 22. példa"
          cim="A körbeérő eset — egyenlet az integrálra"
          feladat={
            <p>
              Számítsd ki: <M>{"I = \\int e^{-x}\\cos 3x\\,dx"}</M>. Mi történik, ha a második lépésben megcseréled a
              szerepeket?
            </p>
          }
          tanulsag={
            <p>
              Ez az egyetlen típus, ahol a „nem lett egyszerűbb” <em>nem</em> kudarc. A trükk az, hogy a kétszeri
              parciális integrálás után az eredeti integrál jelenik meg a jobb oldalon — ezt már csak át kell vinni a
              bal oldalra. A szereposztás <strong>következetessége</strong> a kulcs, és a végén a{" "}
              <M>{"+C"}</M> se maradjon le: az egyenletrendezés során könnyen elveszik.
            </p>
          }
        >
          <Lepes cim="Első lépés: a szögfüggvényt deriváljuk">
            <p>
              <M>{"u = \\cos 3x"}</M>, <M>{"v' = e^{-x}"}</M>, tehát <M>{"u' = -3\\sin 3x"}</M> és{" "}
              <M>{"v = -e^{-x}"}</M>.
            </p>
            <MB>{"I = -e^{-x}\\cos 3x - \\int \\left(-e^{-x}\\right)\\left(-3\\sin 3x\\right)dx = -e^{-x}\\cos 3x-3\\int e^{-x}\\sin 3x\\,dx"}</MB>
            <p>
              Az új integrál se nem könnyebb, se nem nehezebb — ugyanolyan típusú. Itt <em>ez a jó jel</em>.
            </p>
          </Lepes>
          <Lepes cim="Második lépés: ugyanaz a szereposztás">
            <p>
              Legyen <M>{"J = \\int e^{-x}\\sin 3x\\,dx"}</M>. Erre <strong>ugyanolyan szereposztással</strong> (a
              szögfüggvény az <M>{"u"}</M>, az exponenciális a <M>{"v'"}</M>):
            </p>
            <MB>{"J = -e^{-x}\\sin 3x + 3\\int e^{-x}\\cos 3x\\,dx = -e^{-x}\\sin 3x+3I"}</MB>
            <p>
              Itt jelent meg az eredeti <M>{"I"}</M> a jobb oldalon. Ha most megcserélnéd a szerepeket (az
              exponenciálist deriválnád), pontosan visszajutnál a kiindulóponthoz: az <M>{"I = I"}</M> azonossághoz,
              ami igaz, de haszontalan.
            </p>
          </Lepes>
          <Lepes cim="Összerakás: egyenlet I-re">
            <MB>{"I = -e^{-x}\\cos 3x-3\\left(-e^{-x}\\sin 3x+3I\\right) = -e^{-x}\\cos 3x+3e^{-x}\\sin 3x-9I"}</MB>
            <KepletDoboz
              cimke="Rendezés"
              keplet={"10I = e^{-x}\\left(3\\sin 3x-\\cos 3x\\right)"}
              eredmeny={"I = \\frac{e^{-x}\\left(3\\sin 3x-\\cos 3x\\right)}{10}+C"}
            />
          </Lepes>
          <Lepes cim="Ellenőrzés — itt különösen érdemes">
            <p>Deriváljuk vissza szorzatszabállyal:</p>
            <MB>{"\\left(\\frac{e^{-x}\\left(3\\sin 3x-\\cos 3x\\right)}{10}\\right)' = \\frac{-e^{-x}\\left(3\\sin 3x-\\cos 3x\\right)+e^{-x}\\left(9\\cos 3x+3\\sin 3x\\right)}{10}"}</MB>
            <MB>{"= \\frac{e^{-x}\\left(-3\\sin 3x+\\cos 3x+9\\cos 3x+3\\sin 3x\\right)}{10} = \\frac{10e^{-x}\\cos 3x}{10} = e^{-x}\\cos 3x \\;\\checkmark"}</MB>
            <p>
              A szinuszos tagok kiestek, a koszinuszosak összeadódtak — a 10-es nevező pontosan ezért lett 10. Ha a
              feladat <M>{"e^{-x}\\sin 3x"}</M> lenne, ugyanez a nevező jönne ki (<M>{"1^2+3^2 = 10"}</M>).
            </p>
          </Lepes>
        </KidolgozottFeladat>

        <div className="my-8">
          <p className="mb-2 text-[11px] font-bold tracking-[0.16em] text-naracs-600 uppercase">
            Film — a következő feladathoz
          </p>
          <FilmParcialisTortek />
        </div>

        {/* ---- KF-5 ---- */}
        <KidolgozottFeladat
          jel="KF‑5"
          ido="12 perc"
          forras="Előadás, 25. és 27. példa"
          cim="Racionális törtek — valós és komplex gyökökkel"
          feladat={
            <>
              <p>
                <strong>(a)</strong> <M>{"\\int \\frac{3x+2}{x^2+x-6}\\,dx"}</M>
              </p>
              <p className="mt-2">
                <strong>(b)</strong> <M>{"\\int \\frac{2x+4}{x^3-1}\\,dx"}</M>
              </p>
            </>
          }
          tanulsag={
            <p>
              A menetrend mindig ugyanaz, csak a nevező gyökei döntik el, hány és milyen tag lesz. Két valós gyök →
              két logaritmus; komplex gyökpár → egy logaritmus és egy arkusz tangens. A komplex tagnál a mozdulat
              mindig a <strong>számláló szétszedése</strong>: a nevező deriváltja plusz egy konstans. És mindig
              ellenőrizd a fokszámokat, mielőtt bontani kezdesz!
            </p>
          }
        >
          <Lepes cim="(a1) A nevező gyökei és a bontás alakja">
            <MB>{"x^2+x-6 = 0 \\;\\Longrightarrow\\; x_{1,2} = \\frac{-1\\pm\\sqrt{1+24}}{2} = \\frac{-1\\pm5}{2} \\;\\Longrightarrow\\; x_1 = 2,\\ x_2 = -3"}</MB>
            <MB>{"\\frac{3x+2}{(x-2)(x+3)} = \\frac{A}{x-2}+\\frac{B}{x+3} \\;\\Longrightarrow\\; 3x+2 = A(x+3)+B(x-2)"}</MB>
            <p>
              A számláló elsőfokú, a nevező másodfokú — valódi tört, tehát nincs szükség polinomosztásra.
            </p>
          </Lepes>
          <Lepes cim="(a2) Letakarásos módszer: a gyököket behelyettesítjük">
            <p>
              A trükk az, hogy a gyökök behelyettesítésekor az egyik tag mindig eltűnik:
            </p>
            <MB>{"x=2: \\quad 8 = 5A \\;\\Longrightarrow\\; A = \\frac85 = 1{,}6"}</MB>
            <MB>{"x=-3: \\quad -7 = -5B \\;\\Longrightarrow\\; B = \\frac75 = 1{,}4"}</MB>
            <KepletDoboz
              cimke="Integrálás tagonként"
              keplet={"\\frac85\\int\\frac{dx}{x-2}+\\frac75\\int\\frac{dx}{x+3}"}
              eredmeny={"\\int \\frac{3x+2}{x^2+x-6}dx = \\frac85\\ln\\left|x-2\\right|+\\frac75\\ln\\left|x+3\\right|+C"}
            />
            <p>
              Gyors ellenőrzés együttható-összehasonlítással: az <M>{"x"}</M> együtthatója{" "}
              <M>{"A+B = 1{,}6+1{,}4 = 3"}</M> ✓, a konstans tag <M>{"3A-2B = 4{,}8-2{,}8 = 2"}</M> ✓
            </p>
          </Lepes>
          <Lepes cim="(b1) Komplex gyökpár: a bontás alakja">
            <p>
              <M>{"x^3-1 = (x-1)\\left(x^2+x+1\\right)"}</M>, és a másodfokú tényezőnek nincs valós gyöke (
              <M>{"1-4<0"}</M>), tehát egy <M>{"Bx+D"}</M> alakú számláló tartozik hozzá:
            </p>
            <MB>{"\\frac{2x+4}{x^3-1} = \\frac{A}{x-1}+\\frac{Bx+D}{x^2+x+1} \\;\\Longrightarrow\\; 2x+4 = A\\left(x^2+x+1\\right)+(Bx+D)(x-1)"}</MB>
            <p>
              <M>{"x=1"}</M>: <M>{"6 = 3A \\Rightarrow A = 2"}</M>. Az <M>{"x^2"}</M> együtthatója:{" "}
              <M>{"A+B = 0 \\Rightarrow B = -2"}</M>. A konstans tag: <M>{"A-D = 4 \\Rightarrow D = -2"}</M>.
            </p>
          </Lepes>
          <Lepes cim="(b2) A másodfokú tag: szétszedés és teljes négyzet">
            <p>
              Igazítsuk a számlálót a nevező deriváltjához, ami <M>{"2x+1"}</M>:
            </p>
            <MB>{"-2x-2 = -(2x+1)-1 \\;\\Longrightarrow\\; \\int \\frac{-2x-2}{x^2+x+1}dx = -\\int \\frac{2x+1}{x^2+x+1}dx-\\int \\frac{dx}{x^2+x+1}"}</MB>
            <p>
              Az első rész pontosan <M>{"\\frac{f'}{f}"}</M> alakú: <M>{"-\\ln\\left(x^2+x+1\\right)"}</M> (abszolút
              érték nélkül, mert a nevező mindig pozitív). A másodikhoz teljes négyzet:
            </p>
            <MB>{"x^2+x+1 = \\left(x+\\frac12\\right)^2+\\frac34"}</MB>
            <MB>{"\\int \\frac{dx}{x^2+x+1} = \\frac{2}{\\sqrt3}\\operatorname{arctg}\\frac{2x+1}{\\sqrt3}"}</MB>
          </Lepes>
          <Lepes cim="(b3) Végeredmény">
            <KepletDoboz
              cimke="A három tag összege"
              keplet={"2\\ln\\left|x-1\\right| - \\ln\\left(x^2+x+1\\right) - \\frac{2}{\\sqrt3}\\operatorname{arctg}\\frac{2x+1}{\\sqrt3}"}
              eredmeny={"\\int \\frac{2x+4}{x^3-1}dx = 2\\ln\\left|x-1\\right|-\\ln\\left(x^2+x+1\\right)-\\frac{2\\sqrt3}{3}\\operatorname{arctg}\\frac{2x+1}{\\sqrt3}+C"}
            />
            <p>
              Figyeld meg az abszolút értékek különbségét: az <M>{"\\ln\\left|x-1\\right|"}</M>-nél kell (mert{" "}
              <M>{"x-1"}</M> lehet negatív), az <M>{"\\ln\\left(x^2+x+1\\right)"}</M>-nél viszont nem.
            </p>
          </Lepes>
        </KidolgozottFeladat>

        {/* ---- KF-6 ---- */}
        <KidolgozottFeladat
          jel="KF‑6"
          ido="12 perc"
          forras="Előadás, 29., 31., 32. és 35. példa"
          cim="Trigonometrikus és gyökös kifejezések"
          feladat={
            <>
              <p>
                <strong>(a)</strong> <M>{"\\int \\cos^4 x\\,dx"}</M> (páros hatvány)
              </p>
              <p className="mt-2">
                <strong>(b)</strong> <M>{"\\int \\sin 2x\\cos 3x\\,dx"}</M> (különböző frekvenciák)
              </p>
              <p className="mt-2">
                <strong>(c)</strong> <M>{"\\int \\frac{dx}{5+4\\cos x}"}</M> (univerzális helyettesítés)
              </p>
              <p className="mt-2">
                <strong>(d)</strong> <M>{"\\int x^2\\sqrt{1-x^2}\\,dx"}</M> (szinuszos helyettesítés)
              </p>
            </>
          }
          tanulsag={
            <p>
              Négy feladat, négy különböző trükk — és mind a négy <em>felismerésen</em> múlik, nem számoláson. A (d)
              megmutatja a gyökös feladatok legkellemetlenebb részét is: a <strong>visszahelyettesítést</strong>. Ha a
              <M>{"\\sin 4t"}</M>-t nem bontod vissza kétszeres szögekkel, az eredményed <M>{"t"}</M>-ben marad, ami
              nem válasz.
            </p>
          }
        >
          <Lepes cim="(a) Negyedik hatvány — kétszeri linearizálás">
            <MB>{"\\cos^4x = \\left(\\cos^2x\\right)^2 = \\left(\\frac{1+\\cos 2x}{2}\\right)^2 = \\frac{1+2\\cos 2x+\\cos^2 2x}{4}"}</MB>
            <p>
              A <M>{"\\cos^2 2x"}</M>-et <strong>újra</strong> linearizáljuk:{" "}
              <M>{"\\cos^2 2x = \\frac{1+\\cos 4x}{2}"}</M>, tehát
            </p>
            <MB>{"\\cos^4x = \\frac14+\\frac{\\cos 2x}{2}+\\frac{1+\\cos 4x}{8} = \\frac38+\\frac{\\cos 2x}{2}+\\frac{\\cos 4x}{8}"}</MB>
            <KepletDoboz
              cimke="Tagonként integrálva"
              keplet={"\\int \\left(\\frac38+\\frac{\\cos 2x}{2}+\\frac{\\cos 4x}{8}\\right)dx"}
              eredmeny={"\\int \\cos^4x\\,dx = \\frac{3x}{8}+\\frac{\\sin 2x}{4}+\\frac{\\sin 4x}{32}+C"}
            />
            <p>
              A <M>{"\\frac12"}</M> és a <M>{"\\frac18"}</M> együtthatókból a lineáris belső függvény miatt{" "}
              <M>{"\\frac14"}</M> és <M>{"\\frac{1}{32}"}</M> lett.
            </p>
          </Lepes>
          <Lepes cim="(b) Szorzatból összeg">
            <p>
              Az <M>{"\\alpha = 2x"}</M>, <M>{"\\beta = 3x"}</M> választással:
            </p>
            <MB>{"\\sin 2x\\cos 3x = \\frac12\\left(\\sin 5x+\\sin(-x)\\right) = \\frac12\\sin 5x-\\frac12\\sin x"}</MB>
            <KepletDoboz
              cimke="Tagonként"
              keplet={"\\frac12\\int \\sin 5x\\,dx-\\frac12\\int \\sin x\\,dx"}
              eredmeny={"\\int \\sin 2x\\cos 3x\\,dx = -\\frac{\\cos 5x}{10}+\\frac{\\cos x}{2}+C"}
            />
            <p>
              A <M>{"\\sin"}</M> páratlan függvény, ezért lett <M>{"\\sin(-x) = -\\sin x"}</M> — ez a leggyakrabban
              elrontott részlet ennél a típusnál.
            </p>
          </Lepes>
          <Lepes cim="(c) Univerzális helyettesítés">
            <p>
              A nevező a <M>{"t = \\operatorname{tg}\\frac x2"}</M> helyettesítés után:
            </p>
            <MB>{"5+4\\cdot\\frac{1-t^2}{1+t^2} = \\frac{5+5t^2+4-4t^2}{1+t^2} = \\frac{9+t^2}{1+t^2}"}</MB>
            <MB>{"\\int \\frac{dx}{5+4\\cos x} = \\int \\frac{1+t^2}{9+t^2}\\cdot\\frac{2}{1+t^2}\\,dt = \\int \\frac{2\\,dt}{9+t^2} = \\frac23\\operatorname{arctg}\\frac t3+C"}</MB>
            <KepletDoboz
              cimke="Visszahelyettesítés"
              keplet={"t = \\operatorname{tg}\\frac x2"}
              eredmeny={"\\int \\frac{dx}{5+4\\cos x} = \\frac23\\operatorname{arctg}\\left(\\frac13\\operatorname{tg}\\frac x2\\right)+C"}
            />
            <p>
              Figyeld meg, milyen szépen kiesett az <M>{"1+t^2"}</M> — a <M>{"dx"}</M>-ből jövő nevező pontosan
              ugyanaz, mint ami a helyettesítésből keletkezett. Ez a helyettesítés jellegzetes viselkedése.
            </p>
          </Lepes>
          <Lepes cim="(d1) Szinuszos helyettesítés — a gyök eltűnik">
            <MB>{"x = \\sin t \\;\\Longrightarrow\\; dx = \\cos t\\,dt, \\qquad \\sqrt{1-x^2} = \\sqrt{1-\\sin^2t} = \\cos t"}</MB>
            <MB>{"\\int \\sin^2t\\cos t\\cdot\\cos t\\,dt = \\int \\sin^2t\\cos^2t\\,dt = \\frac14\\int \\sin^2 2t\\,dt"}</MB>
            <p>
              (Felhasználtuk, hogy <M>{"\\sin t\\cos t = \\frac12\\sin 2t"}</M>.) Még egy linearizálás, majd
              integrálás:
            </p>
            <MB>{"\\frac14\\int \\frac{1-\\cos 4t}{2}\\,dt = \\frac t8-\\frac{\\sin 4t}{32}+C"}</MB>
          </Lepes>
          <Lepes cim="(d2) A visszahelyettesítés — a nehezebbik fele">
            <p>
              <M>{"t = \\arcsin x"}</M>, de a <M>{"\\sin 4t"}</M>-t is vissza kell bontani kétszeres szögekkel:
            </p>
            <MB>{"\\sin 4t = 2\\sin 2t\\cos 2t = 4\\sin t\\cos t\\left(1-2\\sin^2t\\right) = 4x\\sqrt{1-x^2}\\left(1-2x^2\\right)"}</MB>
            <KepletDoboz
              cimke="Behelyettesítve"
              keplet={"\\frac{\\arcsin x}{8}-\\frac{4x\\sqrt{1-x^2}\\left(1-2x^2\\right)}{32}"}
              eredmeny={"\\int x^2\\sqrt{1-x^2}\\,dx = \\frac{\\arcsin x}{8}-\\frac{x\\sqrt{1-x^2}\\left(1-2x^2\\right)}{8}+C"}
            />
            <p>
              Ellenőrzésképp <M>{"x=0"}</M>-nál mindkét tag nulla, és a derivált is nulla — ahogy az integrandusból
              várható (<M>{"0^2\\cdot 1 = 0"}</M>). A teljes visszaderiválás kicsit hosszabb, de a kalkulátorral (3.
              rész) egy pillanat alatt ellenőrizheted.
            </p>
          </Lepes>
        </KidolgozottFeladat>
      </Szakasz>

      {/* ==================== KALKULÁTOROK ==================== */}
      <Szakasz
        id="kalkulator"
        cimke="3. rész"
        cim="Kalkulátorok"
        bevezeto="Ez a modul kalkulátora nem integrál helyetted — ellenőriz. Pontosan azt csinálja, amit neked is minden feladat végén meg kell tenned: visszaderivál. A vessző és a pont is elfogadott tizedesjelként."
      >
        <div className="space-y-8">
          <div>
            <h3 className="mb-2 text-[16px] font-semibold text-petrol-900">Jól integráltál? — visszaderiválós ellenőrző</h3>
            <p className="mb-3 text-[14px] text-petrol-600">
              Írd be az <M>{"f(x)"}</M> integrandust és az <M>{"F(x)"}</M> tippedet: a panel numerikusan deriválja{" "}
              <M>{"F"}</M>-et, és összeveti <M>{"f"}</M>-fel kilenc pontban — táblázatban és grafikonon is. Ha a két
              görbe fedi egymást, az eredményed jó. A gombokkal betölthetők a KF-ek eredményei, és egy szándékosan
              hibás tipp is, hogy lásd, mit mutat a rossz válasz.
            </p>
            <HiEllenorzoKalk />
          </div>
          <div>
            <h3 className="mb-2 text-[16px] font-semibold text-petrol-900">Parciális tört kalkulátor</h3>
            <p className="mb-3 text-[14px] text-petrol-600">
              Az <M>{"\\int \\frac{ax+b}{x^2+px+q}\\,dx"}</M> típus mind a három esete: két valós gyök, kétszeres
              gyök, vagy komplex gyökpár. A panel megmutatja a diszkriminánst, a gyöktényezős vagy teljes négyzetes
              alakot, az együtthatókat és a teljes primitív függvényt — a végén numerikus ellenőrzéssel.
              Alaphelyzetben a KF‑5 feladata van betöltve.
            </p>
            <HiParcialisTortKalk />
          </div>
        </div>

        <Kiemelo tipus="tipp" cim="Mire használd a kalkulátort">
          <p>
            Arra, hogy <em>ellenőrizd magad</em>, ne arra, hogy helyetted számoljon. A zárthelyin nem lesz nálad — de
            a módszer, amit használ, igen: <strong>deriválj vissza</strong>. És egy fontos korlát: az ellenőrző nem
            látja a <M>{"+C"}</M>-t, hiszen a konstans deriváltja nulla. Ha lefelejtetted, a gép zöldet mutat, a
            javító tanár viszont nem.
          </p>
        </Kiemelo>
      </Szakasz>

      {/* ==================== GYAKORLÁS ==================== */}
      <Szakasz
        id="gyakorlas"
        cimke="4. rész"
        cim="Gyakorlás"
        bevezeto="Minden feladat új számokkal generálódik, az „új feladat” gombbal pedig végtelen sokat kaphatsz. A megoldást csak akkor nézd meg, ha már próbálkoztál. A tizedesvesszőt és a pontot is elfogadja."
        className="bg-white"
      >
        <Kviz
          cim="Érted, vagy csak integrálsz?"
          leiras="Tíz kérdés a modul tipikus félreértéseiről — egyik sem számolós. Minden válasz után rövid magyarázat."
          kerdesek={KVIZ}
        />

        <Hibakereso feladatok={HIBAK} />

        <div className="my-6">
          <p className="mb-2 text-[11px] font-bold tracking-[0.16em] text-violet-700 uppercase">
            Játék — melyik módszer?
          </p>
          <HiModszerValaszto />
        </div>

        <h3 className="mt-10 text-xl font-semibold text-petrol-900">Számolós gyakorlás</h3>
        <p className="mt-2 text-[14px] text-petrol-600">
          Az öt alaptípus, ami a zárthelyin biztosan előkerül. Öt egymás utáni hibátlan megoldás után konfetti jár.
        </p>
        <GyakorloSzekcio />

        <h3 className="mt-10 text-xl font-semibold text-petrol-900">További feladattípusok</h3>
        <p className="mt-2 text-[14px] text-petrol-600">Ezek is bekerülnek a Zh-szimulátorba.</p>
        <GyakorloExtra />

        <Kiemelo tipus="kulcs" cim="Mikor mehetsz tovább">
          <p>
            Akkor vagy készen ezzel a modullal, ha (1) ránézésre megmondod egy integrálról, melyik módszerrel érdemes
            nekiállni — ezt méri a játék, (2) a három helyettesítési mintát (
            <M>{"f(ax+b)"}</M>, <M>{"\\frac{f'}{f}"}</M>, <M>{"f^{\\,n}f'"}</M>) helyettesítés kiírása nélkül
            alkalmazod, (3) parciális integrálásnál magadtól a jó tényezőt választod <M>{"u"}</M>-nak, és a mínuszt
            sem rontod el, (4) egy racionális törtnél elsőként a <em>fokszámokat</em> nézed meg, és (5) minden
            eredményedet <strong>visszaderiválod</strong>, mielőtt leadnád. A következő modulban a határozott
            integrál jön: ott a Newton–Leibniz-tétel révén pontosan ezeket a primitív függvényeket fogod használni —
            területre, ívhosszra, forgástest térfogatára.
          </p>
        </Kiemelo>
      </Szakasz>
    </>
  );
}
