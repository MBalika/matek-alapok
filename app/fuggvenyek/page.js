import Hamarosan from "@/components/Hamarosan";

export const metadata = { title: "Függvények, határérték, folytonosság" };

export default function Oldal() {
  return (
    <Hamarosan
      szam={4}
      cim="Függvények, határérték, folytonosság"
      leiras="Függvénytulajdonságok, inverz függvény, elemi függvények, görbék megadása, függvényhatárérték, folytonosság, Bolzano és Weierstrass tétele."
      tartalom={[
        "Értelmezési tartomány, értékkészlet, tulajdonságok",
        "Inverz függvény, arkusz- és area-függvények",
        "Görbék: explicit, implicit, paraméteres, polár alak",
        "A határérték ε–δ és átviteli elves definíciója",
        "Nevezetes határértékek (sin x / x, (1+1/x)^x)",
        "Folytonosság, szakadások, Bolzano és Weierstrass",
      ]}
    />
  );
}
