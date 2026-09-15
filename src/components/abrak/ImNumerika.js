"use client";

/**
 * Numerikus segédek az Improprius és numerikus integrálás modulhoz.
 * Minden függvény tiszta (nincs állapot), így a kalkulátorok, a felfedezők
 * és a filmek is ugyanezt használják — így biztosan ugyanazt a számot mutatják.
 */

/** Az osztópontok: x_i = a + i·h, i = 0 … n. */
export function osztopontok(a, b, n) {
  const h = (b - a) / n;
  const x = [];
  for (let i = 0; i <= n; i++) x.push(a + i * h);
  return x;
}

/** Összetett trapézszabály a már kiszámolt y értékekből, egyenletes h mellett. */
export function trapezSulyokkal(y, h) {
  let s = 0;
  for (let i = 0; i < y.length; i++) {
    const sulyy = i === 0 || i === y.length - 1 ? 1 : 2;
    s += sulyy * y[i];
  }
  return (h / 2) * s;
}

/** Összetett Simpson-szabály a kiszámolt y értékekből (páros részintervallum-szám!). */
export function simpsonSulyokkal(y, h) {
  const n = y.length - 1;
  if (n % 2 !== 0) return NaN;
  let s = 0;
  for (let i = 0; i <= n; i++) {
    const sulyy = i === 0 || i === n ? 1 : i % 2 === 1 ? 4 : 2;
    s += sulyy * y[i];
  }
  return (h / 3) * s;
}

/** A Simpson-súly az i-edik osztópontban (n részintervallum mellett). */
export function simpsonSuly(i, n) {
  if (i === 0 || i === n) return 1;
  return i % 2 === 1 ? 4 : 2;
}

/** A trapéz-súly az i-edik osztópontban. */
export function trapezSuly(i, n) {
  return i === 0 || i === n ? 1 : 2;
}

export function trapez(fn, a, b, n) {
  const h = (b - a) / n;
  return trapezSulyokkal(osztopontok(a, b, n).map(fn), h);
}

export function simpson(fn, a, b, n) {
  const h = (b - a) / n;
  return simpsonSulyokkal(osztopontok(a, b, n).map(fn), h);
}

/**
 * „Pontos” érték: nagyon finom Simpson-felosztás. A megjelenített 6 tizedesig
 * ez már mindig helyes, ha a függvény sima az [a;b]-n.
 */
export function pontosIntegral(fn, a, b, n = 2000) {
  const paros = n % 2 === 0 ? n : n + 1;
  return simpson(fn, a, b, paros);
}

/**
 * Improprius integrál numerikus közelítése egy véges [a;d] darabon úgy, hogy a
 * végpontbeli szingularitást kihagyjuk: a nyitott (középpontos) formulát
 * használjuk, amely sosem értékel ki a végpontokban.
 */
export function nyitottIntegral(fn, a, b, n = 4000) {
  if (!(b > a)) return 0;
  const h = (b - a) / n;
  let s = 0;
  for (let i = 0; i < n; i++) {
    const y = fn(a + (i + 0.5) * h);
    if (!Number.isFinite(y)) return NaN;
    s += y;
  }
  return s * h;
}

/**
 * Integrál mértani osztású szeletekkel: a `tol` végpont közelében nagyon sűrű a
 * felosztás, távolodva egyre ritkább. Ez kell az improprius integrálokhoz, ahol
 * a tartomány több nagyságrendet fog át (d = 10⁶) vagy a végpont közelében
 * robban fel a függvény: egyenletes felosztással mindkettő értelmetlen számot ad.
 */
export function skalazottIntegral(fn, tol, ig, kezdoLepes = 1, dbSzelet = 400) {
  if (!(ig > tol)) return 0;
  const hossz = ig - tol;
  let osszeg = 0;
  let u = 0;
  let lepes = Math.min(hossz, Math.max(kezdoLepes, hossz * 1e-12));
  let kor = 0;
  while (u < hossz && kor < 60) {
    const kov = Math.min(hossz, u + lepes);
    // az első szelet a kritikus véghez tapad, ott sűrűbben mintavételezünk
    const resz = nyitottIntegral((t) => fn(tol + t), u, kov, kor === 0 ? dbSzelet * 5 : dbSzelet);
    if (!Number.isFinite(resz)) return NaN;
    osszeg += resz;
    u = kov;
    lepes *= 10;
    kor += 1;
  }
  return osszeg;
}

/** Maximumkeresés mintavétellel (a hibabecslésekhez kell max|f''| és max|f⁗|). */
export function maximumAbszolut(fn, a, b, db = 400) {
  let m = 0;
  for (let i = 0; i <= db; i++) {
    const v = Math.abs(fn(a + ((b - a) * i) / db));
    if (Number.isFinite(v) && v > m) m = v;
  }
  return m;
}

/** Numerikus második derivált. */
export function masodikDerivalt(fn, x, h = 1e-3) {
  const l = Math.max(h, Math.abs(x) * h);
  return (fn(x + l) - 2 * fn(x) + fn(x - l)) / (l * l);
}

/** Numerikus negyedik derivált (ötpontos formula). */
export function negyedikDerivalt(fn, x, h = 1e-2) {
  const l = Math.max(h, Math.abs(x) * h);
  return (
    (fn(x + 2 * l) - 4 * fn(x + l) + 6 * fn(x) - 4 * fn(x - l) + fn(x - 2 * l)) /
    Math.pow(l, 4)
  );
}

/** Trapézösszeg nem feltétlenül egyenletes (x_i; y_i) adatokból. */
export function trapezAdatokbol(xs, ys) {
  let s = 0;
  for (let i = 0; i + 1 < xs.length; i++) {
    s += ((ys[i] + ys[i + 1]) / 2) * (xs[i + 1] - xs[i]);
  }
  return s;
}

/** Simpson-összeg egyenletes lépésközű adatokból (páros sok részintervallum). */
export function simpsonAdatokbol(xs, ys) {
  const n = xs.length - 1;
  if (n < 2 || n % 2 !== 0) return NaN;
  return simpsonSulyokkal(ys, (xs[n] - xs[0]) / n);
}
