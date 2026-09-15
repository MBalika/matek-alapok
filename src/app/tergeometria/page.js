import { ModulFejlec, SzakaszSav } from "@/components/ModulKeret";
import { Szakasz, Kartya, Kiemelo, AbraKeret, KetOszlop } from "@/components/ui/Elemek";
import { M, MB, KepletDoboz } from "@/components/ui/Keplet";
import { KidolgozottFeladat, Lepes } from "@/components/KidolgozottFeladat";
import TerVektorFelfedezo from "@/components/abrak/TerVektorFelfedezo";
import TerSkalarisFelfedezo from "@/components/abrak/TerSkalarisFelfedezo";
import TerVektorialisFelfedezo from "@/components/abrak/TerVektorialisFelfedezo";
import TerVegyesFelfedezo from "@/components/abrak/TerVegyesFelfedezo";
import TerSikFelfedezo from "@/components/abrak/TerSikFelfedezo";
import TerNyomatekJatszoter from "@/components/abrak/TerNyomatekJatszoter";
import HelyzetFelismero from "@/components/abrak/HelyzetFelismero";
import { TerVektorKalk, TerEgyenesSikKalk } from "@/components/abrak/TerKalk";
import {
  AbraTartoszerkezet,
  AbraVetulet,
  AbraDeterminans,
  AbraEgyenesAlak,
  AbraNegyHelyzet,
  AbraTavolsagok,
} from "@/components/abrak/TerStatikusAbrak";
import FilmSikHarompont from "@/components/tergeometria/FilmSikHarompont";
import FilmKiteroTavolsag from "@/components/tergeometria/FilmKiteroTavolsag";
import GyakorloSzekcio from "@/components/tergeometria/GyakorloSzekcio";
import GyakorloExtra from "@/components/tergeometria/GyakorloExtra";
import Kviz from "@/components/Kviz";
import Hibakereso from "@/components/Hibakereso";
import { KVIZ, HIBAK } from "@/components/tergeometria/KvizAdatok";
import { modulSlugAlapjan } from "@/lib/oldalterkep";

export const metadata = {
  title: "Térgeometria",
  description:
    "Vektorok a térben, skaláris, vektoriális és vegyes szorzat, az egyenes és a sík egyenletei, kölcsönös helyzetek, távolság- és szögfeladatok — forgatható 3D ábrákkal, kidolgozott feladatokkal és gyakorlással.",
};

const modul = modulSlugAlapjan("/tergeometria");

function Alcim({ children }) {
  return <h3 className="mt-10 text-xl font-semibold text-petrol-900">{children}</h3>;
}

function Proza({ children }) {
  return <div className="proza mt-3 text-[15px] leading-relaxed text-petrol-700">{children}</div>;
}

