import { ModulFejlec, SzakaszSav } from "@/components/ModulKeret";
import { Szakasz, Kartya, Kiemelo, AbraKeret, KetOszlop } from "@/components/ui/Elemek";
import { M, MB, KepletDoboz } from "@/components/ui/Keplet";
import { KidolgozottFeladat, Lepes } from "@/components/KidolgozottFeladat";
import {
  AbraKetTipus,
  AbraParadoxon,
  AbraPKriterium,
  AbraTrapezElv,
} from "@/components/abrak/ImStatikusAbrak";
import ImSzingularitasFelfedezo from "@/components/abrak/ImSzingularitasFelfedezo";
import ImVegtelenFelfedezo from "@/components/abrak/ImVegtelenFelfedezo";
import ImKriteriumFelfedezo from "@/components/abrak/ImKriteriumFelfedezo";
import ImTorricelli from "@/components/abrak/ImTorricelli";
import ImNumerikusFelfedezo from "@/components/abrak/ImNumerikusFelfedezo";
import ImMertAdatok from "@/components/abrak/ImMertAdatok";
import ImKonvergensE from "@/components/abrak/ImKonvergensE";
import { ImImpropriusKalk, ImNumerikusKalk } from "@/components/abrak/ImKalk";
import FilmImproprius from "@/components/improprius/FilmImproprius";
import FilmSimpson from "@/components/improprius/FilmSimpson";
import GyakorloSzekcio from "@/components/improprius/GyakorloSzekcio";
import GyakorloExtra from "@/components/improprius/GyakorloExtra";
import Kviz from "@/components/Kviz";
import Hibakereso from "@/components/Hibakereso";
import { KVIZ, HIBAK } from "@/components/improprius/KvizAdatok";
import { modulSlugAlapjan } from "@/lib/oldalterkep";

export const metadata = {
  title: "Improprius és numerikus integrálás",
  description:
    "Nem korlátos integrandus és nem korlátos tartomány, a p-kritérium két esete, majoráns-, minoráns- és limeszes összehasonlító kritérium, a Torricelli-trombita, trapéz- és Simpson-szabály hibabecsléssel — interaktív ábrákkal, kidolgozott feladatokkal és gyakorlással.",
};

const modul = modulSlugAlapjan("/improprius");

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

