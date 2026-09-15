"use client";

import FeladatFilm from "@/components/anim/FeladatFilm";
import { arany, lerp, simit, beKi } from "@/components/anim/Idovonal";
import { FeliratA } from "@/components/anim/FilmElemek";

const TEAL = "#0f766e";
const NAR = "#e2590a";
const LILA = "#7c3aed";
const ZOLD = "#15803d";
const PIROS = "#dc2626";
const SOTET = "#1d3c48";
const SZURKE = "#94a3b8";

const SZ = 560;
const MA = 380;

/**
 * Szövegsor felső indexekkel.
 *   reszek: [["∫ x · e"], ["2x", true], [" dx"]]  — a második elem igaz értéke = kitevő
 */
function Sor({ x, y, reszek, szin = SOTET, meret = 14, opacitas = 1, horgony = "middle", vastag = true }) {
  if (opacitas <= 0.01) return null;
  return (
    <text
      x={x}
      y={y}
      textAnchor={horgony}
      fontSize={meret}
      fontWeight={vastag ? 650 : 400}
      opacity={opacitas}
      style={{ fill: szin, paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
    >
      {reszek.map((r, i) => {
        const elozoFelso = i > 0 && reszek[i - 1][1];
        const felso = r[1];
        let dy = 0;
        if (felso && !elozoFelso) dy = -meret * 0.36;
        else if (!felso && elozoFelso) dy = meret * 0.36;
        return (
          <tspan key={i} fontSize={felso ? meret * 0.7 : meret} dy={dy}>
            {r[0]}
          </tspan>
        );
      })}
    </text>
  );
}

function Kartya({ x, y, w, h, szin, hatter, opacitas = 1 }) {
  if (opacitas <= 0.01) return null;
  return (
    <rect
      x={x - w / 2}
      y={y - h / 2}
      width={w}
      height={h}
      rx="10"
      fill={hatter}
      stroke={szin}
      strokeWidth="2"
      opacity={opacitas}
    />
  );
}

const FEJEZETEK = [
  {
    t0: 0,
    cim: "1. A feladat",
    szoveg:
      "Egy szorzatot kell integrálni: polinom szorozva exponenciálissal. Szorzatra nincs integrálási szabály — de van egy átalakítás, amivel egyszerűbbre cserélhetjük.",
    kepletek: ["\\int x\\,e^{2x}\\,dx"],
  },
  {
    t0: 3.6,
    cim: "2. A szorzatszabály visszafelé",
    szoveg:
      "Indulj a deriválási szorzatszabályból, integráld mindkét oldalt, és rendezd át. Ez a parciális integrálás képlete — nem megold, hanem kicserél.",
    kepletek: ["(uv)' = u'v+uv'", "\\int u\\,v'\\,dx = uv - \\int u'v\\,dx"],
  },
  {
    t0: 8.0,
    cim: "3. A szereposztás",
    szoveg:
      "Azt válaszd u-nak, ami deriválva egyszerűsödik: az x-ből 1 lesz. A másik, az exponenciális, integrálva nem romlik el.",
    kepletek: ["u = x,\\quad v' = e^{2x}", "u' = 1,\\quad v = \\tfrac12 e^{2x}"],
  },
  {
    t0: 12.4,
    cim: "4. A képlet kitöltése",
    szoveg:
      "Helyettesítsd be a négy darabot. A mínusz jel a képletből jön — ez a leggyakrabban elrontott részlet.",
    kepletek: ["\\int xe^{2x}dx = x\\cdot\\tfrac12 e^{2x} - \\int 1\\cdot\\tfrac12 e^{2x}dx"],
  },
  {
    t0: 16.6,
    cim: "5. Az új integrál könnyebb",
    szoveg:
      "Az x eltűnt: ami maradt, az alapintegrál. Pontosan ezért volt jó a szereposztás — fordítva x² jött volna be.",
    kepletek: ["\\tfrac12\\int e^{2x}dx = \\tfrac14 e^{2x}"],
  },
  {
    t0: 20.2,
    cim: "6. Az eredmény",
    szoveg: "És a +C, ami nélkül a válasz hiányos: a primitív függvények egész seregét keressük.",
    kepletek: ["\\int xe^{2x}dx = \\frac{xe^{2x}}{2}-\\frac{e^{2x}}{4}+C"],
  },
  {
    t0: 23.4,
    cim: "7. Ellenőrzés: deriválj vissza",
    szoveg:
      "Az első tagot szorzatszabállyal deriváljuk. A két „fél e²ˣ” kiüti egymást, és pontosan az integrandus marad. Ez az ellenőrzés gyorsabb, mint maga az integrálás.",
    kepletek: [
      "\\left(\\tfrac{xe^{2x}}{2}\\right)' = \\tfrac12 e^{2x}+xe^{2x}",
      "\\left(-\\tfrac{e^{2x}}{4}\\right)' = -\\tfrac12 e^{2x}",
    ],
  },
];

function rajz(t) {
  const u1 = arany(t, 0.3, 1.6, simit);
  const uKartya = arany(t, 1.4, 2.8, simit);
  const uSzabaly = arany(t, 3.9, 5.2, simit);
  const uKepl = arany(t, 5.6, 7.0, simit);
  const uMozog = arany(t, 8.3, 10.2, beKi);
  const uSzarmaz = arany(t, 10.4, 11.8, simit);
  const uKitolt = arany(t, 12.7, 14.2, simit);
  const uUj = arany(t, 16.9, 18.2, simit);
  const uEred = arany(t, 20.5, 21.8, simit);
  const uEll = arany(t, 23.9, 25.2, simit);
  const uKiut = arany(t, 25.6, 26.8, simit);
  const uPipa = arany(t, 26.9, 27.8, simit);

  /* A 7. fejezetben a középső sorok teljesen eltűnnek, hogy legyen hely. */
  const halvany = 1 - arany(t, 23.3, 23.9, simit);

  const xA = lerp(228, 140, uMozog);
  const xB = lerp(322, 400, uMozog);
  const yK = lerp(96, 104, uMozog);

  return (
    <svg viewBox={`0 0 ${SZ} ${MA}`} className="abra w-full select-none">
      {/* ---------- 1. a feladat ---------- */}
      <Sor x={280} y={42} reszek={[["∫ x · e"], ["2x", true], [" dx"]]} meret={19} opacitas={u1} />

      {/* ---------- a két tényező kártyája ---------- */}
      <Kartya x={xA} y={yK} w={78} h={44} szin={TEAL} hatter="#ccfbf1" opacitas={uKartya} />
      <FeliratA x={xA} y={yK + 6} szin={TEAL} meret={18} opacitas={uKartya}>
        x
      </FeliratA>
      <Kartya x={xB} y={yK} w={92} h={44} szin={NAR} hatter="#ffedd5" opacitas={uKartya} />
      <Sor x={xB} y={yK + 6} reszek={[["e"], ["2x", true]]} szin={NAR} meret={17} opacitas={uKartya} />

      {uMozog > 0.5 && (
        <>
          <FeliratA x={xA} y={yK - 32} szin={TEAL} meret={12} opacitas={uMozog}>
            u — deriváljuk
          </FeliratA>
          <FeliratA x={xB} y={yK - 32} szin={NAR} meret={12} opacitas={uMozog}>
            v′ — integráljuk
          </FeliratA>
        </>
      )}

      {/* ---------- 3. u′ és v ---------- */}
      {uSzarmaz > 0.01 && (
        <>
          <line x1={xA} y1={yK + 24} x2={xA} y2={yK + 44} stroke={TEAL} strokeWidth="1.6" opacity={uSzarmaz} />
          <FeliratA x={xA} y={yK + 60} szin={TEAL} meret={14.5} opacitas={uSzarmaz}>
            u′ = 1
          </FeliratA>
          <line x1={xB} y1={yK + 24} x2={xB} y2={yK + 44} stroke={NAR} strokeWidth="1.6" opacity={uSzarmaz} />
          <Sor
            x={xB}
            y={yK + 60}
            reszek={[["v = ½ e"], ["2x", true]]}
            szin={NAR}
            meret={14.5}
            opacitas={uSzarmaz}
          />
        </>
      )}

      {/* ---------- 2. a szorzatszabály és a képlet ---------- */}
      <FeliratA x={280} y={214} szin={SZURKE} meret={14} opacitas={uSzabaly * halvany}>
        (u·v)′ = u′·v + u·v′
      </FeliratA>
      {uKepl * halvany > 0.01 && (
        <>
          <rect
            x={148}
            y={228}
            width={264}
            height={32}
            rx="8"
            fill="#f5f3ff"
            stroke={LILA}
            strokeWidth="1.6"
            opacity={uKepl * halvany}
          />
          <FeliratA x={280} y={249} szin={LILA} meret={15} opacitas={uKepl * halvany}>
            ∫ u·v′ dx = u·v − ∫ u′·v dx
          </FeliratA>
        </>
      )}

      {/* ---------- 4. a kitöltött képlet ---------- */}
      <Sor
        x={280}
        y={292}
        reszek={[["= x·½e"], ["2x", true], ["  −  ∫ 1·½e"], ["2x", true], [" dx"]]}
        meret={14.5}
        opacitas={uKitolt * halvany}
      />

      {/* ---------- 5. az új integrál ---------- */}
      <Sor
        x={280}
        y={320}
        reszek={[["½ ∫ e"], ["2x", true], [" dx = ¼ e"], ["2x", true], ["  ← alapintegrál"]]}
        szin={ZOLD}
        meret={14}
        opacitas={uUj * halvany}
      />

      {/* ---------- 6. az eredmény ---------- */}
      {uEred > 0.01 && (
        <>
          <rect
            x={116}
            y={340}
            width={328}
            height={30}
            rx="8"
            fill="#fff7ed"
            stroke={NAR}
            strokeWidth="2"
            opacity={uEred}
          />
          <Sor
            x={280}
            y={360}
            reszek={[["∫ x e"], ["2x", true], [" dx = ½ x e"], ["2x", true], [" − ¼ e"], ["2x", true], [" + C"]]}
            szin={NAR}
            meret={14.5}
            opacitas={uEred}
          />
        </>
      )}

      {/* ---------- 7. ellenőrzés ---------- */}
      {uEll > 0.01 && (
        <>
          <FeliratA x={280} y={202} szin={SOTET} meret={13} opacitas={uEll}>
            Ellenőrzés — deriváljuk vissza:
          </FeliratA>
          <Sor
            x={280}
            y={234}
            reszek={[["(½ x e"], ["2x", true], [")′ = ½ e"], ["2x", true], [" + x e"], ["2x", true]]}
            szin={TEAL}
            meret={14.5}
            opacitas={uEll}
          />
          <Sor
            x={280}
            y={264}
            reszek={[["(−¼ e"], ["2x", true], [")′ = −½ e"], ["2x", true]]}
            szin={NAR}
            meret={14.5}
            opacitas={uEll}
          />
          {uKiut > 0.01 && (
            <>
              <line
                x1={284}
                y1={230}
                x2={lerp(284, 334, uKiut)}
                y2={230}
                stroke={PIROS}
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <line
                x1={312}
                y1={260}
                x2={lerp(312, 372, uKiut)}
                y2={260}
                stroke={PIROS}
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <Sor
                x={280}
                y={292}
                reszek={[["a két fél e"], ["2x", true], [" kiüti egymást"]]}
                szin={PIROS}
                meret={12.5}
                opacitas={uKiut}
              />
            </>
          )}
          {uPipa > 0.01 && (
            <>
              <rect
                x={176}
                y={302}
                width={208}
                height={30}
                rx="8"
                fill="#ecfdf5"
                stroke={ZOLD}
                strokeWidth="2"
                opacity={uPipa}
              />
              <Sor
                x={280}
                y={322}
                reszek={[["marad: x e"], ["2x", true], ["   ✓"]]}
                szin={ZOLD}
                meret={15}
                opacitas={uPipa}
              />
            </>
          )}
        </>
      )}
    </svg>
  );
}

export default function FilmParcialis() {
  return (
    <FeladatFilm
      cim="Parciális integrálás: ∫ x·e²ˣ dx — a szorzatszabály visszafelé"
      hossz={29}
      fejezetek={FEJEZETEK}
      rajz={rajz}
      megjegyzes="A két tényező kártyája a helyére áll, majd a képlet kitöltődik és visszaderiváljuk."
    />
  );
}
