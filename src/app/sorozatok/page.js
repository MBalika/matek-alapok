import Hamarosan from "@/components/Hamarosan";

export const metadata = { title: "Sorozatok" };

export default function Oldal() {
  return (
    <Hamarosan
      szam={3}
      cim="Sorozatok"
      leiras="Konvergencia és határérték, monoton korlátos sorozatok, rendőrelv, határozatlan alakok, nevezetes határértékek és az e szám."
      tartalom={[
        "A sorozat fogalma, megadás képlettel és rekurzióval",
        "Monotonitás, korlátosság, torlódási pont",
        "A konvergencia ε–küszöbindex definíciója (sávábra)",
        "Műveletek határértékkel, határozatlan alakok",
        "Rendőrelv, monoton korlátos sorozat konvergens",
        "Nevezetes határértékek, az e szám",
      ]}
    />
  );
}
