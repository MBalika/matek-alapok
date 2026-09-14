import Hamarosan from "@/components/Hamarosan";

export const metadata = { title: "Határozott integrál" };

export default function Oldal() {
  return (
    <Hamarosan
      szam={7}
      cim="Határozott integrál"
      leiras="Riemann-integrál, az integrál tulajdonságai, Newton–Leibniz-tétel, terület, ívhossz, forgástest térfogata és felszíne, súlypont."
      tartalom={[
        "Felosztás, alsó és felső közelítő összeg",
        "Az integrál tulajdonságai, középértéktétel",
        "Az integrálfüggvény és a Newton–Leibniz-tétel",
        "Helyettesítés és parciális integrálás határokkal",
        "Terület, ívhossz, forgástest térfogata és felszíne",
        "Statikai nyomaték, súlypont, tehetetlenségi nyomaték",
      ]}
    />
  );
}
