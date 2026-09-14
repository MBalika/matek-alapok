import Hamarosan from "@/components/Hamarosan";

export const metadata = { title: "Térgeometria" };

export default function Oldal() {
  return (
    <Hamarosan
      szam={2}
      cim="Térgeometria"
      leiras="Vektorok a térben, skaláris, vektoriális és vegyes szorzat, az egyenes és a sík egyenletei, kölcsönös helyzetek, távolság- és szögfeladatok."
      tartalom={[
        "Vektorok koordinátás alakja, hossz, egységvektor",
        "Skaláris szorzat: szög, merőlegesség, vetület",
        "Vektoriális szorzat: irány, paralelogramma területe",
        "Vegyes szorzat: paralelepipedon térfogata",
        "Egyenes és sík egyenletei, kölcsönös helyzetek",
        "Pont–sík, pont–egyenes és kitérő egyenesek távolsága",
      ]}
    />
  );
}
