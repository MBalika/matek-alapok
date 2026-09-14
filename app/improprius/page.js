import Hamarosan from "@/components/Hamarosan";

export const metadata = { title: "Improprius és numerikus integrálás" };

export default function Oldal() {
  return (
    <Hamarosan
      szam={8}
      cim="Improprius és numerikus integrálás"
      leiras="Nem korlátos integrálási tartomány és nem korlátos integrandus, konvergenciakritériumok, trapéz- és Simpson-szabály."
      tartalom={[
        "I. típus: nem korlátos integrandus",
        "II. típus: végtelen tartomány",
        "1/x^p viselkedése, majoráns és minoráns kritérium",
        "Limeszes összehasonlító kritérium",
        "Torricelli-trombita",
        "Trapéz- és Simpson-szabály, hibabecslés",
      ]}
    />
  );
}