export default function TergeometriaOldal() {
  return (
    <>
      <ModulFejlec
        szam={2}
        cim="Térgeometria"
        leiras="A térben a szemlélet gyorsan elfogy: két egyenesről ránézésre nem derül ki, metszik-e egymást. Ezért mindent számokkal írunk le. Három szorzat — skaláris, vektoriális, vegyes — és velük minden geometriai kérdés számolási feladattá válik."
        tartalom={[
          "Vektorok, hossz, egységvektor",
          "Skaláris szorzat: szög és vetület",
          "Vektoriális szorzat: irány és terület",
          "Vegyes szorzat: térfogat",
          "Egyenes és sík egyenletei",
          "Kölcsönös helyzetek",
          "Távolságok és szögek",
        ]}
      />
      <SzakaszSav szakaszok={modul.szakaszok} />

      {/* ==================== ELMÉLET ==================== */}
      <Szakasz
        id="elmelet"
        cimke="1. rész"
        cim="Elmélet"
        bevezeto="Tizenegy gondolat, és az egész modul megvan. A térbeli ábrákat húzással elforgathatod — érdemes, mert egy forgatható kép többet mond a mélységviszonyokról, mint tíz sor magyarázat."
      >
        {/* --- 2.1 --- */}
        <h3 className="mt-2 text-xl font-semibold text-petrol-900">2.1 Miért vektorokkal csináljuk?</h3>
        <Proza>
          <p>
            A síkgeometriában még működik a „nézzük meg az ábrán” módszer: felrajzoljuk a
            háromszöget, és látjuk, mi merőleges mire. A térben ez hamar csődöt mond. Két
            egyenesről a papírra rajzolt képükből általában <em>nem</em> lehet megállapítani,
            hogy metszik-e egymást, vagy csak elmennek egymás mellett; egy pont és egy sík
            távolságát pedig végképp nem tudjuk ránézésre megmondani.
          </p>
          <p>
            Ezért másik utat választunk: <strong>minden geometriai objektumot számokkal írunk
            le</strong>, és minden geometriai kérdést számolási feladattá alakítunk. Az eszköz,
            amely ezt lehetővé teszi, a vektor. Ettől kezdve nincs szükség térlátásra — csak
            fegyelmezett számolásra.
          </p>
        </Proza>

        <Kiemelo tipus="kulcs" cim="A három szorzat, amiből minden következik">
          <div className="finom-gorgeto overflow-x-auto">
            <table className="w-full text-[14px]">
              <thead className="text-[11px] text-petrol-500 uppercase">
                <tr>
                  <th className="py-1.5 pr-4 text-left font-semibold">Művelet</th>
                  <th className="py-1.5 pr-4 text-left font-semibold">Az eredménye</th>
                  <th className="py-1.5 text-left font-semibold">Mire használjuk?</th>
                </tr>
              </thead>
              <tbody className="text-petrol-800">
                <tr className="border-t border-naracs-200">
                  <td className="py-1.5 pr-4">
                    <M>{"\\mathbf{a}\\cdot\\mathbf{b}"}</M>
                  </td>
                  <td className="py-1.5 pr-4">
                    <strong>szám</strong>
                  </td>
                  <td className="py-1.5">szög, merőlegesség, vetület, munka</td>
                </tr>
                <tr className="border-t border-naracs-200">
                  <td className="py-1.5 pr-4">
                    <M>{"\\mathbf{a}\\times\\mathbf{b}"}</M>
                  </td>
                  <td className="py-1.5 pr-4">
                    <strong>vektor</strong>
                  </td>
                  <td className="py-1.5">merőleges irány, terület, nyomaték</td>
                </tr>
                <tr className="border-t border-naracs-200">
                  <td className="py-1.5 pr-4">
                    <M>{"(\\mathbf{a}\\times\\mathbf{b})\\cdot\\mathbf{c}"}</M>
                  </td>
                  <td className="py-1.5 pr-4">
                    <strong>szám</strong>
                  </td>
                  <td className="py-1.5">térfogat, egy síkban fekvés</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2">
            Ha ezt a három sort megérted, a modul többi része nagyrészt már csak ezek alkalmazása.
          </p>
        </Kiemelo>

        <Proza>
          <p>
            És ez nem elvont játék, hanem a szakma alapnyelve. A <strong>statikában</strong> az erő
            vektor: a munkája skaláris szorzat (<M>{"W = \\mathbf{F}\\cdot\\mathbf{s}"}</M>), a
            nyomatéka vektoriális szorzat (<M>{"\\mathbf{M} = \\mathbf{r}\\times\\mathbf{F}"}</M>). A{" "}
            <strong>geodéziában</strong> a terepi pontokat koordinátákkal adjuk meg, egy útpálya
            tengelye térbeli egyenes, egy rézsű vagy tetősík térbeli sík — a „mekkora a lejtés”
            kérdés egyenes és sík hajlásszöge. Két csővezeték vagy kábelnyomvonal jellemzően{" "}
            <strong>kitérő</strong> egyenes, és a köztük lévő legkisebb távolság dönti el, elférnek-e
            egymás mellett. A CAD-programok belül pontosan ezekkel a képletekkel dolgoznak.
          </p>
        </Proza>

        <AbraKeret
          szam="2.1"
          cim="Egy térbeli tartószerkezet: minden csomópont egy pont, minden rúd egy vektor. A számolás innentől koordinátákkal megy."
        >
          <AbraTartoszerkezet />
        </AbraKeret>

        <Kiemelo tipus="tipp" cim="A kérdés, amivel minden feladat kezdődik">
          <p>
            <strong>„Melyik vektorok szerepelnek itt valójában?”</strong> A recept végig ugyanaz:
            irányvektorokat és normálvektorokat gyártunk, azokkal szorzunk, és a végén a kapott számot
            geometriailag értelmezzük. Ha elakadsz, mindig ide térj vissza.
          </p>
        </Kiemelo>

        {/* --- 2.2 --- */}
        <Alcim>2.2 Vektorok a térben</Alcim>
        <Proza>
          <p>
            A térben felveszünk egy <M>{"O"}</M> origót és három egymásra páronként merőleges,
            egységnyi hosszú irányvektort: <M>{"\\mathbf{i}"}</M>, <M>{"\\mathbf{j}"}</M>,{" "}
            <M>{"\\mathbf{k}"}</M>. Ezek a bázisvektorok, és ebben a sorrendben{" "}
            <strong>jobbsodrású</strong> rendszert alkotnak.
          </p>
        </Proza>

        <Kiemelo tipus="definicio" cim="Definíció — helyvektor és koordináták">
          <p>
            A tér <M>{"P"}</M> pontjának <strong>helyvektora</strong> az origóból a pontba mutató{" "}
            <M>{"\\overrightarrow{OP}"}</M> vektor. Ha{" "}
            <M>{"\\overrightarrow{OP} = x\\mathbf{i} + y\\mathbf{j} + z\\mathbf{k}"}</M>, akkor az{" "}
            <M>{"x, y, z"}</M> számok a <M>{"P"}</M> koordinátái: <M>{"P(x;\\, y;\\, z)"}</M>. A pont
            és a helyvektora ugyanaz az adathármas, csak másképp gondolunk rá.
          </p>
        </Kiemelo>

        <Proza>
          <p>
            Ezt a kettősséget végig kihasználjuk:{" "}
            <strong>pontokból vektorokat gyártunk, számolunk velük, majd a végeredményt újra pontként
            olvassuk vissza.</strong> A leggyakrabban használt „gyártósor” pedig ez:
          </p>
        </Proza>

        <KepletDoboz
          cimke="A legfontosabb szabály — végpont mínusz kezdőpont"
          keplet={"\\overrightarrow{P_1P_2} = \\left(x_2-x_1;\\, y_2-y_1;\\, z_2-z_1\\right)"}
        />

        <Proza>
          <p>
            Ez abból következik, hogy{" "}
            <M>{"\\overrightarrow{P_1P_2} = \\overrightarrow{OP_2} - \\overrightarrow{OP_1}"}</M>: az
            origóból <M>{"P_2"}</M>-be úgy is eljuthatunk, hogy előbb <M>{"P_1"}</M>-be megyünk, onnan
            tovább.
          </p>
        </Proza>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Kartya cimke="Hossz (abszolút érték)" cim="Kétszeres Pitagorasz">
            <MB>{"|\\mathbf{a}| = \\sqrt{a_1^2 + a_2^2 + a_3^2}"}</MB>
            <p className="mt-2 text-[13px] text-petrol-500">
              Először a vízszintes síkban (<M>{"\\sqrt{a_1^2+a_2^2}"}</M>), majd a függőleges irányra.
              Innen a két pont távolsága is:{" "}
              <M>{"d(P_1,P_2) = \\left|\\overrightarrow{P_1P_2}\\right|"}</M>.
            </p>
          </Kartya>
          <Kartya cimke="Egységvektor" cim="Irány és nagyság szétválasztva">
            <MB>{"\\mathbf{e}_a = \\frac{\\mathbf{a}}{|\\mathbf{a}|}"}</MB>
            <p className="mt-2 text-[13px] text-petrol-500">
              Minden vektor felírható <M>{"\\mathbf{a} = |\\mathbf{a}|\\,\\mathbf{e}_a"}</M> alakban:
              „ennyi hosszú, ebbe az irányba”. A távolság- és vetületképletekben mindig egységvektorral
              szeretnénk dolgozni — ezért szerepel annyi helyen az <M>{"|\\mathbf{n}|"}</M>-nel vagy{" "}
              <M>{"|\\mathbf{v}|"}</M>-vel való osztás.
            </p>
          </Kartya>
        </div>

        <Proza>
          <p>
            Az összeadás, kivonás és a számmal szorzás <strong>koordinátánként</strong> megy.
            Geometriailag az összeadás a paralelogramma-szabály, a <M>{"\\lambda"}</M>-val szorzás
            nyújtás: <M>{"\\lambda > 0"}</M> esetén irányt tart, <M>{"\\lambda < 0"}</M> esetén
            megfordít. Ebből jön a párhuzamosság feltétele is: két nem nulla vektor pontosan akkor
            párhuzamos, ha az egyik a másik számszorosa, azaz ha a koordináták{" "}
            <strong>arányosak</strong>.
          </p>
        </Proza>

        <div className="mt-6">
          <p className="mb-2 text-[11px] font-bold tracking-[0.16em] text-naracs-600 uppercase">
            Próbáld ki — forgasd a képet, állítsd a koordinátákat
          </p>
          <TerVektorFelfedezo />
        </div>

        <Kiemelo tipus="figyelem" cim="A kivonás iránya">
          <p>
            <M>{"\\overrightarrow{P_1P_2}"}</M> és <M>{"\\overrightarrow{P_2P_1}"}</M> egymás
            ellentettjei. Ha rossz sorrendben vonsz ki, a hossz még jó lesz, de az irány megfordul — a
            szögfeladatokban ez tompaszöget ad hegyesszög helyett, a vetületnél pedig hibás előjelet.
          </p>
        </Kiemelo>

        {/* --- 2.3 --- */}
        <Alcim>2.3 A skaláris szorzat</Alcim>
        <Kiemelo tipus="definicio" cim="Definíció — skaláris szorzat">
          <MB>{"\\mathbf{u}\\cdot\\mathbf{v} = |\\mathbf{u}|\\,|\\mathbf{v}|\\cos\\varphi"}</MB>
          <p>
            ahol <M>{"\\varphi"}</M> a két vektor hajlásszöge, <M>{"0^\\circ \\le \\varphi \\le 180^\\circ"}</M>{" "}
            (a két vektort közös kezdőpontba tolva). Az eredmény <strong>szám</strong> — innen a név.
            Koordinátákkal:
          </p>
          <MB>{"\\mathbf{u}\\cdot\\mathbf{v} = u_1v_1 + u_2v_2 + u_3v_3"}</MB>
        </Kiemelo>

        <Proza>
          <p>
            A koordinátás alak a disztributivitásból jön: a kilenc tagból hat eltűnik, mert két
            különböző bázisvektor szorzata nulla (<M>{"\\mathbf{i}\\cdot\\mathbf{j} = 0"}</M> és
            társai), a maradék háromban pedig <M>{"\\mathbf{i}\\cdot\\mathbf{i} = 1"}</M>. A definíció
            viszont nem felesleges: a kettőt <strong>egyenlővé téve</strong> kapjuk a szögképletet.
          </p>
        </Proza>

        <KepletDoboz
          cimke="Két vektor hajlásszöge"
          keplet={
            "\\cos\\varphi = \\frac{\\mathbf{u}\\cdot\\mathbf{v}}{|\\mathbf{u}||\\mathbf{v}|} = \\frac{u_1v_1+u_2v_2+u_3v_3}{\\sqrt{u_1^2+u_2^2+u_3^2}\\;\\sqrt{v_1^2+v_2^2+v_3^2}}"
          }
        />

        <Proza>
          <p>
            <strong>Mit mér a skaláris szorzat?</strong> Azt, hogy a két vektor mennyire „húz egy
            irányba”. Ha egy irányba mutatnak, a szorzat a lehető legnagyobb; ha merőlegesek, nulla; ha
            ellentétesek, a lehető legkisebb. Az <strong>előjel</strong> tehát egyetlen adatot árul el:
            hegyesszögnél pozitív, tompaszögnél negatív, derékszögnél nulla. Ez a fizikai tartalma is:
            az erő akkor végez pozitív munkát, ha „előre” húz.
          </p>
        </Proza>

        <div className="mt-6">
          <p className="mb-2 text-[11px] font-bold tracking-[0.16em] text-naracs-600 uppercase">
            Próbáld ki — a vetület és az előjel
          </p>
          <TerSkalarisFelfedezo />
        </div>

        <Proza>
          <p>
            A skaláris szorzat legfontosabb alkalmazása a <strong>merőleges felbontás</strong>, és ez
            lesz a későbbi távolságképletek alapja. Legyen <M>{"\\mathbf{e}"}</M> egységvektor; ekkor{" "}
            <M>{"\\mathbf{v}\\cdot\\mathbf{e} = |\\mathbf{v}|\\cos\\varphi"}</M> éppen a{" "}
            <M>{"\\mathbf{v}"}</M> előjeles vetülete az <M>{"\\mathbf{e}"}</M> irányra.
          </p>
        </Proza>

        <KepletDoboz
          cimke="Vetület és merőleges felbontás"
          keplet={
            "\\mathbf{u}_{\\parallel} = \\left(\\mathbf{u}\\cdot\\mathbf{e}\\right)\\mathbf{e} = \\frac{\\mathbf{u}\\cdot\\mathbf{v}}{|\\mathbf{v}|^2}\\,\\mathbf{v}, \\qquad \\mathbf{u}_{\\perp} = \\mathbf{u} - \\mathbf{u}_{\\parallel}"
          }
        />

        <AbraKeret
          szam="2.2"
          cim="Az u vektor felbontása a v irányú (párhuzamos) és az arra merőleges összetevőre. A vetület hossza |u|·|cos φ|."
        >
          <AbraVetulet />
        </AbraKeret>

        <Kiemelo tipus="tipp" cim="Miért |v|² a nevező?">
          <p>
            Mert kétszer kell normálni: egyszer azért, hogy a vetület <em>hosszát</em> megkapjuk (
            <M>{"\\mathbf{u}\\cdot\\mathbf{v}"}</M> helyett <M>{"\\mathbf{u}\\cdot\\mathbf{e}"}</M>{" "}
            kell), másodszor azért, hogy a <M>{"\\mathbf{v}"}</M> irányába mutató <em>egységnyi</em>{" "}
            vektorral szorozzunk. A két osztás adja a <M>{"|\\mathbf{v}|\\cdot|\\mathbf{v}| = |\\mathbf{v}|^2"}</M>{" "}
            nevezőt.
          </p>
        </Kiemelo>

        <Kiemelo tipus="figyelem" cim="Amit a skaláris szorzat NEM tud">
          <p>
            Nincs asszociativitás és nincs osztás.{" "}
            <M>{"(\\mathbf{u}\\cdot\\mathbf{v})\\mathbf{w}"}</M> és{" "}
            <M>{"\\mathbf{u}(\\mathbf{v}\\cdot\\mathbf{w})"}</M> különböző vektorok (az első{" "}
            <M>{"\\mathbf{w}"}</M>, a második <M>{"\\mathbf{u}"}</M> irányú), az{" "}
            <M>{"\\mathbf{u}\\cdot\\mathbf{v}\\cdot\\mathbf{w}"}</M> írásmód értelmetlen. És{" "}
            <M>{"\\mathbf{u}\\cdot\\mathbf{v} = \\mathbf{u}\\cdot\\mathbf{w}"}</M> esetén{" "}
            <strong>nem</strong> következik <M>{"\\mathbf{v} = \\mathbf{w}"}</M> — csak annyi, hogy{" "}
            <M>{"\\mathbf{u} \\perp (\\mathbf{v}-\\mathbf{w})"}</M>. Vektorokkal nem lehet
            „egyszerűsíteni”.
          </p>
        </Kiemelo>

        {/* --- 2.4 --- */}
        <Alcim>2.4 A vektoriális szorzat</Alcim>
        <Proza>
          <p>
            A skaláris szorzat számot adott. Most olyan műveletre van szükségünk, amely{" "}
            <strong>vektort</strong> ad — méghozzá olyat, amely mindkét tényezőre merőleges. A merőleges
            irányon viszont két irányítás van; a harmadik feltétel dönti el, melyik.
          </p>
        </Proza>

        <Kiemelo tipus="definicio" cim="Definíció — vektoriális szorzat">
          <p>
            Az <M>{"\\mathbf{a}\\times\\mathbf{b}"}</M> az a vektor, amelyre:
          </p>
          <p>
            <strong>1. hossza</strong> <M>{"|\\mathbf{a}\\times\\mathbf{b}| = |\\mathbf{a}||\\mathbf{b}|\\sin\\varphi"}</M>;{" "}
            <strong>2. iránya</strong> merőleges <M>{"\\mathbf{a}"}</M>-ra és <M>{"\\mathbf{b}"}</M>-re;{" "}
            <strong>3. irányítása</strong> olyan, hogy az{" "}
            <M>{"\\mathbf{a},\\ \\mathbf{b},\\ \\mathbf{a}\\times\\mathbf{b}"}</M> hármas jobbsodrású
            (jobbkéz-szabály).
          </p>
        </Kiemelo>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Kartya cimke="Jobbkéz-szabály" cim="Hogyan mutasd meg a kezeddel">
            <p className="text-[14px] leading-relaxed text-petrol-600">
              A jobb kezed <strong>mutatóujja</strong> az <M>{"\\mathbf{a}"}</M>, a{" "}
              <strong>középső ujjad</strong> a <M>{"\\mathbf{b}"}</M> irányába; ekkor a felfelé álló{" "}
              <strong>hüvelykujjad</strong> mutatja a szorzat irányát. Másik változat: forgasd az ujjaidat
              az <M>{"\\mathbf{a}"}</M>-tól a <M>{"\\mathbf{b}"}</M> felé a rövidebbik úton — a hüvelykujj
              mutat a szorzat felé. Ugyanez a szabály adja a csavarok és a nyomaték irányát.
            </p>
          </Kartya>
          <Kartya cimke="Mit mér a hossz?" cim="A paralelogramma területe">
            <MB>{"|\\mathbf{a}\\times\\mathbf{b}| = T_{\\text{paralelogramma}}"}</MB>
            <p className="mt-2 text-[13px] text-petrol-500">
              Hiszen alap <M>{"\\cdot"}</M> magasság, és a magasság <M>{"|\\mathbf{b}|\\sin\\varphi"}</M>.
              A háromszögé ennek a fele:{" "}
              <M>{"T_{\\triangle} = \\tfrac12|\\mathbf{a}\\times\\mathbf{b}|"}</M>. A szorzat{" "}
              <em>iránya</em> megmondja, melyik síkban vagyunk, a <em>hossza</em> pedig, mekkora a
              paralelogramma — egyetlen vektorban két geometriai adat.
            </p>
          </Kartya>
        </div>

        <KepletDoboz
          cimke="Koordinátás alak — determinánsként, az első sor szerint kifejtve"
          keplet={
            "\\mathbf{a}\\times\\mathbf{b} = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\end{vmatrix}"
          }
          eredmeny={"\\mathbf{a}\\times\\mathbf{b} = \\left(a_2b_3 - a_3b_2;\\;\\; a_3b_1 - a_1b_3;\\;\\; a_1b_2 - a_2b_1\\right)"}
        />

        <AbraKeret
          szam="2.3"
          cim="A gyakorlati recept: mindhárom koordinátánál „takard le” a megfelelő oszlopot, és számold ki a maradék 2×2 determinánst — a középső tagot kivonva."
        >
          <AbraDeterminans />
        </AbraKeret>

        <div className="mt-6">
          <p className="mb-2 text-[11px] font-bold tracking-[0.16em] text-naracs-600 uppercase">
            Próbáld ki — a paralelogramma és a rá merőleges szorzatvektor
          </p>
          <TerVektorialisFelfedezo />
        </div>

        <Kiemelo tipus="figyelem" cim="Antikommutatív és nem asszociatív">
          <p>
            <M>{"\\mathbf{b}\\times\\mathbf{a} = -(\\mathbf{a}\\times\\mathbf{b})"}</M>: a sorrend
            cseréje az irányt megfordítja. És általában{" "}
            <M>{"(\\mathbf{a}\\times\\mathbf{b})\\times\\mathbf{c} \\ne \\mathbf{a}\\times(\\mathbf{b}\\times\\mathbf{c})"}</M> —
            ellenpélda:{" "}
            <M>{"(\\mathbf{i}\\times\\mathbf{i})\\times\\mathbf{j} = \\mathbf{0}"}</M>, de{" "}
            <M>{"\\mathbf{i}\\times(\\mathbf{i}\\times\\mathbf{j}) = \\mathbf{i}\\times\\mathbf{k} = -\\mathbf{j}"}</M>.
            Ezért a zárójel elhagyása itt súlyos hiba: az{" "}
            <M>{"\\mathbf{a}\\times\\mathbf{b}\\times\\mathbf{c}"}</M> jelölés értelmetlen.
          </p>
        </Kiemelo>

        <Kiemelo tipus="tipp" cim="Mérnöki jelentés: a nyomaték">
          <p>
            <M>{"\\mathbf{M} = \\mathbf{r}\\times\\mathbf{F}"}</M>. A hossz{" "}
            <M>{"|\\mathbf{r}||\\mathbf{F}|\\sin\\varphi = |\\mathbf{F}|\\cdot k"}</M>, ahol{" "}
            <M>{"k"}</M> az <strong>erőkar</strong> — ez a középiskolai „erő szorozva erőkar” pontos
            térbeli megfelelője. Az irány a forgástengely, az irányítás a forgásirány. Ha az erő
            hatásvonala átmegy a forgásponton, a szorzat nulla: nincs nyomaték. Helyes.
          </p>
        </Kiemelo>

        {/* --- 2.5 --- */}
        <Alcim>2.5 A vegyes szorzat</Alcim>
        <Kiemelo tipus="definicio" cim="Definíció — vegyes szorzat">
          <p>
            Az <M>{"\\mathbf{a}, \\mathbf{b}, \\mathbf{c}"}</M> vektorok vegyes szorzata{" "}
            <M>{"(\\mathbf{a}\\times\\mathbf{b})\\cdot\\mathbf{c}"}</M>. Az eredmény{" "}
            <strong>szám</strong>. Itt nincs zárójelezési kétértelműség: a{" "}
            <M>{"\\mathbf{a}\\cdot(\\mathbf{b}\\times\\mathbf{c})"}</M> ugyanazt adja, viszont a{" "}
            <M>{"(\\mathbf{a}\\cdot\\mathbf{b})\\times\\mathbf{c}"}</M> értelmetlen — számot nem lehet
            vektoriálisan szorozni.
          </p>
        </Kiemelo>

        <Proza>
          <p>
            Legyen <M>{"\\mathbf{n} = \\mathbf{a}\\times\\mathbf{b}"}</M>. Az <M>{"|\\mathbf{n}|"}</M>{" "}
            az alaplap területe, az iránya merőleges rá; a{" "}
            <M>{"|\\mathbf{c}|\\cos\\vartheta"}</M> pedig a <M>{"\\mathbf{c}"}</M> alaplapra merőleges
            vetülete, vagyis a test (előjeles) <strong>magassága</strong>. Alapterület szorozva
            magassággal — tehát:
          </p>
        </Proza>

        <KepletDoboz
          cimke="Térfogatok"
          keplet={
            "(\\mathbf{a}\\times\\mathbf{b})\\cdot\\mathbf{c} = \\begin{vmatrix} a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\\\ c_1 & c_2 & c_3 \\end{vmatrix}"
          }
          eredmeny={
            "V_{\\text{paralelepipedon}} = \\left|(\\mathbf{a}\\times\\mathbf{b})\\cdot\\mathbf{c}\\right|, \\qquad V_{\\text{tetraéder}} = \\frac{1}{6}\\left|(\\mathbf{a}\\times\\mathbf{b})\\cdot\\mathbf{c}\\right|"
          }
        />

        <Proza>
          <p>
            A hatod onnan jön, hogy a gúla térfogata <M>{"\\tfrac13\\cdot"}</M> alapterület{" "}
            <M>{"\\cdot"}</M> magasság, és a háromszög alap a paralelogramma fele:{" "}
            <M>{"\\tfrac13\\cdot\\tfrac12 = \\tfrac16"}</M>. A determinánst{" "}
            <strong>Sarrus-szabállyal</strong> is számolhatod, de a sor szerinti kifejtés ugyanolyan
            gyors. Tulajdonságok: a ciklikus csere nem változtat (
            <M>{"\\mathbf{a}\\mathbf{b}\\mathbf{c} = \\mathbf{b}\\mathbf{c}\\mathbf{a} = \\mathbf{c}\\mathbf{a}\\mathbf{b}"}</M>
            ), két vektor cseréje előjelet vált, a pont és a kereszt pedig felcserélhető.
          </p>
        </Proza>

        <Kiemelo tipus="kulcs" cim="Komplanaritás — a leggyorsabb teszt">
          <p>
            Három térvektor pontosan akkor <strong>komplanáris</strong> (párhuzamos egy közös síkkal),
            ha a vegyes szorzatuk nulla: ilyenkor a „paralelepipedon” magassága nulla, tehát a térfogata
            is. Ebből: négy pont, <M>{"A, B, C, D"}</M> pontosan akkor illeszkedik egy síkra, ha{" "}
            <M>{"\\overrightarrow{AB}, \\overrightarrow{AC}, \\overrightarrow{AD}"}</M> vegyes szorzata
            nulla.
          </p>
        </Kiemelo>

        <div className="mt-6">
          <p className="mb-2 text-[11px] font-bold tracking-[0.16em] text-naracs-600 uppercase">
            Próbáld ki — told a c vektort a másik kettő síkjába
          </p>
          <TerVegyesFelfedezo />
        </div>

        {/* --- 2.6 --- */}
        <Alcim>2.6 Az egyenes egyenletei</Alcim>
        <Proza>
          <p>
            Egy térbeli egyenest <strong>egy pontja</strong> és <strong>egy irányvektora</strong>{" "}
            határoz meg egyértelműen. (A síkbeli „meredekség” a térben nem elég — itt három irányt kell
            kezelni.) Az egyenes <M>{"P"}</M> pontjába az origóból úgy jutunk el, hogy először{" "}
            <M>{"P_0"}</M>-ba megyünk, onnan pedig az irányvektor valahányszorosával tovább.
          </p>
        </Proza>

        <KepletDoboz
          cimke="Az egyenes vektoregyenlete és paraméteres alakja"
          keplet={"\\overrightarrow{OP} = \\overrightarrow{OP_0} + t\\,\\mathbf{v}, \\qquad t \\in \\mathbb{R}"}
          eredmeny={"x = x_0 + tv_1, \\qquad y = y_0 + tv_2, \\qquad z = z_0 + tv_3"}
        />

        <AbraKeret
          szam="2.4"
          cim="A paraméter mint idő: t = 0-nál a P₀ pontban vagyunk, és v „sebességgel” haladunk. Minden t-hez egy pont tartozik, és minden pont pontosan egy t-vel érhető el."
        >
          <AbraEgyenesAlak />
        </AbraKeret>

        <Kartya cimke="Összefoglalás" cim="Az egyenes háromféle felírása">
          <div className="finom-gorgeto overflow-x-auto">
            <table className="w-full text-[14px]">
              <thead className="text-[11px] text-petrol-500 uppercase">
                <tr>
                  <th className="py-1.5 pr-4 text-left font-semibold">Alak</th>
                  <th className="py-1.5 pr-4 text-left font-semibold">Képlet</th>
                  <th className="py-1.5 text-left font-semibold">Mikor jó?</th>
                </tr>
              </thead>
              <tbody className="text-petrol-800">
                <tr className="border-t border-petrol-100">
                  <td className="py-2 pr-4 font-medium">paraméteres</td>
                  <td className="py-2 pr-4">
                    <M>{"x = x_0+tv_1,\\ y = y_0+tv_2,\\ z = z_0+tv_3"}</M>
                  </td>
                  <td className="py-2">mindig biztonságos; döféspont, kölcsönös helyzet</td>
                </tr>
                <tr className="border-t border-petrol-100">
                  <td className="py-2 pr-4 font-medium">kanonikus</td>
                  <td className="py-2 pr-4">
                    <M>{"\\frac{x-x_0}{v_1} = \\frac{y-y_0}{v_2} = \\frac{z-z_0}{v_3}"}</M>
                  </td>
                  <td className="py-2">tömör felírás, ha egyik <M>{"v_i"}</M> sem nulla</td>
                </tr>
                <tr className="border-t border-petrol-100">
                  <td className="py-2 pr-4 font-medium">két ponton át</td>
                  <td className="py-2 pr-4">
                    <M>{"\\mathbf{v} = \\overrightarrow{P_1P_2}"}</M>, utána a fentiek
                  </td>
                  <td className="py-2">ha két pont adott</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[13px] text-petrol-500">
            A kanonikus alak valójában <strong>két</strong> egyenlet — összhangban azzal, hogy a térben
            az egyenes két sík metszete.
          </p>
        </Kartya>

        <Kiemelo tipus="figyelem" cim="Vigyázz a nullával, és az „egyetlen helyes alak” illúziójával">
          <p>
            Ha valamelyik <M>{"v_i = 0"}</M>, a kanonikus alak nem írható fel (nullával nem osztunk):
            ilyenkor az adott koordináta állandó. Például <M>{"\\mathbf{v} = (2;\\,0;\\,-1)"}</M> és{" "}
            <M>{"P_0(1;\\,3;\\,5)"}</M> esetén helyesen{" "}
            <M>{"\\frac{x-1}{2} = \\frac{z-5}{-1},\\ y = 3"}</M>. És: ugyanazt az egyenest végtelen sok
            egyenletrendszer írja le (más kezdőpont, más hosszúságú vagy ellentétes irányvektor). Ha a
            megoldásod más alakú, mint a példatáré, még lehet jó — ellenőrizd behelyettesítéssel.
          </p>
        </Kiemelo>

        {/* --- 2.7 --- */}
        <Alcim>2.7 A sík egyenletei</Alcim>
        <Proza>
          <p>
            Egy síkot <strong>egy pontja</strong> és a <strong>normálvektora</strong> határoz meg. A
            normálvektor minden olyan <M>{"\\mathbf{n} \\ne \\mathbf{0}"}</M> vektor, amely merőleges a
            síkra. A tér <M>{"P"}</M> pontja pontosan akkor van a síkon, ha a{" "}
            <M>{"\\overrightarrow{P_0P}"}</M> vektor merőleges <M>{"\\mathbf{n}"}</M>-re — ez egyetlen
            skaláris szorzat:
          </p>
        </Proza>

        <KepletDoboz
          cimke="A sík egyenlete"
          keplet={"n_1\\left(x-x_0\\right) + n_2\\left(y-y_0\\right) + n_3\\left(z-z_0\\right) = 0"}
          eredmeny={"n_1x + n_2y + n_3z = n_1x_0 + n_2y_0 + n_3z_0 = d_0"}
        />

        <Kiemelo tipus="kulcs" cim="A legfontosabb leolvasási szabály">
          <p>
            Az <M>{"n_1x + n_2y + n_3z = d_0"}</M> alakban az <M>{"x, y, z"}</M>{" "}
            <strong>együtthatói éppen a normálvektor koordinátái</strong>. Például a{" "}
            <M>{"2x - 3y + z = 5"}</M> sík normálvektora <M>{"\\mathbf{n} = (2;\\,-3;\\,1)"}</M>. Ez a
            térgeometria leggyakrabban használt apró trükkje.
          </p>
        </Kiemelo>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Kartya cimke="Három pontból" cim="A normálvektort legyártjuk">
            <MB>{"\\mathbf{n} = \\overrightarrow{AB}\\times\\overrightarrow{AC}"}</MB>
            <p className="mt-2 text-[13px] text-petrol-500">
              A két oldalvektor a síkban fekszik, tehát a vektoriális szorzatuk merőleges rá. Utána már
              csak be kell helyettesíteni az <M>{"A"}</M> pontot a jobb oldal kiszámításához.
            </p>
          </Kartya>
          <Kartya cimke="Tengelymetszetes alak" cim="Rajzoláshoz a leghasznosabb">
            <MB>{"\\frac{x}{p} + \\frac{y}{q} + \\frac{z}{r} = 1"}</MB>
            <p className="mt-2 text-[13px] text-petrol-500">
              Ha a sík a tengelyeket a <M>{"(p;0;0)"}</M>, <M>{"(0;q;0)"}</M>, <M>{"(0;0;r)"}</M>{" "}
              pontokban metszi. Az általános alakból <M>{"d_0"}</M>-lal való osztással kapjuk — ha{" "}
              <M>{"d_0 \\ne 0"}</M>.
            </p>
          </Kartya>
        </div>

        <Proza>
          <p>
            Két sík pontosan akkor <strong>párhuzamos</strong>, ha a normálvektoraik párhuzamosak. Ezért
            egy adott síkkal párhuzamos sík felírásához ugyanazt a normálvektort használjuk: a bal oldal
            változatlan marad, csak a jobb oldali állandó változik. Ez egyben ellenőrzési lehetőség is.
            Teljesség kedvéért a sík <strong>paraméteres</strong> alakja is létezik:{" "}
            <M>{"\\overrightarrow{OP} = \\overrightarrow{OP_0} + s\\,\\mathbf{a} + t\\,\\mathbf{b}"}</M>{" "}
            — két paraméter kell, mert a sík kétdimenziós.
          </p>
        </Proza>

        <div className="mt-6">
          <p className="mb-2 text-[11px] font-bold tracking-[0.16em] text-naracs-600 uppercase">
            Próbáld ki — állítsd az együtthatókat, figyeld a normálvektort
          </p>
          <TerSikFelfedezo />
        </div>

        <Kiemelo tipus="figyelem" cim="Ne keverd össze az egyenest és a síkot">
          <p>
            Az egyenest <strong>irány</strong>vektor, a síkot <strong>normál</strong>vektor jellemzi. Az
            egyenesnek nincs egyértelmű normálvektora a térben, a síknak pedig nincs egyetlen
            irányvektora — végtelen sok van. Amikor a feladat „az egyenesre merőleges síkot” kér, az
            egyenes irányvektora lesz a sík normálvektora — és fordítva. Az is szabad, hogy a sík
            egyenletét bármely nem nulla számmal végigszorozd: ugyanazt a síkot írja le. Szokás a
            lehető legkisebb egész együtthatókat használni.
          </p>
        </Kiemelo>

        {/* --- 2.8 --- */}
        <Alcim>2.8 Kölcsönös helyzetek</Alcim>
        <Proza>
          <p>
            A térben két egyenes négyféle viszonyban állhat. A <strong>kitérő</strong> helyzet a
            térgeometria újdonsága: síkban két egyenes vagy metszi egymást, vagy párhuzamos, harmadik
            eset nincs. A térben viszont elmehetnek egymás mellett úgy, hogy sem nem metszők, sem nem
            párhuzamosak — mint egy felüljáró és az alatta futó út tengelye. És ez nem különleges eset,
            hanem épp ellenkezőleg: két „véletlenszerűen” felvett térbeli egyenes szinte biztosan
            kitérő.
          </p>
        </Proza>

        <AbraKeret
          szam="2.5"
          cim="A négy lehetséges helyzet és a vizsgálat menete. A jobb szélső képen a narancs egyenes átbújik a zöld alatt: nincs közös pontjuk, mégsem párhuzamosak."
        >
          <AbraNegyHelyzet />
        </AbraKeret>

        <Kiemelo tipus="kulcs" cim="Két egyenes — a vizsgálat menete (mindig ebben a sorrendben)">
          <p>
            <strong>1. Párhuzamosak-e az irányvektorok?</strong> Ha igen: vedd az egyik egyenes egy
            pontját, és nézd meg, rajta van-e a másikon. Ha igen → egybeesők, ha nem → párhuzamosak.
          </p>
          <p>
            <strong>2. Ha nem párhuzamosak:</strong> írd fel az egyenlőséget{" "}
            <strong>két különböző paraméterrel</strong> (<M>{"t_1"}</M> és <M>{"t_2"}</M>), és oldd meg
            a hármas rendszert. Két egyenletből határozd meg <M>{"t_1"}</M>-et és <M>{"t_2"}</M>-t, majd{" "}
            <strong>helyettesíts be a harmadikba</strong>. Ha teljesül → metszők (és megvan a
            metszéspont), ha nem → kitérők.
          </p>
        </Kiemelo>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <Kartya cimke="Egyenes és sík" cim="Fordított logika!">
            <div className="finom-gorgeto overflow-x-auto">
              <table className="w-full text-[13.5px]">
                <tbody className="text-petrol-800">
                  <tr className="border-b border-petrol-100">
                    <td className="py-2 pr-3">
                      <M>{"\\mathbf{v}\\cdot\\mathbf{n} \\ne 0"}</M>
                    </td>
                    <td className="py-2">döfi a síkot egy pontban</td>
                  </tr>
                  <tr className="border-b border-petrol-100">
                    <td className="py-2 pr-3">
                      <M>{"\\mathbf{v}\\cdot\\mathbf{n} = 0"}</M>, <M>{"P_0 \\notin S"}</M>
                    </td>
                    <td className="py-2">párhuzamos a síkkal</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-3">
                      <M>{"\\mathbf{v}\\cdot\\mathbf{n} = 0"}</M>, <M>{"P_0 \\in S"}</M>
                    </td>
                    <td className="py-2">benne fekszik a síkban</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-[13px] text-petrol-500">
              A döféspontot úgy kapod, hogy a paraméteres alakot beírod a sík egyenletébe, és megoldod{" "}
              <M>{"t"}</M>-re. Ha ellentmondásra jutsz → párhuzamos; ha azonosságra → benne fekszik.
            </p>
          </Kartya>
          <Kartya cimke="Két sík" cim="A normálvektorokon múlik">
            <div className="finom-gorgeto overflow-x-auto">
              <table className="w-full text-[13.5px]">
                <tbody className="text-petrol-800">
                  <tr className="border-b border-petrol-100">
                    <td className="py-2 pr-3">
                      <M>{"\\mathbf{n}_1 \\parallel \\mathbf{n}_2"}</M>, más konstans
                    </td>
                    <td className="py-2">párhuzamos</td>
                  </tr>
                  <tr className="border-b border-petrol-100">
                    <td className="py-2 pr-3">
                      <M>{"\\mathbf{n}_1 \\parallel \\mathbf{n}_2"}</M>, arányos konstans
                    </td>
                    <td className="py-2">egybeeső</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-3">
                      <M>{"\\mathbf{n}_1 \\nparallel \\mathbf{n}_2"}</M>
                    </td>
                    <td className="py-2">metszésvonal</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-[13px] text-petrol-500">
              A metszésvonal iránya <M>{"\\mathbf{v} = \\mathbf{n}_1\\times\\mathbf{n}_2"}</M> (mindkét
              síkban benne fekszik, tehát mindkét normálisra merőleges), egy pontját pedig úgy kapod,
              hogy az egyik változónak konkrét értéket adsz, és megoldod a maradék két egyenletet.
            </p>
          </Kartya>
        </div>

        <Kiemelo tipus="figyelem" cim="A két leggyakoribb hiba ebben a szakaszban">
          <p>
            <strong>1.</strong> Két egyenes metszésénél ugyanazt a <M>{"t"}</M>-t használni mindkét
            egyenletben. Két külön „mozgásról” van szó, tehát két külön paraméter kell.{" "}
            <strong>2.</strong> A harmadik egyenlet ellenőrzésének elmulasztása. A három egyenletből
            kettő szinte mindig megoldható — a kitérő helyzetet épp a harmadik leplezi le.
          </p>
        </Kiemelo>

        {/* --- 2.9 --- */}
        <Alcim>2.9 Távolságfeladatok</Alcim>
        <Proza>
          <p>
            Itt derül ki, <strong>miért</strong> vezettük be a vektoriális és a vegyes szorzatot.
            Mindegyik képlet mögött ugyanaz a két gondolat áll.
          </p>
        </Proza>

        <Kiemelo tipus="kulcs" cim="A két alapötlet">
          <p>
            <strong>(A) Vetítés.</strong> Ha van egy jó irányunk (például a sík normálisa), a távolság
            egyszerűen egy vetület hossza: <M>{"d = \\left|\\overrightarrow{PQ}\\cdot\\mathbf{e}\\right|"}</M>.
          </p>
          <p>
            <strong>(B) Terület vagy térfogat osztva az alappal.</strong> A paralelogramma magassága a
            terület és az alap hányadosa; a paralelepipedoné a térfogat és az alapterület hányadosa. A
            vektoriális és a vegyes szorzat pontosan ezeket adja meg.
          </p>
        </Kiemelo>

        <KetOszlop>
          <div>
            <Kartya cimke="A négy képlet" cim="Mind ugyanaz a séma">
              <p className="mb-2 text-[13px] text-petrol-500">
                pont — pont (nincs szükség szorzatra):
              </p>
              <MB>{"d = \\left|\\overrightarrow{PQ}\\right|"}</MB>
              <p className="mt-3 mb-2 text-[13px] text-petrol-500">
                pont — egyenes (vektoriális szorzat: terület / alap):
              </p>
              <MB>{"d = \\frac{\\left|\\overrightarrow{PQ}\\times\\mathbf{v}\\right|}{|\\mathbf{v}|}"}</MB>
              <p className="mt-3 mb-2 text-[13px] text-petrol-500">
                pont — sík (skaláris szorzat: vetítés a normálisra):
              </p>
              <MB>
                {
                  "d = \\frac{\\left|\\overrightarrow{PQ}\\cdot\\mathbf{n}\\right|}{|\\mathbf{n}|} = \\frac{\\left|n_1x_Q+n_2y_Q+n_3z_Q-d_0\\right|}{\\sqrt{n_1^2+n_2^2+n_3^2}}"
                }
              </MB>
              <p className="mt-3 mb-2 text-[13px] text-petrol-500">
                két kitérő egyenes (vegyes szorzat: térfogat / alaplap):
              </p>
              <MB>
                {
                  "d = \\frac{\\left|\\overrightarrow{PQ}\\cdot(\\mathbf{v}_1\\times\\mathbf{v}_2)\\right|}{|\\mathbf{v}_1\\times\\mathbf{v}_2|}"
                }
              </MB>
            </Kartya>
          </div>
          <div>
            <Proza>
              <p>
                <strong>Pont és egyenes.</strong> A <M>{"\\overrightarrow{PQ}"}</M> és{" "}
                <M>{"\\mathbf{v}"}</M> egy paralelogrammát feszít ki: az alapja <M>{"|\\mathbf{v}|"}</M>,
                a hozzá tartozó magassága pedig éppen a keresett távolság. Az egyenes melyik pontját
                választod, közömbös: az irányvektorral párhuzamos rész a vektoriális szorzatból kiesik.
              </p>
              <p>
                <strong>Két kitérő egyenes.</strong> A számláló a{" "}
                <M>{"\\overrightarrow{PQ}, \\mathbf{v}_1, \\mathbf{v}_2"}</M> által kifeszített
                paralelepipedon térfogata, a nevező az alaplap területe — a hányados a magasság. A két
                egyenes két párhuzamos síkban fekszik, és ezek a test alap- és fedőlapja. Ha{" "}
                <M>{"d = 0"}</M> jön ki, a három vektor komplanáris: az egyenesek metszők vagy
                párhuzamosak, nem kitérők.
              </p>
              <p>
                <strong>Párhuzamos objektumok</strong> távolsága ugyanezekkel megy: két párhuzamos
                síknál vegyél egy pontot az egyiken, és számolj pont–sík távolságot; párhuzamos
                egyeneseknél pont–egyenes távolságot.
              </p>
            </Proza>
          </div>
        </KetOszlop>

        <AbraKeret
          szam="2.6"
          cim="Balra: a pont–sík távolság mint vetület a normálisra. Jobbra: két kitérő egyenes és a normáltranszverzális — a közös merőleges szakasz."
        >
          <AbraTavolsagok />
        </AbraKeret>

        <Kiemelo tipus="figyelem" cim="A nevező nem hagyható el">
          <p>
            A <M>{"\\left|n_1x_Q+n_2y_Q+n_3z_Q-d_0\\right|"}</M> önmagában <strong>nem</strong>{" "}
            távolság. Egyszerű próba: szorozd meg a sík egyenletét 10-zel — ugyanaz a sík, de a számláló
            tízszereződik. A távolság nyilván nem változhat, tehát a <M>{"|\\mathbf{n}|"}</M>-nel való
            osztás kötelező. Ugyanígy: a képlethez a sík egyenletét <strong>egy oldalra kell
            rendezni</strong>, különben rossz <M>{"d_0"}</M>-lal számolsz.
          </p>
        </Kiemelo>

        {/* --- 2.10 --- */}
        <Alcim>2.10 Szögfeladatok</Alcim>
        <Proza>
          <p>
            A szögfeladatok mind a skaláris szorzatra vezetnek vissza, de három dologra kell figyelni:{" "}
            <strong>melyik vektorokat</strong> szorozzuk össze, kell-e <strong>abszolút érték</strong>,
            és <strong>szinusz</strong> vagy <strong>koszinusz</strong> szerepel-e.
          </p>
        </Proza>

        <Kartya cimke="A három szögképlet" cim="Egy táblázatban">
          <div className="finom-gorgeto overflow-x-auto">
            <table className="w-full text-[14px]">
              <thead className="text-[11px] text-petrol-500 uppercase">
                <tr>
                  <th className="py-1.5 pr-4 text-left font-semibold">Mi és mi?</th>
                  <th className="py-1.5 pr-4 text-left font-semibold">Melyik vektorok?</th>
                  <th className="py-1.5 text-left font-semibold">Képlet</th>
                </tr>
              </thead>
              <tbody className="text-petrol-800">
                <tr className="border-t border-petrol-100">
                  <td className="py-2 pr-4">egyenes — egyenes</td>
                  <td className="py-2 pr-4">
                    <M>{"\\mathbf{v}_1, \\mathbf{v}_2"}</M>
                  </td>
                  <td className="py-2">
                    <M>{"\\cos\\varphi = \\frac{|\\mathbf{v}_1\\cdot\\mathbf{v}_2|}{|\\mathbf{v}_1||\\mathbf{v}_2|}"}</M>
                  </td>
                </tr>
                <tr className="border-t border-petrol-100">
                  <td className="py-2 pr-4">egyenes — sík</td>
                  <td className="py-2 pr-4">
                    <M>{"\\mathbf{v}, \\mathbf{n}"}</M>
                  </td>
                  <td className="py-2">
                    <M>{"\\sin\\alpha = \\frac{|\\mathbf{v}\\cdot\\mathbf{n}|}{|\\mathbf{v}||\\mathbf{n}|}"}</M>
                  </td>
                </tr>
                <tr className="border-t border-petrol-100">
                  <td className="py-2 pr-4">sík — sík</td>
                  <td className="py-2 pr-4">
                    <M>{"\\mathbf{n}_1, \\mathbf{n}_2"}</M>
                  </td>
                  <td className="py-2">
                    <M>{"\\cos\\gamma = \\frac{|\\mathbf{n}_1\\cdot\\mathbf{n}_2|}{|\\mathbf{n}_1||\\mathbf{n}_2|}"}</M>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[13px] text-petrol-500">
            Mindháromban ott az abszolút érték, és mindhárom eredménye <M>{"0^\\circ"}</M> és{" "}
            <M>{"90^\\circ"}</M> közé esik.
          </p>
        </Kartya>

        <Kiemelo tipus="figyelem" cim="Mikor cos és mikor sin — és mikor kell abszolút érték">
          <p>
            <strong>Szinusz csak az egyenes–sík esetben van</strong>, mert ott „normálvektorról” kell
            „síkbeli irányra” váltani: a képlet az irányvektor és a normális{" "}
            <M>{"\\vartheta"}</M> szögét adja, a keresett szög pedig ennek a pótszöge (
            <M>{"\\alpha = 90^\\circ - \\vartheta"}</M>, és{" "}
            <M>{"\\cos\\vartheta = \\sin\\alpha"}</M>). Ha véletlenül arkuszkoszinuszt számolsz, pont a
            pótszöget kapod.
          </p>
          <p>
            Az <strong>abszolút érték</strong> azért kell, mert az irányvektor előjele önkényes:
            ugyanazt az egyenest a <M>{"\\mathbf{v}"}</M> és a <M>{"-\\mathbf{v}"}</M> is leírja. De
            figyelj: <strong>vektorok</strong> hajlásszögénél NINCS abszolút érték — ott a tompaszög is
            értelmes válasz. Ez a két képlet közti egyetlen, de lényeges különbség.
          </p>
        </Kiemelo>

        {/* --- 2.11 --- */}
        <Alcim>2.11 Miért szép? — a nyomaték játszótere</Alcim>
        <Proza>
          <p>
            A vektoriális szorzat első ránézésre önkényes definíció: miért pont ez a három feltétel?
            A válasz a statikában van. Amikor egy erő egy rudat forgat, három dolgot kell megadni:{" "}
            <strong>mekkora</strong> a forgató hatás, <strong>mely tengely</strong> körül forgat, és{" "}
            <strong>merre</strong>. Ez pontosan három adat — és pontosan ezt a hármat tárolja egyetlen
            vektorban az <M>{"\\mathbf{M} = \\mathbf{r}\\times\\mathbf{F}"}</M>.
          </p>
          <p>
            Húzd a narancs fogópontot: az erő nagyságával és irányával együtt a lila nyomatékvektor is
            változik. Figyeld meg, mi történik, ha az erő a rúd irányába mutat — és mi akkor, ha
            merőlegesen.
          </p>
        </Proza>
        <div className="mt-4">
          <TerNyomatekJatszoter />
        </div>
      </Szakasz>

      {/* ==================== KIDOLGOZOTT FELADATOK ==================== */}
      <Szakasz
        id="peldak"
        cimke="2. rész"
        cim="Kidolgozott feladatok"
        bevezeto="Az előadás hat feladata, lépésenként. Először mindig próbáld meg magad — a lépések csak akkor érnek valamit, ha van mihez hasonlítanod."
        className="bg-white"
      >
        {/* ---- KF-1 ---- */}
        <KidolgozottFeladat
          jel="KF‑1"
          ido="6 perc"
          forras="Előadás, 3.4 példák"
          cim="Hajlásszög és merőleges felbontás"
          feladat={
            <>
              <p>
                <strong>(a)</strong> Határozd meg az <M>{"\\mathbf{a} = (3;\\,4;\\,5)"}</M> és{" "}
                <M>{"\\mathbf{b} = (2;\\,1;\\,0)"}</M> vektorok hajlásszögét!
              </p>
              <p>
                <strong>(b)</strong> Bontsd fel az <M>{"\\mathbf{u} = (4;\\,-1;\\,2)"}</M> vektort a{" "}
                <M>{"\\mathbf{v} = (-2;\\,3;\\,1)"}</M> vektorral párhuzamos és arra merőleges
                összetevőre!
              </p>
            </>
          }
          tanulsag={
            <p>
              A skaláris szorzat <strong>előjele</strong> már a számolás elején megmondja, mit várunk:
              pozitívnál hegyes-, negatívnál tompaszöget. A felbontásnál pedig mindig ellenőrizd, hogy{" "}
              <M>{"\\mathbf{u}_\\perp\\cdot\\mathbf{v} = 0"}</M> — ez tíz másodperc, és minden
              számolási hibát kiszűr.
            </p>
          }
        >
          <Lepes cim="(a) 1. lépés — skaláris szorzat">
            <MB>{"\\mathbf{a}\\cdot\\mathbf{b} = 3\\cdot 2 + 4\\cdot 1 + 5\\cdot 0 = 10"}</MB>
            <p>
              Pozitív, tehát hegyesszöget várunk.
            </p>
          </Lepes>
          <Lepes cim="(a) 2. lépés — a hosszak">
            <MB>{"|\\mathbf{a}| = \\sqrt{9+16+25} = \\sqrt{50} = 5\\sqrt2, \\qquad |\\mathbf{b}| = \\sqrt{4+1+0} = \\sqrt5"}</MB>
          </Lepes>
          <Lepes cim="(a) 3. lépés — koszinusz és a szög">
            <MB>{"\\cos\\varphi = \\frac{10}{5\\sqrt2\\cdot\\sqrt5} = \\frac{10}{5\\sqrt{10}} = \\frac{2}{\\sqrt{10}} = \\frac{\\sqrt{10}}{5} \\approx 0{,}6325"}</MB>
            <MB>{"\\varphi = \\arccos 0{,}6325 \\approx 50{,}77^\\circ"}</MB>
            <p>Hegyesszög — ahogy vártuk. ✓</p>
          </Lepes>
          <Lepes cim="(b) 1. lépés — a két szám, amire szükség van">
            <MB>{"\\mathbf{u}\\cdot\\mathbf{v} = 4\\cdot(-2) + (-1)\\cdot 3 + 2\\cdot 1 = -8-3+2 = -9"}</MB>
            <MB>{"|\\mathbf{v}|^2 = 4+9+1 = 14"}</MB>
          </Lepes>
          <Lepes cim="(b) 2. lépés — a párhuzamos összetevő">
            <MB>{"\\mathbf{u}_{\\parallel} = \\frac{-9}{14}\\,(-2;\\,3;\\,1) = \\left(\\frac{18}{14};\\, -\\frac{27}{14};\\, -\\frac{9}{14}\\right) = \\left(\\frac{9}{7};\\, -\\frac{27}{14};\\, -\\frac{9}{14}\\right)"}</MB>
            <p>
              Az előjel beszédes: <M>{"\\mathbf{u}\\cdot\\mathbf{v} < 0"}</M>, tehát a párhuzamos
              összetevő a <M>{"\\mathbf{v}"}</M>-vel <strong>ellentétes</strong> irányba mutat — a két
              vektor tompaszöget zár be.
            </p>
          </Lepes>
          <Lepes cim="(b) 3. lépés — a merőleges összetevő és az ellenőrzés">
            <MB>{"\\mathbf{u}_{\\perp} = \\mathbf{u} - \\mathbf{u}_{\\parallel} = \\left(4-\\frac{9}{7};\\; -1+\\frac{27}{14};\\; 2+\\frac{9}{14}\\right) = \\left(\\frac{19}{7};\\, \\frac{13}{14};\\, \\frac{37}{14}\\right)"}</MB>
            <MB>{"\\mathbf{u}_{\\perp}\\cdot\\mathbf{v} = \\frac{19}{7}\\cdot(-2) + \\frac{13}{14}\\cdot 3 + \\frac{37}{14}\\cdot 1 = -\\frac{76}{14} + \\frac{39}{14} + \\frac{37}{14} = 0 \\ \\checkmark"}</MB>
          </Lepes>
        </KidolgozottFeladat>

        {/* ---- KF-2 ---- */}
        <KidolgozottFeladat
          jel="KF‑2"
          ido="6 perc"
          forras="Előadás, 4.3–4.4 példák"
          cim="Vektoriális szorzat és háromszögterület"
          feladat={
            <>
              <p>
                <strong>(a)</strong> Számítsd ki az <M>{"\\mathbf{a} = (3;\\,-1;\\,2)"}</M> és{" "}
                <M>{"\\mathbf{b} = (5;\\,4;\\,-1)"}</M> vektorok vektoriális szorzatát!
              </p>
              <p>
                <strong>(b)</strong> Mekkora az <M>{"\\mathbf{a} = (-1;\\,2;\\,-3)"}</M> és{" "}
                <M>{"\\mathbf{b} = (4;\\,1;\\,2)"}</M> vektorok által kifeszített háromszög területe?
              </p>
            </>
          }
          tanulsag={
            <p>
              A determináns kifejtésénél a <strong>középső tagot kivonjuk</strong> — itt bukik el a
              legtöbb számolás. És mindig ellenőrizz: a szorzatnak merőlegesnek kell lennie mindkét
              tényezőre, ez két skaláris szorzat, összesen fél perc.
            </p>
          }
        >
          <Lepes cim="(a) 1. lépés — a determináns felírása">
            <MB>{"\\mathbf{a}\\times\\mathbf{b} = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ 3 & -1 & 2 \\\\ 5 & 4 & -1 \\end{vmatrix}"}</MB>
          </Lepes>
          <Lepes cim="(a) 2. lépés — koordinátánként">
            <MB>{"\\mathbf{i}: \\quad (-1)\\cdot(-1) - 2\\cdot 4 = 1 - 8 = -7"}</MB>
            <MB>{"\\mathbf{j}: \\quad -\\left(3\\cdot(-1) - 2\\cdot 5\\right) = -(-3-10) = 13"}</MB>
            <MB>{"\\mathbf{k}: \\quad 3\\cdot 4 - (-1)\\cdot 5 = 12+5 = 17"}</MB>
            <KepletDoboz cimke="Eredmény" keplet={"\\mathbf{a}\\times\\mathbf{b} = (-7;\\,13;\\,17)"} />
          </Lepes>
          <Lepes cim="(a) 3. lépés — ellenőrzés merőlegességgel">
            <MB>{"(-7)\\cdot 3 + 13\\cdot(-1) + 17\\cdot 2 = -21-13+34 = 0 \\ \\checkmark"}</MB>
            <MB>{"(-7)\\cdot 5 + 13\\cdot 4 + 17\\cdot(-1) = -35+52-17 = 0 \\ \\checkmark"}</MB>
          </Lepes>
          <Lepes cim="(b) 1. lépés — a szorzat">
            <MB>{"\\mathbf{a}\\times\\mathbf{b} = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ -1 & 2 & -3 \\\\ 4 & 1 & 2 \\end{vmatrix}"}</MB>
            <MB>{"\\mathbf{i}: \\ 2\\cdot 2 - (-3)\\cdot 1 = 7, \\qquad \\mathbf{j}: \\ -\\left((-1)\\cdot 2 - (-3)\\cdot 4\\right) = -10, \\qquad \\mathbf{k}: \\ (-1)\\cdot 1 - 2\\cdot 4 = -9"}</MB>
            <MB>{"\\mathbf{a}\\times\\mathbf{b} = (7;\\,-10;\\,-9)"}</MB>
          </Lepes>
          <Lepes cim="(b) 2. lépés — a terület">
            <MB>{"\\left|\\mathbf{a}\\times\\mathbf{b}\\right| = \\sqrt{49+100+81} = \\sqrt{230}"}</MB>
            <KepletDoboz
              cimke="A háromszög területe a paralelogramma fele"
              keplet={"T_{\\triangle} = \\frac{1}{2}\\left|\\mathbf{a}\\times\\mathbf{b}\\right|"}
              behelyettesitve={"T = \\frac{\\sqrt{230}}{2}"}
              eredmeny={"T \\approx 7{,}58"}
            />
          </Lepes>
        </KidolgozottFeladat>

        {/* ---- KF-3 ---- */}
        <KidolgozottFeladat
          jel="KF‑3"
          ido="5 perc"
          forras="Előadás, 5.4 példa"
          cim="Tetraéder térfogata négy csúcsból"
          feladat={
            <p>
              Határozd meg az <M>{"A(2;\\,1;\\,-1)"}</M>, <M>{"B(5;\\,2;\\,1)"}</M>,{" "}
              <M>{"C(3;\\,4;\\,2)"}</M>, <M>{"D(1;\\,-1;\\,4)"}</M> csúcsú tetraéder térfogatát!
            </p>
          }
          tanulsag={
            <p>
              A recept mindig ugyanez: <strong>pontokból élvektorok, élvektorokból determináns</strong>.
              A hatoddal való szorzás azért kell, mert a gúla térfogata{" "}
              <M>{"\\tfrac13\\cdot"}</M> alapterület <M>{"\\cdot"}</M> magasság, és a háromszög alap a
              paralelogramma fele.
            </p>
          }
        >
          <Lepes cim="1. lépés — élvektorok az A csúcsból">
            <MB>{"\\overrightarrow{AB} = (5-2;\\,2-1;\\,1-(-1)) = (3;\\,1;\\,2)"}</MB>
            <MB>{"\\overrightarrow{AC} = (1;\\,3;\\,3), \\qquad \\overrightarrow{AD} = (-1;\\,-2;\\,5)"}</MB>
          </Lepes>
          <Lepes cim="2. lépés — a vegyes szorzat determinánsként">
            <MB>{"D = \\begin{vmatrix} 3 & 1 & 2 \\\\ 1 & 3 & 3 \\\\ -1 & -2 & 5 \\end{vmatrix} = 3\\left(3\\cdot 5 - 3\\cdot(-2)\\right) - 1\\left(1\\cdot 5 - 3\\cdot(-1)\\right) + 2\\left(1\\cdot(-2) - 3\\cdot(-1)\\right)"}</MB>
            <MB>{"D = 3\\cdot 21 - 1\\cdot 8 + 2\\cdot 1 = 63 - 8 + 2 = 57"}</MB>
          </Lepes>
          <Lepes cim="3. lépés — a térfogat">
            <KepletDoboz
              cimke="Tetraéder térfogata"
              keplet={"V = \\frac{1}{6}\\left|\\left(\\overrightarrow{AB}\\times\\overrightarrow{AC}\\right)\\cdot\\overrightarrow{AD}\\right|"}
              behelyettesitve={"V = \\frac{1}{6}\\left|57\\right|"}
              eredmeny={"V = 9{,}5"}
            />
            <p>
              A vegyes szorzat pozitív, tehát a három élvektor jobbsodrású hármast alkot. És mivel nem
              nulla, a négy pont nincs egy síkban — ami persze szükséges is ahhoz, hogy egyáltalán
              tetraéderről beszélhessünk.
            </p>
          </Lepes>
        </KidolgozottFeladat>

        {/* ---- KF-4 ---- */}
        <KidolgozottFeladat
          jel="KF‑4"
          ido="9 perc"
          forras="Előadás, 6.4, 7.2 és 7.4 példák"
          cim="Egyenes és sík felírása"
          feladat={
            <>
              <p>
                <strong>(a)</strong> Írd fel az <M>{"A(2;\\,4;\\,-1)"}</M> és <M>{"B(5;\\,3;\\,2)"}</M>{" "}
                pontokra illeszkedő egyenes paraméteres egyenletrendszerét!
              </p>
              <p>
                <strong>(b)</strong> Írd fel az <M>{"A(2;\\,3;\\,-1)"}</M>, <M>{"B(4;\\,5;\\,2)"}</M>,{" "}
                <M>{"C(2;\\,5;\\,5)"}</M> pontokon átmenő sík egyenletét!
              </p>
              <p>
                <strong>(c)</strong> Írd fel a <M>{"P_0(4;\\,-1;\\,2)"}</M> ponton átmenő, az{" "}
                <M>{"x + 2y + 3z = 7"}</M> síkkal párhuzamos sík egyenletét!
              </p>
            </>
          }
          tanulsag={
            <p>
              Egyenes: <strong>pont + irányvektor</strong>. Sík: <strong>pont + normálvektor</strong>.
              Ha három pont van, a normálvektort vektoriális szorzattal gyártjuk; ha párhuzamos síkot
              kérnek, a normálvektort egyszerűen átmásoljuk, és csak a jobb oldalt számoljuk újra.
            </p>
          }
        >
          <Lepes cim="(a) Irányvektor és paraméteres alak">
            <MB>{"\\mathbf{v} = \\overrightarrow{AB} = (5-2;\\; 3-4;\\; 2-(-1)) = (3;\\,-1;\\,3)"}</MB>
            <MB>{"x = 2 + 3t, \\qquad y = 4 - t, \\qquad z = -1 + 3t"}</MB>
            <p>
              Egyenletrendszeres (kanonikus) alakban:{" "}
              <M>{"\\dfrac{x-2}{3} = \\dfrac{y-4}{-1} = \\dfrac{z+1}{3}"}</M>. Ellenőrzés:{" "}
              <M>{"t = 1"}</M> esetén <M>{"(5;\\,3;\\,2) = B"}</M> ✓
            </p>
          </Lepes>
          <Lepes cim="(b) 1. lépés — két síkbeli vektor">
            <MB>{"\\overrightarrow{AB} = (2;\\,2;\\,3), \\qquad \\overrightarrow{AC} = (0;\\,2;\\,6)"}</MB>
          </Lepes>
          <Lepes cim="(b) 2. lépés — a normálvektor">
            <MB>{"\\mathbf{n} = \\overrightarrow{AB}\\times\\overrightarrow{AC} = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ 2 & 2 & 3 \\\\ 0 & 2 & 6 \\end{vmatrix}"}</MB>
            <MB>{"\\mathbf{i}: \\ 2\\cdot 6 - 3\\cdot 2 = 6, \\qquad \\mathbf{j}: \\ -\\left(2\\cdot 6 - 3\\cdot 0\\right) = -12, \\qquad \\mathbf{k}: \\ 2\\cdot 2 - 2\\cdot 0 = 4"}</MB>
            <MB>{"\\mathbf{n} = (6;\\,-12;\\,4)"}</MB>
          </Lepes>
          <Lepes cim="(b) 3. lépés — az egyenlet és az ellenőrzés">
            <MB>{"6(x-2) - 12(y-3) + 4(z+1) = 0"}</MB>
            <MB>{"6x - 12y + 4z = 12 - 36 - 4 = -28 \\qquad \\Longrightarrow \\qquad 3x - 6y + 2z = -14"}</MB>
            <p>
              Minden együttható osztható 2-vel; a normálvektor hossza közömbös, csak az iránya számít.
              Ellenőrzés: <M>{"B:\\ 12-30+4 = -14"}</M> ✓ és <M>{"C:\\ 6-30+10 = -14"}</M> ✓
            </p>
          </Lepes>
          <Lepes cim="(c) Párhuzamos sík — ugyanaz a normálvektor">
            <MB>{"\\mathbf{n} = (1;\\,2;\\,3)"}</MB>
            <MB>{"1(x-4) + 2(y+1) + 3(z-2) = 0 \\qquad \\Longrightarrow \\qquad x + 2y + 3z = 4 - 2 + 6 = 8"}</MB>
            <p>
              A bal oldal ugyanaz maradt, csak a jobb oldali állandó változott. Két párhuzamos sík
              egyenlete <strong>mindig</strong> csak a konstansban tér el — ez egyben ellenőrzési
              lehetőség is.
            </p>
          </Lepes>
        </KidolgozottFeladat>

        <div className="my-6">
          <p className="mb-2 text-[11px] font-bold tracking-[0.16em] text-naracs-600 uppercase">
            Film — a KF‑4 (b) része a térben, forgó kamerával
          </p>
          <FilmSikHarompont />
        </div>

        {/* ---- KF-5 ---- */}
        <KidolgozottFeladat
          jel="KF‑5"
          ido="11 perc"
          forras="Előadás, 8.1–8.3 példák"
          cim="Kölcsönös helyzetek: egyenesek, döféspont, metszésvonal"
          feladat={
            <>
              <p>
                <strong>(a)</strong> Vizsgáld meg páronként a három egyenes kölcsönös helyzetét!
              </p>
              <MB>{"e_1:\\ x = 2+t,\\ y = 3-2t,\\ z = -1+2t"}</MB>
              <MB>{"e_2:\\ x = 4-2t,\\ y = -1+4t,\\ z = -4t"}</MB>
              <MB>{"e_3:\\ x = 4+t,\\ y = 5+4t,\\ z = 3+2t"}</MB>
              <p>
                <strong>(b)</strong> Hol metszi az <M>{"e:\\ x = 1+2t,\\ y = -1+t,\\ z = 2-t"}</M>{" "}
                egyenes a <M>{"3x - y + 2z = 7"}</M> síkot?
              </p>
              <p>
                <strong>(c)</strong> Határozd meg az <M>{"S_1:\\ 2x+3y+4z = 5"}</M> és{" "}
                <M>{"S_2:\\ x-y+2z = 4"}</M> síkok metszésvonalát!
              </p>
            </>
          }
          tanulsag={
            <p>
              Két egyenesnél <strong>két paraméter</strong> kell, és a harmadik egyenletet is
              ellenőrizni kell — épp az dönti el, hogy metszők-e vagy kitérők. Döféspontnál a
              paraméteres alakot írjuk a sík egyenletébe; metszésvonalnál a két normálvektor
              vektoriális szorzata adja az irányt.
            </p>
          }
        >
          <Lepes cim="(a) 1. lépés — az irányvektorok">
            <MB>{"\\mathbf{v}_1 = (1;\\,-2;\\,2), \\qquad \\mathbf{v}_2 = (-2;\\,4;\\,-4), \\qquad \\mathbf{v}_3 = (1;\\,4;\\,2)"}</MB>
            <p>
              Látható, hogy <M>{"\\mathbf{v}_2 = -2\\mathbf{v}_1"}</M> — az első két egyenes iránya
              párhuzamos. A <M>{"\\mathbf{v}_3"}</M> egyikkel sem arányos.
            </p>
          </Lepes>
          <Lepes cim="(a) 2. lépés — e₁ és e₂: párhuzamos vagy egybeeső?">
            <p>
              Az <M>{"e_2"}</M> egyenes <M>{"t=0"}</M>-hoz tartozó pontja <M>{"(4;\\,-1;\\,0)"}</M>.
              Rajta van-e <M>{"e_1"}</M>-en? Az <M>{"x"}</M>-ből <M>{"2+t = 4 \\Rightarrow t = 2"}</M>;
              ekkor <M>{"y = 3-4 = -1"}</M> ✓, de <M>{"z = -1+4 = 3 \\ne 0"}</M> ✗
            </p>
            <KepletDoboz cimke="Eredmény" keplet={"e_1 \\parallel e_2, \\text{ de nem egybeesők}"} />
          </Lepes>
          <Lepes cim="(a) 3. lépés — e₁ és e₃: metszők">
            <MB>{"x: \\quad 2+t_1 = 4+t_2 \\;\\Rightarrow\\; t_1 = 2+t_2"}</MB>
            <MB>{"y: \\quad 3-2(2+t_2) = 5+4t_2 \\;\\Rightarrow\\; -1-2t_2 = 5+4t_2 \\;\\Rightarrow\\; t_2 = -1,\\quad t_1 = 1"}</MB>
            <MB>{"z: \\quad -1 + 2\\cdot 1 = 1 \\qquad \\text{és} \\qquad 3 + 2\\cdot(-1) = 1 \\quad ✓"}</MB>
            <p>
              A harmadik egyenlet teljesül, tehát <strong>metszők</strong>, és a metszéspont{" "}
              <M>{"M(3;\\,1;\\,1)"}</M>.
            </p>
          </Lepes>
          <Lepes cim="(a) 4. lépés — e₂ és e₃: kitérők">
            <MB>{"x: \\quad 4-2t_1 = 4+t_2 \\;\\Rightarrow\\; t_2 = -2t_1"}</MB>
            <MB>{"y: \\quad -1+4t_1 = 5+4t_2 = 5-8t_1 \\;\\Rightarrow\\; 12t_1 = 6 \\;\\Rightarrow\\; t_1 = \\tfrac12,\\quad t_2 = -1"}</MB>
            <MB>{"z: \\quad -4\\cdot\\tfrac12 = -2 \\qquad \\text{de} \\qquad 3+2\\cdot(-1) = 1 \\ne -2"}</MB>
            <p>
              A harmadik egyenlet <em>nem</em> teljesül: <strong>kitérők</strong>. (Nem meglepő, hiszen{" "}
              <M>{"e_1 \\parallel e_2"}</M> és <M>{"e_1"}</M> metszi <M>{"e_3"}</M>-at — de a
              párhuzamosság önmagában nem döntötte volna el a kérdést, hiszen <M>{"e_2"}</M> akár át is
              mehetett volna a metszésponton.)
            </p>
          </Lepes>
          <Lepes cim="(b) Döféspont — behelyettesítés a sík egyenletébe">
            <MB>{"3(1+2t) - (-1+t) + 2(2-t) = 7"}</MB>
            <MB>{"3 + 6t + 1 - t + 4 - 2t = 7 \\;\\Rightarrow\\; 8 + 3t = 7 \\;\\Rightarrow\\; t = -\\tfrac13"}</MB>
            <MB>{"M\\left(1-\\tfrac23;\\; -1-\\tfrac13;\\; 2+\\tfrac13\\right) = \\left(\\tfrac13;\\; -\\tfrac43;\\; \\tfrac73\\right)"}</MB>
            <p>
              Ellenőrzés: <M>{"3\\cdot\\tfrac13 + \\tfrac43 + \\tfrac{14}{3} = 1 + 6 = 7"}</M> ✓ (Ha az
              egyenlet ellentmondásra vezetett volna, az egyenes párhuzamos lenne a síkkal; ha
              azonossággá vált volna, benne feküdne.)
            </p>
          </Lepes>
          <Lepes cim="(c) Metszésvonal — irány és egy pont">
            <MB>{"\\mathbf{n}_1 = (2;\\,3;\\,4), \\qquad \\mathbf{n}_2 = (1;\\,-1;\\,2) \\quad \\text{(nem arányosak)}"}</MB>
            <MB>{"\\mathbf{v} = \\mathbf{n}_1\\times\\mathbf{n}_2 = (3\\cdot 2 - 4\\cdot(-1);\\; -(2\\cdot 2 - 4\\cdot 1);\\; 2\\cdot(-1) - 3\\cdot 1) = (10;\\,0;\\,-5)"}</MB>
            <p>
              Egyszerűsítve <M>{"\\mathbf{v} = (2;\\,0;\\,-1)"}</M>. Egy közös pont: legyen{" "}
              <M>{"x = 0"}</M>, ekkor <M>{"3y+4z = 5"}</M> és <M>{"-y+2z = 4"}</M>. A másodikból{" "}
              <M>{"y = 2z-4"}</M>, behelyettesítve <M>{"10z = 17"}</M>, azaz <M>{"z = \\tfrac{17}{10}"}</M>{" "}
              és <M>{"y = -\\tfrac35"}</M>.
            </p>
            <MB>{"x = 2t, \\qquad y = -\\tfrac35, \\qquad z = \\tfrac{17}{10} - t"}</MB>
            <p>
              Ellenőrzés <M>{"S_1"}</M>-be helyettesítve:{" "}
              <M>{"4t - \\tfrac95 + \\tfrac{34}{5} - 4t = \\tfrac{25}{5} = 5"}</M> ✓
            </p>
          </Lepes>
        </KidolgozottFeladat>

        {/* ---- KF-6 ---- */}
        <KidolgozottFeladat
          jel="KF‑6"
          ido="11 perc"
          forras="Előadás, 9.2–9.4 és 10.2 példák"
          cim="Távolságok és egy szög"
          feladat={
            <>
              <p>
                <strong>(a)</strong> Mekkora a <M>{"Q(4;\\,4;\\,1)"}</M> pont távolsága az{" "}
                <M>{"e:\\ x = 1+2t,\\ y = 2-t,\\ z = 3+2t"}</M> egyenestől?
              </p>
              <p>
                <strong>(b)</strong> Mekkora a <M>{"Q(3;\\,2;\\,-1)"}</M> pont távolsága a{" "}
                <M>{"2x - 3y + z = 5"}</M> síktól? Oldd meg kétféleképpen!
              </p>
              <p>
                <strong>(c)</strong> Mekkora az <M>{"f:\\ x = 1+2t,\\ y = 1+t,\\ z = -2t"}</M> és{" "}
                <M>{"g:\\ x = 4+s,\\ y = 2s,\\ z = 3+2s"}</M> egyenesek távolsága?
              </p>
              <p>
                <strong>(d)</strong> Mekkora szöget zár be a <M>{"\\mathbf{v} = (2;\\,-1;\\,2)"}</M>{" "}
                irányvektorú egyenes a <M>{"2x - 3y + z = 5"}</M> síkkal?
              </p>
            </>
          }
          tanulsag={
            <p>
              Mind a négy képlet ugyanaz a séma: <em>„valamilyen szorzat abszolút értéke, elosztva egy
              hosszal”</em>. A nevező mindig annak a mennyiségnek a hossza, amely az „alapot” jelenti.
              Ha ezt érted, nem kell külön-külön magolni őket. És a (d)-ben figyelj: ott{" "}
              <strong>szinusz</strong> van.
            </p>
          }
        >
          <Lepes cim="(a) 1. lépés — adatok">
            <p>
              Az egyenes egy pontja <M>{"P(1;\\,2;\\,3)"}</M> (a <M>{"t=0"}</M> eset), irányvektora{" "}
              <M>{"\\mathbf{v} = (2;\\,-1;\\,2)"}</M>, <M>{"|\\mathbf{v}| = \\sqrt{4+1+4} = 3"}</M>.
            </p>
            <MB>{"\\overrightarrow{PQ} = (4-1;\\; 4-2;\\; 1-3) = (3;\\,2;\\,-2)"}</MB>
          </Lepes>
          <Lepes cim="(a) 2. lépés — vektoriális szorzat és távolság">
            <MB>{"\\overrightarrow{PQ}\\times\\mathbf{v} = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ 3 & 2 & -2 \\\\ 2 & -1 & 2 \\end{vmatrix} = (2;\\,-10;\\,-7)"}</MB>
            <MB>{"\\left|\\overrightarrow{PQ}\\times\\mathbf{v}\\right| = \\sqrt{4+100+49} = \\sqrt{153} = 3\\sqrt{17}"}</MB>
            <KepletDoboz
              cimke="Pont és egyenes távolsága"
              keplet={"d = \\frac{\\left|\\overrightarrow{PQ}\\times\\mathbf{v}\\right|}{|\\mathbf{v}|}"}
              behelyettesitve={"d = \\frac{3\\sqrt{17}}{3}"}
              eredmeny={"d = \\sqrt{17} \\approx 4{,}123"}
            />
            <p>
              A <M>{"P"}</M> pont választása közömbös: ha <M>{"t=1"}</M>-et vettünk volna (
              <M>{"P'(3;\\,1;\\,5)"}</M>), a vektoriális szorzat ugyanaz, <M>{"(2;\\,-10;\\,-7)"}</M>{" "}
              lenne — az irányvektorral párhuzamos rész kiesik.
            </p>
          </Lepes>
          <Lepes cim="(b) 1. megoldás — merőleges egyenessel (a „hosszú út”)">
            <p>
              A <M>{"Q"}</M>-n át a síkra merőleges egyenes irányvektora a normálvektor:{" "}
              <M>{"\\mathbf{n} = (2;\\,-3;\\,1)"}</M>.
            </p>
            <MB>{"2(3+2t) - 3(2-3t) + (-1+t) = 5 \\;\\Rightarrow\\; 14t = 6 \\;\\Rightarrow\\; t = \\tfrac37"}</MB>
            <MB>{"M\\left(\\tfrac{27}{7};\\; \\tfrac57;\\; -\\tfrac47\\right), \\qquad d = |t|\\cdot|\\mathbf{n}| = \\tfrac37\\sqrt{14} \\approx 1{,}604"}</MB>
            <p>Ezt az utat akkor válaszd, ha a talppontra is szükség van.</p>
          </Lepes>
          <Lepes cim="(b) 2. megoldás — a behelyettesítéses képlettel (a „rövid út”)">
            <KepletDoboz
              cimke="Pont és sík távolsága"
              keplet={"d = \\frac{\\left|n_1x_Q + n_2y_Q + n_3z_Q - d_0\\right|}{\\sqrt{n_1^2+n_2^2+n_3^2}}"}
              behelyettesitve={"d = \\frac{\\left|2\\cdot 3 - 3\\cdot 2 + (-1) - 5\\right|}{\\sqrt{4+9+1}} = \\frac{6}{\\sqrt{14}}"}
              eredmeny={"d = \\frac{3\\sqrt{14}}{7} \\approx 1{,}604 \\ \\checkmark"}
            />
            <p>
              Ugyanaz jött ki. Vetítéssel is: a síkon <M>{"P(0;\\,0;\\,5)"}</M> rajta van,{" "}
              <M>{"\\overrightarrow{PQ} = (3;\\,2;\\,-6)"}</M>, és{" "}
              <M>{"\\overrightarrow{PQ}\\cdot\\mathbf{n} = 6-6-6 = -6"}</M> — a számláló ugyanaz.
            </p>
          </Lepes>
          <Lepes cim="(c) 1. lépés — adatok és a közös merőleges iránya">
            <p>
              <M>{"P(1;\\,1;\\,0)"}</M>, <M>{"\\mathbf{v}_1 = (2;\\,1;\\,-2)"}</M>;{" "}
              <M>{"Q(4;\\,0;\\,3)"}</M>, <M>{"\\mathbf{v}_2 = (1;\\,2;\\,2)"}</M>.
            </p>
            <MB>{"\\mathbf{n} = \\mathbf{v}_1\\times\\mathbf{v}_2 = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ 2 & 1 & -2 \\\\ 1 & 2 & 2 \\end{vmatrix} = (6;\\,-6;\\,3)"}</MB>
            <MB>{"|\\mathbf{n}| = \\sqrt{36+36+9} = \\sqrt{81} = 9"}</MB>
          </Lepes>
          <Lepes cim="(c) 2. lépés — vegyes szorzat és távolság">
            <MB>{"\\overrightarrow{PQ} = (3;\\,-1;\\,3), \\qquad \\overrightarrow{PQ}\\cdot\\mathbf{n} = 18+6+9 = 33"}</MB>
            <KepletDoboz
              cimke="Két kitérő egyenes távolsága"
              keplet={"d = \\frac{\\left|\\overrightarrow{PQ}\\cdot(\\mathbf{v}_1\\times\\mathbf{v}_2)\\right|}{|\\mathbf{v}_1\\times\\mathbf{v}_2|}"}
              behelyettesitve={"d = \\frac{33}{9}"}
              eredmeny={"d = \\frac{11}{3} \\approx 3{,}667"}
            />
            <p>
              Mivel <M>{"d \\ne 0"}</M>, a két egyenes valóban kitérő — ezt külön nem is kell
              ellenőrizni, a nem nulla eredmény maga a bizonyíték.
            </p>
          </Lepes>
          <Lepes cim="(d) Egyenes és sík hajlásszöge — szinusszal">
            <MB>{"\\mathbf{v}\\cdot\\mathbf{n} = 2\\cdot 2 + (-1)(-3) + 2\\cdot 1 = 9, \\qquad |\\mathbf{v}| = 3, \\qquad |\\mathbf{n}| = \\sqrt{14}"}</MB>
            <MB>{"\\sin\\alpha = \\frac{9}{3\\sqrt{14}} = \\frac{3}{\\sqrt{14}} \\approx 0{,}8018 \\;\\Rightarrow\\; \\alpha \\approx 53{,}30^\\circ"}</MB>
            <p>
              Ha véletlenül arkuszkoszinuszt számoltál volna, <M>{"36{,}70^\\circ"}</M>-ot kapsz — épp a
              pótszöget, vagyis az irányvektor és a <em>normálvektor</em> szögét.
            </p>
          </Lepes>
        </KidolgozottFeladat>

        <div className="my-6">
          <p className="mb-2 text-[11px] font-bold tracking-[0.16em] text-naracs-600 uppercase">
            Film — a KF‑6 (c) része: hogyan épül fel a paralelepipedon
          </p>
          <FilmKiteroTavolsag />
        </div>
      </Szakasz>

      {/* ==================== KALKULÁTOROK ==================== */}
      <Szakasz
        id="kalkulator"
        cimke="3. rész"
        cim="Kalkulátorok"
        bevezeto="Ugyanazok a számítások tetszőleges adatokkal. Használd a házi feladat ellenőrzésére, vagy arra, hogy ráérezz, mi hogyan változik."
      >
        <div className="space-y-8">
          <div>
            <h3 className="mb-2 text-[16px] font-semibold text-petrol-900">Vektorok és a három szorzat</h3>
            <p className="mb-3 text-[14px] text-petrol-600">
              Hossz, egységvektor, skaláris szorzat és hajlásszög, vektoriális szorzat, paralelogramma-
              és háromszögterület, vegyes szorzat, paralelepipedon- és tetraédertérfogat. Alaphelyzetben
              a KF‑1 adatai vannak betöltve, a gombokkal a KF‑2 és KF‑3 adataira válthatsz.
            </p>
            <TerVektorKalk />
          </div>
          <div>
            <h3 className="mb-2 text-[16px] font-semibold text-petrol-900">Egyenes és sík</h3>
            <p className="mb-3 text-[14px] text-petrol-600">
              Sík három pontból (normálvektor és egyenlet, legkisebb egész alakban is), pont–sík
              távolság, egy egyenes döféspontja a síkkal, és az egyenes–sík hajlásszög. Alaphelyzetben a
              KF‑4, KF‑5 és KF‑6 adatai.
            </p>
            <TerEgyenesSikKalk />
          </div>
        </div>

        <Kiemelo tipus="tipp" cim="Mire használd a kalkulátort">
          <p>
            Arra, hogy <em>ellenőrizz</em>, ne arra, hogy helyetted számoljon. A zárthelyin nem lesz
            nálad — a kalkulátor akkor ér valamit, ha előbb papíron megcsinálod a feladatot, és utána
            nézed meg, egyezik-e. Külön hasznos a merőlegesség-próbákat figyelni: a jó vektoriális
            szorzat mindkét tényezőre merőleges.
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
          cim="Érted, vagy csak számolod?"
          leiras="Tíz kérdés a modul tipikus félreértéseiről. Minden válasz után rövid magyarázat."
          kerdesek={KVIZ}
        />

        <Hibakereso feladatok={HIBAK} />

        <div className="my-6">
          <p className="mb-2 text-[11px] font-bold tracking-[0.16em] text-violet-700 uppercase">
            Játék — a kölcsönös helyzetek felismerése
          </p>
          <HelyzetFelismero />
        </div>

        <h3 className="mt-10 text-xl font-semibold text-petrol-900">Számolós gyakorlás</h3>
        <p className="mt-2 text-[14px] text-petrol-600">
          Az öt alaptípus, ami a zárthelyin biztosan előkerül. Öt egymás utáni hibátlan megoldás után
          konfetti jár.
        </p>
        <GyakorloSzekcio />

        <h3 className="mt-10 text-xl font-semibold text-petrol-900">További feladattípusok</h3>
        <p className="mt-2 text-[14px] text-petrol-600">Ezek is bekerülnek a Zh-szimulátorba.</p>
        <GyakorloExtra />

        <Kiemelo tipus="kulcs" cim="Mikor mehetsz tovább">
          <p>
            Akkor vagy készen ezzel a modullal, ha (1) fejből tudod, melyik szorzat ad számot és melyik
            vektort, (2) a vektoriális szorzatot ötből ötször hibátlanul kiszámolod — a középső tag
            előjelével együtt —, (3) egy kölcsönös helyzet feladatnál magadtól a helyes sorrendben
            vizsgálódsz, és a harmadik egyenletet sem felejted el, és (4) a négy távolságképletet nem
            magolod, hanem le tudod vezetni a „terület vagy térfogat osztva az alappal” gondolatból. A
            következő modulban a sorozatok jönnek: ott a végtelen közelítés fogalma lesz az újdonság.
          </p>
        </Kiemelo>
      </Szakasz>
    </>
  );
}
