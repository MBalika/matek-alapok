"use client";

/**
 * Pici, biztonságos kifejezés-kiértékelő az n-től (vagy a-tól) függő képletekhez.
 *
 * A menet mindig ugyanaz: 1) tokenizálás — tiltott karakternél azonnal hiba,
 * 2) elemzés (precedencia szerint), 3) csak az ellenőrzött tokenekből épített
 * JS-forrásból készül Function. A nyers szöveg tehát soha nem kerül a Function-be.
 *
 * Engedélyezett: számok, a megadott változók (alapból n), + - * / ^ ( ),
 * sqrt, ln, exp, sin, cos, abs, fakt (faktoriális), pi, e.
 * A ^ hatványozás (jobbra kötő), a magyar tizedesvessző is elfogadott.
 */

const FUGGVENYEK = ["sqrt", "ln", "exp", "sin", "cos", "abs", "fakt"];
const ALLANDOK = { pi: Math.PI, e: Math.E };

function faktorialis(x) {
  const k = Math.round(x);
  if (!Number.isFinite(x) || Math.abs(x - k) > 1e-9 || k < 0) return NaN;
  if (k > 170) return Infinity;
  let p = 1;
  for (let i = 2; i <= k; i++) p *= i;
  return p;
}

export const SEGEDEK = {
  sqrt: Math.sqrt,
  ln: Math.log,
  exp: Math.exp,
  sin: Math.sin,
  cos: Math.cos,
  abs: Math.abs,
  fakt: faktorialis,
};

/* ---------- 1. tokenizálás ---------- */

function tokenizal(szoveg, valtozok) {
  const s = String(szoveg ?? "").replace(/,/g, ".");
  const tokenek = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (c === " " || c === "\t" || c === "\n") {
      i += 1;
      continue;
    }
    if (c >= "0" && c <= "9") {
      let j = i;
      while (j < s.length && ((s[j] >= "0" && s[j] <= "9") || s[j] === ".")) j += 1;
      const szam = Number(s.slice(i, j));
      if (!Number.isFinite(szam)) throw new Error(`Hibás szám: „${s.slice(i, j)}”`);
      tokenek.push({ tipus: "szam", ertek: szam });
      i = j;
      continue;
    }
    if (/[a-zA-Z]/.test(c)) {
      let j = i;
      while (j < s.length && /[a-zA-Z0-9]/.test(s[j])) j += 1;
      const nev = s.slice(i, j).toLowerCase();
      if (valtozok.includes(nev)) tokenek.push({ tipus: "valtozo", ertek: nev });
      else if (nev in ALLANDOK) tokenek.push({ tipus: "szam", ertek: ALLANDOK[nev] });
      else if (FUGGVENYEK.includes(nev)) tokenek.push({ tipus: "fuggveny", ertek: nev });
      else throw new Error(`Ismeretlen név: „${nev}”`);
      i = j;
      continue;
    }
    if ("+-*/^()".includes(c)) {
      tokenek.push({ tipus: c === "(" || c === ")" ? c : "muvelet", ertek: c });
      i += 1;
      continue;
    }
    throw new Error(`Nem használható karakter: „${c}”`);
  }
  if (tokenek.length === 0) throw new Error("Üres kifejezés.");
  return tokenek;
}

/* ---------- 2. elemzés (Pratt-parser) ---------- */

const ERO = { "+": 1, "-": 1, "*": 2, "/": 2, "^": 3 };

function elemez(tokenek) {
  let p = 0;
  const most = () => tokenek[p];
  const vesz = () => tokenek[p++];

  function tag() {
    const t = most();
    if (!t) throw new Error("A kifejezés vége hiányos.");
    if (t.tipus === "muvelet" && (t.ertek === "-" || t.ertek === "+")) {
      vesz();
      const belso = kifejezes(4);
      return t.ertek === "-" ? { tipus: "elojel", gyerek: belso } : belso;
    }
    if (t.tipus === "szam") {
      vesz();
      return { tipus: "szam", ertek: t.ertek };
    }
    if (t.tipus === "valtozo") {
      vesz();
      return { tipus: "valtozo", ertek: t.ertek };
    }
    if (t.tipus === "fuggveny") {
      vesz();
      if (!most() || most().tipus !== "(") throw new Error(`A(z) ${t.ertek} után zárójel kell.`);
      vesz();
      const belso = kifejezes(0);
      if (!most() || most().tipus !== ")") throw new Error("Hiányzó záró zárójel.");
      vesz();
      return { tipus: "hivas", nev: t.ertek, gyerek: belso };
    }
    if (t.tipus === "(") {
      vesz();
      const belso = kifejezes(0);
      if (!most() || most().tipus !== ")") throw new Error("Hiányzó záró zárójel.");
      vesz();
      return belso;
    }
    throw new Error(`Nem várt jel: „${t.ertek}”`);
  }

  function kifejezes(minEro) {
    let bal = tag();
    for (;;) {
      const t = most();
      if (!t || t.tipus !== "muvelet") break;
      const ero = ERO[t.ertek];
      if (ero < minEro) break;
      vesz();
      // a ^ jobbra kötő, a többi balra
      const jobb = kifejezes(t.ertek === "^" ? ero : ero + 1);
      bal = { tipus: "muvelet", jel: t.ertek, bal, jobb };
    }
    return bal;
  }

  const fa = kifejezes(0);
  if (p !== tokenek.length) throw new Error("Fölösleges jelek a kifejezés végén.");
  return fa;
}

/* ---------- 3. JS-forrás a fából ---------- */

function forras(csomo) {
  switch (csomo.tipus) {
    case "szam":
      return `(${csomo.ertek})`;
    case "valtozo":
      return csomo.ertek;
    case "elojel":
      return `(-(${forras(csomo.gyerek)}))`;
    case "hivas":
      return `H.${csomo.nev}(${forras(csomo.gyerek)})`;
    case "muvelet":
      if (csomo.jel === "^") return `Math.pow(${forras(csomo.bal)},${forras(csomo.jobb)})`;
      return `(${forras(csomo.bal)}${csomo.jel}${forras(csomo.jobb)})`;
    default:
      throw new Error("Ismeretlen csomópont.");
  }
}

/**
 * Kifejezés fordítása.
 * @returns {{ ok: true, fn: Function } | { ok: false, hiba: string }}
 */
export function forditKifejezes(szoveg, valtozok = ["n"]) {
  try {
    const fa = elemez(tokenizal(szoveg, valtozok));
    const js = forras(fa);
    // eslint-disable-next-line no-new-func
    const nyers = new Function(...valtozok, "H", `"use strict"; return (${js});`);
    const fn = (...ertekek) => {
      const v = nyers(...ertekek, SEGEDEK);
      return typeof v === "number" && Number.isFinite(v) ? v : NaN;
    };
    fn(...valtozok.map(() => 1)); // próbahívás: a hibás forrás itt bukik el
    return { ok: true, fn };
  } catch (hiba) {
    return { ok: false, hiba: hiba?.message ?? "Hibás kifejezés." };
  }
}

/** Egy sorozat első tagjai: [{ n, ertek }]. */
export function tagokat(fn, nTol, nIg) {
  const t = [];
  for (let n = nTol; n <= nIg; n++) t.push({ n, ertek: fn(n) });
  return t;
}
