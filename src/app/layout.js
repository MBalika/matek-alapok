import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: {
    default: "Matematika – Analízis, első félév",
    template: "%s · Matematika",
  },
  description:
    "Interaktív tananyag a BME Építőmérnöki Kar első féléves matematikájához: komplex számok, térgeometria, sorozatok, függvények, differenciál- és integrálszámítás. Elmélet, kidolgozott feladatok, kalkulátorok és gyakorlás.",
};

export const viewport = {
  themeColor: "#1d3c48",
};

export default function RootLayout({ children }) {
  return (
    <html lang="hu" className="h-full">
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
