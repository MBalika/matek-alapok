"use client";

import { Cimke, Nyil, NyilHegyek, SzogIv, Tengelyek } from "./SvgElemek";

/** Az összeadás mint vektorösszeadás: paralelogramma-szabály. */
export function AbraOsszeadas() {
  const OX = 120, OY = 210, L = 40;
  const z1 = [3, 1], z2 = [1, 2.5];
  const P = ([a, b]) => [OX + a * L, OY - b * L];
  const [x1, y1] = P(z1), [x2, y2] = P(z2), [xs, ys] = P([z1[0] + z2[0], z1[1] + z2[1]]);
  return (
    <svg viewBox="0 0 420 250" className="abra w-full">
      <NyilHegyek />
      <Tengelyek ox={OX} oy={OY} balra={40} jobbra={280} fel={190} le={25} xCimke="Re" yCimke="Im" />
      <line x1={x1} y1={y1} x2={xs} y2={ys} className="segedvonal" />
      <line x1={x2} y1={y2} x2={xs} y2={ys} className="segedvonal" />
      <Nyil x1={OX} y1={OY} x2={x1} y2={y1} szin="ero" vastagsag={3} />
      <Nyil x1={OX} y1={OY} x2={x2} y2={y2} szin="komp" vastagsag={3} />
      <Nyil x1={OX} y1={OY} x2={xs} y2={ys} szin="eredo" vastagsag={3.4} />
      <Cimke x={x1 + 8} y={y1 + 18} szin="var(--color-jel-ero)">z₁ = 3 + i</Cimke>
      <Cimke x={x2 - 30} y={y2 - 10} szin="var(--color-jel-komp)">z₂ = 1 + 2,5i</Cimke>
      <Cimke x={xs + 10} y={ys - 12} szin="var(--color-jel-eredo)" horgony="start">z₁ + z₂ = 4 + 3,5i</Cimke>
    </svg>
  );
}

/** A négy síknegyed és az argumentum képlete mindegyikben. */
export function AbraNegyedek() {
  const OX = 210, OY = 140, R = 80;
  const dobozok = [
    { x: 300, y: 28, szoveg: "I. negyed · a > 0, b > 0", keplet: "φ = α" },
    { x: 96, y: 28, szoveg: "II. negyed · a < 0, b > 0", keplet: "φ = 180° − α" },
    { x: 96, y: 236, szoveg: "III. negyed · a < 0, b < 0", keplet: "φ = 180° + α" },
    { x: 300, y: 236, szoveg: "IV. negyed · a > 0, b < 0", keplet: "φ = 360° − α" },
  ];
  const alfa = 35;
  const pont = (fok, r) => [OX + r * Math.cos((fok * Math.PI) / 180), OY - r * Math.sin((fok * Math.PI) / 180)];
  const fok = 180 + alfa;
  const [zx, zy] = pont(fok, R);
  return (
    <svg viewBox="0 0 420 280" className="abra w-full">
      <NyilHegyek />
      <Tengelyek ox={OX} oy={OY} balra={195} jobbra={195} fel={128} le={128} xCimke="Re" yCimke="Im" />
      <circle cx={OX} cy={OY} r={R} fill="none" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
      {dobozok.map((d) => (
        <g key={d.szoveg}>
          <rect x={d.x - 88} y={d.y - 20} width="176" height="42" rx="8" fill="white" stroke="#dce9ed" />
          <text x={d.x} y={d.y - 5} textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#1d3c48">
            {d.szoveg}
          </text>
          <text x={d.x} y={d.y + 12} textAnchor="middle" fontSize="12.5" fontWeight="600" fill="#e2590a">
            {d.keplet}
          </text>
        </g>
      ))}
      <Nyil x1={OX} y1={OY} x2={zx} y2={zy} szin="ero" vastagsag={3} />
      <SzogIv ox={OX} oy={OY} sugar={30} kezdoFok={0} vegFok={fok} szin="#e2590a" cimke="φ" />
      <SzogIv ox={OX} oy={OY} sugar={50} kezdoFok={180} vegFok={fok} szin="#0f766e" cimke="α" />
      <Cimke x={zx - 10} y={zy + 18} szin="var(--color-jel-ero)">z</Cimke>
    </svg>
  );
}

/** A hatodik egységgyökök az egységkörön. */
export function AbraEgyseggyokok() {
  const OX = 210, OY = 125, R = 88;
  const pts = Array.from({ length: 6 }, (_, k) => {
    const t = (k * Math.PI) / 3;
    return [OX + R * Math.cos(t), OY - R * Math.sin(t), k];
  });
  return (
    <svg viewBox="0 0 420 250" className="abra w-full">
      <NyilHegyek />
      <Tengelyek ox={OX} oy={OY} balra={150} jobbra={150} fel={112} le={112} xCimke="Re" yCimke="Im" />
      <circle cx={OX} cy={OY} r={R} fill="none" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
      <polygon points={pts.map(([x, y]) => `${x},${y}`).join(" ")} fill="rgba(124,58,237,0.06)" stroke="#8b5cf6" strokeWidth="1.3" />
      <SzogIv ox={OX} oy={OY} sugar={30} kezdoFok={0} vegFok={60} szin="#7c3aed" cimke="60°" />
      {pts.map(([x, y, k]) => (
        <g key={k}>
          <circle cx={x} cy={y} r="5.5" fill="var(--color-jel-eredo)" stroke="white" strokeWidth="1.8" />
          <Cimke
            x={x + (x - OX) * 0.3}
            y={y + (y - OY) * 0.3 + (Math.abs(y - OY) < 1 ? 20 : 4)}
            szin="var(--color-jel-eredo)"
            meret={12}
          >
            {k === 0 ? "ε₀ = 1" : k === 3 ? "ε₃ = −1" : `ε${"₀₁₂₃₄₅"[k]}`}
          </Cimke>
        </g>
      ))}
    </svg>
  );
}
