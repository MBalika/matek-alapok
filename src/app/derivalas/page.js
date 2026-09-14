import Hamarosan from "@/components/Hamarosan";

export const metadata = { title: "Differenciálszámítás" };

export default function Oldal() {
  return (
    <Hamarosan
      szam={5}
      cim="Differenciálszámítás"
      leiras="A derivált fogalma és jelentése, deriválási szabályok, középértéktételek, L'Hospital-szabály, teljes függvényvizsgálat, Taylor-polinom."
      tartalom={[
        "A differenciálhányados: érintő és sebesség",
        "Deriválási szabályok, láncszabály, inverz deriváltja",
        "Implicit és paraméteres alak, érintő egyenlete",
        "Rolle, Lagrange, Cauchy középértéktételei",
        "L'Hospital-szabály, határozatlan alakok",
        "Függvényvizsgálat, szélsőérték, Taylor-polinom",
      ]}
    />
  );
}
