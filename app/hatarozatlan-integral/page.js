import Hamarosan from "@/components/Hamarosan";

export const metadata = { title: "Határozatlan integrál" };

export default function Oldal() {
  return (
    <Hamarosan
      szam={6}
      cim="Határozatlan integrál"
      leiras="Primitív függvény, alapintegrálok, helyettesítéses és parciális integrálás, racionális törtfüggvények, trigonometrikus és gyökös kifejezések."
      tartalom={[
        "A primitív függvény és a +C",
        "Alapintegrálok, linearitás",
        "Helyettesítés: f(ax+b), f'/f, f^n·f', általános eset",
        "Parciális integrálás és a választás szabálya",
        "Parciális törtekre bontás",
        "Trigonometrikus és gyökös helyettesítések",
      ]}
    />
  );
}