export default function ImpropriusOldal() {
  return (
    <>
      <ModulFejlec
        szam={8}
        cim="Improprius és numerikus integrálás"
        leiras="Az integrálfogalom két korlátját feszegetjük: mi van, ha a tartomány végtelen, vagy ha a függvény felrobban? A válasz mindkétszer ugyanaz: állj meg előtte, számolj, és vedd a határértéket. A modul második fele arról szól, mit tegyünk, ha nincs primitív függvény — vagy nincs is képlet, csak mért számok."
        tartalom={[
          "I. típus: nem korlátos integrandus",
          "II. típus: végtelen tartomány",
          "A p-kritérium két esete",
          "Majoráns, minoráns, limeszes kritérium",
          "Torricelli-trombita",
          "Trapéz- és Simpson-szabály, hibabecslés",
        ]}
      />
      <SzakaszSav szakaszok={modul.szakaszok} />

      {/* ==================== ELMÉLET ==================== */}
      <Szakasz
        id="elmelet"
        cimke="1. rész"
        cim="Elmélet"
        bevezeto="Tizenegy gondolat, és mindegyik ugyanarra a mozdulatra épül: ha valahol nem tudunk közvetlenül számolni, megállunk előtte, kiszámoljuk a rendes integrált, és határértéket veszünk. Az ábrákkal játssz: a p csúszka egyetlen mozdulattal megmutatja, hol van a konvergencia és a divergencia határa."
      >
        {/* --- 8.1 --- */}
        <h3 className="mt-2 text-xl font-semibold text-petrol-900">8.1 Miért kell kiterjeszteni az integrál fogalmát?</h3>
        <Proza>
          <p>
            Amikor a határozott integrált bevezettük, két feltételt hallgatólagosan mindig kikötöttünk: az intervallum{" "}
            <strong>véges</strong> (<M>{"a"}</M> és <M>{"b"}</M> valós számok), és a függvény az intervallumon{" "}
            <strong>korlátos</strong> (van olyan <M>{"K"}</M>, amelynél <M>{"|f(x)|"}</M> sehol nem nagyobb).
          </p>
          <p>
            Ez nem szőrszálhasogatás volt: a Riemann-integrált alsó és felső közelítő összegekkel értelmeztük. Ha az
            intervallum végtelen, nem tudjuk véges sok részre osztani; ha a függvény nem korlátos, akkor a felső
            közelítő összeg már egyetlen részintervallumon is végtelen lehet.
          </p>
          <p>
            A baj csak az, hogy a mérnöki és fizikai feladatok tömegével adnak pont ilyen integrálokat:
          </p>
          <ul>
            <li>
              Egy <M>{"x=1"}</M> méternél kezdődő, „végtelen hosszú” tartó terhelésének eredője:{" "}
              <M>{"\\int_1^{\\infty} q(x)\\,dx"}</M>.
            </li>
            <li>
              A gravitációs vagy elektromos potenciál a végtelenből indulva: <M>{"\\int_r^{\\infty}\\frac{k}{s^2}\\,ds"}</M>.
            </li>
            <li>
              Valószínűségszámításban a sűrűségfüggvény alatti terület mindig a teljes számegyenesen értendő:{" "}
              <M>{"\\int_{-\\infty}^{\\infty} f(x)\\,dx = 1"}</M>.
            </li>
            <li>
              Egy tranziens jelenség teljes energiája, egy mennyiség hosszú távú átlaga, a Laplace-transzformáció
              definíciója — mind <M>{"\\int_0^{\\infty}"}</M> alakú.
            </li>
          </ul>
          <p>
            És nem korlátos integrandus is előfordul: a <M>{"\\int_0^1\\frac{dx}{\\sqrt x}"}</M> integrál a nulla
            közelében „felrobban”, mégis teljesen értelmes fizikai tartalma lehet — például egy repedéscsúcs körüli
            feszültségeloszlás vagy egy merev bélyeg alatti kontaktnyomás integrálja. A feszültség a perem felé
            elméletileg végtelenné válik, az <em>eredő erő</em> mégis véges.
          </p>
        </Proza>

        <Kiemelo tipus="kulcs" cim="A vezérgondolat — ez az egész modul egyetlen mondatban">
          <p>
            Nem tudunk közvetlenül integrálni oda, ahol a függvény vagy a tartomány elszáll. Amit viszont tudunk:{" "}
            <strong>megállni előtte</strong>, kiszámolni a rendes Riemann-integrált, és utána{" "}
            <strong>határátmenettel</strong> közeledni a kritikus helyhez. Ha a kapott érték véges határértékhez tart,
            az integrálnak értelmet adunk; ha nem, az integrál nem létezik.
          </p>
          <p>
            Ez pontosan ugyanaz a gondolat, mint a sorozatoknál a küszöbindex vagy a deriváltnál a szelő átbillenése:
            egy „elérhetetlen” mennyiséget elérhetők határértékeként értelmezünk.
          </p>
        </Kiemelo>

        <AbraKeret
          szam="8.1"
          cim="A két alapeset. Balra a függvény nem korlátos (I. típus), jobbra a tartomány (II. típus) — a recept mindkétszer ugyanaz."
        >
          <AbraKetTipus />
        </AbraKeret>

        <Kartya cim="A két típus" cimke="Áttekintés">
          <div className="finom-gorgeto overflow-x-auto">
            <table className="w-full text-[14px] text-petrol-800">
              <thead>
                <tr className="border-b border-petrol-200 text-[12px] tracking-wider text-petrol-500 uppercase">
                  <th className="py-2 pr-4 text-left font-semibold">Típus</th>
                  <th className="py-2 pr-4 text-left font-semibold">Mi a baj?</th>
                  <th className="py-2 text-left font-semibold">Példa</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-petrol-100">
                  <td className="py-2 pr-4 font-semibold">I. típus</td>
                  <td className="py-2 pr-4">az integrandus nem korlátos</td>
                  <td className="py-2">
                    <M>{"\\int_0^1\\dfrac{dx}{\\sqrt x}"}</M>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-semibold">II. típus</td>
                  <td className="py-2 pr-4">az integrálási tartomány nem korlátos</td>
                  <td className="py-2">
                    <M>{"\\int_1^{\\infty}\\dfrac{dx}{x^2}"}</M>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[14px] text-petrol-700">
            A kettő együtt is előfordulhat: a <M>{"\\int_0^{\\infty}\\frac{dx}{\\sqrt x\\,(1+x)}"}</M> integrálnál a
            nullánál az integrandus, a végtelenben a tartomány a gond. Ilyenkor a feladatot{" "}
            <strong>szétvágjuk</strong>, és minden kritikus helyet <strong>külön</strong> kezelünk.
          </p>
        </Kartya>

        <Kiemelo tipus="tipp" cim="Hol találkozol vele az építőmérnöki gyakorlatban?">
          <p>
            A talajmechanikában a konszolidáció időbeli lefolyása <M>{"\\int_0^{\\infty}"}</M> alakú integrálokkal írható
            le; a hidrológiában egy árhullám teljes lefolyt vízmennyisége a hozamgörbe alatti terület a végtelenig; a
            szerkezetdinamikában egy lengés teljes elnyelt energiája ugyanígy. A numerikus integrálás pedig ott jön be,
            ahol <em>nincs</em> képlet: mért keresztszelvényből kubatúra, mért nyíróerő-ábrából nyomaték, mért
            sebességgörbéből megtett út. Ezekre a modul végén külön eszközt is találsz.
          </p>
        </Kiemelo>

        {/* --- 8.2 --- */}
        <Alcim>8.2 I. típus — nem korlátos integrandus</Alcim>
        <Proza>
          <p>
            Itt az intervallum véges, de a függvény valamelyik pont közelében minden határon túl nő (vagy csökken).
            Négy eset van aszerint, hogy hol van a kritikus pont, és mind a négyet ugyanaz a gondolat oldja meg:{" "}
            <strong>állj meg egy hajszállal a kritikus hely előtt, integrálj, majd közelíts</strong>.
          </p>
        </Proza>

        <Kiemelo tipus="definicio" cim="A négy eset">
          <p>
            <strong>1. eset — a jobb végpontban nem korlátos.</strong> Ha <M>{"f"}</M> folytonos az{" "}
            <M>{"a \\le x < b"}</M> intervallumon, és <M>{"x\\to b-0"}</M> esetén nem korlátos:
          </p>
          <MB>{"\\int_a^b f(x)\\,dx := \\lim_{c\\to b-0}\\int_a^{c} f(x)\\,dx"}</MB>
          <p>
            <strong>2. eset — a bal végpontban nem korlátos.</strong>
          </p>
          <MB>{"\\int_a^b f(x)\\,dx := \\lim_{c\\to a+0}\\int_c^{b} f(x)\\,dx"}</MB>
          <p>
            <strong>3. eset — mindkét végpontban.</strong> Válassz egy tetszőleges belső <M>{"m"}</M> pontot, és
            értelmezd a két rész összegeként — a két határátmenet <strong>független</strong> egymástól:
          </p>
          <MB>{"\\int_a^b f := \\lim_{c\\to a+0}\\int_c^{m} f + \\lim_{d\\to b-0}\\int_{m}^{d} f"}</MB>
          <p>
            <strong>4. eset — egy belső <M>{"c"}</M> pontban.</strong>
          </p>
          <MB>{"\\int_a^b f := \\lim_{u\\to c-0}\\int_a^{u} f + \\lim_{v\\to c+0}\\int_{v}^{b} f"}</MB>
          <p>
            Az integrál mindig <strong>akkor és csak akkor</strong> konvergens, ha minden szereplő határérték
            külön-külön létezik és véges. Az <M>{"m"}</M> pont megválasztása nem befolyásolja az eredményt.
          </p>
        </Kiemelo>

        <Probald cim="Próbáld ki — hol van a konvergencia határa?">
          <ImSzingularitasFelfedezo />
        </Probald>

        <Proza>
          <p>
            A csúszkával az a látvány a fontos, hogy a <M>{"p = 1"}</M> érték két oldalán{" "}
            <strong>minőségileg</strong> más történik. <M>{"p<1"}</M> mellett hiába megy az <M>{"\\varepsilon"}</M> a
            nullához, a terület beáll egy számra; <M>{"p\\ge1"}</M> mellett viszont minden újabb nagyságrenddel ugyanannyi
            (logaritmusnál) vagy egyre több (nagyobb <M>{"p"}</M>-nél) terület jön hozzá.
          </p>
        </Proza>

        <Kiemelo tipus="figyelem" cim="A leggyakoribb dolgozathiba: a belső szakadás">
          <p>
            Ha a szakadási helyet nem vesszük észre, és gépiesen behelyettesítünk a Newton–Leibniz-formulába,
            értelmetlen eredmény jön ki:
          </p>
          <MB>{"\\int_{-1}^{1}\\frac{dx}{x^2} \\overset{?}{=} \\left[-\\frac1x\\right]_{-1}^{1} = -1-1 = -2"}</MB>
          <p>
            Ez képtelenség: az <M>{"1/x^2"}</M> <strong>pozitív</strong>, a görbe alatti terület nem lehet negatív. A
            valóságban az integrál divergens, hiszen már <M>{"\\int_0^1\\frac{dx}{x^2} = +\\infty"}</M>.
          </p>
          <p>
            <strong>Tanulság:</strong> minden határozott integrálnál, mielőtt behelyettesítenél, nézd meg, hogy az
            integrandus értelmezve van-e és korlátos-e a <em>teljes</em> intervallumon. A nevező zérushelyeit, a
            logaritmus argumentumát és a páros gyök alatti kifejezést mindig ellenőrizd.
          </p>
        </Kiemelo>

        {/* --- 8.3 --- */}
        <Alcim>8.3 II. típus — nem korlátos tartomány</Alcim>
        <Proza>
          <p>
            Most a függvény rendes (folytonos, korlátos), de az intervallum nyúlik a végtelenbe. A recept ugyanaz:{" "}
            <strong>vágd el egy véges <M>{"d"}</M> helyen, integrálj, majd <M>{"d\\to\\infty"}</M></strong>.
          </p>
        </Proza>

        <Kiemelo tipus="definicio" cim="A három eset">
          <MB>{"\\int_a^{\\infty} f(x)\\,dx := \\lim_{d\\to\\infty}\\int_a^{d} f(x)\\,dx"}</MB>
          <MB>{"\\int_{-\\infty}^{b} f(x)\\,dx := \\lim_{c\\to-\\infty}\\int_{c}^{b} f(x)\\,dx"}</MB>
          <MB>{"\\int_{-\\infty}^{\\infty} f(x)\\,dx := \\lim_{c\\to-\\infty}\\int_{c}^{m} f + \\lim_{d\\to\\infty}\\int_{m}^{d} f"}</MB>
          <p>
            A harmadik esetben az integrál akkor konvergens, ha <strong>mindkét</strong> határérték külön-külön véges.
            Az eredmény nem függ <M>{"m"}</M> választásától (a gyakorlatban rendszerint <M>{"m=0"}</M>).
          </p>
        </Kiemelo>

        <Probald cim="Próbáld ki — beáll vagy elszáll?">
          <ImVegtelenFelfedezo />
        </Probald>

        <Kiemelo tipus="figyelem" cim="Miért kell két külön határérték? — a Cauchy-főérték csapdája">
          <p>
            Csábító volna a szimmetrikus <M>{"\\lim\\limits_{d\\to\\infty}\\int_{-d}^{d} f(x)\\,dx"}</M> alakot
            használni, de ez <strong>nem</strong> ugyanaz. Vegyük az <M>{"f(x)=x"}</M> függvényt: a szimmetrikus
            változat minden <M>{"d"}</M>-re nullát ad, tehát „konvergálna” — pedig{" "}
            <M>{"\\int_0^{\\infty}x\\,dx"}</M> nyilvánvalóan végtelen.
          </p>
          <p>
            A szimmetrikus határértéknek van külön neve (<em>Cauchy-főérték</em>), és van létjogosultsága a
            matematikában — de az <strong>nem</strong> az improprius integrál értéke. A két végtelent egymástól
            függetlenül kell kezelni.
          </p>
        </Kiemelo>

        {/* --- 8.4 --- */}
        <Alcim>8.4 Konvergencia, divergencia és a paradoxon</Alcim>

        <Kiemelo tipus="definicio" cim="Konvergencia és divergencia">
          <p>
            Ha a definíciókban szereplő határérték — illetve <em>minden</em> határérték, ha több van —{" "}
            <strong>létezik és véges</strong>, akkor az improprius integrált <strong>konvergensnek</strong> nevezzük, és
            az értéke ez a határérték. Minden más esetben az integrál <strong>divergens</strong>.
          </p>
        </Kiemelo>

        <Proza>
          <p>Két különböző módon lehet valami divergens:</p>
          <ul>
            <li>
              <strong>Végtelenbe tart:</strong> <M>{"\\int_1^{\\infty}\\frac{dx}{x} = \\lim_{d\\to\\infty}\\ln d = +\\infty"}</M>
              . Ilyenkor szokás azt írni, hogy az integrál értéke <M>{"+\\infty"}</M>, de attól még divergens.
            </li>
            <li>
              <strong>Nem létezik a határérték:</strong> <M>{"\\int_0^{\\infty}\\cos x\\,dx = \\lim_{d\\to\\infty}\\sin d"}</M>{" "}
              — a <M>{"\\sin d"}</M> örökké ingadozik <M>{"-1"}</M> és <M>{"1"}</M> között. Ez is divergencia.
            </li>
          </ul>
          <p>
            Ha <M>{"f(x)\\ge0"}</M> a teljes tartományon, akkor a konvergens improprius integrál tényleg egy
            végtelenbe nyúló síkidom <strong>területét</strong> adja meg. Ha <M>{"f"}</M> előjelet vált, az eredmény
            előjeles terület, mint a rendes határozott integrálnál.
          </p>
        </Proza>

        <AbraKeret
          szam="8.2"
          cim="Balra a két görbe — ránézésre alig különböznek. Jobbra az 1-től d-ig felhalmozott terület: az egyik beáll 1-re, a másik minden határon túl nő."
        >
          <AbraParadoxon />
        </AbraKeret>

        <Proza>
          <p>Számoljuk ki mindkettőt:</p>
        </Proza>
        <KetOszlop>
          <KepletDoboz
            cimke="Konvergens"
            keplet={"\\int_1^{d}\\frac{dx}{x^2} = \\left[-\\frac1x\\right]_1^{d}"}
            behelyettesitve={"= 1 - \\frac1d"}
            eredmeny={"\\longrightarrow 1"}
          />
          <KepletDoboz
            cimke="Divergens"
            keplet={"\\int_1^{d}\\frac{dx}{x} = \\left[\\ln x\\right]_1^{d}"}
            behelyettesitve={"= \\ln d"}
            eredmeny={"\\longrightarrow +\\infty"}
          />
        </KetOszlop>

        <Kiemelo tipus="tipp" cim="Mi oldja fel a paradoxont?">
          <p>
            Az, hogy a <em>hozzáadott</em> területdarabok elég gyorsan fogynak. Képzeld el, hogy a tartományt az{" "}
            <M>{"1,\\,2,\\,4,\\,8,\\,16,\\dots"}</M> helyeknél felszeleteljük. Ha minden újabb szelet területe
            legfeljebb a fele az előzőnek, akkor az összterület legfeljebb egy mértani sor összege — ami véges. Végtelen
            sok pozitív tag összege tehát lehet véges, ha elég gyorsan fogynak; pontosan úgy, ahogy{" "}
            <M>{"1+\\frac12+\\frac14+\\frac18+\\dots = 2"}</M>.
          </p>
          <p>
            A kérdés nem az, hogy „végtelen-e a tartomány”, hanem hogy <strong>milyen gyorsan tart nullához</strong> a
            függvény.
          </p>
        </Kiemelo>

        <Kiemelo tipus="figyelem" cim="A nullához tartás nem elég!">
          <p>
            Sokan azt hiszik, hogy ha <M>{"\\lim\\limits_{x\\to\\infty}f(x)=0"}</M>, akkor{" "}
            <M>{"\\int_a^{\\infty}f(x)\\,dx"}</M> konvergens. <strong>Ez nem igaz:</strong> az <M>{"1/x"}</M> nullához
            tart, az integrálja mégis divergens. A nullához tartás csak <strong>szükséges</strong> feltétel (pontosabban:
            ha <M>{"f"}</M> monoton és az integrál konvergens, akkor <M>{"f\\to0"}</M>), de nem elegendő. Ugyanez a
            helyzet a végtelen soroknál a tagok nullához tartásával — nem véletlen a hasonlóság.
          </p>
        </Kiemelo>

        {/* --- 8.5 --- */}
        <Alcim>8.5 A nevezetes összehasonlító integrálok — a p-kritérium</Alcim>
        <Proza>
          <p>
            Az egész témakör gerince két képlet. Ezeket <strong>fejből kell tudni</strong>, mert minden
            konvergenciavizsgálat ezekre vezet vissza.
          </p>
        </Proza>

        <Kiemelo tipus="definicio" cim="Tétel — a két p-integrál">
          <MB>{"\\int_1^{\\infty}\\frac{dx}{x^p} = \\frac{1}{p-1}\\quad (p>1), \\qquad \\text{divergens, ha } p\\le1"}</MB>
          <MB>{"\\int_0^{1}\\frac{dx}{x^p} = \\frac{1}{1-p}\\quad (p<1), \\qquad \\text{divergens, ha } p\\ge1"}</MB>
        </Kiemelo>

        <Proza>
          <p>
            <strong>Levezetés.</strong> Legyen először <M>{"p\\ne1"}</M>. Ekkor <M>{"x^{-p}"}</M> primitív függvénye{" "}
            <M>{"\\frac{x^{1-p}}{1-p}"}</M>, tehát
          </p>
          <MB>{"\\int_1^{d} x^{-p}\\,dx = \\left[\\frac{x^{1-p}}{1-p}\\right]_1^{d} = \\frac{d^{\\,1-p}-1}{1-p}."}</MB>
          <p>Minden azon múlik, hogy az <M>{"1-p"}</M> kitevő pozitív vagy negatív:</p>
          <ul>
            <li>
              <M>{"p>1"}</M>: ekkor <M>{"1-p<0"}</M>, tehát <M>{"d^{\\,1-p}\\to0"}</M>, és az érték{" "}
              <M>{"\\frac{-1}{1-p} = \\frac{1}{p-1}"}</M>. <strong>Konvergens.</strong>
            </li>
            <li>
              <M>{"p<1"}</M>: ekkor <M>{"1-p>0"}</M>, tehát <M>{"d^{\\,1-p}\\to\\infty"}</M>.{" "}
              <strong>Divergens.</strong>
            </li>
          </ul>
          <p>
            A kimaradt <M>{"p=1"}</M> esetben a primitív függvény logaritmus:{" "}
            <M>{"\\int_1^{d}\\frac{dx}{x} = \\ln d \\to +\\infty"}</M>, tehát divergens. A nullában vett integrálnál
            ugyanez a számolás megy, csak a <M>{"c^{\\,1-p}"}</M> tag sorsa fordul meg.
          </p>
        </Proza>

        <AbraKeret
          szam="8.3"
          cim="Ugyanaz a két görbe, két különböző tartományon — a szerepük pontosan felcserélődik. A zöld pipa a konvergens esetet jelöli."
        >
          <AbraPKriterium />
        </AbraKeret>

        <Kartya cim="A legfontosabb táblázat a modulban" cimke="Ezt jegyezd meg">
          <div className="finom-gorgeto overflow-x-auto">
            <table className="w-full text-[14px] text-petrol-800">
              <thead>
                <tr className="border-b border-petrol-200 text-[12px] tracking-wider text-petrol-500 uppercase">
                  <th className="py-2 pr-4 text-left font-semibold">Integrál</th>
                  <th className="py-2 pr-4 text-left font-semibold">Konvergens</th>
                  <th className="py-2 pr-4 text-left font-semibold">Divergens</th>
                  <th className="py-2 text-left font-semibold">Az érték</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-petrol-100">
                  <td className="py-2 pr-4">
                    <M>{"\\int_1^{\\infty}\\frac{dx}{x^p}"}</M>
                  </td>
                  <td className="py-2 pr-4 font-semibold text-emerald-700">
                    <M>{"p>1"}</M>
                  </td>
                  <td className="py-2 pr-4 text-rose-700">
                    <M>{"p\\le1"}</M>
                  </td>
                  <td className="py-2">
                    <M>{"\\frac{1}{p-1}"}</M>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">
                    <M>{"\\int_0^{1}\\frac{dx}{x^p}"}</M>
                  </td>
                  <td className="py-2 pr-4 font-semibold text-emerald-700">
                    <M>{"p<1"}</M>
                  </td>
                  <td className="py-2 pr-4 text-rose-700">
                    <M>{"p\\ge1"}</M>
                  </td>
                  <td className="py-2">
                    <M>{"\\frac{1}{1-p}"}</M>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[14px] text-petrol-700">
            A két feltétel <strong>fordítottja</strong> egymásnak, és a <M>{"p=1"}</M> eset mindkétszer divergens.
            Ezért van az, hogy a <M>{"\\int_0^{\\infty}\\frac{dx}{x^p}"}</M> integrál{" "}
            <strong>soha, semmilyen <M>{"p"}</M>-re nem konvergens</strong>: ami a nullánál jó, az a végtelenben rossz,
            és viszont.
          </p>
        </Kartya>

        <Kiemelo tipus="kulcs" cim="Az intuíció egy mondatban">
          <p>
            <em>A végtelenben a gyors fogyás jó, a nullában a lassú növekedés.</em> A nullánál az a baj, hogy a függvény
            felrobban — minél kisebb <M>{"p"}</M>, annál szelídebben. A végtelenben az a baj, hogy sokáig tart — minél
            nagyobb <M>{"p"}</M>, annál gyorsabban hal el a függvény. Két konkrét példa a határ két oldaláról:{" "}
            <M>{"\\int_0^1\\frac{dx}{\\sqrt x} = 2"}</M> konvergens, de <M>{"\\int_1^{\\infty}\\frac{dx}{\\sqrt x}"}</M>{" "}
            divergens — <em>ugyanaz a p, másik tartomány</em>.
          </p>
          <p>
            Gondolj a <M>{"\\sum\\frac{1}{n^p}"}</M> sorra: pontosan ugyanez a szabály érvényes rá (<M>{"p>1"}</M>{" "}
            konvergens), és ez nem véletlen — ugyanaz a nagyságrend-verseny zajlik mindkettőben.
          </p>
        </Kiemelo>

        {/* --- 8.6 --- */}
        <Alcim>8.6 Majoráns- és minoránskritérium</Alcim>
        <Proza>
          <p>
            A legtöbb gyakorlati integrálnál a primitív függvényt <strong>nem tudjuk felírni</strong> — az{" "}
            <M>{"e^{-x^2}"}</M> vagy a <M>{"\\frac{1}{x^2+\\sqrt x}"}</M> esetén reménytelen a Newton–Leibniz-út.
            Ilyenkor is fontos kérdés viszont, hogy az integrál <em>létezik-e</em> egyáltalán: mert utána numerikusan
            akarjuk kiszámolni, vagy mert egy valószínűségi modell csak akkor működik, ha véges.
          </p>
          <p>
            Az összehasonlító kritériumok pont erre valók:{" "}
            <strong>nem adják meg az integrál értékét, csak azt döntik el, hogy konvergens-e.</strong>
          </p>
        </Proza>

        <Kiemelo tipus="definicio" cim="A két kritérium">
          <p>
            <strong>Majoránskritérium.</strong> Legyen <M>{"0\\le f(x)\\le g(x)"}</M> minden <M>{"x\\ge a"}</M> esetén.
            Ha <M>{"\\int_a^{\\infty}g"}</M> <strong>konvergens</strong>, akkor <M>{"\\int_a^{\\infty}f"}</M> is
            konvergens, sőt <M>{"\\int_a^{\\infty}f \\le \\int_a^{\\infty}g"}</M>.
          </p>
          <p>
            <strong>Minoránskritérium.</strong> Legyen <M>{"f(x)\\ge h(x)\\ge0"}</M> minden <M>{"x\\ge a"}</M> esetén.
            Ha <M>{"\\int_a^{\\infty}h"}</M> <strong>divergens</strong>, akkor <M>{"\\int_a^{\\infty}f"}</M> is
            divergens.
          </p>
        </Kiemelo>

        <Proza>
          <p>
            Szemléletesen: ha a nagyobbik függvény alatti terület véges, akkor a kisebbiké sem lehet végtelen — hiszen
            beleférne. És ha már a kisebbik alatti terület is végtelen, akkor a nagyobbiké is az. A <M>{"g"}</M>{" "}
            függvényt <strong>majoránsnak</strong> (felső becslésnek), a <M>{"h"}</M>-t{" "}
            <strong>minoránsnak</strong> (alsó becslésnek) hívjuk.
          </p>
        </Proza>

        <Probald cim="Próbáld ki — mi következik, és mi nem?">
          <ImKriteriumFelfedezo />
        </Probald>

        <Kiemelo tipus="figyelem" cim="A két kritérium iránya kötött!">
          <p>Ezt nagyon könnyű elrontani:</p>
          <ul>
            <li>
              Konvergenciát csak <strong>felülről</strong> lehet bizonyítani (konvergens majoránssal).
            </li>
            <li>
              Divergenciát csak <strong>alulról</strong> lehet bizonyítani (divergens minoránssal).
            </li>
          </ul>
          <p>
            Ha egy konvergens függvény <em>alatt</em> van az <M>{"f"}</M>, abból semmi nem következik; és ha egy
            divergens függvény <em>fölött</em> van, abból sem. Például <M>{"\\frac{1}{x^2}\\le\\frac1x"}</M>, és{" "}
            <M>{"\\int_1^{\\infty}\\frac{dx}{x}"}</M> divergens — mégsem divergens az{" "}
            <M>{"\\int_1^{\\infty}\\frac{dx}{x^2}"}</M>.
          </p>
          <p>
            Ugyanígy fontos, hogy mindkét kritérium <strong>nemnegatív</strong> függvényeket feltételez. Előjelet váltó
            integrandusra nem alkalmazható közvetlenül — előbb az <M>{"|f|"}</M>-re kell vizsgálódni.
          </p>
        </Kiemelo>

        <Kiemelo tipus="tipp" cim="Elég a kritikus hely környékén">
          <p>
            A kritériumok akkor is működnek, ha az egyenlőtlenség csak valamilyen <M>{"x_0"}</M>-tól kezdve áll fenn.
            Az ok egyszerű: a <M>{"\\int_a^{x_0}"}</M> rész véges szakaszon vett rendes integrál, az mindig véges, tehát
            a konvergencia kérdését nem befolyásolja. <strong>A konvergencia mindig csak a kritikus hely környékén dől
            el.</strong>
          </p>
        </Kiemelo>

        {/* --- 8.7 --- */}
        <Alcim>8.7 A limeszes összehasonlító kritérium</Alcim>
        <Proza>
          <p>
            A majoráns- és minoránskritérium hibátlan, de kényelmetlen: minden alkalommal ki kell találni egy ügyes
            egyenlőtlenséget. Pedig ránézésre általában látszik, hogy egy függvény „mire hasonlít” a végtelenben.
            Például
          </p>
          <MB>{"f(x) = \\frac{1}{\\sqrt{x^4+5x}} \\quad\\text{nagy } x\\text{-re}\\quad \\approx \\quad \\frac{1}{\\sqrt{x^4}} = \\frac{1}{x^2}."}</MB>
          <p>A limeszes kritérium pontosan ezt a „nagyjából ugyanúgy viselkedik” gondolatot teszi precízzé.</p>
        </Proza>

        <Kiemelo tipus="definicio" cim="Limeszes összehasonlító kritérium">
          <p>
            Legyen <M>{"f(x)\\ge0"}</M> és <M>{"g(x)>0"}</M> minden elég nagy <M>{"x"}</M>-re, és tegyük fel, hogy
          </p>
          <MB>{"\\lim_{x\\to\\infty}\\frac{f(x)}{g(x)} = L, \\qquad 0<L<\\infty."}</MB>
          <p>
            Ekkor <M>{"\\int_a^{\\infty}f"}</M> és <M>{"\\int_a^{\\infty}g"}</M> <strong>egyszerre</strong> konvergens
            vagy egyszerre divergens.
          </p>
        </Kiemelo>

        <Kiemelo tipus="tipp" cim="Miért igaz ez?">
          <p>
            Ha a hányados <M>{"L"}</M>-hez tart, akkor elég nagy <M>{"x"}</M>-re a hányados <M>{"\\frac L2"}</M> és{" "}
            <M>{"2L"}</M> közé esik, azaz
          </p>
          <MB>{"\\frac{L}{2}\\,g(x) \\;\\le\\; f(x) \\;\\le\\; 2L\\,g(x)."}</MB>
          <p>
            Innen a bal oldali egyenlőtlenség a minoráns-, a jobb oldali a majoránskritériumot adja. A limeszes
            kritérium tehát nem új dolog, csak egy <strong>kényelmes csomagolása</strong> az előző kettőnek — de éppen
            ezért nagyon hatékony.
          </p>
        </Kiemelo>

        <Kartya cim="A recept három lépésben" cimke="Hogyan válassz g-t?">
          <ol className="list-decimal space-y-2 pl-5 text-[14.5px] text-petrol-800">
            <li>
              <strong>Tartsd meg a legnagyobb rendű tagokat</strong> a számlálóban és a nevezőben, a többit dobd el.
            </li>
            <li>
              Egyszerűsítsd le az eredményt <M>{"\\frac{C}{x^p}"}</M> alakra — ebből <M>{"g(x)=\\frac{1}{x^p}"}</M>.
            </li>
            <li>
              Számold ki <M>{"L=\\lim f/g"}</M>-t (ha jól választottál, <M>{"0<L<\\infty"}</M>), és a{" "}
              <M>{"p"}</M>-kritérium dönt.
            </li>
          </ol>
          <div className="finom-gorgeto mt-4 overflow-x-auto">
            <table className="w-full text-[14px] text-petrol-800">
              <thead>
                <tr className="border-b border-petrol-200 text-[12px] tracking-wider text-petrol-500 uppercase">
                  <th className="py-2 pr-4 text-left font-semibold">f(x) nagy x-re</th>
                  <th className="py-2 pr-4 text-left font-semibold">választott g(x)</th>
                  <th className="py-2 text-left font-semibold">döntés</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["\\dfrac{1}{\\sqrt{x^4+5x}}", "\\dfrac{1}{x^2}", "konvergens", true],
                  ["\\dfrac{\\sqrt{2x+3}}{x}", "\\dfrac{1}{\\sqrt x}", "divergens", false],
                  ["\\dfrac{x+1}{x^2+3}", "\\dfrac{1}{x}", "divergens", false],
                  ["\\dfrac{3x^2-1}{x^4+x+7}", "\\dfrac{1}{x^2}", "konvergens", true],
                ].map(([f, g, d, jo]) => (
                  <tr key={f} className="border-b border-petrol-100 last:border-0">
                    <td className="py-2 pr-4">
                      <M>{f}</M>
                    </td>
                    <td className="py-2 pr-4">
                      <M>{g}</M>
                    </td>
                    <td className={`py-2 font-semibold ${jo ? "text-emerald-700" : "text-rose-700"}`}>{d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[14px] text-petrol-700">
            Racionális törtfüggvényre külön szabály is adódik: a végtelenig vett integrál akkor és csak akkor
            konvergens, ha a <strong>nevező fokszáma legalább kettővel nagyobb</strong> a számlálóénál.
          </p>
        </Kartya>

        <Kiemelo tipus="figyelem" cim="A határesetek: L = 0 és L = ∞">
          <p>Ha a határérték nem véges pozitív szám, a kritérium csak egy irányban ad választ:</p>
          <ul>
            <li>
              <M>{"L=0"}</M>: ekkor <M>{"f"}</M> „sokkal kisebb” <M>{"g"}</M>-nél. Ha <M>{"\\int g"}</M> konvergens,
              akkor <M>{"\\int f"}</M> is az; ha <M>{"\\int g"}</M> divergens, semmi nem következik.
            </li>
            <li>
              <M>{"L=\\infty"}</M>: ekkor <M>{"f"}</M> „sokkal nagyobb”. Ha <M>{"\\int g"}</M> divergens, akkor{" "}
              <M>{"\\int f"}</M> is az; ha konvergens, semmi nem következik.
            </li>
          </ul>
          <p>
            A gyakorlatban ez ritkán okoz gondot: ha jól választottad <M>{"g"}</M>-t (a legnagyobb rendű tagok szerint),
            akkor <M>{"L"}</M> mindig véges pozitív szám lesz. Ha nem az, valószínűleg elrontottad a nagyságrendet.
          </p>
        </Kiemelo>

        <Kiemelo tipus="kulcs" cim="Ugyanez működik I. típusnál is">
          <p>
            Ha a kritikus hely egy véges <M>{"a"}</M> pont, a határértéket <M>{"x\\to a+0"}</M> mellett kell venni, és
            összehasonlító függvénynek a <M>{"\\frac{1}{(x-a)^p}"}</M> alakot választjuk. Példa: a{" "}
            <M>{"\\int_0^1\\frac{dx}{\\sqrt x\\,(1+x^2)}"}</M> integrálnál <M>{"g(x)=\\frac{1}{\\sqrt x}"}</M>, a
            hányados határértéke <M>{"x\\to0+0"}</M> mellett 1, és mivel <M>{"\\int_0^1 x^{-1/2}dx"}</M> konvergens (
            <M>{"p=\\frac12<1"}</M>), a vizsgált integrál is konvergens.
          </p>
        </Kiemelo>

        {/* --- 8.8 --- */}
        <Alcim>8.8 A Torricelli-trombita — véges térfogat, végtelen felszín</Alcim>
        <Proza>
          <p>
            Ez a klasszikus példa azért került be a tananyagba, mert egyetlen feladatban mutatja meg az improprius
            integrálok legmeglepőbb tulajdonságát — és mellesleg a forgástestek térfogatát és felszínét is
            átismétli.
          </p>
          <p>
            Forgassuk meg az <M>{"y=\\frac1x"}</M> görbe <M>{"x\\ge1"}</M> részét az <M>{"x"}</M> tengely körül. Az így
            kapott, végtelenbe nyúló tölcsért nevezik <strong>Torricelli-trombitának</strong> (vagy Gábriel kürtjének).
            Két kérdést teszünk fel: véges-e a térfogata, és véges-e a felszíne?
          </p>
        </Proza>

        <KetOszlop>
          <KepletDoboz
            cimke="Térfogat — véges"
            keplet={"V = \\pi\\int_1^{\\infty}\\left(\\frac1x\\right)^2 dx = \\pi\\int_1^{\\infty}\\frac{dx}{x^2}"}
            behelyettesitve={"= \\pi\\lim_{d\\to\\infty}\\left[-\\frac1x\\right]_1^{d} = \\pi(0+1)"}
            eredmeny={"V = \\pi \\approx 3{,}1416"}
          />
          <KepletDoboz
            cimke="Felszín — végtelen"
            keplet={"F = 2\\pi\\int_1^{\\infty}\\frac1x\\sqrt{1+\\frac{1}{x^4}}\\,dx"}
            behelyettesitve={"\\ge 2\\pi\\int_1^{\\infty}\\frac{dx}{x}"}
            eredmeny={"F = +\\infty"}
          />
        </KetOszlop>

        <Proza>
          <p>
            A térfogatnál azért jött ki véges szám, mert a négyzetre emelés után <M>{"p=2>1"}</M>. A felszínnél a
            gyök alatt 1-nél nagyobb szám áll, tehát a gyök értéke legalább 1, és így{" "}
            <M>{"\\frac1x\\sqrt{1+\\frac{1}{x^4}} \\ge \\frac1x"}</M> — az <M>{"\\int_1^{\\infty}\\frac{dx}{x}"}</M>{" "}
            pedig divergens. A minoránskritérium tehát azonnal végez: a felszín végtelen.
          </p>
        </Proza>

        <Probald cim="Nézd meg — hol áll meg a térfogat, és hol nem áll meg a felszín?">
          <ImTorricelli />
        </Probald>

        <Kiemelo tipus="kulcs" cim="A matematikai tanulság, ami a paradoxonnál is fontosabb">
          <p>
            A „festékparadoxon” szellemes, de a lényeg nem az. A lényeg az, hogy a <M>{"\\int\\frac{1}{x^2}"}</M> és a{" "}
            <M>{"\\int\\frac1x"}</M> közötti különbség — vagyis a <M>{"p=1"}</M> határeset — nem hajszálnyi finomság,
            hanem <strong>kvalitatív szakadék</strong> a két viselkedés között. A térfogat az <M>{"f^2=1/x^2"}</M>
            -tel, a felszín az <M>{"f=1/x"}</M>-szel arányos, és épp ez a négyzetre emelés billenti át a konvergencia
            határán. Ugyanez a szakadék dönti el a következő fejezetben, hogy egy sor összegezhető-e vagy sem.
          </p>
        </Kiemelo>

        {/* --- 8.9 --- */}
        <Alcim>8.9 Numerikus integrálás — miért van rá szükség?</Alcim>
        <Proza>
          <p>
            A határozatlan integrálás során megtanult módszerek (helyettesítés, parciális integrálás, parciális törtek)
            sok integrált megoldanak — de messze nem mindet. Bizonyítható, hogy az alábbi függvényeknek{" "}
            <strong>nincs elemi primitív függvényük</strong>, azaz a primitív függvény nem írható fel a szokásos
            függvényekből véges sok művelettel:
          </p>
          <MB>{"e^{-x^2}, \\qquad \\frac{\\sin x}{x}, \\qquad \\frac{1}{\\ln x}, \\qquad \\sqrt{1+x^4}, \\qquad \\sin\\left(x^2\\right)"}</MB>
          <p>
            Ezek nem kivételes, ritka esetek: az <M>{"e^{-x^2}"}</M> a valószínűségszámítás alapfüggvénye (a normális
            eloszlás), a <M>{"\\frac{\\sin x}{x}"}</M> az optikában és a jelfeldolgozásban alapvető, a{" "}
            <M>{"\\sqrt{1+x^4}"}</M>-szerű kifejezések pedig ívhosszszámításnál bukkannak fel lépten-nyomon.
          </p>
          <p>
            Ráadásul a mérnöki gyakorlatban gyakran <strong>nincs is</strong> képlet, amit integrálni lehetne: egy
            mérési sorozatból (a <M>{"t_i"}</M> időpontokban mért <M>{"v_i"}</M> sebességekből) kell megtett utat
            számolni; egy terepszelvény mért magasságértékeiből földtömeget (kubatúrát); egy terhelési diagram
            numerikus adataiból eredőt és nyomatékot. Ilyenkor csak <strong>pontbeli értékeink</strong> vannak, primitív
            függvényről szó sem lehet.
          </p>
        </Proza>

        <Kiemelo tipus="kulcs" cim="A numerikus integrálás alapötlete">
          <p>
            Ha a függvényt magát nem tudjuk integrálni, helyettesítsük olyan függvénnyel, amelyet tudunk — és ami a
            mintapontokban megegyezik vele:
          </p>
          <ul>
            <li>
              <strong>téglalapszabály</strong>: a helyettesítő függvény szakaszonként konstans (0-adfokú),
            </li>
            <li>
              <strong>trapézszabály</strong>: szakaszonként lineáris (elsőfokú),
            </li>
            <li>
              <strong>Simpson-szabály</strong>: szakaszonként másodfokú (parabola).
            </li>
          </ul>
          <p>
            A helyettesítő függvény integrálja könnyen kiszámolható, és ha az illesztés jó, az eredmény is jó közelítés
            lesz. Minél magasabb fokú a helyettesítő függvény, annál pontosabb a képlet — egy határig.
          </p>
        </Kiemelo>

        <Kiemelo tipus="definicio" cim="Jelölések — ezt rögzítsd most">
          <p>
            Mindkét szabály ugyanúgy kezdődik. Az <M>{"[a,b]"}</M> intervallumot <M>{"n"}</M> egyenlő részre osztjuk:
          </p>
          <MB>{"h = \\frac{b-a}{n}, \\qquad x_i = a+i\\,h \\quad (i=0,1,\\dots,n), \\qquad y_i = f(x_i)"}</MB>
          <p>
            Itt <M>{"x_0=a"}</M> és <M>{"x_n=b"}</M>, tehát <M>{"n"}</M> <strong>részintervallum</strong> van, de{" "}
            <M>{"n+1"}</M> <strong>osztópont</strong> (alappont). Ezt a különbséget érdemes már most rögzíteni, mert a
            dolgozatokban gyakran keveredik.
          </p>
        </Kiemelo>

        {/* --- 8.10 --- */}
        <Alcim>8.10 A trapézszabály és a Simpson-szabály</Alcim>
        <Proza>
          <p>
            <strong>A trapéz gondolata.</strong> Kössük össze a görbe szomszédos pontjait egyenes szakasszal (húrral).
            Ekkor minden részintervallum fölött egy trapéz keletkezik, amelynek területét pontosan ismerjük — és ezek
            összege közelíti a görbe alatti területet. Egyetlen részintervallumon a két párhuzamos oldal{" "}
            <M>{"y_{i-1}"}</M> és <M>{"y_i"}</M> (ezek függőlegesek), a magasság <M>{"h"}</M> (ez vízszintes):
          </p>
          <MB>{"T_i = \\frac{y_{i-1}+y_i}{2}\\cdot h"}</MB>
          <p>
            Ha most összeadjuk mind az <M>{"n"}</M> trapézt, a <strong>belső</strong> osztópontok mindegyike{" "}
            <strong>kétszer</strong> szerepel (egyszer az előtte lévő, egyszer az utána következő trapézban), a két{" "}
            <strong>szélső</strong> pont viszont csak egyszer. Innen a végleges alak.
          </p>
        </Proza>

        <Kiemelo tipus="definicio" cim="Az összetett trapézformula és a hibája">
          <MB>{"\\int_a^b f(x)\\,dx \\approx \\frac h2\\left(y_0+2y_1+2y_2+\\dots+2y_{n-1}+y_n\\right)"}</MB>
          <p>
            A szélső értékek súlya 1, a belsőké 2. A súlyok összege <M>{"2n"}</M>, tehát a szorzóval együtt{" "}
            <M>{"\\frac h2\\cdot2n = b-a"}</M> — ez gyors ellenőrzés arra, hogy nem hibáztuk-e el a súlyokat.
          </p>
          <MB>{"\\left|E_T\\right| \\le \\frac{(b-a)\\,h^2}{12}M_2 = \\frac{(b-a)^3}{12\\,n^2}M_2, \\qquad M_2=\\max_{[a,b]}|f''|"}</MB>
        </Kiemelo>

        <Proza>
          <p>Két fontos következmény:</p>
          <ul>
            <li>
              A hiba <M>{"h^2"}</M>-tel arányos: ha a felosztást <strong>megduplázzuk</strong>, a hiba nagyjából{" "}
              <strong>negyedére</strong> csökken. Ezért mondjuk, hogy a trapézszabály <strong>másodrendű</strong>{" "}
              módszer.
            </li>
            <li>
              A hibában <M>{"f''"}</M> szerepel: <strong>egyenesre</strong> (<M>{"f''=0"}</M>) a trapézszabály{" "}
              <strong>pontos</strong>. Ez természetes, hiszen ekkor a húr egybeesik a görbével.
            </li>
          </ul>
          <p>
            <strong>Melyik irányba téved?</strong> Ha a függvény <strong>konvex</strong> (alulról domború,{" "}
            <M>{"f''>0"}</M>), akkor a húr a görbe <em>fölött</em> halad, tehát a trapézszabály{" "}
            <strong>felülbecsli</strong> az integrált. Konkáv függvénynél fordítva.
          </p>
        </Proza>

        <AbraKeret
          szam="8.4"
          cim="Balra a húr és a felülbecslés (pirossal), jobbra a három ponton átmenő parabola — az eltérés szabad szemmel nem is látszik."
        >
          <AbraTrapezElv />
        </AbraKeret>

        <Proza>
          <p>
            <strong>A Simpson gondolata.</strong> Ha az egyenes jó, a parabola még jobb. Vegyünk <strong>két</strong>{" "}
            szomszédos részintervallumot, és fektessünk a három végpontjukra egy parabolát. A számolás akkor a
            legegyszerűbb, ha az origót a középső pontba tesszük: a három pont <M>{"(-h;\\,y_{i-1})"}</M>,{" "}
            <M>{"(0;\\,y_i)"}</M>, <M>{"(h;\\,y_{i+1})"}</M>, a parabola pedig{" "}
            <M>{"y=\\alpha x^2+\\beta x+\\gamma"}</M>. Behelyettesítve <M>{"\\gamma=y_i"}</M>, és a másik két egyenletet{" "}
            <strong>összeadva</strong> a <M>{"\\beta"}</M> kiesik:
          </p>
          <MB>{"2\\alpha h^2+2\\gamma = y_{i-1}+y_{i+1} \\quad\\Longrightarrow\\quad \\alpha h^2 = \\frac{y_{i-1}-2y_i+y_{i+1}}{2}"}</MB>
          <p>
            Most integráljuk a parabolát <M>{"-h"}</M>-tól <M>{"h"}</M>-ig. A páratlan <M>{"\\beta x"}</M> tag
            integrálja a szimmetrikus intervallumon nulla:
          </p>
          <MB>{"\\int_{-h}^{h}\\left(\\alpha x^2+\\beta x+\\gamma\\right)dx = \\frac{2\\alpha h^3}{3}+2\\gamma h = \\frac h3\\left(2\\alpha h^2+6\\gamma\\right)"}</MB>
          <p>és beírva a fenti eredményeket adódik a Simpson alapképlete.</p>
        </Proza>

        <Kiemelo tipus="definicio" cim="A Simpson-szabály és a hibája">
          <MB>{"T_i = \\frac h3\\left(y_{i-1}+4y_i+y_{i+1}\\right)"}</MB>
          <p>
            Összeadva az összes parabolaszeletet (<M>{"x_0,x_1,x_2"}</M>, majd <M>{"x_2,x_3,x_4"}</M>, és így tovább) a{" "}
            <strong>páratlan</strong> indexű pontok (a parabolák középső pontjai) mindig 4-es súlyt kapnak, a{" "}
            <strong>páros</strong> indexű belső pontok kétszer szerepelnek 1-es súllyal, tehát 2-t, a két szélső pont
            súlya 1:
          </p>
          <MB>{"\\int_a^b f(x)\\,dx \\approx \\frac h3\\left(y_0+4y_1+2y_2+4y_3+\\dots+4y_{n-1}+y_n\\right), \\qquad n \\text{ páros}"}</MB>
          <MB>{"\\left|E_S\\right| \\le \\frac{(b-a)\\,h^4}{180}M_4 = \\frac{(b-a)^5}{180\\,n^4}M_4, \\qquad M_4=\\max_{[a,b]}\\left|f^{(4)}\\right|"}</MB>
          <p>
            A súlyok összege <M>{"3n"}</M>, és <M>{"\\frac h3\\cdot3n = b-a"}</M> — ugyanaz az ellenőrzés, mint a
            trapéznál.
          </p>
        </Kiemelo>

        <Kiemelo tipus="figyelem" cim="Ezért kell páros n!">
          <p>
            Mivel mindig két részintervallumot fog össze egy parabola, a részintervallumok számának{" "}
            <strong>párosnak</strong> kell lennie. Ha valaki <M>{"n=5"}</M>-tel próbálja alkalmazni a Simpson-szabályt,
            a képlet súlyai nem jönnek ki: a végén marad egy pár nélküli részintervallum.
          </p>
        </Kiemelo>

        <Kiemelo tipus="tipp" cim="Miért olyan jó a Simpson-szabály?">
          <p>
            <strong>Először:</strong> a hiba <M>{"h^4"}</M>-nel arányos, tehát a módszer <strong>negyedrendű</strong>.
            Ha a felosztást megduplázzuk, a hiba <strong>tizenhatodára</strong> csökken (szemben a trapéz
            negyedelésével). Ezért már kevés osztóponttal is nagyon pontos.
          </p>
          <p>
            <strong>Másodszor:</strong> a hibában a <strong>negyedik</strong> derivált szerepel, nem a harmadik — pedig
            parabolával közelítettünk, tehát „elsőre” harmadrendű hibát várnánk. A magyarázat a szimmetria: a
            levezetésben láttuk, hogy a páratlan tag integrálja kiesett. Emiatt a Simpson-szabály{" "}
            <strong>harmadfokú polinomra is pontos</strong>, nemcsak másodfokúra — egy fokot ingyen kapunk. Ez adja a
            módszer igazi erejét.
          </p>
        </Kiemelo>

        <Probald cim="Próbáld ki — hogyan fogy a hiba?">
          <ImNumerikusFelfedezo />
        </Probald>

        <Proza>
          <p>
            A log–log grafikonon a két egyenes <strong>meredeksége</strong> a lényeg: a trapézé <M>{"-2"}</M>, a
            Simpsoné <M>{"-4"}</M>. Ez pontosan a <M>{"h^2"}</M> és a <M>{"h^4"}</M> hibarend. Próbáld ki a{" "}
            <M>{"\\sqrt{1+x^3}"}</M> függvényt is: a nulla közelében a negyedik derivált nagy, ezért a Simpson-görbe
            eleinte kevésbé meredek — a hibabecslés <M>{"M_4"}</M> tényezője itt „bosszulja meg magát”.
          </p>
        </Proza>

        {/* --- 8.11 --- */}
        <Alcim>8.11 A két módszer egy példán — és ahogy a mérnök használja</Alcim>
        <Proza>
          <p>
            Vegyük a tananyag klasszikus tesztpéldáját, <M>{"I = \\int_1^2\\frac{dx}{x}"}</M>. Ennek ismerjük a pontos
            értékét (<M>{"\\ln2 = 0{,}693147\\dots"}</M>), ezért alkalmas tesztnek: a közelítéseket össze tudjuk
            hasonlítani az igazi értékkel. Legyen <M>{"n=4"}</M>, tehát <M>{"h=0{,}25"}</M>, az alappontok pedig{" "}
            <M>{"1;\\ 1{,}25;\\ 1{,}5;\\ 1{,}75;\\ 2"}</M>.
          </p>
        </Proza>

        <Kartya cim="Ugyanaz az 5 függvényérték, ugyanaz a munka" cimke="Összehasonlítás">
          <div className="finom-gorgeto overflow-x-auto">
            <table className="szamok w-full text-[14px] text-petrol-800">
              <thead>
                <tr className="border-b border-petrol-200 text-[12px] tracking-wider text-petrol-500 uppercase">
                  <th className="py-2 pr-4 text-left font-semibold">Módszer</th>
                  <th className="py-2 pr-4 text-right font-semibold">Közelítés</th>
                  <th className="py-2 pr-4 text-right font-semibold">Hiba</th>
                  <th className="py-2 text-right font-semibold">Hibabecslés</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-petrol-100">
                  <td className="py-2 pr-4 font-semibold text-naracs-700">Trapéz (n = 4)</td>
                  <td className="py-2 pr-4 text-right">0,697024</td>
                  <td className="py-2 pr-4 text-right">0,003877</td>
                  <td className="py-2 text-right">≤ 0,010417</td>
                </tr>
                <tr className="border-b border-petrol-100">
                  <td className="py-2 pr-4 font-semibold text-violet-700">Simpson (n = 4)</td>
                  <td className="py-2 pr-4 text-right">0,693254</td>
                  <td className="py-2 pr-4 text-right">0,000107</td>
                  <td className="py-2 text-right">≤ 0,000521</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-semibold text-emerald-700">Pontos: ln 2</td>
                  <td className="py-2 pr-4 text-right">0,693147</td>
                  <td className="py-2 pr-4 text-right">—</td>
                  <td className="py-2 text-right">—</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[14px] text-petrol-700">
            A Simpson-szabály hibája <strong>mintegy 36-szor kisebb</strong>, pedig pontosan ugyanazt az öt
            függvényértéket használja fel. A különbség csak a <strong>súlyokban</strong> és a <M>{"\\frac h3"}</M>{" "}
            szorzóban van. Ezért használ minden komoly numerikus program Simpson-típusú (vagy még magasabb rendű)
            formulát, és nem trapézt.
          </p>
        </Kartya>

        <Kiemelo tipus="tipp" cim="Mit tegyél, ha pontosabb eredmény kell?">
          <p>
            Duplázd meg <M>{"n"}</M>-et. A trapéznál a hiba nagyjából negyedére, a Simpsonnál tizenhatodára csökken.
            Ellenőrzésképpen: <M>{"n=8"}</M>-cal a Simpson-közelítés <M>{"0{,}6931545"}</M>, a hiba{" "}
            <M>{"0{,}0000074"}</M> — tényleg körülbelül a tizenötöd–tizenhatod része az előzőnek.
          </p>
          <p>
            Van egy határ, ameddig ezt érdemes csinálni: nagyon sok osztópontnál a <strong>kerekítési hibák</strong>{" "}
            felhalmozódása már rontja az eredményt. A gyakorlatban ezért inkább magasabb rendű módszert választanak, nem
            egyre finomabb felosztást.
          </p>
        </Kiemelo>

        <Probald cim="Miért szép? — így számol a mérnök, amikor nincs képlet">
          <ImMertAdatok />
        </Probald>

        <Proza>
          <p>
            Ez a modul utolsó ábrája, és talán a legfontosabb üzenete. Amikor egy folyómeder keresztmetszetét vagy egy
            jármű sebességgörbéjét mérjük, <em>nincs</em> függvényünk — csak néhány szám. A trapéz- és a
            Simpson-szabály viszont pontosan ilyen adatokból dolgozik: nem kell hozzá képlet, nem kell primitív
            függvény, csak <M>{"n+1"}</M> darab <M>{"y_i"}</M> és a súlyozás. Ezért van az, hogy a numerikus
            integrálás nem „vészmegoldás”, hanem a mérnöki gyakorlat alapértelmezett eszköze.
          </p>
        </Proza>

        <Kiemelo tipus="figyelem" cim="Amit sosem szabad: improprius integrálra ráengedni a képletet">
          <p>
            A trapéz- és a Simpson-szabály <strong>véges</strong> intervallumon, <strong>korlátos</strong> függvényre
            érvényes. Improprius integrálra csak akkor szabad ráengedni, ha előbb a konvergenciát igazoltuk, és a
            szingularitást helyettesítéssel vagy az integrál szétvágásával kezeltük. A képlet ugyanis
            „lelkiismeret-furdalás nélkül” ad számot egy divergens integrálra is — csak épp az a szám semmit nem jelent.
          </p>
        </Kiemelo>
      </Szakasz>

      {/* ==================== KIDOLGOZOTT FELADATOK ==================== */}
      <Szakasz
        id="peldak"
        cimke="2. rész"
        cim="Kidolgozott feladatok"
        bevezeto="Az előadás példái, ugyanazokkal a számokkal, lépésenként feltárva. Előbb mindig próbáld meg magad: a legtöbb feladatban a nehézség nem a számolás, hanem az, hogy felismerd, melyik típusról van szó és hol a kritikus hely."
      >
        {/* ---------- KF-1 ---------- */}
        <KidolgozottFeladat
          jel="KF‑1"
          ido="8 perc"
          cim="I. típus: három alapeset egy feladatban"
          forras="Előadás, 1–3. példa"
          feladat={
            <>
              <p>Számítsd ki az alábbi improprius integrálokat, ha konvergensek:</p>
              <MB>{"\\text{(a)}\\ \\int_0^1\\frac{dx}{\\sqrt x} \\qquad \\text{(b)}\\ \\int_0^1 \\ln x\\,dx \\qquad \\text{(c)}\\ \\int_{-1}^{1}\\frac{dx}{\\sqrt{1-x^2}}"}</MB>
            </>
          }
          tanulsag={
            <p>
              Mindhárom esetben az volt az első dolgunk, hogy <strong>megkerestük a kritikus helyet</strong>, és utána
              írtuk fel a megfelelő határértéket. A (b) mutatja, hogy improprius integrál értéke lehet negatív is (nem
              csak „terület”), a (c) pedig azt, hogy ha két kritikus hely van, akkor <em>két</em> független
              határértéket kell venni.
            </p>
          }
        >
          <Lepes cim="(a) A kritikus hely azonosítása">
            <p>
              Az <M>{"f(x)=x^{-1/2}"}</M> függvény a <M>{"0<x\\le1"}</M> intervallumon folytonos, de{" "}
              <M>{"x\\to0+0"}</M> esetén nem korlátos. Ez a <strong>2. eset</strong> (bal végpont), tehát
            </p>
            <MB>{"\\int_0^1\\frac{dx}{\\sqrt x} = \\lim_{c\\to0+0}\\int_c^{1} x^{-1/2}\\,dx."}</MB>
          </Lepes>
          <Lepes cim="(a) A csonkolt integrál és a határátmenet">
            <KepletDoboz
              cimke="A csonkolt integrál"
              keplet={"\\int_c^{1}x^{-1/2}dx = \\left[2\\sqrt x\\right]_c^{1}"}
              behelyettesitve={"= 2 - 2\\sqrt c"}
              eredmeny={"\\lim_{c\\to0+0}\\left(2-2\\sqrt c\\right) = 2"}
            />
            <p>
              Az integrál tehát <strong>konvergens</strong>, az értéke 2. Szemléletesen: a görbe alatti tartomány a
              nulla felé végtelenül magas, de olyan gyorsan keskenyedik, hogy a területe véges marad. A p-kritérium is
              ezt mondja: <M>{"p=\\frac12<1"}</M>, és <M>{"\\frac{1}{1-p}=2"}</M> ✓
            </p>
          </Lepes>
          <Lepes cim="(b) A logaritmus a nullában">
            <p>
              A <M>{"\\ln x"}</M> a nullában nem korlátos (mínusz végtelenbe tart), tehát megint a 2. eset. A primitív
              függvény parciális integrálással <M>{"x\\ln x - x"}</M>:
            </p>
            <MB>{"\\int_0^1\\ln x\\,dx = \\lim_{c\\to0+0}\\left[x\\ln x - x\\right]_c^{1} = \\lim_{c\\to0+0}\\left(-1-c\\ln c+c\\right)."}</MB>
          </Lepes>
          <Lepes cim="(b) A c·ln c kritikus határérték">
            <p>
              Itt a <M>{"c\\ln c"}</M> szorzat <M>{"0\\cdot(-\\infty)"}</M> alakú. Írjuk át hányadossá, és alkalmazzuk
              a L&apos;Hospital-szabályt:
            </p>
            <MB>{"\\lim_{c\\to0+0} c\\ln c = \\lim_{c\\to0+0}\\frac{\\ln c}{1/c} = \\lim_{c\\to0+0}\\frac{1/c}{-1/c^2} = \\lim_{c\\to0+0}(-c) = 0"}</MB>
            <p>
              Ezért <M>{"\\int_0^1\\ln x\\,dx = -1"}</M>. A negatív előjel rendben van: a <M>{"0<x<1"}</M> szakaszon a
              logaritmus negatív, tehát a „terület” előjeles területként negatív.
            </p>
          </Lepes>
          <Lepes cim="(c) Mindkét végpont kritikus">
            <p>
              Az integrandus a <M>{"-1<x<1"}</M> intervallumon folytonos, de <strong>mindkét</strong> végpontnál nem
              korlátos (a nevező nullához tart). Ez a <strong>3. eset</strong>: osszuk ketté a nullánál. A primitív
              függvény <M>{"\\arcsin x"}</M>:
            </p>
            <MB>{"\\int_{-1}^{1}\\frac{dx}{\\sqrt{1-x^2}} = \\lim_{c\\to-1+0}\\left[\\arcsin x\\right]_c^{0} + \\lim_{d\\to1-0}\\left[\\arcsin x\\right]_0^{d}"}</MB>
            <KepletDoboz
              keplet={"= \\left(0-\\left(-\\frac{\\pi}{2}\\right)\\right) + \\left(\\frac{\\pi}{2}-0\\right)"}
              eredmeny={"= \\pi \\approx 3{,}1416"}
            />
            <p>
              Mindkét határérték véges, tehát az integrál konvergens, az értéke <M>{"\\pi"}</M>.
            </p>
          </Lepes>
          <Lepes cim="(c) Geometriai ellenőrzés">
            <p>
              Ez az integrál épp a felső egységfélkör <strong>ívhossza</strong>. Az <M>{"y=\\sqrt{1-x^2}"}</M> görbére
              ugyanis <M>{"y'=\\frac{-x}{\\sqrt{1-x^2}}"}</M>, és az ívhosszképletben{" "}
              <M>{"\\sqrt{1+(y')^2} = \\frac{1}{\\sqrt{1-x^2}}"}</M> adódik. A félkör ívhossza pedig valóban{" "}
              <M>{"\\pi"}</M> ✓
            </p>
          </Lepes>
        </KidolgozottFeladat>

        {/* ---------- KF-2 ---------- */}
        <KidolgozottFeladat
          jel="KF‑2"
          ido="7 perc"
          cim="Belső szakadási hely — és a klasszikus csapda"
          forras="Előadás, 4. példa + gyakorló 4."
          feladat={
            <>
              <p>
                (a) Számítsd ki: <M>{"\\displaystyle\\int_0^9\\frac{dx}{\\sqrt[3]{(x-1)^2}}"}</M>.
              </p>
              <p>
                (b) Konvergens-e <M>{"\\displaystyle\\int_{-1}^{1}\\frac{dx}{x^2}"}</M>? Ha valaki gépiesen{" "}
                <M>{"-2"}</M>-t számol, hol a hiba?
              </p>
            </>
          }
          tanulsag={
            <p>
              A két feladat ugyanarról szól, mégis ellentétes a végeredmény. A különbség a kitevőben van: a{" "}
              <M>{"(x-1)^{-2/3}"}</M> esetén a kritikus hely környékén <M>{"p=\\frac23<1"}</M> (konvergens), az{" "}
              <M>{"x^{-2}"}</M> esetén <M>{"p=2\\ge1"}</M> (divergens). <strong>A szakadási helyet mindkétszer észre
              kell venni</strong> — az (a)-ban azért, hogy a levezetés korrekt legyen, a (b)-ben azért, hogy ne jöjjön
              ki képtelenség.
            </p>
          }
        >
          <Lepes cim="(a) A szakadási hely megkeresése">
            <p>
              Az integrandus <M>{"x=1"}</M>-ben nem értelmezett, és ott nem korlátos. Vegyük észre, hogy{" "}
              <M>{"x=1"}</M> <strong>benne van</strong> a <M>{"[0;\\,9]"}</M> intervallumban — ez tehát a{" "}
              <strong>4. eset</strong>, belső szakadási hellyel. A primitív függvény:
            </p>
            <MB>{"\\int (x-1)^{-2/3}\\,dx = 3(x-1)^{1/3} = 3\\sqrt[3]{x-1}"}</MB>
          </Lepes>
          <Lepes cim="(a) A bal oldali rész">
            <KepletDoboz
              cimke="0-tól 1-ig"
              keplet={"\\int_0^1\\frac{dx}{\\sqrt[3]{(x-1)^2}} = \\lim_{u\\to1-0}\\left[3\\sqrt[3]{x-1}\\right]_0^{u}"}
              behelyettesitve={"= 0 - 3\\sqrt[3]{-1} = 0-3\\cdot(-1)"}
              eredmeny={"= 3"}
            />
          </Lepes>
          <Lepes cim="(a) A jobb oldali rész és az összegzés">
            <KepletDoboz
              cimke="1-től 9-ig"
              keplet={"\\int_1^9\\frac{dx}{\\sqrt[3]{(x-1)^2}} = \\lim_{v\\to1+0}\\left[3\\sqrt[3]{x-1}\\right]_{v}^{9}"}
              behelyettesitve={"= 3\\sqrt[3]{8} - 0 = 3\\cdot2"}
              eredmeny={"= 6"}
            />
            <p>
              Mindkét rész konvergens, tehát <M>{"\\int_0^9\\frac{dx}{\\sqrt[3]{(x-1)^2}} = 3+6 = 9"}</M>.
            </p>
          </Lepes>
          <Lepes cim="(b) Hol a hiba a −2-ben?">
            <p>
              A hiba abban a <em>hallgatólagos</em> lépésben van, hogy a Newton–Leibniz-formulát alkalmazzuk:
            </p>
            <MB>{"\\int_{-1}^{1}\\frac{dx}{x^2} \\overset{?}{=} \\left[-\\frac1x\\right]_{-1}^{1} = -1-1 = -2"}</MB>
            <p>
              A Newton–Leibniz-tétel feltétele, hogy az integrandus a <strong>teljes</strong> intervallumon folytonos
              (legalábbis korlátos és integrálható) legyen. Az <M>{"1/x^2"}</M> viszont a <M>{"0"}</M>-ban nincs is
              értelmezve. Ráadásul a <M>{"-2"}</M> ránézésre lehetetlen: az <M>{"1/x^2"}</M> pozitív függvény.
            </p>
          </Lepes>
          <Lepes cim="(b) A helyes vizsgálat">
            <p>
              Bontsuk két részre a nullánál, és nézzük az egyiket:
            </p>
            <MB>{"\\int_0^1\\frac{dx}{x^2} = \\lim_{v\\to0+0}\\left[-\\frac1x\\right]_v^{1} = \\lim_{v\\to0+0}\\left(-1+\\frac1v\\right) = +\\infty"}</MB>
            <p>
              Már ez a rész divergens, tehát az <strong>egész integrál divergens</strong> — a másik felét ki sem kell
              számolni. (Ha a másik fél történetesen <M>{"-\\infty"}</M> volna, akkor sem ejtenék ki egymást: a
              definíció szerint <em>mindkettőnek</em> végesnek kell lennie.)
            </p>
          </Lepes>
        </KidolgozottFeladat>

        {/* ---------- KF-3 ---------- */}
        <KidolgozottFeladat
          jel="KF‑3"
          ido="12 perc"
          cim="II. típus: négy integrál a végtelenig"
          forras="Előadás, 5–8. példa"
          feladat={
            <>
              <p>Számítsd ki:</p>
              <MB>{"\\text{(a)}\\ \\int_0^{\\infty} e^{-x}dx \\qquad \\text{(b)}\\ \\int_2^{\\infty}\\frac{dx}{x^2-1}"}</MB>
              <MB>{"\\text{(c)}\\ \\int_{-\\infty}^{\\infty}\\frac{dx}{1+x^2} \\qquad \\text{(d)}\\ \\int_0^{\\infty}\\frac{dx}{\\sqrt x\\,(1+x)}"}</MB>
            </>
          }
          tanulsag={
            <p>
              Négy különböző technika, egy közös váz: <em>csonkolj, integrálj, vedd a határértéket</em>. A (b)-ben a
              két logaritmus külön-külön végtelenhez tartana — csak az összevonás után látszik, hogy a különbségük
              véges. A (d) pedig arra emlékeztet, hogy ha <strong>két</strong> kritikus hely van (itt a nulla és a
              végtelen), akkor a feladatot <strong>szét kell vágni</strong>, és minden részt külön kezelni.
            </p>
          }
        >
          <Lepes cim="(a) Az exponenciális lecsengés">
            <KepletDoboz
              keplet={"\\int_0^{\\infty}e^{-x}dx = \\lim_{d\\to\\infty}\\left[-e^{-x}\\right]_0^{d}"}
              behelyettesitve={"= \\lim_{d\\to\\infty}\\left(-e^{-d}+1\\right) = 0+1"}
              eredmeny={"= 1"}
            />
            <p>
              Ez a legfontosabb konvergens példa: az exponenciális lecsengés mindig „elég gyors”. Általánosan{" "}
              <M>{"\\int_0^{\\infty}e^{-kx}dx = \\frac1k"}</M>, ha <M>{"k>0"}</M>.
            </p>
          </Lepes>
          <Lepes cim="(b) Parciális törtekre bontás">
            <p>
              Keressük az <M>{"\\frac{1}{x^2-1} = \\frac{1}{(x-1)(x+1)} = \\frac{A}{x-1}+\\frac{B}{x+1}"}</M> alakot.
              Beszorozva: <M>{"1 = A(x+1)+B(x-1) = (A+B)x + (A-B)"}</M>. Az együtthatókat összevetve{" "}
              <M>{"A+B=0"}</M> és <M>{"A-B=1"}</M>, ahonnan
            </p>
            <MB>{"A = \\frac12, \\qquad B = -\\frac12."}</MB>
          </Lepes>
          <Lepes cim="(b) Integrálás és a logaritmusok összevonása">
            <MB>{"\\int_2^{d}\\frac{dx}{x^2-1} = \\frac12\\left[\\ln|x-1| - \\ln|x+1|\\right]_2^{d} = \\frac12\\left[\\ln\\frac{x-1}{x+1}\\right]_2^{d}"}</MB>
            <p>
              Ez a trükk a lényeg: külön-külön mindkét logaritmus végtelenhez tartana, a <strong>különbségük</strong>{" "}
              viszont véges. Mivel <M>{"\\frac{d-1}{d+1}\\to1"}</M>, a <M>{"\\ln"}</M> értéke nullához tart:
            </p>
            <KepletDoboz
              keplet={"\\int_2^{\\infty}\\frac{dx}{x^2-1} = \\frac12\\left(0-\\ln\\frac13\\right)"}
              behelyettesitve={"= \\frac12\\ln3"}
              eredmeny={"\\approx 0{,}5493"}
            />
          </Lepes>
          <Lepes cim="(c) Kétoldali végtelen — két külön határérték">
            <p>
              A 3. eset szerint bontsuk ketté a nullánál. A primitív függvény <M>{"\\operatorname{arctg} x"}</M>:
            </p>
            <MB>{"\\int_{-\\infty}^{0}\\frac{dx}{1+x^2} = \\lim_{c\\to-\\infty}\\left[\\operatorname{arctg} x\\right]_c^{0} = 0-\\left(-\\frac{\\pi}{2}\\right) = \\frac{\\pi}{2}"}</MB>
            <MB>{"\\int_0^{\\infty}\\frac{dx}{1+x^2} = \\lim_{d\\to\\infty}\\left[\\operatorname{arctg} x\\right]_0^{d} = \\frac{\\pi}{2}-0 = \\frac{\\pi}{2}"}</MB>
            <p>
              Mindkettő véges, tehát az integrál konvergens, az értéke <M>{"\\pi"}</M>. Ez a valószínűségszámításban is
              felbukkan: a <M>{"\\frac{1}{\\pi(1+x^2)}"}</M> függvény (a Cauchy-eloszlás sűrűségfüggvénye) alatti
              terület épp 1.
            </p>
          </Lepes>
          <Lepes cim="(d) Vegyes eset: két baj egyszerre">
            <p>
              Itt a nullánál az integrandus nem korlátos (I. típus), a felső határ pedig végtelen (II. típus). Vágjuk
              ketté, mondjuk az 1-nél. Mindkét részre ugyanaz a helyettesítés működik: legyen <M>{"x=t^2"}</M>, ekkor{" "}
              <M>{"dx = 2t\\,dt"}</M> és <M>{"\\sqrt x = t"}</M>:
            </p>
            <MB>{"\\int\\frac{dx}{\\sqrt x\\,(1+x)} = \\int\\frac{2t\\,dt}{t(1+t^2)} = 2\\operatorname{arctg} t = 2\\operatorname{arctg}\\sqrt x"}</MB>
          </Lepes>
          <Lepes cim="(d) A két rész külön">
            <MB>{"\\int_0^{1}\\frac{dx}{\\sqrt x(1+x)} = \\lim_{c\\to0+0}\\left[2\\operatorname{arctg}\\sqrt x\\right]_{c}^{1} = 2\\cdot\\frac{\\pi}{4}-0 = \\frac{\\pi}{2}"}</MB>
            <MB>{"\\int_1^{\\infty}\\frac{dx}{\\sqrt x(1+x)} = \\lim_{d\\to\\infty}\\left[2\\operatorname{arctg}\\sqrt x\\right]_{1}^{d} = 2\\cdot\\frac{\\pi}{2}-2\\cdot\\frac{\\pi}{4} = \\frac{\\pi}{2}"}</MB>
            <p>
              Összesen: <M>{"\\int_0^{\\infty}\\frac{dx}{\\sqrt x\\,(1+x)} = \\pi"}</M>.
            </p>
          </Lepes>
        </KidolgozottFeladat>

        <div className="my-8">
          <p className="mb-2 text-[11px] font-bold tracking-[0.16em] text-naracs-600 uppercase">
            Film — mi történik, amikor a d elszalad?
          </p>
          <FilmImproprius />
          <p className="mt-2 text-[13px] text-petrol-500">
            A film a KF‑3 (a) részét viszi végig, majd ugyanezt megismétli az <M>{"1/x"}</M> függvénnyel. A két
            mérőszalag egymás mellé téve mutatja, mi a különbség konvergencia és divergencia között.
          </p>
        </div>

        {/* ---------- KF-4 ---------- */}
        <KidolgozottFeladat
          jel="KF‑4"
          ido="10 perc"
          cim="Majoráns és minoráns: négy döntés primitív függvény nélkül"
          forras="Előadás, 9–12. példa"
          feladat={
            <>
              <p>Döntsd el, konvergensek-e az alábbi integrálok. Egyiknél sem írható fel elemi primitív függvény!</p>
              <MB>{"\\text{(a)}\\ \\int_1^{\\infty}e^{-x^2}dx \\qquad \\text{(b)}\\ \\int_1^{\\infty}\\frac{dx}{x^2+\\sqrt x}"}</MB>
              <MB>{"\\text{(c)}\\ \\int_1^{\\infty}\\frac{2+\\sin x}{x}dx \\qquad \\text{(d)}\\ \\int_1^{\\infty}\\frac{2+\\cos x}{x^{3/2}}dx"}</MB>
            </>
          }
          tanulsag={
            <p>
              A (c) és a (d) párja a legtanulságosabb: ugyanaz a függvénytípus, csak a nevező kitevője más — és emiatt
              az egyik divergens, a másik konvergens. <strong>A döntést mindig a nevező kitevője hozza meg</strong>, nem
              a számláló ingadozása. A menet mindig ugyanaz: sejtsd meg a választ, aztán keress a sejtésnek megfelelő
              irányú becslést (konvergenciához felülről, divergenciához alulról).
            </p>
          }
        >
          <Lepes cim="(a) A Gauss-féle haranggörbe farka">
            <p>
              Ha <M>{"x\\ge1"}</M>, akkor <M>{"x^2\\ge x"}</M>, tehát <M>{"-x^2\\le-x"}</M>, és mivel az exponenciális
              függvény szigorúan növekvő:
            </p>
            <MB>{"0 \\le e^{-x^2} \\le e^{-x} \\qquad (x\\ge1)"}</MB>
            <p>A majoráns integrálja viszont konvergens:</p>
            <KepletDoboz
              keplet={"\\int_1^{\\infty}e^{-x}dx = \\lim_{d\\to\\infty}\\left[-e^{-x}\\right]_1^{d}"}
              behelyettesitve={"= 0 + e^{-1}"}
              eredmeny={"= \\frac1e \\approx 0{,}3679"}
            />
            <p>
              A majoránskritérium szerint tehát <M>{"\\int_1^{\\infty}e^{-x^2}dx"}</M>{" "}
              <strong>konvergens</strong>, sőt az értéke legfeljebb <M>{"1/e"}</M>. (Érdekesség: ennek az integrálnak a{" "}
              <M>{"0"}</M>-tól <M>{"\\infty"}</M>-ig vett rokona a híres Gauss-integrál,{" "}
              <M>{"\\int_0^{\\infty}e^{-x^2}dx = \\frac{\\sqrt\\pi}{2}\\approx0{,}8862"}</M> — de ezt csak kétváltozós
              módszerekkel lehet kiszámolni.)
            </p>
          </Lepes>
          <Lepes cim="(b) Nagyobb nevező, kisebb tört">
            <p>
              Ha <M>{"x\\ge1"}</M>, akkor <M>{"x^2+\\sqrt x > x^2 > 0"}</M>, és a nagyobb nevező kisebb törtet ad:
            </p>
            <MB>{"0 < \\frac{1}{x^2+\\sqrt x} < \\frac{1}{x^2} \\qquad (x\\ge1)"}</MB>
            <p>
              Mivel <M>{"\\int_1^{\\infty}\\frac{dx}{x^2}"}</M> konvergens (<M>{"p=2>1"}</M>), a majoránskritérium
              szerint a vizsgált integrál is <strong>konvergens</strong>.
            </p>
          </Lepes>
          <Lepes cim="(c) Most alulról becslünk">
            <p>
              Itt divergenciát sejtünk (a nevező csak <M>{"x"}</M>), tehát <strong>alulról</strong> becslünk. Mivel{" "}
              <M>{"\\sin x\\ge-1"}</M> minden <M>{"x"}</M>-re, a számláló legalább 1:
            </p>
            <MB>{"\\frac{2+\\sin x}{x} \\ge \\frac{2-1}{x} = \\frac1x > 0 \\qquad (x\\ge1)"}</MB>
            <p>
              Az <M>{"\\int_1^{\\infty}\\frac{dx}{x}"}</M> integrál divergens (<M>{"p=1"}</M>), tehát a
              minoránskritérium szerint a vizsgált integrál is <strong>divergens</strong>. Figyeld meg, hogy a{" "}
              <M>{"\\sin x"}</M> ingadozása nem számít: a lényeg, hogy a számláló sosem megy 1 alá.
            </p>
          </Lepes>
          <Lepes cim="(d) Ugyanaz a típus, erősebb nevezővel">
            <p>
              Mivel <M>{"\\cos x\\le1"}</M>:
            </p>
            <MB>{"0 < \\frac{2+\\cos x}{x^{3/2}} \\le \\frac{3}{x^{3/2}} \\qquad (x\\ge1)"}</MB>
            <KepletDoboz
              cimke="A majoráns integrálja"
              keplet={"\\int_1^{\\infty}\\frac{3\\,dx}{x^{3/2}} = 3\\cdot\\frac{1}{\\frac32-1}"}
              behelyettesitve={"= 3\\cdot 2"}
              eredmeny={"= 6"}
            />
            <p>
              Tehát az integrál <strong>konvergens</strong>, és az értéke legfeljebb 6.
            </p>
          </Lepes>
        </KidolgozottFeladat>

        {/* ---------- KF-5 ---------- */}
        <KidolgozottFeladat
          jel="KF‑5"
          ido="9 perc"
          cim="Limeszes kritérium: a legnagyobb rendű tagok"
          forras="Előadás, 13–15. példa"
          feladat={
            <>
              <p>Döntsd el a limeszes összehasonlító kritériummal:</p>
              <MB>{"\\text{(a)}\\ \\int_1^{\\infty}\\frac{dx}{\\sqrt{x^4+5x}} \\qquad \\text{(b)}\\ \\int_1^{\\infty}\\frac{\\sqrt{2x+3}}{x}dx \\qquad \\text{(c)}\\ \\int_1^{\\infty}\\frac{x+1}{x^2+3}dx"}</MB>
            </>
          }
          tanulsag={
            <p>
              A három feladat ugyanazt a három lépést járja végig: legnagyobb rendű tagok → <M>{"g=1/x^p"}</M> →{" "}
              <M>{"L"}</M> kiszámolása → p-kritérium. Az <M>{"L"}</M> konkrét értéke (1, <M>{"\\sqrt2"}</M>, 1) a
              döntés szempontjából <strong>lényegtelen</strong>: csak az számít, hogy véges és pozitív legyen. A (c)-re
              van gyorsabb út is: racionális törtfüggvénynél a nevező fokszámának legalább kettővel kell nagyobbnak
              lennie — itt csak eggyel nagyobb.
            </p>
          }
        >
          <Lepes cim="(a) A g megválasztása">
            <p>
              Nagy <M>{"x"}</M>-re a gyök alatt az <M>{"x^4"}</M> dominál, aminek a gyöke <M>{"x^2"}</M>. Legyen tehát{" "}
              <M>{"g(x)=\\frac{1}{x^2}"}</M>:
            </p>
            <MB>{"L = \\lim_{x\\to\\infty}\\frac{\\frac{1}{\\sqrt{x^4+5x}}}{\\frac{1}{x^2}} = \\lim_{x\\to\\infty}\\frac{x^2}{\\sqrt{x^4+5x}} = \\lim_{x\\to\\infty}\\frac{x^2}{x^2\\sqrt{1+\\frac{5}{x^3}}} = 1"}</MB>
            <p>
              A határérték <M>{"L=1"}</M>, ami 0 és <M>{"\\infty"}</M> közé esik. Mivel{" "}
              <M>{"\\int_1^{\\infty}\\frac{dx}{x^2}"}</M> konvergens, a vizsgált integrál is{" "}
              <strong>konvergens</strong>.
            </p>
          </Lepes>
          <Lepes cim="(b) Gyök a számlálóban">
            <p>
              Nagy <M>{"x"}</M>-re a számláló <M>{"\\sqrt{2x}"}</M>-szerű, tehát az egész{" "}
              <M>{"\\frac{\\sqrt{2x}}{x} = \\frac{\\sqrt2}{\\sqrt x}"}</M> nagyságrendű. Válasszuk{" "}
              <M>{"g(x)=\\frac{1}{\\sqrt x}"}</M>-et:
            </p>
            <MB>{"L = \\lim_{x\\to\\infty}\\frac{\\frac{\\sqrt{2x+3}}{x}}{\\frac{1}{\\sqrt x}} = \\lim_{x\\to\\infty}\\frac{\\sqrt x\\sqrt{2x+3}}{x} = \\lim_{x\\to\\infty}\\sqrt{\\frac{x(2x+3)}{x^2}} = \\sqrt2"}</MB>
            <p>
              <M>{"L=\\sqrt2"}</M> véges és pozitív. Mivel <M>{"\\int_1^{\\infty}\\frac{dx}{\\sqrt x}"}</M>{" "}
              divergens (<M>{"p=\\frac12\\le1"}</M>), a vizsgált integrál is <strong>divergens</strong>.
            </p>
          </Lepes>
          <Lepes cim="(c) Racionális törtfüggvény">
            <p>
              A legnagyobb rendű tagok: <M>{"\\frac{x}{x^2} = \\frac1x"}</M>. Legyen tehát{" "}
              <M>{"g(x)=\\frac1x"}</M>:
            </p>
            <MB>{"L = \\lim_{x\\to\\infty}\\frac{\\frac{x+1}{x^2+3}}{\\frac1x} = \\lim_{x\\to\\infty}\\frac{x(x+1)}{x^2+3} = \\lim_{x\\to\\infty}\\frac{x^2+x}{x^2+3} = 1"}</MB>
            <p>
              <M>{"\\int_1^{\\infty}\\frac{dx}{x}"}</M> divergens, tehát a vizsgált integrál is{" "}
              <strong>divergens</strong>.
            </p>
          </Lepes>
          <Lepes cim="Ellenőrzés a másik módszerrel">
            <p>
              A (c)-re próbáljunk minoránst is: <M>{"x\\ge1"}</M> esetén <M>{"x+1 > x"}</M> és{" "}
              <M>{"x^2+3 \\le 4x^2"}</M>, tehát
            </p>
            <MB>{"\\frac{x+1}{x^2+3} > \\frac{x}{4x^2} = \\frac{1}{4x}"}</MB>
            <p>
              és <M>{"\\int_1^{\\infty}\\frac{dx}{4x}"}</M> divergens — ugyanaz a válasz, csak több ötlettel. Épp ez a
              limeszes kritérium előnye: nem kell ügyeskedni az egyenlőtlenségekkel.
            </p>
          </Lepes>
        </KidolgozottFeladat>

        {/* ---------- KF-6 ---------- */}
        <KidolgozottFeladat
          jel="KF‑6"
          ido="12 perc"
          cim="Numerikus integrálás: trapéz és Simpson ugyanazon az öt ponton"
          forras="Előadás, 16–17. példa + gyakorló 14."
          feladat={
            <>
              <p>
                (a) Közelítsd az <M>{"I=\\int_1^2\\frac{dx}{x}"}</M> integrált <M>{"n=4"}</M> felosztással trapéz- és
                Simpson-szabállyal, és vesd össze a pontos értékkel. Ellenőrizd a hibabecsléseket is.
              </p>
              <p>
                (b) Ugyanez az <M>{"\\int_0^1 e^{-x^2}dx"}</M> integrálra (<M>{"n=4"}</M>), amelynek{" "}
                <em>nincs</em> elemi primitív függvénye. A pontos érték hat tizedesre <M>{"0{,}746824"}</M>.
              </p>
            </>
          }
          tanulsag={
            <p>
              Ugyanaz az öt függvényérték, ugyanaz a munka — és a Simpson-hiba nagyságrendekkel kisebb. Az egyetlen
              különbség a <strong>súlyozásban</strong> és a szorzóban van. A (b) mutatja, hogy miért nem akadémiai
              kérdés ez: ott a Newton–Leibniz-út egyszerűen nem járható, numerikus módszer nélkül nem tudnánk mit
              kezdeni az integrállal.
            </p>
          }
        >
          <Lepes cim="(a) Az alappontok">
            <p>
              <M>{"h = \\frac{2-1}{4} = 0{,}25"}</M>, az osztópontok és a függvényértékek:
            </p>
            <div className="finom-gorgeto my-3 overflow-x-auto">
              <table className="szamok w-full text-[13.5px] text-petrol-800">
                <thead>
                  <tr className="border-b border-petrol-200 text-[12px] text-petrol-500">
                    <th className="py-1.5 pr-3 text-left font-semibold">i</th>
                    <th className="py-1.5 pr-3 text-right font-semibold">xᵢ</th>
                    <th className="py-1.5 pr-3 text-right font-semibold">yᵢ = 1/xᵢ</th>
                    <th className="py-1.5 pr-3 text-right font-semibold">tizedesben</th>
                    <th className="py-1.5 pr-3 text-right font-semibold">trapéz-súly</th>
                    <th className="py-1.5 text-right font-semibold">Simpson-súly</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["0", "1", "1", "1,000000", "1", "1"],
                    ["1", "5/4", "4/5", "0,800000", "2", "4"],
                    ["2", "3/2", "2/3", "0,666667", "2", "2"],
                    ["3", "7/4", "4/7", "0,571429", "2", "4"],
                    ["4", "2", "1/2", "0,500000", "1", "1"],
                  ].map((sor) => (
                    <tr key={sor[0]} className="border-b border-petrol-100 last:border-0">
                      {sor.map((cella, j) => (
                        <td key={j} className={`py-1 pr-3 ${j === 0 ? "text-left" : "text-right"}`}>
                          {cella}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              Ellenőrzés: a trapéz-súlyok összege <M>{"1+2+2+2+1 = 8 = 2n"}</M> ✓, a Simpson-súlyoké{" "}
              <M>{"1+4+2+4+1 = 12 = 3n"}</M> ✓
            </p>
          </Lepes>
          <Lepes cim="(a) Trapézszabály — törtekkel, hogy pontos legyen">
            <MB>{"I \\approx \\frac h2\\left(y_0+2y_1+2y_2+2y_3+y_4\\right) = \\frac18\\left(1+2\\cdot\\frac45+2\\cdot\\frac23+2\\cdot\\frac47+\\frac12\\right)"}</MB>
            <p>A zárójelben:</p>
            <MB>{"1+\\frac85+\\frac43+\\frac87+\\frac12 = \\frac{210+336+280+240+105}{210} = \\frac{1171}{210}"}</MB>
            <KepletDoboz
              keplet={"I \\approx \\frac18\\cdot\\frac{1171}{210} = \\frac{1171}{1680}"}
              eredmeny={"= 0{,}697024"}
            />
            <p>
              A hiba <M>{"0{,}697024-0{,}693147 = 0{,}003877"}</M>. Az eredmény <strong>nagyobb</strong> a pontos
              értéknél — ahogy vártuk, hiszen az <M>{"1/x"}</M> konvex, és a húr a görbe fölött halad.
            </p>
          </Lepes>
          <Lepes cim="(a) Simpson-szabály">
            <MB>{"I \\approx \\frac h3\\left(y_0+4y_1+2y_2+4y_3+y_4\\right) = \\frac{1}{12}\\left(1+4\\cdot\\frac45+2\\cdot\\frac23+4\\cdot\\frac47+\\frac12\\right)"}</MB>
            <MB>{"1+\\frac{16}{5}+\\frac43+\\frac{16}{7}+\\frac12 = \\frac{210+672+280+480+105}{210} = \\frac{1747}{210}"}</MB>
            <KepletDoboz
              keplet={"I \\approx \\frac{1}{12}\\cdot\\frac{1747}{210} = \\frac{1747}{2520}"}
              eredmeny={"= 0{,}693254"}
            />
            <p>
              A hiba <M>{"0{,}000107"}</M> — mintegy <strong>36-szor kisebb</strong>, mint a trapézé.
            </p>
          </Lepes>
          <Lepes cim="(a) A hibabecslések ellenőrzése">
            <p>
              Itt <M>{"f(x)=\\frac1x"}</M>, <M>{"a=1"}</M>, <M>{"b=2"}</M>, <M>{"h=\\frac14"}</M>. A deriváltak:{" "}
              <M>{"f''(x)=\\frac{2}{x^3}"}</M>, ennek maximuma <M>{"[1;2]"}</M>-n az <M>{"x=1"}</M> helyen:{" "}
              <M>{"M_2=2"}</M>. Hasonlóan <M>{"f^{(4)}(x)=\\frac{24}{x^5}"}</M>, tehát <M>{"M_4=24"}</M>.
            </p>
            <KepletDoboz
              cimke="Trapéz"
              keplet={"\\left|E_T\\right| \\le \\frac{(b-a)h^2}{12}M_2 = \\frac{1\\cdot\\left(\\frac14\\right)^2}{12}\\cdot2"}
              behelyettesitve={"= \\frac{2}{192}"}
              eredmeny={"= 0{,}010417 \\;>\\; 0{,}003877 \\quad \\text{(teljesül)}"}
            />
            <KepletDoboz
              cimke="Simpson"
              keplet={"\\left|E_S\\right| \\le \\frac{(b-a)h^4}{180}M_4 = \\frac{1\\cdot\\left(\\frac14\\right)^4}{180}\\cdot24"}
              behelyettesitve={"= \\frac{24}{46080}"}
              eredmeny={"= 0{,}000521 \\;>\\; 0{,}000107 \\quad \\text{(teljesül)}"}
            />
            <p>
              Mindkét becslés teljesül — és mindkettő „bőkezű”, mert a maximumot az egész intervallumon vesszük.
            </p>
          </Lepes>
          <Lepes cim="(b) Egy integrál, amelyre nincs képlet">
            <p>
              <M>{"h=0{,}25"}</M>, az alappontok és a függvényértékek (<M>{"y_i = e^{-x_i^2}"}</M>):
            </p>
            <div className="finom-gorgeto my-3 overflow-x-auto">
              <table className="szamok w-full text-[13.5px] text-petrol-800">
                <thead>
                  <tr className="border-b border-petrol-200 text-[12px] text-petrol-500">
                    <th className="py-1.5 pr-3 text-left font-semibold">i</th>
                    <th className="py-1.5 pr-3 text-right font-semibold">xᵢ</th>
                    <th className="py-1.5 text-right font-semibold">yᵢ</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["0", "0", "1,000000"],
                    ["1", "0,25", "0,939413"],
                    ["2", "0,50", "0,778801"],
                    ["3", "0,75", "0,569783"],
                    ["4", "1,00", "0,367879"],
                  ].map((sor) => (
                    <tr key={sor[0]} className="border-b border-petrol-100 last:border-0">
                      {sor.map((cella, j) => (
                        <td key={j} className={`py-1 pr-3 ${j === 0 ? "text-left" : "text-right"}`}>
                          {cella}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <KepletDoboz
              cimke="Trapéz"
              keplet={"T = \\frac{0{,}25}{2}\\left(1+2\\left(0{,}939413+0{,}778801+0{,}569783\\right)+0{,}367879\\right)"}
              eredmeny={"= 0{,}742984 \\qquad (\\text{hiba } 0{,}003840)"}
            />
            <KepletDoboz
              cimke="Simpson"
              keplet={"S = \\frac{0{,}25}{3}\\left(1+4\\cdot0{,}939413+2\\cdot0{,}778801+4\\cdot0{,}569783+0{,}367879\\right)"}
              eredmeny={"= 0{,}746855 \\qquad (\\text{hiba } 0{,}000031)"}
            />
            <p>
              A Simpson-szabály itt is nagyságrendekkel (kb. 120-szor) pontosabb. És vedd észre: a trapézhiba itt{" "}
              <em>negatív</em> lenne előjelesen (<M>{"0{,}742984 < 0{,}746824"}</M>), mert az <M>{"e^{-x^2}"}</M> a{" "}
              <M>{"[0;1]"}</M> nagy részén konkáv.
            </p>
          </Lepes>
          <Lepes cim="Bónusz: mikor pontos a Simpson?">
            <p>
              Mutassuk meg, hogy a Simpson-szabály az <M>{"\\int_0^2 x^3dx"}</M> integrált <M>{"n=2"}</M> felosztással{" "}
              <strong>pontosan</strong> adja meg. A pontos érték{" "}
              <M>{"\\left[\\frac{x^4}{4}\\right]_0^2 = 4"}</M>. Simpsonnal <M>{"h=1"}</M>, <M>{"y_0=0"}</M>,{" "}
              <M>{"y_1=1"}</M>, <M>{"y_2=8"}</M>:
            </p>
            <MB>{"S = \\frac13\\left(0+4\\cdot1+8\\right) = \\frac{12}{3} = 4"}</MB>
            <p>
              Ez nem véletlen: a Simpson-szabály minden <strong>legfeljebb harmadfokú</strong> polinomra pontos.
              Összehasonlításul a trapézszabály ugyanitt <M>{"\\frac12(0+2\\cdot1+8) = 5"}</M>-öt adna — 25 %-os
              hibával.
            </p>
          </Lepes>
        </KidolgozottFeladat>

        <div className="my-8">
          <p className="mb-2 text-[11px] font-bold tracking-[0.16em] text-naracs-600 uppercase">
            Film — a húrtól a parabolaívig
          </p>
          <FilmSimpson />
          <p className="mt-2 text-[13px] text-petrol-500">
            A KF‑6 (a) része lépésenként: az öt alappont, a négy trapéz a felülbecsléssel, majd a két parabolaív — és
            végül a két hiba ugyanazon a léptéken.
          </p>
        </div>
      </Szakasz>

      {/* ==================== KALKULÁTOROK ==================== */}
      <Szakasz
        id="kalkulator"
        cimke="3. rész"
        cim="Kalkulátorok"
        bevezeto="Ugyanazok a számítások tetszőleges képlettel. Használd a házi feladat ellenőrzésére, vagy arra, hogy ráérezz, mi hogyan változik. A vessző és a pont is elfogadott tizedesjelként."
      >
        <div className="space-y-8">
          <div>
            <h3 className="mb-2 text-[16px] font-semibold text-petrol-900">Improprius integrál — konvergencia-vizsgáló</h3>
            <p className="mb-3 text-[14px] text-petrol-600">
              Írj be egy képletet, válaszd ki a típust, és nézd meg, hogyan viselkednek a csonkolt integrálok a{" "}
              <M>{"d = 10,\\,10^2,\\dots,10^6"}</M> (illetve <M>{"\\varepsilon = 10^{-1},\\dots,10^{-6}"}</M>)
              sorozaton. A kalkulátor megmondja, hogy a számsor <em>beáll-e</em>, és megbecsüli a domináns tag{" "}
              <M>{"p"}</M> kitevőjét is — de a döntést neked kell indokolnod. Alaphelyzetben a KF‑3 (a) van betöltve.
            </p>
            <ImImpropriusKalk />
          </div>
          <div>
            <h3 className="mb-2 text-[16px] font-semibold text-petrol-900">Trapéz- és Simpson-kalkulátor</h3>
            <p className="mb-3 text-[14px] text-petrol-600">
              Képletből vagy beírt <M>{"(x_i;\\,y_i)"}</M> táblázatból számol: kiírja az alappontokat, a súlyokat, a
              két közelítést, a pontos értéket (nagyon finom felosztással) és a hibabecsléseket a numerikusan becsült{" "}
              <M>{"M_2"}</M>, <M>{"M_4"}</M> értékekkel. Alaphelyzetben a KF‑6 feladata van betöltve (
              <M>{"\\int_1^2\\frac{dx}{x}"}</M>, <M>{"n=4"}</M>).
            </p>
            <ImNumerikusKalk />
          </div>
        </div>

        <Kiemelo tipus="tipp" cim="Mire használd a kalkulátort — és mire nem">
          <p>
            A konvergencia-vizsgáló <strong>nem bizonyít</strong>. Egy divergens integrálnál is mindig kiszámolódik egy
            szám, csak épp lassan nő: az <M>{"\\int_1^{d}\\frac{dx}{x} = \\ln d"}</M> érték <M>{"d=10^6"}</M>-nál is
            csak 13,8. Aki csak a számsort nézi, könnyen konvergensnek hiszi. Ezért van a p-kritérium és a három
            összehasonlító kritérium — és ezért kérik a dolgozatban az <em>indoklást</em>, nem a számot.
          </p>
          <p>
            A numerikus kalkulátornál a hibabecslés <M>{"M_2"}</M> és <M>{"M_4"}</M> értéke numerikus deriválásból jön,
            ezért maga is közelítő — éles feladatban a deriváltat képlettel számold ki.
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
          cim="Érted, vagy csak behelyettesítesz?"
          leiras="Tíz kérdés a modul tipikus félreértéseiről — egyik sem számolós. Minden válasz után rövid magyarázat."
          kerdesek={KVIZ}
        />

        <Hibakereso feladatok={HIBAK} />

        <div className="my-6">
          <p className="mb-2 text-[11px] font-bold tracking-[0.16em] text-violet-700 uppercase">
            Játék — konvergens vagy divergens?
          </p>
          <ImKonvergensE />
        </div>

        <h3 className="mt-10 text-xl font-semibold text-petrol-900">Számolós gyakorlás</h3>
        <p className="mt-2 text-[14px] text-petrol-600">
          Az öt alaptípus, ami a zárthelyin biztosan előkerül. Öt egymás utáni hibátlan megoldás után konfetti jár.
        </p>
        <GyakorloSzekcio />

        <h3 className="mt-10 text-xl font-semibold text-petrol-900">További feladattípusok</h3>
        <p className="mt-2 text-[14px] text-petrol-600">Ezek is bekerülnek a Zh-szimulátorba.</p>
        <GyakorloExtra />

        <Kiemelo tipus="kulcs" cim="Mikor mehetsz tovább — és mi volt ez az egész félév?">
          <p>
            Akkor vagy készen ezzel a modullal, ha (1) egy integrálra ránézve azonnal megmondod, improprius-e, és ha
            igen, hol a kritikus hely, (2) a p-kritérium <em>mindkét</em> esetét fejből tudod, és nem cseréled fel
            őket, (3) belső szakadásnál magadtól bontasz két részre, (4) egy konvergenciakritériumnál a helyes{" "}
            <em>irányban</em> becsülsz, és meg tudod mondani, mi az, amiből semmi nem következik, (5) le tudod írni a
            trapéz- és a Simpson-képletet a súlyokkal együtt, és a súlyösszeggel ellenőrzöd magad.
          </p>
          <p>
            És ha innen visszanézel a félévre, egyetlen gondolat köti össze az egészet. A sorozatoknál a küszöbindex
            mondta meg, mikor kerül a tagok mindegyike egy <M>{"\\varepsilon"}</M> sávba. A függvényhatárértéknél
            ugyanez a sáv jelent meg, csak <M>{"x\\to x_0"}</M> mellett. A deriváltnál a szelők meredeksége billent át
            az érintőbe. A határozott integrálnál a közelítő összegek finomítása adott egy számot. És most, az
            improprius integrálnál ugyanaz a mozdulat ismétlődik meg utoljára: ha valahol nem tudunk közvetlenül
            számolni, <strong>megállunk előtte, és határértéket veszünk</strong>. Ez az öt modul valójában egyetlen
            ötlet öt arca — és ha ezt látod, akkor a félév célját elérted.
          </p>
        </Kiemelo>
      </Szakasz>
    </>
  );
}
